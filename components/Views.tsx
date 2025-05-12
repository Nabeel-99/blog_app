"use client";

import { getPostViews, incrementPostViews } from "@/lib/action";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const Views = ({ slug }: { slug: string }) => {
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const hasIncremented = useRef(false);

  useEffect(() => {
    const recordView = async () => {
      setLoading(true);
      try {
        const viewedPosts = JSON.parse(
          localStorage.getItem("viewedPosts") || "[]"
        );

        if (!viewedPosts.includes(slug) && !hasIncremented.current) {
          hasIncremented.current = true;
          const data = await incrementPostViews(slug);
          setViews(data.views);
          localStorage.setItem(
            "viewedPosts",
            JSON.stringify([...viewedPosts, slug])
          );
        } else {
          const data = await getPostViews(slug);
          setViews(data.views);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    recordView();
  }, [slug]);
  // update views count

  return (
    <div className="relative ">
      {loading ? (
        <Skeleton className="rounded-xl h-10 w-20 bg-[#6e6e6e]" />
      ) : (
        <>
          <div className="bg-[#2c2a32] px-4 py-2 text-white rounded-2xl flex items-center gap-1 justify-center">
            <span>{views} </span> <span>View(s)</span>
          </div>
          <div className="absolute -top-1 shadow-2xl  drop-shadow-4xl drop-shadow-green-400 -right-1 w-4 h-4 p-2 flex items-center justify-center rounded-full bg-green-600">
            <div className="h-full w-full bg-green-400 animate-pulse p-2 rounded-full"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Views;
