"use client";
import React, { useEffect, useState } from "react";
import { MapPin, CheckCircle, X, Building } from "lucide-react";
import MapUploader from "./MapUploader";
import MapViewer from "./MapViewer";
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
    <div>
      <div className="bg-linear-to-br from-purple-500/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl p-8 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-linear-to-br from-purple-500 to-indigo-600 p-3 rounded-xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              Upload Trade Hall Floor Plan
            </h3>
            <p className="text-gray-300 text-sm">
              Upload the Trade Hall floor plan image. Stall positions (A1-E10)
              are pre-configured to match the layout. Vendors will see clickable
              markers on each stall location.
            </p>
            <div className="mt-2 bg-blue-500/10 border border-blue-400/20 rounded-lg p-3">
              <p className="text-blue-300 text-xs">
                💡 Tip: The system already knows where stalls A1-A10, B1-B10,
                C1-C10, D1-D10, and E1-E10 are located on the map.
              </p>
            </div>
          </div>
        </div>

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
                <div className="bg-green-500/20 px-3 py-1 rounded-full">
                  <span className="text-green-300 text-xs font-semibold">
                    💾 Saved to localStorage
                  </span>
                </div>

                {/* <button
                  onClick={() => setIsPositioningMode((s) => !s)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-2 ${
                    isPositioningMode
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                      : "bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  {isPositioningMode ? "Exit Positioning" : "Position Stalls"}
                </button> */}

                <button
                  onClick={() => {
                    setIsPositioningMode((s) => !s);
                    setIsMapDialogOpen(true);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-2 ${
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
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <X className="w-5 h-5" />
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

            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-400">
                Vendors can now select stalls by clicking on this map
              </p>
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

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-400 mt-1">ℹ️</div>
          <div className="text-sm text-gray-300">
            <p className="font-semibold text-white mb-1">How it works:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>
                Upload a clear floor plan or map showing all stall locations
              </li>
              <li>
                Vendors will see a toggle to switch between Grid View and Map
                View
              </li>
              <li>
                They can click directly on stalls in the map to select them
              </li>
              <li>
                Selected stalls will be highlighted in pink, reserved in gray,
                and available in green
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
