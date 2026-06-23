// Qqbot API module exposes the plugin public contract.
export type { ChannelPlugin, SupportClawPluginApi, PluginRuntime } from "supportClaw/plugin-sdk/core";
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
export type {
  SupportClawPluginService,
  SupportClawPluginServiceContext,
  PluginLogger,
} from "supportClaw/plugin-sdk/core";
export type { ResolvedQQBotAccount, QQBotAccountConfig } from "./src/types.js";
export { getQQBotRuntime, setQQBotRuntime } from "./src/bridge/runtime.js";
