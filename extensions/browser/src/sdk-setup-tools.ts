/**
 * Browser-local SDK setup/tooling bridge for CLI, media, and action helpers.
 */
export {
  callGatewayTool,
  listNodes,
  resolveNodeIdFromList,
  selectDefaultNodeFromList,
} from "supportClaw/plugin-sdk/agent-harness-runtime";
export type { AnyAgentTool, NodeListNode } from "supportClaw/plugin-sdk/agent-harness-runtime";
export {
  imageResultFromFile,
  jsonResult,
  readPositiveIntegerParam,
  readStringParam,
} from "supportClaw/plugin-sdk/channel-actions";
export { optionalStringEnum, stringEnum } from "supportClaw/plugin-sdk/channel-actions";
export {
  formatCliCommand,
  formatHelpExamples,
  inheritOptionFromParent,
  note,
  theme,
} from "supportClaw/plugin-sdk/cli-runtime";
export { danger, info } from "supportClaw/plugin-sdk/runtime-env";
export {
  IMAGE_REDUCE_QUALITY_STEPS,
  buildImageResizeSideGrid,
  getImageMetadata,
  isImageProcessorUnavailableError,
  resizeToJpeg,
} from "supportClaw/plugin-sdk/media-runtime";
export { detectMime } from "supportClaw/plugin-sdk/media-mime";
export { ensureMediaDir, saveMediaBuffer } from "supportClaw/plugin-sdk/media-runtime";
export { describeImageFile } from "supportClaw/plugin-sdk/media-understanding-runtime";
export { formatDocsLink } from "supportClaw/plugin-sdk/setup-tools";
