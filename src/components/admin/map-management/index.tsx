"use client";
import React, { useEffect, useState } from "react";
import { MapPin, CheckCircle, X, Building, Trash } from "lucide-react";
import MapUploader from "./MapUploader";
import MapViewer from "./dialogs/MapViewer";
import StallSelector from "./StallSelector";
import type { Stall } from "./types";
import MapEditDialog from "./dialogs/MapEditDialog";

function generateInitialStalls(): Stall[] {
  const sizes: Stall["size"][] = ["small", "medium", "large"];
  const layout = [
    { id: "A1", x: 23, y: 12 },
    { id: "A2", x: 29, y: 12 },
    { id: "A3", x: 35, y: 12 },
    { id: "A4", x: 45, y: 12 },
    { id: "A5", x: 51, y: 12 },
    { id: "A6", x: 57, y: 12 },
    { id: "A7", x: 63, y: 12 },
    { id: "A8", x: 69, y: 12 },
    { id: "A9", x: 80, y: 12 },
    { id: "A10", x: 86, y: 12 },
    { id: "B1", x: 17, y: 22 },
    { id: "B2", x: 23, y: 22 },
    { id: "B3", x: 29, y: 22 },
    { id: "B4", x: 41, y: 22 },
    { id: "B5", x: 49, y: 22 },
    { id: "B6", x: 57, y: 22 },
    { id: "B7", x: 65, y: 22 },
    { id: "B8", x: 73, y: 22 },
    { id: "B9", x: 81, y: 22 },
    { id: "B10", x: 87, y: 22 },
    { id: "C1", x: 17, y: 32 },
    { id: "C2", x: 23, y: 32 },
    { id: "C3", x: 29, y: 32 },
    { id: "C4", x: 41, y: 32 },
    { id: "C7", x: 65, y: 32 },
    { id: "C8", x: 73, y: 32 },
    { id: "C9", x: 81, y: 32 },
    { id: "C10", x: 87, y: 32 },
    { id: "D1", x: 17, y: 42 },
    { id: "D2", x: 23, y: 42 },
    { id: "D3", x: 29, y: 42 },
    { id: "D4", x: 41, y: 42 },
    { id: "D5", x: 49, y: 42 },
    { id: "D6", x: 57, y: 42 },
    { id: "D7", x: 65, y: 42 },
    { id: "D8", x: 73, y: 42 },
    { id: "D9", x: 81, y: 42 },
    { id: "D10", x: 87, y: 42 },
    { id: "E1", x: 17, y: 52 },
    { id: "E2", x: 29, y: 52 },
    { id: "E3", x: 35, y: 52 },
    { id: "E4", x: 41, y: 52 },
    { id: "E5", x: 49, y: 52 },
    { id: "E6", x: 57, y: 52 },
    { id: "E7", x: 65, y: 52 },
    { id: "E8", x: 73, y: 52 },
    { id: "E9", x: 81, y: 52 },
    { id: "E10", x: 87, y: 52 },
  ];

  return layout.map((s) => ({
    id: s.id,
    size: sizes[Math.floor(Math.random() * sizes.length)],
    reserved: Math.random() < 0.3,
    isEmpty: false,
    businessName: null,
    email: null,
    mapPosition: { x: s.x, y: s.y },
  }));
}

export default function MapManagement() {
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const [stallMapImage, setStallMapImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem("tradeHallMap");
    } catch {
      return null;
    }
  });

  const [stalls, setStalls] = useState<Stall[]>(() => {
    try {
      const saved = localStorage.getItem("tradeHallStalls");
      return saved ? JSON.parse(saved) : generateInitialStalls();
    } catch {
      return generateInitialStalls();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tradeHallStalls", JSON.stringify(stalls));
    } catch {}
  }, [stalls]);

  const [hoveredStall, setHoveredStall] = useState<string | null>(null);
  const [isPositioningMode, setIsPositioningMode] = useState(false);

  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <div className="bg-linear-to-br from-purple-500/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl p-8 mb-6">
        <MapUploader
          stallMapImage={stallMapImage}
          setStallMapImage={setStallMapImage}
        />

        {stallMapImage && (
          <div className="bg-[#1a1f37]/50 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">
                  Map Uploaded Successfully
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsPositioningMode((s) => !s);
                    setIsMapDialogOpen(true);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer hover:scale-[1.05] transition-all duration-300 flex items-center gap-2 ${
                    isPositioningMode
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                      : "bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  {isPositioningMode ? "Exit Positioning" : "Position Stalls"}
                </button>
                <button
                  onClick={() => {
                    setStallMapImage(null);
                    try {
                      localStorage.removeItem("tradeHallMap");
                    } catch {}
                  }}
                  className="px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer hover:scale-[1.05] transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 text-red-300 hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 shadow-lg hover:shadow-red-500/20"
                >
                  <Trash className="w-4 h-4" />
                  Remove Map
                </button>
              </div>
            </div>

            {isPositioningMode && (
              <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-semibold mb-1">
                      Positioning Mode Active
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      Click on a stall below, then click on the map where it
                      should appear. Positions are automatically saved for
                      vendors to see.
                    </p>
                  </div>
                </div>

                <StallSelector
                  stalls={stalls}
                  hoveredStall={hoveredStall}
                  setHoveredStall={setHoveredStall}
                />
              </div>
            )}
            <MapEditDialog
              open={isMapDialogOpen}
              onOpenChange={() => {
                setIsPositioningMode(false);
                setIsMapDialogOpen(false);
              }}
              stallMapImage={stallMapImage}
              stalls={stalls}
              setStalls={setStalls}
              hoveredStall={hoveredStall}
              setHoveredStall={setHoveredStall}
              isPositioningMode={isPositioningMode}
            />

            <MapViewer
              stallMapImage={stallMapImage}
              stalls={stalls}
              setStalls={setStalls}
              hoveredStall={hoveredStall}
              setHoveredStall={setHoveredStall}
              isPositioningMode={isPositioningMode}
            />

            <div className="flex items-center justify-end mt-3">
              <div className="flex items-center gap-4">
                <p className="text-xs text-green-400 font-semibold">
                  {stalls.filter((s) => s.mapPosition && !s.isEmpty).length}{" "}
                  stalls positioned
                </p>
                <p className="text-xs text-blue-400 font-semibold">
                  ✓ Visible to all vendors
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
