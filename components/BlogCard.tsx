import { Prisma } from "@/lib/generated/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

type PostWithCategories = Prisma.PostGetPayload<{
  include: { categories: { select: { id: true; name: true } } };
}>;

type BlogCardProps = {
  post: PostWithCategories;
};
const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="flex flex-col border border-[#ffd1dc] bg-[#ffd1dc] hover:bg-[#ff94b4] transition-all duration-300 ease-in-out text-[#1A2A44] shadow-sm rounded-2xl p-6 max-sm:px-3 gap-4"
    >
      <img
        src={post.coverImage}
        alt="AI"
        className="rounded-2xl h-[260px]  lg:h-[200px] w-full object-cover border border-[#ffd1dc]"
      />
      <div className="flex items-center justify-between ">
        {" "}
        {post.categories.length > 0 && (
          <div className="flex items-center text-sm">
            <span className="text-white text-center bg-[#C71585]  px-2 py-1 rounded-xl">
              {post.categories[0].name}
            </span>

            {post.categories.length > 1 && (
              <span className="px-2 py-1 rounded-full border text-white text-center bg-[#C71585]  border-[#dadadabc] flex items-center justify-center">
                +{post.categories.length - 1}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-end w-full gap-2">
          <span className="text-[#1A2A44]">{formatDate(post.createdAt)}</span>
          <div className="flex items-center gap-1">
            <FaEye className="text-[#151515]" />
            <span className="text-[#1A2A44]">{post.views}</span>
          </div>
        </div>
      </div>
      <h1 className="text-xl font-bold line-clamp-1">{post.title}</h1>
      <p className=" min-h-[70px] line-clamp-3">{post.description}</p>
      <span className=" font-bold hover:underline ">Read More...</span>
    </Link>
  );
};

export default BlogCard;
