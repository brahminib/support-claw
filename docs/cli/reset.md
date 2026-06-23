---
summary: "CLI reference for `supportClaw reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
title: "Reset"
---

# `supportClaw reset`

Reset local config/state (keeps the CLI installed).

Options:

- `--scope <scope>`: `config`, `config+creds+sessions`, or `full`
- `--yes`: skip confirmation prompts
- `--non-interactive`: disable prompts; requires `--scope` and `--yes`
- `--dry-run`: print actions without removing files

Examples:

```bash
supportClaw backup create
supportClaw reset
supportClaw reset --dry-run
supportClaw reset --scope config --yes --non-interactive
supportClaw reset --scope config+creds+sessions --yes --non-interactive
supportClaw reset --scope full --yes --non-interactive
```

Notes:

- Run `supportClaw backup create` first if you want a restorable snapshot before removing local state.
- If you omit `--scope`, `supportClaw reset` uses an interactive prompt to choose what to remove.
- `--non-interactive` is only valid when both `--scope` and `--yes` are set.

## Related

- [CLI reference](/cli)
