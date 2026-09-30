import { describe, expect, it } from "vitest";
import { NavGraph } from "../src/ai/nav";
import { MATCH, MAX_FRAME_DT, SIM_DT } from "../src/config";
import { World } from "../src/core/world";
import { FixedStep } from "../src/game/loop";
import { Sim } from "../src/game/sim";
import { FrameStats } from "../src/game/stats";
import { buildLayout, spawnPoints } from "../src/map/layout";
import { DEFAULTS, sanitize, vfovFromH } from "../src/ui/settings";

const world = new World(buildLayout());
const nav = NavGraph.build(world, [...spawnPoints(0), ...spawnPoints(1)]);

/** 以给定刷新率运行 5 秒：玩家按住前进并持续开火（M4 自动），电脑冻结 */
function run(hz: number) {
  const sim = new Sim({ world, nav, difficulty: "normal", rules: MATCH.standard, seed: 11, playerTeam: 0, playerPrimary: "m4" });
  sim.freezeBots = true;
  for (const a of sim.actors) if (!a.isPlayer) { a.motor.place(40, 0, -10 + a.id * 0.9); a.intent.fire = false; }
  const me = sim.player!;
  me.motor.place(-24, 0, -4);
  me.yaw = -Math.PI / 2; // 面向 +X
  me.pitch = -0.3;
  me.protect = 0;
  me.inv.slot = 0; me.inv.drawT = 0;
  const loop = new FixedStep();
  let shots = 0;
  const frame = 1 / hz;
  for (let t = 0; t < 5 - 1e-9; t += frame) {
    loop.advance(frame, () => {
      me.intent.fwd = 1;
      me.intent.fire = true;
      sim.step(SIM_DT);
      for (const e of sim.events) if (e.type === "shot" && e.actor === me) shots++;
    });
  }
  return { x: me.x, z: me.z, shots, steps: loop.steps };
}

describe("帧率独立（固定步长）", () => {
  it("30 / 60 / 144 Hz 下移动距离与开火次数一致（差异不超过一个模拟步）", () => {
    const r = [run(30), run(60), run(144)];
    for (const k of r) {
      expect(Math.abs(k.steps - 600)).toBeLessThanOrEqual(1);
      expect(Math.abs(k.x - r[0].x)).toBeLessThan(0.05);
      expect(Math.abs(k.z - r[0].z)).toBeLessThan(0.05);
      expect(Math.abs(k.shots - r[0].shots)).toBeLessThanOrEqual(1);
    }
    expect(r[0].shots).toBeGreaterThan(20); // 实际发生了连发（含换弹）
    expect(r[0].x - -24).toBeGreaterThan(3); // 实际发生了移动（前方木箱会挡住，属于正常碰撞）
  });

  it("单帧超长间隔（失焦恢复）最多推进 MAX_FRAME_DT，不补算滞后时间", () => {
    const loop = new FixedStep();
    let n = 0;
    loop.advance(5, () => { n++; });
    let acc = MAX_FRAME_DT, want = 0;
    while (acc >= SIM_DT) { acc -= SIM_DT; want++; }
    expect(n).toBe(want);
    expect(n).toBeLessThanOrEqual(12);
  });

  it("回调返回 false（对局结束）时立刻停止，丢弃剩余累积", () => {
    const loop = new FixedStep();
    let n = 0;
    loop.advance(0.05, () => (++n < 2 ? undefined : false));
    expect(n).toBe(2);
    expect(loop.acc).toBe(0);
  });
});

describe("设置", () => {
  it("非法或越界的存储值回退到默认/限制范围", () => {
    const s = sanitize({ sens: 99, fov: 10, quality: "ultra", invertY: "yes", master: Number.NaN, bob: false, extra: 1 });
    expect(s.sens).toBe(5);
    expect(s.fov).toBe(75);
    expect(s.quality).toBe(DEFAULTS.quality);
    expect(s.invertY).toBe(false);
    expect(s.master).toBe(DEFAULTS.master);
    expect(s.bob).toBe(false);
    expect("extra" in s).toBe(false);
    expect(sanitize(null)).toEqual(DEFAULTS);
  });

  it("水平视野换算：16:10 下 95° 水平约为 68° 垂直", () => {
    expect(vfovFromH(95, 1440 / 900)).toBeCloseTo(68.3, 0);
    expect(vfovFromH(90, 1)).toBeCloseTo(90, 5);
  });
});

describe("帧时间统计", () => {
  it("分位数与卡顿计数来自实际采样", () => {
    const f = new FrameStats(100);
    for (let i = 0; i < 98; i++) f.push(16);
    f.push(70); f.push(100);
    const s = f.summary(1e9);
    expect(s.n).toBe(100);
    expect(s.p50).toBe(16);
    expect(s.p99).toBe(70);
    expect(s.maxMs).toBe(100);
    expect(s.hitches).toBe(2);
  });
});
