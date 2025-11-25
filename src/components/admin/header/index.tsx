"use client";

import { Menu } from "lucide-react";
import React, { useState } from "react";
import AdminSidebar from "../sidebar";

type AdminHeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  children?: React.ReactNode;
};

const AdminHeader = ({
  sidebarOpen,
  setSidebarOpen,
  children,
}: AdminHeaderProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const openSidebar = () => setIsHidden(true);

  const closeSidebar = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsHidden(false);
      setIsAnimatingOut(false);
    }, 350);
  };

  return (
    <>
      <div className="w-full font-geist-sans bg-linear-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] fixed top-0 left-0 h-20 flex items-center justify-between border-b border-white/10 px-8 z-80">
        <div
          className={`${
            sidebarOpen ? "md:pl-64 pl-0" : "md:pl-20 pl-0"
          } flex items-center justify-center h-full`}
        >
          {children}
        </div>
        <button
          onClick={openSidebar}
          className="text-gray-400 md:hidden hover:text-white transition p-2 hover:bg-white/5 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {isHidden && (
        <div className="fixed inset-0 z-[999] md:hidden">
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-350 ease-in-out ${
              isAnimatingOut ? "opacity-0" : "opacity-100"
            }`}
            onClick={closeSidebar}
          />

          <div
            className={`absolute top-0 left-0 h-full shadow-2xl shadow-black/50
              transition-transform duration-350 ease-in-out
              ${isAnimatingOut ? "-translate-x-full" : "translate-x-0"}`}
          >
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-1.5 h-16 bg-white/20 rounded-full z-10" />

            <AdminSidebar
              sidebarOpen={true}
              isHidden={isHidden}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
