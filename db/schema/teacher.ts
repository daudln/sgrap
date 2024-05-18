import { pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { profile } from "@/db/schema/profile";

export const teacher = pgTable("teacher", {
  id: varchar("profile_id", { length: 100 })
    .primaryKey()
    .notNull()
    .references(() => profile.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

export const teacherRelations = relations(teacher, ({ one }) => ({
  profile: one(profile, {
    fields: [teacher.id],
    references: [profile.id],
  }),
}));

export type Teacher = InferSelectModel<typeof teacher>;
