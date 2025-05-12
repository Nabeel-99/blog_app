import { auth } from "@/auth";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import Blogs from "@/components/Blogs";
import NewsLetter from "@/components/NewsLetter";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";

const Page = async () => {
  const session = await auth();
  let user = null;
  if (session?.user.id) {
    user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
  }
  const subscription = await prisma.subscription.findUnique({
    where: {
      email: user?.email || "",
    },
    select: {
      hasSubscribed: true,
    },
  });
  const isSubscribed = subscription?.hasSubscribed;
  return (
    <>
      <div className="bg-[#f6f6f6]">
        <section>
          <div className="flex flex-col max-w-2xl mx-auto text-center pt-10 px-4 lg:px-0 lg:pt-20 gap-4 items-center">
            <h1 className="uppercase text-lg lg:text-2xl">My Blogs</h1>
            <p className="font-bold text-3xl lg:text-5xl">
              Find All blogs from here
            </p>
            <p>
              Our blogs are crafted through thorough research and written by
              experienced authors, ensuring you get the most insightful and
              engaging content to enjoy and learn from.
            </p>
          </div>
        </section>
        <section>
          <div className="lg:px-20 px-4 mt-10 2xl:container 2xl:w-full 2xl:mx-auto lg:mt-10">
            <Suspense fallback={<BlogCardSkeleton />}>
              <Blogs />
            </Suspense>
          </div>
        </section>
        <section>
          <div className="mt-20 lg:mt-40">
            <NewsLetter isSubscribed={isSubscribed} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
