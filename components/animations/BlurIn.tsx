"use client";
import { motion, useInView } from "motion/react";
import * as React from "react";

export const BlurIn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
