/* eslint-disable @next/next/no-img-element */
"use client";

import { Stall } from "@/components/vendor/types";
import React, { useState } from "react";
import { MapViewProps, HoverCardState } from "./types";
import StallMarker from "./StallMarker";
import HoverCard from "./HoverCard";
import { Reservation } from "@/components/vendor/my-bookings/types";

const MapView: React.FC<MapViewProps> = ({
  stallMapImage,
  reservations,
}) => {
  const [hoverCard, setHoverCard] = useState<HoverCardState>({
    leftPercent: 0,
    topPercent: 0,
    showAbove: true,
    reservation: null,
    visible: false,
  });

  const handleHoverEnter = (reservation: Reservation) => {
    const stall = reservation.stall;
    const pos = stall.mapMetadata?.mapPosition;
    if (!pos) return;

    setHoverCard({
      leftPercent: pos.x,
      topPercent: pos.y,
      showAbove: pos.y > 18,
      reservation,
      visible: true,
    });
  };

  const handleHoverLeave = () => {
    setHoverCard((h) => ({ ...h, visible: false }));
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
        {reservations.map((reservation) => (
          <StallMarker
            key={reservation.stall.id}
            reservation={reservation}
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
