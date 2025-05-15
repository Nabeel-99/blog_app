import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="markdown-it-fix" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined' && typeof window.isSpace === 'undefined') {
              window.isSpace = function(code) {
                return code === 0x20 || code === 0x09 || code === 0x0A || code === 0x0B || code === 0x0C || code === 0x0D;
              };
            }
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${workSans.variable} font-sans h-screen antialiased`}
      >
        {children}
        <Toaster
          toastOptions={{
            className: "!z-[9999]",
          }}
          richColors
        />
      </body>
    </html>
  );
}

// "use client"
// import { cn } from '@/lib/utils';
// import { motion, useInView } from 'framer-motion';
// import * as React from 'react';

// export function WordsPullUp({
//   text,
//   className = '',
// }: {
//   text: string;
//   className?: string;
// }) {
//   const splittedText = text.split(' ');

//   const pullupVariant = {
//     initial: { y: 20, opacity: 0 },
//     animate: (i: number) => ({
//       y: 0,
//       opacity: 1,
//       transition: {
//         delay: i * 0.1,
//       },
//     }),
//   };
//   const ref = React.useRef(null);
//   const isInView = useInView(ref, { once: true });
//   return (
//     <div className="flex justify-center">
//       {splittedText.map((current, i) => (
//         <motion.div
//           key={i}
//           ref={ref}
//           variants={pullupVariant}
//           initial="initial"
//           animate={isInView ? 'animate' : ''}
//           custom={i}
//           className={cn(
//             'text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]',
//             'pr-2', // class to sperate words
//             className
//           )}
//         >
//           {current == '' ? <span>&nbsp;</span> : current}
//         </motion.div>
//       ))}
//     </div>
//   );
// }
