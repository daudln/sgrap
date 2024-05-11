import prisma from "@/lib/utils";
import { getAuthUser } from "@hono/auth-js";
import { Hono } from "hono";

const accountRoute = new Hono().basePath("/account").get("/", async (c) => {
  const auth = await getAuthUser(c);
  if (!auth?.token?.sub)
    return c.json(
      {
        status: 401,
        success: false,
        message: "Unauthorized",
      },
      401
    );
  const account = await prisma.user.findUnique({
    where: {
      id: auth.token.sub,
    },
    select: {
      id: true,
      name: true,
      email: true,
      type: true,
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
