// 运输船地图数据。坐标约定见 docs/MAP_REFERENCE.md：
// +X 为蓝方（保卫者，东端船舱），-X 为红方（潜伏者，西端船舱），+Z 为北舷，甲板面 y = 0。
// 所有尺寸为按人物高度、门框和标准 20 英尺集装箱比例推算的估计值，非官方数据。
// 除甲板、舷墙等全局构件外，一侧的构件经 180° 点对称生成另一侧，保持原图两端对位关系。

import type { BoxSpec, Mat } from "../core/world";

export const DECK = { halfLength: 50, halfWidth: 12.5, playX: 49, playZ: 12 };
export const PLATFORM_Y = 1.2;
export const CONTAINER = { l: 6.06, w: 2.44, h: 2.6 };
export const CRATE = { big: 1.8, small: 0.9 };

type Opts = Partial<Pick<BoxSpec, "move" | "bullet" | "sight" | "stand" | "look" | "ref" | "yaw">>;

function aabb(
  id: string, kind: string, mat: Mat,
  x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, o: Opts = {},
): BoxSpec {
  return {
    id, kind, mat,
    c: [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2],
    h: [(x1 - x0) / 2, (y1 - y0) / 2, (z1 - z0) / 2],
    ...o,
  };
}

function crate(id: string, x: number, z: number, size: "big" | "small", y0 = 0, yaw = 0): BoxSpec {
  const s = CRATE[size];
  return { id, kind: `crate-${size}`, mat: "wood", c: [x, y0 + s / 2, z], h: [s / 2, s / 2, s / 2], yaw, stand: true, look: size, ref: "R06/R07" };
}

function container(id: string, x: number, z: number, level: number, look: string): BoxSpec {
  return {
    id, kind: "container", mat: "steel",
    c: [x, CONTAINER.h * level + CONTAINER.h / 2, z],
    h: [CONTAINER.l / 2, CONTAINER.h / 2, CONTAINER.w / 2],
    stand: level === 0, look, ref: "R05/R07/R09",
  };
}

/** 红方（西端）船舱、平台、出口台阶与侧门 */
function westCabin(): BoxSpec[] {
  const s: BoxSpec[] = [];
  const Y = PLATFORM_Y, TOP = 4.4;
  const ref = "R05/R07（舱体轮廓）；内部为近似重建";
  // 平台与船舱地板为同一块抬高结构
  s.push(aabb("platform", "platform", "steel", -49.3, -35, 0, Y, -9.5, 9.5, { stand: true, ref: "R05/R09" }));
  // 平台正前方中央三级台阶
  s.push(aabb("stair-c1", "stair", "steel", -35, -34.6, 0, 0.9, -3, 3, { stand: true, ref }));
  s.push(aabb("stair-c2", "stair", "steel", -34.6, -34.2, 0, 0.6, -3, 3, { stand: true, ref }));
  s.push(aabb("stair-c3", "stair", "steel", -34.2, -33.8, 0, 0.3, -3, 3, { stand: true, ref }));
  // 后墙
  s.push(aabb("cab-back", "cabin-wall", "hull", -49.3, -49, Y, TOP, -9.5, 9.5, { look: "cabin", ref }));
  // 两侧墙，各带一扇通往舷侧通道的侧门（x∈[-46.8,-45.4]）
  for (const side of [1, -1]) {
    const n = side > 0 ? "n" : "s";
    const z0 = side > 0 ? 9.2 : -9.5, z1 = side > 0 ? 9.5 : -9.2;
    s.push(aabb(`cab-side-${n}1`, "cabin-wall", "hull", -49, -46.8, Y, TOP, z0, z1, { look: "cabin", ref }));
    s.push(aabb(`cab-side-${n}2`, "cabin-wall", "hull", -45.4, -42, Y, TOP, z0, z1, { look: "cabin", ref }));
    s.push(aabb(`cab-side-${n}-lintel`, "lintel", "hull", -46.8, -45.4, Y + 2.2, TOP, z0, z1, { look: "cabin", ref }));
    // 侧门外向舷侧通道下行的三级台阶
    const zs = [9.5, 10.1, 10.7, 11.25];
    for (let i = 0; i < 3; i++) {
      const za = side > 0 ? zs[i] : -zs[i + 1], zb = side > 0 ? zs[i + 1] : -zs[i];
      s.push(aabb(`side-stair-${n}${i}`, "stair", "steel", -46.9, -45.3, 0, 0.9 - i * 0.3, za, zb, { stand: true, ref }));
    }
    // 平台两侧栏杆：挡人，不挡子弹与视线（管材栏杆，网孔占多数）
    s.push(aabb(`plat-rail-${n}`, "rail", "rail", -42, -35, Y, Y + 1.0, side > 0 ? 9.32 : -9.44, side > 0 ? 9.44 : -9.32,
      { bullet: false, sight: false, ref }));
    // 栏杆上方的人物阻挡：平台与舷侧通道只经船舱侧门连通
    s.push(aabb(`plat-rail-clip-${n}`, "clip", "clip", -42, -35, Y + 1.0, Y + 2.6, side > 0 ? 9.32 : -9.44, side > 0 ? 9.44 : -9.32));
    // 通道尽头封板
    s.push(aabb(`lane-end-${n}`, "cabin-wall", "hull", -49.8, -49.0, 0, TOP, side > 0 ? 9.5 : -12, side > 0 ? 12 : -9.5, { look: "cabin", ref }));
  }
  // 前墙：中门 z∈[-1.2,1.2]，左右门 |z|∈[5.2,6.8]，门高 2.3 m
  const fz = [-9.5, -6.8, -5.2, -1.2, 1.2, 5.2, 6.8, 9.5];
  for (let i = 0; i < fz.length - 1; i++) {
    const open = i % 2 === 1;
    if (open) s.push(aabb(`cab-front-lintel${i}`, "lintel", "hull", -42.3, -42, Y + 2.3, TOP, fz[i], fz[i + 1], { look: "cabin", ref }));
    else s.push(aabb(`cab-front${i}`, "cabin-wall", "hull", -42.3, -42, Y, TOP, fz[i], fz[i + 1], { look: "cabin", ref }));
  }
  // 屋顶、上层驾驶室
  s.push(aabb("cab-roof", "roof", "hull", -49.4, -41.6, TOP, TOP + 0.3, -9.8, 9.8, { look: "roof", ref }));
  s.push(aabb("bridge", "bridge", "hull", -48.8, -44.2, TOP + 0.3, TOP + 3.1, -5.5, 5.5, { look: "bridge", ref: "R07（上层结构，近似）" }));
  // 舱内隔墙：挡住中门直视后排出生位
  s.push(aabb("cab-partition", "cabin-wall", "hull", -45.2, -44.9, Y, TOP, -3.2, 3.2, { look: "cabin-in", ref: "近似：限制门外直视出生位" }));
  // 储物柜与长凳
  for (const z of [-8.4, -7.6, 7.6, 8.4]) s.push(aabb(`locker${z}`, "locker", "steel", -49, -48.45, Y, Y + 1.9, z - 0.38, z + 0.38, { look: "locker" }));
  s.push(aabb("bench", "bench", "wood", -44.2, -43.7, Y, Y + 0.42, 5.8, 8.2, { stand: true, look: "bench" }));
  return s;
}

/** 北舷集装箱排（点对称生成南舷）。stack=2 为双层，不可攀登 */
const NORTH_ROW: { x: number; stack: 1 | 2; look: string }[] = [
  { x: -30.0, stack: 1, look: "blue" },
  { x: -22.34, stack: 2, look: "rust" },
  { x: -16.28, stack: 1, look: "green" },
  { x: -8.42, stack: 1, look: "red" },
  { x: -2.36, stack: 2, look: "blue" },
  { x: 5.53, stack: 1, look: "grey" },
  { x: 11.59, stack: 2, look: "green" },
  { x: 19.45, stack: 1, look: "orange" },
  { x: 25.51, stack: 1, look: "blue" },
];
const TOP_LOOKS = ["white", "blue", "rust", "grey", "green"];

function oneSide(): BoxSpec[] {
  const s: BoxSpec[] = westCabin();
  const zr = 7 + CONTAINER.w / 2;
  NORTH_ROW.forEach((c, i) => {
    s.push(container(`row${i}`, c.x, zr, 0, c.look));
    if (c.stack === 2) s.push(container(`row${i}-top`, c.x, zr, 1, TOP_LOOKS[i % TOP_LOOKS.length]));
  });
  // 中央斜置绿色篷布货物（木质底座 + 篷布），与北舷夹角约 25°
  s.push({ id: "tarp", kind: "tarp", mat: "tarp", c: [-6, 0.65, 3.6], h: [3.6, 0.65, 1.1], yaw: 0.44, stand: true, look: "tarp", ref: "R05/R08/R09" });
  // 红方高点跳箱链：小箱 → 大箱 → 北舷首个集装箱顶
  s.push(crate("climb-s", -33.9, 5.4, "small"));
  s.push(crate("climb-l", -32.4, 6.0, "big"));
  // 平台前大小箱（出口掩体，可由平台跳上）
  s.push(crate("front-l", -33.6, -5.2, "big"));
  s.push(crate("front-s", -32.05, -4.6, "small", 0, 0.2));
  // 中场阶梯式箱组
  s.push(crate("mid-l", -24, 2.6, "big"));
  s.push(crate("mid-top", -24.1, 2.55, "small", CRATE.big, 0.15));
  s.push(crate("mid-s", -22.55, 2.95, "small"));
  s.push(crate("half-l", -17, -3.2, "big"));
  s.push(crate("half-s", -15.45, -3.0, "small", 0, -0.12));
  // 北舷通道掩体与远端开阔角
  s.push(crate("lane-s", -8, 10.1, "small"));
  s.push(crate("ne-l", 31.6, 8.3, "big"));
  s.push(crate("ne-s", 30.3, 6.4, "small", 0, 0.3));
  // 系缆桩（可跨越的小障碍）
  for (const x of [-26, 3, 21]) s.push(aabb(`bollard${x}`, "bollard", "steel", x - 0.3, x + 0.3, 0, 0.38, 11.2, 11.8, { stand: true, look: "bollard" }));
  return s;
}

function mirror(s: BoxSpec, tag: string): BoxSpec {
  return { ...s, id: `${tag}:${s.id}`, c: [-s.c[0], s.c[1], -s.c[2]], h: [...s.h] as [number, number, number] };
}

function globals(): BoxSpec[] {
  const L = DECK.halfLength, W = DECK.halfWidth;
  return [
    aabb("deck", "deck", "steel", -L, L, -0.4, 0, -W, W, { stand: true, look: "deck", ref: "R05" }),
    aabb("bulwark-n", "bulwark", "hull", -L, L, 0, 1.1, 12.0, 12.5, { look: "bulwark", ref: "R09" }),
    aabb("bulwark-s", "bulwark", "hull", -L, L, 0, 1.1, -12.5, -12.0, { look: "bulwark", ref: "R09" }),
    aabb("clip-n", "clip", "clip", -L, L, 1.1, 8, 12.0, 12.5),
    aabb("clip-s", "clip", "clip", -L, L, 1.1, 8, -12.5, -12.0),
    aabb("clip-w", "clip", "clip", -L - 0.5, -49.3, 0, 8, -W, W),
    aabb("clip-e", "clip", "clip", 49.3, L + 0.5, 0, 8, -W, W),
  ];
}

export function buildLayout(): BoxSpec[] {
  const side = oneSide();
  const red = side.map((b) => ({ ...b, id: `R:${b.id}` }));
  const blue = side.map((b) => mirror(b, "B"));
  return [...globals(), ...red, ...blue];
}

export type Team = 0 | 1; // 0 = 红方潜伏者（西），1 = 蓝方保卫者（东）
export const TEAM_NAME = ["潜伏者", "保卫者"] as const;

const RED_SPAWNS: [number, number][] = [
  [-47.8, -7.5], [-47.8, -4.8], [-47.8, -1.6], [-47.8, 1.6], [-47.8, 4.8], [-47.8, 7.5], [-43.0, -7.9], [-43.0, 3.6],
];

export function spawnPoints(team: Team): { x: number; y: number; z: number; yaw: number }[] {
  const sgn = team === 0 ? 1 : -1;
  // yaw 以 -Z 为 0；面向 +X 为 -π/2
  return RED_SPAWNS.map(([x, z]) => ({ x: x * sgn, y: PLATFORM_Y, z: z * sgn, yaw: team === 0 ? -Math.PI / 2 : Math.PI / 2 }));
}

/** 出生保护区：本方船舱与平台 */
export function inSpawnZone(team: Team, x: number): boolean {
  return team === 0 ? x < -35 : x > 35;
}
