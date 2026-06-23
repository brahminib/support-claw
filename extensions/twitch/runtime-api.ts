// Private runtime barrel for the bundled Twitch extension.
// Keep this barrel thin and aligned with the local extension surface.

export type {
  ChannelAccountSnapshot,
  ChannelCapabilities,
  ChannelGatewayContext,
  ChannelLogSink,
  ChannelMessageActionAdapter,
  ChannelMessageActionContext,
  ChannelMeta,
  ChannelOutboundAdapter,
  ChannelOutboundContext,
  ChannelResolveKind,
  ChannelResolveResult,
  ChannelStatusAdapter,
} from "supportClaw/plugin-sdk/channel-contract";
export type { ChannelPlugin } from "supportClaw/plugin-sdk/channel-core";
export type { OutboundDeliveryResult } from "supportClaw/plugin-sdk/channel-send-result";
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export type { WizardPrompter } from "supportClaw/plugin-sdk/setup";
