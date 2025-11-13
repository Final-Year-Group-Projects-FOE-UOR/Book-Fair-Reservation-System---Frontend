export type Stall = {
  id: string | null;
  size?: "small" | "medium" | "large";
  reserved?: boolean;
  isEmpty: boolean;
  businessName?: string | null;
  email?: string | null;
};