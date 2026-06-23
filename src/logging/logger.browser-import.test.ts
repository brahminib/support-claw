// Logger browser import tests cover safe import behavior in browser-like runtimes.
import { importFreshModule } from "supportClaw/plugin-sdk/test-fixtures";
import { afterEach, describe, expect, it, vi } from "vitest";

type LoggerModule = typeof import("./logger.js");

const originalGetBuiltinModule = (
  process as NodeJS.Process & { getBuiltinModule?: (id: string) => unknown }
).getBuiltinModule;

async function importBrowserSafeLogger(params?: {
  resolvePreferredSupportClawTmpDir?: ReturnType<typeof vi.fn>;
}): Promise<{
  module: LoggerModule;
  resolvePreferredSupportClawTmpDir: ReturnType<typeof vi.fn>;
}> {
  const resolvePreferredSupportClawTmpDir =
    params?.resolvePreferredSupportClawTmpDir ??
    vi.fn(() => {
      throw new Error("resolvePreferredSupportClawTmpDir should not run during browser-safe import");
    });

  vi.doMock("../infra/tmp-supportClaw-dir.js", async () => {
    const actual = await vi.importActual<typeof import("../infra/tmp-supportClaw-dir.js")>(
      "../infra/tmp-supportClaw-dir.js",
    );
    return {
      ...actual,
      resolvePreferredSupportClawTmpDir,
    };
  });

  Object.defineProperty(process, "getBuiltinModule", {
    configurable: true,
    value: undefined,
  });

  const module = await importFreshModule<LoggerModule>(
    import.meta.url,
    "./logger.js?scope=browser-safe",
  );
  return { module, resolvePreferredSupportClawTmpDir };
}

describe("logging/logger browser-safe import", () => {
  afterEach(() => {
    vi.doUnmock("../infra/tmp-supportClaw-dir.js");
    Object.defineProperty(process, "getBuiltinModule", {
      configurable: true,
      value: originalGetBuiltinModule,
    });
  });

  it("does not resolve the preferred temp dir at import time when node fs is unavailable", async () => {
    const { module, resolvePreferredSupportClawTmpDir } = await importBrowserSafeLogger();

    expect(resolvePreferredSupportClawTmpDir).not.toHaveBeenCalled();
    expect(module.DEFAULT_LOG_DIR).toBe("/tmp/supportClaw");
    expect(module.DEFAULT_LOG_FILE).toBe("/tmp/supportClaw/supportClaw.log");
  });

  it("disables file logging when imported in a browser-like environment", async () => {
    const { module, resolvePreferredSupportClawTmpDir } = await importBrowserSafeLogger();

    expect(module.getResolvedLoggerSettings()).toStrictEqual({
      level: "silent",
      file: "/tmp/supportClaw/supportClaw.log",
      maxFileBytes: 100 * 1024 * 1024,
    });
    expect(module.isFileLogLevelEnabled("info")).toBe(false);
    expect(module.getLogger().info("browser-safe")).toBeUndefined();
    expect(resolvePreferredSupportClawTmpDir).not.toHaveBeenCalled();
  });
});
