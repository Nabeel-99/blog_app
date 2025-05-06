"use client";

import { Like } from "@/lib/generated/prisma";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";

type LikeButtonProps = {
  apiRoute?: string;
  session: Session | null;
  likes?: Like[];
};
const LikeButton = ({ apiRoute, session, likes }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes?.length || 0);
  const router = useRouter();
  const handleLike = async () => {
    if (!session) {
      toast.error("You must be logged in to like");
      return;
    }
    const prevLiked = isLiked;
    const prevCount = likeCount;
    setIsLiked(!prevLiked);
    setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);
    try {
      const response = await axios.post(apiRoute || "");
      console.log(response);
      if (response.status !== 200 && response.status !== 201) {
        toast.error("Failed to like");
      }
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    }
  };
  useEffect(() => {
    if (
      session?.user.id &&
      likes?.some((like) => like.authorId === session.user.id)
    ) {
      setIsLiked(true);
    }
  }, [session, likes]);
  return (
    <div className="flex items-center gap-1">
      <button onClick={handleLike}>
        {" "}
        {isLiked ? (
          <FaHeart className="size-6 text-[#ff0000]" />
        ) : (
          <FaRegHeart className="size-6 text-[#585858]" />
        )}
      </button>
      {likeCount > 0 && <span>{likeCount}</span>}
    </div>
  );
};

export default LikeButton;
