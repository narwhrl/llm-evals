// Shared layout constants. All scene parts read from here so the pieces
// agree on where walls, openings and road edges sit.
export const L = {
  baseSize: 24,
  ground: 11.5,
  tabletop: 11.8,
  roadY: 0.1,
  walkY: 0.24,
  blockMax: 3.5,

  store: {
    x0: -8,
    x1: 1,
    z0: -6,
    z1: 1,
    wallTop: 3.4,
    fasciaTop: 4.3,
    roofY: 4.55,
    floorY: 0.24,
    glassTop: 2.95,
    wallT: 0.25
  },
  door: { x0: -2.2, x1: -0.2, top: 2.9 },
  winA: { x0: -7.6, x1: -2.6 },
  winE: { z0: -3.6, z1: 0.9 },
  awning: { x0: -3.4, x1: 0.95, z: 2.3, y0: 3.26, y1: 3.4 },

  alley: { x0: -9.6, x1: -8, z0: -8.8, z1: 1, y: 0.245 },
  westBuilding: { x0: -11.5, x1: -9.6, z0: -11.5, z1: 0.5, h: 5.6 },
  northBuilding: { x0: -9.6, x1: 1, z0: -11.5, z1: -8.8, h: 7.2 },
  farBuilding: { x0: 4, x1: 11.5, z0: -11.5, z1: -9.6, h: 6 }
};
