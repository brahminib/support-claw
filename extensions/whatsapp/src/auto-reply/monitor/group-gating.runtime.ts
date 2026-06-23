// Whatsapp plugin module implements group gating behavior.
export {
  implicitMentionKindWhen,
  resolveInboundMentionDecision,
} from "supportClaw/plugin-sdk/channel-mention-gating";
export { hasControlCommand } from "supportClaw/plugin-sdk/command-detection";
export { createChannelHistoryWindow } from "supportClaw/plugin-sdk/reply-history";
export { parseActivationCommand } from "supportClaw/plugin-sdk/group-activation";
export { normalizeE164 } from "../../text-runtime.js";
