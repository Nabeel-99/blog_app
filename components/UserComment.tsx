import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
type UserCommentProps = {
  image: string;
  name: string;
  role: string;
  content: string;
  id: string;
  isUserDeleted: boolean;
};
const UserComment = ({
  image,
  name,
  id,
  role,
  content,
  isUserDeleted,
}: UserCommentProps) => {
  return (
    <>
      <Link href={`/profile/${id}`} className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={isUserDeleted ? "" : image} />
          <AvatarFallback className="border bg-black rounded-full">
            {isUserDeleted ? "" : name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <p>{isUserDeleted ? "Deleted User" : name}</p>
        {role === "ADMIN" && (
          <span className="border bg-green-500 text-white px-2 text-sm rounded-xl">
            Author
          </span>
        )}
      </Link>
      <p>{content}</p>
    </>
  );
};

export default UserComment;
