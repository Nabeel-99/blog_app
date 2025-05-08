import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Session } from "next-auth";
import LogoutButton from "./LogoutButton";
import { User } from "@/lib/generated/prisma";
import { AvatarFallback } from "@radix-ui/react-avatar";

type ProfileProps = {
  user: User | null;
};
const ProfileDropdown = ({ user }: ProfileProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-2 w-[200px] bg-white border-[#dadada] border"
        align="end"
        // style={{ width: "200px" }}
      >
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.image || ""} className="" alt="avatar" />
          </Avatar>
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className=" px-4 py-1 rounded-xl hover:bg-[#e8e8e8] w-full"
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className=" px-4 py-1 rounded-xl hover:bg-[#e8e8e8] w-full"
          >
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="w-full">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
