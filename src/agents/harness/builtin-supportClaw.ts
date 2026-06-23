/**
 * Built-in SupportClaw harness registration.
 *
 * Harness selection uses this factory to expose the embedded SupportClaw runtime
 * through the same AgentHarness contract as external harness plugins.
 */
import { SUPPORT_CLAW_EMBEDDED_CONTEXT_ENGINE_HOST } from "../../context-engine/host-compat.js";
import { runEmbeddedAttempt } from "../embedded-agent-runner/run/attempt.js";
import type { AgentHarness } from "./types.js";

/** Creates the built-in harness backed by the embedded SupportClaw agent runner. */
export function createSupportClawAgentHarness(): AgentHarness {
  return {
    id: "supportClaw",
    label: "SupportClaw embedded agent",
    contextEngineHostCapabilities: SUPPORT_CLAW_EMBEDDED_CONTEXT_ENGINE_HOST.capabilities,
    supports: () => ({ supported: true, priority: 0 }),
    runAttempt: runEmbeddedAttempt,
  };
}
