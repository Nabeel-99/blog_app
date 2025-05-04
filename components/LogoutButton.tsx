import { signOutAction } from "@/lib/action";
import React from "react";

const LogoutButton = () => {
  return (
    <form action={signOutAction} className="w-full flex justify-start">
      <button
        type="submit"
        className="w-full text-left px-2.5 py-1 rounded-xl hover:bg-[#e8e8e8]"
      >
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
