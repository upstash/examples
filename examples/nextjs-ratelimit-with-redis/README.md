---
title: Per-IP Rate Limiting in a Next.js API Route with Upstash Redis
products: ["redis"]
stack: ["Next.js"]
use_cases: ["Ratelimiting"]
languages: ["ts"]
author: "upstash"
---

## What it does

Demonstrates per-IP rate limiting on a Next.js App Router API route using `@upstash/ratelimit` backed by Upstash Redis. Each client IP is allowed 5 requests per rolling 10-second window. Requests that exceed the limit receive a `429 Too Many Requests` response with a `Retry-After` header. Successful responses include `X-RateLimit-Remaining` so clients can track their budget.

A minimal UI lets you fire requests from the browser and see the status codes and remaining counts update in real time.

## How it works

```
GET /api/data
  → read x-forwarded-for header (falls back to 127.0.0.1 in local dev)
  → call ratelimit.limit(ip) against Upstash Redis (sliding window)
  → 200 + X-RateLimit-Remaining  if allowed
  → 429 + Retry-After            if exceeded
```

## Run locally

**1. Install dependencies**

```bash
npm install
```

**2. Create an Upstash Redis database**

Go to [console.upstash.com](https://console.upstash.com), create a Redis database, and copy the REST URL and token.

**3. Set environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your credentials:

```
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

**4. Start the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Click **Send GET /api/data** repeatedly to see the rate limiter in action — after 5 clicks within 10 seconds the response flips to `429`.

## Key file

| File | Purpose |
|------|---------|
| `app/api/data/route.ts` | The rate-limited route handler |
| `app/page.tsx` | Browser UI to fire requests and display results |
