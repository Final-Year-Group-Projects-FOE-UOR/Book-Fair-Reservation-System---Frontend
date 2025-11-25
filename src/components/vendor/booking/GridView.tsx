"use client";

import React from "react";
import { Stall, VendorInfo } from "../types";
import GridButton from "./GridButton";

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
    <div className="flex flex-wrap w-full justify-center gap-4 sm:mb-8 mb-16">
      {stalls.map((stall) => {
        const isSelected = selectedStalls.includes(stall.id);

        return (
          <GridButton
            isSelected={isSelected}
            key={stall.id}
            stall={stall}
            handleStallClick={handleStallClick}
          />
        );
      })}
    </div>
  );
};

export default GridView;
