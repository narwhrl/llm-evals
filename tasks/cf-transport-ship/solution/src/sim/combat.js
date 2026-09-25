import { CROUCH_EYE, STAND_EYE } from "./constants.js";
import { addScaled, lookVector, pointSegmentDistance, rightVector } from "./math.js";
import { WOOD_PEN_COST } from "./weapons.js";

export function eyeOf(actor) {
  return {
    x: actor.x,
    y: actor.y + (actor.crouch ? CROUCH_EYE : STAND_EYE),
    z: actor.z,
  };
}

export function aimDirection(actor) {
  return lookVector(actor.yaw, actor.pitch);
}

function raySlab(origin, dir, solid) {
  const c = Math.cos(solid.yaw || 0);
  const s = Math.sin(solid.yaw || 0);
  const dx = origin.x - solid.x;
  const dy = origin.y - solid.y;
  const dz = origin.z - solid.z;
  const o = [dx * c + dz * s, dy, -dx * s + dz * c];
  const d = [dir.x * c + dir.z * s, dir.y, -dir.x * s + dir.z * c];
  const h = [solid.sx * 0.5, solid.sy * 0.5, solid.sz * 0.5];
  let tmin = 0;
  let tmax = Infinity;
  let normalAxis = 0;
  let normalSign = 1;
  for (let i = 0; i < 3; i += 1) {
    if (Math.abs(d[i]) < 1e-8) {
      if (o[i] < -h[i] || o[i] > h[i]) return null;
      continue;
    }
    let t1 = (-h[i] - o[i]) / d[i];
    let t2 = (h[i] - o[i]) / d[i];
    let sign = -1;
    if (t1 > t2) {
      const swap = t1;
      t1 = t2;
      t2 = swap;
      sign = 1;
    }
    if (t1 > tmin) {
      tmin = t1;
      normalAxis = i;
      normalSign = sign;
    }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }
  if (tmax < 0) return null;
  const t = tmin >= 0 ? tmin : tmax;
  if (t < 0) return null;
  const localNormal = [0, 0, 0];
  localNormal[normalAxis] = normalSign;
  const nx = localNormal[0] * c - localNormal[2] * s;
  const ny = localNormal[1];
  const nz = localNormal[0] * s + localNormal[2] * c;
  return { t, tmax, normal: { x: nx, y: ny, z: nz }, solid };
}

export function raycastSolids(origin, dir, maxDist, solids, pred) {
  let best = null;
  for (let i = 0; i < solids.length; i += 1) {
    const solid = solids[i];
    if (pred && !pred(solid)) continue;
    const hit = raySlab(origin, dir, solid);
    if (!hit || hit.t > maxDist || hit.t < 0.001) continue;
    if (!best || hit.t < best.t) best = hit;
  }
  return best;
}

function raySphere(origin, dir, cx, cy, cz, radius) {
  const ox = origin.x - cx;
  const oy = origin.y - cy;
  const oz = origin.z - cz;
  const b = ox * dir.x + oy * dir.y + oz * dir.z;
  const c = ox * ox + oy * oy + oz * oz - radius * radius;
  const disc = b * b - c;
  if (disc < 0) return null;
  const s = Math.sqrt(disc);
  const t0 = -b - s;
  const t = t0 > 0.001 ? t0 : -b + s;
  return t > 0.001 ? t : null;
}

function rayCylinder(origin, dir, cx, cz, radius, y0, y1) {
  const ox = origin.x - cx;
  const oz = origin.z - cz;
  const a = dir.x * dir.x + dir.z * dir.z;
  if (a < 1e-8) return null;
  const b = 2 * (ox * dir.x + oz * dir.z);
  const c = ox * ox + oz * oz - radius * radius;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return null;
  const s = Math.sqrt(disc);
  let t = (-b - s) / (2 * a);
  if (t < 0.001) t = (-b + s) / (2 * a);
  if (t < 0.001) return null;
  const y = origin.y + dir.y * t;
  if (y < y0 || y > y1) return null;
  return t;
}

export function rayActor(origin, dir, maxT, actor) {
  if (!actor.alive) return null;
  const eye = actor.y + (actor.crouch ? CROUCH_EYE : STAND_EYE);
  const headT = raySphere(origin, dir, actor.x, eye + 0.02, actor.z, 0.17);
  const bodyT = rayCylinder(origin, dir, actor.x, actor.z, actor.crouch ? 0.3 : 0.28, actor.y + 0.12, eye - 0.02);
  let t = null;
  let head = false;
  if (headT != null && headT < maxT) {
    t = headT;
    head = true;
  }
  if (bodyT != null && bodyT < maxT && (t == null || bodyT < t - 0.02)) {
    t = bodyT;
    head = false;
  }
  if (t == null) return null;
  return { t, head };
}

function shotSolids(solid) {
  return solid.blocksMove && solid.pass !== "none";
}

export function hitscan(origin, dir, range, solids, actors, attacker, weapon) {
  let pos = origin;
  let left = range;
  let damage = weapon.damage;
  let pen = weapon.pen ?? 0;
  const impacts = [];
  const dealt = [];
  for (let n = 0; n < 5 && left > 0.05 && damage > 1; n += 1) {
    const wall = raycastSolids(pos, dir, left, solids, shotSolids);
    let actorHit = null;
    const limit = wall ? wall.t : left;
    for (let i = 0; i < actors.length; i += 1) {
      const actor = actors[i];
      if (!actor.alive || actor.id === attacker.id) continue;
      const hit = rayActor(pos, dir, limit, actor);
      if (!hit) continue;
      if (!actorHit || hit.t < actorHit.t) actorHit = { ...hit, actor };
    }
    if (actorHit && (!wall || actorHit.t < wall.t)) {
      const point = addScaled(pos, dir, actorHit.t);
      if (actorHit.actor.team === attacker.team) {
        impacts.push({ point, normal: dir, kind: "flesh" });
        return { impacts, dealt, friendly: true };
      }
      if (actorHit.actor.protect <= 0) {
        const amount = damage * (actorHit.head ? weapon.head || 1 : 1);
        dealt.push({ actor: actorHit.actor, amount, head: actorHit.head, point });
      }
      impacts.push({ point, normal: dir, kind: "flesh" });
      return { impacts, dealt, friendly: false };
    }
    if (!wall) break;
    const point = addScaled(pos, dir, wall.t);
    const wooden = wall.solid.pass === "wood";
    const cost = wooden ? wall.solid.penCost || WOOD_PEN_COST : 99;
    if (!wooden || pen < cost) {
      impacts.push({ point, normal: wall.normal, kind: wooden ? "wood" : "metal" });
      return { impacts, dealt };
    }
    pen -= cost;
    damage *= weapon.penMul ?? 0.7;
    impacts.push({ point, normal: wall.normal, kind: "pen" });
    const adv = Math.max(wall.tmax, wall.t) + 0.05;
    pos = addScaled(pos, dir, adv);
    left -= adv;
  }
  return { impacts, dealt };
}

export function segmentHit(a, b, solids, pred = shotSolids) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  const len = Math.hypot(dx, dy, dz);
  if (len < 0.001) return null;
  const dir = { x: dx / len, y: dy / len, z: dz / len };
  return raycastSolids(a, dir, len - 0.04, solids, pred);
}

export function smokeBlocks(a, b, smokes, time) {
  for (let i = 0; i < smokes.length; i += 1) {
    const smoke = smokes[i];
    if (smoke.until < time) continue;
    if (pointSegmentDistance(smoke.x, smoke.y, smoke.z, a, b) <= smoke.radius) return true;
  }
  return false;
}

export function spreadDirection(actor, weapon, moving, rng) {
  const base = aimDirection(actor);
  let spread = weapon.spread || 0;
  if (moving) spread += weapon.moveSpread || 0;
  if (!actor.grounded) spread += 0.018;
  if (actor.crouch && !moving) spread *= 0.72;
  if (actor.ads) spread = weapon.scope ? weapon.adsSpread : weapon.adsSpread || spread * 0.35;
  spread += Math.min(actor.shotIndex || 0, 10) * 0.0014;
  if (spread <= 0.00001) return base;
  const right = rightVector(actor.yaw);
  const up = {
    x: right.y * base.z - right.z * base.y,
    y: right.z * base.x - right.x * base.z,
    z: right.x * base.y - right.y * base.x,
  };
  const ang = rng() * Math.PI * 2;
  const rad = Math.sqrt(rng()) * spread;
  const x = base.x + right.x * Math.cos(ang) * rad + up.x * Math.sin(ang) * rad;
  const y = base.y + right.y * Math.cos(ang) * rad + up.y * Math.sin(ang) * rad;
  const z = base.z + right.z * Math.cos(ang) * rad + up.z * Math.sin(ang) * rad;
  const len = Math.hypot(x, y, z) || 1;
  return { x: x / len, y: y / len, z: z / len };
}
