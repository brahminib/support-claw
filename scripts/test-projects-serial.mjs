// Runs test-projects serially with a one-worker Vitest budget.
process.env.SUPPORT_CLAW_TEST_PROJECTS_SERIAL = "1";
process.env.SUPPORT_CLAW_VITEST_MAX_WORKERS = "1";

await import("./test-projects.mjs");
