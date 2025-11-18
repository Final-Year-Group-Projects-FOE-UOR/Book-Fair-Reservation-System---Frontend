import { Stall } from "./types";



export const generateInitialStalls = ():Stall[] => {
    const stalls: Stall[] = [];
  const sizes = ['small', 'medium', 'large'] as const;
  
  // Define stalls based on the actual Trade Hall layout
  const stallLayout = [
    // Row A (Top)
    { id: 'A1', x: 23, y: 12 }, { id: 'A2', x: 29, y: 12 }, { id: 'A3', x: 35, y: 12 },
    { id: 'A4', x: 45, y: 12 }, { id: 'A5', x: 51, y: 12 }, { id: 'A6', x: 57, y: 12 },
    { id: 'A7', x: 63, y: 12 }, { id: 'A8', x: 69, y: 12 }, { id: 'A9', x: 80, y: 12 },
    { id: 'A10', x: 86, y: 12 },
    
    // Row B (Second row)
    { id: 'B1', x: 17, y: 22 }, { id: 'B2', x: 23, y: 22 }, { id: 'B3', x: 29, y: 22 },
    { id: 'B4', x: 41, y: 22 }, { id: 'B5', x: 49, y: 22 }, { id: 'B6', x: 57, y: 22 },
    { id: 'B7', x: 65, y: 22 }, { id: 'B8', x: 73, y: 22 }, { id: 'B9', x: 81, y: 22 },
    { id: 'B10', x: 87, y: 22 },
    
    // Row C (Middle section)
    { id: 'C1', x: 17, y: 32 }, { id: 'C2', x: 23, y: 32 }, { id: 'C3', x: 29, y: 32 },
    { id: 'C4', x: 41, y: 32 }, { id: 'C7', x: 65, y: 32 }, { id: 'C8', x: 73, y: 32 },
    { id: 'C9', x: 81, y: 32 }, { id: 'C10', x: 87, y: 32 },
    
    // Row D (Center blocks)
    { id: 'D1', x: 17, y: 42 }, { id: 'D2', x: 23, y: 42 }, { id: 'D3', x: 29, y: 42 },
    { id: 'D4', x: 41, y: 42 }, { id: 'D5', x: 49, y: 42 }, { id: 'D6', x: 57, y: 42 },
    { id: 'D7', x: 65, y: 42 }, { id: 'D8', x: 73, y: 42 }, { id: 'D9', x: 81, y: 42 },
    { id: 'D10', x: 87, y: 42 },
    
    // Row E (Bottom)
    { id: 'E1', x: 17, y: 52 }, { id: 'E2', x: 29, y: 52 }, { id: 'E3', x: 35, y: 52 },
    { id: 'E4', x: 41, y: 52 }, { id: 'E5', x: 49, y: 52 }, { id: 'E6', x: 57, y: 52 },
    { id: 'E7', x: 65, y: 52 }, { id: 'E8', x: 73, y: 52 }, { id: 'E9', x: 81, y: 52 },
    { id: 'E10', x: 87, y: 52 }
  ];
  
  stallLayout.forEach(stall => {
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const reserved = Math.random() < 0.3;
    
    stalls.push({
      id: stall.id,
      size,
      reserved,
      isEmpty: false,
      businessName: reserved ? `Business ${stall.id}` : null,
      email: reserved ? `vendor${stall.id.toLowerCase()}@example.com` : null,
      mapPosition: { x: stall.x, y: stall.y }
    });
  });
  
  return stalls;
};