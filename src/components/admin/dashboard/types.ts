export type ConfiguredStall = {
  id: number;
  size: "SMALL" | "MEDIUM" | "LARGE";
  reserved: boolean;
};

export type Stat = {
  total: number,
  reserved: number,
  available: number,
};
