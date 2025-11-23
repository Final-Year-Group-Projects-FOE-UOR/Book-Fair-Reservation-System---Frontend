"use client";

import React, { useState } from 'react'
import { Stall } from './types';
import ReservationCard from './ReservationCard';

const Reservations = () => {
 const [stalls, setStalls] = useState<Stall[]>(() => {
  const savedStalls = localStorage.getItem("tradeHallStalls");
  return savedStalls ? JSON.parse(savedStalls) : [];
 });
 const reservedStalls = stalls.filter((s) => s.reserved && !s.pending);
  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      {reservedStalls.length === 0 ? (
        <div className="bg-[#1a1f37]/50 border border-white/10 rounded-xl p-8 text-center text-gray-400">
          No confirmed reservations yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reservedStalls.map((stall) => (
            <ReservationCard key={stall.id} stall={stall} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservations