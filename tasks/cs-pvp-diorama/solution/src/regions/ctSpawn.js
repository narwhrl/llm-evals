import * as THREE from "three";
import { C, toon, std, concreteTex, graffitiTex, stencilTex, policeEmblemTex, cordonBannerTex } from "../palette.js";
import { barrier, jerseyBarrier, riotShield, crate, utilityPole, wheelieBin } from "../props.js";

const WALL_Z = 16.4;

// CT 阵营出生点（南侧警用封锁区）
export function buildCTSpawn(kit) {
  const wallMat = toon(0xffffff, { map: concreteTex(45, "#798087") });
  wallMat.map.repeat.set(4, 1.2);

  // 后方封闭围墙 + 警徽 + 警戒标语
  const backWall = kit.box(32, 3.2, 0.45, wallMat, 0, 0, WALL_Z, { outline: true });
  kit.box(32.2, 0.25, 0.6, toon(0x62686f), 0, 3.2, WALL_Z, { outline: false });
  kit.decal(policeEmblemTex(), 2.6, 2.6, 0, 1.75, WALL_Z - 0.26, { ry: Math.PI });
  kit.decal(cordonBannerTex(), 10.5, 1.3, 0, 2.45, WALL_Z - 0.26, { ry: Math.PI });
  kit.decal(stencilTex("CT SPAWN", "#cfd6dc", 512, 96, "bold 76px Consolas"), 3.4, 0.64, -10.5, 0.8, WALL_Z - 0.26, { ry: Math.PI });
  kit.decal(graffitiTex("DEFEND", 87, "#7a94b0"), 3.0, 1.5, 9.5, 1.3, WALL_Z - 0.26, { ry: Math.PI });

  // 警用面包车（左）
  const van = policeVan(kit, -11.2, 0, 12.6, Math.PI / 2 - 0.12);

  // 拒马与盾牌防御阵型
  barrier(kit, -6.6, 0, 12.5, 0.1);
  barrier(kit, -4.6, 0, 12.3, -0.15);
  barrier(kit, -2.7, 0, 12.55, 0.05);
  riotShield(kit, -5.6, 0, 13.4, 0.4);
  riotShield(kit, -3.7, 0, 13.5, -0.3);
  jerseyBarrier(kit, -8.9, 0, 12.2, 0.08);
  jerseyBarrier(kit, -14.6, 0, 12.1, -0.1);

  // 备用防弹衣与头盔模型箱
  crate(kit, -6.2, 0, 15.5, 1.05, 0.3);
  crate(kit, -5.0, 0, 15.2, 0.9, -0.2);
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), toon(0x3a4148));
  helmet.position.set(-5.0, 0.98, 15.2);
  helmet.castShadow = true;
  kit.root.add(helmet);
  crate(kit, -14.8, 0, 15.4, 1.1, 0.15);

  // 混凝土高台（右）+ 室外楼梯
  const platX = 13.2, platZ = 13.35;
  kit.box(6.6, 2.3, 5.8, wallMat, platX, 0, platZ, { outline: true });
  kit.box(6.7, 0.2, 5.9, toon(0x62686f), platX, 2.3, platZ, { outline: false });
  // 西侧楼梯
  const steps = 6;
  for (let i = 0; i < steps; i++) {
    kit.box(1.5, 2.3 - (i * 2.3) / steps, 0.42, toon(0x6d747c), platX - 3.3 - 0.75, 0, platZ + 2.9 - i * 0.44, { outline: false });
  }
  kit.box(0.08, 0.9, 2.8, toon(0x4a525a), platX - 4.42, 0, platZ + 1.75, { outline: false });
  // 台侧警示涂装
  kit.decal(stencilTex("SECTOR C", "#c8b04a", 512, 96, "bold 66px Consolas"), 4.2, 0.8, platX, 1.7, platZ - 2.95, {});
  kit.decal(graffitiTex("OVERWATCH", 89, "#9ab0be"), 3.0, 1.5, platX - 3.32, 1.8, platZ + 0.6, { ry: -Math.PI / 2 });

  // 台面设备（架枪观察位陈设）
  jerseyBarrier(kit, 14.9, 2.5, 11.6, 0.12);
  jerseyBarrier(kit, 13.4, 2.5, 11.5, -0.08);
  crate(kit, 11.6, 2.5, 12.2, 1.0, 0.5);
  crate(kit, 12.1, 3.32, 12.05, 0.8, 0.9);

  // 东侧_lane 出口杂物
  wheelieBin(kit, 16.2, 0, 8.6, 0.4, 0x2c5a8c);
  jerseyBarrier(kit, 15.4, 0, 10.2, 1.35);

  // 电线杆（西侧）
  const pole = utilityPole(kit, -15.7, 0, 12.4, 6.6);

  return { van, poleTop: pole, platX, platZ };
}

function policeVan(kit, x, y, z, ry) {
  const g = kit.group(x, y, z);
  kit.box(2.0, 0.35, 5.2, toon(0x2c3138), 0, 0.35, 0, { outline: false });
  kit.box(2.05, 1.75, 3.4, toon(C.vanWhite), 0, 0.7, -0.75, { outline: true });
  kit.box(2.0, 1.35, 1.5, toon(C.vanWhite), 0, 0.7, 1.85, { outline: true });
  // 风挡与侧窗
  kit.box(1.8, 0.6, 0.06, std(C.glass, { roughness: 0.2, transparent: true, opacity: 0.5 }), 0, 1.45, 2.58, { rx: -0.12, cast: false, outline: false });
  kit.box(0.06, 0.5, 1.2, std(C.glass, { roughness: 0.2, transparent: true, opacity: 0.5 }), 1.03, 1.35, 1.8, { cast: false, outline: false });
  kit.box(0.06, 0.5, 1.2, std(C.glass, { roughness: 0.2, transparent: true, opacity: 0.5 }), -1.03, 1.35, 1.8, { cast: false, outline: false });
  // 车顶警灯底座（灯珠由特效点亮）
  kit.box(1.2, 0.12, 0.3, toon(0x2c3138), 0, 2.45, 1.75, { outline: false });
  const beaconR = kit.box(0.5, 0.16, 0.26, std(0xff4040, { emissive: 0xff2828, emissiveIntensity: 1.2 }), -0.32, 2.57, 1.75, { cast: false, outline: false });
  const beaconB = kit.box(0.5, 0.16, 0.26, std(0x4060ff, { emissive: 0x2848ff, emissiveIntensity: 0.6 }), 0.32, 2.57, 1.75, { cast: false, outline: false });
  // 侧身涂装
  kit.decal(policeEmblemTex(), 1.1, 1.1, 1.04, 1.35, -0.8, { ry: Math.PI / 2 });
  kit.box(2.07, 0.28, 3.42, toon(0x27407c), 0, 1.05, -0.75, { cast: false, outline: false });
  // 车轮
  const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.26, 12);
  for (const [px, pz] of [[1.0, 1.7], [-1.0, 1.7], [1.0, -1.4], [-1.0, -1.4]]) {
    const w = new THREE.Mesh(wheelGeo, toon(0x1c1e22));
    w.position.set(px, 0.38, pz);
    w.rotation.x = Math.PI / 2;
    w.castShadow = true;
    g.add(w);
  }
  // 保险杠
  kit.box(2.1, 0.2, 0.18, toon(0x2c3138), 0, 0.45, 2.66, { outline: false });
  g.rotation.y = ry;
  kit.end();
  return { group: g, beaconR, beaconB };
}
