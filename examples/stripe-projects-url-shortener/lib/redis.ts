import { Redis } from "@upstash/redis";

// Stripe Projects writes UPSTASH_REST_URL / UPSTASH_REST_TOKEN to .env
// (the @upstash/redis SDK's `Redis.fromEnv()` expects UPSTASH_REDIS_*, so
// we wire it up explicitly here).
export const redis = new Redis({
  url: process.env.UPSTASH_REST_URL!,
  token: process.env.UPSTASH_REST_TOKEN!,
});
