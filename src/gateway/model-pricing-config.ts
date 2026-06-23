// Gateway model-pricing config helper.
// Resolves whether cost/pricing metadata should be available to Gateway surfaces.
import type { SupportClawConfig } from "../config/types.supportClaw.js";

/** Returns whether gateway model pricing/cost metadata should be shown. */
export function isGatewayModelPricingEnabled(config: SupportClawConfig): boolean {
  return config.models?.pricing?.enabled !== false;
}
