import React from 'react'
import { Stall } from '../types';
import { CheckCircle } from "lucide-react";

type GridButtonProps = {
  stall: Stall;
  handleStallClick: (stall: Stall) => void;
  isSelected: boolean;
};

const GridButton = ({ stall, handleStallClick, isSelected }: GridButtonProps) => {
  return (
    <button
      key={stall.id}
      type="button"
      onClick={() => handleStallClick(stall)}
      disabled={!stall.available}
      className={`sm:max-w-[300px] w-full p-3 sm:p-4 rounded-xl border-2 transition-all
        ${
          !stall.available
            ? "bg-gray-700/30 border-gray-600 cursor-not-allowed opacity-50"
            : isSelected
              ? "bg-pink-500/20 border-pink-500 scale-105 cursor-pointer"
              : "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 hover:scale-105 cursor-pointer"
        }
      `}
    >
      <div className="text-center">
        {/* Stall Name */}
        <div className="text-sm sm:text-base lg:text-lg font-bold text-white truncate">
          {stall.stallName}
        </div>

        {/* Stall Type */}
        <div className="text-xs sm:text-sm text-gray-400 truncate mt-0.5">
          {stall.type}
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div className="mt-1.5 sm:mt-2">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 mx-auto" />
            <div className="text-xs text-pink-400 mt-0.5 sm:mt-1">Selected</div>
          </div>
        )}
      </div>
    </button>
  );
}

export default GridButton