import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    const { comment, postId } = await req.json();
    if (!comment || !postId) {
      return NextResponse.json(
        { error: "comment and postId are required" },
        { status: 400 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        content: comment,
        postId: parseInt(postId),
        authorId: token.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error creating comment" },
      { status: 500 }
    );
  }
}
