// State database path helpers resolve shared SupportClaw state DB paths.
import os from "node:os";
import path from "node:path";
import { isMainThread, threadId } from "node:worker_threads";
import { resolveStateDir } from "../config/paths.js";
import { parseStrictNonNegativeInteger } from "../infra/parse-finite-number.js";

/**
 * Path helpers for the shared SupportClaw SQLite state database.
 *
 * Tests get worker-scoped temp state roots unless they explicitly provide
 * `SUPPORT_CLAW_STATE_DIR`, which prevents parallel Vitest workers from sharing WAL files.
 */
function resolveSupportClawStateRootDir(env: NodeJS.ProcessEnv): string {
  if (env.SUPPORT_CLAW_STATE_DIR?.trim()) {
    return resolveStateDir(env);
  }
  if (env.VITEST || env.NODE_ENV === "test") {
    const workerId = parseStrictNonNegativeInteger(
      env.VITEST_WORKER_ID ?? env.VITEST_POOL_ID ?? "",
    );
    const shardSuffix =
      workerId !== undefined
        ? `${process.pid}-${workerId}`
        : isMainThread
          ? String(process.pid)
          : `${process.pid}-${threadId}`;
    return path.join(os.tmpdir(), "supportClaw-test-state", shardSuffix);
  }
  return resolveStateDir(env);
}

/** Resolve the directory that contains the shared state SQLite file. */
export function resolveSupportClawStateSqliteDir(env: NodeJS.ProcessEnv = process.env): string {
  return path.join(resolveSupportClawStateRootDir(env), "state");
}

/** Resolve the shared state SQLite file path. */
export function resolveSupportClawStateSqlitePath(env: NodeJS.ProcessEnv = process.env): string {
  return path.join(resolveSupportClawStateSqliteDir(env), "supportClaw.sqlite");
}
