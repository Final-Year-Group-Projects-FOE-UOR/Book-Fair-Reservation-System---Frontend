"use client";
import React from "react";
import {
  Target,
  Eye,
  CheckCircle,
  Users,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";

export type Stall = {
  id: string;
  size: "small" | "medium" | "large";
  reserved: boolean;
  isEmpty: boolean;
};

type Props = {
  stalls: Stall[];
  stats: { total: number; reserved: number; available: number };
  vendorsCount: number;
};

// Progress Circle Component
const ProgressCircle = ({
  percentage,
  size = 140,
  strokeWidth = 10,
  color = "pink",
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: "pink" | "blue" | "green" | "orange";
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    pink: { from: "#ec4899", to: "#8b5cf6" },
    blue: { from: "#3b82f6", to: "#06b6d4" },
    green: { from: "#10b981", to: "#84cc16" },
    orange: { from: "#f97316", to: "#fb923c" },
  };

  const colors = colorMap[color];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient
            id={`gradient-${color}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </linearGradient>
          <filter id={`glow-${color}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#gradient-${color})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter={`url(#glow-${color})`}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{percentage}%</div>
          <div className="text-xs text-gray-400">Capacity</div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({
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
}) => {
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
};

// Main Dashboard Component
export default function StallDashboard({ stalls, stats, vendorsCount }: Props) {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            icon={<Target className="w-5 h-5 text-white" />}
            label="Total Stalls"
            value={stats.total}
            trend="+5%"
            color="blue"
          />
          <StatCard
            icon={<Eye className="w-5 h-5 text-white" />}
            label="Available"
            value={stats.available}
            color="green"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5 text-white" />}
            label="Reserved"
            value={stats.reserved}
            trend="+12%"
            color="pink"
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-white" />}
            label="Vendors"
            value={vendorsCount}
            trend="+8%"
            color="orange"
          />
        </div>

        {/* Progress and Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Booking Progress */}
          <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
            <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Booking Progress
            </div>
            <div className="flex justify-center mb-4">
              <ProgressCircle
                percentage={Math.round(
                  (stats.reserved / Math.max(stats.total, 1)) * 100
                )}
                size={140}
                strokeWidth={10}
                color="pink"
              />
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">Stalls Reserved</div>
              <div className="text-lg font-bold text-white">
                {stats.reserved} of {stats.total}
              </div>
            </div>
          </div>

          {/* Stall Sizes */}
          <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
            <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Stall Sizes
            </div>
            <div className="space-y-4">
              {["small", "medium", "large"].map((size, idx) => {
                const count = stalls.filter(
                  (s) => s.size === size && !s.isEmpty
                ).length;
                const reserved = stalls.filter(
                  (s) => s.size === size && s.reserved
                ).length;
                const percentage = count > 0 ? (reserved / count) * 100 : 0;
                const colors = [
                  "from-blue-500 to-cyan-600",
                  "from-pink-500 to-purple-600",
                  "from-orange-500 to-amber-600",
                ];

                return (
                  <div key={size}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-300 capitalize font-medium">
                        {size}
                      </span>
                      <span className="text-xs text-gray-400">
                        {reserved}/{count}
                      </span>
                    </div>
                    <div className="h-2 bg-[#1a1f37] rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors[idx]} transition-all duration-1000 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

