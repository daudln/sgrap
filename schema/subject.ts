import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(1, { message: "Subject name is required" }).max(100, {
    message: "Subject name is must be less than 100 characters long",
  }),
  code: z.string().min(1, { message: "Subject code is required" }).max(20, {
    message: "Subject code is must be less than 20 characters long",
  }),
  description: z.string().optional(),
  category: z.enum(["ART", "SCIENCE"], {
    errorMap: () => ({ message: "Subject category is required" }),
  }),
});

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
export type Subject = z.infer<typeof createSubjectSchema> & { id: number };

export const updateSubjectSchema = z.object({
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(200),
  description: z.string().optional(),
  category: z.enum(["ART", "SCIENCE"], {
    errorMap: () => ({ message: "Subject category is required" }),
  }),
});

export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>;

export const getSubjectSchema = z.object({
  id: z.string().min(1),
});

export type GetSubjectInput = z.infer<typeof getSubjectSchema>;

export const deleteSubjectSchema = z.object({
  uuid: z.string().min(1),
});

export type DeleteSubjectInput = z.infer<typeof deleteSubjectSchema>;

export const getSubjectsSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
});

export type GetSubjectsInput = z.infer<typeof getSubjectsSchema>;
