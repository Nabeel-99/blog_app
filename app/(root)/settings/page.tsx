import React, { Suspense } from "react";
import { TbDeviceDesktop } from "react-icons/tb";
import { CiBrightnessDown } from "react-icons/ci";
import { IoMoonSharp } from "react-icons/io5";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
const Page = async () => {
  return (
    <div className="lg:px-20 2xl:container 2xl:w-full 2xl:mx-auto mt-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Settings</h1>
        <div className="flex flex-col border rounded-xl border-[#dadada] p-4 lg:p-20  gap-10">
          <div className="flex items-center gap-6">
            <p className="text-xl">Theme</p>
            <div className="flex items-center gap-5 border border-[#cbcbcb] rounded-full p-2">
              <div className="flex  rounded-full p-1 flex-col items-center gap-1">
                <TbDeviceDesktop className="size-5" />
              </div>
              <div className="flex  rounded-full p-1 flex-col items-center gap-1">
                <CiBrightnessDown className="size-5" />
              </div>
              <div className="flex  rounded-full p-1 flex-col items-center gap-1">
                <IoMoonSharp className="size-5" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p>Delete Account</p>
            <span className="text-sm">
              Deleting your account is permanent and cannot be undone. This will
              remove your profile and all of your related data.
            </span>
            <Button className="bg-red-600 hover:bg-red-500 w-[200px] rounded-xl text-white">
              Delete account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
