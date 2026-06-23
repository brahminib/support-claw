// Discord type declarations define plugin contracts.
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
import type { CommandArgValues } from "supportClaw/plugin-sdk/native-command-registry";

export type DiscordConfig = NonNullable<SupportClawConfig["channels"]>["discord"];

export type DiscordCommandArgs = {
  raw?: string;
  values?: CommandArgValues;
};
