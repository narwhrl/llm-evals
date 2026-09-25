import { JUMP, WALK } from "./constants.js";
import { eyeOf, segmentHit, smokeBlocks } from "./combat.js";
import { closestNode, findPath } from "./nav.js";
import { hypot2, turnToward } from "./math.js";
import { WEAPONS } from "./weapons.js";

const GOALS = {
  gr: {
    sniper: ["gr-left", "gr-door", "high-gr"],
    rush: ["port-d", "port-e", "mid-c"],
    flank: ["gr-drop", "star-e", "tun-b"],
    rifle: ["mid-d", "star-d", "port-e"],
  },
  bl: {
    sniper: ["bl-right", "bl-door", "high-bl"],
    rush: ["star-c", "port-c", "mid-b"],
    flank: ["bl-drop", "port-b", "tun-b"],
    rifle: ["mid-b", "port-c", "star-b"],
  },
};

function visibleEnemy(state, actor) {
  const eye = eyeOf(actor);
  let best = null;
  let bestD = Infinity;
  for (const other of state.actors) {
    if (!other.alive || other.team === actor.team || other.protect > 0) continue;
    const chest = { x: other.x, y: other.y + 1.05, z: other.z };
    const head = eyeOf(other);
    if (smokeBlocks(eye, chest, state.smokes, state.time) && smokeBlocks(eye, head, state.smokes, state.time)) {
      continue;
    }
    const wallChest = segmentHit(eye, chest, state.solids);
    const wallHead = segmentHit(eye, head, state.solids);
    if (wallChest && wallHead) continue;
    const d = hypot2(other.x - actor.x, other.z - actor.z);
    if (d < bestD) {
      bestD = d;
      best = other;
    }
  }
  return best;
}

function goalFor(actor, state) {
  const table = GOALS[actor.team][actor.role] || GOALS[actor.team].rifle;
  if (actor.hp < 38) return actor.team === "gr" ? "gr-door" : "bl-door";
  const noise = state.noises.find((item) => item.until >= state.time && item.team !== actor.team);
  if (noise && hypot2(noise.x - actor.x, noise.z - actor.z) < noise.radius && state.rng() < 0.45) {
    const node = closestNode(state.nodes, noise.x, noise.y, noise.z);
    return node?.id || table[0];
  }
  const salt = Math.floor(state.time / 7 + actor.number);
  return table[salt % table.length];
}

export function thinkBot(state, actor, dt) {
  const ai = actor.ai;
  ai.think -= dt;
  ai.errT -= dt;
  ai.nadeCd -= dt;
  if (ai.errT <= 0) {
    const weapon = WEAPONS[actor.weapon];
    const scale = weapon?.botError || 0.02;
    ai.aimErrY = (state.rng() - 0.5) * scale * 2;
    ai.aimErrP = (state.rng() - 0.5) * scale;
    ai.errT = 0.35 + state.rng() * 0.25;
  }
  if (ai.think > 0) return;
  ai.think = 0.12 + state.rng() * 0.06;

  const enemy = visibleEnemy(state, actor);
  if (enemy) {
    ai.target = enemy.id;
    ai.react = ai.target === enemy.id && ai.react > 0 ? ai.react : state.time + 0.18 + state.rng() * 0.16;
    ai.investigate = null;
  } else {
    ai.target = null;
    ai.burst = 0;
  }

  const goal = goalFor(actor, state);
  if (goal !== ai.goal || ai.path.length === 0) {
    ai.goal = goal;
    const start = closestNode(state.nodes, actor.x, actor.y, actor.z);
    const allowJump = actor.role === "sniper" || actor.role === "flank";
    ai.path = findPath(state.nodes, state.links, start?.id, goal, allowJump);
    ai.pathI = 0;
  }
}

export function steerBot(state, actor, dt) {
  const ai = actor.ai;
  const target = state.actors.find((item) => item.id === ai.target && item.alive);
  let speed = WALK * 0.96;
  if (target) {
    const weapon = WEAPONS[actor.primary];
    const dist = hypot2(target.x - actor.x, target.z - actor.z);
    if (actor.primary === "bolt" && dist < 8) actor.weapon = "pistol";
    else if (actor.reload <= 0) actor.weapon = actor.primary;
    const eye = eyeOf(target);
    const horiz = Math.max(0.2, dist);
    const desiredYaw = Math.atan2(target.x - actor.x, target.z - actor.z);
    const desiredPitch = Math.atan2(eye.y - eyeOf(actor).y, horiz);
    actor.yaw = turnToward(actor.yaw, desiredYaw + ai.aimErrY, 6.5 * dt);
    actor.pitch = turnToward(actor.pitch, desiredPitch + ai.aimErrP, 4.5 * dt);
    actor.ads = actor.weapon === "bolt" && dist > 9;
    speed = dist > 14 ? WALK * 0.72 : WALK * 0.42;
    const strafe = Math.sin(state.time * 2.1 + actor.number) * speed;
    const rx = Math.cos(actor.yaw);
    const rz = -Math.sin(actor.yaw);
    actor.vx = Math.sin(actor.yaw) * speed * 0.25 + rx * strafe;
    actor.vz = Math.cos(actor.yaw) * speed * 0.25 + rz * strafe;
    if (state.time >= ai.react && actor.reload <= 0) {
      const spec = WEAPONS[actor.weapon];
      const burstMax = spec?.scope ? 1 : actor.role === "rush" ? 7 : 4;
      if (ai.burst < burstMax && actor.cooldown <= 0) {
        ai.burst += 1;
        ai.burstWait = 0;
        return true;
      }
      ai.burstWait += dt;
      if (ai.burstWait > 0.28) ai.burst = 0;
    }
    return false;
  }

  actor.ads = false;
  if (actor.reload <= 0) actor.weapon = actor.primary;
  const node = ai.path[ai.pathI];
  if (!node) {
    const enemyDoor = actor.team === "gr" ? 18 : -18;
    actor.yaw = turnToward(actor.yaw, Math.atan2(0 - actor.x, enemyDoor - actor.z), 3 * dt);
    actor.vx = Math.sin(actor.yaw) * speed;
    actor.vz = Math.cos(actor.yaw) * speed;
    return false;
  }
  const dx = node.x - actor.x;
  const dz = node.z - actor.z;
  const dist = Math.hypot(dx, dz);
  if (dist < 0.9) ai.pathI += 1;
  const face = Math.atan2(dx, dz);
  const look = node.look;
  if (look && dist < 1.4) {
    actor.yaw = turnToward(actor.yaw, Math.atan2(look[0] - actor.x, look[2] - actor.z), 3 * dt);
    actor.pitch = turnToward(actor.pitch, 0, 2 * dt);
  } else {
    actor.yaw = turnToward(actor.yaw, face, 4 * dt);
    actor.pitch = turnToward(actor.pitch, 0, 2 * dt);
  }
  actor.vx = Math.sin(face) * speed;
  actor.vz = Math.cos(face) * speed;
  if ((node.via === "jump" || node.y > actor.y + 0.75) && dist < 1.45 && actor.grounded) {
    actor.vy = JUMP;
    actor.grounded = false;
  }
  if (node.y < actor.y - 0.8 && dist < 1.6) {
    actor.vx = Math.sin(face) * speed;
    actor.vz = Math.cos(face) * speed;
  }

  const moved = Math.hypot(actor.x - ai.lastX, actor.z - ai.lastZ);
  if (moved < 0.05) ai.stuck += dt;
  else ai.stuck = 0;
  ai.lastX = actor.x;
  ai.lastZ = actor.z;
  if (ai.stuck > 0.85 && actor.grounded) {
    actor.vy = JUMP * 0.92;
    actor.grounded = false;
    ai.stuck = 0;
    ai.goal = null;
  }

  return false;
}
