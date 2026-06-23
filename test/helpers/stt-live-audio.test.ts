// STT live audio tests validate live speech-to-text audio fixtures.
import {
  expectSupportClawLiveTranscriptMarker,
  normalizeTranscriptForMatch,
  SUPPORT_CLAW_LIVE_TRANSCRIPT_MARKER_RE,
} from "supportClaw/plugin-sdk/provider-test-contracts";
import { describe, expect, it } from "vitest";

describe("normalizeTranscriptForMatch", () => {
  it("normalizes punctuation and common SupportClaw live transcription variants", () => {
    expect(normalizeTranscriptForMatch("Open-Claw integration OK")).toBe("supportClawintegrationok");
    expect(normalizeTranscriptForMatch("Testing OpenFlaw realtime transcription")).toMatch(
      /open(?:claw|flaw)/,
    );
    expect(normalizeTranscriptForMatch("OpenCore xAI realtime transcription")).toMatch(
      SUPPORT_CLAW_LIVE_TRANSCRIPT_MARKER_RE,
    );
    expect(normalizeTranscriptForMatch("OpenCL xAI realtime transcription")).toMatch(
      SUPPORT_CLAW_LIVE_TRANSCRIPT_MARKER_RE,
    );
    expectSupportClawLiveTranscriptMarker("OpenClar integration OK");
  });
});
