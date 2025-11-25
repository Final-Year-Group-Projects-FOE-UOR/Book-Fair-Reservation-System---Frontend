export type StallConfig = {
  small: {
    count: number;
    price: number;
  };
  medium: {
    count: number;
    price: number;
  };
  large: {
    count: number;
    price: number;
  };
  namingPattern: "numeric" | "alphanumeric";
  prefix: string;
};

export type Stall = {
  isConfigured: boolean;
  stallName: string;
  type: "SMALL" | "MEDIUM" | "LARGE";
  price: number;
  dimensions: string;
  mapMetadata: {
    mapWidth: number;
    mapHeight: number;
    mapWidthPercent: number;
    mapHeightPercent: number;
    mapRotation: number;
    mapShape: string;
    mapSize: number;
    mapPosition: { x: number; y: number };
  };
};
