---
title: Tiered Rate Limiting with Upstash Redis
products: ["redis"]
stack: ["Next.js"]
use_cases: ["Ratelimiting"]
languages: ["ts"]
author: "upstash"
---

## What this example does

Demonstrates per-tier rate limiting using a single Upstash Redis database and `@upstash/ratelimit`. Three sliding-window limiters share one database — separated by key prefix — and a short resolver picks the right limiter based on whether the caller is anonymous, a free-plan user, or a paid-plan user.

| Tier      | Limit         | Redis prefix |
|-----------|---------------|-------------|
| Anonymous | 10 req / min  | `rl:anon`   |
| Free      | 60 req / min  | `rl:free`   |
| Paid      | 500 req / min | `rl:paid`   |

The Next.js Edge API route at `/api/data` applies the limit, returns `X-RateLimit-*` headers on every response, and returns `429 + Retry-After` when a tier is exhausted. A minimal UI lets you switch between tiers and fire requests to see remaining counts drop in real time.

## Stack

- **Next.js 15** (App Router, Edge Runtime)
- **@upstash/ratelimit** — sliding-window counters
- **@upstash/redis** — serverless Redis client (HTTP-based, works on Edge)

## Setup

### 1. Create an Upstash Redis database

Go to [console.upstash.com](https://console.upstash.com), create a Redis database, and copy the **REST URL** and **REST token** from the dashboard.

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your credentials:

```
UPSTASH_REDIS_REST_URL="https://your-database.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"
```

### 3. Install dependencies and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), select a tier, and click **Send Request** to see the rate limiter in action. Hitting the limit returns a `429` with a `Retry-After` header.

## Key files

| File | Purpose |
|------|---------|
| `src/lib/limiters.ts` | Creates the three `Ratelimit` instances with distinct prefixes |
| `src/app/api/data/route.ts` | Edge API route — resolves tier, applies limiter, returns headers |
| `src/app/page.tsx` | Client UI to toggle tiers and fire requests |
