"use client";
import React from "react";
import { Stall } from "../stall-configuration/types";

type Props = {
  stalls: Stall[];
  hoveredStall: string | null;
  setHoveredStall: (id: string | null) => void;
};

export default function StallSelector({
  stalls,
  hoveredStall,
  setHoveredStall,
}: Props) {
  // Group stalls by type
  const smallStalls = stalls.filter((stall) => stall.type === "SMALL");
  const mediumStalls = stalls.filter((stall) => stall.type === "MEDIUM");
  const largeStalls = stalls.filter((stall) => stall.type === "LARGE");

  const renderStallButtons = (stallList: Stall[]) => {
    return stallList.map((stall) => {
      const isHovered = hoveredStall === stall.id;
      const isConfigured = stall.mapMetadata?.configured;
      const base = "px-2 w-10 py-1 rounded text-xs font-bold transition";

      // two distinct color styles:
      // hovered -> orange, configured -> green, default -> muted
      const styleClass = isHovered
        ? "bg-orange-500 text-white ring-2 ring-orange-400"
        : isConfigured
          ? "bg-emerald-500 text-white ring-2 ring-emerald-400"
          : "bg-[#2a2f4a] text-gray-300 hover:bg-[#3a3f5a]";

      return (
        <button
          key={stall.id}
          type="button"
          onClick={() => setHoveredStall(stall.id ?? null)}
          className={`${base} ${styleClass}`}
          aria-pressed={isHovered}
          title={stall.id}
        >
          {stall.id}
        </button>
      );
    });
  };

  return (
    <div className="mt-3 font-geist-sans flex flex-col gap-4">
      {/* Small Stalls */}
      {smallStalls.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Small Stalls ({smallStalls.length})
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {renderStallButtons(smallStalls)}
          </div>
        </div>
      )}

      {/* Medium Stalls */}
      {mediumStalls.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Medium Stalls ({mediumStalls.length})
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {renderStallButtons(mediumStalls)}
          </div>
        </div>
      )}

      {/* Large Stalls */}
      {largeStalls.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Large Stalls ({largeStalls.length})
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {renderStallButtons(largeStalls)}
          </div>
        </div>
      )}
    </div>
  );
}
