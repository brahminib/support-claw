// Telegram plugin module implements bot message dispatch behavior.
export {
  loadSessionStore,
  readLatestAssistantTextFromSessionTranscript,
  resolveAndPersistSessionFile,
  resolveSessionStoreEntry,
  updateSessionStoreEntry,
} from "supportClaw/plugin-sdk/session-store-runtime";
export { resolveMarkdownTableMode } from "supportClaw/plugin-sdk/markdown-table-runtime";
export { getAgentScopedMediaLocalRoots } from "supportClaw/plugin-sdk/media-runtime";
export { resolveChunkMode } from "supportClaw/plugin-sdk/reply-dispatch-runtime";
export {
  generateTelegramTopicLabel as generateTopicLabel,
  resolveAutoTopicLabelConfig,
} from "./auto-topic-label.js";
