import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Username is require" }),
  password: z.string().min(1, { message: "Password is require" }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Provide a valid email" }),
});

export const resetPasswordSchema = z.object({
  password: z.string().email({ message: "Provide a valid email" }),
  token: z.string({ message: "Missing reset password token" }),
});

export const verifyEmailSchema = z.object({
  token: z.string({ message: "Provide a valid email" }),
});
