"use client";
import React from "react";
import { TrendingUp } from "lucide-react";

export default function StatCard({
  icon,
  label,
  value,
  trend,
  color = "blue",
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  trend?: string;
  color?: "blue" | "green" | "pink" | "orange";
}) {
  const colorMap = {
    blue: "from-blue-500/20 to-cyan-600/20 border-blue-500/30",
    pink: "from-pink-500/20 to-purple-600/20 border-pink-500/30",
    green: "from-green-400/20 to-emerald-500/20 border-green-400/30",
    orange: "from-orange-500/20 to-amber-600/20 border-orange-500/30",
  };

  const iconColorMap = {
    blue: "from-blue-500 to-cyan-600",
    pink: "from-pink-500 to-purple-600",
    green: "from-green-400 to-emerald-500",
    orange: "from-orange-500 to-amber-600",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} border backdrop-blur-sm p-4 sm:p-6 rounded-2xl group hover:scale-105 transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`bg-gradient-to-br ${iconColorMap[color]} p-3 rounded-xl shadow-lg`}
        >
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            {trend}
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {value}
        </div>
        <div className="text-sm text-gray-300">{label}</div>
      </div>
    </div>
  );
}
