/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Stall, MapPosition } from "../types";
import Controller from "../Controller";
import StallSelector from "../StallSelector";

/**
 * Export shared Shape type so Controller can import it.
 */
export type ShapeType = "circle" | "rectangle" | "square";

type Props = {
  stallMapImage: string | null;
  stalls: Stall[];
  setStalls: React.Dispatch<React.SetStateAction<Stall[]>>;
  hoveredStall: string | null;
  setHoveredStall: React.Dispatch<React.SetStateAction<string | null>>;
  isPositioningMode: boolean;
  modalMode?: boolean; // when true this is used inside a dialog
};

export default function MapViewer({
  stallMapImage,
  stalls,
  setStalls,
  hoveredStall,
  setHoveredStall,
  isPositioningMode,
  modalMode = false,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  // controller state (moved into MapViewer so Controller can live here)
  const [editingStall, setEditingStall] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<ShapeType>("circle");
  // Store as percentage of image width (0-100)
  const [selectedWidthPercent, setSelectedWidthPercent] = useState<number>(3);
  const [selectedHeightPercent, setSelectedHeightPercent] = useState<number>(3);
  const [selectedRotation, setSelectedRotation] = useState<number>(0);

  // cursor preview state
  const [preview, setPreview] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    visible: false,
  });

  // Get current image width for calculations
  const getImageWidth = () => {
    return imageWrapperRef.current?.getBoundingClientRect().width || 1000;
  };

  // Convert percentage to pixels for display
  const percentToPixels = (percent: number) => {
    return Math.round((percent / 100) * getImageWidth());
  };

  // when editingStall changes, populate controller values from stall if present
  useEffect(() => {
    if (!editingStall) return;
    const s = stalls.find((x) => x.id === editingStall);
    if (!s) return;
    setSelectedShape((s as any).mapShape ?? "circle");
    // Load stored percentages or convert old pixel values
    const w = (s as any).mapWidthPercent ?? 3;
    const h = (s as any).mapHeightPercent ?? w;
    setSelectedWidthPercent(w);
    setSelectedHeightPercent(h);
    setSelectedRotation((s as any).mapRotation ?? 0);
  }, [editingStall, stalls]);

  const persist = (updated: Stall[]) => {
    try {
      localStorage.setItem("tradeHallStalls", JSON.stringify(updated));
    } catch {}
  };

  const handlePlaceAt = (x: number, y: number, stallId: string | null) => {
    if (!stallId) return;
    setStalls((prev) => {
      const updated = prev.map((s) =>
        s.id === stallId
          ? {
              ...s,
              mapPosition: {
                x: Number(x.toFixed(2)),
                y: Number(y.toFixed(2)),
              } as MapPosition,
              mapShape: selectedShape,
              mapWidthPercent: selectedWidthPercent,
              mapHeightPercent:
                selectedShape === "square"
                  ? selectedWidthPercent
                  : selectedHeightPercent,
              mapRotation: selectedRotation,
            }
          : s
      );
      persist(updated);
      return updated;
    });
    setEditingStall(null);
    setHoveredStall(null);
  };

  const handleUpdateStall = () => {
    if (!editingStall) return;
    setStalls((prev) => {
      const updated = prev.map((s) =>
        s.id === editingStall
          ? {
              ...s,
              mapShape: selectedShape,
              mapWidthPercent: selectedWidthPercent,
              mapHeightPercent:
                selectedShape === "square"
                  ? selectedWidthPercent
                  : selectedHeightPercent,
              mapRotation: selectedRotation,
            }
          : s
      );
      persist(updated);
      return updated;
    });
    setEditingStall(null);
    setHoveredStall(null);
  };

  const handleRemoveStall = () => {
    if (!editingStall) return;
    if (!confirm(`Remove ${editingStall} from map?`)) return;
    setStalls((prev) => {
      const updated = prev.map((s) =>
        s.id === editingStall
          ? {
              ...s,
              mapPosition: undefined,
              mapShape: undefined,
              mapWidthPercent: undefined,
              mapHeightPercent: undefined,
              mapRotation: undefined,
            }
          : s
      );
      persist(updated);
      return updated;
    });
    setEditingStall(null);
    setHoveredStall(null);
  };

  // click handler for the scrollable map area — compute percent coords relative to image wrapper
  const handleMapClick = (e: React.MouseEvent) => {
    if (!isPositioningMode) return;

    const wrapper = imageWrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.max(
      0,
      Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)
    );

    // place on currently selected stall (editingStall chosen via StallSelector)
    handlePlaceAt(x, y, editingStall ?? hoveredStall);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPositioningMode || !stallMapImage) {
      if (preview.visible) setPreview((p) => ({ ...p, visible: false }));
      return;
    }

    const wrapper = imageWrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.max(
      0,
      Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)
    );

    setPreview({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setPreview((p) => ({ ...p, visible: false }));
  };

  const handleMarkerClick = (e: React.MouseEvent, stall: Stall) => {
    e.stopPropagation();
    // select for editing
    setEditingStall(stall.id ?? null);
    setHoveredStall(stall.id ?? null);
    // sync shape/size/rotation if exists (will be handled by effect)
  };

  // layout: left = scrollable map area, right = fixed panels (Controller + StallSelector)
  return (
    <div className={`flex font-geist-sans gap-4 h-full ${modalMode ? "" : ""}`}>
      {/* Left: scrollable image area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto bg-[#0b1220] rounded"
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          maxHeight: "100%",
          cursor: isPositioningMode ? "crosshair" : "default",
        }}
      >
        <div ref={imageWrapperRef} className="relative w-full p-4">
          {stallMapImage ? (
            // image scales to width of wrapper; markers use percentages so they stay in place
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={stallMapImage}
              alt="Map"
              className="w-full h-auto block"
            />
          ) : (
            <div className="w-full h-80 flex items-center justify-center text-gray-400">
              No map uploaded
            </div>
          )}

          {/* Live preview that follows cursor when positioning */}
          {isPositioningMode &&
            preview.visible &&
            (editingStall || hoveredStall) && (
              <div
                className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-40"
                style={{
                  left: `${preview.x}%`,
                  top: `${preview.y}%`,
                  width: `${selectedWidthPercent}%`,
                  height: `${
                    selectedShape === "square"
                      ? selectedWidthPercent
                      : selectedHeightPercent
                  }%`,
                  transform: `translate(-50%, -50%) rotate(${selectedRotation}deg)`,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: selectedShape === "circle" ? "9999px" : "6px",
                    background: "rgba(249,115,22,0.15)",
                    border: "2px dashed rgba(249,115,22,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                  }}
                >
                  {editingStall || hoveredStall}
                </div>
              </div>
            )}

          {/* markers positioned by percentage inside wrapper */}
          {stalls.map((stall) => {
            if (!stall.mapPosition || stall.isEmpty) return null;
            const shape = (stall as any).mapShape ?? "circle";
            // Use percentage values, with fallback for old pixel-based data
            const widthPercent = (stall as any).mapWidthPercent ?? 3;
            const heightPercent =
              (stall as any).mapHeightPercent ?? widthPercent;
            const rotation = (stall as any).mapRotation ?? 0;
            const isActive =
              hoveredStall === stall.id || editingStall === stall.id;

            return (
              <div
                key={stall.id}
                onClick={(e) => handleMarkerClick(e, stall)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${stall.mapPosition.x}%`,
                  top: `${stall.mapPosition.y}%`,
                  width: `${widthPercent}%`,
                  height: `${heightPercent}%`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                  cursor: isPositioningMode ? "pointer" : "default",
                }}
                title={stall.id ?? undefined}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: shape === "circle" ? 9999 : 6,
                    background: isActive
                      ? "linear-gradient(90deg,#fb923c,#f97316)"
                      : "linear-gradient(90deg,#3b82f6,#06b6d4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    // Font size also as percentage
                    fontSize: "0.6rem",
                  }}
                >
                  {stall.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side: fixed-width panels (not overlapping map) */}
      {isPositioningMode && (
        <div className="w-80 shrink-0 px-6">
          <div className="sticky flex flex-col top-4 space-y-4">
            <Controller
              editingStall={editingStall}
              selectedShape={selectedShape}
              selectedWidthPercent={selectedWidthPercent}
              selectedHeightPercent={selectedHeightPercent}
              selectedRotation={selectedRotation}
              // Show pixel equivalent in UI
              selectedWidthPixels={percentToPixels(selectedWidthPercent)}
              selectedHeightPixels={percentToPixels(selectedHeightPercent)}
              handleShapeChange={(shape) => {
                setSelectedShape(shape);
                if (shape === "square")
                  setSelectedHeightPercent(selectedWidthPercent);
              }}
              handleWidthChange={(percent) => {
                setSelectedWidthPercent(percent);
                if (selectedShape === "square")
                  setSelectedHeightPercent(percent);
              }}
              handleHeightChange={(percent) =>
                setSelectedHeightPercent(percent)
              }
              setSelectedRotation={(r) => setSelectedRotation(r)}
              handleUpdateStall={handleUpdateStall}
              handleCancelEdit={() => {
                setEditingStall(null);
                setHoveredStall(null);
              }}
              handleRemoveStall={handleRemoveStall}
            />

            <div className="bg-[#071027]/80 border min-w-[280px] border-white/6 rounded-lg p-3">
              <div className="text-sm font-semibold text-white mb-2">
                Stalls
              </div>
              <StallSelector
                stalls={stalls}
                hoveredStall={hoveredStall}
                setHoveredStall={(id) => {
                  setHoveredStall(id);
                  if (id) setEditingStall(id);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
