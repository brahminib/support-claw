/**
 * Standalone MCP server for selected built-in SupportClaw tools.
 *
 * Run via: node --import tsx src/mcp/supportClaw-tools-serve.ts
 * Or: bun src/mcp/supportClaw-tools-serve.ts
 */
import { pathToFileURL } from "node:url";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import type { AnyAgentTool } from "../agents/tools/common.js";
import { createCronTool } from "../agents/tools/cron-tool.js";
import { formatErrorMessage } from "../infra/errors.js";
import { connectToolsMcpServerToStdio, createToolsMcpServer } from "./tools-stdio-server.js";

export function resolveSupportClawToolsForMcp(): AnyAgentTool[] {
  return [createCronTool({ creatorToolAllowlist: [{ name: "cron" }] })];
}

function createSupportClawToolsMcpServer(
  params: {
    tools?: AnyAgentTool[];
  } = {},
): Server {
  const tools = params.tools ?? resolveSupportClawToolsForMcp();
  return createToolsMcpServer({ name: "supportClaw-tools", tools });
}

async function serveSupportClawToolsMcp(): Promise<void> {
  const server = createSupportClawToolsMcpServer();
  await connectToolsMcpServerToStdio(server);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  serveSupportClawToolsMcp().catch((err: unknown) => {
    process.stderr.write(`supportClaw-tools-serve: ${formatErrorMessage(err)}\n`);
    process.exit(1);
  });
}
