---
title: Stateful AI Coding Agent with Upstash Box and Redis
products: ["redis", "box"]
stack: ["Next.js"]
use_cases: ["AI Agents", "Stateful Agents"]
languages: ["ts"]
author: "upstash"
---

# Stateful AI Coding Agent with Upstash Box and Redis

This example shows how to build a stateful coding-agent server using AI SDK v7's `HarnessAgent` API, [Upstash Box](https://upstash.com/docs/box/introduction) for durable sandboxed workspaces, and [Upstash Redis](https://upstash.com/docs/redis/overall/getstarted) to index each user's box.

Each user gets a persistent Box — a real container with a filesystem, shell, git, and a Claude Code agent already inside. On the first request the box is created and its ID is stored in Redis. On every subsequent request the same box is reattached: the repo it cloned last time is still there, `node_modules` are still installed, and the agent picks up right where it left off instead of starting cold.

## Architecture

```
Browser chat UI  →  POST /api/agent
                       │
                       ├─ Redis: get / set box:{userId}
                       │
                       └─ Upstash Box (durable filesystem + Claude Code harness)
                              └─ streams text-delta chunks back to the client
```

## Prerequisites

- [Upstash account](https://console.upstash.com/) — Redis database + Box enabled
- [Anthropic API key](https://console.anthropic.com/)
- Node.js 20+

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in every value:

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Upstash Console → your Redis database → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | same page |
| `UPSTASH_BOX_API_KEY` | Upstash Console → Box → API Keys |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/) |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Type a coding prompt (e.g. *"scaffold a simple Express app with a /health route"*) and watch the agent respond. Stop the server, restart it, and send a follow-up — the agent's workspace is still intact.

## How it works

`app/api/agent/route.ts` is the core. On each `POST /api/agent`:

1. **Redis lookup** — `redis.get<string>("box:{userId}")` returns an existing box ID or `null`.
2. **Get or create** — `Box.get(id)` reattaches to an existing durable box; `Box.create(...)` provisions a new one and persists its ID with `redis.set`.
3. **Stream** — `box.agent.stream({ prompt })` runs the Claude Code harness inside the box and yields `text-delta` chunks, which are forwarded to the client over a `ReadableStream`.

The chat UI (`app/page.tsx`) is intentionally minimal — a `<textarea>`, a send button, and a scrolling output area. It reads the stream with `response.body.getReader()` and appends decoded text as it arrives.
