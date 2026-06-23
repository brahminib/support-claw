// Real workspace contract for memory engine foundation concerns.

export {
  resolveAgentContextLimits,
  resolveAgentDir,
  resolveAgentWorkspaceDir,
  resolveDefaultAgentId,
  resolveSessionAgentId,
} from "./host/supportClaw-runtime-agent.js";
export {
  resolveMemorySearchConfig,
  resolveMemorySearchSyncConfig,
  type ResolvedMemorySearchConfig,
  type ResolvedMemorySearchSyncConfig,
} from "./host/supportClaw-runtime-agent.js";
export { parseDurationMs } from "./host/supportClaw-runtime-config.js";
export { loadConfig } from "./host/supportClaw-runtime-config.js";
export { resolveStateDir } from "./host/supportClaw-runtime-config.js";
export { resolveSessionTranscriptsDirForAgent } from "./host/supportClaw-runtime-config.js";
export {
  hasConfiguredSecretInput,
  normalizeResolvedSecretInputString,
} from "./host/supportClaw-runtime-config.js";
export { root } from "./host/supportClaw-runtime-io.js";
export { isPathInside } from "./host/fs-utils.js";
export { createSubsystemLogger } from "./host/supportClaw-runtime-io.js";
export { detectMime } from "./host/supportClaw-runtime-io.js";
export { resolveGlobalSingleton } from "./host/supportClaw-runtime-io.js";
export { onSessionTranscriptUpdate } from "./host/supportClaw-runtime-session.js";
export { splitShellArgs } from "./host/supportClaw-runtime-io.js";
export { runTasksWithConcurrency } from "./host/supportClaw-runtime-io.js";
export {
  shortenHomeInString,
  shortenHomePath,
  resolveUserPath,
  truncateUtf16Safe,
} from "./host/supportClaw-runtime-io.js";
export type { SupportClawConfig } from "./host/supportClaw-runtime-config.js";
export type { SessionSendPolicyConfig } from "./host/supportClaw-runtime-config.js";
export type { SecretInput } from "./host/supportClaw-runtime-config.js";
export type {
  MemoryBackend,
  MemoryCitationsMode,
  MemoryQmdConfig,
  MemoryQmdIndexPath,
  MemoryQmdMcporterConfig,
  MemoryQmdSearchMode,
} from "./host/supportClaw-runtime-config.js";
export type { MemorySearchConfig } from "./host/supportClaw-runtime-config.js";
