import React from "react";
import CommentForm from "./CommentForm";
import { Post } from "@/lib/generated/prisma";
import { auth } from "@/auth";

type CommentWrapperProps = {
  post: Post;
};
const CommentWrapper = async ({ post }: CommentWrapperProps) => {
  const session = await auth();
  return <CommentForm post={post} session={session} />;
};

export default CommentWrapper;
