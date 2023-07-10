import GithubProvider from "next-auth/providers/github";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";
import { type Adapter } from "next-auth/adapters";

const redis = Redis.fromEnv();

export const authOptions = {
	adapter: UpstashRedisAdapter(redis) as Adapter,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
};
