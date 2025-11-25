/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Stall } from "../types";

interface MapViewProps {
  stallMapImage: string | null;
  stalls: Stall[];
  selectedStalls: (number | null)[];
  setSelectedStalls: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  maxSelectable?: number;
}

const MapView: React.FC<MapViewProps> = ({
  stallMapImage,
  stalls,
  selectedStalls,
  setSelectedStalls,
  maxSelectable = 3,
}) => {
  const [hoverCard, setHoverCard] = useState<{
    leftPercent: number;
    topPercent: number;
    showAbove: boolean;
    stall: Stall | null;
    visible: boolean;
  }>({
    leftPercent: 0,
    topPercent: 0,
    showAbove: true,
    stall: null,
    visible: false,
  });

  const handleHoverEnter = (stall: Stall) => {
    const pos = stall.mapMetadata?.mapPosition;
    if (!pos) return;

    setHoverCard({
      leftPercent: pos.x,
      topPercent: pos.y,
      showAbove: pos.y > 18,
      stall,
      visible: true,
    });
  };

  const handleHoverLeave = () => {
    setHoverCard((h) => ({ ...h, visible: false }));
  };

  const handleSelect = (stall: Stall) => {
    if (!stall.available) return;

    setSelectedStalls((prev) => {
      if (prev.includes(stall.id)) {
        return prev.filter((id) => id !== stall.id);
      }

      if (prev.length >= maxSelectable) return prev;

      return [...prev, stall.id];
    });
  };

  return (
    <div className="flex-1 overflow-auto font-geist-sans beautiful-scrollbar bg-[#0b1220] rounded">
      {/* SAME STRUCTURE AS ADMIN */}
      <div className="relative w-full p-4">
        {stallMapImage ? (
          <img src={stallMapImage} alt="Map" className="w-full h-auto block" />
        ) : (
          <div className="w-full h-80 flex items-center justify-center text-gray-400">
            No map uploaded
          </div>
        )}

        {/* Stalls */}
        {stalls.map((stall) => {
          const meta = stall.mapMetadata;
          if (
            !meta?.mapPosition ||
            !meta.configured ||
            (meta.mapPosition.x === 0 && meta.mapPosition.y === 0)
          )
            return null;

          const isSelected = selectedStalls.includes(stall.id);

          const shape = meta.mapShape ?? "circle";
          const widthPercent = meta.mapWidthPercent ?? 3;
          const heightPercent = meta.mapHeightPercent ?? widthPercent;
          const rotation = meta.mapRotation ?? 0;

          return (
            <div
              key={stall.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${meta.mapPosition.x}%`,
                top: `${meta.mapPosition.y}%`,
                width: `${widthPercent}%`,
                height: `${heightPercent}%`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
              onMouseEnter={() => handleHoverEnter(stall)}
              onMouseLeave={handleHoverLeave}
              onClick={() => handleSelect(stall)}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: shape === "circle" ? 9999 : 6,
                  background: !stall.available
                    ? "linear-gradient(135deg, #4b5563, #374151)"
                    : isSelected
                      ? "linear-gradient(135deg, #ec4899, #f472b6)"
                      : "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  border: isSelected
                    ? "3px solid #fde047"
                    : "2px solid rgba(255,255,255,0.3)",
                  boxShadow: isSelected
                    ? "0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(244, 114, 182, 0.4)"
                    : stall.available
                      ? "0 4px 12px rgba(59, 130, 246, 0.3)"
                      : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  opacity: stall.available ? 1 : 0.6,
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
                className="hover:scale-110"
              >
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #fde047",
                      boxShadow: "0 2px 8px rgba(16, 185, 129, 0.6)",
                      zIndex: 10,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
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
                )}
                <span style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                  {stall.id}
                </span>
              </div>
            </div>
          );
        })}

        {/* Hover Card */}
        {hoverCard.visible && hoverCard.stall && (
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
                {selectedStalls.includes(hoverCard.stall.id) && (
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
                )}
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"></div>
              <div
                className={`text-xs font-bold flex items-center gap-1.5 ${
                  hoverCard.stall.available
                    ? "text-emerald-300"
                    : "text-red-400"
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
                {hoverCard.stall.available
                  ? selectedStalls.includes(hoverCard.stall.id)
                    ? "Selected"
                    : "Click to select"
                  : "Not available"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
