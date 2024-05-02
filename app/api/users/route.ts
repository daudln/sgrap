import prisma from "@/lib/utils";
import { getUsersParamsSchema } from "@/schema/user";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { nextUrl } = request;
  const params = Object.fromEntries(nextUrl.searchParams);

  const validation = getUsersParamsSchema.safeParse(params);

  if (!validation.success) {
    return new Response(JSON.stringify(validation.error.errors), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const users = await prisma.user.findMany({
    where: {
      type: validation.data.type,
    },
    include: {
      Profile: {
        include: {
          Student: true,
          Teacher: true,
          school: true,
        },
      },
    },
  });

  console.log(users);
  const response = {
    status: 200,
    success: true,
    message: "Profiles fetched successfully",
    data: users,
  };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
