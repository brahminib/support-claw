// Imessage plugin module implements account types behavior.
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";

export type IMessageAccountConfig = Omit<
  NonNullable<NonNullable<SupportClawConfig["channels"]>["imessage"]>,
  "accounts" | "defaultAccount"
>;
