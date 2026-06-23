#!/usr/bin/env -S node --import tsx
// SupportClaw release ClawHub plan CLI emits release workflow routing as JSON.

import { pathToFileURL } from "node:url";
import {
  buildSupportClawReleaseClawHubPlan,
  parseSupportClawReleaseClawHubPlanArgs,
} from "./lib/supportClaw-release-clawhub-plan.ts";

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const args = parseSupportClawReleaseClawHubPlanArgs(process.argv.slice(2));
  const plan = await buildSupportClawReleaseClawHubPlan(args);
  console.log(JSON.stringify(plan, null, 2));
}
