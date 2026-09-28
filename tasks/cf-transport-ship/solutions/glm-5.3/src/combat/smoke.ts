/**
 * 烟雾区域注册表：供感知判定与小地图共享。
 * 烟雾只遮蔽视线，不阻挡子弹。
 */
import { COMBAT } from '../core/config';
import { segIntersectsSphere, Vec3 } from '../geometry/math';

export interface SmokeCloud {
  pos: Vec3;
  radius: number;
  age: number;      // 落地起烟后的时间
  active: boolean;
}

export class SmokeRegistry {
  clouds: SmokeCloud[] = [];

  spawn(pos: Vec3): void {
    this.clouds.push({ pos: { x: pos.x, y: Math.max(0.6, pos.y), z: pos.z }, radius: COMBAT.smokeRadius, age: 0, active: true });
  }

  update(dt: number): void {
    for (const c of this.clouds) {
      c.age += dt;
      if (c.age > COMBAT.smokeDuration) c.active = false;
    }
    this.clouds = this.clouds.filter((c) => c.active || c.age < COMBAT.smokeDuration + 2);
  }

  clear(): void {
    this.clouds = [];
  }

  /** 烟雾遮挡系数（0 无烟 .. 1 全遮挡） */
  density(c: SmokeCloud): number {
    const t = c.age;
    if (t < 0) return 0;
    if (t < 1.2) return t / 1.2;                       // 起烟
    if (t < COMBAT.smokeDuration - COMBAT.smokeFade) return 1; // 持续
    const rem = COMBAT.smokeDuration - t;
    return Math.max(0, rem / COMBAT.smokeFade);        // 消散
  }

  /** 线段是否被烟雾有效遮蔽（电脑感知与敌人标识共用） */
  blocksVision(a: Vec3, b: Vec3): boolean {
    for (const c of this.clouds) {
      if (!c.active) continue;
      const d = this.density(c);
      if (d < COMBAT.smokeVisionBlock) continue;
      if (segIntersectsSphere(a, b, c.pos, c.radius * 0.85)) return true;
    }
    return false;
  }
}
