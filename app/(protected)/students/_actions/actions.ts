// "use server";

// import { eq } from "drizzle-orm";

// import db from "@/db";
// import { deleteSchoolSchema } from "@/schema/school";
// import { createSafeActionClient } from "next-safe-action";
// import { createStudentSchema, student } from "@/db/schema/student";

// export const action = createSafeActionClient();

// export const createStudent = action(
//     createStudentSchema,
//   async (formValues) => {
//     const existingSubject = await db.query.subject.findFirst({
//       where: (table, { eq }) => eq(table.id, id!),
//     });

//     if (!existingSubject) {
//       return {
//         status: 400,
//         success: false,
//         message: "Subject not found",
//       };
//     }
//     const [updatedSubject] = await db
//       .update(subject)
//       .set({
//         name,
//         category,
//         description,
//         code,
//       })
//       .where(eq(subject.id, id!))
//       .returning();
//     console.log(updatedSubject);
//     if (!updatedSubject) {
//       return {
//         status: 500,
//         success: false,
//         message: "school not created",
//       };
//     }
//     return {
//       status: 200,
//       success: true,
//       message: "school updated successfully",
//       data: updatedSubject,
//     };
//   }
// );

// export const deleteSchool = action(deleteSchoolSchema, async ({ id }) => {
//   const existingSubject = await db.query.subject.findFirst({
//     where: (table, { eq }) => eq(table.id, id!),
//   });
//   if (!existingSubject) {
//     return {
//       status: 400,
//       success: false,
//       message: "school not found",
//     };
//   }

//   const [deletedSubject] = await db
//     .delete(subject)
//     .where(eq(subject.id, id!))
//     .returning();
//   if (!deletedSubject) {
//     return {
//       status: 500,
//       success: false,
//       message: "Subject not created",
//     };
//   }

//   return {
//     status: 201,
//     success: true,
//     message: "Subject delete successfully",
//   };
// });
