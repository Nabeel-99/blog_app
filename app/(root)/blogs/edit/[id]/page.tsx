import BlogForm from "@/components/BlogForm";
import React from "react";

const page = () => {
  return (
    <div className=" px-20 py-20 flex flex-col gap-10 items-center h-full">
      <h1 className="text-6xl font-bold">Edit Blog</h1>
      <BlogForm />
    </div>
  );
};

export default page;
