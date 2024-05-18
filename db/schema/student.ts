import {
  pgTable,
  varchar,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { profile } from "@/db/schema/profile";
import { z } from "zod";

export const ClassLevelEnum = pgEnum("class_level", [
  "FORM_ONE",
  "FORM_TWO",
  "FORM_THREE",
  "FORM_FOUR",
  "FORM_FIVE",
  "FORM_SIX",
]);

export const student = pgTable(
  "student",
  {
    id: varchar("id", { length: 100 })
      .primaryKey()
      .notNull()
      .references(() => profile.id, { onDelete: "cascade" }),
    classLevel: ClassLevelEnum("class_level").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    isActive: boolean("is_active").notNull().default(true),
  },
  (t) => ({})
);

export const createStudentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]),
  schoolId: z.string(),
  phoneNumber: z.string().optional(),
  image: z.string().optional(),
  classLevel: z.enum([
    "FORM_ONE",
    "FORM_TWO",
    "FORM_THREE",
    "FORM_FOUR",
    "FORM_FIVE",
    "FORM_SIX",
  ]),
});

export const studentRelations = relations(student, ({ one }) => ({
  profile: one(profile, {
    fields: [student.id],
    references: [profile.id],
  }),
}));

export type Student = InferSelectModel<typeof student>;
