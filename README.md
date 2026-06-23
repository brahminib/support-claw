# Support Claw

Support Claw is a customer support AI assistant built on top of the SupportClaw multi-channel assistant gateway. The goal of this project is to turn a general personal assistant framework into a support operations assistant that can triage inbound messages, draft replies, summarize customer context, and route issues across channels like Slack, Discord, Telegram, WhatsApp, and web chat.

This repository is a derived project based on [SupportClaw](https://github.com/brahminib/support-claw). SupportClaw's MIT license and third-party notices are preserved in this repo.

## Use Case

Support teams often receive customer requests from too many places at once. Support Claw is designed around a practical workflow:

- Capture inbound customer messages from connected channels.
- Classify messages by urgency, product area, and intent.
- Draft empathetic first responses for support agents.
- Summarize long customer conversations before escalation.
- Route billing, technical, account, and bug reports to the right owner.
- Maintain an auditable local assistant gateway instead of scattering support logic across many bots.

## Example Workflows

### Support Triage

```bash
support-claw agent --message "Classify this ticket: customer cannot reset password after receiving the code."
```

Expected assistant behavior:

- Detect the issue category: account access.
- Mark priority based on impact.
- Suggest troubleshooting steps.
- Draft a short support response.

### Reply Drafting

```bash
support-claw agent --message "Draft a calm reply explaining that the refund was processed and may take 5-10 business days."
```

Expected assistant behavior:

- Use a professional support tone.
- Keep the response concise.
- Avoid promising actions that have not happened.

### Escalation Summary

```bash
support-claw agent --message "Summarize this conversation for a senior engineer: user sees 500 errors after uploading CSV files over 20MB."
```

Expected assistant behavior:

- Extract symptoms, reproduction steps, customer impact, and missing details.
- Prepare a handoff note that an engineer can act on.

## Project Direction

The first version keeps SupportClaw's core gateway architecture intact and specializes the project through product positioning, configuration, prompts, and support-focused examples. Future implementation work can add:

- Support-specific agent templates.
- Ticket classification schemas.
- Slack/Discord routing rules.
- CRM or helpdesk integrations.
- Knowledge-base retrieval for product documentation.
- Guardrails for customer-facing answers.

## Install

Runtime: Node 24 recommended, or Node 22.19+.

```bash
npm install
npm run build
```

Run the local CLI:

```bash
node supportClawCli.mjs --help
```

After packaging or global install, the project exposes both command names:

```bash
support-claw --help
supportClaw --help
```

The `supportClaw` command is kept for compatibility with upstream scripts and documentation.

## Configuration

Copy the example environment file and fill in only the providers/channels you want to use:

```bash
cp .env.example .env
```

At minimum, configure one model provider key such as `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, or another provider supported by the underlying SupportClaw runtime.

For support use cases, start with one internal channel such as Slack or Discord before exposing customer-facing channels.

## Repository Notes

This project intentionally starts as a focused derivative:

- Root metadata and docs are branded for Support Claw.
- SupportClaw implementation modules remain available.
- Upstream license and notices remain intact.
- The package includes a `support-claw` CLI alias.

See [docs/SUPPORT_CLAW_USE_CASES.md](docs/SUPPORT_CLAW_USE_CASES.md) for the project-specific roadmap.

