import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="pb-10 w-full ">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
