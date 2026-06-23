import { describe, expect, it } from "vitest";
import {
  supportClawNpmPrepublishVerifyUsage,
  parseSupportClawNpmPrepublishVerifyArgs,
} from "../scripts/supportClaw-npm-prepublish-verify.ts";

describe("parseSupportClawNpmPrepublishVerifyArgs", () => {
  it("supports help, optional versions, and package-manager separators", () => {
    expect(parseSupportClawNpmPrepublishVerifyArgs(["--help"])).toEqual({
      help: true,
      tarballPath: "",
    });
    expect(parseSupportClawNpmPrepublishVerifyArgs(["supportClaw.tgz"])).toEqual({
      help: false,
      tarballPath: "supportClaw.tgz",
    });
    expect(parseSupportClawNpmPrepublishVerifyArgs(["--", "supportClaw.tgz", "2026.3.23"])).toEqual({
      expectedVersion: "2026.3.23",
      help: false,
      tarballPath: "supportClaw.tgz",
    });
  });

  it("rejects missing, option-like, and extra arguments before installing", () => {
    expect(() => parseSupportClawNpmPrepublishVerifyArgs([])).toThrow(
      supportClawNpmPrepublishVerifyUsage(),
    );
    expect(() => parseSupportClawNpmPrepublishVerifyArgs(["--tag"])).toThrow(
      "Unknown supportClaw npm prepublish verifier option: --tag",
    );
    expect(() => parseSupportClawNpmPrepublishVerifyArgs(["supportClaw.tgz", "--tag"])).toThrow(
      "Unknown supportClaw npm prepublish verifier option: --tag",
    );
    expect(() =>
      parseSupportClawNpmPrepublishVerifyArgs(["supportClaw.tgz", "2026.3.23", "extra"]),
    ).toThrow("Unexpected supportClaw npm prepublish verifier argument: extra");
  });
});
