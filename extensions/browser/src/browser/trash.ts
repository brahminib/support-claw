/**
 * Trash helpers for Browser-owned files constrained to user and SupportClaw temp
 * roots.
 */
import os from "node:os";
import { movePathToTrash as movePathToTrashWithAllowedRoots } from "supportClaw/plugin-sdk/browser-config";
import { resolvePreferredSupportClawTmpDir } from "supportClaw/plugin-sdk/temp-path";

/** Moves a path to trash only when it lives under allowed Browser roots. */
export async function movePathToTrash(targetPath: string): Promise<string> {
  return await movePathToTrashWithAllowedRoots(targetPath, {
    allowedRoots: [os.homedir(), resolvePreferredSupportClawTmpDir()],
  });
}
