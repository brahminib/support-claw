// Tests SupportClaw execution environment construction.
import { describe, expect, it } from "vitest";
import {
  ensureSupportClawExecMarkerOnProcess,
  markSupportClawExecEnv,
  SUPPORT_CLAW_CLI_ENV_VALUE,
  SUPPORT_CLAW_CLI_ENV_VAR,
} from "./supportClaw-exec-env.js";

describe("markSupportClawExecEnv", () => {
  it("returns a cloned env object with the exec marker set", () => {
    const env = { PATH: "/usr/bin", SUPPORT_CLAW_CLI: "0" };
    const marked = markSupportClawExecEnv(env);

    expect(marked).toEqual({
      PATH: "/usr/bin",
      SUPPORT_CLAW_CLI: SUPPORT_CLAW_CLI_ENV_VALUE,
    });
    expect(marked).not.toBe(env);
    expect(env.SUPPORT_CLAW_CLI).toBe("0");
  });
});

describe("ensureSupportClawExecMarkerOnProcess", () => {
  it.each([
    {
      name: "mutates and returns the provided process env",
      env: { PATH: "/usr/bin" } as NodeJS.ProcessEnv,
    },
    {
      name: "overwrites an existing marker on the provided process env",
      env: { PATH: "/usr/bin", [SUPPORT_CLAW_CLI_ENV_VAR]: "0" } as NodeJS.ProcessEnv,
    },
  ])("$name", ({ env }) => {
    expect(ensureSupportClawExecMarkerOnProcess(env)).toBe(env);
    expect(env[SUPPORT_CLAW_CLI_ENV_VAR]).toBe(SUPPORT_CLAW_CLI_ENV_VALUE);
  });

  it("defaults to mutating process.env when no env object is provided", () => {
    const previous = process.env[SUPPORT_CLAW_CLI_ENV_VAR];
    delete process.env[SUPPORT_CLAW_CLI_ENV_VAR];

    try {
      expect(ensureSupportClawExecMarkerOnProcess()).toBe(process.env);
      expect(process.env[SUPPORT_CLAW_CLI_ENV_VAR]).toBe(SUPPORT_CLAW_CLI_ENV_VALUE);
    } finally {
      if (previous === undefined) {
        delete process.env[SUPPORT_CLAW_CLI_ENV_VAR];
      } else {
        process.env[SUPPORT_CLAW_CLI_ENV_VAR] = previous;
      }
    }
  });
});
