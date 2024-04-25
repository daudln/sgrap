import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  return new Response(JSON.stringify({ hello: id }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PATCH() {
  return new Response(JSON.stringify({ hello: "world" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE() {
  return new Response(JSON.stringify({ hello: "world" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
