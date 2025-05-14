"use client";

import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Button } from "./ui/button";
import ProfileForm from "./ProfileForm";
import { User } from "@/lib/generated/prisma";
import Image from "next/image";

type ProfileCardProps = {
  user: User | null;
  subscribers?: number;
};
const ProfileCard = ({ user, subscribers }: ProfileCardProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const openForm = () => setOpenEdit(!openEdit);
  const closeForm = () => setOpenEdit(false);

  return (
    <div className="flex flex-col lg:flex-row items-start  gap-6">
      <div className="flex gap-6  w-full">
        <Image
          width={200}
          height={200}
          src={user?.image!}
          alt="avatar"
          className="h-full max-sm:h-[80px] max-sm:w-[80px] md:h-[200px] md:w-[200px] w-full object-cover rounded-full"
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2 lg:flex-row  mt-4 lg:items-start lg:justify-between w-full">
            {openEdit ? (
              <span className="text-xl font-bold">Edit profile</span>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-xl lg:text-3xl font-bold">{user?.name}</p>
                {user?.role === "ADMIN" && (
                  <p className="text-[#636363] font-bold">
                    Newsletter Subscribers:{" "}
                    <span className="text-black">{subscribers}</span>
                  </p>
                )}
              </div>
            )}

            <div className="">
              <Button onClick={openForm} className="bg-btn rounded-xl ">
                <FaPencil className="size-3" />
                <span className="">Edit</span>
              </Button>
            </div>
          </div>
          {openEdit ? (
            ""
          ) : (
            <div className="flex max-sm:hidden flex-col gap-2">
              <p className=" text-[#636363] font-bold">About me</p>
              {user?.bio ? (
                <p className="">{user?.bio}</p>
              ) : (
                <p className="italic text-gray-300">No bio</p>
              )}
            </div>
          )}

          {openEdit && <ProfileForm user={user} closeForm={closeForm} />}
        </div>
      </div>
      <div className="flex sm:hidden flex-col gap-2">
        <p className=" text-[#636363] font-bold">About me</p>
        {user?.bio ? (
          <p className="">{user?.bio}</p>
        ) : (
          <p className="italic text-gray-300">No bio</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
