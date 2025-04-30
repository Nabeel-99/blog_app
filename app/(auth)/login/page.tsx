import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { redirect } from "next/navigation";
import Link from "next/link";
const page = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="flex items-center px-6 bg-[#eeeded] justify-center h-full">
      <div className="border border-[#cbcbcb] bg-[#f0efef]  p-10  xl:w-xl  shadow-md rounded-2xl flex flex-col items-center  lg:p-6">
        <h1 className="text-2xl font-extrabold">Blog App</h1>
        <p className="font-bold text-2xl mt-16">Log in or sign up</p>
        <div className="flex flex-col gap-6 mt-10">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
            className=""
          >
            <Button className="flex py-6 gap-0 hover:bg-[#e8e8e8]  rounded-full text-lg px-3 w-full lg:w-sm border border-[#dadada] items-center ">
              <span className="">
                <FaGoogle className="size-5" />
              </span>{" "}
              <span className="ml-4">Continue with Google</span>
            </Button>
          </form>
          {/* <form
            action={async () => {
              "use server";
              await signIn("twitter");
            }}
            className=""
          >
            <Button className="flex py-6 gap-0  bg-black hover:bg-black/80 rounded-full text-lg px-3 w-full lg:w-sm border text-white items-center ">
              <span className="">
                <FaXTwitter className="size-5" />
              </span>{" "}
              <span className="ml-4">Continue with Twitter</span>
            </Button>
          </form> */}
          <form
            action={async () => {
              "use server";
              await signIn("linkedin");
            }}
            className="pb-10"
          >
            <Button className="flex py-6 gap-0 bg-blue-700 hover:bg-blue-600 rounded-full text-lg px-3 w-full lg:w-sm border text-white items-center ">
              <span className="">
                <FaLinkedinIn className="size-5 ml-2" />
              </span>{" "}
              <span className="ml-4">Continue with LinkedIn</span>
            </Button>
          </form>
        </div>
        <Link href={"/"} className="mt-10 text-blue-800 hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default page;
