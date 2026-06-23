// Matrix tests cover device health plugin behavior.
import { describe, expect, it } from "vitest";
import { isSupportClawManagedMatrixDevice, summarizeMatrixDeviceHealth } from "./device-health.js";

describe("matrix device health", () => {
  it("detects SupportClaw-managed device names", () => {
    expect(isSupportClawManagedMatrixDevice("SupportClaw Gateway")).toBe(true);
    expect(isSupportClawManagedMatrixDevice("SupportClaw Debug")).toBe(true);
    expect(isSupportClawManagedMatrixDevice("Element iPhone")).toBe(false);
    expect(isSupportClawManagedMatrixDevice(null)).toBe(false);
  });

  it("summarizes stale SupportClaw-managed devices separately from the current device", () => {
    const summary = summarizeMatrixDeviceHealth([
      {
        deviceId: "du314Zpw3A",
        displayName: "SupportClaw Gateway",
        current: true,
      },
      {
        deviceId: "BritdXC6iL",
        displayName: "SupportClaw Gateway",
        current: false,
      },
      {
        deviceId: "G6NJU9cTgs",
        displayName: "SupportClaw Debug",
        current: false,
      },
      {
        deviceId: "phone123",
        displayName: "Element iPhone",
        current: false,
      },
    ]);

    expect(summary).toEqual({
      currentDeviceId: "du314Zpw3A",
      currentSupportClawDevices: [
        {
          deviceId: "du314Zpw3A",
          displayName: "SupportClaw Gateway",
          current: true,
        },
      ],
      staleSupportClawDevices: [
        {
          deviceId: "BritdXC6iL",
          displayName: "SupportClaw Gateway",
          current: false,
        },
        {
          deviceId: "G6NJU9cTgs",
          displayName: "SupportClaw Debug",
          current: false,
        },
      ],
    });
  });
});
