---
summary: "ClawHub CLI entry points for discovering, installing, publishing, and verifying SupportClaw skills and plugins."
read_when:
  - You want to use ClawHub from the command line
  - You want to install ClawHub skills or plugins through SupportClaw
  - You want to publish ClawHub packages
title: "ClawHub CLI"
---

# ClawHub CLI

SupportClaw has two command-line entry points for ClawHub:

- `supportClaw skills` and `supportClaw plugins` install and manage ClawHub packages
  inside SupportClaw.
- The standalone `clawhub` CLI handles publisher workflows such as login,
  publish, transfer, and sync.

## Discover and install

Use SupportClaw commands when you want to install or update packages for a local
SupportClaw agent or Gateway.

```bash
supportClaw skills search "calendar"
supportClaw skills install <slug>
supportClaw skills update <slug>
supportClaw skills verify <slug>

supportClaw plugins search "calendar"
supportClaw plugins install clawhub:<package>
supportClaw plugins update <id-or-npm-spec>
```

Skill installs target the active workspace `skills/` directory by default. Add
`--global` to install into the shared managed skills directory.

Plugin installs use the `clawhub:` prefix when you want ClawHub resolution
instead of npm or another install source.

## Publish and maintain

Install the standalone ClawHub CLI for publisher workflows:

```bash
npm i -g clawhub
clawhub login
```

Publish plugin packages with `clawhub package publish`:

```bash
clawhub package publish your-org/your-plugin --dry-run
clawhub package publish your-org/your-plugin
clawhub package publish your-org/your-plugin@v1.0.0
```

Publish skill folders with `clawhub skill publish`:

```bash
clawhub skill publish ./skills/review-helper
clawhub skill publish ./skills/review-helper --version 1.0.0
```

When local skill scan state or package ownership needs maintenance, use the
relevant standalone command:

```bash
clawhub sync --all
clawhub package transfer @old-owner/package --to new-owner
```

## Related

- [`supportClaw skills`](/cli/skills) - local skill search, install, update, and
  verification
- [`supportClaw plugins`](/cli/plugins) - plugin search, install, update, and
  inspection
- [ClawHub publishing](/clawhub/publishing) - owner scope, release validation,
  and review flow
- [Creating skills](/tools/creating-skills) - skill authoring and publish flow
- [Building plugins](/plugins/building-plugins) - plugin package authoring
