// 第三人称角色：分段人形 + 双骨骼手臂 IK 握枪；步行、蹲伏、瞄准俯仰、换弹、死亡均由实际状态驱动。
import * as THREE from "three";
import type { Actor } from "../game/actor";
import { bakeMeshes, mergedGun } from "./guns";

const TEAM_LOOK = [
  { cloth: 0x3a3430, vest: 0x1f1f1d, band: 0xc0392b, head: 0x2a2624, skin: 0xb88a6a }, // 潜伏者：深色便装 + 红臂章 + 头巾
  { cloth: 0x3f5068, vest: 0x2b3442, band: 0x2e86de, head: 0x33404f, skin: 0xc49a7c }, // 保卫者：蓝灰作训服 + 蓝臂章 + 头盔
];

const G = {
  thigh: new THREE.CapsuleGeometry(0.085, 0.3, 3, 8).translate(0, -0.23, 0),
  shin: new THREE.CapsuleGeometry(0.07, 0.32, 3, 8).translate(0, -0.23, 0),
  boot: new THREE.BoxGeometry(0.13, 0.1, 0.27).translate(0, -0.48, -0.05),
  pelvis: new THREE.BoxGeometry(0.36, 0.2, 0.22),
  torso: new THREE.BoxGeometry(0.44, 0.52, 0.24).translate(0, 0.28, 0),
  vest: new THREE.BoxGeometry(0.47, 0.36, 0.28).translate(0, 0.3, 0),
  pouch: new THREE.BoxGeometry(0.1, 0.12, 0.06),
  neck: new THREE.CylinderGeometry(0.06, 0.07, 0.1, 8),
  head: new THREE.SphereGeometry(0.115, 14, 10),
  helmet: new THREE.SphereGeometry(0.135, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
  wrap: new THREE.CylinderGeometry(0.122, 0.12, 0.09, 12),
  mask: new THREE.BoxGeometry(0.16, 0.08, 0.05),
  upper: new THREE.CapsuleGeometry(0.06, 0.2, 3, 8),
  fore: new THREE.CapsuleGeometry(0.05, 0.19, 3, 8),
  band: new THREE.CylinderGeometry(0.068, 0.068, 0.06, 8),
  hand: new THREE.BoxGeometry(0.08, 0.09, 0.1),
  marker: new THREE.ConeGeometry(0.09, 0.16, 3).rotateX(Math.PI),
};

const UPPER = 0.3, FORE = 0.29;
const FLASH_GEO = new THREE.SphereGeometry(0.07, 6, 4);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _e = new THREE.Vector3(), _d = new THREE.Vector3(), _p = new THREE.Vector3();

interface Rig {
  root: THREE.Group;
  hips: THREE.Group;
  legs: { thigh: THREE.Group; shin: THREE.Group }[];
  torso: THREE.Group;
  head: THREE.Group;
  aim: THREE.Group;
  arms: { upper: THREE.Mesh; fore: THREE.Mesh; hand: THREE.Mesh }[];
  gunHolder: THREE.Group;
  gunId: string;
  guns: Map<string, THREE.Mesh>;
  flash: THREE.Mesh;
  marker: THREE.Mesh;
  phase: number;
  flashT: number;
}

export class Characters {
  readonly group = new THREE.Group();
  private rigs = new Map<number, Rig>();
  private mat: THREE.MeshStandardMaterial;
  private markerMats: THREE.Material[];
  private flashMat: THREE.MeshBasicMaterial;
  private geo = new Map<string, THREE.BufferGeometry>();

  constructor(private shadows: boolean) {
    // 每个角色段合并为一个顶点色网格：全部角色共用一个材质
    this.mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.78, metalness: 0.06 });
    this.markerMats = TEAM_LOOK.map((l) => new THREE.MeshBasicMaterial({ color: l.band, depthTest: false, transparent: true, opacity: 0.9 }));
    this.flashMat = new THREE.MeshBasicMaterial({ color: 0xffd28a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
  }

  /** 按阵营缓存的分段几何：parts 为 [几何, 颜色, x, y, z] */
  private seg(key: string, parts: [THREE.BufferGeometry, number, number, number, number][]): THREE.BufferGeometry {
    let g = this.geo.get(key);
    if (g) return g;
    const tmp = new THREE.Group();
    for (const [pg, col, x, y, z] of parts) {
      const m = new THREE.Mesh(pg, new THREE.MeshStandardMaterial({ color: col }));
      m.position.set(x, y, z);
      tmp.add(m);
    }
    g = bakeMeshes(tmp);
    tmp.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) (m.material as THREE.Material).dispose(); });
    this.geo.set(key, g);
    return g;
  }

  private build(a: Actor): Rig {
    const L = TEAM_LOOK[a.team], t = a.team;
    const mk = (g: THREE.BufferGeometry, cast = true) => {
      const o = new THREE.Mesh(g, this.mat);
      o.castShadow = this.shadows && cast;
      return o;
    };
    const root = new THREE.Group();
    const hips = new THREE.Group();
    hips.position.y = 0.95;
    root.add(hips);
    hips.add(mk(this.seg(`pelvis${t}`, [[G.pelvis, L.cloth, 0, 0, 0]])));
    const thighG = this.seg(`thigh${t}`, [[G.thigh, L.cloth, 0, 0, 0]]);
    const shinG = this.seg(`shin${t}`, [[G.shin, L.cloth, 0, 0, 0], [G.boot, 0x1a1714, 0, 0, 0]]);
    const legs = [-1, 1].map((s) => {
      const thigh = new THREE.Group();
      thigh.position.set(s * 0.1, -0.05, 0);
      thigh.add(mk(thighG));
      const shin = new THREE.Group();
      shin.position.y = -0.46;
      shin.add(mk(shinG));
      thigh.add(shin);
      hips.add(thigh);
      return { thigh, shin };
    });
    const torso = new THREE.Group();
    torso.position.y = 0.05;
    hips.add(torso);
    torso.add(mk(this.seg(`torso${t}`, [
      [G.torso, L.cloth, 0, 0, 0], [G.vest, L.vest, 0, 0, 0],
      [G.pouch, L.vest, -0.12, 0.24, -0.17], [G.pouch, L.vest, 0, 0.24, -0.17], [G.pouch, L.vest, 0.12, 0.24, -0.17],
    ])));
    const head = new THREE.Group();
    head.position.y = 0.62;
    torso.add(head);
    head.add(mk(this.seg(`head${t}`, [
      [G.neck, L.skin, 0, -0.08, 0], [G.head, L.skin, 0, 0, 0],
      t === 1 ? [G.helmet, L.head, 0, 0.02, 0] : [G.wrap, L.head, 0, 0.05, 0],
      [G.mask, t === 0 ? L.head : L.vest, 0, -0.04, -0.1],
    ])));
    const aim = new THREE.Group();
    root.add(aim);
    const gunHolder = new THREE.Group();
    aim.add(gunHolder);
    const flash = new THREE.Mesh(FLASH_GEO, this.flashMat);
    flash.visible = false;
    aim.add(flash);
    const upperG = this.seg(`upper${t}`, [[G.upper, L.cloth, 0, 0, 0]]);
    const bandG = this.seg(`upperBand${t}`, [[G.upper, L.cloth, 0, 0, 0], [G.band, L.band, 0, 0.045, 0]]);
    const foreG = this.seg(`fore${t}`, [[G.fore, L.cloth, 0, 0, 0]]);
    const handG = this.seg("hand", [[G.hand, 0x1c1c1c, 0, 0, 0]]);
    const arms = [0, 1].map((i) => {
      const upper = mk(i === 1 ? bandG : upperG), fore = mk(foreG), hand = mk(handG, false);
      root.add(upper, fore, hand);
      return { upper, fore, hand };
    });
    const marker = new THREE.Mesh(G.marker, this.markerMats[t]);
    marker.renderOrder = 10;
    marker.visible = false;
    root.add(marker);
    this.group.add(root);
    return { root, hips, legs, torso, head, aim, arms, gunHolder, gunId: "", guns: new Map(), flash, marker, phase: 0, flashT: 0 };
  }

  /** 每帧：按角色实际状态摆姿势 */
  update(actors: readonly Actor[], viewer: Actor | null, dt: number, time: number): void {
    for (const a of actors) {
      let r = this.rigs.get(a.id);
      if (!r) { r = this.build(a); this.rigs.set(a.id, r); }
      const deadFor = a.alive ? -1 : time - a.deathT;
      const visible = a !== viewer && (a.alive || (a.deathT > 0 && deadFor < 6));
      r.root.visible = visible;
      if (!visible) continue;
      this.pose(r, a, dt, deadFor);
      r.marker.visible = !!viewer && a.alive && a.team === viewer.team;
    }
  }

  private pose(r: Rig, a: Actor, dt: number, deadFor: number): void {
    const m = a.motor, c = a.crouch;
    r.root.position.set(a.x, a.y, a.z);
    r.root.rotation.set(0, a.yaw, 0);
    // 蹲伏：髋部下降，膝关节弯曲
    const hipY = 0.95 - c * 0.4;
    r.hips.position.y = hipY;
    const bend = Math.acos(Math.min(1, (hipY + 0.02) / 0.93)) * 1.0;
    const sp = m.grounded ? m.horizSpeed : 0;
    r.phase += sp * dt * (c > 0.5 ? 3.2 : 2.3);
    const swing = Math.min(1, sp / 4.5) * (c > 0.5 ? 0.35 : 0.55);
    r.legs.forEach((l, i) => {
      const s = Math.sin(r.phase + i * Math.PI);
      l.thigh.rotation.x = -bend * (1 + (i ? 0.1 : -0.1)) * 1.05 + s * swing;
      l.shin.rotation.x = bend * 1.9 + Math.max(0, -s) * swing * 1.3;
    });
    if (!m.grounded) { r.legs[0].thigh.rotation.x -= 0.4; r.legs[0].shin.rotation.x += 0.7; r.legs[1].thigh.rotation.x -= 0.15; }
    r.hips.position.y += Math.abs(Math.sin(r.phase)) * swing * 0.05;
    r.torso.rotation.x = -c * 0.25 - Math.min(0.12, sp * 0.02);
    r.head.rotation.x = c * 0.2 + a.pitch * 0.35;
    // 瞄准枢轴：胸口高度，随俯仰旋转
    const shY = hipY + 0.47 - c * 0.02;
    r.aim.position.set(0.02, shY - 0.07, -0.04);
    r.aim.rotation.set(a.pitch + a.kickP * 0.5, 0, 0);
    this.gun(r, a);
    const inv = a.inv, gun = inv.gun;
    // 手部目标（枢轴坐标系）
    const onePistol = inv.slot === 1, knife = inv.slot === 2, nade = inv.slot === 3;
    const right: [number, number, number] = knife || nade ? [0.2, -0.1, -0.3] : [0.1, -0.06, -0.22];
    let left: [number, number, number] = onePistol ? [0.06, -0.08, -0.27] : knife || nade ? [-0.2, -0.36, -0.05] : [0.02, -0.02, -0.5];
    if (gun?.reloading) {
      const k = gun.reloadProgress, dip = Math.sin(Math.min(1, k * 1.25) * Math.PI);
      left = [0.03, -0.05 - dip * 0.28, -0.32 + dip * 0.12];
      r.aim.rotation.x -= dip * 0.35;
      r.aim.rotation.z = dip * 0.25;
    } else r.aim.rotation.z = 0;
    if (inv.meleeT >= 0) right[2] -= Math.sin(Math.min(1, inv.meleeT * 3) * Math.PI) * 0.3;
    r.aim.updateMatrix();
    for (let i = 0; i < 2; i++) {
      // 局部 +X 为角色右侧
      const sh = _a.set(i === 0 ? 0.2 : -0.2, shY, 0.02);
      const tgt = _b.fromArray(i === 0 ? right : left).applyMatrix4(r.aim.matrix);
      this.limb(r.arms[i], sh, tgt, i === 0 ? 1 : -1);
    }
    // 枪口焰
    r.flashT -= dt;
    r.flash.visible = r.flashT > 0;
    // 死亡：向后倒地并在 4 秒后沉入甲板
    if (deadFor >= 0) {
      const k = Math.min(1, deadFor / 0.55);
      r.root.rotation.x = k * k * 1.45;
      r.root.position.y = a.y + 0.08 * k - Math.max(0, deadFor - 4) * 0.4;
      r.legs.forEach((l) => { l.thigh.rotation.x = -0.4 * k; l.shin.rotation.x = 0.9 * k; });
      r.marker.visible = false;
    }
    r.marker.position.set(0, 2.15 - c * 0.5, 0);
  }

  private limb(arm: Rig["arms"][number], sh: THREE.Vector3, tgt: THREE.Vector3, side: number): void {
    _d.subVectors(tgt, sh);
    let d = _d.length();
    d = Math.min(d, UPPER + FORE - 1e-3);
    _d.normalize();
    // 肘部：沿主方向前进 a，再向外下侧偏移 h
    const along = (UPPER * UPPER - FORE * FORE + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(0, UPPER * UPPER - along * along));
    const pole = _p.set(side * 0.7, -1, 0.2).normalize();
    pole.addScaledVector(_d, -pole.dot(_d)).normalize();
    _e.copy(sh).addScaledVector(_d, along).addScaledVector(pole, h);
    const hand = _b.copy(sh).addScaledVector(_d, d);
    place(arm.upper, sh, _e);
    place(arm.fore, _e, hand);
    arm.hand.position.copy(hand);
    arm.hand.quaternion.copy(arm.fore.quaternion);
  }

  private gun(r: Rig, a: Actor): void {
    const inv = a.inv;
    const id = inv.slot === 0 ? inv.primary.def.id : inv.slot === 1 ? "deagle" : inv.slot === 2 ? "knife" : "he";
    if (r.gunId === id) return;
    r.gunId = id;
    for (const g of r.guns.values()) g.visible = false;
    let g = r.guns.get(id);
    if (!g) {
      g = new THREE.Mesh(mergedGun(id), this.mat);
      g.castShadow = this.shadows;
      g.position.set(0.1, -0.03, -0.14);
      r.gunHolder.add(g);
      r.guns.set(id, g);
    }
    g.visible = true;
    r.flash.position.set(0.1, 0.0, id === "awm" ? -1.2 : id === "deagle" ? -0.42 : -0.86);
  }

  /** 由开火事件触发的枪口焰 */
  muzzleFlash(id: number): void {
    const r = this.rigs.get(id);
    if (r) r.flashT = 0.05;
  }

  /** 新一局：移除全部角色模型 */
  clear(): void {
    for (const r of this.rigs.values()) this.group.remove(r.root);
    this.rigs.clear();
  }
}

const _q = new THREE.Vector3();
export function place(m: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3): void {
  m.position.lerpVectors(a, b, 0.5);
  _q.subVectors(b, a).normalize();
  m.quaternion.setFromUnitVectors(Y_AXIS, _q);
}
