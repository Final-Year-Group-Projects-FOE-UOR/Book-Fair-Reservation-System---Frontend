"use client";
import React from "react";

export default function ProgressCircle({
  percentage,
  size = 140,
  strokeWidth = 10,
  color = "pink",
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: "pink" | "blue" | "green" | "orange";
}) {
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
}
