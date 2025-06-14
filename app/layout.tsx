import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "IdiaWrites",
  description: "Blog by Idia Writes",
  icons: {
    icon: "/logo.png",
  },
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
            className: "!z-[99999]",
          }}
          richColors
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
