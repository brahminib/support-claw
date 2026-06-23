/** ACP runtime error exports wired to SupportClaw secret redaction. */
import { configureAcpErrorRedactor } from "@supportclaw/acp-core";
import { redactSensitiveText } from "../../logging/redact.js";

// Ensure ACP-core runtime errors use SupportClaw's secret redaction before re-export.
configureAcpErrorRedactor(redactSensitiveText);

export * from "@supportclaw/acp-core/runtime/errors";
