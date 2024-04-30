"use server";

import prisma from "@/lib/utils";
import {
  createSchoolSchema,
  updateSchoolSchema,
  deleteSchoolSchema,
} from "@/schema/school";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

export const action = createSafeActionClient();

export const createSchool = action(
  createSchoolSchema,
  async ({ name, motto }) => {
    const existingSchool = await prisma.school.findFirst({
      where: {
        name,
      },
    });
    if (existingSchool) {
      return {
        status: 400,
        success: false,
        message: "School already exists",
      };
    }
    const school = await prisma.school.create({
      data: {
        name,
        motto,
      },
    });
    if (!school) {
      return {
        status: 500,
        success: false,
        message: "school not created",
      };
    }
    revalidatePath("/schools");
    return {
      status: 200,
      success: true,
      message: "school created successfully",
      data: school,
    };
  }
);

export const updateSchool = action(
  updateSchoolSchema,
  async ({ name, motto, uuid }) => {
    const existingSchool = await prisma.school.findFirst({
      where: { uuid },
    });
    if (!existingSchool) {
      return {
        status: 400,
        success: false,
        message: "school not found",
      };
    }
    const school = await prisma.school.update({
      where: {
        uuid: existingSchool.uuid,
      },
      data: {
        name,
        motto,
      },
    });
    if (!school) {
      return {
        status: 500,
        success: false,
        message: "school not created",
      };
    }
    revalidatePath("/schools");
    return {
      status: 200,
      success: true,
      message: "school updated successfully",
      data: school,
    };
  }
);

export const deleteDchool = action(deleteSchoolSchema, async ({ uuid }) => {
  const existingSchool = await prisma.school.findFirst({
    where: {
      uuid,
    },
  });
  if (!existingSchool) {
    return {
      status: 400,
      success: false,
      message: "No school with this id",
    };
  }
  await prisma.school.delete({
    where: {
      uuid,
    },
  });

  return {
    status: 201,
    success: true,
    message: "school delete successfully",
  };
});

export const getschools = async () => {
  const schools = await prisma.school.findMany();
  if (!schools) {
    return {
      status: 404,
      success: false,
      message: "schools not found",
    };
  }
  return {
    status: 200,
    success: true,
    message: "schools fetched successfully",
    data: schools,
  };
};

export async function getschool() {
  console.log("getschool");
}
