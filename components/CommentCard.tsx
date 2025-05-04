import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { auth } from "@/auth";

import { Prisma } from "@/lib/generated/prisma";
import CommentWrapper from "./CommentWrapper";
import BlogComments from "./BlogComments";

type PostWithComments = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        author: true;
      };
    };
  };
}>;
type CommentCardProps = {
  post: PostWithComments;
};
const CommentCard = async ({ post }: CommentCardProps) => {
  const session = await auth();
  return (
    <div className="flex flex-col  overflow-scroll pb-10 hide-scrollbar gap-2 px-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session?.user?.image} />
          <AvatarFallback>{session?.user?.name[0]}</AvatarFallback>
        </Avatar>
        <p>{session?.user?.name}</p>
      </div>
      <CommentWrapper post={post} />
      <Separator className="h-0.5  mt-4 bg-[#dadada]" />
      <BlogComments session={session} post={post} />
    </div>
  );
};

export default CommentCard;
