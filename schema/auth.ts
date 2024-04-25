import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Provide a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, { message: "Username is required" }),
    passwordConfirmation: z.string().min(1, {
      message: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords don't match",
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }),
    passwordConfirmation: z.string().min(1, {
      message: "Password confirmation is required",
    }),
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords don't match",
  });

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const verifyEmailSchema = z.object({
  token: z.string(),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const resendEmailVerificationSchema = z.object({
  email: z.string().email(),
});

export type ResendEmailVerificationInput = z.infer<
  typeof resendEmailVerificationSchema
>;

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const updateProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
