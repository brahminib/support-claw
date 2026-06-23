// Signal plugin module implements account types behavior.
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";

export type SignalAccountConfig = Omit<
  Exclude<NonNullable<SupportClawConfig["channels"]>["signal"], undefined>,
  "accounts"
>;
