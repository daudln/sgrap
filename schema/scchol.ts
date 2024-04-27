import { z } from "zod";

const createSchoolSchema = z.object({
  motto: z.string().optional(),
  name: z.string().min(1, { message: "School name is required" }).max(100, {
    message: "School name is must be less than 100 characters long",
  }),
});

type CreateSchoolInput = z.infer<typeof createSchoolSchema>;
export { createSchoolSchema };

export type { CreateSchoolInput };
