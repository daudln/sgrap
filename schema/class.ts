import { z } from "zod";

const createClassSchema = z.object({
  name: z.string(),
  schoolId: z.number(),
});

export { createClassSchema };

type CreateClassInput = z.infer<typeof createClassSchema>;

export type { CreateClassInput };
