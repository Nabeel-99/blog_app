import { Prisma } from "@/lib/generated/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";
import { Button } from "./ui/button";
import { FaPencil } from "react-icons/fa6";
import DeleteDialog from "./DeleteDialog";

type PostWithCategories = Prisma.PostGetPayload<{
  include: { categories: { select: { id: true; name: true } } };
}>;

type UserBlogsProps = {
  post: PostWithCategories;
};
const UserBlogs = ({ post }: UserBlogsProps) => {
  return (
    <div className="flex flex-col border border-[#dadada] shadow-sm rounded-2xl p-6 max-sm:px-3 gap-4">
      <Link href={`/blogs/${post.slug}`} className="flex flex-col gap-4">
        <img
          src={post.coverImage}
          alt="AI"
          className="rounded-2xl h-[120px] lg:h-[200px] w-full object-contain"
        />
        <div className="flex items-center justify-between ">
          {" "}
          {post.categories.length > 0 && (
            <div className="flex items-center text-sm">
              <span className="text-white text-center px-2 py-1 rounded-xl bg-background">
                {post.categories[0].name}
              </span>

              {post.categories.length > 1 && (
                <span className="px-2 py-1 rounded-full border bg-background text-white border-[#dadada] flex items-center justify-center">
                  +{post.categories.length - 1}
                </span>
              )}
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-[#655f5f]">{formatDate(post.createdAt)}</span>
            <div className="flex items-center gap-1">
              <FaEye className="text-[#151515]" />
              <span className="text-[#655f5f]">{post.views}</span>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold line-clamp-1">{post.title}</h1>
        <p className=" min-h-[70px] line-clamp-3">{post.description}</p>
      </Link>
      <div className="flex items-center justify-between">
        <Button className="border border-[#dadada] hover:bg-black hover:text-white transition-all duration-300">
          Set as Featured Post
        </Button>
        <div className="flex items-center gap-2">
          <Link
            href={`/blogs/edit/${post.id}`}
            className="border rounded-lg px-2 py-2 text-gray-500
 border-[#dadada] hover:bg-black hover:text-white transition-all duration-300"
          >
            {" "}
            <FaPencil className="size-4 " />
          </Link>
          <DeleteDialog id={post.id} />
        </div>
      </div>
      {/* <Link href={`/blogs/${post.slug}`} className="text-[#7c4ee4] underline">
        Read More...
      </Link> */}
    </div>
  );
};

export default UserBlogs;
