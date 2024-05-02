"use server";

import prisma from "@/lib/utils";
import {
  createProfileSchema,
  deleteProfileSchema,
  updateProfileSchema,
} from "@/schema/profile";
import { createSafeActionClient } from "next-safe-action";

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
        message: "Teacher not created",
      };
    }
    return {
      status: 200,
      success: true,
      message: "Teacher created successfully",
      data: newTeacher,
    };
  }
);

export const updateTeacher = action(
  updateProfileSchema,
  async ({
    uuid,
    firstName,
    middleName,
    lastName,
    email,
    school,
    phoneNumber,
  }) => {
    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        profile: {
          userId: uuid,
        },
      },
    });
    if (!existingTeacher) {
      return {
        status: 400,
        success: false,
        message: "Teacher does not exist",
      };
    }

    const name = `${firstName} ${middleName} ${lastName}`;
    const user = await prisma.user.update({
      where: {
        id: uuid,
      },
      data: {
        name: name,
        email,
        type: "TEACHER",
      },
    });

    const profile = await prisma.profile.update({
      where: {
        userId: uuid,
      },
      data: {
        schoolId: school,
        phoneNumber,
        userId: user.id,
      },
    });

    const teacher = await prisma.teacher.update({
      where: {
        profileUserId: profile.userId,
      },
      data: {
        profileUserId: profile.userId,
        schoolId: school,
      },
    });
    if (!teacher) {
      return {
        status: 500,
        success: false,
        message: "Something went wrong",
      };
    }
    return {
      status: 200,
      success: true,
      message: "Teacher updated successfully",
      data: teacher,
    };
  }
);

export const deleteTeacher = action(deleteProfileSchema, async ({ uuid }) => {
  const existingTeacher = await prisma.teacher.findFirst({
    where: {
      profile: {
        userId: uuid,
      },
    },
  });
  if (!existingTeacher) {
    return {
      status: 400,
      success: false,
      message: "Teacher does not exist",
    };
  }

  const profile = await prisma.profile.delete({
    where: {
      userId: uuid,
    },
  });

  const user = await prisma.user.delete({
    where: {
      id: uuid,
    },
  });

  const teacher = await prisma.teacher.delete({
    where: {
      profileUserId: profile.userId,
    },
  });
  return {
    status: 200,
    success: true,
    message: "Teacher deleted successfully",
    data: teacher,
  };
});
