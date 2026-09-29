import { circleIntersects, DECK, MAP_BLOCKS, type Block } from './map';

export type Body = { x: number; y: number; z: number; vy: number; grounded: boolean; crouched: boolean; radius: number };
export const STAND_HEIGHT = 1.76;
export const CROUCH_HEIGHT = 1.08;
export const EYE_HEIGHT = 1.61;
export const CROUCH_EYE = .94;

export function bodyHeight(b: Body): number { return b.crouched ? CROUCH_HEIGHT : STAND_HEIGHT; }
export function eyeHeight(b: Body): number { return b.crouched ? CROUCH_EYE : EYE_HEIGHT; }

function overlapsBody(block: Block, x: number, z: number, foot: number, height: number, radius: number): boolean {
  if (!circleIntersects(block, x, z, radius)) return false;
  return foot < block.y + block.h - .025 && foot + height > block.y + .025;
}
export function canStand(b: Body): boolean {
  return !MAP_BLOCKS.some(block => overlapsBody(block, b.x, b.z, b.y, STAND_HEIGHT, b.radius));
}
export function collides(x: number, z: number, foot: number, height: number, radius: number): boolean {
  if (x < DECK.minX + radius || x > DECK.maxX - radius || z < DECK.minZ + radius || z > DECK.maxZ - radius) return true;
  return MAP_BLOCKS.some(block => overlapsBody(block, x, z, foot, height, radius));
}
function floorAt(x: number, z: number, y: number, radius: number): number {
  let best = 0;
  for (const block of MAP_BLOCKS) {
    const top = block.y + block.h;
    if (block.standable && top <= y + .06 && top > best && circleIntersects(block, x, z, radius * .72)) best = top;
  }
  return best;
}

export function moveBody(b: Body, vx: number, vz: number, dt: number, jump = false): void {
  if (dt <= 0) return;
  const h = bodyHeight(b);
  if (jump && b.grounded) { b.vy = 5.95; b.grounded = false; }
  const steps = Math.max(1, Math.ceil(Math.hypot(vx, vz) * dt / .16));
  const dx = vx * dt / steps, dz = vz * dt / steps;
  for (let i = 0; i < steps; i++) {
    // Axis resolution permits wall sliding, while a small legal step is climbed immediately.
    for (const [ax, az] of [[dx, 0], [0, dz]]) {
      const nx = b.x + ax, nz = b.z + az;
      if (!collides(nx, nz, b.y, h, b.radius)) { b.x = nx; b.z = nz; continue; }
      if (!b.grounded) continue;
      let stepTop = Infinity;
      for (const block of MAP_BLOCKS) {
        const top = block.y + block.h;
        if (block.standable && top > b.y + .025 && top <= b.y + .38 && circleIntersects(block, nx, nz, b.radius)) stepTop = Math.min(stepTop, top);
      }
      if (stepTop < Infinity && !collides(nx, nz, stepTop + .026, h, b.radius)) {
        b.x = nx; b.z = nz; b.y = stepTop + .026;
      }
    }
  }
  const floor = floorAt(b.x, b.z, b.y, b.radius);
  if (b.grounded && b.y <= floor + .07 && b.vy <= 0) { b.y = floor; b.vy = 0; return; }
  const before = b.y;
  b.vy = Math.max(-24, b.vy - 17.5 * dt);
  b.y += b.vy * dt;
  if (b.vy <= 0) {
    let landing = 0;
    for (const block of MAP_BLOCKS) {
      const top = block.y + block.h;
      if (block.standable && top <= before + .025 && top >= b.y - .025 && circleIntersects(block, b.x, b.z, b.radius * .72)) landing = Math.max(landing, top);
    }
    if (b.y <= landing) { b.y = landing; b.vy = 0; b.grounded = true; return; }
    if (b.y <= 0) { b.y = 0; b.vy = 0; b.grounded = true; return; }
  }
  b.grounded = false;
  if (b.y < -3) { b.x = 0; b.z = 0; b.y = 0; b.vy = 0; b.grounded = true; }
}

export function makeBody(x: number, z: number, radius = .34): Body {
  return { x, y: 0, z, vy: 0, grounded: true, crouched: false, radius };
}
