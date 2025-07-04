import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { school, teacher, subject, student } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export const statsRouter = createTRPCRouter({
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const [schools] = await db.select({ count: count() }).from(school);
    const [subjects] = await db.select({ count: count() }).from(subject);
    const [teachers] = await db.select({ count: count() }).from(teacher);
    const [students] = await db.select({ count: count() }).from(student);
    return {
      schools: schools.count,
      subjects: subjects.count,
      teachers: teachers.count,
      students: students.count,
    };
  }),
});

export default statsRouter;
