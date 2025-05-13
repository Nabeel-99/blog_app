"use client";

import React, { useState } from "react";
import { Session } from "next-auth";
import { Prisma } from "@/lib/generated/prisma";
import CommentButtons from "./CommentButtons";
import CommentReplies from "./CommentReplies";
import UserComment from "./UserComment";

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
type BlogCommentsProps = {
  session: Session | null;
  post: PostWithComments;
};
const BlogComments = ({ session, post }: BlogCommentsProps) => {
  const comments = post.comments;
  const [hide, setHide] = useState(false);
  const showComments = () => {
    comments.length > 2 ? setHide(true) : setHide(false);
    setHide(!hide);
  };

  return comments.length > 0 ? (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => {
        const topLevelReplies = comment.replies.filter(
          (reply) => reply.parentId === null
        );

        return (
          <div className="flex flex-col gap-4" key={comment.id}>
            <UserComment
              image={comment?.author?.image || ""}
              name={comment?.author?.name || ""}
              role={comment?.author?.role || ""}
              content={comment.content}
              id={comment?.authorId || ""}
              isUserDeleted={comment.isUserDeleted}
            />

            <CommentButtons
              showComments={showComments}
              hide={hide}
              comment={comment}
              session={session}
            />
            {/* comment response */}
            {topLevelReplies.map((reply) => (
              <CommentReplies
                hide={hide}
                reply={reply}
                session={session}
                allReplies={comment.replies}
                key={reply.id}
              />
            ))}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="">No comments yet</p>
    </div>
  );
};

export default BlogComments;
