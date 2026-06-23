// Feishu API module exposes the plugin public contract.
export type {
  ChannelMessageActionName,
  ChannelMeta,
  ChannelPlugin,
  ClawdbotConfig,
} from "../runtime-api.js";

export { DEFAULT_ACCOUNT_ID } from "supportClaw/plugin-sdk/account-resolution";
export { createActionGate } from "supportClaw/plugin-sdk/channel-actions";
export { buildChannelConfigSchema } from "supportClaw/plugin-sdk/channel-config-primitives";
export {
  buildProbeChannelStatusSummary,
  createDefaultChannelRuntimeState,
} from "supportClaw/plugin-sdk/status-helpers";
export { PAIRING_APPROVED_MESSAGE } from "supportClaw/plugin-sdk/channel-status";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
