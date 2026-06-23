// Private runtime barrel for the bundled Nextcloud Talk extension.
// Keep this barrel thin and aligned with the local extension surface.

export type { AllowlistMatch } from "supportClaw/plugin-sdk/allow-from";
export type { ChannelGroupContext } from "supportClaw/plugin-sdk/channel-contract";
export { logInboundDrop } from "supportClaw/plugin-sdk/channel-inbound";
export { createChannelPairingController } from "supportClaw/plugin-sdk/channel-pairing";
export type {
  BlockStreamingCoalesceConfig,
  DmConfig,
  DmPolicy,
  GroupPolicy,
  GroupToolPolicyConfig,
  SupportClawConfig,
} from "supportClaw/plugin-sdk/config-contracts";
export {
  GROUP_POLICY_BLOCKED_LABEL,
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "supportClaw/plugin-sdk/runtime-group-policy";
export { createChannelMessageReplyPipeline } from "supportClaw/plugin-sdk/channel-outbound";
export type { OutboundReplyPayload } from "supportClaw/plugin-sdk/reply-payload";
export { deliverFormattedTextWithAttachments } from "supportClaw/plugin-sdk/reply-payload";
export type { PluginRuntime } from "supportClaw/plugin-sdk/runtime-store";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export type { SecretInput } from "supportClaw/plugin-sdk/secret-input";
export { fetchWithSsrFGuard } from "supportClaw/plugin-sdk/ssrf-runtime";
export { setNextcloudTalkRuntime } from "./src/runtime.js";
