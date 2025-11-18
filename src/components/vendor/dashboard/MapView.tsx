"use client";

import { MapPin } from "lucide-react";
import React from "react";
import {  Stall, VendorInfo } from "./types";
import Image from "next/image";

interface MapViewProps {
  stallMapImage: string ;
  stalls: Stall[];
  selectedStalls: (string | null)[];
  vendorInfo: VendorInfo;
  setSelectedStalls: React.Dispatch<React.SetStateAction<(string | null)[]>>;

}

const MapView = ({stallMapImage,vendorInfo,stalls,selectedStalls,setSelectedStalls}:MapViewProps)=>{

  const handleMapClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!stallMapImage) return;

    const target = e.target as HTMLElement;
    const isImage = target.tagName === "IMG";
    if (!isImage) return;

    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    let nearestStall: Stall | null = null;
    let minDistance = 8;

    stalls.forEach((stall: Stall) => {
      if (!stall.mapPosition || stall.isEmpty) return;
      const distance = Math.sqrt(
        Math.pow(stall.mapPosition.x - x, 2) +
          Math.pow(stall.mapPosition.y - y, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestStall = stall;
      }
    });

    if (nearestStall !== null) {
      handleStallClick(nearestStall);
    }
  };

  const handleStallClick = (stall: Stall) => {
    if (stall.reserved || stall.pending) return;

    if (selectedStalls.includes(stall.id)) {
      setSelectedStalls(selectedStalls.filter((id) => id !== stall.id));
    } else {
      if (selectedStalls.length < 3) {
        setSelectedStalls([...selectedStalls, stall.id]);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-purple-400" />
        Trade Hall Floor Plan
      </h3>
      <div className="relative" onClick={handleMapClick}>
        <Image
          src={stallMapImage}
          alt="Trade Hall Map"
          width={960}
          height={700}
          className="w-full h-auto rounded-lg cursor-pointer"
        />
        {stalls.map((stall) => {
          if (!stall.mapPosition || stall.isEmpty) return null;
          const isSelected = selectedStalls.includes(stall.id);
          const isMyReservation =
            stall.businessName === vendorInfo.businessName;
          const isMyPending = stall.pending && isMyReservation;
          return (
            <div
              key={stall.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${stall.mapPosition.x}%`,
                top: `${stall.mapPosition.y}%`,
              }}
            >
              <div
                className={`w-10 h-10 rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all ${
                  isMyPending
                    ? "bg-orange-500 text-white ring-4 ring-orange-400/50 animate-pulse"
                    : isMyReservation
                    ? "bg-green-500 text-white ring-4 ring-green-400/50"
                    : isSelected
                    ? "bg-pink-500 text-white ring-4 ring-pink-400/50 scale-125"
                    : stall.reserved || stall.pending
                    ? "bg-gray-600 text-gray-400 opacity-50"
                    : "bg-blue-500 text-white hover:scale-110"
                }`}
              >
                <span className="text-[12px] leading-none">{stall.id}</span>
                <span className="text-[10px] opacity-75 leading-none mt-0.5">
                  {stall.size?.[0] ?? ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-6 mt-4 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full" />
          <span className="text-sm text-gray-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-500 rounded-full" />
          <span className="text-sm text-gray-300">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full" />
          <span className="text-sm text-gray-300">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-300">Approved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded-full" />
          <span className="text-sm text-gray-300">Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
