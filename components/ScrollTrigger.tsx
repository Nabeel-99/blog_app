"use client";

import React, { useEffect, useRef, useState } from "react";
import SubscribeDialog from "./SubscribeDialog";
import { User } from "@/lib/generated/prisma";

type Props = {
  user: User | null;
  isSubscribed?: boolean;
};
const ScrollTrigger = ({ user, isSubscribed }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(
    typeof window !== "undefined" &&
      sessionStorage.getItem("subscribeDialogShown") === "true"
  );
  useEffect(() => {
    if (isSubscribed || user?.role === "ADMIN") return;
    if (hasBeenShown) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isDialogOpen && !hasBeenShown) {
          setIsDialogOpen(true);
          setHasBeenShown(true);
          sessionStorage.setItem("subscribeDialogShown", "true");
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isDialogOpen, hasBeenShown]);
  return (
    <>
      <div ref={containerRef} className="h-1" />
      <SubscribeDialog
        user={user}
        isSubscribed={isSubscribed}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
      />
    </>
  );
};

export default ScrollTrigger;
