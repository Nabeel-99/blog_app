import BlogForm from "@/components/BlogForm";
import React from "react";

const Page = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20 py-20 flex flex-col gap-10 items-center h-full">
      <h1 className="text-6xl font-bold">Create Blog</h1>
      <BlogForm />
    </div>
  );
};

export default Page;
