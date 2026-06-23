// Tests shared utility helpers used by CLI and runtime modules.
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { MAX_TIMER_TIMEOUT_MS } from "./shared/number-coercion.js";
import { withTempDir } from "./test-helpers/temp-dir.js";
import { withEnv } from "./test-utils/env.js";
import {
  CONFIG_DIR,
  ensureDir,
  pinConfigDir,
  resolveConfigDir,
  resolveHomeDir,
  resolveUserPath,
  shortenHomeInString,
  shortenHomePath,
  sleep,
} from "./utils.js";

describe("ensureDir", () => {
  it("creates nested directory", async () => {
    await withTempDir({ prefix: "supportClaw-test-" }, async (tmp) => {
      const target = path.join(tmp, "nested", "dir");
      await ensureDir(target);
      expect(fs.existsSync(target)).toBe(true);
    });
  });
});

describe("sleep", () => {
  it("resolves after delay using fake timers", async () => {
    vi.useFakeTimers();
    try {
      const promise = sleep(1000);
      vi.advanceTimersByTime(1000);
      await expect(promise).resolves.toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it("clamps oversized sleep delays before scheduling", async () => {
    vi.useFakeTimers();
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    try {
      const promise = sleep(Number.MAX_SAFE_INTEGER);

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), MAX_TIMER_TIMEOUT_MS);

      vi.advanceTimersByTime(MAX_TIMER_TIMEOUT_MS);
      await expect(promise).resolves.toBeUndefined();
    } finally {
      setTimeoutSpy.mockRestore();
      vi.useRealTimers();
    }
  });
});

describe("resolveConfigDir", () => {
  it("prefers ~/.supportClaw when legacy dir is missing", async () => {
    await withTempDir({ prefix: "supportClaw-config-dir-" }, async (root) => {
      const newDir = path.join(root, ".supportClaw");
      await fs.promises.mkdir(newDir, { recursive: true });
      const resolved = resolveConfigDir({} as NodeJS.ProcessEnv, () => root);
      expect(resolved).toBe(newDir);
    });
  });

  it("expands SUPPORT_CLAW_STATE_DIR using the provided env", () => {
    const env = {
      HOME: "/tmp/supportClaw-home",
      SUPPORT_CLAW_STATE_DIR: "~/state",
    } as NodeJS.ProcessEnv;

    expect(resolveConfigDir(env)).toBe(path.resolve("/tmp/supportClaw-home", "state"));
  });

  it("falls back to the config file directory when only SUPPORT_CLAW_CONFIG_PATH is set", () => {
    const env = {
      HOME: "/tmp/supportClaw-home",
      SUPPORT_CLAW_CONFIG_PATH: "~/profiles/dev/supportClaw.json",
    } as NodeJS.ProcessEnv;

    expect(resolveConfigDir(env)).toBe(path.resolve("/tmp/supportClaw-home", "profiles", "dev"));
  });

  it("re-pins the exported configuration root after startup environment selection", () => {
    const originalConfigDir = CONFIG_DIR;
    const selectedConfigDir = path.resolve("/tmp/supportClaw-selected-config-root");
    try {
      expect(
        pinConfigDir({
          SUPPORT_CLAW_STATE_DIR: selectedConfigDir,
          SUPPORT_CLAW_TEST_FAST: "1",
        }),
      ).toBe(selectedConfigDir);
      expect(CONFIG_DIR).toBe(selectedConfigDir);
    } finally {
      pinConfigDir({
        SUPPORT_CLAW_STATE_DIR: originalConfigDir,
        SUPPORT_CLAW_TEST_FAST: "1",
      });
    }
  });
});

describe("resolveHomeDir", () => {
  it("prefers SUPPORT_CLAW_HOME over HOME", () => {
    withEnv({ SUPPORT_CLAW_HOME: "/srv/supportClaw-home", HOME: "/home/other" }, () => {
      expect(resolveHomeDir()).toBe(path.resolve("/srv/supportClaw-home"));
    });
  });
});

describe("shortenHomePath", () => {
  it("uses $SUPPORT_CLAW_HOME prefix when SUPPORT_CLAW_HOME is set", () => {
    withEnv({ SUPPORT_CLAW_HOME: "/srv/supportClaw-home", HOME: "/home/other" }, () => {
      expect(shortenHomePath(`${path.resolve("/srv/supportClaw-home")}/.supportClaw/supportClaw.json`)).toBe(
        "$SUPPORT_CLAW_HOME/.supportClaw/supportClaw.json",
      );
    });
  });
});

describe("shortenHomeInString", () => {
  it("uses $SUPPORT_CLAW_HOME replacement when SUPPORT_CLAW_HOME is set", () => {
    withEnv({ SUPPORT_CLAW_HOME: "/srv/supportClaw-home", HOME: "/home/other" }, () => {
      expect(
        shortenHomeInString(
          `config: ${path.resolve("/srv/supportClaw-home")}/.supportClaw/supportClaw.json`,
        ),
      ).toBe("config: $SUPPORT_CLAW_HOME/.supportClaw/supportClaw.json");
    });
  });
});

describe("resolveUserPath", () => {
  it("expands ~ to home dir", () => {
    expect(resolveUserPath("~", {}, () => "/Users/thoffman")).toBe(path.resolve("/Users/thoffman"));
  });

  it("expands ~/ to home dir", () => {
    expect(resolveUserPath("~/supportClaw", {}, () => "/Users/thoffman")).toBe(
      path.resolve("/Users/thoffman", "supportClaw"),
    );
  });

  it("resolves relative paths", () => {
    expect(resolveUserPath("tmp/dir")).toBe(path.resolve("tmp/dir"));
  });

  it("prefers SUPPORT_CLAW_HOME for tilde expansion", () => {
    withEnv({ SUPPORT_CLAW_HOME: "/srv/supportClaw-home", HOME: "/home/other" }, () => {
      expect(resolveUserPath("~/supportClaw")).toBe(path.resolve("/srv/supportClaw-home", "supportClaw"));
    });
  });

  it("uses the provided env for tilde expansion", () => {
    const env = {
      HOME: "/tmp/supportClaw-home",
      SUPPORT_CLAW_HOME: "/srv/supportClaw-home",
    } as NodeJS.ProcessEnv;

    expect(resolveUserPath("~/supportClaw", env)).toBe(path.resolve("/srv/supportClaw-home", "supportClaw"));
  });

  it("keeps blank paths blank", () => {
    expect(resolveUserPath("")).toBe("");
    expect(resolveUserPath("   ")).toBe("");
  });

  it("returns empty string for undefined/null input", () => {
    expect(resolveUserPath(undefined as unknown as string)).toBe("");
    expect(resolveUserPath(null as unknown as string)).toBe("");
  });
});
