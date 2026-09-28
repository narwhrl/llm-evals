import * as THREE from "three";
import { C, toon, std, concreteTex, corrugatedTex } from "./palette.js";
import { razorCoil } from "./props.js";

const plateauTop = 1.2;

// 底座、T 方高台、缓坡、下水道、排水沟
export function buildGround(kit) {
  const concreteMap = concreteTex(5, "#82888f");
  concreteMap.repeat.set(6, 6);
  const baseMat = toon(0xffffff, { map: concreteMap });
  const baseSideMat = toon(C.baseSide);
  const gravel = toon(0x5c6066);
  const darkWall = toon(0x6a7076);

  // 底座
  const base = kit.box(34, 1.4, 34, baseSideMat, 0, -1.4, 0, { outline: true });
  base.receiveShadow = true;
  const rim = kit.box(34.5, 0.16, 34.5, toon(0x767c83), 0, -0.16, 0, { outline: true });
  rim.castShadow = false;

  // T 方卸货高台（北，+1.2m）
  const plateau = kit.box(21, plateauTop, 7.5, gravel, -6.5, 0, -13.25, { outline: true });
  plateau.receiveShadow = true;

  // 缓坡（中路方向）
  const slopeAngle = Math.atan2(plateauTop, 2);
  const slope = kit.box(7, 0.3, 2.45, gravel, 0, plateauTop / 2 - 0.15, -8.5, { outline: true });
  slope.rotation.x = slopeAngle;
  // 坡侧挡墙裙板
  for (const s of [-1, 1]) {
    const skirt = kit.box(0.18, 0.3, 2.45, darkWall, s * 3.5, plateauTop / 2 - 0.16, -8.5, { outline: false });
    skirt.rotation.x = slopeAngle;
  }
  // 坡顶两侧矮护墙（含破损洞口）
  const parapetW = kit.box(1.0, 0.8, 0.3, darkWall, -3.0, plateauTop, -9.6, { outline: true });
  const parapetE = kit.box(0.6, 0.8, 0.3, darkWall, 3.2, plateauTop, -9.6, { outline: true });
  // 破损洞口（西护墙缺口 + 碎块）
  kit.box(0.7, 0.3, 0.3, darkWall, -2.15, plateauTop + 0.5, -9.6, { outline: false });
  kit.box(0.3, 0.22, 0.2, darkWall, -2.2, plateauTop + 0.02, -9.4, { outline: false });

  // 挡土墙（高台南缘，坡两侧）
  const retW = kit.box(13.5, plateauTop + 0.5, 0.4, darkWall, -10.25, 0, -9.5, { outline: true });
  retW.receiveShadow = true;
  kit.box(0.5, plateauTop + 0.5, 0.4, darkWall, 3.75, 0, -9.5, { outline: true });
  // 高台北缘矮墙 + 铁丝网
  kit.box(21, 0.5, 0.3, darkWall, -6.5, plateauTop, -16.85, { outline: true });
  kit.box(21, 0.07, 0.07, toon(0x3a4046), -6.5, plateauTop + 2.05, -16.7, { outline: false });
  for (let x = -16; x <= 3.2; x += 2.4) {
    kit.box(0.14, 1.6, 0.14, toon(0x3a4046), x, plateauTop + 0.5, -16.7, { outline: false });
  }
  razorCoil(kit, -14.5, plateauTop + 1.85, -16.7, 0, 4);
  razorCoil(kit, -6.5, plateauTop + 1.85, -16.7, 0.5, 4);
  razorCoil(kit, 1.5, plateauTop + 1.85, -16.7, 1.1, 4);

  // 高台东缘挡墙（面向东侧低地）
  kit.box(0.4, plateauTop + 0.5, 7.5, darkWall, 4, 0, -13.25, { outline: true });

  // 西侧小巷下台阶（高台 → 低地小巷）
  for (let i = 0; i < 3; i++) {
    kit.box(2.4, 0.9 - i * 0.3, 0.42, darkWall, -15.7, 0, -9.1 + i * 0.44, { outline: false });
  }

  // 下水道暗渠（x 4.2..5.6, z -7.5..7.5，顶板覆盖，两端开口）
  const sewerMat = toon(0x4e545c);
  const sludge = std(0x0b1420, { roughness: 0.25, metalness: 0.1, emissive: 0x0a2033, emissiveIntensity: 0.5 });
  // 侧壁
  kit.box(0.25, 1.3, 15, sewerMat, 4.075, -1.3, 0, { outline: false });
  kit.box(0.25, 1.3, 15, sewerMat, 5.725, -1.3, 0, { outline: false });
  // 底部污水
  const sludge1 = kit.box(1.1, 0.04, 15, sludge, 4.9, -1.32, 0, { cast: false, outline: false });
  // 顶板（留出入口/出口敞开段）
  for (const [z0, z1] of [[-5.2, 6.2]]) {
    const len = z1 - z0;
    kit.box(1.9, 0.18, len, sewerMat, 4.9, -0.18, (z0 + z1) / 2, { outline: true });
  }
  // 北端入口（T 侧斜坡下）
  kit.box(1.9, 0.5, 0.2, sewerMat, 4.9, -0.35, -7.4, { outline: true });
  kit.box(0.3, 0.9, 0.14, toon(0x6a4a28), 4.35, -1.3, -7.62, { outline: false });
  kit.box(0.3, 0.9, 0.14, toon(0x6a4a28), 5.45, -1.3, -7.62, { outline: false });
  // 南端出口（CT 侧翼）
  kit.box(1.9, 0.5, 0.2, sewerMat, 4.9, -0.35, 7.4, { outline: true });
  kit.box(0.3, 0.9, 0.14, toon(0x6a4a28), 4.35, -1.3, 7.62, { outline: false });
  kit.box(0.3, 0.9, 0.14, toon(0x6a4a28), 5.45, -1.3, 7.62, { outline: false });
  // 内壁爬梯踏级
  for (let z = -6; z <= 6.5; z += 1.7) {
    kit.box(0.1, 0.05, 0.28, toon(0x6a4a28), 4.22, -1.05 + (z % 2) * 0.3, z, { outline: false });
  }

  // 中路排水沟（横跨中路，锈铁格栅）
  const channelZ = 2.9;
  const waterMat = std(0x0a1622, { roughness: 0.15, metalness: 0.2, emissive: 0x0c2438, emissiveIntensity: 0.6 });
  kit.box(6.6, 0.04, 0.7, waterMat, 0, -0.03, channelZ, { cast: false, outline: false });
  // 格栅条
  for (let i = 0; i < 11; i++) {
    const bar = kit.box(0.5, 0.05, 0.09, toon(0x6a4a28), -2.9 + i * 0.58, 0.015, channelZ, { outline: false });
  }
  // 边框
  kit.box(6.7, 0.07, 0.12, toon(0x545a62), 0, 0.0, channelZ - 0.41, { outline: false });
  kit.box(6.7, 0.07, 0.12, toon(0x545a62), 0, 0.0, channelZ + 0.41, { outline: false });

  return { plateauTop, slopeAngle };
}
