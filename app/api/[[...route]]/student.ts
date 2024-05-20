import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { getEntitySchema } from "./schema";
import db from "@/db";
import { and, eq, inArray } from "drizzle-orm";
import { createStudentSchema, student } from "@/db/schema/student";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { profile } from "@/db/schema/profile";
import { user } from "@/db/schema/uaa";
import { school } from "@/db/schema/school";
import { generateId } from "lucia";

const studentRoute = new Hono()
  .basePath("/students")
  .get("/", async (c) => {
    const students = await db
      .select()
      .from(student)
      .innerJoin(profile, eq(student.id, profile.id))
      .innerJoin(school, eq(profile.schoolId, school.id))
      .innerJoin(user, eq(profile.id, user.id));
    return c.json(students);
  })
  .post("/", zValidator("json", createStudentSchema), async (c) => {
    const body = c.req.valid("json");
    const name = `${body.firstName}  ${body.lastName}`;
    const existingStudent = await db
      .select()
      .from(student)
      .innerJoin(profile, eq(student.id, profile.id))
      .innerJoin(school, eq(profile.schoolId, school.id))
      .innerJoin(user, eq(profile.id, user.id))
      .where(
        and(
          eq(school.id, body.schoolId),
          eq(student.classLevel, body.classLevel),
          eq(user.name, name)
        )
      );

    if (existingStudent.length > 0) {
      return c.json(
        {
          message: "Student already exists",
        },
        404
      );
    }

    const userId = generateId(15);

    const [newUser] = await db
      .insert(user)
      .values({
        name,
        id: userId,
      })
      .returning({
        id: user.id,
        name: user.name,
      });
    const [newProfile] = await db
      .insert(profile)
      .values({
        id: newUser.id,
        schoolId: body.schoolId,
        gender: body.gender,
      })
      .returning();

    const [newStudent] = await db
      .insert(student)
      .values({
        id: newProfile.id,
        classLevel: body.classLevel,
      })
      .returning();

    return c.json(
      {
        data: { ...newUser, ...newProfile, ...newStudent },
      },
      201
    );
  })
  .post(
    "/bulk-create",
    zValidator("json", z.array(createStudentSchema)),
    async (c) => {
      const body = c.req.valid("json");
      const bodyWithIds = body.map((item) => ({
        ...item,
        id: createId(),
      }));
      const newstudent = await db
        .insert(student)
        .values(bodyWithIds)
        .returning();

      return c.json(
        {
          data: newstudent,
        },
        201
      );
    }
  )
  .post(
    "/bulk-delete",
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const body = c.req.valid("json");
      const data = await db
        .delete(student)
        .where(inArray(student.id, body.ids))
        .returning();
      return c.json(
        { message: "students deleted successfully", data: data },
        200
      );
    }
  )
  .patch(
    "/:id",
    zValidator("param", getEntitySchema),
    zValidator("json", createStudentSchema),
    async (c) => {
      const id = c.req.param("id");
      const body = c.req.valid("json");
      const [existingStudent] = await db
        .select()
        .from(student)
        .innerJoin(profile, eq(student.id, profile.id))
        .innerJoin(school, eq(profile.schoolId, school.id))
        .innerJoin(user, eq(profile.id, user.id))
        .where(eq(user.id, id));
      if (!existingStudent) {
        return c.json(
          {
            message: "Student not found",
          },
          404
        );
      }
      const [updatedUser] = await db
        .update(user)
        .set({
          id: existingStudent.user.id,
          name: `${body.firstName} ${body.middleName} ${body.lastName}`,
        })
        .where(eq(user.id, existingStudent.user.id))
        .returning({
          id: user.id,
          name: user.name,
        });
      const [updatedProfile] = await db
        .update(profile)
        .set({
          id: updatedUser.id,
          schoolId: body.schoolId,
          gender: body.gender,
        })
        .where(eq(profile.id, existingStudent.profile.id))
        .returning();

      const [updatedStudent] = await db
        .update(student)
        .set({
          id: updatedProfile.id,
          classLevel: body.classLevel,
        })
        .where(eq(student.id, updatedProfile.id))
        .returning();

      return c.json(
        {
          data: { ...updatedUser, ...updatedProfile, ...updatedStudent },
        },
        201
      );
    }
  )
  .delete("/:id", zValidator("param", getEntitySchema), async (c) => {
    const { id } = c.req.valid("param");
    const existingstudent = await db.query.student.findFirst({
      where: (student, { eq }) => eq(student.id, id),
    });
    if (!existingstudent) {
      return c.json(
        {
          message: "student not found",
        },
        404
      );
    }
    await db.delete(student).where(eq(student.id, id));
    return c.json({ message: "student deleted successfully" }, 200);
  });

export default studentRoute;
