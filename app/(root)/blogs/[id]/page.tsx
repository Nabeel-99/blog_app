import React from "react";
import markdownit from "markdown-it";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import NewsLetter from "@/components/NewsLetter";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentDots, FaHeart, FaRegHeart } from "react-icons/fa6";
const md = markdownit();
const page = () => {
  const parsedContent = md.render("**Hello World**");
  return (
    <>
      <div className="bg-[#f6f6f6]">
        <section>
          <div className="px-4 pt-10 lg:px-20 lg:pt-20">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="uppercase font-black">Development</span>
              <span className="text-[#655f5f]">13 March 2023</span>
            </div>
            <div className="flex flex-col items-center gap-10">
              <h1 className="text-3xl lg:text-5xl  font-bold">
                How AI is Making Video Games More Immersive
              </h1>
              <img
                src={
                  "https://viitorcloud.com/blog/wp-content/uploads/2022/03/How-AI-is-Making-Video-Games-More-Immersive.jpg"
                }
                alt="AI"
                className="w-full max-h-[600px] rounded-2xl object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 max-w-5xl mt-20 pb-10 mx-auto w-full">
              <h1 className="text-xl font-bold">Pitch Details</h1>
              {parsedContent ? (
                <article
                  className="markdown prose prose-lg prose-headings:font-bold prose-headings:text-black prose-p:text-gray-800 prose-ul:list-disc prose-strong:text-black prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 break-words"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
              ) : (
                <p>No details provided.</p>
              )}
            </div>
            <div className="flex lg:sticky lg:bottom-10 bg-white shadow-sm  gap-4  items-center justify-center   border border-[#dadada] w-[120px] max-w-[200px] mx-auto rounded-full p-3">
              <button>
                {" "}
                <FaRegHeart className="size-7 text-[#585858]" />
              </button>
              <button>
                {" "}
                <FaRegCommentDots className="size-7 text-[#585858]" />
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="lg:px-20 px-4 mt-10 lg:mt-50">
            <div className="flex items-center justify-between">
              <p className="text-lg lg:text-2xl font-bold">Recent Post</p>
              <Link href={"/blogs"}>
                <Button className="bg-btn py-6 px-6 text-white">
                  View All
                </Button>
              </Link>
            </div>
            {/* https://viitorcloud.com/blog/wp-content/uploads/2022/03/How-AI-is-Making-Video-Games-More-Immersive.jpg
          https://cdn.analyticsvidhya.com/wp-content/uploads/2024/02/Top-10-AI-Games-Shaping-the-Future-of-Gaming-80.jpg
          https://lsvp.com/wp-content/uploads/2023/07/ai-inworld-cover.jpg */}
            <div className="grid max-sm:gap-10 md:gap-16 md:grid-cols-2 xl:grid-cols-3 lg:gap-20 mt-10">
              {Array.from({ length: 3 }).map((_, index) => (
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

export default page;
