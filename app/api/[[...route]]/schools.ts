import { zValidator } from "@hono/zod-validator";
import prisma from "@/lib/utils";
import { Hono } from "hono";
import { getEntitySchema } from "./schema";
import db from "@/db";
import { school } from "@/db/schema/school";

const schoolsRoute = new Hono()
  .basePath("/schools")
  .get("/", async (c) => {
    const schools = await db.select().from(school);
    const response = {
      status: 200,
      success: true,
      message: "Schools fetched successfully",
      data: schools,
    };
    return c.json(response);
  })
  .get("/:id", zValidator("param", getEntitySchema), async (c) => {
    const { id } = c.req.valid("param");
    const school = await prisma.school.findUnique({
      where: {
        id: id,
      },
      select: {
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
        success: true,
        message: "School fetched successfully",
        data: school,
      },
      200
    );
  });
export default schoolsRoute;
