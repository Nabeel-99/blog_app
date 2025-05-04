import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  // const normalizedQuery = query?.toLowerCase();
  // const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);
  if (!query || query.trim() === "") {
    return NextResponse.json([]);
  }
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query.toLowerCase(), mode: "insensitive" } },
        {
          categories: {
            some: {
              name: { contains: query.toLowerCase(), mode: "insensitive" },
            },
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      categories: true,
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
