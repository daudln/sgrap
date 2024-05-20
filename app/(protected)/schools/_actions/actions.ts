"use server";

import { eq } from "drizzle-orm";

import db from "@/db";
import { deleteSchoolSchema } from "@/schema/school";
import { createSafeActionClient } from "next-safe-action";
import { createSchoolSchema, school } from "@/db/schema/school";

export const action = createSafeActionClient();

export const updateSchool = action(
  createSchoolSchema,
  async ({ name, motto, id }) => {
    const existingSchool = await db.query.school.findFirst({
      where: (table, { eq }) => eq(table.id, id!),
    });

    if (!existingSchool) {
      return {
        status: 400,
        success: false,
        message: "school not found",
      };
    }
    const [updatedSchool] = await db
      .update(school)
      .set({
        name,
        motto,
      })
      .where(eq(school.id, id!))
      .returning();
    console.log(updatedSchool);
    if (!updatedSchool) {
      return {
        status: 500,
        success: false,
        message: "school not created",
      };
    }
    return {
      status: 200,
      success: true,
      message: "school updated successfully",
      data: updatedSchool,
    };
  }
);

export const deleteSchool = action(deleteSchoolSchema, async ({ id }) => {
  const existingSchool = await db.query.school.findFirst({
    where: (table, { eq }) => eq(table.id, id!),
    with: {
      profiles: true,
    },
  });
  console.log(existingSchool?.profiles, "Profiles");
  if (!existingSchool) {
    return {
      status: 400,
      success: false,
      message: "school not found",
    };
  }

  // if (existingSchool.profiles.length > 0 || existingSchool.Teacher.length > 0) {
  //   return {
  //     status: 400,
  //     success: false,
  //     message: "This school cannot be deleted as it has students or teachers.",
  //   };
  // }

  const [deletedSchool] = await db
    .delete(school)
    .where(eq(school.id, id!))
    .returning();
  if (!deletedSchool) {
    return {
      status: 500,
      success: false,
      message: "school not created",
    };
  }
  // if (existingSchool.Student.length > 0 || existingSchool.Teacher.length > 0) {
  //   return {
  //     status: 400,
  //     success: false,
  //     message: "This school cannot be deleted as it has students or teachers.",
  //   };
  // }
  // await prisma.school.delete({
  //   where: {
  //     uuid,
  //   },
  // });
  return {
    status: 201,
    success: true,
    message: "school delete successfully",
  };
});
