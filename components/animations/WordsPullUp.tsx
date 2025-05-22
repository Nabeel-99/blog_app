"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
const WordsPullUp = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const splittedText = text.split("");
  const pullupVariant = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="flex justify-center">
      {splittedText.map((current, i) => (
        <motion.div
          key={i}
          ref={ref}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : ""}
          className={cn("", className)}
          custom={i}
        >
          {current === " " ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
};

export default WordsPullUp;
