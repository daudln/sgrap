import { z } from "zod";

export const createStudentSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(100, {
    message: "First name is must be less than 100 characters long",
  }),
  middleName: z
    .string()
    .max(100, {
      message: "Middle name is must be less than 100 characters long",
    })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: "Student name is required" })
    .max(100, {
      message: "Student name is must be less than 100 characters long",
    }),
  email: z
    .string()
    .email({ message: "Provide a valid email" })
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is must be less than 100 characters long" }),
  school: z.string().min(1, { message: "School is required" }),
  classLevel: z.string().min(1, { message: "Class is required" }),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;

export const updateStudentSchema = z.object({
  name: z.string().min(1, { message: "Student name is required" }).max(100, {
    message: "Student name is must be less than 100 characters long",
  }),
  email: z
    .string()
    .email({ message: "Provide a valid email" })
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is must be less than 100 characters long" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .max(100, {
      message: "Phone number is must be less than 100 characters long",
    }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(100, { message: "Address is must be less than 100 characters long" }),
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
