/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Building, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import { Stall, StallConfig } from "./types";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { createStall } from "@/actions/stallActions";

const StallConfiguration = () => {
  const [loading, setLoading] = useState(false);
  const [stallConfig, setStallConfig] = useState<StallConfig>({
    small: { count: 0, price: 0 },
    medium: { count: 0, price: 0 },
    large: { count: 0, price: 0 },
    namingPattern: "alphanumeric",
    prefix: "",
  });

  const generateStalls = () => {
    const stalls: Stall[] = [];
    for (let i = 0; i < stallConfig.small.count; i++) {
      stalls.push({
        isConfigured: false,
        stallName:
          stallConfig.namingPattern === "alphanumeric"
            ? `${stallConfig.prefix || ""}-S-${i + 1}`
            : `S-${i + 1}`,
        type: "SMALL",
        price: stallConfig.small.price,
        dimensions: "",
        mapMetadata: {
          mapWidth: 0,
          mapHeight: 0,
          mapWidthPercent: 0,
          mapHeightPercent: 0,
          mapRotation: 0,
          mapShape: "",
          mapSize: 0,
          mapPosition: { x: 0, y: 0 },
        },
      });
    }
    for (let i = 0; i < stallConfig.medium.count; i++) {
      stalls.push({
        isConfigured: false,
        stallName:
          stallConfig.namingPattern === "alphanumeric"
            ? `${stallConfig.prefix || ""}-M-${i + 1}`
            : `M-${i + 1}`,
        type: "MEDIUM",
        price: stallConfig.medium.price,
        dimensions: "",
        mapMetadata: {
          mapWidth: 0,
          mapHeight: 0,
          mapWidthPercent: 0,
          mapHeightPercent: 0,
          mapRotation: 0,
          mapShape: "",
          mapSize: 0,
          mapPosition: { x: 0, y: 0 },
        },
      });
    }
    for (let i = 0; i < stallConfig.large.count; i++) {
      stalls.push({
        isConfigured: false,
        stallName:
          stallConfig.namingPattern === "alphanumeric"
            ? `${stallConfig.prefix || ""}-L-${i + 1}`
            : `L-${i + 1}`,
        type: "LARGE",
        price: stallConfig.large.price,
        dimensions: "",
        mapMetadata: {
          mapWidth: 0,
          mapHeight: 0,
          mapWidthPercent: 0,
          mapHeightPercent: 0,
          mapRotation: 0,
          mapShape: "",
          mapSize: 0,
          mapPosition: { x: 0, y: 0 },
        },
      });
    }
    return stalls;
  };

  const validateConfig = (): boolean => {
    if (
      stallConfig.small.count < 0 || 
      stallConfig.medium.count < 0 ||
      stallConfig.large.count < 0
    ) {
      toast.error("Stall counts cannot be negative.");
      return false;
    }
    if (
      stallConfig.small.price < 0 ||
      stallConfig.medium.price < 0 ||
      stallConfig.large.price < 0
    ) {
      toast.error("Stall prices cannot be negative.");
      return false;
    }
    if(stallConfig.small.count === 0 && stallConfig.medium.count === 0 && stallConfig.large.count === 0) {
      toast.error("At least one stall must be configured.");
      return false;
    }
    return true;
  };

  const createStalls = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    if (!validateConfig()) {
      return;
    }
    try {
      setLoading(true);
      // Call createStall for each stall
      const stalls = generateStalls();
      for (const stall of stalls) {
        const response = await createStall(jwt, stall);
        if (!response.success) {
          toast.error(response.message || "Failed to create some stalls.");
          console.log(response.message);
          return;
        }
      }
      toast.success("All stalls created successfully!");
    } catch (err) {
      console.log("An error occurred while creating stalls:", err);
      toast.error("An error occurred while creating stalls. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <div>
        <div className="bg-gradient-to-br from-green-500/10 to-blue-600/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <CustomInput
              count={stallConfig.small.count}
              price={stallConfig.small.price}
              onCountChange={(value) =>
                setStallConfig({
                  ...stallConfig,
                  small: {
                    ...stallConfig.small,
                    count: value,
                  },
                })
              }
              onPriceChange={(value) =>
                setStallConfig({
                  ...stallConfig,
                  small: {
                    ...stallConfig.small,
                    price: value,
                  },
                })
              }
              label="Small Stalls"
              description="Compact spaces"
            />

            <CustomInput
              count={stallConfig.medium.count}
              price={stallConfig.medium.price}
              onCountChange={(value) =>
                setStallConfig({
                  ...stallConfig,
                  medium: {
                    ...stallConfig.medium,
                    count: value,
                  },
                })
              }
              onPriceChange={(value) =>
                setStallConfig({
                  ...stallConfig,
                  medium: {
                    ...stallConfig.medium,
                    price: value,
                  },
                })
              }
              label="Medium Stalls"
              description="Standard size"
            />

            <CustomInput
              count={stallConfig.large.count}
              price={stallConfig.large.price}
              onCountChange={(value) =>
                setStallConfig({
                  ...stallConfig,
                  large: {
                    ...stallConfig.large,
                    count: value,
                  },
                })
              }
              onPriceChange={(value) =>
                setStallConfig({
                  ...stallConfig,
                  large: {
                    ...stallConfig.large,
                    price: value,
                  },
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
                  {`${stallConfig.prefix}-[SIZE]-1, ${stallConfig.prefix}-[SIZE]-2...` ||
                    ""}
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
                <div className="text-lg mb-1">{"[SIZE]-1, [SIZE]-2, [SIZE]-3..."}</div>
                <div className="text-xs opacity-75">Numeric</div>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={createStalls}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold transition transform 
    flex items-center justify-center gap-2 shadow-lg ${
      loading
        ? "bg-indigo-500/60 text-white cursor-not-allowed opacity-70 scale-[0.99]"
        : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:scale-[1.02]"
    }
  `}
          >
            {loading ? (
              <>
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Generating...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Generate Stalls
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StallConfiguration;
