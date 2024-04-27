"use server";

import prisma from "@/lib/utils";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "@/schema/auth";
import { createSafeActionClient } from "next-safe-action";
import {
  generateResetPasswordToken,
  generateVerificationToken,
  getResetPasswordTokenByToken,
  getUserByEmail,
  getVerificationTokenByToken,
  hashPassword,
} from "./lib";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { sendForgotPasswordEmail, sendVerificationEmail } from "@/email/mail";

export const action = createSafeActionClient();

export const login = action(loginSchema, async ({ email, password }) => {
  const user = await getUserByEmail(email);
  if (!user || !user.email || !user.password) {
    return {
      status: 403,
      success: false,
      message: "Invalid Credentials",
    };
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);

    if (!verificationToken) {
      return {
        status: 403,
        success: false,
        message: "Something went wrong",
      };
    }
    const verificationLink = `${process.env.DOMAIN_URL}/auth/verify-email?token=${verificationToken.token}`;
    const emailContent = `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`;
    await sendVerificationEmail(user.email, "Email Verification", emailContent);
    return {
      status: 200,
      success: true,
      message: "Check your email to verify your account",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: 403,
            success: false,
            message: "Invalid Credentials",
          };
        default:
          return {
            status: 403,
            success: false,
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
});

export const register = action(
  registerSchema,
  async ({ name, email, password }) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }],
      },
    });

    if (existingUser) {
      return {
        status: 403,
        success: false,
        message: "User with this email or name already exists",
      };
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return {
        status: 403,
        success: false,
        message: "Something went wrong",
      };
    }

    const verificationToken = await generateVerificationToken(email);
    if (!verificationToken) {
      return {
        status: 500,
        success: false,
        message: "Something went wrong",
      };
    }
    await sendVerificationEmail(
      email,
      "Email verification",
      `<p>Please click <a href="${process.env.DOMAIN_URL}/auth/verify-email?token=${verificationToken?.token}">here</a> to verify your email</p>`,
      verificationToken?.token!
    );

    return {
      status: 200,
      success: true,
      message: "User created successfully. Verified your email.",
      data: user,
    };
  }
);

export const resetPassword = action(
  resetPasswordSchema,
  async ({ password, token }) => {
    if (!token) {
      return {
        status: 403,
        success: false,
        message: "Missing token",
      };
    }
    const resetPasswordToken = await getResetPasswordTokenByToken(token);
    if (!resetPasswordToken) {
      return {
        status: 403,
        success: false,
        message: "Invalid token or expired",
      };
    }
    const hasExpired = new Date(resetPasswordToken.expires) < new Date();
    if (hasExpired) {
      return {
        status: 403,
        success: false,
        message: "Invalid token or expired",
      };
    }
    const user = await getUserByEmail(resetPasswordToken.email);
    if (!user) {
      return {
        status: 403,
        success: false,
        message: "User with this email does not exist",
      };
    }

    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: {
        email: resetPasswordToken.email,
      },
      data: {
        password: hashedPassword,
        email: resetPasswordToken.email,
      },
    });
    await prisma.resetPasswordToken.delete({
      where: {
        id: resetPasswordToken.id,
      },
    });
    return {
      status: 200,
      success: true,
      message: "Password reset successfully",
    };
  }
);

export const forgotPassword = action(
  forgotPasswordSchema,
  async ({ email }) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return {
        status: 403,
        success: false,
        message: "User with this email does not exist",
      };
    }

    const token = await generateResetPasswordToken(email);
    const resetLink = `<p>Click <a href="${process.env.DOMAIN_URL}/auth/reset-password?token=${token?.token}">here</a> to reset your password</p>`;
    await sendForgotPasswordEmail(email, "Reset Password", resetLink);
    return {
      status: 200,
      success: true,
      message: "Reset link has been sent",
    };
  }
);

export const verifyEmail = action(verifyEmailSchema, async ({ token }) => {
  if (!token) {
    return {
      status: 403,
      success: false,
      message: "Missing token",
    };
  }
  const verificationToken = await getVerificationTokenByToken(token);
  if (!verificationToken) {
    return {
      status: 403,
      success: false,
      message: "Invalid token or expired",
    };
  }
  const hasExpired = new Date(verificationToken.expires) < new Date();
  if (hasExpired) {
    return {
      status: 403,
      success: false,
      message: "Invalid token or expired",
    };
  }

  const user = await getUserByEmail(verificationToken.email);
  if (!user) {
    return {
      status: 403,
      success: false,
      message: "Email associated with this token does not exist",
    };
  }
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return {
    status: 200,
    success: true,
    message: "Email verified successfully",
    data: user,
  };
});
