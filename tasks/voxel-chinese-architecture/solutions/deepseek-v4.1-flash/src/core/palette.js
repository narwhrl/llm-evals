import { Color } from "three";

/**
 * 材质族：决定实例化分桶与 PBR 参数。
 * 每个族最终对应一个 InstancedMesh，因此族的数量就是 draw call 的数量上限。
 */
export const FAMILIES = {
  stone: { roughness: 0.97, metalness: 0.0 },
  wood: { roughness: 0.8, metalness: 0.0 },
  paint: { roughness: 0.7, metalness: 0.0 },
  tile: { roughness: 0.5, metalness: 0.06 },
  glaze: { roughness: 0.32, metalness: 0.1 },
  metal: { roughness: 0.3, metalness: 0.76 },
  foliage: { roughness: 1.0, metalness: 0.0 },
  water: { roughness: 0.1, metalness: 0.16, transparent: true, opacity: 0.86 },
  glowing: { roughness: 0.55, metalness: 0.0, emissive: 0xff7a28, emissiveIntensity: 1.25 },
};

/**
 * 色板。[名称, 十六进制, 材质族]
 * 名称即代码里的取色方式（P.wallRed 等），十六进制按 sRGB 书写。
 */
const BLOCK_DEFS = [
  // 石作
  ["stoneBase", 0xcdc6b6, "stone"],
  ["stoneLight", 0xded8c8, "stone"],
  ["stoneShade", 0xa9a08e, "stone"],
  ["stoneDark", 0x8b8375, "stone"],
  ["curb", 0x9a9282, "stone"],
  ["lion", 0xb9b2a2, "stone"],
  // 铺装
  ["pavingA", 0xb8b0a0, "stone"],
  ["pavingB", 0xa69e8e, "stone"],
  ["pathStone", 0xc6bdab, "stone"],
  ["imperial", 0xd9d1be, "stone"],
  // 墙体
  ["wallRed", 0xa63a2e, "stone"],
  ["wallRedDark", 0x8a2f26, "stone"],
  ["wallWhite", 0xddd5c6, "stone"],
  // 木作
  ["columnRed", 0x8f3826, "wood"],
  ["beamWood", 0x6f3a24, "wood"],
  ["rafterWood", 0x7d4526, "wood"],
  ["doorWood", 0x5d2f1e, "wood"],
  ["latticeWood", 0x8a5a33, "wood"],
  ["plaqueBoard", 0x3f2a1c, "wood"],
  // 彩画
  ["paintingGreen", 0x2f6b62, "paint"],
  ["paintingBlue", 0x2c4f66, "paint"],
  ["dgLight", 0xcfc3a8, "paint"],
  ["dgGold", 0xc9a24f, "paint"],
  // 瓦作
  ["glazedA", 0xd9a12b, "glaze"],
  ["glazedB", 0xb8831f, "glaze"],
  ["glazedRidge", 0x8f5f18, "glaze"],
  ["tileGreen", 0x2f6b4f, "glaze"],
  ["tileA", 0x4d545c, "tile"],
  ["tileB", 0x3c434a, "tile"],
  ["tileC", 0x5b626a, "tile"],
  // 金属
  ["gold", 0xd8b45a, "metal"],
  ["goldDark", 0xb8944a, "metal"],
  ["bronze", 0x6b6a5e, "metal"],
  // 灯火
  ["lantern", 0xff8a3d, "glowing"],
  ["lanternPale", 0xffd08a, "glowing"],
  // 草木
  ["grass", 0x6f8f4a, "foliage"],
  ["grassDark", 0x5b7a3c, "foliage"],
  ["pineNeedle", 0x3f6b3a, "foliage"],
  ["pineNeedleDark", 0x31552e, "foliage"],
  ["pineTrunk", 0x5a3d28, "wood"],
  ["blossom", 0xc86b7a, "foliage"],
  // 水面
  ["waterDeep", 0x2f5a6b, "water"],
  ["waterShallow", 0x47808f, "water"],
];

/** 名称 → 调色板索引（从 1 开始，0 表示空气）。 */
export const P = Object.create(null);

/** 索引 → 方块定义，第 0 位为 null。 */
export const BLOCKS = [null];

for (const [name, hex, family] of BLOCK_DEFS) {
  if (P[name] !== undefined) throw new Error(`重复的方块名：${name}`);
  if (!FAMILIES[family]) throw new Error(`未知材质族：${family}`);
  P[name] = BLOCKS.length;
  BLOCKS.push({ name, hex, family, color: new Color(hex) });
}

export const BLOCK_COUNT = BLOCKS.length - 1;

/** 实例化时复用同一个 Color 对象，避免逐方块分配。 */
export const scratchColor = new Color();
