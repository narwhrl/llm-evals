import { P } from './palette.js';
import { Frame, VoxelGrid, hash3 } from './voxel.js';
import { gate, mainHall, sideHall, tower } from './buildings.js';
import { burner, lion, stoneLantern } from './parts.js';

// World extents (voxels). The axis runs along z; the gate faces south (+z).
export const BOUNDS = { minX: -104, maxX: 104, minY: -5, maxY: 76, minZ: -112, maxZ: 116 };

// Site plan along the axis.
const WALL = { x: 62, back: -80, front: 72 };
const MAIN_Z = -38;
const SIDE = { x: 42, z: 6 };
const TOWER = { x: 34, z: 46 };
const GATE_Z = WALL.front;
const ROAD = 4;

const inCompound = (x, z) => Math.abs(x) < WALL.x && z > WALL.back && z < WALL.front;

// Terrain height outside the compound: a low hill rises behind it.
function terrain(x, z) {
  if (Math.abs(x) <= WALL.x + 3 && z >= WALL.back - 3 && z <= WALL.front + 30) return 0;
  const n = hash3(x >> 3, 0, z >> 3) * 0.6 + hash3(x >> 2, 1, z >> 2) * 0.4;
  let h = 0;
  if (z < WALL.back - 3) h += (WALL.back - 3 - z) * 0.18 + n * 2.2;
  const edge = Math.max(0, Math.abs(x) - WALL.x - 8);
  h += edge * 0.06 * (0.6 + n);
  return Math.max(0, Math.min(10, Math.round(h)));
}

function ground(g) {
  for (let z = BOUNDS.minZ; z <= BOUNDS.maxZ; z++) {
    for (let x = BOUNDS.minX; x <= BOUNDS.maxX; x++) {
      const t = terrain(x, z);
      const r = hash3(x, 7, z);
      g.box(x, BOUNDS.minY, z, x, -2 + t, z, P.soil);
      let top;
      if (inCompound(x, z)) {
        // Square flagstones with darker joints every fourth course.
        top = (x & 3) === 0 || (z & 3) === 0 ? P.paveDark : P.pave;
      } else if (t > 0 && r < 0.12) top = P.rock;
      else top = r < 0.55 ? P.grass : r < 0.85 ? P.grassDark : P.grassDry;
      g.set(x, -1 + t, z, top);
    }
  }
  // Bedrock band on the diorama sides.
  for (let x = BOUNDS.minX; x <= BOUNDS.maxX; x++) {
    for (const z of [BOUNDS.minZ, BOUNDS.maxZ]) g.box(x, BOUNDS.minY, z, x, -4, z, P.rockDark);
  }
  for (let z = BOUNDS.minZ; z <= BOUNDS.maxZ; z++) {
    for (const x of [BOUNDS.minX, BOUNDS.maxX]) g.box(x, BOUNDS.minY, z, x, -4, z, P.rockDark);
  }
}

// Lawn bed sunk into the paving with a marble kerb.
function lawn(g, xa, z0, xb, z1) {
  const x0 = Math.min(xa, xb);
  const x1 = Math.max(xa, xb);
  for (let z = z0; z <= z1; z++) {
    for (let x = x0; x <= x1; x++) {
      const kerb = x === x0 || x === x1 || z === z0 || z === z1;
      g.set(x, -1, z, kerb ? P.marbleShade : hash3(x, 3, z) < 0.6 ? P.grass : P.grassDark);
    }
  }
}

function paths(g) {
  // Imperial way on the axis, from outside the gate to the main hall stairs.
  for (let z = MAIN_Z + 26; z <= BOUNDS.maxZ; z++) {
    for (let x = -ROAD; x <= ROAD; x++) {
      const c = Math.abs(x) === ROAD ? P.slabEdge : Math.abs(x) <= 1 ? P.marble : P.slab;
      g.set(x, -1, z, c);
    }
  }
  // Cross axis linking the side halls.
  for (let x = -SIDE.x + 12; x <= SIDE.x - 12; x++) {
    for (let z = SIDE.z - 3; z <= SIDE.z + 3; z++) {
      if (Math.abs(x) <= ROAD) continue;
      g.set(x, -1, z, Math.abs(z - SIDE.z) === 3 ? P.slabEdge : P.slab);
    }
  }
  // Walks from the axis through the bell and drum tower arches.
  for (const s of [-1, 1]) {
    for (let x = ROAD + 1; x <= TOWER.x + 12; x++) {
      for (let z = TOWER.z - 3; z <= TOWER.z + 3; z++) g.set(s * x, -1, z, Math.abs(z - TOWER.z) === 3 ? P.slabEdge : P.slab);
    }
  }
}

// Red enclosure wall with a grey brick plinth and a glazed tile coping.
function wallSegment(g, x0, z0, x1, z1) {
  const alongX = z0 === z1;
  const n = alongX ? Math.abs(x1 - x0) : Math.abs(z1 - z0);
  const sx = Math.sign(x1 - x0);
  const sz = Math.sign(z1 - z0);
  for (let i = 0; i <= n; i++) {
    const x = x0 + sx * i;
    const z = z0 + sz * i;
    for (let t = -1; t <= 1; t++) {
      const wx = alongX ? x : x + t;
      const wz = alongX ? z + t : z;
      g.box(wx, 0, wz, wx, 1, wz, P.brickGrey);
      g.box(wx, 2, wz, wx, 7, wz, P.wallRed);
      g.set(wx, 8, wz, P.wood);
    }
    for (let t = -2; t <= 2; t++) {
      const wx = alongX ? x : x + t;
      const wz = alongX ? z + t : z;
      g.set(wx, 9 - (Math.abs(t) === 2 ? 1 : 0), wz, Math.abs(t) === 2 ? P.tileYEdge : P.tileY);
    }
    g.set(x, 10, z, P.ridgeY);
    if (i % 12 === 0) g.set(x, 11, z, P.ridgeY);
  }
}

function walls(g) {
  wallSegment(g, -WALL.x, WALL.back, WALL.x, WALL.back);
  wallSegment(g, -WALL.x, WALL.back, -WALL.x, WALL.front);
  wallSegment(g, WALL.x, WALL.back, WALL.x, WALL.front);
  wallSegment(g, -WALL.x, WALL.front, -16, WALL.front);
  wallSegment(g, 16, WALL.front, WALL.x, WALL.front);
}

function pine(g, x, z, y0, h) {
  g.box(x, y0, z, x, y0 + h, z, P.trunk);
  let r = 4;
  for (let y = y0 + 3; y <= y0 + h + 2; y++) {
    const layer = (y - y0) % 3;
    const rr = Math.max(1, r - layer);
    for (let dz = -rr; dz <= rr; dz++) {
      for (let dx = -rr; dx <= rr; dx++) {
        if (dx * dx + dz * dz > rr * rr + 1) continue;
        if (hash3(x + dx, y, z + dz) < 0.12) continue;
        g.set(x + dx, y, z + dz, (dx + dz + y) % 4 === 0 ? P.pineDark : P.pine);
      }
    }
    if (layer === 2) r = Math.max(1, r - 1);
  }
  g.set(x, y0 + h + 3, z, P.pineDark);
}

function cypress(g, x, z, y0, h) {
  g.box(x, y0, z, x, y0 + 2, z, P.trunk);
  for (let y = y0 + 2; y <= y0 + h; y++) {
    const t = (y - y0 - 2) / (h - 2);
    const rr = Math.round(2.4 * Math.sin(Math.PI * Math.min(1, t * 1.15)) + 0.4);
    for (let dz = -rr; dz <= rr; dz++) {
      for (let dx = -rr; dx <= rr; dx++) {
        if (dx * dx + dz * dz > rr * rr + 0.5) continue;
        g.set(x + dx, y, z + dz, hash3(x + dx, y, z + dz) < 0.3 ? P.pineDark : P.cypress);
      }
    }
  }
}

function roundTree(g, x, z, y0, h, r, a, b) {
  g.box(x, y0, z, x, y0 + h, z, P.trunk);
  g.set(x + 1, y0 + h - 1, z, P.trunk);
  g.set(x - 1, y0 + h - 2, z, P.trunk);
  const cy = y0 + h + r - 2;
  for (let dy = -r; dy <= r; dy++) {
    for (let dz = -r; dz <= r; dz++) {
      for (let dx = -r; dx <= r; dx++) {
        const d = dx * dx + dy * dy * 1.3 + dz * dz;
        if (d > r * r) continue;
        const n = hash3(x + dx, cy + dy, z + dz);
        if (d > (r - 1) * (r - 1) && n < 0.35) continue;
        g.set(x + dx, cy + dy, z + dz, n < 0.4 ? b : a);
      }
    }
  }
  // Fallen leaves under the crown.
  for (let dz = -r; dz <= r; dz++) {
    for (let dx = -r; dx <= r; dx++) {
      if (dx * dx + dz * dz > r * r || hash3(x + dx, 9, z + dz) > 0.25) continue;
      if (g.get(x + dx, y0, z + dz) === 0 && g.get(x + dx, y0 - 1, z + dz) !== 0) g.set(x + dx, y0 - 1, z + dz, a);
    }
  }
}

function trees(g) {
  // Courtyard: pines on the front lawns, ginkgos behind the main hall,
  // cypresses along the side walls.
  for (const s of [-1, 1]) {
    lawn(g, s * 8, 20, s * 24, 34);
    pine(g, s * 13, 25, 0, 9);
    pine(g, s * 19, 30, 0, 8);
    roundTree(g, s * 50, -66, 0, 8, 6, P.ginkgo, P.ginkgoDeep);
    roundTree(g, s * 20, -72, 0, 7, 5, P.ginkgo, P.ginkgoDeep);
    for (let z = -48; z <= 60; z += 12) {
      if (Math.abs(z - TOWER.z) > 12 && Math.abs(z - SIDE.z) > 24) cypress(g, s * 56, z, 0, 11);
    }
    lawn(g, s * 54, -64, s * 59, 64);
  }
  // Outside: a scattered wood, thinning towards the entrance road.
  for (let z = BOUNDS.minZ + 4; z <= BOUNDS.maxZ - 4; z += 7) {
    for (let x = BOUNDS.minX + 4; x <= BOUNDS.maxX - 4; x += 7) {
      const jx = x + Math.floor(hash3(x, 11, z) * 5) - 2;
      const jz = z + Math.floor(hash3(x, 12, z) * 5) - 2;
      if (Math.abs(jx) < WALL.x + 7 && jz > WALL.back - 7 && jz < WALL.front + 8) continue;
      if (Math.abs(jx) < 16 && jz > WALL.front) continue;
      const r = hash3(jx, 13, jz);
      if (r > 0.4) continue;
      const y0 = terrain(jx, jz);
      if (r < 0.24) pine(g, jx, jz, y0, 7 + Math.floor(r * 14));
      else if (r < 0.31) cypress(g, jx, jz, y0, 9);
      else if (r < 0.36) roundTree(g, jx, jz, y0, 6, 4, P.ginkgo, P.ginkgoDeep);
      else roundTree(g, jx, jz, y0, 6, 4, P.maple, P.wallRedDark);
    }
  }
}

function ornaments(g) {
  const f = new Frame(g, 0, 0, 0, 0);
  burner(f, 0, MAIN_Z + 32, 0);
  for (const s of [-1, 1]) {
    lion(f, s * 9, GATE_Z + 14, 0, -s);
    lion(f, s * 9, MAIN_Z + 32, 0, -s);
    for (const z of [-2, 16, 38, 58]) stoneLantern(f, s * (ROAD + 3), z, 0);
    for (const z of [GATE_Z + 24, GATE_Z + 34]) stoneLantern(f, s * (ROAD + 3), z, 0);
  }
}

export function buildWorld() {
  const g = new VoxelGrid(BOUNDS.minX, BOUNDS.maxX, BOUNDS.minY, BOUNDS.maxY, BOUNDS.minZ, BOUNDS.maxZ);
  ground(g);
  paths(g);
  walls(g);
  trees(g);
  mainHall(new Frame(g, 0, 0, MAIN_Z, 0));
  sideHall(new Frame(g, SIDE.x, 0, SIDE.z, 1));
  sideHall(new Frame(g, -SIDE.x, 0, SIDE.z, 3));
  // Towers face the axis so their through-arches line up with the walks;
  // the west one is mirrored so both side stairs point south.
  tower(new Frame(g, TOWER.x, 0, TOWER.z, 1), 'bell', -1);
  tower(new Frame(g, -TOWER.x, 0, TOWER.z, 3), 'drum', 1);
  gate(new Frame(g, 0, 0, GATE_Z, 0));
  ornaments(g);
  return g;
}
