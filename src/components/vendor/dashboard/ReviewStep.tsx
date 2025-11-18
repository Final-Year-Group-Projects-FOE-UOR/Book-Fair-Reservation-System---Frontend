"use client";

import { Bookmark, CheckCircle, X } from "lucide-react";
import React from "react";
import {  VendorInfo } from "./types";
import { Stall } from "./GenerateInitialStalls";

interface ReviewStepProps {
  selectedStallObjects: Stall[];
  vendorInfo: VendorInfo;
  genres: string[];
  selectedStalls: (string | null)[];
  onSubmit?: () => void;
  handleRemoveStallClick: (stall: Stall) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  selectedStallObjects,
  vendorInfo,
  genres,
  onSubmit,
handleRemoveStallClick
}) => {

  return (
    <div className="bg-gradient-to-br from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Bookmark className="w-6 h-6 text-pink-400" />
        Review Selection
      </h3>
      {selectedStallObjects.length === 0 ? (
        <p className="text-gray-400">
          No stalls selected. Go back to selection.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {selectedStallObjects.map((stall) => (
            <div
              key={stall.id}
              className="p-4 rounded-xl border border-pink-500/40 bg-pink-500/10 relative"
            >
              <div className="text-lg font-bold text-white">{stall.id}</div>
              <div className="text-xs text-gray-300 mb-2">{stall.size}</div>
              <button
                type="button"
                onClick={()=>
                  handleRemoveStallClick(stall) 
                }
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-4">
        <div className="bg-[#1e2337] rounded-xl p-4 text-sm text-gray-300 border border-white/10">
          <p>
            <span className="text-pink-400 font-semibold">Business:</span>{" "}
            {vendorInfo.businessName || "Not set"}
          </p>
          <p>
            <span className="text-pink-400 font-semibold">Email:</span>{" "}
            {vendorInfo.email || "Not set"}
          </p>
          <p>
            <span className="text-pink-400 font-semibold">Genres:</span>{" "}
            {genres.length ? genres.join(", ") : "None added"}
          </p>
        </div>
        <button
          type="button"
          disabled={
            selectedStallObjects.length === 0 ||
            !vendorInfo.businessName ||
            !vendorInfo.email
          }
          onClick={onSubmit}
          className={`w-full py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            selectedStallObjects.length === 0 ||
            !vendorInfo.businessName ||
            !vendorInfo.email
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
          }`}
        >
          <CheckCircle className="w-5 h-5" /> Submit Booking Request
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
