import prisma from "@/lib/utils";

export async function GET() {
  const schools = await prisma.school.findMany();
  const response = {
    status: 200,
    success: true,
    message: "Schools fetched successfully",
    data: schools,
  };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
