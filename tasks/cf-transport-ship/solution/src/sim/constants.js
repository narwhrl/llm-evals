export const GRAVITY = 16.4;
export const RADIUS = 0.3;
export const STAND_H = 1.74;
export const CROUCH_H = 1.12;
export const STAND_EYE = 1.6;
export const CROUCH_EYE = 0.96;
export const STEP = 0.58;
export const JUMP = 6.58;
export const WALK = 5.42;
export const SLOW = 2.42;
export const CROUCH_SPEED = 2.15;

export const BOUNDS = { minX: -8.35, maxX: 8.35, minZ: -30.5, maxZ: 30.5 };

export const HOLES = [
  { x: 5.15, z: -13.35, sx: 1.5, sz: 2.4 },
  { x: 5.15, z: 12.85, sx: 1.5, sz: 2.4 },
];

export const TUNNEL = {
  minX: 4.35,
  maxX: 6.0,
  minZ: -14.7,
  maxZ: 14.2,
  floor: -2.55,
};

export function deckAt(x, z) {
  if (x < BOUNDS.minX || x > BOUNDS.maxX || z < BOUNDS.minZ || z > BOUNDS.maxZ) return null;
  for (let i = 0; i < HOLES.length; i += 1) {
    const hole = HOLES[i];
    if (Math.abs(x - hole.x) <= hole.sx * 0.5 && Math.abs(z - hole.z) <= hole.sz * 0.5) return null;
  }
  return 0;
}

export function tunnelAt(x, z) {
  if (x < TUNNEL.minX || x > TUNNEL.maxX || z < TUNNEL.minZ || z > TUNNEL.maxZ) return null;
  return TUNNEL.floor;
}

export function makeFloors() {
  return { deck: deckAt, tunnel: tunnelAt };
}
