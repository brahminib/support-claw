// Private runtime barrel for the bundled IRC extension.
// Keep this barrel thin and generic-only.

export type { BaseProbeResult } from "supportClaw/plugin-sdk/channel-contract";
export type { ChannelPlugin } from "supportClaw/plugin-sdk/channel-core";
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
export type { PluginRuntime } from "supportClaw/plugin-sdk/runtime-store";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export type {
  BlockStreamingCoalesceConfig,
  DmConfig,
  DmPolicy,
  GroupPolicy,
  GroupToolPolicyBySenderConfig,
  GroupToolPolicyConfig,
  MarkdownConfig,
} from "supportClaw/plugin-sdk/config-contracts";
export type { OutboundReplyPayload } from "supportClaw/plugin-sdk/reply-payload";
export { DEFAULT_ACCOUNT_ID } from "supportClaw/plugin-sdk/account-id";
export { buildChannelConfigSchema } from "supportClaw/plugin-sdk/channel-config-primitives";
export {
  PAIRING_APPROVED_MESSAGE,
  buildBaseChannelStatusSummary,
} from "supportClaw/plugin-sdk/channel-status";
export { createChannelPairingController } from "supportClaw/plugin-sdk/channel-pairing";
export { createAccountStatusSink } from "supportClaw/plugin-sdk/channel-outbound";
export { resolveControlCommandGate } from "supportClaw/plugin-sdk/command-auth-native";
export { createChannelMessageReplyPipeline } from "supportClaw/plugin-sdk/channel-outbound";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
export {
  deliverFormattedTextWithAttachments,
  formatTextWithAttachmentLinks,
  resolveOutboundMediaUrls,
} from "supportClaw/plugin-sdk/reply-payload";
export {
  GROUP_POLICY_BLOCKED_LABEL,
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "supportClaw/plugin-sdk/runtime-group-policy";
export { isDangerousNameMatchingEnabled } from "supportClaw/plugin-sdk/dangerous-name-runtime";
export { logInboundDrop } from "supportClaw/plugin-sdk/channel-inbound";
