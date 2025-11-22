"use client";
import React from "react";
import { BookOpen, Sparkles, Bookmark, Feather, LogOut } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex items-center gap-3">
        <div className="bg-linear-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg shadow-blue-500/50 relative">
          <BookOpen className="w-8 h-8 text-white animate-floating-book" />
          <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-sparkle" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            Admin Dashboard
            <Bookmark className="w-6 h-6 text-blue-400 animate-bookmark-drop" />
          </h2>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            <Feather className="w-3 h-3 text-cyan-400" />
            Manage and monitor bookfair reservations
          </p>
        </div>
      </div>
      
    </div>
  );
}