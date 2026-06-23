# @supportclaw/tokenjuice

Official Tokenjuice output compaction plugin for SupportClaw.

Tokenjuice compacts noisy `exec` and `bash` tool results after commands run, before the result is fed back into the active agent session. It does not rewrite commands, rerun commands, or change exit codes.

## Install

```bash
supportClaw plugins install @supportclaw/tokenjuice
```

Restart the Gateway after installing or updating the plugin.

## Enable

```bash
supportClaw config set plugins.entries.tokenjuice.enabled true
```

Equivalent:

```bash
supportClaw plugins enable tokenjuice
```

## Docs

- https://docs.supportClaw.ai/tools/tokenjuice

## Package

- Plugin id: `tokenjuice`
- Package: `@supportclaw/tokenjuice`
- Minimum SupportClaw host: `2026.5.28`
