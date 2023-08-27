import type { InferModel } from "drizzle-orm";
import type { schema } from ".";

export type User = InferModel<typeof schema.users>;