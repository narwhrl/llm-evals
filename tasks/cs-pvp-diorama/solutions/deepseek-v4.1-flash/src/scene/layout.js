// 沙盘坐标蓝图：北 = -Z，东 = +X，底座 x/z ∈ [-32, 32]，台面 y = 0。
// 所有区域模块只能引用这里的常量，保证互不重叠、不越界。
export const LAYOUT = {
  bounds: { minX: -32, maxX: 32, minZ: -32, maxZ: 32, maxY: 26 },
  slab: { height: 2.4, inset: 0.0 },
  scale: { playerEye: 1.62, doorHeight: 2.2, containerHeight: 2.59, railHeight: 1.05 },

  // ---- 外围：把沙盘围成一块被切出的街区 ----
  perimeter: {
    north: { z: -31.6, fromX: -32, toX: 32, height: 3.2, thickness: 0.8 },
    west: { x: -31.6, fromZ: -32, toZ: 32, height: 3.0, thickness: 0.8 },
    east: { x: 31.6, fromZ: -32, toZ: 32, height: 3.0, thickness: 0.8 },
    south: { z: 31.6, fromX: -32, toX: 32, height: 3.4, thickness: 0.8 },
  },

  // ---- T 阵营出生点（北侧卸货区） ----
  tSpawn: {
    rect: { minX: -18, maxX: 8, minZ: -30, maxZ: -21 },
    fenceZ: -21.2,
    gate: { centerX: -2, width: 3.2 },
    truck: { x: -13, z: -26.2, rotY: 0, cabZ: -28.4 },
    ladder: { x: -9.6, z: -26.6 },
    containerStacks: [
      { x: 3.38, z: -26.6, levels: 3 },
      { x: 6.82, z: -26.6, levels: 2 },
    ],
    gap: { fromX: 4.6, toX: 5.6, z: -26.6 },
    ramp: { minX: -6, maxX: 2, fromZ: -20.6, toZ: -16, height: 1.6, wallThickness: 0.5 },
    rampHole: { x: -5.75, z: -18.4, width: 1.4, from: 0.8, height: 0.75 },
    barrelCluster: { x: -9.2, z: -22.4 },
    pallets: { x: -7.2, z: -23.4 },
    westYard: { minX: -31, maxX: -19, minZ: -30.5, maxZ: -23 },
  },

  // ---- A 炸弹安放区（西北仓库） ----
  aSite: {
    rect: { minX: -29, maxX: -13, minZ: -19, maxZ: -5 },
    wallHeight: 5.5,
    wallThickness: 0.7,
    roofY: 5.5,
    skylight: { minX: -24, maxX: -18, minZ: -14, maxZ: -8 },
    shutter: { x: -13, z: -12, width: 5.2, height: 3.5, openFrom: 2.7 },
    sideDoor: { z: -19, x: -25, width: 1.2, height: 2.2 },
    windows: [
      { z: -5, x: -24.5, width: 1.6, sill: 0.95, height: 1.25 },
      { z: -5, x: -18.5, width: 1.6, sill: 0.95, height: 1.25 },
    ],
    column: { x: -20.5, z: -12.5, size: 0.9 },
    mezzanine: { minX: -19.2, maxX: -13.7, minZ: -18.3, maxZ: -14.2, y: 3.2 },
    mezzWindow: { x: -13.35, z: -16.2, width: 2.2, sill: 3.9, height: 1.1 },
    ladderFoot: { x: -17.2, z: -14.6 },
    siteMark: { x: -21.2, z: -11.6 },
    shelving: [
      { x: -27.8, z: -10.5, rotY: Math.PI / 2 },
      { x: -27.8, z: -14.5, rotY: Math.PI / 2 },
    ],
    forklift: { x: -16.4, z: -7.6, rotY: 0.6 },
    sortTable: { x: -17.4, z: -17.4 },
    dumpster: { x: -12.2, z: -16.4 },
    acUnit: { x: -12.35, z: -9.2, y: 1.15 },
    signBoard: { x: -12.4, z: -14.4, y: 3.4 },
  },

  // ---- 中路主通道 ----
  mid: {
    minX: -5,
    maxX: 5,
    wallHeight: 3.5,
    wallThickness: 0.6,
    fromZ: -16,
    toZ: 14,
    slit: { z: -1.6, from: 1.75, height: 0.75, width: 1.4 },
    gate: { z: -6, structureHeight: 4.2, opening: { minX: -0.9, maxX: 1.5 } },
    channel: { minX: -0.55, maxX: 0.55, fromZ: -15.5, toZ: 13, curbHeight: 0.16, waterDrop: 0.12 },
    lowWall: { z: 6, minX: -4.6, maxX: 1.2, height: 1.15, thickness: 0.5 },
    booths: [
      { x: -8.6, z: -3.2, rotY: Math.PI / 2 },
      { x: 8.6, z: 3.4, rotY: -Math.PI / 2 },
    ],
    ctDoor: { z: 13.6, width: 5 },
  },

  // ---- B 炸弹安放区（东北后街） ----
  bSite: {
    house: { minX: 14, maxX: 30, minZ: -24, maxZ: -10, groundY: 3.1, roofY: 6.3, wall: 0.28 },
    frontDoor: { z: -10, x: 17.6, width: 1.15, height: 2.2 },
    backDoor: { z: -24, x: 26.5, width: 1.15, height: 2.2 },
    windows: [
      { x: 14, z: -21, width: 1.5, sill: 1.0, height: 1.3, facing: 'west' },
      { x: 14, z: -14.5, width: 1.5, sill: 1.0, height: 1.3, facing: 'west' },
      { z: -10, x: 22.5, width: 1.5, sill: 1.0, height: 1.3, facing: 'south' },
      { z: -10, x: 27.5, width: 1.5, sill: 1.0, height: 1.3, facing: 'south' },
    ],
    balcony: { minX: 14, maxX: 30, z: -10, depth: 1.5, y: 3.1, railHeight: 1.05 },
    fireEscape: { x: 27.2, z: -8.7, rise: 3.1, run: 3.2 },
    siteMark: { x: 18.6, z: -7.4 },
    lamp: { x: 9.6, z: -6.4, height: 4.6 },
    cornerWall: { z: -4.9, minX: 8, maxX: 14.2, height: 1.25, thickness: 0.55 },
    yard: { minX: 14, maxX: 30, minZ: -30.5, maxZ: -24.5 },
  },

  // ---- CT 阵营出生点（南侧封锁区） ----
  ctSpawn: {
    rect: { minX: -16, maxX: 12, minZ: 18, maxZ: 31 },
    barrierZ: 21.2,
    barrierFromX: -8.4,
    barrierToX: 2.2,
    van: { x: -11.4, z: 25.4, rotY: -Math.PI / 2 },
    platform: { minX: 3.6, maxX: 11.6, minZ: 22, maxZ: 30, height: 2.6 },
    stairs: { x: 3.6, z: 23.4, rise: 2.6, run: 4.4 },
    searchlight: { x: 7.8, y: 2.6, z: 27.4 },
    backWall: { z: 31.2 },
    armorCrates: [
      { x: -6.2, z: 29.6 },
      { x: -3.6, z: 29.6 },
    ],
    westExit: { minX: -16, maxX: -5, z: 17.5 },
    eastExit: { minX: 6, maxX: 12, z: 17.5 },
  },

  // ---- 三条路线与街区 ----
  routes: {
    leftAlley: { minX: -31.4, maxX: -29.05, fromZ: -21.5, toZ: -2.5 },
    northCorridor: { minX: -29.05, maxX: -17.5, minZ: -21.5, maxZ: -19.35 },
    westStreet: { minX: -12.3, maxX: -5.3, minZ: -5, maxZ: 17 },
    culvert: { minX: -7.7, maxX: -5.6, fromZ: -17.4, toZ: 13.4, height: 1.45, wall: 0.3 },
    eastStreet: { minX: 5.6, maxX: 14, minZ: -6, maxZ: 18 },
    eastYard: { minX: 14, maxX: 22, minZ: -8, maxZ: 18 },
    platform: { minX: 22, maxX: 30.5, minZ: -6, maxZ: 16, height: 1.6 },
    platformStairs: { x: 24.5, z: 16.6, rise: 1.6, run: 3.4 },
    catwalk: { minX: 5.6, maxX: 22, z: -1.6, width: 1.7, y: 1.6 },
    southWestBlock: { minX: -29.05, maxX: -17, minZ: 0, maxZ: 12, height: 6.1 },
    southStreet: { minZ: 12, maxZ: 18, minX: -29.05, maxX: 12 },
  },

  // ---- 高架与空中 ----
  overhead: {
    poles: [
      { x: -20.5, z: -23.2 },
      { x: 9.4, z: 20.5 },
      { x: 30.2, z: -30.2 },
      { x: -30.2, z: 17.5 },
    ],
    height: 7.6,
  },
};

// 区域矩形转中心/尺寸，便于摆放体量。
export function rectToBox(rect) {
  return {
    cx: (rect.minX + rect.maxX) / 2,
    cz: (rect.minZ + rect.maxZ) / 2,
    width: rect.maxX - rect.minX,
    depth: rect.maxZ - rect.minZ,
  };
}

// 带门洞/窗洞的墙：切成若干段，返回可直接喂给 MeshBuilder 的分段列表。
export function wallSegments(start, end, holes = []) {
  const segments = [];
  let cursor = start;
  const sorted = [...holes].sort((a, b) => a.at - b.at);
  for (const hole of sorted) {
    if (hole.at > cursor) segments.push({ from: cursor, to: hole.at, fromY: 0, toY: null });
    if (hole.lintel !== undefined && hole.lintel > 0) {
      segments.push({ from: hole.at, to: hole.at + hole.width, fromY: hole.lintel, toY: null });
    }
    cursor = hole.at + hole.width;
  }
  if (cursor < end) segments.push({ from: cursor, to: end, fromY: 0, toY: null });
  return segments;
}
