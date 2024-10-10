import type { Handle } from "@sveltejs/kit";
import { COUNTRY_HEADER, CITY_HEADER } from "$lib/constants";

export const handle: Handle = async function ({ event, resolve }) {
    // Clone the request and add custom headers
    const modifiedRequest = new Request(event.request, {
        headers: new Headers(event.request.headers)
    });

    // Add custom headers only in development mode
    if (import.meta.env.DEV) {
        modifiedRequest.headers.set(CITY_HEADER, "Kakariko Village");
        modifiedRequest.headers.set(COUNTRY_HEADER, "JP");
    }

    // Pass the modified request to the resolve function
    const response = await resolve({ ...event, request: modifiedRequest });
    return response;
};
