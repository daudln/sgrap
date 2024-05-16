import { createId } from "@paralleldrive/cuid2";
import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subjectCategoryEnum = pgEnum("subject_category", [
  "ART",
  "SCIENCE",
]);

export const subject = pgTable("subject", {
  id: varchar("id", { length: 100 }).primaryKey().notNull(),
  code: varchar("code", { length: 100 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 100 }),
  category: subjectCategoryEnum("category").notNull(),
});

export const createSubjectSchema = createInsertSchema(subject);
export const subjectCategory = z.enum(["ART", "SCIENCE"]);

export type Subject = z.infer<typeof createSubjectSchema>;
