// Open Prose plugin entrypoint registers its SupportClaw integration.
import { definePluginEntry, type SupportClawPluginApi } from "./runtime-api.js";

export default definePluginEntry({
  id: "open-prose",
  name: "OpenProse",
  description: "Plugin-shipped prose skills bundle",
  register(_api: SupportClawPluginApi) {
    // OpenProse is delivered via plugin-shipped skills.
  },
});
