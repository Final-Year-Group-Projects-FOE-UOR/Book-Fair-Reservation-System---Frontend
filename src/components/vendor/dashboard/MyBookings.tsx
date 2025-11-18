"use client";

import { CheckCircle, X } from "lucide-react";
import React from "react";
import { Stall } from "./types";

interface MyBookingsProps {
  myReservations: Stall[];
  onCancel: (stallId: string | null) => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({
  myReservations,
  onCancel,
}) => {
  if (myReservations.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                Your Bookings
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {myReservations.map(stall => (
                  <div key={stall.id} className={`rounded-xl p-4 border-2 ${
                    stall.pending 
                      ? 'bg-orange-500/10 border-orange-500/40' 
                      : 'bg-green-500/10 border-green-500/30'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-lg font-bold text-white">{stall.id}</div>
                        <div className="text-sm text-gray-400">{stall.size}</div>
                        {stall.pending && (
                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-xs text-orange-400 font-semibold">⏳ Pending Approval</span>
                          </div>
                        )}
                        {stall.reserved && !stall.pending && (
                          <div className="mt-2 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400 font-semibold">Approved</span>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Cancel ${stall.pending ? 'request' : 'reservation'} for ${stall.id}?`)) {
                            onCancel(stall.id);
                          }
                        }}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  );
};

export default MyBookings;
