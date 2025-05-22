import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const existingLike = await prisma.like.findFirst({
      where: {
        commentId: parseInt(id),
        authorId: token.id,
      },
    });
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json(existingLike, {
        status: 200,
        statusText: "unliked",
      });
    } else {
      const newLike = await prisma.like.create({
        data: {
          commentId: parseInt(id),
          authorId: token.id,
        },
      });
      return NextResponse.json(newLike, { status: 201, statusText: "liked" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creating like" }, { status: 500 });
  }
}
