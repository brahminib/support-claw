// Packed Plugin Sdk Type Smoke script supports SupportClaw repository automation.
type PublicPluginSdkModules = [
  typeof import("supportClaw/plugin-sdk"),
  typeof import("supportClaw/plugin-sdk/channel-entry-contract"),
  typeof import("supportClaw/plugin-sdk/config-contracts"),
  typeof import("supportClaw/plugin-sdk/provider-entry"),
  typeof import("supportClaw/plugin-sdk/runtime-env"),
];

const resolvedModules = null as unknown as PublicPluginSdkModules;

void resolvedModules;
