import * as THREE from 'three';

export type MaterialKind = 'steel' | 'wood' | 'tarp' | 'wall' | 'rail' | 'deck';
export type Block = {
  id: string; x: number; z: number; y: number; w: number; d: number; h: number;
  angle: number; kind: MaterialKind; standable: boolean; solid: boolean; source: string;
};
export type Vec2 = { x: number; z: number };

const blocks: Block[] = [];
function add(id: string, kind: MaterialKind, x: number, z: number, w: number, d: number, h: number, y = 0, angle = 0, standable = true, source = 'R05') {
  blocks.push({ id, kind, x, z, w, d, h, y, angle, standable, solid: true, source });
}

// x = port/starboard, z = red/blue longitudinal direction. Dimensions are estimates in metres.
// Primary geometry is entered only here and drives rendering, collision, bullet tracing and the map.
add('port-rail', 'rail', -13.65, 0, .3, 75, 1.05, 0, 0, false);
add('starboard-rail', 'rail', 13.65, 0, .3, 75, 1.05, 0, 0, false);
add('red-end-rail', 'rail', 0, -37.4, 27.6, .3, 1.05, 0, 0, false);
add('blue-end-rail', 'rail', 0, 37.4, 27.6, .3, 1.05, 0, 0, false);

for (const s of [-1, 1]) {
  const p = s < 0 ? 'red' : 'blue';
  // Three exits in the inner cabin wall: two broad side openings and a narrow centre door.
  add(`${p}-cabin-back`, 'wall', 0, s * 36.4, 18, .35, 4.2, 0, 0, false, 'R07');
  add(`${p}-cabin-left`, 'wall', -8.8, s * 32.7, .35, 7.4, 4.2, 0, 0, false, 'R07');
  add(`${p}-cabin-right`, 'wall', 8.8, s * 32.7, .35, 7.4, 4.2, 0, 0, false, 'R07');
  add(`${p}-cabin-front-1`, 'wall', -7.55, s * 28.9, 2.5, .4, 4.2, 0, 0, false, 'R07');
  add(`${p}-cabin-front-2`, 'wall', -2.75, s * 28.9, 2.7, .4, 4.2, 0, 0, false, 'R07');
  add(`${p}-cabin-front-3`, 'wall', 2.75, s * 28.9, 2.7, .4, 4.2, 0, 0, false, 'R07');
  add(`${p}-cabin-front-4`, 'wall', 7.55, s * 28.9, 2.5, .4, 4.2, 0, 0, false, 'R07');
  add(`${p}-cabin-roof`, 'wall', 0, s * 32.7, 18, 7.4, .35, 4.05, 0, false, 'R07');
  add(`${p}-port-bulkhead`, 'wall', -10.7, s * 26.7, 3.4, .45, 2.8, 0, 0, false, 'R07');
  add(`${p}-starboard-bulkhead`, 'wall', 10.7, s * 26.7, 3.4, .45, 2.8, 0, 0, false, 'R07');

  // The asymmetric timber crates and metal stacks outside the cabin.
  add(`${p}-wood-a`, 'wood', -6.9, s * 24.1, 2.5, 2.5, 1.15, 0, 0, true, 'R07');
  add(`${p}-wood-b`, 'wood', -8.8, s * 21.3, 2.5, 2.5, 2.05, 0, 0, true, 'R07');
  add(`${p}-wood-step`, 'wood', -5.2, s * 22.6, 1.7, 1.8, .62, 0, 0, true, 'R07');
  add(`${p}-wood-mid`, 'wood', 4.5, s * 25.2, 2.1, 2.1, 1.35, 0, 0, true, 'R07');
  add(`${p}-steel-mid`, 'steel', 6.6, s * 21.2, 4.6, 2.7, 2.6, 0, 0, true, 'R07');
  add(`${p}-port-container`, 'steel', -9.7, s * 14.9, 5.3, 8.8, 2.65, 0, 0, true, 'R05');
  add(`${p}-port-upper`, 'steel', -9.7, s * 15.1, 5.3, 5.2, 2.55, 2.65, 0, false, 'R09');
  add(`${p}-starboard-container`, 'steel', 9.65, s * 14.6, 5.3, 9.2, 2.65, 0, 0, true, 'R05');
  add(`${p}-starboard-upper`, 'steel', 9.65, s * 17.8, 5.3, 3.2, 2.55, 2.65, 0, false, 'R09');
  add(`${p}-outer-wood`, 'wood', 3.4, s * 17.3, 2.2, 2.2, 1.15, 0, 0, true, 'R05');
  add(`${p}-outer-wood-2`, 'wood', -1.1, s * 19.2, 1.55, 1.6, .85, 0, 0, true, 'R05');
}

add('central-tarp-red', 'tarp', -2.4, -4.35, 3.0, 7.0, 2.15, 0, -Math.PI / 5.5, true, 'R05,R08');
add('central-tarp-blue', 'tarp', 2.45, 4.15, 3.0, 7.0, 2.15, 0, Math.PI / 5.5, true, 'R05,R08');
add('central-port-crate', 'wood', -7.1, -1.6, 2.15, 2.0, 1.22, 0, 0, true, 'R06');
add('central-port-small', 'wood', -9.25, 1.0, 1.5, 1.55, .68, 0, 0, true, 'R06');
add('central-starboard-crate', 'wood', 8.2, 1.5, 2.15, 2.0, 1.22, 0, 0, true, 'R06');
add('central-starboard-small', 'wood', 10.2, -1.3, 1.5, 1.55, .68, 0, 0, true, 'R06');

// Open ended covered side passages, with a deck-level floor and an elevated lookout on their roof.
for (const s of [-1, 1]) {
  const p = s < 0 ? 'port' : 'starboard';
  const x = s * 12.1;
  add(`${p}-passage-inner`, 'steel', s * 10.88, 0, .28, 10.5, 2.25, 0, 0, false, 'R05,R09');
  add(`${p}-passage-outer`, 'steel', s * 13.35, 0, .25, 10.5, 2.25, 0, 0, false, 'R05,R09');
  add(`${p}-passage-roof`, 'steel', x, 0, 2.72, 10.5, .35, 2.22, 0, true, 'R09');
  add(`${p}-lookout-step-a`, 'wood', s * 8.45, s * 7.4, 1.45, 1.45, .62, 0, 0, true, 'R09');
  add(`${p}-lookout-step-b`, 'wood', s * 9.7, s * 7.4, 1.45, 1.45, 1.22, 0, 0, true, 'R09');
  add(`${p}-lookout-step-c`, 'wood', s * 10.35, s * 6.2, 1.4, 1.4, 1.82, 0, 0, true, 'R09');
}

export const MAP_BLOCKS = blocks;
export const DECK = { minX: -13.5, maxX: 13.5, minZ: -37.2, maxZ: 37.2 };
export const SPAWNS = {
  red: [{ x: -5.8, z: -33.2 }, { x: -2.8, z: -33.2 }, { x: 0, z: -33.2 }, { x: 2.8, z: -33.2 }, { x: 5.8, z: -33.2 }],
  blue: [{ x: 5.8, z: 33.2 }, { x: 2.8, z: 33.2 }, { x: 0, z: 33.2 }, { x: -2.8, z: 33.2 }, { x: -5.8, z: 33.2 }]
};

export function localPoint(b: Block, x: number, z: number): Vec2 {
  const dx = x - b.x, dz = z - b.z, c = Math.cos(b.angle), s = Math.sin(b.angle);
  return { x: dx * c + dz * s, z: -dx * s + dz * c };
}
export function insideXZ(b: Block, x: number, z: number, margin = 0): boolean {
  const p = localPoint(b, x, z);
  return Math.abs(p.x) <= b.w / 2 + margin && Math.abs(p.z) <= b.d / 2 + margin;
}
export function circleIntersects(b: Block, x: number, z: number, r: number): boolean {
  const p = localPoint(b, x, z);
  const dx = Math.max(Math.abs(p.x) - b.w / 2, 0), dz = Math.max(Math.abs(p.z) - b.d / 2, 0);
  return dx * dx + dz * dz < r * r;
}

export type RayHit = { block: Block; enter: number; exit: number; point: THREE.Vector3 };
const rayPoint = new THREE.Vector3();
export function traceBlocks(origin: THREE.Vector3, dir: THREE.Vector3, maxDistance: number, ignoreDeck = true): RayHit[] {
  const out: RayHit[] = [];
  for (const b of MAP_BLOCKS) {
    if (!b.solid || (ignoreDeck && b.kind === 'deck')) continue;
    const c = Math.cos(b.angle), s = Math.sin(b.angle);
    const ox = origin.x - b.x, oz = origin.z - b.z;
    const o = [ox * c + oz * s, origin.y - b.y - b.h / 2, -ox * s + oz * c];
    const d = [dir.x * c + dir.z * s, dir.y, -dir.x * s + dir.z * c];
    const half = [b.w / 2, b.h / 2, b.d / 2];
    let near = -Infinity, far = Infinity;
    for (let axis = 0; axis < 3; axis++) {
      if (Math.abs(d[axis]) < 1e-8) {
        if (Math.abs(o[axis]) > half[axis]) { near = Infinity; break; }
      } else {
        let a = (-half[axis] - o[axis]) / d[axis];
        let z = (half[axis] - o[axis]) / d[axis];
        if (a > z) [a, z] = [z, a];
        near = Math.max(near, a); far = Math.min(far, z);
      }
    }
    if (far >= Math.max(near, 0) && near <= maxDistance && far >= 0) {
      const enter = Math.max(0, near);
      rayPoint.copy(dir).multiplyScalar(enter).add(origin);
      out.push({ block: b, enter, exit: Math.min(far, maxDistance), point: rayPoint.clone() });
    }
  }
  out.sort((a, b) => a.enter - b.enter);
  return out;
}

export function blockedLine(a: THREE.Vector3, b: THREE.Vector3): boolean {
  const d = b.clone().sub(a), distance = d.length();
  if (distance < .01) return false;
  d.divideScalar(distance);
  return traceBlocks(a, d, distance - .02).some(h => h.enter > .015 && h.block.kind !== 'rail');
}

export function navigationBlocked(x: number, z: number, radius = .42): boolean {
  if (x < -12.95 || x > 12.95 || z < -36.6 || z > 36.6) return true;
  return MAP_BLOCKS.some(b => b.y < 1.55 && b.y + b.h > .2 && circleIntersects(b, x, z, radius));
}
