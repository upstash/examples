import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as schema from './schema';
import { ps } from '$lib/server/planetscale';

const db = drizzle(ps, {
    schema,
    logger: import.meta.env.DEV
},);

export {
    db,
    schema
}