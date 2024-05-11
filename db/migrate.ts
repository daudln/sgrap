import { migrate } from "drizzle-orm/postgres-js/migrator";
import config from "@/drizzle.config";
import { db } from "@/db";
import env from "@/env";

async function main() {
  if (!env.DB_MIGRATING) {
    throw new Error(
      'You must set DB_MIGRATING to "true" when running migrations'
    );
  }

  await migrate(db, { migrationsFolder: config.out! });
}

main()
  .then(() => process.exit(0))
  .catch(console.error)
  .finally(async () => {
    process.exit(0);
  });
