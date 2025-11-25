"use client";

import { useRouter } from "next/navigation";

type TabItemProps = {
  vendorHomeTab: string;
  icon: React.ReactNode;
  label: string;
}
const TabItem = ({ vendorHomeTab, icon, label }: TabItemProps) => {
 const router = useRouter();

 const handleVendorHomeTabChange = () => {
    router.push(`/${vendorHomeTab}`);
 }
  return (
    <button
      type="button"
      onClick={handleVendorHomeTabChange}
      className={`px-6  py-3 font-semibold transition-all rounded-t-xl relative ${vendorHomeTab === "booking" ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
    >
      <div className="flex items-center font-geist-sans gap-2">
        {icon}
        {label}
      </div>
      {vendorHomeTab === window.location.pathname.split("/")[1] && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 to-purple-600 rounded-full"></div>
      )}
    </button>
  );
}

export default TabItem