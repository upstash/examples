import { Redis } from "@upstash/redis";

export const databaseName =
  process.env.NODE_ENV === "development"
    ? "todos-dev"
    : "todos";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default redis;
