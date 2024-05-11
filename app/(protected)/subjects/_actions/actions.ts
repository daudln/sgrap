"use server";

import prisma from "@/lib/utils";
import {
  createSubjectSchema,
  deleteSubjectSchema,
  updateSubjectSchema,
} from "@/schema/subject";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

export const action = createSafeActionClient();

export const createSubject = action(
  createSubjectSchema,
  async ({ code, name, description, category }) => {
    const existingSubject = await prisma.subject.findFirst({
      where: {
        OR: [{ code }, { name }],
      },
    });
    if (existingSubject) {
      return {
        status: 400,
        success: false,
        message: "Subject already exists",
      };
    }
    const subject = await prisma.subject.create({
      data: {
        name,
        code,
        description,
        category,
      },
    });
    if (!subject) {
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
      data: subject,
    };
  }
);

export const updateSubject = action(
  updateSubjectSchema,
  async ({ code, name, description, category, id }) => {
    const existingSubject = await prisma.subject.findFirst({
      where: {
        id,
      },
    });
    if (!existingSubject) {
      return {
        status: 400,
        success: false,
        message: "Subject not found",
      };
    }
    const subject = await prisma.subject.update({
      where: {
        id: existingSubject.id,
      },
      data: {
        name,
        code,
        description,
        category,
      },
    });
    if (!subject) {
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
      message: "Subject updated successfully",
      data: subject,
    };
  }
);

export const deleteSubject = action(deleteSubjectSchema, async ({ id }) => {
  const existingSubject = await prisma.subject.findFirst({
    where: {
      id,
    },
  });
  if (!existingSubject) {
    return {
      status: 400,
      success: false,
      message: "No subject with this id",
    };
  }
  await prisma.subject.delete({
    where: {
      id,
    },
  });

  return {
    status: 201,
    success: true,
    message: "Subject delete successfully",
  };
});

export const getSubjects = async () => {
  const subjects = await prisma.subject.findMany();
  if (!subjects) {
    return {
      status: 404,
      success: false,
      message: "Subjects not found",
    };
  }
  return {
    status: 200,
    success: true,
    message: "Subjects fetched successfully",
    data: subjects,
  };
};
