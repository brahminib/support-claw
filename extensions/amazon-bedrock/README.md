# SupportClaw Amazon Bedrock Provider

Official SupportClaw provider plugin for Amazon Bedrock. It adds Bedrock model discovery, text generation, embeddings, and guardrail-aware provider routing for agents that use AWS-hosted models.

Install from SupportClaw:

```bash
supportClaw plugin add @supportclaw/amazon-bedrock-provider
```

Configure AWS credentials and region through your normal SupportClaw credential/profile setup, then select Bedrock models with the `amazon-bedrock/...` provider prefix.
