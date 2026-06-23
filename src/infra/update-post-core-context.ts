import type { SupportClawConfig } from "../config/types.supportClaw.js";

export const POST_CORE_UPDATE_SOURCE_CONFIG_PATH_ENV =
  "SUPPORT_CLAW_UPDATE_POST_CORE_SOURCE_CONFIG_PATH";

export type PreUpdateConfigRestoreInput = {
  sourceConfig: SupportClawConfig;
  authoredConfig: SupportClawConfig;
};
