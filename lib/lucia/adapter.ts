import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from "@/db";
import { session, user } from "@/db/schema/uaa";

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export default adapter;
