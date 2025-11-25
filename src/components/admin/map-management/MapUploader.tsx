"use client";
import { Upload } from "lucide-react";
import React from "react";

type Props = {
  stallMapImage: string | null;
  setStallMapImage: (v: string | null) => void;
};

export default function MapUploader({
  stallMapImage,
  setStallMapImage,
}: Props) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string | null;
      setStallMapImage(result);
      try {
        if (result) localStorage.setItem("tradeHallMap", result);
      } catch {}
      setTimeout(() => {
        alert(
          "✅ Trade Hall map uploaded successfully!\n\nNext: Position stalls (Position Stalls)."
        );
      }, 80);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 mb-6">
      <label htmlFor="map-upload" className="block w-full">
        <div
          className="
        flex flex-col items-center justify-center p-8
        border-2 border-dashed border-purple-500/30 rounded-xl
        text-center transition-all duration-300 ease-in-out
        cursor-pointer bg-[#1a1f37]/30
        hover:border-purple-500 hover:bg-[#1a1f37]/50
      "
        >
          <input
            id="map-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Visual content for the upload area */}
          <div className="flex flex-col items-center gap-4">
            {/* Icon Container with Gradient Background */}
            <div
              className="
            relative p-3 rounded-full
            bg-linear-to-br from-purple-600 to-indigo-700
            shadow-lg
          "
            >
              <Upload className="w-6 h-6 text-white" strokeWidth={2} />
            </div>

            {/* Text Content */}
            <div>
              <p className="text-white text-lg font-semibold mb-1">
                Click to upload map image
              </p>
              <p className="text-gray-400 text-sm">
                PNG, JPG, or SVG (Max 10MB)
              </p>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}
