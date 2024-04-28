import prisma from "@/lib/utils";

export async function GET() {
  const classes = await prisma.class.findMany();
  const response = {
    status: 200,
    success: true,
    message: "Classes fetched successfully",
    data: classes,
  };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
