import prisma from "@/lib/utils";

export async function GET() {
  const profiles = await prisma.user.findMany({
    include: {
      Profile: true,
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
