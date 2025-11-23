/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Building, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import CustomInput from "./CustomInput";

const StallConfiguration = () => {
  const [stallConfig, setStallConfig] = useState({
    small: 15,
    medium: 20,
    large: 15,
    namingPattern: "alphanumeric",
    prefix: "",
  });

  const [stalls, setStalls] = useState(() => {
    const savedStalls = localStorage.getItem("tradeHallStalls");
    return savedStalls ? JSON.parse(savedStalls) : [];
  });

  const generateStallsFromConfig = () => {
    const { small, medium, large, namingPattern, prefix } = stallConfig;
    const totalStalls = small + medium + large;

    if (totalStalls === 0) {
      alert("⚠️ Please configure at least one stall.");
      return;
    }

    if (
      stalls.length > 0 &&
      stalls.some((s: { reserved: any }) => s.reserved)
    ) {
      if (
        !window.confirm(
          "⚠️ Warning: Some stalls are already reserved.\n\nGenerating new stalls will RESET ALL bookings.\n\nAre you sure you want to continue?"
        )
      ) {
        return;
      }
    }
    const newStalls = [];

    let stallNumber = 1;
    let columnNumber = 1;
    let rowLetter = "A";

    const generateId = () => {
      let id;
      if (namingPattern === "alphanumeric") {
        id = `${rowLetter}${columnNumber}`;
        columnNumber++;
        if (columnNumber > 10) {
          columnNumber = 1;
          rowLetter = String.fromCharCode(rowLetter.charCodeAt(0) + 1);
        }
      } else {
        id = `${stallNumber}`;
        stallNumber++;
      }
      return prefix ? `${prefix}${id}` : id;
    };

    for (let i = 0; i < small; i++) {
      newStalls.push({
        id: generateId(),
        size: "Small",
        price: 100,
        reserved: false,
        businessName: null,
        email: null,
        mapPosition: null,
      });
    }

    for (let i = 0; i < medium; i++) {
      newStalls.push({
        id: generateId(),
        size: "Medium",
        price: 150,
        reserved: false,
        businessName: null,
        email: null,
        mapPosition: null,
      });
    }

    for (let i = 0; i < large; i++) {
      newStalls.push({
        id: generateId(),
        size: "Large",
        price: 200,
        reserved: false,
        businessName: null,
        email: null,
        mapPosition: null,
      });
    }

    setStalls(newStalls);
    const prefixText = prefix ? ` with prefix "${prefix}"` : "";
    alert(
      `✅ Generated ${totalStalls} stalls${prefixText}!\n\n${small} Small\n${medium} Medium\n${large} Large\n\nNext: Upload a map and position these stalls.`
    );
  };

  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <div>
        <div className="bg-gradient-to-br from-green-500/10 to-blue-600/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            

            <CustomInput
              value={stallConfig.small}
              onChange={(value) =>
                setStallConfig({
                  ...stallConfig,
                  small: value,
                })
              }
              label="Small Stalls"
              description="Compact spaces"
            />

            <CustomInput
              value={stallConfig.medium}
              onChange={(value) =>
                setStallConfig({
                  ...stallConfig,
                  medium: value,
                })
              }
              label="Medium Stalls"
              description="Standard size"
            />

            <CustomInput
              value={stallConfig.large} 
              onChange={(value) =>
                setStallConfig({
                  ...stallConfig,
                  large: value,
                })
              }
              label="Large Stalls"
              description="Premium large"
            />
          </div>

          <div className="bg-[#1a1f37]/50 rounded-xl p-5 border border-white/10 mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Stall Name Prefix (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., STALL-, BOOTH-, etc."
              value={stallConfig.prefix}
              onChange={(e) =>
                setStallConfig({ ...stallConfig, prefix: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#0d1229] border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition placeholder-gray-500"
            />
          </div>

          <div className="bg-[#1a1f37]/50 rounded-xl p-5 border border-white/10 mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Stall Naming Pattern
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() =>
                  setStallConfig({
                    ...stallConfig,
                    namingPattern: "alphanumeric",
                  })
                }
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition ${
                  stallConfig.namingPattern === "alphanumeric"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg"
                    : "bg-[#0d1229] text-gray-400 border border-white/10"
                }`}
              >
                <div className="text-lg mb-1">
                  {stallConfig.prefix || ""}A1, A2...
                </div>
                <div className="text-xs opacity-75">Alphanumeric</div>
              </button>
              <button
                type="button"
                onClick={() =>
                  setStallConfig({ ...stallConfig, namingPattern: "numeric" })
                }
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition ${
                  stallConfig.namingPattern === "numeric"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg"
                    : "bg-[#0d1229] text-gray-400 border border-white/10"
                }`}
              >
                <div className="text-lg mb-1">
                  {stallConfig.prefix || ""}1, 2, 3...
                </div>
                <div className="text-xs opacity-75">Numeric</div>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={generateStallsFromConfig}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Generate Stalls
          </button>
        </div>
      </div>
    </div>
  );
};

export default StallConfiguration;
