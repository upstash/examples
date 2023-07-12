import { createContext } from '$lib/api/createContext';
import { appRouter } from '$lib/api/root';
import { type RequestEvent, error } from '@sveltejs/kit';
import { TRPCError } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import type { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';

const HTTP_MSG_MAP = {
	NOT_FOUND: 'Not found',
	UNAUTHORIZED: 'Unauthorized',
	FORBIDDEN: 'Forbidden',
	METHOD_NOT_SUPPORTED: 'Method not supported',
	TIMEOUT: 'Timeout',
	CONFLICT: 'Conflict',
	PRECONDITION_FAILED: 'Precondition failed',
	PAYLOAD_TOO_LARGE: 'Payload too large',
	UNPROCESSABLE_CONTENT: 'Unprocessable content',
	TOO_MANY_REQUESTS: 'Too many requests',
	CLIENT_CLOSED_REQUEST: 'Client closed request',
	INTERNAL_SERVER_ERROR: 'Internal server error',
	BAD_REQUEST: 'Bad request',
	PARSE_ERROR: 'Parse error'
} satisfies Record<TRPC_ERROR_CODE_KEY, string>;

export async function trpcLoad<
	Event extends RequestEvent<Partial<Record<string, string>>, string | null>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Method extends (caller: ReturnType<typeof appRouter.createCaller>) => Promise<any>
>(event: Event, method: Method): Promise<ReturnType<Method>> {
	try {
		const caller = appRouter.createCaller(await createContext(event));
		return await method(caller);
	} catch (e) {
		if (e instanceof TRPCError) {
			const httpCode = getHTTPStatusCodeFromError(e);
			const code = HTTP_MSG_MAP[e.code];

			if (e.code !== 'NOT_FOUND') {
				console.log('TRPCError', e);
			}


			throw error(httpCode, `${code}: Unknown error`);
		}

		console.log('TRPCError', e);

		throw error(500, 'Unknown error');
	}
}
