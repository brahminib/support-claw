// Error output tests cover program-level error display and exit messaging.
import { describe, expect, it } from "vitest";
import { formatCliParseErrorOutput } from "./error-output.js";

describe("formatCliParseErrorOutput", () => {
  it("explains unknown commands with root help and plugin hints", () => {
    const output = formatCliParseErrorOutput("error: unknown command 'wat'\n", {
      argv: ["node", "supportClaw", "wat"],
    });

    expect(output).toBe(
      'SupportClaw does not know the command "wat".\nTry: supportClaw --help\nPlugin command? supportClaw plugins list\nDocs: https://docs.supportClaw.ai/cli\n',
    );
  });

  it("suggests close known commands for unknown commands", () => {
    const output = formatCliParseErrorOutput("error: unknown command 'upate'\n", {
      argv: ["node", "supportClaw", "upate"],
    });

    expect(output).toBe(
      'SupportClaw does not know the command "upate".\nDid you mean this?\n  supportClaw update\nTry: supportClaw --help\nPlugin command? supportClaw plugins list\nDocs: https://docs.supportClaw.ai/cli\n',
    );
  });

  it("suggests explicit aliases for common adjacent terminology", () => {
    const output = formatCliParseErrorOutput("error: unknown command 'upgrade'\n", {
      argv: ["node", "supportClaw", "upgrade"],
    });

    expect(output).toContain("Did you mean this?\n  supportClaw update\n");
  });

  it("preserves active profile context in command suggestions", () => {
    const originalProfile = process.env.SUPPORT_CLAW_PROFILE;
    process.env.SUPPORT_CLAW_PROFILE = "work";
    try {
      const output = formatCliParseErrorOutput("error: unknown command 'doctr'\n", {
        argv: ["node", "supportClaw", "doctr"],
      });

      expect(output).toContain("Did you mean this?\n  supportClaw --profile work doctor\n");
    } finally {
      if (originalProfile === undefined) {
        delete process.env.SUPPORT_CLAW_PROFILE;
      } else {
        process.env.SUPPORT_CLAW_PROFILE = originalProfile;
      }
    }
  });

  it("points unknown options at the active command help", () => {
    const output = formatCliParseErrorOutput("error: unknown option '--wat'\n", {
      argv: ["node", "supportClaw", "channels", "status", "--wat"],
    });

    expect(output).toBe(
      'SupportClaw does not recognize option "--wat".\nTry: supportClaw channels status --help\n',
    );
  });

  it("points missing required arguments at command help", () => {
    const output = formatCliParseErrorOutput("error: missing required argument 'name'\n", {
      argv: ["node", "supportClaw", "plugins", "install"],
    });

    expect(output).toBe(
      'Missing required argument "name".\nTry: supportClaw plugins install --help\n',
    );
  });
});
