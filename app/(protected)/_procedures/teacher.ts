import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { teacher, teachersToSubjects, teachersToSchools } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { permissionMiddleware } from "@/lib/auth";

export const teacherRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    const teachersWithDetails = await db.query.teacher.findMany({
      columns: {
        id: true,
        specialization: true,
      },
      with: {
        profile: {
          columns: {
            id: true,
            gender: true,
            dateOfBirth: true,
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
    });

    const teachers = teachersWithDetails.map((teacher) => {
      return {
        id: teacher.id,
        name: teacher.profile.user.name,
        email: teacher.profile.user.email,
        gender: teacher.profile.gender,
        image: teacher.profile.user.image,
        dateOfBirth: teacher.profile.dateOfBirth,
        phoneNumber: teacher.profile.phoneNumber,
        userType: teacher.profile.user.userType,
        specialization: teacher.specialization,
      };
    });
    return teachers;
  }),

  // Get subjects a teacher teaches
  getSubjects: protectedProcedure
    .input(
      z.object({
        teacherId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const result = await db.query.teachersToSubjects.findMany({
        where: eq(teachersToSubjects.teacher_id, input.teacherId),
        with: {
          schoolSubject: {
            with: {
              subject: {
                columns: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
      });

      const subjects = result.map((subject) => {
        return {
          id: subject.schoolSubject.subject.id,
          name: subject.schoolSubject.subject.name,
          category: subject.schoolSubject.subject.category,
        };
      });

      return subjects;
    }),

  // Get schools a teacher belongs to
  getSchools: protectedProcedure
    .input(z.object({ teacherId: z.string() }))
    .query(async ({ input }) => {
      const schools = await db.query.teachersToSchools.findMany({
        where: eq(teachersToSchools.teacher_id, input.teacherId),
        with: {
          school: {
            columns: {
              id: true,
              name: true,
              address: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      const formatedSchools = schools.map((school) => {
        return {
          id: school.school.id,
          name: school.school.name,
          address: school.school.address,
          createdAt: school.school.createdAt,
          updatedAt: school.school.updatedAt,
        };
      });

      return formatedSchools;
    }),

  // Add a new teacher
  create: protectedProcedure
    .use(permissionMiddleware(["can_create_teacher"]))
    .input(
      z.object({
        id: z.string(),
        specialization: z.string().optional(),
        schools: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      // Create teacher row
      await db.insert(teacher).values({
        id: input.id,
        specialization: input.specialization,
      });

      // Link to schools
      await db.insert(teachersToSchools).values(
        input.schools.map((schoolId) => ({
          teacher_id: input.id,
          school_id: schoolId,
        }))
      );

      return { success: true };
    }),

  // Assign subject to teacher
  assignSubject: protectedProcedure
    .input(
      z.object({
        teacherId: z.string(),
        schoolSubjectId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // You might want to validate the teacher belongs to the school

      await db.insert(teachersToSubjects).values({
        teacher_id: input.teacherId,
        school_subject_id: input.schoolSubjectId,
      });

      return { success: true };
    }),
});
