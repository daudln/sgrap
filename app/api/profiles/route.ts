import prisma from "@/lib/utils";

export async function GET() {
  const profiles = await prisma.profile.findMany({
    include: {
      user: true,
      Student: true,
      Teacher: true,
      school: true,
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
