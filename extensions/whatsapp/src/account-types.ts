// Whatsapp plugin module implements account types behavior.
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";

export type WhatsAppAccountConfig = NonNullable<
  NonNullable<NonNullable<SupportClawConfig["channels"]>["whatsapp"]>["accounts"]
>[string];
