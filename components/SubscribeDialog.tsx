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
  open?: boolean;
  setOpen: (open: boolean) => void;
  isSubscribed?: boolean | null;
};
const SubscribeDialog = ({ user, open, setOpen, isSubscribed }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white p-10   max-sm:max-w-[425px] md:max-w-xl max-sm:top-6 top-20 max-sm:translate-y-1/2 md:translate-y-0">
        <DialogHeader className="text-left">
          <DialogTitle className="">Subscribe to our newsletter</DialogTitle>
        </DialogHeader>
        <SubscribeForm user={user} isSubscribed={isSubscribed} />
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeDialog;
