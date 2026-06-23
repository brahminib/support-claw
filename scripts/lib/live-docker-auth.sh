#!/usr/bin/env bash

SUPPORT_CLAW_DOCKER_LIVE_AUTH_ALL=(.factory .gemini .minimax)
SUPPORT_CLAW_DOCKER_LIVE_AUTH_FILES_ALL=(
  .codex/auth.json
  .codex/config.toml
  .claude.json
  .claude/.credentials.json
  .claude/settings.json
  .claude/settings.local.json
  .gemini/settings.json
)

supportClaw_live_trim() {
  local value="${1:-}"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  printf '%s' "$value"
}

supportClaw_live_truthy() {
  case "${1:-}" in
    1 | true | TRUE | yes | YES | on | ON)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

supportClaw_live_read_positive_int_env() {
  local name="${1:?missing environment variable name}"
  local fallback="${2:?missing fallback value}"
  local value="${!name-}"
  if [ -z "${!name+x}" ]; then
    value="$fallback"
  fi
  if [[ ! "$value" =~ ^[0-9]+$ ]] || (( 10#$value < 1 )); then
    echo "invalid $name: $value" >&2
    return 2
  fi
  printf '%s\n' "$value"
}

supportClaw_live_is_ci() {
  supportClaw_live_truthy "${CI:-}" \
    || supportClaw_live_truthy "${GITHUB_ACTIONS:-}" \
    || supportClaw_live_truthy "${SUPPORT_CLAW_TESTBOX:-}"
}

supportClaw_live_uses_managed_bind_dirs() {
  supportClaw_live_is_ci \
    || [[ -n "${SUPPORT_CLAW_DOCKER_CACHE_HOME_DIR:-}" ]] \
    || [[ -n "${SUPPORT_CLAW_DOCKER_CLI_TOOLS_DIR:-}" ]]
}

supportClaw_live_default_profile_file() {
  if [[ -n "${SUPPORT_CLAW_PROFILE_FILE:-}" ]]; then
    printf '%s\n' "$SUPPORT_CLAW_PROFILE_FILE"
    return 0
  fi
  local testbox_profile="$HOME/.supportClaw-testbox-live.profile"
  if [[ -f "$testbox_profile" ]]; then
    printf '%s\n' "$testbox_profile"
    return 0
  fi
  printf '%s\n' "$HOME/.profile"
}

supportClaw_live_validate_relative_home_path() {
  local value
  value="$(supportClaw_live_trim "${1:-}")"
  [[ -n "$value" ]] || {
    echo "ERROR: empty auth path." >&2
    return 1
  }
  case "$value" in
    /* | *..* | *\\* | *:*)
      echo "ERROR: invalid auth path '$value'." >&2
      return 1
      ;;
  esac
  printf '%s' "$value"
}

supportClaw_live_normalize_auth_dir() {
  local value
  value="$(supportClaw_live_trim "${1:-}")"
  [[ -n "$value" ]] || return 1
  if [[ "$value" != .* ]]; then
    value=".$value"
  fi
  value="$(supportClaw_live_validate_relative_home_path "$value")" || return 1
  printf '%s' "$value"
}

supportClaw_live_should_include_auth_dir_for_provider() {
  local provider
  provider="$(supportClaw_live_trim "${1:-}")"
  case "$provider" in
    droid | factory | factory-droid)
      printf '%s\n' ".factory"
      ;;
    gemini | gemini-cli | google-gemini-cli)
      printf '%s\n' ".gemini"
      ;;
    minimax | minimax-portal)
      printf '%s\n' ".minimax"
      ;;
  esac
}

supportClaw_live_should_include_auth_file_for_provider() {
  local provider
  provider="$(supportClaw_live_trim "${1:-}")"
  case "$provider" in
    codex-cli | openai)
      printf '%s\n' ".codex/auth.json"
      printf '%s\n' ".codex/config.toml"
      ;;
    anthropic | claude-cli)
      printf '%s\n' ".claude.json"
      printf '%s\n' ".claude/.credentials.json"
      printf '%s\n' ".claude/settings.json"
      printf '%s\n' ".claude/settings.local.json"
      ;;
  esac
}

supportClaw_live_collect_auth_dirs_from_csv() {
  local raw="${1:-}"
  local token normalized
  [[ -n "$(supportClaw_live_trim "$raw")" ]] || return 0
  IFS=',' read -r -a tokens <<<"$raw"
  for token in "${tokens[@]}"; do
    while IFS= read -r normalized; do
      printf '%s\n' "$normalized"
    done < <(supportClaw_live_should_include_auth_dir_for_provider "$token")
  done | awk 'NF && !seen[$0]++'
}

supportClaw_live_collect_auth_dirs_from_override() {
  local raw token normalized
  raw="$(supportClaw_live_trim "${SUPPORT_CLAW_DOCKER_AUTH_DIRS:-}")"
  [[ -n "$raw" ]] || return 1
  case "$raw" in
    all)
      printf '%s\n' "${SUPPORT_CLAW_DOCKER_LIVE_AUTH_ALL[@]}"
      return 0
      ;;
    none)
      return 0
      ;;
  esac
  IFS=',' read -r -a tokens <<<"$raw"
  for token in "${tokens[@]}"; do
    normalized="$(supportClaw_live_normalize_auth_dir "$token")" || continue
    printf '%s\n' "$normalized"
  done | awk '!seen[$0]++'
  return 0
}

supportClaw_live_collect_auth_dirs() {
  if supportClaw_live_collect_auth_dirs_from_override; then
    return 0
  fi
  printf '%s\n' "${SUPPORT_CLAW_DOCKER_LIVE_AUTH_ALL[@]}"
}

supportClaw_live_collect_auth_files_from_csv() {
  local raw="${1:-}"
  local token normalized
  [[ -n "$(supportClaw_live_trim "$raw")" ]] || return 0
  IFS=',' read -r -a tokens <<<"$raw"
  for token in "${tokens[@]}"; do
    while IFS= read -r normalized; do
      printf '%s\n' "$normalized"
    done < <(supportClaw_live_should_include_auth_file_for_provider "$token")
  done | awk 'NF && !seen[$0]++'
}

supportClaw_live_collect_auth_files_from_override() {
  local raw
  raw="$(supportClaw_live_trim "${SUPPORT_CLAW_DOCKER_AUTH_DIRS:-}")"
  [[ -n "$raw" ]] || return 1
  case "$raw" in
    all)
      printf '%s\n' "${SUPPORT_CLAW_DOCKER_LIVE_AUTH_FILES_ALL[@]}"
      return 0
      ;;
    none)
      return 0
      ;;
  esac
  return 0
}

supportClaw_live_collect_auth_files() {
  if supportClaw_live_collect_auth_files_from_override; then
    return 0
  fi
  printf '%s\n' "${SUPPORT_CLAW_DOCKER_LIVE_AUTH_FILES_ALL[@]}"
}

supportClaw_live_join_csv() {
  local first=1 value
  for value in "$@"; do
    [[ -n "$value" ]] || continue
    if (( first )); then
      printf '%s' "$value"
      first=0
    else
      printf ',%s' "$value"
    fi
  done
}

supportClaw_live_append_array() {
  local target_array="${1:?target array required}"
  local source_array="${2:?source array required}"
  local count

  eval "count=\${#${source_array}[@]}"
  if ((count == 0)); then
    return 0
  fi
  eval "${target_array}+=(\"\${${source_array}[@]}\")"
}

supportClaw_live_timeout_bin() {
  if command -v timeout >/dev/null 2>&1; then
    printf '%s\n' timeout
  elif command -v gtimeout >/dev/null 2>&1; then
    printf '%s\n' gtimeout
  else
    return 1
  fi
}

supportClaw_live_timeout_supports_kill_after() {
  local timeout_bin="${1:?timeout binary required}"
  "$timeout_bin" --kill-after=1s 1s true >/dev/null 2>&1
}

supportClaw_live_resource_limits_disabled() {
  case "${SUPPORT_CLAW_LIVE_DOCKER_DISABLE_RESOURCE_LIMITS:-${SUPPORT_CLAW_DOCKER_E2E_DISABLE_RESOURCE_LIMITS:-}}" in
    1 | true | TRUE | yes | YES | on | ON)
      return 0
      ;;
  esac
  return 1
}

supportClaw_live_resource_value_disabled() {
  case "${1:-}" in
    "" | 0 | none | NONE | off | OFF | false | FALSE)
      return 0
      ;;
  esac
  return 1
}

supportClaw_live_resolve_pids_limit() {
  local env_name="$1"
  local pids_limit="$2"
  if [[ ! "$pids_limit" =~ ^[0-9]+$ ]] || (( 10#$pids_limit < 1 )); then
    echo "invalid $env_name: $pids_limit" >&2
    return 2
  fi
  printf '%s\n' "$((10#$pids_limit))"
}

supportClaw_live_detect_available_cpus() {
  if [ -n "${SUPPORT_CLAW_LIVE_DOCKER_AVAILABLE_CPUS:-${SUPPORT_CLAW_DOCKER_E2E_AVAILABLE_CPUS:-}}" ]; then
    printf '%s\n' "${SUPPORT_CLAW_LIVE_DOCKER_AVAILABLE_CPUS:-${SUPPORT_CLAW_DOCKER_E2E_AVAILABLE_CPUS:-}}"
    return 0
  fi
  if command -v nproc >/dev/null 2>&1; then
    nproc
    return 0
  fi
  if command -v getconf >/dev/null 2>&1; then
    getconf _NPROCESSORS_ONLN
    return 0
  fi
  return 1
}

supportClaw_live_resolve_cpus() {
  local requested="$1"
  local available=""
  available="$(supportClaw_live_detect_available_cpus 2>/dev/null || true)"
  if [[ "$requested" =~ ^[0-9]+$ ]] && [[ "$available" =~ ^[0-9]+$ ]] && [ "$requested" -gt "$available" ]; then
    printf '%s\n' "$available"
    return 0
  fi
  printf '%s\n' "$requested"
}

supportClaw_live_docker_run_resource_args() {
  local target_array="${1:?target array required}"
  eval "${target_array}=()"
  if supportClaw_live_resource_limits_disabled; then
    return 0
  fi

  local memory="${SUPPORT_CLAW_LIVE_DOCKER_MEMORY:-${SUPPORT_CLAW_DOCKER_E2E_MEMORY:-8g}}"
  local cpus="${SUPPORT_CLAW_LIVE_DOCKER_CPUS:-${SUPPORT_CLAW_DOCKER_E2E_CPUS:-16}}"
  local pids_limit="${SUPPORT_CLAW_LIVE_DOCKER_PIDS_LIMIT:-${SUPPORT_CLAW_DOCKER_E2E_PIDS_LIMIT:-2048}}"
  local pids_limit_env="SUPPORT_CLAW_LIVE_DOCKER_PIDS_LIMIT"
  if [ -z "${SUPPORT_CLAW_LIVE_DOCKER_PIDS_LIMIT:-}" ]; then
    pids_limit_env="SUPPORT_CLAW_DOCKER_E2E_PIDS_LIMIT"
  fi
  cpus="$(supportClaw_live_resolve_cpus "$cpus")"

  if ! supportClaw_live_resource_value_disabled "$memory"; then
    eval "${target_array}+=(--memory \"\$memory\")"
  fi
  if ! supportClaw_live_resource_value_disabled "$cpus"; then
    eval "${target_array}+=(--cpus \"\$cpus\")"
  fi
  if ! supportClaw_live_resource_value_disabled "$pids_limit"; then
    pids_limit="$(supportClaw_live_resolve_pids_limit "$pids_limit_env" "$pids_limit")" || return $?
    eval "${target_array}+=(--pids-limit \"\$pids_limit\")"
  fi
}

supportClaw_live_init_docker_run_args() {
  local target_array="${1:?target array required}"
  local timeout_value="${2:-${SUPPORT_CLAW_LIVE_DOCKER_RUN_TIMEOUT:-2700s}}"
  local resource_args=()
  local timeout_bin
  local quoted_timeout

  if ! timeout_bin="$(supportClaw_live_timeout_bin)"; then
    echo "timeout command not found; cannot bound live Docker run after ${timeout_value}" >&2
    return 127
  fi
  quoted_timeout="$(printf '%q' "$timeout_value")"
  if supportClaw_live_timeout_supports_kill_after "$timeout_bin"; then
    eval "${target_array}=(${timeout_bin} --kill-after=30s ${quoted_timeout} docker run)"
  else
    eval "${target_array}=(${timeout_bin} ${quoted_timeout} docker run)"
  fi
  supportClaw_live_docker_run_resource_args resource_args || return $?
  supportClaw_live_append_array "$target_array" resource_args
}

supportClaw_live_container_node_options() {
  local value
  value="$(supportClaw_live_trim "${SUPPORT_CLAW_DOCKER_NODE_OPTIONS:-${NODE_OPTIONS:-}}")"
  if [[ -z "$value" ]]; then
    value="--max-old-space-size=4096"
  fi

  case " $value " in
    *" --dns-result-order="*)
      ;;
    *)
      value="$value --dns-result-order=ipv4first"
      ;;
  esac

  case " $value " in
    *" --disable-warning=ExperimentalWarning "*)
      ;;
    *)
      value="$value --disable-warning=ExperimentalWarning"
      ;;
  esac

  printf '%s\n' "$value"
}

supportClaw_live_stage_auth_into_home() {
  local dest_home="${1:?destination home directory required}"
  shift

  local mode="dirs"
  local relative_path source_path dest_path

  mkdir -p "$dest_home"
  chmod u+rwx "$dest_home" || true

  while (($# > 0)); do
    case "$1" in
      --files)
        mode="files"
        shift
        continue
        ;;
    esac

    relative_path="$(supportClaw_live_validate_relative_home_path "$1")" || return 1
    source_path="$HOME/$relative_path"
    dest_path="$dest_home/$relative_path"

    if [[ "$mode" == "dirs" ]]; then
      if [[ -d "$source_path" ]]; then
        mkdir -p "$dest_path"
        cp -R "$source_path"/. "$dest_path"
        chmod -R u+rwX "$dest_path" || true
      fi
    else
      if [[ -f "$source_path" ]]; then
        mkdir -p "$(dirname "$dest_path")"
        cp "$source_path" "$dest_path"
        chmod u+rw "$dest_path" || true
      fi
    fi

    shift
  done
}

supportClaw_live_prepare_bind_dir_for_container_user() {
  local dir="${1:?directory required}"

  mkdir -p "$dir"
  chmod u+rwx "$dir" || true
}

supportClaw_live_stage_profile_into_home() {
  local dest_home="${1:?destination home directory required}"
  local profile_file="${2:?profile file required}"

  [[ -f "$profile_file" && -r "$profile_file" ]] || return 1
  mkdir -p "$dest_home"
  cp "$profile_file" "$dest_home/.profile"
  chmod u+rw "$dest_home/.profile" || true
}

supportClaw_live_chown_bind_dirs_for_container_user() {
  local image_name="${1:?image name required}"
  local container_user="${2:?container user required}"
  shift 2

  local mount_args=()
  local index=0
  local dir
  for dir in "$@"; do
    [[ -n "$dir" ]] || continue
    mkdir -p "$dir"
    mount_args+=(-v "$dir:/supportClaw-bind-dir-$index")
    index=$((index + 1))
  done
  ((index > 0)) || return 0

  local resource_args=()
  supportClaw_live_docker_run_resource_args resource_args || return $?

  docker run --rm \
    "${resource_args[@]}" \
    -u 0:0 \
    --entrypoint sh \
    -e SUPPORT_CLAW_BIND_DIR_USER="$container_user" \
    "${mount_args[@]}" \
    "$image_name" \
    -c 'for dir in /supportClaw-bind-dir-*; do chown -R "$SUPPORT_CLAW_BIND_DIR_USER" "$dir"; done'
}
