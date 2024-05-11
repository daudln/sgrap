import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./uaa";
import { InferSelectModel, relations } from "drizzle-orm";
import { school } from "./school";
import { student } from "./student";
import { teacher } from "./teacher";

export const GenderEnum = pgEnum("gender", ["MALE", "FEMALE"]);
export const ProfileType = pgEnum("profile_type", ["STUDENT", "TEACHER"]);

export const profile = pgTable("profile", {
  userId: varchar("user_id", { length: 100 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .primaryKey(),
  image: text("image"),
  gender: GenderEnum("gender").notNull(),
  phoneNumber: varchar("phone_number", { length: 12 }),
  profileType: ProfileType("profile_type").notNull().default("STUDENT"),
  schoolId: text("school_id")
    .notNull()
    .references(() => school.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

export type Profile = InferSelectModel<typeof profile>;

export const profileReletions = relations(profile, ({ one, many }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
  school: one(school, {
    fields: [profile.schoolId],
    references: [school.id],
  }),
  student: one(student),
  teacher: one(teacher),
}));
