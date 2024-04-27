import { z } from "zod";

const createProfileSchema = z.object({
  userId: z.string(),
  schoolId: z.number(),
});

type CreateProfileInput = z.infer<typeof createProfileSchema>;

export type { CreateProfileInput };
