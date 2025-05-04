import React from "react";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Prisma } from "@/lib/generated/prisma";

type PostWithComments = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        author: true;
      };
    };
  };
}>;
type BlogCommentsProps = {
  session: Session | null;
  post: PostWithComments;
};
console;
const BlogComments = ({ session, post }: BlogCommentsProps) => {
  const comments = post.comments;
  return comments.length > 0 ? (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <div className="flex flex-col gap-4" key={comment.id}>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={comment?.author?.image || ""} />
              <AvatarFallback className="border rounded-full bg-black text-white">
                {comment?.author?.name?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
            <p>{comment?.author?.name || ""}</p>
            {comment?.author?.role === "ADMIN" && (
              <span className="border bg-green-500 text-white px-2 text-sm rounded-xl">
                Author
              </span>
            )}
          </div>
          <p>{comment.content}</p>
          <div className="flex items-center pl-2 gap-6">
            <div
              className="flex items-center gap-1 cursor-pointer
"
            >
              <FaRegHeart className="size-5 " />
              <span>1</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaRegCommentDots className="size-5 " />
              <span>3</span>
            </div>
            <button>Reply</button>
          </div>
          {/* comment response */}
          {/* <div className="flex flex-col pl-4 mt-2 gap-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback>{session?.user?.name[0]}</AvatarFallback>
                </Avatar>
                <p>{session?.user?.name}</p>
              </div>
              <p>Hey there this is a response</p>
              <div className="flex items-center pl-2 gap-6">
                <div
                  className="flex items-center gap-1 cursor-pointer
"
                >
                  <FaRegHeart className="size-5 " />
                  <span>1</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                  <FaRegCommentDots className="size-5 " />
                  <span>3</span>
                </div>
                <button>Reply</button>
              </div>
            </div> */}
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="">No comments yet</p>
    </div>
  );
};

export default BlogComments;
