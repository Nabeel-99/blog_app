import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import ProfileCard from "@/components/ProfileCard";
import UserBlogsList from "@/components/UserBlogsList";
import React, { Suspense } from "react";

const Page = async () => {
  return (
    <div className="lg:px-20 2xl:container 2xl:w-full 2xl:mx-auto mt-10">
      <div className="flex flex-col border rounded-xl border-[#dadada] p-4 lg:p-20  gap-10">
        <div>
          <ProfileCard />
        </div>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<BlogCardSkeleton />}>
            <UserBlogsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
