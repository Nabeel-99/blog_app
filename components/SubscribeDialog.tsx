"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/lib/generated/prisma";
import { Button } from "./ui/button";
import SubscribeForm from "./SubscribeForm";
import { LuBellRing } from "react-icons/lu";
type Props = {
  user: User | null;
};
const SubscribeDialog = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {user?.hasSubscribed ? (
          <Button className="bg-white border border-[#cbcbcb] text-black flex items-center gap-1">
            <LuBellRing className="size-5 text-[#7c3ee4]" />
            <span>Subscribed</span>
          </Button>
        ) : (
          <Button className="bg-btn text-white max-sm:hidden cursor-pointer">
            Subscribe
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white  max-sm:max-w-[425px] md:max-w-2xl max-sm:top-6 top-20 max-sm:translate-y-1/2 md:translate-y-0">
        <DialogHeader className="text-left">
          <DialogTitle className="">Subscribe to our newsletter</DialogTitle>
        </DialogHeader>
        <SubscribeForm user={user} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeDialog;
