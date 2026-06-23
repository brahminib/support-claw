// Matrix plugin module implements device health behavior.
export type MatrixManagedDeviceInfo = {
  deviceId: string;
  displayName: string | null;
  current: boolean;
};

export type MatrixDeviceHealthSummary = {
  currentDeviceId: string | null;
  staleSupportClawDevices: MatrixManagedDeviceInfo[];
  currentSupportClawDevices: MatrixManagedDeviceInfo[];
};

const SUPPORT_CLAW_DEVICE_NAME_PREFIX = "SupportClaw ";

export function isSupportClawManagedMatrixDevice(displayName: string | null | undefined): boolean {
  return displayName?.startsWith(SUPPORT_CLAW_DEVICE_NAME_PREFIX) === true;
}

export function summarizeMatrixDeviceHealth(
  devices: MatrixManagedDeviceInfo[],
): MatrixDeviceHealthSummary {
  const currentDeviceId = devices.find((device) => device.current)?.deviceId ?? null;
  const supportClawDevices = devices.filter((device) =>
    isSupportClawManagedMatrixDevice(device.displayName),
  );
  return {
    currentDeviceId,
    staleSupportClawDevices: supportClawDevices.filter((device) => !device.current),
    currentSupportClawDevices: supportClawDevices.filter((device) => device.current),
  };
}
