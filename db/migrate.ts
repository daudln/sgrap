import { migrate } from "drizzle-orm/postgres-js/migrator";
import config from "@/drizzle.config";
import { db } from "@/db";

async function main() {
  await migrate(db, { migrationsFolder: config.out! });
}

main()
  .then(() => process.exit(0))
  .catch(console.error)
  .finally(async () => {
    process.exit(0);
  });
