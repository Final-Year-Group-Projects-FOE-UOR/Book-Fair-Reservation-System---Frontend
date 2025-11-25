"use client";

import { Bookmark, CheckCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Stall, VendorInfo } from "../types";

interface ReviewStepProps {
  selectedStallObjects: Stall[];
  vendorInfo: VendorInfo;
  genres: string[];
  selectedStalls: (number | null)[];
  onSubmit?: () => void;
  handleRemoveStallClick: (stall: Stall) => void;
  goBack: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  selectedStallObjects,
  vendorInfo,
  genres,
  onSubmit,
  handleRemoveStallClick,
  goBack,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedStallObjects.length === 0) {
      goBack();
    }
  }, [selectedStallObjects]);

  const handleSubmit = async () => {
    if (onSubmit) {
      setLoading(true);
      await onSubmit();
      setLoading(false);
    }
  }

  

  return (
    <div className="bg-gradient-to-br font-geist-sans from-[#2a2f4a]/80 to-[#1e2337]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Bookmark className="w-6 h-6 text-pink-400" />
        Review Selection
      </h3>
      {selectedStallObjects.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {selectedStallObjects.map((stall) => (
            <div
              key={stall.id}
              className="p-4 rounded-xl border border-pink-500/40 bg-pink-500/10 relative"
            >
              <div className="text-lg font-bold text-white">
                {stall.stallName}
              </div>
              <div className="text-xs text-gray-300 mb-2">{stall.type}</div>
              <button
                type="button"
                onClick={() => handleRemoveStallClick(stall)}
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
            loading ||
            selectedStallObjects.length === 0 ||
            !vendorInfo.businessName ||
            !vendorInfo.email
          }
          onClick={handleSubmit}
          className={`w-full py-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${
            loading ||
            selectedStallObjects.length === 0 ||
            !vendorInfo.businessName ||
            !vendorInfo.email
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Submit Booking Request</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
