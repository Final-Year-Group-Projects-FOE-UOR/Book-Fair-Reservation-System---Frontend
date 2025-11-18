export type Stall = {
  id: string | null;
  size?: "small" | "medium" | "large";
  reserved?: boolean;
  isEmpty: boolean;
  pending?: boolean;
  businessName?: string | null;
  email?: string | null;
  mapPosition?: StallMapPosition;
};

export interface StallMapPosition {
  x: number;
  y: number;
}

export interface VendorInfo {
  businessName: string;
  email: string;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export type BookingStep = 1 | 2 | 3;
export type VendorHomeTab = "booking" | "profile";

