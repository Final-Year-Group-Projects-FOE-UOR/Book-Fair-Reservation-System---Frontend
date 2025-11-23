import React from "react";

type CustomInputProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  description?: string;
};

const CustomInput = ({
  value,
  onChange,
  label,
  description,
}: CustomInputProps) => {
  return (
    <div className="bg-[#1a1f37]/50 w-full rounded-xl p-4 sm:p-5 border border-white/10">
      <label className="block text-sm font-semibold text-gray-300 mb-3">
        {label}
      </label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full no-spinner px-4 py-3 bg-[#0d1229] border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-500 transition"
      />
      <p className="text-xs text-gray-400 mt-2">{description}</p>
    </div>
  );
};

export default CustomInput;
