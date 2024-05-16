import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getEntitySchema } from "./schema";
import db from "@/db";
import { school } from "@/db/schema/school";

const schoolsRoute = new Hono()
  .basePath("/schools")
  .get("/", async (c) => {
    const schools = await db
      .select({ id: school.id, name: school.name, motto: school.motto })
      .from(school);
    const response = {
      status: 200,
      data: schools,
    };
    console.log(schools);
    return c.json(response);
  })
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
        success: true,
        message: "School fetched successfully",
        data: school,
      },
      200
    );
  });
export default schoolsRoute;
