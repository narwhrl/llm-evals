/**
 * 投掷物实体：高爆手雷 / 烟雾弹。
 * 真实飞行（重力 + 碰撞反弹 + 引信），爆炸经统一判定，烟雾入注册表。
 */
import * as THREE from 'three';
import { COMBAT } from '../core/config';
import { Vec3, vScale, v3 } from '../geometry/math';
import { ColliderWorld } from '../physics/world';
import { SmokeRegistry } from './smoke';
import { Character } from '../entities/character';
import { resolveExplosion } from './shooting';
import { Effects } from '../fx/effects';
import { AudioEngine } from '../audio/audio';

export type NadeKind = 'he' | 'smoke';

export class Grenade {
  kind: NadeKind;
  pos: Vec3;
  vel: Vec3;
  fuse: number;
  mesh: THREE.Mesh;
  owner: Character;
  done = false;
  smoked = false;

  constructor(kind: NadeKind, pos: Vec3, vel: Vec3, owner: Character) {
    this.kind = kind;
    this.pos = pos;
    this.vel = vel;
    this.fuse = COMBAT.nadeFuse;
    this.owner = owner;
    const mat = new THREE.MeshStandardMaterial({
      color: kind === 'he' ? 0x3d4a35 : 0x596270,
      roughness: 0.55, metalness: 0.35,
    });
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), mat);
    this.mesh.castShadow = true;
  }

  update(dt: number, world: ColliderWorld): void {
    if (this.done) return;
    this.fuse -= dt;
    this.vel.y -= 15.5 * dt;
    // 子步进防穿薄壁
    const steps = 3;
    for (let i = 0; i < steps; i++) {
      const step = vScale(this.vel, dt / steps);
      const next = { x: this.pos.x + step.x, y: this.pos.y + step.y, z: this.pos.z + step.z };
      const dir = v3(step.x, step.y, step.z);
      const len = Math.hypot(dir.x, dir.y, dir.z);
      if (len > 1e-6) {
        const hit = world.raycast(this.pos, vScale(dir, 1 / len), len + 0.07, { bullets: true });
        if (hit) {
          // 反弹：速度沿法线反射并衰减
          const n = hit.normal;
          const d = this.vel.x * n.x + this.vel.y * n.y + this.vel.z * n.z;
          this.vel.x -= 2 * d * n.x;
          this.vel.y -= 2 * d * n.y;
          this.vel.z -= 2 * d * n.z;
          this.vel.x *= COMBAT.nadeBounce + 0.3;
          this.vel.y *= COMBAT.nadeBounce;
          this.vel.z *= COMBAT.nadeBounce + 0.3;
          this.pos = hit.point;
          this.bounced = true;
          continue;
        }
      }
      this.pos = next;
      if (this.pos.y < 0.08) {
        this.pos.y = 0.08;
        if (Math.abs(this.vel.y) > 0.8) this.bounced = true;
        this.vel.y = Math.abs(this.vel.y) * COMBAT.nadeBounce;
        this.vel.x *= 0.86;
        this.vel.z *= 0.86;
      }
    }
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
  }
  bounced = false;

  /** 引信到点：结算爆炸或起烟 */
  detonate(characters: Character[], world: ColliderWorld, smoke: SmokeRegistry, fx: Effects, audio: AudioEngine): void {
    if (this.done) return;
    this.done = true;
    if (this.kind === 'he') {
      const hits = resolveExplosion(world, characters.map((c) => ({
        id: c.id, team: c.team, alive: c.alive, crouching: c.crouching,
        pos: c.body.pos, yaw: c.yaw, radius: c.body.radius,
        standHeight: 1.82, crouchHeight: 1.3,
      })), this.pos, this.owner.team);
      let selfHit = false;
      for (const hEvent of hits) {
        const t = characters.find((c) => c.id === hEvent.targetId);
        if (!t) continue;
        if (t === this.owner) selfHit = true;
        t.takeDamage(hEvent.dmg, this.owner, v3(0, 0.3, 0), this.fuse);
      }
      fx.explosion(this.pos);
      audio.explosion(this.pos);
      void selfHit;
    } else {
      smoke.spawn({ x: this.pos.x, y: 1.6, z: this.pos.z });
      fx.smokeCloud(this.pos, COMBAT.smokeDuration);
      audio.smokeHiss(this.pos);
    }
  }
}
