import prisma from "@/lib/prisma";
import React from "react";
import BlogCard from "./BlogCard";

export const experimental_ppr = true;
const Blogs = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="px-4 lg:px-20 2xl:container 2xl:w-full 2xl:mx-auto  mt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">
        {posts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
