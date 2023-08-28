import type { AuthRequest, Session, User } from 'lucia';
import type { Auth as LuciaAuth } from '$lib/server/auth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: AuthRequest
			session: Session | null
		}
		interface PageData {
			user?: User
		}
		// interface Platform {}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = LuciaAuth;
		type DatabaseUserAttributes = {
			email: string;
		};
		type DatabaseSessionAttributes = {};
	}
}

export { };
