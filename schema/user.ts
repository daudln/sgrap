import { z } from "zod";

export const getUsersParamsSchema = z.object({
  type: z.enum(["STUDENT", "TEACHER"], {
    errorMap: () => ({
      message:
        "Invalid user type provided. Only STUDENT and TEACHER are allowed",
    }),
  }),
  page: z.number().optional(),
  limit: z.number().optional(),
});
