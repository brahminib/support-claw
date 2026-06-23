// Private runtime barrel for the bundled Microsoft Teams extension.
// Keep this barrel thin and aligned with the local extension surface.

export { DEFAULT_ACCOUNT_ID } from "supportClaw/plugin-sdk/account-id";
export type { AllowlistMatch } from "supportClaw/plugin-sdk/allow-from";
export {
  mergeAllowlist,
  resolveAllowlistMatchSimple,
  summarizeMapping,
} from "supportClaw/plugin-sdk/allow-from";
export type {
  BaseProbeResult,
  ChannelDirectoryEntry,
  ChannelGroupContext,
  ChannelMessageActionName,
  ChannelOutboundAdapter,
} from "supportClaw/plugin-sdk/channel-contract";
export type { ChannelPlugin } from "supportClaw/plugin-sdk/channel-core";
export { logTypingFailure } from "supportClaw/plugin-sdk/channel-outbound";
export { createChannelPairingController } from "supportClaw/plugin-sdk/channel-pairing";
export { resolveToolsBySender } from "supportClaw/plugin-sdk/channel-policy";
export { createChannelMessageReplyPipeline } from "supportClaw/plugin-sdk/channel-outbound";
export {
  PAIRING_APPROVED_MESSAGE,
  buildProbeChannelStatusSummary,
  createDefaultChannelRuntimeState,
} from "supportClaw/plugin-sdk/channel-status";
export {
  buildChannelKeyCandidates,
  normalizeChannelSlug,
  resolveChannelEntryMatchWithFallback,
  resolveNestedAllowlistDecision,
} from "supportClaw/plugin-sdk/channel-targets";
export type {
  GroupPolicy,
  GroupToolPolicyConfig,
  MSTeamsChannelConfig,
  MSTeamsCloudName,
  MSTeamsConfig,
  MSTeamsReplyStyle,
  MSTeamsTeamConfig,
  MarkdownTableMode,
  SupportClawConfig,
} from "supportClaw/plugin-sdk/config-contracts";
export { isDangerousNameMatchingEnabled } from "supportClaw/plugin-sdk/dangerous-name-runtime";
export { resolveDefaultGroupPolicy } from "supportClaw/plugin-sdk/runtime-group-policy";
export { withFileLock } from "supportClaw/plugin-sdk/file-lock";
export { keepHttpServerTaskAlive } from "supportClaw/plugin-sdk/channel-outbound";
export {
  detectMime,
  extensionForMime,
  extractOriginalFilename,
  getFileExtension,
  resolveChannelMediaMaxBytes,
} from "supportClaw/plugin-sdk/media-runtime";
export { dispatchReplyFromConfigWithSettledDispatcher } from "supportClaw/plugin-sdk/channel-inbound";
export { loadOutboundMediaFromUrl } from "supportClaw/plugin-sdk/outbound-media";
export { buildMediaPayload } from "supportClaw/plugin-sdk/reply-payload";
export type { ReplyPayload } from "supportClaw/plugin-sdk/reply-payload";
export type { PluginRuntime } from "supportClaw/plugin-sdk/runtime-store";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export type { SsrFPolicy } from "supportClaw/plugin-sdk/ssrf-runtime";
export { fetchWithSsrFGuard } from "supportClaw/plugin-sdk/ssrf-runtime";
export { normalizeStringEntries } from "supportClaw/plugin-sdk/string-normalization-runtime";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
export { DEFAULT_WEBHOOK_MAX_BODY_BYTES } from "supportClaw/plugin-sdk/webhook-ingress";
export { setMSTeamsRuntime } from "./src/runtime.js";
