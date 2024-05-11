import prisma from "@/lib/utils";
import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { getEntitySchema } from "./schema";
import db from "@/db";

const subjectRoute = new Hono()
  .basePath("/subjects")
  .get("/", async (c) => {
    const response = {
      status: 200,
      success: true,
      message: "Subjects fetched successfully",
      data: [],
    };
    return c.json(response);
  })
  .get("/:id", zValidator("param", getEntitySchema), async (c) => {
    const { id } = c.req.valid("param");
    const subject = await prisma.subject.findUnique({
      where: {
        id: id,
      },
    });

    if (!subject) {
      return c.json(
        {
          success: false,
          message: "Subject not found",
        },
        404
      );
    }

    return c.json(
      {
        success: true,
        message: "Subjects fetched successfully",
        data: subject,
      },
      200
    );
  });

export default subjectRoute;
