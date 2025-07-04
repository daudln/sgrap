import { student } from "@/db/schema/student";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { createProfileSchema, createUserSchema } from "@/schema/auth";

export const studentInsertSchema = createInsertSchema(student).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  enrollmentDate: true,
});

export const createStudentSchema = z
  .object({
    ...studentInsertSchema.shape,
    ...createProfileSchema.shape,
    ...createUserSchema.shape,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export const updateStudentSchema = z
  .object({
    ...studentInsertSchema.shape,
    ...createProfileSchema.shape,
    ...createUserSchema.shape,
  })
  .omit({ password: true, passwordConfirmation: true })
  .extend({
    id: z.string(),
  });

export type CreateStudentInput = z.infer<typeof createStudentSchema>;

export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;
