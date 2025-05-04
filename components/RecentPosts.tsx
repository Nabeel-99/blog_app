import React from "react";
import BlogCard from "./BlogCard";
import prisma from "@/lib/prisma";

export const experimental_ppr = true;
const RecentPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return (
    <div className="grid max-sm:gap-10 md:gap-16 md:grid-cols-2 xl:grid-cols-3 mt-10">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default RecentPosts;
