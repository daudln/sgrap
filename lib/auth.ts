import db from "@/db";
import { resetPasswordToken, user, verificationToken } from "@/db/schema/uaa";
import ms from "@/lib/ms";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    return false;
  }
};

export const getUserByEmail = async (email: string) => {
  const [_user] = await db.select().from(user).where(eq(user.email, email));
  return _user;
};

export const getUserById = async (id: string) => {
  const [_user] = await db
    .select({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    })
    .from(user)
    .where(eq(user.id, id));
  return _user;
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.verificationToken.findFirst({
      where: (token, { eq }) => eq(token.email, email),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const resetPasswordToken = await db.query.resetPasswordToken.findFirst({
      where: (token, { eq }) => eq(token.email, email),
    });
    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await db.query.resetPasswordToken.findFirst({
      where: (tb, { eq }) => eq(tb.token, token),
    });
    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.query.verificationToken.findFirst({
      where: (tb, { eq }) => eq(tb.token, token),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  try {
    const token = await getVerificationTokenByEmail(email);
    console.log(token);
    if (token) {
      await db
        .delete(verificationToken)
        .where(eq(verificationToken.email, token.email));
    }
    const [newToken] = await db
      .insert(verificationToken)
      .values({
        email,
        expires: new Date(Date.now() + ms("24h")),
      })
      .returning();
    return newToken;
  } catch (error) {
    return null;
  }
};

export const generateResetPasswordToken = async (email: string) => {
  try {
    const token = await getResetPasswordTokenByEmail(email);
    if (token) {
      await db
        .delete(resetPasswordToken)
        .where(eq(resetPasswordToken.email, token.email));
    }
    const [newToken] = await db
      .insert(resetPasswordToken)
      .values({
        email,
        expires: new Date(Date.now() + ms("24h")),
      })
      .returning();
    return newToken;
  } catch (error) {
    return null;
  }
};
