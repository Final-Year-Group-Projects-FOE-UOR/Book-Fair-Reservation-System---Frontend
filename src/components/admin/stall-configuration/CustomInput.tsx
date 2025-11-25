import React from "react";

type CustomInputProps = {
  count: number;
  price: number;
  onCountChange: (value: number) => void;
  onPriceChange: (value: number) => void;
  label: string;
  description?: string;
};

const CustomInput = ({
  count,
  price,
  onCountChange,
  onPriceChange,
  label,
  description,
}: CustomInputProps) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="bg-[#1a1f37]/50 w-full rounded-xl p-4 sm:p-5 border border-white/10">
      <label className="block text-sm font-semibold text-gray-300 mb-3">
        {label}
      </label>

      <div className="grid grid-cols-2 gap-3">
        {/* Count Input */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">Count</label>
          <input
            type="number"
            min="0"
            value={count}
            onChange={(e) => onCountChange(parseInt(e.target.value) || 0)}
            onFocus={handleFocus}
            className="w-full no-spinner px-4 py-3 bg-[#0d1229] border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-500 transition"
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">Price (Rs)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => onPriceChange(parseFloat(e.target.value) || 0)}
            onFocus={handleFocus}
            className="w-full no-spinner px-4 py-3 bg-[#0d1229] border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-500 transition"
          />
        </div>
      </div>

      {description && (
        <p className="text-xs text-gray-400 mt-3">{description}</p>
      )}
    </div>
  );
};

export default CustomInput;
