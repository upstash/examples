import { defaultAuthFormValues } from '$lib/utils/constants';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { PROVIDER_ID, auth } from '$lib/server';
import { LuciaError } from 'lucia';

export const load = (async () => {
	return {
		defaultAuthFormValues
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const fields = [email, password];

		if (fields.some((field) => !field)) {
			return fail(400, {
				error: 'All fields are required'
			});
		}

		try {
			const user = await auth.useKey(PROVIDER_ID.EMAIL, email.toLowerCase(), password);

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session); // set session cookie
		} catch (err) {
			if (
				err instanceof LuciaError &&
				(err.message === 'AUTH_INVALID_KEY_ID' || err.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					error: 'Incorrect username of password'
				});
			}

			return fail(400, {
				error: 'An unknown error occurred'
			});
		}

		throw redirect(302, '/app');
	}
} satisfies Actions;
