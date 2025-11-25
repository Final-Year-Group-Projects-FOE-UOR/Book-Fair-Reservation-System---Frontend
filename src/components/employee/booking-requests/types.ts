export type BookingRequest = {
  id: number;
  stallName: string;
  size: "small" | "medium" | "large";
  reserved: boolean;
  pending: boolean;
  businessName: string;
  email: string;
  approvedDate?: string;
  isEmpty?: boolean;
  requestDate?: string;
}