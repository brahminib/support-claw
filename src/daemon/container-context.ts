/** Detects whether a daemon was launched by SupportClaw's container-aware service wrapper. */
import { normalizeOptionalString } from "@supportclaw/normalization-core/string-coerce";

/** Resolves the daemon container hint exposed by managed service environments. */
export function resolveDaemonContainerContext(
  env: Record<string, string | undefined> = process.env,
): string | null {
  return (
    normalizeOptionalString(env.SUPPORT_CLAW_CONTAINER_HINT) ||
    normalizeOptionalString(env.SUPPORT_CLAW_CONTAINER) ||
    null
  );
}
