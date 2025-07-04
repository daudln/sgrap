import { teacher } from "@/db/schema/teacher";
import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { student } from "@/db/schema/student";
import { user } from "@/db/schema/auth";
import { baseTable } from "@/db/schema/base";

export const genderEnum = pgEnum("gender_enum", ["MALE", "FEMALE"]);

export const profile = pgTable("profile", {
  ...baseTable,
  id: text("id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  phoneNumber: varchar("phone_number", { length: 12 }),
  dateOfBirth: timestamp("date_of_birth", { mode: "date" }),
  gender: genderEnum("gender_enum"),
});

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.id],
    references: [user.id],
  }),
  student: one(student),
  teacher: one(teacher),
}));

export type Profile = InferSelectModel<typeof profile>;

export const createProfileSchema = createInsertSchema(profile);
