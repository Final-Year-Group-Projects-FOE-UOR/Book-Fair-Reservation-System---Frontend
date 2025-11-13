"use client";
import React from "react";
import ProgressCircle from "./ProgressCircle";
import { LayoutDashboard, Target } from "lucide-react";
import type { Stall } from "./types";

export default function Sidebar({
  stalls,
  stats,
}: {
  stalls: Stall[];
  stats: { total: number; reserved: number; available: number };
}) {
  return (
    <div className="space-y-6 font-geist-sans">
      <div className="bg-linear-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
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

      <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
        <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4" />
          Stall Sizes
        </div>
        <div className="space-y-3">
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

      <div className="bg-linear-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
        <div className="text-sm text-gray-400 mb-4">Quick Actions</div>
        <div className="space-y-2">
          <button className="w-full bg-linear-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30 text-blue-300 px-4 py-3 rounded-xl hover:from-blue-500/30 hover:to-cyan-600/30 transition text-sm font-semibold flex items-center justify-between group">
            <span>Export Report</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button className="w-full bg-linear-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 text-pink-300 px-4 py-3 rounded-xl hover:from-pink-500/30 hover:to-purple-600/30 transition text-sm font-semibold flex items-center justify-between group">
            <span>Send Notifications</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
