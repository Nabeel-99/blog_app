import React from "react";
import { Input } from "./ui/input";

const NewsLetter = () => {
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
        <div className="flex items-center justify-center gap-4">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="mt-10 w-full lg:w-lg bg-white py-6 text-black"
          />
          <button className="border border-[#dadada] hover:bg-[#efefef] hover:text-black mt-10 h-full py-3 px-6 rounded-xl ">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
