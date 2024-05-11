import prisma from "@/lib/utils";

export async function GET() {
  const profiles = await prisma.teacher.findMany({
    where: {
      profile: {
        type: "TEACHER",
      },
    },
    select: {
      profile: {
        select: {
          phoneNumber: true,
          userId: true,
          schoolId: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          school: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  const response = {
    status: 200,
    success: true,
    message: "Profiles fetched successfully",
    data: profiles,
  };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
