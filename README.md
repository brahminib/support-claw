# Support Claw

Support Claw is an opinionated support-operations AI platform built on the SupportClaw multi-channel assistant gateway. It uses the gateway's mature channel, agent, security, and deployment architecture as a foundation for customer-support workflows across Slack, Discord, Telegram, WhatsApp, and web chat.

The platform is designed for teams that need one operational layer for understanding incoming requests, assisting human agents, retrieving company knowledge, and coordinating resolution work across channels.

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

The current release establishes the Support Claw foundation: the product identity, support-oriented configuration and workflows, and a user experience built for support teams. SupportClaw remains the underlying assistant gateway; Support Claw is the product layer that defines how that gateway is applied to support operations.

Future releases will add substantial support-specific capabilities rather than a set of isolated integrations:

- **AI Ticket Intelligence** for classification, intent detection, priority scoring, sentiment analysis, and escalation recommendations.
- **Support Agent Copilot** for response drafts, context-aware reply generation, conversation summaries, suggested next actions, and SLA-risk alerts.
- **Knowledge & Retrieval** for product documentation, internal runbooks, company knowledge, and grounded dynamic answers.
- **Workflow Automation** for multi-channel routing, team assignment, escalation paths, follow-up automation, and resolution tracking.
- **CRM & Helpdesk Integrations** for Zendesk, Freshdesk, HubSpot, Salesforce, and custom ticketing systems.
- **Analytics & Operations** for ticket trends, root-cause detection, agent productivity, customer sentiment reporting, and SLA monitoring.

See [docs/SUPPORT_CLAW_USE_CASES.md](docs/SUPPORT_CLAW_USE_CASES.md) for the staged product roadmap and the distinction between the current foundation and planned capabilities.

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

## Platform Foundation

- SupportClaw supplies the underlying assistant gateway and multi-channel runtime.
- Support Claw owns the support-operations product direction, workflows, and future support-specific capabilities.
- The package includes a `support-claw` CLI alias for the product surface.
