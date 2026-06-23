// Tests isolated SupportClaw test-state setup and cleanup behavior.
import fs from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadPersistedAuthProfileStore } from "../agents/auth-profiles/persisted.js";
import { withEnvAsync } from "./env.js";
import { createSupportClawTestState, withSupportClawTestState } from "./supportClaw-test-state.js";

async function expectPathMissing(targetPath: string): Promise<void> {
  try {
    await fs.stat(targetPath);
  } catch (error) {
    expect((error as NodeJS.ErrnoException).code).toBe("ENOENT");
    return;
  }
  throw new Error(`expected missing path: ${targetPath}`);
}

describe("supportClaw test state", () => {
  it("creates an isolated home layout with spawn env and restores process env", async () => {
    const previousHome = process.env.HOME;
    const previousSupportClawHome = process.env.SUPPORT_CLAW_HOME;
    const previousStateDir = process.env.SUPPORT_CLAW_STATE_DIR;
    const previousConfigPath = process.env.SUPPORT_CLAW_CONFIG_PATH;

    const state = await createSupportClawTestState({
      label: "unit",
      scenario: "minimal",
    });

    try {
      expect(state.home).toBe(path.join(state.root, "home"));
      expect(state.stateDir).toBe(path.join(state.home, ".supportClaw"));
      expect(state.configPath).toBe(path.join(state.stateDir, "supportClaw.json"));
      expect(state.workspaceDir).toBe(path.join(state.home, "workspace"));
      expect(state.env.HOME).toBe(state.home);
      expect(state.env.SUPPORT_CLAW_HOME).toBe(state.home);
      expect(state.env.SUPPORT_CLAW_STATE_DIR).toBe(state.stateDir);
      expect(state.env.SUPPORT_CLAW_CONFIG_PATH).toBe(state.configPath);
      expect(process.env.HOME).toBe(state.home);
      expect(process.env.SUPPORT_CLAW_HOME).toBe(state.home);
      expect(JSON.parse(await fs.readFile(state.configPath, "utf8"))).toStrictEqual({});
    } finally {
      await state.cleanup();
    }

    expect(process.env.HOME).toBe(previousHome);
    expect(process.env.SUPPORT_CLAW_HOME).toBe(previousSupportClawHome);
    expect(process.env.SUPPORT_CLAW_STATE_DIR).toBe(previousStateDir);
    expect(process.env.SUPPORT_CLAW_CONFIG_PATH).toBe(previousConfigPath);
    await expectPathMissing(state.root);
  });

  it("supports state-only layout without overriding HOME", async () => {
    const previousHome = process.env.HOME;

    await withSupportClawTestState(
      {
        layout: "state-only",
        scenario: "empty",
      },
      async (state) => {
        expect(process.env.HOME).toBe(previousHome);
        expect(process.env.SUPPORT_CLAW_STATE_DIR).toBe(state.stateDir);
        expect(process.env.SUPPORT_CLAW_CONFIG_PATH).toBe(state.configPath);
        expect(state.env.HOME).toBe(previousHome);
        await expectPathMissing(state.configPath);
      },
    );
  });

  it("clears inherited agent-dir overrides by default", async () => {
    await withEnvAsync({ SUPPORT_CLAW_AGENT_DIR: "/tmp/outside-supportClaw-agent" }, async () => {
      const state = await createSupportClawTestState({
        layout: "state-only",
      });

      try {
        expect(process.env.SUPPORT_CLAW_AGENT_DIR).toBeUndefined();
        expect(state.env.SUPPORT_CLAW_AGENT_DIR).toBeUndefined();
        expect(state.agentDir()).toBe(path.join(state.stateDir, "agents", "main", "agent"));
      } finally {
        await state.cleanup();
      }

      expect(process.env.SUPPORT_CLAW_AGENT_DIR).toBe("/tmp/outside-supportClaw-agent");
    });
  });

  it("allows explicit agent-dir overrides when a test needs them", async () => {
    await withSupportClawTestState(
      {
        env: {
          SUPPORT_CLAW_AGENT_DIR: "/tmp/explicit-supportClaw-agent",
        },
      },
      async (state) => {
        expect(process.env.SUPPORT_CLAW_AGENT_DIR).toBe("/tmp/explicit-supportClaw-agent");
        expect(state.env.SUPPORT_CLAW_AGENT_DIR).toBe("/tmp/explicit-supportClaw-agent");
      },
    );
  });

  it("can route agent-dir env vars to the isolated main agent store", async () => {
    await withSupportClawTestState(
      {
        agentEnv: "main",
      },
      async (state) => {
        expect(process.env.SUPPORT_CLAW_AGENT_DIR).toBe(state.agentDir());
        expect(state.env.SUPPORT_CLAW_AGENT_DIR).toBe(state.agentDir());
      },
    );
  });

  it("writes scenario configs and auth profile stores", async () => {
    await withSupportClawTestState(
      {
        scenario: "update-stable",
      },
      async (state) => {
        expect(JSON.parse(await fs.readFile(state.configPath, "utf8"))).toEqual({
          update: {
            channel: "stable",
          },
          plugins: {},
        });

        const profilePath = await state.writeAuthProfiles({
          version: 1,
          profiles: {
            "openai:test": {
              type: "api_key",
              provider: "openai",
              key: "sk-test",
            },
          },
        });

        expect(profilePath).toBe(path.join(state.agentDir(), "supportClaw-agent.sqlite"));
        const profiles = loadPersistedAuthProfileStore(state.agentDir());
        expect(profiles?.version).toBe(1);
        expect(profiles?.profiles["openai:test"]?.provider).toBe("openai");
      },
    );
  });

  it("creates upgrade survivor fixture state", async () => {
    await withSupportClawTestState(
      {
        scenario: "upgrade-survivor",
      },
      async (state) => {
        const config = JSON.parse(await fs.readFile(state.configPath, "utf8"));
        expect(config.update?.channel).toBe("stable");
        expect(config.plugins?.enabled).toBe(true);
        expect(config.plugins?.allow).toStrictEqual(["discord", "telegram", "whatsapp", "memory"]);
      },
    );
  });

  it("keeps external-service env scoped to the fixture", async () => {
    const previousPolicy = process.env.SUPPORT_CLAW_SERVICE_REPAIR_POLICY;

    await withSupportClawTestState(
      {
        scenario: "external-service",
      },
      async (state) => {
        expect(process.env.SUPPORT_CLAW_SERVICE_REPAIR_POLICY).toBe("external");
        expect(state.env.SUPPORT_CLAW_SERVICE_REPAIR_POLICY).toBe("external");
      },
    );

    expect(process.env.SUPPORT_CLAW_SERVICE_REPAIR_POLICY).toBe(previousPolicy);
  });
});
