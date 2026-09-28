// A 炸弹安放区：西北侧废弃货运仓库（雨夜三渲二微缩沙盘）。
// 外壳为 5.5 m 高混凝土仓库：东面半开锈蚀卷帘门朝「西街」，北面内开侧门通左侧小巷走廊，
// 南面两扇木板窗朝 CT。屋顶 6×6 天窗缺口让俯视看到室内包点喷漆、五层重型货架、手动叉车、
// 中央承重柱与东北角铁皮阁楼；西南角后场门半掩，门缝透出微弱红光。
import { LAYOUT } from './layout.js';

const HALF_PI = Math.PI / 2;

export function buildASite(ctx) {
  const A = LAYOUT.aSite;
  const rect = A.rect;

  // ---- 局部尺寸常量（LAYOUT 未给出的次要尺寸，就近说明用途）------------------
  const WALL_T = A.wallThickness;   // 0.7：外皮贴 rect 轮廓，厚度向内
  const WALL_H = A.wallHeight;      // 5.5
  const INNER = {                   // 内墙净空（墙内皮）
    minX: rect.minX + WALL_T,
    maxX: rect.maxX - WALL_T,
    minZ: rect.minZ + WALL_T,
    maxZ: rect.maxZ - WALL_T,
  };
  const WEST_X = rect.minX + WALL_T / 2;
  const EAST_X = rect.maxX - WALL_T / 2;
  const NORTH_Z = rect.minZ + WALL_T / 2;
  const SOUTH_Z = rect.maxZ - WALL_T / 2;
  const SPAN_X = rect.maxX - rect.minX;   // 16
  const SPAN_Z = rect.maxZ - rect.minZ;   // 14
  const ROOF_T = 0.28;                    // 屋面板厚
  const ROOF_OVER = 0.3;                  // 屋面板外挑
  const FLOOR_Y = 0.02;                   // 室内地坪面标高（比室外干）
  const MEZZ_Y = A.mezzanine.y;           // 阁楼面 3.2
  const RAIL_H = LAYOUT.scale.railHeight; // 1.05
  // 阁楼梯口：开在 ladderFoot 正上方，铁梯穿洞登顶
  const HATCH = { minX: -17.75, maxX: -16.65, minZ: -15.15, maxZ: A.mezzanine.maxZ };
  // 西南角后场隔间：两道 0.3 厚隔墙围出里间，北墙留 1.2 宽门洞
  const ROOM_X = -25.6;
  const ROOM_Z = -8.6;
  const ROOM_T = 0.3;
  const BACK_DOOR = { x: -27.6, width: 1.2, height: 2.2, open: 1.134 };  // 半开约 65°
  const SIDE_OPEN = -1.2;                 // 北侧侧门内开角

  // 静态量体按材质归并：同一材质只产出一个合并网格
  const buckets = new Map();
  const paint = (material) => {
    if (!buckets.has(material)) buckets.set(material, ctx.mb(material));
    return buckets.get(material);
  };

  // 沿轴布置的带洞墙：holes 的 at 以墙起点为 0，沿局部 +X 计（与 ctx.wall 同约定）
  const wallRun = (builder, { x, z, rotY = 0, length, height, thickness, holes = [] }) => {
    const dirX = Math.cos(rotY);
    const dirZ = -Math.sin(rotY);
    const pieces = [];
    let cursor = 0;
    const push = (from, to, fromY, toY) => {
      if (to - from > 0.001 && toY - fromY > 0.001) pieces.push([from, to, fromY, toY]);
    };
    for (const hole of [...holes].sort((a, b) => a.at - b.at)) {
      push(cursor, hole.at, 0, height);
      push(hole.at, hole.at + hole.width, 0, hole.from);
      push(hole.at, hole.at + hole.width, hole.from + hole.height, height);
      cursor = hole.at + hole.width;
    }
    push(cursor, length, 0, height);
    for (const [from, to, fromY, toY] of pieces) {
      const mid = (from + to) / 2;
      builder.box(to - from, toY - fromY, thickness, x + dirX * mid, fromY, z + dirZ * mid, { rotY });
    }
  };

  // 护栏：立柱 + 上下横杆，沿局部 +X 铺开
  const railingRun = (builder, { x, z, rotY = 0, length }) => {
    const dirX = Math.cos(rotY);
    const dirZ = -Math.sin(rotY);
    const bays = Math.max(1, Math.round(length / 1.4));
    for (let i = 0; i <= bays; i += 1) {
      const d = (length * i) / bays;
      builder.box(0.07, RAIL_H, 0.07, x + dirX * d, MEZZ_Y, z + dirZ * d, { rotY });
    }
    for (const bottom of [MEZZ_Y + RAIL_H - 0.06, MEZZ_Y + 0.52]) {
      builder.box(length, 0.06, 0.06, x + dirX * (length / 2), bottom, z + dirZ * (length / 2), { rotY });
    }
  };

  const prop = (type, x, y, z, rotY = 0) => ctx.prop(type, x, y, z, { rotY });

  // ---- 1. 墙体外壳：四面 5.5 高混凝土墙 + 西南角后场隔墙 ----------------------
  const wall = paint('concreteWall');
  wallRun(wall, { x: WEST_X, z: rect.maxZ, rotY: HALF_PI, length: SPAN_Z, height: WALL_H, thickness: WALL_T });
  wallRun(wall, {
    x: EAST_X,
    z: rect.maxZ,
    rotY: HALF_PI,
    length: SPAN_Z,
    height: WALL_H,
    thickness: WALL_T,
    holes: [
      // 卷帘门洞 5.2 × 3.5
      { at: (rect.maxZ - A.shutter.z) - A.shutter.width / 2, width: A.shutter.width, from: 0, height: A.shutter.height },
      // 阁楼俯瞰小窗洞 2.2 × 1.1（窗台 3.9）
      { at: (rect.maxZ - A.mezzWindow.z) - A.mezzWindow.width / 2, width: A.mezzWindow.width, from: A.mezzWindow.sill, height: A.mezzWindow.height },
    ],
  });
  wallRun(wall, {
    x: rect.minX,
    z: NORTH_Z,
    length: SPAN_X,
    height: WALL_H,
    thickness: WALL_T,
    holes: [{ at: (A.sideDoor.x - rect.minX) - A.sideDoor.width / 2, width: A.sideDoor.width, from: 0, height: A.sideDoor.height }],
  });
  wallRun(wall, {
    x: rect.minX,
    z: SOUTH_Z,
    length: SPAN_X,
    height: WALL_H,
    thickness: WALL_T,
    holes: A.windows.map((w) => ({ at: (w.x - rect.minX) - w.width / 2, width: w.width, from: w.sill, height: w.height })),
  });
  // 后场隔间两道隔墙
  wallRun(wall, {
    x: INNER.minX,
    z: ROOM_Z,
    length: ROOM_X - INNER.minX,
    height: WALL_H,
    thickness: ROOM_T,
    holes: [{ at: BACK_DOOR.x - INNER.minX, width: BACK_DOOR.width, from: 0, height: BACK_DOOR.height }],
  });
  wallRun(wall, {
    x: ROOM_X,
    z: ROOM_Z + ROOM_T / 2,
    rotY: -HALF_PI,
    length: INNER.maxZ - (ROOM_Z + ROOM_T / 2),
    height: WALL_H,
    thickness: ROOM_T,
  });

  // ---- 2. 屋顶：外挑屋面板，中部按 skylight 留 6×6 开口 ----------------------
  const roof = paint('corrugated');
  const sk = A.skylight;
  const rx0 = rect.minX - ROOF_OVER;
  const rx1 = rect.maxX + ROOF_OVER;
  const rz0 = rect.minZ - ROOF_OVER;
  const rz1 = rect.maxZ + ROOF_OVER;
  const roofMidX = (rx0 + rx1) / 2;
  const skMidX = (sk.minX + sk.maxX) / 2;
  const skMidZ = (sk.minZ + sk.maxZ) / 2;
  roof.box(rx1 - rx0, ROOF_T, sk.minZ - rz0, roofMidX, A.roofY, (rz0 + sk.minZ) / 2);
  roof.box(rx1 - rx0, ROOF_T, rz1 - sk.maxZ, roofMidX, A.roofY, (sk.maxZ + rz1) / 2);
  roof.box(sk.minX - rx0, ROOF_T, sk.maxZ - sk.minZ, (rx0 + sk.minX) / 2, A.roofY, skMidZ);
  roof.box(rx1 - sk.maxX, ROOF_T, sk.maxZ - sk.minZ, (sk.maxX + rx1) / 2, A.roofY, skMidZ);

  // 天窗翻边 0.25 高 + 跨洞锈蚀横梁 3 根
  const rust = paint('rustMetal');
  const rimY = A.roofY + ROOF_T;
  rust.box(sk.maxX - sk.minX + 0.32, 0.25, 0.16, skMidX, rimY, sk.minZ);
  rust.box(sk.maxX - sk.minX + 0.32, 0.25, 0.16, skMidX, rimY, sk.maxZ);
  rust.box(0.16, 0.25, sk.maxZ - sk.minZ, sk.minX, rimY, skMidZ);
  rust.box(0.16, 0.25, sk.maxZ - sk.minZ, sk.maxX, rimY, skMidZ);
  for (const beamX of [-22.6, -21.0, -19.4]) {
    rust.box(0.14, 0.2, sk.maxZ - sk.minZ + 0.2, beamX, A.roofY, skMidZ);
  }

  // ---- 3. 半开卷帘门：帘板 + 横向凹槽 + 两侧导轨 + 顶部卷筒箱 + 门槛 ---------
  rust.box(0.14, A.shutter.height - A.shutter.openFrom, A.shutter.width, EAST_X, A.shutter.openFrom, A.shutter.z);
  for (let i = 0; i < 4; i += 1) {
    rust.box(0.07, 0.055, A.shutter.width - 0.06, EAST_X + 0.1, A.shutter.openFrom + 0.05 + i * 0.14, A.shutter.z);
  }
  for (const side of [-1, 1]) {
    rust.box(0.22, 3.6, 0.24, EAST_X + 0.08, 0, A.shutter.z + side * (A.shutter.width / 2 + 0.12));
  }
  rust.box(0.26, 0.34, A.shutter.width + 0.3, rect.maxX + 0.1, A.shutter.height - 0.08, A.shutter.z);
  rust.box(1.1, 0.09, A.shutter.width, EAST_X - 0.15, 0, A.shutter.z);

  // ---- 4. 室内地坪与包点标识 -------------------------------------------------
  const floor = paint('concreteFloor');
  floor.box(INNER.maxX - INNER.minX, FLOOR_Y, INNER.maxZ - INNER.minZ, (INNER.minX + INNER.maxX) / 2, 0, (INNER.minZ + INNER.maxZ) / 2);
  ctx.decal('siteA', A.siteMark.x, FLOOR_Y + 0.015, A.siteMark.z, { rotX: -HALF_PI, w: 4.6, h: 4.6 });
  ctx.decal('bullets', A.siteMark.x + 0.9, FLOOR_Y + 0.025, A.siteMark.z - 0.8, { rotX: -HALF_PI, w: 2, h: 2, opacity: 0.85 });

  // ---- 5. 中央承重柱（peek 位）：柱身 + 柱底磨损深色圈 ------------------------
  const column = paint('concrete');
  column.box(A.column.size, WALL_H, A.column.size, A.column.x, 0, A.column.z);
  paint('concreteDark').box(A.column.size + 0.12, 0.5, A.column.size + 0.12, A.column.x, 0, A.column.z);

  // ---- 6. 门窗构件：南墙木板窗、北墙内开侧门、后场半掩铁门 -------------------
  const wood = paint('wood');
  for (const w of A.windows) {
    for (let i = 0; i < 3; i += 1) {
      wood.box(w.width + 0.12, 0.3, 0.07, w.x, w.sill + 0.1 + i * 0.4, rect.maxZ + 0.04, { rotZ: i === 1 ? 0.04 : -0.05 });
    }
    wood.box(0.16, w.height + 0.2, 0.08, w.x + 0.34, w.sill - 0.06, rect.maxZ + 0.05, { rotZ: 0.05 });
    rust.box(w.width + 0.36, 0.09, 0.24, w.x, w.sill - 0.09, rect.maxZ + 0.02);
  }

  const doorSteel = paint('paintedMetalGray');
  // 北墙侧门：门框 + 内开门扇（开向仓库内，通左侧小巷走廊）
  const sd = A.sideDoor;
  rust.box(0.12, sd.height + 0.06, WALL_T + 0.06, sd.x - sd.width / 2, 0, NORTH_Z);
  rust.box(0.12, sd.height + 0.06, WALL_T + 0.06, sd.x + sd.width / 2, 0, NORTH_Z);
  rust.box(sd.width, 0.12, WALL_T + 0.06, sd.x, sd.height, NORTH_Z);
  const sideDx = Math.cos(SIDE_OPEN);
  const sideDz = -Math.sin(SIDE_OPEN);
  const sideHingeX = sd.x - sd.width / 2 + 0.04;
  const sideHingeZ = NORTH_Z + WALL_T / 2 + 0.03;
  const sideLeaf = sd.width - 0.08;
  doorSteel.box(sideLeaf, 2.14, 0.05, sideHingeX + sideDx * sideLeaf / 2, 0, sideHingeZ + sideDz * sideLeaf / 2, { rotY: SIDE_OPEN });
  doorSteel.box(0.05, 0.5, 0.08, sideHingeX + sideDx * 0.95, 1, sideHingeZ + sideDz * 0.95, { rotY: SIDE_OPEN });

  // 后场门：门框 + 以西门框为轴向北开启 65° 的门扇 + 门缝红光
  rust.box(0.1, BACK_DOOR.height + 0.06, ROOM_T + 0.04, BACK_DOOR.x, 0, ROOM_Z);
  rust.box(0.1, BACK_DOOR.height + 0.06, ROOM_T + 0.04, BACK_DOOR.x + BACK_DOOR.width, 0, ROOM_Z);
  rust.box(BACK_DOOR.width, 0.1, ROOM_T + 0.04, BACK_DOOR.x + BACK_DOOR.width / 2, BACK_DOOR.height, ROOM_Z);
  const backDx = Math.cos(BACK_DOOR.open);
  const backDz = -Math.sin(BACK_DOOR.open);
  const backHingeX = BACK_DOOR.x + 0.04;
  const backHingeZ = ROOM_Z - ROOM_T / 2 - 0.03;
  doorSteel.box(BACK_DOOR.width - 0.08, 2.16, 0.06, backHingeX + backDx * BACK_DOOR.width / 2, 0, backHingeZ + backDz * BACK_DOOR.width / 2, { rotY: BACK_DOOR.open });
  doorSteel.box(0.06, 0.6, 0.06, backHingeX + backDx * 0.95, 1, backHingeZ + backDz * 0.95, { rotY: BACK_DOOR.open });
  paint('lampRed').box(0.08, 1.6, 0.03, backHingeX + 0.12, 0.1, ROOM_Z - ROOM_T / 2 - 0.04);

  // ---- 7. 铁皮阁楼：3.2 平台（留梯口）+ 周边护栏 + 支撑立柱 + 垂直铁梯 --------
  const mezz = A.mezzanine;
  const deck = paint('checkeredPlate');
  const deckH = 0.14;
  const deckY = MEZZ_Y - deckH;
  const mezzMidZ = (mezz.minZ + mezz.maxZ) / 2;
  deck.box(HATCH.minX - mezz.minX, deckH, mezz.maxZ - mezz.minZ, (mezz.minX + HATCH.minX) / 2, deckY, mezzMidZ);
  deck.box(mezz.maxX - HATCH.maxX, deckH, mezz.maxZ - mezz.minZ, (HATCH.maxX + mezz.maxX) / 2, deckY, mezzMidZ);
  deck.box(HATCH.maxX - HATCH.minX, deckH, HATCH.minZ - mezz.minZ, (HATCH.minX + HATCH.maxX) / 2, deckY, (mezz.minZ + HATCH.minZ) / 2);

  const deckSteel = paint('darkMetal');
  const strH = 0.16;
  const strY = deckY - strH;
  deckSteel.box(HATCH.minX - mezz.minX, strH, 0.12, (mezz.minX + HATCH.minX) / 2, strY, mezz.maxZ - 0.06);
  deckSteel.box(mezz.maxX - HATCH.maxX, strH, 0.12, (HATCH.maxX + mezz.maxX) / 2, strY, mezz.maxZ - 0.06);
  deckSteel.box(0.12, strH, mezz.maxZ - mezz.minZ, mezz.minX + 0.06, strY, mezzMidZ);
  deckSteel.box(mezz.maxX - mezz.minX, strH, 0.1, (mezz.minX + mezz.maxX) / 2, strY, mezz.minZ + 0.05);
  // 梯口加强边框：贴在平台板底面，托住开洞两侧
  deckSteel.box(HATCH.maxX - HATCH.minX + 0.12, 0.12, 0.12, A.ladderFoot.x, deckY - 0.12, HATCH.minZ + 0.06);
  for (const [postX, postZ] of [[mezz.minX + 0.08, mezz.maxZ - 0.06], [-16.3, mezz.maxZ - 0.06], [mezz.minX + 0.08, -16.6]]) {
    deckSteel.box(0.16, strY, 0.16, postX, 0, postZ);
  }

  const railing = paint('paintedMetalGray');
  railingRun(railing, { x: mezz.minX + 0.04, z: mezz.maxZ - 0.04, length: HATCH.minX - mezz.minX - 0.08 });
  railingRun(railing, { x: HATCH.maxX + 0.04, z: mezz.maxZ - 0.04, length: mezz.maxX - HATCH.maxX - 0.08 });
  railingRun(railing, { x: mezz.minX + 0.04, z: mezz.maxZ - 0.04, rotY: HALF_PI, length: mezz.maxZ - mezz.minZ - 0.08 });
  prop('ladderSteel', A.ladderFoot.x, 0, A.ladderFoot.z);

  // 阁楼俯瞰小窗：洞内衬框 + 外挑窗台
  const mw = A.mezzWindow;
  rust.box(0.14, mw.height + 0.2, 0.16, EAST_X, mw.sill - 0.1, mw.z - mw.width / 2 - 0.08);
  rust.box(0.14, mw.height + 0.2, 0.16, EAST_X, mw.sill - 0.1, mw.z + mw.width / 2 + 0.08);
  rust.box(0.14, 0.12, mw.width + 0.32, EAST_X, mw.sill - 0.06, mw.z);
  rust.box(0.14, 0.12, mw.width + 0.32, EAST_X, mw.sill + mw.height - 0.06, mw.z);
  rust.box(0.36, 0.1, mw.width + 0.5, rect.maxX - 0.06, mw.sill - 0.12, mw.z);

  // ---- 8. 五层重型货架：2 组贴西墙摆放，层板上码放纸箱/麻袋 -----------------
  // 层板面标高（道具自带 5 层：0.1 + i × 0.6 + 板厚一半）
  const shelfLevels = [0.13, 0.73, 1.33, 1.93, 2.53];
  // 每组货架的层板货：[道具, 层号, 沿架长偏移(-0.45~0.45), 摆角]
  const shelfCargo = [
    [
      ['cardboardBoxSmall', 4, -0.4, 0.3],
      ['cardboardBoxSmall', 4, 0.45, -0.5],
      ['parcelBox', 3, -0.4, 0.2],
      ['sack', 2, -0.45, 0.4],
      ['cardboardBoxSmall', 2, 0.4, -0.2],
      ['cardboardBox', 1, -0.35, 0.1],
      ['cementBag', 1, 0.4, 1.3],
      ['sack', 0, -0.4, 2.2],
      ['newsPile', 0, 0.35, 0.6],
    ],
    [
      ['cardboardBoxSmall', 4, -0.4, 0.8],
      ['cardboardBoxSmall', 4, 0.4, -0.3],
      ['parcelBox', 3, -0.4, 1.1],
      ['cementBag', 3, 0.4, 0.2],
      ['cardboardBoxSmall', 2, -0.4, -0.6],
      ['sack', 2, 0.4, 0.9],
      ['cardboardBox', 1, -0.35, -0.05],
      ['cardboardBoxSmall', 1, 0.4, 0.5],
      ['sack', 0, -0.4, 1.9],
    ],
  ];
  A.shelving.forEach((shelf, index) => {
    prop('shelfUnit', shelf.x, FLOOR_Y, shelf.z, shelf.rotY);
    for (const [type, level, offset, rotY] of shelfCargo[index]) {
      prop(type, shelf.x, FLOOR_Y + shelfLevels[level], shelf.z + offset, rotY);
    }
  });

  // ---- 9. 木箱与麻袋：中部、西南角与叉车前方成组堆叠 -------------------------
  prop('woodCrate', -15.3, FLOOR_Y, -10.3, 0.1);
  prop('woodCrate', -15.3, FLOOR_Y + 0.75, -10.3, 0.42);
  prop('woodCrateLong', -15.7, FLOOR_Y, -9.05, 0.25);
  prop('woodCrateTall', -24.9, FLOOR_Y, -7.4, 0.18);
  prop('woodCrate', -24.9, FLOOR_Y + 1.1, -7.4, 0.5);
  prop('woodCrateLong', -19.0, FLOOR_Y, -6.2, 0.3);
  prop('woodCrateLong', -19.0, FLOOR_Y + 0.75, -6.2, 0.5);
  prop('woodCrate', -26.4, FLOOR_Y, -12.8, 0.15);
  prop('woodCrate', -26.4, FLOOR_Y + 0.75, -12.8, -0.3);
  prop('woodCrateTall', -15.0, FLOOR_Y, -16.9, 0.2);
  prop('cardboardBox', -15.0, FLOOR_Y + 1.1, -16.9, 0.7);
  prop('pallet', -22.6, FLOOR_Y, -17.5, 0.12);
  prop('woodCrate', -22.6, FLOOR_Y + 0.15, -17.5, 0.35);
  prop('sack', -24.7, FLOOR_Y, -8.1, 1.1);
  prop('sack', -17.9, FLOOR_Y, -7.1, 0.4);
  prop('sack', -26.9, FLOOR_Y, -12.2, 2.0);
  prop('cementBag', -15.6, FLOOR_Y, -16.15, 0.8);
  prop('cementBag', -22.0, FLOOR_Y, -16.9, 1.7);
  prop('cementBag', -25.3, FLOOR_Y, -13.9, 0.3);

  // 手动叉车与其待运托盘货（托盘正对货叉前方）
  prop('forklift', A.forklift.x, FLOOR_Y, A.forklift.z, A.forklift.rotY);
  prop('pallet', -17.5, FLOOR_Y, -6.9, A.forklift.rotY);
  prop('woodCrate', -17.5, FLOOR_Y + 0.15, -6.9, A.forklift.rotY + 0.2);

  // ---- 10. 分拣台、散落包裹与包装带 ------------------------------------------
  prop('sortTable', A.sortTable.x, FLOOR_Y, A.sortTable.z);
  prop('parcelBox', A.sortTable.x - 0.35, FLOOR_Y + 0.88, A.sortTable.z + 0.05, 0.3);
  prop('cardboardBoxSmall', A.sortTable.x + 0.3, FLOOR_Y + 0.88, A.sortTable.z - 0.1, -0.4);
  prop('newsPile', A.sortTable.x + 0.35, FLOOR_Y + 0.88, A.sortTable.z + 0.3, 0.2);
  prop('parcelBox', -19.5, FLOOR_Y, -15.6, 0.9);
  prop('parcelBox', -20.6, FLOOR_Y, -17.8, 0.2);
  prop('parcelBox', -14.6, FLOOR_Y, -14.9, 1.4);
  prop('parcelBox', -23.0, FLOOR_Y, -6.9, 0.6);
  prop('newsPile', -17.9, FLOOR_Y, -16.15, 0.5);
  prop('newsPile', -16.6, FLOOR_Y, -18.0, 1.2);
  const strap = paint('plasticBarrier');
  strap.box(1.6, 0.012, 0.08, -18.6, FLOOR_Y, -16.0, { rotY: 0.7 });
  strap.box(1.35, 0.012, 0.07, -16.9, FLOOR_Y, -8.6, { rotY: -1.2 });

  // ---- 11. 室内照明：一盏冷白吊灯（闪烁损坏）+ 另一盏熄灭，货架旁再加熄灭灯管 -----
  // 吊点取屋面底 5.5，灯罩下缘正好落在 y ≈ 4.9
  prop('hangingLamp', -26.3, WALL_H, -9.0);
  prop('hangingLamp', -15.8, WALL_H, -10.6);
  // 只保留一盏真实光源（覆盖整个室内，distance 放大到 20），另一盏以自发光灯罩表现熄灭状态
  ctx.light({ kind: 'point', position: [-21.2, 4.75, -9.8], color: 0xcfe4ff, intensity: 26, distance: 20, decay: 1.5, anim: 'flicker', rate: 0.8 });
  paint('lampOff').cyl(0.05, 0.05, 1.2, 10, INNER.minX + 0.18, 3.5, -12.4, { rotX: HALF_PI, anchor: 'center' });
  deckSteel.box(0.14, 0.1, 0.06, INNER.minX + 0.08, 3.45, -12.9);
  deckSteel.box(0.14, 0.1, 0.06, INNER.minX + 0.08, 3.45, -11.9);

  // ---- 12. 室外：东墙空调外机/通风管/货运牌，墙根轮胎油桶，南墙外线缆盘 ------
  prop('acUnit', A.acUnit.x, A.acUnit.y, A.acUnit.z, HALF_PI);
  prop('ventPipe', -12.75, 0, -8.3);
  deckSteel.box(0.5, 0.1, 0.12, -12.76, A.acUnit.y + 0.05, A.acUnit.z - 0.22);
  deckSteel.box(0.5, 0.1, 0.12, -12.76, A.acUnit.y + 0.05, A.acUnit.z + 0.22);
  // 货运标识牌挂在卷帘门洞上方实墙（避开 3.42~3.76 的卷筒箱）
  paint('paintedMetalGray').box(0.08, 1, 2.2, -12.74, 3.9, A.signBoard.z);
  deckSteel.box(0.28, 0.1, 0.1, -12.87, 4.05, A.signBoard.z - 0.8);
  deckSteel.box(0.28, 0.1, 0.1, -12.87, 4.05, A.signBoard.z + 0.8);
  ctx.decal('freight', -12.69, 4.4, A.signBoard.z, { rotX: 0, rotY: HALF_PI, w: 1.7, h: 0.75 });
  prop('dumpster', A.dumpster.x, 0, A.dumpster.z, HALF_PI);
  prop('trashCan', -11.5, 0, -17.7);
  prop('trashCan', -12.05, 0, -13.6);
  prop('barrelRust', -12.3, 0, -15.1);
  prop('tire', -12.35, 0, -11.5, 0.35);
  prop('tire', -12.6, 0, -10.7, 1.15);
  prop('cableSpool', -20.4, 0, -3.5, 0.25);
  prop('cardboardBox', -19.15, 0, -3.6, 0.5);

  // ---- 13. 贴花：室外东/南墙涂鸦与货运编号，室内弹痕 ------------------------
  ctx.decal('graffiti', rect.maxX + 0.03, 1.7, -15.6, { rotX: 0, rotY: HALF_PI, w: 2.6, h: 1.8, opacity: 0.9 });
  ctx.decal('graffiti', rect.maxX + 0.03, 1.5, -7.6, { rotX: 0, rotY: HALF_PI, w: 2.4, h: 1.6, opacity: 0.85 });
  ctx.decal('graffiti', rect.maxX + 0.03, 1.1, -17.95, { rotX: 0, rotY: HALF_PI, w: 2, h: 1.4, opacity: 0.8 });
  ctx.decal('freight', rect.maxX + 0.03, 3.2, -8.3, { rotX: 0, rotY: HALF_PI, w: 2.2, h: 1.1 });
  ctx.decal('graffiti', -22.4, 1.5, rect.maxZ + 0.03, { rotX: 0, w: 2.4, h: 1.6, opacity: 0.88 });
  ctx.decal('bullets', -17.2, 1.9, rect.maxZ + 0.03, { rotX: 0, w: 1.3, h: 1.3 });
  ctx.decal('bullets', A.column.x, 2.3, A.column.z + A.column.size / 2 + 0.02, { rotX: 0, w: 0.8, h: 0.8 });
  ctx.decal('bullets', INNER.minX + 0.03, 2.4, -12.5, { rotX: 0, rotY: HALF_PI, w: 1.5, h: 1.5 });

  // ---- 14. 水与气：卷帘门下缘、天窗翻边、阁楼檐口与北侧走廊的滴水 + 排气白汽 --
  ctx.fx.drip(EAST_X + 0.02, A.shutter.openFrom + 0.02, -13.6, { rate: 1.6, length: 0.3, groundY: 0.09, splash: true });
  ctx.fx.drip(EAST_X + 0.02, A.shutter.openFrom + 0.02, -10.4, { rate: 1.2, length: 0.3, groundY: 0.09, splash: true });
  ctx.fx.drip(sk.minX, rimY + 0.24, -11, { rate: 1.1, length: 0.3, groundY: FLOOR_Y, splash: true });
  ctx.fx.drip(sk.maxX, rimY + 0.24, -10, { rate: 1.4, length: 0.3, groundY: FLOOR_Y, splash: true });
  ctx.fx.drip(-18, deckY, mezz.maxZ - 0.06, { rate: 1.4, length: 0.3, groundY: FLOOR_Y, splash: true });
  ctx.fx.drip(-14.6, deckY, mezz.maxZ - 0.06, { rate: 1.1, length: 0.3, groundY: FLOOR_Y, splash: true });
  ctx.fx.drip(-26.4, 3.1, rect.minZ - 0.06, { rate: 1.2, length: 0.3, splash: true });
  ctx.fx.drip(-22.2, 2.6, rect.minZ - 0.06, { rate: 1.0, length: 0.3, splash: true });
  ctx.fx.steam(A.acUnit.x, A.acUnit.y + 0.77, A.acUnit.z, { size: 1.2, rate: 0.35, rise: 0.4, drift: [0.1, -0.06], life: 5 });

  for (const builder of buckets.values()) builder.finish();
}
