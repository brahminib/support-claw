// Matrix API module exposes the plugin public contract.
export {
  DEFAULT_ACCOUNT_ID,
  normalizeAccountId,
  normalizeOptionalAccountId,
} from "supportClaw/plugin-sdk/account-id";
export {
  createActionGate,
  jsonResult,
  readNumberParam,
  readPositiveIntegerParam,
  readReactionParams,
  readStringArrayParam,
  readStringParam,
  ToolAuthorizationError,
} from "supportClaw/plugin-sdk/channel-actions";
export { buildChannelConfigSchema } from "supportClaw/plugin-sdk/channel-config-primitives";
export type { ChannelPlugin } from "supportClaw/plugin-sdk/channel-core";
export type {
  BaseProbeResult,
  ChannelDirectoryEntry,
  ChannelGroupContext,
  ChannelMessageActionAdapter,
  ChannelMessageActionContext,
  ChannelMessageActionName,
  ChannelMessageToolDiscovery,
  ChannelOutboundAdapter,
  ChannelResolveKind,
  ChannelResolveResult,
  ChannelToolSend,
} from "supportClaw/plugin-sdk/channel-contract";
export {
  formatLocationText,
  toLocationContext,
  type NormalizedLocation,
} from "supportClaw/plugin-sdk/channel-inbound";
export { logInboundDrop } from "supportClaw/plugin-sdk/channel-inbound";
export { logTypingFailure } from "supportClaw/plugin-sdk/channel-outbound";
export { resolveAckReaction } from "supportClaw/plugin-sdk/channel-feedback";
export type { ChannelSetupInput } from "supportClaw/plugin-sdk/setup";
export type {
  SupportClawConfig,
  ContextVisibilityMode,
  DmPolicy,
  GroupPolicy,
} from "supportClaw/plugin-sdk/config-contracts";
export type { GroupToolPolicyConfig } from "supportClaw/plugin-sdk/config-contracts";
export type { WizardPrompter } from "supportClaw/plugin-sdk/setup";
export type { SecretInput } from "supportClaw/plugin-sdk/secret-input";
export {
  GROUP_POLICY_BLOCKED_LABEL,
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "supportClaw/plugin-sdk/runtime-group-policy";
export {
  addWildcardAllowFrom,
  formatDocsLink,
  hasConfiguredSecretInput,
  mergeAllowFromEntries,
  moveSingleAccountChannelSectionToDefaultAccount,
  promptAccountId,
  promptChannelAccessConfig,
  splitSetupEntries,
} from "supportClaw/plugin-sdk/setup";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export {
  assertHttpUrlTargetsPrivateNetwork,
  closeDispatcher,
  createPinnedDispatcher,
  isPrivateOrLoopbackHost,
  resolvePinnedHostnameWithPolicy,
  ssrfPolicyFromDangerouslyAllowPrivateNetwork,
  ssrfPolicyFromAllowPrivateNetwork,
  type LookupFn,
  type SsrFPolicy,
} from "supportClaw/plugin-sdk/ssrf-runtime";
export { dispatchReplyFromConfigWithSettledDispatcher } from "supportClaw/plugin-sdk/channel-inbound";
export {
  ensureConfiguredAcpBindingReady,
  resolveConfiguredAcpBindingRecord,
} from "supportClaw/plugin-sdk/acp-binding-runtime";
export {
  buildProbeChannelStatusSummary,
  collectStatusIssuesFromLastError,
  PAIRING_APPROVED_MESSAGE,
} from "supportClaw/plugin-sdk/channel-status";
export {
  getSessionBindingService,
  resolveThreadBindingIdleTimeoutMsForChannel,
  resolveThreadBindingMaxAgeMsForChannel,
} from "supportClaw/plugin-sdk/conversation-runtime";
export { resolveOutboundSendDep } from "supportClaw/plugin-sdk/channel-outbound";
export { resolveAgentIdFromSessionKey } from "supportClaw/plugin-sdk/routing";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
export { createChannelMessageReplyPipeline } from "supportClaw/plugin-sdk/channel-outbound";
export { loadOutboundMediaFromUrl } from "supportClaw/plugin-sdk/outbound-media";
export { normalizePollInput, type PollInput } from "supportClaw/plugin-sdk/poll-runtime";
export { writeJsonFileAtomically } from "supportClaw/plugin-sdk/json-store";
export {
  buildChannelKeyCandidates,
  resolveChannelEntryMatch,
} from "supportClaw/plugin-sdk/channel-targets";
export { buildTimeoutAbortSignal } from "./matrix/sdk/timeout-abort-signal.js";
export { formatZonedTimestamp } from "supportClaw/plugin-sdk/time-runtime";
export type { PluginRuntime, RuntimeLogger } from "supportClaw/plugin-sdk/plugin-runtime";
export type { ReplyPayload } from "supportClaw/plugin-sdk/reply-runtime";
// resolveMatrixAccountStringValues already comes from the Matrix API barrel.
// Re-exporting auth-precedence here makes TS source loaders define the export twice.
