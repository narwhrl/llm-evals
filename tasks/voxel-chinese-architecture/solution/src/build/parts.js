import { P } from "../core/palette.js";

/** 台阶两侧垂带的做法：中轴建筑只做外侧一条，成对建筑两侧都做。 */
export const RAILS = { BOTH: "both", RIGHT: "right", NONE: "none" };

/** 台基：下枋外扩、束腰内收、上枋外扩，做出须弥座的收分。 */
export function plinth(world, { x0, z0, w, d, y0, h, deck = P.stoneLight, body = P.stoneBase, trim = P.stoneShade }) {
  for (let i = 0; i < h; i++) {
    const out = i === 0 || i === h - 1 ? 1 : 0;
    const inset = h >= 5 && i === (h >> 1) ? 1 : 0;
    const grow = out - inset;
    world.box(x0 - grow, y0 + i, z0 - grow, w + 2 * grow, 1, d + 2 * grow, i === 0 || inset ? trim : i === h - 1 ? deck : body);
  }
}

/**
 * 踏跺。z0 是台明外沿所在坐标，inward 是由台阶指向台明的方向（+1 或 -1）。
 * 第 0 级最低最外，最后一级紧贴台明。
 */
export function stairs(
  world,
  { x0, z0, w, y0, h, run = 2, inward = -1, rails = RAILS.RIGHT, ramp = 0, tread = P.stoneLight, side = P.stoneShade, rampBlock = P.imperial },
) {
  for (let i = 0; i < h; i++) {
    const z = inward < 0 ? z0 + (h - 1 - i) * run + 1 : z0 - (h - i) * run;
    world.box(x0, y0, z, w, i + 1, run, tread);
    if (ramp > 0) {
      const rx = x0 + ((w - ramp) >> 1);
      world.box(rx, y0, z, ramp, i + 1, run, rampBlock);
    }
    if (rails !== RAILS.NONE) {
      world.box(x0 + w, y0, z, 1, i + 2, run, side);
      world.box(x0 + w, y0, z, 2, 1, run, side);
    }
    if (rails === RAILS.BOTH) world.box(x0 - 1, y0, z, 1, i + 2, run, side);
  }
  if (rails !== RAILS.NONE) {
    const zBottom = inward < 0 ? z0 + h * run - 1 : z0 - h * run;
    world.box(x0 + w, y0, zBottom, 2, 2, 1, side);
    if (rails === RAILS.BOTH) world.box(x0 - 2, y0, zBottom, 2, 2, 1, side);
  }
}

/** 单根立柱：柱础 + 柱身 + 柱头。 */
export function column(world, { x, z, y0, h, block = P.columnRed, base = P.stoneDark, cap = P.beamWood }) {
  world.box(x, y0, z, 1, 1, 1, base);
  world.box(x, y0 + 1, z, 1, Math.max(1, h - 2), 1, block);
  world.box(x, y0 + h - 1, z, 1, 1, 1, cap);
}

/** 沿 z 方向的柱列。 */
export function columnLine(world, { x, z0, count, spacing, y0, h, block, base, cap }) {
  for (let i = 0; i < count; i++) column(world, { x, z: z0 + i * spacing, y0, h, block, base, cap });
}

/** 一字墙，可选瓦顶压顶。 */
export function wall(world, { x0, y0, z0, w, h, d, block = P.wallRed, cap = 0, capBlock = P.tileB, capEdge = P.tileA }) {
  world.box(x0, y0, z0, w, h, d, block);
  if (cap > 0) {
    world.box(x0 - 1, y0 + h, z0 - 1, w + 2, cap, d + 2, capEdge);
    if (cap > 1) world.box(x0, y0 + h + 1, z0, w, cap - 1, d, capBlock);
  }
}

/**
 * 隔扇门 / 槛窗：z0 是背面衬板层，z0+1 是菱花格心层。
 * 格心用「实格 + 凹格」交替，既能读出菱花图案，又不会透光见空。
 */
export function latticeBay(world, { x0, y0, z0, w, h, backing = P.doorWood, frame = P.latticeWood, cell = 2, sill = 0 }) {
  world.box(x0, y0, z0, w, h, 1, backing);
  const inner = { x0: x0 + 1, y0: y0 + 1 + sill, w: w - 2, h: h - 2 - sill };
  world.box(x0, y0, z0 + 1, 1, h, 1, frame);
  world.box(x0 + w - 1, y0, z0 + 1, 1, h, 1, frame);
  world.box(x0, y0, z0 + 1, w, 1, 1, frame);
  world.box(x0, y0 + h - 1, z0 + 1, w, 1, 1, frame);
  if (inner.w > 0 && inner.h > 0) {
    for (let x = inner.x0; x < inner.x0 + inner.w; x++) {
      const vertical = (x - inner.x0) % cell === 0;
      for (let y = inner.y0; y < inner.y0 + inner.h; y++) {
        const horizontal = (y - inner.y0) % cell === 0;
        if (vertical || horizontal) world.set(x, y, z0 + 1, frame);
      }
    }
  }
  if (sill > 0) world.box(x0, y0, z0 + 1, w, sill, 1, P.wallRed);
}

/**
 * 斗拱圈（铺作）。坐斗 + 拱 + 昂 + 散斗，逐间一朵，
 * 沿 x 的间距锚定在中轴、沿 z 的间距锚定在建筑中点，保证左右两半严格对称。
 */
export function dougongRing(
  world,
  { x0, z0, w, d, y0, step = 4, out = 1, block = P.dgLight, arm = P.paintingGreen, gold = P.dgGold, anchorX = 0 },
) {
  const cz = z0 + (d - 1) / 2;
  const xEnd = x0 + w - 1;
  const zEnd = z0 + d - 1;

  const unit = (x, z, dx, dz) => {
    world.box(x, y0, z, 1, 1, 1, block);
    if (dx !== 0) {
      world.box(x, y0 + 1, z - 1, 1, 1, 3, arm);
      world.box(x + dx * out, y0 + 1, z, 1, 1, 1, gold);
      world.box(x + dx * out, y0 + 2, z, 1, 1, 1, block);
    } else {
      world.box(x - 1, y0 + 1, z, 3, 1, 1, arm);
      world.box(x, y0 + 1, z + dz * out, 1, 1, 1, gold);
      world.box(x, y0 + 2, z + dz * out, 1, 1, 1, block);
    }
  };
  const corner = (x, z, dx, dz) => {
    world.box(x, y0, z, 1, 1, 1, block);
    world.box(x, y0 + 1, z - 1, 1, 1, 3, arm);
    world.box(x - 1, y0 + 1, z, 3, 1, 1, arm);
    world.box(x + dx, y0 + 1, z, 1, 1, 1, gold);
    world.box(x, y0 + 1, z + dz, 1, 1, 1, gold);
    world.box(x + dx, y0 + 2, z + dz, 1, 1, 1, block);
  };

  // 沿 z 的间距锚定在建筑中点，向两侧对称展开；沿 x 的间距锚定在 anchorX（中轴建筑取 0）。
  for (let z = Math.ceil(cz); z <= zEnd; z += step) {
    unit(xEnd, z, 1, 0);
    unit(x0, z, -1, 0);
  }
  for (let z = Math.floor(cz); z >= z0; z -= step) {
    unit(xEnd, z, 1, 0);
    unit(x0, z, -1, 0);
  }
  for (let x = anchorX; x <= xEnd; x += step) {
    if (x < x0) continue;
    unit(x, zEnd, 0, 1);
    unit(x, z0, 0, -1);
  }
  for (let x = anchorX - step; x >= x0; x -= step) {
    unit(x, zEnd, 0, 1);
    unit(x, z0, 0, -1);
  }
  corner(xEnd, zEnd, out, out);
  corner(xEnd, z0, out, -out);
  corner(x0, zEnd, -out, out);
  corner(x0, z0, -out, -out);
}

/** 额枋：檐柱之间的横向联系构件，带彩画点缀。 */
export function architrave(world, { x0, z0, w, d, y0, h = 1, block = P.paintingGreen, accent = P.dgGold, modal = 4 }) {
  const band = (bx, bz, bw, bd) => {
    world.box(bx, y0, bz, bw, h, bd, block);
    for (let i = 0; i < bw; i++) if (i % modal === 0) world.box(bx + i, y0 + h - 1, bz, 1, 1, bd, accent);
  };
  band(x0, z0, w, 1);
  band(x0, z0 + d - 1, w, 1);
  band(x0, z0 + 1, 1, d - 2);
  band(x0 + w - 1, z0 + 1, 1, d - 2);
}

/** 勾栏：望柱 + 栏板。axis 为走向，"x" 表示沿 x 展开。 */
export function balustrade(world, { x0, z, y0, length, axis = "x", block = P.stoneLight, post = P.stoneBase, step = 4, h = 3 }) {
  for (let i = 0; i < length; i++) {
    const x = axis === "x" ? x0 + i : x0;
    const zz = axis === "x" ? z : z + i;
    world.box(x, y0, zz, 1, h - 1, 1, block);
    if (i % step === 0) world.box(x, y0, zz, 1, h, 1, post);
  }
}

/** 匾额：金框深色板，中间三簇金饰示意题字。 */
/**
 * 匾文点阵：两行高的小字，保证匾额不会是一块空板。
 * 每行自上而下对应匾额从高到低，'#' 为笔画。
 */
const GLYPH_SMALL = [
  ["###", "#.#"],
  ["#.#", "###"],
];
/** 内高够 5 格时用三行写法，笔画更像字。 */
const GLYPH_TALL = [
  ["###", ".#.", "###"],
  ["#.#", ".#.", ".#."],
];

export function plaque(world, { x0, y0, z0, w, h, board = P.plaqueBoard, frame = P.gold, glyph = P.gold }) {
  world.box(x0, y0, z0, w, h, 1, frame);
  world.box(x0 + 1, y0 + 1, z0, w - 2, h - 2, 1, board);
  if (w < 10 || h < 4) return;
  const tall = h >= 7;
  const shapes = tall ? GLYPH_TALL : GLYPH_SMALL;
  const rows = shapes[0].length;
  const gy = y0 + Math.max(1, Math.floor((h - rows) / 2));
  for (let i = 0; i < shapes.length; i++) {
    const gx = i === 0 ? x0 + 2 : x0 + w - 5;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < shapes[i][r].length; c++) {
        if (shapes[i][r][c] === "#") world.set(gx + c, gy + (rows - 1 - r), z0, glyph);
      }
    }
  }
}

/** 灯笼：木杆 + 灯身 + 灯穗，灯身自发光。给 yTop 时自动把吊杆接到指定高度，避免悬空。 */
export function lantern(world, { x, y, z, size = 2, cord = 2, yTop, body = P.lantern, core = P.lanternPale, cap = P.goldDark }) {
  const cordLen = yTop === undefined ? cord : Math.max(1, yTop - (y + size));
  world.box(x, y + size, z, 1, 1, 1, cap);
  world.box(x, y + size + 1, z, 1, cordLen, 1, P.beamWood);
  world.box(x, y, z, size, size, size, body);
  const half = size >> 1;
  world.box(x + half, y, z + half, 1, 1, 1, core);
  world.box(x, y - 2, z, 1, 2, 1, P.gold);
}

/** 单扇板门（大门用）：整块门扇 + 门钉。 */
export function plankDoor(world, { x0, y0, z0, w, h, block = P.doorWood, stud = P.goldDark }) {
  world.box(x0, y0, z0, w, h, 1, block);
  for (let y = y0 + 2; y < y0 + h - 1; y += 3) {
    for (let x = x0 + 1; x < x0 + w - 1; x += 2) world.set(x, y, z0, stud);
  }
}
