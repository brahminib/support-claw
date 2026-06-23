// Private runtime barrel for the bundled Mattermost extension.
// Keep this barrel thin and generic-only.

export type {
  BaseProbeResult,
  ChannelAccountSnapshot,
  ChannelDirectoryEntry,
  ChannelGroupContext,
  ChannelMessageActionName,
  ChannelPlugin,
  ChatType,
  HistoryEntry,
  SupportClawConfig,
  SupportClawPluginApi,
  PluginRuntime,
} from "supportClaw/plugin-sdk/core";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export type { ReplyPayload } from "supportClaw/plugin-sdk/reply-runtime";
export type { ModelsProviderData } from "supportClaw/plugin-sdk/models-provider-runtime";
export type {
  BlockStreamingCoalesceConfig,
  DmPolicy,
  GroupPolicy,
} from "supportClaw/plugin-sdk/config-contracts";
export {
  DEFAULT_ACCOUNT_ID,
  buildChannelConfigSchema,
  createDedupeCache,
  parseStrictPositiveInteger,
  resolveClientIp,
  isTrustedProxyAddress,
} from "supportClaw/plugin-sdk/core";
export { buildComputedAccountStatusSnapshot } from "supportClaw/plugin-sdk/channel-status";
export { createAccountStatusSink } from "supportClaw/plugin-sdk/channel-outbound";
export { buildAgentMediaPayload } from "supportClaw/plugin-sdk/agent-media-payload";
export {
  listSkillCommandsForAgents,
  resolveControlCommandGate,
  resolveStoredModelOverride,
} from "supportClaw/plugin-sdk/command-auth-native";
export { buildModelsProviderData } from "supportClaw/plugin-sdk/models-provider-runtime";
export {
  GROUP_POLICY_BLOCKED_LABEL,
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "supportClaw/plugin-sdk/runtime-group-policy";
export { isDangerousNameMatchingEnabled } from "supportClaw/plugin-sdk/dangerous-name-runtime";
export { loadSessionStore, resolveStorePath } from "supportClaw/plugin-sdk/session-store-runtime";
export { formatInboundFromLabel } from "supportClaw/plugin-sdk/channel-inbound";
export { logInboundDrop } from "supportClaw/plugin-sdk/channel-inbound";
export { createChannelPairingController } from "supportClaw/plugin-sdk/channel-pairing";
export { createChannelMessageReplyPipeline } from "supportClaw/plugin-sdk/channel-outbound";
export { logTypingFailure } from "supportClaw/plugin-sdk/channel-feedback";
export { loadOutboundMediaFromUrl } from "supportClaw/plugin-sdk/outbound-media";
export { rawDataToString } from "supportClaw/plugin-sdk/webhook-ingress";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
// Legacy map-helper exports stay for older plugin consumers. New message-turn
// code should use createChannelHistoryWindow.
export {
  DEFAULT_GROUP_HISTORY_LIMIT,
  createChannelHistoryWindow,
  buildPendingHistoryContextFromMap,
  clearHistoryEntriesIfEnabled,
  recordPendingHistoryEntryIfEnabled,
} from "supportClaw/plugin-sdk/reply-history";
export { normalizeAccountId, resolveThreadSessionKeys } from "supportClaw/plugin-sdk/routing";
export { resolveAllowlistMatchSimple } from "supportClaw/plugin-sdk/allow-from";
export { registerPluginHttpRoute } from "supportClaw/plugin-sdk/webhook-targets";
export {
  isRequestBodyLimitError,
  readRequestBodyWithLimit,
} from "supportClaw/plugin-sdk/webhook-ingress";
export {
  applyAccountNameToChannelSection,
  applySetupAccountConfigPatch,
  migrateBaseNameToDefaultAccount,
} from "supportClaw/plugin-sdk/setup";
export {
  getAgentScopedMediaLocalRoots,
  resolveChannelMediaMaxBytes,
} from "supportClaw/plugin-sdk/media-runtime";
export { normalizeProviderId } from "supportClaw/plugin-sdk/provider-model-shared";
export { setMattermostRuntime } from "./src/runtime.js";
