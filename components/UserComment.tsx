import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getShortRelativeTime } from "@/lib/utils";

type UserCommentProps = {
  image: string;
  name: string;
  role: string;
  content: string;
  id: string;
  isUserDeleted: boolean;
  createdAt: Date;
};
const UserComment = ({
  image,
  name,
  id,
  role,
  content,
  isUserDeleted,
  createdAt,
}: UserCommentProps) => {
  return (
    <>
      {isUserDeleted ? (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={isUserDeleted ? "" : image} />
            <AvatarFallback className="border bg-black rounded-full">
              {isUserDeleted ? "" : name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className={`${isUserDeleted && "italic"}`}>
            {isUserDeleted ? "Deleted User" : name}
          </p>
          {role === "ADMIN" && (
            <span className="border bg-green-500 text-white px-2 text-sm rounded-xl">
              Author
            </span>
          )}
        </div>
      ) : (
        <Link
          aria-label="Profile"
          href={`/profile/${id}`}
          className="flex items-center gap-2"
        >
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
      )}

      <p>
        {content}
        <span className="ml-4">{getShortRelativeTime(createdAt)}</span>
      </p>
    </>
  );
};

export default UserComment;
