// 调试/验收入口（仅 ?debug 时挂载到 window.__cf）。全部复用正式的碰撞、战斗、对局逻辑：
// 输入通过 Input 注入，靶子通过 Sim.spawnDummy 生成，不直接改写生命或比分。
import { SIM_DT, type Slot } from "../config";
import type { Team } from "../map/layout";
import type { App } from "./app";

export function installDebug(app: App): void {
  const api = {
    app,
    state() {
      const sim = app.sim, me = app.player;
      const s = app.stats.summary();
      const info = app.renderer.info;
      return {
        state: app.state, seed: sim?.opts.seed ?? null, time: sim?.time ?? 0, steps: sim?.stepCount ?? 0,
        score: sim?.match.score ?? null, remaining: sim?.match.remaining ?? null, ended: sim?.match.ended ?? null, endCount: sim?.match.endCount ?? 0,
        player: me && {
          x: +me.x.toFixed(3), y: +me.y.toFixed(3), z: +me.z.toFixed(3), yaw: +me.yaw.toFixed(4), pitch: +me.pitch.toFixed(4),
          eyeY: +me.motor.eyeY.toFixed(3), crouch: +me.crouch.toFixed(2), grounded: me.motor.grounded, alive: me.alive,
          health: me.health, armor: me.armor, protect: +me.protect.toFixed(2), respawnT: +me.respawnT.toFixed(2),
          slot: me.inv.slot, scope: me.inv.scope, primary: me.inv.primary.def.id, primaryChoice: me.primaryChoice,
          mag: me.inv.gun?.mag ?? null, reserve: me.inv.gun?.reserve ?? null, reloading: me.inv.gun?.reloading ?? false,
          boltProgress: me.inv.gun?.boltProgress ?? null, pistol: [me.inv.pistol.mag, me.inv.pistol.reserve], nades: { ...me.inv.nades },
          kills: me.kills, deaths: me.deaths, spread: sim!.spreadOf(me),
        },
        actors: sim?.actors.map((a) => ({
          id: a.id, name: a.name, team: a.team, alive: a.alive, dummy: a.dummy, x: +a.x.toFixed(2), y: +a.y.toFixed(2), z: +a.z.toFixed(2),
          health: a.health, armor: a.armor, kills: a.kills, deaths: a.deaths, weapon: a.inv.primary.def.id, brain: sim.brains.get(a.id)?.debug ?? "",
        })) ?? [],
        grenades: sim?.grenades.length ?? 0, smokes: sim?.smokes.length ?? 0, killfeed: sim?.killfeed.slice(-6) ?? [],
        damageLog: sim?.damageLog.slice(-12) ?? [],
        fx: app.effects.counts, audio: { active: app.audio.activeVoices, peak: app.audio.peakVoices, played: app.audio.played, state: app.audio.ctx?.state ?? "none", error: app.audio.error },
        render: { calls: info.render.calls, triangles: info.render.triangles, geometries: info.memory.geometries, textures: info.memory.textures, programs: info.programs?.length ?? 0 },
        perf: s, framesTotal: app.stats.total, hitchesTotal: app.stats.totalHitches, restarts: app.restarts,
        viewport: [window.innerWidth, window.innerHeight, window.devicePixelRatio, app.renderer.getPixelRatio()],
      };
    },
    teleport(x: number, y: number, z: number, yaw?: number, pitch?: number) {
      const me = app.player;
      if (!me) return false;
      me.motor.place(x, y, z);
      if (yaw !== undefined) me.yaw = yaw;
      if (pitch !== undefined) me.pitch = pitch;
      me.kickP = me.kickY = 0;
      app.resnapEye();
      return true;
    },
    aim(yaw: number, pitch: number) { const me = app.player; if (me) { me.yaw = yaw; me.pitch = pitch; } },
    freezeBots(on: boolean) { if (app.sim) app.sim.freezeBots = on; },
    spawnDummy(team: Team, x: number, y: number, z: number, yaw = 0, armor = 0) { return app.sim?.spawnDummy(team, x, y, z, yaw, armor).id ?? -1; },
    /** 移除指定角色以外的全部电脑（将其移出地图并冻结，用于隔离测试场景） */
    isolate() {
      const sim = app.sim;
      if (!sim) return;
      sim.freezeBots = true;
      for (const a of sim.actors) if (!a.isPlayer && !a.dummy) { a.motor.place(0, -50, 0); a.alive = false; a.respawnT = -1; }
    },
    key(code: string, down: boolean) { app.input.inject(code, down); },
    mouse(button: number, down: boolean) { app.input.injectButton(button, down); },
    look(dx: number, dy: number) { app.input.lookX += dx; app.input.lookY += dy; },
    select(slot: Slot) { app.input.inject(`Digit${slot + 1}`, true); app.input.inject(`Digit${slot + 1}`, false); },
    camera(p: [number, number, number] | null, yaw = 0, pitch = 0, fov?: number) { app.fixedCam = p ? { p, yaw, pitch, fov } : null; },
    /** 以固定步长快速推进正式模拟（不渲染），用于验证完整对局与结算 */
    fastForward(sec: number) { return app.fastForward(sec); },
    resetPerf() { app.stats.reset(); },
    pause() { app.pause(); },
    stepsPerSecond: 1 / SIM_DT,
  };
  (window as unknown as { __cf: typeof api }).__cf = api;
}
