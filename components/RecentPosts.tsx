import React from "react";
import BlogCard from "./BlogCard";
import prisma from "@/lib/prisma";
import { Post, Prisma } from "@/lib/generated/prisma";

type RecentPostProps = Prisma.PostGetPayload<{
  include: { categories: { select: { id: true; name: true } } };
}>;
const RecentPosts = async ({ posts }: { posts: RecentPostProps[] }) => {
  return (
    <div className="grid  gap-10 md:gap-16 md:grid-cols-2 xl:grid-cols-3 mt-10">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default RecentPosts;
