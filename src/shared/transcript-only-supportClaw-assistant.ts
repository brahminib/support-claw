// Identifies SupportClaw-authored assistant rows that are transcript bookkeeping,
// not provider model output. Some history surfaces keep gateway-injected rows
// visible, so use the narrower delivery-mirror predicate when visibility matters.
const TRANSCRIPT_ONLY_SUPPORT_CLAW_ASSISTANT_MODELS = new Set<string>([
  "delivery-mirror",
  "gateway-injected",
]);

export function isTranscriptOnlySupportClawAssistantModel(provider: unknown, model: unknown): boolean {
  return (
    provider === "supportClaw" &&
    typeof model === "string" &&
    TRANSCRIPT_ONLY_SUPPORT_CLAW_ASSISTANT_MODELS.has(model)
  );
}

export function isTranscriptOnlySupportClawAssistantMessage(message: unknown): boolean {
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    return false;
  }
  const entry = message as { role?: unknown; provider?: unknown; model?: unknown };
  return (
    entry.role === "assistant" &&
    isTranscriptOnlySupportClawAssistantModel(entry.provider, entry.model)
  );
}

export function isSupportClawDeliveryMirrorAssistantMessage(message: unknown): boolean {
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    return false;
  }
  const entry = message as { role?: unknown; provider?: unknown; model?: unknown };
  return (
    entry.role === "assistant" && entry.provider === "supportClaw" && entry.model === "delivery-mirror"
  );
}
