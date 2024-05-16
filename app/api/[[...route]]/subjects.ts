import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { getEntitySchema } from "./schema";
import db from "@/db";
import { eq, inArray } from "drizzle-orm";
import { createSubjectSchema, subject } from "@/db/schema/subject";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const subjectRoute = new Hono()
  .basePath("/subjects")
  .get("/", async (c) => {
    const subjects = await db.select().from(subject);
    return c.json({ data: subjects });
  })
  .get("/:id", zValidator("param", getEntitySchema), async (c) => {
    const { id } = c.req.valid("param");
    const subject = await db.query.subject.findFirst({
      where: (subject, { eq }) => eq(subject.id, id),
    });

    if (!subject) {
      return c.json(
        {
          message: "Subject not found",
        },
        404
      );
    }

    return c.json(
      {
        data: subject,
      },
      200
    );
  })
  .post(
    "/",
    zValidator("json", createSubjectSchema.omit({ id: true })),
    async (c) => {
      const body = c.req.valid("json");
      const existingSubject = await db.query.subject.findFirst({
        where: (subject, { eq, or }) =>
          or(eq(subject.name, body.name), eq(subject.code, body.code)),
      });

      if (existingSubject) {
        return c.json(
          {
            message: "Subject already exists",
          },
          404
        );
      }

      const [newSubject] = await db
        .insert(subject)
        .values({
          id: createId(),
          ...body,
        })
        .returning();

      return c.json(
        {
          data: newSubject,
        },
        201
      );
    }
  )
  .post(
    "/bulk-create",
    zValidator("json", z.array(createSubjectSchema.omit({ id: true }))),
    async (c) => {
      const body = c.req.valid("json");
      const bodyWithIds = body.map((item) => ({
        ...item,
        id: createId(),
      }));
      const newSubject = await db
        .insert(subject)
        .values(bodyWithIds)
        .returning();

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
        .delete(subject)
        .where(inArray(subject.id, body.ids))
        .returning();
      return c.json(
        { message: "Subjects deleted successfully", data: data },
        200
      );
    }
  )
  .patch("/:id", zValidator("json", createSubjectSchema), async (c) => {
    const body = c.req.valid("json");
    const [existingSubject] = await db
      .select()
      .from(subject)
      .where(eq(subject.id, body.id));
    if (!existingSubject) {
      return c.json(
        {
          message: "Subject not found",
        },
        404
      );
    }
    const [updatedSubject] = await db
      .update(subject)
      .set(body)
      .where(eq(subject.id, body.id))
      .returning();
    return c.json({ data: updatedSubject });
  })
  .delete("/:id", zValidator("param", getEntitySchema), async (c) => {
    const { id } = c.req.valid("param");
    const existingSubject = await db.query.subject.findFirst({
      where: (subject, { eq }) => eq(subject.id, id),
    });
    if (!existingSubject) {
      return c.json(
        {
          message: "Subject not found",
        },
        404
      );
    }
    await db.delete(subject).where(eq(subject.id, id));
    return c.json({ message: "Subject deleted successfully" }, 200);
  });

export default subjectRoute;
