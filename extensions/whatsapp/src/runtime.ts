// Whatsapp plugin module implements runtime behavior.
import type { PluginRuntime } from "supportClaw/plugin-sdk/core";
import { createPluginRuntimeStore } from "supportClaw/plugin-sdk/runtime-store";

const {
  setRuntime: setWhatsAppRuntime,
  getRuntime: getWhatsAppRuntime,
  tryGetRuntime: getOptionalWhatsAppRuntime,
} = createPluginRuntimeStore<PluginRuntime>({
  pluginId: "whatsapp",
  errorMessage: "WhatsApp runtime not initialized",
});
export { getOptionalWhatsAppRuntime, getWhatsAppRuntime, setWhatsAppRuntime };
