import db from "@/db";
import { validateRequest } from "@/auth";
import { Hono } from "hono";

const accountRoute = new Hono().basePath("/account").get("/", async (c) => {
  const { user } = await validateRequest();
  if (!user?.id)
    return c.json(
      {
        status: 401,
        success: false,
        message: "Unauthorized",
      },
      401
    );
  const id = user.id;
  const account = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, id),
    columns: {
      id: true,
      name: true,
      email: true,
    },
  });
  return c.json({
    status: 200,
    success: true,
    message: "Account fetched successfully",
    data: account,
  });
});

export default accountRoute;
