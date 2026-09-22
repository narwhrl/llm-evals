import { P } from "../core/palette.js";

/** 稳定的坐标散列，用来铺草地斑块：结果与构建顺序无关，每次构建一致。 */
function coordHash(x, z) {
  let h = (x * 73856093) ^ (z * 19349663);
  h = (h ^ (h >>> 13)) * 1274126177;
  return (h ^ (h >>> 16)) >>> 0;
}

/**
 * 地面：yBase 是垫层，yBase + 1 是露出层。
 * 露出层刻意按「同色成片」铺——方砖用 8 格模数、草斑用 4 格模数，
 * 这样贪心合并能把大片地面压成少数几个盒子，而不是逐格一个实例。
 */
export function buildGround(world, opts = {}) {
  const {
    minX,
    maxX,
    minZ,
    maxZ,
    yBase = 0,
    base = P.stoneShade,
    pavingA = P.pavingA,
    pavingB = P.pavingB,
    path = P.pathStone,
    curb = P.curb,
    grass = P.grass,
    grassAlt = P.grassDark,
    courts = [],
    roads = [],
    lawns = [],
    lawnSeed = 0,
  } = opts;

  const w = maxX - minX + 1;
  const d = maxZ - minZ + 1;
  const y = yBase + 1;

  world.plate(yBase, minX, minZ, w, d, base);

  const stampLawn = (x0, z0, lw, ld) => {
    for (let z = z0; z < z0 + ld; z++) {
      for (let x = x0; x < x0 + lw; x++) {
        const blotch = coordHash(x >> 2, (z + lawnSeed) >> 2) % 5 === 0;
        world.set(x, y, z, blotch ? grassAlt : grass);
      }
    }
  };

  stampLawn(minX, minZ, w, d);
  for (const lawn of lawns) stampLawn(lawn.x0, lawn.z0, lawn.w, lawn.d);

  for (const court of courts) {
    for (let z = court.z0; z < court.z0 + court.d; z++) {
      for (let x = court.x0; x < court.x0 + court.w; x++) {
        const a = (((x + 4096) >> 3) + ((z + 4096) >> 3)) % 2 === 0;
        world.set(x, y, z, a ? pavingA : pavingB);
      }
    }
  }

  for (const road of roads) {
    if (road.curb !== false) {
      world.plate(y, road.x0 - 1, road.z0 - 1, road.w + 2, road.d + 2, curb);
    }
    world.plate(y, road.x0, road.z0, road.w, road.d, road.block ?? path);
  }
}
