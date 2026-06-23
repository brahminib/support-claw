---
summary: "Generated inventory of SupportClaw plugins shipped in core, published externally, or kept source-only"
read_when:
  - You are deciding whether a plugin ships in the core npm package or installs separately
  - You are updating bundled plugin package metadata or release automation
  - You need the canonical internal vs external plugin list
title: "Plugin inventory"
---

# Plugin inventory

This page is generated from `extensions/*/package.json`, `supportClaw.plugin.json`,
and the root npm package `files` exclusions. Regenerate it with:

```bash
pnpm plugins:inventory:gen
```

## Definitions

- **Core npm package:** built into the `supportClaw` npm package and available without a separate plugin install.
- **Official external package:** SupportClaw-maintained plugin omitted from the core npm package, kept in this official inventory, and installed on demand through ClawHub and/or npm.
- **Source checkout only:** repo-local plugin omitted from published npm artifacts and not advertised as an installable package.

Source checkouts are different from npm installs: after `pnpm install`, bundled
plugins load from `extensions/<id>` so local edits and package-local workspace
dependencies are available.

## Install a plugin

Use the install route in each entry to decide whether install is needed. Plugins
that say `included in SupportClaw` are already present in the core package.
Official external packages need one install, then a Gateway restart.

For example, Discord is an official external package:

```bash
supportClaw plugins install @supportclaw/discord
supportClaw gateway restart
supportClaw plugins inspect discord --runtime --json
```

During the launch cutover, ordinary bare package specs still install from npm.
Use `clawhub:@supportclaw/discord` or `npm:@supportclaw/discord` when you need an
explicit source. After install, follow the plugin's setup doc, such as
[Discord](/channels/discord), to add credentials and channel config. See
[Manage plugins](/plugins/manage-plugins) for update, uninstall, and publishing
commands.

Each entry lists the package, distribution route, and description.

## Core npm package

59 plugins

- **[admin-http-rpc](/plugins/reference/admin-http-rpc)** (`@supportclaw/admin-http-rpc`) - included in SupportClaw. SupportClaw admin HTTP RPC endpoint.

- **[alibaba](/plugins/reference/alibaba)** (`@supportclaw/alibaba-provider`) - included in SupportClaw. Adds video generation provider support.

- **[anthropic](/plugins/reference/anthropic)** (`@supportclaw/anthropic-provider`) - included in SupportClaw. Adds Anthropic model provider support to SupportClaw.

- **[azure-speech](/plugins/reference/azure-speech)** (`@supportclaw/azure-speech`) - included in SupportClaw. Azure AI Speech text-to-speech (MP3, native Ogg/Opus voice notes, PCM telephony).

- **[bonjour](/plugins/reference/bonjour)** (`@supportclaw/bonjour`) - included in SupportClaw. Advertise the local SupportClaw gateway over Bonjour/mDNS.

- **[browser](/plugins/reference/browser)** (`@supportclaw/browser-plugin`) - included in SupportClaw. Adds agent-callable tools.

- **[byteplus](/plugins/reference/byteplus)** (`@supportclaw/byteplus-provider`) - included in SupportClaw. Adds BytePlus, BytePlus Plan model provider support to SupportClaw.

- **[canvas](/plugins/reference/canvas)** (`@supportclaw/canvas-plugin`) - included in SupportClaw. Experimental Canvas control and A2UI rendering surfaces for paired nodes.

- **[codex-supervisor](/plugins/reference/codex-supervisor)** (`@supportclaw/codex-supervisor`) - included in SupportClaw. Supervise Codex app-server sessions from SupportClaw.

- **[cohere](/plugins/reference/cohere)** (`@supportclaw/cohere-provider`) - included in SupportClaw; npm; ClawHub: `clawhub:@supportclaw/cohere-provider`. SupportClaw Cohere provider plugin.

- **[comfy](/plugins/reference/comfy)** (`@supportclaw/comfy-provider`) - included in SupportClaw. Adds ComfyUI model provider support to SupportClaw.

- **[copilot-proxy](/plugins/reference/copilot-proxy)** (`@supportclaw/copilot-proxy`) - included in SupportClaw. Adds Copilot Proxy model provider support to SupportClaw.

- **[deepgram](/plugins/reference/deepgram)** (`@supportclaw/deepgram-provider`) - included in SupportClaw. Adds media understanding provider support. Adds realtime transcription provider support.

- **[document-extract](/plugins/reference/document-extract)** (`@supportclaw/document-extract-plugin`) - included in SupportClaw. Extract text and fallback page images from local document attachments.

- **[duckduckgo](/plugins/reference/duckduckgo)** (`@supportclaw/duckduckgo-plugin`) - included in SupportClaw. Adds web search provider support.

- **[elevenlabs](/plugins/reference/elevenlabs)** (`@supportclaw/elevenlabs-speech`) - included in SupportClaw. Adds media understanding provider support. Adds realtime transcription provider support. Adds text-to-speech provider support.

- **[fal](/plugins/reference/fal)** (`@supportclaw/fal-provider`) - included in SupportClaw. Adds fal model provider support to SupportClaw.

- **[file-transfer](/plugins/reference/file-transfer)** (`@supportclaw/file-transfer`) - included in SupportClaw. Fetch, list, and write files on paired nodes via dedicated node commands. Bypasses bash stdout truncation by using base64 over node.invoke for binaries up to 16 MB.

- **[github-copilot](/plugins/reference/github-copilot)** (`@supportclaw/github-copilot-provider`) - included in SupportClaw. Adds GitHub Copilot model provider support to SupportClaw.

- **[google](/plugins/reference/google)** (`@supportclaw/google-plugin`) - included in SupportClaw. Adds Google, Google Gemini CLI, Google Vertex model provider support to SupportClaw.

- **[huggingface](/plugins/reference/huggingface)** (`@supportclaw/huggingface-provider`) - included in SupportClaw. Adds Hugging Face model provider support to SupportClaw.

- **[imessage](/plugins/reference/imessage)** (`@supportclaw/imessage`) - included in SupportClaw. Adds the iMessage channel surface for sending and receiving SupportClaw messages.

- **[litellm](/plugins/reference/litellm)** (`@supportclaw/litellm-provider`) - included in SupportClaw. Adds LiteLLM model provider support to SupportClaw.

- **[llm-task](/plugins/reference/llm-task)** (`@supportclaw/llm-task`) - included in SupportClaw. Generic JSON-only LLM tool for structured tasks callable from workflows.

- **[lmstudio](/plugins/reference/lmstudio)** (`@supportclaw/lmstudio-provider`) - included in SupportClaw. Adds LM Studio model provider support to SupportClaw.

- **[memory-core](/plugins/reference/memory-core)** (`@supportclaw/memory-core`) - included in SupportClaw. Adds agent-callable tools.

- **[memory-wiki](/plugins/reference/memory-wiki)** (`@supportclaw/memory-wiki`) - included in SupportClaw. Persistent wiki compiler and Obsidian-friendly knowledge vault for SupportClaw.

- **[microsoft](/plugins/reference/microsoft)** (`@supportclaw/microsoft-speech`) - included in SupportClaw. Adds text-to-speech provider support.

- **[microsoft-foundry](/plugins/reference/microsoft-foundry)** (`@supportclaw/microsoft-foundry`) - included in SupportClaw. Adds Microsoft Foundry model provider support to SupportClaw.

- **[migrate-claude](/plugins/reference/migrate-claude)** (`@supportclaw/migrate-claude`) - included in SupportClaw. Imports Claude Code and Claude Desktop instructions, MCP servers, skills, and safe configuration into SupportClaw.

- **[migrate-hermes](/plugins/reference/migrate-hermes)** (`@supportclaw/migrate-hermes`) - included in SupportClaw. Imports Hermes configuration, memories, skills, and supported credentials into SupportClaw.

- **[minimax](/plugins/reference/minimax)** (`@supportclaw/minimax-provider`) - included in SupportClaw. Adds MiniMax, MiniMax Portal model provider support to SupportClaw.

- **[mistral](/plugins/reference/mistral)** (`@supportclaw/mistral-provider`) - included in SupportClaw. Adds Mistral model provider support to SupportClaw.

- **[novita](/plugins/reference/novita)** (`@supportclaw/novita-provider`) - included in SupportClaw. Adds Novita, Novita AI, Novitaai model provider support to SupportClaw.

- **[nvidia](/plugins/reference/nvidia)** (`@supportclaw/nvidia-provider`) - included in SupportClaw. Adds NVIDIA model provider support to SupportClaw.

- **[oc-path](/plugins/reference/oc-path)** (`@supportclaw/oc-path`) - included in SupportClaw. Adds the supportClaw path CLI for oc:// workspace file addressing.

- **[ollama](/plugins/reference/ollama)** (`@supportclaw/ollama-provider`) - included in SupportClaw. Adds Ollama, Ollama Cloud model provider support to SupportClaw.

- **[open-prose](/plugins/reference/open-prose)** (`@supportclaw/open-prose`) - included in SupportClaw. OpenProse VM skill pack with a /prose slash command.

- **[openai](/plugins/reference/openai)** (`@supportclaw/openai-provider`) - included in SupportClaw. Adds OpenAI model provider support to SupportClaw.

- **[opencode](/plugins/reference/opencode)** (`@supportclaw/opencode-provider`) - included in SupportClaw. Adds OpenCode model provider support to SupportClaw.

- **[opencode-go](/plugins/reference/opencode-go)** (`@supportclaw/opencode-go-provider`) - included in SupportClaw. Adds OpenCode Go model provider support to SupportClaw.

- **[openrouter](/plugins/reference/openrouter)** (`@supportclaw/openrouter-provider`) - included in SupportClaw. Adds OpenRouter model provider support to SupportClaw.

- **[policy](/plugins/reference/policy)** (`@supportclaw/policy`) - included in SupportClaw. Adds policy-backed doctor checks for workspace conformance.

- **[runway](/plugins/reference/runway)** (`@supportclaw/runway-provider`) - included in SupportClaw. Adds video generation provider support.

- **[senseaudio](/plugins/reference/senseaudio)** (`@supportclaw/senseaudio-provider`) - included in SupportClaw. Adds media understanding provider support.

- **[sglang](/plugins/reference/sglang)** (`@supportclaw/sglang-provider`) - included in SupportClaw. Adds SGLang model provider support to SupportClaw.

- **[synthetic](/plugins/reference/synthetic)** (`@supportclaw/synthetic-provider`) - included in SupportClaw. Adds Synthetic model provider support to SupportClaw.

- **[telegram](/plugins/reference/telegram)** (`@supportclaw/telegram`) - included in SupportClaw. Adds the Telegram channel surface for sending and receiving SupportClaw messages.

- **[together](/plugins/reference/together)** (`@supportclaw/together-provider`) - included in SupportClaw. Adds Together model provider support to SupportClaw.

- **[tts-local-cli](/plugins/reference/tts-local-cli)** (`@supportclaw/tts-local-cli`) - included in SupportClaw. Adds text-to-speech provider support.

- **[vllm](/plugins/reference/vllm)** (`@supportclaw/vllm-provider`) - included in SupportClaw. Adds vLLM model provider support to SupportClaw.

- **[volcengine](/plugins/reference/volcengine)** (`@supportclaw/volcengine-provider`) - included in SupportClaw. Adds Volcengine, Volcengine Plan model provider support to SupportClaw.

- **[voyage](/plugins/reference/voyage)** (`@supportclaw/voyage-provider`) - included in SupportClaw. Adds memory embedding provider support.

- **[vydra](/plugins/reference/vydra)** (`@supportclaw/vydra-provider`) - included in SupportClaw. Adds Vydra model provider support to SupportClaw.

- **[web-readability](/plugins/reference/web-readability)** (`@supportclaw/web-readability-plugin`) - included in SupportClaw. Extract readable article content from local HTML web fetch responses.

- **[webhooks](/plugins/reference/webhooks)** (`@supportclaw/webhooks`) - included in SupportClaw. Authenticated inbound webhooks that bind external automation to SupportClaw TaskFlows.

- **[workboard](/plugins/reference/workboard)** (`@supportclaw/workboard`) - included in SupportClaw. Dashboard workboard for agent-owned issues and sessions.

- **[xai](/plugins/reference/xai)** (`@supportclaw/xai-plugin`) - included in SupportClaw. Adds xAI model provider support to SupportClaw.

- **[xiaomi](/plugins/reference/xiaomi)** (`@supportclaw/xiaomi-provider`) - included in SupportClaw. Adds Xiaomi, Xiaomi Token Plan model provider support to SupportClaw.

## Official external packages

68 plugins

- **[acpx](/plugins/reference/acpx)** (`@supportclaw/acpx`) - npm; ClawHub. SupportClaw ACP runtime backend with plugin-owned session and transport management.

- **[amazon-bedrock](/plugins/reference/amazon-bedrock)** (`@supportclaw/amazon-bedrock-provider`) - npm; ClawHub. SupportClaw Amazon Bedrock provider plugin with model discovery, embeddings, and guardrail support.

- **[amazon-bedrock-mantle](/plugins/reference/amazon-bedrock-mantle)** (`@supportclaw/amazon-bedrock-mantle-provider`) - npm; ClawHub. SupportClaw Amazon Bedrock Mantle provider plugin for OpenAI-compatible model routing.

- **[anthropic-vertex](/plugins/reference/anthropic-vertex)** (`@supportclaw/anthropic-vertex-provider`) - npm; ClawHub. SupportClaw Anthropic Vertex provider plugin for Claude models on Google Vertex AI.

- **[arcee](/plugins/reference/arcee)** (`@supportclaw/arcee-provider`) - npm; ClawHub: `clawhub:@supportclaw/arcee-provider`. Adds Arcee model provider support to SupportClaw.

- **[brave](/plugins/reference/brave)** (`@supportclaw/brave-plugin`) - npm; ClawHub. SupportClaw Brave Search provider plugin for web search.

- **[cerebras](/plugins/reference/cerebras)** (`@supportclaw/cerebras-provider`) - npm; ClawHub: `clawhub:@supportclaw/cerebras-provider`. Adds Cerebras model provider support to SupportClaw.

- **[chutes](/plugins/reference/chutes)** (`@supportclaw/chutes-provider`) - npm; ClawHub: `clawhub:@supportclaw/chutes-provider`. Adds Chutes model provider support to SupportClaw.

- **[clickclack](/plugins/reference/clickclack)** (`@supportclaw/clickclack`) - npm; ClawHub: `clawhub:@supportclaw/clickclack`. Adds the Clickclack channel surface for sending and receiving SupportClaw messages.

- **[cloudflare-ai-gateway](/plugins/reference/cloudflare-ai-gateway)** (`@supportclaw/cloudflare-ai-gateway-provider`) - npm; ClawHub: `clawhub:@supportclaw/cloudflare-ai-gateway-provider`. Adds Cloudflare AI Gateway model provider support to SupportClaw.

- **[codex](/plugins/reference/codex)** (`@supportclaw/codex`) - npm; ClawHub. SupportClaw Codex app-server harness and model provider plugin with a Codex-managed GPT catalog.

- **[copilot](/plugins/reference/copilot)** (`@supportclaw/copilot`) - npm; ClawHub: `clawhub:@supportclaw/copilot`. Registers the GitHub Copilot agent runtime.

- **[deepinfra](/plugins/reference/deepinfra)** (`@supportclaw/deepinfra-provider`) - npm; ClawHub: `clawhub:@supportclaw/deepinfra-provider`. Adds DeepInfra model provider support to SupportClaw.

- **[deepseek](/plugins/reference/deepseek)** (`@supportclaw/deepseek-provider`) - npm; ClawHub: `clawhub:@supportclaw/deepseek-provider`. Adds DeepSeek model provider support to SupportClaw.

- **[diagnostics-otel](/plugins/reference/diagnostics-otel)** (`@supportclaw/diagnostics-otel`) - npm; ClawHub: `clawhub:@supportclaw/diagnostics-otel`. SupportClaw diagnostics OpenTelemetry exporter for metrics, traces, and logs.

- **[diagnostics-prometheus](/plugins/reference/diagnostics-prometheus)** (`@supportclaw/diagnostics-prometheus`) - npm; ClawHub: `clawhub:@supportclaw/diagnostics-prometheus`. SupportClaw diagnostics Prometheus exporter for runtime metrics.

- **[diffs](/plugins/reference/diffs)** (`@supportclaw/diffs`) - npm; ClawHub. SupportClaw read-only diff viewer plugin and file renderer for agents.

- **[diffs-language-pack](/plugins/reference/diffs-language-pack)** (`@supportclaw/diffs-language-pack`) - npm; ClawHub: `clawhub:@supportclaw/diffs-language-pack`. Adds syntax highlighting for languages outside the default diffs viewer set.

- **[discord](/plugins/reference/discord)** (`@supportclaw/discord`) - npm; ClawHub. SupportClaw Discord channel plugin for channels, DMs, commands, and app events.

- **[exa](/plugins/reference/exa)** (`@supportclaw/exa-plugin`) - npm; ClawHub: `clawhub:@supportclaw/exa-plugin`. Adds web search provider support.

- **[feishu](/plugins/reference/feishu)** (`@supportclaw/feishu`) - npm; ClawHub. SupportClaw Feishu/Lark channel plugin for chats and workplace tools (community maintained by @m1heng).

- **[firecrawl](/plugins/reference/firecrawl)** (`@supportclaw/firecrawl-plugin`) - npm; ClawHub: `clawhub:@supportclaw/firecrawl-plugin`. Adds agent-callable tools. Adds web fetch provider support. Adds web search provider support.

- **[fireworks](/plugins/reference/fireworks)** (`@supportclaw/fireworks-provider`) - npm; ClawHub: `clawhub:@supportclaw/fireworks-provider`. Adds Fireworks model provider support to SupportClaw.

- **[gmi](/plugins/reference/gmi)** (`@supportclaw/gmi-provider`) - npm; ClawHub: `clawhub:@supportclaw/gmi-provider`. SupportClaw GMI Cloud provider plugin.

- **[google-meet](/plugins/reference/google-meet)** (`@supportclaw/google-meet`) - npm; ClawHub. SupportClaw Google Meet participant plugin for joining calls through Chrome or Twilio transports.

- **[googlechat](/plugins/reference/googlechat)** (`@supportclaw/googlechat`) - npm; ClawHub. SupportClaw Google Chat channel plugin for spaces and direct messages.

- **[gradium](/plugins/reference/gradium)** (`@supportclaw/gradium-speech`) - npm; ClawHub: `clawhub:@supportclaw/gradium-speech`. Adds text-to-speech provider support.

- **[groq](/plugins/reference/groq)** (`@supportclaw/groq-provider`) - npm; ClawHub: `clawhub:@supportclaw/groq-provider`. Adds Groq model provider support to SupportClaw.

- **[inworld](/plugins/reference/inworld)** (`@supportclaw/inworld-speech`) - npm; ClawHub: `clawhub:@supportclaw/inworld-speech`. Inworld streaming text-to-speech (MP3, OGG_OPUS, PCM telephony).

- **[irc](/plugins/reference/irc)** (`@supportclaw/irc`) - npm; ClawHub: `clawhub:@supportclaw/irc`. Adds the IRC channel surface for sending and receiving SupportClaw messages.

- **[kilocode](/plugins/reference/kilocode)** (`@supportclaw/kilocode-provider`) - npm; ClawHub: `clawhub:@supportclaw/kilocode-provider`. Adds Kilocode model provider support to SupportClaw.

- **[kimi](/plugins/reference/kimi)** (`@supportclaw/kimi-provider`) - npm; ClawHub: `clawhub:@supportclaw/kimi-provider`. Adds Kimi, Kimi Coding model provider support to SupportClaw.

- **[line](/plugins/reference/line)** (`@supportclaw/line`) - npm; ClawHub. SupportClaw LINE channel plugin for LINE Bot API chats.

- **[llama-cpp](/plugins/reference/llama-cpp)** (`@supportclaw/llama-cpp-provider`) - npm; ClawHub. Local GGUF embeddings through node-llama-cpp.

- **[lobster](/plugins/reference/lobster)** (`@supportclaw/lobster`) - npm; ClawHub. Lobster workflow tool plugin for typed pipelines and resumable approvals.

- **[matrix](/plugins/reference/matrix)** (`@supportclaw/matrix`) - ClawHub: `clawhub:@supportclaw/matrix`; npm. SupportClaw Matrix channel plugin for rooms and direct messages.

- **[mattermost](/plugins/reference/mattermost)** (`@supportclaw/mattermost`) - npm; ClawHub: `clawhub:@supportclaw/mattermost`. Adds the Mattermost channel surface for sending and receiving SupportClaw messages.

- **[memory-lancedb](/plugins/reference/memory-lancedb)** (`@supportclaw/memory-lancedb`) - npm; ClawHub. SupportClaw LanceDB-backed long-term memory plugin with auto-recall, auto-capture, and vector search.

- **[moonshot](/plugins/reference/moonshot)** (`@supportclaw/moonshot-provider`) - npm; ClawHub: `clawhub:@supportclaw/moonshot-provider`. Adds Moonshot model provider support to SupportClaw.

- **[msteams](/plugins/reference/msteams)** (`@supportclaw/msteams`) - npm; ClawHub. SupportClaw Microsoft Teams channel plugin for bot conversations.

- **[nextcloud-talk](/plugins/reference/nextcloud-talk)** (`@supportclaw/nextcloud-talk`) - npm; ClawHub. SupportClaw Nextcloud Talk channel plugin for conversations.

- **[nostr](/plugins/reference/nostr)** (`@supportclaw/nostr`) - npm; ClawHub. SupportClaw Nostr channel plugin for NIP-04 encrypted direct messages.

- **[openshell](/plugins/reference/openshell)** (`@supportclaw/openshell-sandbox`) - npm; ClawHub. SupportClaw sandbox backend for the NVIDIA OpenShell CLI with mirrored local workspaces and SSH command execution.

- **[parallel](/tools/parallel-search)** (`@supportclaw/parallel-plugin`) - npm; ClawHub: `clawhub:@supportclaw/parallel-plugin`. Adds web search provider support.

- **[perplexity](/plugins/reference/perplexity)** (`@supportclaw/perplexity-plugin`) - npm; ClawHub: `clawhub:@supportclaw/perplexity-plugin`. Adds web search provider support.

- **[pixverse](/plugins/reference/pixverse)** (`@supportclaw/pixverse-provider`) - npm; ClawHub: `clawhub:@supportclaw/pixverse-provider`. SupportClaw PixVerse video generation provider plugin.

- **[qianfan](/plugins/reference/qianfan)** (`@supportclaw/qianfan-provider`) - npm; ClawHub: `clawhub:@supportclaw/qianfan-provider`. Adds Qianfan model provider support to SupportClaw.

- **[qqbot](/plugins/reference/qqbot)** (`@supportclaw/qqbot`) - npm; ClawHub. SupportClaw QQ Bot channel plugin for group and direct-message workflows.

- **[qwen](/plugins/reference/qwen)** (`@supportclaw/qwen-provider`) - npm; ClawHub: `clawhub:@supportclaw/qwen-provider`. Adds Qwen, Qwen Cloud, Model Studio, DashScope, Qwen Oauth, Qwen Portal, Qwen CLI model provider support to SupportClaw.

- **[raft](/plugins/reference/raft)** (`@supportclaw/raft`) - npm; ClawHub. SupportClaw Raft channel plugin for secure CLI wake bridges.

- **[searxng](/plugins/reference/searxng)** (`@supportclaw/searxng-plugin`) - npm; ClawHub: `clawhub:@supportclaw/searxng-plugin`. Adds web search provider support.

- **[signal](/plugins/reference/signal)** (`@supportclaw/signal`) - npm; ClawHub: `clawhub:@supportclaw/signal`. Adds the Signal channel surface for sending and receiving SupportClaw messages.

- **[slack](/plugins/reference/slack)** (`@supportclaw/slack`) - npm; ClawHub. SupportClaw Slack channel plugin for channels, DMs, commands, and app events.

- **[sms](/plugins/reference/sms)** (`@supportclaw/sms`) - npm; ClawHub: `clawhub:@supportclaw/sms`. Twilio SMS channel plugin for SupportClaw text messages.

- **[stepfun](/plugins/reference/stepfun)** (`@supportclaw/stepfun-provider`) - npm; ClawHub: `clawhub:@supportclaw/stepfun-provider`. Adds StepFun, StepFun Plan model provider support to SupportClaw.

- **[synology-chat](/plugins/reference/synology-chat)** (`@supportclaw/synology-chat`) - npm; ClawHub. Synology Chat channel plugin for SupportClaw channels and direct messages.

- **[tavily](/plugins/reference/tavily)** (`@supportclaw/tavily-plugin`) - npm; ClawHub: `clawhub:@supportclaw/tavily-plugin`. Adds agent-callable tools. Adds web search provider support.

- **[tencent](/plugins/reference/tencent)** (`@supportclaw/tencent-provider`) - npm; ClawHub: `clawhub:@supportclaw/tencent-provider`. Adds Tencent TokenHub model provider support to SupportClaw.

- **[tlon](/plugins/reference/tlon)** (`@supportclaw/tlon`) - npm; ClawHub. SupportClaw Tlon/Urbit channel plugin for chat workflows.

- **[tokenjuice](/plugins/reference/tokenjuice)** (`@supportclaw/tokenjuice`) - npm; ClawHub: `clawhub:@supportclaw/tokenjuice`. Compacts exec and bash tool results with tokenjuice reducers.

- **[twitch](/plugins/reference/twitch)** (`@supportclaw/twitch`) - npm; ClawHub. SupportClaw Twitch channel plugin for chat and moderation workflows.

- **[venice](/plugins/reference/venice)** (`@supportclaw/venice-provider`) - npm; ClawHub: `clawhub:@supportclaw/venice-provider`. Adds Venice model provider support to SupportClaw.

- **[vercel-ai-gateway](/plugins/reference/vercel-ai-gateway)** (`@supportclaw/vercel-ai-gateway-provider`) - npm; ClawHub: `clawhub:@supportclaw/vercel-ai-gateway-provider`. Adds Vercel AI Gateway model provider support to SupportClaw.

- **[voice-call](/plugins/reference/voice-call)** (`@supportclaw/voice-call`) - npm; ClawHub. SupportClaw voice-call plugin for Twilio, Telnyx, and Plivo phone calls.

- **[whatsapp](/plugins/reference/whatsapp)** (`@supportclaw/whatsapp`) - ClawHub: `clawhub:@supportclaw/whatsapp`; npm. SupportClaw WhatsApp channel plugin for WhatsApp Web chats.

- **[zai](/plugins/reference/zai)** (`@supportclaw/zai-provider`) - npm; ClawHub: `clawhub:@supportclaw/zai-provider`. Adds Z.AI model provider support to SupportClaw.

- **[zalo](/plugins/reference/zalo)** (`@supportclaw/zalo`) - npm; ClawHub. SupportClaw Zalo channel plugin for bot and webhook chats.

- **[zalouser](/plugins/reference/zalouser)** (`@supportclaw/zalouser`) - npm; ClawHub. SupportClaw Zalo Personal Account plugin via native zca-js integration.

## Source checkout only

3 plugins

- **[qa-channel](/plugins/reference/qa-channel)** (`@supportclaw/qa-channel`) - source checkout only. Adds the QA Channel surface for sending and receiving SupportClaw messages.

- **[qa-lab](/plugins/reference/qa-lab)** (`@supportclaw/qa-lab`) - source checkout only. SupportClaw QA lab plugin with private debugger UI and scenario runner.

- **[qa-matrix](/plugins/reference/qa-matrix)** (`@supportclaw/qa-matrix`) - source checkout only. Matrix QA transport runner and substrate.
