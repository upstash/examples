import { createContext } from '$lib/api/createContext';
import { appRouter } from '$lib/api/root';
import type { Handle } from '@sveltejs/kit';
import { TRPCError } from '@trpc/server';
import type { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handle: Handle = createTRPCHandle({
    router: appRouter, createContext, responseMeta({ errors, data, type, ctx }) {
        const noHeaders = {};
        const allOk = errors.length === 0;

        /**
         * NOTE: responseMeta only hanldes requests made from the client.
         * Server side queries are handled directly in the SvelteKit load() function.
         * Thus if you wnat to set headers for server side queries, you need to do it there.
         */
        if (ctx?.isDataRequest) {
            return noHeaders;
        }

        const tooManyRequests = errors.some((error) => {
            // @ts-expect-error - Types don't match
            const code = error.data.code as TRPC_ERROR_CODE_KEY;

            return code === 'TOO_MANY_REQUESTS'
        });

        if (tooManyRequests) {
            // set the appropriate headers
            const data: {
                limit: number;
                remaining: number;
            } = JSON.parse(errors[0].message);

            return {
                headers: {
                    'X-RateLimit-Limit': data.limit.toString(),
                    'X-RateLimit-Remaining': data.remaining.toString(),
                }
            }
        }

        return {}
    },
});