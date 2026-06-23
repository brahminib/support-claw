---
summary: "Supervise Codex app-server sessions from SupportClaw."
read_when:
  - You are installing, configuring, or auditing the codex-supervisor plugin
title: "Codex Supervisor plugin"
---

# Codex Supervisor plugin

Supervise Codex app-server sessions from SupportClaw.

## Distribution

- Package: `@supportclaw/codex-supervisor`
- Install route: included in SupportClaw

## Surface

contracts: tools

<!-- supportClaw-plugin-reference:manual-start -->

## Session Listing

`codex_sessions_list` defaults to loaded Codex sessions only. Set `include_stored` to include stored history; the plugin uses Codex app-server's state-DB-only listing path and caps stored results at 200 by default. Pass `max_stored_sessions` to lower or raise that cap, up to 1000.

<!-- supportClaw-plugin-reference:manual-end -->
