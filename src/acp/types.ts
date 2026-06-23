/** ACP protocol helpers and SupportClaw agent identity metadata. */
export { normalizeAcpProvenanceMode } from "@supportclaw/acp-core/types";
import { VERSION } from "../version.js";

/** ACP agent identity advertised during protocol initialization. */
export const ACP_AGENT_INFO = {
  name: "supportClaw-acp",
  title: "SupportClaw ACP Gateway",
  version: VERSION,
};
