// Qqbot plugin module implements qqbot test support behavior.
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";

export function makeQqbotSecretRefConfig(): SupportClawConfig {
  return {
    channels: {
      qqbot: {
        appId: "123456",
        clientSecret: {
          source: "env",
          provider: "default",
          id: "QQBOT_CLIENT_SECRET",
        },
      },
    },
  } as SupportClawConfig;
}

export function makeQqbotDefaultAccountConfig(): SupportClawConfig {
  return {
    channels: {
      qqbot: {
        defaultAccount: "bot2",
        accounts: {
          bot2: { appId: "123456" },
        },
      },
    },
  } as SupportClawConfig;
}
