"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/lib/generated/prisma";
import { ImSpinner } from "react-icons/im";
import axios from "axios";

type ProfileFormProps = {
  user: User | null;
  closeForm: () => void;
};
const ProfileForm = ({ closeForm, user }: ProfileFormProps) => {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put("/api/profile", {
        name,
        bio,
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        router.refresh();
        closeForm();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-2xl">
      <Input
        type="text"
        placeholder=""
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Textarea
        className="min-h-32 max-h-32"
        placeholder="Write about yourself"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <div className="flex justify-end items-center gap-2">
        <Button
          onClick={closeForm}
          type="button"
          className="bg-black text-white hover:bg-black/90"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          type="submit"
          className="border border-[#dadada] hover:bg-[#f0f0f0] px-4 py-2 rounded-md"
        >
          {loading ? (
            <ImSpinner className="animate-spin" />
          ) : (
            <span> Save</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
