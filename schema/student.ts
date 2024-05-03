import { z } from "zod";
import { createProfileSchema } from "./profile";

export const createStudentSchema = createProfileSchema.extend({
  classLevel: z.enum(
    [
      "FORM_ONE",
      "FORM_TWO",
      "FORM_THREE",
      "FORM_FOUR",
      "FORM_FIVE",
      "FORM_SIX",
    ],
    {
      message: "Provide a valid class level",
      errorMap: () => ({ message: "The class level is required" }),
    }
  ),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;

export const updateStudentSchema = createStudentSchema.extend({
  uuid: z.string().min(1),
});

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

export const getStudentSchema = z.object({
  id: z.string().min(1),
});

export type GetStudentInput = z.infer<typeof getStudentSchema>;

export const deleteStudentSchema = z.object({
  uuid: z.string().min(1),
});

export type DeleteStudentInput = z.infer<typeof deleteStudentSchema>;
