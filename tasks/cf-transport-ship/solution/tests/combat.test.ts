import { describe, expect, it } from "vitest";
import { GUNS, KNIFE } from "../src/config";
import {
  type Combatant, applyDamage, blastDamage, gunDamage, headCenter, chestCenter, resolveMelee, resolveShot,
} from "../src/combat/combat";
import { type Smoke, smokeBlocks } from "../src/combat/projectiles";
import { type BoxSpec, World } from "../src/core/world";
import { Match } from "../src/game/match";

const floor: BoxSpec = { id: "floor", kind: "deck", mat: "steel", c: [0, -0.2, 0], h: [60, 0.2, 20] };

function dummy(id: number, team: 0 | 1, x: number, z = 0, o: Partial<Combatant> = {}): Combatant {
  return { id, team, alive: true, x, y: 0, z, yaw: Math.PI / 2, crouch: 0, health: 100, armor: 0, protect: 0, ...o };
}

const shooter = dummy(1, 0, 0);
shooter.yaw = -Math.PI / 2;
const EYE: [number, number, number] = [0, 1.62, 0];
const MUZZLE: [number, number, number] = [0.25, 1.45, -0.12];

function aimAt(p: [number, number, number]): [number, number, number] {
  const d = [p[0] - EYE[0], p[1] - EYE[1], p[2] - EYE[2]];
  const l = Math.hypot(d[0], d[1], d[2]);
  return [d[0] / l, d[1] / l, d[2] / l];
}

function shoot(world: World, target: Combatant, gun = GUNS.ak, at = chestCenter(target), others: Combatant[] = []) {
  return resolveShot(world, gun, shooter, [target, ...others], EYE, aimAt(at), MUZZLE);
}

describe("shot resolution", () => {
  const open = new World([floor]);
  const target = dummy(2, 1, 20);

  it("hits head, torso and legs as distinct zones", () => {
    expect(shoot(open, target, GUNS.ak, headCenter(target)).zone).toBe("head");
    expect(shoot(open, target).zone).toBe("torso");
    expect(shoot(open, target, GUNS.ak, [20, 0.4, 0]).zone).toBe("leg");
  });

  it("the head zone is narrower than the body (shot beside the head misses)", () => {
    const [hx, hy, hz] = headCenter(target);
    const r = shoot(open, target, GUNS.ak, [hx, hy + 0.05, hz + 0.3]);
    expect(r.victim).toBeNull();
  });

  it("steel cover blocks the shot; the same target in the open is hit", () => {
    const steel = new World([floor, { id: "c", kind: "container", mat: "steel", c: [10, 1.3, 0], h: [0.1, 1.3, 1.2] }]);
    expect(shoot(open, target).victim?.id).toBe(2);
    const r = shoot(steel, target);
    expect(r.victim).toBeNull();
    expect(r.impacts[0].mat).toBe("steel");
  });

  it("rifle penetrates a small wood crate with reduced damage; wood backed by steel stops it", () => {
    const wood = new World([floor, { id: "w", kind: "crate", mat: "wood", c: [10, 0.9, 0], h: [0.45, 0.9, 0.45] }]);
    const r = shoot(wood, target);
    expect(r.victim?.id).toBe(2);
    expect(r.penetrated).toBe(1);
    expect(r.damageMul).toBeLessThan(1);
    expect(r.impacts.some((i) => i.exit)).toBe(true);
    const backed = new World([floor,
      { id: "w", kind: "crate", mat: "wood", c: [10, 0.9, 0], h: [0.45, 0.9, 0.45] },
      { id: "s", kind: "wall", mat: "steel", c: [10.6, 0.9, 0], h: [0.05, 0.9, 0.6] }]);
    expect(shoot(backed, target).victim).toBeNull();
  });

  it("only the sniper penetrates a big crate; rifles penetrate a small one, pistol and SMG neither", () => {
    const big = new World([floor, { id: "w", kind: "crate", mat: "wood", c: [10, 0.9, 0], h: [0.9, 0.9, 0.9] }]);
    expect(shoot(big, target, GUNS.mp5).victim).toBeNull();
    expect(shoot(big, target, GUNS.deagle).victim).toBeNull();
    expect(shoot(big, target, GUNS.m4).victim).toBeNull();
    expect(shoot(big, target, GUNS.ak).victim).toBeNull();
    expect(shoot(big, target, GUNS.awm).victim?.id).toBe(2);
    const small = new World([floor, { id: "w", kind: "crate", mat: "wood", c: [10, 0.9, 0], h: [0.45, 0.9, 0.45] }]);
    expect(shoot(small, target, GUNS.mp5).victim).toBeNull();
    expect(shoot(small, target, GUNS.m4).victim?.id).toBe(2);
  });

  it("nearest target is hit first; a teammate in front absorbs the shot unharmed", () => {
    const near = dummy(3, 1, 10);
    expect(shoot(open, target, GUNS.ak, chestCenter(target), [near]).victim?.id).toBe(3);
    const mate = dummy(4, 0, 10);
    const r = shoot(open, target, GUNS.ak, chestCenter(target), [mate]);
    expect(r.victim).toBeNull();
    expect(r.dist).toBeGreaterThan(9);
  });

  it("muzzle pressed into a wall is blocked even if the eye sees past it", () => {
    // 墙体位于眼睛与枪口之间（眼睛可越过墙顶看见目标）
    const lip = new World([floor, { id: "lip", kind: "crate", mat: "steel", c: [0.12, 0.75, -0.06], h: [0.05, 0.8, 0.5] }]);
    const r = shoot(lip, target);
    expect(r.muzzleBlocked).toBe(true);
    expect(r.victim).toBeNull();
  });
});

describe("damage", () => {
  it("rifle torso kills an unarmoured target in 3-4 hits and a sniper torso hit kills", () => {
    const ak = gunDamage(GUNS.ak, 20, "torso", 1);
    expect(Math.ceil(100 / ak)).toBeGreaterThanOrEqual(3);
    expect(Math.ceil(100 / ak)).toBeLessThanOrEqual(4);
    const m4 = gunDamage(GUNS.m4, 20, "torso", 1);
    expect(Math.ceil(100 / m4)).toBe(4);
    const v = dummy(9, 1, 0, 0, { armor: 100 });
    const ev = applyDamage(v, shooter, gunDamage(GUNS.awm, 40, "torso", 1), "torso", GUNS.awm.armorRatio, "awm");
    expect(ev.killed).toBe(true);
    const leg = dummy(10, 1, 0, 0, { armor: 100 });
    expect(applyDamage(leg, shooter, gunDamage(GUNS.awm, 40, "leg", 1), "leg", GUNS.awm.armorRatio, "awm").killed).toBe(false);
  });

  it("head > torso > leg for the same gun", () => {
    const h = gunDamage(GUNS.ak, 20, "head", 1), t = gunDamage(GUNS.ak, 20, "torso", 1), l = gunDamage(GUNS.ak, 20, "leg", 1);
    expect(h).toBeGreaterThan(t);
    expect(t).toBeGreaterThan(l);
  });

  it("armour absorbs part of the damage and legs bypass armour", () => {
    const a = dummy(5, 1, 0, 0, { armor: 100 });
    const ev = applyDamage(a, shooter, 36, "torso", 0.775, "ak");
    expect(ev.health).toBe(28);
    expect(ev.armor).toBe(4);
    const b = dummy(6, 1, 0, 0, { armor: 100 });
    expect(applyDamage(b, shooter, 27, "leg", 0.775, "ak").health).toBe(27);
    expect(b.armor).toBe(100);
  });

  it("death is scored once; further hits on a corpse are ignored", () => {
    const v = dummy(7, 1, 0);
    const first = applyDamage(v, shooter, 150, "head", 1, "ak");
    const second = applyDamage(v, shooter, 150, "head", 1, "ak");
    expect(first.killed).toBe(true);
    expect(second.killed).toBe(false);
    expect(second.blocked).toBe("dead");
  });

  it("friendly fire and spawn protection deal no damage", () => {
    const mate = dummy(8, 0, 0);
    expect(applyDamage(mate, shooter, 50, "torso", 1, "ak").blocked).toBe("friendly");
    const prot = dummy(11, 1, 0, 0, { protect: 1 });
    expect(applyDamage(prot, shooter, 50, "torso", 1, "ak").blocked).toBe("protect");
    expect(prot.health).toBe(100);
  });
});

describe("melee, blast and smoke", () => {
  const open = new World([floor]);
  it("knife only hits within range and not through walls", () => {
    const fwd: [number, number, number] = [1, 0, 0];
    const near = dummy(2, 1, 1.2);
    expect(resolveMelee(open, shooter, [near], EYE, fwd, KNIFE.light)?.victim.id).toBe(2);
    const far = dummy(3, 1, 3);
    expect(resolveMelee(open, shooter, [far], EYE, fwd, KNIFE.light)).toBeNull();
    const walled = new World([floor, { id: "w", kind: "wall", mat: "hull", c: [0.6, 1.2, 0], h: [0.05, 1.2, 1] }]);
    expect(resolveMelee(walled, shooter, [near], EYE, fwd, KNIFE.light)).toBeNull();
  });

  it("grenade damage falls off with distance and is stopped by a bulkhead", () => {
    const t = dummy(2, 1, 2);
    const close = blastDamage(open, 0, 0.1, 0, t);
    const farT = dummy(3, 1, 5);
    expect(close).toBeGreaterThan(blastDamage(open, 0, 0.1, 0, farT));
    const wall = new World([floor, { id: "w", kind: "wall", mat: "hull", c: [1, 2, 0], h: [0.1, 2.5, 3] }]);
    expect(blastDamage(wall, 0, 0.1, 0, t)).toBe(0);
  });

  it("an active smoke cloud blocks sight across it but not a line beside it", () => {
    const s: Smoke = { id: 1, x: 10, y: 0, z: 0, age: 3 };
    expect(smokeBlocks([s], 0, 1.6, 0, 20, 1.6, 0)).toBe(true);
    expect(smokeBlocks([s], 0, 1.6, 8, 20, 1.6, 8)).toBe(false);
    const faded = { ...s, age: 40 };
    expect(smokeBlocks([faded], 0, 1.6, 0, 20, 1.6, 0)).toBe(false);
  });
});

describe("match", () => {
  it("ends once on the kill target and ignores later kills", () => {
    const m = new Match({ killTarget: 3, timeLimit: 600 });
    m.recordKill(0, 1, false);
    m.recordKill(0, 1, false);
    const r = m.recordKill(0, 1, false);
    expect(r.end?.winner).toBe(0);
    expect(m.recordKill(1, 0, false).counted).toBe(false);
    expect(m.tick(1000)).toBeNull();
    expect(m.endCount).toBe(1);
  });

  it("time limit picks the leader or a draw", () => {
    const a = new Match({ killTarget: 100, timeLimit: 10 });
    a.recordKill(1, 0, false);
    expect(a.tick(11)?.winner).toBe(1);
    const b = new Match({ killTarget: 100, timeLimit: 10 });
    expect(b.tick(11)).toEqual({ winner: null, reason: "time" });
  });

  it("suicides are not scored", () => {
    const m = new Match({ killTarget: 100, timeLimit: 10 });
    expect(m.recordKill(0, 0, true).counted).toBe(false);
    expect(m.score).toEqual([0, 0]);
  });
});
