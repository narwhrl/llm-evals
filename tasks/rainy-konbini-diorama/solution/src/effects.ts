import * as THREE from 'three';
import * as T from './textures';

export interface DripPoint {
  pos: THREE.Vector3;
  landY: number;
}

export interface FanSpin {
  mesh: THREE.Object3D;
  speed: number;
}

export interface Updatable {
  update(dt: number, t: number): void;
}

/* ---------------------------------------------------------------- rain */

const WIND = new THREE.Vector3(0.55, -1, 0.18).normalize();
const DROP_LEN = 0.34;

export class Rain implements Updatable {
  private readonly positions: Float32Array;
  private readonly speeds: Float32Array;
  private readonly count: number;
  private readonly geo: THREE.BufferGeometry;

  constructor(scene: THREE.Scene, count = 640) {
    this.count = count;
    this.positions = new Float32Array(count * 6);
    this.speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      this.speeds[i] = 8.5 + Math.random() * 4;
      this.respawn(i, true);
    }
    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    const lines = new THREE.LineSegments(
      this.geo,
      new THREE.LineBasicMaterial({
        color: '#9fb9de', transparent: true, opacity: 0.4, depthWrite: false,
      }),
    );
    lines.renderOrder = 40;
    lines.frustumCulled = false;
    scene.add(lines);
  }

  private respawn(i: number, initial: boolean): void {
    const o = i * 6;
    this.positions[o] = (Math.random() - 0.5) * 12.8;
    this.positions[o + 1] = initial ? Math.random() * 6 : 5.2 + Math.random() * 1.1;
    this.positions[o + 2] = (Math.random() - 0.5) * 12.8;
  }

  update(dt: number): void {
    for (let i = 0; i < this.count; i++) {
      const o = i * 6;
      const v = this.speeds[i] * dt;
      this.positions[o] += WIND.x * v;
      this.positions[o + 1] += WIND.y * v;
      this.positions[o + 2] += WIND.z * v;
      if (this.positions[o + 1] < 0.08) this.respawn(i, false);
      this.positions[o + 3] = this.positions[o] - WIND.x * DROP_LEN;
      this.positions[o + 4] = this.positions[o + 1] - WIND.y * DROP_LEN;
      this.positions[o + 5] = this.positions[o + 2] - WIND.z * DROP_LEN;
    }
    this.geo.attributes.position.needsUpdate = true;
  }
}

/* -------------------------------------------------------------- ripples */

interface Ripple {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  age: number;
  life: number;
  s0: number;
  s1: number;
}

export class RippleField implements Updatable {
  private readonly pool: Ripple[] = [];
  private spawnTimer = 0;

  constructor(
    scene: THREE.Scene,
    private readonly puddles: THREE.Vector3[],
  ) {
    const geo = new THREE.RingGeometry(0.4, 0.48, 26);
    for (let i = 0; i < 34; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: '#9fc4e8', transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.visible = false;
      mesh.renderOrder = 16;
      scene.add(mesh);
      this.pool.push({ mesh, mat, age: 0, life: 1, s0: 0.1, s1: 0.5 });
    }
  }

  spawn(x: number, y: number, z: number, s1 = 0.5): void {
    const r = this.pool.find((p) => !p.mesh.visible);
    if (!r) return;
    r.mesh.visible = true;
    r.mesh.position.set(x, y, z);
    r.age = 0;
    r.life = 0.9 + Math.random() * 0.5;
    r.s0 = 0.08 + Math.random() * 0.05;
    r.s1 = s1 * (0.8 + Math.random() * 0.4);
  }

  update(dt: number): void {
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0 && this.puddles.length > 0) {
      this.spawnTimer = 0.1;
      const p = this.puddles[Math.floor(Math.random() * this.puddles.length)];
      this.spawn(p.x + (Math.random() - 0.5) * 0.5, p.y, p.z + (Math.random() - 0.5) * 0.35, 0.45);
    }
    for (const r of this.pool) {
      if (!r.mesh.visible) continue;
      r.age += dt;
      const k = r.age / r.life;
      if (k >= 1) {
        r.mesh.visible = false;
        continue;
      }
      const s = r.s0 + (r.s1 - r.s0) * k;
      r.mesh.scale.set(s, s, 1);
      r.mat.opacity = 0.5 * (1 - k) * (1 - k);
    }
  }
}

/* ---------------------------------------------------------------- drips */

interface Drop {
  mesh: THREE.Mesh;
  vy: number;
  landY: number;
  active: boolean;
}

export class DripSystem implements Updatable {
  private readonly drops: Drop[] = [];
  private readonly timers: number[];

  constructor(
    scene: THREE.Scene,
    private readonly points: DripPoint[],
    private readonly ripples: RippleField,
  ) {
    const geo = new THREE.SphereGeometry(0.02, 6, 5);
    const mat = new THREE.MeshBasicMaterial({ color: '#bcd4ee' });
    for (let i = 0; i < Math.min(26, points.length); i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.set(1, 2.4, 1);
      mesh.visible = false;
      scene.add(mesh);
      this.drops.push({ mesh, vy: 0, landY: 0, active: false });
    }
    this.timers = points.map(() => Math.random() * 2);
  }

  update(dt: number): void {
    for (let i = 0; i < this.points.length; i++) {
      this.timers[i] -= dt;
      if (this.timers[i] <= 0) {
        this.timers[i] = 0.5 + Math.random() * 1.4;
        const d = this.drops.find((x) => !x.active);
        const p = this.points[i];
        if (d) {
          d.active = true;
          d.vy = 0;
          d.landY = p.landY;
          d.mesh.visible = true;
          d.mesh.position.copy(p.pos);
        }
      }
    }
    for (const d of this.drops) {
      if (!d.active) continue;
      d.vy += 9.5 * dt;
      d.mesh.position.y -= d.vy * dt;
      if (d.mesh.position.y <= d.landY) {
        d.active = false;
        d.mesh.visible = false;
        this.ripples.spawn(d.mesh.position.x, d.landY + 0.006, d.mesh.position.z, 0.22);
      }
    }
  }
}

/* ---------------------------------------------------------------- steam */

interface Puff {
  sprite: THREE.Sprite;
  mat: THREE.SpriteMaterial;
  base: THREE.Vector3;
  phase: number;
}

export class SteamPlume implements Updatable {
  private readonly puffs: Puff[] = [];
  private readonly life = 1.8;

  constructor(scene: THREE.Scene, points: THREE.Vector3[], private readonly scale = 1) {
    for (const p of points) {
      for (let i = 0; i < 2; i++) {
        const mat = new THREE.SpriteMaterial({
          map: T.steam(), transparent: true, opacity: 0, depthWrite: false,
        });
        const sprite = new THREE.Sprite(mat);
        scene.add(sprite);
        this.puffs.push({
          sprite, mat, base: p.clone(), phase: (i * this.life) / 2 + Math.random() * 0.4,
        });
      }
    }
  }

  update(dt: number, t: number): void {
    for (const puff of this.puffs) {
      puff.phase = (puff.phase + dt) % this.life;
      const k = puff.phase / this.life;
      const rise = k * 0.62 * this.scale;
      puff.sprite.position.set(
        puff.base.x + Math.sin(t * 1.7 + puff.base.x * 9.0) * 0.045 * this.scale,
        puff.base.y + rise,
        puff.base.z,
      );
      const s = (0.14 + 0.4 * k) * this.scale;
      puff.sprite.scale.set(s, s, 1);
      puff.mat.opacity = 0.42 * Math.sin(Math.PI * k);
    }
  }
}

/* -------------------------------------------------------------- flicker */

export interface FlickerTarget {
  mat: THREE.MeshBasicMaterial;
  base: THREE.Color;
  rate: number;
}

export class FlickerController {
  private readonly state: { target: FlickerTarget; timer: number; dropping: boolean; seed: number }[] = [];
  readonly values: number[] = [];

  constructor(targets: FlickerTarget[]) {
    this.state = targets.map((target) => ({
      target, timer: Math.random() * 4, dropping: false, seed: Math.random() * 100,
    }));
    for (let i = 0; i < targets.length; i++) this.values.push(1);
  }

  update(dt: number, t: number): void {
    let i = 0;
    for (const s of this.state) {
      s.timer -= dt;
      if (s.timer <= 0) {
        if (s.dropping) {
          s.dropping = false;
          s.timer = 3 + Math.random() * 7 / Math.max(s.target.rate, 0.01);
        } else {
          s.dropping = true;
          s.timer = 0.05 + Math.random() * 0.14;
        }
      }
      const wobble = 1 + Math.sin(t * 11 + s.seed) * 0.03 + Math.sin(t * 23 + s.seed * 2) * 0.02;
      const v = s.dropping ? 0.35 + Math.random() * 0.25 : wobble;
      this.values[i++] = v;
      s.target.mat.color.copy(s.target.base).multiplyScalar(v);
    }
  }
}

/* ------------------------------------------------------- street streaks */

// Flat additive smear on the ground under a light: the stylised wet-street
// reflection. The bright head sits under the light, the tail points away.
export function addStreak(
  scene: THREE.Scene,
  headX: number,
  headZ: number,
  len: number,
  width: number,
  color: THREE.ColorRepresentation,
  opacity: number,
  tail = new THREE.Vector3(0.6, 0, 0.8).normalize(),
): THREE.Mesh {
  const g = new THREE.Group();
  g.position.set(headX, 0.02, headZ);
  g.rotation.y = Math.atan2(tail.x, tail.z);
  const mat = new THREE.MeshBasicMaterial({
    map: T.streak(), color, transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, len), mat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.z = len / 2;
  plane.renderOrder = 15;
  g.add(plane);
  scene.add(g);
  return plane;
}
