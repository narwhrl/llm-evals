// 把 Sim 事件翻译成声音、特效与 HUD 反馈。只读取事件，不改动对局状态。
import * as THREE from "three";
import type { AudioEngine } from "../audio/audio";
import type { SoundId } from "../audio/synth";
import { bulletFilter } from "../core/world";
import type { Effects } from "../render/effects";
import type { Characters } from "../render/characters";
import type { Viewmodel } from "../render/viewmodel";
import type { Hud } from "../ui/hud";
import type { Actor } from "./actor";
import type { Sim, SimEvent } from "./sim";

const CAUSE: Record<string, string> = { ak: "AK-47", m4: "M4A1", mp5: "MP5", awm: "AWM", deagle: "沙鹰", knife: "战术刀", he: "高爆手雷", smoke: "烟雾弹", fall: "坠落" };
const _m = new THREE.Vector3();

export interface CamFx { shake: number; landDip: number }

export class Feedback {
  private streak = 0;
  private streakT = -99;
  private tracerN = 0;
  private boltLatch = new WeakMap<Actor, boolean>();
  private reloadMarks = new WeakMap<Actor, number>();
  readonly fx: CamFx = { shake: 0, landDip: 0 };
  onPlayerDeath: (() => void) | null = null;

  constructor(
    private audio: AudioEngine, private effects: Effects, private chars: Characters, private vm: Viewmodel, private hud: Hud,
    private camPos: THREE.Vector3, private camera: THREE.PerspectiveCamera,
  ) {}

  reset(): void {
    this.streak = 0;
    this.streakT = -99;
    this.fx.shake = this.fx.landDip = 0;
  }

  private occluded(sim: Sim, p: [number, number, number]): boolean {
    const c = this.camPos;
    return sim.world.segmentBlocked(c.x, c.y, c.z, p[0], p[1], p[2], bulletFilter);
  }

  private at3d(sim: Sim, id: SoundId, p: [number, number, number], gain: number, prio: number, refDist = 3, rate = 1): void {
    const d = Math.hypot(p[0] - this.camPos.x, p[1] - this.camPos.y, p[2] - this.camPos.z);
    if (prio === 0 && d > 32) return;
    this.audio.play(id, { pos: p, gain, prio, refDist, rate, occluded: d > 2 && this.occluded(sim, p) });
  }

  /** 每个模拟步后调用 */
  handle(sim: Sim, me: Actor | null, events: readonly SimEvent[]): void {
    for (const e of events) {
      switch (e.type) {
        case "shot": this.shot(sim, me, e); break;
        case "hit": this.hit(sim, me, e); break;
        case "kill": this.kill(sim, me, e); break;
        case "inv": this.inv(sim, me, e.actor, e.ev); break;
        case "step": {
          const a = e.actor;
          const id = `step${(a.stepDist * 997 + a.id + sim.stepCount) % 4 | 0}` as SoundId;
          if (a === me) this.audio.play(id, { gain: 0.32 * e.loud, prio: 0, rate: 0.95 + (sim.stepCount % 7) * 0.015 });
          else this.at3d(sim, id, [a.x, a.y + 0.1, a.z], 0.9 * e.loud, 0, 2.5);
          break;
        }
        case "land": {
          const a = e.actor;
          if (a === me) { this.audio.play("land", { gain: Math.min(1, e.speed / 8) * 0.6, prio: 1 }); this.vm.onLand(e.speed); this.fx.landDip = Math.min(1, e.speed / 9); }
          else this.at3d(sim, "land", [a.x, a.y, a.z], Math.min(1, e.speed / 8), 0, 3);
          break;
        }
        case "jump": if (e.actor === me) this.audio.play("jump", { gain: 0.4, prio: 0 }); break;
        case "bounce": this.at3d(sim, "bounce", [e.nade.x, e.nade.y, e.nade.z], 0.8, 1, 3); break;
        case "blast": {
          this.effects.explosion(e.x, e.y, e.z);
          this.at3d(sim, "blast", [e.x, e.y + 0.3, e.z], 1.4, 3, 8);
          const d = Math.hypot(e.x - this.camPos.x, e.z - this.camPos.z);
          this.fx.shake = Math.max(this.fx.shake, Math.max(0, 1 - d / 18));
          break;
        }
        case "smoke": this.at3d(sim, "smoke_hiss", [e.smoke.x, e.smoke.y + 0.2, e.smoke.z], 0.9, 1, 4); break;
        case "melee": if (e.hit) this.at3d(sim, "stab", e.actor.eye(), 1, 2, 3); break;
        case "respawn": if (e.actor === me) this.audio.play("switch", { gain: 0.4, prio: 1 }); break;
        case "diag": console.warn(`[诊断] ${e.msg}`); break;
        default: break;
      }
    }
  }

  private shot(sim: Sim, me: Actor | null, e: Extract<SimEvent, { type: "shot" }>): void {
    const a = e.actor;
    const id = `shot_${e.weapon}` as SoundId;
    let from = e.from;
    if (a === me) {
      this.vm.onShot(e.weapon);
      this.audio.play(id, { gain: 0.85, prio: 3, rate: 0.97 + (sim.stepCount % 5) * 0.012 });
      // 曳光起点：视模枪口投影到世界（同一屏幕位置、约 0.6 m 深度）
      this.vm.muzzleLocal(_m).project(this.vm.camera);
      _m.z = 0.5;
      _m.unproject(this.camera).sub(this.camera.position).normalize().multiplyScalar(0.6).add(this.camera.position);
      from = [_m.x, _m.y, _m.z];
    } else {
      this.chars.muzzleFlash(a.id);
      this.at3d(sim, id, e.from, 1, 2, e.weapon === "awm" ? 9 : 6);
    }
    for (const i of e.impacts) this.effects.impact(i);
    if (!e.muzzleBlocked && (e.weapon === "awm" || e.weapon === "deagle" || this.tracerN++ % 3 === 0)) this.effects.tracer(from, e.to);
  }

  private hit(sim: Sim, me: Actor | null, e: Extract<SimEvent, { type: "hit" }>): void {
    const head = e.zone === "head";
    if (e.zone !== "blast") this.effects.blood(e.at[0], e.at[1], e.at[2], head);
    if (me && e.attacker === me && e.victim !== me) {
      this.hud.flashHit(head);
      this.audio.play(head ? "hit_head" : "hit", { gain: 0.7, prio: 3 });
    }
    if (me && e.victim === me) {
      this.hud.damageFrom(e.attacker === me ? [me.x, me.y, me.z + 0.01] : e.attacker.eye());
      this.audio.play("hurt", { gain: 0.6, prio: 3 });
      this.fx.shake = Math.max(this.fx.shake, Math.min(0.6, e.dmg.health / 60));
    } else if (!me || e.attacker !== me) {
      this.at3d(sim, "hit", e.at, 0.35, 1, 2);
    }
  }

  private kill(sim: Sim, me: Actor | null, e: Extract<SimEvent, { type: "kill" }>): void {
    if (!me) return;
    if (e.killer === me && e.victim !== me) {
      if (sim.time - this.streakT > 4) this.streak = 0;
      this.streak++;
      this.streakT = sim.time;
      const multi = ["", "", "双杀", "三杀", "四杀", "五杀"][Math.min(5, this.streak)] || `${this.streak} 连杀`;
      this.hud.killNotice(`${e.headshot ? "爆头击杀" : "击杀"} ${e.victim.name}${multi ? ` · ${multi}` : ""}${e.penetrated ? " · 穿透" : ""}`, e.headshot);
      this.audio.play("kill", { gain: 0.6, prio: 3 });
    }
    if (e.victim === me) {
      const by = e.killer === me ? (e.cause === "fall" ? "你坠落了" : "你被自己的手雷炸倒") : `被 <b class="t${e.killer.team}">${e.killer.name}</b> 使用 ${CAUSE[e.cause] ?? e.cause} 击倒${e.headshot ? "（爆头）" : ""}`;
      this.hud.setDeath(by);
      this.onPlayerDeath?.();
    }
  }

  private inv(sim: Sim, me: Actor | null, a: Actor, ev: Extract<SimEvent, { type: "inv" }>["ev"]): void {
    const mine = a === me;
    const p = a.eye();
    const play = (id: SoundId, gain: number, prio = 1) => (mine ? this.audio.play(id, { gain: gain * 0.7, prio }) : this.at3d(sim, id, p, gain, prio, 2));
    switch (ev.type) {
      case "dry": play("dry", 0.8, 2); break;
      case "reloadStart": if (!mine) play("mag_out", 0.7); this.reloadMarks.set(a, 0); break;
      case "reloadDone": break;
      case "switch": play(ev.slot === 2 ? "draw_knife" : "switch", 0.6); break;
      case "scope": if (mine) this.audio.play("dry", { gain: 0.25, rate: 0.6, prio: 1 }); break;
      case "meleeSwing": play("swing", 0.8); break;
      case "throw": play("throw", 0.8); break;
      default: break;
    }
  }

  /** 与动画关键帧同步的机械声（按实际换弹/拉栓进度触发） */
  mechanics(me: Actor | null): void {
    if (!me || !me.alive) return;
    const g = me.inv.gun;
    if (!g) return;
    if (g.reloading) {
      const k = g.reloadProgress, [ko, ki] = g.def.reloadKeys;
      const mark = this.reloadMarks.get(me) ?? 0;
      if (mark < 1 && k >= ko) { this.audio.play("mag_out", { gain: 0.55, prio: 2 }); this.reloadMarks.set(me, 1); }
      else if (mark < 2 && k >= ki) { this.audio.play("mag_in", { gain: 0.6, prio: 2 }); this.reloadMarks.set(me, 2); }
    } else this.reloadMarks.set(me, 0);
    if (g.def.mode === "bolt") {
      const busy = g.boltProgress < 1 && !g.reloading;
      if (busy && g.boltProgress > 0.12 && !this.boltLatch.get(me)) { this.audio.play("bolt", { gain: 0.6, prio: 2 }); this.boltLatch.set(me, true); }
      if (!busy) this.boltLatch.set(me, false);
    }
  }
}
