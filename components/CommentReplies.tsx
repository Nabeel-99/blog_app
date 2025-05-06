"use client";

import React, { useState } from "react";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import { Prisma, Reply } from "@/lib/generated/prisma";
import { toast } from "sonner";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import ReplyForm from "./ReplyForm";
import NestedReplies from "./NestedReplies";
import UserComment from "./UserComment";

type RepliesWithAuthor = Prisma.ReplyGetPayload<{
  include: {
    author: true;
    likes: true;
  };
}>;
type CommentRepliesProps = {
  reply: RepliesWithAuthor;
  session: Session | null;
  hide: boolean;
  allReplies: RepliesWithAuthor[];
};
const CommentReplies = ({
  reply,
  session,
  hide,
  allReplies,
}: CommentRepliesProps) => {
  const [openInput, setOpenInput] = useState(false);
  const [userReply, setUserReply] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const children = allReplies.filter((child) => child.parentId === reply.id);
  console.log("children nested", children);
  const openReply = (reply: Reply) => {
    setOpenInput(!openInput);
    setActiveReplyId(reply.id);
  };
  console.log("all replies", allReplies);
  const closeReply = () => setOpenInput(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("handle submit", comment);
    setLoading(true);
    if (!session) {
      toast.error("You must be logged in to reply");
      setLoading(false);
      return;
    }
    if (!reply) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `/api/blogs/replies/${activeReplyId}/reply`,
        { userReply }
      );
      if (response.status === 201) {
        setUserReply("");
        setOpenInput(false);
        toast.success("Reply created successfully");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    !hide && (
      <div className="flex flex-col pl-4 mt-2 gap-4">
        <UserComment
          image={reply.author.image || ""}
          name={reply.author.name || ""}
          role={reply.author.role}
          content={reply.content}
        />
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-1 cursor-pointer
  "
          >
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
          allReplies={allReplies}
          replies={children}
          openReply={openReply}
        />
        {openInput && (
          <ReplyForm
            handleSubmit={handleSubmit}
            reply={userReply}
            onChangeReply={setUserReply}
            closeReply={closeReply}
            loading={loading}
          />
        )}
      </div>
    )
  );
};

export default CommentReplies;
