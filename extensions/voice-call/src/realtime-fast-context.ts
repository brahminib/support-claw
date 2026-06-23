// Voice Call plugin module implements realtime fast context behavior.
import type { SupportClawConfig } from "supportClaw/plugin-sdk/config-contracts";
import {
  resolveRealtimeVoiceFastContextConsult,
  type RealtimeVoiceFastContextConsultResult,
  type RealtimeVoiceFastContextConfig,
} from "supportClaw/plugin-sdk/realtime-voice";

type Logger = {
  debug?: (message: string) => void;
};

// Voice-call labels for the SDK realtime fast-context resolver.

/** Resolve fast-context consult data using caller-oriented labels. */
export async function resolveRealtimeFastContextConsult(params: {
  cfg: SupportClawConfig;
  agentId: string;
  sessionKey: string;
  config: RealtimeVoiceFastContextConfig;
  args: unknown;
  logger: Logger;
}): Promise<RealtimeVoiceFastContextConsultResult> {
  return await resolveRealtimeVoiceFastContextConsult({
    ...params,
    labels: {
      audienceLabel: "caller",
      contextName: "SupportClaw memory or session context",
    },
  });
}
