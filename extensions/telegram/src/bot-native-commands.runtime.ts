// Telegram plugin module implements bot native commands behavior.
export {
  ensureConfiguredBindingRouteReady,
  recordInboundSessionMetaSafe,
} from "supportClaw/plugin-sdk/conversation-runtime";
export { getAgentScopedMediaLocalRoots } from "supportClaw/plugin-sdk/media-runtime";
export {
  executePluginCommand,
  getPluginCommandSpecs,
  matchPluginCommand,
} from "supportClaw/plugin-sdk/plugin-runtime";
export {
  finalizeInboundContext,
  resolveChunkMode,
} from "supportClaw/plugin-sdk/reply-dispatch-runtime";
export { resolveThreadSessionKeys } from "supportClaw/plugin-sdk/routing";
export { getSessionEntry } from "supportClaw/plugin-sdk/session-store-runtime";
