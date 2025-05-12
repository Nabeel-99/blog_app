import prisma from "@/lib/prisma";
import React from "react";
import UserBlogs from "./UserBlogs";

export const experimental_ppr = true;
const UserBlogsList = async () => {
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
    <>
      <p>
        All Blogs <span className="font-bold">{posts.length}</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {posts.map((post) => (
          <UserBlogs key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default UserBlogsList;
