import * as THREE from "three";
import { C, toon, std, concreteTex, graffitiTex, bulletHolesTex, stencilTex } from "../palette.js";
import { crate, crateStack, roadSign } from "../props.js";

const GATE_Z = -0.75;
const WALL_H = 3.8;

// 中路主通道：双开铁门、射击孔、岗亭、矮墙
export function buildMidLane(kit, glassStreak) {
  const wallMat = toon(0xffffff, { map: concreteTex(25, "#767c84") });
  wallMat.map.repeat.set(1.2, 1.2);

  // 铁门两侧混凝土高墙
  kit.box(1.9, WALL_H, 0.55, wallMat, -2.55, 0, GATE_Z, { outline: true });
  kit.box(1.9, WALL_H, 0.55, wallMat, 2.55, 0, GATE_Z, { outline: true });
  // 墙顶压顶
  kit.box(2.0, 0.18, 0.65, toon(0x62686f), -2.55, WALL_H, GATE_Z, { outline: false });
  kit.box(2.0, 0.18, 0.65, toon(0x62686f), 2.55, WALL_H, GATE_Z, { outline: false });

  // 高位射击孔（穿透暗盒）
  for (const wx of [-2.55, 2.55]) {
    kit.box(0.6, 0.24, 0.62, std(0x05070a, { roughness: 1 }), wx, 2.45, GATE_Z, { cast: false, outline: false });
  }

  // 双开厚重铁门（一扇半开 ~55°，一扇关闭）
  const doorMat = toon(0x3d4650);
  const hingeL = kit.group(-1.62, 0, GATE_Z);
  kit.box(1.78, 3.0, 0.12, doorMat, 0.89, 0, 0, { outline: true });
  hingeL.rotation.y = 0.96;
  for (const ry2 of [1.0, 2.0]) {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.04), toon(0x333c46));
    rib.position.set(0.89, ry2, 0.08);
    rib.castShadow = true;
    hingeL.add(rib);
  }
  kit.end();
  const leafR = kit.box(1.78, 3.0, 0.12, doorMat, 2.51, 0, GATE_Z, { outline: true });
  // 门肋
  kit.box(1.7, 0.12, 0.04, toon(0x333c46), 2.51, 1.0, GATE_Z + 0.08, { outline: false });
  kit.box(1.7, 0.12, 0.04, toon(0x333c46), 2.51, 2.0, GATE_Z + 0.08, { outline: false });

  // 涂鸦与弹孔（对枪缝隙两侧密集）
  kit.decal(graffitiTex("RUSH", 81, "#b04a3a"), 1.6, 1.6, -2.55, 1.4, GATE_Z + 0.31, {});
  kit.decal(graffitiTex("HOLD", 83, "#6a8aa8"), 1.6, 1.6, 2.55, 1.6, GATE_Z - 0.31, { ry: Math.PI });
  kit.decal(bulletHolesTex(107, 14), 1.8, 1.8, -1.7, 1.5, GATE_Z + 0.31, {});
  kit.decal(bulletHolesTex(109, 10), 1.6, 1.6, 3.4, 1.7, GATE_Z - 0.31, { ry: Math.PI });

  // CT 侧矮墙掩体 + 木箱 + 废弃路牌
  kit.box(3.4, 1.1, 0.4, wallMat, -0.2, 0, 6.5, { outline: true });
  crate(kit, 0.9, 0, 7.15, 1.0, 0.4);
  crateStack(kit, -1.6, 0, 7.2, -0.3);
  roadSign(kit, -2.6, 0, 7.3, 0.5);

  // 中路两侧岗亭（控制台 + 座椅 + 雨尘玻璃）
  const streakTex = glassStreak;
  const boothL = booth(kit, -4.9, 0, -2.7, Math.PI / 2, streakTex);
  const boothR = booth(kit, 4.9, 0, -2.7, -Math.PI / 2, streakTex);

  // 墙根排水管与配电箱
  kit.cyl(0.07, 0.07, 3.6, 6, toon(0x4a525a), -3.62, 0, GATE_Z - 0.42);
  kit.box(0.5, 0.7, 0.2, toon(0x556068), 3.62, 1.1, GATE_Z - 0.44, { outline: false });

  return { doorLeaf: hingeL, boothL, boothR };
}

function booth(kit, x, y, z, ry, streakTex) {
  const g = kit.group(x, y, z);
  kit.box(1.7, 2.5, 1.7, toon(0x6d747c), 0, 0, 0, { outline: true });
  kit.box(1.9, 0.14, 1.9, toon(0x565c63), 0, 2.5, 0, { outline: true });
  // 玻璃带（前后 + 两侧，雨痕滚动）
  const glassMat = std(C.glass, { roughness: 0.18, metalness: 0.1, transparent: true, opacity: 0.4, map: streakTex });
  for (const [w, d, px, pz, r] of [
    [1.3, 0.06, 0, 0.86, 0], [1.3, 0.06, 0, -0.86, 0],
    [0.06, 1.3, 0.86, 0, 0], [0.06, 1.3, -0.86, 0, 0],
  ]) {
    const gl = kit.box(w, 1.0, d, glassMat, px, 1.0, pz, { cast: false, outline: false });
  }
  // 室内控制台与座椅
  kit.box(1.2, 0.8, 0.4, toon(0x3a4148), 0, 0, -0.4, { outline: false });
  kit.box(0.5, 0.4, 0.3, toon(0x23282e), 0, 0.8, -0.42, { outline: false });
  kit.box(0.4, 0.5, 0.4, toon(0x3a4148), 0.2, 0, 0.3, { outline: false });
  // 门洞（背面）
  kit.box(0.7, 1.9, 0.06, std(0x05070a), 0, 0, 0.86, { cast: false, outline: false });
  g.rotation.y = ry;
  kit.end();
  return g;
}
