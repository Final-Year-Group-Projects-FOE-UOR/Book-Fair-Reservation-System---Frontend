import { Reservation } from "@/components/vendor/my-bookings/types";
import { Stall } from "@/components/vendor/types";

export interface MapViewProps {
  stallMapImage: string | null;
  reservations: Reservation[];
}

export interface HoverCardState {
  leftPercent: number;
  topPercent: number;
  showAbove: boolean;
  reservation: Reservation | null;
  visible: boolean;
}

export interface StallMarkerProps {
  reservation: Reservation;
  onHoverEnter: (reservation: Reservation) => void;
  onHoverLeave: () => void;
}

export interface HoverCardProps {
  hoverCard: HoverCardState;
}
