/* eslint-disable @next/next/no-img-element */
"use client";

import { Stall } from "@/components/vendor/types";
import React, { useState } from "react";
import { MapViewProps, HoverCardState } from "./types";
import StallMarker from "./StallMarker";
import HoverCard from "./HoverCard";

const MapView: React.FC<MapViewProps> = ({
  stallMapImage,
  stalls,
  selectedStalls,
  setSelectedStalls,
  maxSelectable = 3,
}) => {
  const [hoverCard, setHoverCard] = useState<HoverCardState>({
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
    <div className="flex md:min-w-full min-w-[1000px] overflow-auto font-geist-sans beautiful-scrollbar bg-[#0b1220] rounded">
      <div className="relative w-full p-4">
        {stallMapImage ? (
          <img src={stallMapImage} alt="Map" className="w-full h-auto block" />
        ) : (
          <div className="w-full h-80 flex items-center justify-center text-gray-400">
            No map uploaded
          </div>
        )}

        {/* Stalls */}
        {stalls.map((stall) => (
          <StallMarker
            key={stall.id}
            stall={stall}
            onHoverEnter={handleHoverEnter}
            onHoverLeave={handleHoverLeave}
          />
        ))}

        {/* Hover Card */}
        <HoverCard hoverCard={hoverCard} />
      </div>
    </div>
  );
};

export default MapView;
