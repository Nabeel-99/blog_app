import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { title, description, category, coverImage, content, slug } = body;
  if (!title || !description || !category || !coverImage || !content || !slug) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const post = await prisma.post.create({
    data: {
      title,
      description,
      category,
      coverImage,
      content,
      slug,
      authorId: session.user.id,
    },
  });
}
