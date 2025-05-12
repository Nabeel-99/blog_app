"use client";
import React, { useState } from "react";

import { Input } from "./ui/input";

import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/lib/generated/prisma";
import { DialogClose } from "./ui/dialog";
import { LuBellRing } from "react-icons/lu";

type Props = {
  isSubscribed?: boolean;
};
const NewsLetter = ({ isSubscribed }: Props) => {
  const [email, setEmail] = useState("");
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

      if (response.status === 200) {
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
    <div className="lg:px-20 bg-background max-sm:h-[380px] md:h-[430px] lg:h-[560px] p-4 lg:p-26 overflow-hidden relative border text-white flex flex-col items-center justify-center gap-10 ">
      <div className="absolute max-sm:hidden -top-24 left-0">
        <img
          src={"/mark.svg"}
          alt="Spirals"
          className="w-full -z-10 opacity-5 "
        />
      </div>
      <div className="absolute max-sm:hidden -bottom-24 -z-0 -right-20">
        <img
          src={"/mark.svg"}
          alt="Spirals"
          className="w-full -z-10 opacity-5 rotate-180 "
        />
      </div>
      <div className=" md:max-w-xl lg:max-w-3xl text-center mx-auto">
        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl font-bold">
          Subscribe to our newsletter
        </h1>
        <p className=" mt-4">
          Read articles from us directly inside your inbox. Subscribe to the
          newsletter, and don't miss out.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center gap-4"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-10 w-full lg:w-lg bg-white py-6 text-black"
          />

          <button
            disabled={loading}
            type="submit"
            className="border border-[#dadada] hover:bg-[#efefef] hover:text-black mt-10 h-full py-3 px-6 rounded-xl "
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
