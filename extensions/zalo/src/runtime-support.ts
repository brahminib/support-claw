// Zalo plugin module implements runtime support behavior.
export type { ReplyPayload } from "supportClaw/plugin-sdk/reply-runtime";
export type { SupportClawConfig, GroupPolicy } from "supportClaw/plugin-sdk/config-contracts";
export type { MarkdownTableMode } from "supportClaw/plugin-sdk/config-contracts";
export type { BaseTokenResolution } from "supportClaw/plugin-sdk/channel-contract";
export type {
  BaseProbeResult,
  ChannelAccountSnapshot,
  ChannelMessageActionAdapter,
  ChannelMessageActionName,
  ChannelStatusIssue,
} from "supportClaw/plugin-sdk/channel-contract";
export type { SecretInput } from "supportClaw/plugin-sdk/secret-input";
export type { ChannelPlugin, PluginRuntime, WizardPrompter } from "supportClaw/plugin-sdk/core";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export type { OutboundReplyPayload } from "supportClaw/plugin-sdk/reply-payload";
export {
  DEFAULT_ACCOUNT_ID,
  buildChannelConfigSchema,
  createDedupeCache,
  formatPairingApproveHint,
  jsonResult,
  normalizeAccountId,
  readStringParam,
  resolveClientIp,
} from "supportClaw/plugin-sdk/core";
export {
  applyAccountNameToChannelSection,
  applySetupAccountConfigPatch,
  buildSingleChannelSecretPromptState,
  mergeAllowFromEntries,
  migrateBaseNameToDefaultAccount,
  promptSingleChannelSecretInput,
  runSingleChannelSecretStep,
  setTopLevelChannelDmPolicyWithAllowFrom,
} from "supportClaw/plugin-sdk/setup";
export {
  buildSecretInputSchema,
  hasConfiguredSecretInput,
  normalizeResolvedSecretInputString,
  normalizeSecretInputString,
} from "supportClaw/plugin-sdk/secret-input";
export {
  buildTokenChannelStatusSummary,
  PAIRING_APPROVED_MESSAGE,
} from "supportClaw/plugin-sdk/channel-status";
export { buildBaseAccountStatusSnapshot } from "supportClaw/plugin-sdk/status-helpers";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
export {
  formatAllowFromLowercase,
  isNormalizedSenderAllowed,
} from "supportClaw/plugin-sdk/allow-from";
export { addWildcardAllowFrom } from "supportClaw/plugin-sdk/setup";
export { resolveOpenProviderRuntimeGroupPolicy } from "supportClaw/plugin-sdk/runtime-group-policy";
export {
  warnMissingProviderGroupPolicyFallbackOnce,
  resolveDefaultGroupPolicy,
} from "supportClaw/plugin-sdk/runtime-group-policy";
export { createChannelPairingController } from "supportClaw/plugin-sdk/channel-pairing";
export { createChannelMessageReplyPipeline } from "supportClaw/plugin-sdk/channel-outbound";
export { logTypingFailure } from "supportClaw/plugin-sdk/channel-feedback";
export {
  deliverTextOrMediaReply,
  isNumericTargetId,
  sendPayloadWithChunkedTextAndMedia,
} from "supportClaw/plugin-sdk/reply-payload";
export { resolveInboundRouteEnvelopeBuilderWithRuntime } from "supportClaw/plugin-sdk/inbound-envelope";
export { waitForAbortSignal } from "supportClaw/plugin-sdk/runtime";
export {
  applyBasicWebhookRequestGuards,
  createFixedWindowRateLimiter,
  createWebhookAnomalyTracker,
  readJsonWebhookBodyOrReject,
  registerPluginHttpRoute,
  registerWebhookTarget,
  registerWebhookTargetWithPluginRoute,
  resolveWebhookPath,
  resolveWebhookTargetWithAuthOrRejectSync,
  WEBHOOK_ANOMALY_COUNTER_DEFAULTS,
  WEBHOOK_RATE_LIMIT_DEFAULTS,
  withResolvedWebhookRequestPipeline,
} from "supportClaw/plugin-sdk/webhook-ingress";
export type {
  RegisterWebhookPluginRouteOptions,
  RegisterWebhookTargetOptions,
} from "supportClaw/plugin-sdk/webhook-ingress";
