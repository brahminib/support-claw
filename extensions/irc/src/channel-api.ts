// Irc API module exposes the plugin public contract.
export { createAccountStatusSink } from "supportClaw/plugin-sdk/channel-outbound";
export { DEFAULT_ACCOUNT_ID } from "supportClaw/plugin-sdk/account-id";
export type { ChannelPlugin } from "supportClaw/plugin-sdk/channel-core";
export { PAIRING_APPROVED_MESSAGE } from "supportClaw/plugin-sdk/channel-status";
export { buildBaseChannelStatusSummary } from "supportClaw/plugin-sdk/status-helpers";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
