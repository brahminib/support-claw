// Mattermost API module exposes the plugin public contract.
export type {
  BaseProbeResult,
  ChannelAccountSnapshot,
  ChannelDirectoryEntry,
  ChatType,
  HistoryEntry,
  SupportClawConfig,
  SupportClawPluginApi,
  ReplyPayload,
} from "supportClaw/plugin-sdk/core";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export { buildAgentMediaPayload } from "supportClaw/plugin-sdk/agent-media-payload";
export { resolveAllowlistMatchSimple } from "supportClaw/plugin-sdk/allow-from";
export { logInboundDrop } from "supportClaw/plugin-sdk/channel-inbound";
export { createChannelPairingController } from "supportClaw/plugin-sdk/channel-pairing";
export { createChannelMessageReplyPipeline } from "supportClaw/plugin-sdk/channel-outbound";
export { logTypingFailure } from "supportClaw/plugin-sdk/channel-feedback";
export {
  listSkillCommandsForAgents,
  resolveControlCommandGate,
} from "supportClaw/plugin-sdk/command-auth-native";
export { buildModelsProviderData } from "supportClaw/plugin-sdk/models-provider-runtime";
export { isDangerousNameMatchingEnabled } from "supportClaw/plugin-sdk/dangerous-name-runtime";
export {
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "supportClaw/plugin-sdk/runtime-group-policy";
export { resolveChannelMediaMaxBytes } from "supportClaw/plugin-sdk/media-runtime";
export { loadOutboundMediaFromUrl } from "supportClaw/plugin-sdk/outbound-media";
// Legacy map-helper exports stay for older plugin consumers. New message-turn
// code should use createChannelHistoryWindow.
export {
  DEFAULT_GROUP_HISTORY_LIMIT,
  createChannelHistoryWindow,
  buildInboundHistoryFromMap,
  buildPendingHistoryContextFromMap,
  recordPendingHistoryEntryIfEnabled,
} from "supportClaw/plugin-sdk/reply-history";
export { registerPluginHttpRoute } from "supportClaw/plugin-sdk/webhook-targets";
export {
  isRequestBodyLimitError,
  readRequestBodyWithLimit,
} from "supportClaw/plugin-sdk/webhook-ingress";
export {
  isTrustedProxyAddress,
  parseStrictPositiveInteger,
  resolveClientIp,
} from "supportClaw/plugin-sdk/core";
export { parseTcpPort } from "supportClaw/plugin-sdk/number-runtime";
