import { z } from "zod";

export const getEntitySchema = z.object({
  id: z.string(),
});
