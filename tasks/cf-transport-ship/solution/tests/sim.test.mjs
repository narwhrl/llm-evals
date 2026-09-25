import assert from "node:assert/strict";
import test from "node:test";
import { eyeOf, hitscan, segmentHit, smokeBlocks } from "../src/sim/combat.js";
import { JUMP } from "../src/sim/constants.js";
import { buildMap } from "../src/sim/map.js";
import { createMatch, emptyInput, step } from "../src/sim/match.js";
import { findPath } from "../src/sim/nav.js";
import { moveBody, overlapsSolid } from "../src/sim/physics.js";
import { WEAPONS } from "../src/sim/weapons.js";

const map = buildMap();

function body(partial) {
  return {
    x: 0,
    y: 0,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    grounded: true,
    crouch: false,
    ...partial,
  };
}

function walk(start, vx, vz, frames = 240) {
  const actor = body(start);
  let minY = actor.y;
  let maxY = actor.y;
  for (let i = 0; i < frames; i += 1) {
    actor.vx = vx;
    actor.vz = vz;
    moveBody(actor, 1 / 60, map.solids, map.floors);
    minY = Math.min(minY, actor.y);
    maxY = Math.max(maxY, actor.y);
  }
  return { actor, minY, maxY };
}

test("mid sightline runs from bow cabin to stern cabin", () => {
  const hit = segmentHit(map.sights.grDoor, map.sights.blDoor, map.solids);
  assert.equal(hit, null);
});

test("a side-lane crate blocks vision", () => {
  const hit = segmentHit(map.sights.sideFrom, map.sights.sideTo, map.solids);
  assert.ok(hit, "expected a crate in the side lane");
  assert.equal(hit.solid.pass, "wood");
});

test("flank platform sees the near lane and not the enemy cabin interior", () => {
  const lane = segmentHit(map.sights.platform, { x: 5.4, y: 1.55, z: 2.2 }, map.solids);
  const interior = segmentHit(map.sights.platform, map.sights.blInterior, map.solids);
  assert.equal(lane, null);
  assert.ok(interior);
});

test("rifles penetrate one wooden crate and smgs do not", () => {
  const origin = { x: -5.35, y: 1.2, z: -5.4 };
  const dir = { x: 0, y: 0, z: 1 };
  const target = {
    id: "target",
    team: "bl",
    alive: true,
    protect: 0,
    crouch: false,
    x: -5.35,
    y: 0,
    z: -1.2,
  };
  const rifle = hitscan(origin, dir, 20, map.solids, [target], { id: "a", team: "gr" }, WEAPONS.rifle);
  const smg = hitscan(origin, dir, 20, map.solids, [target], { id: "a", team: "gr" }, WEAPONS.smg);
  assert.ok(rifle.dealt.length === 1, "rifle should hit through wood");
  assert.ok(rifle.dealt[0].amount < WEAPONS.rifle.damage);
  assert.equal(smg.dealt.length, 0);
  assert.equal(smg.impacts.at(-1).kind, "wood");
});

test("iron and teammates stop a shot", () => {
  const origin = { x: -5.2, y: 0.7, z: -19.2 };
  const dir = { x: 0, y: 0, z: 1 };
  const enemy = { id: "e", team: "bl", alive: true, protect: 0, crouch: false, x: -5.2, y: 0, z: -16.2 };
  const blocked = hitscan(origin, dir, 20, map.solids, [enemy], { id: "a", team: "gr" }, WEAPONS.rifle);
  assert.equal(blocked.dealt.length, 0);
  const friend = { id: "f", team: "gr", alive: true, protect: 0, crouch: false, x: 0, y: 0, z: -10 };
  const held = hitscan({ x: 0, y: 1.6, z: -18 }, { x: 0, y: 0, z: 1 }, 30, map.solids, [friend], { id: "a", team: "gr" }, WEAPONS.carbine);
  assert.equal(held.friendly, true);
  assert.equal(held.dealt.length, 0);
});

test("headshots multiply damage", () => {
  const shooter = { id: "a", team: "gr" };
  const target = { id: "e", team: "bl", alive: true, protect: 0, crouch: false, x: 0, y: 0, z: 4 };
  const shot = hitscan({ x: 0, y: 1.62, z: 0 }, { x: 0, y: 0, z: 1 }, 20, [], [target], shooter, WEAPONS.rifle);
  assert.equal(shot.dealt[0].head, true);
  assert.ok(shot.dealt[0].amount > WEAPONS.rifle.damage * 2);
});

test("player can leave the bow cabin, cross mid, and climb the flank steps", () => {
  const out = walk({ x: 0, y: 0, z: -26 }, 0, 4.2, 700);
  assert.ok(out.actor.z > 16, `stopped at z=${out.actor.z}`);
  assert.ok(out.maxY < 0.4, `mid lane rose to ${out.maxY}`);
  const pipe = walk({ x: 7.48, y: 0, z: -24 }, 0, 3.2, 700);
  assert.ok(pipe.actor.z > 6.5, `pipe stopped at z=${pipe.actor.z}`);
  assert.ok(pipe.maxY > 1.4, `did not climb the flank, maxY=${pipe.maxY}`);
});

test("side lanes and the underdeck stay traversable", () => {
  const port = walk({ x: -6.15, y: 0, z: -18 }, 0, 3.4, 700);
  assert.ok(port.actor.z > 14, `port lane stuck at z=${port.actor.z} y=${port.actor.y}`);
  const star = walk({ x: 6.15, y: 0, z: -18 }, 0, 3.2, 700);
  assert.ok(star.actor.z > 14, `starboard lane stuck at z=${star.actor.z} y=${star.actor.y}`);
  const down = walk({ x: 5.15, y: 0, z: -15.3 }, 0, 1.8, 420);
  assert.ok(down.minY < -2.2, `never reached the tunnel, minY=${down.minY}`);
  const up = walk({ x: 5.15, y: -2.55, z: 8 }, 0, 1.5, 500);
  assert.ok(up.actor.y > -0.2, `did not climb out, y=${up.actor.y} z=${up.actor.z}`);
});

test("jump clears a crate and not a container", () => {
  const jumper = body({ x: -4.7, y: 0, z: -9.4, vy: JUMP, grounded: false, vz: 3.2 });
  let peak = 0;
  for (let i = 0; i < 80; i += 1) {
    jumper.vx = 0;
    jumper.vz = 3.2;
    moveBody(jumper, 1 / 60, map.solids, map.floors);
    peak = Math.max(peak, jumper.y);
  }
  assert.ok(peak > 1.05 && peak < 2.2, `peak ${peak}`);
  const fromCrate = body({ x: -4.7, y: 1.22, z: -8.05, vy: JUMP, grounded: false, vx: 3.4 });
  let cratePeak = 1.22;
  for (let i = 0; i < 70; i += 1) {
    fromCrate.vx = 3.4;
    moveBody(fromCrate, 1 / 60, map.solids, map.floors);
    cratePeak = Math.max(cratePeak, fromCrate.y);
  }
  assert.ok(cratePeak > 2.4, `cannot reach the high box, peak ${cratePeak}`);
});

test("spawns and nav nodes are not inside geometry", () => {
  for (const team of ["gr", "bl"]) {
    for (const spawn of map.spawns[team]) {
      assert.equal(overlapsSolid(spawn.x, spawn.y, spawn.z, 1.74, map.solids), false, `${team} spawn ${spawn.x},${spawn.z}`);
    }
  }
  for (const node of map.nodes) {
    assert.equal(overlapsSolid(node.x, node.y + 0.05, node.z, 1.5, map.solids), false, node.id);
  }
});

test("both camps connect across mid and through a flank route", () => {
  const mid = findPath(map.nodes, map.links, "gr-spawn", "bl-spawn", false);
  const flank = findPath(map.nodes, map.links, "gr-spawn", "gr-drop", false);
  assert.ok(mid.length > 4);
  assert.equal(mid.at(-1).id, "bl-spawn");
  assert.equal(flank.at(-1).id, "gr-drop");
});

test("smoke hides a segment and a short match draws blood", () => {
  const smokes = [{ x: 0, y: 1.4, z: 0, radius: 3, until: 10 }];
  assert.equal(smokeBlocks({ x: 0, y: 1.4, z: -6 }, { x: 0, y: 1.4, z: 6 }, smokes, 1), true);
  const state = createMatch({ seed: 7, team: "gr", primary: "rifle" });
  assert.equal(state.actors.length, 10);
  const player = state.actors.find((actor) => actor.isPlayer);
  const enemy = state.actors.find((actor) => actor.team === "bl");
  player.x = 0;
  player.y = 0;
  player.z = -4;
  player.yaw = 0;
  player.pitch = 0;
  player.protect = 0;
  enemy.x = 0;
  enemy.y = 0;
  enemy.z = 2;
  enemy.protect = 0;
  const input = emptyInput();
  input.fire = true;
  input.firePressed = true;
  step(state, 1 / 60, input);
  assert.ok(enemy.hp < 100, `enemy hp ${enemy.hp}`);
  assert.ok(state.events.some((event) => event.type === "shot" || event.type === "hit"));
});

test("eye height stays inside a standing actor", () => {
  const actor = body({ y: 0, crouch: false });
  assert.ok(eyeOf(actor).y > 1.4);
});
