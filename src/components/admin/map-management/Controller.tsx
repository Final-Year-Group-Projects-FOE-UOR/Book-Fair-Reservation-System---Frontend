import React from "react";
import { ShapeType } from "./dialogs/MapViewer";

type ControllerProps = {
  editingStall: string | null;
  selectedShape: ShapeType;
  selectedWidthPercent: number;
  selectedHeightPercent: number;
  selectedRotation: number;
  selectedWidthPixels: number;
  selectedHeightPixels: number;
  handleShapeChange: (shape: ShapeType) => void;
  handleWidthChange: (percent: number) => void;
  handleHeightChange: (percent: number) => void;
  setSelectedRotation: (rotation: number) => void;
  handleUpdateStall: () => void;
  handleCancelEdit: () => void;
  handleRemoveStall: () => void;
};

const Controller = ({
  editingStall,
  selectedShape,
  selectedWidthPercent,
  selectedHeightPercent,
  selectedRotation,
  selectedWidthPixels,
  selectedHeightPixels,
  handleShapeChange,
  handleWidthChange,
  handleHeightChange,
  setSelectedRotation,
  handleUpdateStall,
  handleCancelEdit,
  handleRemoveStall,
}: ControllerProps) => {
  return (
    <div className="z-20 bg-[#0b1220]/90 font-geist-sans backdrop-blur rounded-md p-3 flex flex-col gap-3 border border-white/5 min-w-[280px]">
      {editingStall && (
        <div className="text-xs font-semibold text-orange-400 border-b border-white/10 pb-2">
          Editing: {editingStall}
        </div>
      )}

      {/* Shape selector */}
      <div className="flex items-center gap-2">
        <div className="text-xs text-gray-300 w-14">Shape</div>
        <div className="flex gap-1">
          {(["circle", "square", "rectangle"] as ShapeType[]).map((shape) => (
            <button
              key={shape}
              onClick={(e) => {
                e.stopPropagation();
                handleShapeChange(shape);
              }}
              className={`px-3 py-1 text-xs rounded ${
                selectedShape === shape
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {shape.charAt(0).toUpperCase() + shape.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Width slider - now in percentage */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-300 w-14">Width</div>
          <input
            type="range"
            min={0.5}
            max={20}
            step={0.1}
            value={selectedWidthPercent}
            onChange={(ev) => handleWidthChange(Number(ev.target.value))}
            onPointerDown={(ev) => ev.stopPropagation()}
            onClick={(ev) => ev.stopPropagation()}
            className="flex-1"
            aria-label="Width"
          />
          <div className="text-xs text-gray-400 w-16 text-right">
            {selectedWidthPercent.toFixed(1)}%
          </div>
        </div>
        <div className="text-[10px] text-gray-500 text-right pr-1">
          ≈ {selectedWidthPixels}px at current zoom
        </div>
      </div>

      {/* Height slider - now in percentage */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-300 w-14">Height</div>
          <input
            type="range"
            min={0.5}
            max={20}
            step={0.1}
            value={selectedHeightPercent}
            onChange={(ev) => handleHeightChange(Number(ev.target.value))}
            onPointerDown={(ev) => ev.stopPropagation()}
            onClick={(ev) => ev.stopPropagation()}
            className="flex-1"
            aria-label="Height"
          />
          <div className="text-xs text-gray-400 w-16 text-right">
            {selectedHeightPercent.toFixed(1)}%
          </div>
        </div>
        <div className="text-[10px] text-gray-500 text-right pr-1">
          ≈ {selectedHeightPixels}px at current zoom
        </div>
      </div>

      {/* Rotation slider - only for non-circles */}
      {selectedShape !== "circle" && (
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-300 w-14">Rotate</div>
          <input
            type="range"
            min={0}
            max={360}
            value={selectedRotation}
            onChange={(ev) => setSelectedRotation(Number(ev.target.value))}
            onPointerDown={(ev) => ev.stopPropagation()}
            onClick={(ev) => ev.stopPropagation()}
            className="flex-1"
            aria-label="Rotation"
          />
          <div className="text-xs text-gray-400 w-16 text-right">
            {selectedRotation}°
          </div>
        </div>
      )}

      {/* Preview of selected shape */}
      <div className="flex items-center gap-2">
        <div className="text-xs text-gray-300 w-14">Preview</div>
        <div className="flex items-center justify-center w-24 h-24 bg-gray-900/50 rounded">
          <div
            className="border border-white/20"
            style={{
              width: `${Math.min(selectedWidthPercent * 3, 60)}px`,
              height: `${Math.min(
                (selectedShape === "square"
                  ? selectedWidthPercent
                  : selectedHeightPercent) * 3,
                60
              )}px`,
              borderRadius: selectedShape === "circle" ? "9999px" : "4px",
              background: "rgba(249,115,22,0.3)",
              transform: `rotate(${selectedRotation}deg)`,
            }}
            aria-hidden
          />
        </div>
      </div>

      {/* Edit mode buttons */}
      {editingStall && (
        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUpdateStall();
              }}
              className="flex-1 px-3 py-1.5 text-xs rounded bg-orange-500 text-white hover:bg-orange-600"
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCancelEdit();
              }}
              className="flex-1 px-3 py-1.5 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveStall();
            }}
            className="w-full px-3 py-1.5 text-xs rounded bg-red-600 text-white hover:bg-red-700"
          >
            Remove from Map
          </button>
        </div>
      )}

      {!editingStall && (
        <div className="text-xs text-gray-400 italic pt-1 border-t border-white/10">
          Select a stall to place or click placed items to edit
        </div>
      )}
    </div>
  );
};

export default Controller;
