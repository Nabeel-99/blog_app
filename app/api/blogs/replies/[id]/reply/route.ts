import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isProduction = process.env.NODE_ENV === "production";
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: isProduction,
  });
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const { userReply } = await req.json();
    const parentReply = await prisma.reply.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!parentReply) {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }
    const replyToReply = await prisma.reply.create({
      data: {
        content: userReply,
        commentId: parentReply.commentId,
        parentId: parentReply.id,
        authorId: token.id,
      },
    });
    return NextResponse.json(replyToReply, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error creating reply" },
      { status: 500 }
    );
  }
}
