import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const redis = Redis.fromEnv();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: UpstashRedisAdapter(redis),
  providers: [GitHub],
});
