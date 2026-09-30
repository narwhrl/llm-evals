// 世界特效：弹孔、火花/木屑/血雾粒子、曳光、爆炸、烟雾体与投掷物模型。全部为固定容量对象池，超出上限时循环覆盖最旧项。
import * as THREE from "three";
import type { Impact } from "../combat/combat";
import { type Grenade, type Smoke, smokeState } from "../combat/projectiles";
import { GRENADE } from "../config";
import { Rng } from "../core/rng";

const MAX_DECALS = 160, MAX_PARTS = 480, MAX_TRACERS = 24;
const HIDE = -9999;
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _n = new THREE.Vector3(), _z = new THREE.Vector3(0, 0, 1), _p = new THREE.Vector3();
const C_WOOD = [0.55, 0.4, 0.22], C_SPARK = [1, 0.8, 0.4], C_DUST = [0.5, 0.5, 0.5], C_BLOOD = [0.55, 0.05, 0.04], C_FIRE = [1, 0.6, 0.2], C_SOOT = [0.25, 0.23, 0.2];
const WOOD_TINT = new THREE.Color(0.55, 0.42, 0.3), STEEL_TINT = new THREE.Color(0.9, 0.9, 0.9);

function softTex(inner: string, outer: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 2, 32, 32, 31);
  grd.addColorStop(0, inner); grd.addColorStop(1, outer);
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function holeTex(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 30);
  grd.addColorStop(0, "rgba(10,10,10,1)"); grd.addColorStop(0.25, "rgba(25,22,20,0.95)"); grd.addColorStop(0.45, "rgba(60,55,50,0.6)"); grd.addColorStop(1, "rgba(60,55,50,0)");
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export class Effects {
  readonly group = new THREE.Group();
  private rng = new Rng(99);
  private decals: THREE.InstancedMesh;
  private decalIdx = 0;
  private pPos: Float32Array;
  private pCol: Float32Array;
  private pVel: Float32Array;
  private pLife: Float32Array;
  private pGrav: Float32Array;
  private pIdx = 0;
  private points: THREE.Points;
  private tracers: THREE.LineSegments;
  private tr: { a: THREE.Vector3; b: THREE.Vector3; t: number; len: number }[] = [];
  private trIdx = 0;
  private flashes: { s: THREE.Sprite; t: number }[] = [];
  private smokeTex = softTex("rgba(225,225,222,0.9)", "rgba(225,225,222,0)");
  private smokes = new Map<number, { g: THREE.Group; parts: { s: THREE.Sprite; o: THREE.Vector3; r: number }[] }>();
  private nades = new Map<number, THREE.Mesh>();
  private nadeGeo = { he: new THREE.SphereGeometry(0.06, 10, 8), smoke: new THREE.CylinderGeometry(0.045, 0.045, 0.14, 10) };
  private nadeMat = { he: new THREE.MeshStandardMaterial({ color: 0x4d5238, roughness: 0.6 }), smoke: new THREE.MeshStandardMaterial({ color: 0x6f7477, roughness: 0.5, metalness: 0.5 }) };

  constructor() {
    const dm = new THREE.MeshBasicMaterial({ map: holeTex(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 });
    this.decals = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.09, 0.09), dm, MAX_DECALS);
    this.decals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    _m.makeTranslation(0, HIDE, 0);
    for (let i = 0; i < MAX_DECALS; i++) { this.decals.setMatrixAt(i, _m); this.decals.setColorAt(i, STEEL_TINT); }
    this.decals.frustumCulled = false;
    this.group.add(this.decals);

    this.pPos = new Float32Array(MAX_PARTS * 3).fill(HIDE);
    this.pCol = new Float32Array(MAX_PARTS * 3);
    this.pVel = new Float32Array(MAX_PARTS * 3);
    this.pLife = new Float32Array(MAX_PARTS);
    this.pGrav = new Float32Array(MAX_PARTS);
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(this.pPos, 3).setUsage(THREE.DynamicDrawUsage));
    pg.setAttribute("color", new THREE.BufferAttribute(this.pCol, 3).setUsage(THREE.DynamicDrawUsage));
    this.points = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.06, vertexColors: true, map: softTex("rgba(255,255,255,1)", "rgba(255,255,255,0)"), transparent: true, depthWrite: false }));
    this.points.frustumCulled = false;
    this.group.add(this.points);

    const tg = new THREE.BufferGeometry();
    tg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(MAX_TRACERS * 6).fill(HIDE), 3).setUsage(THREE.DynamicDrawUsage));
    this.tracers = new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ color: 0xffe0a0, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.tracers.frustumCulled = false;
    this.group.add(this.tracers);
    for (let i = 0; i < MAX_TRACERS; i++) this.tr.push({ a: new THREE.Vector3(), b: new THREE.Vector3(), t: -1, len: 0 });
    const ft = softTex("rgba(255,240,200,1)", "rgba(255,120,30,0)");
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: ft, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
      s.visible = false;
      this.group.add(s);
      this.flashes.push({ s, t: 0 });
    }
  }

  /** 弹着点：弹孔 + 按材质的碎屑 */
  impact(i: Impact): void {
    _n.set(i.nx, i.ny, i.nz);
    _q.setFromUnitVectors(_z, _n);
    _s.set(1, 1, 1).multiplyScalar(i.mat === "wood" ? 1.2 : 0.8 + this.rng.next() * 0.4);
    _m.compose(_p.set(i.x + i.nx * 0.006, i.y + i.ny * 0.006, i.z + i.nz * 0.006), _q, _s);
    const k = this.decalIdx++ % MAX_DECALS;
    this.decals.setMatrixAt(k, _m);
    this.decals.setColorAt(k, i.mat === "wood" ? WOOD_TINT : STEEL_TINT);
    this.decals.instanceMatrix.needsUpdate = true;
    if (this.decals.instanceColor) this.decals.instanceColor.needsUpdate = true;
    const wood = i.mat === "wood";
    const n = wood ? 7 : 5;
    for (let j = 0; j < n; j++) {
      const c = wood ? C_WOOD : j < 2 ? C_SPARK : C_DUST;
      this.spawn(i.x, i.y, i.z, i.nx * 1.8 + this.rng.gauss() * 1.4, i.ny * 1.8 + this.rng.range(0, 2), i.nz * 1.8 + this.rng.gauss() * 1.4, c, wood ? 0.6 : 0.3, 9);
    }
  }

  blood(x: number, y: number, z: number, head: boolean): void {
    for (let j = 0; j < (head ? 12 : 7); j++) this.spawn(x, y, z, this.rng.gauss() * 1.2, this.rng.range(0, 1.6), this.rng.gauss() * 1.2, C_BLOOD, 0.45, 7);
  }

  tracer(from: [number, number, number], to: [number, number, number]): void {
    const t = this.tr[this.trIdx++ % MAX_TRACERS];
    t.a.fromArray(from);
    t.b.fromArray(to);
    t.len = t.a.distanceTo(t.b);
    t.t = 0;
  }

  explosion(x: number, y: number, z: number): void {
    const f = this.flashes.find((q) => q.t <= 0) ?? this.flashes[0];
    f.t = 0.45;
    f.s.position.set(x, y + 0.6, z);
    f.s.visible = true;
    for (let j = 0; j < 60; j++) {
      const hot = j < 30;
      this.spawn(x, y + 0.2, z, this.rng.gauss() * 5, this.rng.range(1, 7), this.rng.gauss() * 5, hot ? C_FIRE : C_SOOT, hot ? 0.5 : 1.2, hot ? 4 : 10);
    }
  }

  private spawn(x: number, y: number, z: number, vx: number, vy: number, vz: number, c: number[], life: number, grav: number): void {
    const k = this.pIdx++ % MAX_PARTS, o = k * 3;
    this.pPos[o] = x; this.pPos[o + 1] = y; this.pPos[o + 2] = z;
    this.pVel[o] = vx; this.pVel[o + 1] = vy; this.pVel[o + 2] = vz;
    this.pCol[o] = c[0]; this.pCol[o + 1] = c[1]; this.pCol[o + 2] = c[2];
    this.pLife[k] = life;
    this.pGrav[k] = grav;
  }

  update(dt: number, smokes: readonly Smoke[], nades: readonly Grenade[], t: number): void {
    for (let k = 0; k < MAX_PARTS; k++) {
      if (this.pLife[k] <= 0) continue;
      const o = k * 3;
      this.pLife[k] -= dt;
      if (this.pLife[k] <= 0) { this.pPos[o + 1] = HIDE; continue; }
      this.pVel[o + 1] -= this.pGrav[k] * dt;
      this.pPos[o] += this.pVel[o] * dt; this.pPos[o + 1] += this.pVel[o + 1] * dt; this.pPos[o + 2] += this.pVel[o + 2] * dt;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;
    const tp = this.tracers.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < MAX_TRACERS; i++) {
      const q = this.tr[i];
      if (q.t < 0) continue;
      q.t += dt;
      const head = q.t * 420, tail = head - 3.5;
      if (tail >= q.len) { q.t = -1; tp.setXYZ(i * 2, 0, HIDE, 0); tp.setXYZ(i * 2 + 1, 0, HIDE, 0); continue; }
      const a = Math.max(0, tail) / q.len, b = Math.min(q.len, head) / q.len;
      tp.setXYZ(i * 2, q.a.x + (q.b.x - q.a.x) * a, q.a.y + (q.b.y - q.a.y) * a, q.a.z + (q.b.z - q.a.z) * a);
      tp.setXYZ(i * 2 + 1, q.a.x + (q.b.x - q.a.x) * b, q.a.y + (q.b.y - q.a.y) * b, q.a.z + (q.b.z - q.a.z) * b);
    }
    tp.needsUpdate = true;
    for (const f of this.flashes) {
      if (f.t <= 0) continue;
      f.t -= dt;
      const k = 1 - f.t / 0.45;
      f.s.scale.setScalar(1 + k * 5);
      f.s.material.opacity = Math.max(0, 1 - k);
      if (f.t <= 0) f.s.visible = false;
    }
    this.updateSmokes(smokes, t);
    this.updateNades(nades);
  }

  private updateSmokes(smokes: readonly Smoke[], t: number): void {
    const live = new Set<number>();
    for (const s of smokes) {
      live.add(s.id);
      let v = this.smokes.get(s.id);
      if (!v) {
        const g = new THREE.Group();
        const parts: { s: THREE.Sprite; o: THREE.Vector3; r: number }[] = [];
        const r = new Rng(s.id * 7919);
        for (let i = 0; i < 26; i++) {
          const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.smokeTex, transparent: true, depthWrite: false, color: 0xdcdcd8 }));
          const a = r.range(0, Math.PI * 2), rad = Math.sqrt(r.next()) * 0.85, h = r.range(0.05, 0.95);
          parts.push({ s: sp, o: new THREE.Vector3(Math.cos(a) * rad, h, Math.sin(a) * rad), r: r.range(0.8, 1.3) });
          sp.material.rotation = r.range(0, 6.28);
          g.add(sp);
        }
        g.position.set(s.x, s.y, s.z);
        this.group.add(g);
        v = { g, parts };
        this.smokes.set(s.id, v);
      }
      const st = smokeState(s);
      for (const p of v.parts) {
        const R = st.r;
        p.s.position.set(p.o.x * R, p.o.y * GRENADE.smoke.height, p.o.z * R);
        p.s.scale.setScalar(R * 1.15 * p.r);
        p.s.material.opacity = 0.85 * st.density;
        p.s.material.rotation += 0.0015 * p.r;
      }
      v.g.position.y = s.y + Math.sin(t * 0.3 + s.id) * 0.03;
    }
    for (const [id, v] of this.smokes) {
      if (live.has(id)) continue;
      for (const p of v.parts) p.s.material.dispose();
      this.group.remove(v.g);
      this.smokes.delete(id);
    }
  }

  private updateNades(nades: readonly Grenade[]): void {
    const live = new Set<number>();
    for (const n of nades) {
      live.add(n.id);
      let m = this.nades.get(n.id);
      if (!m) {
        m = new THREE.Mesh(this.nadeGeo[n.kind], this.nadeMat[n.kind]);
        m.castShadow = true;
        this.group.add(m);
        this.nades.set(n.id, m);
      }
      m.position.set(n.x, n.y, n.z);
      if (!n.resting) { m.rotation.x += 0.2; m.rotation.z += 0.13; }
    }
    for (const [id, m] of this.nades) if (!live.has(id)) { this.group.remove(m); this.nades.delete(id); }
  }

  /** 新一局：清空所有特效 */
  clear(): void {
    _m.makeTranslation(0, HIDE, 0);
    for (let i = 0; i < MAX_DECALS; i++) this.decals.setMatrixAt(i, _m);
    this.decals.instanceMatrix.needsUpdate = true;
    this.decalIdx = 0;
    this.pLife.fill(0);
    for (let k = 0; k < MAX_PARTS; k++) this.pPos[k * 3 + 1] = HIDE;
    for (const q of this.tr) q.t = -1;
    this.updateSmokes([], 0);
    this.updateNades([]);
  }

  get counts(): { decals: number; smokes: number; nades: number } {
    return { decals: Math.min(this.decalIdx, MAX_DECALS), smokes: this.smokes.size, nades: this.nades.size };
  }
}
