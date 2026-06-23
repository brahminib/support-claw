// Private runtime barrel for the bundled Voice Call extension.
// Keep this barrel thin and aligned with the local extension surface.

export { definePluginEntry } from "supportClaw/plugin-sdk/plugin-entry";
export type { SupportClawPluginApi } from "supportClaw/plugin-sdk/plugin-entry";
export type { GatewayRequestHandlerOptions } from "supportClaw/plugin-sdk/gateway-runtime";
export {
  isRequestBodyLimitError,
  readRequestBodyWithLimit,
  requestBodyErrorToText,
} from "supportClaw/plugin-sdk/webhook-request-guards";
export { fetchWithSsrFGuard, isBlockedHostnameOrIp } from "supportClaw/plugin-sdk/ssrf-runtime";
export type { SessionEntry } from "supportClaw/plugin-sdk/session-store-runtime";
export {
  TtsAutoSchema,
  TtsConfigSchema,
  TtsModeSchema,
  TtsProviderSchema,
} from "supportClaw/plugin-sdk/tts-runtime";
export { sleep } from "supportClaw/plugin-sdk/runtime-env";
