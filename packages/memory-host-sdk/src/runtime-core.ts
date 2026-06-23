// Focused runtime contract for memory plugin config/state/helpers.

export type { AnyAgentTool } from "./host/supportClaw-runtime-agent.js";
export { resolveCronStyleNow } from "./host/supportClaw-runtime-agent.js";
export { DEFAULT_AGENT_COMPACTION_RESERVE_TOKENS_FLOOR } from "./host/supportClaw-runtime-agent.js";
export { resolveDefaultAgentId, resolveSessionAgentId } from "./host/supportClaw-runtime-agent.js";
export { resolveMemorySearchConfig } from "./host/supportClaw-runtime-agent.js";
export {
  asToolParamsRecord,
  jsonResult,
  readNumberParam,
  readStringParam,
} from "./host/supportClaw-runtime-agent.js";
export { SILENT_REPLY_TOKEN } from "./host/supportClaw-runtime-session.js";
export { parseNonNegativeByteSize } from "./host/supportClaw-runtime-config.js";
export {
  getRuntimeConfig,
  /** @deprecated Use getRuntimeConfig(), or pass the already loaded config through the call path. */
  loadConfig,
} from "./host/supportClaw-runtime-config.js";
export { resolveStateDir } from "./host/supportClaw-runtime-config.js";
export { resolveSessionTranscriptsDirForAgent } from "./host/supportClaw-runtime-config.js";
export { emptyPluginConfigSchema } from "./host/supportClaw-runtime-memory.js";
export {
  buildActiveMemoryPromptSection,
  getMemoryCapabilityRegistration,
  listActiveMemoryPublicArtifacts,
} from "./host/supportClaw-runtime-memory.js";
export { parseAgentSessionKey } from "./host/supportClaw-runtime-agent.js";
export type { SupportClawConfig } from "./host/supportClaw-runtime-config.js";
export type { MemoryCitationsMode } from "./host/supportClaw-runtime-config.js";
export type {
  MemoryFlushPlan,
  MemoryFlushPlanResolver,
  MemoryPluginCapability,
  MemoryPluginPublicArtifact,
  MemoryPluginPublicArtifactsProvider,
  MemoryPluginRuntime,
  MemoryPromptSectionBuilder,
} from "./host/supportClaw-runtime-memory.js";
export type { SupportClawPluginApi } from "./host/supportClaw-runtime-memory.js";
