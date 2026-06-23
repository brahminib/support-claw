// Tavily helper module supports tavily tool config behavior.
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
import type { SupportClawPluginToolContext } from "supportClaw/plugin-sdk/plugin-entry";
import type { SupportClawPluginApi } from "supportClaw/plugin-sdk/plugin-runtime";

export type TavilyToolConfigContext = Pick<
  SupportClawPluginToolContext,
  "config" | "runtimeConfig" | "getRuntimeConfig"
>;

export function resolveTavilyToolConfig(
  api: SupportClawPluginApi,
  ctx?: TavilyToolConfigContext,
): SupportClawConfig {
  return ctx?.getRuntimeConfig?.() ?? ctx?.runtimeConfig ?? ctx?.config ?? api.config;
}
