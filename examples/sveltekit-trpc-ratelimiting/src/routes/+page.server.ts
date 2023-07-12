import { trpcLoad } from '$lib/api/trpc-load';
import type { PageServerLoad } from './$types';

export const load = (async (events) => {
    return {
        cats: trpcLoad(events, (t) => t.public.cat.getMany())
    };
}) satisfies PageServerLoad;