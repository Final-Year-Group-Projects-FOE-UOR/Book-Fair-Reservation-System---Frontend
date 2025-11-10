"use client";

import { Book, Bookmark, BookMarked, BookOpen, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const LoginCard = () => {
 const router = useRouter();
 const handleCardClick = () => {
   router.push('/auth/login');
 }
  return (
    <div className="grid  md:grid-cols-1 gap-8">
      {/* Vendor Portal Card - Full Width */}
      <button
        onClick={handleCardClick}
        className="group relative cursor-pointer bg-linear-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl hover:shadow-pink-500/30 transform hover:scale-105 transition-all duration-300 hover:border-pink-500/40 overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-pink-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Book Page Effect */}
        <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
          <BookMarked className="w-32 h-32 text-pink-400 animate-page-flip" />
        </div>

        <div className="relative flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-pink-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-linear-to-br from-pink-500 to-purple-600 p-6 rounded-full group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/50">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Vendor Portal
            </h2>
            <p className="text-gray-300 text-center mb-4">
              Reserve your stalls and manage your exhibition space
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-pink-500/20 border border-pink-500/30 text-pink-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Book className="w-3 h-3" />
              Interactive Map
            </span>
            <span className="bg-purple-500/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Bookmark className="w-3 h-3" />
              Instant Booking
            </span>
            <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Real-time Updates
            </span>
          </div>

          {/* Arrow indicator */}
          <div className="mt-4 text-pink-400 group-hover:translate-x-2 transition-transform">
            <svg
              className="w-6 h-6"
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
  );
}

export default LoginCard