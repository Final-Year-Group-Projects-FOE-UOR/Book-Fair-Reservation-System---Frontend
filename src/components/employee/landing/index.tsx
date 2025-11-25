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

const EmployeeLanding = () => {
  const router = useRouter();

  return (
    <AnimatedBackground className="items-center justify-center">
      <div className="flex flex-col w-full items-center justify-start px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-6 animate-book-open">
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
              <span className="text-blue-300 text-xs sm:text-sm font-semibold whitespace-nowrap">
                Employee Access Portal
              </span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 animate-sparkle shrink-0" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-3 sm:gap-4">
              <Library className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-blue-400 animate-floating-book shrink-0" />
              Employee Portal
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 flex items-center justify-center gap-2 flex-wrap text-center px-2">
              <BookMarked className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
              Employee Dashboard for Managing Reservations
              <BookMarked className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
            </p>
          </div>

          {/* Card */}
          <button
            onClick={() => router.push("/employee/login")}
            className="group relative w-full bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl hover:shadow-blue-500/30 transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 hover:border-blue-500/40 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute bottom-0 left-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <Library className="w-28 h-28 sm:w-40 sm:h-40 text-blue-400 animate-floating-book" />
            </div>

            <div className="relative flex flex-col items-center space-y-5 sm:space-y-6">
              {/* Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-5 sm:p-6 lg:p-8 rounded-full group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/50">
                  <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" />
                </div>
              </div>

              {/* Text */}
              <div className="text-center px-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
                  Login to Dashboard
                </h2>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                  Secure access for authorized personnel only
                </p>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
                  <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  Analytics Dashboard
                </span>
                <span className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
                  <BookMarked className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  Detailed Reports
                </span>
                <span className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
                  <Library className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  Reservation Management
                </span>
              </div>

              {/* Arrow CTA */}
              <div className="mt-2 sm:mt-4 text-blue-400 group-hover:translate-x-2 transition-transform flex items-center gap-2">
                <span className="text-base sm:text-lg font-semibold">
                  Access Dashboard
                </span>
                <svg
                  className="w-5 h-5 sm:w-7 sm:h-7"
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

          {/* Bottom Banner */}
          <div className="mt-6 sm:mt-12 bg-gradient-to-r from-[#2a2f4a]/60 to-[#1e2337]/60 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 shrink-0" />
              <div className="text-center">
                <div className="text-white font-bold text-sm sm:text-base">
                  Secure Employee Access
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Authorized personnel only — Contact IT for access credentials
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default EmployeeLanding;
