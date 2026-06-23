// Diffs API module exposes the plugin public contract.
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
export {
  definePluginEntry,
  type AnyAgentTool,
  type SupportClawPluginApi,
  type SupportClawPluginConfigSchema,
  type SupportClawPluginToolContext,
  type PluginLogger,
} from "supportClaw/plugin-sdk/plugin-entry";
export { resolvePreferredSupportClawTmpDir } from "supportClaw/plugin-sdk/temp-path";
