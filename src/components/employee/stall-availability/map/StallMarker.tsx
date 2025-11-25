"use client";

import React from "react";
import { StallMarkerProps } from "./types";

const StallMarker: React.FC<StallMarkerProps> = ({
  stall,
  onHoverEnter,
  onHoverLeave,
}) => {
  const meta = stall.mapMetadata;
  if (
    !meta?.mapPosition ||
    !meta.configured ||
    (meta.mapPosition.x === 0 && meta.mapPosition.y === 0)
  )
    return null;

  const shape = meta.mapShape ?? "circle";
  const widthPercent = meta.mapWidthPercent ?? 3;
  const heightPercent = meta.mapHeightPercent ?? widthPercent;
  const rotation = meta.mapRotation ?? 0;

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{
        left: `${meta.mapPosition.x}%`,
        top: `${meta.mapPosition.y}%`,
        width: `${widthPercent}%`,
        height: `${heightPercent}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      onMouseEnter={() => onHoverEnter(stall)}
      onMouseLeave={onHoverLeave}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: shape === "circle" ? 9999 : 6,
          background: stall.available ? "linear-gradient(135deg, #3b82f6, #06b6d4)" : "linear-gradient(135deg, #ef4444, #dc2626)",
          border: "2px solid rgba(255,255,255,0.3)",
          boxShadow: stall.available
            ? "0 4px 12px rgba(59, 130, 246, 0.3)"
            : "0 0 8px rgba(239, 68, 68, 0.8)", // "0 0 8px rgba(239, 68, 68, 0.8)"
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.65rem",
          transition: "all 0.2s ease",
          position: "relative",
        }}
        className="hover:scale-110"
      >
        <span style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
          {stall.id}
        </span>
      </div>
    </div>
  );
};

export default StallMarker;
