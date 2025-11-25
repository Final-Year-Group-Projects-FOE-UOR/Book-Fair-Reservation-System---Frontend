/* eslint-disable react-hooks/refs */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Controller from "../Controller";
import StallSelector from "../StallSelector";
import { Stall } from "../../stall-configuration/types";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { updateMapStall } from "@/actions/mapActions";

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

  // hover card state
  const [hoverCard, setHoverCard] = useState<{
    leftPercent: number;
    topPercent: number;
    showAbove: boolean;
    details: {
      id: string;
      available: boolean;
      isConfigured: boolean;
      stallName: string;
      type: "SMALL" | "MEDIUM" | "LARGE" | string;
      price: number;
    } | null;
    visible: boolean;
  }>({
    leftPercent: 0,
    topPercent: 0,
    showAbove: true,
    details: null,
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
    setSelectedShape((s.mapMetadata?.mapShape as ShapeType) ?? "circle");
    // Load stored percentages
    const w = s.mapMetadata?.mapWidthPercent ?? 3;
    const h = s.mapMetadata?.mapHeightPercent ?? w;
    setSelectedWidthPercent(w);
    setSelectedHeightPercent(h);
    setSelectedRotation(s.mapMetadata?.mapRotation ?? 0);
  }, [editingStall, stalls]);

  const handleUpdateToDB = async (updatedStall: Stall) => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      toast.error("Authentication error. Please log in again.");
      return;
    }
    try {
      const response = await updateMapStall(jwt, updatedStall);
      if (response.success) {
        // success
      } else {
        toast.error(
          response.message || "Failed to update stall. Please try again."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlaceAt = (x: number, y: number, stallId: string | null) => {
    if (!stallId) return;
    setStalls((prev) => {
      const updated = prev.map((s) =>
        s.id === stallId
          ? {
              ...s,
              mapMetadata: {
                ...s.mapMetadata,
                mapPosition: {
                  x: Number(x.toFixed(2)),
                  y: Number(y.toFixed(2)),
                },
                mapShape: selectedShape,
                mapWidthPercent: selectedWidthPercent,
                mapHeightPercent:
                  selectedShape === "square"
                    ? selectedWidthPercent
                    : selectedHeightPercent,
                mapRotation: selectedRotation,
                configured: true,
              },
            }
          : s
      );
      const updateStall = updated.find((s) => s.id === stallId);
      if (updateStall) handleUpdateToDB(updateStall);
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
              mapMetadata: {
                ...s.mapMetadata,
                mapShape: selectedShape,
                mapWidthPercent: selectedWidthPercent,
                mapHeightPercent:
                  selectedShape === "square"
                    ? selectedWidthPercent
                    : selectedHeightPercent,
                mapRotation: selectedRotation,
                configured: true,
              },
            }
          : s
      );
      const updateStall = updated.find((s) => s.id === editingStall);
      if (updateStall) handleUpdateToDB(updateStall);
      return updated;
    });
    setEditingStall(null);
    setHoveredStall(null);
  };

  const handleRemoveStall = async () => {
    if (!editingStall) return;
    setStalls((prev) => {
      const updated = prev.map((s) =>
        s.id === editingStall
          ? {
              ...s,
              mapMetadata: {
                ...s.mapMetadata,
                mapPosition: { x: 0, y: 0 },
                mapShape: "circle",
                mapWidthPercent: 0,
                mapHeightPercent: 0,
                mapRotation: 0,
                configured: false,
              },
              available: true,
            }
          : s
      );
      const updateStall = updated.find((s) => s.id === editingStall);
      if (updateStall) handleUpdateToDB(updateStall);
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

  // hover handlers for hover card
  const handleMarkerHoverEnter = (e: React.MouseEvent, stall: Stall) => {
    e.stopPropagation();
    const meta = stall.mapMetadata ?? {};
    const left = meta.mapPosition?.x ?? 0;
    const top = meta.mapPosition?.y ?? 0;
    const showAbove = top > 18;
    const details = {
      id: stall.id ?? "N/A",
      available: !!stall.available,
      isConfigured:
        !!meta.configured || !!meta.mapWidthPercent || !!meta.mapPosition,
      stallName: stall.stallName ?? "",
      type: (stall.type ?? "SMALL").toString().toUpperCase() as
        | "SMALL"
        | "MEDIUM"
        | "LARGE"
        | string,
      price:
        typeof stall.price === "number"
          ? stall.price
          : Number(stall.price ?? 0),
    };
    setHoverCard({
      leftPercent: left,
      topPercent: top,
      showAbove,
      details,
      visible: true,
    });
  };

  const handleMarkerHoverMove = (e: React.MouseEvent, stall: Stall) => {
    e.stopPropagation();
    const meta = stall.mapMetadata ?? {};
    const left = meta.mapPosition?.x ?? 0;
    const top = meta.mapPosition?.y ?? 0;
    const showAbove = top > 18;
    setHoverCard((h) => ({
      ...h,
      leftPercent: left,
      topPercent: top,
      showAbove,
    }));
  };

  const handleMarkerHoverLeave = () => {
    setHoverCard((h) => ({ ...h, visible: false }));
  };

  // layout: left = scrollable map area, right = fixed panels (Controller + StallSelector)
  return (
    <div className={`flex font-geist-sans gap-4 h-full ${modalMode ? "" : ""}`}>
      {/* Left: scrollable image area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto beautiful-scrollbar bg-[#0b1220] rounded"
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
            // Check if position exists and stall is available
            if (
              !stall.mapMetadata?.mapPosition ||
              (stall.mapMetadata.mapPosition.x === 0 &&
                stall.mapMetadata.mapPosition.y === 0) ||
              !stall.available
            )
              return null;

            const shape = stall.mapMetadata.mapShape ?? "circle";
            const widthPercent = stall.mapMetadata.mapWidthPercent ?? 3;
            const heightPercent =
              stall.mapMetadata.mapHeightPercent ?? widthPercent;
            const rotation = stall.mapMetadata.mapRotation ?? 0;
            const isActive =
              hoveredStall === stall.id || editingStall === stall.id;

            return (
              <div
                key={stall.id}
                onClick={(e) => handleMarkerClick(e, stall)}
                onMouseEnter={(e) => handleMarkerHoverEnter(e, stall)}
                onMouseMove={(e) => handleMarkerHoverMove(e, stall)}
                onMouseLeave={() => handleMarkerHoverLeave()}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${stall.mapMetadata.mapPosition.x}%`,
                  top: `${stall.mapMetadata.mapPosition.y}%`,
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

          {/* Hover card rendered inside image wrapper so it scrolls with image */}
          {hoverCard.visible && hoverCard.details && (
            <div
              className="absolute z-50 max-w-xs"
              style={{
                left: `${Math.max(2, Math.min(98, hoverCard.leftPercent))}%`,
                top: hoverCard.showAbove
                  ? `${Math.max(2, hoverCard.topPercent - 6)}%`
                  : `${Math.min(98, hoverCard.topPercent + 6)}%`,
                transform: hoverCard.showAbove
                  ? "translate(-50%, -100%)"
                  : "translate(-50%, 0%)",
                pointerEvents: "none",
              }}
            >
              <div className="bg-[#071027] border border-white/8 text-white rounded-lg shadow-lg p-3 w-64 pointer-events-auto">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold">
                      {hoverCard.details.stallName ||
                        `Stall ${hoverCard.details.id}`}
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                      {hoverCard.details.id}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 text-right">
                    <div className="font-semibold">
                      {hoverCard.details.type}
                    </div>
                    <div className="text-green-300 font-medium">
                      ${hoverCard.details.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <div>
                    <div>
                      {hoverCard.details.available ? (
                        <span className="text-green-300 font-semibold">
                          Available
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold">
                          Not available
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {hoverCard.details.isConfigured ? (
                        <span className="text-gray-300">Configured</span>
                      ) : (
                        <span className="text-gray-500">Not configured</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-400">Quick</div>
                    <div className="text-xs text-gray-400">Info</div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
