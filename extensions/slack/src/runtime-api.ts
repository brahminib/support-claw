// Slack API module exposes the plugin public contract.
export {
  buildComputedAccountStatusSnapshot,
  PAIRING_APPROVED_MESSAGE,
  projectCredentialSnapshotFields,
  resolveConfiguredFromRequiredCredentialStatuses,
} from "supportClaw/plugin-sdk/channel-status";
export { buildChannelConfigSchema, SlackConfigSchema } from "../config-api.js";
export type { ChannelMessageActionContext } from "supportClaw/plugin-sdk/channel-contract";
export { DEFAULT_ACCOUNT_ID } from "supportClaw/plugin-sdk/account-id";
export type {
  ChannelPlugin,
  SupportClawPluginApi,
  PluginRuntime,
} from "supportClaw/plugin-sdk/channel-plugin-common";
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
export type { SlackAccountConfig } from "supportClaw/plugin-sdk/config-contracts";
export {
  emptyPluginConfigSchema,
  formatPairingApproveHint,
} from "supportClaw/plugin-sdk/channel-plugin-common";
export { loadOutboundMediaFromUrl } from "supportClaw/plugin-sdk/outbound-media";
export { looksLikeSlackTargetId, normalizeSlackMessagingTarget } from "./target-parsing.js";
export { getChatChannelMeta } from "./channel-api.js";
export {
  createActionGate,
  imageResultFromFile,
  jsonResult,
  readNumberParam,
  readPositiveIntegerParam,
  readReactionParams,
  readStringParam,
  withNormalizedTimestamp,
} from "supportClaw/plugin-sdk/channel-actions";
