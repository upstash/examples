import { setUser } from '$lib/utils/user-store';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
    setUser(event.data.user)

    return {
        user: event.data.user
    };
}) satisfies LayoutLoad;