# Shorty — URL shortener on Stripe Projects

Companion code for the blog post **[Ship a Full-Stack App Without Opening a Dashboard](https://upstash.com/blog/ship-full-stack-app-stripe-projects)**.

A URL shortener with live click counters. The whole stack — Postgres, Redis, hosting — is provisioned through one CLI: `stripe projects add`.

## Stack

- **Next.js 15** (App Router) on **Vercel**
- **Supabase** for auth and the `links` table
- **Upstash Redis** for the redirect cache, atomic click counters, and per-user rate limiting
- **Stripe Projects CLI** to provision all three from your terminal

## Provision the stack

```bash
stripe projects add supabase/postgres
stripe projects add upstash/redis
stripe projects add vercel/project
```

Each command provisions the resource and writes credentials to `.env`. After all three, your `.env` matches `.env.example`.

## Run the database migration

```bash
supabase db push
```

(or paste `supabase/migrations/20260430000000_links.sql` into the Supabase SQL editor.)

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000, sign in with a magic link, and shorten something.

## Deploy

```bash
vercel deploy --prod
```

The Vercel project is already linked from `stripe projects add vercel/project`, and the env vars are already attached. There is no dashboard step.

## Test

```bash
SHORT=$(curl -s -X POST ...) # or just create one in the UI
for i in $(seq 1 100); do
  curl -s -o /dev/null https://your-app.vercel.app/$SHORT
done
```

Refresh the dashboard. The counter says 100. None of those clicks touched Postgres.

## Architecture

```
┌──────────────────────────┐
│  Browser / curl          │
└────────┬─────────────────┘
         │
         │  GET /:slug
         ▼
┌──────────────────────────┐         ┌──────────────────────┐
│  Next.js Route Handler   │ ──────▶ │  Upstash Redis        │
│  (Vercel)                │  GET    │  link:{slug}          │
│                          │  INCR   │  clicks:{slug}        │
│  cache miss ─────┐       │         └──────────────────────┘
└──────────────────┼───────┘
                   │
                   │ SELECT target_url
                   ▼
         ┌──────────────────┐
         │  Supabase (Postgres) │
         │  links table         │
         └──────────────────────┘
```

Hot path: Redis only. Cold path (first click after deploy): Postgres → Redis.

## Files

- `app/[slug]/route.ts` — redirect handler (Redis cache + Postgres fallback + INCR)
- `app/actions.ts` — server actions: create / delete a link, with rate limit
- `app/dashboard/page.tsx` — list links, show live click counts via `MGET`
- `app/login/page.tsx` — magic-link sign-in
- `lib/redis.ts` — `Redis.fromEnv()` singleton
- `lib/supabase/server.ts` — cookie-based Supabase client (auth-aware)
- `lib/supabase/public.ts` — anon Supabase client for the redirect path
- `supabase/migrations/20260430000000_links.sql` — schema + RLS policies
