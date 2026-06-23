# @supportclaw/pixverse-provider

Official PixVerse video generation provider plugin for SupportClaw.

This plugin registers PixVerse as a `video_generate` provider for text-to-video and image-to-video workflows.

## Install

```bash
supportClaw plugins install @supportclaw/pixverse-provider
```

Restart the Gateway after installing or updating the plugin.

## Configure

Store your PixVerse API key in SupportClaw config or expose the supported environment variable to the Gateway. Then select PixVerse as a video generation provider.

Full setup and model/provider examples:

- https://docs.supportClaw.ai/providers/pixverse

## Package

- Plugin id: `pixverse`
- Package: `@supportclaw/pixverse-provider`
- Minimum SupportClaw host: `2026.5.26`
