import { Redis } from "@upstash/redis";

export const RedisClient = () => {
  const token = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN;
  const url = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL;

  if (!url) throw new Error("Redis URL is missing!");
  if (!token) throw new Error("Redis TOKEN is missing!");

  const redis = new Redis({
    url,
    token,
  });

  return redis;
};
