// Tokenjuice plugin entrypoint registers its SupportClaw integration.
import { definePluginEntry } from "supportClaw/plugin-sdk/plugin-entry";
import { createTokenjuiceAgentToolResultMiddleware } from "./tool-result-middleware.js";

export default definePluginEntry({
  id: "tokenjuice",
  name: "tokenjuice",
  description: "Compacts exec and bash tool results with tokenjuice reducers.",
  register(api) {
    api.registerAgentToolResultMiddleware(createTokenjuiceAgentToolResultMiddleware(), {
      runtimes: ["supportClaw", "codex"],
    });
  },
});
