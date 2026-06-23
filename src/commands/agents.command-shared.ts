// Shared config-loading helpers for agent management commands.
import type { SupportClawConfig } from "../config/types.supportClaw.js";
import type { RuntimeEnv } from "../runtime.js";
import {
  requireValidConfigFileSnapshot as requireValidConfigFileSnapshotBase,
  requireValidConfigSnapshot,
} from "./config-validation.js";

/** Wrap a runtime so helper setup work stays silent in JSON output paths. */
export function createQuietRuntime(runtime: RuntimeEnv): RuntimeEnv {
  return { ...runtime, log: () => {} };
}

/** Load a config file snapshot and surface validation errors through the runtime. */
export async function requireValidConfigFileSnapshot(runtime: RuntimeEnv) {
  return await requireValidConfigFileSnapshotBase(runtime);
}

/** Load the current runtime config and return null after reporting validation failures. */
export async function requireValidConfig(runtime: RuntimeEnv): Promise<SupportClawConfig | null> {
  return await requireValidConfigSnapshot(runtime);
}
