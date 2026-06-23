#!/usr/bin/env bash
# Runs a deterministic packaged Gateway/code-mode/MCP smoke using the Docker
# functional image and the local mock OpenAI Responses server.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
source "$ROOT_DIR/scripts/lib/docker-e2e-image.sh"

IMAGE_NAME="$(docker_e2e_resolve_image "supportClaw-mcp-code-mode-gateway-e2e" SUPPORT_CLAW_IMAGE)"
PORT="$(docker_e2e_read_tcp_port_env SUPPORT_CLAW_MCP_CODE_MODE_GATEWAY_PORT 18789)"
MOCK_PORT="$(docker_e2e_read_tcp_port_env SUPPORT_CLAW_MCP_CODE_MODE_MOCK_PORT 44082)"
CLIENT_TIMEOUT_MS="$(docker_e2e_read_positive_int_env SUPPORT_CLAW_MCP_CODE_MODE_CLIENT_TIMEOUT_MS 300000)"
CLIENT_BODY_MAX_BYTES="$(docker_e2e_read_positive_int_env SUPPORT_CLAW_MCP_CODE_MODE_CLIENT_BODY_MAX_BYTES 1048576)"
TOKEN="mcp-code-mode-e2e-$(date +%s)-$$"
CONTAINER_NAME="supportClaw-mcp-code-mode-e2e-$$"

CLIENT_LOG="$(mktemp -t supportClaw-mcp-code-mode-client-log.XXXXXX)"

cleanup() {
  docker_e2e_docker_cmd rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
  rm -f "$CLIENT_LOG"
}
trap cleanup EXIT

docker_e2e_build_or_reuse "$IMAGE_NAME" mcp-code-mode-gateway
SUPPORT_CLAW_TEST_STATE_SCRIPT_B64="$(docker_e2e_test_state_shell_b64 mcp-code-mode-gateway empty)"

echo "Running in-container deterministic Gateway code-mode MCP API-file smoke..."
set +e
docker_e2e_run_with_harness \
  --name "$CONTAINER_NAME" \
  -e "SUPPORT_CLAW_GATEWAY_TOKEN=$TOKEN" \
  -e "SUPPORT_CLAW_SKIP_CHANNELS=1" \
  -e "SUPPORT_CLAW_SKIP_GMAIL_WATCHER=1" \
  -e "SUPPORT_CLAW_SKIP_CRON=1" \
  -e "SUPPORT_CLAW_SKIP_CANVAS_HOST=1" \
  -e "SUPPORT_CLAW_SKIP_ACPX_RUNTIME=1" \
  -e "SUPPORT_CLAW_SKIP_ACPX_RUNTIME_PROBE=1" \
  -e "SUPPORT_CLAW_TEST_STATE_SCRIPT_B64=$SUPPORT_CLAW_TEST_STATE_SCRIPT_B64" \
  -e "GW_URL=http://127.0.0.1:$PORT" \
  -e "GW_TOKEN=$TOKEN" \
  -e "SUPPORT_CLAW_MCP_CODE_MODE_CLIENT_TIMEOUT_MS=$CLIENT_TIMEOUT_MS" \
  -e "SUPPORT_CLAW_MCP_CODE_MODE_CLIENT_BODY_MAX_BYTES=$CLIENT_BODY_MAX_BYTES" \
  -e "SUPPORT_CLAW_ALLOW_INSECURE_PRIVATE_WS=1" \
  "$IMAGE_NAME" \
  bash -lc "set -euo pipefail
    source scripts/lib/supportClaw-e2e-instance.sh
    supportClaw_e2e_eval_test_state_from_b64 \"\${SUPPORT_CLAW_TEST_STATE_SCRIPT_B64:?missing SUPPORT_CLAW_TEST_STATE_SCRIPT_B64}\"
    entry=\"\$(supportClaw_e2e_resolve_entrypoint)\"
    export SUPPORT_CLAW_DOCKER_OPENAI_BASE_URL=\"http://127.0.0.1:$MOCK_PORT/v1\"
    mock_pid=\"\$(supportClaw_e2e_start_mock_openai \"$MOCK_PORT\" /tmp/mcp-code-mode-mock-openai.log)\"
    gateway_pid=
    cleanup_inner() {
      supportClaw_e2e_stop_process \"\${gateway_pid:-}\"
      supportClaw_e2e_stop_process \"\${mock_pid:-}\"
    }
    dump_logs_on_error() {
      status=\$?
      if [ \"\$status\" -ne 0 ]; then
        supportClaw_e2e_dump_logs \
          /tmp/mcp-code-mode-gateway.log \
          /tmp/mcp-code-mode-seed.log \
          /tmp/mcp-code-mode-mock-openai.log
      fi
      cleanup_inner
      exit \"\$status\"
    }
    trap cleanup_inner EXIT
    trap dump_logs_on_error ERR
    supportClaw_e2e_wait_mock_openai \"$MOCK_PORT\"
    tsx scripts/e2e/mcp-code-mode-gateway-seed.ts >/tmp/mcp-code-mode-seed.log
    gateway_pid=\"\$(supportClaw_e2e_start_gateway \"\$entry\" $PORT /tmp/mcp-code-mode-gateway.log)\"
    supportClaw_e2e_wait_gateway_ready \"\$gateway_pid\" /tmp/mcp-code-mode-gateway.log 480 $PORT
    tsx scripts/e2e/mcp-code-mode-gateway-client.ts
  " >"$CLIENT_LOG" 2>&1
status=${PIPESTATUS[0]}
set -e

if [ "$status" -ne 0 ]; then
  echo "Docker MCP code-mode API-file smoke failed"
  docker_e2e_print_log "$CLIENT_LOG"
  exit "$status"
fi

docker_e2e_print_log "$CLIENT_LOG"
echo "OK"
