import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { getEntitySchema } from "./schema";
import db from "@/db";
import { eq, inArray } from "drizzle-orm";
import { teacher } from "@/db/schema/teacher";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { profile } from "@/db/schema/profile";
import { user } from "@/db/schema/uaa";
import { school } from "@/db/schema/school";
import { generateId } from "lucia";
import { createTeacherSchema } from "@/db/schema/teacher";

const teacherRoute = new Hono()
  .basePath("/teachers")
  .get("/", async (c) => {
    const teachers = await db
      .select()
      .from(teacher)
      .innerJoin(profile, eq(teacher.id, profile.id))
      .innerJoin(school, eq(profile.schoolId, school.id))
      .innerJoin(user, eq(profile.id, user.id));
    return c.json(teachers);
  })
  .post(
    "/",
    zValidator(
      "json",
      createTeacherSchema.extend({
        email: z.string().email(),
      })
    ),
    async (c) => {
      const body = c.req.valid("json");
      const name = `${body.firstName}  ${body.lastName}`;
      const existingTeacher = await db
        .select()
        .from(teacher)
        .where(eq(user.email, body.email));

      if (existingTeacher.length > 0) {
        return c.json(
          {
            message: "teacher already exists",
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
          schoolId: body.school,
          gender: body.gender,
        })
        .returning();

      const [newTeacher] = await db
        .insert(teacher)
        .values({
          id: newProfile.id,
        })
        .returning();

      return c.json(
        {
          data: { ...newUser, ...newProfile, ...newTeacher },
        },
        201
      );
    }
  )
  .post(
    "/bulk-create",
    zValidator(
      "json",
      z.array(
        createTeacherSchema.extend({
          email: z.string().email(),
        })
      )
    ),
    async (c) => {
      const body = c.req.valid("json");
      const bodyWithIds = body.map((item) => ({
        ...item,
        id: createId(),
      }));
      const newTeacher = await db
        .insert(teacher)
        .values(bodyWithIds)
        .returning();

      return c.json(
        {
          data: newTeacher,
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
        .delete(teacher)
        .where(inArray(teacher.id, body.ids))
        .returning();
      return c.json(
        { message: "teachers deleted successfully", data: data },
        200
      );
    }
  )
  .patch(
    "/:id",
    zValidator("param", getEntitySchema),
    zValidator(
      "json",
      createTeacherSchema.extend({
        email: z.string().email(),
      })
    ),
    async (c) => {
      const id = c.req.param("id");
      const body = c.req.valid("json");
      const [existingTeacher] = await db
        .select()
        .from(teacher)
        .innerJoin(profile, eq(teacher.id, profile.id))
        .innerJoin(school, eq(profile.schoolId, school.id))
        .innerJoin(user, eq(profile.id, user.id))
        .where(eq(user.id, id));
      if (!existingTeacher) {
        return c.json(
          {
            message: "teacher not found",
          },
          404
        );
      }
      const [updatedUser] = await db
        .insert(user)
        .values({
          name: `${body.firstName}  ${body.lastName}`,
          id: id,
        })
        .returning({
          id: user.id,
          name: user.name,
        });
      const [newProfile] = await db
        .insert(profile)
        .values({
          id: updatedUser.id,
          schoolId: body.school,
          gender: body.gender,
        })
        .returning();

      const [newTeacher] = await db
        .insert(teacher)
        .values({
          id: newProfile.id,
        })
        .returning();

      return c.json(
        {
          data: { ...updatedUser, ...newProfile, ...newTeacher },
        },
        201
      );
    }
  )
  .delete("/:id", zValidator("param", getEntitySchema), async (c) => {
    const { id } = c.req.valid("param");
    const existingTeacher = await db.query.teacher.findFirst({
      where: (teacher, { eq }) => eq(teacher.id, id),
    });
    if (!existingTeacher) {
      return c.json(
        {
          message: "teacher not found",
        },
        404
      );
    }
    await db.delete(teacher).where(eq(teacher.id, id));
    return c.json({ message: "teacher deleted successfully" }, 200);
  });

export default teacherRoute;
