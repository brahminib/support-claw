// Workspace default tests cover environment-variable precedence for the
// built-in agent workspace location.
import path from "node:path";
import { describe, expect, it } from "vitest";
import { withEnv } from "../test-utils/env.js";
import { resolveDefaultAgentWorkspaceDir } from "./workspace.js";

describe("DEFAULT_AGENT_WORKSPACE_DIR", () => {
  it("uses SUPPORT_CLAW_HOME when resolving the default workspace dir", () => {
    const home = path.join(path.sep, "srv", "supportClaw-home");

    const resolved = withEnv(
      {
        SUPPORT_CLAW_WORKSPACE_DIR: undefined,
        SUPPORT_CLAW_PROFILE: undefined,
        SUPPORT_CLAW_HOME: home,
        HOME: path.join(path.sep, "home", "other"),
      },
      () => resolveDefaultAgentWorkspaceDir(),
    );

    expect(resolved).toBe(path.join(path.resolve(home), ".supportClaw", "workspace"));
  });

  it("uses SUPPORT_CLAW_WORKSPACE_DIR before SUPPORT_CLAW_HOME", () => {
    const workspaceDir = path.join(path.sep, "srv", "supportClaw-workspace");

    const resolved = withEnv(
      {
        SUPPORT_CLAW_WORKSPACE_DIR: workspaceDir,
        SUPPORT_CLAW_HOME: path.join(path.sep, "srv", "supportClaw-home"),
      },
      () => resolveDefaultAgentWorkspaceDir(),
    );

    expect(resolved).toBe(path.resolve(workspaceDir));
  });
});
