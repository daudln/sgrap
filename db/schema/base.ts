import { createId } from "@paralleldrive/cuid2";
import { timestamp, varchar, boolean } from "drizzle-orm/pg-core";

export const baseTable = {
  id: varchar("id", { length: 50 }).primaryKey().notNull().$defaultFn(createId),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
};

export const baseFields = {
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
};
