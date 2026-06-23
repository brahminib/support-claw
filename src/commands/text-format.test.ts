// Text format tests cover command-facing shortening helpers.
import { describe, expect, it } from "vitest";
import { shortenText } from "./text-format.js";

describe("shortenText", () => {
  it("returns original text when it fits", () => {
    expect(shortenText("supportClaw", 16)).toBe("supportClaw");
  });

  it("truncates and appends ellipsis when over limit", () => {
    expect(shortenText("supportClaw-status-output", 10)).toBe("supportClaw-…");
  });

  it("counts multi-byte characters correctly", () => {
    expect(shortenText("hello🙂world", 7)).toBe("hello🙂…");
  });
});
