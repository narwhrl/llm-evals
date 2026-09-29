import * as THREE from 'three';
import { P } from '../palette.js';
import { STORE } from './store.js';

// Everything that moves. All state is preallocated in build(); update() only
// writes into existing typed arrays and reuses scratch objects.
const RAIN_COUNT = 720;
const DRIP_COUNT = 70;
const RIPPLE_COUNT = 30;

// Roofs the rain should not fall through.
const SHELTERS = [
  [STORE.x0 - 0.35, STORE.x1 + 0.35, STORE.z0 - 0.35, STORE.z1 + 0.35],
  [4.5, 6.15, -8.35, -1.5],
];

function sheltered(x, z) {
  for (const [x0, x1, z0, z1] of SHELTERS) {
    if (x > x0 && x < x1 && z > z0 && z < z1) return true;
  }
  return false;
}

const smooth = (t) => t * t * (3 - 2 * t);

export function buildWeather(scene, refs) {
  const { store, street, props, puddles } = refs;
  const group = new THREE.Group();
  group.name = 'weather';

  // ---- rain ---------------------------------------------------------------
  // Rain has to read as DENSITY, not as individual streaks. A sparse set of
  // long, equally bright lines crossing in screen space reads as a spider web,
  // so: many short drops, all tilted the same way by wind, each with its own
  // brightness so depth still separates near from far, confined to a band that
  // hugs the diorama rather than filling the empty sky above it.
  const rainPos = new Float32Array(RAIN_COUNT * 2 * 3);
  const rainCol = new Float32Array(RAIN_COUNT * 2 * 3);
  const rainX = new Float32Array(RAIN_COUNT);
  const rainY = new Float32Array(RAIN_COUNT);
  const rainZ = new Float32Array(RAIN_COUNT);
  const rainSpeed = new Float32Array(RAIN_COUNT);
  const rainLen = new Float32Array(RAIN_COUNT);
  const DROP_TOP = 4.6;
  // Shared wind: every drop leans the same way, so the field reads as weather
  // rather than as a set of unrelated lines. Declared before the seeding loop
  // below, which calls placeDrop.
  const WIND_X = 0.055;
  for (let i = 0; i < RAIN_COUNT; i += 1) {
    rainY[i] = Math.random() * DROP_TOP;
    rainSpeed[i] = 7 + Math.random() * 7;
    rainLen[i] = 0.09 + Math.random() * 0.1;
    placeDrop(rainPos, i, rainY[i], rainLen[i], rainX, rainZ);
    // Brighter drops read as nearer, which is what stops the field flattening
    // into one uniform sheet.
    const b = 0.3 + Math.random() * 0.7;
    const o = i * 6;
    rainCol[o] = rainCol[o + 3] = 0.62 * b;
    rainCol[o + 1] = rainCol[o + 4] = 0.75 * b;
    rainCol[o + 2] = rainCol[o + 5] = 0.91 * b;
  }
  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
  rainGeo.setAttribute('color', new THREE.BufferAttribute(rainCol, 3));
  const rainMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.12,
  });
  const rain = new THREE.LineSegments(rainGeo, rainMat);
  rain.frustumCulled = false;
  group.add(rain);

  function placeDrop(arr, i, y, len, xs, zs) {
    let x;
    let z;
    do {
      x = (Math.random() - 0.5) * 23;
      z = (Math.random() - 0.5) * 23;
    } while (sheltered(x, z));
    xs[i] = x;
    zs[i] = z;
    const o = i * 6;
    arr[o] = x;
    arr[o + 1] = y;
    arr[o + 2] = z;
    arr[o + 3] = x + WIND_X;
    arr[o + 4] = y + len;
    arr[o + 5] = z;
  }

  // A slightly brighter, faster near layer for parallax. Kept short and low:
  // long bright drops are what turned this into a visible net.
  const NEAR_COUNT = 40;
  const NEAR_LEN = 0.3;
  const NEAR_TOP = 4.2;
  const nearPos = new Float32Array(NEAR_COUNT * 2 * 3);
  const nearX = new Float32Array(NEAR_COUNT);
  const nearY = new Float32Array(NEAR_COUNT);
  const nearZ = new Float32Array(NEAR_COUNT);
  const nearSpeed = new Float32Array(NEAR_COUNT);
  for (let i = 0; i < NEAR_COUNT; i += 1) {
    nearY[i] = Math.random() * NEAR_TOP;
    nearSpeed[i] = 12 + Math.random() * 7;
    placeDrop(nearPos, i, nearY[i], NEAR_LEN, nearX, nearZ);
  }
  const nearGeo = new THREE.BufferGeometry();
  nearGeo.setAttribute('position', new THREE.BufferAttribute(nearPos, 3));
  const near = new THREE.LineSegments(nearGeo, new THREE.LineBasicMaterial({ color: 0xcfe2ff, transparent: true, opacity: 0.16 }));
  near.frustumCulled = false;
  group.add(near);

  // ---- eave drips ---------------------------------------------------------
  const dripGeo = new THREE.BufferGeometry();
  const dripPos = new Float32Array(DRIP_COUNT * 3);
  const dripY = new Float32Array(DRIP_COUNT);
  const dripX = new Float32Array(DRIP_COUNT);
  const dripZ = new Float32Array(DRIP_COUNT);
  const dripSpeed = new Float32Array(DRIP_COUNT);
  for (let i = 0; i < DRIP_COUNT; i += 1) {
    dripX[i] = STORE.x0 - 0.2 + Math.random() * (STORE.x1 - STORE.x0 + 0.6);
    dripZ[i] = STORE.z1 + 0.94 + Math.random() * 0.06;
    dripY[i] = 2.3 + Math.random() * 1.6;
    dripSpeed[i] = 3.2 + Math.random() * 1.8;
  }
  dripGeo.setAttribute('position', new THREE.BufferAttribute(dripPos, 3));
  const drips = new THREE.Points(dripGeo, new THREE.PointsMaterial({ color: 0xcfe4ff, size: 0.075, transparent: true, opacity: 0.8, sizeAttenuation: true }));
  drips.frustumCulled = false;
  group.add(drips);

  // ---- puddle ripples -----------------------------------------------------
  const rippleGeo = new THREE.RingGeometry(0.82, 1, 22);
  const ripplePool = [];
  for (let i = 0; i < RIPPLE_COUNT; i += 1) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xbcd8f2, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    const m = new THREE.Mesh(rippleGeo, mat);
    m.rotation.x = -Math.PI / 2;
    m.visible = false;
    m.renderOrder = 2;
    group.add(m);
    ripplePool.push({ mesh: m, mat, life: -1, max: 1, scale: 1 });
  }
  let nextRipple = 0;

  // ---- glass runoff -------------------------------------------------------
  // One shared texture, scrolled and wrapped so the streaks read as running
  // water rather than a static overlay.
  const runoffMap = store.runoffMap;
  runoffMap.wrapT = THREE.RepeatWrapping;
  runoffMap.wrapS = THREE.RepeatWrapping;
  runoffMap.repeat.set(1, 1);

  scene.add(group);

  // ---- animation state ----------------------------------------------------
  let rippleCursor = 0;
  const doorOpen = { amount: 0 };
  const DOOR_PERIOD = 27;
  const SIGNAL_PERIOD = 19;
  const tmpColor = new THREE.Color();

  function update(time, dt) {
    // Rain: fall and wrap, skipping sheltered footprints.
    // Both vertices of every segment are rewritten from the same x/y/z each
    // frame. Writing only the first vertex on respawn left the second stranded
    // at its old position, which stretched each recycled drop into a long line
    // across the scene — the crossed lines were what read as a spider web.
    for (let i = 0; i < RAIN_COUNT; i += 1) {
      rainY[i] -= rainSpeed[i] * dt;
      if (rainY[i] < 0) {
        rainY[i] = DROP_TOP + Math.random() * 1.5;
        let x;
        let z;
        do {
          x = (Math.random() - 0.5) * 23;
          z = (Math.random() - 0.5) * 23;
        } while (sheltered(x, z));
        rainX[i] = x;
        rainZ[i] = z;
      }
      const o = i * 6;
      rainPos[o] = rainX[i];
      rainPos[o + 1] = rainY[i];
      rainPos[o + 2] = rainZ[i];
      rainPos[o + 3] = rainX[i] + WIND_X;
      rainPos[o + 4] = rainY[i] + rainLen[i];
      rainPos[o + 5] = rainZ[i];
    }
    rainGeo.attributes.position.needsUpdate = true;

    for (let i = 0; i < NEAR_COUNT; i += 1) {
      nearY[i] -= nearSpeed[i] * dt;
      if (nearY[i] < 0) {
        nearY[i] = NEAR_TOP + Math.random() * 1.2;
        nearX[i] = (Math.random() - 0.5) * 20;
        nearZ[i] = (Math.random() - 0.5) * 20;
      }
      const o = i * 6;
      nearPos[o] = nearX[i];
      nearPos[o + 1] = nearY[i];
      nearPos[o + 2] = nearZ[i];
      nearPos[o + 3] = nearX[i] + WIND_X;
      nearPos[o + 4] = nearY[i] + NEAR_LEN;
      nearPos[o + 5] = nearZ[i];
    }
    nearGeo.attributes.position.needsUpdate = true;

    // Eave drips.
    for (let i = 0; i < DRIP_COUNT; i += 1) {
      dripY[i] -= dripSpeed[i] * dt;
      if (dripY[i] < 0.06) {
        dripY[i] = 2.3 + Math.random() * 1.6;
        dripX[i] = STORE.x0 - 0.2 + Math.random() * (STORE.x1 - STORE.x0 + 0.6);
      }
      const o = i * 3;
      dripPos[o] = dripX[i];
      dripPos[o + 1] = dripY[i];
      dripPos[o + 2] = dripZ[i];
    }
    dripGeo.attributes.position.needsUpdate = true;

    // Ripples: staggered spawns across the standing water.
    nextRipple -= dt;
    if (nextRipple <= 0 && puddles.length) {
      nextRipple = 0.11;
      const slot = ripplePool[rippleCursor];
      rippleCursor = (rippleCursor + 1) % RIPPLE_COUNT;
      const p = puddles[(Math.random() * puddles.length) | 0];
      slot.mesh.position.set(p.x + (Math.random() - 0.5) * p.rx * 1.1, 0.062, p.z + (Math.random() - 0.5) * p.rz * 1.1);
      slot.life = 0;
      slot.max = 1.5 + Math.random() * 1.1;
      slot.scale = 0.24 + Math.random() * 0.3;
      slot.mesh.visible = true;
    }
    for (const slot of ripplePool) {
      if (slot.life < 0) continue;
      slot.life += dt;
      const t = slot.life / slot.max;
      if (t >= 1) {
        slot.life = -1;
        slot.mesh.visible = false;
        continue;
      }
      const s = slot.scale * (0.3 + t * 1.5);
      slot.mesh.scale.set(s, s, 1);
      slot.mat.opacity = 0.42 * (1 - t) * (1 - t);
    }

    // Glass runoff scroll.
    runoffMap.offset.y = (runoffMap.offset.y + dt * 0.09) % 1;
    runoffMap.offset.x = Math.sin(time * 0.21) * 0.012;

    // Automatic door: closed most of the time, opening on a slow cycle.
    const dt2 = time % DOOR_PERIOD;
    let target = 0;
    if (dt2 > 12.5 && dt2 < 14.0) target = smooth((dt2 - 12.5) / 1.5);
    else if (dt2 >= 14.0 && dt2 < 20.0) target = 1;
    else if (dt2 >= 20.0 && dt2 < 21.5) target = 1 - smooth((dt2 - 20.0) / 1.5);
    doorOpen.amount = target;
    for (const leaf of store.doorLeaves) {
      leaf.node.position.x = leaf.home + leaf.side * doorOpen.amount * store.doorPanelWidth;
    }

    // Sign / lightbox flicker: a slow breathe plus rare short dips.
    const breathe = 0.94 + Math.sin(time * 2.1) * 0.02 + Math.sin(time * 7.3) * 0.012;
    const dipPhase = time % 9.4;
    const dip = dipPhase < 0.16 ? 1 - Math.abs(Math.sin(dipPhase * 90)) * 0.42 : 1;
    const signLevel = breathe * dip;
    store.signMaterials[0].color.setScalar(0.86 + signLevel * 0.16);
    store.signMaterials[1].opacity = 0.18 + signLevel * 0.09;
    store.spillMaterial.opacity = 0.45 + signLevel * 0.18;

    // Vending machine tube buzz.
    for (const entry of props.lights) {
      if (entry.kind !== 'flicker') continue;
      const t = time * 7 + entry.seed * 20;
      const jitter = Math.sin(t) * 0.5 + Math.sin(t * 2.7) * 0.5;
      entry.light.intensity = entry.base * (jitter > 0.82 ? 0.55 + Math.random() * 0.2 : 1);
    }

    // Distant traffic signal.
    const sp = time % SIGNAL_PERIOD;
    let active = 'green';
    if (sp > 8.5 && sp < 10.5) active = 'amber';
    else if (sp >= 10.5) active = 'red';
    for (const key of street.signal.order) {
      const on = key === active;
      const mat = street.signal.lampMats[key];
      if (on) {
        tmpColor.setHex(key === 'green' ? P.trafficGreen : key === 'amber' ? P.trafficAmber : P.trafficRed);
        mat.color.copy(tmpColor);
      } else {
        // A dark tint of the lens's own hue rather than neutral grey: an unlit
        // lens still catches a little of the street, and the three-lamp stack
        // keeps reading as a signal head instead of a blank box.
        mat.color.setHex(key === 'green' ? 0x14291d : key === 'amber' ? 0x2b2114 : 0x2b1618);
      }
    }
    const pulse = 0.9 + Math.sin(time * 1.7) * 0.06;
    street.signal.light.color.setHex(active === 'green' ? P.trafficGreen : active === 'amber' ? P.trafficAmber : P.trafficRed);
    street.signal.light.intensity = 3.2 * pulse;
  }

  return { group, update, doorOpen };
}
