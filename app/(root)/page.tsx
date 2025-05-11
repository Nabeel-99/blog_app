import { auth } from "@/auth";
import NewsLetter from "@/components/NewsLetter";
import RecentPosts from "@/components/RecentPosts";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const Page = async () => {
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
  const featuredPost =
    (await prisma.post.findFirst({
      where: { isFeatured: true },
      include: { categories: true },
      orderBy: { createdAt: "desc" },
    })) ?? posts[0];
  const session = await auth();
  let user = null;
  if (session?.user.id) {
    user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
  }
  return (
    <>
      {/* featured post section */}
      <section className="bg-background">
        <div className="lg:px-20   2xl:container 2xl:w-full 2xl:mx-auto  p-4 lg:p-26 overflow-hidden relative  text-white flex flex-col lg:flex-row gap-10 lg:justify-between">
          <div className="absolute max-sm:hidden -top-24 left-0">
            <img
              src={"/mark.svg"}
              alt="Spirals"
              className="w-full -z-10 opacity-5 "
            />
          </div>
          <div className="absolute max-sm:hidden -bottom-20 -z-0 -right-20">
            <img
              src={"/mark.svg"}
              alt="Spirals"
              className="w-full -z-10 opacity-5 rotate-180 "
            />
          </div>
          <div className="flex flex-col gap-6 justify-between lg:w-1/2  xl:w-xl">
            <div className="flex flex-col">
              <h1 className="text-xl mt-10 ">Featured Post</h1>
              <p className="text-3xl lg:text-5xl lg:leading-14 lg:mt-10 font-bold">
                {featuredPost?.title}
              </p>
              <p className="text-lg mt-4">{featuredPost?.description}</p>
            </div>

            <Link href={`/blogs/${featuredPost?.slug}`}>
              <Button className="bg-white hover:bg-white/90 py-6 w-32 text-black">
                Read More
              </Button>
            </Link>
          </div>
          {/* <div className=" bg-transparent max-sm:h-[350px] max-sm:max-h-[400px] lg:my-auto xl:h-[576px] z-10 xl:w-[608px] rounded-2xl overflow-hidden"> */}
          <img
            src={featuredPost?.coverImage}
            alt=""
            className="object-cover max-sm:h-[350px] max-sm:max-h-[400px] lg:my-auto xl:h-[576px] z-10 xl:w-[608px] rounded-2xl"
          />
          {/* </div> */}
        </div>
      </section>
      {/* random post section */}
      {/* <section>
        <div className="px-4 pt-20 lg:px-20 2xl:container 2xl:w-full 2xl:mx-auto   lg:pt-30 ">
          <div className="lg:relative max-sm:border max-sm:border-[#cbcbcb]  max-sm:p-4 lg:h-[600px] max-sm:shadow-md rounded-2xl max-sm:flex max-sm:flex-col">
            <img
              src={featuredPost?.coverImage}
              alt="vr"
              className="w-full max-sm:h-[250px] rounded-xl max-sm:max-h-[400px] lg:h-[600px] object-cover"
            />
            <div className="lg:absolute -bottom-32 right-0">
              <div className="lg:border lg:border-[#dadada] lg:shadow-sm lg:bg-white lg:w-3xl max-w-4xl rounded-xl p-6 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <p className="uppercase font-bold">
                    {featuredPost?.category}
                  </p>
                  <span>{formatDate(featuredPost?.createdAt)}</span>{" "}
                </div>
                <p className="max-sm:text-xl md:text-2xl lg:text-3xl font-bold"></p>
                <p className="text-sm line-clamp-3 lg:text-lg">
                  {featuredPost?.description}
                </p>
                <Link href={`/blogs/${featuredPost?.slug}`}>
                  <Button className="bg-btn mt-10 py-6 w-32 text-white">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Recent Posts */}
      <section>
        <div className="lg:px-20 flex flex-col gap-10 px-4 mt-10 2xl:container 2xl:w-full 2xl:mx-auto lg:mt-50">
          <div className="flex items-center justify-between">
            <p className="text-lg lg:text-2xl font-bold">Recent Posts</p>
            <Link href={"/blogs"}>
              <Button className="bg-btn py-6 px-6 text-white">View All</Button>
            </Link>
          </div>
          <RecentPosts />
        </div>
      </section>
      <section>
        <div className="mt-20 lg:mt-40">
          <NewsLetter user={user} />
        </div>
      </section>
    </>
  );
};

export default Page;
