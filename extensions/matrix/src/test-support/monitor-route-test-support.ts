// Matrix plugin module implements monitor route test support behavior.
export {
  registerSessionBindingAdapter,
  testing,
} from "supportClaw/plugin-sdk/session-binding-runtime";
export { resolveAgentRoute } from "supportClaw/plugin-sdk/routing";
export {
  createTestRegistry,
  setActivePluginRegistry,
} from "supportClaw/plugin-sdk/plugin-test-runtime";
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
