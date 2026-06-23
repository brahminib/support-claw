# @supportclaw/diagnostics-prometheus

Official Prometheus diagnostics exporter for SupportClaw.

This plugin exposes SupportClaw Gateway runtime metrics in Prometheus text format for Prometheus, Grafana, VictoriaMetrics, and compatible scrapers.

## Install

```bash
supportClaw plugins install @supportclaw/diagnostics-prometheus
```

Restart the Gateway after installing or updating the plugin.

## Configure

Enable the plugin and set the scrape endpoint options in `plugins.entries.diagnostics-prometheus.config`.

The full config surface, metric names, and scrape examples live in the docs:

- https://docs.supportClaw.ai/gateway/prometheus

## Package

- Plugin id: `diagnostics-prometheus`
- Package: `@supportclaw/diagnostics-prometheus`
- Minimum SupportClaw host: `2026.4.25`
