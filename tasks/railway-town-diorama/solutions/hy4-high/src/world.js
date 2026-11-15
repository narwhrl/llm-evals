import * as THREE from 'three';
import * as L from './layout.js';
import {
  makeCanvas, toTexture, rng, roundedBox, makeStrip, makeGableRoof,
  setShadows, glowSprite,
} from './utils.js';
import { makeFacade, makeSign } from './textures.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const rotFor = (dx, dz) => Math.atan2(dx, dz);

function createMaterials(T) {
  const std = (o) => new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, ...o });
  return {
    wood: std({ map: T.wood, roughness: 0.74 }),
    woodDark: std({ map: T.woodDark, roughness: 0.8 }),
    woodTrim: std({ color: 0x4a2f1c, roughness: 0.72 }),
    brass: std({ color: 0xbf9450, roughness: 0.34, metalness: 0.68 }),
    earth: std({ map: T.earth, roughness: 1 }),
    grass: std({ map: T.grass, roughness: 0.98 }),
    gravel: std({ map: T.gravel, roughness: 1 }),
    road: std({ map: T.road, roughness: 0.96 }),
    roadEdge: std({ color: 0x79684f, roughness: 1 }),
    water: std({
      map: T.water, color: 0xb7dbe6, roughness: 0.22, metalness: 0.08,
      emissive: 0x14313f, emissiveIntensity: 0.12,
    }),
    stone: std({ map: T.stone, roughness: 0.9 }),
    tile: std({ map: T.tile, roughness: 0.9 }),
    rail: std({ color: 0x7a7670, metalness: 0.7, roughness: 0.4 }),
    sleeper: std({ color: 0x4c3827, roughness: 0.92 }),
    gable: std({ color: 0xd6c3a5, roughness: 0.95 }),
    spire: std({ color: 0x6d8ba6, roughness: 0.78 }),
    copper: std({ color: 0x7f9c7a, roughness: 0.7 }),
    door: std({ color: 0x5a3d28, roughness: 0.82 }),
    dark: std({ color: 0x2b2723, roughness: 0.85 }),
    leaf: std({ color: 0xffffff, roughness: 0.95, flatShading: true }),
    trunk: std({ color: 0x6b4a2e, roughness: 0.95 }),
    hedge: std({ color: 0xffffff, roughness: 1, flatShading: true }),
    tuft: std({ color: 0xffffff, roughness: 1 }),
    flower: std({ color: 0xffffff, roughness: 0.8 }),
    pebble: std({ color: 0xffffff, roughness: 1, flatShading: true }),
    lampPost: std({ color: 0x33302b, roughness: 0.6, metalness: 0.35 }),
    lantern: std({ color: 0xffe6b8, emissive: 0xffbb63, emissiveIntensity: 0, roughness: 0.55 }),
  };
}

const ROOF_MATS = (T) => [
  new THREE.MeshStandardMaterial({ map: T.tile, color: 0xffffff, roughness: 0.9, side: THREE.DoubleSide }),
  new THREE.MeshStandardMaterial({ map: T.tile, color: 0xd8a38e, roughness: 0.9, side: THREE.DoubleSide }),
  new THREE.MeshStandardMaterial({ map: T.tile, color: 0x93a8b8, roughness: 0.9, side: THREE.DoubleSide }),
  new THREE.MeshStandardMaterial({ map: T.tile, color: 0x9cb39c, roughness: 0.9, side: THREE.DoubleSide }),
  new THREE.MeshStandardMaterial({ map: T.tile, color: 0xb7a9c2, roughness: 0.9, side: THREE.DoubleSide }),
];

const WALL_COLORS = [
  '#dcc9a8', '#e5d0b2', '#cdb596', '#d8b9a2', '#c9c3ab',
  '#e0c9ae', '#bcc5b3', '#d6ab90', '#d3c2a0', '#c4b39c',
];

const SPECS = {
  cottage: { w: 2.3, d: 2.2, h: 2.1, roofH: 1.45, cols: 2, rows: 1, style: 'plaster', chimney: 0.55 },
  house: { w: 2.8, d: 2.5, h: 2.7, roofH: 1.6, cols: 3, rows: 2, style: 'brick', chimney: 0.7 },
  shop: { w: 3.0, d: 2.6, h: 3.2, roofH: 1.35, cols: 3, rows: 2, style: 'timber', chimney: 0.45, awning: true },
  hall: { w: 4.4, d: 3.2, h: 4.0, roofH: 1.5, cols: 4, rows: 2, style: 'plaster', cupola: true },
  church: { w: 3.2, d: 4.2, h: 3.6, roofH: 1.9, cols: 2, rows: 2, style: 'stone', tower: true },
  station: { w: 5.2, d: 3.0, h: 3.1, roofH: 1.4, cols: 5, rows: 2, style: 'brick', sign: true, canopy: true },
  mill: { w: 3.0, d: 2.8, h: 3.0, roofH: 1.7, cols: 3, rows: 2, style: 'timber', wheel: true },
};

export function buildWorld(scene, T, glowTex) {
  const M = createMaterials(T);
  const roofs = ROOF_MATS(T);
  const reg = {
    facadeMaterials: [], signMaterials: [], glowSprites: [],
    lanternMaterials: [M.lantern], nightPointLights: [],
  };
  const root = new THREE.Group();
  scene.add(root);

  buildBase(root, M, T);
  buildTerrain(root, M);
  buildRiver(root, M);
  buildTrack(root, M);
  buildRoads(root, M);
  const stationPos = buildStation(root, M, T, roofs, reg, glowTex);
  const plots = buildBuildings(root, M, T, roofs, reg);
  buildGreenery(root, M, plots);
  buildLamps(root, M, glowTex, reg, stationPos);
  buildContactShadow(root);

  const waterMap = T.water;
  function setNight(mix) {
    for (const m of reg.facadeMaterials) m.emissiveIntensity = mix * 2.0;
    for (const m of reg.signMaterials) m.emissiveIntensity = mix * 1.35;
    for (const m of reg.lanternMaterials) m.emissiveIntensity = mix * 2.4;
    for (const s of reg.glowSprites) s.material.opacity = mix * 0.9;
    for (const l of reg.nightPointLights) l.intensity = mix * 2.1;
    M.water.emissiveIntensity = 0.12 + mix * 0.22;
  }

  return { setNight, waterMap, stationPos, plotCount: plots.length };
}

/* ---------------------------------------------------------------- base --- */

function buildBase(root, M, T) {
  const w = L.BOARD.w, d = L.BOARD.d;
  const pw = w + 4.6, pd = d + 4.6;

  const plinth = new THREE.Mesh(roundedBox(pw, 2.0, pd, 0.22), M.woodDark);
  plinth.position.y = -2.25;
  setShadows(plinth);
  root.add(plinth);

  const band = new THREE.Mesh(roundedBox(w + 2.6, 0.18, d + 2.6, 0.07), M.wood);
  band.position.y = L.SOIL_BOTTOM + 0.09;
  setShadows(band);
  root.add(band);

  const beamH = 1.45;
  const beamY = L.SOIL_BOTTOM + beamH / 2;
  const beams = [
    [new THREE.BoxGeometry(pw, beamH, 1.7), 0, beamY, d / 2 + 1.45],
    [new THREE.BoxGeometry(pw, beamH, 1.7), 0, beamY, -(d / 2 + 1.45)],
    [new THREE.BoxGeometry(1.7, beamH, d + 0.4), w / 2 + 1.45, beamY, 0],
    [new THREE.BoxGeometry(1.7, beamH, d + 0.4), -(w / 2 + 1.45), beamY, 0],
  ];
  for (const [geo, x, y, z] of beams) {
    const m = new THREE.Mesh(geo, M.wood);
    m.position.set(x, y, z);
    setShadows(m);
    root.add(m);
  }
  const caps = [
    [new THREE.BoxGeometry(pw + 0.16, 0.11, 1.9), 0, 0.245, d / 2 + 1.45],
    [new THREE.BoxGeometry(pw + 0.16, 0.11, 1.9), 0, 0.245, -(d / 2 + 1.45)],
    [new THREE.BoxGeometry(1.9, 0.11, d + 0.56), w / 2 + 1.45, 0.245, 0],
    [new THREE.BoxGeometry(1.9, 0.11, d + 0.56), -(w / 2 + 1.45), 0.245, 0],
  ];
  for (const [geo, x, y, z] of caps) {
    const m = new THREE.Mesh(geo, M.woodTrim);
    m.position.set(x, y, z);
    setShadows(m);
    root.add(m);
  }

  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(roundedBox(3.2, 0.5, 3.2, 0.1), M.woodTrim);
      foot.position.set(sx * (pw / 2 - 2.2), -3.5, sz * (pd / 2 - 2.2));
      setShadows(foot);
      root.add(foot);
    }
  }

  const plaqueMat = new THREE.MeshStandardMaterial({
    map: T.plaque, roughness: 0.42, metalness: 0.42, side: THREE.DoubleSide,
  });
  const plaque = new THREE.Mesh(new THREE.PlaneGeometry(17, 3.55), plaqueMat);
  plaque.position.set(0, -2.22, pd / 2 + 0.02);
  root.add(plaque);
  for (const sx of [-1, 1]) {
    const screw = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), M.brass);
    screw.position.set(sx * 8.1, -2.22, pd / 2 + 0.06);
    root.add(screw);
  }
}

/* ------------------------------------------------------------ terrain --- */

function buildTerrain(root, M) {
  const { w, d } = L.BOARD;
  const geo = new THREE.PlaneGeometry(w, d, 168, 122);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, L.groundHeight(pos.getX(i), pos.getZ(i)));
  }
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 11, uv.getY(i) * 8);
  pos.needsUpdate = true;
  uv.needsUpdate = true;
  geo.computeVertexNormals();
  const terrain = new THREE.Mesh(geo, M.grass);
  terrain.receiveShadow = true;
  root.add(terrain);

  // Four vertical earth walls only. A closed box would hide the carved
  // channel behind its top face (a single material ignores geometry groups).
  const skirtH = -L.SOIL_BOTTOM;
  const skirtY = L.SOIL_BOTTOM + skirtH / 2;
  const walls = [
    [new THREE.PlaneGeometry(w, skirtH), 0, skirtY, d / 2, 0],
    [new THREE.PlaneGeometry(w, skirtH), 0, skirtY, -d / 2, Math.PI],
    [new THREE.PlaneGeometry(d, skirtH), w / 2, skirtY, 0, Math.PI / 2],
    [new THREE.PlaneGeometry(d, skirtH), -w / 2, skirtY, 0, -Math.PI / 2],
  ];
  for (const [geo, x, y, z, ry] of walls) {
    const wall = new THREE.Mesh(geo, M.earth);
    wall.position.set(x, y, z);
    wall.rotation.y = ry;
    wall.receiveShadow = true;
    root.add(wall);
  }
}

/* -------------------------------------------------------------- river --- */

function buildRiver(root, M) {
  const pts = [];
  for (let x = -L.BOARD.w / 2; x <= L.BOARD.w / 2; x += 0.5) {
    pts.push(V3(x, L.RIVER.waterY, L.riverZ(x)));
  }
  // Riverbed closes the channel below the opaque water surface.
  root.add(makeStrip(pts.map((p) => V3(p.x, L.RIVER.bedY - 0.05, p.z)), {
    halfWidth: L.RIVER.halfWater, thickness: 0.05, uvScale: 0.1,
    material: M.earth, castShadow: false,
  }));
  root.add(makeStrip(pts, {
    halfWidth: L.RIVER.ribbonHalf, thickness: 0.05, uvScale: 0.11,
    material: M.water, castShadow: false, receiveShadow: false,
  }));

  const r = rng(771);
  const pebbles = [], reeds = [];
  for (let x = -31; x <= 31; x += 1.15) {
    for (const s of [-1, 1]) {
      const z = L.riverZ(x) + s * (5.15 + r() * 0.5);
      const y = L.groundHeight(x, z) + 0.04;
      pebbles.push({ x: x + (r() - 0.5) * 0.8, y, z, s: 0.14 + r() * 0.24, rot: r() * 6.28,
        color: r() > 0.5 ? 0x9b9382 : 0x7d7666 });
      if (r() > 0.55) {
        const rz = L.riverZ(x) + s * (4.2 + r() * 0.4);
        reeds.push({ x: x + (r() - 0.5) * 0.6, y: L.groundHeight(x, rz) + 0.1, z: rz,
          s: 0.7 + r() * 0.7, color: r() > 0.5 ? 0x5d7a3c : 0x74924c });
      }
    }
  }
  root.add(instanced(new THREE.IcosahedronGeometry(0.5, 0), M.pebble, pebbles, true));
  const reedGeo = new THREE.ConeGeometry(0.06, 0.75, 4);
  reedGeo.translate(0, 0.37, 0);
  root.add(instanced(reedGeo, M.tuft, reeds, true));
}

/* -------------------------------------------------------------- track --- */

function lateral(p, a, b, offset) {
  const tx = b.x - a.x, tz = b.z - a.z;
  const len = Math.hypot(tx, tz) || 1;
  return V3(p.x + (tz / len) * offset, p.y, p.z + (-tx / len) * offset);
}

function buildTrack(root, M) {
  const N = 520;
  const flags = [];
  for (let i = 0; i < N; i++) {
    const p = L.trackCurve.getPointAt(i / N);
    flags.push(L.riverDistance(p.x, p.z) < L.BRIDGE_THRESHOLD);
  }
  const dryRuns = L.circularRuns(flags, false);
  const deckRuns = L.circularRuns(flags, true);

  // Ballast embankment: its bottom follows the sculpted ground so the raised
  // approach to each bridge is a solid fill, not a floating slab.
  for (const run of dryRuns) {
    const pts = L.sampleTrack(run.startK, run.endK, run.off, N, 1);
    if (pts.length < 2) continue;
    const top = pts.map((p) => V3(p.x, p.y - 0.14, p.z));
    const bottom = pts.map((p) => L.groundHeight(p.x, p.z) - 0.04);
    root.add(makeStrip(top, {
      halfWidth: 1.9, uvScale: 0.34, material: M.gravel, bottomY: bottom,
    }));
  }

  // Sleepers, instanced and individually aligned to the local track frame.
  const sleeperCount = 268;
  const sleepers = new THREE.InstancedMesh(
    new THREE.BoxGeometry(2.7, 0.14, 0.34), M.sleeper, sleeperCount,
  );
  const sm = new THREE.Matrix4();
  for (let i = 0; i < sleeperCount; i++) {
    const u = i / sleeperCount;
    const p = L.trackPoint(u);
    sm.copy(L.trackFrame(u)).setPosition(p.x, p.y - 0.07, p.z);
    sleepers.setMatrixAt(i, sm);
  }
  sleepers.instanceMatrix.needsUpdate = true;
  sleepers.castShadow = true;
  sleepers.receiveShadow = true;
  root.add(sleepers);

  // Two continuous rails.
  for (const side of [-1, 1]) {
    const pts = [];
    for (let i = 0; i < N; i++) {
      const p = L.trackPoint(i / N);
      pts.push(V3(p.x, p.y + 0.13, p.z));
    }
    root.add(makeStrip(pts, {
      halfWidth: 0.075, thickness: 0.13, lateralOffset: side * 0.85,
      closed: true, uvScale: 0.6, material: M.rail,
    }));
  }

  // Viaducts over the two river crossings.
  for (const run of deckRuns) {
    const pts = L.sampleTrack(run.startK, run.endK, run.off, N, 7);
    if (pts.length < 3) continue;
    const deckTop = pts.map((p) => V3(p.x, p.y - 0.14, p.z));
    root.add(makeStrip(deckTop, {
      halfWidth: 2.15, thickness: 0.24, uvScale: 0.1, material: M.stone,
    }));

    for (const s of [-1, 1]) {
      const railTop = pts.map((p) => V3(p.x, p.y + 0.46, p.z));
      root.add(makeStrip(railTop, {
        halfWidth: 0.13, thickness: 0.46, lateralOffset: s * 2.02,
        uvScale: 0.3, material: M.stone,
      }));
      for (let k = 0; k < pts.length; k += 6) {
        const a = pts[Math.max(0, k - 1)], b = pts[Math.min(pts.length - 1, k + 1)];
        const q = lateral(pts[k], a, b, s * 2.02);
        const post = new THREE.Mesh(roundedBox(0.3, 0.62, 0.3, 0.05), M.stone);
        post.position.set(q.x, pts[k].y + 0.31, q.z);
        post.rotation.y = rotFor(b.x - a.x, b.z - a.z);
        setShadows(post);
        root.add(post);
      }
    }

    const step = Math.max(4, Math.floor(pts.length / 4));
    for (let k = Math.floor(step / 2); k < pts.length - 1; k += step) {
      const p = pts[k];
      const a = pts[Math.max(0, k - 1)], b = pts[Math.min(pts.length - 1, k + 1)];
      const ground = L.groundHeight(p.x, p.z) - 0.3;
      const top = p.y - 0.38;
      const h = Math.max(0.4, top - ground);
      for (const s of [-1, 1]) {
        const q = lateral(p, a, b, s * 1.15);
        const pier = new THREE.Mesh(roundedBox(0.72, h, 0.8, 0.09), M.stone);
        pier.position.set(q.x, ground + h / 2, q.z);
        pier.rotation.y = rotFor(b.x - a.x, b.z - a.z);
        setShadows(pier);
        root.add(pier);
      }
      const tie = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.2, 0.42), M.stone);
      tie.position.set(p.x, top - 0.16, p.z);
      tie.rotation.y = rotFor(b.x - a.x, b.z - a.z);
      setShadows(tie);
      root.add(tie);
    }

    for (const idx of [0, pts.length - 1]) {
      const p = pts[idx];
      const a = pts[Math.max(0, idx - 1)], b = pts[Math.min(pts.length - 1, idx + 1)];
      const abut = new THREE.Mesh(roundedBox(4.6, 0.9, 1.2, 0.12), M.stone);
      abut.position.set(p.x, p.y - 0.62, p.z);
      abut.rotation.y = rotFor(b.x - a.x, b.z - a.z);
      setShadows(abut);
      root.add(abut);
    }
  }
}

/* -------------------------------------------------------------- roads --- */

function buildRoads(root, M) {
  for (const road of L.ROADS) {
    const pts = L.roadPoints(road);
    root.add(makeStrip(pts, {
      halfWidth: road.width / 2, thickness: 0.08, uvScale: 0.28, material: M.road,
    }));
    const edgePts = pts.map((p) => V3(p.x, p.y + 0.012, p.z));
    for (const s of [-1, 1]) {
      root.add(makeStrip(edgePts, {
        halfWidth: 0.07, thickness: 0.02,
        lateralOffset: s * (road.width / 2 - 0.07), uvScale: 0.3, material: M.roadEdge,
      }));
    }

    if (road.bridge) {
      const idx = [];
      pts.forEach((p, i) => { if (p.y > 0.25) idx.push(i); });
      const a = Math.max(0, idx[0] - 1), b = Math.min(pts.length - 1, idx[idx.length - 1] + 1);
      const bp = pts.slice(a, b + 1);
      root.add(makeStrip(bp.map((p) => V3(p.x, p.y - 0.06, p.z)), {
        halfWidth: road.width / 2 + 0.22, thickness: 0.22, uvScale: 0.2, material: M.stone,
      }));
      for (const s of [-1, 1]) {
        root.add(makeStrip(bp.map((p) => V3(p.x, p.y + 0.42, p.z)), {
          halfWidth: 0.14, thickness: 0.42,
          lateralOffset: s * (road.width / 2 + 0.12), uvScale: 0.35, material: M.stone,
        }));
      }
      for (let k = 2; k < bp.length - 1; k += Math.max(2, Math.floor(bp.length / 4))) {
        const p = bp[k];
        const prev = bp[k - 1], next = bp[k + 1];
        const ground = L.groundHeight(p.x, p.z) - 0.28;
        const top = p.y - 0.28;
        const h = Math.max(0.4, top - ground);
        const pier = new THREE.Mesh(roundedBox(0.85, h, 1.0, 0.1), M.stone);
        pier.position.set(p.x, ground + h / 2, p.z);
        pier.rotation.y = rotFor(next.x - prev.x, next.z - prev.z);
        setShadows(pier);
        root.add(pier);
      }
    }
  }

  // Level crossing where the outer road meets the far arc of the loop.
  const outer = L.roadPoints(L.ROADS.find((r) => r.name === 'outer'));
  let best = Infinity, hit = null, dir = null;
  for (let i = 0; i < outer.length - 1; i++) {
    const a = outer[i], b = outer[i + 1];
    for (let t = 0; t <= 12; t++) {
      const x = a.x + (b.x - a.x) * t / 12;
      const z = a.z + (b.z - a.z) * t / 12;
      const d = L.distToTrack(x, z);
      if (d < best) { best = d; hit = V3(x, L.groundHeight(x, z) + 0.09, z); dir = V3(b.x - a.x, 0, b.z - a.z).normalize(); }
    }
  }
  if (hit) {
    const rot = rotFor(dir.x, dir.z);
    for (const off of [-1.05, 1.05]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.03, 0.22), M.gable);
      bar.position.set(hit.x + dir.x * off, hit.y + 0.01, hit.z + dir.z * off);
      bar.rotation.y = rot + Math.PI / 2;
      root.add(bar);
    }
    for (const s of [-1, 1]) {
      const sign = new THREE.Group();
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.7, 6), M.lampPost);
      post.position.y = 0.85;
      setShadows(post);
      sign.add(post);
      for (const a of [-0.5, 0.5]) {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.14, 0.07), M.gable);
        plank.position.set(0, 1.5, 0);
        plank.rotation.x = a;
        sign.add(plank);
      }
      const nx = -dir.z, nz = dir.x;
      sign.position.set(hit.x + nx * s * 2.1, hit.y, hit.z + nz * s * 2.1);
      sign.rotation.y = rot;
      root.add(sign);
    }
  }
}

/* ------------------------------------------------------------ station --- */

function buildStation(root, M, T, roofs, reg, glowTex) {
  const u = L.STATION_U;
  const p = L.trackPoint(u);
  const frame = L.trackFrame(u);
  const forward = new THREE.Vector3().setFromMatrixColumn(frame, 2);
  const right = new THREE.Vector3().setFromMatrixColumn(frame, 0);
  const toCenter = V3(-p.x, 0, -p.z).normalize();
  const n = right.clone().multiplyScalar(right.dot(toCenter) > 0 ? 1 : -1);
  const at = (dist) => V3(p.x + n.x * dist, 0, p.z + n.z * dist);
  const rot = rotFor(forward.x, forward.z);

  const plat = at(2.2);
  const platform = new THREE.Mesh(roundedBox(2.7, 0.34, 8.4, 0.09), M.stone);
  platform.position.set(plat.x, 0.35, plat.z);
  platform.rotation.y = rot;
  setShadows(platform);
  root.add(platform);

  const line = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.03, 8.2), M.brass);
  const lp = at(0.95);
  line.position.set(lp.x, 0.53, lp.z);
  line.rotation.y = rot;
  root.add(line);

  // Canopy over the inner half of the platform.
  const canopy = new THREE.Group();
  const roof = new THREE.Mesh(roundedBox(2.9, 0.16, 4.8, 0.07), roofs[3]);
  roof.position.y = 2.55;
  setShadows(roof);
  canopy.add(roof);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 2.5, 6), M.lampPost);
      post.position.set(sx * 1.2, 1.3, sz * 2.0);
      setShadows(post);
      canopy.add(post);
    }
  }
  const cp = at(3.4);
  canopy.position.set(cp.x, 0, cp.z);
  canopy.rotation.y = rot;
  root.add(canopy);

  const sb = at(5.6);
  const building = makeBuilding(M, roofs, reg, {
    kind: 'station', seed: 5001, litRatio: 0.85,
  });
  building.position.set(sb.x, L.groundHeight(sb.x, sb.z), sb.z);
  building.rotation.y = rotFor(-n.x, -n.z);
  root.add(building);

  // Lamps on the platform.
  for (const off of [-2.8, 2.8]) {
    const q = V3(plat.x + forward.x * off, 0, plat.z + forward.z * off);
    const lg = makeLamp(M, glowTex, reg, q.x, q.z, 0.53, false);
    root.add(lg);
  }

  const lamp = new THREE.PointLight(0xffbb72, 0, 17, 2);
  lamp.position.set(sb.x, 3.4, sb.z);
  root.add(lamp);
  reg.nightPointLights.push(lamp);

  return { x: sb.x, z: sb.z };
}

/* ---------------------------------------------------------- buildings --- */

function makeBuilding(M, roofs, reg, opts) {
  const { kind = 'house', seed = 1, litRatio = 0.45, signText = null } = opts;
  const r = rng(seed);
  const s = SPECS[kind];
  const g = new THREE.Group();

  const wall = WALL_COLORS[Math.floor(r() * WALL_COLORS.length)];
  const facade = makeFacade({
    wall, style: s.style, cols: s.cols, rows: s.rows,
    seed: seed + 13, litRatio,
  });
  const wallMat = new THREE.MeshStandardMaterial({
    map: facade.map, emissiveMap: facade.emissiveMap,
    emissive: 0xffcf87, emissiveIntensity: 0,
    roughness: 0.92, side: THREE.DoubleSide,
  });
  reg.facadeMaterials.push(wallMat);
  const roofMat = kind === 'church' ? roofs[2]
    : kind === 'hall' ? roofs[3]
      : kind === 'station' ? roofs[1]
        : roofs[Math.floor(r() * roofs.length)];

  const foundation = new THREE.Mesh(roundedBox(s.w + 0.34, 0.26, s.d + 0.34, 0.06), M.stone);
  foundation.position.y = 0.13;
  setShadows(foundation);
  g.add(foundation);

  const body = new THREE.Mesh(roundedBox(s.w, s.h, s.d, 0.09), wallMat);
  body.position.y = 0.26 + s.h / 2;
  setShadows(body);
  g.add(body);

  const roof = makeGableRoof(s.w, s.d, s.roofH, roofMat, M.gable);
  roof.position.y = 0.26 + s.h;
  setShadows(roof);
  g.add(roof);

  const door = new THREE.Mesh(roundedBox(0.62, 1.16, 0.12, 0.05), M.door);
  door.position.set(0, 0.26 + 0.58, s.d / 2 + 0.045);
  setShadows(door);
  g.add(door);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), M.brass);
  knob.position.set(0.2, 0.26 + 0.6, s.d / 2 + 0.12);
  g.add(knob);
  const step = new THREE.Mesh(roundedBox(0.9, 0.1, 0.42, 0.04), M.stone);
  step.position.set(0, 0.05, s.d / 2 + 0.28);
  setShadows(step);
  g.add(step);

  if (s.chimney) {
    const ch = new THREE.Mesh(roundedBox(0.38, s.chimney + 0.5, 0.38, 0.05), M.gable);
    ch.position.set(s.w * 0.28, 0.26 + s.h + s.roofH * 0.45, -s.d * 0.2);
    setShadows(ch);
    g.add(ch);
    const cap = new THREE.Mesh(roundedBox(0.5, 0.1, 0.5, 0.03), M.dark);
    cap.position.set(s.w * 0.28, 0.26 + s.h + s.roofH * 0.45 + s.chimney / 2 + 0.27, -s.d * 0.2);
    g.add(cap);
  }

  if (s.awning) {
    const aw = new THREE.Mesh(new THREE.BoxGeometry(s.w * 0.92, 0.08, 0.9), roofs[1]);
    aw.position.set(0, 0.26 + s.h * 0.62, s.d / 2 + 0.42);
    aw.rotation.x = -0.22;
    setShadows(aw);
    g.add(aw);
  }

  if (s.canopy) {
    const aw = new THREE.Mesh(roundedBox(s.w * 0.86, 0.12, 1.0, 0.05), roofs[3]);
    aw.position.set(0, 0.26 + s.h * 0.72, s.d / 2 + 0.48);
    setShadows(aw);
    g.add(aw);
    for (const sx of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, s.h * 0.7, 6), M.lampPost);
      post.position.set(sx * s.w * 0.36, 0.26 + s.h * 0.36, s.d / 2 + 0.86);
      setShadows(post);
      g.add(post);
    }
  }

  if (s.tower) {
    const tower = new THREE.Mesh(roundedBox(1.55, 5.0, 1.55, 0.08), wallMat);
    tower.position.set(-s.w * 0.3, 0.26 + 2.5, s.d / 2 - 0.55);
    setShadows(tower);
    g.add(tower);
    const spire = new THREE.Mesh(new THREE.ConeGeometry(1.25, 2.7, 8), M.spire);
    spire.position.set(-s.w * 0.3, 0.26 + 5.0 + 1.35, s.d / 2 - 0.55);
    setShadows(spire);
    g.add(spire);
    const cross = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.65, 0.1), M.brass);
    cross.position.set(-s.w * 0.3, 0.26 + 5.0 + 2.9, s.d / 2 - 0.55);
    g.add(cross);
  }

  if (s.cupola) {
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.7, 10), M.gable);
    drum.position.set(0, 0.26 + s.h + s.roofH + 0.35, 0);
    setShadows(drum);
    g.add(drum);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.78, 1.0, 10), M.copper);
    cap.position.set(0, 0.26 + s.h + s.roofH + 1.2, 0);
    setShadows(cap);
    g.add(cap);
  }

  if (s.wheel) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.1, 6, 14), M.woodTrim);
    wheel.position.set(s.w / 2 + 0.5, 0.95, -0.3);
    wheel.rotation.y = Math.PI / 2;
    setShadows(wheel);
    g.add(wheel);
  }

  if (s.sign || signText) {
    const sign = makeSign(signText || 'STATION', kind === 'station' ? 'CENTRAL' : '');
    const signMat = new THREE.MeshStandardMaterial({
      map: sign.map, emissiveMap: sign.emissiveMap,
      emissive: 0xffd9a0, emissiveIntensity: 0,
      roughness: 0.7, side: THREE.DoubleSide,
    });
    reg.signMaterials.push(signMat);
    const board = new THREE.Mesh(new THREE.PlaneGeometry(s.w * 0.78, s.w * 0.78 / 4), signMat);
    board.position.set(0, 0.26 + s.h - 0.55, s.d / 2 + 0.1);
    g.add(board);

    const clock = new THREE.Mesh(new THREE.CircleGeometry(0.32, 20), M.gable);
    clock.position.set(s.w * 0.34, 0.26 + s.h + s.roofH * 0.42, s.d / 2 + 0.06);
    g.add(clock);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.045, 6, 20), M.brass);
    rim.position.copy(clock.position);
    g.add(rim);
  }

  // A few window boxes give the models a handmade, inhabited feel.
  if (r() > 0.55 && kind !== 'church' && kind !== 'station') {
    const box = new THREE.Mesh(roundedBox(s.w * 0.5, 0.16, 0.22, 0.04), M.woodTrim);
    box.position.set(0, 0.26 + s.h * 0.55, s.d / 2 + 0.14);
    g.add(box);
    for (let i = -1; i <= 1; i++) {
      const bloom = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5),
        new THREE.MeshStandardMaterial({ color: r() > 0.5 ? 0xc6533f : 0xe0b34a, roughness: 0.9 }));
      bloom.position.set(i * s.w * 0.15, 0.26 + s.h * 0.55 + 0.12, s.d / 2 + 0.14);
      g.add(bloom);
    }
  }

  return g;
}

function buildBuildings(root, M, T, roofs, reg) {
  const r = rng(4242);
  const plots = [];
  const landmarks = [
    { x: 3.5, z: 10.6, kind: 'church', seed: 901 },
    { x: 10.5, z: 10.2, kind: 'hall', seed: 902 },
    { x: -10.5, z: -11.0, kind: 'mill', seed: 903 },
    { x: -19.0, z: -10.5, kind: 'shop', seed: 904 },
    { x: 16.5, z: 10.6, kind: 'shop', seed: 905 },
  ];

  for (let gx = -27; gx <= 27; gx += 3.0) {
    for (let gz = -19; gz <= 19; gz += 3.0) {
      const x = gx + (r() - 0.5) * 0.8;
      const z = gz + (r() - 0.5) * 0.8;
      if (Math.abs(x) > 28.5 || Math.abs(z) > 20.5) continue;
      if (L.distToTrack(x, z) < 4.6) continue;
      if (L.riverDistance(x, z) < 6.2) continue;
      const dr = L.distToRoad(x, z);
      if (dr < 1.25 || dr > 13) continue;
      if (Math.hypot(x + 9.0, z - 11.0) < 5.0) continue;
      if (landmarks.some((p) => Math.hypot(p.x - x, p.z - z) < 3.4)) continue;
      if (plots.some((p) => Math.hypot(p.x - x, p.z - z) < 2.9)) continue;
      plots.push({ x, z });
    }
  }

  const kinds = ['cottage', 'house', 'house', 'shop', 'cottage', 'house', 'shop'];
  const all = landmarks.concat(plots.map((p, i) => ({
    x: p.x, z: p.z, kind: kinds[Math.floor(r() * kinds.length)], seed: 100 + i,
  })));

  for (const plot of all) {
    const nr = L.nearestRoad(plot.x, plot.z);
    let rot;
    if (nr.name === 'near' || nr.name === 'far') {
      rot = plot.z > 0 ? Math.PI : 0;
      if (nr.tx !== 0 && Math.abs(nr.tz) > Math.abs(nr.tx)) rot = plot.x > 0 ? -Math.PI / 2 : Math.PI / 2;
    } else {
      rot = plot.x > 0 ? -Math.PI / 2 : Math.PI / 2;
    }
    rot += (r() - 0.5) * 0.12;

    const b = makeBuilding(M, roofs, reg, {
      kind: plot.kind, seed: plot.seed,
      signText: plot.kind === 'shop' && r() > 0.75 ? 'BAKERY' : null,
    });
    b.position.set(plot.x, L.groundHeight(plot.x, plot.z), plot.z);
    b.rotation.y = rot;
    root.add(b);
  }
  return all;
}

/* ----------------------------------------------------------- greenery --- */

function instanced(geo, mat, entries, useColor = false) {
  const im = new THREE.InstancedMesh(geo, mat, entries.length);
  const m = new THREE.Matrix4();
  const p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
  const axis = new THREE.Vector3(0, 1, 0);
  entries.forEach((e, i) => {
    p.set(e.x, e.y, e.z);
    s.set(e.sx || e.s, e.sy || e.s, e.sz || e.s);
    q.setFromAxisAngle(axis, e.rot || 0);
    m.compose(p, q, s);
    im.setMatrixAt(i, m);
    if (useColor && e.color !== undefined) im.setColorAt(i, new THREE.Color(e.color));
  });
  im.instanceMatrix.needsUpdate = true;
  if (im.instanceColor) im.instanceColor.needsUpdate = true;
  im.castShadow = true;
  im.receiveShadow = true;
  return im;
}

function buildGreenery(root, M, plots) {
  const r = rng(2026);
  const trees = [], tufts = [], flowers = [], hedges = [];

  for (let tries = 0; tries < 2600 && trees.length < 165; tries++) {
    const x = (r() * 2 - 1) * 30.5, z = (r() * 2 - 1) * 21;
    if (Math.abs(x) > 30 || Math.abs(z) > 20.6) continue;
    if (L.distToTrack(x, z) < 3.0) continue;
    if (L.riverDistance(x, z) < 5.5) continue;
    if (L.distToRoad(x, z) < 1.4) continue;
    if (Math.hypot(x + 9.0, z - 11.0) < 4.5) continue;
    if (plots.some((p) => Math.hypot(p.x - x, p.z - z) < 2.4)) continue;
    if (trees.some((t) => Math.hypot(t.x - x, t.z - z) < 1.65)) continue;
    trees.push({ x, z, s: 0.75 + r() * 0.7, conifer: r() > 0.72,
      color: r() > 0.5 ? 0x54803c : 0x6b9247, rot: r() * 6.28 });
  }

  const trunkGeo = new THREE.CylinderGeometry(0.11, 0.17, 1.05, 6);
  trunkGeo.translate(0, 0.52, 0);
  const leafGeo = new THREE.IcosahedronGeometry(0.92, 0);
  const coneGeo = new THREE.ConeGeometry(0.82, 2.3, 7);
  coneGeo.translate(0, 1.15, 0);

  const trunks = [], leaves = [], cones = [];
  for (const t of trees) {
    const y = L.groundHeight(t.x, t.z);
    trunks.push({ x: t.x, y, z: t.z, s: t.s, rot: t.rot });
    if (t.conifer) {
      cones.push({ x: t.x, y: y + 0.75 * t.s, z: t.z, s: t.s,
        color: t.color, rot: t.rot });
      cones.push({ x: t.x, y: y + 1.7 * t.s, z: t.z, s: t.s * 0.72,
        color: t.color, rot: t.rot + 0.4 });
    } else {
      leaves.push({ x: t.x, y: y + 1.15 * t.s, z: t.z,
        sx: t.s * 1.05, sy: t.s * 0.92, sz: t.s * 1.05, s: t.s,
        color: t.color, rot: t.rot });
      leaves.push({ x: t.x + 0.3 * t.s, y: y + 1.7 * t.s, z: t.z - 0.18 * t.s,
        s: t.s * 0.7, color: t.color, rot: t.rot + 1.1 });
    }
  }
  root.add(instanced(trunkGeo, M.trunk, trunks));
  root.add(instanced(leafGeo, M.leaf, leaves, true));
  root.add(instanced(coneGeo, M.leaf, cones, true));

  for (let i = 0; i < 900; i++) {
    const x = (r() * 2 - 1) * 31, z = (r() * 2 - 1) * 22;
    if (L.riverDistance(x, z) < 4.1) continue;
    if (L.distToTrack(x, z) < 1.6) continue;
    if (L.distToRoad(x, z) < 0.9) continue;
    tufts.push({ x, y: L.groundHeight(x, z), z, s: 0.55 + r() * 0.9,
      rot: r() * 6.28, color: r() > 0.5 ? 0x7b9c4f : 0x62833f });
  }
  const tuftGeo = new THREE.ConeGeometry(0.075, 0.3, 3);
  tuftGeo.translate(0, 0.15, 0);
  root.add(instanced(tuftGeo, M.tuft, tufts, true));

  for (let i = 0; i < 230; i++) {
    const x = (r() * 2 - 1) * 27, z = (r() * 2 - 1) * 19;
    if (L.riverDistance(x, z) < 5.6) continue;
    if (L.distToRoad(x, z) > 4.2) continue;
    flowers.push({ x, y: L.groundHeight(x, z) + 0.08, z, s: 0.5 + r() * 0.6,
      color: [0xd6553f, 0xe8c04a, 0xe9e2c8, 0xc46a9b][Math.floor(r() * 4)] });
  }
  root.add(instanced(new THREE.SphereGeometry(0.09, 6, 5), M.flower, flowers, true));

  for (let i = 0; i < 70; i++) {
    const x = (r() * 2 - 1) * 27, z = (r() * 2 - 1) * 19;
    if (L.riverDistance(x, z) < 6.0) continue;
    if (L.distToTrack(x, z) < 3.0) continue;
    if (L.distToRoad(x, z) < 1.2) continue;
    hedges.push({ x, y: L.groundHeight(x, z) + 0.28, z,
      sx: 0.7 + r() * 0.8, sy: 0.42, sz: 0.6 + r() * 0.7, s: 1,
      color: 0x4d7038, rot: r() * 6.28 });
  }
  root.add(instanced(new THREE.IcosahedronGeometry(0.7, 0), M.hedge, hedges, true));
}

/* -------------------------------------------------------------- lamps --- */

function makeLamp(M, glowTex, reg, x, z, groundY, withLight) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(roundedBox(0.36, 0.16, 0.36, 0.05), M.lampPost);
  base.position.y = 0.08;
  setShadows(base);
  g.add(base);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.09, 2.4, 8), M.lampPost);
  post.position.y = 1.28;
  setShadows(post);
  g.add(post);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.07, 0.07), M.lampPost);
  arm.position.set(0.2, 2.48, 0);
  g.add(arm);
  const lantern = new THREE.Mesh(roundedBox(0.34, 0.44, 0.34, 0.07), M.lantern);
  lantern.position.set(0.4, 2.28, 0);
  setShadows(lantern);
  g.add(lantern);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.24, 4), M.lampPost);
  cap.position.set(0.4, 2.6, 0);
  cap.rotation.y = Math.PI / 4;
  g.add(cap);
  const halo = glowSprite(glowTex, 3.4);
  halo.position.set(0.4, 2.28, 0);
  reg.glowSprites.push(halo);
  g.add(halo);
  g.position.set(x, groundY, z);
  if (withLight) {
    const pl = new THREE.PointLight(0xffbd78, 0, 13, 2);
    pl.position.set(0.4, 2.3, 0);
    g.add(pl);
    reg.nightPointLights.push(pl);
  }
  return g;
}

function buildLamps(root, M, glowTex, reg, stationPos) {
  let count = 0;
  for (const road of L.ROADS) {
    const pts = L.roadPoints(road);
    for (let i = 0; i < pts.length - 1; i += 2) {
      const a = pts[i], b = pts[i + 1];
      const len = Math.hypot(b.x - a.x, b.z - a.z) || 1;
      const nx = (b.z - a.z) / len, nz = -(b.x - a.x) / len;
      const side = (i / 2) % 2 ? 1 : -1;
      const off = road.width / 2 + 0.5;
      const x = (a.x + b.x) / 2 + nx * side * off;
      const z = (a.z + b.z) / 2 + nz * side * off;
      if (L.riverDistance(x, z) < 5.6) continue;
      if (L.distToTrack(x, z) < 2.4) continue;
      const y = L.groundHeight(x, z);
      root.add(makeLamp(M, glowTex, reg, x, z, y, count % 5 === 0));
      count++;
    }
  }
  for (const [x, z] of [[0.5, 9.0], [0.5, -10.5], [-5.0, 8.2], [7.0, -9.0]]) {
    const pl = new THREE.PointLight(0xffc080, 0, 15, 2);
    pl.position.set(x, 3.0, z);
    root.add(pl);
    reg.nightPointLights.push(pl);
  }
}

/* ----------------------------------------------------- contact shadow --- */

function buildContactShadow(root) {
  const c = makeCanvas(256, 256);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 126);
  g.addColorStop(0, 'rgba(0,0,0,0.62)');
  g.addColorStop(0.55, 'rgba(0,0,0,0.30)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const t = toTexture(c, { srgb: false });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(104, 78),
    new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, opacity: 0.95 }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -3.8;
  root.add(mesh);
}
