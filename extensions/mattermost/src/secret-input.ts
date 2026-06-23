// Mattermost plugin module implements secret input behavior.
export type { SecretInput } from "supportClaw/plugin-sdk/secret-input";
export {
  buildSecretInputSchema,
  hasConfiguredSecretInput,
  normalizeResolvedSecretInputString,
  normalizeSecretInputString,
} from "supportClaw/plugin-sdk/secret-input";
