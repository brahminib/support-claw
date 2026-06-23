// Narrow Matrix monitor helper seam.
// Keep monitor internals off the broad package runtime-api barrel so monitor
// tests and shared workers do not pull unrelated Matrix helper surfaces.

export type { NormalizedLocation } from "supportClaw/plugin-sdk/channel-inbound";
export type { PluginRuntime, RuntimeLogger } from "supportClaw/plugin-sdk/plugin-runtime";
export type { BlockReplyContext, ReplyPayload } from "supportClaw/plugin-sdk/reply-runtime";
export type { MarkdownTableMode, SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export {
  addAllowlistUserEntriesFromConfigEntry,
  buildAllowlistResolutionSummary,
  canonicalizeAllowlistWithResolvedIds,
  formatAllowlistMatchMeta,
  patchAllowlistUsersInConfigEntries,
  summarizeMapping,
} from "supportClaw/plugin-sdk/allow-from";
export {
  createReplyPrefixOptions,
  createTypingCallbacks,
} from "supportClaw/plugin-sdk/channel-outbound";
export { formatLocationText, toLocationContext } from "supportClaw/plugin-sdk/channel-inbound";
export { getAgentScopedMediaLocalRoots } from "supportClaw/plugin-sdk/agent-media-payload";
export { logInboundDrop } from "supportClaw/plugin-sdk/channel-inbound";
export { logTypingFailure } from "supportClaw/plugin-sdk/channel-outbound";
export {
  buildChannelKeyCandidates,
  resolveChannelEntryMatch,
} from "supportClaw/plugin-sdk/channel-targets";
