// Channel setup tests cover setup wizard finalize behavior and config write contracts.
import { runSetupWizardFinalize } from "supportClaw/plugin-sdk/plugin-test-runtime";
import { describe, expect, it } from "vitest";
import { createOptionalChannelSetupSurface } from "./channel-setup.js";

describe("createOptionalChannelSetupSurface", () => {
  it("returns a matched adapter and wizard for optional plugins", async () => {
    const setup = createOptionalChannelSetupSurface({
      channel: "example",
      label: "Example",
      npmSpec: "@supportclaw/example",
      docsPath: "/channels/example",
    });

    expect(setup.setupAdapter.resolveAccountId?.({ cfg: {} })).toBe("default");
    expect(
      setup.setupAdapter.validateInput?.({
        cfg: {},
        accountId: "default",
        input: {},
      }),
    ).toBe(
      "Example setup requires @supportclaw/example to be installed. Docs: https://docs.supportClaw.ai/channels/example",
    );
    expect(setup.setupWizard.channel).toBe("example");
    expect(setup.setupWizard.status.unconfiguredHint).toBe(
      "Example setup requires @supportclaw/example to be installed. Docs: https://docs.supportClaw.ai/channels/example",
    );
    await expect(
      runSetupWizardFinalize({
        finalize: setup.setupWizard.finalize,
        runtime: {
          log: () => {},
          error: () => {},
          exit: async () => {},
        },
      }),
    ).rejects.toThrow("@supportclaw/example");
  });
});
