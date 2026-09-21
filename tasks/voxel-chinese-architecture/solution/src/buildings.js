import { C } from './colors.js';

/**
 * Classical Chinese voxel builders.
 * Coordinate convention: Y up; +Z toward mountain gate (south / front).
 */

function column(world, x, y0, y1, z, color = C.WOOD) {
  world.fill(x, y0, z, x, y1, z, color);
  // base & capital accents
  world.set(x, y0, z, C.STONE);
  world.set(x, y1, z, C.WOOD_DARK);
}

function dougong(world, x, y, z, span = 1) {
  // layered bracket set under eaves
  for (let s = 0; s <= span; s++) {
    world.fill(x - s, y + s, z - s, x + s, y + s, z + s, C.WOOD);
    world.fill(x - s - 1, y + s, z, x + s + 1, y + s, z, C.WOOD_DARK);
    world.fill(x, y + s, z - s - 1, x, y + s, z + s + 1, C.WOOD_DARK);
  }
}

/**
 * Hip / xieshan-style pitched roof with upturned flying eaves.
 * @param {'gold'|'blue'} glaze
 */
function pitchedRoof(world, cx, cy, cz, halfW, halfD, height, glaze = 'gold', { hip = true } = {}) {
  const tile = glaze === 'gold' ? C.TILE_GOLD : C.TILE_BLUE;
  const tileDark = glaze === 'gold' ? C.TILE_GOLD_DARK : C.TILE_BLUE_DARK;

  for (let layer = 0; layer <= height; layer++) {
    const shrinkW = Math.floor((layer / height) * (halfW - 1));
    const shrinkD = Math.floor((layer / height) * (halfD - 1));
    const w = halfW - shrinkW;
    const d = halfD - shrinkD;
    const y = cy + layer;

    // roof deck
    for (let x = cx - w; x <= cx + w; x++) {
      for (let z = cz - d; z <= cz + d; z++) {
        const edge =
          x === cx - w || x === cx + w || z === cz - d || z === cz + d;
        world.set(x, y, z, edge ? tileDark : tile);
      }
    }

    // ridge beam on top layers
    if (layer >= height - 1) {
      world.fill(cx - Math.max(1, w - 1), y + 1, cz, cx + Math.max(1, w - 1), y + 1, cz, C.TILE_RIDGE);
    }
  }

  // flying eaves / upturned corners (翘角)
  const topY = cy + height;
  const corners = [
    [cx - halfW, cz - halfD],
    [cx + halfW, cz - halfD],
    [cx - halfW, cz + halfD],
    [cx + halfW, cz + halfD],
  ];
  for (const [ox, oz] of corners) {
    const dx = Math.sign(ox - cx) || 1;
    const dz = Math.sign(oz - cz) || 1;
    for (let i = 0; i < 4; i++) {
      world.set(ox + dx * i, cy - 1 + Math.floor(i * 0.6), oz + dz * i, tile);
      world.set(ox + dx * i, cy + Math.floor(i * 0.7), oz + dz * i, tileDark);
      world.set(ox + dx * (i + 1), cy + 1 + Math.floor(i * 0.5), oz + dz * (i + 1), C.GOLD);
    }
    // chiwen-like ridge end
    world.set(ox + dx * 3, topY - 1, oz + dz * 3, C.GOLD);
    world.set(ox + dx * 3, topY, oz + dz * 3, C.GOLD);
  }

  // eaves overhang plank
  world.fill(cx - halfW - 1, cy - 1, cz - halfD - 1, cx + halfW + 1, cy - 1, cz + halfD + 1, C.WOOD_DARK);
  // clear interior of eaves plank so only rim remains visually denser
  world.clear(cx - halfW + 1, cy - 1, cz - halfD + 1, cx + halfW - 1, cy - 1, cz + halfD - 1);

  if (hip) {
    // secondary hip ridges
    for (let i = 0; i < halfW; i++) {
      const t = i / halfW;
      const y = cy + Math.floor(t * height);
      world.set(cx - halfW + i, y, cz, C.TILE_RIDGE);
      world.set(cx + halfW - i, y, cz, C.TILE_RIDGE);
    }
  }
}

/** Multi-tier cuanjian (攒尖) pagoda roof */
function cuanjianRoof(world, cx, cy, cz, radius, tiers, glaze = 'blue') {
  const tile = glaze === 'gold' ? C.TILE_GOLD : C.TILE_BLUE;
  const tileDark = glaze === 'gold' ? C.TILE_GOLD_DARK : C.TILE_BLUE_DARK;
  let y = cy;
  let r = radius;
  for (let t = 0; t < tiers; t++) {
    for (let layer = 0; layer < 3; layer++) {
      const rr = r - layer;
      if (rr < 1) break;
      for (let x = cx - rr; x <= cx + rr; x++) {
        for (let z = cz - rr; z <= cz + rr; z++) {
          const dx = Math.abs(x - cx);
          const dz = Math.abs(z - cz);
          if (dx <= rr && dz <= rr && (dx === rr || dz === rr || layer === 0)) {
            world.set(x, y + layer, z, dx === rr || dz === rr ? tileDark : tile);
          }
        }
      }
      // corner upsweeps
      for (const [sx, sz] of [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ]) {
        world.set(cx + sx * (rr + 1), y + layer + 1, cz + sz * (rr + 1), C.GOLD);
        world.set(cx + sx * (rr + 2), y + layer + 2, cz + sz * (rr + 2), C.GOLD);
      }
    }
    y += 4;
    r = Math.max(2, r - 2);
  }
  // finial
  world.fill(cx, y, cz, cx, y + 3, cz, C.GOLD);
  world.set(cx, y + 4, cz, C.TILE_RIDGE);
}

function windowLattice(world, x, y0, y1, z, axis = 'x') {
  for (let y = y0; y <= y1; y++) {
    if (axis === 'x') {
      world.set(x, y, z, y % 2 === 0 ? C.WOOD_DARK : C.PAPER);
    } else {
      world.set(x, y, z, y % 2 === 0 ? C.WOOD_DARK : C.PAPER);
    }
  }
}

function door(world, x, y0, y1, z, width = 2) {
  world.clear(x - width, y0, z, x + width, y1, z);
  // door leaves
  for (let dx = -width; dx <= width; dx++) {
    for (let y = y0; y <= y1; y++) {
      world.set(x + dx, y, z, C.WOOD_DARK);
    }
  }
  // center seam & knobs
  world.fill(x, y0, z, x, y1, z, C.BLACK);
  world.set(x - 1, Math.floor((y0 + y1) / 2), z, C.GOLD);
  world.set(x + 1, Math.floor((y0 + y1) / 2), z, C.GOLD);
}

function lantern(world, x, y, z) {
  world.set(x, y, z, C.LANTERN);
  world.set(x, y + 1, z, C.LANTERN_GLOW);
  world.set(x, y + 2, z, C.LANTERN);
  world.set(x, y - 1, z, C.WOOD_DARK);
}

function stoneLion(world, x, y, z, facing = 1) {
  // stylized voxel lion
  world.fill(x - 1, y, z - 1, x + 1, y + 1, z + 1, C.LION);
  world.fill(x - 1, y + 2, z, x + 1, y + 3, z + facing, C.LION);
  world.set(x, y + 4, z + facing, C.LION); // head
  world.set(x - 1, y + 3, z + facing, C.BLACK); // eye
  world.set(x + 1, y + 3, z + facing, C.BLACK);
  world.set(x, y + 2, z + facing * 2, C.STONE_LIGHT); // muzzle
  // paws
  world.set(x - 1, y, z + facing * 2, C.STONE);
  world.set(x + 1, y, z + facing * 2, C.STONE);
  // base
  world.fill(x - 2, y - 1, z - 2, x + 2, y - 1, z + 2, C.STONE_DARK);
}

function steps(world, cx, y0, zFront, width, depth, rise = 1) {
  for (let i = 0; i < depth; i++) {
    const y = y0 + Math.floor(i * rise);
    const z = zFront - i;
    world.fill(cx - width, y, z, cx + width, y, z, i % 2 === 0 ? C.STONE : C.STONE_DARK);
  }
}

/**
 * Main hall — largest wudian/xieshan volume on central axis.
 */
export function buildMainHall(world, cx = 0, cz = -18) {
  const halfW = 14;
  const halfD = 9;
  const wallH = 10;
  const platform = 2;

  // raised stone platform
  world.fill(cx - halfW - 3, 0, cz - halfD - 3, cx + halfW + 3, platform - 1, cz + halfD + 4, C.STONE);
  world.fill(cx - halfW - 2, platform - 1, cz - halfD - 2, cx + halfW + 2, platform - 1, cz + halfD + 3, C.STONE_LIGHT);

  // red walls
  world.box(
    cx - halfW,
    platform,
    cz - halfD,
    cx + halfW,
    platform + wallH,
    cz + halfD,
    C.RED,
    { floor: true, ceiling: false },
  );
  // darker corners
  for (const [sx, sz] of [
    [-halfW, -halfD],
    [halfW, -halfD],
    [-halfW, halfD],
    [halfW, halfD],
  ]) {
    world.fill(cx + sx, platform, cz + sz, cx + sx, platform + wallH, cz + sz, C.RED_DARK);
  }

  // interior floor wood
  world.fill(cx - halfW + 1, platform, cz - halfD + 1, cx + halfW - 1, platform, cz + halfD - 1, C.WOOD_LIGHT);

  // columns along eaves (front / back / sides)
  for (let x = cx - halfW + 2; x <= cx + halfW - 2; x += 4) {
    column(world, x, platform, platform + wallH, cz + halfD, C.WOOD);
    column(world, x, platform, platform + wallH, cz - halfD, C.WOOD);
    dougong(world, x, platform + wallH, cz + halfD, 1);
    dougong(world, x, platform + wallH, cz - halfD, 1);
  }
  for (let z = cz - halfD + 3; z <= cz + halfD - 3; z += 4) {
    column(world, cx - halfW, platform, platform + wallH, z, C.WOOD);
    column(world, cx + halfW, platform, platform + wallH, z, C.WOOD);
  }

  // front door & windows
  door(world, cx, platform + 1, platform + 6, cz + halfD, 2);
  windowLattice(world, cx - 8, platform + 3, platform + 7, cz + halfD);
  windowLattice(world, cx + 8, platform + 3, platform + 7, cz + halfD);
  windowLattice(world, cx - halfW, platform + 3, platform + 7, cz);
  windowLattice(world, cx + halfW, platform + 3, platform + 7, cz);

  // gold plaque above door
  world.fill(cx - 3, platform + 7, cz + halfD + 1, cx + 3, platform + 8, cz + halfD + 1, C.GOLD);
  world.fill(cx - 2, platform + 7, cz + halfD + 1, cx + 2, platform + 8, cz + halfD + 1, C.RED_DARK);

  // roof
  pitchedRoof(world, cx, platform + wallH + 1, cz, halfW + 2, halfD + 2, 7, 'gold', { hip: true });

  // front steps
  steps(world, cx, 0, cz + halfD + 4, 6, 5, 0.4);

  // lanterns flanking entrance
  lantern(world, cx - 6, platform + 5, cz + halfD + 2);
  lantern(world, cx + 6, platform + 5, cz + halfD + 2);

  // balustrade on platform front
  for (let x = cx - halfW - 2; x <= cx + halfW + 2; x++) {
    if (Math.abs(x - cx) <= 6) continue;
    world.set(x, platform, cz + halfD + 3, C.STONE);
    world.set(x, platform + 1, cz + halfD + 3, C.STONE_LIGHT);
  }
}

/**
 * Side halls — symmetric flanking volumes, smaller than main hall.
 */
export function buildSideHall(world, cx, cz, glaze = 'blue') {
  const halfW = 7;
  const halfD = 6;
  const wallH = 7;
  const platform = 1;

  world.fill(cx - halfW - 2, 0, cz - halfD - 2, cx + halfW + 2, platform - 1, cz + halfD + 2, C.STONE);
  world.box(cx - halfW, platform, cz - halfD, cx + halfW, platform + wallH, cz + halfD, C.RED, {
    floor: true,
  });
  world.fill(cx - halfW + 1, platform, cz - halfD + 1, cx + halfW - 1, platform, cz + halfD - 1, C.WOOD_LIGHT);

  for (let x = cx - halfW + 2; x <= cx + halfW - 2; x += 3) {
    column(world, x, platform, platform + wallH, cz + halfD);
    column(world, x, platform, platform + wallH, cz - halfD);
    dougong(world, x, platform + wallH, cz + halfD, 1);
  }

  door(world, cx, platform + 1, platform + 5, cz + halfD, 1);
  windowLattice(world, cx - 4, platform + 2, platform + 5, cz + halfD);
  windowLattice(world, cx + 4, platform + 2, platform + 5, cz + halfD);

  pitchedRoof(world, cx, platform + wallH + 1, cz, halfW + 1, halfD + 1, 5, glaze, { hip: true });
  steps(world, cx, 0, cz + halfD + 2, 3, 3, 0.35);
  lantern(world, cx - 4, platform + 4, cz + halfD + 1);
  lantern(world, cx + 4, platform + 4, cz + halfD + 1);
}

/**
 * Mountain gate (山门) — front entrance pavilion with three bays.
 */
export function buildMountainGate(world, cx = 0, cz = 42) {
  const halfW = 10;
  const halfD = 4;
  const wallH = 8;
  const platform = 1;

  world.fill(cx - halfW - 2, 0, cz - halfD - 2, cx + halfW + 2, platform - 1, cz + halfD + 2, C.STONE_DARK);

  // three-bay red gate house
  world.box(cx - halfW, platform, cz - halfD, cx + halfW, platform + wallH, cz + halfD, C.RED, {
    floor: true,
  });

  // open central & side passages
  world.clear(cx - 2, platform + 1, cz - halfD, cx + 2, platform + 6, cz + halfD);
  world.clear(cx - 7, platform + 1, cz - halfD, cx - 5, platform + 5, cz + halfD);
  world.clear(cx + 5, platform + 1, cz - halfD, cx + 7, platform + 5, cz + halfD);

  // partition columns
  for (const x of [cx - 8, cx - 4, cx, cx + 4, cx + 8]) {
    column(world, x, platform, platform + wallH, cz - halfD);
    column(world, x, platform, platform + wallH, cz + halfD);
    dougong(world, x, platform + wallH, cz + halfD, 1);
    dougong(world, x, platform + wallH, cz - halfD, 1);
  }

  // threshold stone
  world.fill(cx - halfW, platform, cz, cx + halfW, platform, cz, C.STONE_LIGHT);

  pitchedRoof(world, cx, platform + wallH + 1, cz, halfW + 2, halfD + 2, 5, 'gold', { hip: true });

  // plaque
  world.fill(cx - 4, platform + 6, cz + halfD + 1, cx + 4, platform + 7, cz + halfD + 1, C.GOLD);

  steps(world, cx, 0, cz + halfD + 2, 5, 3, 0.35);

  // stone lions
  stoneLion(world, cx - 12, 1, cz + 6, 1);
  stoneLion(world, cx + 12, 1, cz + 6, 1);

  lantern(world, cx - 5, platform + 5, cz + halfD + 1);
  lantern(world, cx + 5, platform + 5, cz + halfD + 1);

  // flanking screen walls
  world.fill(cx - halfW - 8, platform, cz - 1, cx - halfW - 1, platform + 5, cz + 1, C.RED);
  world.fill(cx + halfW + 1, platform, cz - 1, cx + halfW + 8, platform + 5, cz + 1, C.RED);
  world.fill(cx - halfW - 8, platform + 5, cz - 1, cx - halfW - 1, platform + 5, cz + 1, C.TILE_GOLD);
  world.fill(cx + halfW + 1, platform + 5, cz - 1, cx + halfW + 8, platform + 5, cz + 1, C.TILE_GOLD);
}

/**
 * Multi-storey pagoda (宝塔) with cuanjian roofs.
 */
export function buildPagoda(world, cx = 32, cz = 8) {
  const tiers = [
    { half: 6, h: 5 },
    { half: 5, h: 4 },
    { half: 4, h: 4 },
    { half: 3, h: 3 },
    { half: 2, h: 3 },
  ];
  let y = 1;
  world.fill(cx - 8, 0, cz - 8, cx + 8, 0, cz + 8, C.STONE);

  tiers.forEach((tier, i) => {
    const { half, h } = tier;
    world.box(cx - half, y, cz - half, cx + half, y + h, cz + half, C.RED, { floor: true });
    // windows on each face
    windowLattice(world, cx, y + 1, y + h - 1, cz + half);
    windowLattice(world, cx, y + 1, y + h - 1, cz - half);
    windowLattice(world, cx - half, y + 1, y + h - 1, cz);
    windowLattice(world, cx + half, y + 1, y + h - 1, cz);
    for (const [sx, sz] of [
      [-half, -half],
      [half, -half],
      [-half, half],
      [half, half],
    ]) {
      column(world, cx + sx, y, y + h, cz + sz);
    }
    // eaves roof between tiers
    cuanjianRoof(world, cx, y + h + 1, cz, half + 2, 1, i % 2 === 0 ? 'gold' : 'blue');
    y += h + 4;
  });

  // final finial already placed by last cuanjian; reinforce
  world.fill(cx, y, cz, cx, y + 5, cz, C.GOLD);
}

/**
 * Bell or drum tower — square pavilion with cuanjian roof.
 */
export function buildBellTower(world, cx, cz, kind = 'bell') {
  const half = 4;
  const wallH = 9;
  const platform = 1;

  world.fill(cx - half - 2, 0, cz - half - 2, cx + half + 2, platform - 1, cz + half + 2, C.STONE);
  world.box(cx - half, platform, cz - half, cx + half, platform + wallH, cz + half, C.RED, {
    floor: true,
  });

  for (const [sx, sz] of [
    [-half, -half],
    [half, -half],
    [-half, half],
    [half, half],
  ]) {
    column(world, cx + sx, platform, platform + wallH, cz + sz);
    dougong(world, cx + sx, platform + wallH, cz + sz, 1);
  }

  // open arches mid-level
  world.clear(cx - 1, platform + 3, cz - half, cx + 1, platform + 6, cz + half);
  world.clear(cx - half, platform + 3, cz - 1, cx + half, platform + 6, cz + 1);

  // instrument
  if (kind === 'bell') {
    world.fill(cx - 1, platform + 5, cz - 1, cx + 1, platform + 7, cz + 1, C.GOLD);
    world.set(cx, platform + 4, cz, C.GOLD);
  } else {
    world.fill(cx - 2, platform + 5, cz - 1, cx + 2, platform + 6, cz + 1, C.WOOD_DARK);
    world.fill(cx - 1, platform + 6, cz, cx + 1, platform + 7, cz, C.WOOD);
  }

  cuanjianRoof(world, cx, platform + wallH + 1, cz, half + 2, 2, 'blue');
  steps(world, cx, 0, cz + half + 2, 2, 2, 0.5);
  lantern(world, cx - 3, platform + 4, cz + half + 1);
  lantern(world, cx + 3, platform + 4, cz + half + 1);
}

/**
 * Ground plane: grass field + axial stone path + courtyard paving.
 */
export function buildGround(world) {
  const R = 55;
  for (let x = -R; x <= R; x++) {
    for (let z = -R; z <= 55; z++) {
      const grass = (x + z * 3) % 5 === 0 ? C.GRASS_DARK : C.GRASS;
      world.set(x, -1, z, grass);
    }
  }

  // outer court paving around buildings
  for (let x = -40; x <= 40; x++) {
    for (let z = -32; z <= 50; z++) {
      const inPath = Math.abs(x) <= 4 && z >= -28 && z <= 48;
      const inCourtyard = Math.abs(x) <= 22 && z >= -10 && z <= 30;
      const nearMain = Math.abs(x) <= 18 && z >= -28 && z <= -8;
      if (inPath || inCourtyard || nearMain) {
        const checker = (x + z) % 2 === 0 ? C.PAVING : C.PAVING_DARK;
        world.set(x, -1, z, checker);
        if (inPath && Math.abs(x) <= 3) world.set(x, 0, z, C.STONE_LIGHT);
      }
    }
  }

  // axial path stripes
  for (let z = -28; z <= 48; z++) {
    world.set(-4, 0, z, C.STONE_DARK);
    world.set(4, 0, z, C.STONE_DARK);
  }

  // courtyard center medallion
  for (let x = -6; x <= 6; x++) {
    for (let z = 8; z <= 20; z++) {
      const d = Math.abs(x) + Math.abs(z - 14);
      if (d <= 6) world.set(x, 0, z, d <= 2 ? C.STONE_LIGHT : C.STONE);
    }
  }

  // low courtyard walls / corridors
  for (let z = -8; z <= 36; z++) {
    if (z > 38) continue;
    world.fill(-22, 0, z, -22, 3, z, C.RED);
    world.fill(22, 0, z, 22, 3, z, C.RED);
    world.set(-22, 4, z, C.TILE_BLUE);
    world.set(22, 4, z, C.TILE_BLUE);
  }
  // gate openings in side walls toward side halls
  world.clear(-22, 0, -6, -22, 3, 0);
  world.clear(22, 0, -6, 22, 3, 0);

  // small reflecting pool in front courtyard
  for (let x = -5; x <= 5; x++) {
    for (let z = 22; z <= 28; z++) {
      world.set(x, -1, z, C.WATER);
      if (Math.abs(x) === 5 || z === 22 || z === 28) world.set(x, 0, z, C.STONE);
    }
  }

  // trees as voxel pines at corners
  const treeSpots = [
    [-38, 45],
    [38, 45],
    [-38, -30],
    [38, -30],
    [-30, 20],
    [30, 20],
  ];
  for (const [tx, tz] of treeSpots) {
    world.fill(tx, 0, tz, tx, 6, tz, C.WOOD_DARK);
    for (let i = 0; i < 5; i++) {
      const r = 3 - Math.floor(i / 2);
      world.fill(tx - r, 5 + i, tz - r, tx + r, 5 + i, tz + r, i % 2 ? C.GRASS_DARK : C.GRASS);
    }
  }
}

/**
 * Compose the full axial complex.
 */
export function buildComplex(world) {
  buildGround(world);
  buildMountainGate(world, 0, 42);
  buildMainHall(world, 0, -18);
  buildSideHall(world, -28, -8, 'blue');
  buildSideHall(world, 28, -8, 'blue');
  buildPagoda(world, 36, 18);
  buildBellTower(world, -30, 28, 'bell');
  buildBellTower(world, 30, 28, 'drum');
}
