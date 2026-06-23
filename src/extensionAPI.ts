/**
 * @deprecated Legacy compat surface for plugins that still import
 * supportClaw/extension-api. Use the injected plugin runtime or focused
 * supportClaw/plugin-sdk subpaths instead.
 */

const shouldWarnExtensionApiImport =
  process.env.VITEST !== "true" &&
  process.env.NODE_ENV !== "test" &&
  process.env.SUPPORT_CLAW_SUPPRESS_EXTENSION_API_WARNING !== "1";

if (shouldWarnExtensionApiImport) {
  process.emitWarning(
    "supportClaw/extension-api is deprecated. Migrate to api.runtime.agent.* or focused supportClaw/plugin-sdk/<subpath> imports. See https://docs.supportClaw.ai/plugins/sdk-migration",
    {
      code: "SUPPORT_CLAW_EXTENSION_API_DEPRECATED",
      detail:
        "This compatibility bridge is temporary. Bundled plugins should use the injected plugin runtime instead of importing host-side agent helpers directly. Migration guide: https://docs.supportClaw.ai/plugins/sdk-migration",
    },
  );
}

export { resolveAgentDir, resolveAgentWorkspaceDir } from "./agents/agent-scope.js";
export { DEFAULT_MODEL, DEFAULT_PROVIDER } from "./agents/defaults.js";
export { resolveAgentIdentity } from "./agents/identity.js";
export { resolveThinkingDefault } from "./agents/model-selection.js";
export {
  runEmbeddedAgent,
  /** @deprecated Use runEmbeddedAgent. */
  runEmbeddedAgent as runEmbeddedPiAgent,
} from "./agents/embedded-agent.js";
export { resolveAgentTimeoutMs } from "./agents/timeout.js";
export { ensureAgentWorkspace } from "./agents/workspace.js";
export {
  resolveStorePath,
  loadSessionStore,
  saveSessionStore,
  updateSessionStore,
  updateSessionStoreEntry,
  resolveSessionFilePath,
} from "./config/sessions.js";
