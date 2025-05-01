import Blogs from "@/components/Blogs";
import ProfileCard from "@/components/ProfileCard";
import UserBlogs from "@/components/UserBlogs";
import prisma from "@/lib/prisma";
import React from "react";

const Page = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="lg:px-20 2xl:container 2xl:w-full 2xl:mx-auto mt-10">
      <div className="flex flex-col border rounded-xl border-[#dadada] p-4 lg:p-20  gap-10">
        <div>
          <ProfileCard />
        </div>
        <div className="flex flex-col gap-4">
          <p>
            All Blogs <span className="font-bold">{posts.length}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <UserBlogs key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
