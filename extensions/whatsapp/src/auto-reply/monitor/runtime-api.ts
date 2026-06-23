// Whatsapp API module exposes the plugin public contract.
export { resolveIdentityNamePrefix } from "supportClaw/plugin-sdk/agent-runtime";
export { formatInboundEnvelope } from "supportClaw/plugin-sdk/channel-inbound";
export { resolveInboundSessionEnvelopeContext } from "supportClaw/plugin-sdk/channel-inbound";
export { toLocationContext } from "supportClaw/plugin-sdk/channel-inbound";
export {
  createChannelMessageReplyPipeline,
  resolveChannelMessageSourceReplyDeliveryMode,
} from "supportClaw/plugin-sdk/channel-outbound";
export {
  isControlCommandMessage,
  shouldComputeCommandAuthorized,
} from "supportClaw/plugin-sdk/command-detection";
export { resolveChannelContextVisibilityMode } from "../config.runtime.js";
export { getAgentScopedMediaLocalRoots } from "supportClaw/plugin-sdk/media-runtime";
export type LoadConfigFn = typeof import("../config.runtime.js").getRuntimeConfig;
export {
  buildHistoryContextFromEntries,
  type HistoryEntry,
} from "supportClaw/plugin-sdk/reply-history";
export { resolveSendableOutboundReplyParts } from "supportClaw/plugin-sdk/reply-payload";
export {
  dispatchReplyWithBufferedBlockDispatcher,
  finalizeInboundContext,
  resolveChunkMode,
  resolveTextChunkLimit,
  type getReplyFromConfig,
  type ReplyPayload,
} from "supportClaw/plugin-sdk/reply-runtime";
export {
  resolveInboundLastRouteSessionKey,
  type resolveAgentRoute,
} from "supportClaw/plugin-sdk/routing";
export { logVerbose, shouldLogVerbose, type getChildLogger } from "supportClaw/plugin-sdk/runtime-env";
export { resolvePinnedMainDmOwnerFromAllowlist } from "supportClaw/plugin-sdk/security-runtime";
export { resolveMarkdownTableMode } from "supportClaw/plugin-sdk/markdown-table-runtime";
export { jidToE164, normalizeE164 } from "../../text-runtime.js";
