import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Logo from "../public/logo.png";
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
      <ul className="flex iteme-center  gap-10">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>Blogs</Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <FaXTwitter className="size-6" />
        <FaYoutube className="size-6" />
        <FaInstagram className="size-6" />
      </div>
      <div className="h-0.5 w-full bg-[#ffd1dc]"></div>
      <p className="text-center text-sm">
        &copy; copyright 2025 Blog App. All Right Reserved
      </p>
    </footer>
  );
};

export default Footer;
