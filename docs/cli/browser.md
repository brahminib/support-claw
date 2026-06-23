---
summary: "CLI reference for `supportClaw browser` (lifecycle, profiles, tabs, actions, state, and debugging)"
read_when:
  - You use `supportClaw browser` and want examples for common tasks
  - You want to control a browser running on another machine via a node host
  - You want to attach to your local signed-in Chrome via Chrome MCP
title: "Browser"
---

# `supportClaw browser`

Manage SupportClaw's browser control surface and run browser actions (lifecycle, profiles, tabs, snapshots, screenshots, navigation, input, state emulation, and debugging).

Related:

- Browser tool + API: [Browser tool](/tools/browser)

## Common flags

- `--url <gatewayWsUrl>`: Gateway WebSocket URL (defaults to config).
- `--token <token>`: Gateway token (if required).
- `--timeout <ms>`: request timeout (ms).
- `--expect-final`: wait for a final Gateway response.
- `--browser-profile <name>`: choose a browser profile (default from config).
- `--json`: machine-readable output (where supported).

## Quick start (local)

```bash
supportClaw browser profiles
supportClaw browser --browser-profile supportClaw start
supportClaw browser --browser-profile supportClaw open https://example.com
supportClaw browser --browser-profile supportClaw snapshot
```

Agents can run the same readiness check with `browser({ action: "doctor" })`.

## Quick troubleshooting

If `start` fails with `not reachable after start`, troubleshoot CDP readiness first. If `start` and `tabs` succeed but `open` or `navigate` fails, the browser control plane is healthy and the failure is usually navigation SSRF policy.

Minimal sequence:

```bash
supportClaw browser --browser-profile supportClaw doctor
supportClaw browser --browser-profile supportClaw start
supportClaw browser --browser-profile supportClaw tabs
supportClaw browser --browser-profile supportClaw open https://example.com
```

Detailed guidance: [Browser troubleshooting](/tools/browser#cdp-startup-failure-vs-navigation-ssrf-block)

## Lifecycle

```bash
supportClaw browser status
supportClaw browser doctor
supportClaw browser doctor --deep
supportClaw browser start
supportClaw browser start --headless
supportClaw browser stop
supportClaw browser --browser-profile supportClaw reset-profile
```

Notes:

- `doctor --deep` adds a live snapshot probe. It is useful when basic CDP
  readiness is green but you want proof that the current tab can be inspected.
- For `attachOnly` and remote CDP profiles, `supportClaw browser stop` closes the
  active control session and clears temporary emulation overrides even when
  SupportClaw did not launch the browser process itself.
- For local managed profiles, `supportClaw browser stop` stops the spawned browser
  process.
- `supportClaw browser start --headless` applies only to that start request and
  only when SupportClaw launches a local managed browser. It does not rewrite
  `browser.headless` or profile config, and it is a no-op for an already-running
  browser.
- On Linux hosts without `DISPLAY` or `WAYLAND_DISPLAY`, local managed profiles
  run headless automatically unless `SUPPORT_CLAW_BROWSER_HEADLESS=0`,
  `browser.headless=false`, or `browser.profiles.<name>.headless=false`
  explicitly requests a visible browser.

## If the command is missing

If `supportClaw browser` is an unknown command, check `plugins.allow` in
`~/.supportClaw/supportClaw.json`.

When `plugins.allow` is present, list the bundled browser plugin explicitly
unless the config already has a root `browser` block:

```json5
{
  plugins: {
    allow: ["telegram", "browser"],
  },
}
```

An explicit root `browser` block, for example `browser.enabled=true` or
`browser.profiles.<name>`, also activates the bundled browser plugin under a
restrictive plugin allowlist.

Related: [Browser tool](/tools/browser#missing-browser-command-or-tool)

## Profiles

Profiles are named browser routing configs. In practice:

- `supportClaw`: launches or attaches to a dedicated SupportClaw-managed Chrome instance (isolated user data dir).
- `user`: controls your existing signed-in Chrome session via Chrome DevTools MCP.
- custom CDP profiles: point at a local or remote CDP endpoint.

```bash
supportClaw browser profiles
supportClaw browser create-profile --name work --color "#FF5A36"
supportClaw browser create-profile --name chrome-live --driver existing-session
supportClaw browser create-profile --name remote --cdp-url https://browser-host.example.com
supportClaw browser delete-profile --name work
```

Use a specific profile:

```bash
supportClaw browser --browser-profile work tabs
```

## Tabs

```bash
supportClaw browser tabs
supportClaw browser tab new --label docs
supportClaw browser tab label t1 docs
supportClaw browser tab select 2
supportClaw browser tab close 2
supportClaw browser open https://docs.supportClaw.ai --label docs
supportClaw browser focus docs
supportClaw browser close t1
```

`tabs` returns `suggestedTargetId` first, then the stable `tabId` such as `t1`,
the optional label, and the raw `targetId`. Agents should pass
`suggestedTargetId` back into `focus`, `close`, snapshots, and actions. You can
assign a label with `open --label`, `tab new --label`, or `tab label`; labels,
tab ids, raw target ids, and unique target-id prefixes are all accepted.
The request field is still named `targetId` for compatibility, but it accepts
these tab references. Treat raw target ids as diagnostic handles, not durable
agent memory.
When Chromium replaces the underlying raw target during a navigation or form
submit, SupportClaw keeps the stable `tabId`/label attached to the replacement tab
when it can prove the match. Raw target ids remain volatile; prefer
`suggestedTargetId`.

## Snapshot / screenshot / actions

Snapshot:

```bash
supportClaw browser snapshot
supportClaw browser snapshot --urls
```

Screenshot:

```bash
supportClaw browser screenshot
supportClaw browser screenshot --full-page
supportClaw browser screenshot --ref e12
supportClaw browser screenshot --labels
```

Notes:

- `--full-page` is for page captures only; it cannot be combined with `--ref`
  or `--element`.
- `existing-session` / `user` profiles support page screenshots and `--ref`
  screenshots from snapshot output, but not CSS `--element` screenshots.
- `--labels` overlays current snapshot refs on the screenshot. On
  Playwright-backed profiles, it works with `--full-page` (full-page label
  overlay), `--ref` (element-clip label overlay by ARIA ref), and `--element`
  (element-clip label overlay by CSS selector); in element-clip modes, labels
  are projected relative to the element. The response also includes an
  `annotations` array with each ref's bounding box. Each item has `ref`,
  `number`, `role`, optional `name`, and `box: {x, y, width, height}`;
  coordinates are in the captured image's space (viewport / fullpage /
  element-relative). The field is omitted when empty.
  `existing-session` profiles render a chrome-mcp overlay on page screenshots
  but do not use the Playwright projection helper and do not include
  `annotations`; CSS `--element` screenshots are unsupported there. Without
  Playwright or chrome-mcp, labeled screenshots are not available. Prior
  releases ignored `--full-page`, `--ref`, and `--element` on labeled
  Playwright screenshots and always returned a viewport capture; labeled
  screenshots now honor those scopes.
- `snapshot --urls` appends discovered link destinations to AI snapshots so
  agents can choose direct navigation targets instead of guessing from link
  text alone.

Navigate/click/type (ref-based UI automation):

```bash
supportClaw browser navigate https://example.com
supportClaw browser click <ref>
supportClaw browser click-coords 120 340
supportClaw browser type <ref> "hello"
supportClaw browser press Enter
supportClaw browser hover <ref>
supportClaw browser scrollintoview <ref>
supportClaw browser drag <startRef> <endRef>
supportClaw browser select <ref> OptionA OptionB
supportClaw browser fill --fields '[{"ref":"1","value":"Ada"}]'
supportClaw browser wait --text "Done"
supportClaw browser evaluate --fn '(el) => el.textContent' --ref <ref>
supportClaw browser evaluate --fn 'const title = document.title; return title;'
supportClaw browser evaluate --timeout-ms 30000 --fn 'async () => { await window.ready; return true; }'
```

`evaluate --fn` accepts a function source, an expression, or a statement body.
Statement bodies are wrapped as async functions, so use `return` for the value
you want back. Use `evaluate --timeout-ms <ms>` when the page-side function may
need longer than the default evaluate timeout.

Action responses return the current raw `targetId` after action-triggered page
replacement when SupportClaw can prove the replacement tab. Scripts should still
store and pass `suggestedTargetId`/labels for long-lived workflows.

File + dialog helpers:

```bash
supportClaw browser upload /tmp/supportClaw/uploads/file.pdf --ref <ref>
supportClaw browser upload media://inbound/file.pdf --ref <ref>
supportClaw browser waitfordownload
supportClaw browser download <ref> report.pdf
supportClaw browser dialog --accept
supportClaw browser dialog --dismiss --dialog-id d1
```

Managed Chrome profiles save ordinary click-triggered downloads into the SupportClaw
downloads directory (`/tmp/supportClaw/downloads` by default, or the configured temp
root). Use `waitfordownload` or `download` when the agent needs to wait for a
specific file and return its path; those explicit waiters own the next download.
Uploads accept files from the SupportClaw temp uploads root and SupportClaw-managed
inbound media, including `media://inbound/<id>` and sandbox-relative
`media/inbound/<id>` references. Nested media refs, traversal, and arbitrary
local paths remain rejected.
When an action opens a modal dialog, the action response returns
`blockedByDialog` with `browserState.dialogs.pending`; pass `--dialog-id` to
answer it directly. Dialogs handled outside SupportClaw appear under
`browserState.dialogs.recent`.

## State and storage

Viewport + emulation:

```bash
supportClaw browser resize 1280 720
supportClaw browser set viewport 1280 720
supportClaw browser set offline on
supportClaw browser set media dark
supportClaw browser set timezone Europe/London
supportClaw browser set locale en-GB
supportClaw browser set geo 51.5074 -0.1278 --accuracy 25
supportClaw browser set device "iPhone 14"
supportClaw browser set headers '{"x-test":"1"}'
supportClaw browser set credentials myuser mypass
```

Cookies + storage:

```bash
supportClaw browser cookies
supportClaw browser cookies set session abc123 --url https://example.com
supportClaw browser cookies clear
supportClaw browser storage local get
supportClaw browser storage local set token abc123
supportClaw browser storage session clear
```

## Debugging

```bash
supportClaw browser console --level error
supportClaw browser pdf
supportClaw browser responsebody "**/api"
supportClaw browser highlight <ref>
supportClaw browser errors --clear
supportClaw browser requests --filter api
supportClaw browser trace start
supportClaw browser trace stop --out trace.zip
```

## Existing Chrome via MCP

Use the built-in `user` profile, or create your own `existing-session` profile:

```bash
supportClaw browser --browser-profile user tabs
supportClaw browser create-profile --name chrome-live --driver existing-session
supportClaw browser create-profile --name brave-live --driver existing-session --user-data-dir "~/Library/Application Support/BraveSoftware/Brave-Browser"
supportClaw browser create-profile --name chrome-port --driver existing-session --cdp-url http://127.0.0.1:9222
supportClaw browser --browser-profile chrome-live tabs
```

The default existing-session path is host-only Chrome MCP auto-connect. If the browser is already
running with a DevTools endpoint, pass `--cdp-url` so Chrome MCP attaches to that endpoint instead.
For Docker, Browserless, or other remote setups where Chrome MCP semantics are not needed, use a
CDP profile.

Current existing-session limits:

- snapshot-driven actions use refs, not CSS selectors
- `browser.actionTimeoutMs` defaults supported `act` requests to 60000 ms when
  callers omit `timeoutMs`; per-call `timeoutMs` still wins.
- `click` is left-click only
- `type` does not support `slowly=true`
- `press` does not support `delayMs`
- `hover`, `scrollintoview`, `drag`, `select`, `fill`, and `evaluate` reject
  per-call timeout overrides
- `select` supports one value only
- `wait --load networkidle` is not supported on existing-session profiles (works on managed and raw/remote CDP)
- file uploads require `--ref` / `--input-ref`, do not support CSS
  `--element`, and currently support one file at a time
- dialog hooks do not support `--timeout`
- screenshots support page captures and `--ref`, but not CSS `--element`
- `responsebody`, download interception, PDF export, and batch actions still
  require a managed browser or raw CDP profile

## Remote browser control (node host proxy)

If the Gateway runs on a different machine than the browser, run a **node host** on the machine that has Chrome/Brave/Edge/Chromium. The Gateway will proxy browser actions to that node (no separate browser control server required).

Use `gateway.nodes.browser.mode` to control auto-routing and `gateway.nodes.browser.node` to pin a specific node if multiple are connected.

Security + remote setup: [Browser tool](/tools/browser), [Remote access](/gateway/remote), [Tailscale](/gateway/tailscale), [Security](/gateway/security)

## Related

- [CLI reference](/cli)
- [Browser](/tools/browser)
