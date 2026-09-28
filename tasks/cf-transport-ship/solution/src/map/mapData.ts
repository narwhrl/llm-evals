/**
 * 运输船 地图数据：所有主要掩体、舱室、通道、跳箱链、导航图、出生点与固定机位。
 * 坐标系：X 沿船长（+X 船首/蓝方，−X 船尾/红方），Z 舷侧（+Z 右舷），Y 向上，甲板面 y=0。
 * 尺度：人物站高 1.82m、眼高 1.62m 校准；估计值见 docs/MAP_REFERENCE.md。
 */
import type { SurfaceMaterial } from '../physics/world';

export type BlockKind =
  | 'deck' | 'container' | 'crate' | 'diagonal' | 'cabinWall' | 'lintel'
  | 'bulwark' | 'invisible' | 'machinery' | 'craneBase' | 'reel' | 'roof'
  | 'locker' | 'post' | 'hull' | 'funnel' | 'jib';

export interface MapBlock {
  kind: BlockKind;
  cx: number; cy: number; cz: number;
  hx: number; hy: number; hz: number;
  yaw: number;
  surface: SurfaceMaterial;
  charBlock: boolean;
  bulletBlock: boolean;
  standable: boolean;
  /** 集装箱/木箱的视觉变体 */
  variant?: string;
  /** 文档对照标签 */
  tag: string;
}

const B = (
  kind: BlockKind, cx: number, cy: number, cz: number,
  hx: number, hy: number, hz: number,
  surface: SurfaceMaterial, tag: string,
  opts: Partial<MapBlock> = {},
): MapBlock => ({
  kind, cx, cy, cz, hx, hy, hz, yaw: opts.yaw ?? 0,
  surface, tag,
  charBlock: opts.charBlock ?? true,
  bulletBlock: opts.bulletBlock ?? true,
  standable: opts.standable ?? true,
  variant: opts.variant,
});

/** 集装箱外形（米） */
export const CONTAINER = { len: 6.0, h: 2.6, w: 2.44 };
/** 木箱边长（单箱） */
export const CRATE = 1.1;
/** 甲板可玩半长 / 半宽 */
export const DECK = { halfLen: 52, halfWide: 15, bulwarkZ: 14.8 };

/** 舷侧集装箱墙分段：[x0, x1, 层数, 颜色]，z 面板由 side 决定 */
interface ContSeg { x0: number; x1: number; stacks: 1 | 2; variant: string }

const PORT_SEGS: ContSeg[] = [
  { x0: -37.8, x1: -31.8, stacks: 1, variant: 'blue' },
  { x0: -31.6, x1: -25.6, stacks: 1, variant: 'blue' },
  { x0: -23.6, x1: -17.6, stacks: 2, variant: 'rust' },
  { x0: -17.4, x1: -11.4, stacks: 2, variant: 'rust' },
  { x0: -3.2, x1: 2.8, stacks: 1, variant: 'green' },
  { x0: 3.0, x1: 9.0, stacks: 1, variant: 'blue' },
  { x0: 11.2, x1: 17.2, stacks: 2, variant: 'blue' },
  { x0: 17.4, x1: 23.4, stacks: 2, variant: 'blue' },
  { x0: 25.6, x1: 31.6, stacks: 1, variant: 'rust' },
  { x0: 31.8, x1: 37.8, stacks: 1, variant: 'rust' },
];

const STAR_SEGS: ContSeg[] = [
  { x0: -37.8, x1: -31.8, stacks: 2, variant: 'rust' },
  { x0: -31.6, x1: -25.6, stacks: 2, variant: 'rust' },
  { x0: -25.8, x1: -19.8, stacks: 1, variant: 'blue' },
  { x0: -17.5, x1: -11.5, stacks: 1, variant: 'blue' }, // 高点①（跳箱链可达）
  { x0: -3.2, x1: 2.8, stacks: 2, variant: 'green' },
  { x0: 3.0, x1: 9.0, stacks: 2, variant: 'green' },
  { x0: 11.2, x1: 17.2, stacks: 1, variant: 'blue' },   // 高点②（跳箱链可达）
  { x0: 17.4, x1: 23.4, stacks: 1, variant: 'blue' },
  { x0: 25.6, x1: 31.6, stacks: 2, variant: 'rust' },
  { x0: 31.8, x1: 37.8, stacks: 2, variant: 'rust' },
];

/** 木箱：[x, z, 层数] */
const CRATES: Array<[number, number, number]> = [
  // 蓝方（船首）缓冲区
  [44, -2.4, 2], [44, 2.6, 1],
  // 红方（船尾）缓冲区（镜像，微差异已记录）
  [-44, 2.4, 2], [-44, -2.6, 1],
  // 中场散布
  [18, 6.8, 2], [21, -6.5, 1], [28, -2.2, 3], [33, 4.5, 1], [36, -5.8, 2],
  [-18, -6.8, 2], [-21, 6.5, 1], [-28, 2.2, 3], [-33, -4.5, 1], [-36, 5.8, 2],
  // 斜置货物端部
  [2.2, -6.6, 1], [-2.2, 6.6, 1],
  // 舷侧通道中段
  [0, 13.2, 1], [0, -13.2, 1],
  // 右舷跳箱链①（上 S4 顶）
  [-14.6, 8.9, 1], [-12.9, 9.5, 2],
  // 右舷跳箱链②（上 S7 顶）
  [14.4, 8.9, 1], [12.7, 9.5, 2],
];

/** 端部出生舱：内空 x∈[52,64] / 墙厚 0.4 / 高 6.4，正门 + 双侧门 */
function cabinBlocks(sign: 1 | -1): MapBlock[] {
  const out: MapBlock[] = [];
  const fx = 52 * sign;          // 面向甲板的前墙
  const bx = 64 * sign;          // 背墙
  const H = 6.4;
  const seg = (z0: number, z1: number, y0: number, y1: number, tag: string) => {
    out.push(B('cabinWall', fx, (y0 + y1) / 2, (z0 + z1) / 2, 0.2, (y1 - y0) / 2, (z1 - z0) / 2, 'metal', tag));
  };
  // 前墙：正门 z∈[-1.4,1.4] 高 3.0；侧门 z=±[4.0,5.6] 高 2.7
  seg(-7, -5.6, 0, H, `舱前墙L${sign > 0 ? '蓝' : '红'}`);
  seg(-4.0, -1.4, 0, H, '舱前墙L2');
  seg(1.4, 4.0, 0, H, '舱前墙R2');
  seg(5.6, 7, 0, H, '舱前墙R');
  out.push(B('lintel', fx, 4.7, 0, 0.2, 1.7, 1.4, 'metal', '正门楣'));
  out.push(B('lintel', fx, 4.55, -4.8, 0.2, 1.85, 0.8, 'metal', '侧门楣L'));
  out.push(B('lintel', fx, 4.55, 4.8, 0.2, 1.85, 0.8, 'metal', '侧门楣R'));
  // 侧墙 / 背墙
  out.push(B('cabinWall', 58 * sign, H / 2, -7, 6, H / 2, 0.2, 'metal', '舱侧墙L'));
  out.push(B('cabinWall', 58 * sign, H / 2, 7, 6, H / 2, 0.2, 'metal', '舱侧墙R'));
  out.push(B('cabinWall', bx, H / 2, 0, 0.2, H / 2, 7, 'metal', '舱背墙'));
  // 屋顶
  out.push(B('roof', 58 * sign, 6.7, 0, 6.4, 0.3, 7.4, 'metal', '舱顶'));
  // 室内储物柜（贴背墙）
  out.push(B('locker', 63.0 * sign, 0.9, -3.5, 0.8, 0.9, 0.8, 'metal', '储物柜'));
  out.push(B('locker', 63.0 * sign, 0.9, 3.5, 0.8, 0.9, 0.8, 'metal', '储物柜'));
  return out;
}

export function buildMapBlocks(): MapBlock[] {
  const blocks: MapBlock[] = [];
  // 甲板（地板碰撞体）
  blocks.push(B('deck', 0, -0.5, 0, 65, 0.5, 15.5, 'deck', '主甲板'));
  // 舷墙（膝高钢板，挡人挡弹）+ 上方栏杆安全墙（挡人不挡弹，视觉为栏杆）
  for (const s of [-1, 1]) {
    blocks.push(B('bulwark', 0, 0.33, 14.8 * s, 52, 0.33, 0.15, 'metal', `舷墙${s > 0 ? '右' : '左'}`));
    blocks.push(B('invisible', 0, 1.16, 14.8 * s, 52, 0.5, 0.12, 'metal', '栏杆安全墙', { bulletBlock: false, standable: false }));
  }
  // 栏杆立柱（实体，挡弹；网面不挡弹）
  for (let x = -51; x <= 51; x += 3) {
    for (const s of [-1, 1]) {
      blocks.push(B('post', x, 0.91, 14.72 * s, 0.05, 0.58, 0.05, 'metal', '栏杆立柱'));
    }
  }
  // 舷侧集装箱墙
  const cont = (x0: number, x1: number, stacks: number, side: number, variant: string, i: number) => {
    const cx = (x0 + x1) / 2;
    for (let s = 0; s < stacks; s++) {
      blocks.push(B('container', cx, CONTAINER.h / 2 + s * CONTAINER.h, 11.72 * side,
        (x1 - x0) / 2, CONTAINER.h / 2, CONTAINER.w / 2, 'metal',
        `集装箱${side > 0 ? '右' : '左'}${i}-${s + 1}层`, { variant }));
    }
  };
  PORT_SEGS.forEach((c, i) => cont(c.x0, c.x1, c.stacks, -1, c.variant, i + 1));
  STAR_SEGS.forEach((c, i) => cont(c.x0, c.x1, c.stacks, 1, c.variant, i + 1));
  // 木箱（可穿透）
  for (const [x, z, n] of CRATES) {
    for (let i = 0; i < n; i++) {
      blocks.push(B('crate', x, CRATE / 2 + i * CRATE, z, CRATE / 2, CRATE / 2, CRATE / 2, 'wood', `木箱@${x},${z}第${i + 1}层`, { variant: 'wood' }));
    }
  }
  // 中央斜置绿色篷布货物（两块平行，形成对角通道）
  blocks.push(B('diagonal', -7, 1.35, -3.2, 5, 1.35, 1.6, 'tarp', '斜置货物W', { yaw: 32 * Math.PI / 180, variant: 'tarp' }));
  blocks.push(B('diagonal', 7, 1.35, 3.2, 5, 1.35, 1.6, 'tarp', '斜置货物E', { yaw: 32 * Math.PI / 180, variant: 'tarp' }));
  // 两端出生舱
  blocks.push(...cabinBlocks(1), ...cabinBlocks(-1));
  // 舱侧机械舱（封闭四角，防止绕出船体）
  for (const sx of [1, -1]) {
    for (const sz of [1, -1]) {
      blocks.push(B('machinery', 57.4 * sx, 2, 11.2 * sz, 5.7, 2, 3.1, 'metal', '机舱围蔽'));
    }
  }
  // 甲板吊机基座（船首左舷）
  blocks.push(B('craneBase', 46, 1.0, -8.5, 1.1, 1.0, 1.1, 'metal', '吊机基座', { variant: 'crane' }));
  // 绞缆筒（低圆桶掩体）
  blocks.push(B('reel', 30, 0.75, -7.5, 0.75, 0.75, 0.55, 'metal', '缆筒', { variant: 'reel' }));
  blocks.push(B('reel', -30, 0.75, 7.5, 0.75, 0.75, 0.55, 'metal', '缆筒', { variant: 'reel' }));
  return blocks;
}

/** 出生点（脚底 y=0，舱内） */
export const SPAWNS: Record<'blue' | 'red', Array<{ x: number; z: number; yaw: number }>> = {
  blue: [
    { x: 57, z: 0, yaw: -Math.PI / 2 }, { x: 58.6, z: 2.4, yaw: -Math.PI / 2 }, { x: 58.6, z: -2.4, yaw: -Math.PI / 2 },
    { x: 56.4, z: 4.6, yaw: -Math.PI / 2 }, { x: 56.4, z: -4.6, yaw: -Math.PI / 2 },
  ],
  red: [
    { x: -57, z: 0, yaw: Math.PI / 2 }, { x: -58.6, z: 2.4, yaw: Math.PI / 2 }, { x: -58.6, z: -2.4, yaw: Math.PI / 2 },
    { x: -56.4, z: 4.6, yaw: Math.PI / 2 }, { x: -56.4, z: -4.6, yaw: Math.PI / 2 },
  ],
};

/** 导航节点 */
export interface NavNode { id: number; x: number; y: number; z: number; tag: string }
export const NAV_NODES: NavNode[] = [
  { id: 100, x: 58, y: 0, z: 0, tag: '蓝出生' },
  { id: 101, x: 50, y: 0, z: 0, tag: '蓝正门' },
  { id: 102, x: 50, y: 0, z: 4.6, tag: '蓝侧门R' },
  { id: 103, x: 50, y: 0, z: -4.6, tag: '蓝侧门L' },
  { id: 107, x: 54, y: 0, z: 4.6, tag: '蓝舱内R' },
  { id: 108, x: 54, y: 0, z: -4.6, tag: '蓝舱内L' },
  { id: 104, x: 44, y: 0, z: 0, tag: '蓝缓冲' },
  { id: 105, x: 45, y: 0, z: 8.6, tag: '蓝缓冲R' },
  { id: 106, x: 45, y: 0, z: -8.6, tag: '蓝缓冲L' },
  { id: 200, x: -58, y: 0, z: 0, tag: '红出生' },
  { id: 201, x: -50, y: 0, z: 0, tag: '红正门' },
  { id: 202, x: -50, y: 0, z: 4.6, tag: '红侧门R' },
  { id: 203, x: -50, y: 0, z: -4.6, tag: '红侧门L' },
  { id: 207, x: -54, y: 0, z: 4.6, tag: '红舱内R' },
  { id: 208, x: -54, y: 0, z: -4.6, tag: '红舱内L' },
  { id: 204, x: -44, y: 0, z: 0, tag: '红缓冲' },
  { id: 205, x: -44, y: 0, z: 8.6, tag: '红缓冲R' },
  { id: 206, x: -44, y: 0, z: -8.6, tag: '红缓冲L' },
  // 右舷通道（z=13.6）
  { id: 310, x: 40, y: 0, z: 13.6, tag: '右道1' },
  { id: 311, x: 32, y: 0, z: 13.6, tag: '右道2' },
  { id: 312, x: 24, y: 0, z: 13.6, tag: '右道3' },
  { id: 313, x: 16, y: 0, z: 13.6, tag: '右道4' },
  { id: 314, x: 6, y: 0, z: 13.6, tag: '右道5' },
  { id: 315, x: -6, y: 0, z: 13.6, tag: '右道6' },
  { id: 316, x: -16, y: 0, z: 13.6, tag: '右道7' },
  { id: 317, x: -24, y: 0, z: 13.6, tag: '右道8' },
  { id: 318, x: -32, y: 0, z: 13.6, tag: '右道9' },
  { id: 319, x: -40, y: 0, z: 13.6, tag: '右道10' },
  // 左舷通道（z=-13.6）
  { id: 330, x: 40, y: 0, z: -13.6, tag: '左道1' },
  { id: 331, x: 32, y: 0, z: -13.6, tag: '左道2' },
  { id: 332, x: 24, y: 0, z: -13.6, tag: '左道3' },
  { id: 333, x: 16, y: 0, z: -13.6, tag: '左道4' },
  { id: 334, x: 6, y: 0, z: -13.6, tag: '左道5' },
  { id: 335, x: -6, y: 0, z: -13.6, tag: '左道6' },
  { id: 336, x: -16, y: 0, z: -13.6, tag: '左道7' },
  { id: 337, x: -24, y: 0, z: -13.6, tag: '左道8' },
  { id: 338, x: -32, y: 0, z: -13.6, tag: '左道9' },
  { id: 339, x: -40, y: 0, z: -13.6, tag: '左道10' },
  // 中央甲板
  { id: 400, x: 36, y: 0, z: 0.5, tag: '中1蓝' },
  { id: 401, x: 24, y: 0, z: -1, tag: '中2蓝' },
  { id: 402, x: 14, y: 0, z: 3, tag: '中3蓝' },
  { id: 403, x: 2, y: 0, z: 7.2, tag: '中场北口' },
  { id: 404, x: -2, y: 0, z: -7.2, tag: '中场南口' },
  { id: 405, x: 0, y: 0, z: 0, tag: '斜货通道' },
  { id: 406, x: -14, y: 0, z: -3, tag: '中3红' },
  { id: 407, x: -24, y: 0, z: 1, tag: '中2红' },
  { id: 408, x: -36, y: 0, z: -0.5, tag: '中1红' },
  { id: 442, x: -12, y: 0, z: -6.5, tag: '斜货西南绕' },
  { id: 443, x: 12, y: 0, z: 6.5, tag: '斜货东北绕' },
  // 通道开口
  { id: 420, x: -18.6, y: 0, z: 9.8, tag: '右缺口1' },
  { id: 421, x: 10.1, y: 0, z: 10.1, tag: '右缺口2' },
  { id: 422, x: -7.3, y: 0, z: 9.2, tag: '右大开口' },
  { id: 430, x: -24.7, y: 0, z: -10, tag: '左缺口1' },
  { id: 431, x: 10.1, y: 0, z: -10.4, tag: '左缺口2' },
  { id: 432, x: -7.3, y: 0, z: -9.2, tag: '左大开口' },
  // 斜货通道端点
  { id: 440, x: 3.4, y: 0, z: 7.4, tag: '斜货东北口' },
  { id: 441, x: -3.4, y: 0, z: -7.4, tag: '斜货西南口' },
  // 右舷高点（跳箱链）
  { id: 450, x: -14.5, y: 2.6, z: 11.7, tag: '高点1顶' },
  { id: 451, x: -14.6, y: 1.1, z: 8.9, tag: '跳箱1a' },
  { id: 452, x: -12.9, y: 2.2, z: 9.5, tag: '跳箱1b' },
  { id: 453, x: 14.3, y: 2.6, z: 11.7, tag: '高点2顶' },
  { id: 454, x: 14.4, y: 1.1, z: 8.9, tag: '跳箱2a' },
  { id: 455, x: 12.7, y: 2.2, z: 9.5, tag: '跳箱2b' },
  // 支援位
  { id: 460, x: 38, y: 0, z: 6.5, tag: '蓝支援' },
  { id: 461, x: -38, y: 0, z: -6.5, tag: '红支援' },
];

export interface NavEdge { a: number; b: number; jump?: 'up' | 'down' }
export const NAV_EDGES: NavEdge[] = [
  // 蓝方舱内外
  { a: 100, b: 101 }, { a: 100, b: 107 }, { a: 100, b: 108 },
  { a: 107, b: 102 }, { a: 108, b: 103 },
  { a: 101, b: 104 }, { a: 102, b: 105 }, { a: 103, b: 106 },
  { a: 105, b: 310 }, { a: 106, b: 330 },
  { a: 105, b: 460 }, { a: 460, b: 400 }, { a: 460, b: 310 },
  // 红方舱内外
  { a: 200, b: 201 }, { a: 200, b: 207 }, { a: 200, b: 208 },
  { a: 207, b: 202 }, { a: 208, b: 203 },
  { a: 201, b: 204 }, { a: 202, b: 205 }, { a: 203, b: 206 },
  { a: 205, b: 319 }, { a: 206, b: 339 },
  { a: 205, b: 461 }, { a: 461, b: 408 }, { a: 461, b: 339 },
  // 中央链
  { a: 104, b: 400 }, { a: 400, b: 401 }, { a: 401, b: 402 },
  { a: 402, b: 403 }, { a: 402, b: 443 }, { a: 443, b: 403 },
  { a: 403, b: 440 }, { a: 440, b: 405 }, { a: 405, b: 441 }, { a: 441, b: 404 },
  { a: 404, b: 442 }, { a: 442, b: 406 }, { a: 406, b: 407 }, { a: 407, b: 408 },
  // 开口连接
  { a: 403, b: 422 }, { a: 404, b: 432 },
  { a: 422, b: 420 }, { a: 420, b: 316 }, { a: 422, b: 421 },
  { a: 421, b: 313 }, { a: 421, b: 314 },
  { a: 432, b: 430 }, { a: 430, b: 337 }, { a: 432, b: 431 },
  { a: 431, b: 333 }, { a: 431, b: 334 },
  { a: 403, b: 314 }, { a: 404, b: 334 },
  { a: 402, b: 421 }, { a: 406, b: 430 },
  { a: 401, b: 332 }, { a: 407, b: 337 },
  // 舷侧通道链
  { a: 310, b: 311 }, { a: 311, b: 312 }, { a: 312, b: 313 }, { a: 313, b: 314 },
  { a: 314, b: 315 }, { a: 315, b: 316 }, { a: 316, b: 317 }, { a: 317, b: 318 },
  { a: 318, b: 319 },
  { a: 330, b: 331 }, { a: 331, b: 332 }, { a: 332, b: 333 }, { a: 333, b: 334 },
  { a: 334, b: 335 }, { a: 335, b: 336 }, { a: 336, b: 337 }, { a: 337, b: 338 },
  { a: 338, b: 339 },
  // 右舷跳箱链（上/下）
  { a: 420, b: 451, jump: 'up' }, { a: 451, b: 452, jump: 'up' }, { a: 452, b: 450, jump: 'up' },
  { a: 450, b: 420, jump: 'down' }, { a: 450, b: 316, jump: 'down' },
  { a: 421, b: 454, jump: 'up' }, { a: 454, b: 455, jump: 'up' }, { a: 455, b: 453, jump: 'up' },
  { a: 453, b: 421, jump: 'down' }, { a: 453, b: 313, jump: 'down' },
];

/** 固定对照机位（截图与布局对照） */
export interface Station { id: string; label: string; pos: [number, number, number]; look: [number, number, number]; fov: number }
export const STATIONS: Station[] = [
  { id: 'top', label: '俯视布局', pos: [0, 44, 3], look: [0, 0, 0], fov: 42 },
  { id: 'sternDoor', label: '红方正门内（长视线）', pos: [-56, 1.62, 0], look: [0, 1.4, 0], fov: 70 },
  { id: 'bowDoor', label: '蓝方正门内（长视线）', pos: [56, 1.62, 0], look: [0, 1.4, 0], fov: 70 },
  { id: 'midW', label: '中场西侧交火位', pos: [-22, 1.62, -4.5], look: [20, 1.5, 2], fov: 70 },
  { id: 'midE', label: '中场东侧交火位', pos: [22, 1.62, 4.5], look: [-20, 1.5, -2], fov: 70 },
  { id: 'flankPort', label: '左舷通道', pos: [4, 1.62, -13.6], look: [-44, 1.5, -13.6], fov: 65 },
  { id: 'flankStar', label: '右舷通道', pos: [-4, 1.62, 13.6], look: [44, 1.5, 13.6], fov: 65 },
  { id: 'diagClose', label: '斜置货物近景', pos: [7.5, 1.62, 9.8], look: [-5, 1.1, -4], fov: 70 },
  { id: 'highTop', label: '高点俯瞰', pos: [-14.5, 4.35, 11.7], look: [0, 0.8, 0], fov: 65 },
  { id: 'hero', label: '主菜单全景', pos: [34, 8, -26], look: [-12, 1.6, 5], fov: 55 },
];

/** 关键视线检查（用于测试与验收记录）：期望是否被静态几何阻挡 */
export interface SightCheck { id: string; from: [number, number, number]; to: [number, number, number]; blocked: boolean; note: string }
export const SIGHT_CHECKS: SightCheck[] = [
  { id: 'SL1', from: [-56, 1.62, 0], to: [56, 1.62, 0], blocked: true, note: '舱门对舱门：中线被斜置货物阻挡（经典半遮挡）' },
  { id: 'SL2', from: [-48, 1.62, -13.6], to: [48, 1.62, -13.6], blocked: false, note: '左舷通道全长视线畅通（木箱低于视线）' },
  { id: 'SL3', from: [-20, 1.62, -11.7], to: [20, 1.62, -11.7], blocked: true, note: '双层集装箱完全遮挡' },
  { id: 'SL4', from: [2.2, 1.62, 6.8], to: [-2.2, 1.62, -6.8], blocked: false, note: '斜货对角通道内视线畅通' },
  { id: 'SL5', from: [10, 0.5, -13.6], to: [-10, 0.5, -13.6], blocked: true, note: '低姿态被舷墙（钢）阻挡' },
];
