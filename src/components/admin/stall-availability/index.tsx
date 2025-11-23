"use client";

import React, { useState } from 'react'
import { Stall } from '../reservations/types';
import StallCard from './StallCard';

const StallAvailability = () => {
  const [stalls, setStalls] = useState<Stall[]>(() => {
    const savedStalls = localStorage.getItem("tradeHallStalls");
    return savedStalls ? JSON.parse(savedStalls) : [];
   });
  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {stalls
          .filter((s) => !s.isEmpty)
          .map((stall) => (
            <StallCard key={stall.id} stall={stall} />
          ))}
      </div>
    </div>
  );
}

export default StallAvailability