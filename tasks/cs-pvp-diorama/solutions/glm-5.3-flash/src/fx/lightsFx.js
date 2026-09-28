import * as THREE from "three";
import { C, std, toon } from "../palette.js";

function hash(n) {
  return Math.abs(Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1;
}

// 闪烁：多数时间稳定，偶发短促变暗
function flicker(t, seed, chance = 0.82, cell = 9) {
  const c = Math.floor(t * cell);
  return hash(c + seed) < chance ? 1 : 0.25 + hash(c * 3.7 + seed) * 0.5;
}

// 全部动态光源与灯珠
export function createLightsFx(kit, refs, softDot) {
  const fx = { items: [] };

  // 仓库冷白应急顶灯 ×2
  for (const [lx, lz] of [[-8.2, -4.4], [-12.2, -6.8]]) {
    kit.box(0.7, 0.08, 0.24, std(0xe8f2ff, { emissive: 0xcfe4ff, emissiveIntensity: 2.4 }), lx, 4.28, lz, { cast: false, outline: false });
    const s = kit.spot(C.lampCold, 320, 13, 0.85, 0.55, lx, 4.2, lz, lx, 0, lz, { cast: lx < -10, decay: 1.7 });
    s.userData.base = 320;
    kit.halo(0xcfe4ff, 1.6, lx, 4.05, lz, softDot, 0.32);
    fx.items.push((t) => { s.intensity = s.userData.base * flicker(t, lx, 0.94, 5); });
  }

  // B 点转角暖黄路灯
  const lamp = refs.b.lamp;
  const lampWorld = new THREE.Vector3(5.2 + 1.2, 4.35, -0.6);
  const ls = kit.spot(C.lampWarm, 300, 15, 0.95, 0.6, lampWorld.x, lampWorld.y, lampWorld.z, lampWorld.x, 0.2, lampWorld.z, { decay: 1.8 });
  ls.userData.base = 300;
  const pl = kit.light(C.lampWarm, 14, 9, lampWorld.x, lampWorld.y - 0.3, lampWorld.z, { decay: 1.9 });
  fx.items.push((t) => {
    const f = flicker(t, 5.3, 0.78, 8);
    ls.intensity = ls.userData.base * f;
    pl.intensity = 14 * f;
    lamp.bulb.material = lamp.bulb.material; // 保持
    lamp.halo.material.opacity = 0.42 * f;
  });

  // 门卫室破损日光灯（更碎的闪烁）
  const tube = refs.b.tube;
  const gp = kit.light(0xffd9a0, 7, 5, 12.3, 2.5, -6.4, { decay: 1.8 });
  fx.items.push((t) => {
    const c = Math.floor(t * 13);
    const f = hash(c + 9.1) < 0.55 ? 0.15 + hash(c * 2.3) * 0.5 : 1;
    gp.intensity = 7 * f;
    tube.material.emissiveIntensity = 1.9 * f;
  });

  // 仓库后场门缝红光
  kit.light(0xff2828, 3.2, 4.5, -14.2, 1.0, -5.6, { decay: 2 });

  // 中路岗亭仪表灯
  kit.light(0x86c8ff, 3, 3.5, -4.9, 1.6, -2.7, { decay: 2 });
  kit.light(0x86c8ff, 3, 3.5, 4.9, 1.6, -2.7, { decay: 2 });

  // CT 警灯（缓慢明暗交替）
  const beaconR = refs.ct.van.beaconR;
  const beaconB = refs.ct.van.beaconB;
  const vanPos = new THREE.Vector3(-11.2, 2.75, 12.6);
  const plR = kit.light(C.lampRed, 10, 7, vanPos.x, vanPos.y, vanPos.z, { decay: 2.1 });
  const plB = kit.light(0x4060ff, 6, 6, vanPos.x + 0.6, vanPos.y, vanPos.z, { decay: 2.1 });
  fx.items.push((t) => {
    const w = Math.sin(t * 1.5);
    plR.intensity = 3 + Math.max(0, w) * 7;
    plB.intensity = 2 + Math.max(0, -w) * 4;
    beaconR.material.emissiveIntensity = 0.5 + Math.max(0, w) * 1.4;
    beaconB.material.emissiveIntensity = 0.3 + Math.max(0, -w) * 1.0;
  });

  // CT 高台探照灯（摇摆 + 轻微闪烁 + 可见光锥）
  const head = new THREE.Group();
  head.position.set(11.4, 2.5 + 1.15, 11.9);
  kit.root.add(head);
  kit.box(0.1, 1.15, 0.1, toon(0x3a4046), 11.4, 2.5, 11.9, { outline: false });
  const headBox = kit.box(0.5, 0.34, 0.4, toon(0x3a4046), 11.4, 3.55, 11.9, { outline: true });
  head.add(headBox);
  headBox.position.set(0, 0.2, 0);
  const lensMat = std(0xf4faff, { emissive: 0xeaf4ff, emissiveIntensity: 3.2 });
  const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.28), lensMat);
  lens.position.set(0, 0.2, 0.21);
  head.add(lens);
  const search = kit.spot(0xeaf4ff, 620, 30, 0.24, 0.45, 11.4, 3.75, 11.9, 4, 0, 4, { cast: false, decay: 1.4 });
  search.userData.base = 620;
  // 体积光锥（加色半透明）
  const coneGeo = new THREE.ConeGeometry(1.3, 8, 20, 1, true);
  const coneMat = new THREE.MeshBasicMaterial({
    color: 0xa8c4e0,
    transparent: true,
    opacity: 0.014,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const cone = new THREE.Mesh(coneGeo, coneMat);
  cone.renderOrder = 21;
  kit.root.add(cone);
  const target = new THREE.Vector3();
  fx.items.push((t) => {
    const yaw = Math.PI + Math.sin(t * 0.21) * 0.7 + Math.sin(t * 0.53) * 0.1;
    const pitch = -0.62 + Math.sin(t * 0.34) * 0.1;
    target.set(11.4 + Math.sin(yaw) * 8, Math.max(0.3, 3.75 + Math.tan(pitch) * 8), 11.9 + Math.cos(yaw) * 8);
    search.target.position.copy(target);
    search.intensity = search.userData.base * (0.9 + hash(Math.floor(t * 7)) * 0.1);
    head.lookAt(target);
    cone.position.copy(head.position);
    cone.quaternion.copy(head.quaternion);
    cone.rotateX(Math.PI / 2);
    cone.translateY(-4);
    coneMat.opacity = 0.01 + hash(Math.floor(t * 5)) * 0.014;
    lensMat.emissiveIntensity = 1.3 + hash(Math.floor(t * 7)) * 0.5;
  });

  function update(t) {
    for (const f of fx.items) f(t);
  }
  return { update };
}
