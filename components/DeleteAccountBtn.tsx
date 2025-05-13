"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import { Button } from "./ui/button";

import axios from "axios";
import { toast } from "sonner";

import { signOutAction } from "@/lib/action";

const DeleteAccountBtn = () => {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete("/api/profile");
      if (response.status === 200) {
        toast.success("Account deleted successfully");

        setOpen(false);
        await signOutAction();
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting account");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-600 mt-2 hover:bg-red-500 w-[150px] rounded-xl text-white">
          Delete account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black text-white hover:bg-black/90">
            No
          </AlertDialogCancel>
          <Button
            onClick={handleDelete}
            className="border border-[#dadada] hover:bg-[#f0f0f0] px-4 py-2 rounded-md"
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountBtn;
