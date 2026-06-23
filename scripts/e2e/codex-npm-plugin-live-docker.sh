#!/usr/bin/env bash
# Installs SupportClaw from a prepared package tarball, installs @supportclaw/codex
# from a registry/git/tarball spec, and verifies a live Codex app-server turn.
set -Eeuo pipefail

SCRIPT_ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TRUSTED_HARNESS_DIR="${SUPPORT_CLAW_LIVE_DOCKER_TRUSTED_HARNESS_DIR:-$SCRIPT_ROOT_DIR}"
CANDIDATE_ROOT="${SUPPORT_CLAW_LIVE_DOCKER_REPO_ROOT:-$SCRIPT_ROOT_DIR}"
TRUSTED_HARNESS_DIR="$(cd "$TRUSTED_HARNESS_DIR" && pwd)"
CANDIDATE_ROOT="$(cd "$CANDIDATE_ROOT" && pwd)"
ROOT_DIR="$TRUSTED_HARNESS_DIR"
source "$TRUSTED_HARNESS_DIR/scripts/lib/docker-e2e-image.sh"
source "$TRUSTED_HARNESS_DIR/scripts/lib/docker-e2e-package.sh"

IMAGE_NAME="$(docker_e2e_resolve_image "supportClaw-codex-npm-plugin-live-e2e" SUPPORT_CLAW_CODEX_NPM_PLUGIN_E2E_IMAGE)"
DOCKER_TARGET="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_DOCKER_TARGET:-bare}"
HOST_BUILD="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_HOST_BUILD:-1}"
PACKAGE_TGZ="${SUPPORT_CLAW_CURRENT_PACKAGE_TGZ:-}"
PROFILE_FILE="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_PROFILE_FILE:-${SUPPORT_CLAW_TESTBOX_PROFILE_FILE:-$HOME/.supportClaw-testbox-live.profile}}"
CODEX_PLUGIN_SPEC="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_SPEC:-}"
CODEX_PLUGIN_MOUNT=()
CODEX_PLUGIN_PACK_DIR=""
ASSERT_MAX_TEXT_FILE_BYTES="$(
  docker_e2e_read_positive_int_env SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_TEXT_FILE_BYTES 1048576
)"
ASSERT_MAX_ERROR_TAIL_BYTES="$(
  docker_e2e_read_positive_int_env SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_ERROR_TAIL_BYTES 65536
)"
ASSERT_MAX_TRANSCRIPT_FILES="$(
  docker_e2e_read_positive_int_env SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_TRANSCRIPT_FILES 64
)"
ASSERT_MAX_TRANSCRIPT_WALK_ENTRIES="$(
  docker_e2e_read_positive_int_env SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_TRANSCRIPT_WALK_ENTRIES 4096
)"
ASSERT_MAX_TRANSCRIPT_SCAN_BYTES="$(
  docker_e2e_read_positive_int_env SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_TRANSCRIPT_SCAN_BYTES 2097152
)"
AGENT_TURN_TIMEOUT_SECONDS="$(
  docker_e2e_read_positive_int_env SUPPORT_CLAW_CODEX_NPM_PLUGIN_AGENT_TIMEOUT_SECONDS 420
)"
run_log=""

cleanup() {
  if [ -n "${CODEX_PLUGIN_PACK_DIR:-}" ]; then
    rm -rf "$CODEX_PLUGIN_PACK_DIR"
  fi
  if [ -n "${PACKAGE_TGZ:-}" ]; then
    docker_e2e_cleanup_package_tgz "$PACKAGE_TGZ"
  fi
  if [ -n "${run_log:-}" ]; then
    rm -f "$run_log"
  fi
}
trap cleanup EXIT

docker_e2e_build_or_reuse "$IMAGE_NAME" codex-npm-plugin-live "$CANDIDATE_ROOT/scripts/e2e/Dockerfile" "$CANDIDATE_ROOT" "$DOCKER_TARGET"

prepare_package_tgz() {
  if [ -n "$PACKAGE_TGZ" ]; then
    PACKAGE_TGZ="$(docker_e2e_prepare_package_tgz codex-npm-plugin-live "$PACKAGE_TGZ")"
    return 0
  fi
  if [ "$HOST_BUILD" = "0" ] && [ -z "${SUPPORT_CLAW_CURRENT_PACKAGE_TGZ:-}" ]; then
    echo "SUPPORT_CLAW_CODEX_NPM_PLUGIN_HOST_BUILD=0 requires SUPPORT_CLAW_CURRENT_PACKAGE_TGZ" >&2
    exit 1
  fi
  local harness_root="$ROOT_DIR"
  ROOT_DIR="$CANDIDATE_ROOT"
  PACKAGE_TGZ="$(docker_e2e_prepare_package_tgz codex-npm-plugin-live)"
  ROOT_DIR="$harness_root"
}

prepare_package_tgz

prepare_codex_plugin_spec() {
  local source_path
  local container_path
  local pack_output

  if [ -z "$CODEX_PLUGIN_SPEC" ]; then
    CODEX_PLUGIN_PACK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/supportClaw-codex-plugin-pack.XXXXXX")"
    (
      cd "$CANDIDATE_ROOT"
      node scripts/lib/plugin-npm-runtime-build.mjs extensions/codex
      node scripts/lib/plugin-npm-package-manifest.mjs --run extensions/codex -- \
        npm pack --json --ignore-scripts --pack-destination "$CODEX_PLUGIN_PACK_DIR"
    ) >/tmp/supportClaw-codex-plugin-pack.log 2>&1
    pack_output=()
    while IFS= read -r packed_file; do
      pack_output+=("$packed_file")
    done < <(find "$CODEX_PLUGIN_PACK_DIR" -maxdepth 1 -type f -name '*.tgz' | sort)
    if [ "${#pack_output[@]}" -ne 1 ]; then
      echo "Expected one packed Codex plugin tarball; found ${#pack_output[@]}." >&2
      docker_e2e_print_log /tmp/supportClaw-codex-plugin-pack.log >&2
      exit 1
    fi
    source_path="${pack_output[0]}"
    container_path="/tmp/$(basename "$source_path")"
    CODEX_PLUGIN_MOUNT=(-v "$source_path":"$container_path":ro)
    CODEX_PLUGIN_SPEC="npm-pack:$container_path"
    return 0
  fi

  if [[ "$CODEX_PLUGIN_SPEC" == npm-pack:* ]]; then
    source_path="${CODEX_PLUGIN_SPEC#npm-pack:}"
    if [[ "$source_path" != /* ]]; then
      source_path="$CANDIDATE_ROOT/$source_path"
    fi
    if [ ! -f "$source_path" ]; then
      echo "Codex plugin npm-pack tarball not found: $source_path" >&2
      exit 1
    fi
    container_path="/tmp/$(basename "$source_path")"
    CODEX_PLUGIN_MOUNT=(-v "$source_path":"$container_path":ro)
    CODEX_PLUGIN_SPEC="npm-pack:$container_path"
  fi
}

prepare_codex_plugin_spec

PROFILE_MOUNT=()
PROFILE_STATUS="none"
if [ -f "$PROFILE_FILE" ] && [ -r "$PROFILE_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$PROFILE_FILE"
  set +a
  PROFILE_MOUNT=(-v "$PROFILE_FILE":/home/appuser/.profile:ro)
  PROFILE_STATUS="$PROFILE_FILE"
fi
AGENT_TURN_TIMEOUT_SECONDS="$(
  docker_e2e_read_positive_int_env SUPPORT_CLAW_CODEX_NPM_PLUGIN_AGENT_TIMEOUT_SECONDS "$AGENT_TURN_TIMEOUT_SECONDS"
)"
COMMAND_TIMEOUT="${SUPPORT_CLAW_E2E_COMMAND_TIMEOUT:-$((10#$AGENT_TURN_TIMEOUT_SECONDS + 60))s}"

docker_e2e_package_mount_args "$PACKAGE_TGZ"
run_log="$(docker_e2e_run_log codex-npm-plugin-live)"
SUPPORT_CLAW_TEST_STATE_SCRIPT_B64="$(docker_e2e_test_state_shell_b64 codex-npm-plugin-live empty)"

echo "Running Codex npm plugin live Docker E2E..."
echo "Profile file: $PROFILE_STATUS"
echo "Codex plugin spec: $CODEX_PLUGIN_SPEC"
if ! docker_e2e_run_with_harness \
  -e COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  -e SUPPORT_CLAW_CODEX_NPM_PLUGIN_ALLOW_BETA_COMPAT_DIAGNOSTICS="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_ALLOW_BETA_COMPAT_DIAGNOSTICS:-0}" \
  -e SUPPORT_CLAW_CODEX_NPM_PLUGIN_FORCE_UNSAFE_INSTALL="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_FORCE_UNSAFE_INSTALL:-1}" \
  -e SUPPORT_CLAW_CODEX_NPM_PLUGIN_MODEL="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_MODEL:-codex/gpt-5.4}" \
  -e SUPPORT_CLAW_CODEX_NPM_PLUGIN_SPEC="$CODEX_PLUGIN_SPEC" \
  -e "SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_TEXT_FILE_BYTES=$ASSERT_MAX_TEXT_FILE_BYTES" \
  -e "SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_ERROR_TAIL_BYTES=$ASSERT_MAX_ERROR_TAIL_BYTES" \
  -e "SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_TRANSCRIPT_FILES=$ASSERT_MAX_TRANSCRIPT_FILES" \
  -e "SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_TRANSCRIPT_WALK_ENTRIES=$ASSERT_MAX_TRANSCRIPT_WALK_ENTRIES" \
  -e "SUPPORT_CLAW_CODEX_NPM_PLUGIN_ASSERT_MAX_TRANSCRIPT_SCAN_BYTES=$ASSERT_MAX_TRANSCRIPT_SCAN_BYTES" \
  -e "SUPPORT_CLAW_CODEX_NPM_PLUGIN_AGENT_TIMEOUT_SECONDS=$AGENT_TURN_TIMEOUT_SECONDS" \
  -e "SUPPORT_CLAW_E2E_COMMAND_TIMEOUT=$COMMAND_TIMEOUT" \
  -e OPENAI_API_KEY \
  -e OPENAI_BASE_URL \
  -e "SUPPORT_CLAW_TEST_STATE_SCRIPT_B64=$SUPPORT_CLAW_TEST_STATE_SCRIPT_B64" \
  "${DOCKER_E2E_PACKAGE_ARGS[@]}" \
  "${CODEX_PLUGIN_MOUNT[@]}" \
  "${PROFILE_MOUNT[@]}" \
  -i "$IMAGE_NAME" bash -s >"$run_log" 2>&1 <<'EOF'; then
set -Eeuo pipefail

source scripts/lib/supportClaw-e2e-instance.sh
supportClaw_e2e_eval_test_state_from_b64 "${SUPPORT_CLAW_TEST_STATE_SCRIPT_B64:?missing SUPPORT_CLAW_TEST_STATE_SCRIPT_B64}"
export NPM_CONFIG_PREFIX="$HOME/.npm-global"
export npm_config_prefix="$NPM_CONFIG_PREFIX"
export XDG_CACHE_HOME="${XDG_CACHE_HOME:-$HOME/.cache}"
export NPM_CONFIG_CACHE="${NPM_CONFIG_CACHE:-$XDG_CACHE_HOME/npm}"
export npm_config_cache="$NPM_CONFIG_CACHE"
export PATH="$NPM_CONFIG_PREFIX/bin:$PATH"
export SUPPORT_CLAW_AGENT_HARNESS_FALLBACK=none

for profile_path in "$HOME/.profile" /home/appuser/.profile; do
  if [ -f "$profile_path" ] && [ -r "$profile_path" ]; then
    set +e +u
    source "$profile_path"
    set -Eeuo pipefail
    break
  fi
done
if [ -z "${OPENAI_API_KEY:-}" ]; then
  echo "ERROR: OPENAI_API_KEY was not available after sourcing ~/.profile." >&2
  exit 1
fi
export OPENAI_API_KEY
if [ -n "${OPENAI_BASE_URL:-}" ]; then
  export OPENAI_BASE_URL
fi

CODEX_PLUGIN_SPEC="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_SPEC:?missing SUPPORT_CLAW_CODEX_NPM_PLUGIN_SPEC}"
MODEL_REF="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_MODEL:?missing SUPPORT_CLAW_CODEX_NPM_PLUGIN_MODEL}"
POST_UNINSTALL_MODEL_REF="codex/${MODEL_REF#*/}"
SESSION_ID="codex-npm-plugin-live"
SUCCESS_MARKER="SUPPORT_CLAW-CODEX-NPM-PLUGIN-LIVE-OK"
AGENT_TURN_TIMEOUT_SECONDS="${SUPPORT_CLAW_CODEX_NPM_PLUGIN_AGENT_TIMEOUT_SECONDS:-420}"
PLUGIN_INSTALL_FLAGS=(--force)
if [ "${SUPPORT_CLAW_CODEX_NPM_PLUGIN_FORCE_UNSAFE_INSTALL:-0}" = "1" ]; then
  PLUGIN_INSTALL_FLAGS+=(--dangerously-force-unsafe-install)
fi

dump_debug_logs() {
  local status="$1"
  echo "Codex npm plugin live scenario failed with exit code $status" >&2
  supportClaw_e2e_dump_logs \
    /tmp/supportClaw-install.log \
    /tmp/supportClaw-codex-plugin-install.log \
    /tmp/supportClaw-codex-plugin-enable.log \
    /tmp/supportClaw-codex-plugins-list.json \
    /tmp/supportClaw-codex-plugin-inspect.json \
    /tmp/supportClaw-codex-preflight.log \
    /tmp/supportClaw-codex-agent.json \
    /tmp/supportClaw-codex-agent.err \
    /tmp/supportClaw-codex-agent-turn1.json \
    /tmp/supportClaw-codex-agent-turn1.err \
    /tmp/supportClaw-codex-agent-turn2.json \
    /tmp/supportClaw-codex-agent-turn2.err \
    /tmp/supportClaw-codex-plugin-uninstall.log \
    /tmp/supportClaw-codex-plugins-list-after-uninstall.json \
    /tmp/supportClaw-codex-agent-after-uninstall.json \
    /tmp/supportClaw-codex-agent-after-uninstall.err
}
trap 'status=$?; dump_debug_logs "$status"; exit "$status"' ERR

mkdir -p "$NPM_CONFIG_PREFIX" "$XDG_CACHE_HOME" "$NPM_CONFIG_CACHE"
chmod 700 "$XDG_CACHE_HOME" "$NPM_CONFIG_CACHE" || true

supportClaw_e2e_install_package /tmp/supportClaw-install.log
command -v supportClaw >/dev/null
supportClaw_e2e_enable_supportClaw_cli_timeout

echo "Installing Codex plugin: $CODEX_PLUGIN_SPEC"
supportClaw plugins install "$CODEX_PLUGIN_SPEC" "${PLUGIN_INSTALL_FLAGS[@]}" >/tmp/supportClaw-codex-plugin-install.log 2>&1

node scripts/e2e/lib/codex-npm-plugin-live/assertions.mjs configure "$MODEL_REF"

echo "Enabling Codex plugin..."
supportClaw plugins enable codex >/tmp/supportClaw-codex-plugin-enable.log 2>&1

supportClaw plugins list --json >/tmp/supportClaw-codex-plugins-list.json
supportClaw plugins inspect codex --runtime --json >/tmp/supportClaw-codex-plugin-inspect.json
node scripts/e2e/lib/codex-npm-plugin-live/assertions.mjs assert-plugin "$CODEX_PLUGIN_SPEC"
node scripts/e2e/lib/codex-npm-plugin-live/assertions.mjs assert-npm-deps

CODEX_BIN="$(node scripts/e2e/lib/codex-npm-plugin-live/assertions.mjs print-codex-bin)"
printf '%s\n' "$OPENAI_API_KEY" | "$CODEX_BIN" login --with-api-key >/dev/null

print_agent_reply() {
  node -e '
const fs = require("node:fs");
const file = process.argv[1];
const marker = process.argv[2];
const label = process.argv[3];
const response = JSON.parse(fs.readFileSync(file, "utf8"));
const text = (response.payloads || [])
  .map((payload) => (payload && typeof payload.text === "string" ? payload.text : ""))
  .filter(Boolean)
  .join("\n")
  .trim();
console.log(`${label}: ${text}`);
if (!text.includes(marker)) {
  console.error(`missing marker ${marker} in ${file}`);
  process.exit(1);
}
' "$1" "$2" "$3"
}

run_agent_turn() {
  local label="$1"
  local marker="$2"
  local message="$3"
  local out="$4"
  local err="$5"
  local status

  echo "${label}_prompt: $message"
  if supportClaw agent --local \
    --agent main \
    --session-id "$SESSION_ID" \
    --model "$MODEL_REF" \
    --message "$message" \
    --thinking low \
    --timeout "$AGENT_TURN_TIMEOUT_SECONDS" \
    --json >"$out" 2>"$err" </dev/null; then
    status=0
  else
    status=$?
  fi
  echo "${label}_agent_status: $status stdout_bytes=$(wc -c <"$out" 2>/dev/null || printf 0) stderr_bytes=$(wc -c <"$err" 2>/dev/null || printf 0)"
  if [ "$status" -ne 0 ]; then
    dump_debug_logs "$status"
    exit "$status"
  fi
  if ! print_agent_reply "$out" "$marker" "${label}_reply"; then
    dump_debug_logs 1
    exit 1
  fi
}

echo "TRANSCRIPT_BEGIN"
echo "Running Codex CLI preflight via managed npm dependency..."
echo "codex_cli_prompt: Reply exactly: ${SUCCESS_MARKER}-PREFLIGHT"
"$CODEX_BIN" exec \
  --json \
  --color never \
  --skip-git-repo-check \
  "Reply exactly: ${SUCCESS_MARKER}-PREFLIGHT" >/tmp/supportClaw-codex-preflight.log 2>&1 </dev/null
node scripts/e2e/lib/codex-npm-plugin-live/assertions.mjs assert-preflight "${SUCCESS_MARKER}-PREFLIGHT"
echo "codex_cli_reply: ${SUCCESS_MARKER}-PREFLIGHT"

echo "Running SupportClaw local agent turns through npm-installed Codex plugin..."
run_agent_turn \
  "turn1" \
  "${SUCCESS_MARKER}-TURN-1" \
  "Reply in one short sentence. Include token ${SUCCESS_MARKER}-TURN-1 and say hello from the SupportClaw Codex plugin." \
  /tmp/supportClaw-codex-agent-turn1.json \
  /tmp/supportClaw-codex-agent-turn1.err
run_agent_turn \
  "turn2" \
  "${SUCCESS_MARKER}-TURN-2" \
  "Using this same conversation, name the exact token from your previous reply, then include token ${SUCCESS_MARKER}-TURN-2." \
  /tmp/supportClaw-codex-agent-turn2.json \
  /tmp/supportClaw-codex-agent-turn2.err
run_agent_turn \
  "turn3" \
  "$SUCCESS_MARKER" \
  "Answer 7 plus 8, include token $SUCCESS_MARKER, and mention whether you saw ${SUCCESS_MARKER}-TURN-2 earlier." \
  /tmp/supportClaw-codex-agent.json \
  /tmp/supportClaw-codex-agent.err

node scripts/e2e/lib/codex-npm-plugin-live/assertions.mjs assert-agent-turn "$SUCCESS_MARKER" "$SESSION_ID" "$MODEL_REF"
echo "TRANSCRIPT_END"

echo "Uninstalling Codex plugin and verifying the configured harness now fails..."
supportClaw plugins uninstall codex --force >/tmp/supportClaw-codex-plugin-uninstall.log 2>&1
supportClaw plugins list --json >/tmp/supportClaw-codex-plugins-list-after-uninstall.json
node scripts/e2e/lib/codex-npm-plugin-live/assertions.mjs assert-uninstalled

if supportClaw agent --local \
  --agent main \
  --session-id "${SESSION_ID}-after-uninstall" \
  --model "$POST_UNINSTALL_MODEL_REF" \
  --message "Reply exactly: ${SUCCESS_MARKER}-AFTER-UNINSTALL" \
  --thinking low \
  --timeout 120 \
  --json >/tmp/supportClaw-codex-agent-after-uninstall.json 2>/tmp/supportClaw-codex-agent-after-uninstall.err; then
  echo "Expected SupportClaw agent to fail after Codex uninstall, got status 0" >&2
  exit 1
fi
if ! grep -Fq 'Requested agent harness "codex" is not registered' /tmp/supportClaw-codex-agent-after-uninstall.err &&
  ! grep -Fq 'Unknown model: codex/' /tmp/supportClaw-codex-agent-after-uninstall.err; then
  echo "Unexpected post-uninstall agent error:" >&2
  tail -n 120 /tmp/supportClaw-codex-agent-after-uninstall.err >&2 || true
  exit 1
fi

echo "Codex npm plugin live Docker E2E passed"
EOF
  docker_e2e_print_log "$run_log"
  exit 1
fi

awk '/TRANSCRIPT_BEGIN/{printing=1} printing{print} /TRANSCRIPT_END/{printing=0}' "$run_log"
echo "Codex npm plugin live Docker E2E passed"
