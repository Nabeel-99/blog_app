import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isProduction = process.env.NODE_ENV === "production";
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: isProduction,
  });
  if (!token || token.role !== "ADMIN") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const existingComment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!existingComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    await prisma.reply.deleteMany({
      where: {
        commentId: parseInt(id),
      },
    });
    await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(existingComment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error deleting comment" },
      { status: 500 }
    );
  }
}
