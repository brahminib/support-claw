// Irc tests cover monitor plugin behavior.
import { describe, expect, it } from "vitest";
import { resolveIrcInboundTarget } from "./monitor.js";

describe("irc monitor inbound target", () => {
  it("keeps channel target for group messages", () => {
    expect(
      resolveIrcInboundTarget({
        target: "#supportClaw",
        senderNick: "alice",
      }),
    ).toEqual({
      isGroup: true,
      target: "#supportClaw",
      rawTarget: "#supportClaw",
    });
  });

  it("maps DM target to sender nick and preserves raw target", () => {
    expect(
      resolveIrcInboundTarget({
        target: "supportClaw-bot",
        senderNick: "alice",
      }),
    ).toEqual({
      isGroup: false,
      target: "alice",
      rawTarget: "supportClaw-bot",
    });
  });

  it("falls back to raw target when sender nick is empty", () => {
    expect(
      resolveIrcInboundTarget({
        target: "supportClaw-bot",
        senderNick: " ",
      }),
    ).toEqual({
      isGroup: false,
      target: "supportClaw-bot",
      rawTarget: "supportClaw-bot",
    });
  });
});
