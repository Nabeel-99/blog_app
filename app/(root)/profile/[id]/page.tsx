import { auth } from "@/auth";
import BlogCardSkeleton from "@/components/cards/BlogCardSkeleton";

import ProfileCard from "@/components/cards/ProfileCard";
import UserBlogsList from "@/components/UserBlogsList";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const { id } = await params;

  let user = null;
  if (session?.user.id) {
    user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  if (!user) {
    return notFound();
  }

  return (
    <div className="px-4 lg:px-20 2xl:container 2xl:w-full 2xl:mx-auto mt-10">
      <div className="flex flex-col border rounded-xl border-[#dadada] p-4 lg:p-20  gap-10">
        <div>
          <ProfileCard user={user} />
        </div>
        {user?.role === "ADMIN" && (
          <div className="flex flex-col gap-4">
            <Suspense fallback={<BlogCardSkeleton />}>
              <UserBlogsList />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
