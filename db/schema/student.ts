import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { profile } from "./profile";

export const ClassLevelEnum = pgEnum("classLevel", [
  "FORM_ONE",
  "FORM_TWO",
  "FORM_THREE",
  "FORM_FOUR",
  "FORM_FIVE",
  "FORM_SIX",
]);

export const student = pgTable("student", {
  profileId: varchar("profile_id", { length: 100 })
    .primaryKey()
    .notNull()
    .references(() => profile.userId, { onDelete: "cascade" }),
  classLevel: ClassLevelEnum("class_level").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

export const studentRelations = relations(student, ({ one, many }) => ({
  profile: one(profile, {
    fields: [student.profileId],
    references: [profile.userId],
  }),
}));

export type UserData = InferSelectModel<typeof student>;
