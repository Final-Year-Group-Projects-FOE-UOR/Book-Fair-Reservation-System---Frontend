"use client";

import React from "react";
import { HoverCardProps } from "./types";

const HoverCard: React.FC<HoverCardProps> = ({ hoverCard }) => {
  if (!hoverCard.visible || !hoverCard.stall) return null;

  return (
    <div
      className="absolute z-50 max-w-xs"
      style={{
        left: `${hoverCard.leftPercent}%`,
        top: hoverCard.showAbove
          ? `${hoverCard.topPercent - 6}%`
          : `${hoverCard.topPercent + 6}%`,
        transform: hoverCard.showAbove
          ? "translate(-50%, -100%)"
          : "translate(-50%, 0)",
        pointerEvents: "none",
      }}
    >
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-2 border-white/20 text-white rounded-xl shadow-2xl p-4 w-72 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="font-bold text-base text-white mb-1">
              {hoverCard.stall.stallName}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {hoverCard.stall.type}
              </span>
              <span className="text-sm font-bold text-cyan-300">
                Rs. {hoverCard.stall.price}
              </span>
            </div>
          </div>
          {/* {isSelected && (
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-1.5 shadow-lg">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )} */}
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"></div>
        <div
          className={`text-xs font-bold flex items-center gap-1.5 ${
            hoverCard.stall.available ? "text-emerald-300" : "text-red-400"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              hoverCard.stall.available ? "bg-emerald-400" : "bg-red-500"
            }`}
            style={{
              boxShadow: hoverCard.stall.available
                ? "0 0 8px rgba(52, 211, 153, 0.8)"
                : "0 0 8px rgba(239, 68, 68, 0.8)",
            }}
          ></span>
          {hoverCard.stall.available ? "Available" : "Not available"}
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
