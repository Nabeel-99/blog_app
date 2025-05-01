import React from "react";
import { Skeleton } from "./ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[260px] lg:h-[360px] w-full bg-[#dadada] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-[#dadada]" />
            <Skeleton className="h-4 w-[200px] bg-[#dadada]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCardSkeleton;
