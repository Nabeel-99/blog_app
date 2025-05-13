import prisma from "@/lib/prisma";
import React from "react";
import BlogCard from "./BlogCard";

const SimilarBlogs = async ({ slug }: { slug: string }) => {
  const currentPost = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      categories: true,
    },
  });
  if (!currentPost) return null;

  const categoryIds = currentPost.categories.map((category) => category.id);
  let similarPosts = [];
  if (categoryIds.length > 0) {
    similarPosts = await prisma.post.findMany({
      where: {
        id: {
          not: currentPost.id,
        },
        categories: {
          some: {
            id: {
              in: categoryIds,
            },
          },
        },
      },
      include: {
        categories: true,
      },
    });
  } else {
    similarPosts = await prisma.post.findMany({
      where: {
        id: {
          not: currentPost.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        categories: true,
      },
    });
  }

  return (
    <div className="grid max-sm:gap-10 md:gap-16 md:grid-cols-2 xl:grid-cols-3 mt-10">
      {similarPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default SimilarBlogs;
