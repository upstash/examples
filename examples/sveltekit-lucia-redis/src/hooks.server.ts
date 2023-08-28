import { auth } from "$lib/server";
import { APP_PATH, SIGNIN_PATH, SIGNUP_PATH } from '$lib/utils/constants';
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

/**
 * This hook binds the auth request to the current request.
 * To make it easily accessible on the server through locals.
 */
const auth_handle: Handle = async ({ event, resolve }) => {
    event.locals.auth = auth.handleRequest(event);
    event.locals.session = await event.locals.auth.validate();

    return resolve(event);
}

/**
 * This hook is used to protect routes.
 */
const protected_routes_handle: Handle = async ({ event, resolve }) => {
    const route_id = event.route.id

    // Redirect to the home page if the user is already logged in.
    const login_routes = [SIGNIN_PATH, SIGNUP_PATH] as string[]
    if (event.locals.session && route_id && login_routes.includes(route_id)) {
        throw redirect(302, "/");
    }

    // Redirect to the login page if the user is not logged in.
    if (!event.locals.session && route_id && route_id.startsWith(APP_PATH)) {
        throw redirect(302, SIGNIN_PATH);
    }

    return resolve(event);
}

export const handle = sequence(auth_handle, protected_routes_handle);