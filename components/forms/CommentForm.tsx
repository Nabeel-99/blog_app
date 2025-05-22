"use client";

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import { Post } from "@/lib/generated/prisma";
import { Session } from "next-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ImSpinner } from "react-icons/im";

type CommentFormProps = {
  post: Post;
  session: Session | null;
};
const CommentForm = ({ post, session }: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!session) {
      toast.error("You must be logged in to comment");
      setLoading(false);
      return;
    }
    if (!comment) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/blogs/comment", {
        comment,
        postId: post.id,
      });
      if (response.status === 201) {
        setComment("");
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
    <>
      <form onSubmit={handleSubmit}>
        <Textarea
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="min-h-24 max-h-24 border-[#dadada]"
        />
        <div className="flex justify-end mt-2">
          <Button
            disabled={loading}
            type="submit"
            className={`${
              loading ? "cursor-not-allowed " : " "
            } text-white bg-btn `}
          >
            {loading ? (
              <ImSpinner className="animate-spin" />
            ) : (
              <span> Comment</span>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CommentForm;
