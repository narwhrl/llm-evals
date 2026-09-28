/**
 * 战斗特效：枪口焰、曳光、弹痕、抛壳、命中粒子、爆炸、烟雾。
 * 全部对象池 + 数量上限 + 回收。
 */
import * as THREE from 'three';
import { FX } from '../core/config';
import { Vec3, vSub, vNorm, vScale, vAdd } from '../geometry/math';

interface Tracer { mesh: THREE.Mesh; life: number; }
interface Hole { mesh: THREE.Mesh; life: number; }
interface Shell { mesh: THREE.Mesh; vel: THREE.Vector3; spin: THREE.Vector3; life: number; }
interface Puff { mesh: THREE.Mesh; vel: THREE.Vector3; life: number; maxLife: number; grow: number; }
interface SmokePuff { mesh: THREE.Mesh; life: number; maxLife: number; }

export class Effects {
  group = new THREE.Group();
  private tracers: Tracer[] = [];
  private holes: Hole[] = [];
  private shells: Shell[] = [];
  private puffs: Puff[] = [];
  private smokeClouds: SmokePuff[] = [];
  private muzzle: THREE.PointLight;
  private muzzleUntil = 0;
  private smokeSpriteTex: THREE.Texture;
  private roundSpriteTex: THREE.Texture;
  enabled = true;

  constructor() {
    this.muzzle = new THREE.PointLight(0xffc36b, 0, 9, 2);
    this.group.add(this.muzzle);
    this.smokeSpriteTex = makeSoftCircle(64, 0.85);
    this.roundSpriteTex = makeSoftCircle(32, 0.4);
  }

  setQuality(_q: 'low' | 'med' | 'high'): void {
    this.enabled = true;
  }

  muzzleFlash(pos: Vec3, dir: Vec3, now: number): void {
    if (!this.enabled) return;
    if (FX.muzzleLight) {
      this.muzzle.position.set(pos.x + dir.x * 0.35, pos.y + dir.y * 0.35, pos.z + dir.z * 0.35);
      this.muzzle.intensity = 26;
      this.muzzleUntil = now + 0.045;
    }
    // 焰花（十字面片）
    const puff = this.spawnPuff(pos, dir, 0.09, 0.05, 0xffd9a0, 6);
    if (puff) puff.mesh.scale.set(1.6, 1, 1);
  }

  tracer(from: Vec3, to: Vec3, speed: number): void {
    if (!this.enabled || this.tracers.length >= FX.tracerMax) return;
    const d = vSub(to, from);
    const len = Math.hypot(d.x, d.y, d.z);
    if (len < 0.5) return;
    const geo = new THREE.BoxGeometry(0.018, 0.018, Math.min(len, 3.2));
    const mat = new THREE.MeshBasicMaterial({ color: 0xffd28a, transparent: true, opacity: 0.85 });
    const m = new THREE.Mesh(geo, mat);
    const mid = vAdd(from, vScale(vNorm(d), len * 0.5));
    m.position.set(mid.x, mid.y, mid.z);
    m.lookAt(to.x, to.y, to.z);
    this.group.add(m);
    this.tracers.push({ mesh: m, life: Math.min(0.09, len / speed) });
  }

  bulletHole(pos: Vec3, normal: Vec3, surface: string): void {
    if (!this.enabled) return;
    if (this.holes.length >= FX.bulletHoleMax) {
      const old = this.holes.shift()!;
      this.group.remove(old.mesh);
      old.mesh.geometry.dispose();
    }
    const isWood = surface === 'wood';
    const size = isWood ? 0.09 : 0.06;
    const m = new THREE.Mesh(
      new THREE.CircleGeometry(size * (0.7 + Math.random() * 0.6), 6),
      new THREE.MeshBasicMaterial({ color: isWood ? 0x2e2010 : 0x14161a, transparent: true, opacity: 0.9 }),
    );
    m.position.set(pos.x + normal.x * 0.012, pos.y + normal.y * 0.012, pos.z + normal.z * 0.012);
    m.lookAt(pos.x + normal.x, pos.y + normal.y, pos.z + normal.z);
    this.group.add(m);
    this.holes.push({ mesh: m, life: 22 });
  }

  shell(pos: Vec3, right: Vec3): void {
    if (!this.enabled || this.shells.length >= FX.shellMax) return;
    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.028, 5),
      new THREE.MeshStandardMaterial({ color: 0xc8a24a, roughness: 0.35, metalness: 0.85 }),
    );
    m.position.set(pos.x, pos.y, pos.z);
    this.group.add(m);
    this.shells.push({
      mesh: m,
      vel: new THREE.Vector3(right.x * (1.6 + Math.random()), 2.2 + Math.random(), right.z * (1.6 + Math.random())),
      spin: new THREE.Vector3(Math.random() * 14, Math.random() * 14, Math.random() * 14),
      life: 1.8,
    });
  }

  impactPuff(pos: Vec3, surface: string): void {
    if (!this.enabled) return;
    const color = surface === 'wood' ? 0x8a6a3c : surface === 'tarp' ? 0x5d6b4a : 0xb8bcc0;
    for (let i = 0; i < 3; i++) {
      this.spawnPuff(pos, { x: Math.random() - 0.5, y: Math.random() * 0.8, z: Math.random() - 0.5 }, 0.05 + Math.random() * 0.04, 0.3, color, 4);
    }
  }

  bloodPuff(pos: Vec3): void {
    if (!this.enabled) return;
    for (let i = 0; i < 2; i++) {
      this.spawnPuff(pos, { x: Math.random() - 0.5, y: 0.2 + Math.random() * 0.4, z: Math.random() - 0.5 }, 0.06, 0.26, 0x7c1f16, 4);
    }
  }

  private spawnPuff(pos: Vec3, dir: Vec3, size: number, life: number, color: number, count: number): Puff | null {
    if (this.puffs.length > 90) return null;
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({ map: this.roundSpriteTex, color, transparent: true, opacity: 0.75, depthWrite: false }),
    );
    m.position.set(pos.x + dir.x * 0.1, pos.y + dir.y * 0.1, pos.z + dir.z * 0.1);
    m.lookAt(pos.x - dir.x, pos.y - dir.y + 0.001, pos.z - dir.z);
    this.group.add(m);
    const p: Puff = {
      mesh: m,
      vel: new THREE.Vector3(dir.x * 0.7, dir.y * 0.7 + 0.3, dir.z * 0.7),
      life, maxLife: life, grow: 1.8,
    };
    this.puffs.push(p);
    if (this.puffs.length > count * 30) {
      const old = this.puffs.shift()!;
      this.group.remove(old.mesh);
    }
    return p;
  }

  explosion(pos: Vec3): void {
    if (!this.enabled) return;
    // 闪光
    for (let i = 0; i < 8; i++) {
      this.spawnPuff(pos, { x: Math.random() - 0.5, y: Math.random() * 0.9, z: Math.random() - 0.5 }, 0.5 + Math.random() * 0.5, 0.5, 0xffb055, 8);
    }
    // 烟
    for (let i = 0; i < 10; i++) {
      this.spawnPuff(pos, { x: Math.random() - 0.5, y: 0.5 + Math.random() * 0.6, z: Math.random() - 0.5 }, 0.7 + Math.random() * 0.6, 1.4, 0x3c3a36, 10);
    }
    // 冲击环
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 0.5, 20),
      new THREE.MeshBasicMaterial({ color: 0xfff0c8, transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(pos.x, pos.y + 0.15, pos.z);
    this.group.add(ring);
    this.puffs.push({ mesh: ring, vel: new THREE.Vector3(0, 0.5, 0), life: 0.4, maxLife: 0.4, grow: 16 });
  }

  smokeCloud(pos: Vec3, duration: number): void {
    const n = FX.smokeParticles;
    for (let i = 0; i < n; i++) {
      const size = 2.2 + Math.random() * 2.4;
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size),
        new THREE.MeshBasicMaterial({ map: this.smokeSpriteTex, color: 0xb9c2c9, transparent: true, opacity: 0, depthWrite: false }),
      );
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 2.6;
      m.position.set(pos.x + Math.cos(a) * r, 0.4 + Math.random() * 2.8, pos.z + Math.sin(a) * r);
      this.group.add(m);
      this.smokeClouds.push({ mesh: m, life: duration + Math.random() * 1.2, maxLife: duration + 1.2 });
    }
  }

  update(dt: number, now: number, camera: THREE.Camera): void {
    if (now > this.muzzleUntil) this.muzzle.intensity = 0;
    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const t = this.tracers[i];
      t.life -= dt;
      (t.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, t.life / 0.09) * 0.85;
      if (t.life <= 0) {
        this.group.remove(t.mesh);
        t.mesh.geometry.dispose();
        this.tracers.splice(i, 1);
      }
    }
    for (let i = this.holes.length - 1; i >= 0; i--) {
      const h = this.holes[i];
      h.life -= dt;
      if (h.life <= 0) {
        this.group.remove(h.mesh);
        h.mesh.geometry.dispose();
        this.holes.splice(i, 1);
      }
    }
    for (let i = this.shells.length - 1; i >= 0; i--) {
      const s = this.shells[i];
      s.life -= dt;
      s.vel.y -= 12 * dt;
      s.mesh.position.addScaledVector(s.vel, dt);
      s.mesh.rotation.x += s.spin.x * dt;
      s.mesh.rotation.y += s.spin.y * dt;
      if (s.mesh.position.y < 0.02) {
        s.mesh.position.y = 0.02;
        s.vel.y *= -0.3;
        s.vel.x *= 0.6;
        s.vel.z *= 0.6;
      }
      if (s.life <= 0) {
        this.group.remove(s.mesh);
        s.mesh.geometry.dispose();
        this.shells.splice(i, 1);
      }
    }
    for (let i = this.puffs.length - 1; i >= 0; i--) {
      const p = this.puffs[i];
      p.life -= dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      const k = Math.max(0, p.life / p.maxLife);
      (p.mesh.material as THREE.MeshBasicMaterial).opacity = k * 0.8;
      p.mesh.scale.multiplyScalar(1 + p.grow * dt * 0.4);
      p.mesh.quaternion.copy(camera.quaternion);
      if (p.life <= 0) {
        this.group.remove(p.mesh);
        p.mesh.geometry.dispose();
        this.puffs.splice(i, 1);
      }
    }
    for (let i = this.smokeClouds.length - 1; i >= 0; i--) {
      const s = this.smokeClouds[i];
      s.life -= dt;
      const total = s.maxLife;
      const age = total - s.life;
      let op = 0;
      if (age < 1.4) op = age / 1.4;
      else if (s.life < 2) op = s.life / 2;
      else op = 1;
      (s.mesh.material as THREE.MeshBasicMaterial).opacity = op * 0.92;
      s.mesh.position.y += dt * 0.07;
      s.mesh.quaternion.copy(camera.quaternion);
      if (s.life <= 0) {
        this.group.remove(s.mesh);
        s.mesh.geometry.dispose();
        this.smokeClouds.splice(i, 1);
      }
    }
  }

  clear(): void {
    for (const t of this.tracers) { this.group.remove(t.mesh); t.mesh.geometry.dispose(); }
    for (const h of this.holes) { this.group.remove(h.mesh); h.mesh.geometry.dispose(); }
    for (const s of this.shells) { this.group.remove(s.mesh); s.mesh.geometry.dispose(); }
    for (const p of this.puffs) { this.group.remove(p.mesh); p.mesh.geometry.dispose(); }
    for (const s of this.smokeClouds) { this.group.remove(s.mesh); s.mesh.geometry.dispose(); }
    this.tracers = []; this.holes = []; this.shells = []; this.puffs = []; this.smokeClouds = [];
  }
}

function makeSoftCircle(size: number, hardness: number): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(hardness, 'rgba(255,255,255,0.5)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
