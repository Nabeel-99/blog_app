import { auth } from "@/auth";
import React from "react";
import { FaPencil } from "react-icons/fa6";
import { Button } from "./ui/button";

const ProfileCard = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col lg:flex-row items-start  gap-6">
      <div className="flex gap-6  w-full">
        <img
          src={session?.user?.image}
          alt="avatar"
          className="h-full max-sm:h-[80px] max-sm:w-[80px] md:h-[200px] md:w-[200px] w-full object-cover rounded-full"
        />

        <div className="flex flex-col gap-2 lg:flex-row  mt-4 lg:items-start lg:justify-between w-full">
          <p className="text-xl lg:text-3xl font-bold">{session?.user?.name}</p>
          <div className="">
            <Button className="bg-btn rounded-xl ">
              <FaPencil className="size-3" />
              <span className="">Edit</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
