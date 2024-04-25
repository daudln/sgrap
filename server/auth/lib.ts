import ms from "@/lib/ms";
import prisma from "@/lib/utils";
import bcrypt from "bcryptjs";

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
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.resetPasswordToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.resetPasswordToken.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  try {
    const verificationToken = await getVerificationTokenByEmail(email);
    if (verificationToken) {
      await prisma.verificationToken.delete({
        where: {
          id: verificationToken.id,
        },
      });
    }

    const token = await prisma.verificationToken.create({
      data: {
        email,
        expires: new Date(Date.now() + ms("24h")),
      },
    });
    return token;
  } catch (error) {
    return null;
  }
};

export const generateResetPasswordToken = async (email: string) => {
  try {
    const resetPasswordToken = await getResetPasswordTokenByEmail(email);
    if (resetPasswordToken) {
      await prisma.resetPasswordToken.delete({
        where: {
          id: resetPasswordToken.id,
        },
      });
    }

    const token = await prisma.resetPasswordToken.create({
      data: {
        email,
        expires: new Date(Date.now() + ms("24h")),
      },
    });
    return token;
  } catch (error) {
    return null;
  }
};
