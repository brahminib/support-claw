/**
 * Resolves whether Codex app-server profiling instrumentation is enabled by
 * SupportClaw diagnostic flags.
 */
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
import { isDiagnosticFlagEnabled } from "supportClaw/plugin-sdk/diagnostic-runtime";

const PROFILER_FLAGS = ["profiler", "codex.profiler"] as const;

/** Checks the generic and Codex-specific profiler diagnostic flags. */
export function isCodexAppServerProfilerEnabled(
  config?: SupportClawConfig,
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  return PROFILER_FLAGS.some((flag) => isDiagnosticFlagEnabled(flag, config, env));
}
