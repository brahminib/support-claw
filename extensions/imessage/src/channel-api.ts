// Imessage API module exposes the plugin public contract.
import { formatTrimmedAllowFromEntries } from "supportClaw/plugin-sdk/channel-config-helpers";
import { PAIRING_APPROVED_MESSAGE } from "supportClaw/plugin-sdk/channel-status";
import {
  DEFAULT_ACCOUNT_ID,
  getChatChannelMeta,
  type ChannelPlugin,
} from "supportClaw/plugin-sdk/core";
import { resolveChannelMediaMaxBytes } from "supportClaw/plugin-sdk/media-runtime";
import { collectStatusIssuesFromLastError } from "supportClaw/plugin-sdk/status-helpers";
import { normalizeIMessageMessagingTarget } from "./normalize.js";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";

export {
  collectStatusIssuesFromLastError,
  DEFAULT_ACCOUNT_ID,
  formatTrimmedAllowFromEntries,
  getChatChannelMeta,
  normalizeIMessageMessagingTarget,
  PAIRING_APPROVED_MESSAGE,
  resolveChannelMediaMaxBytes,
};

export type { ChannelPlugin };
