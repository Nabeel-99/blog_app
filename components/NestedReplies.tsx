import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import { Prisma, Reply } from "@/lib/generated/prisma";
import UserComment from "./UserComment";
import ReplyForm from "./ReplyForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Session } from "next-auth";

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
};

const NestedReplies = ({
  allReplies,
  replies,
  openReply,
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
              <div className="flex items-center  gap-6">
                <div className="flex items-center gap-1 cursor-pointer">
                  <FaRegHeart className="size-5 " />
                  {reply.likes.length > 0 && <span>{reply.likes.length}</span>}
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                  <FaRegCommentDots className="size-5 " />
                  {children.length > 0 && <span>{children.length}</span>}
                </div>
                <button onClick={() => openReply(reply)}>Reply</button>
              </div>

              <NestedReplies
                replies={children}
                allReplies={allReplies}
                openReply={openReply}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NestedReplies;
