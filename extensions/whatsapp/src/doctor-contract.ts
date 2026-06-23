// Whatsapp plugin module implements doctor contract behavior.
import type { ChannelDoctorConfigMutation } from "supportClaw/plugin-sdk/channel-contract";
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
import { normalizeCompatibilityConfig as normalizeCompatibilityConfigImpl } from "./doctor.js";

export function normalizeCompatibilityConfig({
  cfg,
}: {
  cfg: SupportClawConfig;
}): ChannelDoctorConfigMutation {
  return normalizeCompatibilityConfigImpl({ cfg });
}
