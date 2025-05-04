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
import { signOut } from "@/auth";

type ProfileProps = {
  session: Session;
};
const ProfileDropdown = ({ session }: ProfileProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Image
          src={session.user?.image!}
          alt={session.user?.name!}
          width={35}
          height={35}
          sizes=""
          style={{
            objectFit: "contain",
            borderRadius: "50%",
          }}
          className="max-sm:size-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-2 w-[200px] bg-white border-[#dadada] border"
        align="end"
        // style={{ width: "200px" }}
      >
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={session.user?.image!} className="" alt="avatar" />
          </Avatar>
          {session.user?.name}
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
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="w-full flex justify-start"
          >
            <button
              type="submit"
              className="w-full text-left px-2.5 py-1 rounded-xl hover:bg-[#e8e8e8]"
            >
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
