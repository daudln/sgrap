"use server";

import prisma from "@/lib/utils";
import { createSubjectSchema, deleteSubjectSchema } from "@/schema/subject";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

export const action = createSafeActionClient();

export const createSubject = action(
  createSubjectSchema,
  async ({ code, name, description }) => {
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

export async function updateSubject() {
  console.log("updateSubject");
}

export const deleteSubject = action(deleteSubjectSchema, async ({ uuid }) => {
  console.log(uuid);
  const existingSubject = await prisma.subject.findFirst({
    where: {
      uuid,
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
      uuid,
    },
  });

  revalidatePath("/home/subjects");
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

export async function getSubject() {
  console.log("getSubject");
}
