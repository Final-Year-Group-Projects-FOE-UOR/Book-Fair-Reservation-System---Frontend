"use client";

import React, { useState } from "react";
import { Stall } from "../reservations/types";
import RequestCard from "./RequestCard";

const BookingRequests = () => {
  const [stalls, setStalls] = useState<Stall[]>(() => {
    const savedStalls: Stall[] = [
      {
        "id": "A1",
        "size": "medium",
        "isEmpty": false,
        "reserved": false,
        "pending": true,
        "businessName": "Tech Solutions",
        "email": "contact@techsolutions.com",
        "requestDate": new Date().toISOString(),
      }
    ]
    return savedStalls;
  });
  const pendingRequests = stalls.filter((s) => s.pending);

  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      {pendingRequests.length === 0 ? (
        <div className="bg-[#1a1f37]/50 border border-white/10 rounded-xl p-6 sm:p-8 text-center text-gray-400">
          No pending requests at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {pendingRequests.map((stall) => (
            <RequestCard key={stall.id} stall={stall} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingRequests;
