import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const limiters = {
  anonymous: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: "rl:anon",
    analytics: true,
  }),
  free: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    prefix: "rl:free",
    analytics: true,
  }),
  paid: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(500, "1 m"),
    prefix: "rl:paid",
    analytics: true,
  }),
};

export type Tier = keyof typeof limiters;

export function resolveTier(userId: string | null, plan: string | null): Tier {
  if (!userId) return "anonymous";
  if (plan === "paid") return "paid";
  return "free";
}
