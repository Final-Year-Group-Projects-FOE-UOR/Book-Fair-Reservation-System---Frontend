import { Stall } from "@/components/vendor/types";

export interface MapViewProps {
  stallMapImage: string | null;
  stalls: Stall[];
  selectedStalls: (number | null)[];
  setSelectedStalls: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  maxSelectable?: number;
}

export interface HoverCardState {
  leftPercent: number;
  topPercent: number;
  showAbove: boolean;
  stall: Stall | null;
  visible: boolean;
}

export interface StallMarkerProps {
  stall: Stall;
  onHoverEnter: (stall: Stall) => void;
  onHoverLeave: () => void;
}

export interface HoverCardProps {
  hoverCard: HoverCardState;
}
