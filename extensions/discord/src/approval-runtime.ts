// Discord plugin module implements approval runtime behavior.
export {
  isChannelExecApprovalClientEnabledFromConfig,
  matchesApprovalRequestFilters,
  getExecApprovalReplyMetadata,
} from "supportClaw/plugin-sdk/approval-client-runtime";
export { resolveApprovalApprovers } from "supportClaw/plugin-sdk/approval-auth-runtime";
export {
  createApproverRestrictedNativeApprovalCapability,
  splitChannelApprovalCapability,
} from "supportClaw/plugin-sdk/approval-delivery-runtime";
export {
  createChannelApproverDmTargetResolver,
  createChannelNativeOriginTargetResolver,
} from "supportClaw/plugin-sdk/approval-native-runtime";
