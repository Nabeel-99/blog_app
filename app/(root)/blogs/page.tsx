import Blogs from "@/components/api/blogs";
import { BlurIn } from "@/components/animations/BlurIn";
import BlogCardSkeleton from "@/components/cards/BlogCardSkeleton";
import { FadeIn } from "@/components/animations/FadeIn";
import NewsLetter from "@/components/NewsLetter";
import React, { Suspense } from "react";

const Page = async () => {
  return (
    <>
      <div className="bg-[#ffffff]">
        <section>
          <BlurIn className="flex flex-col max-w-2xl mx-auto text-center pt-10 px-4 lg:px-0 lg:pt-20 gap-4 items-center">
            <h1 className="uppercase text-lg lg:text-2xl">My Blogs</h1>
            <p className="font-bold text-3xl lg:text-5xl">
              Find All blogs from here
            </p>

            <p>
              Our blogs are crafted through thorough research and written by
              experienced authors, ensuring you get the most insightful and
              engaging content to enjoy and learn from.
            </p>
          </BlurIn>
        </section>
        <section>
          <FadeIn
            direction="up"
            className="lg:px-20 px-4 mt-10 2xl:container 2xl:w-full 2xl:mx-auto lg:mt-10"
          >
            <Suspense fallback={<BlogCardSkeleton />}>
              <Blogs />
            </Suspense>
          </FadeIn>
        </section>
        <section>
          <div className="mt-20 lg:mt-40">
            <NewsLetter />
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
