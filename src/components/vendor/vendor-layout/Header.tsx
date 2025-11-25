"use client";

import { BookOpen, LogOut} from "lucide-react";
import { VendorInfo } from "../types";
import AnimatedHeader from "@/components/common/headers/AnimatedHeader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface VendorHeaderProps {
  vendorInfo: VendorInfo;
}

const VendorHeader = ({
  vendorInfo,
}: VendorHeaderProps) => {

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("email");
    Cookies.remove("role");
    Cookies.remove("mapUrl");
    router.push("/auth/login");
  }

  return (
    <div className="flex justify-between font-geist-sans items-center mb-6">
      <AnimatedHeader
        icon={<BookOpen className="sm:w-8 sm:h-8 h-6 w-6 text-white animate-floating-book" />}
        title={`Welcome, ${vendorInfo.businessName}!`}
        description="Manage and review booking requests"
      />
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="sm:px-6 cursor-pointer px-3 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
        >
          <LogOut className="sm:w-5 sm:h-5 w-4 h-4" />
          <span className="sm:flex hidden">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default VendorHeader;
