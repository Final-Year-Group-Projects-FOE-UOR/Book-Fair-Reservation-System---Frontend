"use client";

import React from "react";
import { CheckCircle, Clock, QrCode, CalendarDays } from "lucide-react";
import { Reservation } from "./types";

interface GridViewProps {
  reservations: Reservation[];
}

const GridView: React.FC<GridViewProps> = ({ reservations }) => {
  const handleDownloadQR = (reservation: Reservation) => {
    // QR download logic here
    console.log("Downloading QR for", reservation.id);
  };


  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      {reservations.map((reservation, index) => {
        const isConfirmed = reservation.status === "CONFIRMED";
        const isPending = reservation.status === "PENDING";

        const formattedDate = reservation.reservationDate
          ? new Date(reservation.reservationDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "—";

        return (
          <div
            key={index}
            className={`relative p-4 rounded-xl border-2 transition-all flex flex-col gap-3
              ${
                isConfirmed
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-orange-500/10 border-orange-500/30"
              }
            `}
          >
            {/* Stall Name */}
            <div>
              <div className="text-base font-bold text-white leading-tight">
                {reservation.stall.stallName}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {reservation.stall.type}
              </div>
            </div>

            {/* Reservation Date */}
            <div className="flex items-center gap-1.5 text-xs text-gray-300">
              <CalendarDays className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{formattedDate}</span>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-1.5">
              {isConfirmed ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span className="text-xs font-semibold text-green-400">
                    Confirmed
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span className="text-xs font-semibold text-orange-400">
                    Pending Approval
                  </span>
                </>
              )}
            </div>

            {/* QR Download Button — only for confirmed */}
            {isConfirmed && (
              <button
                type="button"
                onClick={() => handleDownloadQR(reservation)}
                className="mt-auto flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg
                  bg-green-500/20 hover:bg-green-500/35 border border-green-500/40
                  text-green-300 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95"
              >
                <QrCode className="w-3.5 h-3.5" />
                Download QR
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GridView;
