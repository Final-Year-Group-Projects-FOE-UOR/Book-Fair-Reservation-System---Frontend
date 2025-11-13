"use client";
import React from "react";
import type { Stall } from "./types";
import { MapPin } from "lucide-react";

export default function StallGrid({
  stalls,
  setStalls,
}: {
  stalls: Stall[];
  setStalls: React.Dispatch<React.SetStateAction<Stall[]>>;
}) {
  return (
    <div>
      {/* Map Legend */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="flex items-center gap-2 bg-[#1a1f37]/50 rounded-xl p-3 border border-white/5">
          <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded shadow-lg shadow-green-500/30"></div>
          <span className="text-xs text-gray-300 font-medium">Available</span>
        </div>
        <div className="flex items-center gap-2 bg-[#1a1f37]/50 rounded-xl p-3 border border-white/5">
          <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded shadow-lg"></div>
          <span className="text-xs text-gray-300 font-medium">Reserved</span>
        </div>
        <div className="flex items-center gap-2 bg-[#1a1f37]/50 rounded-xl p-3 border border-white/5">
          <div className="w-6 h-6 border-2 border-dashed border-gray-500 rounded"></div>
          <span className="text-xs text-gray-300 font-medium">Hallway</span>
        </div>
      </div>

      {/* Stall Grid */}
      <div className="grid grid-cols-10 gap-2 p-4 bg-[#1a1f37]/30 rounded-2xl">
        {stalls.map((stall, idx) => {
          if (stall.isEmpty) {
            return (
              <div
                key={`empty-${idx}`}
                className="aspect-square border-2 border-dashed border-gray-600 rounded-lg"
                aria-hidden
              />
            );
          }

          const reserved = !!stall.reserved;
          const stallClasses = `aspect-square rounded-lg font-semibold text-sm flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-default ${
            reserved
              ? "bg-linear-to-br from-gray-600 to-gray-700 text-gray-300"
              : "bg-linear-to-br from-green-400 to-emerald-500 text-white shadow-green-500/30"
          }`;

          return (
            <button
              key={stall.id ?? `stall-${idx}`}
              type="button"
              className={stallClasses}
              title={stall.id ?? "Hallway"}
              onClick={() => {
                setStalls((prev) =>
                  prev.map((s, i2) =>
                    i2 === idx && !s.isEmpty
                      ? {
                          ...s,
                          reserved: !s.reserved,
                          businessName: !s.reserved ? `Vendor ${s.id}` : null,
                          email: !s.reserved
                            ? `vendor${s.id?.toLowerCase()}@example.com`
                            : null,
                        }
                      : s
                  )
                );
              }}
            >
              <span className="text-xs font-bold">{stall.id}</span>
              <span className="text-[10px] mt-0.5 opacity-75">
                {stall.size ? stall.size[0].toUpperCase() : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}