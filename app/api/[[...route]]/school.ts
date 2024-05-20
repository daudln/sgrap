import { eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getEntitySchema } from "./schema";
import db from "@/db";
import { createSchoolSchema, school } from "@/db/schema/school";
import { z } from "zod";

const schoolsRoute = new Hono()
  .basePath("/schools")
  .get("/", async (c) => {
    const schools = await db
      .select({ id: school.id, name: school.name, motto: school.motto })
      .from(school);

    return c.json(
      {
        data: schools,
      },
      200
    );
  })
  .post("/", zValidator("json", createSchoolSchema), async (c) => {
    const body = c.req.valid("json");
    const newSchool = await db.insert(school).values(body).returning();
    return c.json(
      {
        data: newSchool,
      },
      201
    );
  })
  .post(
    "/bulk-create",
    zValidator("json", z.array(createSchoolSchema.omit({ id: true }))),
    async (c) => {
      const body = c.req.valid("json");
      const newSubject = await db.insert(school).values(body).returning();

      return c.json(
        {
          data: newSubject,
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
        .delete(school)
        .where(inArray(school.id, body.ids))
        .returning();
      return c.json(
        { message: "Schools deleted successfully", data: data },
        200
      );
    }
  )
  .get("/:id", zValidator("param", getEntitySchema), async (c) => {
    const { id } = c.req.valid("param");
    const school = await db.query.school.findFirst({
      where: (school, { eq }) => eq(school.id, id),
      columns: {
        id: true,
        name: true,
        motto: true,
      },
    });

    if (!school) {
      return c.json(
        {
          success: false,
          message: "School not found",
        },
        404
      );
    }

    return c.json(
      {
        data: school,
      },
      200
    );
  })
  .patch(
    "/:id",
    zValidator("param", getEntitySchema),
    zValidator("json", createSchoolSchema),
    async (c) => {
      const body = c.req.valid("json");
      const { id } = c.req.valid("param");
      const [existingSchool] = await db
        .select()
        .from(school)
        .where(eq(school.id, id));
      if (!existingSchool) {
        return c.json(
          {
            message: "School not found",
          },
          404
        );
      }
      const [updatedSchool] = await db
        .update(school)
        .set(body)
        .where(eq(school.id, id))
        .returning();
      return c.json(
        {
          data: updatedSchool,
        },
        200
      );
    }
  )
  .delete("/:id", zValidator("param", getEntitySchema), async (c) => {
    const { id } = c.req.valid("param");
    const existingSchool = await db.query.school.findFirst({
      where: (school, { eq }) => eq(school.id, id),
      columns: {
        id: true,
        name: true,
        motto: true,
      },
    });
    if (!existingSchool) {
      return c.json(
        {
          message: "School not found",
        },
        404
      );
    }
    await db.delete(school).where(eq(school.id, id));
    return c.json(
      {
        success: true,
      },
      200
    );
  });

export default schoolsRoute;
