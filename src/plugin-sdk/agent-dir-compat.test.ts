/**
 * Tests agent directory compatibility helpers.
 */
import { describe, expect, it } from "vitest";
import { resolveSupportClawAgentDir } from "./agent-dir-compat.js";

describe("resolveSupportClawAgentDir", () => {
  it("keeps the shipped Pi env alias for deprecated plugin SDK callers", () => {
    expect(
      resolveSupportClawAgentDir({
        PI_CODING_AGENT_DIR: "/tmp/supportClaw-legacy-agent",
      }),
    ).toBe("/tmp/supportClaw-legacy-agent");
  });

  it("prefers the SupportClaw env override over the deprecated Pi alias", () => {
    expect(
      resolveSupportClawAgentDir({
        SUPPORT_CLAW_AGENT_DIR: "/tmp/supportClaw-agent",
        PI_CODING_AGENT_DIR: "/tmp/supportClaw-legacy-agent",
      }),
    ).toBe("/tmp/supportClaw-agent");
  });
});
