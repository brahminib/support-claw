// Discord helper module supports runtime config behavior.
import {
  getRuntimeConfigSnapshot,
  getRuntimeConfigSourceSnapshot,
  selectApplicableRuntimeConfig,
} from "supportClaw/plugin-sdk/runtime-config-snapshot";
import type { SupportClawConfig } from "./runtime-api.js";

export function selectDiscordRuntimeConfig(inputConfig: SupportClawConfig): SupportClawConfig {
  return (
    selectApplicableRuntimeConfig({
      inputConfig,
      runtimeConfig: getRuntimeConfigSnapshot(),
      runtimeSourceConfig: getRuntimeConfigSourceSnapshot(),
    }) ?? inputConfig
  );
}
