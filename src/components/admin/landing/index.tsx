"use client";
import AnimatedBackground from "@/components/common/backgrounds/animated-background";
import {
  BookMarked,
  GraduationCap,
  LayoutDashboard,
  Library,
  Lock,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminLanding = () => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/admin/login");
  };

  return (
    <AnimatedBackground className="items-center justify-center">
      <div className="flex flex-col w-full items-center justify-start">
        <div className="max-w-6xl w-full relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30 px-4 py-2 rounded-full mb-6 animate-book-open">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">
                Admin Access Portal
              </span>
              <Sparkles className="w-4 h-4 text-blue-400 animate-sparkle" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-4">
              <Library className="w-16 h-16 text-blue-400 animate-floating-book" />
              Admin Portal
            </h1>
            <p className="text-xl text-gray-300 mb-8 flex items-center justify-center gap-2">
              <BookMarked className="w-5 h-5 text-cyan-400" />
              Admin Dashboard for Managing Reservations
              <BookMarked className="w-5 h-5 text-blue-400" />
            </p>
          </div>

          {/* Admin Portal Card */}
          <div className="grid md:grid-cols-1 gap-8">
            <button
              onClick={handleCardClick}
              className="group relative bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 hover:border-blue-500/40 overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Book Stack Effect */}
              <div className="absolute bottom-0 left-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <Library className="w-40 h-40 text-blue-400 animate-floating-book" />
              </div>

              <div className="relative flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-8 rounded-full group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/50">
                    <GraduationCap className="w-16 h-16 text-white" />
                  </div>
                </div>

                <div>
                  <h2 className="text-4xl font-bold text-white mb-3">
                    Login to Dashboard
                  </h2>
                  <p className="text-gray-300 text-center mb-6 text-lg">
                    Secure access for authorized personnel only
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Analytics Dashboard
                  </span>
                  <span className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <BookMarked className="w-4 h-4" />
                    Detailed Reports
                  </span>
                  <span className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Library className="w-4 h-4" />
                    Reservation Management
                  </span>
                </div>

                {/* Arrow indicator */}
                <div className="mt-6 text-blue-400 group-hover:translate-x-2 transition-transform flex items-center gap-2">
                  <span className="text-lg font-semibold">
                    Access Dashboard
                  </span>
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Bottom Info Banner */}
          <div className="mt-12 bg-gradient-to-r from-[#2a2f4a]/60 to-[#1e2337]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-center gap-4">
              <Lock className="w-6 h-6 text-blue-400" />
              <div className="text-center">
                <div className="text-white font-bold">
                  Secure Employee Access
                </div>
                <div className="text-sm text-gray-400">
                  Authorized personnel only - Contact IT for access credentials
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default AdminLanding;
