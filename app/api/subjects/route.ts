import prisma from "@/lib/utils";

export async function GET() {
  const subjects = await prisma.subject.findMany();

  const response = {
    status: 200,
    success: true,
    message: "Subjects fetched successfully",
    data: subjects,
  };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
