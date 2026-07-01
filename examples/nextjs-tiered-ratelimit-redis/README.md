---
title: Tiered Rate Limiting with Upstash Redis
products: ["redis"]
stack: ["Next.js"]
use_cases: ["Ratelimiting"]
languages: ["ts"]
author: "upstash"
---

## What It Does

A minimal Next.js app that enforces three separate rate limit tiers — free (10 req/min), pro (100 req/min), and enterprise (1000 req/min) — against a single Upstash Redis database. Each user gets an isolated sliding-window bucket keyed by their user ID, so two free users never share quota.

The project contains:

- **`lib/ratelimit.ts`** — three `Ratelimit` instances (one per plan), created once and reused across requests.
- **`app/api/data/route.ts`** — a Next.js Route Handler that reads `userId` and `plan` from the query string, checks the right limiter, and returns `X-RateLimit-Limit` / `X-RateLimit-Remaining` headers on every response.
- **`app/page.tsx`** — a browser UI to fire requests, switch plans and user IDs, and watch the counters tick down in real time.

## Prerequisites

- Node.js 18+
- An [Upstash Redis](https://console.upstash.com/) database (free tier is fine)

## Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/upstash/examples
   cd examples/nextjs-tiered-ratelimit-redis
   npm install
   ```

2. **Set environment variables**

   Copy `.env.example` to `.env.local` and fill in your Upstash Redis credentials from the Upstash console:

   ```bash
   cp .env.example .env.local
   ```

   ```
   UPSTASH_REDIS_REST_URL="https://your-db.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="your-token"
   ```

3. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000), choose a plan and user ID, and click **Send Request** to see rate limiting in action.

## How It Works

```
GET /api/data?userId=<id>&plan=free|pro|enterprise
```

The handler picks the matching `Ratelimit` instance and calls `.limit(userId)`. If the sliding window is full it returns `429`; otherwise `200` with the remaining quota in the response headers.

The free-tier limiter has `analytics: true`, which sends per-identifier telemetry to the Upstash Rate Limit dashboard — useful for spotting users who consistently hit their ceiling and are ready to upgrade.
