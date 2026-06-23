// Telegram plugin module implements send behavior.
export { requireRuntimeConfig } from "supportClaw/plugin-sdk/plugin-config-runtime";
export { resolveMarkdownTableMode } from "supportClaw/plugin-sdk/markdown-table-runtime";
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
export type { PollInput, MediaKind } from "supportClaw/plugin-sdk/media-runtime";
export {
  buildOutboundMediaLoadOptions,
  getImageMetadata,
  isGifMedia,
  kindFromMime,
  normalizePollInput,
  probeVideoDimensions,
} from "supportClaw/plugin-sdk/media-runtime";
export { loadWebMedia } from "supportClaw/plugin-sdk/web-media";
