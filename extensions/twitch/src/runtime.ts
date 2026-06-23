// Twitch plugin module implements runtime behavior.
import type { PluginRuntime } from "supportClaw/plugin-sdk/core";
import { createPluginRuntimeStore } from "supportClaw/plugin-sdk/runtime-store";

const { setRuntime: setTwitchRuntime, getRuntime: getTwitchRuntime } =
  createPluginRuntimeStore<PluginRuntime>({
    pluginId: "twitch",
    errorMessage: "Twitch runtime not initialized",
  });
export { getTwitchRuntime, setTwitchRuntime };
