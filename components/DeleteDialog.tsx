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
import { FaTrash } from "react-icons/fa";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

type DeleteDialogProps = {
  message?: string;
  error?: string;
  refresh?: boolean;
  apiRoute?: string;
  comments?: boolean;
  replies?: boolean;
};
const DeleteDialog = ({
  message,
  error,
  refresh,
  apiRoute,
}: DeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(apiRoute || "");
      if (response.status === 200) {
        toast.success(message);
        refresh ? router.refresh() : router.push("/profile");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(error);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="border rounded-lg px-2 py-2 text-gray-500 border-[#dadada] hover:bg-black hover:text-white transition-all duration-300"
          title="delete"
        >
          <FaTrash className="size-4 " />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This {refresh ? "comment" : ""} will
            permanently delete the blog post.
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

export default DeleteDialog;
