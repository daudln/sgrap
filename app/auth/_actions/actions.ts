"use server";

import { lucia } from "@/auth";
import db from "@/db";
import {
  resetPasswordToken,
  signInSchema,
  signUpSchema,
  user,
  verificationToken,
} from "@/db/schema/uaa";
import { sendForgotPasswordEmail, sendVerificationEmail } from "@/email/mail";
import {
  comparePassword,
  generateResetPasswordToken,
  generateVerificationToken,
  getResetPasswordTokenByToken,
  getUserByEmail,
  getVerificationTokenByToken,
  hashPassword,
} from "@/lib/auth";
import { validateRequest } from "@/auth";
import ms from "@/lib/ms";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "@/schema/auth";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const action = createSafeActionClient();

export const login = action(signInSchema, async ({ email, password }) => {
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
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${verificationToken.token}`;
    const emailContent = `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`;
    await sendVerificationEmail(user.email, "Email Verification", emailContent);
    return {
      status: 200,
      success: true,
      message: "Check your email to verify your account",
    };
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    return {
      status: 403,
      success: false,
      message: "Invalid Credentials",
    };
  }

  const session = await lucia.createSession(user.id, ms("1h"));
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
});

export const signUp = action(signUpSchema, async (values) => {
  const existingUser = await getUserByEmail(values.email);
  if (existingUser) {
    return {
      status: 403,
      success: false,
      message: "User with this email already exists",
    };
  }
  const hashedPassword = await hashPassword(values.password);
  const userId = generateId(15);

  try {
    await db
      .insert(user)
      .values({
        id: userId,
        email: values.email,
        name: values.name,
        password: hashedPassword,
      })
      .returning({
        id: user.id,
        email: user.email,
      });

    const verificationToken = await generateVerificationToken(values.email);
    if (!verificationToken) {
      return {
        status: 500,
        success: false,
        message: "Something went wrong",
      };
    }

    await sendVerificationEmail(
      values.email,
      "Email verification",
      `<p>Please click <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${verificationToken?.token}">here</a> to verify your email</p>`,
      verificationToken?.token!
    );

    return {
      success: true,
      message: "Success! Please check your email to verify your account.",
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
});

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

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
    const existingResetPasswordToken = await getResetPasswordTokenByToken(
      token
    );
    if (!existingResetPasswordToken) {
      return {
        status: 403,
        success: false,
        message: "Invalid token or expired",
      };
    }
    const hasExpired =
      new Date(existingResetPasswordToken.expires) < new Date();
    if (hasExpired) {
      return {
        status: 403,
        success: false,
        message: "Invalid token or expired",
      };
    }
    const existingUser = await getUserByEmail(existingResetPasswordToken.email);
    if (!existingUser) {
      return {
        status: 403,
        success: false,
        message: "User with this email does not exist",
      };
    }

    const hashedPassword = await hashPassword(password);
    await db
      .update(user)
      .set({
        password: hashedPassword,
        email: existingResetPasswordToken.email,
      })
      .where(eq(user.email, existingResetPasswordToken.email));

    await db
      .delete(resetPasswordToken)
      .where(eq(resetPasswordToken.token, token));
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
    const existingUser = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!existingUser) {
      return {
        status: 403,
        success: false,
        message: "User with this email does not exist",
      };
    }

    const token = await generateResetPasswordToken(email);
    const resetLink = `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token?.token}">here</a> to reset your password</p>`;
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
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      status: 403,
      success: false,
      message: "Invalid token or expired",
    };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      status: 403,
      success: false,
      message: "Invalid token or expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return {
      status: 403,
      success: false,
      message: "Email associated with this token does not exist",
    };
  }
  await db
    .update(user)
    .set({ emailVerified: new Date(), email: existingToken.email })
    .where(eq(user.id, existingUser.id));

  await db
    .delete(verificationToken)
    .where(eq(verificationToken.email, verificationToken.email));
  return {
    status: 200,
    success: true,
    message: "Email verified successfully",
    data: user,
  };
});
