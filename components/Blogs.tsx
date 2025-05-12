import prisma from "@/lib/prisma";
import React from "react";
import BlogCard from "./BlogCard";

export const experimental_ppr = true;
const Blogs = async () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
      {posts.map((post, index) => (
        <BlogCard key={index} post={post} />
      ))}
    </div>
  );
};

export default Blogs;
