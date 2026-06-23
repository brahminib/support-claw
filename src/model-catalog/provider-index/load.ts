// Provider-index loader normalizes bundled installable-provider metadata and falls back to an empty index.
import { normalizeSupportClawProviderIndex } from "./normalize.js";
import { SUPPORT_CLAW_PROVIDER_INDEX } from "./supportClaw-provider-index.js";
import type { SupportClawProviderIndex } from "./types.js";

// Load the bundled provider index through the normalizer. Invalid generated or
// caller-supplied data falls back to an empty v1 index instead of leaking shape.
export function loadSupportClawProviderIndex(
  source: unknown = SUPPORT_CLAW_PROVIDER_INDEX,
): SupportClawProviderIndex {
  return normalizeSupportClawProviderIndex(source) ?? { version: 1, providers: {} };
}
