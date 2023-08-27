import type { Config } from "drizzle-kit";
import dotenv from "dotenv"

dotenv.config()

const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD
const host = process.env.DATABASE_HOST
const db = process.env.DATABASE_NAME
const connectionString = `mysql://${username}:${password}@${host}/${db}?ssl={"rejectUnauthorized":true}`

export default {
    schema: "./src/lib/server/drizzle/schema/index.ts",
    driver: "mysql2",
    dbCredentials: {
        connectionString: connectionString
    },
} satisfies Config;