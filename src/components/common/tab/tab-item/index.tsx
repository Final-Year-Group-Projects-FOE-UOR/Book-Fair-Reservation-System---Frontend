"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type TabItemProps = {
  tabName: string;
  icon: React.ReactNode;
  label: string;
};
const TabItem = ({ tabName, icon, label }: TabItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive =
    pathname.split("/")[1] === tabName ||
    pathname.split("/").slice(0, 3).join("/") === `/${tabName}`;

  const handletabNameChange = () => {
    router.push(`/${tabName}`);
  };

  return (
    <button
      type="button"
      onClick={handletabNameChange}
      className={`px-6 cursor-pointer  py-3 font-semibold transition-all rounded-t-xl relative ${tabName === "booking" || tabName === "employee/booking-requests" ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
    >
      <div className="flex items-center font-geist-sans gap-2">
        {icon}
        <span className="sm:flex hidden">{label}</span>
      </div>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 to-purple-600 rounded-full"></div>
      )}
    </button>
  );
};

export default TabItem;
