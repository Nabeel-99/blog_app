import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signInWithGoogle, signInWithLinkedIn } from "@/lib/action";
import Image from "next/image";
const page = async () => {
  const session = await auth();

  if (session) redirect("/");
  return (
    <div className="flex relative items-center px-6 overflow-hidden bg-[#eeeded] justify-center h-full">
      <div className="absolute bottom-0 -right-20">
        <Image
          src={"/logo.webp"}
          alt="logo"
          width={1050}
          height={510}
          style={{
            opacity: 0.2,
          }}
          className="bg-background  -z-10 rounded-full"
        />
      </div>
      <div className="border z-20 border-[#cbcbcb] bg-[#f0efef]  p-10  xl:w-xl  shadow-md rounded-2xl flex flex-col items-center  lg:p-6">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={"/logo.webp"}
            alt="logo"
            width={100}
            height={100}
            className="bg-background rounded-full  "
          />
          <h1 className="text-2xl font-extrabold">IdiaWrites</h1>
        </div>

        <p className="font-bold text-2xl mt-16">Choose a sign-in method</p>
        <div className="flex flex-col gap-6 mt-10">
          <form action={signInWithGoogle} className="">
            <Button className="flex py-6 gap-0 hover:bg-[#e8e8e8]  rounded-full text-lg px-3 w-full lg:w-sm border border-[#dadada] items-center ">
              <span className="">
                <FaGoogle className="size-5" />
              </span>{" "}
              <span className="ml-4">Sign in with Google</span>
            </Button>
          </form>

          <form action={signInWithLinkedIn} className="pb-10">
            <Button className="flex py-6 gap-0 bg-blue-700 hover:bg-blue-600 rounded-full text-lg px-3 w-full lg:w-sm border text-white items-center ">
              <span className="">
                <FaLinkedinIn className="size-5 ml-2" />
              </span>{" "}
              <span className="ml-4">Sign in with LinkedIn</span>
            </Button>
          </form>
        </div>
        <Link
          aria-label="Back to home"
          href={"/"}
          className="mt-10 text-blue-800 hover:underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default page;
