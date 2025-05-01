import { Post } from "@/lib/generated/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

type BlogCardProps = {
  post: Post;
};
const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="flex flex-col max-sm:px-3 gap-4">
      <img
        src={post.coverImage}
        alt="AI"
        className="rounded-2xl h-[260px] lg:h-[360px] w-full object-contain"
      />
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          {" "}
          {post.category && (
            <span className="font-bold uppercase">{post.category}</span>
          )}
          <span className="text-[#655f5f]">{formatDate(post.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaEye className="text-[#151515]" />
          <span className="text-[#655f5f]">{post.views}</span>
        </div>
      </div>
      <h1 className="text-xl font-bold line-clamp-1">{post.title}</h1>
      <p className=" min-h-[70px] line-clamp-3">{post.description}</p>
      <Link href={`/blogs/${post.slug}`} className="text-[#7c4ee4] underline">
        Read More...
      </Link>
    </div>
  );
};

export default BlogCard;
