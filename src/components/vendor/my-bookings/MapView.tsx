/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Stall } from "../types";
import { CalendarDays, QrCode } from "lucide-react";
import { Reservation } from "./types";

interface MapViewProps {
  stallMapImage: string | null;
  reservations: Reservation[];
}

const MapView: React.FC<MapViewProps> = ({
  stallMapImage,
  reservations,
}) => {
  const [hoverCard, setHoverCard] = useState<{
    leftPercent: number;
    topPercent: number;
    showAbove: boolean;
    reservation: Reservation | null;
    visible: boolean;
  }>({
    leftPercent: 0,
    topPercent: 0,
    showAbove: true,
    reservation: null,
    visible: false,
  });

  const handleHoverEnter = (reservation: Reservation) => {
    const pos = reservation.stall.mapMetadata?.mapPosition;
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
    <div className="flex-1 overflow-auto font-geist-sans beautiful-scrollbar bg-[#0b1220] rounded">
      {/* SAME STRUCTURE AS ADMIN */}
      <div className="relative w-full p-4">
        {stallMapImage ? (
          <img src={stallMapImage} alt="Map" className="w-full h-auto block" />
        ) : (
          <div className="w-full h-80 flex items-center justify-center text-gray-400">
            No map uploaded
          </div>
        )}

        {/* Stalls */}
        {reservations.map((reservation) => {
          const stall = reservation.stall;
          const meta = stall.mapMetadata;
          if (
            !meta?.mapPosition ||
            !meta.configured ||
            (meta.mapPosition.x === 0 && meta.mapPosition.y === 0)
          )
            return null;

          const shape = meta.mapShape ?? "circle";
          const widthPercent = meta.mapWidthPercent ?? 3;
          const heightPercent = meta.mapHeightPercent ?? widthPercent;
          const rotation = meta.mapRotation ?? 0;

          return (
            <div
              key={stall.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${meta.mapPosition.x}%`,
                top: `${meta.mapPosition.y}%`,
                width: `${widthPercent}%`,
                height: `${heightPercent}%`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
              onMouseEnter={() => handleHoverEnter(reservation)}
              onMouseLeave={handleHoverLeave}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: shape === "circle" ? 9999 : 6,
                  background: "linear-gradient(135deg, #ec4899, #f472b6)",
                  border: "3px solid #fde047",
                  boxShadow:
                    "0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(244, 114, 182, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  opacity: 1,
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
                className="hover:scale-110"
              >
                <span style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                  {stall.id}
                </span>
              </div>
            </div>
          );
        })}

        {/* Hover Card */}
        {hoverCard.visible && hoverCard.reservation && (
          <div
            className="absolute z-50 max-w-xs"
            style={{
              left: `${hoverCard.leftPercent}%`,
              top: hoverCard.showAbove
                ? `${hoverCard.topPercent - 6}%`
                : `${hoverCard.topPercent + 6}%`,
              transform: hoverCard.showAbove
                ? "translate(-50%, -100%)"
                : "translate(-50%, 0)",
              pointerEvents: "auto", // enabled so QR button is clickable
            }}
          >
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-2 border-white/20 text-white rounded-xl shadow-2xl p-4 w-72 backdrop-blur-sm">
              {/* Stall Name */}
              <div className="font-bold text-base text-white mb-1">
                {hoverCard.reservation.stall.stallName}
              </div>

              {/* Type + Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {hoverCard.reservation.stall.type}
                </span>
                <span className="text-sm font-bold text-cyan-300">
                  Rs. {hoverCard.reservation.stall.price}
                </span>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3" />

              {/* Reservation Date */}
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="text-xs text-gray-300">
                  {hoverCard.reservation.reservationDate
                    ? new Date(
                        hoverCard.reservation.reservationDate,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>

              {/* Status */}
              <div
                className={`text-xs font-bold flex items-center gap-1.5 mb-3 ${
                  hoverCard.reservation.status === "CONFIRMED"
                    ? "text-emerald-300"
                    : "text-orange-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    hoverCard.reservation.status === "CONFIRMED"
                      ? "bg-emerald-400"
                      : "bg-orange-400"
                  }`}
                  style={{
                    boxShadow:
                      hoverCard.reservation.status === "CONFIRMED"
                        ? "0 0 8px rgba(52, 211, 153, 0.8)"
                        : "0 0 8px rgba(251, 146, 60, 0.8)",
                  }}
                />
                {hoverCard.reservation.status === "CONFIRMED"
                  ? "Confirmed"
                  : "Pending Approval"}
              </div>


            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
