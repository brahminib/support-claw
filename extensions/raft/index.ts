// Raft plugin entrypoint registers its SupportClaw integration.
import { defineBundledChannelEntry } from "supportClaw/plugin-sdk/channel-entry-contract";

export default defineBundledChannelEntry({
  id: "raft",
  name: "Raft",
  description: "Raft CLI wake bridge channel plugin",
  importMetaUrl: import.meta.url,
  plugin: {
    specifier: "./channel-plugin-api.js",
    exportName: "raftPlugin",
  },
});
