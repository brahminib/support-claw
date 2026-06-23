/**
 * Browser test-support re-exports from shared plugin-sdk test fixtures.
 */
export {
  createCliRuntimeCapture,
  expectGeneratedTokenPersistedToGatewayAuth,
  type CliMockOutputRuntime,
  type CliRuntimeCapture,
} from "supportClaw/plugin-sdk/test-fixtures";
export {
  createTempHomeEnv,
  withEnv,
  withEnvAsync,
  withFetchPreconnect,
  isLiveTestEnabled,
} from "supportClaw/plugin-sdk/test-env";
export type { FetchMock, TempHomeEnv } from "supportClaw/plugin-sdk/test-env";
export type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
