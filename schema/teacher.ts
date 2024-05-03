import { z } from "zod";

import { createProfileSchema } from "./profile";

export const createTeacherSchema = createProfileSchema.extend({
  email: z
    .string()
    .email({ message: "Provide a valid email" })
    .max(100, { message: "Email is must be less than 100 characters long" }),
  phoneNumber: z.string().max(100, {
    message: "Phone number is must be less than 100 characters long",
  }),
});

export type CreateTeacherInput = z.infer<typeof createTeacherSchema>;

export const updateTeacherSchema = createTeacherSchema.extend({
  uuid: z.string().min(1),
});

export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;
