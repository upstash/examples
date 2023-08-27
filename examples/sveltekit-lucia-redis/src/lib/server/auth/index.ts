import { lucia } from "lucia";
import { upstash } from "@lucia-auth/adapter-session-redis";
import { dev } from "$app/environment";
import { sveltekit } from "lucia/middleware";
import { upstashClient } from "../upstash";
import { planetscale } from "@lucia-auth/adapter-mysql";
import { ps } from "../planetscale";

export enum PROVIDER_ID {
    EMAIL = "email"
}

export const auth = lucia({
    adapter: {
        user: planetscale(ps, {
            user: "users",
            key: "keys",
            /**
             * Sessions are handled by Upstash Redis.
             */
            session: null
        }),
        session: upstash(upstashClient)
    },
    middleware: sveltekit(),
    env: dev ? "DEV" : "PROD",
    getUserAttributes: (data) => {
        return {
            userId: data.id,
            email: data.email
        };
    }
});

export type Auth = typeof auth;