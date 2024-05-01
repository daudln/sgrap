import { z } from "zod";

export const createProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(100, {
    message: "First name is must be less than 100 characters long",
  }),
  middleName: z
    .string()
    .max(100, {
      message: "Middle name is must be less than 100 characters long",
    })
    .optional(),
  lastName: z.string().min(1, { message: "Last name is required" }).max(100, {
    message: "Last name is must be less than 100 characters long",
  }),
  email: z
    .string()
    .email({ message: "Provide a valid email" })
    .max(100, { message: "Email is must be less than 100 characters long" })
    .optional(),
  school: z.string().min(1, { message: "School is required" }),
  classLevel: z.string().optional(),
  phoneNumber: z
    .string()
    .max(100, {
      message: "Phone number is must be less than 100 characters long",
    })
    .optional(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(100, {
    message: "First name is must be less than 100 characters long",
  }),
  middleName: z
    .string()
    .max(100, {
      message: "Middle name is must be less than 100 characters long",
    })
    .optional(),
  lastName: z.string().min(1, { message: "Last name is required" }).max(100, {
    message: "Last name is must be less than 100 characters long",
  }),
  email: z
    .string()
    .email({ message: "Provide a valid email" })
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is must be less than 100 characters long" })
    .optional(),
  school: z.string().min(1, { message: "School is required" }),
  classLevel: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const getProfileSchema = z.object({
  id: z.string().min(1),
});

export type GetProfileInput = z.infer<typeof getProfileSchema>;

export const deleteProfileSchema = z.object({
  uuid: z.string().min(1),
});

export type DeleteProfileInput = z.infer<typeof deleteProfileSchema>;
