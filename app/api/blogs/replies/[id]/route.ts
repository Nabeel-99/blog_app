import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "ADMIN") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const existingReply = await prisma.reply.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!existingReply) {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }
    await prisma.reply.deleteMany({
      where: {
        parentId: parseInt(id),
      },
    });
    await prisma.reply.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(existingReply, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error deleting reply" },
      { status: 500 }
    );
  }
}
