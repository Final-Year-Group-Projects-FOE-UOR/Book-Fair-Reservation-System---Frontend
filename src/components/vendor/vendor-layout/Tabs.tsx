"use client";

import TabItem from "@/components/common/tab/tab-item";
import { BookOpen, Calendar, User } from "lucide-react";
import { usePathname } from "next/navigation";

const Tabs = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/").slice(0, 3).join("/");
  const currentTab = currentPath === "/booking"
    ? "Book Stalls"
    : currentPath === "/profile"
    ? "My Profile"
    : "My Bookings";

  return (
    <>
      <div className="flex sm:justify-start justify-center  gap-4 mb-6 border-b border-white/10">
        <TabItem
          tabName={"my-bookings"}
          icon={<BookOpen className="w-5 h-5" />}
          label="My Bookings"
        />
        <TabItem
          tabName={"booking"}
          icon={<Calendar className="w-5 h-5" />}
          label="Book Stalls"
        />
        <TabItem
          tabName={"profile"}
          icon={<User className="w-5 h-5" />}
          label="My Profile"
        />
      </div>
      <div className="font-geist-sans font-semibold sm:hidden text-white mt-[-10px] mb-[10px] text-center">
        {currentTab}
      </div>
    </>
  );
};

export default Tabs;
