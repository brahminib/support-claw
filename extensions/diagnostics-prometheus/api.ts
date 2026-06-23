// Diagnostics Prometheus API module exposes the plugin public contract.
export type {
  DiagnosticEventMetadata,
  DiagnosticEventPayload,
} from "supportClaw/plugin-sdk/diagnostic-runtime";
export { isInternalDiagnosticEventMetadata } from "supportClaw/plugin-sdk/diagnostic-runtime";
export {
  emptyPluginConfigSchema,
  type SupportClawPluginApi,
  type SupportClawPluginHttpRouteHandler,
  type SupportClawPluginService,
  type SupportClawPluginServiceContext,
} from "supportClaw/plugin-sdk/plugin-entry";
export { redactSensitiveText } from "supportClaw/plugin-sdk/security-runtime";
