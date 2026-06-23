// Nostr API module exposes the plugin public contract.
export {
  buildChannelConfigSchema,
  DEFAULT_ACCOUNT_ID,
  formatPairingApproveHint,
  type ChannelPlugin,
} from "supportClaw/plugin-sdk/channel-plugin-common";
export type { ChannelOutboundAdapter } from "supportClaw/plugin-sdk/channel-contract";
export {
  collectStatusIssuesFromLastError,
  createDefaultChannelRuntimeState,
} from "supportClaw/plugin-sdk/status-helpers";
