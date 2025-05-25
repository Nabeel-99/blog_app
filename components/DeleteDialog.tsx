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

import { toast } from "sonner";
import { ImSpinner } from "react-icons/im";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
          <AlertDialogCancel
            disabled={loading}
            className="bg-black text-white hover:bg-black/90"
          >
            No
          </AlertDialogCancel>
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="border border-[#dadada] hover:bg-[#f0f0f0] px-4 py-2 rounded-md"
          >
            {loading ? (
              <ImSpinner className="animate-spin" />
            ) : (
              <span>Yes</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
