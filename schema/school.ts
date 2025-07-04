import z from "zod";

export const createSchoolSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  motto: z.string().min(1, { message: "Motto is required" }),
});

export type CreateSchool = z.infer<typeof createSchoolSchema>;

export const updateSchoolSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  motto: z.string().min(1, { message: "Motto is required" }),
});

export type UpdateSchool = z.infer<typeof updateSchoolSchema>;

export const schoolSchema = createSchoolSchema.extend({
  id: z.string(),
});

export type School = z.infer<typeof schoolSchema>;
