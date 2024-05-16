import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId as cuid } from "@paralleldrive/cuid2";

export const school = pgTable("school", {
  id: varchar("id", { length: 100 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => cuid()),
  name: varchar("name", { length: 100 }).notNull(),
  motto: varchar("motto", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});
