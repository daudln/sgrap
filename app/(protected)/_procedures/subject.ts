import { db } from "@/db";
import {
  createSubjectSchema,
  schoolSubject,
  subject,
  updateSubjectSchema,
} from "@/db/schema/subject";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { inferProcedureOutput, TRPCError } from "@trpc/server";

const deleteSubjectInput = z.object({
  id: z.string(),
});

const createSchoolSubjectInput = z.object({
  schoolId: z.string(),
  subjectId: z.string(),
  code: z.string().min(1),
});

const updateSchoolSubjectInput = z.object({
  id: z.string(),
  code: z.string().min(1),
});

const deleteSchoolSubjectInput = z.object({
  id: z.string(),
});

export const subjectRouter = createTRPCRouter({
  // ----- SUBJECTS -----
  create: protectedProcedure
    .input(createSubjectSchema)
    .mutation(async ({ input }) => {
      return db.insert(subject).values(input).returning({
        id: subject.id,
        name: subject.name,
        category: subject.category,
      });
    }),
  bulkCreate: protectedProcedure
    .input(z.array(createSubjectSchema))
    .mutation(async ({ input }) => {
      return db.insert(subject).values(input).returning({
        id: subject.id,
        name: subject.name,
        category: subject.category,
      });
    }),

  update: protectedProcedure
    .input(updateSubjectSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return db.update(subject).set(data).where(eq(subject.id, id)).returning({
        id: subject.id,
        name: subject.name,
        category: subject.category,
      });
    }),

  delete: protectedProcedure
    .input(deleteSubjectInput)
    .mutation(async ({ input }) => {
      return db.delete(subject).where(eq(subject.id, input.id));
    }),

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      return db.delete(subject).where(inArray(subject.id, input.ids));
    }),

  getAll: protectedProcedure.query(() => {
    return db.query.subject.findMany({
      columns: {
        id: true,
        name: true,
        category: true,
      },
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ input }) => {
    return db.query.subject.findFirst({
      columns: {
        id: true,
        name: true,
        category: true,
      },
      where: eq(subject.id, input),
    });
  }),

  // ----- SCHOOL SUBJECTS -----
  assignToSchool: protectedProcedure
    .input(createSchoolSubjectInput)
    .mutation(async ({ input }) => {
      return db
        .insert(schoolSubject)
        .values({
          subject_id: input.subjectId,
          school_id: input.schoolId,
          code: input.code,
        })
        .returning();
    }),

  updateSchoolSubject: protectedProcedure
    .input(updateSchoolSubjectInput)
    .mutation(async ({ input }) => {
      return db
        .update(schoolSubject)
        .set({ code: input.code })
        .where(eq(schoolSubject.id, input.id))
        .returning();
    }),

  deleteSchoolSubject: protectedProcedure
    .input(deleteSchoolSubjectInput)
    .mutation(async ({ input }) => {
      return db
        .delete(schoolSubject)
        .where(eq(schoolSubject.id, input.id))
        .returning();
    }),

  getSchoolSubjects: protectedProcedure
    .input(z.object({ schoolId: z.string() }))
    .query(async ({ input }) => {
      return db.query.schoolSubject.findMany({
        where: eq(schoolSubject.school_id, input.schoolId),
        with: {
          subject: true,
        },
      });
    }),
});

export default subjectRouter;

export type SubjectOutput = inferProcedureOutput<
  (typeof subjectRouter)["create"]
>[0];

export type SubjectRouter = typeof subjectRouter;
