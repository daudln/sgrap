import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, unique, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { baseTable } from "@/db/schema/base";
import { school } from "@/db/schema/school";
import { teachersToSubjects } from "./teacher";

export const subjectCategoryEnum = pgEnum("subject_category", [
  "ART",
  "SCIENCE",
]);

export const subject = pgTable("subject", {
  ...baseTable,
  name: varchar("name", { length: 100 }).notNull().unique(),
  category: subjectCategoryEnum("category").notNull(),
});

export const schoolSubject = pgTable(
  "school_subject",
  {
    ...baseTable,
    school_id: text("school_id")
      .notNull()
      .references(() => school.id, { onDelete: "cascade" }),
    subject_id: text("subject_id")
      .notNull()
      .references(() => subject.id, { onDelete: "cascade" }),
    code: varchar("code", { length: 50 }).notNull(),
  },
  (t) => [
    unique().on(t.school_id, t.subject_id),
    unique().on(t.code, t.school_id, t.subject_id),
  ]
);

export const schoolSubjectRelations = relations(
  schoolSubject,
  ({ one, many }) => ({
    subject: one(subject, {
      fields: [schoolSubject.subject_id],
      references: [subject.id],
    }),
    school: one(school, {
      fields: [schoolSubject.school_id],
      references: [school.id],
    }),
    teachers: many(teachersToSubjects),
  })
);

export const subjectRelations = relations(subject, ({ many }) => ({
  schoolSubjects: many(schoolSubject),
}));

export const createSchoolSubjectSchema = createInsertSchema(schoolSubject);

export const createSubjectSchema = createInsertSchema(subject);

export const updateSubjectSchema = createUpdateSchema(subject).extend({
  id: z.string(),
});

export const subjectCategory = createSubjectSchema.shape.category;

export type Subject = z.infer<typeof createSubjectSchema>;
