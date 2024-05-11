import { defineConfig } from "drizzle-kit";
import env from "@/env";

export default defineConfig({
  schema: "./db/schema",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
