
import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "$env/static/private";
import { Redis } from "@upstash/redis";

export const upstashClient = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN
});
