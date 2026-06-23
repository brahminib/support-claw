// Diagnostics Otel API module exposes the plugin public contract.
export {
  createChildDiagnosticTraceContext,
  createDiagnosticTraceContext,
  emitDiagnosticEvent,
  formatDiagnosticTraceparent,
  isValidDiagnosticSpanId,
  isValidDiagnosticTraceFlags,
  isValidDiagnosticTraceId,
  onDiagnosticEvent,
  parseDiagnosticTraceparent,
  type DiagnosticEventMetadata,
  type DiagnosticEventPayload,
  type DiagnosticTraceContext,
} from "supportClaw/plugin-sdk/diagnostic-runtime";
export { emptyPluginConfigSchema, type SupportClawPluginApi } from "supportClaw/plugin-sdk/plugin-entry";
export type {
  SupportClawPluginService,
  SupportClawPluginServiceContext,
} from "supportClaw/plugin-sdk/plugin-entry";
export { redactSensitiveText } from "supportClaw/plugin-sdk/security-runtime";
