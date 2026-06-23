// Discord API module exposes the plugin public contract.
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
import { inspectDiscordAccount } from "./src/account-inspect.js";

export function inspectDiscordReadOnlyAccount(cfg: SupportClawConfig, accountId?: string | null) {
  return inspectDiscordAccount({ cfg, accountId });
}
