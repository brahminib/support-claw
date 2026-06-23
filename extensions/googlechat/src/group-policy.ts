// Googlechat plugin module implements group policy behavior.
import { resolveChannelGroupRequireMention } from "supportClaw/plugin-sdk/channel-policy";
import type { SupportClawConfig } from "supportClaw/plugin-sdk/core";

type GoogleChatGroupContext = {
  cfg: SupportClawConfig;
  accountId?: string | null;
  groupId?: string | null;
};

export function resolveGoogleChatGroupRequireMention(params: GoogleChatGroupContext): boolean {
  return resolveChannelGroupRequireMention({
    cfg: params.cfg,
    channel: "googlechat",
    groupId: params.groupId,
    accountId: params.accountId,
  });
}
