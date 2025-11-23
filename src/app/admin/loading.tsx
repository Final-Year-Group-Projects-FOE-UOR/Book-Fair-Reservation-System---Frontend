"use client";
import React from "react";
import { Loader2, Sparkles } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1a1f37] via-[#4a1b2d] to-[#1a1f37] flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75 animation-delay-200"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75 animation-delay-400"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75 animation-delay-600"></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Spinning loader with gradient */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-full p-8 border border-white/10 shadow-2xl">
            <Loader2 className="w-16 h-16 text-white animate-spin" />
            <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white animate-pulse">
            Loading
          </h2>
          <p className="text-sm text-gray-400">
            Please wait while we prepare everything...
          </p>
        </div>

        {/* Animated progress bar */}
        <div className="w-64 h-2 bg-[#1a1f37] rounded-full overflow-hidden border border-white/10">
          <div className="h-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0.5;
          }
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </div>
  );
}