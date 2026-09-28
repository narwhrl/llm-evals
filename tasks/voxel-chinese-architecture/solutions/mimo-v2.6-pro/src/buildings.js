import { PAL } from "./palette.js";

/** 飞檐翘角：外檐矩形角部上扬 */
function eaveCurl(x, z, x0, z0, x1, z1) {
  const spanX = Math.max(1, x1 - x0);
  const spanZ = Math.max(1, z1 - z0);
  const u = Math.abs(((x - x0) / spanX) * 2 - 1);
  const v = Math.abs(((z - z0) / spanZ) * 2 - 1);
  const c = Math.min(u, v);
  return Math.round(3.2 * c * c);
}

function placeRoofLayer(vox, y, x0, z0, x1, z1, color, opts = {}) {
  const { curl = false, fill = false, xScale = 1, zScale = 1 } = opts;
  if (fill) {
    for (let x = x0; x <= x1; x += 1) {
      for (let z = z0; z <= z1; z += 1) {
        const lift = curl ? eaveCurl(x, z, x0, z0, x1, z1) : 0;
        vox.set(Math.round(x), y + lift, Math.round(z), color);
      }
    }
    return;
  }
  for (let x = x0; x <= x1; x += 1) {
    for (const z of [z0, z1]) {
      const lift = curl ? eaveCurl(x, z, x0, z0, x1, z1) : 0;
      vox.set(Math.round(x), y + lift, Math.round(z), color);
    }
  }
  for (let z = z0 + 1; z <= z1 - 1; z += 1) {
    for (const x of [x0, x1]) {
      const lift = curl ? eaveCurl(x, z, x0, z0, x1, z1) : 0;
      vox.set(Math.round(x), y + lift, Math.round(z), color);
    }
  }
  if (xScale || zScale) {
    // reserved for scaled layers
  }
}

/** 檐口木色封檐板 */
function placeFascia(vox, y, x0, z0, x1, z1, color = PAL.woodDark) {
  vox.ring(x0, z0, x1, z1, y, color);
}

/** 斗拱：柱头逐级出跳 */
function placeDougong(vox, x, y, z, dir, color = PAL.woodBeam, dark = PAL.woodDark) {
  // dir: "x" 沿面阔方向出跳, "z" 沿进深方向出跳
  const put = (dx, dy, dz, sx, sy, sz, c) => {
    vox.fill(x + dx, y + dy, z + dz, x + dx + sx - 1, y + dy + sy - 1, z + dz + sz - 1, c);
  };
  if (dir === "x") {
    put(0, 0, 0, 1, 1, 1, dark);
    put(-1, 1, 0, 3, 1, 1, color);
    put(-2, 2, 0, 5, 1, 1, dark);
    put(-1, 3, -1, 3, 1, 3, color);
    put(-2, 4, -1, 5, 1, 3, dark);
  } else {
    put(0, 0, 0, 1, 1, 1, dark);
    put(0, 1, -1, 1, 1, 3, color);
    put(0, 2, -2, 1, 1, 5, dark);
    put(-1, 3, -1, 3, 1, 3, color);
    put(-1, 4, -2, 3, 1, 5, dark);
  }
}

/** 立柱 */
function placeColumns(vox, y0, height, positions, color = PAL.redColumn) {
  for (const [x, z] of positions) {
    vox.fill(x, y0, z, x, y0 + height - 1, z, color);
  }
}

function range(from, to, step = 1) {
  const out = [];
  if (step > 0) {
    for (let v = from; v <= to; v += step) out.push(v);
  } else {
    for (let v = from; v >= to; v += step) out.push(v);
  }
  return out;
}

/** 台基 + 踏跺 */
function placePlatform(vox, x0, z0, x1, z1, yTop, opts = {}) {
  const { stairDir = "z+", stairWidth = 9, stone = PAL.stoneWhite, deep = PAL.stoneDeep } = opts;
  vox.fill(x0, 0, z0, x1, yTop - 1, z1, deep);
  vox.fillXZ(x0, z0, x1, z1, yTop, stone);
  // 压沿石
  vox.ring(x0, z0, x1, z1, yTop, PAL.stone);

  const stairRise = yTop;
  const cz = Math.round((z0 + z1) / 2);
  const cx = Math.round((x0 + x1) / 2);
  for (let s = 0; s < stairRise; s += 1) {
    const y = s;
    if (stairDir === "z+") {
      const zz = z1 + 1 + (stairRise - 1 - s);
      vox.fillXZ(cx - Math.floor(stairWidth / 2), zz, cx + Math.floor(stairWidth / 2), zz + 0, y, stone);
    } else if (stairDir === "z-") {
      const zz = z0 - 1 - (stairRise - 1 - s);
      vox.fillXZ(cx - Math.floor(stairWidth / 2), zz, cx + Math.floor(stairWidth / 2), zz, y, stone);
    } else if (stairDir === "x+") {
      const xx = x1 + 1 + (stairRise - 1 - s);
      vox.fillXZ(xx, cz - Math.floor(stairWidth / 2), xx, cz + Math.floor(stairWidth / 2), y, stone);
    } else if (stairDir === "x-") {
      const xx = x0 - 1 - (stairRise - 1 - s);
      vox.fillXZ(xx, cz - Math.floor(stairWidth / 2), xx, cz + Math.floor(stairWidth / 2), y, stone);
    }
  }
  // 御道（踏跺中央斜坡石）
  return yTop + 1;
}

/** 庑殿顶：四坡水 + 正脊 + 飞檐翘角 */
export function buildWudianRoof(vox, opts) {
  const {
    x0,
    z0,
    x1,
    z1,
    y,
    height = 6,
    overhang = 3,
    tile = PAL.glazeGold,
    tileDeep = PAL.glazeGoldDeep,
    ridge = PAL.ridgeDark,
  } = opts;

  const ex0 = x0 - overhang;
  const ex1 = x1 + overhang;
  const ez0 = z0 - overhang;
  const ez1 = z1 + overhang;
  const alongX = ex1 - ex0 >= ez1 - ez0;
  const shortSpan = Math.min(ex1 - ex0, ez1 - ez0);
  const halfShort = Math.floor(shortSpan / 2);
  const steps = Math.min(height, Math.max(3, halfShort));

  placeFascia(vox, y - 1, ex0, ez0, ex1, ez1);

  for (let s = 0; s < steps; s += 1) {
    const yy = y + s;
    const ax0 = ex0 + s;
    const ax1 = ex1 - s;
    const az0 = ez0 + s;
    const az1 = ez1 - s;
    if (ax0 > ax1 || az0 > az1) break;
    const color = s % 2 === 0 ? tile : tileDeep;
    placeRoofLayer(vox, yy, ax0, az0, ax1, az1, color, {
      curl: s === 0,
      fill: true,
    });
  }

  const ry = y + steps;
  if (alongX) {
    const rx0 = ex0 + halfShort;
    const rx1 = ex1 - halfShort;
    vox.fill(rx0, ry, ez0 + halfShort, rx1, ry, ez1 - halfShort, tileDeep);
    vox.fill(rx0, ry + 1, ez0 + halfShort, rx1, ry + 1, ez1 - halfShort, ridge);
    // 正吻
    vox.fill(rx0 - 1, ry, ez0 + halfShort, rx0 - 1, ry + 2, ez1 - halfShort, PAL.ridgeGold);
    vox.fill(rx1 + 1, ry, ez0 + halfShort, rx1 + 1, ry + 2, ez1 - halfShort, PAL.ridgeGold);
  } else {
    const rz0 = ez0 + halfShort;
    const rz1 = ez1 - halfShort;
    vox.fill(ex0 + halfShort, ry, rz0, ex1 - halfShort, ry, rz1, tileDeep);
    vox.fill(ex0 + halfShort, ry + 1, rz0, ex1 - halfShort, ry + 1, rz1, ridge);
    vox.fill(ex0 + halfShort, ry, rz0 - 1, ex1 - halfShort, ry + 2, rz0 - 1, PAL.ridgeGold);
    vox.fill(ex0 + halfShort, ry, rz1 + 1, ex1 - halfShort, ry + 2, rz1 + 1, PAL.ridgeGold);
  }
  return ry + 2;
}

/** 歇山顶：下段四坡 + 上段两坡 + 山花 */
export function buildXieshanRoof(vox, opts) {
  const {
    x0,
    z0,
    x1,
    z1,
    y,
    overhang = 3,
    skirt = 3,
    upper = 3,
    tile = PAL.tileGrey,
    tileDeep = PAL.tileGreyDeep,
    gable = PAL.tileGreen,
    ridge = PAL.ridgeDark,
  } = opts;

  const ex0 = x0 - overhang;
  const ex1 = x1 + overhang;
  const ez0 = z0 - overhang;
  const ez1 = z1 + overhang;
  const alongX = ex1 - ex0 >= ez1 - ez0;

  placeFascia(vox, y - 1, ex0, ez0, ex1, ez1);

  // 下段：四坡水
  for (let s = 0; s < skirt; s += 1) {
    const yy = y + s;
    const ax0 = ex0 + s;
    const ax1 = ex1 - s;
    const az0 = ez0 + s;
    const az1 = ez1 - s;
    placeRoofLayer(vox, yy, ax0, az0, ax1, az1, s % 2 === 0 ? tile : tileDeep, {
      curl: s === 0,
      fill: true,
    });
  }

  // 上段：两坡水（悬山）+ 山花
  const midY = y + skirt;
  const gx0 = ex0 + skirt;
  const gx1 = ex1 - skirt;
  const gz0 = ez0 + skirt;
  const gz1 = ez1 - skirt;

  if (alongX) {
    for (let s = 0; s <= upper; s += 1) {
      const yy = midY + s;
      const az0 = gz0 + s;
      const az1 = gz1 - s;
      if (az0 > az1) break;
      vox.fill(gx0, yy, az0, gx1, yy, az1, s % 2 === 0 ? tile : tileDeep);
    }
    // 山花（两端垂直三角面）
    for (let s = 0; s <= upper; s += 1) {
      const az0 = gz0 + s;
      const az1 = gz1 - s;
      if (az0 > az1) break;
      vox.fill(gx0, midY + s, az0, gx0, midY + s, az1, gable);
      vox.fill(gx1, midY + s, az0, gx1, midY + s, az1, gable);
    }
    // 博风板
    vox.fill(gx0 - 1, midY - 1, gz0, gx0 - 1, midY + upper, gz1, PAL.woodDark);
    vox.fill(gx1 + 1, midY - 1, gz0, gx1 + 1, midY + upper, gz1, PAL.woodDark);
    const ry = midY + upper + 1;
    vox.fill(gx0, ry, gz0 + upper, gx1, ry, gz1 - upper, ridge);
    vox.fill(gx0, ry + 1, gz0 + upper + 1, gx1, ry + 1, gz1 - upper - 1, ridge);
    // 正吻
    vox.fill(gx0 - 1, ry, gz0 + upper, gx0 - 1, ry + 2, gz1 - upper, PAL.ridgeGold);
    vox.fill(gx1 + 1, ry, gz0 + upper, gx1 + 1, ry + 2, gz1 - upper, PAL.ridgeGold);
  } else {
    for (let s = 0; s <= upper; s += 1) {
      const yy = midY + s;
      const ax0 = gx0 + s;
      const ax1 = gx1 - s;
      if (ax0 > ax1) break;
      vox.fill(ax0, yy, gz0, ax1, yy, gz1, s % 2 === 0 ? tile : tileDeep);
    }
    for (let s = 0; s <= upper; s += 1) {
      const ax0 = gx0 + s;
      const ax1 = gx1 - s;
      if (ax0 > ax1) break;
      vox.fill(ax0, midY + s, gz0, ax1, midY + s, gz0, gable);
      vox.fill(ax0, midY + s, gz1, ax1, midY + s, gz1, gable);
    }
    vox.fill(gx0, midY - 1, gz0 - 1, gx1, midY + upper, gz0 - 1, PAL.woodDark);
    vox.fill(gx0, midY - 1, gz1 + 1, gx1, midY + upper, gz1 + 1, PAL.woodDark);
    const ry = midY + upper + 1;
    vox.fill(gx0 + upper, ry, gz0, gx1 - upper, ry, gz1, ridge);
    vox.fill(gx0 + upper + 1, ry + 1, gz0, gx1 - upper - 1, ry + 1, gz1, ridge);
    vox.fill(gx0 + upper, ry, gz0 - 1, gx1 - upper, ry + 2, gz0 - 1, PAL.ridgeGold);
    vox.fill(gx0 + upper, ry, gz1 + 1, gx1 - upper, ry + 2, gz1 + 1, PAL.ridgeGold);
  }
  return midY + upper + 3;
}

/** 攒尖顶：四坡收于宝顶 */
export function buildCuanjianRoof(vox, opts) {
  const {
    cx,
    cz,
    y,
    radius,
    overhang = 2,
    tile = PAL.tileGrey,
    tileDeep = PAL.tileGreyDeep,
    ridge = PAL.ridgeDark,
    finial = true,
  } = opts;

  const ex0 = cx - radius - overhang;
  const ex1 = cx + radius + overhang;
  const ez0 = cz - radius - overhang;
  const ez1 = cz + radius + overhang;
  const span = ex1 - ex0;
  placeFascia(vox, y - 1, ex0, ez0, ex1, ez1);

  for (let s = 0; s <= span; s += 1) {
    const yy = y + s;
    const ax0 = ex0 + s;
    const ax1 = ex1 - s;
    const az0 = ez0 + s;
    const az1 = ez1 - s;
    if (ax0 > ax1 || az0 > az1) break;
    placeRoofLayer(vox, yy, ax0, az0, ax1, az1, s % 2 === 0 ? tile : tileDeep, {
      curl: s === 0,
      fill: true,
    });
  }
  const topY = y + Math.floor(span / 2) + 1;
  vox.fill(cx, topY, cz, cx, topY, cz, ridge);
  if (!finial) return topY + 1;
  vox.fill(cx, topY + 1, cz, cx, topY + 3, cz, PAL.finialGold);
  vox.set(cx, topY + 4, cz, PAL.ridgeGold);
  return topY + 5;
}

/** 塔身层檐：短坡檐，不带宝顶，供上层塔身落脚 */
export function buildTierEave(vox, opts) {
  const {
    cx,
    cz,
    y,
    radius,
    overhang = 2,
    steps = 2,
    tile = PAL.tileGrey,
    tileDeep = PAL.tileGreyDeep,
  } = opts;
  const ex0 = cx - radius - overhang;
  const ex1 = cx + radius + overhang;
  const ez0 = cz - radius - overhang;
  const ez1 = cz + radius + overhang;
  placeFascia(vox, y - 1, ex0, ez0, ex1, ez1);
  for (let s = 0; s < steps; s += 1) {
    const yy = y + s;
    const ax0 = ex0 + s;
    const ax1 = ex1 - s;
    const az0 = ez0 + s;
    const az1 = ez1 - s;
    if (ax0 > ax1 || az0 > az1) break;
    placeRoofLayer(vox, yy, ax0, az0, ax1, az1, s % 2 === 0 ? tile : tileDeep, {
      curl: s === 0,
      fill: true,
    });
  }
  // 檐内收坡后屋面
  const topY = y + steps;
  vox.fillXZ(cx - radius + 1, cz - radius + 1, cx + radius - 1, cz + radius - 1, topY, tileDeep);
  return topY + 1;
}

/** 门窗 */
function placeDoorway(vox, x0, x1, y0, y1, z, facing) {
  // facing: +1 南(朝+z) / -1 北(朝-z) / +2 东 / -2 西
  for (let x = x0; x <= x1; x += 1) {
    for (let y = y0; y <= y1; y += 1) {
      vox.set(x, y, z, PAL.woodDark);
    }
  }
  // 门扇
  const mid = Math.round((x0 + x1) / 2);
  for (let x = x0; x <= x1; x += 1) {
    for (let y = y0; y <= y1 - 1; y += 1) {
      vox.set(x, y, z, PAL.redDoor);
    }
  }
  vox.fill(x0, y0, z, x1, y0, z, PAL.woodDark);
  for (let y = y0; y <= y1; y += 2) {
    vox.set(mid, y, z, PAL.goldStud);
  }
  void facing;
}

function placeLatticeWindow(vox, x0, x1, y0, y1, z) {
  for (let x = x0; x <= x1; x += 1) {
    for (let y = y0; y <= y1; y += 1) {
      const edge = x === x0 || x === x1 || y === y0 || y === y1;
      const midX = x0 + Math.floor((x1 - x0) / 2);
      const midY = y0 + Math.floor((y1 - y0) / 2);
      const muntin = x === midX || y === midY;
      vox.set(x, y, z, edge ? PAL.woodDark : muntin ? PAL.woodLattice : PAL.windowGlow);
    }
  }
}

/** 山门：三门洞 + 歇山顶 */
export function buildMountainGate(vox, cx, cz) {
  const w0 = cx - 10;
  const w1 = cx + 10;
  const z0 = cz - 4;
  const z1 = cz + 4;
  placePlatform(vox, w0 - 1, z0 - 1, w1 + 1, z1 + 1, 1, {
    stairDir: "z+",
    stairWidth: 11,
  });
  const yBase = 2;
  const wallTop = yBase + 6;

  // 侧墙与檐墙（空心）
  for (let z = z0; z <= z1; z += 1) {
    for (let y = yBase; y <= wallTop; y += 1) {
      vox.set(w0, y, z, PAL.redWall);
      vox.set(w1, y, z, PAL.redWall);
    }
  }

  // 正背立面：中央大门 + 两侧小门
  for (const z of [z0, z1]) {
    for (let x = w0; x <= w1; x += 1) {
      for (let y = yBase; y <= wallTop; y += 1) {
        vox.set(x, y, z, PAL.redWall);
      }
    }
    // 中门
    for (let x = cx - 3; x <= cx + 3; x += 1) {
      for (let y = yBase; y <= yBase + 5; y += 1) {
        vox.clear(x, y, z);
      }
    }
    // 两侧便门
    for (const dx of [-7, -6, 5, 6]) {
      for (let y = yBase; y <= yBase + 3; y += 1) {
        vox.clear(cx + dx, y, z);
      }
    }
    // 门框
    vox.fill(cx - 4, yBase, z, cx - 4, yBase + 6, z, PAL.woodDark);
    vox.fill(cx + 4, yBase, z, cx + 4, yBase + 6, z, PAL.woodDark);
    vox.fill(cx - 3, yBase + 6, z, cx + 3, yBase + 6, z, PAL.woodBeam);
    for (const dx of [-8, -5, 4, 7]) {
      vox.fill(cx + dx, yBase, z, cx + dx, yBase + 4, z, PAL.woodDark);
    }
  }

  // 门内通道两侧壁柱
  for (const x of [w0 + 1, w1 - 1]) {
    for (let z = z0 + 1; z <= z1 - 1; z += 1) {
      for (let y = yBase; y <= wallTop; y += 1) {
        vox.set(x, y, z, PAL.redWallDeep);
      }
    }
  }

  // 额枋 + 斗拱 + 檐
  vox.fill(w0, wallTop + 1, z0, w1, wallTop + 1, z1, PAL.woodBeam);
  for (const x of range(w0 + 1, w1 - 1, 3)) {
    placeDougong(vox, x, wallTop + 2, z0, "x");
    placeDougong(vox, x, wallTop + 2, z1, "x");
  }
  for (const z of range(z0 + 1, z1 - 1, 3)) {
    placeDougong(vox, w0, wallTop + 2, z, "z");
    placeDougong(vox, w1, wallTop + 2, z, "z");
  }

  buildXieshanRoof(vox, {
    x0: w0,
    z0,
    x1: w1,
    z1,
    y: wallTop + 6,
    overhang: 3,
    skirt: 2,
    upper: 3,
    tile: PAL.tileGreen,
    tileDeep: PAL.tileGreenDeep,
    gable: PAL.tileGrey,
  });
}

/** 主殿：最大体量，庑殿顶，金黄琉璃瓦 */
export function buildMainHall(vox, cx, cz) {
  const w0 = cx - 15;
  const w1 = cx + 15;
  const z0 = cz - 8;
  const z1 = cz + 8;
  placePlatform(vox, w0 - 2, z0 - 2, w1 + 2, z1 + 2, 3, {
    stairDir: "z+",
    stairWidth: 11,
  });
  const yBase = 4;
  const wallTop = yBase + 7;

  // 墙体（空心）
  for (let x = w0; x <= w1; x += 1) {
    for (let z = z0; z <= z1; z += 1) {
      const shell = x === w0 || x === w1 || z === z0 || z === z1;
      if (!shell) continue;
      for (let y = yBase; y <= wallTop; y += 1) {
        vox.set(x, y, z, PAL.redWall);
      }
    }
  }

  // 正面明次间
  for (let x = cx - 8; x <= cx + 8; x += 1) {
    for (let y = yBase; y <= yBase + 5; y += 1) {
      vox.set(x, y, z1, PAL.woodDark);
    }
  }
  placeDoorway(vox, cx - 3, cx + 3, yBase, yBase + 5, z1, 1);
  placeLatticeWindow(vox, cx - 8, cx - 5, yBase + 1, yBase + 4, z1);
  placeLatticeWindow(vox, cx + 5, cx + 8, yBase + 1, yBase + 4, z1);

  // 背面窗
  placeLatticeWindow(vox, cx - 8, cx - 4, yBase + 1, yBase + 4, z0);
  placeLatticeWindow(vox, cx - 1, cx + 3, yBase + 1, yBase + 4, z0);
  placeLatticeWindow(vox, cx + 6, cx + 10, yBase + 1, yBase + 4, z0);

  // 侧窗
  for (const [z0w, z1w] of [
    [cz - 5, cz - 2],
    [cz + 1, cz + 4],
  ]) {
    for (const wx of [w0, w1]) {
      for (let z = z0w; z <= z1w; z += 1) {
        for (let y = yBase + 1; y <= yBase + 4; y += 1) {
          const edge = z === z0w || z === z1w || y === yBase + 1 || y === yBase + 4;
          const midZ = z0w + Math.floor((z1w - z0w) / 2);
          const midY = yBase + 2;
          const muntin = z === midZ || y === midY;
          vox.set(wx, y, z, edge ? PAL.woodDark : muntin ? PAL.woodLattice : PAL.windowGlow);
        }
      }
    }
  }

  // 前廊立柱
  const colY = yBase;
  const colH = wallTop - yBase + 1;
  const frontCols = range(w0 + 1, w1 - 1, 4).map((x) => [x, z1 + 2]);
  const backCols = range(w0 + 1, w1 - 1, 4).map((x) => [x, z0 - 2]);
  placeColumns(vox, colY, colH, [...frontCols, ...backCols]);

  // 额枋
  vox.fill(w0, wallTop + 1, z1 + 2, w1, wallTop + 1, z1 + 2, PAL.woodBeam);
  vox.fill(w0, wallTop + 1, z0 - 2, w1, wallTop + 1, z0 - 2, PAL.woodBeam);

  // 斗拱
  for (const [x, z] of frontCols) placeDougong(vox, x, wallTop + 2, z, "x");
  for (const [x, z] of backCols) placeDougong(vox, x, wallTop + 2, z, "x");

  buildWudianRoof(vox, {
    x0: w0,
    z0: z0 - 3,
    x1: w1,
    z1: z1 + 3,
    y: wallTop + 7,
    height: 8,
    overhang: 3,
    tile: PAL.glazeGold,
    tileDeep: PAL.glazeGoldDeep,
    ridge: PAL.ridgeDark,
  });

  // 月台陈设：铜鹤/香炉位两侧石灯
  placeStoneLantern(vox, cx - 11, z1 + 5, 3);
  placeStoneLantern(vox, cx + 11, z1 + 5, 3);
}

/** 配殿：歇山顶 */
export function buildSideHall(vox, cx, cz, facing) {
  const w0 = cx - 7;
  const w1 = cx + 7;
  const z0 = cz - 5;
  const z1 = cz + 5;
  placePlatform(vox, w0 - 1, z0 - 1, w1 + 1, z1 + 1, 1, {
    stairDir: facing > 0 ? "z+" : "z-",
    stairWidth: 5,
  });
  const yBase = 2;
  const wallTop = yBase + 5;

  for (let x = w0; x <= w1; x += 1) {
    for (let z = z0; z <= z1; z += 1) {
      const shell = x === w0 || x === w1 || z === z0 || z === z1;
      if (!shell) continue;
      for (let y = yBase; y <= wallTop; y += 1) {
        vox.set(x, y, z, PAL.redWall);
      }
    }
  }

  const faceZ = facing > 0 ? z1 : z0;
  placeDoorway(vox, cx - 1, cx + 1, yBase, yBase + 4, faceZ, facing > 0 ? 1 : -1);
  placeLatticeWindow(vox, cx - 6, cx - 3, yBase + 1, yBase + 3, faceZ);
  placeLatticeWindow(vox, cx + 3, cx + 6, yBase + 1, yBase + 3, faceZ);

  const colPositions = range(w0 + 1, w1 - 1, 3).map((x) => [x, faceZ + facing * 2]);
  placeColumns(vox, yBase, wallTop - yBase + 1, colPositions);
  vox.fill(w0, wallTop + 1, faceZ + facing * 2, w1, wallTop + 1, faceZ + facing * 2, PAL.woodBeam);
  for (const [x, z] of colPositions) {
    placeDougong(vox, x, wallTop + 2, z, "x");
  }

  buildXieshanRoof(vox, {
    x0: w0,
    z0: z0 - 2,
    x1: w1,
    z1: z1 + 2,
    y: wallTop + 6,
    overhang: 2,
    skirt: 2,
    upper: 3,
    tile: PAL.tileGrey,
    tileDeep: PAL.tileGreyDeep,
    gable: PAL.tileGreen,
  });
}

/** 钟楼 / 鼓楼：两层方塔 + 攒尖顶，高度低于主殿 */
export function buildTower(vox, cx, cz, kind) {
  const half = 5;
  placePlatform(vox, cx - half - 1, cz - half - 1, cx + half + 1, cz + half + 1, 1, {
    stairDir: "z+",
    stairWidth: 5,
  });
  let y = 2;
  for (let tier = 0; tier < 2; tier += 1) {
    const bodyR = half - tier;
    const bodyH = 3;
    const y0 = y;
    const y1 = y + bodyH - 1;

    // 角柱 + 墙
    for (let x = cx - bodyR; x <= cx + bodyR; x += 1) {
      for (let z = cz - bodyR; z <= cz + bodyR; z += 1) {
        const onEdge = x === cx - bodyR || x === cx + bodyR || z === cz - bodyR || z === cz + bodyR;
        const isCorner = (x === cx - bodyR || x === cx + bodyR) && (z === cz - bodyR || z === cz + bodyR);
        for (let yy = y0; yy <= y1; yy += 1) {
          if (isCorner) vox.set(x, yy, z, PAL.redColumn);
          else if (onEdge) vox.set(x, yy, z, yy - y0 < 3 ? PAL.redWall : PAL.woodBeam);
          else vox.set(x, yy, z, PAL.woodDark);
        }
      }
    }

    // 栏杆与窗
    if (tier > 0) {
      for (let x = cx - bodyR + 1; x <= cx + bodyR - 1; x += 1) {
        vox.set(x, y0, cz + bodyR, PAL.woodBeam);
        vox.set(x, y0, cz - bodyR, PAL.woodBeam);
      }
    }
    for (let x = cx - bodyR + 1; x <= cx + bodyR - 1; x += 1) {
      vox.set(x, y0 + 1, cz + bodyR, PAL.windowGlow);
      vox.set(x, y0 + 1, cz - bodyR, PAL.windowGlow);
    }

    // 檐下斗拱
    for (let x = cx - bodyR; x <= cx + bodyR; x += 2) {
      placeDougong(vox, x, y1 + 1, cz + bodyR, "x");
      placeDougong(vox, x, y1 + 1, cz - bodyR, "x");
    }

    // 层檐（不带宝顶，上层塔身落脚其上）
    buildTierEave(vox, {
      cx,
      cz,
      y: y1 + 6,
      radius: bodyR,
      overhang: 2,
      steps: 2,
      tile: tier % 2 === 0 ? PAL.tileGrey : PAL.tileGreen,
      tileDeep: tier % 2 === 0 ? PAL.tileGreyDeep : PAL.tileGreenDeep,
    });
    y = y1 + 9;
    // 塔身收进后楼板
    vox.fill(cx - bodyR + 1, y, cz - bodyR + 1, cx + bodyR - 1, y, cz + bodyR - 1, PAL.woodBeam);
    y += 1;
  }

  // 顶层置物
  if (kind === "bell") {
    vox.fill(cx, y - 2, cz, cx, y + 1, cz, PAL.bellBronze);
    vox.fill(cx - 1, y - 1, cz, cx + 1, y - 1, cz, PAL.bellBronze);
    vox.set(cx, y + 2, cz, PAL.ridgeGold);
  } else {
    vox.fill(cx - 1, y - 2, cz - 1, cx + 1, y, cz + 1, PAL.drumRed);
    vox.fill(cx - 1, y - 2, cz + 2, cx + 1, y, cz + 2, PAL.drumSkin);
    vox.fill(cx - 1, y - 2, cz - 2, cx + 1, y, cz - 2, PAL.drumSkin);
  }

  // 顶部攒尖宝顶
  buildCuanjianRoof(vox, {
    cx,
    cz,
    y: y + 2,
    radius: 3,
    overhang: 1,
    tile: PAL.glazeGold,
    tileDeep: PAL.glazeGoldDeep,
    finial: true,
  });
}

/** 石灯 / 檐下灯笼 */
export function placeStoneLantern(vox, x, z, yBase = 0) {
  vox.fill(x, yBase, z, x, yBase + 2, z, PAL.stone);
  vox.fill(x - 1, yBase + 3, z - 1, x + 1, yBase + 3, z + 1, PAL.stoneDeep);
  vox.fill(x, yBase + 4, z, x, yBase + 5, z, PAL.lanternGlow);
  vox.fill(x - 1, yBase + 6, z - 1, x + 1, yBase + 6, z + 1, PAL.stone);
  vox.set(x, yBase + 7, z, PAL.stoneDeep);
}

/** 檐下灯笼：悬于挑檐下，不与立柱重叠 */
export function placeLantern(vox, x, y, z) {
  vox.set(x, y, z, PAL.woodDark);
  vox.set(x, y - 1, z, PAL.goldStud);
  vox.fill(x, y - 2, z, x, y - 4, z, PAL.lantern);
  vox.set(x, y - 3, z, PAL.lanternGlow);
  vox.set(x, y - 5, z, PAL.goldStud);
}

/** 石狮 */
export function placeStoneLion(vox, x, z, yBase = 0, face = 1) {
  // 台座
  vox.fill(x - 1, yBase, z - 1, x + 1, yBase + 1, z + 1, PAL.stoneDeep);
  // 身躯
  vox.fill(x - 1, yBase + 2, z - 1, x + 1, yBase + 3, z + 1, PAL.lion);
  vox.fill(x - 1, yBase + 4, z - 1, x + 1, yBase + 4, z, PAL.lion);
  // 头
  const hz = z + face;
  vox.fill(x - 1, yBase + 5, hz, x + 1, yBase + 6, hz + face, PAL.lion);
  vox.set(x, yBase + 7, hz, PAL.lionDeep);
  vox.set(x - 1, yBase + 7, hz, PAL.lionDeep);
  vox.set(x + 1, yBase + 7, hz, PAL.lionDeep);
  // 前爪
  vox.set(x - 1, yBase + 2, z + face, PAL.lionDeep);
  vox.set(x + 1, yBase + 2, z + face, PAL.lionDeep);
  // 尾
  vox.set(x, yBase + 4, z - face, PAL.lionDeep);
}
