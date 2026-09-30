import { describe, expect, it } from "vitest";
import { GUNS, SIM_DT } from "../src/config";
import { Inventory } from "../src/combat/weapons";

function tick(inv: Inventory, seconds: number): number {
  let shots = 0;
  for (let i = 0; i < Math.round(seconds / SIM_DT); i++) {
    inv.tick(SIM_DT);
    for (const e of inv.events) if (e.type === "shot") shots++;
    inv.events.length = 0;
  }
  return shots;
}

const total = (inv: Inventory) => inv.primary.mag + inv.primary.reserve;

describe("inventory", () => {
  it("auto fire respects rpm and stops immediately on release", () => {
    const inv = new Inventory("ak");
    tick(inv, 1); // 切出完成
    inv.setTrigger(true);
    const shots = tick(inv, 1.0);
    expect(shots).toBeGreaterThanOrEqual(10);
    expect(shots).toBeLessThanOrEqual(11); // 600 rpm
    inv.setTrigger(false);
    expect(tick(inv, 0.5)).toBe(0);
  });

  it("conserves ammo across reloads, partial mags and empty reserve", () => {
    const inv = new Inventory("ak");
    tick(inv, 1);
    const start = total(inv);
    inv.setTrigger(true);
    const fired = tick(inv, 0.8);
    inv.setTrigger(false);
    expect(total(inv)).toBe(start - fired);
    inv.reload();
    inv.reload(); // 重复触发不增加弹药
    tick(inv, GUNS.ak.reloadTime + 0.1);
    expect(inv.primary.mag).toBe(30);
    expect(total(inv)).toBe(start - fired);
    // 打空全部弹药
    for (let k = 0; k < 10; k++) {
      inv.setTrigger(true);
      tick(inv, 3.5);
      inv.setTrigger(false);
      tick(inv, GUNS.ak.reloadTime + 0.2);
    }
    expect(total(inv)).toBe(0);
    expect(inv.primary.canReload()).toBe(false);
  });

  it("switching during reload cancels it without creating ammo", () => {
    const inv = new Inventory("m4");
    tick(inv, 1);
    inv.setTrigger(true);
    tick(inv, 0.5);
    inv.setTrigger(false);
    const before = { mag: inv.primary.mag, reserve: inv.primary.reserve };
    inv.reload();
    tick(inv, 1.0);
    inv.select(1);
    tick(inv, 3);
    inv.select(0);
    tick(inv, 1);
    expect(inv.primary.mag).toBe(before.mag);
    expect(inv.primary.reserve).toBe(before.reserve);
  });

  it("semi-auto pistol fires once per click and honours its interval", () => {
    const inv = new Inventory("ak");
    inv.select(1);
    tick(inv, 1);
    inv.setTrigger(true);
    expect(tick(inv, 1)).toBe(1);
    inv.setTrigger(false);
    let shots = 0;
    for (let i = 0; i < 20; i++) {
      inv.setTrigger(true);
      shots += tick(inv, 0.05);
      inv.setTrigger(false);
      shots += tick(inv, 0.05);
    }
    expect(shots).toBeLessThanOrEqual(Math.ceil(2 / (60 / GUNS.deagle.rpm)) + 1);
  });

  it("sniper bolt cannot be bypassed by switching weapons", () => {
    const inv = new Inventory("awm");
    tick(inv, 1);
    const times: number[] = [];
    let t = 0;
    const step = (held: boolean) => {
      inv.setTrigger(held);
      inv.tick(SIM_DT);
      t += SIM_DT;
      for (const e of inv.events) if (e.type === "shot") times.push(t);
      inv.events.length = 0;
    };
    step(true);
    step(false);
    expect(times.length).toBe(1);
    // 快速切到手枪再切回，并连续点击
    inv.select(1);
    for (let i = 0; i < 6; i++) step(false);
    inv.select(0);
    for (let i = 0; i < 600 && times.length < 2; i++) step(i % 2 === 0);
    expect(times.length).toBe(2);
    expect(times[1] - times[0]).toBeGreaterThanOrEqual(GUNS.awm.boltTime! - SIM_DT);
  });

  it("scoping cycles zoom levels and firing drops the scope", () => {
    const inv = new Inventory("awm");
    tick(inv, 1);
    inv.alt();
    expect(inv.scope).toBe(1);
    inv.alt();
    expect(inv.scope).toBe(2);
    inv.setTrigger(true);
    tick(inv, SIM_DT * 2);
    expect(inv.scope).toBe(0);
  });

  it("grenades consume inventory once and fall back to the primary", () => {
    const inv = new Inventory("ak");
    tick(inv, 1);
    inv.quickThrow();
    let throws = 0;
    for (let i = 0; i < 120; i++) {
      inv.tick(SIM_DT);
      for (const e of inv.events) if (e.type === "throw") throws++;
      inv.events.length = 0;
    }
    expect(throws).toBe(1);
    expect(inv.nades.he).toBe(0);
    expect(inv.slot).toBe(0);
    inv.select(3);
    expect(inv.nadeSel).toBe("smoke");
  });

  it("respawn restores full ammo and applies the newly chosen primary", () => {
    const inv = new Inventory("ak");
    tick(inv, 1);
    inv.setTrigger(true);
    tick(inv, 1);
    inv.respawn("mp5");
    expect(inv.primary.def.id).toBe("mp5");
    expect(inv.primary.mag).toBe(30);
    expect(inv.primary.reserve).toBe(120);
    expect(inv.nades).toEqual({ he: 1, smoke: 1 });
  });
});
