import React from "react";
import { CiSearch } from "react-icons/ci";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import Logo from "../public/vercel.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchForm from "./SearchForm";
import ProfileDropdown from "./ProfileDropdown";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import SubscribeButton from "./SubscribeForm";
import SubscribeForm from "./SubscribeForm";
import SubscribeDialog from "./SubscribeDialog";
const Navbar = async () => {
  const session = await auth();
  let user = null;
  let role = null;

  if (session?.user?.id) {
    user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    role = user?.role || null;
  }
  console.log("user", user);

  return (
    <div className="flex  2xl:container 2xl:w-full 2xl:mx-auto  items-center px-4 lg:px-20 text-lg pt-4 pb-3 justify-between">
      <Link href={"/"}>
        <Image
          src={Logo}
          alt="logo"
          width={50}
          height={50}
          className="bg-black w-[50px] h-[50px] p-4 rounded-full object-contain"
        />
      </Link>
      <div className="flex items-center max-sm:gap-5  gap-6">
        <ul className="flex items-center max-sm:hidden gap-6">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/blogs"}>Blogs</Link>
          </li>
        </ul>
        {role === "ADMIN" && (
          <Link className="" href={"/blogs/create"}>
            <Button className="bg-btn text-white max-sm:hidden cursor-pointer">
              Create
            </Button>
          </Link>
        )}
        {/* {role !== "ADMIN" && (
          <Button className="bg-btn text-white max-sm:hidden cursor-pointer">
            Subscribe
          </Button>
        )} */}
        <Dialog>
          <DialogTrigger asChild>
            <button title="Search cursor-pointer">
              <CiSearch className="cursor-pointer text-[#5d5d5d] max-sm:size-8 size-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white  max-sm:max-w-[425px] md:max-w-2xl max-sm:top-6 top-20 max-sm:translate-y-1/2 md:translate-y-0">
            <DialogHeader className="text-left">
              <DialogTitle className="">Search Blogs</DialogTitle>
            </DialogHeader>
            <SearchForm />
          </DialogContent>
        </Dialog>

        {session && session.user ? (
          <ProfileDropdown user={user} />
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
    // <div className="flex  2xl:container 2xl:w-full 2xl:mx-auto  items-center px-4 lg:px-20 text-lg pt-4 pb-3 justify-between">
    //   <Link href={"/"}>
    //     <Image
    //       src={Logo}
    //       alt="logo"
    //       width={50}
    //       height={50}
    //       className="bg-black w-[50px] h-[50px] p-4 rounded-full object-contain"
    //     />
    //   </Link>
    //   <div className="flex items-center max-sm:gap-5  gap-6">
    //     <ul className="flex items-center max-sm:hidden gap-6">
    //       <li>
    //         <Link href={"/"}>Home</Link>
    //       </li>
    //       <li>
    //         <Link href={"/blogs"}>Blogs</Link>
    //       </li>
    //     </ul>
    //     {role === "ADMIN" && (
    //       <Link className="" href={"/blogs/create"}>
    //         <Button className="bg-btn text-white max-sm:hidden cursor-pointer">
    //           Create
    //         </Button>
    //       </Link>
    //     )}
    //     {role !== "ADMIN" && <SubscribeDialog user={user} />}
    //     <Dialog>
    //       <DialogTrigger asChild>
    //         <button title="Search cursor-pointer">
    //           <CiSearch className="cursor-pointer text-[#5d5d5d] max-sm:size-8 size-6" />
    //         </button>
    //       </DialogTrigger>
    //       <DialogContent className="bg-white  max-sm:max-w-[425px] md:max-w-2xl max-sm:top-6 top-20 max-sm:translate-y-1/2 md:translate-y-0">
    //         <DialogHeader className="text-left">
    //           <DialogTitle className="">Search Blogs</DialogTitle>
    //         </DialogHeader>
    //         <SearchForm />
    //       </DialogContent>
    //     </Dialog>

    //     {user ? (
    //       <ProfileDropdown user={user} />
    //     ) : (
    //       <Link href="/login">
    //         <Button className="bg-secondary border border-[#c9c8cc] cursor-pointer">
    //           Login
    //         </Button>
    //       </Link>
    //     )}
    //     <div className="sm:hidden">
    //       <BurgerMenu />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;
