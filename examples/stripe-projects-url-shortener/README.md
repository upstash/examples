# Shorty — URL shortener on Stripe Projects

Companion code for the blog post **[Ship a URL Shortener Without Opening a Dashboard](https://upstash.com/blog/ship-full-stack-app-stripe-projects)**.

A public URL shortener with live click counters. The whole stack — data store and hosting — is provisioned through one CLI: `stripe projects add`.

## Stack

- **Next.js 16** (App Router) on **Vercel**
- **Upstash Redis** as the data layer — hash per link, sorted set for the recent list, atomic `INCR` for click counters, `@upstash/ratelimit` for abuse protection
- **Stripe Projects CLI** to provision both from your terminal

## Provision and deploy

```bash
stripe projects init shorty
stripe projects add upstash/redis
stripe projects add vercel/project
```

Each command writes credentials to `.env` (locally) and attaches them to the Vercel project (in production). After the third command, your app is deployed.

## Develop locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and shorten something.

## Test

```bash
SHORT=https://your-app.vercel.app/abc123
for i in $(seq 1 100); do curl -s -o /dev/null $SHORT; done
```

Refresh the home page. The counter says 100.

## Files

- `app/[slug]/route.ts` — redirect handler (Redis HGET + fire-and-forget INCR + 302)
- `app/actions.ts` — server actions: create / delete a link, IP-rate-limited
- `app/page.tsx` — recent links list with live click counts via `MGET`
- `app/create-link-form.tsx` — client form with optimistic state
- `lib/redis.ts` — Redis client (reads `UPSTASH_REST_URL` / `UPSTASH_REST_TOKEN` written by Stripe Projects)
