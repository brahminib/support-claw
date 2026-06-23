// Verifies bundled capability runtime registration from plugin metadata.
import { describe, expect, it } from "vitest";
import { buildVitestCapabilityShimAliasMap } from "./bundled-capability-runtime.js";

describe("buildVitestCapabilityShimAliasMap", () => {
  it("keeps scoped and unscoped capability shim aliases aligned", () => {
    const aliasMap = buildVitestCapabilityShimAliasMap();

    expect(aliasMap["supportClaw/plugin-sdk/config-runtime"]).toBe(
      aliasMap["@supportclaw/plugin-sdk/config-runtime"],
    );
    expect(aliasMap["supportClaw/plugin-sdk/media-runtime"]).toBe(
      aliasMap["@supportclaw/plugin-sdk/media-runtime"],
    );
    expect(aliasMap["supportClaw/plugin-sdk/provider-onboard"]).toBe(
      aliasMap["@supportclaw/plugin-sdk/provider-onboard"],
    );
    expect(aliasMap["supportClaw/plugin-sdk/speech-core"]).toBe(
      aliasMap["@supportclaw/plugin-sdk/speech-core"],
    );
  });
});
