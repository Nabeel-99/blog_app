"use client";

import React, { useState } from "react";

import { Input } from "./ui/input";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import axios from "axios";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
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
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:px-20 bg-background max-sm:h-[380px] md:h-[430px] lg:h-[560px] p-4 lg:p-26 overflow-hidden relative  text-[#1A2A44] flex flex-col items-center justify-center gap-10 ">
      <div className="absolute max-sm:hidden  -top-24 left-0">
        <Image
          src={"/mark.svg"}
          width={500}
          height={300}
          alt="Spirals"
          priority={false}
          className=" -z-10 opacity-30 "
          style={{ width: "100% " }}
        />
      </div>
      <div className="absolute max-sm:hidden -bottom-24   -right-20">
        <Image
          src={"/mark.svg"}
          width={500}
          height={300}
          alt="Spirals"
          priority={false}
          className="-z-10 opacity-30 rotate-180 "
          style={{ width: "100% " }}
        />
      </div>
      <div className=" md:max-w-xl z-30  lg:max-w-2xl 2xl:max-w-5xl text-center mx-auto">
        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl font-bold">
          Subscribe to our newsletter
        </h1>
        <p className=" mt-4">
          Read articles from us directly inside your inbox. Subscribe to the
          newsletter, and don't miss out.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex  items-center mt-10  justify-center  gap-4"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className=" w-full lg:w-lg border-[#dadada] bg-white py-6 text-black"
          />

          <Button
            disabled={loading}
            type="submit"
            className="border cursor-pointer border-[#1A2A44] bg-[#1A2A44] hover:bg-[#2B3A55] text-white h-full py-3 px-6 rounded-xl "
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
