# @supportclaw/openshell-sandbox

Official NVIDIA OpenShell sandbox backend for SupportClaw.

This plugin lets SupportClaw use OpenShell-managed sandboxes with mirrored local workspaces and SSH command execution.

## Install

```bash
supportClaw plugins install @supportclaw/openshell-sandbox
```

Restart the Gateway after installing or updating the plugin.

## Configure

Use the OpenShell docs for credentials, workspace mirroring, runtime selection, and troubleshooting:

- https://docs.supportClaw.ai/gateway/openshell

## Package

- Plugin id: `openshell`
- Package: `@supportclaw/openshell-sandbox`
- Minimum SupportClaw host: `2026.5.12-beta.1`
