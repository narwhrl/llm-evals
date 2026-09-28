import { P } from "../core/palette.js";
import { balustrade, wall } from "./parts.js";

/**
 * 场景陈设：院墙、石狮、香炉、松树、阔叶树、石灯、幡杆、照壁、石桥、井、假山。
 *
 * 全局约定：VoxelWorld 每次写入都会沿 x = 0 自动镜像，因此本模块只写 x ≥ 0 的格子。
 * 骑在中轴上的构件（x 小于自身半宽）只写右半，左半交给镜像；偏轴构件写完整局部范围，
 * 其绝对坐标同样全部 ≥ 0。所有构件都从 y0 起造并向下连到地面，不产生悬空体素。
 */

/** mulberry32：固定种子的伪随机，保证同一 seed 每次构建出的形状完全一致。 */
function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 位置哈希：需要「每格不同但可复现」的抖动时用它，避免打乱伪随机序列的取用顺序。 */
function hash3(x, y, z, seed) {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + seed * 4.13) * 43758.5453;
  return s - Math.floor(s);
}

/**
 * 局部坐标写入器。half 是构件自身沿 x 的最大半宽：
 * - 构件骑在中轴上（x < half）时只写 dx ≥ 0，左半由全局镜像补齐；
 * - 偏轴时写完整局部范围，绝对坐标全部 ≥ 0。
 * face = -1 时局部 +dz 指向世界 -z，用于面朝 -z 的构件。
 */
function localWriter(world, x, y, z, half, face = 1) {
  const onAxis = x < half;
  return (dx, dy, dz, block) => {
    if (onAxis && dx < 0) return;
    world.set(x + dx, y + dy, z + face * dz, block);
  };
}

/** 四格收角的方形轮廓：超出曼哈顿半径的角被切掉，得到「圆角方」。 */
function roundedSquare(dx, dz, r) {
  if (Math.abs(dx) > r || Math.abs(dz) > r) return false;
  return Math.abs(dx) + Math.abs(dz) <= r + Math.max(1, r - 1);
}

/**
 * 合院院墙：南北长墙沿 x 展开、东西墙只写东侧（西墙与西角门由镜像生成）。
 * 南墙中轴留山门洞，东墙近南端留角门，两处洞口都加木色门楣。
 */
export function buildEnclosure(world, { minX, maxX, minZ, maxZ, y0 = 2, height = 7, gateHalf = 22 }) {
  // minX 不参与计算：西侧一切体量都来自 x = 0 镜像，前提是 minX === -maxX。
  const t = 2;
  const skin = { y0, h: height, block: P.wallRed, cap: 2, capBlock: P.tileB, capEdge: P.tileA };
  wall(world, { x0: 0, z0: minZ, w: maxX + 1, d: t, ...skin });
  wall(world, { x0: 0, z0: maxZ - t + 1, w: maxX + 1, d: t, ...skin });
  wall(world, { x0: maxX - t + 1, z0: minZ + t, w: t, d: maxZ - minZ - 2 * t + 1, ...skin });

  // 山门洞。镜像下居中的洞口只能是奇数格，这里取 2 * gateHalf + 1 格宽。
  const half = gateHalf + 1;
  world.clearBox(0, y0, maxZ - t + 1, half, height - 1, t);
  world.box(0, y0 + height - 1, maxZ - t + 1, half, 1, t, P.beamWood);

  // 角门（宽 3、高 4）：开在东墙近南端，镜像自动得到西墙那一座。
  const gz = maxZ - 15;
  world.clearBox(maxX - t + 1, y0, gz, t, 4, 3);
  world.box(maxX - t + 1, y0 + 4, gz, t, 1, 3, P.beamWood);
}

/** 石狮：3×3×2 石座、蹲坐身躯、两条前腿、偏大的 3×3×3 头、一圈鬃毛与上翘的尾。总高 7。 */
export function buildLion(world, { x, y = 2, z, dir = 1 }) {
  const face = dir >= 0 ? 1 : -1;
  const put = localWriter(world, x, y, z, 2, face);

  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      put(dx, 0, dz, P.stoneBase);
      put(dx, 1, dz, P.stoneLight);
    }
  }

  // 蹲坐的身躯：前深两格，最前一排只留两条前腿，腿间透空。
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 0; dz++) {
      put(dx, 2, dz, P.lion);
      put(dx, 3, dz, P.lion);
    }
  }
  for (const dx of [-1, 1]) {
    put(dx, 2, 1, P.lion);
    put(dx, 3, 1, P.lion);
  }

  // 头 3×3×3，向前探出，占满身高的一半以上，狮子的辨识度主要来自这里。
  for (let dy = 4; dy <= 6; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = 0; dz <= 2; dz++) put(dx, dy, dz, P.lion);
    }
  }
  // 鬃毛只包两侧与脑后，正面留出脸，否则五官读不出来。
  for (const dy of [4, 5]) {
    for (const dx of [-2, 2]) for (let dz = 0; dz <= 2; dz++) put(dx, dy, dz, P.stoneDark);
    for (let dx = -1; dx <= 1; dx++) put(dx, dy, -1, P.stoneDark);
  }
  for (const dx of [-1, 1]) {
    put(dx, 5, 2, P.stoneDark); // 眼
    put(dx, 6, 0, P.stoneDark); // 耳
  }
  put(0, 4, 2, P.stoneDark); // 鼻

  for (let dy = 2; dy <= 5; dy++) put(0, dy, -2, P.lion);
  put(0, 5, -2, P.stoneDark); // 尾尖上翘
}

/** 铜鼎香炉：三足（前二足成对、后一足居中）、圆角方腹、双耳、盖与宝顶。总高 8。 */
export function buildIncenseBurner(world, { x, y = 2, z }) {
  const put = localWriter(world, x, y, z, 2);

  // 三足：前二足成对，后一足在轴上。前二足写成 [-1, 1]，
  // 中轴摆放时左足由镜像补齐，偏轴摆放时左足自己写出来。
  for (let dy = 0; dy <= 1; dy++) {
    for (const dx of [-1, 1]) put(dx, dy, 1, P.bronze);
    put(0, dy, -1, P.bronze);
  }

  // 方腹 5×5、四角收掉一格，中腰一圈弦纹。
  for (let dy = 2; dy <= 4; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (!roundedSquare(dx, dz, 2)) continue;
        const band = dy === 3 && (Math.abs(dx) === 2 || Math.abs(dz) === 2);
        put(dx, dy, dz, band ? P.goldDark : P.bronze);
      }
    }
  }

  // 盖：与腹同大的圆角方盖，再收两级。
  for (let dx = -2; dx <= 2; dx++) {
    for (let dz = -2; dz <= 2; dz++) {
      if (!roundedSquare(dx, dz, 2)) continue;
      put(dx, 5, dz, P.goldDark);
    }
  }
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) put(dx, 6, dz, P.gold);
  }
  put(0, 7, 0, P.gold);

  // 双耳：立耳贴腹壁，成对写出（中轴上时左耳由镜像补齐）。
  for (const dx of [-2, 2]) {
    for (let dy = 4; dy <= 6; dy++) put(dx, dy, 0, P.gold);
  }
}

/** 松树：略歪的树干通到树尖，树冠是 3~4 层逐层缩小的收角伞，顶层收成尖。 */
export function buildPine(world, { x, y = 2, z, h = 12, seed = 1 }) {
  const rnd = seeded(seed);
  const put = localWriter(world, x, y, z, 6);
  const apex = y + h - 1;
  // 树干只朝 +x 歪：中轴附近摆树时不会把格子写到 x < 0，镜像后两棵仍各自向外倾。
  const lean = Math.round(rnd() * Math.min(2, Math.max(1, Math.floor(h * 0.15))));
  const leanAt = (i) => Math.round((lean * i) / Math.max(1, h - 1));

  // 树干一路通到树尖，保证每一层树冠都连到地面。
  for (let i = 0; i < h; i++) put(leanAt(i), i, 0, P.pineTrunk);
  // 根部外扩一圈，坐地更稳。
  for (const [dx, dz] of [[1, 0], [0, 1], [1, 1]]) put(dx, 0, dz, P.pineTrunk);
  put(leanAt(h - 1), h - 1, 0, P.pineNeedle);

  const tiers = h >= 11 ? 4 : 3;
  const step = 2;
  const tierTop = apex - 1;
  // 半径自下而上逐层收一格，只让最下一层按种子随机再加宽一格：
  // 抖动只影响坡度，不会让上层比下层宽。
  const radii = new Array(tiers);
  for (let k = 0; k < tiers; k++) {
    radii[k] = 1 + k + (k === tiers - 1 && rnd() < 0.5 ? 1 : 0);
  }
  for (let k = tiers - 1; k >= 0; k--) {
    const yt = tierTop - k * step;
    const cx = leanAt(yt - y);
    // 每层两皮：下皮宽、上皮收一格，伞面向外张开。
    for (let layer = 0; layer < 2; layer++) {
      const rr = Math.max(0, radii[k] - layer);
      const block = (k + layer) % 2 === 0 ? P.pineNeedle : P.pineNeedleDark;
      for (let dx = -rr; dx <= rr; dx++) {
        for (let dz = -rr; dz <= rr; dz++) {
          if (!roundedSquare(dx, dz, rr)) continue;
          put(cx + dx, yt - y - 1 + layer, dz, block);
        }
      }
    }
  }
}

/** 阔叶树：树干托起体素球状树冠，边缘按位置哈希做出不规则感。 */
export function buildBroadLeaf(world, { x, y = 2, z, h = 9, seed = 2 }) {
  const rnd = seeded(seed);
  const put = localWriter(world, x, y, z, 6);
  const r = h >= 10 ? 4 : 3 + (rnd() < 0.5 ? 1 : 0);
  const top = y + h - 1;
  const cy = top - r;

  for (let i = 0; i <= cy - y; i++) put(0, i, 0, P.pineTrunk);
  for (const [dx, dz] of [[1, 0], [0, 1], [1, 1]]) put(dx, 0, dz, P.pineTrunk);

  for (let dy = -r; dy <= r; dy++) {
    // 半径抖动只随高度变化：每一层都是实心圆盘，外侧不会被噪声抠出孤岛。
    const bump = r + 0.55 * (hash3(0, dy, 0, seed) * 2 - 1);
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (dx * dx + dy * dy + dz * dz > bump * bump) continue;
        put(dx, cy - y + dy, dz, (dx + dy + dz) % 2 === 0 ? P.grassDark : P.pineNeedle);
      }
    }
  }
}

/** 石灯：石座 + 灯柱 + 四角透空的灯室（内置发光灯芯）+ 瓦色顶盖。总高 6。 */
export function buildStoneLamp(world, { x, y = 2, z }) {
  const put = localWriter(world, x, y, z, 2);

  // 石座
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) put(dx, 0, dz, P.stoneDark);
  }
  // 灯柱
  put(0, 1, 0, P.stoneLight);
  put(0, 2, 0, P.stoneLight);
  // 四角柱撑起灯室，四面透空，灯芯自发光。
  for (const dx of [-1, 1]) {
    for (const dz of [-1, 1]) {
      put(dx, 3, dz, P.stoneLight);
      put(dx, 4, dz, P.stoneLight);
    }
  }
  put(0, 3, 0, P.lantern);
  put(0, 4, 0, P.lantern);
  // 顶盖：出檐一格的瓦顶，上皮收成瓦脊。
  for (let dx = -2; dx <= 2; dx++) {
    for (let dz = -2; dz <= 2; dz++) {
      if (!roundedSquare(dx, dz, 2)) continue;
      put(dx, 5, dz, P.tileA);
    }
  }
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) put(dx, 5, dz, P.tileB);
  }
}

/** 幡杆：石座 + 木杆 + 金宝顶，横挑出木臂挂一面 4 宽 8 高的布幡。总高 h。 */
export function buildBanner(world, { x, y = 2, z, h = 14 }) {
  const put = localWriter(world, x, y, z, 3);
  const top = h - 1;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) put(dx, 0, dz, P.stoneBase);
  }

  for (let dy = 1; dy <= top - 3; dy++) put(0, dy, 0, P.beamWood);
  put(0, top - 2, 0, P.goldDark);
  put(0, top - 1, 0, P.gold);
  put(0, top, 0, P.gold);

  // 布幡挂在横臂下、杆前 1 格，1 格厚 4 宽 8 高。
  const clothTop = top - 4;
  for (let dx = 0; dx <= 3; dx++) put(dx, clothTop + 1, 1, P.beamWood);
  for (let dy = 0; dy < 8; dy++) {
    for (let dx = 0; dx <= 3; dx++) {
      const edge = dy === 0 || dy === 7 || dx === 3;
      put(dx, clothTop - dy, 1, edge ? P.goldDark : P.wallRed);
    }
  }
  put(1, clothTop - 3, 1, P.goldDark);
  put(2, clothTop - 4, 1, P.goldDark);
}

/** 照壁：须弥座 + 白壁身与红边框 + 中央 imperial 方心 + 瓦压顶。沿 x 走向，总高 h。 */
export function buildScreenWall(world, { x0, z0, w, y = 2, h = 8 }) {
  world.box(x0 - 1, y, z0 - 1, w + 2, 1, 3, P.stoneShade);
  world.box(x0, y + 1, z0, w, 1, 1, P.wallRed);
  world.box(x0, y + h - 2, z0, w, 1, 1, P.wallRed);
  world.box(x0, y + 2, z0, w, h - 4, 1, P.wallWhite);
  world.box(x0, y + 2, z0, 1, h - 4, 1, P.wallRed);
  world.box(x0 + w - 1, y + 2, z0, 1, h - 4, 1, P.wallRed);

  const cw = w % 2 === 0 ? 4 : 3;
  const ch = 4;
  world.box(x0 + ((w - cw) >> 1), y + 2 + ((h - 4 - ch) >> 1), z0, cw, ch, 1, P.imperial);

  world.box(x0 - 1, y + h - 1, z0 - 1, w + 2, 1, 3, P.tileA);
}

/** 石桥：桥面沿 x 展开并在中轴起拱，拱下掏空成券洞，两侧望柱栏板随桥面分段抬升。 */
export function buildStoneBridge(world, { x0, z0, w, d, y = 2, rise = 3 }) {
  const span = Math.max(1, w - 1);
  // 余弦拱：中轴最平最高，两端最陡并落回 y，桥台因此自然做成斜坡。
  const liftAt = (i) => Math.round(rise * Math.cos((Math.PI / 2) * (i / span)));

  for (let i = 0; i < w; i++) {
    const lift = liftAt(i);
    const top = y + lift;
    for (let dz = 0; dz < d; dz++) world.set(x0 + i, top, z0 + dz, P.pathStone);
    if (lift <= 1) {
      // 起拱不足两格处填实成桥台；两端桥面最低也落在 y（铺装上方第一层），与岸平接。
      for (let yy = y; yy < top; yy++) {
        for (let dz = 0; dz < d; dz++) world.set(x0 + i, yy, z0 + dz, P.stoneShade);
      }
    } else {
      for (let dz = 0; dz < d; dz++) world.set(x0 + i, top - 1, z0 + dz, P.stoneLight);
    }
  }

  for (const zEdge of [z0, z0 + d - 1]) {
    let i = 0;
    while (i < w) {
      const lift = liftAt(i);
      let j = i;
      while (j < w && liftAt(j) === lift) j++;
      balustrade(world, {
        x0: x0 + i,
        z: zEdge,
        y0: y + lift + 1,
        length: j - i,
        axis: "x",
        block: P.stoneLight,
        post: P.stoneBase,
        step: 4,
        h: 3,
      });
      i = j;
    }
  }
}

/** 井：方形石井圈（内空 3×3）+ 两侧木柱 + 横梁 + 辘轳，井绳吊桶垂入井口。总高 6。 */
export function buildWell(world, { x, y = 2, z }) {
  const put = localWriter(world, x, y, z, 2);

  for (let dy = 0; dy <= 1; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.abs(dx) !== 2 && Math.abs(dz) !== 2) continue;
        put(dx, dy, dz, dy === 1 ? P.stoneLight : P.stoneShade);
      }
    }
  }

  for (const dx of [-2, 2]) {
    for (let dy = 2; dy <= 4; dy++) put(dx, dy, 0, P.beamWood);
  }
  for (let dx = -2; dx <= 2; dx++) {
    put(dx, 5, 0, P.beamWood);
    put(dx, 4, 0, P.rafterWood);
  }
  put(2, 4, 1, P.rafterWood);
  put(2, 3, 1, P.rafterWood);

  put(0, 3, 0, P.dgLight);
  put(0, 2, 0, P.dgLight);
  put(0, 1, 0, P.beamWood);
}

/** 假山：按列生成高度场，越靠外越矮，底部自然比顶部宽，且每列都落到地面。 */
export function buildRockery(world, { x, y = 2, z, seed = 3 }) {
  const rnd = seeded(seed);
  const put = localWriter(world, x, y, z, 4);
  const r0 = 3;
  const maxH = 4 + Math.floor(rnd() * 3);
  const bias = rnd() * Math.PI;

  for (let dx = -r0; dx <= r0; dx++) {
    for (let dz = -r0; dz <= r0; dz++) {
      const dist = Math.hypot(dx, dz);
      if (dist > r0 + 0.4) continue;
      const falloff = 1 - dist / (r0 + 0.8);
      const noise = hash3(dx, Math.round(bias * 10), dz, seed) + 0.5 * Math.cos(dx * 1.7 + bias) * falloff;
      const hh = Math.max(1, Math.min(maxH, Math.round(maxH * (0.35 + 0.65 * falloff) + noise - 0.9)));
      for (let dy = 0; dy < hh; dy++) {
        put(dx, dy, dz, hash3(dx, dy, dz, seed) < 0.55 ? P.stoneShade : P.stoneDark);
      }
    }
  }
}
