// Memory Core plugin module implements public artifacts behavior.
import {
  listMemoryHostPublicArtifacts,
  type MemoryPluginPublicArtifact,
} from "supportClaw/plugin-sdk/memory-host-core";
import type { SupportClawConfig } from "../api.js";

export async function listMemoryCorePublicArtifacts(params: {
  cfg: SupportClawConfig;
}): Promise<MemoryPluginPublicArtifact[]> {
  return await listMemoryHostPublicArtifacts(params);
}
