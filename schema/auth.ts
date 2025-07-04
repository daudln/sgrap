import { user } from "@/db/schema/auth";
import { profile } from "@/db/schema/profile";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const tanzaniaPhoneRegex = /^(?:(?:\+255|255|0)?\s*[67]\d{8})$/;

export const registerSchema = z
  .object({
    name: z.string({ message: "Name is required" }),
    email: z.string().email({ message: "Provide a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Username is require" }),
  password: z.string().min(1, { message: "Password is require" }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Provide a valid email" }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().regex(passwordRegex, {
      message:
        "Password must be at least 8 characters long and contain at least one letter and one number",
    }),
    passwordConfirmation: z.string().min(1, {
      message: "Password confirmation is required",
    }),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const verifyEmailSchema = z.object({
  token: z.string({ message: "Provide a valid email" }),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const createUserSchema = createInsertSchema(user)
  .extend({
    password: z.string().regex(passwordRegex, {
      message:
        "Password must be at least 8 characters long and contain at least one letter and one number",
    }),
    passwordConfirmation: z.string().min(1, {
      message: "Password confirmation is required",
    }),
  })
  .omit({ id: true, createdAt: true, updatedAt: true, emailVerified: true });

export const createProfileSchema = createInsertSchema(profile)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    isActive: true,
    deletedAt: true,
  })
  .extend({
    phoneNumber: z.string().regex(tanzaniaPhoneRegex, {
      message: "Invalid phone number",
    }).nullish(),
  });

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, { message: "Name is required" }),
    password: z.string().regex(passwordRegex, {
      message:
        "Password must be at least 8 characters long and contain at least one letter and one number",
    }),
    passwordConfirmation: z.string().min(1, {
      message: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const roleSchema = z.object({
  name: z.string().min(1, { message: "Role is required" }),
});

export type RoleInput = z.infer<typeof roleSchema>;

export const permissionSchema = z.object({
  name: z.string().min(1, { message: "Permission name is required" }),
  code: z
    .string()
    .regex(/^[a-zA-Z_]+$/, {
      message: "Permission code can only contain letters and underscores",
    })
    .min(1, { message: "Permission code is required" }),
});

export type PermissionInput = z.infer<typeof permissionSchema>;
