import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "$env/static/private";
import { Redis } from "@upstash/redis";

export const databaseName = import.meta.env.DEV ? "redis-with-svelte-kit-dev" : "redis-with-svelte-kit";

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
