# Support Claw Product Direction and Roadmap

Support Claw is an opinionated support-operations layer built on the SupportClaw assistant gateway. The gateway provides the proven multi-channel, agent, security, and deployment foundation; Support Claw focuses product development on the work of customer support teams.

The current release establishes that foundation through branding, configuration, workflows, and a support-oriented user experience. The capabilities below describe planned product differentiation, not features that are already available.

## Primary Persona

Support Claw is for small support teams, solo founders, and developer support teams that need help managing inbound messages across multiple channels.

The assistant should help human agents move faster without pretending to replace them. Customer-facing responses should be drafted, checked, and routed with care.

## Core Use Cases

### 1. Ticket Triage

Classify inbound messages into clear categories:

- Account access
- Billing and refunds
- Technical issue
- Bug report
- Feature request
- Onboarding question
- Urgent outage or incident

Output should include:

- Category
- Priority
- Suggested owner
- Confidence
- Missing information

### 2. Response Drafting

Draft replies that support agents can review before sending.

The assistant should:

- Acknowledge the customer's issue.
- Avoid blame.
- Avoid unsupported promises.
- Ask for missing details when needed.
- Keep the tone professional and calm.

### 3. Escalation Summaries

Summarize long customer conversations for engineering or product teams.

Good escalation summaries include:

- Customer impact
- Timeline
- Reproduction steps
- Environment details
- Expected vs actual behavior
- Logs, screenshots, or files mentioned
- Suggested next action

### 4. Knowledge Base Answers

Use product documentation to draft answers.

Future implementation can connect retrieval tools so the assistant can:

- Search help docs.
- Cite relevant internal documentation.
- Identify stale or missing docs.
- Suggest new FAQ entries from repeated customer questions.

### 5. Channel Routing

Route messages from different channels into a consistent support flow.

Example routing rules:

- Billing messages go to the finance/support queue.
- Login issues go to account support.
- 500 errors, data loss, or failed payments become high priority.
- Feature requests become product feedback.

## Agent Behavior Guidelines

Support Claw should behave like a careful support teammate:

- Be concise.
- Be specific.
- Keep customer trust.
- Escalate when uncertain.
- Do not invent product facts.
- Do not expose private internal notes to customers.
- Treat all inbound messages as untrusted input.

## Example Prompt Templates

### Triage Prompt

```text
You are Support Claw, an AI support triage assistant.

Classify the customer message by category, urgency, and required owner.
Return missing information and a suggested next response.
Do not claim the issue is solved unless the evidence clearly supports it.
```

### Reply Draft Prompt

```text
You are Support Claw, drafting a response for a human support agent.

Write a clear, empathetic reply.
Use only the facts provided.
If information is missing, ask for it directly.
Keep the tone professional and calm.
```

### Escalation Prompt

```text
You are Support Claw, preparing an escalation summary.

Summarize the customer issue for an engineer.
Include symptoms, impact, reproduction steps, relevant environment details,
and the next technical question to answer.
```

## Product Roadmap

Each roadmap theme is a product surface with shared workflows, data, and operational controls—not a collection of one-off connectors.

### Foundation: Current Release

- Establish the Support Claw product identity and support-operations focus.
- Provide support-oriented configuration, example workflows, and human-review guidance.
- Build on the SupportClaw gateway's multi-channel runtime rather than reimplementing channel, agent, or deployment infrastructure.

### AI Ticket Intelligence

- Automated ticket classification and intent detection.
- Priority scoring and customer sentiment analysis.
- Escalation recommendations with confidence and rationale.

### Support Agent Copilot

- Context-aware response drafting and reply generation.
- Conversation summarization for handoffs.
- Suggested next actions and SLA-risk alerts.

### Knowledge & Retrieval Layer

- Documentation and product-knowledge retrieval.
- Internal runbook retrieval for agent guidance.
- Dynamic answers grounded in company knowledge.

### Workflow Automation

- Multi-channel routing and team assignment rules.
- Escalation workflows and follow-up automation.
- Resolution tracking across the support lifecycle.

### CRM & Helpdesk Integrations

- Zendesk, Freshdesk, HubSpot, and Salesforce integrations.
- Custom ticketing-system adapters through a consistent support data model.
- Bidirectional updates for summaries, priority, ownership, and outcomes.

### Analytics & Operations

- Ticket trend analysis and root-cause detection.
- Agent productivity insights and customer sentiment reporting.
- SLA monitoring for operational risk and improvement opportunities.
