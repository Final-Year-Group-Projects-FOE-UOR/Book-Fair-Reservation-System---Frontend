"use client";

import { CheckCircle } from "lucide-react";
import React from "react";
import { Stall, VendorInfo } from "./types";

interface GridViewProps {
  stalls: Stall[];
  selectedStalls: (string | null)[];
  vendorInfo: VendorInfo;
  setSelectedStalls: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}

const GridView: React.FC<GridViewProps> = ({
  stalls,
  selectedStalls,
  vendorInfo,
  setSelectedStalls
 
}) => {

      const handleStallClick = (stall: Stall) => {
      if (stall.reserved || stall.pending) return;
  
      if (selectedStalls.includes(stall.id)) {
        setSelectedStalls(selectedStalls.filter((id) => id !== stall.id));
      } else {
        if (selectedStalls.length < 3) {
          setSelectedStalls([...selectedStalls, stall.id]);
        }
      }
    };
  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      {stalls
        .filter((s) => !s.isEmpty)
        .map((stall) => {
          const isSelected = selectedStalls.includes(stall.id);
          const isMyReservation =
            stall.businessName === vendorInfo.businessName;
          const isMyPending = stall.pending && isMyReservation;
          return (
            <button
              key={stall.id}
              type="button"
              onClick={() => handleStallClick(stall)}
              disabled={(stall.reserved || stall.pending) && !isMyReservation}
              className={`p-4 rounded-xl border-2 transition-all ${
                isMyPending
                  ? "bg-orange-500/20 border-orange-500 cursor-default"
                  : isMyReservation
                  ? "bg-green-500/20 border-green-500 cursor-default"
                  : isSelected
                  ? "bg-pink-500/20 border-pink-500 scale-105"
                  : stall.reserved || stall.pending
                  ? "bg-gray-700/30 border-gray-600 cursor-not-allowed opacity-50"
                  : "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 hover:scale-105"
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-white">{stall.id}</div>
                <div className="text-xs text-gray-400">{stall.size}</div>
                {isMyPending && (
                  <div className="mt-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 mx-auto" />
                    <div className="text-xs text-orange-400 mt-1">Pending</div>
                  </div>
                )}
                {isMyReservation && !isMyPending && (
                  <div className="mt-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    <div className="text-xs text-green-400 mt-1">Approved</div>
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
