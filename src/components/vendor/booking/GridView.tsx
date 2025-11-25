"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { Stall, VendorInfo } from "../types";

interface GridViewProps {
  stalls: Stall[];
  selectedStalls: (number | null)[];
  vendorInfo: VendorInfo;
  setSelectedStalls: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

const GridView: React.FC<GridViewProps> = ({
  stalls,
  selectedStalls,
  setSelectedStalls,
}) => {
  const handleStallClick = (stall: Stall) => {
    // cannot select unavailable stalls
    if (!stall.available) return;

    if (selectedStalls.includes(stall.id)) {
      setSelectedStalls((prev) => prev.filter((id) => id !== stall.id));
    } else if (selectedStalls.length < 3) {
      setSelectedStalls((prev) => [...prev, stall.id]);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      {stalls.map((stall) => {
        const isSelected = selectedStalls.includes(stall.id);

        return (
          <button
            key={stall.id}
            type="button"
            onClick={() => handleStallClick(stall)}
            disabled={!stall.available}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer
              ${
                !stall.available
                  ? "bg-gray-700/30 border-gray-600 cursor-not-allowed opacity-50"
                  : isSelected
                    ? "bg-pink-500/20 border-pink-500 scale-105"
                    : "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 hover:scale-105"
              }
            `}
          >
            <div className="text-center">
              {/* Stall Name */}
              <div className="text-lg font-bold text-white">
                {stall.stallName}
              </div>

              {/* Stall Type */}
              <div className="text-xs text-gray-400">{stall.type}</div>

              {/* Selected indicator */}
              {isSelected && (
                <div className="mt-2">
                  <CheckCircle className="w-5 h-5 text-pink-400 mx-auto" />
                  <div className="text-xs text-pink-400 mt-1">Selected</div>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default GridView;
