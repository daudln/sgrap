import prisma from "@/lib/utils";

export async function GET() {
  const profiles = await prisma.teacher.findMany({
    select: {
      profile: {
        select: {
          type: true,
          phoneNumber: true,
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
  console.log(profiles);
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
