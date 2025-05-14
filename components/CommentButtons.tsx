"use client";
import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { Comment, Prisma } from "@/lib/generated/prisma";
import { Session } from "next-auth";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import ReplyForm from "./ReplyForm";
import DeleteDialog from "./DeleteDialog";
import LikeButton from "./LikeButton";

type CommentProps = Prisma.CommentGetPayload<{
  include: {
    likes: true;
    replies: true;
  };
}>;
type CommentButtonsProps = {
  comment: CommentProps;
  session: Session | null;
  showReplies: () => void;
  hide: boolean;
};
const CommentButtons = ({
  comment,
  session,
  showReplies,
  hide,
}: CommentButtonsProps) => {
  const [openInput, setOpenInput] = useState(false);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const openReply = (comment: Comment) => {
    setOpenInput(!openInput);
    setActiveCommentId(comment.id);
  };
  const closeReply = () => setOpenInput(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        `/api/blogs/comment/${activeCommentId}/replies`,
        {
          reply,
        }
      );
      if (response.status === 201) {
        setReply("");
        setOpenInput(false);
        toast.success("Comment created successfully");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <LikeButton
            session={session}
            likes={comment.likes}
            apiRoute={`/api/blogs/comment/${comment.id}/like`}
          />

          <button
            onClick={() => {
              comment.replies.length > 0 ? showReplies() : openReply(comment);
            }}
            // disabled={comment.replies.length === 0}
            className="flex items-center gap-1 cursor-pointer"
          >
            <FaRegCommentDots className="size-5 " />
            {comment.replies.length > 0 && (
              <span>
                {hide ? (
                  "hide replies"
                ) : (
                  <span>
                    {" "}
                    {
                      comment.replies.filter((reply) => reply.parentId === null)
                        .length
                    }
                  </span>
                )}
              </span>
            )}
          </button>
          <button onClick={() => openReply(comment)}>Reply</button>
        </div>
        {session?.user.role === "ADMIN" && (
          <DeleteDialog
            message="Comment deleted successfully"
            error="Error deleting comment"
            refresh={true}
            apiRoute={`/api/blogs/comment/${comment.id}`}
          />
        )}
      </div>

      {openInput && (
        <ReplyForm
          handleSubmit={handleSubmit}
          reply={reply}
          onChangeReply={setReply}
          closeReply={closeReply}
          loading={loading}
        />
      )}
    </div>
  );
};

export default CommentButtons;
