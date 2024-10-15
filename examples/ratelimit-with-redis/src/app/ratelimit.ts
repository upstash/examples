"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "30s"),
});

export const checkRatelimit = async () => {
  const ip = headers().get("x-forwarded-for") || "anonymous011";
  const result = await ratelimit.limit(ip);
  return result;
};

export type RatelimitResponse = Awaited<ReturnType<Ratelimit["limit"]>>;
