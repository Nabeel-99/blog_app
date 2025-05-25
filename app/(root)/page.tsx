import { BlurIn } from "@/components/animations/BlurIn";
import { FadeIn } from "@/components/animations/FadeIn";
import NewsLetter from "@/components/NewsLetter";
import RecentPosts from "@/components/RecentPosts";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const revalidate = 3600;
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

  return (
    <>
      {/* featured post section */}
      <section className="bg-background">
        <div className=" overflow-hidden relative  ">
          <div className="absolute max-sm:hidden -top-24 left-0">
            <Image
              src={"/mark.svg"}
              width={500}
              height={500}
              alt="Spirals"
              priority={false}
              style={{ width: "100% " }}
              className=" -z-10 opacity-30 "
            />
          </div>
          <div className="absolute max-sm:hidden -bottom-20 -z-0 -right-20">
            <Image
              src={"/mark.svg"}
              width={500}
              height={500}
              alt="Spirals"
              priority={false}
              style={{ width: "100% " }}
              className="-z-10 opacity-30 rotate-180 "
            />
          </div>
          <BlurIn className="2xl:container  h-full 2xl:w-full 2xl:mx-auto lg:px-20 p-4 lg:p-26  text-white flex flex-col lg:flex-row gap-10 lg:justify-between">
            <div className="flex  flex-col gap-6 justify-between xl:min-h-[576px]  lg:w-1/2  xl:w-xl">
              <div className="flex text-[#1A2A44] flex-col">
                <h1 className="text-xl font-black mt-10 ">Featured Post</h1>
                <p className="text-3xl mt-4 lg:text-5xl lg:leading-14 lg:mt-10 font-bold">
                  {featuredPost?.title}
                </p>
                <p className="text-lg mt-4">{featuredPost?.description}</p>
              </div>

              <Link
                aria-label="Read More"
                href={`/api/blogs/${featuredPost?.slug}`}
              >
                <Button
                  aria-label="Read More"
                  className="bg-[#1A2A44] hover:bg-[#2B3A55] py-6 w-32 text-white"
                >
                  Read More
                </Button>
              </Link>
            </div>

            <Image
              src={`${featuredPost?.coverImage}?f_auto,q_auto`}
              width={608}
              height={576}
              priority
              sizes="(max-width:767px) 350px, 608px"
              alt={featuredPost?.title || "Featured blog post"}
              className="object-cover w-full max-md:h-[350px] lg:my-auto  md:h-[576px] z-10 xl:w-[608px] rounded-2xl"
            />
          </BlurIn>
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <FadeIn direction="up">
          <div className="lg:px-20 flex flex-col gap-10 px-4 mt-10 2xl:container 2xl:w-full 2xl:mx-auto lg:mt-50">
            <div className="flex items-center justify-between">
              <p className="text-lg lg:text-2xl font-bold">Recent Posts</p>
              <Link href={"/api/blogs"} aria-label="View All">
                <Button className="bg-btn py-6 px-6 text-white">
                  View All
                </Button>
              </Link>
            </div>
            <RecentPosts posts={posts} />
          </div>
        </FadeIn>
      </section>
      <section>
        <div className="mt-20 lg:mt-40">
          <NewsLetter />
        </div>
      </section>
    </>
  );
};

export default Page;
