"use client";
import React from "react";
import ProgressCircle from "./ProgressCircle";
import StatCard from "./StatCard";
import { Target, Eye, CheckCircle, Users, LayoutDashboard } from "lucide-react";

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
                      />
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
