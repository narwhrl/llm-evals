import { describe, expect, it } from "vitest";
import { SIM_DT } from "../src/config";
import { Motor, type MoveInput } from "../src/core/motor";
import { World } from "../src/core/world";
import { buildLayout, spawnPoints } from "../src/map/layout";

const world = new World(buildLayout());

function input(o: Partial<MoveInput> = {}): MoveInput {
  return { fwd: 0, right: 0, jump: false, crouch: false, walk: false, yaw: -Math.PI / 2, speedMul: 1, ...o };
}

function run(m: Motor, seconds: number, inp: MoveInput | ((t: number) => MoveInput), dt = SIM_DT): void {
  const n = Math.round(seconds / dt);
  for (let i = 0; i < n; i++) m.step(typeof inp === "function" ? inp(i * dt) : inp, dt, world);
}

describe("motor", () => {
  it("spawns on the platform floor without intersecting geometry", () => {
    for (const team of [0, 1] as const)
      for (const sp of spawnPoints(team)) {
        const m = new Motor();
        m.place(sp.x, sp.y, sp.z);
        run(m, 0.5, input());
        expect(m.y).toBeCloseTo(sp.y, 3);
        expect(Math.hypot(m.x - sp.x, m.z - sp.z)).toBeLessThan(0.01);
      }
  });

  it("walks from red spawn out of the centre door, down the stairs to the deck", () => {
    const m = new Motor();
    m.place(-43.5, 1.2, 0);
    run(m, 3, input({ fwd: 1 }));
    expect(m.x).toBeGreaterThan(-33);
    expect(m.y).toBeCloseTo(0, 2);
    expect(m.outOfBounds).toBe(false);
  });

  it("slides along the cabin front wall instead of passing through", () => {
    const m = new Motor();
    m.place(-43.5, 1.2, 0);
    // yaw = π/2 面向 -X，right 为 -Z：斜向撞向舱内隔墙（x = -44.9）
    run(m, 1.0, input({ fwd: 1, right: -0.4, yaw: Math.PI / 2 }));
    expect(m.x).toBeGreaterThan(-44.9 + 0.3);
    expect(m.z).toBeGreaterThan(1); // 沿墙向 +Z 滑动
  });

  it("cannot jump straight from the deck onto a container", () => {
    const m = new Motor();
    m.place(-16.28, 0, 5.2);
    run(m, 2, (t) => input({ yaw: Math.PI, fwd: 1, jump: t < 0.05 || (t > 0.9 && t < 0.95), crouch: t > 0.15 }));
    expect(m.y).toBeLessThan(0.5);
  });

  it("reaches the red high point via the small crate then big crate", () => {
    const m = new Motor();
    m.place(-35.2, 0, 5.4);
    // 面向 +X：跳上小箱
    run(m, 0.9, (t) => input({ fwd: 1, jump: t < 0.02, crouch: t > 0.1 && t < 0.55 }));
    expect(m.y).toBeCloseTo(0.9, 2);
    // 朝 (−32.4, 6.0) 大箱
    run(m, 0.9, (t) => input({ fwd: 1, jump: t < 0.02, crouch: t > 0.1 && t < 0.55, yaw: -Math.PI / 2 - 0.35 }));
    expect(m.y).toBeCloseTo(1.8, 2);
    // 朝北（+Z，yaw = π）上集装箱顶
    run(m, 1.0, (t) => input({ fwd: 1, jump: t < 0.02, crouch: t > 0.1 && t < 0.6, yaw: Math.PI - 0.5 }));
    expect(m.y).toBeCloseTo(2.6, 2);
  });

  it("stays crouched under the side-door lintel and can stand when clear", () => {
    const m = new Motor();
    m.place(-46.1, 1.2, 9.35);
    run(m, 0.3, input({ crouch: true }));
    expect(m.crouched).toBe(true);
    run(m, 0.3, input({ crouch: false }));
    expect(m.crouched).toBe(false); // 门高 2.2 m，可站立
  });

  it("does not tunnel through a wall at high speed with a large timestep", () => {
    const m = new Motor();
    m.place(-44, 1.2, -8);
    m.vx = 0; m.vz = -40;
    for (let i = 0; i < 30; i++) m.step(input(), SIM_DT, world);
    expect(m.z).toBeGreaterThan(-9.2);
  });

  it("covers the same distance at different frame counts (fixed step)", () => {
    const a = new Motor(), b = new Motor();
    a.place(-20, 0, -1); b.place(-20, 0, -1);
    run(a, 1, input({ fwd: 1 }));
    run(b, 1, input({ fwd: 1 }));
    expect(a.x).toBeCloseTo(b.x, 6);
    expect(a.x - -20).toBeGreaterThan(4.5);
  });
});
