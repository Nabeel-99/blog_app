import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../public/logo.webp";
const Footer = () => {
  return (
    <footer className="flex flex-col pb-10 items-center gap-10 mt-20 lg:px-20">
      <Image
        src={Logo}
        alt="logo"
        width={50}
        height={50}
        className=" w-[50px] h-[50px] bg-background rounded-full object-cover"
      />
      <ul className="flex items-center  gap-10">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>Blogs</Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <Link
          href={"https://x.com/idiawrites"}
          target={"_blank"}
          rel="noreferrer noopener"
          className="hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <FaXTwitter className="size-6" />
        </Link>
      </div>
      <div className="h-0.5 w-full bg-[#ffd1dc]"></div>
      <p className="text-center text-sm">
        &copy; copyright 2025 Blog App. All Right Reserved
      </p>
    </footer>
  );
};

export default Footer;
