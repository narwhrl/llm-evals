import { steerBot, thinkBot } from "./ai.js";
import { aimDirection, eyeOf, hitscan, raycastSolids, segmentHit, spreadDirection } from "./combat.js";
import {
  CROUCH_SPEED,
  GRAVITY,
  JUMP,
  SLOW,
  STAND_H,
  WALK,
} from "./constants.js";
import { buildMap } from "./map.js";
import { addScaled, approach, clamp, dist3, lookVector, mulberry32, normalize } from "./math.js";
import { canStand, moveBody } from "./physics.js";
import { PRIMARIES, WEAPONS, emptyAmmo } from "./weapons.js";

const BOTS = {
  gr: [
    ["海锚", "sniper", "bolt"],
    ["北风", "rush", "smg"],
    ["灯塔", "flank", "rifle"],
    ["绳结", "rifle", "carbine"],
  ],
  bl: [
    ["暗潮", "sniper", "bolt"],
    ["锈钉", "rush", "smg"],
    ["夜航", "flank", "rifle"],
    ["黑旗", "rifle", "carbine"],
  ],
};

function makeActor(spec) {
  return {
    id: spec.id,
    name: spec.name,
    team: spec.team,
    role: spec.role || "rifle",
    number: spec.number || 0,
    isPlayer: !!spec.isPlayer,
    x: spec.x,
    y: spec.y || 0,
    z: spec.z,
    yaw: spec.team === "gr" ? 0 : Math.PI,
    pitch: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    grounded: true,
    crouch: false,
    hp: 100,
    armor: 25,
    alive: true,
    primary: spec.primary,
    weapon: spec.primary,
    ads: false,
    ammo: emptyAmmo(),
    gear: { frag: 1, smoke: 1 },
    cooldown: 0,
    reload: 0,
    reloadMax: 0,
    shotIndex: 0,
    lastShot: -10,
    recoil: 0,
    protect: 2.1,
    spawn: { x: spec.x, y: 0, z: spec.z },
    deadTimer: 0,
    throwCd: 0,
    cook: 0,
    holdingNade: false,
    kills: 0,
    deaths: 0,
    stepAcc: 0,
    hurtFlash: 0,
    killerId: null,
    ai: {
      goal: null,
      path: [],
      pathI: 0,
      think: (spec.number || 0) * 0.13,
      target: null,
      react: 0,
      burst: 0,
      burstWait: 0,
      aimErrY: 0,
      aimErrP: 0,
      errT: 0,
      nadeCd: 2,
      stuck: 0,
      lastX: spec.x,
      lastZ: spec.z,
    },
  };
}

function refill(actor, primary) {
  actor.hp = 100;
  actor.armor = 25;
  actor.alive = true;
  actor.primary = primary || actor.primary;
  actor.weapon = actor.primary;
  actor.ammo = emptyAmmo();
  actor.gear = { frag: 1, smoke: 1 };
  actor.cooldown = 0;
  actor.reload = 0;
  actor.shotIndex = 0;
  actor.recoil = 0;
  actor.protect = 2.1;
  actor.cook = 0;
  actor.holdingNade = false;
  actor.ads = false;
  actor.vy = 0;
  actor.vx = 0;
  actor.vz = 0;
  actor.crouch = false;
  actor.killerId = null;
}

export function createMatch(options = {}) {
  const map = buildMap();
  const rng = mulberry32(options.seed ?? 1);
  const team = options.team === "bl" ? "bl" : "gr";
  const primary = PRIMARIES.includes(options.primary) ? options.primary : team === "gr" ? "carbine" : "rifle";
  const state = {
    time: 0,
    score: { gr: 0, bl: 0 },
    limit: 30,
    duration: 360,
    phase: "play",
    winner: null,
    actors: [],
    nades: [],
    smokes: [],
    noises: [],
    events: [],
    solids: map.solids,
    nodes: map.nodes,
    links: map.links,
    floors: map.floors,
    sights: map.sights,
    spawns: map.spawns,
    rng,
    team,
    primary,
    spawnCursor: { gr: 0, bl: 0 },
  };
  const playerSpawn = takeSpawn(state, team);
  state.actors.push(
    makeActor({
      id: "player",
      name: "我",
      team,
      role: "rifle",
      isPlayer: true,
      primary,
      number: 0,
      ...playerSpawn,
    }),
  );
  let n = 1;
  for (const side of ["gr", "bl"]) {
    for (const [name, role, gun] of BOTS[side]) {
      if (state.actors.filter((actor) => actor.team === side).length >= 5) break;
      const spawn = takeSpawn(state, side);
      state.actors.push(
        makeActor({
          id: `${side}-${n}`,
          name,
          team: side,
          role,
          primary: gun,
          number: n,
          ...spawn,
        }),
      );
      n += 1;
    }
    let extra = 0;
    while (state.actors.filter((actor) => actor.team === side).length < 5) {
      extra += 1;
      const spawn = takeSpawn(state, side);
      state.actors.push(
        makeActor({
          id: `${side}-x${extra}`,
          name: side === "gr" ? "甲板" : "沙漏",
          team: side,
          role: "rifle",
          primary: side === "gr" ? "carbine" : "rifle",
          number: n,
          ...spawn,
        }),
      );
      n += 1;
    }
  }
  return state;
}

function takeSpawn(state, team) {
  const list = state.spawns[team];
  const index = state.spawnCursor[team] % list.length;
  state.spawnCursor[team] += 1;
  return list[index];
}

function switchWeapon(actor, id) {
  if (!id || actor.weapon === id) return;
  if (WEAPONS[id]?.kind === "nade" && actor.gear[id] <= 0) return;
  actor.weapon = id;
  actor.reload = 0;
  actor.holdingNade = false;
  actor.cook = 0;
  actor.ads = false;
  actor.shotIndex = 0;
}

function startReload(actor) {
  const weapon = WEAPONS[actor.weapon];
  if (!weapon || weapon.kind !== "gun") return;
  const ammo = actor.ammo[weapon.id];
  if (!ammo || actor.reload > 0 || ammo.mag >= weapon.mag || ammo.reserve <= 0) return;
  actor.reload = weapon.reload;
  actor.reloadMax = weapon.reload;
  actor.ads = false;
}

function finishReload(actor) {
  const weapon = WEAPONS[actor.weapon];
  const ammo = actor.ammo?.[weapon?.id];
  if (!weapon || !ammo) return;
  const need = weapon.mag - ammo.mag;
  const take = Math.min(need, ammo.reserve);
  ammo.mag += take;
  ammo.reserve -= take;
}

function applyDamage(state, victim, amount, head, attacker, weaponId) {
  if (!victim.alive || victim.protect > 0) return;
  let dmg = amount;
  if (victim.armor > 0) {
    dmg *= head ? 0.96 : 0.88;
    victim.armor = Math.max(0, victim.armor - (head ? 8 : 14));
  }
  victim.hp -= dmg;
  victim.hurtFlash = 0.25;
  state.events.push({
    type: "hit",
    victimId: victim.id,
    attackerId: attacker?.id || null,
    amount: dmg,
    head,
    weapon: weaponId,
    x: victim.x,
    y: victim.y + 1.4,
    z: victim.z,
  });
  if (victim.hp <= 0) {
    victim.hp = 0;
    victim.alive = false;
    victim.deaths += 1;
    victim.deadTimer = victim.isPlayer ? 3.2 : 2.4;
    victim.killerId = attacker?.id || null;
    if (attacker && attacker.team !== victim.team) {
      attacker.kills += 1;
      state.score[attacker.team] += 1;
    }
    state.events.push({
      type: "kill",
      killerId: attacker?.id || null,
      killerName: attacker?.name || "船体",
      victimId: victim.id,
      victimName: victim.name,
      weapon: weaponId,
      head,
      team: attacker?.team || victim.team,
    });
  }
}

function fireWeapon(state, actor) {
  const weapon = WEAPONS[actor.weapon];
  if (!weapon || !actor.alive || actor.cooldown > 0 || actor.reload > 0) return;
  if (weapon.kind === "melee") {
    actor.cooldown = weapon.cooldown;
    actor.protect = 0;
    actor.lastShot = state.time;
    const origin = eyeOf(actor);
    const dir = aimDirection(actor);
    const hit = hitscan(origin, dir, weapon.range, state.solids, state.actors, actor, weapon);
    state.events.push({ type: "swing", actorId: actor.id });
    for (const dealt of hit.dealt) applyDamage(state, dealt.actor, dealt.amount, dealt.head, actor, weapon.id);
    return;
  }
  if (weapon.kind !== "gun") return;
  const ammo = actor.ammo[weapon.id];
  if (!ammo || ammo.mag <= 0) {
    startReload(actor);
    actor.cooldown = 0.18;
    state.events.push({ type: "dry", actorId: actor.id });
    return;
  }
  const origin = eyeOf(actor);
  const moving = Math.hypot(actor.vx, actor.vz) > 1.2;
  const dir = spreadDirection(actor, weapon, moving, state.rng);
  const shot = hitscan(origin, dir, weapon.range, state.solids, state.actors, actor, weapon);
  ammo.mag -= 1;
  actor.cooldown = 60 / weapon.rpm;
  actor.shotIndex += 1;
  actor.lastShot = state.time;
  actor.protect = 0;
  const kick = weapon.recoil * (1 + Math.min(actor.shotIndex, 8) * 0.11);
  actor.pitch += kick;
  actor.recoil += kick;
  actor.yaw += kick * 0.32 * (actor.shotIndex % 2 === 0 ? 1 : -1);
  const end = shot.impacts.at(-1)?.point || addScaled(origin, dir, Math.min(30, weapon.range));
  state.events.push({
    type: "shot",
    actorId: actor.id,
    weapon: weapon.id,
    team: actor.team,
    origin,
    dir,
    point: end,
  });
  for (const impact of shot.impacts) {
    if (impact.kind === "flesh") continue;
    state.events.push({ type: "impact", ...impact.point, nx: impact.normal.x, ny: impact.normal.y, nz: impact.normal.z, kind: impact.kind });
  }
  if (!shot.friendly) {
    for (const dealt of shot.dealt) applyDamage(state, dealt.actor, dealt.amount, dealt.head, actor, weapon.id);
  }
  state.noises.push({
    x: actor.x,
    y: actor.y,
    z: actor.z,
    radius: weapon.scope ? 46 : 34,
    until: state.time + 0.4,
    team: actor.team,
  });
}

function throwNade(state, actor, kind) {
  const spec = WEAPONS[kind];
  if (!spec || actor.gear[kind] <= 0 || actor.throwCd > 0 || !actor.alive) return;
  actor.gear[kind] -= 1;
  actor.throwCd = 0.55;
  actor.protect = 0;
  const dir = aimDirection(actor);
  const speed = spec.speed;
  const origin = eyeOf(actor);
  const fuse = Math.max(0.08, spec.fuse - actor.cook);
  state.nades.push({
    x: origin.x + dir.x * 0.45,
    y: origin.y + dir.y * 0.45,
    z: origin.z + dir.z * 0.45,
    vx: dir.x * speed,
    vy: dir.y * speed + 1.4,
    vz: dir.z * speed,
    fuse,
    kind,
    owner: actor.id,
    team: actor.team,
    radius: spec.radius,
  });
  state.events.push({ type: "throw", actorId: actor.id, kind });
}

function explode(state, nade) {
  state.events.push({ type: "explode", x: nade.x, y: nade.y, z: nade.z, radius: nade.radius, kind: nade.kind });
  if (nade.kind === "smoke") {
    state.smokes.push({
      x: nade.x,
      y: nade.y + 0.5,
      z: nade.z,
      radius: nade.radius,
      until: state.time + WEAPONS.smoke.duration,
    });
    return;
  }
  const owner = state.actors.find((actor) => actor.id === nade.owner);
  for (const actor of state.actors) {
    if (!actor.alive || actor.protect > 0) continue;
    if (actor.team === nade.team && actor.id !== nade.owner) continue;
    const point = { x: actor.x, y: actor.y + 1, z: actor.z };
    const d = dist3(point, nade);
    if (d > nade.radius) continue;
    const wall = segmentHit(nade, point, state.solids);
    if (wall && wall.solid.pass !== "wood") continue;
    applyDamage(state, actor, WEAPONS.frag.damage * (1 - d / nade.radius), false, owner, "frag");
  }
}

function stepNades(state, dt) {
  for (let i = state.nades.length - 1; i >= 0; i -= 1) {
    const nade = state.nades[i];
    nade.fuse -= dt;
    nade.vy -= GRAVITY * dt;
    const speed = Math.hypot(nade.vx, nade.vy, nade.vz);
    const dist = speed * dt;
    if (dist > 0.0001) {
      const dir = { x: nade.vx / speed, y: nade.vy / speed, z: nade.vz / speed };
      const hit = raycastSolids(nade, dir, dist, state.solids, (solid) => solid.blocksMove);
      if (hit) {
        nade.x += dir.x * Math.max(hit.t - 0.02, 0);
        nade.y += dir.y * Math.max(hit.t - 0.02, 0);
        nade.z += dir.z * Math.max(hit.t - 0.02, 0);
        const vn = nade.vx * hit.normal.x + nade.vy * hit.normal.y + nade.vz * hit.normal.z;
        nade.vx = (nade.vx - 1.45 * vn * hit.normal.x) * 0.64;
        nade.vy = (nade.vy - 1.45 * vn * hit.normal.y) * 0.64;
        nade.vz = (nade.vz - 1.45 * vn * hit.normal.z) * 0.64;
        if (hit.normal.y > 0.65 && Math.hypot(nade.vx, nade.vz) < 1.4 && Math.abs(nade.vy) < 2.2) {
          nade.vx = 0;
          nade.vy = 0;
          nade.vz = 0;
        }
      } else {
        nade.x += nade.vx * dt;
        nade.y += nade.vy * dt;
        nade.z += nade.vz * dt;
      }
    }
    if (nade.fuse <= 0) {
      explode(state, nade);
      state.nades.splice(i, 1);
    }
  }
}

function separate(state) {
  const actors = state.actors.filter((actor) => actor.alive);
  for (let i = 0; i < actors.length; i += 1) {
    for (let j = i + 1; j < actors.length; j += 1) {
      const a = actors[i];
      const b = actors[j];
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.62 || d < 0.0001) continue;
      const push = (0.62 - d) * 0.5;
      const nx = dx / d;
      const nz = dz / d;
      const wa = a.isPlayer ? 0.25 : 0.5;
      const wb = b.isPlayer ? 0.25 : 0.5;
      a.x -= nx * push * wa * 2;
      a.z -= nz * push * wa * 2;
      b.x += nx * push * wb * 2;
      b.z += nz * push * wb * 2;
    }
  }
}

function applyPlayer(state, actor, input, dt) {
  if (!actor.alive) return;
  actor.yaw += input.yawDelta || 0;
  actor.pitch = clamp(actor.pitch + (input.pitchDelta || 0), -1.35, 1.35);
  const wantCrouch = !!input.crouch;
  if (!wantCrouch && !canStand(actor.x, actor.z, actor.y, state.solids)) actor.crouch = true;
  else actor.crouch = wantCrouch;
  const weapon = WEAPONS[actor.weapon];
  actor.ads = !!input.ads && weapon?.kind === "gun" && actor.reload <= 0;
  let mx = input.moveX || 0;
  let mz = input.moveZ || 0;
  const mag = Math.hypot(mx, mz);
  if (mag > 1) {
    mx /= mag;
    mz /= mag;
  }
  const speed = actor.crouch ? CROUCH_SPEED : input.walk ? SLOW : WALK;
  const wishX = Math.sin(actor.yaw) * mz + Math.cos(actor.yaw) * mx;
  const wishZ = Math.cos(actor.yaw) * mz - Math.sin(actor.yaw) * mx;
  const accel = actor.grounded ? 78 : 16;
  actor.vx = approach(actor.vx, wishX * (mag > 0 ? speed : 0), accel * dt);
  actor.vz = approach(actor.vz, wishZ * (mag > 0 ? speed : 0), accel * dt);
  if (input.jump && actor.grounded) {
    actor.vy = JUMP;
    actor.grounded = false;
  }
  if (input.slot) {
    const bySlot = Object.values(WEAPONS).find((item) => item.slot === input.slot && (item.slot !== 3 || item.id === actor.primary));
    if (input.slot === 3) switchWeapon(actor, actor.primary);
    else if (bySlot) switchWeapon(actor, bySlot.id);
  }
  if (input.cycle) {
    const order = ["knife", "pistol", actor.primary];
    const index = Math.max(0, order.indexOf(actor.weapon));
    switchWeapon(actor, order[(index + input.cycle + order.length) % order.length]);
  }
  if (input.quick === "frag") switchWeapon(actor, "frag");
  if (input.quick === "smoke") switchWeapon(actor, "smoke");
  if (input.reload) startReload(actor);
  if (weapon?.kind === "nade") {
    if (input.fire) {
      actor.holdingNade = true;
      actor.cook += dt;
      if (actor.cook >= weapon.fuse - 0.05) {
        actor.cook = weapon.fuse;
        throwNade(state, actor, weapon.id);
        actor.holdingNade = false;
        actor.cook = 0;
        switchWeapon(actor, actor.primary);
      }
    } else if (actor.holdingNade) {
      throwNade(state, actor, weapon.id);
      actor.holdingNade = false;
      actor.cook = 0;
      switchWeapon(actor, actor.primary);
    }
  } else if (weapon) {
    const pressed = weapon.auto ? input.fire || input.firePressed : input.firePressed;
    if (pressed) fireWeapon(state, actor);
  }
}

function respawn(state, actor) {
  const spawn = takeSpawn(state, actor.team);
  actor.x = spawn.x;
  actor.y = 0;
  actor.z = spawn.z;
  actor.spawn = { ...spawn };
  actor.yaw = actor.team === "gr" ? 0 : Math.PI;
  actor.pitch = 0;
  const primary = actor.isPlayer ? state.primary : actor.primary;
  refill(actor, primary);
  actor.ai.goal = null;
  actor.ai.path = [];
  actor.ai.pathI = 0;
  actor.ai.target = null;
}

export function setPrimary(state, primary) {
  if (!PRIMARIES.includes(primary)) return;
  state.primary = primary;
  const player = state.actors.find((actor) => actor.isPlayer);
  if (!player) return;
  const holdingPrimary = PRIMARIES.includes(player.weapon);
  player.primary = primary;
  if (!player.alive || player.protect > 0 || holdingPrimary) {
    player.weapon = primary;
    player.reload = 0;
    player.ads = false;
    player.holdingNade = false;
    player.cook = 0;
  }
}

export function emptyInput() {
  return {
    moveX: 0,
    moveZ: 0,
    jump: false,
    crouch: false,
    walk: false,
    ads: false,
    fire: false,
    firePressed: false,
    reload: false,
    yawDelta: 0,
    pitchDelta: 0,
    slot: 0,
    cycle: 0,
    quick: null,
  };
}

export function step(state, dt, input = emptyInput()) {
  if (state.phase !== "play") return state;
  const frame = Math.min(dt, 0.05);
  state.time += frame;
  if (state.events.length > 240) state.events.splice(0, state.events.length - 120);
  const player = state.actors.find((actor) => actor.isPlayer);
  if (player?.alive) applyPlayer(state, player, input, frame);

  for (const actor of state.actors) {
    if (!actor.alive) {
      actor.deadTimer -= frame;
      if (actor.deadTimer <= 0) respawn(state, actor);
      continue;
    }
    actor.cooldown = Math.max(0, actor.cooldown - frame);
    actor.throwCd = Math.max(0, actor.throwCd - frame);
    actor.hurtFlash = Math.max(0, actor.hurtFlash - frame);
    if (actor.reload > 0) {
      actor.reload -= frame;
      if (actor.reload <= 0) {
        actor.reload = 0;
        finishReload(actor);
        state.events.push({ type: "reloaded", actorId: actor.id });
      }
    }
    if (actor.recoil > 0) {
      const back = Math.min(actor.recoil, frame * (actor.isPlayer ? 1.7 : 2.4));
      actor.pitch -= back;
      actor.recoil -= back;
    }
    if (state.time - actor.lastShot > 0.2) actor.shotIndex = 0;
    if (actor.protect > 0) {
      actor.protect -= frame;
      if (Math.hypot(actor.x - actor.spawn.x, actor.z - actor.spawn.z) > 3.4) actor.protect = 0;
    }
    if (!actor.isPlayer) {
      thinkBot(state, actor, frame);
      if (steerBot(state, actor, frame)) fireWeapon(state, actor);
      const target = state.actors.find((item) => item.id === actor.ai.target && item.alive);
      if (target && actor.ai.nadeCd <= 0 && actor.gear.frag > 0) {
        const dist = Math.hypot(target.x - actor.x, target.z - actor.z);
        if (dist > 8 && dist < 22 && state.rng() < 0.35) {
          const yaw = actor.yaw;
          const pitch = actor.pitch;
          actor.pitch = Math.atan2(target.y - actor.y, dist) + 0.42;
          throwNade(state, actor, "frag");
          actor.pitch = pitch;
          actor.yaw = yaw;
          actor.ai.nadeCd = 12;
          actor.weapon = actor.primary;
        }
      } else actor.ai.nadeCd -= frame;
      if (actor.ammo[actor.weapon]?.mag === 0) startReload(actor);
    }
    if (actor.grounded) {
      const speed = Math.hypot(actor.vx, actor.vz);
      if (speed > 2.1 && actor.alive) {
        actor.stepAcc += speed * frame;
        if (actor.stepAcc > (actor.crouch ? 1.4 : 2.15)) {
          actor.stepAcc = 0;
          state.events.push({ type: "foot", x: actor.x, y: actor.y, z: actor.z, team: actor.team, quiet: speed < 3 });
          if (speed > 3.6 && !actor.crouch) {
            state.noises.push({ x: actor.x, y: actor.y, z: actor.z, radius: 14, until: state.time + 0.35, team: actor.team });
          }
        }
      }
    }
    moveBody(actor, frame, state.solids, state.floors);
    if (actor.y < -8) {
      actor.alive = false;
      actor.deaths += 1;
      actor.deadTimer = 2.2;
      state.events.push({
        type: "kill",
        killerId: null,
        killerName: "海里",
        victimId: actor.id,
        victimName: actor.name,
        weapon: "fall",
        head: false,
        team: actor.team === "gr" ? "bl" : "gr",
      });
    }
  }
  stepNades(state, frame);
  separate(state);
  state.smokes = state.smokes.filter((smoke) => smoke.until >= state.time);
  state.noises = state.noises.filter((noise) => noise.until >= state.time);
  const top = Math.max(state.score.gr, state.score.bl);
  if (top >= state.limit || state.time >= state.duration) {
    state.phase = "end";
    if (state.score.gr === state.score.bl) state.winner = "tie";
    else state.winner = state.score.gr > state.score.bl ? "gr" : "bl";
  }
  return state;
}

export function playerActor(state) {
  return state.actors.find((actor) => actor.isPlayer);
}

export function teamName(team) {
  return team === "gr" ? "保卫者" : "潜伏者";
}

export { PRIMARIES, STAND_H, lookVector, normalize };
