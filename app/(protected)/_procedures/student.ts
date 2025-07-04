import { db } from "@/db";
import { student, user } from "@/db/schema";
import { genderEnum, profile } from "@/db/schema/profile";
import { ClassLevelEnum } from "@/db/schema/student";
import { createStudentSchema, updateStudentSchema } from "@/schema/student";
import {
  createTRPCRouter,
  paginatedProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { inferProcedureOutput, TRPCError } from "@trpc/server";
import { generateId } from "better-auth";
import { and, count, eq, inArray, like, or } from "drizzle-orm";
import z from "zod";

const getStudentsInputSchema = z.object({
  schoolId: z.string().optional(),
  classLevel: z.enum(ClassLevelEnum.enumValues).optional(), // Use your Drizzle enum
  gender: z.enum(genderEnum.enumValues).optional(), // Use your Drizzle enum
  searchQuery: z.string().optional(), // For searching by name or email
  studentIds: z.array(z.string()).optional(), // To fetch specific students by ID
  limit: z.number().int().min(1).max(100).default(20), // For pagination
  offset: z.number().int().min(0).default(0), // For pagination
});

export const studentRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(getStudentsInputSchema)
    .query(async ({ ctx, input }) => {
      const {
        schoolId,
        classLevel,
        gender,
        searchQuery,
        studentIds,
        limit,
        offset,
      } = input;

      const whereConditions = [];

      // Filter by schoolId
      if (schoolId) {
        whereConditions.push(eq(student.schoolId, schoolId));
      }

      // Filter by classLevel
      if (classLevel) {
        whereConditions.push(eq(student.classLevel, classLevel));
      }

      // Filter by gender
      if (gender) {
        whereConditions.push(eq(profile.gender, gender));
      }

      if (studentIds && studentIds.length > 0) {
        whereConditions.push(inArray(student.id, studentIds));
      }

      if (searchQuery) {
        const searchPattern = `%${searchQuery.toLowerCase()}%`;
        whereConditions.push(
          or(
            like(user.name, searchPattern), // Case-insensitive search on last name
            like(user.email, searchPattern) // Case-insensitive search on user email
          )
        );
      }

      const studentData = await db.query.student.findMany({
        with: {
          profile: {
            with: {
              user: true, // Join user table via profile
            },
            columns: {
              id: true, // Assuming profile.id is student.id
              dateOfBirth: true,
              phoneNumber: true,
              gender: true, // Need this if filtering by profile.gender
            },
          },
          school: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
        where: and(...whereConditions),
        limit: limit,
        offset: offset,
      });

      const data = studentData.map((student) => ({
        id: student.id,
        name: student.profile.user.name,
        email: student.profile.user.email,
        school: {
          id: student.school.id,
          name: student.school.name,
        },
        gender: student.profile.gender,
        classLevel: student.classLevel,
        dateOfBirth: student.profile.dateOfBirth,
        phoneNumber: student.profile.phoneNumber,
        image: student.profile.user.image,
        userType: student.profile.user.userType,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      }));

      return data;
    }),

  getPaginated: paginatedProcedure.query(async ({ ctx }) => {
    const { limit, offset } = ctx.pagination;

    const [studentData, total] = await Promise.all([
      db.query.student.findMany({
        limit,
        offset,
        columns: {
          id: true,
          classLevel: true,
          enrollmentDate: true,
          createdAt: true,
          updatedAt: true,
        },
        with: {
          school: { columns: { name: true, id: true } },
          profile: {
            columns: {
              id: true,
              dateOfBirth: true,
              gender: true,
              phoneNumber: true,
            },
            with: {
              user: {
                columns: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                  userType: true,
                },
              },
            },
          },
        },
      }),
      db.select({ count: count(student.id) }).from(student),
    ]);

    const data = studentData.map((student) => ({
      id: student.id,
      name: student.profile.user.name,
      email: student.profile.user.email,
      school: {
        id: student.school.id,
        name: student.school.name,
      },
      gender: student.profile.gender,
      classLevel: student.classLevel,
      dateOfBirth: student.profile.dateOfBirth,
      phoneNumber: student.profile.phoneNumber,
      image: student.profile.user.image,
      userType: student.profile.user.userType,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }));

    return {
      data,
      pagination: {
        total: total[0].count,
        page: ctx.pagination.page,
        pageSize: ctx.pagination.pageSize,
        totalPages: Math.ceil(total[0].count / ctx.pagination.pageSize),
        hasMore: offset + limit < total[0].count,
      },
    };
  }),

  // 2. getById: Get a specific student by their profile/user ID
  //    This is likely what your original `getAll` was trying to achieve for a single user.
  getById: protectedProcedure
    .input(z.object({ studentProfileId: z.string() })) // Input validation for the ID
    .query(async ({ ctx, input }) => {
      // You might want to add authorization here:
      // - If the user is an admin/teacher, they can view any student.
      // - If the user is a student, they can only view their own profile.
      //   (i.e., `eq(input.studentProfileId, ctx.userId!)`)
      // For now, let's assume it's for authorized users to view any student by ID.

      const studentDetails = await db.query.student.findFirst({
        where: eq(student.id, input.studentProfileId),
        with: {
          profile: {
            with: {
              user: true,
            },
          },
          school: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!studentDetails) {
        throw new Error("Student not found"); // Or throw a TRPCError
      }

      return studentDetails;
    }),

  // 3. getMyStudentProfile: Get the currently logged-in user's student profile (if they are a student)
  //    This is a more specific version of your original intent for `getAll`.
  getMyStudentProfile: protectedProcedure.query(async ({ ctx }) => {
    // Ensure the logged-in user is actually a student (based on their user.role or existence in student table)
    // You could add a check: if (ctx.user.role !== "STUDENT") throw new TRPCError(...);

    const myStudentProfile = await db.query.student.findFirst({
      where: eq(student.id, ctx.userId!),
      with: {
        profile: {
          columns: {
            id: true,
            dateOfBirth: true,
            gender: true,
            phoneNumber: true,
          },
          with: {
            user: {
              columns: {
                name: true,
                email: true,
                image: true,
                userType: true,
              },
            },
          },
        },
        school: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!myStudentProfile) {
      // This could happen if the logged-in user is not a student
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "My student profile not found",
      });
    }

    return myStudentProfile;
  }),

  create: protectedProcedure
    .input(createStudentSchema)
    .mutation(async ({ ctx, input }) => {
      await db.transaction(async (tx) => {
        const [newUser] = await tx
          .insert(user)
          .values({
            id: generateId(),
            name: input.name,
            email: input.email,
            userType: "STUDENT",
          })
          .returning();

        const [newProfile] = await tx
          .insert(profile)
          .values({
            id: newUser.id,
            dateOfBirth: input.dateOfBirth,
            gender: input.gender,
            phoneNumber: input.phoneNumber,
          })
          .returning();
        const [newStudent] = await tx
          .insert(student)
          .values({
            id: newProfile.id,
            classLevel: input.classLevel,
            schoolId: input.schoolId,
          })
          .returning();
        return newStudent;
      });
    }),

  update: protectedProcedure
    .input(updateStudentSchema)
    .mutation(async ({ ctx, input }) => {
      await db.transaction(async (tx) => {
        const [updatedProfile] = await tx
          .update(profile)
          .set({
            dateOfBirth: input.dateOfBirth,
            gender: input.gender,
            phoneNumber: input.phoneNumber,
          })
          .where(eq(profile.id, input.id))
          .returning();
        const [updatedUser] = await tx
          .update(user)
          .set({
            name: input.name,
            email: input.email,
          })
          .where(eq(user.id, input.id))
          .returning();
        const [updatedStudent] = await tx
          .update(student)
          .set({
            classLevel: input.classLevel,
            schoolId: input.schoolId,
          })
          .where(eq(student.id, input.id))
          .returning();
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.delete(student).where(eq(student.id, input.id));
    }),
});

export default studentRouter;

export type StudentOutput = inferProcedureOutput<
  (typeof studentRouter)["getAll"]
>[0];
