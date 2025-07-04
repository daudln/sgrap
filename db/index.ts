import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import schema from "@/db/schema";

export const connection = postgres(process.env.DATABASE_URL!!);

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type db = typeof db;

export default db;
