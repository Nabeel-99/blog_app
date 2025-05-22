"use client";

import { Prisma } from "@/lib/generated/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Button } from "./ui/button";
import { FaPencil } from "react-icons/fa6";
import DeleteDialog from "./DeleteDialog";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ImSpinner } from "react-icons/im";
import Image from "next/image";

type PostWithCategories = Prisma.PostGetPayload<{
  include: { categories: { select: { id: true; name: true } } };
}>;

type UserBlogsProps = {
  post: PostWithCategories;
};
const UserBlogs = ({ post }: UserBlogsProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setFeatured = async (postId: number) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/blogs/posts//${postId}/featured`);

      if (response.status === 200) {
        toast.success("Post is now featured");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col border border-[#dadada] shadow-sm rounded-2xl p-6 max-sm:px-3 gap-4">
      <Link href={`/blogs/${post.slug}`} className="flex flex-col gap-4">
        <Image
          width={200}
          height={200}
          src={`${post.coverImage}?f_auto,q_auto`}
          alt={`${post.title} || 'Cover Image'`}
          className="rounded-2xl h-[120px] lg:h-[200px] w-full object-contain"
          style={{ width: "100%" }}
        />
        <div className="flex items-center justify-between ">
          {" "}
          {post.categories.length > 0 && (
            <div className="flex items-center text-sm">
              <span className=" px-2 py-1 rounded-xl text-white text-center bg-[#C71585]">
                {post.categories[0].name}
              </span>

              {post.categories.length > 1 && (
                <span className="px-2 py-1 rounded-full border  text-center bg-[#C71585] text-white border-[#dadada] flex items-center justify-center">
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
        {post.isFeatured ? (
          <span className="border border-[#dadada] py-2 bg-[#ffd1dc] text-[#1A2A44] px-2 text-sm rounded-lg">
            Featured Post
          </span>
        ) : (
          <Button
            disabled={loading}
            onClick={() => {
              setFeatured(post.id);
            }}
            className="border border-[#dadada] hover:bg-black hover:text-white transition-all duration-300"
          >
            {loading ? (
              <ImSpinner className="animate-spin" />
            ) : (
              <span> Set as Featured Post</span>
            )}
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Link
            href={`/blogs/edit/${post.id}`}
            className="border rounded-lg px-2 py-2 text-gray-500
 border-[#dadada] hover:bg-black hover:text-white transition-all duration-300"
          >
            {" "}
            <FaPencil className="size-4 " />
          </Link>
          <DeleteDialog
            message="Blog deleted Successfully"
            error="Error deleting blog"
            apiRoute={`/api/blogs/posts/${post.id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default UserBlogs;
