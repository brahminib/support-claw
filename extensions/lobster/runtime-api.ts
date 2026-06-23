// Lobster API module exposes the plugin public contract.
export { definePluginEntry } from "supportClaw/plugin-sdk/core";
export type {
  AnyAgentTool,
  SupportClawPluginApi,
  SupportClawPluginToolContext,
  SupportClawPluginToolFactory,
} from "supportClaw/plugin-sdk/core";
export {
  applyWindowsSpawnProgramPolicy,
  materializeWindowsSpawnProgram,
  resolveWindowsSpawnProgramCandidate,
} from "supportClaw/plugin-sdk/windows-spawn";
