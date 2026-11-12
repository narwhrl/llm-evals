import * as THREE from 'three';
import { BOARD, RIVER, paintTerrain, groundYAt, riverAt } from './track.js';
import { housePalette, plasterMaterial, roofMaterial } from './materials.js';

const DEG = Math.PI / 180;

function box(w, h, d, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function cyl(rTop, rBot, h, seg, mat) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function placeOnGround(obj, x, z, rotY = 0) {
  obj.position.set(x, groundYAt(x, z), z);
  obj.rotation.y = rotY;
  return obj;
}

// ---------------------------------------------------------------- base
function buildBase(m) {
  const g = new THREE.Group();
  const rimW = 0.9;
  const rimH = 1.7;
  const slab = box(BOARD.halfX * 2 + rimW * 2, 1.4, BOARD.halfZ * 2 + rimW * 2, m.baseWood);
  slab.position.y = -0.7 - 1.4;
  g.add(slab);

  // raised rim frame around the grass board
  const rimMat = m.baseEdge;
  const rimTop = 0.28;
  const outerX = BOARD.halfX + rimW;
  const north = box(outerX * 2, rimH + rimTop, rimW, rimMat);
  north.position.set(0, rimTop - (rimH + rimTop) / 2 + 0.35, BOARD.halfZ + rimW / 2);
  const south = north.clone();
  south.position.z = -BOARD.halfZ - rimW / 2;
  const east = box(rimW, rimH + rimTop, BOARD.halfZ * 2, rimMat);
  east.position.set(BOARD.halfX + rimW / 2, north.position.y, 0);
  const west = east.clone();
  west.position.x = -BOARD.halfX - rimW / 2;
  g.add(north, south, east, west);
  return g;
}

// ---------------------------------------------------------------- terrain
function buildTerrain(m) {
  const segX = 136;
  const segZ = 88;
  const geo = new THREE.PlaneGeometry(BOARD.halfX * 2, BOARD.halfZ * 2, segX, segZ);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const channelHalf = RIVER.width / 2 + 0.55;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const zc = (RIVER.z0 + RIVER.z1) / 2;
    const inRiver = x > RIVER.x0 - 0.4 && Math.abs(z - zc) < channelHalf;
    if (inRiver) {
      const edge = THREE.MathUtils.smoothstep(
        Math.min(x - (RIVER.x0 - 0.4), channelHalf - Math.abs(z - zc)),
        0,
        0.9
      );
      pos.setY(i, THREE.MathUtils.lerp(0, RIVER.waterY - 0.25, Math.min(edge, 1)));
    } else {
      // gentle bank slope toward the channel
      const dz = Math.abs(z - zc) - channelHalf;
      const dx = RIVER.x0 - 0.4 - x;
      const d = Math.max(dz, dx);
      if (d < 1.2 && (x > RIVER.x0 - 1.6 || dz < 0)) {
        pos.setY(i, THREE.MathUtils.lerp(-0.28, 0, d / 1.2));
      }
    }
  }
  paintTerrain(geo);
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, m.terrain);
  mesh.receiveShadow = true;
  return mesh;
}

function buildWater(m) {
  const zc = (RIVER.z0 + RIVER.z1) / 2;
  const len = BOARD.halfX - RIVER.x0 + 1.4;
  const geo = new THREE.PlaneGeometry(len, RIVER.width + 1.2, 24, 4);
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, m.water);
  mesh.position.set(RIVER.x0 + len / 2 - 0.7, RIVER.waterY, zc);
  mesh.receiveShadow = true;
  return mesh;
}

// ---------------------------------------------------------------- track
export function buildTrackMesh(curve, m) {
  const g = new THREE.Group();
  const length = curve.getLength();

  // ballast ribbon
  const ballastPts = [];
  const N = 300;
  for (let i = 0; i <= N; i++) ballastPts.push(curve.getPointAt(i / N));
  const ballastCurve = new THREE.CatmullRomCurve3(ballastPts, true);
  const ballastGeo = new THREE.TubeGeometry(ballastCurve, 400, 0.16, 6, true);
  const ballast = new THREE.Mesh(ballastGeo, m.ballast);
  ballast.position.y = -0.06;
  ballast.scale.y = 0.55;
  ballast.receiveShadow = true;
  g.add(ballast);

  // sleepers
  const sleeperGeo = new THREE.BoxGeometry(1.5, 0.07, 0.3);
  const count = Math.floor(length / 0.62);
  const sleepers = new THREE.InstancedMesh(sleeperGeo, m.sleeper, count);
  const mtx = new THREE.Matrix4();
  const p = new THREE.Vector3();
  const t = new THREE.Vector3();
  const q = new THREE.Quaternion();
  for (let i = 0; i < count; i++) {
    const u = i / count;
    curve.getPointAt(u, p);
    curve.getTangentAt(u, t);
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(t.x, 0, t.z).normalize());
    const bank = riverAt(p.x, p.z, 0) !== null;
    mtx.compose(new THREE.Vector3(p.x, bank ? 0.16 : 0.045, p.z), q, new THREE.Vector3(1, 1, 1));
    sleepers.setMatrixAt(i, mtx);
  }
  sleepers.receiveShadow = true;
  g.add(sleepers);

  // two rails as offset curves
  for (const side of [-0.28, 0.28]) {
    const railPts = [];
    for (let i = 0; i <= N; i++) {
      const u = i / N;
      curve.getPointAt(u, p);
      curve.getTangentAt(u, t);
      const nx = -t.z;
      const nz = t.x;
      const inv = 1 / Math.hypot(nx, nz);
      railPts.push(new THREE.Vector3(p.x + nx * inv * side, 0, p.z + nz * inv * side));
    }
    const railCurve = new THREE.CatmullRomCurve3(railPts, true);
    const railGeo = new THREE.TubeGeometry(railCurve, 420, 0.05, 5, true);
    // Rails ride higher on the bridge deck; lift them by projecting onto terrain.
    const rp = railGeo.attributes.position;
    for (let i = 0; i < rp.count; i++) {
      const x = rp.getX(i);
      const z = rp.getZ(i);
      const bank = riverAt(x, z, 0) !== null;
      rp.setY(i, (bank ? 0.2 : 0.09) - rp.getY(i) * 0.4);
    }
    const rail = new THREE.Mesh(railGeo, m.rail);
    rail.castShadow = true;
    g.add(rail);
  }
  return g;
}

// ---------------------------------------------------------------- bridge
function buildBridge(curve, m, enterS, exitS) {
  const g = new THREE.Group();
  const mid = (enterS + exitS) / 2;
  const span = exitS - enterS;
  const L = curve.getLength();

  const sample = (s) => curve.getPointAt((((s % L) + L) % L) / L);
  const center = sample(mid);
  const dir = sample(mid + 0.5).sub(sample(mid - 0.5)).normalize();
  const angle = Math.atan2(dir.x, dir.z);

  // wooden deck
  const deck = box(span + 1.6, 0.3, 2.6, m.bridgeWood);
  deck.position.set(center.x, 0.05, center.z);
  deck.rotation.y = angle;
  g.add(deck);

  // stone piers down to the water
  for (const off of [-span * 0.28, span * 0.28]) {
    const pp = sample(mid + off);
    const pier = cyl(0.55, 0.7, 0.85, 10, m.rock);
    pier.position.set(pp.x, -0.32, pp.z);
    g.add(pier);
  }

  // low side trusses
  for (const side of [-1.15, 1.15]) {
    const beam = box(span + 1.6, 0.55, 0.12, m.bridgePaint);
    beam.position.set(center.x, 0.62, center.z);
    beam.rotation.y = angle;
    beam.translateZ(side);
    g.add(beam);
    for (let i = 0; i <= 4; i++) {
      const post = box(0.1, 0.55, 0.1, m.bridgePaint);
      post.position.set(center.x, 0.6, center.z);
      post.rotation.y = angle;
      post.translateZ(side);
      post.translateX(-span / 2 + (span * i) / 4);
      g.add(post);
    }
  }
  return g;
}

// ---------------------------------------------------------------- station
function buildStation(m, nightMats) {
  const g = new THREE.Group();
  // platform along the track (track runs ~x-direction here)
  const platform = box(10.5, 0.42, 2.6, m.platform);
  platform.position.set(-16.5, 0.21, -13.6);
  g.add(platform);
  // platform edge line
  const edge = box(10.5, 0.03, 0.18, m.crossing);
  edge.position.set(-16.5, 0.44, -12.45);
  g.add(edge);

  // station house
  const house = new THREE.Group();
  const walls = box(4.6, 2.0, 2.4, m.stationWall);
  walls.position.y = 1.0;
  house.add(walls);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(0, 0, 4), m.stationRoof);
  const roofGeo = new THREE.CylinderGeometry(0.01, 2.05, 1.15, 4);
  roofGeo.rotateY(Math.PI / 4);
  roofGeo.scale(1.45, 1, 0.85);
  const roofM = new THREE.Mesh(roofGeo, m.stationRoof);
  roofM.castShadow = true;
  roofM.position.y = 2.55;
  house.add(roofM);
  roof.visible = false;
  house.add(roof);
  // door facing the platform
  const door = box(0.7, 1.25, 0.06, m.door);
  door.position.set(-0.9, 0.63, 1.23);
  house.add(door);
  // windows (glow at night)
  const winGeo = new THREE.BoxGeometry(0.65, 0.7, 0.06);
  for (const wx of [0.4, 1.5]) {
    const w = new THREE.Mesh(winGeo, m.stationWindow);
    w.position.set(wx, 1.15, 1.23);
    house.add(w);
  }
  const back = new THREE.Mesh(winGeo, m.stationWindow);
  back.position.set(0.6, 1.15, -1.23);
  house.add(back);
  nightMats.push(m.stationWindow);
  house.position.set(-16.5, 0.42, -15.6);
  g.add(house);

  // small canopy on posts over the platform
  const canopy = box(5.2, 0.1, 1.7, m.stationRoof);
  canopy.position.set(-16.5, 1.95, -13.9);
  g.add(canopy);
  for (const px of [-18.8, -16.5, -14.2]) {
    const post = cyl(0.05, 0.05, 1.55, 6, m.lampPost);
    post.position.set(px, 1.15, -13.35);
    g.add(post);
  }

  // station lamp strips under the canopy
  const glow = box(4.6, 0.05, 0.1, m.lampBulb);
  glow.position.set(-16.5, 1.88, -13.7);
  g.add(glow);
  return g;
}

// ---------------------------------------------------------------- houses
function buildHouse(m, i, w, h, d, opts = {}) {
  const { wall, roof } = housePalette(i);
  const g = new THREE.Group();
  const walls = box(w, h, d, plasterMaterial(m, wall));
  walls.position.y = h / 2;
  g.add(walls);
  const roofGeo = new THREE.CylinderGeometry(0.01, Math.hypot(w, d) / 2 * 0.78, h * 0.62, 4);
  roofGeo.rotateY(Math.PI / 4);
  roofGeo.scale(1.15, 1, d / Math.hypot(w, d) * 1.28);
  const roofM = new THREE.Mesh(roofGeo, roofMaterial(m, roof));
  roofM.castShadow = true;
  roofM.position.y = h + h * 0.31;
  g.add(roofM);

  if (opts.chimney !== false) {
    const ch = box(0.32, 0.8, 0.32, m.chimney);
    ch.position.set(w * 0.28, h + h * 0.45, -d * 0.18);
    g.add(ch);
  }
  // door + windows on the front face
  const door = box(0.55, 1.05, 0.07, m.door);
  door.position.set(-w * 0.22, 0.55, d / 2 + 0.035);
  g.add(door);
  const winGeo = new THREE.BoxGeometry(0.55, 0.6, 0.07);
  const lit = opts.lit !== false && i % 3 !== 0;
  const winMat = lit ? m.windowLit : m.window;
  const wx0 = w * 0.22;
  const w1 = new THREE.Mesh(winGeo, winMat);
  w1.position.set(wx0, h * 0.62, d / 2 + 0.035);
  g.add(w1);
  if (w > 3.4) {
    const w2 = new THREE.Mesh(winGeo, winMat);
    w2.position.set(-w * 0.02 + w * 0.32, h * 0.62, d / 2 + 0.035);
    g.add(w2);
  }
  const side = new THREE.Mesh(winGeo, m.window);
  side.position.set(w / 2 + 0.035, h * 0.62, 0);
  side.rotation.y = Math.PI / 2;
  g.add(side);
  g.userData.lit = lit;
  return g;
}

function buildShop(m, i, w, h, d) {
  const { wall, roof } = housePalette(i + 2);
  const g = new THREE.Group();
  const walls = box(w, h, d, plasterMaterial(m, wall));
  walls.position.y = h / 2;
  g.add(walls);
  // flat parapet roof
  const cap = box(w + 0.25, 0.22, d + 0.25, roofMaterial(m, roof));
  cap.position.y = h + 0.1;
  g.add(cap);
  // awning strip
  const awning = box(w * 0.8, 0.1, 0.7, roofMaterial(m, housePalette(i).roof));
  awning.position.set(0, h * 0.55, d / 2 + 0.4);
  awning.rotation.x = -12 * DEG;
  g.add(awning);
  // shopfront window (lit at night)
  const win = new THREE.Mesh(new THREE.BoxGeometry(w * 0.6, h * 0.45, 0.07), m.windowLit);
  win.position.set(0, h * 0.45, d / 2 + 0.04);
  g.add(win);
  const door = box(0.6, 1.2, 0.07, m.door);
  door.position.set(w * 0.32, 0.6, d / 2 + 0.04);
  g.add(door);
  return g;
}

// ---------------------------------------------------------------- trees & props
function buildTree(m, scale = 1, pine = false) {
  const g = new THREE.Group();
  const trunk = cyl(0.09 * scale, 0.13 * scale, 0.9 * scale, 6, m.trunk);
  trunk.position.y = 0.45 * scale;
  g.add(trunk);
  if (pine) {
    for (let i = 0; i < 3; i++) {
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry((0.85 - i * 0.22) * scale, 0.9 * scale, 8),
        new THREE.MeshStandardMaterial({ color: i % 2 ? 0x3e6b2f : 0x497a36, roughness: 0.95 })
      );
      cone.castShadow = true;
      cone.position.y = (1.0 + i * 0.55) * scale;
      g.add(cone);
    }
  } else {
    const greens = [0x5d8a3c, 0x6d9b46, 0x527c34];
    for (let i = 0; i < 3; i++) {
      const r = (0.75 - i * 0.16) * scale;
      const blob = new THREE.Mesh(
        new THREE.IcosahedronGeometry(r, 0),
        new THREE.MeshStandardMaterial({ color: greens[i % 3], roughness: 0.95 })
      );
      blob.castShadow = true;
      blob.position.set((i - 1) * 0.18 * scale, (1.1 + i * 0.5) * scale, (i % 2) * 0.15 * scale);
      g.add(blob);
    }
  }
  return g;
}

function buildLamp(m) {
  const g = new THREE.Group();
  const post = cyl(0.045, 0.06, 2.3, 6, m.lampPost);
  post.position.y = 1.15;
  g.add(post);
  const arm = box(0.5, 0.05, 0.05, m.lampPost);
  arm.position.set(0.2, 2.28, 0);
  g.add(arm);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), m.lampBulb);
  bulb.position.set(0.42, 2.2, 0);
  g.add(bulb);
  return g;
}

function roadRibbon(points, width, m, y = 0.015) {
  // ribbon along a polyline on the ground
  const v = points.map((p) => new THREE.Vector3(p[0], 0, p[1]));
  const segsPer = 12;
  const segs = (v.length - 1) * segsPer;
  const geo = new THREE.BufferGeometry();
  const verts = [];
  const idx = [];
  const p = new THREE.Vector3();
  const t = new THREE.Vector3();
  const at = (f) => {
    const seg = Math.min(Math.floor(f * (v.length - 1)), v.length - 2);
    const local = f * (v.length - 1) - seg;
    p.lerpVectors(v[seg], v[seg + 1], local);
    t.subVectors(v[seg + 1], v[seg]).normalize();
  };
  for (let i = 0; i <= segs; i++) {
    at(i / segs);
    const nx = -t.z;
    const nz = t.x;
    const inv = (width / 2) / Math.hypot(nx, nz);
    verts.push(p.x + nx * inv, y + groundYAt(p.x, p.z), p.z + nz * inv);
    verts.push(p.x - nx * inv, y + groundYAt(p.x, p.z), p.z - nz * inv);
    if (i < segs) {
      const a = i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, m.road);
  mesh.receiveShadow = true;
  return mesh;
}

// ---------------------------------------------------------------- town assembly
export function buildTown(curve, m) {
  const root = new THREE.Group();
  const nightMats = [];
  const lampPositions = [];

  root.add(buildBase(m));
  root.add(buildTerrain(m));
  root.add(buildWater(m));
  const trackGroup = buildTrackMesh(curve, m);
  root.add(trackGroup);

  const L = curve.getLength();
  root.add(buildBridge(curve, m, 114.4, 121.4));
  root.add(buildStation(m, nightMats));
  nightMats.push(m.windowLit);

  // ---- roads: station square + main street + river road
  root.add(roadRibbon([[-21, -16.5], [-12, -16.5], [-4, -15], [2, -12], [4, -6], [4, 2]], 2.4, m));
  root.add(roadRibbon([[-16.5, -16.5], [-16.5, -19]], 2.0, m));
  root.add(roadRibbon([[2, -12], [8, -14], [14, -16], [20, -18], [26, -19]], 2.2, m));
  root.add(roadRibbon([[4, 2], [4, 8], [-1, 12], [-6, 10]], 2.0, m));
  root.add(roadRibbon([[4, 8], [10, 12], [15, 13]], 1.8, m));
  root.add(roadRibbon([[-6, 10], [-13, 9], [-20, 7], [-26, 4]], 1.9, m));

  // level crossing where the main street meets the track near the station
  const crossing = new THREE.Group();
  const planks = box(2.6, 0.06, 1.4, m.crossing);
  planks.rotation.y = -8 * DEG;
  crossing.add(planks);
  for (const sx of [-1.4, 1.4]) {
    const post = box(0.09, 1.1, 0.09, m.metalDark);
    post.position.set(sx, 0.55, 0);
    crossing.add(post);
    const stripe = box(0.12, 0.5, 0.06, m.crossingStripe);
    stripe.position.set(sx, 1.05, 0);
    stripe.rotation.z = sx > 0 ? -35 * DEG : 35 * DEG;
    crossing.add(stripe);
  }
  crossing.position.set(-6.2, 0.06, -10.4);
  crossing.rotation.y = 24 * DEG;
  root.add(crossing);

  // ---- houses: placed clear of track and river
  const houses = [
    // [x, z, w, h, d, rotDeg, opts]
    [-19, -19.2, 3.6, 2.4, 3.0, 8, {}],
    [-11.5, -19.4, 4.0, 2.2, 3.0, -4, {}],
    [-24.5, -18.6, 3.2, 2.0, 2.8, 16, {}],
    [7.2, -17.2, 3.8, 2.3, 3.0, 24, {}],
    [12.8, -18.9, 3.4, 2.1, 2.9, 30, {}],
    [18.5, -20.3, 3.0, 1.9, 2.6, 22, {}],
    [0.2, -2.4, 3.4, 2.2, 2.8, -18, {}],
    [-2.4, 2.8, 3.0, 2.0, 2.6, 40, {}],
    [1.8, 6.6, 3.2, 2.1, 2.7, 75, {}],
    [-4.6, 8.3, 3.5, 2.3, 3.0, 100, {}],
    [-11.5, 6.8, 3.3, 2.1, 2.8, 96, {}],
    [-17.8, 5.6, 3.6, 2.4, 3.0, 82, {}],
    [-24.5, 3.2, 3.2, 2.0, 2.7, 78, {}],
    [-8.2, 12.6, 3.7, 2.5, 3.1, 12, {}],
    [-14.9, 12.0, 3.3, 2.2, 2.8, -8, {}],
    [-21.6, 11.0, 3.4, 2.1, 2.9, -20, {}],
    [12.4, 15.0, 3.5, 2.2, 3.0, 35, {}],
    [17.6, 12.8, 3.2, 2.0, 2.7, 55, {}],
    [20.3, 6.8, 3.0, 1.9, 2.6, 75, {}],
    [8.8, 7.8, 3.3, 2.1, 2.8, 60, {}],
    [-28.5, -6.5, 2.8, 1.8, 2.4, -30, {}],
    [7.6, -8.6, 2.7, 1.7, 2.3, 55, {}],
  ];
  houses.forEach(([x, z, w, h, d, rot, opts], i) => {
    const house = buildHouse(m, i, w, h, d, opts);
    placeOnGround(house, x, z, rot * DEG);
    root.add(house);
  });

  // shops around the station square
  const shops = [
    [-8.3, -17.6, 4.2, 2.6, 3.2, 5],
    [-2.8, -13.2, 4.4, 2.8, 3.4, 20],
    [-22.8, -15.2, 3.8, 2.5, 3.0, -12],
  ];
  shops.forEach(([x, z, w, h, d, rot], i) => {
    const s = buildShop(m, i, w, h, d);
    placeOnGround(s, x, z, rot * DEG);
    root.add(s);
  });

  // ---- church with spire near the village center
  const church = new THREE.Group();
  const nave = box(3.2, 3.0, 4.6, plasterMaterial(m, 0xece2cc));
  nave.position.y = 1.5;
  church.add(nave);
  const chRoofGeo = new THREE.CylinderGeometry(0.01, 3.0, 1.6, 4);
  chRoofGeo.rotateY(Math.PI / 4);
  chRoofGeo.scale(0.85, 1, 1.15);
  const chRoof = new THREE.Mesh(chRoofGeo, roofMaterial(m, 0x4a5a6a));
  chRoof.castShadow = true;
  chRoof.position.y = 3.8;
  church.add(chRoof);
  const tower = box(1.3, 4.6, 1.3, plasterMaterial(m, 0xece2cc));
  tower.position.set(0, 2.3, 2.9);
  church.add(tower);
  const spire = new THREE.Mesh(new THREE.ConeGeometry(0.95, 2.2, 4), roofMaterial(m, 0x4a5a6a));
  spire.castShadow = true;
  spire.position.set(0, 5.7, 2.9);
  spire.rotation.y = Math.PI / 4;
  church.add(spire);
  const rose = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 12), m.windowLit);
  rose.rotation.x = Math.PI / 2;
  rose.position.set(0, 1.9, 4.58);
  church.add(rose);
  placeOnGround(church, -12.4, -1.4, 12 * DEG);
  root.add(church);

  // ---- farm in the south-east corner
  const barn = new THREE.Group();
  const barnW = box(4.6, 2.6, 3.4, new THREE.MeshStandardMaterial({ color: 0xa3492f, roughness: 0.9 }));
  barnW.position.y = 1.3;
  barn.add(barnW);
  const barnRoofGeo = new THREE.CylinderGeometry(0.01, 3.2, 1.5, 4);
  barnRoofGeo.rotateY(Math.PI / 4);
  barnRoofGeo.scale(1.1, 1, 0.9);
  const barnRoof = new THREE.Mesh(barnRoofGeo, roofMaterial(m, 0x6e3a28));
  barnRoof.castShadow = true;
  barnRoof.position.y = 3.3;
  barn.add(barnRoof);
  const barnDoor = box(1.3, 1.7, 0.08, m.door);
  barnDoor.position.set(0, 0.85, 1.74);
  barn.add(barnDoor);
  placeOnGround(barn, 26.5, -18.5, 24 * DEG);
  root.add(barn);

  const silo = cyl(0.85, 0.85, 4.2, 12, new THREE.MeshStandardMaterial({ color: 0xb9b3a4, roughness: 0.7 }));
  silo.position.set(30.6, 2.1, -17.2);
  const siloCap = new THREE.Mesh(new THREE.SphereGeometry(0.86, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), m.lighthouseRed);
  siloCap.position.set(30.6, 4.2, -17.2);
  root.add(silo, siloCap);

  for (const [fx, fz, fw, fd, mat] of [
    [26.8, -12.4, 7.5, 3.4, m.field],
    [19.5, -12.6, 4.4, 3.2, m.fieldGreen],
  ]) {
    const f = box(fw, 0.1, fd, mat);
    f.position.set(fx, 0.05, fz);
    root.add(f);
    for (let r = 0; r < 4; r++) {
      const row = box(fw - 0.5, 0.14, 0.3, m.earthCut);
      row.position.set(fx, 0.13, fz - fd / 2 + 0.6 + r * (fd - 1.2) / 3);
      root.add(row);
    }
  }
  const hay = cyl(0.55, 0.55, 0.9, 10, m.harvest);
  hay.rotation.z = Math.PI / 2;
  hay.position.set(23.4, 0.55, -14.9);
  root.add(hay);

  // ---- lighthouse at the river mouth
  const lh = new THREE.Group();
  const lhBody = cyl(0.55, 0.85, 4.6, 12, m.whitewash);
  lhBody.position.y = 2.3;
  lh.add(lhBody);
  for (const by of [1.2, 2.6]) {
    const band = cyl(0.62, 0.72, 0.5, 12, m.lighthouseRed);
    band.position.y = by;
    lh.add(band);
  }
  const lampRoom = cyl(0.5, 0.5, 0.7, 8, m.metalDark);
  lampRoom.position.y = 4.95;
  lh.add(lampRoom);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 8), m.beacon);
  beacon.position.y = 4.95;
  lh.add(beacon);
  const lhCap = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.8, 8), m.lighthouseRed);
  lhCap.position.y = 5.7;
  lh.add(lhCap);
  const rocks = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 0.7, 9), m.rock);
  rocks.position.y = -0.1;
  lh.add(rocks);
  placeOnGround(lh, 30.5, -4.4, 0);
  root.add(lh);

  // small wooden dock into the river
  const dock = box(1.4, 0.12, 2.6, m.dock);
  dock.position.set(25.6, -0.05, -7.3);
  dock.rotation.x = 4 * DEG;
  root.add(dock);
  const rowboat = new THREE.Group();
  const hull = box(1.8, 0.4, 0.8, m.bridgeWood);
  hull.scale.set(1, 1, 1);
  rowboat.add(hull);
  const bow = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.7, 4), m.bridgeWood);
  bow.rotation.z = -Math.PI / 2;
  bow.rotation.y = Math.PI / 4;
  bow.position.x = 1.2;
  bow.scale.z = 2;
  rowboat.add(bow);
  rowboat.position.set(27.8, RIVER.waterY + 0.1, -8.0);
  rowboat.rotation.y = 18 * DEG;
  root.add(rowboat);

  // ---- street lamps along roads and the platform
  const lampSpots = [
    [-20.5, -15.2, 90],
    [-12.8, -15.4, 90],
    [-5.2, -14.2, 60],
    [3.0, -11.0, 30],
    [4.9, -3.0, 0],
    [5.0, 5.6, -10],
    [10.8, 12.8, -35],
    [-4.8, 10.6, -65],
    [-12.8, 8.4, -80],
    [-21.0, 6.4, -95],
    [8.6, -14.6, 115],
    [15.4, -16.4, 115],
    [-14.2, -12.9, 0],
    [-18.9, -12.9, 0],
  ];
  for (const [x, z, rot] of lampSpots) {
    const lamp = buildLamp(m);
    placeOnGround(lamp, x, z, rot * DEG);
    lampPositions.push(new THREE.Vector3(x, 2.2, z));
    root.add(lamp);
  }

  // ---- trees scattered where they do not crowd the track
  const treeSpots = [
    [-30.5, -15.5, 1.2, true], [-26.8, -12.8, 1.0, false], [-31.5, 10.5, 1.1, true],
    [-28.0, 14.8, 0.9, false], [-18.5, 14.6, 1.1, true], [-9.8, 16.0, 0.95, false],
    [-1.5, 18.0, 1.15, true], [5.5, 19.2, 0.9, false], [13.5, 18.0, 1.05, true],
    [20.8, 15.8, 1.0, false], [25.6, 11.8, 1.1, true], [30.6, 8.0, 0.9, false],
    [-30.8, 0.8, 1.0, true], [-27.6, -3.6, 1.15, false], [-6.6, -6.4, 0.85, false],
    [8.6, -4.4, 0.9, false], [15.8, -5.4, 1.0, true], [-25.0, 8.0, 0.85, false],
    [2.0, 11.6, 0.8, true], [-19.0, -8.2, 0.9, false], [24.0, 2.4, 1.0, true],
    [31.0, -16.0, 0.9, false], [22.0, -3.4, 0.85, false], [-33.0, -13.0, 1.0, true],
  ];
  for (const [x, z, s, pine] of treeSpots) {
    const tree = buildTree(m, s, pine);
    placeOnGround(tree, x, z, ((x * 13 + z * 7) % 60) * DEG);
    root.add(tree);
  }

  // bushes near houses
  const bushGeo = new THREE.IcosahedronGeometry(0.4, 0);
  const bushSpots = [
    [-14.2, -18.6], [-10.0, -18.0], [-21.6, -17.4], [1.6, -4.8], [-5.4, 0.4],
    [5.6, 10.2], [-9.6, 10.6], [-16.4, 8.8], [-23.2, 10.8], [14.4, 16.8],
    [19.8, 10.0], [10.4, 5.2], [29.0, -19.6],
  ];
  for (const [x, z] of bushSpots) {
    const b = new THREE.Mesh(bushGeo, m.bush);
    b.castShadow = true;
    b.scale.setScalar(0.7 + ((x * z) % 5) * 0.08);
    b.position.set(x, groundYAt(x, z) + 0.3, z);
    root.add(b);
  }

  // picket fence bits near the station garden
  const fencePostGeo = new THREE.BoxGeometry(0.08, 0.55, 0.08);
  const fence = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const post = new THREE.Mesh(fencePostGeo, m.fence);
    post.position.set(i * 0.45, 0.27, 0);
    fence.add(post);
  }
  const rail = box(4.1, 0.07, 0.05, m.fence);
  rail.position.set(1.8, 0.4, 0);
  fence.add(rail);
  fence.position.set(-21.6, 0, -20.6);
  fence.rotation.y = 8 * DEG;
  root.add(fence);

  return { root, nightMats, lampPositions, platformCenter: new THREE.Vector3(-16.5, 0.4, -13.6) };
}
