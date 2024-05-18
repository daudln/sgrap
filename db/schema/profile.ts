import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createUserSchema, user } from "./uaa";
import { InferSelectModel, relations } from "drizzle-orm";
import { school } from "./school";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { student } from "./student";
import { teacher } from "@/db/schema/teacher";

export const GenderEnum = pgEnum("gender", ["MALE", "FEMALE"]);

export const profile = pgTable("profile", {
  id: varchar("id", { length: 100 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .primaryKey(),
  image: text("image"),
  gender: GenderEnum("gender").notNull(),
  phoneNumber: varchar("phone_number", { length: 12 }),
  schoolId: text("school_id")
    .notNull()
    .references(() => school.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.id],
    references: [user.id],
  }),
  school: one(school, {
    fields: [profile.schoolId],
    references: [school.id],
  }),
  student: one(student),
  teacher: one(teacher),
}));

export type Profile = InferSelectModel<typeof profile>;

export const createProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]),
  schoolId: z.string(),
  phoneNumber: z.string().optional(),
  image: z.string().optional(),
});
