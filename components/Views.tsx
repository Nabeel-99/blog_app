import prisma from "@/lib/prisma";
import { after } from "next/server";
import React from "react";

const Views = async ({ slug }: { slug: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { views: true },
  });
  after(async () => {
    await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      select: { views: true },
    });
  });
  // update views count

  return (
    <div className="relative ">
      <div className="bg-[#2c2a32] px-4 py-2 text-white rounded-2xl flex items-center gap-1 justify-center">
        <span>{post?.views} </span> <span>View(s)</span>
      </div>
      <div className="absolute -top-1 shadow-2xl  drop-shadow-4xl drop-shadow-green-400 -right-1 w-4 h-4 p-2 flex items-center justify-center rounded-full bg-green-600">
        <div className="h-full w-full bg-green-400 animate-pulse p-2 rounded-full"></div>
      </div>
    </div>
  );
};

export default Views;
