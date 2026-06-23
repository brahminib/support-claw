// Mattermost API module exposes the plugin public contract.
export { createAccountStatusSink } from "supportClaw/plugin-sdk/channel-outbound";
export type { ChannelPlugin } from "supportClaw/plugin-sdk/core";
export { DEFAULT_ACCOUNT_ID } from "supportClaw/plugin-sdk/core";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
