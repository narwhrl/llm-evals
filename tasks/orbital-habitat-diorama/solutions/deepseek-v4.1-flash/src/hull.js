import * as THREE from "three";
import { ROOM, PORTHOLE, SMALL_PORTHOLES, FRAMES, wallClear, pathClear } from "./layout.js";
import { box, cyl, group, plane, Rivets, sweepProfile, sphere, std } from "./utils.js";
import { labelTexture, stripeTexture } from "./textures.js";

const WALL_Z = ROOM.wallZ;
const WALL_T = ROOM.wallT;
const WALL_H = ROOM.wallH;

function wallShape() {
  const shape = new THREE.Shape();
  shape.moveTo(ROOM.minX, 0);
  shape.lineTo(ROOM.maxX, 0);
  shape.lineTo(ROOM.maxX, WALL_H);
  shape.lineTo(ROOM.minX, WALL_H);
  shape.closePath();
  const holes = [{ x: PORTHOLE.x, y: PORTHOLE.y, r: PORTHOLE.r }, ...SMALL_PORTHOLES];
  for (const hole of holes) {
    const path = new THREE.Path();
    path.absarc(hole.x, hole.y, hole.r, 0, Math.PI * 2, true);
    shape.holes.push(path);
  }
  return shape;
}

// A ring frame: an annulus extruded along the window axis, with a bevelled lip.
function portholeFrame(outerR, innerR, depth, materials) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSize: 0.018,
    bevelThickness: 0.018,
    bevelSegments: 2,
    curveSegments: 48,
  });
  const mesh = new THREE.Mesh(geo, materials);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function portholeMask(x, y, r, stencilRef) {
  const mat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: false,
    depthTest: false,
    stencilWrite: true,
    stencilRef,
    stencilFunc: THREE.AlwaysStencilFunc,
    stencilZPass: THREE.ReplaceStencilOp,
  });
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(r, 64), mat);
  mesh.position.set(x, y, WALL_Z + 0.002);
  mesh.renderOrder = -30;
  return mesh;
}

function hatch(parent, materials, side) {
  // End bulkhead. Only the rear half of the cross-section is kept, so the near
  // end reads as a cut-away section instead of blocking the cabin. The shape is
  // authored directly in (world z, world y) and extruded along x, so both ends
  // share one profile.
  const g = group(parent, { name: side < 0 ? "hatch-left" : "hatch-right" });
  const innerFace = side < 0 ? ROOM.minX + 0.14 : ROOM.maxX - 0.14;
  const outward = side < 0 ? -1 : 1; // +1 means the cabin is on the -x side

  const shape = new THREE.Shape();
  // The end bulkhead is a shallow corner fillet: it closes the capsule's end
  // without standing in front of the furnishings in the cut-away view.
  shape.moveTo(-2.2, 0);
  shape.lineTo(-1.92, 0);
  shape.lineTo(-1.92, 2.0);
  shape.absarc(-1.5, 2.0, 0.42, Math.PI, Math.PI / 2, true);
  shape.lineTo(-1.5, ROOM.shoulderTop);
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(-2.02, 1.16, 0.26, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelSize: 0.012,
    bevelThickness: 0.012,
    bevelSegments: 2,
    curveSegments: 44,
  });
  // shape x -> world z, extrusion -> world -x
  geo.rotateY(-Math.PI / 2);
  geo.translate(side < 0 ? innerFace : innerFace + 0.14, 0, 0);
  const plate = new THREE.Mesh(geo, [materials.panel, materials.cut]);
  plate.castShadow = true;
  plate.receiveShadow = true;
  g.add(plate);

  const faceX = innerFace + (side < 0 ? 0.02 : -0.02);
  const towardCabin = side < 0 ? 1 : -1;
  const hatchZ = -2.0;
  const hatchY = 1.16;

  const ring = portholeFrame(0.38, 0.31, 0.1, [materials.rib, materials.metal]);
  ring.rotation.y = towardCabin > 0 ? Math.PI / 2 : -Math.PI / 2;
  ring.position.set(faceX, hatchY, hatchZ);
  g.add(ring);

  const door = cyl(0.31, 0.31, 0.05, 36, materials.panel, {
    x: faceX + towardCabin * 0.07,
    y: hatchY,
    z: hatchZ,
    rz: Math.PI / 2,
  });
  g.add(door);
  const boss = cyl(0.17, 0.19, 0.035, 28, materials.panelDark, { x: faceX + towardCabin * 0.1, y: hatchY, z: hatchZ, rz: Math.PI / 2 });
  g.add(boss);

  const windowRing = portholeFrame(0.11, 0.08, 0.035, [materials.metal, materials.metal]);
  windowRing.rotation.y = towardCabin > 0 ? Math.PI / 2 : -Math.PI / 2;
  windowRing.position.set(faceX + towardCabin * 0.12, hatchY + 0.04, hatchZ);
  g.add(windowRing);
  const glass = cyl(0.08, 0.08, 0.01, 20, materials.glass, { x: faceX + towardCabin * 0.13, y: hatchY + 0.04, z: hatchZ, rz: Math.PI / 2 });
  g.add(glass);

  const wheel = group(g, { x: faceX + towardCabin * 0.14, y: hatchY - 0.13, z: hatchZ });
  const torus = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.013, 8, 24), materials.metal);
  torus.rotation.y = Math.PI / 2;
  wheel.add(torus);
  for (let i = 0; i < 3; i += 1) {
    wheel.add(box(0.01, 0.19, 0.01, materials.metal, { rz: (i * Math.PI) / 3 }));
  }
  wheel.add(cyl(0.025, 0.025, 0.035, 10, materials.metal, { rz: Math.PI / 2 }));

  const stripe = plane(0.5, 0.07, new THREE.MeshStandardMaterial({ color: 0xffffff, map: stripeTexture(), roughness: 0.9 }), {
    x: faceX + towardCabin * 0.05,
    y: 0.7,
    z: hatchZ,
    ry: towardCabin * (Math.PI / 2),
  });
  g.add(stripe);

  const label = plane(0.22, 0.11, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture(side < 0 ? "HATCH 03" : "HATCH 04", { sub: "PRESSURE SEAL", font: 30 }), roughness: 0.85 }), {
    x: faceX + towardCabin * 0.05,
    y: 1.72,
    z: hatchZ,
    ry: towardCabin * (Math.PI / 2),
  });
  g.add(label);

  const bolts = new Rivets(0.011, 0.009);
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    bolts.add([faceX + towardCabin * 0.04, hatchY + Math.sin(a) * 0.34, hatchZ + Math.cos(a) * 0.34], [towardCabin, 0, 0]);
  }
  const boltMesh = bolts.build(materials.darkMetal);
  if (boltMesh) g.add(boltMesh);
  return g;
}

export function createHull(materials) {
  const root = group(null, { name: "hull" });

  // Rear wall with real porthole openings.
  const wallGeo = new THREE.ExtrudeGeometry(wallShape(), {
    depth: WALL_T,
    bevelEnabled: false,
    curveSegments: 64,
  });
  const wall = new THREE.Mesh(wallGeo, [materials.hull, materials.cut]);
  wall.position.z = WALL_Z - WALL_T;
  wall.castShadow = true;
  wall.receiveShadow = true;
  root.add(wall);

  // Curved shoulder above the wall.
  const shoulderProfile = [];
  const steps = 14;
  for (let i = 0; i <= steps; i += 1) {
    const a = (i / steps) * (Math.PI / 2);
    shoulderProfile.push({
      z: -1.5 - 0.5 * Math.cos(a),
      y: 2.0 + 0.5 * Math.sin(a),
      nz: -Math.cos(a),
      ny: Math.sin(a),
    });
  }
  const shoulder = sweepProfile(shoulderProfile, WALL_T, ROOM.minX, ROOM.maxX, materials.hull, {
    capMaterial: materials.cut,
  });
  root.add(shoulder);

  // A darker structural band at the shoulder seam.
  const bandProfile = [];
  for (let i = 0; i <= steps; i += 1) {
    const a = (i / steps) * (Math.PI / 2);
    bandProfile.push({
      z: -1.5 - 0.505 * Math.cos(a),
      y: 2.0 + 0.505 * Math.sin(a),
      nz: -Math.cos(a),
      ny: Math.sin(a),
    });
  }
  const band = sweepProfile(bandProfile, 0.02, ROOM.minX + 0.02, ROOM.maxX - 0.02, materials.rib);
  root.add(band);

  // Shoulder ribs: short flush bands that wrap the curve, aligned with the
  // vertical frames. They read as reinforcement without standing off the shell.
  for (const x of [-3.85, -2.95, -0.6, 0.25, 3.15, 3.75]) {
    const ribProfile = shoulderProfile.map((p) => ({ ...p }));
    const rib = sweepProfile(ribProfile, WALL_T + 0.03, x - 0.05, x + 0.05, materials.rib);
    root.add(rib);
  }

  // Ring frames: vertical ribs plus curved shoulder ribs. A rib that would
  // cross a window in the first view is dropped; the reinforcement is carried
  // by the remaining ribs and the shoulder band.
  const ribX = [-3.85, -3.35, -2.95, -1.85, -0.6, 0.25, 2.45, 3.15, 3.75];
  for (const x of ribX) {
    if (!wallClear(x, WALL_H / 2, 0.065, WALL_H / 2)) continue;
    const rib = box(0.13, WALL_H, 0.075, materials.rib, { x, y: WALL_H / 2, z: WALL_Z + 0.038 });
    root.add(rib);
    const cap = box(0.13, 0.05, 0.11, materials.rib, { x, y: WALL_H, z: WALL_Z + 0.02 });
    root.add(cap);
    // Rivet columns on each side of the rib.
    for (const dx of [-0.085, 0.085]) {
      for (let i = 0; i < 7; i += 1) {
        const y = 0.18 + i * 0.28;
        if (y > WALL_H - 0.08) continue;
        if (!wallClear(x + dx, y, 0.014, 0.014)) continue;
        const bolt = cyl(0.013, 0.013, 0.012, 6, materials.darkMetal, { x: x + dx, y, z: WALL_Z + 0.008, rx: Math.PI / 2 });
        root.add(bolt);
      }
    }
  }

  // Horizontal trim segments that stop at the portholes.
  const trimRows = [0.34, 1.02, 1.62];
  for (const y of trimRows) {
    // Walk the row and keep only spans whose whole length clears every window
    // in the first view.
    const step = 0.1;
    let runStart = null;
    const flush = (end) => {
      if (runStart !== null && end - runStart > 0.12) {
        root.add(box(end - runStart, 0.022, 0.012, materials.rib, { x: (runStart + end) / 2, y, z: WALL_Z + 0.008 }));
      }
      runStart = null;
    };
    for (let x = ROOM.minX + 0.06; x <= ROOM.maxX - 0.06; x += step) {
      const ok = wallClear(x, y, 0.02, 0.02);
      if (ok && runStart === null) runStart = x;
      if (!ok && runStart !== null) flush(x);
    }
    flush(ROOM.maxX - 0.06);
  }

  // Porthole frames and masks. The frame is shallow so its near-side rim does
  // not project across the glass at the 45° view.
  const bigFrame = portholeFrame(PORTHOLE.r + 0.12, PORTHOLE.r, 0.09, [materials.rib, materials.metal]);
  bigFrame.position.set(PORTHOLE.x, PORTHOLE.y, WALL_Z + 0.01);
  root.add(bigFrame);
  const bigLip = portholeFrame(PORTHOLE.r + 0.035, PORTHOLE.r + 0.004, 0.055, [materials.portholeRim, materials.portholeRim]);
  bigLip.position.set(PORTHOLE.x, PORTHOLE.y, WALL_Z + 0.055);
  root.add(bigLip);
  root.add(portholeMask(PORTHOLE.x, PORTHOLE.y, PORTHOLE.r, 1));
  const bigBolts = new Rivets(0.012, 0.008);
  for (let i = 0; i < 20; i += 1) {
    const a = (i / 20) * Math.PI * 2;
    bigBolts.add(
      [PORTHOLE.x + Math.cos(a) * (PORTHOLE.r + 0.062), PORTHOLE.y + Math.sin(a) * (PORTHOLE.r + 0.062), WALL_Z + 0.1],
      [0, 0, 1],
    );
  }
  const bigBoltMesh = bigBolts.build(materials.darkMetal);
  if (bigBoltMesh) root.add(bigBoltMesh);

  for (const [index, p] of SMALL_PORTHOLES.entries()) {
    const frame = portholeFrame(p.r + 0.075, p.r, 0.12, [materials.rib, materials.metal]);
    frame.position.set(p.x, p.y, WALL_Z + 0.01);
    root.add(frame);
    root.add(portholeMask(p.x, p.y, p.r, index + 2));
    const bolts = new Rivets(0.01, 0.008);
    for (let i = 0; i < 12; i += 1) {
      const a = (i / 12) * Math.PI * 2;
      bolts.add([p.x + Math.cos(a) * (p.r + 0.04), p.y + Math.sin(a) * (p.r + 0.04), WALL_Z + 0.13], [0, 0, 1]);
    }
    const m = bolts.build(materials.darkMetal);
    if (m) root.add(m);
  }

  // Floor: two grating panels around a recessed warm light strip.
  const floorTop = materials.grate;
  const sideMat = materials.cut;
  const makeFloorSlab = (z0, z1, matTop) => {
    const w = ROOM.maxX - ROOM.minX;
    const d = z1 - z0;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(w, ROOM.floorT, d), [
      sideMat,
      sideMat,
      matTop,
      materials.black,
      sideMat,
      sideMat,
    ]);
    slab.position.set(0, -ROOM.floorT / 2, (z0 + z1) / 2);
    slab.castShadow = true;
    slab.receiveShadow = true;
    root.add(slab);
    return slab;
  };
  makeFloorSlab(ROOM.minZ, -0.14, floorTop);
  makeFloorSlab(0.14, ROOM.maxZ, floorTop);

  const channelMat = std(0x3a3d3e, { roughness: 0.5, metalness: 0.5 });
  root.add(box(7.4, 0.06, 0.28, channelMat, { x: 0, y: -0.1, z: 0 }));
  const strip = box(7.1, 0.035, 0.16, materials.stripLight, { x: 0, y: -0.06, z: 0 });
  strip.name = "floorStrip";
  root.add(strip);
  // Metal lips on both sides of the channel.
  root.add(box(7.4, 0.03, 0.045, materials.metal, { x: 0, y: 0.004, z: -0.162 }));
  root.add(box(7.4, 0.03, 0.045, materials.metal, { x: 0, y: 0.004, z: 0.162 }));

  // Floor edge trim and tie-down rings.
  root.add(box(8.0, 0.06, 0.07, materials.metal, { x: 0, y: 0.01, z: ROOM.maxZ - 0.02 }));
  for (const x of [-3.4, -2.2, -0.9, 0.5, 1.7, 3.1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.012, 6, 18), materials.metal);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, 0.012, ROOM.maxZ - 0.09);
    root.add(ring);
  }

  // Floor scuffs and panel seams.
  const seamMat = std(0x4c4f50, { roughness: 0.8, metalness: 0.3 });
  for (const x of [-2.0, 0.9, 2.9]) {
    root.add(box(0.035, 0.008, 1.8, seamMat, { x, y: 0.004, z: -1.06 }));
    root.add(box(0.035, 0.008, 1.8, seamMat, { x, y: 0.004, z: 1.06 }));
  }

  // End hatches.
  hatch(root, materials, -1);
  hatch(root, materials, 1);

  return root;
}

export function addWallDecals(root, materials) {
  // A dense layer of labels, tags and small fittings that makes the wall read
  // as lived-in at overview distance. Every item is screened against the
  // porthole ellipses of the first view so nothing crosses the glass.
  const z = WALL_Z + 0.012;
  const add = (w, h, mat, x, y, ry = 0) => {
    if (!wallClear(x, y, w / 2, h / 2, z)) return null;
    const p = plane(w, h, mat, { x, y, z, ry });
    root.add(p);
    return p;
  };
  add(0.24, 0.12, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("O2", { sub: "SUPPLY", font: 46 }), roughness: 0.9 }), -3.82, 1.3);
  add(0.3, 0.15, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("04", { sub: "SLEEP BAY", font: 58 }), roughness: 0.9 }), -3.45, 0.52);
  add(0.3, 0.15, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("A-17", { sub: "O2 SCRUBBER", font: 40 }), roughness: 0.9 }), -0.35, 1.78);
  add(0.26, 0.13, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("CAUTION", { sub: "HOT SURFACE", bg: "#e8c93c", font: 34 }), roughness: 0.9 }), -0.85, 1.2);
  add(0.2, 0.1, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("P-02", { font: 42 }), roughness: 0.9 }), 0.1, 0.5);
  add(0.22, 0.11, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("N2", { sub: "VENT", font: 44 }), roughness: 0.9 }), -1.2, 0.6);
  add(0.24, 0.12, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("WATER", { sub: "RECLAIM", font: 30 }), roughness: 0.9 }), -0.1, 0.72);
  add(0.18, 0.18, new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture("H-04", { font: 38 }), roughness: 0.9 }), 3.86, 1.86);

  // Vent grilles.
  const ventMat = std(0x4a4e50, { roughness: 0.7, metalness: 0.3 });
  for (const [x, y, w, h] of [
    [-3.1, 0.86, 0.34, 0.24],
    [-0.95, 1.6, 0.3, 0.2],
    [0.7, 1.06, 0.26, 0.18],
    [2.35, 1.78, 0.28, 0.2],
    [3.85, 1.1, 0.26, 0.2],
  ]) {
    if (!wallClear(x, y, w / 2, h / 2, z)) continue;
    const frame = box(w + 0.03, h + 0.03, 0.02, materials.metal, { x, y, z: z + 0.01 });
    root.add(frame);
    const inner = box(w, h, 0.016, ventMat, { x, y, z: z + 0.02 });
    root.add(inner);
    for (let i = 0; i < 5; i += 1) {
      root.add(box(w - 0.03, 0.014, 0.01, materials.darkMetal, { x, y: y - h / 2 + 0.03 + i * (h / 5.6), z: z + 0.03 }));
    }
  }

  // Cable bundles with zip ties along the wall.
  const cableMats = [std(0x2c2f33, { roughness: 0.7 }), std(0x6b4a34, { roughness: 0.8 }), std(0x3d4a56, { roughness: 0.75 })];
  const cablePaths = [
    [[-3.9, 1.94, -1.9], [-2.6, 1.94, -1.9], [-1.4, 1.94, -1.9], [-0.2, 1.9, -1.9], [0.55, 1.88, -1.9]],
    [[3.9, 0.36, -1.88], [2.9, 0.36, -1.88], [1.7, 0.4, -1.88], [0.3, 0.42, -1.88], [-1.2, 0.4, -1.88]],
    [[-3.6, 1.55, -1.9], [-2.9, 1.5, -1.9], [-2.2, 1.55, -1.9]],
  ];
  cablePaths.forEach((path, index) => {
    const curve = new THREE.CatmullRomCurve3(path.map((p) => new THREE.Vector3(...p)));
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.022 + index * 0.004, 6, false), cableMats[index]);
    tube.castShadow = true;
    root.add(tube);
    // zip ties
    for (let i = 1; i < path.length; i += 1) {
      const p = path[i];
      const tie = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.007, 5, 12), materials.darkMetal);
      tie.rotation.y = Math.PI / 2;
      tie.position.set(p[0], p[1], p[2] + 0.005);
      root.add(tie);
    }
  });

  // Pipe runs with clamps, kept clear of the window wall's upper right.
  const pipeMat = std(0x9aa1a6, { roughness: 0.42, metalness: 0.5 });
  for (const [y, r, x0, x1] of [
    [2.34, 0.024, -3.9, 0.55],
    [2.24, 0.016, -3.9, 0.55],
    [1.94, 0.018, 2.9, 3.9],
  ]) {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(r, r, x1 - x0, 12), pipeMat);
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set((x0 + x1) / 2, y, -1.78);
    pipe.castShadow = true;
    root.add(pipe);
    const steps = Math.max(2, Math.round((x1 - x0) / 1.3));
    for (let i = 0; i <= steps; i += 1) {
      const clamp = new THREE.Mesh(new THREE.TorusGeometry(r + 0.01, 0.007, 5, 12), materials.darkMetal);
      clamp.rotation.y = Math.PI / 2;
      clamp.position.set(x0 + ((x1 - x0) * i) / steps, y, -1.78);
      root.add(clamp);
    }
  }

  // Wear smudges.
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: materials.wearMap ?? null,
    transparent: true,
    opacity: 0.32,
    roughness: 1,
    depthWrite: false,
  });
  for (const [x, y, w, h] of [
    [-3.2, 0.45, 1.2, 0.6],
    [0.1, 1.2, 1.0, 0.7],
    [2.7, 0.5, 1.4, 0.5],
  ]) {
    if (!wallClear(x, y, w / 2, h / 2, z)) continue;
    const smudge = plane(w, h, wearMat, { x, y, z: z + 0.004 });
    smudge.renderOrder = 1;
    root.add(smudge);
  }
}
