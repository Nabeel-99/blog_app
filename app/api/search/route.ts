import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query || query.trim() === "") {
    return NextResponse.json([]);
  }
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      title: true,
      category: true,
      coverImage: true,
      content: true,
      comments: true,
      slug: true,
      views: true,
      createdAt: true,
      authorId: true,
    },
  });
  return NextResponse.json(posts);
}
