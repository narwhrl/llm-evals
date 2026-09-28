import * as THREE from "three";
import { C, toon, std, corrugatedTex, graffitiTex, stencilTex, bulletHolesTex, dutyBoardTex } from "../palette.js";
import { palletStack, dumpster, wheelieBin, fallenBike, tableChairs, crateStack, barrel, streetLamp, officeSet, locker } from "../props.js";

const X0 = 8.5, X1 = 15.5, Z0 = -9.5, Z1 = -4; // 铁皮屋范围
const F1 = 3.0, F2 = 5.9; // 层高线

// B 炸弹安放区（东北后街：铁皮屋 + 露天院坝）
export function buildBSite(kit, softDot) {
  const tinMat = toon(0xffffff, { map: corrugatedTex(31, "#79848d") });
  tinMat.map.repeat.set(2.6, 1.2);
  const tinDark = toon(0xffffff, { map: corrugatedTex(35, "#5d666e") });
  tinDark.map.repeat.set(2.2, 1.0);

  // 一层墙体（门卫室：前后双门 + 玻璃窗）
  wall(kit, X0, X1, Z1, tinMat, 0.28); // 南墙
  wall(kit, X0, X1, Z0, tinDark, 0.28); // 北墙
  wallX(kit, Z0, Z1, X0, tinMat, 0.28); // 西墙
  wallX(kit, Z0, Z1, X1, tinDark, 0.28);
  // 南墙开口：玻璃窗 ×2 + 门
  kit.box(1.6, 1.5, 0.06, glassMat(), 10.6, 0, Z1 + 0.16, { cast: false, outline: false });
  kit.box(1.6, 1.5, 0.06, glassMat(), 14.1, 0, Z1 + 0.16, { cast: false, outline: false });
  kit.box(1.1, 2.2, 0.08, std(0x05070a), 12.5, 0, Z1 + 0.16, { cast: false, outline: false });
  // 北墙后门
  kit.box(1.0, 2.1, 0.08, std(0x05070a), 13.5, 0, Z0 - 0.16, { cast: false, outline: false });

  // 楼板与二层墙
  kit.box(X1 - X0, 0.18, Z1 - Z0, toon(0x4e575e), (X0 + X1) / 2, F1 - 0.18, (Z0 + Z1) / 2, { outline: false });
  wall(kit, X0, X1, Z1, tinMat, 0.26, F1);
  wall(kit, X0, X1, Z0, tinDark, 0.26, F1);
  wallX(kit, Z0, Z1, X0, tinMat, 0.26, F1);
  wallX(kit, Z0, Z1, X1, tinDark, 0.26, F1);
  // 二层南窗与西窗
  kit.box(1.4, 1.2, 0.06, glassMat(), 11.5, F1 + 0.9, Z1 + 0.15, { cast: false, outline: false });
  kit.box(1.4, 1.2, 0.06, glassMat(), 14.2, F1 + 0.9, Z1 + 0.15, { cast: false, outline: false });
  kit.box(0.06, 1.2, 1.3, glassMat(), X0 - 0.15, F1 + 0.9, -7.2, { cast: false, outline: false });

  // 屋顶 + 女儿墙
  kit.box(X1 - X0 + 0.4, 0.22, Z1 - Z0 + 0.4, toon(0x4a525a), (X0 + X1) / 2, F2, (Z0 + Z1) / 2, { outline: true });
  for (const [w, d, px, pz] of [
    [X1 - X0 + 0.4, 0.16, (X0 + X1) / 2, Z1 + 0.17],
    [X1 - X0 + 0.4, 0.16, (X0 + X1) / 2, Z0 - 0.17],
    [0.16, Z1 - Z0, X0 - 0.17, (Z0 + Z1) / 2],
    [0.16, Z1 - Z0, X1 + 0.17, (Z0 + Z1) / 2],
  ]) {
    kit.box(w, 0.45, d, tinDark, px, F2 + 0.22, pz, { outline: false });
  }
  // 屋顶通风口（蒸汽）
  const vent = kit.cyl(0.2, 0.26, 0.6, 8, toon(0x5a626a), 11.2, F2 + 0.22, -8.4);

  // 二层阳台（南面西端）
  kit.box(2.3, 0.14, 1.35, toon(0x4a525a), 9.9, F1, Z1 + 0.75, { outline: true });
  kit.box(2.3, 0.55, 0.07, toon(0x4a525a), 9.9, F1 + 0.14, Z1 + 1.38, { outline: false });
  kit.box(0.07, 0.55, 1.35, toon(0x4a525a), 8.8, F1 + 0.14, Z1 + 0.75, { outline: false });
  kit.box(1.0, 2.0, 0.08, std(0x05070a), 9.9, F1, Z1 + 0.12, { cast: false, outline: false }); // 阳台门洞

  // 消防梯（西面之字梯）
  fireEscape(kit, X0, Z0 + 1.6, F1);

  // 门卫室内陈设
  officeSet(kit, 12.3, 0, -6.6, -Math.PI / 2);
  locker(kit, 14.6, 0, -8.6, Math.PI);
  kit.decal(dutyBoardTex(), 0.9, 1.15, 9.4, 1.5, Z0 + 0.3, {});
  // 破损日光灯管（悬吊，闪烁）
  const tube = kit.box(1.2, 0.07, 0.16, std(0xffe9c8, { emissive: 0xffd28a, emissiveIntensity: 1.8 }), 12.3, 2.45, -6.6, { cast: false, outline: false });
  kit.box(0.02, 0.35, 0.02, toon(0x23282e), 11.85, 2.52, -6.6, { outline: false });
  kit.box(0.02, 0.35, 0.02, toon(0x23282e), 12.75, 2.52, -6.6, { outline: false });

  // 院坝掩体与道具
  palletStack(kit, 5.6, 0, -3.4, 0.2);
  dumpster(kit, 6.3, 0, -0.7, 0.15, 0x50565e);
  wheelieBin(kit, 9.9, 0, 0.25, 0.3);
  wheelieBin(kit, 10.55, 0, -0.35, -0.2, 0x2c5a8c);
  fallenBike(kit, 7.9, 0, 0.35, 0.8);
  tableChairs(kit, 12.7, 0, 1.5, 0.5);
  crateStack(kit, 4.6, 0, -1.3, 0.2);
  barrel(kit, 16.2, 0, -2.2, 0.3, undefined);
  barrel(kit, 16.3, 0, -3.1, 1.2);

  // 转角矮墙（通往 CT 捷径）
  kit.box(3.2, 1.15, 0.35, toon(0x6d747c), 14.0, 0, 0.6, { outline: true });
  kit.box(0.8, 1.15, 0.35, toon(0x6d747c), 11.4, 0, 0.6, { outline: true });

  // 老式路灯（暖黄光晕）
  const lamp = streetLamp(kit, 5.2, 0, -0.6, softDot);

  // 涂鸦与弹孔
  kit.decal(graffitiTex("SECTOR B", 85, "#a8b6c2"), 3.4, 1.7, 8.35, 1.6, -5.6, { ry: Math.PI / 2 });
  kit.decal(bulletHolesTex(111, 12), 2.0, 2.0, 8.35, 1.2, -8.0, { ry: Math.PI / 2 });
  kit.decal(stencilTex("B ZONE", "#cfd6dc", 512, 96, "bold 72px Consolas"), 2.6, 0.5, 12.0, 2.0, Z1 + 0.18, {});

  return { lamp, vent, tube, glassFix: null };
}

function wall(kit, x0, x1, z, mat, t, yBase = 0, h = 3.0) {
  const segs = splitForOpenings(z, x0, x1, yBase === 0);
  for (const [a, b] of segs) {
    kit.box(b - a, h, t, mat, (a + b) / 2, yBase, z, { outline: yBase === 0 });
  }
}

function wallX(kit, z0, z1, x, mat, t, yBase = 0, h = 3.0) {
  kit.box(t, h, z1 - z0, mat, x, yBase, (z0 + z1) / 2, { outline: yBase === 0 });
}

function splitForOpenings(z, x0, x1, groundFloor) {
  if (!groundFloor) return [[x0, x1]];
  if (z === 0) return [[x0, x1]];
  // 南墙一层：窗/门不裁墙（玻璃与门洞为贴面暗盒，简化保证结构连续）
  return [[x0, x1]];
}

function glassMat() {
  return std(C.glass, { roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.42 });
}

function fireEscape(kit, x, zStart, topY) {
  // 两段折返楼梯 + 中间平台
  const stepMat = toon(0x4a525a);
  const flight = (y0, z0, dz, n) => {
    for (let i = 0; i < n; i++) {
      kit.box(0.85, 0.06, 0.26, stepMat, x + 0.55, y0 + i * (topY / 2 / n), z0 + (dz / n) * (i + 0.5), { outline: false });
    }
    // 斜梁
    const beam = kit.box(0.08, 0.08, Math.abs(dz) * 1.05, stepMat, x + 0.14, y0 + (topY / 2) * 0.45, z0 + dz / 2, { outline: false });
    beam.rotation.x = dz > 0 ? -Math.atan2(topY / 2, Math.abs(dz)) : Math.atan2(topY / 2, Math.abs(dz));
  };
  flight(0, zStart, 2.2, 8);
  kit.box(0.95, 0.08, 0.8, stepMat, x + 0.55, topY / 2, zStart + 2.6, { outline: true });
  flight(topY / 2, zStart + 3.0, -2.4, 8);
  kit.box(0.95, 0.08, 0.8, stepMat, x + 0.55, topY, zStart + 0.4, { outline: true });
  // 护栏立柱
  kit.box(0.06, 0.5, 0.06, stepMat, x + 0.95, topY / 2, zStart + 2.2, { outline: false });
  kit.box(0.06, 0.5, 0.06, stepMat, x + 0.95, 0, zStart + 2.2, { outline: false });
}
