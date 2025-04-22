import React from "react";
import { CiSearch } from "react-icons/ci";
import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import BurgerMenu from "./BurgerMenu";
const Navbar = async () => {
  const session = await auth();

  return (
    <div className="flex  items-center px-4 lg:px-20 text-lg pt-4 pb-3 justify-between">
      <div>Logo</div>
      <div className="flex items-center max-sm:gap-5  gap-6">
        <ul className="flex items-center max-sm:hidden gap-6">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/"}>Blogs</Link>
          </li>
          <li>
            <Link href={"/"}>About</Link>
          </li>
        </ul>
        <Button className="bg-btn text-white max-sm:hidden cursor-pointer">
          Subscribe
        </Button>
        <button title="Search cursor-pointer">
          <CiSearch className="cursor-pointer text-[#5d5d5d] max-sm:size-8 size-6" />
        </button>

        {session && session.user ? (
          <>
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
                    <AvatarImage
                      src={session.user?.image!}
                      className=""
                      alt="avatar"
                    />
                  </Avatar>
                  {session.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button type="submit">Logout</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link href="/login">
            <Button className="bg-secondary border border-[#c9c8cc] cursor-pointer">
              Login
            </Button>
          </Link>
        )}
        <div className="sm:hidden">
          <BurgerMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
