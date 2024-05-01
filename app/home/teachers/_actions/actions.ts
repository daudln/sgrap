"use server";

import prisma from "@/lib/utils";
import { createProfileSchema } from "@/schema/profile";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

export const action = createSafeActionClient();

export const createTeacher = action(
  createProfileSchema,
  async ({ firstName, middleName, lastName, email, school, phoneNumber }) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        status: 400,
        success: false,
        message: "User with email already exists",
      };
    }

    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        profile: {
          schoolId: school,
        },
      },
    });
    if (existingTeacher) {
      return {
        status: 400,
        success: false,
        message: "Teacher already exists",
      };
    }

    const userName = `${firstName} ${middleName} ${lastName}`;
    const newUser = await prisma.user.create({
      data: {
        name: userName,
        email,
        type: "TEACHER",
      },
    });

    const newProfile = await prisma.profile.create({
      data: {
        schoolId: school,
        phoneNumber,
        userId: newUser.id,
      },
    });

    const newTeacher = await prisma.teacher.create({
      data: {
        profileUserId: newProfile.userId,
        schoolId: school,
      },
    });
    if (!newTeacher) {
      return {
        status: 500,
        success: false,
        message: "Subject not created",
      };
    }
    revalidatePath("/subjects");
    return {
      status: 200,
      success: true,
      message: "Subject created successfully",
      data: newTeacher,
    };
  }
);
