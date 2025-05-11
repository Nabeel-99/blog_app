import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import { Prisma, Reply } from "@/lib/generated/prisma";
import UserComment from "./UserComment";
import { Session } from "next-auth";
import DeleteDialog from "./DeleteDialog";
import LikeButton from "./LikeButton";

type RepliesProps = Prisma.ReplyGetPayload<{
  include: {
    author: true;
    likes: true;
  };
}>;
type NestedRepliesProps = {
  replies: RepliesProps[];
  openReply: (reply: Reply) => void;
  allReplies: RepliesProps[];
  session: Session | null;
  isHidden?: boolean;
  showResponse?: () => void;
};

const NestedReplies = ({
  allReplies,
  replies,
  openReply,
  session,
}: NestedRepliesProps) => {
  const [isNestedHidden, setIsNestedHidden] = useState(false);
  const showResponse = () => {
    setIsNestedHidden(!isNestedHidden);
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        {replies.map((reply) => {
          const children = allReplies.filter((r) => r.parentId === reply.id);
          return (
            <div className="flex flex-col gap-2" key={reply.id}>
              <UserComment
                image={reply?.author?.image || ""}
                name={reply?.author?.name || ""}
                role={reply?.author?.role || ""}
                content={reply.content}
                id={reply?.authorId || ""}
                isUserDeleted={reply.isUserDeleted}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <LikeButton
                    session={session}
                    apiRoute={`/api/blogs/replies/${reply.id}/like`}
                    likes={reply.likes}
                  />
                  <button
                    onClick={showResponse}
                    disabled={children.length === 0}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <FaRegCommentDots className="size-5 " />
                    {isNestedHidden ? (
                      "hide replies"
                    ) : (
                      <span>
                        {" "}
                        {children.length > 0 && <span>{children.length}</span>}
                      </span>
                    )}
                  </button>
                  <button onClick={() => openReply(reply)}>Reply</button>
                </div>
                {session?.user.role === "ADMIN" && (
                  <DeleteDialog
                    message="Response deleted successfully"
                    error="Error deleting response"
                    apiRoute={`/api/blogs/replies/${reply.id}`}
                    refresh={true}
                  />
                )}
              </div>
              {isNestedHidden && (
                <NestedReplies
                  allReplies={allReplies}
                  replies={children}
                  openReply={openReply}
                  session={session}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NestedReplies;
