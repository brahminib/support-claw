// Verifies video-generation tool registration through the shared generation harness.
import { describeSupportClawGenerationToolRegistration } from "./supportClaw-tools.generation.test-support.js";

describeSupportClawGenerationToolRegistration({
  suiteName: "supportClaw tools video generation registration",
  toolName: "video_generate",
  toolLabel: "a video-generation tool",
});
