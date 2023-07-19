import type { Actions, PageServerLoad } from './$types';
import { get_visitors, get_city, add_visitor } from "$lib/data";

export const load = (async ({ request }) => {
    const current_city = get_city(request);
    const visited = await get_visitors();

    return {
        current_city,
        visited,
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const city = get_city(request);
        await add_visitor(city);

        return {
            signed: true
        }
    },
} satisfies Actions