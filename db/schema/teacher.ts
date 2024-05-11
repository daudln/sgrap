import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { profile } from "./profile";

export const teacher = pgTable(
  "teacher",
  {
    profileId: varchar("profile_id", { length: 100 })
      .notNull()
      .references(() => profile.userId, { onDelete: "cascade" })
      .primaryKey(),

    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    isActive: boolean("is_active").notNull().default(true),
  },
  (teacher) => ({})
);

export const teacherRelations = relations(teacher, ({ one, many }) => ({
  profile: one(profile, {
    fields: [teacher.profileId],
    references: [profile.userId],
  }),
}));

export default teacher;

export type Teacher = InferSelectModel<typeof teacher>;
