import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type UserCommentProps = {
  image: string;
  name: string;
  role: string;
  content: string;
};
const UserComment = ({ image, name, role, content }: UserCommentProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p>{name}</p>
        {role === "ADMIN" && (
          <span className="border bg-green-500 text-white px-2 text-sm rounded-xl">
            Author
          </span>
        )}
      </div>
      <p>{content}</p>
    </>
  );
};

export default UserComment;
