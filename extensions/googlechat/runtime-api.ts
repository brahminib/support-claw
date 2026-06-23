// Private runtime barrel for the bundled Google Chat extension.
// Keep this barrel thin and avoid broad plugin-sdk surfaces during bootstrap.

export { DEFAULT_ACCOUNT_ID } from "supportClaw/plugin-sdk/account-id";
export {
  createActionGate,
  jsonResult,
  readNumberParam,
  readReactionParams,
  readStringParam,
} from "supportClaw/plugin-sdk/channel-actions";
export { buildChannelConfigSchema } from "supportClaw/plugin-sdk/channel-config-primitives";
export type {
  ChannelMessageActionAdapter,
  ChannelMessageActionName,
  ChannelStatusIssue,
} from "supportClaw/plugin-sdk/channel-contract";
export { missingTargetError } from "supportClaw/plugin-sdk/channel-feedback";
export {
  createAccountStatusSink,
  runPassiveAccountLifecycle,
} from "supportClaw/plugin-sdk/channel-outbound";
export { createChannelPairingController } from "supportClaw/plugin-sdk/channel-pairing";
export { createChannelMessageReplyPipeline } from "supportClaw/plugin-sdk/channel-outbound";
export { PAIRING_APPROVED_MESSAGE } from "supportClaw/plugin-sdk/channel-status";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
export { GoogleChatConfigSchema } from "supportClaw/plugin-sdk/bundled-channel-config-schema";
export {
  GROUP_POLICY_BLOCKED_LABEL,
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "supportClaw/plugin-sdk/runtime-group-policy";
export { isDangerousNameMatchingEnabled } from "supportClaw/plugin-sdk/dangerous-name-runtime";
export {
  readRemoteMediaBuffer,
  resolveChannelMediaMaxBytes,
} from "supportClaw/plugin-sdk/media-runtime";
export { loadOutboundMediaFromUrl } from "supportClaw/plugin-sdk/outbound-media";
export type { PluginRuntime } from "supportClaw/plugin-sdk/runtime-store";
export { fetchWithSsrFGuard } from "supportClaw/plugin-sdk/ssrf-runtime";
export type {
  GoogleChatAccountConfig,
  GoogleChatConfig,
} from "supportClaw/plugin-sdk/config-contracts";
export { extractToolSend } from "supportClaw/plugin-sdk/tool-send";
export { resolveInboundMentionDecision } from "supportClaw/plugin-sdk/channel-inbound";
export { resolveInboundRouteEnvelopeBuilderWithRuntime } from "supportClaw/plugin-sdk/inbound-envelope";
export { resolveWebhookPath } from "supportClaw/plugin-sdk/webhook-ingress";
export {
  registerWebhookTargetWithPluginRoute,
  resolveWebhookTargetWithAuthOrReject,
  withResolvedWebhookRequestPipeline,
} from "supportClaw/plugin-sdk/webhook-targets";
export {
  createWebhookInFlightLimiter,
  readJsonWebhookBodyOrReject,
  type WebhookInFlightLimiter,
} from "supportClaw/plugin-sdk/webhook-request-guards";
export { setGoogleChatRuntime } from "./src/runtime.js";
