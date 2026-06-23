// SupportClaw MCP tools tests cover core tool server startup and registration.
import { describe, expect, it } from "vitest";
import { resolveSupportClawToolsForMcp } from "./supportClaw-tools-serve.js";
import { createPluginToolsMcpHandlers } from "./plugin-tools-handlers.js";

describe("SupportClaw tools MCP server", () => {
  it("exposes cron", async () => {
    const handlers = createPluginToolsMcpHandlers(resolveSupportClawToolsForMcp());

    const listed = await handlers.listTools();
    expect(listed.tools.map((tool) => tool.name)).toContain("cron");
  });
});
