import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegCommentDots, FaRegHeart, FaRegTrashCan } from "react-icons/fa6";
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
  isHidden,
  showResponse,
}: NestedRepliesProps) => {
  //   console.log("nested replies", reply);
  //   const [openInput, setOpenInput] = useState(false);
  //   const [userReply, setUserReply] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const router = useRouter();
  //   const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  //   const openReply = (reply: Reply) => {
  //     setOpenInput(!openInput);
  //     setActiveReplyId(reply.id);
  //   };

  //   const closeReply = () => setOpenInput(false);
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     // console.log("handle submit", comment);
  //     setLoading(true);
  //     if (!session) {
  //       toast.error("You must be logged in to reply");
  //       setLoading(false);
  //       return;
  //     }
  //     if (!reply) {
  //       setLoading(false);
  //       return;
  //     }
  //     try {
  //       const response = await axios.post(
  //         `/api/blogs/replies/${activeReplyId}/reply`,
  //         { userReply }
  //       );
  //       if (response.status === 201) {
  //         setUserReply("");
  //         setOpenInput(false);
  //         toast.success("Reply created successfully");
  //         router.refresh();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  return (
    <>
      <div className="flex flex-col gap-2">
        {replies.map((reply) => {
          const children = allReplies.filter((r) => r.parentId === reply.id);
          return (
            <div className="flex flex-col gap-2" key={reply.id}>
              <UserComment
                image={reply.author.image || ""}
                name={reply.author.name || ""}
                role={reply.author.role}
                content={reply.content}
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
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <FaRegCommentDots className="size-5 " />
                    {isHidden ? (
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
              {isHidden && (
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
