"use client";

import React from "react";
import {
  CalendarDays,
  QrCode,
  CheckCircle,
  Clock,
  XCircle,
  User,
} from "lucide-react";
import { HoverCardProps } from "./types";

const statusConfig = {
  CONFIRMED: {
    label: "Confirmed",
    color: "text-emerald-300",
    dotColor: "bg-emerald-400",
    glow: "0 0 8px rgba(52, 211, 153, 0.8)",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  PENDING: {
    label: "Pending Approval",
    color: "text-orange-400",
    dotColor: "bg-orange-400",
    glow: "0 0 8px rgba(251, 146, 60, 0.8)",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "text-red-400",
    dotColor: "bg-red-500",
    glow: "0 0 8px rgba(239, 68, 68, 0.8)",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

const HoverCard: React.FC<HoverCardProps> = ({ hoverCard }) => {
  if (!hoverCard.visible || !hoverCard.reservation) return null;

  const { reservation } = hoverCard;
  const status = statusConfig[reservation.status];

  const formattedDate = reservation.reservationDate
    ? new Date(reservation.reservationDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
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
        pointerEvents: reservation.status === "CONFIRMED" ? "auto" : "none",
      }}
    >
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-2 border-white/20 text-white rounded-xl shadow-2xl p-4 w-72 backdrop-blur-sm">
        {/* Stall Name + Type + Price */}
        <div className="mb-3">
          <div className="font-bold text-base text-white mb-1">
            {reservation.stall.stallName}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {reservation.stall.type}
            </span>
            <span className="text-sm font-bold text-cyan-300">
              Rs. {reservation.stall.price}
            </span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3" />

        {/* User */}
        <div className="flex items-center gap-2 mb-3">
          <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-xs text-gray-300">{reservation.userEmail}</span>
        </div>
        {/* Reservation Date */}
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-xs text-gray-300">{formattedDate}</span>
        </div>

        {/* Status */}
        <div
          className={`flex items-center gap-1.5 text-xs font-bold mb-3 ${status.color}`}
        >
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${status.dotColor}`}
            style={{ boxShadow: status.glow }}
          />
          {status.icon}
          {status.label}
        </div>

        
      </div>
    </div>
  );
};

export default HoverCard;
