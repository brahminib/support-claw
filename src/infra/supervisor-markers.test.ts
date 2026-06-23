// Covers supervisor marker files used to identify managed SupportClaw processes.
import { describe, expect, it } from "vitest";
import { detectRespawnSupervisor, SUPERVISOR_HINT_ENV_VARS } from "./supervisor-markers.js";

describe("SUPERVISOR_HINT_ENV_VARS", () => {
  it("includes the cross-platform supervisor hint env vars", () => {
    const envVars = new Set(SUPERVISOR_HINT_ENV_VARS);
    expect(envVars.has("LAUNCH_JOB_LABEL")).toBe(true);
    expect(envVars.has("INVOCATION_ID")).toBe(true);
    expect(envVars.has("SUPPORT_CLAW_WINDOWS_TASK_NAME")).toBe(true);
    expect(envVars.has("SUPPORT_CLAW_SERVICE_MARKER")).toBe(true);
    expect(envVars.has("SUPPORT_CLAW_SERVICE_KIND")).toBe(true);
  });
});

describe("detectRespawnSupervisor", () => {
  it("detects launchd from SupportClaw's explicit marker or current gateway launchd job", () => {
    expect(
      detectRespawnSupervisor({ SUPPORT_CLAW_LAUNCHD_LABEL: " ai.supportClaw.gateway " }, "darwin"),
    ).toBe("launchd");
    expect(detectRespawnSupervisor({ SUPPORT_CLAW_LAUNCHD_LABEL: "   " }, "darwin")).toBeNull();
    expect(detectRespawnSupervisor({ LAUNCH_JOB_LABEL: "ai.supportClaw.gateway" }, "darwin")).toBe(
      "launchd",
    );
    expect(
      detectRespawnSupervisor(
        { LAUNCH_JOB_NAME: "ai.supportClaw.work", SUPPORT_CLAW_PROFILE: "work" },
        "darwin",
      ),
    ).toBe("launchd");
    expect(detectRespawnSupervisor({ LAUNCH_JOB_LABEL: "ai.supportClaw.mac" }, "darwin")).toBeNull();
    expect(detectRespawnSupervisor({ XPC_SERVICE_NAME: "ai.supportClaw.mac" }, "darwin")).toBeNull();
    expect(
      detectRespawnSupervisor(
        { XPC_SERVICE_NAME: "ai.supportClaw.mac", SUPPORT_CLAW_PROFILE: "mac" },
        "darwin",
      ),
    ).toBeNull();
    expect(detectRespawnSupervisor({ XPC_SERVICE_NAME: "ai.supportClaw.gateway" }, "darwin")).toBe(
      "launchd",
    );
  });

  it("detects systemd only from non-blank platform-specific hints", () => {
    expect(detectRespawnSupervisor({ INVOCATION_ID: "abc123" }, "linux")).toBe("systemd");
    expect(detectRespawnSupervisor({ JOURNAL_STREAM: "" }, "linux")).toBeNull();
  });

  it("detects Linux SupportClaw gateway service markers only for opt-in callers", () => {
    const gatewayServiceEnv = {
      SUPPORT_CLAW_SERVICE_MARKER: " supportClaw ",
      SUPPORT_CLAW_SERVICE_KIND: " gateway ",
    };
    expect(detectRespawnSupervisor(gatewayServiceEnv, "linux")).toBeNull();
    expect(
      detectRespawnSupervisor(gatewayServiceEnv, "linux", {
        includeLinuxSupportClawGatewayServiceMarker: true,
      }),
    ).toBe("systemd");
    expect(
      detectRespawnSupervisor(
        {
          SUPPORT_CLAW_SERVICE_MARKER: "supportClaw",
          SUPPORT_CLAW_SERVICE_KIND: "worker",
        },
        "linux",
        { includeLinuxSupportClawGatewayServiceMarker: true },
      ),
    ).toBeNull();
    expect(
      detectRespawnSupervisor(
        {
          SUPPORT_CLAW_SERVICE_MARKER: "other",
          SUPPORT_CLAW_SERVICE_KIND: "gateway",
        },
        "linux",
        { includeLinuxSupportClawGatewayServiceMarker: true },
      ),
    ).toBeNull();
  });

  it("detects scheduled-task supervision on Windows from either hint family", () => {
    expect(
      detectRespawnSupervisor({ SUPPORT_CLAW_WINDOWS_TASK_NAME: "SupportClaw Gateway" }, "win32"),
    ).toBe("schtasks");
    expect(
      detectRespawnSupervisor(
        {
          SUPPORT_CLAW_SERVICE_MARKER: "supportClaw",
          SUPPORT_CLAW_SERVICE_KIND: "gateway",
        },
        "win32",
      ),
    ).toBe("schtasks");
    expect(
      detectRespawnSupervisor(
        {
          SUPPORT_CLAW_SERVICE_MARKER: "supportClaw",
          SUPPORT_CLAW_SERVICE_KIND: "worker",
        },
        "win32",
      ),
    ).toBeNull();
  });

  it("ignores service markers on non-Windows platforms and unknown platforms", () => {
    expect(
      detectRespawnSupervisor(
        {
          SUPPORT_CLAW_SERVICE_MARKER: "supportClaw",
          SUPPORT_CLAW_SERVICE_KIND: "gateway",
        },
        "linux",
      ),
    ).toBeNull();
    expect(
      detectRespawnSupervisor({ LAUNCH_JOB_LABEL: "ai.supportClaw.gateway" }, "freebsd"),
    ).toBeNull();
  });
});
