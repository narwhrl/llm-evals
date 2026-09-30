// 第一人称视模：独立场景与相机分层渲染；动作全部读取实际武器状态（切出、换弹进度、拉栓进度、近战与投掷计时）。
import * as THREE from "three";
import { GRENADE, GUNS, KNIFE } from "../config";
import type { Actor } from "../game/actor";
import { place } from "./characters";
import { buildGun, type GunModel } from "./guns";

const ARM = 0.4;
const HOLD: Record<string, [number, number, number]> = {
  ak: [0.17, -0.22, -0.52], m4: [0.17, -0.22, -0.52], mp5: [0.16, -0.2, -0.46], awm: [0.18, -0.25, -0.58],
  deagle: [0.15, -0.17, -0.34], knife: [0.21, -0.22, -0.36], he: [0.2, -0.2, -0.34], smoke: [0.2, -0.2, -0.34],
};
const _v = new THREE.Vector3(), _w = new THREE.Vector3(), _e = new THREE.Vector3(), _d = new THREE.Vector3(), _p = new THREE.Vector3();
const _off = new THREE.Vector3(), _pole = new THREE.Vector3(), _elbow = new THREE.Vector3(), _hand = new THREE.Vector3();
const smooth = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export class Viewmodel {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(66, 1, 0.01, 10);
  private holder = new THREE.Group();
  private guns = new Map<string, GunModel>();
  private cur: GunModel | null = null;
  private curId = "";
  private arms: { upper: THREE.Mesh; fore: THREE.Mesh; hand: THREE.Mesh }[] = [];
  private sleeve: THREE.MeshStandardMaterial;
  private flash: THREE.Sprite;
  private flashT = 0;
  private kick = 0;
  private land = 0;
  private phase = 0;
  private swayX = 0;
  private swayY = 0;
  private shells: { m: THREE.Mesh; v: THREE.Vector3; t: number }[] = [];
  private shellIdx = 0;
  private sun: THREE.DirectionalLight;
  visible = true;

  constructor(env: THREE.Texture | null) {
    this.scene.environment = env;
    this.scene.environmentIntensity = 0.6;
    this.scene.add(new THREE.HemisphereLight(0xe6f0ff, 0x4a4238, 1.4));
    this.sun = new THREE.DirectionalLight(0xfff1d6, 2.2);
    this.scene.add(this.sun, this.sun.target);
    this.scene.add(this.holder);
    this.sleeve = new THREE.MeshStandardMaterial({ color: 0x3a3430, roughness: 0.85 });
    const glove = new THREE.MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.65 });
    const cuff = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.8 });
    for (let i = 0; i < 2; i++) {
      const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.052, ARM - 0.1, 4, 10), this.sleeve);
      const fore = new THREE.Mesh(new THREE.CapsuleGeometry(0.043, ARM - 0.09, 4, 10), this.sleeve);
      const hand = new THREE.Group() as unknown as THREE.Mesh;
      const palm = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.085, 0.1), glove);
      const fingers = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 0.06), glove);
      fingers.position.set(0, 0.02, -0.06);
      fingers.rotation.x = 0.6;
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.05, 10), cuff);
      c.position.y = -0.07;
      hand.add(palm, fingers, c);
      this.scene.add(upper, fore, hand);
      this.arms.push({ upper, fore, hand });
    }
    const fc = document.createElement("canvas");
    fc.width = fc.height = 64;
    const g = fc.getContext("2d")!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,250,220,1)"); grd.addColorStop(0.25, "rgba(255,190,90,0.9)"); grd.addColorStop(1, "rgba(255,120,30,0)");
    g.fillStyle = grd;
    for (let i = 0; i < 6; i++) { g.save(); g.translate(32, 32); g.rotate((i / 6) * Math.PI); g.fillRect(-32, -4, 64, 8); g.restore(); }
    g.beginPath(); g.arc(32, 32, 14, 0, 7); g.fill();
    const ft = new THREE.CanvasTexture(fc);
    ft.colorSpace = THREE.SRGBColorSpace;
    this.flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: ft, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    this.flash.visible = false;
    this.scene.add(this.flash);
    const sg = new THREE.CylinderGeometry(0.005, 0.005, 0.022, 6);
    const sm = new THREE.MeshStandardMaterial({ color: 0xc9953a, roughness: 0.3, metalness: 0.9 });
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(sg, sm);
      m.visible = false;
      this.scene.add(m);
      this.shells.push({ m, v: new THREE.Vector3(), t: 0 });
    }
  }

  setTeam(team: 0 | 1): void {
    this.sleeve.color.setHex(team === 0 ? 0x3a3430 : 0x3f5068);
  }

  resize(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  onShot(weapon: string): void {
    this.kick = 1;
    this.flashT = weapon === "awm" ? 0.06 : 0.04;
    this.flash.material.rotation = Math.random() * Math.PI;
    if (this.cur && weapon !== "knife") {
      const s = this.shells[this.shellIdx++ % this.shells.length];
      s.m.position.copy(this.cur.eject).applyMatrix4(this.cur.root.matrixWorld);
      s.v.set(0.9 + Math.random() * 0.5, 0.9 + Math.random() * 0.4, 0.2 + Math.random() * 0.3);
      s.t = 0.7;
      s.m.visible = true;
    }
  }

  onLand(speed: number): void {
    this.land = Math.min(1, speed / 10);
  }

  /** 当前枪口在视模相机空间中的位置（供曳光起点换算） */
  muzzleLocal(out: THREE.Vector3): THREE.Vector3 {
    if (!this.cur) return out.set(0.2, -0.15, -0.8);
    return out.copy(this.cur.muzzle).applyMatrix4(this.cur.root.matrixWorld);
  }

  update(a: Actor, dt: number, t: number, lookDx: number, lookDy: number, bob: boolean, sunDirView: THREE.Vector3): void {
    const inv = a.inv;
    const id = inv.slot === 0 ? inv.primary.def.id : inv.slot === 1 ? "deagle" : inv.slot === 2 ? "knife" : inv.nadeSel;
    const scoped = inv.scope > 0;
    this.holder.visible = this.visible && !scoped && a.alive;
    for (const arm of this.arms) arm.upper.visible = arm.fore.visible = arm.hand.visible = this.holder.visible;
    this.sun.position.copy(sunDirView).multiplyScalar(5);
    if (id !== this.curId) this.swap(id);
    const gm = this.cur!;
    const r = gm.root;
    const base = HOLD[id] ?? HOLD.ak;
    const m = a.motor;
    // 状态量
    this.kick = Math.max(0, this.kick - dt * 9);
    this.land = Math.max(0, this.land - dt * 4);
    const sp = m.grounded ? Math.min(1, m.horizSpeed / 5) : 0;
    this.phase += m.horizSpeed * dt * 1.9 * (m.grounded ? 1 : 0);
    this.swayX = THREE.MathUtils.clamp(this.swayX * Math.exp(-dt * 10) - lookDx * 0.00012, -0.03, 0.03);
    this.swayY = THREE.MathUtils.clamp(this.swayY * Math.exp(-dt * 10) + lookDy * 0.00012, -0.03, 0.03);
    const b = bob ? 1 : 0.25;
    let px = base[0] + this.swayX + Math.sin(this.phase) * 0.011 * sp * b;
    let py = base[1] + this.swayY - Math.abs(Math.cos(this.phase)) * 0.009 * sp * b + Math.sin(t * 1.7) * 0.0025 - this.land * 0.035 - a.crouch * 0.01;
    let pz = base[2] + this.kick * (id === "awm" ? 0.09 : id === "deagle" ? 0.06 : 0.035);
    let rx = this.kick * (id === "deagle" ? 0.35 : id === "awm" ? 0.2 : 0.07), ry = this.swayX * 1.5, rz = 0;
    // 切出
    const dt0 = inv.drawTimeOf(inv.slot);
    const draw = dt0 > 0 ? inv.drawT / dt0 : 0;
    py -= draw * draw * 0.3; rx -= draw * 0.9;
    let left = _w.copy(gm.leftGrip), right = _v.set(0, -0.04, 0.01);
    const gun = inv.gun;
    if (gm.mag) gm.mag.position.y = gm.mag.userData.y0;
    if (gm.slide) gm.slide.position.z = -this.kick * 0.05;
    if (gun?.reloading && gm.mag) {
      const k = gun.reloadProgress, [ko, ki] = gun.def.reloadKeys;
      const out = smooth(ko - 0.12, ko, k), back = smooth(ki - 0.14, ki, k);
      gm.mag.position.y = gm.mag.userData.y0 - out * 0.3 + back * 0.3;
      gm.mag.visible = k < ko || k > ki - 0.14;
      const handOnMag = smooth(ko - 0.22, ko - 0.12, k) * (1 - smooth(ki, ki + 0.1, k));
      left = left.lerp(_p.copy(gm.mag.position).add(_off.set(0, -0.06, 0)), handOnMag);
      const tilt = Math.sin(Math.min(1, k * 1.1) * Math.PI);
      rz += tilt * 0.45; rx += tilt * 0.18; px -= tilt * 0.03;
      if (gm.bolt && k > ki) gm.bolt.position.z = gm.bolt.userData.z0 + Math.sin(smooth(ki, 1, k) * Math.PI) * 0.06;
    } else if (gm.mag) gm.mag.visible = true;
    // 栓动：抬栓 → 后拉 → 前推 → 压下，右手移到拉机柄
    if (gun && gun.def.mode === "bolt" && gm.bolt && !gun.reloading) {
      const p = gun.boltProgress;
      const act = p < 1 ? Math.sin(p * Math.PI) : 0;
      gm.bolt.rotation.z = smooth(0.1, 0.25, p) * (1 - smooth(0.75, 0.9, p)) * 1.2;
      gm.bolt.position.z = gm.bolt.userData.z0 + smooth(0.25, 0.45, p) * (1 - smooth(0.55, 0.75, p)) * 0.12;
      right = right.lerp(_p.copy(gm.bolt.position).add(_off.set(0.07, 0, 0)), act);
      rz -= act * 0.12;
    }
    // 近战
    if (inv.slot === 2 && inv.meleeT >= 0) {
      const atk = inv.meleeHeavy ? KNIFE.heavy : KNIFE.light, k = inv.meleeT / atk.recovery;
      if (inv.meleeHeavy) {
        const wind = smooth(0, 0.35, k) * (1 - smooth(0.35, 0.5, k)), thrust = smooth(0.35, 0.45, k) * (1 - smooth(0.6, 1, k));
        pz += wind * 0.1 - thrust * 0.22; rx += wind * 0.4 - thrust * 0.2;
      } else {
        const s = smooth(0.05, 0.35, k) * (1 - smooth(0.45, 1, k));
        px -= s * 0.25; ry += s * 1.3 - 0.2 * s; rz += s * 0.5; pz -= s * 0.08;
      }
    }
    // 投掷
    if (inv.slot === 3 && inv.throwT >= 0) {
      const k = inv.throwT / GRENADE.throwTime;
      const back = smooth(0, 0.8, k) * (1 - smooth(0.85, 1.05, k)), fwd = smooth(0.85, 1.1, k);
      py += back * 0.08 - fwd * 0.2; pz += back * 0.12 - fwd * 0.25; rx -= back * 0.7;
      r.visible = inv.throwT < GRENADE.throwTime;
    } else r.visible = true;
    this.holder.position.set(px, py, pz);
    this.holder.rotation.set(rx, ry, rz);
    this.holder.updateMatrixWorld(true);
    // 手臂 IK：右手握把，左手护木/弹匣
    this.limb(0, _e.set(0.3, -0.5, 0.2), right.applyMatrix4(r.matrixWorld), 1);
    const leftUsed = inv.slot === 0 || (inv.slot === 1);
    if (leftUsed) this.limb(1, _e.set(-0.16, -0.58, 0.16), left.applyMatrix4(r.matrixWorld), -1);
    else this.limb(1, _e.set(-0.2, -0.62, 0.12), _p.set(-0.3, -0.5, -0.2), -1);
    // 枪口焰与抛壳
    this.flashT -= dt;
    this.flash.visible = this.flashT > 0 && this.holder.visible && id !== "knife";
    if (this.flash.visible) {
      this.flash.position.copy(gm.muzzle).applyMatrix4(r.matrixWorld);
      const s = id === "awm" ? 0.28 : id === "mp5" ? 0.13 : 0.18;
      this.flash.scale.set(s, s, s);
    }
    for (const s of this.shells) {
      if (s.t <= 0) continue;
      s.t -= dt;
      s.v.y -= 6 * dt;
      s.m.position.addScaledVector(s.v, dt);
      s.m.rotation.x += dt * 20; s.m.rotation.z += dt * 13;
      if (s.t <= 0) s.m.visible = false;
    }
  }

  private swap(id: string): void {
    this.curId = id;
    if (this.cur) this.holder.remove(this.cur.root);
    let gm = this.guns.get(id);
    if (!gm) {
      gm = buildGun(id, id === "awm" ? 0.8 : 0.85);
      if (gm.mag) gm.mag.userData.y0 = gm.mag.position.y;
      if (gm.bolt) gm.bolt.userData.z0 = gm.bolt.position.z;
      this.guns.set(id, gm);
    }
    this.cur = gm;
    this.holder.add(gm.root);
  }

  private limb(i: number, sh: THREE.Vector3, tgt: THREE.Vector3, side: number): void {
    const arm = this.arms[i];
    _d.subVectors(tgt, sh);
    const d = Math.min(_d.length(), ARM * 2 - 1e-3);
    _d.normalize();
    const along = d / 2, h = Math.sqrt(Math.max(0, ARM * ARM - along * along));
    const pole = _pole.set(side * 0.8, -1, 0.3).normalize();
    pole.addScaledVector(_d, -pole.dot(_d)).normalize();
    const elbow = _elbow.copy(sh).addScaledVector(_d, along).addScaledVector(pole, h);
    const hand = _hand.copy(sh).addScaledVector(_d, d);
    place(arm.upper, sh, elbow);
    place(arm.fore, elbow, hand);
    arm.hand.position.copy(hand);
    arm.hand.quaternion.copy(arm.fore.quaternion);
  }
}

export function gunName(id: string): string {
  return id in GUNS ? GUNS[id as keyof typeof GUNS].short : id === "knife" ? KNIFE.short : id === "he" ? "高爆手雷" : "烟雾弹";
}
