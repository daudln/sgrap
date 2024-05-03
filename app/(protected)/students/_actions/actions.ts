"use server";

import prisma from "@/lib/utils";
import { deleteProfileSchema } from "@/schema/profile";
import { updateStudentSchema, createStudentSchema } from "@/schema/student";

import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export const createStudent = action(
  createStudentSchema,
  async ({ firstName, lastName, middleName, school, classLevel, gender }) => {
    const existingStudent = await prisma.student.findFirst({
      where: {
        schoolId: school,
        classLevel: classLevel,
        profile: {
          gender: gender,
          user: {
            name: {
              equals: `${firstName} ${middleName} ${lastName}`,
            },
          },
        },
      },
    });
    if (existingStudent) {
      return {
        status: 400,
        success: false,
        message: "Student already exists",
      };
    }
    const userName = `${firstName} ${middleName} ${lastName}`;
    const newUser = await prisma.user.create({
      data: {
        name: userName,
        type: "STUDENT",
      },
    });

    const newProfile = await prisma.profile.create({
      data: {
        schoolId: school,
        userId: newUser.id,
      },
    });

    const student = await prisma.student.create({
      data: {
        profileUserId: newProfile.userId,
        schoolId: school,
        classLevel: classLevel!,
      },
    });
    if (!student) {
      return {
        status: 500,
        success: false,
        message: "Student not created",
      };
    }
    return {
      status: 201,
      success: true,
      message: "Student created successfully",
      data: student,
    };
  }
);

export const updateStudent = action(
  updateStudentSchema,
  async ({
    uuid,
    firstName,
    middleName,
    lastName,
    school,
    classLevel,
    gender,
  }) => {
    const existingStudent = await prisma.student.findFirst({
      where: {
        profile: {
          userId: uuid,
        },
      },
    });
    if (!existingStudent) {
      return {
        status: 400,
        success: false,
        message: "Student does not exist",
      };
    }

    const name = `${firstName} ${middleName} ${lastName}`;
    const user = await prisma.user.update({
      where: {
        id: uuid,
      },
      data: {
        name: name,
        type: "STUDENT",
      },
    });

    const profile = await prisma.profile.update({
      where: {
        userId: uuid,
      },
      data: {
        schoolId: school,
        userId: user.id,
        gender,
      },
    });

    const student = await prisma.student.update({
      where: {
        profileUserId: profile.userId,
      },
      data: {
        profileUserId: profile.userId,
        schoolId: school,
        classLevel,
      },
    });
    if (!student) {
      return {
        status: 500,
        success: false,
        message: "Something went wrong",
      };
    }
    return {
      status: 200,
      success: true,
      message: "Student updated successfully",
      data: student,
    };
  }
);

export const deleteStudent = action(deleteProfileSchema, async ({ uuid }) => {
  const existingStudent = await prisma.student.findFirst({
    where: {
      profile: {
        userId: uuid,
      },
    },
  });
  if (!existingStudent) {
    return {
      status: 400,
      success: false,
      message: "Student does not exist",
    };
  }

  const profile = await prisma.profile.delete({
    where: {
      userId: uuid,
    },
  });

  await prisma.user.delete({
    where: {
      id: uuid,
    },
  });

  await prisma.student.delete({
    where: {
      profileUserId: profile.userId,
    },
  });
  return {
    status: 200,
    success: true,
    message: "Student deleted successfully",
  };
});
