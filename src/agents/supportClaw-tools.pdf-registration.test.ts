// Verifies PDF tool factory output is included in SupportClaw tool registration.
import { describe, expect, it } from "vitest";
import { collectPresentSupportClawTools } from "./supportClaw-tools.registration.js";
import { createPdfTool } from "./tools/pdf-tool.js";

describe("createSupportClawTools PDF registration", () => {
  it("includes the pdf tool when the pdf factory returns a tool", () => {
    const pdfTool = createPdfTool({
      agentDir: "/tmp/supportClaw-agent-main",
      config: {
        agents: {
          defaults: {
            pdfModel: { primary: "openai/gpt-5.4-mini" },
          },
        },
      },
    });

    expect(pdfTool?.name).toBe("pdf");
    expect(collectPresentSupportClawTools([pdfTool]).map((tool) => tool.name)).toEqual(["pdf"]);
  });
});
