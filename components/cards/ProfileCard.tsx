"use client";

import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Button } from "../ui/button";

import { User } from "@/lib/generated/prisma";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import ProfileForm from "../forms/ProfileForm";

type ProfileCardProps = {
  user: User | null;
  subscribers?: number;
};
const ProfileCard = ({ user, subscribers }: ProfileCardProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const openForm = () => setOpenEdit((prev) => !prev);
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
                <div className="flex items-center gap-6">
                  <p className="text-xl lg:text-3xl font-bold">{user?.name}</p>
                  {user?.role === "ADMIN" && (
                    <Link
                      href={"https://x.com/idiawrites"}
                      target={"_blank"}
                      aria-label="twitter"
                      rel="noreferrer noopener"
                      className="hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      <FaXTwitter className="size-6" />
                    </Link>
                  )}
                </div>

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
