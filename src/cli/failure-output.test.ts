// Failure output tests cover CLI error formatting and failure summaries.
import { describe, expect, it } from "vitest";
import { formatCliFailureLines } from "./failure-output.js";

describe("formatCliFailureLines", () => {
  it("shows a concise reason and recovery commands by default", () => {
    const lines = formatCliFailureLines({
      title: "Could not start the CLI.",
      error: new Error("config file is invalid"),
      argv: ["node", "supportClaw", "status"],
      env: {},
    });

    expect(lines).toEqual([
      "[supportClaw] Could not start the CLI.",
      "[supportClaw] Reason: config file is invalid",
      "[supportClaw] Debug: set SUPPORT_CLAW_DEBUG=1 to include the stack trace.",
      "[supportClaw] Try: supportClaw doctor",
      "[supportClaw] Help: supportClaw --help",
    ]);
  });

  it("prints stack details when debug output is requested", () => {
    const lines = formatCliFailureLines({
      title: "The CLI command failed.",
      error: new Error("boom"),
      env: { SUPPORT_CLAW_DEBUG: "1" },
    });

    expect(lines.slice(0, 4)).toEqual([
      "[supportClaw] The CLI command failed.",
      "[supportClaw] Reason: boom",
      "[supportClaw] Stack:",
      "[supportClaw] Error: boom",
    ]);
    expect(lines.join("\n")).toContain("Error: boom");
  });
});
