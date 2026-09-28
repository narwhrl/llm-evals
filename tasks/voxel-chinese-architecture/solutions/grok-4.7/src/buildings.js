import { Color } from "./palette.js";
import { addCuanjian, addHipSkirt, addWudian, addXieshan } from "./roofs.js";

/**
 * North is +Z. X = 0 is the axis. Odd widths centered on 0 stay mirror-symmetric.
 * East-only masses are mirrored by VoxelVolume.mirrorCapture.
 */
export const plan = {
  ground: { x: -130, z: -130, w: 261, d: 274 },
  path: { x: -3, w: 7, z0: -26, z1: 130 },
  gate: {
    plinth: { x: -18, z: 0, w: 37, d: 22, h: 4 },
    wall: { x: -14, z: 3, w: 29, d: 16, h: 10 },
    passage: { x: -4, w: 9, h: 8 },
    stair: { x: -8, w: 17 },
  },
  court: { x: -28, z: 28, w: 57, d: 20 },
  main: {
    plinth: { x: -24, z: 56, w: 49, d: 30, h: 5 },
    wall: { x: -18, z: 62, w: 37, d: 18, h: 12 },
    stair: { x: -12, w: 25 },
  },
  side: {
    plinth: { x: 46, z: 64, w: 19, d: 16, h: 3 },
    wall: { x: 48, z: 66, w: 15, d: 12, h: 9 },
    stair: { x: 50, w: 11 },
  },
  pagoda: { cx: 34, cz: 110, plinthHalf: 7, plinthH: 3 },
  cloister: { x: -70, z: 128, w: 141, d: 4 },
  rearCourt: { x: -44, z: 94, w: 89, d: 34 },
  lions: { x: -30, z: -18, w: 7, d: 8 },
  trees: [
    [78, 8],
    [76, 40],
    [80, 72],
    [74, 118],
    [16, 97],
  ],
  lanterns: [
    [9, 32],
    [9, 38],
    [9, 44],
  ],
};

function mirrored(volume, draw) {
  volume.beginCapture();
  try {
    draw();
  } finally {
    volume.mirrorCapture();
  }
}

function addColumn(vol, x, z, y, h) {
  vol.fill(x, y, z, 2, 1, 2, Color.stoneDark);
  vol.fill(x, y + 1, z, 2, h - 1, 2, Color.wood);
}

function addColumnSym(vol, x, z, y, h) {
  addColumn(vol, x, z, y, h);
  const mx = -x - 1;
  if (mx !== x) addColumn(vol, mx, z, y, h);
}

function addDougong(vol, x, z, w, d, y) {
  vol.fill(x - 1, y, z - 1, w + 2, 2, 2, Color.woodDark);
  vol.fill(x - 1, y, z + d - 1, w + 2, 2, 2, Color.woodDark);
  vol.fill(x - 1, y, z, 2, 2, d, Color.woodDark);
  vol.fill(x + w - 1, y, z, 2, 2, d, Color.woodDark);

  const midX = x + Math.floor((w - 1) / 2);
  for (let dx = 0; dx < w / 2; dx += 3) {
    const xs = dx === 0 ? [midX] : [midX - dx, midX + dx];
    for (const px of xs) {
      if (px <= x || px >= x + w - 1) continue;
      vol.fill(px, y, z - 3, 1, 2, 2, Color.wood);
      vol.fill(px, y, z + d + 1, 1, 2, 2, Color.wood);
    }
  }
  const midZ = z + Math.floor((d - 1) / 2);
  for (let dz = 0; dz < d / 2; dz += 3) {
    const zs = dz === 0 ? [midZ] : [midZ - dz, midZ + dz];
    for (const pz of zs) {
      if (pz <= z || pz >= z + d - 1) continue;
      vol.fill(x - 3, y, pz, 2, 2, 1, Color.wood);
      vol.fill(x + w + 1, y, pz, 2, 2, 1, Color.wood);
    }
  }
}

function addSouthOpening(vol, x, y, z, w, h, depth, bars) {
  vol.fill(x, y, z, w, h, depth, Color.opening);
  for (let iy = 0; iy < h; iy++) {
    for (let ix = 0; ix < w; ix++) {
      const frame = ix === 0 || ix === w - 1 || iy === 0 || iy === h - 1;
      const bar = bars && (ix % 2 === 0 || iy % 2 === 0);
      if (frame || bar) vol.set(x + ix, y + iy, z, Color.woodDark);
    }
  }
}

function addNorthOpening(vol, x, y, zOuter, w, h, depth, bars) {
  vol.fill(x, y, zOuter - depth + 1, w, h, depth, Color.opening);
  for (let iy = 0; iy < h; iy++) {
    for (let ix = 0; ix < w; ix++) {
      const frame = ix === 0 || ix === w - 1 || iy === 0 || iy === h - 1;
      const bar = bars && (ix % 2 === 0 || iy % 2 === 0);
      if (frame || bar) vol.set(x + ix, y + iy, zOuter, Color.woodDark);
    }
  }
}

function addWestOpening(vol, xOuter, y, z, h, d, depth, bars) {
  vol.fill(xOuter, y, z, depth, h, d, Color.opening);
  for (let iy = 0; iy < h; iy++) {
    for (let iz = 0; iz < d; iz++) {
      const frame = iz === 0 || iz === d - 1 || iy === 0 || iy === h - 1;
      const bar = bars && (iz % 2 === 0 || iy % 2 === 0);
      if (frame || bar) vol.set(xOuter, y + iy, z + iz, Color.woodDark);
    }
  }
}

function addSouthStairs(vol, x, w, plinthZ, topH, tread) {
  for (let i = 1; i <= topH - 1; i++) {
    const h = topH - i;
    const z = plinthZ - i * tread;
    vol.fill(x, 0, z, w, h, tread, Color.stone);
    vol.fill(x, h - 1, z, w, 1, tread, Color.path);
    const cheek = Math.min(topH, h + 1);
    vol.fill(x - 1, 0, z, 1, cheek, tread, Color.stoneDark);
    vol.fill(x + w, 0, z, 1, cheek, tread, Color.stoneDark);
  }
}

function addNorthStairs(vol, x, w, plinthEndZ, topH, tread) {
  for (let i = 1; i <= topH - 1; i++) {
    const h = topH - i;
    const z = plinthEndZ + 1 + (i - 1) * tread;
    vol.fill(x, 0, z, w, h, tread, Color.stone);
    vol.fill(x, h - 1, z, w, 1, tread, Color.path);
    const cheek = Math.min(topH, h + 1);
    vol.fill(x - 1, 0, z, 1, cheek, tread, Color.stoneDark);
    vol.fill(x + w, 0, z, 1, cheek, tread, Color.stoneDark);
  }
}

function addBalustrade(vol, box, southGap, northGap) {
  const y = box.h;
  const open = (px, gap) => px >= gap[0] && px <= gap[1];
  const post = (x, z) => vol.fill(x, y, z, 1, 2, 1, Color.stoneLight);
  for (let i = 0; i < box.w; i += 2) {
    const px = box.x + i;
    if (!open(px, southGap)) post(px, box.z);
    if (!open(px, northGap)) post(px, box.z + box.d - 1);
  }
  for (let i = 2; i < box.d - 1; i += 2) {
    post(box.x, box.z + i);
    post(box.x + box.w - 1, box.z + i);
  }
}

function addLantern(vol, x, z, y) {
  vol.fill(x, y, z, 1, 5, 1, Color.woodDark);
  vol.fill(x - 1, y + 5, z - 1, 3, 3, 3, Color.lantern);
  vol.fill(x, y + 6, z, 1, 1, 1, Color.lanternCore);
  vol.fill(x - 1, y + 8, z - 1, 3, 1, 3, Color.woodDark);
}

function addLanternPair(vol, x, z, y) {
  addLantern(vol, x, z, y);
  if (x !== 0) addLantern(vol, -x, z, y);
}

function addGate(vol) {
  const { plinth, wall, passage, stair } = plan.gate;
  const y0 = plinth.h;
  vol.fill(passage.x, plinth.h - 1, plinth.z, passage.w, 1, plinth.d, Color.path);

  vol.fill(wall.x, y0, wall.z, wall.w, wall.h, wall.d, Color.cinnabar);
  vol.fill(wall.x, y0, wall.z, wall.w, 2, wall.d, Color.cinnabarDeep);
  vol.carve(passage.x, y0, wall.z, passage.w, passage.h, wall.d);
  vol.fill(passage.x - 1, y0 + passage.h, wall.z, passage.w + 2, wall.h - passage.h, wall.d, Color.woodDark);

  vol.fill(-5, y0 + passage.h, wall.z - 1, 11, 2, 1, Color.woodDark);
  vol.fill(-4, y0 + passage.h, wall.z - 1, 9, 1, 1, Color.plaque);

  const colH = wall.h + 2;
  const cz = wall.z - 2;
  for (const cx of [-14, -8]) addColumnSym(vol, cx, cz, y0, colH);
  addColumnSym(vol, wall.x + wall.w, wall.z, y0, colH);
  addColumnSym(vol, wall.x + wall.w, wall.z + wall.d - 2, y0, colH);

  addSouthOpening(vol, -12, y0, wall.z, 4, 6, 2, false);
  addSouthOpening(vol, 9, y0, wall.z, 4, 6, 2, false);

  addDougong(vol, wall.x, wall.z, wall.w, wall.d, y0 + wall.h);
  const overhang = 4;
  addXieshan(vol, {
    x: wall.x - overhang,
    z: wall.z - overhang,
    w: wall.w + overhang * 2,
    d: wall.d + overhang * 2,
    y: y0 + wall.h + 2,
    tile: Color.grey,
    tileShade: Color.greyDeep,
    gable: Color.gable,
    barge: Color.woodDark,
    ridge: Color.greyDeep,
    hipRun: 3,
    upturn: 4,
    upturnColor: Color.greyDeep,
    soffit: Color.woodDark,
  });

  addSouthStairs(vol, stair.x, stair.w, plinth.z, plinth.h, 2);
  addNorthStairs(vol, stair.x, stair.w, plinth.z + plinth.d - 1, plinth.h, 2);
  addLanternPair(vol, 12, plinth.z + 1, y0);
}

function addMainHall(vol) {
  const { plinth, wall, stair } = plan.main;
  const y0 = plinth.h;
  const wallH = wall.h;
  vol.fill(wall.x, y0, wall.z, wall.w, wallH, wall.d, Color.cinnabar);
  vol.fill(wall.x, y0, wall.z, wall.w, 2, wall.d, Color.cinnabarDeep);

  const colH = wallH + 2;
  for (const cx of [-18, -11, -5]) addColumnSym(vol, cx, wall.z - 2, y0, colH);
  for (const dz of [0, 7, wall.d - 2]) {
    addColumnSym(vol, wall.x + wall.w, wall.z + dz, y0, colH);
  }

  addSouthOpening(vol, -3, y0, wall.z, 7, 8, 3, false);
  addSouthOpening(vol, -16, y0 + 3, wall.z, 5, 5, 2, true);
  addSouthOpening(vol, -8, y0 + 3, wall.z, 3, 5, 2, true);
  addSouthOpening(vol, 6, y0 + 3, wall.z, 3, 5, 2, true);
  addSouthOpening(vol, 12, y0 + 3, wall.z, 5, 5, 2, true);

  mirrored(vol, () => {
    addWestOpening(vol, wall.x, y0 + 3, wall.z + 2, 5, 5, 2, true);
    addWestOpening(vol, wall.x, y0 + 3, wall.z + 9, 5, 6, 2, true);
  });

  const northZ = wall.z + wall.d - 1;
  addNorthOpening(vol, -2, y0, northZ, 5, 7, 2, false);
  addNorthOpening(vol, -14, y0 + 3, northZ, 5, 5, 2, true);
  addNorthOpening(vol, 10, y0 + 3, northZ, 5, 5, 2, true);

  addDougong(vol, wall.x, wall.z, wall.w, wall.d, y0 + wallH);
  const lowerOverhang = 5;
  const lowerRise = 4;
  const lowerY = y0 + wallH + 2;
  addHipSkirt(vol, {
    x: wall.x - lowerOverhang,
    z: wall.z - lowerOverhang,
    w: wall.w + lowerOverhang * 2,
    d: wall.d + lowerOverhang * 2,
    y: lowerY,
    rise: lowerRise,
    tile: Color.gold,
    tileShade: Color.goldDeep,
    upturn: 4,
    upturnColor: Color.goldDeep,
    soffit: Color.woodDark,
  });

  const inset = 2;
  const upper = {
    x: wall.x + inset,
    z: wall.z + inset,
    w: wall.w - inset * 2,
    d: wall.d - inset * 2,
    h: 8,
  };
  const upperY = lowerY + lowerRise;
  vol.fill(upper.x, upperY, upper.z, upper.w, upper.h, upper.d, Color.cinnabar);
  vol.fill(upper.x, upperY, upper.z, upper.w, 1, upper.d, Color.cinnabarDeep);
  addSouthOpening(vol, -8, upperY + 2, upper.z, 5, 4, 2, true);
  addSouthOpening(vol, 4, upperY + 2, upper.z, 5, 4, 2, true);
  addDougong(vol, upper.x, upper.z, upper.w, upper.d, upperY + upper.h);

  const upperOverhang = 4;
  addWudian(vol, {
    x: upper.x - upperOverhang,
    z: upper.z - upperOverhang,
    w: upper.w + upperOverhang * 2,
    d: upper.d + upperOverhang * 2,
    y: upperY + upper.h + 2,
    tile: Color.gold,
    tileShade: Color.goldDeep,
    ridge: Color.goldDeep,
    upturn: 4,
    upturnColor: Color.goldDeep,
    soffit: Color.woodDark,
    beasts: Color.woodDark,
  });

  addSouthStairs(vol, stair.x, stair.w, plinth.z, plinth.h, 2);
  addNorthStairs(vol, -8, 17, plinth.z + plinth.d - 1, plinth.h, 2);
  addBalustrade(vol, plinth, [stair.x, stair.x + stair.w - 1], [-8, 8]);
  addLanternPair(vol, 14, plinth.z + 1, y0);
}

function addSideHall(vol) {
  const { plinth, wall, stair } = plan.side;
  mirrored(vol, () => {
    const y0 = plinth.h;
    vol.fill(wall.x, y0, wall.z, wall.w, wall.h, wall.d, Color.cinnabar);
    vol.fill(wall.x, y0, wall.z, wall.w, 2, wall.d, Color.cinnabarDeep);

    const colH = wall.h + 2;
    addColumn(vol, wall.x, wall.z - 2, y0, colH);
    addColumn(vol, wall.x + wall.w - 2, wall.z - 2, y0, colH);
    addColumn(vol, wall.x + 6, wall.z - 2, y0, colH);
    addColumn(vol, wall.x - 2, wall.z, y0, colH);
    addColumn(vol, wall.x - 2, wall.z + wall.d - 2, y0, colH);
    addColumn(vol, wall.x + wall.w, wall.z + 2, y0, colH);
    addColumn(vol, wall.x + wall.w, wall.z + wall.d - 4, y0, colH);

    addSouthOpening(vol, wall.x + 5, y0, wall.z, 5, 6, 2, false);
    addSouthOpening(vol, wall.x + 1, y0 + 3, wall.z, 3, 4, 2, true);
    addSouthOpening(vol, wall.x + wall.w - 4, y0 + 3, wall.z, 3, 4, 2, true);
    addWestOpening(vol, wall.x, y0 + 2, wall.z + 3, 4, 5, 2, true);

    addDougong(vol, wall.x, wall.z, wall.w, wall.d, y0 + wall.h);
    const overhang = 3;
    addXieshan(vol, {
      x: wall.x - overhang,
      z: wall.z - overhang,
      w: wall.w + overhang * 2,
      d: wall.d + overhang * 2,
      y: y0 + wall.h + 2,
      tile: Color.grey,
      tileShade: Color.greyDeep,
      gable: Color.gable,
      barge: Color.woodDark,
      ridge: Color.greyDeep,
      hipRun: 2,
      upturn: 3,
      upturnColor: Color.greyDeep,
      soffit: Color.woodDark,
    });
    addSouthStairs(vol, stair.x, stair.w, plinth.z, plinth.h, 2);
  });
}

function addPagodaStoryWindows(vol, cx, cz, half, y, door) {
  const face = cz - half;
  if (door) {
    addSouthOpening(vol, cx - 1, y, face, 3, 4, 2, false);
  } else {
    addSouthOpening(vol, cx - 1, y + 1, face, 3, 3, 2, true);
  }
  addNorthOpening(vol, cx - 1, y + 1, cz + half, 3, 3, 2, true);
  addWestOpening(vol, cx - half, y + 1, cz - 1, 3, 3, 2, true);
  const east = cx + half;
  vol.fill(east - 1, y + 1, cz - 1, 2, 3, 3, Color.opening);
  for (let iy = 0; iy < 3; iy++) {
    for (let iz = 0; iz < 3; iz++) {
      const frame = iz === 0 || iz === 2 || iy === 0 || iy === 2;
      const bar = iz % 2 === 0 || iy % 2 === 0;
      if (frame || bar) vol.set(east, y + 1 + iy, cz - 1 + iz, Color.woodDark);
    }
  }
}

function addPagoda(vol) {
  const { cx, cz, plinthH } = plan.pagoda;
  const stories = [
    { half: 5, wallH: 6, eaveHalf: 7, rise: 3, door: true },
    { half: 4, wallH: 5, eaveHalf: 6, rise: 3, door: false },
    { half: 3, wallH: 4, eaveHalf: 5, rise: 3, door: false },
  ];
  mirrored(vol, () => {
    let y = plinthH;
    for (const story of stories) {
      const size = story.half * 2 + 1;
      const x = cx - story.half;
      const z = cz - story.half;
      vol.fill(x, y, z, size, story.wallH, size, Color.cinnabar);
      for (const [dx, dz] of [
        [-story.half, -story.half],
        [story.half, -story.half],
        [-story.half, story.half],
        [story.half, story.half],
      ]) {
        vol.fill(cx + dx, y, cz + dz, 1, story.wallH, 1, Color.wood);
      }
      addPagodaStoryWindows(vol, cx, cz, story.half, y, story.door);
      addDougong(vol, x, z, size, size, y + story.wallH - 2);
      const eave = story.eaveHalf * 2 + 1;
      addHipSkirt(vol, {
        x: cx - story.eaveHalf,
        z: cz - story.eaveHalf,
        w: eave,
        d: eave,
        y: y + story.wallH,
        rise: story.rise,
        tile: Color.grey,
        tileShade: Color.greyDeep,
        upturn: 3,
        upturnColor: Color.greyDeep,
        soffit: Color.woodDark,
      });
      y += story.wallH + story.rise;
    }
    addCuanjian(vol, {
      cx,
      cz,
      half: 4,
      y,
      tile: Color.grey,
      tileShade: Color.greyDeep,
      finial: Color.gold,
      upturn: 3,
      upturnColor: Color.goldDeep,
      soffit: Color.woodDark,
    });
  });
}

function addCloister(vol) {
  const { x, z, w, d } = plan.cloister;
  vol.fill(x, 0, z, w, 2, d, Color.stoneDark);
  vol.fill(x, 2, z + 1, w, 5, Math.max(1, d - 1), Color.cinnabar);
  vol.fill(x, 2, z + 1, w, 1, Math.max(1, d - 1), Color.cinnabarDeep);
  for (let cx = 0; cx <= 64; cx += 8) {
    vol.fillSym(cx, 2, z - 1, 1, 6, 2, Color.wood);
  }
  vol.fill(x, 7, z - 1, w, 1, d + 2, Color.woodDark);
  vol.fill(x - 1, 8, z - 2, w + 2, 1, d + 3, Color.grey);
  vol.fill(x, 9, z - 1, w, 1, d + 1, Color.greyDeep);
  vol.fill(x + 6, 10, z, w - 12, 1, d, Color.grey);
  vol.fill(-6, 4, z - 1, 13, 3, 1, Color.woodDark);
  vol.fill(-5, 5, z - 1, 11, 2, 1, Color.plaque);
}

export function addBuildings(volume) {
  addGate(volume);
  addMainHall(volume);
  addSideHall(volume);
  addPagoda(volume);
  addCloister(volume);
}
