// 电脑感知：视野角 + 距离 + 实体遮挡 + 烟雾；声音事件给出带误差的位置估计。
// 玩家敌人标识、小地图暴露也使用同一套视线判定。
import { chestCenter, headCenter, type Combatant } from "../combat/combat";
import { type Smoke, smokeBlocks } from "../combat/projectiles";
import { type World, sightFilter } from "../core/world";

export interface SoundEvent {
  x: number; y: number; z: number;
  radius: number;
  kind: "shot" | "step" | "land" | "blast" | "bounce";
  team: 0 | 1 | -1;
  source: number;
  t: number;
}

/** 从 eye 能否看见目标的头部或胸部（实体与烟雾都会遮挡） */
export function lineOfSight(
  world: World, smokes: readonly Smoke[], eye: [number, number, number], target: Combatant,
): boolean {
  for (const p of [headCenter(target), chestCenter(target)]) {
    if (world.segmentBlocked(eye[0], eye[1], eye[2], p[0], p[1], p[2], sightFilter)) continue;
    if (smokeBlocks(smokes, eye[0], eye[1], eye[2], p[0], p[1], p[2])) continue;
    return true;
  }
  return false;
}

/** 视锥检查（水平角），fovDeg 为全角 */
export function inFov(yaw: number, eye: [number, number, number], p: { x: number; z: number }, fovDeg: number): boolean {
  const dx = p.x - eye[0], dz = p.z - eye[2];
  const d = Math.hypot(dx, dz);
  if (d < 1.5) return true; // 贴身距离可察觉
  const fx = -Math.sin(yaw), fz = -Math.cos(yaw);
  return (dx * fx + dz * fz) / d >= Math.cos((fovDeg * Math.PI) / 360);
}
