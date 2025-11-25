"use client";

import { BookOpen, LogOut } from "lucide-react";
import AnimatedHeader from "@/components/common/headers/AnimatedHeader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const EmployeeHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("email");
    Cookies.remove("role");
    router.push("/auth/login");
  };

  return (
    <div className="flex justify-between font-geist-sans items-center mb-6">
      <AnimatedHeader
        icon={<BookOpen className="w-8 h-8 text-white animate-floating-book" />}
        title={`Welcome Back!`}
        description="Manage and review booking requests"
      />
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default EmployeeHeader;
