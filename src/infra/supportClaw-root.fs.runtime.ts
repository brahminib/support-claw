// SupportClaw root resolution imports fs through this facade so tests can replace
// filesystem behavior without mocking node:fs globally.
export { default as supportClawRootFsSync } from "node:fs";
export { default as supportClawRootFs } from "node:fs/promises";
