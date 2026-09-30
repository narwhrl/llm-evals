import { describe, expect, it } from "vitest";
import { NavGraph } from "../src/ai/nav";
import { SIM_DT } from "../src/config";
import { World } from "../src/core/world";
import { yawTo } from "../src/game/actor";
import { Sim } from "../src/game/sim";
import { buildLayout, spawnPoints } from "../src/map/layout";

const world = new World(buildLayout());
const nav = NavGraph.build(world, [...spawnPoints(0), ...spawnPoints(1)]);

function botSim(seed: number, killTarget = 100, timeLimit = 600) {
  return new Sim({ world, nav, difficulty: "normal", rules: { killTarget, timeLimit }, seed, playerTeam: null, playerPrimary: "ak" });
}

describe("bot match (seeded, headless)", () => {
  it("both teams score real kills, reload, throw and use several routes in 3 minutes", () => {
    const sim = botSim(7);
    const zones = [new Set<string>(), new Set<string>()];
    let reloads = 0, throws = 0, oob = 0;
    for (let i = 0; i < 180 / SIM_DT; i++) {
      sim.step(SIM_DT);
      for (const e of sim.events) {
        if (e.type === "inv" && e.ev.type === "reloadDone") reloads++;
        if (e.type === "inv" && e.ev.type === "throw") throws++;
        if (e.type === "diag") oob++;
      }
      if (i % 120 === 0)
        for (const a of sim.actors) {
          if (!a.alive) continue;
          const n = nav.nearest(a.x, a.y, a.z, 3);
          if (n >= 0) zones[a.team].add(nav.nodes[n].zone);
        }
    }
    expect(sim.match.score[0]).toBeGreaterThan(5);
    expect(sim.match.score[1]).toBeGreaterThan(5);
    expect(reloads).toBeGreaterThan(5);
    expect(throws).toBeGreaterThan(0);
    expect(oob).toBe(0);
    for (const z of zones) {
      expect(z.has("deck")).toBe(true);
      expect(z.has("laneN") || z.has("laneS")).toBe(true);
    }
    // 比分与击杀记录一致
    const kills = sim.actors.reduce((s, a) => s + a.kills, 0);
    expect(kills).toBe(sim.match.score[0] + sim.match.score[1]);
  });

  it("a short match finishes exactly once and then stops producing damage", () => {
    const sim = botSim(11, 15, 600);
    let ends = 0;
    for (let i = 0; i < 600 / SIM_DT && !sim.ended; i++) {
      sim.step(SIM_DT);
      for (const e of sim.events) if (e.type === "end") ends++;
    }
    expect(sim.ended).toBe(true);
    expect(ends).toBe(1);
    expect(Math.max(...sim.match.score)).toBe(15);
    const log = sim.damageLog.length;
    for (let i = 0; i < 240; i++) sim.step(SIM_DT);
    expect(sim.damageLog.length).toBe(log);
    expect(sim.match.endCount).toBe(1);
  });

  it("dead actors respawn after the delay with full health and ammo", () => {
    const sim = botSim(3);
    const v = sim.actors[6];
    let died = -1, back = -1;
    for (let i = 0; i < 200 / SIM_DT && back < 0; i++) {
      sim.step(SIM_DT);
      for (const e of sim.events) {
        if (e.type === "kill" && e.victim === v && died < 0) died = sim.time;
        if (e.type === "respawn" && e.actor === v && died >= 0) back = sim.time;
      }
    }
    expect(died).toBeGreaterThan(0);
    expect(back - died).toBeCloseTo(3, 1);
    expect(v.health).toBe(100);
    expect(v.armor).toBe(100);
    expect(v.inv.primary.mag).toBe(v.inv.primary.def.mag);
  });
});

describe("player shot through the real fire path", () => {
  function playerSim() {
    const sim = new Sim({ world, nav, difficulty: "normal", rules: { killTarget: 100, timeLimit: 600 }, seed: 1, playerTeam: 0, playerPrimary: "ak" });
    sim.freezeBots = true;
    for (const a of sim.actors) if (!a.isPlayer) { a.alive = false; a.respawnT = -1; }
    const p = sim.player!;
    p.motor.place(-20, 0, 0);
    p.protect = 0;
    return { sim, p };
  }
  function fireOnce(sim: Sim, p: ReturnType<typeof playerSim>["p"], at: [number, number, number]) {
    const e = p.eye();
    p.yaw = yawTo(at[0] - e[0], at[2] - e[2]);
    p.pitch = Math.atan2(at[1] - e[1], Math.hypot(at[0] - e[0], at[2] - e[2]));
    p.kickP = p.kickY = 0;
    for (let i = 0; i < 120; i++) sim.step(SIM_DT); // 切出完成
    p.intent.fire = true;
    sim.step(SIM_DT);
    p.intent.fire = false;
    for (let i = 0; i < 30; i++) sim.step(SIM_DT);
  }

  it("damages an exposed dummy; a container between them blocks it", () => {
    const { sim, p } = playerSim();
    const d = sim.spawnDummy(1, -12, 0, -1.4, Math.PI / 2);
    fireOnce(sim, p, [d.x, d.y + 1.2, d.z]);
    expect(d.health).toBeLessThan(100);
    // 北舷集装箱后方：从甲板中线射向 z=9.5 的靶，必然穿过 row 集装箱（钢）
    const hidden = sim.spawnDummy(1, -16.28, 0, 10.6, Math.PI);
    p.motor.place(-16.28, 0, 3);
    fireOnce(sim, p, [hidden.x, hidden.y + 1.2, hidden.z]);
    expect(hidden.health).toBe(100);
  });
});
