import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { defaultAuthFormValues } from '$lib/utils/constants';
import { db, schema } from '$lib/server/drizzle';
import { eq } from 'drizzle-orm';
import { PROVIDER_ID, auth } from '$lib/server';

export const load = (async () => {
    return { defaultAuthFormValues };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const passwordConfirmation = formData.get("passwordConfirmation") as string;
        const fields = [email, password, passwordConfirmation];

        if (fields.some(field => !field)) {
            return fail(400, {
                error: "All fields are required"
            });
        }

        if (password !== passwordConfirmation) {
					return fail(400, {
						error: 'Passwords do not match'
					});
				}

        try {
            const user = await db.query.users.findFirst({
                where: eq(schema.users.email, email.toLowerCase()),
            });

            if (user) {
                return fail(400, {
                    error: "User with this email already exists"
                });
            }

            const newUser = await auth.createUser({
                key: {
                    providerId: PROVIDER_ID.EMAIL,
                    providerUserId: email.toLowerCase(),
                    password: password
                },
                attributes: {
                    email
                },
            })


            const session = await auth.createSession({
                userId: newUser.userId,
                attributes: {}
            });

            locals.auth.setSession(session); // set session cookie
        } catch (error) {
            const err = error as Error;

            console.log('error', err);

            return fail(400, {
                error: err?.message ?? "Something went wrong"
            });
        }

        throw redirect(302, '/app')
    }
} satisfies Actions