import { C } from './voxels.js';
import { lantern, stoneLion } from './buildings.js';

/* Layout bounds of the compound. */
export const LAYOUT = {
  minX: -66,
  maxX: 66,
  minZ: -98,
  maxZ: 74,
  gateZ: 62,
  mainZ: -52,
};

function tree(w, x, z, scale = 1) {
  const h = 5 * scale;
  w.box(x, h / 2, z, 1.2 * scale, h, 1.2 * scale, C.trunk);
  // Blocky canopy: three stacked slabs with overhang.
  w.box(x, h + 1.2 * scale, z, 5.5 * scale, 2.2 * scale, 5.5 * scale, C.leaf);
  w.box(x, h + 3.0 * scale, z, 4.2 * scale, 1.6 * scale, 4.2 * scale, C.leafDark);
  w.box(x, h + 4.4 * scale, z, 2.6 * scale, 1.4 * scale, 2.6 * scale, C.leaf);
}

function lanternPost(w, x, z) {
  w.box(x, 1.6, z, 0.7, 3.2, 0.7, C.woodDark);
  w.box(x, 3.4, z, 1.6, 0.4, 1.6, C.woodDark);
  lantern(w, x, 4.4, z);
}

function incenseBurner(w, x, z) {
  w.box(x, 0.5, z, 4.4, 1.0, 4.4, C.stoneDark);
  w.box(x, 1.9, z, 3.2, 1.8, 3.2, C.bronze);
  w.box(x, 3.1, z, 3.6, 0.7, 3.6, C.bronze);
  w.box(x, 3.9, z, 2.4, 1.0, 2.4, C.bronze);
  for (const sx of [-1, 1]) {
    w.box(x + sx * 2.0, 2.6, z, 0.7, 1.8, 0.7, C.bronze);
  }
}

function pond(w, x, z, wd, dp) {
  // Stone rim + still water slab (slightly reflective dark teal).
  w.box(x, 0.15, z, wd + 1.6, 0.5, dp + 1.6, C.stoneDark);
  w.box(x, 0.32, z, wd, 0.35, dp, 0x3d6f86);
}

/** Build ground, roads, courtyards, walls and scenery props. */
export function buildEnvironment(w) {
  const { minX, maxX, minZ, maxZ, gateZ, mainZ } = LAYOUT;

  // Far ground plane (horizon fill) + compound lawn.
  w.box(0, -1.6, -10, 900, 1.2, 900, 0x4e7a3f);
  w.box(0, -0.5, (minZ + maxZ) / 2, maxX - minX, 1.0, maxZ - minZ, C.grass);

  // Lawn tone patches for texture.
  const patches = [
    [-40, 30, 30, 26], [40, 30, 30, 26], [-44, -40, 26, 34], [44, -40, 26, 34],
    [-30, 55, 18, 12], [30, 55, 18, 12], [-48, 8, 20, 40], [48, 8, 20, 40],
    [0, -70, 26, 18],
  ];
  for (const [px, pz, pw, pd] of patches) {
    w.box(px, 0.03, pz, pw, 0.12, pd, C.grassDark);
  }

  // Main axis path: gate → courtyard → main hall plaza.
  const pathW = 10;
  w.box(0, 0.1, (gateZ + mainZ + 14) / 2, pathW, 0.22, gateZ - (mainZ + 14), C.paving);
  // Checker slabs along the axis path.
  for (let z = mainZ + 16; z < gateZ + 4; z += 4) {
    for (let x = -pathW / 2 + 2; x < pathW / 2; x += 4) {
      const alt = (Math.round((x + 50) / 4) + Math.round((z + 100) / 4)) % 2 === 0;
      if (alt) w.box(x, 0.22, z, 3.7, 0.08, 3.7, C.pavingAlt);
    }
  }
  // Gate apron (outside the gate, south).
  w.box(0, 0.1, maxZ - 8, 30, 0.22, 16, C.paving);

  // Cross path connecting the side halls.
  const crossZ = 6;
  w.box(0, 0.1, crossZ, 88, 0.22, 7, C.paving);
  for (let x = -42; x <= 42; x += 4) {
    if ((x / 4) % 2 === 0) w.box(x, 0.22, crossZ, 3.7, 0.08, 6.6, C.pavingAlt);
  }

  // Main hall plaza.
  w.box(0, 0.1, -34, 52, 0.22, 24, C.paving);
  for (let x = -24; x <= 24; x += 4) {
    for (let z = -44; z <= -24; z += 4) {
      if (((x / 4) + (z / 4)) % 2 === 0) w.box(x, 0.22, z, 3.7, 0.08, 3.7, C.pavingAlt);
    }
  }

  // Side walkways hugging the walls.
  w.box(-56, 0.08, (minZ + maxZ) / 2, 6, 0.16, maxZ - minZ - 8, C.paving);
  w.box(56, 0.08, (minZ + maxZ) / 2, 6, 0.16, maxZ - minZ - 8, C.paving);

  // Perimeter walls: stone base + red wall + grey tile cap, with gate gap on the south.
  const wallH = 6;
  const seg = (cx, cz, sx, sz) => {
    w.box(cx, 1, cz, sx, 2, sz, C.stoneDark);
    w.box(cx, 3, cz, sx, 2.4, sz, C.redWall);
    w.box(cx, 5.4, cz, sx, 1.6, sz, C.redWallDark);
    w.box(cx, 6.5, cz, sx + (sx < sz ? 0.8 : 0), 0.7, sz + (sz < sx ? 0.8 : 0), C.roofGrey);
    w.box(cx, 7.0, cz, sx + (sx < sz ? 0.4 : 0), 0.35, sz + (sz < sx ? 0.4 : 0), C.roofGreyDark);
    void wallH;
  };
  // West / east walls.
  seg(minX, (minZ + maxZ) / 2, 2, maxZ - minZ);
  seg(maxX, (minZ + maxZ) / 2, 2, maxZ - minZ);
  // North wall.
  seg(0, minZ, maxX - minX, 2);
  // South wall with gate gap (gate width 26 + margin).
  const gap = 17;
  const southLeftCx = (minX + -gap) / 2;
  const southLeftW = -gap - minX;
  const southRightCx = (gap + maxX) / 2;
  const southRightW = maxX - gap;
  w.box(southLeftCx, 1, maxZ, southLeftW, 2, 2, C.stoneDark);
  w.box(southLeftCx, 3, maxZ, southLeftW, 2.4, 2, C.redWall);
  w.box(southLeftCx, 5.4, maxZ, southLeftW, 1.6, 2, C.redWallDark);
  w.box(southLeftCx, 6.5, maxZ, southLeftW, 0.7, 2.8, C.roofGrey);
  w.box(southRightCx, 1, maxZ, southRightW, 2, 2, C.stoneDark);
  w.box(southRightCx, 3, maxZ, southRightW, 2.4, 2, C.redWall);
  w.box(southRightCx, 5.4, maxZ, southRightW, 1.6, 2, C.redWallDark);
  w.box(southRightCx, 6.5, maxZ, southRightW, 0.7, 2.8, C.roofGrey);

  // Avenue lantern posts along the axis path.
  for (const z of [50, 36, 22, -2, -18]) {
    lanternPost(w, -8.5, z);
    lanternPost(w, 8.5, z);
  }

  // Trees at courtyard corners and flanks.
  const trees = [
    [-52, 62, 1.1], [52, 62, 1.1],
    [-52, 34, 1.0], [52, 34, 1.0],
    [-52, -14, 1.15], [52, -14, 1.15],
    [-52, -66, 1.2], [52, -66, 1.2],
    [-24, -74, 1.0], [24, -74, 1.0],
    [-30, 46, 0.9], [30, 46, 0.9],
  ];
  for (const [x, z, s] of trees) tree(w, x, z, s);

  // Ornamental ponds in the front courtyard.
  pond(w, -26, 30, 14, 10);
  pond(w, 26, 30, 14, 10);

  // Incense burner on the plaza axis.
  incenseBurner(w, 0, -30);

  // Additional stone lions flanking the cross path entry.
  stoneLion(w, -6.5, 14, 's');
  stoneLion(w, 6.5, 14, 's');
}
