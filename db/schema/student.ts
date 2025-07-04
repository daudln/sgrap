import {
  pgTable,
  varchar,
  timestamp,
  boolean,
  pgEnum,
  text,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { profile } from "@/db/schema/profile";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { baseTable } from "@/db/schema/base";
import { school } from "@/db/schema/school";

export const ClassLevelEnum = pgEnum("class_level", [
  "PRE_NURSERY",
  "NURSERY",
  "KINDERGARTEN",
  "GRADE_1",
  "GRADE_2",
  "GRADE_3",
  "GRADE_4",
  "GRADE_5",
  "GRADE_6",
  "GRADE_7",
  "GRADE_8",
  "FORM_ONE",
  "FORM_TWO",
  "FORM_THREE",
  "FORM_FOUR",
  "FORM_FIVE",
  "FORM_SIX",
]);

export const student = pgTable("student", {
  ...baseTable,
  id: text("id")
    .notNull()
    .primaryKey()
    .references(() => profile.id, { onDelete: "cascade" }),
  schoolId: text("school_id")
    .notNull()
    .references(() => school.id, { onDelete: "restrict" }),
  classLevel: ClassLevelEnum("class_level").notNull(),
  enrollmentDate: timestamp("enrollment_date", { mode: "date" }).defaultNow(),
});

export const createStudentSchema = createInsertSchema(student).extend({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  schoolId: z.string(),
  gender: z.enum(["MALE", "FEMALE"]),
});

export const studentRelations = relations(student, ({ one }) => ({
  profile: one(profile, {
    fields: [student.id],
    references: [profile.id],
  }),
  school: one(school, {
    fields: [student.schoolId],
    references: [school.id],
  }),
}));

export type Student = InferSelectModel<typeof student>;
