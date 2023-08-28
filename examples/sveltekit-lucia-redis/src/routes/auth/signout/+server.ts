import { auth } from '$lib/server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
    const session = await locals.auth.validate();

    if (!session) {
        return new Response(null, {
            status: 400
        });
    }

    // Invalidate session or alternatively, you can delete all sessions: await auth.invalidateAllUserSessions(session.userId);
    await auth.invalidateSession(session.sessionId);

    // Remove the cookie.
    locals.auth.setSession(null);

    return new Response(null, {
        status: 200
    });
};