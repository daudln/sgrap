import { z } from "zod";

export const createSchoolSchema = z.object({
  motto: z.string().min(1, { message: "School motto is required" }).max(100, {
    message: "School motto is must be less than 100 characters long",
  }),
  name: z.string().min(1, { message: "School name is required" }).max(100, {
    message: "School name is must be less than 100 characters long",
  }),
});

export type CreateSchoolInput = z.infer<typeof createSchoolSchema>;

export const updateSchoolSchema = z.object({
  motto: z.string().min(1, { message: "School motto is required" }).max(100, {
    message: "School motto is must be less than 100 characters long",
  }),
  name: z.string().min(1, { message: "School name is required" }).max(100, {
    message: "School name is must be less than 100 characters long",
  }),
  uuid: z.string(),
});

export type UpdateSchoolInput = z.infer<typeof updateSchoolSchema>;

export const getSchoolSchema = z.object({
  id: z.string().min(1),
});

export type GetSchoolInput = z.infer<typeof getSchoolSchema>;

export const deleteSchoolSchema = z.object({
  uuid: z.string().min(1),
});

export type DeleteSchoolInput = z.infer<typeof deleteSchoolSchema>;
