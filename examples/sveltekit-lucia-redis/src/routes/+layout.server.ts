import { db, schema } from '$lib/server/drizzle';
import type { LayoutServerLoad } from './$types';
import { eq } from 'drizzle-orm'

export const load = (async ({ locals }) => {
    return {
        user: locals?.session?.user
    };
}) satisfies LayoutServerLoad;