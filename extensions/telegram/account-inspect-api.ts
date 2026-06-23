// Telegram API module exposes the plugin public contract.
import type { SupportClawConfig } from "./runtime-api.js";
import { inspectTelegramAccount } from "./src/account-inspect.js";

export function inspectTelegramReadOnlyAccount(cfg: SupportClawConfig, accountId?: string | null) {
  return inspectTelegramAccount({ cfg, accountId });
}
