import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Stall } from "../types";
import MapViewer from "../MapViewer";

type MapEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stallMapImage: string | null;
  stalls: Stall[];
  setStalls: React.Dispatch<React.SetStateAction<Stall[]>>;
  hoveredStall: string | null;
  setHoveredStall: React.Dispatch<React.SetStateAction<string | null>>;
  isPositioningMode: boolean;
};

const MapEditDialog = ({
  open,
  onOpenChange,
  stallMapImage,
  stalls,
  setStalls,
  hoveredStall,
  setHoveredStall,
  isPositioningMode,
}: MapEditDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="sr-only">Open Map Editor</DialogTrigger>

      <DialogContent
        className="overflow-hidden p-0 bg-[#071027] text-white rounded-lg shadow-xl"
        style={{ minWidth: "92vw", height: "86vh" }}
      >
        <DialogHeader className="px-4 py-3 border-b border-white/6 bg-[#071027]">
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-white font-geist-sans font-semibold">
              Map Editor
            </DialogTitle>

            
          </div>
        </DialogHeader>

        {/* MapViewer will render: left = scrollable map, right = fixed Controller + StallSelector */}
        <div className="h-[calc(86vh-56px)]">
          <MapViewer
            stallMapImage={stallMapImage}
            stalls={stalls}
            setStalls={setStalls}
            hoveredStall={hoveredStall}
            setHoveredStall={setHoveredStall}
            isPositioningMode={isPositioningMode}
            // ensure MapViewer knows it's in "dialog" mode so it uses the right layout
            modalMode
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapEditDialog;
