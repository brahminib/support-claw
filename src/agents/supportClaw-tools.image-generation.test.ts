// Verifies image-generation tool registration through the shared generation harness.
import { describeSupportClawGenerationToolRegistration } from "./supportClaw-tools.generation.test-support.js";

describeSupportClawGenerationToolRegistration({
  suiteName: "supportClaw tools image generation registration",
  toolName: "image_generate",
  toolLabel: "an image-generation tool",
});
