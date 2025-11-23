"use client";
import React from "react";
import {
  Sparkles,
  Bookmark,
  Feather,
  MapPin,
  Users,
} from "lucide-react";

type AnimatedHeaderProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function AnimatedHeader({ icon, title, description }: AnimatedHeaderProps) {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex items-center gap-3">
        <div className="bg-linear-to-br from-blue-500 to-cyan-600 p-2 rounded-xl shadow-lg shadow-blue-500/50 relative">
          {icon}
          <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-sparkle" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {title}
            <Bookmark className="w-6 h-6 text-blue-400 animate-bookmark-drop" />
          </h2>
          <p className="text-[12px] text-gray-400 flex items-center gap-1">
            <Feather className="w-3 h-3 text-cyan-400" />
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
