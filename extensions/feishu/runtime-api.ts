// Private runtime barrel for the bundled Feishu extension.
// Keep this barrel thin and generic-only.

export type {
  AllowlistMatch,
  AnyAgentTool,
  BaseProbeResult,
  ChannelGroupContext,
  ChannelMessageActionName,
  ChannelMeta,
  ChannelOutboundAdapter,
  ChannelPlugin,
  HistoryEntry,
  SupportClawConfig,
  SupportClawPluginApi,
  OutboundIdentity,
  PluginRuntime,
  ReplyPayload,
} from "supportClaw/plugin-sdk/core";
export type { SupportClawConfig as ClawdbotConfig } from "supportClaw/plugin-sdk/core";
export type RuntimeEnv = {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  exit: (code: number) => void;
};
export type { GroupToolPolicyConfig } from "supportClaw/plugin-sdk/config-contracts";
export {
  DEFAULT_ACCOUNT_ID,
  buildChannelConfigSchema,
  createActionGate,
  createDedupeCache,
} from "supportClaw/plugin-sdk/core";
export {
  PAIRING_APPROVED_MESSAGE,
  buildProbeChannelStatusSummary,
  createDefaultChannelRuntimeState,
} from "supportClaw/plugin-sdk/channel-status";
export { buildAgentMediaPayload } from "supportClaw/plugin-sdk/agent-media-payload";
export { createChannelPairingController } from "supportClaw/plugin-sdk/channel-pairing";
export { createReplyPrefixContext } from "supportClaw/plugin-sdk/channel-outbound";
export {
  evaluateSupplementalContextVisibility,
  filterSupplementalContextItems,
  resolveChannelContextVisibilityMode,
} from "supportClaw/plugin-sdk/context-visibility-runtime";
export {
  loadSessionStore,
  resolveSessionStoreEntry,
} from "supportClaw/plugin-sdk/session-store-runtime";
export { readJsonFileWithFallback } from "supportClaw/plugin-sdk/json-store";
export { normalizeAgentId } from "supportClaw/plugin-sdk/routing";
export { chunkTextForOutbound } from "supportClaw/plugin-sdk/text-chunking";
export {
  isRequestBodyLimitError,
  readRequestBodyWithLimit,
  requestBodyErrorToText,
} from "supportClaw/plugin-sdk/webhook-ingress";
export { setFeishuRuntime } from "./src/runtime.js";
