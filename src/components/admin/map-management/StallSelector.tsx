"use client";
import React from "react";
import type { Stall } from "./types";

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
  const visible = stalls.filter((s) => !s.isEmpty && s.id);
  return (
    <div className="mt-3 font-geist-sans flex flex-wrap items-center justify-center gap-2">
      {visible.map((stall) => (
        <button
          key={stall.id}
          type="button"
          onClick={() => setHoveredStall(stall.id ?? null)}
          className={`px-2 w-10 py-1 rounded text-xs font-bold transition ${
            hoveredStall === stall.id
              ? "bg-orange-500 text-white ring-2 ring-orange-400"
              : "bg-[#2a2f4a] text-gray-300 hover:bg-[#3a3f5a]"
          }`}
        >
          {stall.id}
        </button>
      ))}
    </div>
  );
}
