import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

const BlogCard = () => {
  return (
    <div className="flex flex-col max-sm:px-3 gap-4">
      <img
        src={
          "https://viitorcloud.com/blog/wp-content/uploads/2022/03/How-AI-is-Making-Video-Games-More-Immersive.jpg"
        }
        alt="AI"
        className="rounded-2xl h-[260px] lg:h-[360px] w-full object-cover"
      />
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          {" "}
          <span className="font-bold">Travel</span>
          <span className="text-[#655f5f]">13 March 2023</span>
        </div>
        <div className="flex items-center gap-1">
          <FaEye className="text-[#151515]" />
          <span className="text-[#655f5f]">135</span>
        </div>
      </div>
      <h1 className="text-xl font-bold">
        How AI is Making Video Games More Immersive
      </h1>
      <p className=" line-clamp-3">
        AI is making video games more immersive, according to a new study. The
        study, published in the Journal of Visualized Experiments, found that
        artificial intelligence (AI) can enhance the player experience by
        creating more engaging and immersive environments.
      </p>
      <Link href={"/blogs/1"} className="text-[#7c4ee4] underline">
        Read More...
      </Link>
    </div>
  );
};

export default BlogCard;
