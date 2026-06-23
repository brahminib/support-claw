---
summary: "Uninstall SupportClaw completely (CLI, service, state, workspace)"
read_when:
  - You want to remove SupportClaw from a machine
  - The gateway service is still running after uninstall
title: "Uninstall"
---

Two paths:

- **Easy path** if `supportClaw` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
supportClaw uninstall
```

When using the CLI, state removal preserves configured workspace directories unless you also select `--workspace`.

Preview what will be removed (safe):

```bash
supportClaw uninstall --dry-run --all
```

Non-interactive (automation / npx). Use with caution and only after confirming scopes:

```bash
supportClaw uninstall --all --yes --non-interactive
npx -y supportClaw uninstall --all --yes --non-interactive
```

Manual steps (same result):

1. Stop the gateway service:

```bash
supportClaw gateway stop
```

2. Uninstall the gateway service (launchd/systemd/schtasks):

```bash
supportClaw gateway uninstall
```

3. Delete state + config:

```bash
rm -rf "${SUPPORT_CLAW_STATE_DIR:-$HOME/.supportClaw}"
```

If you set `SUPPORT_CLAW_CONFIG_PATH` to a custom location outside the state dir, delete that file too.
If you want to keep a workspace inside the state dir, such as `~/.supportClaw/workspace`, move it aside before running `rm -rf` or delete state contents selectively.

4. Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/.supportClaw/workspace
```

5. Remove the CLI install (pick the one you used):

```bash
npm rm -g supportClaw
pnpm remove -g supportClaw
bun remove -g supportClaw
```

6. If you installed the macOS app:

```bash
rm -rf /Applications/SupportClaw.app
```

Notes:

- If you used profiles (`--profile` / `SUPPORT_CLAW_PROFILE`), repeat step 3 for each state dir (defaults are `~/.supportClaw-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `supportClaw` is missing.

### macOS (launchd)

Default label is `ai.supportClaw.gateway` (or `ai.supportClaw.<profile>`; legacy `com.supportClaw.*` may still exist):

```bash
launchctl bootout gui/$UID/ai.supportClaw.gateway
rm -f ~/Library/LaunchAgents/ai.supportClaw.gateway.plist
```

If you used a profile, replace the label and plist name with `ai.supportClaw.<profile>`. Remove any legacy `com.supportClaw.*` plists if present.

### Linux (systemd user unit)

Default unit name is `supportClaw-gateway.service` (or `supportClaw-gateway-<profile>.service`):

```bash
systemctl --user disable --now supportClaw-gateway.service
rm -f ~/.config/systemd/user/supportClaw-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `SupportClaw Gateway` (or `SupportClaw Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "SupportClaw Gateway"
Remove-Item -Force "$env:USERPROFILE\.supportClaw\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.supportClaw-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://supportClaw.ai/install.sh` or `install.ps1`, the CLI was installed with `npm install -g supportClaw@latest`.
Remove it with `npm rm -g supportClaw` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `supportClaw ...` / `bun run supportClaw ...`):

1. Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2. Delete the repo directory.
3. Remove state + workspace as shown above.

## Related

- [Install overview](/install)
- [Migration guide](/install/migrating)
