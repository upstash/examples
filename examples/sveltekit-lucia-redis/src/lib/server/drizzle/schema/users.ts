import { mysqlTable, index, unique, varchar, datetime, mysqlEnum, bigint, timestamp, int } from "drizzle-orm/mysql-core"
import { relations, } from "drizzle-orm";

/**
 * Configuration for the users schema table.
 * Please refer to the Lucia documentation for more information.
 *
 * @see https://lucia-auth.com/database-adapters/mysql2
 */

export const users = mysqlTable("users",
    {
        id: varchar("id", { length: 255 }).primaryKey(),
        createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
        email: varchar("email", { length: 191 }).notNull(),
    },
    (table) => {
        return {
            idIdx: index("users_id_idx").on(table.id),
            userIdKey: unique("users_id_key").on(table.id),
        }
    }
);

export const keys = mysqlTable("keys",
    {
        id: varchar("id", { length: 255 }).primaryKey(),
        hashedPassword: varchar("hashed_password", { length: 255 }),
        userId: varchar("user_id", { length: 255 }).notNull(),
    },
    (table) => {
        return {
            userIdIdx: index("keys_user_id_idx").on(table.userId),
            keyIdKey: unique("keys_id_key").on(table.id),
        }
    }
);