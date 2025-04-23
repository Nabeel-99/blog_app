import BlogCard from "@/components/BlogCard";
import NewsLetter from "@/components/NewsLetter";
import prisma from "@/lib/prisma";
import React from "react";

const Page = () => {
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
          <div className="px-4 lg:px-20 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">
              {Array.from({ length: 9 }).map((_, index) => (
                <BlogCard key={index} />
              ))}
            </div>
          </div>
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
