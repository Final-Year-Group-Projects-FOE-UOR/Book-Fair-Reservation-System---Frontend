export type Stall = {
  id: number;
  stallName: string;
  type: "SMALL" | "MEDIUM" | "LARGE";
  price: number;
  dimensions?: string;
  available: boolean;
  mapMetadata?: StallMapMetadata;
};

export interface StallMapMetadata {
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

export interface StallMapPosition {
  x: number;
  y: number;
}


export interface VendorInfo {
  userId: number;
  businessName: string;
  email: string;
  genres: string[];
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export type BookingStep = 1 | 2 | 3;
export type VendorHomeTab = "booking" | "profile";
