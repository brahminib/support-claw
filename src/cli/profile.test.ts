// Profile CLI tests cover profile selection, persistence, and command wiring.
import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "supportClaw", "gateway", "--dev", "--allow-unconfigured"]);
  });

  it("leaves gateway --dev for subcommands after leading root options", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "--no-color",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual([
      "node",
      "supportClaw",
      "--no-color",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "supportClaw", "--dev", "gateway"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "supportClaw", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "supportClaw", "--profile", "work", "status"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "supportClaw", "status"]);
  });

  it("parses interleaved --profile after the command token", () => {
    const res = parseCliProfileArgs(["node", "supportClaw", "status", "--profile", "work", "--deep"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "supportClaw", "status", "--deep"]);
  });

  it("preserves Matrix QA --profile for the command parser", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "qa",
      "matrix",
      "--profile",
      "fast",
      "--fail-fast",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual([
      "node",
      "supportClaw",
      "qa",
      "matrix",
      "--profile",
      "fast",
      "--fail-fast",
    ]);
  });

  it("preserves Matrix QA --profile after leading root options", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "--no-color",
      "qa",
      "matrix",
      "--profile=fast",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "supportClaw", "--no-color", "qa", "matrix", "--profile=fast"]);
  });

  it("parses qa run --profile smoke-ci as a root profile", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "qa",
      "run",
      "--profile",
      "smoke-ci",
      "--category",
      "agent-runtime-and-provider-execution.agent-turn-execution",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("smoke-ci");
    expect(res.argv).toEqual([
      "node",
      "supportClaw",
      "qa",
      "run",
      "--category",
      "agent-runtime-and-provider-execution.agent-turn-execution",
    ]);
  });

  it("parses qa run --profile=release self-check invocations as root profiles", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "qa",
      "run",
      "--profile=release",
      "--output",
      "qa-report.md",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("release");
    expect(res.argv).toEqual(["node", "supportClaw", "qa", "run", "--output", "qa-report.md"]);
  });

  it("preserves qa run --qa-profile for the command parser", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "qa",
      "run",
      "--qa-profile",
      "smoke-ci",
      "--surface",
      "agent-runtime-and-provider-execution",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual([
      "node",
      "supportClaw",
      "qa",
      "run",
      "--qa-profile",
      "smoke-ci",
      "--surface",
      "agent-runtime-and-provider-execution",
    ]);
  });

  it("parses arbitrary qa run --profile values as root profiles", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "qa",
      "run",
      "--profile",
      "work",
      "--output",
      "qa-report.md",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "supportClaw", "qa", "run", "--output", "qa-report.md"]);
  });

  it("parses arbitrary qa run --profile= values as root profiles", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "qa",
      "run",
      "--profile=work",
      "--output",
      "qa-report.md",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "supportClaw", "qa", "run", "--output", "qa-report.md"]);
  });

  it("still parses root --profile before qa run", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "--profile",
      "work",
      "qa",
      "run",
      "--qa-profile",
      "smoke-ci",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "supportClaw", "qa", "run", "--qa-profile", "smoke-ci"]);
  });

  it("still parses root --profile before Matrix QA", () => {
    const res = parseCliProfileArgs([
      "node",
      "supportClaw",
      "--profile",
      "work",
      "qa",
      "matrix",
      "--fail-fast",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "supportClaw", "qa", "matrix", "--fail-fast"]);
  });

  it("parses interleaved --dev after the command token", () => {
    const res = parseCliProfileArgs(["node", "supportClaw", "status", "--dev"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "supportClaw", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "supportClaw", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it.each([
    ["--dev first", ["node", "supportClaw", "--dev", "--profile", "work", "status"]],
    ["--profile first", ["node", "supportClaw", "--profile", "work", "--dev", "status"]],
    ["interleaved after command", ["node", "supportClaw", "status", "--profile", "work", "--dev"]],
  ])("rejects combining --dev with --profile (%s)", (_name, argv) => {
    const res = parseCliProfileArgs(argv);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join(path.resolve("/home/peter"), ".supportClaw-dev");
    expect(env.SUPPORT_CLAW_PROFILE).toBe("dev");
    expect(env.SUPPORT_CLAW_STATE_DIR).toBe(expectedStateDir);
    expect(env.SUPPORT_CLAW_CONFIG_PATH).toBe(path.join(expectedStateDir, "supportClaw.json"));
    expect(env.SUPPORT_CLAW_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      SUPPORT_CLAW_PROFILE: "prod",
      SUPPORT_CLAW_STATE_DIR: "/custom",
      SUPPORT_CLAW_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.SUPPORT_CLAW_PROFILE).toBe("dev");
    expect(env.SUPPORT_CLAW_STATE_DIR).toBe("/custom");
    expect(env.SUPPORT_CLAW_GATEWAY_PORT).toBe("19099");
    expect(env.SUPPORT_CLAW_CONFIG_PATH).toBe(path.join("/custom", "supportClaw.json"));
  });

  it("uses SUPPORT_CLAW_HOME when deriving profile state dir", () => {
    const env: Record<string, string | undefined> = {
      SUPPORT_CLAW_HOME: "/srv/supportClaw-home",
      HOME: "/home/other",
    };
    applyCliProfileEnv({
      profile: "work",
      env,
      homedir: () => "/home/fallback",
    });

    const resolvedHome = path.resolve("/srv/supportClaw-home");
    expect(env.SUPPORT_CLAW_STATE_DIR).toBe(path.join(resolvedHome, ".supportClaw-work"));
    expect(env.SUPPORT_CLAW_CONFIG_PATH).toBe(
      path.join(resolvedHome, ".supportClaw-work", "supportClaw.json"),
    );
  });
});

describe("formatCliCommand", () => {
  it.each([
    {
      name: "no profile is set",
      cmd: "supportClaw doctor --fix",
      env: {},
      expected: "supportClaw doctor --fix",
    },
    {
      name: "profile is default",
      cmd: "supportClaw doctor --fix",
      env: { SUPPORT_CLAW_PROFILE: "default" },
      expected: "supportClaw doctor --fix",
    },
    {
      name: "profile is Default (case-insensitive)",
      cmd: "supportClaw doctor --fix",
      env: { SUPPORT_CLAW_PROFILE: "Default" },
      expected: "supportClaw doctor --fix",
    },
    {
      name: "profile is invalid",
      cmd: "supportClaw doctor --fix",
      env: { SUPPORT_CLAW_PROFILE: "bad profile" },
      expected: "supportClaw doctor --fix",
    },
    {
      name: "--profile is already present",
      cmd: "supportClaw --profile work doctor --fix",
      env: { SUPPORT_CLAW_PROFILE: "work" },
      expected: "supportClaw --profile work doctor --fix",
    },
    {
      name: "--dev is already present",
      cmd: "supportClaw --dev doctor",
      env: { SUPPORT_CLAW_PROFILE: "dev" },
      expected: "supportClaw --dev doctor",
    },
  ])("returns command unchanged when $name", ({ cmd, env, expected }) => {
    expect(formatCliCommand(cmd, env)).toBe(expected);
  });

  it("inserts --profile flag when profile is set", () => {
    expect(formatCliCommand("supportClaw doctor --fix", { SUPPORT_CLAW_PROFILE: "work" })).toBe(
      "supportClaw --profile work doctor --fix",
    );
  });

  it("trims whitespace from profile", () => {
    expect(formatCliCommand("supportClaw doctor --fix", { SUPPORT_CLAW_PROFILE: "  jbsupportClaw  " })).toBe(
      "supportClaw --profile jbsupportClaw doctor --fix",
    );
  });

  it("handles command with no args after supportClaw", () => {
    expect(formatCliCommand("supportClaw", { SUPPORT_CLAW_PROFILE: "test" })).toBe(
      "supportClaw --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm supportClaw doctor", { SUPPORT_CLAW_PROFILE: "work" })).toBe(
      "pnpm supportClaw --profile work doctor",
    );
  });

  it("inserts --container when a container hint is set", () => {
    expect(
      formatCliCommand("supportClaw gateway status --deep", { SUPPORT_CLAW_CONTAINER_HINT: "demo" }),
    ).toBe("supportClaw --container demo gateway status --deep");
  });

  it("ignores unsafe container hints", () => {
    expect(
      formatCliCommand("supportClaw gateway status --deep", {
        SUPPORT_CLAW_CONTAINER_HINT: "demo; rm -rf /",
      }),
    ).toBe("supportClaw gateway status --deep");
  });

  it("preserves both --container and --profile hints", () => {
    expect(
      formatCliCommand("supportClaw doctor", {
        SUPPORT_CLAW_CONTAINER_HINT: "demo",
        SUPPORT_CLAW_PROFILE: "work",
      }),
    ).toBe("supportClaw --container demo doctor");
  });

  it("does not prepend --container for update commands", () => {
    expect(formatCliCommand("supportClaw update", { SUPPORT_CLAW_CONTAINER_HINT: "demo" })).toBe(
      "supportClaw update",
    );
    expect(
      formatCliCommand("pnpm supportClaw update --channel beta", { SUPPORT_CLAW_CONTAINER_HINT: "demo" }),
    ).toBe("pnpm supportClaw update --channel beta");
  });
});
