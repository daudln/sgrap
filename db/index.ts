import { drizzle } from "drizzle-orm/postgres-js";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import postgres from "postgres";
import schema from "@/db/schema";
import env from "@/env";
import { session, user } from "./schema/uaa";

console.log(env.DATABASE_URL);
export const connection = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
  onnotice: env.DB_SEEDING ? () => {} : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type db = typeof db;

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);
export default db;
export { adapter };
