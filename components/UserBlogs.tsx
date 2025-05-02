"use client";

import { Post } from "@/lib/generated/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Button } from "./ui/button";
import { FaPencil } from "react-icons/fa6";
import prisma from "@/lib/prisma";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UserBlogsProps = {
  post: Post;
};
const UserBlogs = ({ post }: UserBlogsProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`/api/blogs/posts/${id}`);
      console.log(response);
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        router.push("/profile");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting blog post.");
    }
  };

  return (
    <div className="flex flex-col border border-[#dadada] shadow-sm rounded-2xl p-6 max-sm:px-3 gap-4">
      <img
        src={post.coverImage}
        alt="AI"
        className="rounded-2xl h-[120px] lg:h-[200px] w-full object-contain"
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
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <button
                onClick={() => setOpen(true)}
                className="border rounded-lg px-2 py-2 text-gray-500 border-[#dadada] hover:bg-black hover:text-white transition-all duration-300"
                title="delete"
              >
                <FaTrash className="size-4 " />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  blog post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-black text-white hover:bg-black/90">
                  No
                </AlertDialogCancel>
                <Button
                  onClick={() => handleDelete(post.id)}
                  className="border border-[#dadada] hover:bg-[#f0f0f0] px-4 py-2 rounded-md"
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {/* <Link href={`/blogs/${post.slug}`} className="text-[#7c4ee4] underline">
        Read More...
      </Link> */}
    </div>
  );
};

export default UserBlogs;
