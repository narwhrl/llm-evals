import { P } from "../core/palette.js";

/**
 * 屋面形制：
 * - wudian   庑殿顶：四面坡，正脊最短，等级最高
 * - xieshan  歇山顶：下部四面坡（撒头）+ 上部两坡，两端留山花与博风板
 * - cuanjian 攒尖顶：四面坡收于一点，顶置宝顶
 * - yingshan 硬山顶：两坡，两端山墙垂直不出檐
 */
export const ROOF_TYPES = ["wudian", "xieshan", "cuanjian", "yingshan"];

/**
 * 造屋顶。x0/z0/w/d 是檐口最外沿所在的体素范围，y0 是檐口层。
 * 逐层内收成坡，上段内收加倍（举折），使屋面呈中国式的凹曲线；
 * 檐口四角沿两条边逐格外伸并抬升，做出飞檐翘角。
 * 每层整片填实：露明的一圈是瓦垄，内芯被上一层盖住，最终由贪心合并压成少量盒子。
 */
export function buildRoof(world, opts = {}) {
  const {
    x0,
    z0,
    w,
    d,
    y0,
    type = "wudian",
    tileA = P.tileA,
    tileB = P.tileB,
    ridgeBlock = P.glazedRidge,
    eaveBlock = P.tileC,
    gableBlock = P.wallWhite,
    boardBlock = P.beamWood,
    rafter = P.rafterWood,
    upturn = 3,
    finial = type === "cuanjian",
    finialBlock = P.gold,
  } = opts;
  if (w <= 0 || d <= 0) return;
  if (!ROOF_TYPES.includes(type)) throw new Error(`未知屋顶形制：${type}`);

  const zCap = Math.max(0, Math.floor((d - 1) / 2));
  const ridgeLen = opts.ridgeLen ?? Math.max(3, Math.round(w * 0.22));
  const xCap = type === "cuanjian" ? Math.floor((w - 1) / 2) : Math.max(0, Math.floor((w - ridgeLen) / 2));
  const flatX = type === "yingshan";
  // 默认按进深推出层数（约 45° 坡 + 举折）；层檐等需要矮檐的场合可显式给 height。
  const height = Math.max(2, Math.round(opts.height ?? ((d - 1) / 2) * 0.85));
  const hipLevels = type === "xieshan" ? Math.max(1, Math.round(height * 0.42)) : 0;

  const planAt = (level) => {
    let ix = 0;
    let iz = 0;
    for (let l = 1; l <= level; l++) {
      const step = l - 1 < height * 0.62 ? 1 : 2;
      const lockedForGable = type === "xieshan" && l > hipLevels;
      if (!flatX && !lockedForGable) ix = Math.min(ix + step, xCap);
      iz = Math.min(iz + step, zCap);
    }
    return { ix, iz };
  };

  let crestPlan = null;
  for (let level = 0; level < height; level++) {
    const y = y0 + level;
    const { ix, iz } = planAt(level);
    const next = level + 1 < height ? planAt(level + 1) : null;
    const px = x0 + ix;
    const pz = z0 + iz;
    const pw = w - 2 * ix;
    const pd = d - 2 * iz;
    if (pw <= 0 || pd <= 0) break;
    const tx = next ? Math.max(0, next.ix - ix) : 0;
    const tz = next ? Math.max(0, next.iz - iz) : 0;
    const gablePhase = type === "xieshan" && level > hipLevels;
    const crest = !next || (tx === 0 && tz === 0);
    crestPlan = { x: px, y, z: pz, w: pw, d: pd };

    for (let z = pz; z < pz + pd; z++) {
      const outerZ = crest || z < pz + tz || z >= pz + pd - tz;
      for (let x = px; x < px + pw; x++) {
        const outerX = crest || x < px + tx || x >= px + pw - tx;
        let block;
        if (crest) block = ridgeBlock;
        else if (outerZ) block = (x & 1) === 0 ? tileA : tileB;
        else if (outerX) block = (z & 1) === 0 ? tileA : tileB;
        else block = tileB;
        world.set(x, y, z, block);
      }
    }

    if (crest) break;

    if (level === 0) {
      for (let x = px; x < px + pw; x++) {
        world.set(x, y, pz, eaveBlock);
        world.set(x, y, pz + pd - 1, eaveBlock);
      }
      for (let z = pz; z < pz + pd; z++) {
        world.set(px, y, z, eaveBlock);
        world.set(px + pw - 1, y, z, eaveBlock);
      }
    }

    // 四角垂脊：每一层平面角部的对角线即为戗脊走向
    if (type !== "yingshan" && !gablePhase) {
      const t = Math.max(tx, tz, 1);
      for (let k = 0; k < t; k++) {
        for (const cx of [px + k, px + pw - 1 - k]) {
          for (const cz of [pz + k, pz + pd - 1 - k]) {
            if (cx >= px && cx < px + pw && cz >= pz && cz < pz + pd) world.set(cx, y, cz, ridgeBlock);
          }
        }
      }
    }

    // 歇山上段：两端转为垂直山花，外侧挑出博风板
    if (gablePhase) {
      for (let z = pz; z < pz + pd; z++) {
        world.set(px, y, z, gableBlock);
        world.set(px + pw - 1, y, z, gableBlock);
        world.set(px - 1, y, z, boardBlock);
        world.set(px + pw, y, z, boardBlock);
      }
    }
  }

  // 檐椽：檐口正下方一圈木色，形成檐下阴影带
  for (let x = x0; x < x0 + w; x++) {
    world.set(x, y0 - 1, z0, rafter);
    world.set(x, y0 - 1, z0 + d - 1, rafter);
  }
  for (let z = z0 + 1; z < z0 + d - 1; z++) {
    world.set(x0, y0 - 1, z, rafter);
    world.set(x0 + w - 1, y0 - 1, z, rafter);
  }

  if (type !== "yingshan" && upturn > 0) {
    upturnedCorners(world, { x0, z0, w, d, y0, upturn, ridgeBlock, rafter });
  }

  if (finial) {
    const fx = crestPlan ? crestPlan.x + ((crestPlan.w - 1) >> 1) : x0 + ((w - 1) >> 1);
    const fz = crestPlan ? crestPlan.z + ((crestPlan.d - 1) >> 1) : z0 + ((d - 1) >> 1);
    buildFinial(world, { x: fx, y: crestPlan ? crestPlan.y + 1 : y0 + height, z: fz, block: finialBlock, band: ridgeBlock });
  } else {
    ridgeOrnaments(world, { plan: crestPlan, ridgeBlock, boardBlock });
  }
}

/** 飞檐翘角：檐口线朝角部逐格抬起，角部再用三角出挑做出翘起的翼角，末端加戗兽。 */
function upturnedCorners(world, { x0, z0, w, d, y0, upturn, ridgeBlock, rafter }) {
  const xEnd = x0 + w - 1;
  const zEnd = z0 + d - 1;
  const tipOut = upturn;
  const tipUp = Math.max(1, Math.round(upturn * 0.75));
  const span = upturn * 2;

  const corner = (cx, cz, ox, oz) => {
    // 檐口线：越靠近角部抬得越高
    for (let k = 1; k < span; k++) {
      const lift = Math.round(tipUp * (1 - k / (span - 1)) ** 1.4);
      if (lift <= 0) continue;
      world.box(cx - ox * k, y0, cz, 1, 1 + lift, 1, ridgeBlock);
      world.box(cx, y0, cz - oz * k, 1, 1 + lift, 1, ridgeBlock);
    }
    // 翼角出挑：实心三角，越朝外越高，形成上翘的角
    for (let i = 0; i <= tipOut; i++) {
      for (let j = 0; j <= tipOut; j++) {
        if (i === 0 && j === 0) continue;
        if (i + j > tipOut + 1) continue;
        const h = Math.round(tipUp * ((i + j) / (tipOut + 1)));
        const x = cx + ox * i;
        const z = cz + oz * j;
        world.set(x, y0, z, rafter);
        if (h > 0) world.box(x, y0 + 1, z, 1, h, 1, ridgeBlock);
        if (i + j === tipOut + 1) world.set(x, y0 + h + 1, z, P.goldDark);
      }
    }
  };

  corner(xEnd, z0, 1, -1);
  corner(xEnd, zEnd, 1, 1);
  corner(x0, z0, -1, -1);
  corner(x0, zEnd, -1, 1);
}

/** 正脊与两端鸱吻。 */
function ridgeOrnaments(world, { plan, ridgeBlock, boardBlock }) {
  if (!plan) return;
  const { x, y, z, w, d } = plan;
  const midZ = z + ((d - 1) >> 1);
  for (let i = 0; i < w; i++) world.set(x + i, y + 1, midZ, ridgeBlock);
  for (let i = 0; i < w; i += 4) world.set(x + i, y + 1, midZ, boardBlock);
  for (const ex of [x, x + w - 1]) {
    const dir = ex === x ? -1 : 1;
    world.set(ex, y + 2, midZ, ridgeBlock);
    world.set(ex + dir, y + 2, midZ, ridgeBlock);
    world.set(ex, y + 3, midZ, boardBlock);
    world.set(ex + dir, y + 3, midZ, boardBlock);
    world.set(ex, y + 4, midZ, P.gold);
  }
}

/** 宝顶：攒尖顶与塔刹通用的收头。 */
export function buildFinial(world, { x, y, z, block = P.gold, band = P.glazedRidge, rings = 3 }) {
  world.box(x - 1, y, z - 1, 3, 1, 3, band);
  world.box(x, y + 1, z, 1, 1, 1, block);
  for (let i = 0; i < rings; i++) {
    const grow = i === 0 ? 1 : 0;
    world.box(x - grow, y + 2 + i, z - grow, 1 + 2 * grow, 1, 1 + 2 * grow, i % 2 === 0 ? block : band);
  }
  world.box(x, y + 2 + rings, z, 1, 2, 1, block);
}
