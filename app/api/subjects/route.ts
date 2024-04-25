import prisma from "@/lib/utils";
import { CreateSubjectInput, createSubjectSchema } from "@/schema/subject";
import { NextRequest } from "next/server";

export async function GET() {
  const subjects = await prisma.subject.findMany();
  const response = { subjects: subjects };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: NextRequest) {
  const body: CreateSubjectInput = await request.json();

  const validation = createSubjectSchema.safeParse(body);
  if (!validation.success) {
    return new Response(JSON.stringify({ error: validation.error.errors }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const { name, code, description } = body;
  const existingSubject = await prisma.subject.findMany({
    where: {
      OR: [{ name: name }, { code: code }],
    },
  });
  if (existingSubject.length > 0) {
    return new Response(
      JSON.stringify({ message: "Subject with these details already exists" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  const subject = await prisma.subject.create({
    data: {
      name,
      code,
      description,
    },
  });
  return new Response(JSON.stringify({ subject }), { status: 201 });
}
