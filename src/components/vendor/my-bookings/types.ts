export interface Reservation {
  id: number;
  stall: Stall;
  reservationDate: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
  userEmail?: string;
  qrCodePath?: string;
}

export interface ReservationResponse {
  id: number;
  message: string | null;
  reservationDate: string;
  stallIds: number[];
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
  userEmail: string;
  qrCodePath?: string;
}

export interface Stall {
  id: number;
  stallName: string;
  type: "SMALL" | "MEDIUM" | "LARGE";
  price: number;
  dimensions?: string;

  available: boolean;

  mapMetadata?: StallMapMetadata;
}

interface StallMapMetadata {
  mapWidth: number;
  mapHeight: number;
  mapWidthPercent: number;
  mapHeightPercent: number;
  mapRotation: number;
  mapShape: "circle" | "rectangle";
  mapSize: number;
  configured: boolean;
  mapPosition: StallMapPosition;
}
interface StallMapPosition {
  x: number;
  y: number;
}