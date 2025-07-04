import { pgTable, varchar, text, primaryKey, index } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { profile } from "@/db/schema/profile";
import { z } from "zod";
import { baseFields } from "@/db/schema/base";
import { school } from "@/db/schema/school";
import { schoolSubject } from "@/db/schema/subject";

// === TABLES ===

export const teacher = pgTable("teacher", {
  ...baseFields,
  id: varchar({ length: 100 })
    .notNull()
    .primaryKey()
    .references(() => profile.id, { onDelete: "cascade" }),
  specialization: text("specialization"),
});

export const teachersToSubjects = pgTable(
  "teachers_to_subjects",
  {
    teacher_id: text("teacher_id")
      .notNull()
      .references(() => teacher.id, { onDelete: "cascade" }),
    school_subject_id: text("school_subject_id")
      .notNull()
      .references(() => schoolSubject.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.teacher_id, t.school_subject_id] }),
    index("teacher_subject_teacher_idx").on(t.teacher_id),
    index("teacher_subject_subject_idx").on(t.school_subject_id),
  ]
);

export const teachersToSchools = pgTable(
  "teachers_to_schools",
  {
    teacher_id: text("teacher_id")
      .notNull()
      .references(() => teacher.id, { onDelete: "cascade" }),

    school_id: text("school_id")
      .notNull()
      .references(() => school.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.teacher_id, t.school_id] })]
);

// === INSERT SCHEMA ===

export const createTeacherSchema = createInsertSchema(teacher).extend({
  firstName: z.string(),
  lastName: z.string(),
  school: z.string(),
  gender: z.enum(["MALE", "FEMALE"]),
});

// === RELATIONS ===

export const teacherRelations = relations(teacher, ({ many, one }) => ({
  profile: one(profile, {
    fields: [teacher.id],
    references: [profile.id],
  }),

  subjects: many(teachersToSubjects),
  schools: many(teachersToSchools),
}));

export const teachersToSubjectsRelations = relations(
  teachersToSubjects,
  ({ one }) => ({
    teacher: one(teacher, {
      fields: [teachersToSubjects.teacher_id],
      references: [teacher.id],
    }),
    schoolSubject: one(schoolSubject, {
      fields: [teachersToSubjects.school_subject_id],
      references: [schoolSubject.id],
    }),
    
  })
);

export const teachersToSchoolsRelations = relations(
  teachersToSchools,
  ({ one }) => ({
    teacher: one(teacher, {
      fields: [teachersToSchools.teacher_id],
      references: [teacher.id],
    }),
    school: one(school, {
      fields: [teachersToSchools.school_id],
      references: [school.id],
    }),
  })
);

// === TYPE ===

export type Teacher = InferSelectModel<typeof teacher>;

export type TeachersToSubjects = InferSelectModel<typeof teachersToSubjects>;

export type TeachersToSchools = InferSelectModel<typeof teachersToSchools>;
