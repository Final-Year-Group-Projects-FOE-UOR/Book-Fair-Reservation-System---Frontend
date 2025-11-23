export type Stall = {
  id: string;
  size: "small" | "medium" | "large";
  reserved: boolean;
  pending: boolean;
  businessName: string;
  email: string;
  approvedDate?: string;
  isEmpty: boolean;
}