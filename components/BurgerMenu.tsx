"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  return (
    <>
      <Button onClick={openMenu} className="bg-white border border-[#dadada]">
        {isOpen ? (
          <FaXmark className="size-6" />
        ) : (
          <HiOutlineBars3CenterLeft className="size-6" />
        )}
      </Button>
      {isOpen && (
        <div className="inset-0 top-17 absolute px-4 z-20 bg-white ">
          <ul className="flex flex-col items-start pt-4 gap-6">
            <li>
              <Link onClick={closeMenu} href={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} href={"/"}>
                Blogs
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} href={"/"}>
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
