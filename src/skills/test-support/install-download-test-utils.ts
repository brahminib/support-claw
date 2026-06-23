// Install download test utilities provide isolated state and workspace paths.
import {
  createSupportClawTestState,
  type SupportClawTestState,
} from "../../test-utils/supportClaw-test-state.js";

/** Creates isolated SupportClaw state for install download tests. */
export async function createInstallDownloadTestState(): Promise<SupportClawTestState> {
  return await createSupportClawTestState({
    layout: "state-only",
    prefix: "supportClaw-skills-install-",
  });
}
