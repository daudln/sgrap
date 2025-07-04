import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import emailService from "./emails/utils";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await emailService.sendEmail(
        user.email,
        "Reset your password",
        "forgot-password.html",
        {
          userName: user.name,
          resetLink: url,
        }
      );
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await emailService.sendEmail(
        user.email,
        "Verify your email address",
        "verification.html",
        {
          userName: user.name,
          verificationLink: url,
        }
      );
    },
    sendOnSignUp: true,
  },
  plugins: [nextCookies()],
});

export default auth;
