---
title: AI API Rate Limiting with Upstash Redis
products: ["redis"]
stack: ["Next.js"]
use_cases: ["Ratelimiting"]
languages: ["ts"]
author: "upstash"
---

# AI API Rate Limiting with Upstash Redis

A minimal Next.js app that shows how to protect an AI endpoint from runaway costs using [`@upstash/ratelimit`](https://github.com/upstash/ratelimit-js) and Upstash Redis.

Two enforcement layers are demonstrated:

| Layer | Where | Algorithm | Identifier | Limit |
|---|---|---|---|---|
| Global | `middleware.ts` (edge) | Sliding Window | IP address | 10 req / min |
| Per-user free tier | `app/api/generate/route.ts` | Fixed Window | user ID | 20 req / day |
| Per-user paid tier | `app/api/generate/route.ts` | Sliding Window | user ID | 500 req / hr |

The `/api/generate` route simulates an AI response. Swap the mock block for a real `openai.chat.completions.create(...)` call — the rate limiting code stays identical.

## How it works

```
Client → Edge Middleware (IP limit) → Route Handler (user tier limit) → Mock AI
                ↓ 429 if IP exhausted         ↓ 429 if user quota exhausted
```

## Prerequisites

- Node.js 18+
- A free [Upstash Redis](https://console.upstash.com) database

## Setup

**1. Install dependencies**

```bash
npm install
```

**2. Create an Upstash Redis database**

Go to [console.upstash.com](https://console.upstash.com), create a Redis database, and copy the REST URL and token from the **REST API** section.

**3. Set environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your credentials:

```
UPSTASH_REDIS_REST_URL="https://your-db.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_token_here"
```

**4. Run the app**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Usage

- Enter a **User ID** (changing the ID gives that user a fresh counter).
- Toggle between **Free** (20 req/day) and **Paid** (500 req/hr) plan.
- Click **Generate** repeatedly to watch the rate limit kick in.
- Each response shows the remaining quota and reset time from the response headers.

## Key files

| File | Purpose |
|---|---|
| `middleware.ts` | IP-based global sliding window limit (runs at the edge, before handlers) |
| `app/api/generate/route.ts` | Per-user multi-tier limits + mock AI response |
| `app/page.tsx` | Interactive demo UI |

## Connecting a real AI provider

In `app/api/generate/route.ts`, replace the mock block with your provider call:

```ts
// OpenAI example
import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: prompt }],
});
const text = completion.choices[0].message.content ?? "";
```

The rate limiting code above that block remains unchanged.
