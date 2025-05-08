import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { auth } from "@/auth";

import { Prisma } from "@/lib/generated/prisma";
import CommentWrapper from "./CommentWrapper";
import BlogComments from "./BlogComments";
import prisma from "@/lib/prisma";

type PostWithComments = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        author: true;
        likes: true;
        replies: {
          include: {
            author: true;
            likes: true;
          };
        };
      };
    };
  };
}>;
type CommentCardProps = {
  post: PostWithComments;
};
const CommentCard = async ({ post }: CommentCardProps) => {
  const session = await auth();
  let user = null;
  if (session?.user.id) {
    user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
  }
  return (
    <div className="flex flex-col  overflow-scroll pb-10 hide-scrollbar gap-2 px-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <p>{user?.name}</p>
      </div>
      <CommentWrapper post={post} />
      <Separator className="h-0.5  mt-4 bg-[#dadada]" />
      <BlogComments session={session} post={post} />
    </div>
  );
};

export default CommentCard;
