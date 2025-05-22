import BlogForm from "@/components/forms/BlogForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      title: true,
      description: true,
      coverImage: true,
      content: true,
      slug: true,
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  if (!post) {
    return notFound();
  }
  return (
    <div className=" px-20 py-20 flex flex-col gap-10 items-center h-full">
      <h1 className="text-6xl font-bold">Edit Blog</h1>
      <BlogForm post={post} />
    </div>
  );
};

export default page;
