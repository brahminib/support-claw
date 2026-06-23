// Qa Channel API module exposes the plugin public contract.
export type {
  ChannelMessageActionAdapter,
  ChannelMessageActionName,
  ChannelGatewayContext,
} from "supportClaw/plugin-sdk/channel-contract";
export type { ChannelPlugin } from "supportClaw/plugin-sdk/channel-core";
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
export type { RuntimeEnv } from "supportClaw/plugin-sdk/runtime";
export type { PluginRuntime } from "supportClaw/plugin-sdk/runtime-store";
export {
  buildChannelConfigSchema,
  buildChannelOutboundSessionRoute,
  createChatChannelPlugin,
  defineChannelPluginEntry,
} from "supportClaw/plugin-sdk/channel-core";
export { jsonResult, readStringParam } from "supportClaw/plugin-sdk/channel-actions";
export { getChatChannelMeta } from "supportClaw/plugin-sdk/channel-plugin-common";
export {
  createComputedAccountStatusAdapter,
  createDefaultChannelRuntimeState,
} from "supportClaw/plugin-sdk/status-helpers";
export { createPluginRuntimeStore } from "supportClaw/plugin-sdk/runtime-store";
export { createChannelMessageReplyPipeline } from "supportClaw/plugin-sdk/channel-outbound";
