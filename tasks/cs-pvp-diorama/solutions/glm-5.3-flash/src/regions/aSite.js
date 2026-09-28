import * as THREE from "three";
import { C, toon, std, corrugatedTex, concreteTex, graffitiTex, stencilTex, bulletHolesTex } from "../palette.js";
import { rack, forklift, crateStack, sacks, sortTable, cardboardPile, pallet, dumpster, acUnit, ladder } from "../props.js";

const WALL_H = 4.6;
const X0 = -14.5, X1 = -5, Z0 = -9.2, Z1 = -1.8; // 仓库范围

// A 炸弹安放区（西北废弃仓库）
export function buildASite(kit) {
  const wallMat = toon(0xffffff, { map: concreteTex(15, "#7e848c") });
  wallMat.map.repeat.set(2.2, 1.4);
  const innerMat = toon(0x6d747c);

  // 地坪
  kit.box(X1 - X0, 0.1, Z1 - Z0, toon(0x6f757d), (X0 + X1) / 2, 0, (Z0 + Z1) / 2, { outline: false });

  // 南墙（正面，中间为卷帘门开口）
  kit.box(1.2, WALL_H, 0.45, wallMat, X0 + 0.6, 0, Z1, { outline: true });
  kit.box(2.6, WALL_H, 0.45, wallMat, -6.3, 0, Z1, { outline: true });
  kit.box(6, 1.2, 0.45, wallMat, -10.5, 3.4, Z1, { outline: true }); // 门楣
  // 侧门（东侧板墙）
  kit.box(0.45, WALL_H, 1.3, wallMat, X1, 0, Z0 + 1.55, { outline: true });
  kit.box(0.45, WALL_H, 3.2, wallMat, X1, 0, Z0 + 4.4, { outline: true });
  kit.box(0.45, WALL_H, 1.6, wallMat, X1, 0, Z1 - 0.8, { outline: true });
  kit.box(0.45, 1.6, 1.2, wallMat, X1, 3.0, Z0 + 3.3, { outline: true }); // 侧门楣
  // 西墙与北墙
  kit.box(0.45, WALL_H, Z1 - Z0, wallMat, X0, 0, (Z0 + Z1) / 2, { outline: true });
  kit.box(X1 - X0, WALL_H, 0.45, wallMat, (X0 + X1) / 2, 0, Z0, { outline: true });

  // 木板封窗（南墙右段两扇 + 东墙一扇）
  boardedWindow(kit, -6.3, 1.7, Z1 + 0.24, 0);
  boardedWindow(kit, -13.9, 1.7, Z1 + 0.24, 0.15);
  boardedWindow(kit, X1 - 0.24, 1.6, Z0 + 6.6, Math.PI / 2);

  // 卷起一半的生锈卷帘门（震动特效对象）
  const shutter = kit.group(-10.5, 0, Z1 - 0.05);
  const sheetMat = toon(0xffffff, { map: corrugatedTex(21, "#7a5a40", false) });
  kit.box(6, 1.8, 0.09, sheetMat, 0, 1.7, 0, { outline: true });
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 5.9, 12), sheetMat);
  roll.rotation.z = Math.PI / 2;
  roll.position.set(0, 3.62, 0);
  roll.castShadow = true;
  shutter.add(roll);
  kit.end();
  shutter.position.set(-10.5, 0, Z1 - 0.05);

  // 屋顶 + 女儿墙 + 檐沟
  kit.box(X1 - X0 + 0.7, 0.3, Z1 - Z0 + 0.7, toon(0x565c63), (X0 + X1) / 2, WALL_H, (Z0 + Z1) / 2, { outline: true });
  kit.box(0.25, 0.5, Z1 - Z0 + 0.7, wallMat, X0 - 0.1, WALL_H + 0.3, (Z0 + Z1) / 2, { outline: false });
  kit.box(0.25, 0.5, Z1 - Z0 + 0.7, wallMat, X1 + 0.1, WALL_H + 0.3, (Z0 + Z1) / 2, { outline: false });
  kit.box(X1 - X0 + 0.7, 0.5, 0.25, wallMat, (X0 + X1) / 2, WALL_H + 0.3, Z0 - 0.1, { outline: false });
  kit.box(X1 - X0 + 0.7, 0.5, 0.25, wallMat, (X0 + X1) / 2, WALL_H + 0.3, Z1 + 0.1, { outline: false });
  // 檐口排水沟（南缘，滴水特效锚点）
  const gutterS = kit.box(0.34, 0.16, Z1 - Z0, toon(0x6a4a28), X0 + 0.4, WALL_H + 0.28, Z1 + 0.32, { outline: false });

  // 屋顶设备
  acUnit(kit, -8.4, WALL_H + 0.3, -5.4, 0.4);
  const vent = kit.cyl(0.22, 0.3, 0.7, 8, toon(0x5a626a), -12.2, WALL_H + 0.3, -7.6);

  // 承重柱（经典 peek 位）
  kit.box(0.95, WALL_H, 0.95, innerMat, -10.4, 0, -5.4, { outline: true });

  // 五层重型货架 ×2
  rack(kit, X0 + 1.05, 0, -4.4, Math.PI / 2);
  rack(kit, X0 + 1.05, 0, -7.3, Math.PI / 2);

  // 叉车、木箱、麻袋、分拣台
  forklift(kit, -7.6, 0.1, -3.4, -0.6);
  crateStack(kit, -13.1, 0.1, -2.9, 0.3);
  sacks(kit, -8.9, 0.1, -8.2, 6);
  sortTable(kit, -6.3, 0.1, -8.4, Math.PI / 2);
  cardboardPile(kit, -11.9, 0.1, -2.7, 3);
  pallet(kit, -8.1, 0.1, -2.7, 0.2);
  pallet(kit, -12.6, 0.1, -6.2, 1.2);

  // 铁皮阁楼 + 垂直铁梯
  const mezY = 2.6;
  kit.box(1.6, 0.16, 2.3, toon(0x5a626a), -5.85, mezY, -7.7, { outline: true });
  for (const [px, pz] of [[-6.5, -8.7], [-6.5, -6.7], [-5.3, -8.7]]) {
    kit.box(0.12, mezY, 0.12, toon(0x4a525a), px, 0, pz, { outline: false });
  }
  // 阁楼护栏
  kit.box(1.6, 0.5, 0.06, toon(0x4a525a), -5.85, mezY + 0.16, -6.58, { outline: false });
  kit.box(0.06, 0.5, 2.3, toon(0x4a525a), -5.18, mezY + 0.16, -7.7, { outline: false });
  ladder(kit, -6.05, 0.1, -6.4, mezY, Math.PI, 0.06);

  // 阁楼小窗（玻璃）
  kit.box(0.06, 0.9, 1.0, std(C.glass, { roughness: 0.2, transparent: true, opacity: 0.4 }), X1 - 0.22, mezY + 0.75, -7.7, { outline: false });

  // 后场半掩门 + 门缝红光
  kit.box(0.12, 2.2, 1.1, toon(0x4e5860), X0 + 0.1, 0, -5.6, { outline: true });
  const doorLeaf = kit.box(0.08, 2.1, 1.0, toon(0x465058), X0 + 0.3, 0, -6.0, { ry: 0.5, outline: true });
  kit.box(0.05, 1.9, 0.08, std(0xff3838, { emissive: 0xff2828, emissiveIntensity: 2.2 }), X0 + 0.24, 0.1, -5.6, { cast: false, outline: false });

  // 外侧墙边设备
  dumpster(kit, -15.4, 0, -6.9, Math.PI / 2, 0x3d6248);
  acUnit(kit, -15.35, 0, -3.6, Math.PI / 2);
  kit.box(1.5, 0.9, 0.08, toon(0x5a626a), -15.35, 0, -2.1, { ry: Math.PI / 2, outline: true });
  kit.decal(stencilTex("A", "#dfe5ea", 256, 256, "bold 190px Arial Black"), 0.8, 0.8, -15.38, 1.55, -2.1, { ry: Math.PI / 2 });

  // 涂鸦与弹孔
  kit.decal(graffitiTex("NO WAY", 77, "#8a9aac"), 2.4, 1.2, -6.4, 1.7, Z1 + 0.25, { opacity: 0.5 });
  kit.decal(graffitiTex("KZ-07", 79, "#9ab0be"), 2.6, 1.3, X0 - 0.25, 2.2, -7.2, { ry: -Math.PI / 2 });
  kit.decal(bulletHolesTex(103, 12), 2.2, 2.2, X1 + 0.26, 1.6, -6.6, { ry: Math.PI / 2 });
  kit.decal(stencilTex("CA 1042", "#9aa4ae", 512, 96, "bold 64px Consolas"), 3.0, 0.56, -10.5, 4.1, Z0 - 0.26, { ry: Math.PI, opacity: 0.55 });

  return { shutter, vent, gutterS, wallZ0: Z0, wallZ1: Z1, wallX0: X0, wallX1: X1, wallH: WALL_H };
}

function boardedWindow(kit, x, y, z, ry) {
  const g = kit.group(x, y, z);
  kit.box(1.3, 1.1, 0.08, std(0x101820, { roughness: 0.2, transparent: true, opacity: 0.85 }), 0, 0, 0, { outline: false });
  kit.box(1.5, 0.22, 0.06, toon(0x6a5232), 0, 0.18, 0.09, { rz: 0.28, outline: false });
  kit.box(1.5, 0.22, 0.06, toon(0x7a5f3a), 0, -0.14, 0.09, { rz: -0.34, outline: false });
  g.rotation.y = ry;
  kit.end();
  return g;
}
