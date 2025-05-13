"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/lib/generated/prisma";

import { LuBellRing } from "react-icons/lu";

type SubscribeFormProps = {
  user: User | null;
  setOpen?: (open: boolean) => void;
  isSubscribed?: boolean | null;
};
const SubscribeForm = ({ user, isSubscribed }: SubscribeFormProps) => {
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(isSubscribed || false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/subscribe", {
        email,
      });

      if (response.status === 201) {
        toast.success("Subscribed successfully");
        router.refresh();
        setSubscribed(true);
        setTimeout(() => {}, 4000);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col  max-sm:max-h-[200px] overflow-scroll hide-scrollbar  md:max-h-[300px]  gap-6">
        <p className="max-sm:text-sm lg:text-4xl">
          Read articles from us directly inside your inbox. Subscribe to the
          newsletter, and don't miss out.
        </p>
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-end">
          {subscribed ? (
            <div className="bg-white  p-2 rounded-lg border border-[#cbcbcb] text-black flex items-center gap-1">
              <LuBellRing className="size-5 text-[#7c3ee4]" />
              <span>Subscribed</span>
            </div>
          ) : (
            <Button disabled={loading} type="submit" className="bg-btn">
              Subscribe
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SubscribeForm;
