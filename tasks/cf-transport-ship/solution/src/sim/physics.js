import { CROUCH_H, GRAVITY, RADIUS, STAND_H, STEP } from "./constants.js";

export function bodyHeight(crouch) {
  return crouch ? CROUCH_H : STAND_H;
}

function yawBasis(yaw) {
  return { c: Math.cos(yaw), s: Math.sin(yaw) };
}

export function localXZ(px, pz, solid) {
  const { c, s } = yawBasis(solid.yaw || 0);
  const dx = px - solid.x;
  const dz = pz - solid.z;
  return { lx: dx * c + dz * s, lz: -dx * s + dz * c, c, s };
}

function worldXZ(lx, lz, solid, c, s) {
  return {
    x: solid.x + lx * c - lz * s,
    z: solid.z + lx * s + lz * c,
  };
}

function verticalOverlap(feet, height, solid) {
  const low = feet + 0.045;
  const high = feet + height - 0.02;
  const bottom = solid.y - solid.sy * 0.5;
  const top = solid.y + solid.sy * 0.5;
  return high > bottom && low < top;
}

export function collideXZ(x, z, feet, height, solids) {
  let px = x;
  let pz = z;
  for (let iter = 0; iter < 4; iter += 1) {
    for (let i = 0; i < solids.length; i += 1) {
      const solid = solids[i];
      if (!solid.blocksMove) continue;
      if (!verticalOverlap(feet, height, solid)) continue;
      const { lx, lz, c, s } = localXZ(px, pz, solid);
      const hx = solid.sx * 0.5 + RADIUS;
      const hz = solid.sz * 0.5 + RADIUS;
      const penX = hx - Math.abs(lx);
      const penZ = hz - Math.abs(lz);
      if (penX <= 0 || penZ <= 0) continue;
      let nlx = lx;
      let nlz = lz;
      if (penX < penZ) nlx += lx >= 0 ? penX : -penX;
      else nlz += lz >= 0 ? penZ : -penZ;
      const w = worldXZ(nlx, nlz, solid, c, s);
      px = w.x;
      pz = w.z;
    }
  }
  return { x: px, z: pz };
}

export function highestFloor(x, z, maxY, solids, floors) {
  let best = null;
  const deck = floors.deck(x, z);
  if (deck != null && deck <= maxY + 1e-4) best = deck;
  const tunnel = floors.tunnel(x, z);
  if (tunnel != null && tunnel <= maxY + 1e-4 && (best == null || tunnel > best)) best = tunnel;
  for (let i = 0; i < solids.length; i += 1) {
    const solid = solids[i];
    if (!solid.blocksMove || solid.stand === false) continue;
    const top = solid.y + solid.sy * 0.5;
    if (top > maxY + 1e-4) continue;
    const { lx, lz } = localXZ(x, z, solid);
    const inset = Math.min(0.04, solid.sx * 0.2);
    if (Math.abs(lx) > solid.sx * 0.5 - inset) continue;
    if (Math.abs(lz) > solid.sz * 0.5 - inset) continue;
    if (best == null || top > best) best = top;
  }
  return best;
}

function ceilingClamp(body, height, solids) {
  const head = body.y + height;
  for (let i = 0; i < solids.length; i += 1) {
    const solid = solids[i];
    if (!solid.blocksMove) continue;
    const { lx, lz } = localXZ(body.x, body.z, solid);
    if (Math.abs(lx) > solid.sx * 0.5 - 0.05) continue;
    if (Math.abs(lz) > solid.sz * 0.5 - 0.05) continue;
    const bottom = solid.y - solid.sy * 0.5;
    if (head > bottom + 0.001 && body.y < bottom - 0.02) {
      body.y = bottom - height - 0.01;
      if (body.vy > 0) body.vy = 0;
    }
  }
}

export function canStand(x, z, feet, solids) {
  const head = feet + STAND_H;
  for (let i = 0; i < solids.length; i += 1) {
    const solid = solids[i];
    if (!solid.blocksMove) continue;
    const bottom = solid.y - solid.sy * 0.5;
    if (bottom >= head - 0.02 || bottom < feet + CROUCH_H) continue;
    const { lx, lz } = localXZ(x, z, solid);
    if (Math.abs(lx) > solid.sx * 0.5 - 0.06) continue;
    if (Math.abs(lz) > solid.sz * 0.5 - 0.06) continue;
    return false;
  }
  return true;
}

export function moveBody(body, dt, solids, floors) {
  const height = bodyHeight(body.crouch);
  body.vy -= GRAVITY * dt;
  if (body.vy < -28) body.vy = -28;

  const nx = body.x + body.vx * dt;
  const nz = body.z + body.vz * dt;
  let resolved = collideXZ(nx, nz, body.y, height, solids);
  const blocked = (resolved.x - nx) ** 2 + (resolved.z - nz) ** 2 > 1e-6;
  if (blocked && body.vy > -1.4) {
    const speed = Math.hypot(body.vx, body.vz) || 1;
    const probeX = nx + (body.vx / speed) * 0.36;
    const probeZ = nz + (body.vz / speed) * 0.36;
    const stepped = collideXZ(probeX, probeZ, body.y + STEP, height, solids);
    const floor = highestFloor(stepped.x, stepped.z, body.y + STEP + 0.08, solids, floors);
    if (floor != null && floor > body.y + 0.05 && floor <= body.y + STEP + 0.04) {
      resolved = stepped;
      body.y = floor;
      body.vy = 0;
    }
  }

  body.x = resolved.x;
  body.z = resolved.z;
  body.y += body.vy * dt;
  ceilingClamp(body, height, solids);

  const floor = highestFloor(body.x, body.z, body.y + 0.2, solids, floors);
  if (floor != null && body.y <= floor + 0.001 && body.vy <= 0.02) {
    body.y = floor;
    body.vy = 0;
    body.grounded = true;
  } else {
    body.grounded = false;
  }
  return body;
}

export function overlapsSolid(x, y, z, height, solids) {
  const resolved = collideXZ(x, z, y, height, solids);
  return Math.hypot(resolved.x - x, resolved.z - z) > 0.02;
}
