import { redis } from '$lib/config/upstash';
import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc';
import { Ratelimit } from "@upstash/ratelimit";

// Create a new ratelimiter, that only allows 1 request every minute
const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.slidingWindow(1, "60 s"),
});

const highfiveRatelimitMiddleware = middleware(async ({ path, next, ctx: { getClientAddress, setHeaders } }) => {
	const ip = getClientAddress();
	const identifier = `${path}-${ip}`;

	const result = await ratelimit.limit(identifier);

	setHeaders({
		'X-RateLimit-Limit': result.limit.toString(),
		'X-RateLimit-Remaining': result.remaining.toString()
	});

	if (!result.success) {
		throw new TRPCError({
			code: 'TOO_MANY_REQUESTS',
			message: JSON.stringify({
				limit: result.limit,
				remaining: result.remaining,
			})
		});
	}

	return next()
});

export default highfiveRatelimitMiddleware;
