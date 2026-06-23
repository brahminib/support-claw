// Daemon runtime hint tests cover platform-specific daemon guidance.
import { describe, expect, it } from "vitest";
import { buildPlatformRuntimeLogHints, buildPlatformServiceStartHints } from "./runtime-hints.js";

describe("buildPlatformRuntimeLogHints", () => {
  it("renders launchd log hints on darwin", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "darwin",
        env: {
          HOME: "/Users/test",
          SUPPORT_CLAW_STATE_DIR: "/tmp/supportClaw-state",
          SUPPORT_CLAW_LOG_PREFIX: "gateway",
        },
        systemdServiceName: "supportClaw-gateway",
        windowsTaskName: "SupportClaw Gateway",
      }),
    ).toEqual([
      "Launchd stdout (if installed): /Users/test/Library/Logs/supportClaw/gateway.log",
      "Launchd stderr (if installed): suppressed",
      "Restart attempts: /tmp/supportClaw-state/logs/gateway-restart.log",
    ]);
  });

  it("renders systemd and windows hints by platform", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "linux",
        env: {
          SUPPORT_CLAW_STATE_DIR: "/tmp/supportClaw-state",
        },
        systemdServiceName: "supportClaw-gateway",
        windowsTaskName: "SupportClaw Gateway",
      }),
    ).toEqual([
      "Logs: journalctl --user -u supportClaw-gateway.service -n 200 --no-pager",
      "Restart attempts: /tmp/supportClaw-state/logs/gateway-restart.log",
    ]);
    expect(
      buildPlatformRuntimeLogHints({
        platform: "win32",
        env: {
          SUPPORT_CLAW_STATE_DIR: "/tmp/supportClaw-state",
        },
        systemdServiceName: "supportClaw-gateway",
        windowsTaskName: "SupportClaw Gateway",
      }),
    ).toEqual([
      'Logs: schtasks /Query /TN "SupportClaw Gateway" /V /FO LIST',
      "Restart attempts: /tmp/supportClaw-state/logs/gateway-restart.log",
    ]);
  });
});

describe("buildPlatformServiceStartHints", () => {
  it("builds platform-specific service start hints", () => {
    expect(
      buildPlatformServiceStartHints({
        platform: "darwin",
        installCommand: "supportClaw gateway install",
        startCommand: "supportClaw gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.supportClaw.gateway.plist",
        systemdServiceName: "supportClaw-gateway",
        windowsTaskName: "SupportClaw Gateway",
      }),
    ).toEqual([
      "supportClaw gateway install",
      "supportClaw gateway",
      "launchctl bootstrap gui/$UID ~/Library/LaunchAgents/com.supportClaw.gateway.plist",
    ]);
    expect(
      buildPlatformServiceStartHints({
        platform: "linux",
        installCommand: "supportClaw gateway install",
        startCommand: "supportClaw gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.supportClaw.gateway.plist",
        systemdServiceName: "supportClaw-gateway",
        windowsTaskName: "SupportClaw Gateway",
      }),
    ).toEqual([
      "supportClaw gateway install",
      "supportClaw gateway",
      "systemctl --user start supportClaw-gateway.service",
    ]);
  });
});
