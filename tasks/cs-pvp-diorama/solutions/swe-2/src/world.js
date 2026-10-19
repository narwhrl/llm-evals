import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Materials — toon-shaded wet industrial palette                     */
/* ------------------------------------------------------------------ */
const gradientMap = (() => {
  const c = document.createElement('canvas');
  c.width = 4; c.height = 1;
  const g = c.getContext('2d');
  g.fillStyle = '#3a3a3a'; g.fillRect(0, 0, 1, 1);
  g.fillStyle = '#909090'; g.fillRect(1, 0, 1, 1);
  g.fillStyle = '#d8d8d8'; g.fillRect(2, 0, 1, 1);
  g.fillStyle = '#ffffff'; g.fillRect(3, 0, 1, 1);
  const t = new THREE.CanvasTexture(c);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.colorSpace = THREE.NoColorSpace;
  return t;
})();

const M = {
  concrete: (c = 0x8a8d92) => new THREE.MeshToonMaterial({ color: c, gradientMap }),
  darkConcrete: () => new THREE.MeshToonMaterial({ color: 0x5a5d63, gradientMap }),
  asphalt: () => new THREE.MeshToonMaterial({ color: 0x3c4148, gradientMap }),
  wetAsphalt: () => new THREE.MeshStandardMaterial({ color: 0x2c3037, roughness: 0.35, metalness: 0.05 }),
  metal: (c = 0x6f7479) => new THREE.MeshToonMaterial({ color: c, gradientMap }),
  rust: () => new THREE.MeshToonMaterial({ color: 0x7a5233, gradientMap }),
  rustDark: () => new THREE.MeshToonMaterial({ color: 0x54382a, gradientMap }),
  wood: () => new THREE.MeshToonMaterial({ color: 0x8a6b47, gradientMap }),
  woodDark: () => new THREE.MeshToonMaterial({ color: 0x6b5036, gradientMap }),
  container: (c) => new THREE.MeshToonMaterial({ color: c, gradientMap }),
  wall: (c = 0x9aa0a6) => new THREE.MeshToonMaterial({ color: c, gradientMap }),
  tinWall: (c = 0x8892a0) => new THREE.MeshToonMaterial({ color: c, gradientMap }),
  tinRoof: (c = 0x5d6670) => new THREE.MeshToonMaterial({ color: c, gradientMap }),
  glass: () => new THREE.MeshStandardMaterial({ color: 0x9fc4d8, roughness: 0.15, metalness: 0.3, transparent: true, opacity: 0.4 }),
  tire: () => new THREE.MeshToonMaterial({ color: 0x22262a, gradientMap }),
  plastic: (c = 0xd8b400) => new THREE.MeshToonMaterial({ color: c, gradientMap }),
  barrel: (c = 0x2e5f9e) => new THREE.MeshToonMaterial({ color: c, gradientMap }),
  sandbag: () => new THREE.MeshToonMaterial({ color: 0x8a7f5f, gradientMap }),
  leafGlow: (c) => new THREE.MeshBasicMaterial({ color: c }),
  lampWarm: () => new THREE.MeshBasicMaterial({ color: 0xffd28a }),
  lampCool: () => new THREE.MeshBasicMaterial({ color: 0xcfe8ff }),
  red: () => new THREE.MeshBasicMaterial({ color: 0xff3b30 }),
  blueLight: () => new THREE.MeshBasicMaterial({ color: 0x3b82ff }),
  graffiti: (c) => new THREE.MeshBasicMaterial({ color: c }),
};

/* outline helper — BackSide shell */
function outline(mesh, scale = 1.04, color = 0x0b0d10) {
  const o = new THREE.Mesh(mesh.geometry, new THREE.MeshBasicMaterial({ color, side: THREE.BackSide }));
  o.scale.copy(mesh.scale).multiplyScalar(scale);
  o.position.copy(mesh.position);
  o.rotation.copy(mesh.rotation);
  mesh.parent?.add(o);
  return o;
}
function add(parent, mesh, { out = 0, cast = true, recv = true } = {}) {
  parent.add(mesh);
  mesh.castShadow = cast;
  mesh.receiveShadow = recv;
  if (out) outline(mesh, out);
  return mesh;
}
function box(w, h, d, mat, x = 0, y = 0, z = 0, ry = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  if (ry) m.rotation.y = ry;
  return m;
}
function cyl(rt, rb, h, mat, x = 0, y = 0, z = 0, seg = 10) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  return m;
}

/* flat decal plane */
function decal(w, h, color, opacity = 1) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity }));
  return m;
}

export function buildWorld(scene) {
  const anim = { t: 0 };
  const dyn = [];          // per-frame callbacks
  const S = 40;            // base side length
  const HALF = S / 2;

  /* ============================== BASE ============================= */
  const baseG = new THREE.Group();
  scene.add(baseG);
  // concrete slab
  const slab = box(S, 1.2, S, M.darkConcrete(), 0, -0.6, 0);
  add(baseG, slab, { out: 1.01, cast: false });
  // wet asphalt top (slightly inset, holds puddles)
  const top = box(S - 0.6, 0.14, S - 0.6, M.wetAsphalt(), 0, 0.07, 0);
  top.receiveShadow = true;
  baseG.add(top);
  // base edge bevel band
  add(baseG, box(S, 0.18, S, M.concrete(0x6e7278), 0, -0.05, 0), { cast: false });

  /* puddles — reflective dark discs that ripple */
  const puddleMat = new THREE.MeshStandardMaterial({ color: 0x1a2230, roughness: 0.05, metalness: 0.6, transparent: true, opacity: 0.85 });
  const ripples = [];
  const puddleGeo = new THREE.CircleGeometry(1, 24);
  const puddleSpots = [
    [-6, -6, 2.2], [5, -2, 1.6], [-2, 5, 2.6], [9, 7, 1.8], [-11, 2, 1.4],
    [2, -11, 1.9], [12, -8, 1.5], [-14, -12, 1.7], [8, 13, 2.0], [-8, 14, 1.5],
  ];
  puddleSpots.forEach(([x, z, r]) => {
    const p = new THREE.Mesh(puddleGeo, puddleMat);
    p.rotation.x = -Math.PI / 2;
    p.position.set(x, 0.145, z);
    p.scale.setScalar(r);
    baseG.add(p);
    // ripple rings
    for (let i = 0; i < 2; i++) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.8, 0.92, 20),
        new THREE.MeshBasicMaterial({ color: 0x9fc4e8, transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x, 0.16, z);
      baseG.add(ring);
      ripples.push({ ring, r, phase: Math.random() * 6 });
    }
  });

  /* ============================ LIGHTING =========================== */
  scene.add(new THREE.AmbientLight(0x3d4e70, 1.5));
  const hemi = new THREE.HemisphereLight(0x4a5d85, 0x14181f, 1.1);
  scene.add(hemi);
  const moon = new THREE.DirectionalLight(0x9fbbe8, 1.5);
  moon.position.set(30, 42, 18);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -30; moon.shadow.camera.right = 30;
  moon.shadow.camera.top = 30; moon.shadow.camera.bottom = -30;
  moon.shadow.camera.far = 120;
  moon.shadow.bias = -0.0006;
  scene.add(moon);
  // broad cool fill so the toon steps never collapse to pure black
  const fill = new THREE.DirectionalLight(0x35507e, 0.6);
  fill.position.set(-24, 20, -30);
  scene.add(fill);

  /* ======================== REGION: T SPAWN (N) ==================== */
  const T = new THREE.Group();
  scene.add(T);
  const TZ = -16; // T spawn z band

  // barbed-wire + container wall behind spawn
  add(T, box(16, 3.2, 0.5, M.wall(0x8a8378), 0, 1.6, -19.2), { out: 1.03 });
  for (let i = 0; i < 9; i++) {
    add(T, cyl(0.06, 0.06, 16, M.metal(0x666), -8 + i * 2, 3.7, -19.2), { cast: false });
  }
  add(T, box(16, 0.5, 0.4, M.rustDark(), 0, 3.5, -19.2), { cast: false });

  // battered box truck (left) — cab + cargo, used as cover
  const truck = new THREE.Group();
  truck.position.set(-11, 0, -15.5);
  truck.rotation.y = 0.12;
  add(truck, box(2.2, 2.0, 2.2, M.container(0x5f7a4a), 3.4, 1.35, 0), { out: 1.05 }); // cab
  add(truck, box(5.4, 2.6, 2.4, M.tinWall(0x7d8894), 0, 1.6, 0), { out: 1.04 });    // cargo
  add(truck, box(5.4, 0.2, 2.4, M.rust(), 0, 0.35, 0), { cast: false });
  [[-1.8, 1.15], [1.8, 1.15], [-1.8, -1.15], [1.8, -1.15]].forEach(([wx, wz]) => {
    const w = cyl(0.55, 0.55, 0.4, M.tire(), wx, 0.55, wz, 12);
    w.rotation.x = Math.PI / 2;
    add(truck, w);
  });
  // truck window
  const tw = decal(1.4, 0.9, 0x1c2836); tw.position.set(4.51, 1.8, 0); tw.rotation.y = Math.PI / 2; truck.add(tw);
  T.add(truck);
  // leaning wooden ladder by truck
  const lad = new THREE.Group();
  lad.position.set(-6.2, 0, -16.5); lad.rotation.z = 0.32; lad.rotation.y = 0.2;
  for (let i = 0; i < 6; i++) add(lad, box(0.06, 0.06, 1.1, M.wood(), 0.3, i * 0.55, 0));
  for (let i = 0; i < 6; i++) add(lad, box(0.06, 0.06, 1.1, M.wood(), -0.3, i * 0.55, 0));
  for (let i = 0; i < 6; i++) add(lad, box(0.62, 0.05, 0.05, M.woodDark(), 0, i * 0.55, 0));
  T.add(lad);

  // stacked shipping containers (right) — two levels of sniper nests
  function container(x, y, z, ry, color) {
    const c = new THREE.Group();
    c.position.set(x, y, z); c.rotation.y = ry;
    add(c, box(4.4, 2.3, 2.0, M.container(color), 0, 1.15, 0), { out: 1.04 });
    for (let i = 0; i < 5; i++) add(c, box(0.1, 2.1, 1.9, M.rustDark(), -2 + i * 1, 1.15, 0), { cast: false });
    // door ends
    add(c, box(0.12, 2.2, 2.0, M.metal(0x4d5359), 2.22, 1.15, 0), { cast: false });
    return c;
  }
  T.add(container(11, 0, -17, 0.05, 0x7a4a3a));
  T.add(container(15, 0, -17, -0.04, 0x3a5f7a));
  T.add(container(13, 2.3, -17, 0.02, 0x4a6a4a));
  // a cold work light by the truck + a small lamp over the ramp
  const tWork = new THREE.PointLight(0xcfe0ff, 22, 14, 1.8);
  tWork.position.set(-9, 3.4, -14); T.add(tWork);
  const tWorkM = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M.lampCool());
  tWorkM.position.set(-9, 3.4, -14); T.add(tWorkM);
  const tRamp = new THREE.PointLight(0xffc46a, 16, 12, 1.8);
  tRamp.position.set(1, 3.0, -10); T.add(tRamp);
  // gap you can slip between the two lower containers

  // ramp sloping down toward mid / A
  const ramp = box(10, 0.9, 6, M.concrete(0x7d8188), 1, 0.45, -11.5);
  ramp.rotation.x = -0.13;
  add(T, ramp, { out: 1.02 });
  // oil-drum cluster + pallets beside the ramp
  function drum(x, z, c = 0x2e5f9e) {
    const d = cyl(0.5, 0.5, 1.4, M.barrel(c), x, 0.7, z, 14);
    add(scene, d, { out: 1.06 });
    add(scene, cyl(0.52, 0.52, 0.12, M.rustDark(), x, 1.28, z, 14), { cast: false });
    add(scene, cyl(0.52, 0.52, 0.12, M.rustDark(), x, 0.2, z, 14), { cast: false });
  }
  function pallet(x, z, ry = 0) {
    const p = new THREE.Group(); p.position.set(x, 0, z); p.rotation.y = ry;
    for (let i = 0; i < 5; i++) add(p, box(1.4, 0.1, 0.24, M.woodDark(), 0, 0.22, -0.6 + i * 0.3), { cast: false });
    for (let i = 0; i < 3; i++) add(p, box(0.2, 0.12, 1.4, M.wood(), -0.6 + i * 0.6, 0.1, 0), { cast: false });
    scene.add(p);
  }
  drum(-1.5, -9.5); drum(-0.5, -10.2); drum(-1.2, -11); drum(6.5, -9.8, 0x9e5b2e);
  pallet(3, -9, 0.4); pallet(4.2, -10.2, -0.2);
  // broken wall hole beside the ramp — a crouch spot overlooking mid
  add(T, box(2.2, 2.6, 0.5, M.wall(0x868b91), -7, 1.3, -10.5), { out: 1.04 });

  /* ======================== REGION: A SITE (NW) ==================== */
  const A = new THREE.Group();
  A.position.set(-11, 0, -8);
  scene.add(A);

  // big derelict warehouse, half-open
  const wH = 5.2;
  // back + side walls
  add(A, box(11, wH, 0.5, M.wall(0x8b9096), 0, wH / 2, -4.5), { out: 1.03 });
  add(A, box(0.5, wH, 9, M.wall(0x8b9096), -5.25, wH / 2, 0), { out: 1.03 });
  add(A, box(0.5, wH, 9, M.wall(0x8b9096), 5.25, wH / 2, 0), { out: 1.03 });
  // front wall with the half-rolled shutter
  add(A, box(11, wH, 0.4, M.wall(0x84898f), 0, wH / 2, 4.5), { out: 1.03 });
  // roof
  add(A, box(11.6, 0.5, 9.8, M.tinRoof(0x5a636e), 0, wH + 0.25, 0), { out: 1.02 });
  // half-open roller shutter — slats + a gap you can see through
  const shutter = new THREE.Group();
  shutter.position.set(0, 0, 4.72);
  for (let i = 0; i < 9; i++) add(shutter, box(4.4, 0.34, 0.16, i % 2 ? M.rust() : M.rustDark(), 0, 4.4 - i * 0.36, 0), { cast: false });
  A.add(shutter);
  // side door + board-up windows
  add(A, box(0.16, 2.4, 1.3, M.metal(0x556), -5.28, 1.2, 1.6));
  [[-2.2, 2.4], [2.2, 2.4]].forEach(([bx, by]) => {
    add(A, box(1.7, 1.6, 0.12, M.woodDark(), bx, by, 4.52));
    add(A, box(1.7, 0.2, 0.14, M.wood(), bx, by + 0.5, 4.56), { cast: false });
    add(A, box(1.7, 0.2, 0.14, M.wood(), bx, by - 0.3, 4.56), { cast: false });
  });
  // bomb-site marking on the floor — white painted rectangle + "A"
  const mark = decal(4.6, 3.4, 0xdfe4ea); mark.rotation.x = -Math.PI / 2; mark.position.set(0.4, 0.16, 0.6); mark.material.opacity = 0.9; mark.material.transparent = true; A.add(mark);
  const markHole = decal(4.0, 2.8, 0x2c3037); markHole.rotation.x = -Math.PI / 2; markHole.position.set(0.4, 0.165, 0.6); A.add(markHole);
  // interior props — forklift, heavy shelving, crate & sack clusters, pillar
  add(A, box(1.4, 3.9, 1.4, M.concrete(0x75797e), 0, 1.95, -1.2), { out: 1.04 }); //承重柱
  // shelving rows
  for (let s = 0; s < 2; s++) {
    const sh = new THREE.Group(); sh.position.set(-3 + s * 3.4, 0, -2.2);
    for (let lvl = 0; lvl < 5; lvl++) add(sh, box(2.6, 0.12, 1.0, M.metal(0x6a7078), 0, 0.5 + lvl * 0.75, 0), { cast: lvl < 2 });
    for (const cx of [-1.2, 1.2]) add(sh, box(0.1, 4.0, 1.0, M.metal(0x555a62), cx, 2, 0), { cast: false });
    // boxes on shelves
    for (let lvl = 0; lvl < 4; lvl++) add(sh, box(0.8, 0.5, 0.7, M.wood(), -0.7 + (lvl % 3) * 0.6, 0.85 + lvl * 0.75, 0), { cast: false });
    A.add(sh);
  }
  // forklift
  const fk = new THREE.Group(); fk.position.set(3.4, 0, 1.8); fk.rotation.y = -0.5;
  add(fk, box(1.6, 1.0, 1.0, M.plastic(0xd8a400), 0, 0.7, 0), { out: 1.05 });
  add(fk, box(0.9, 1.6, 0.12, M.metal(0x3a3d42), 0.75, 1.0, 0), { cast: false });
  add(fk, box(0.9, 0.1, 0.5, M.metal(0x3a3d42), 1.0, 0.45, 0), { cast: false });
  A.add(fk);
  // sacks
  for (let i = 0; i < 6; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 6), M.sandbag());
    s.scale.set(1, 0.62, 1);
    s.position.set(-3.8 + (i % 3) * 0.8, 0.26 + Math.floor(i / 3) * 0.5, 2.2);
    s.castShadow = s.receiveShadow = true;
    A.add(s);
  }
  // mezzanine loft up in the corner — tin platform + ladder + little window
  add(A, box(3.2, 0.16, 2.4, M.tinRoof(), 3.6, 3.0, -3.2), { out: 1.03 });
  add(A, box(3.2, 1.0, 0.1, M.tinWall(0x77808c), 3.6, 3.55, -4.35), { cast: false });
  const alad = new THREE.Group(); alad.position.set(2.0, 0, -3.2);
  for (let i = 0; i < 7; i++) add(alad, box(0.7, 0.06, 0.06, M.metal(0x666), 0, 0.3 + i * 0.42, 0), { cast: false });
  add(alad, box(0.06, 3.1, 0.06, M.metal(0x666), -0.32, 1.5, 0), { cast: false });
  add(alad, box(0.06, 3.1, 0.06, M.metal(0x666), 0.32, 1.5, 0), { cast: false });
  A.add(alad);
  add(A, box(0.9, 0.9, 0.1, M.glass(), 4.4, 3.9, -4.44), { cast: false });
  // outside dressing — AC unit, freight sign, wheelie bin, alley to the left
  add(A, box(1.2, 1.0, 0.5, M.metal(0x9aa0a6), -5.6, 1.5, -1), { cast: false });
  const sign = decal(2.2, 1.1, 0x2e5f9e); sign.position.set(0, 3.4, 4.74); A.add(sign);
  const signT = decal(1.9, 0.7, 0xdfe4ea); signT.position.set(0, 3.4, 4.78); A.add(signT);
  add(A, cyl(0.5, 0.42, 1.1, M.plastic(0x3a5f3a), 4.9, 0.55, 5.2, 10), { out: 1.05 });
  add(A, box(1.0, 0.14, 0.6, M.plastic(0x3a5f3a), 4.9, 1.12, 5.2), { cast: false });
  // sorting table + parcels + strapping + old newspapers
  add(A, box(2.4, 0.9, 1.0, M.woodDark(), -4, 0.45, 3), {});
  add(A, box(0.7, 0.5, 0.5, M.wood(), -4.4, 1.1, 3), { cast: false });
  add(A, box(0.5, 0.4, 0.4, M.woodDark(), -3.4, 1.0, 3.1), { cast: false });
  // cold-white emergency ceiling light + a red rear-door glow through the crack
  const aLight = new THREE.PointLight(0xcfe0ff, 55, 18, 1.8);
  aLight.position.set(0, 4.4, 0.5); A.add(aLight);
  // warm sodium lamp over the warehouse side door
  const aWarm = new THREE.PointLight(0xffb45a, 22, 12, 1.8);
  aWarm.position.set(-5.6, 2.6, 1.6); A.add(aWarm);
  const aWarmM = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), M.lampWarm());
  aWarmM.position.set(-5.6, 2.6, 1.6); A.add(aWarmM);
  const aLamp = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.3), M.lampCool());
  aLamp.position.set(0, 4.7, 0.5); A.add(aLamp);
  const aRed = new THREE.PointLight(0xff3b30, 8, 6, 2);
  aRed.position.set(0, 1.4, -4.2); A.add(aRed);
  dyn.push((t) => { aLight.intensity = 48 + Math.sin(t * 11) * 4 + (Math.sin(t * 47) > 0.94 ? -12 : 0); aWarm.intensity = 18 + Math.sin(t * 6.3) * 2.5; });

  /* ======================== REGION: MID (axis) ===================== */
  const MID = new THREE.Group();
  scene.add(MID);
  // concrete high walls either side of the central gate, with firing slots
  for (const sx of [-1, 1]) {
    const wx = sx * 6.5;
    add(MID, box(5, 4.4, 0.6, M.concrete(0x7d8188), wx, 2.2, 0), { out: 1.03 });
    // shooting slot near the top, reached from the flanking platforms
    add(MID, box(1.4, 0.5, 0.7, M.darkConcrete(), wx + sx * 0.6, 3.4, 0), { cast: false });
  }
  // the double steel gate, half-open — the classic mid peeking slit
  const gateL = box(2.4, 4.0, 0.18, M.metal(0x5d636b), -2.0, 2.0, 0);
  gateL.rotation.y = 0.5;
  add(MID, gateL, { out: 1.04 });
  const gateR = box(2.4, 4.0, 0.18, M.metal(0x565c64), 2.0, 2.0, 0);
  gateR.rotation.y = -0.34;
  add(MID, gateR, { out: 1.04 });
  add(MID, box(0.3, 4.4, 0.5, M.rustDark(), -4.0, 2.2, 0), { cast: false });
  add(MID, box(0.3, 4.4, 0.5, M.rustDark(), 4.0, 2.2, 0), { cast: false });
  // long drainage trench with a rusty grate — water inside reflects lights
  add(MID, box(3.2, 0.2, 9, M.darkConcrete(), 0, 0.1, 5.5), { cast: false });
  const trenchWater = box(2.8, 0.08, 8.6, new THREE.MeshStandardMaterial({ color: 0x1c2836, roughness: 0.08, metalness: 0.5 }), 0, 0.14, 5.5);
  MID.add(trenchWater);
  for (let i = 0; i < 8; i++) add(MID, box(0.14, 0.06, 8.6, M.rust(), -1.3 + i * 0.37, 0.22, 5.5), { cast: false });
  // low wall + crates + a dumped road sign on the CT side
  add(MID, box(4.4, 1.1, 0.5, M.concrete(0x8a8e94), 1.5, 0.55, 8.5), { out: 1.05 });
  add(MID, box(0.9, 0.9, 0.9, M.wood(), 0.4, 0.45, 8.0), { out: 1.06 });
  add(MID, box(0.7, 0.7, 0.7, M.woodDark(), 1.2, 0.35, 8.4), { out: 1.06 });
  const rs = box(0.1, 1.5, 0.1, M.metal(0x777), 3.4, 0.75, 8.3);
  rs.rotation.z = 0.4; add(MID, rs, { cast: false });
  const rsf = decal(0.8, 0.5, 0xc0392b); rsf.position.set(3.55, 1.45, 8.3); rsf.rotation.z = 0.4; MID.add(rsf);
  // a cold fluorescent above the gate so the mid slit reads at a glance
  const midL = new THREE.PointLight(0xcfe0ff, 26, 15, 1.8);
  midL.position.set(0, 4.6, 0.5); MID.add(midL);
  const midLM = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.24), M.lampCool());
  midLM.position.set(0, 4.5, 0.32); MID.add(midLM);

  /* ======================== REGION: B SITE (NE) ==================== */
  const B = new THREE.Group();
  B.position.set(11, 0, -9);
  scene.add(B);
  // two-storey tin shack — guard-room below, balcony above via fire escape
  add(B, box(5.4, 2.8, 4.2, M.tinWall(0x8692a2), 0, 1.4, 0), { out: 1.03 });
  add(B, box(5.4, 2.6, 4.2, M.tinWall(0x7b8694), 0, 4.1, 0), { out: 1.03 });
  add(B, box(6.0, 0.4, 4.8, M.tinRoof(0x525b66), 0, 5.6, 0), { out: 1.02 });
  // ground-floor guard-room windows + front/back doors
  add(B, box(1.6, 1.1, 0.1, M.glass(), -1.4, 1.7, 2.14), { cast: false });
  add(B, box(0.9, 2.0, 0.12, M.metal(0x4d5359), 1.6, 1.0, 2.14), { cast: false });
  add(B, box(0.9, 2.0, 0.12, M.metal(0x4d5359), -1.6, 1.0, -2.14), { cast: false });
  // upstairs windows
  add(B, box(1.4, 0.9, 0.1, M.glass(), 0.6, 4.3, 2.14), { cast: false });
  add(B, box(1.0, 0.8, 0.1, M.glass(), -1.8, 4.3, 2.14), { cast: false });
  // warm guard-room lamp spilling through the door + a lit upstairs window
  const bWarm = new THREE.PointLight(0xffc46a, 30, 13, 1.8);
  bWarm.position.set(1.6, 1.6, 2.6); B.add(bWarm);
  const bWinGlow = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.8), new THREE.MeshBasicMaterial({ color: 0xffd9a0 }));
  bWinGlow.position.set(0.6, 4.3, 2.2); B.add(bWinGlow);
  const bDoorGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.9), new THREE.MeshBasicMaterial({ color: 0xffb45a, transparent: true, opacity: 0.55 }));
  bDoorGlow.position.set(1.6, 1.05, 2.2); B.add(bDoorGlow);
  dyn.push((t) => { bWarm.intensity = 26 + Math.sin(t * 13.7) * 3 + (Math.sin(t * 31) > 0.9 ? -10 : 0); });
  // balcony along the front — the high perch watching B and the side alley
  add(B, box(5.6, 0.14, 1.3, M.tinRoof(), 0, 2.86, 2.85), { out: 1.04 });
  for (let i = 0; i < 7; i++) add(B, box(0.08, 0.9, 0.08, M.metal(0x555a62), -2.6 + i * 0.85, 3.3, 3.45), { cast: false });
  add(B, box(5.6, 0.1, 0.1, M.metal(0x555a62), 0, 3.75, 3.45), { cast: false });
  // fire-escape zigzag up the side to the balcony
  const fe = new THREE.Group(); fe.position.set(3.0, 0, 0); fe.rotation.y = -0.12;
  for (let i = 0; i < 8; i++) add(fe, box(0.9, 0.08, 0.24, M.metal(0x5d636b), 0, 0.4 + i * 0.34, 1.0 - i * 0.14), { cast: false });
  add(fe, box(0.08, 3.0, 0.08, M.metal(0x5d636b), -0.45, 1.5, 0.4), { cast: false });
  add(fe, box(0.08, 3.0, 0.08, M.metal(0x5d636b), 0.45, 1.5, 0.4), { cast: false });
  B.add(fe);
  // bomb marking on the open ground before the shack + clutter
  const bmark = decal(3.8, 2.6, 0xdfe4ea); bmark.rotation.x = -Math.PI / 2; bmark.position.set(-0.6, 0.16, 4.4); bmark.material.opacity = 0.9; bmark.material.transparent = true; B.add(bmark);
  const bmarkH = decal(3.2, 2.0, 0x2c3037); bmarkH.rotation.x = -Math.PI / 2; bmarkH.position.set(-0.6, 0.165, 4.4); B.add(bmarkH);
  pallet(9.6, -4.5, 0.8); // near B approach
  // overturned cafe table + chairs, broken bicycle, bins
  const tbl = new THREE.Group(); tbl.position.set(-3.4, 0, 4.6); tbl.rotation.z = Math.PI / 2 - 0.2; tbl.rotation.y = 0.6;
  add(tbl, cyl(0.7, 0.7, 0.08, M.metal(0x8a8f96), 0, 0.7, 0, 14), { cast: false });
  add(tbl, cyl(0.05, 0.05, 0.7, M.metal(0x555), 0, 0.35, 0), { cast: false });
  B.add(tbl);
  for (const [cx, cz, r] of [[-4.4, 4.0, 0.4], [-2.6, 5.4, -0.8], [-3.8, 5.8, 2.4]]) {
    const ch = new THREE.Group(); ch.position.set(cx, 0, cz); ch.rotation.y = r; ch.rotation.x = Math.PI / 2 - 0.15;
    add(ch, box(0.5, 0.08, 0.5, M.metal(0x777d85), 0, 0.3, 0), { cast: false });
    add(ch, box(0.5, 0.5, 0.08, M.metal(0x777d85), 0, 0.6, -0.2), { cast: false });
    B.add(ch);
  }
  // bicycle
  const bike = new THREE.Group(); bike.position.set(-5.6, 0.02, 5.2); bike.rotation.z = Math.PI / 2 - 0.08; bike.rotation.y = 0.9;
  add(bike, cyl(0.42, 0.42, 0.05, M.tire(), 0, 0.42, 0, 16), { cast: false });
  add(bike, cyl(0.42, 0.42, 0.05, M.tire(), 1.1, 0.42, 0, 16), { cast: false });
  add(bike, box(1.0, 0.06, 0.06, M.metal(0x9aa), 0.55, 0.6, 0), { cast: false });
  add(bike, box(0.5, 0.06, 0.06, M.metal(0x9aa), 0.7, 0.85, 0), { cast: false });
  B.add(bike);
  // street lamp on the corner — warm yellow pool in the rain
  add(B, cyl(0.09, 0.12, 5.4, M.metal(0x3c4045), -6.4, 2.7, 6.8), { out: 1.04 });
  add(B, box(1.2, 0.12, 0.12, M.metal(0x3c4045), -5.9, 5.3, 6.8), { cast: false });
  const lampHead = add(B, box(0.7, 0.3, 0.4, M.metal(0x2c3035), -5.3, 5.2, 6.8), {});
  const lampGlow = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), M.lampWarm());
  lampGlow.position.set(-5.3, 5.1, 6.8); B.add(lampGlow);
  const lampPt = new THREE.PointLight(0xffc46a, 55, 26, 1.8);
  lampPt.position.set(-5.3, 4.9, 6.8); lampPt.castShadow = true;
  B.add(lampPt);
  dyn.push((t) => { const f = 0.82 + 0.18 * Math.sin(t * 7.3) * Math.sin(t * 1.7); lampPt.intensity = 55 * f; lampGlow.scale.setScalar(0.9 + 0.25 * f); });

  /* ======================== REGION: CT SPAWN (S) =================== */
  const CT = new THREE.Group();
  scene.add(CT);
  // police cordon: jersey barriers + riot shields in a defensive line
  for (let i = 0; i < 5; i++) {
    add(CT, box(1.5, 0.9, 0.5, M.concrete(0xd8b400), -5 + i * 2.4, 0.45, 16), { out: 1.05 });
    add(CT, box(1.5, 0.2, 0.55, M.plastic(0xc0392b), -5 + i * 2.4, 0.8, 16), { cast: false });
  }
  for (let i = 0; i < 3; i++) add(CT, box(0.7, 1.3, 0.1, M.metal(0x6a7480), -4 + i * 3, 1.4, 15.6), { cast: false });
  // police van (left) — lightbar works as the initial cover
  const van = new THREE.Group(); van.position.set(-12, 0, 15.5); van.rotation.y = -0.2;
  add(van, box(4.8, 2.4, 2.2, M.tinWall(0xdde2e8), 0, 1.5, 0), { out: 1.04 });
  add(van, box(1.8, 1.2, 2.0, M.tinWall(0x2e5f9e), 2.4, 1.1, 0), { cast: false });
  [[-1.4, 1.05], [1.4, 1.05], [-1.4, -1.05], [1.4, -1.05]].forEach(([wx, wz]) => {
    const w = cyl(0.5, 0.5, 0.36, M.tire(), wx, 0.5, wz, 12); w.rotation.x = Math.PI / 2; add(van, w);
  });
  // lightbar
  const lbR = add(van, box(0.5, 0.22, 0.4, M.red(), -0.3, 2.85, 0), { cast: false });
  const lbB = add(van, box(0.5, 0.22, 0.4, M.blueLight(), 0.3, 2.85, 0), { cast: false });
  const beacon = new THREE.PointLight(0xff4040, 0, 12, 2); beacon.position.set(0, 3.2, 0); van.add(beacon);
  const beaconB = new THREE.PointLight(0x4060ff, 0, 12, 2); beaconB.position.set(0, 3.2, 0); van.add(beaconB);
  CT.add(van);
  dyn.push((t) => {
    const ph = t % 1.2;
    beacon.intensity = ph < 0.6 ? 9 : 0; lbR.material.color.setHex(ph < 0.6 ? 0xff3b30 : 0x611512);
    beaconB.intensity = ph < 0.6 ? 0 : 9; lbB.material.color.setHex(ph < 0.6 ? 0x12204a : 0x3b82ff);
  });
  // raised concrete platform (right) with a searchlight on top
  add(CT, box(5, 2.4, 4, M.concrete(0x7d8188), 10, 1.2, 16), { out: 1.02 });
  for (let i = 0; i < 5; i++) add(CT, box(1.4, 0.4, 0.9, M.concrete(0x70747a), 6.2 + i * 0.0, 0.2 + i * 0.44, 13.6 - i * 0.0), { cast: false });
  const st = 4; // steps up the side
  for (let i = 0; i < 6; i++) add(CT, box(0.9, 0.22, 1.0, M.concrete(0x85898f), 6.8, 0.2 + i * 0.38, 18.4), { cast: false });
  const search = new THREE.Group(); search.position.set(10, 2.4, 16); search.rotation.y = -0.5;
  add(search, box(0.9, 0.5, 0.5, M.metal(0x3c4045), 0, 0.5, 0), {});
  const sg = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), M.lampCool()); sg.position.set(0.5, 0.5, 0); search.add(sg);
  const sPt = new THREE.SpotLight(0xcfe8ff, 90, 40, 0.45, 0.4, 1.4);
  sPt.position.set(0.5, 0.6, 0); sPt.target.position.set(-6, 0.5, -8); search.add(sPt); search.add(sPt.target);
  CT.add(search);
  dyn.push((t) => { search.rotation.y = -0.5 + Math.sin(t * 0.35) * 0.35; sPt.intensity = 78 + Math.sin(t * 9) * 8 + Math.sin(t * 23.7) * 4; });
  // rear wall with badge + warning, crates of spare vests/helmets
  add(CT, box(18, 3.6, 0.5, M.wall(0x6a7480), 0, 1.8, 19.4), { out: 1.03 });
  const badge = decal(1.6, 1.6, 0x2e5f9e); badge.position.set(-6, 2.1, 19.12); CT.add(badge);
  const warn = decal(4, 0.7, 0xd8b400); warn.position.set(2, 2.4, 19.12); CT.add(warn);
  for (let i = 0; i < 4; i++) add(CT, box(0.9, 0.9, 0.9, M.container(0x3a5f3a), -15 + i * 1.1, 0.45, 18.6), { out: 1.06 });

  /* ==================== LEFT ALLEY + RIGHT FLANK =================== */
  // left alley: narrow cut between warehouse and side buildings
  add(scene, box(3, 4.6, 8, M.wall(0x7b8188), -18, 2.3, -8), { out: 1.03 });
  add(scene, box(3, 4.6, 8, M.wall(0x848a92), -18, 2.3, 2), { out: 1.03 });
  for (let i = 0; i < 3; i++) add(scene, box(1.2, 1.0, 1.0, M.wood(), -16.8, 0.5, -4 + i * 1.3), { out: 1.06 });
  // right flank: elevated concrete ledge with cover
  add(scene, box(3.4, 2.6, 10, M.concrete(0x7d8188), 18, 1.3, -4), { out: 1.02 });
  add(scene, box(3.4, 1.0, 3, M.concrete(0x84898f), 18, 3.1, -6.5), { out: 1.03 });
  for (let i = 0; i < 4; i++) drum(16.5 + (i % 2) * 1.2, -1 + Math.floor(i / 2) * 1.2, i % 2 ? 0x9e5b2e : 0x2e5f9e);
  add(scene, box(1.0, 1.0, 1.0, M.wood(), 18, 3.1, -2), { out: 1.06 });

  /* ==================== STREET FURNITURE / CLUTTER ================= */
  // power poles + sagging wires across the map
  const poles = [[-9, -13], [-9, 6], [7, -13], [7, 10]];
  poles.forEach(([x, z]) => {
    add(scene, cyl(0.12, 0.16, 7.5, M.woodDark(), x, 3.75, z, 8), { out: 1.05 });
    add(scene, box(2.2, 0.1, 0.1, M.woodDark(), x, 6.8, z), { cast: false });
  });
  // wires — catenary curves between poles
  function wire(a, b, sag = 1.2) {
    const mid = new THREE.Vector3((a[0] + b[0]) / 2, Math.min(a[1], b[1]) - sag, (a[2] + b[2]) / 2);
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(...a), mid, new THREE.Vector3(...b));
    const g = new THREE.TubeGeometry(curve, 12, 0.025, 4, false);
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x0c0e12 }));
    scene.add(m);
  }
  wire([-9, 6.8, -13], [-9, 6.8, 6]); wire([7, 6.8, -13], [7, 6.8, 10]);
  wire([-9, 6.8, -13], [7, 6.8, -13]); wire([-9, 6.8, 6], [7, 6.8, 10], 1.6);

  // gutters + dripping eaves on corners
  const dripPoints = [];
  [[-16.4, 5.0, -3.5], [13.9, 5.6, -6], [-4.6, 4.6, -3.5]].forEach(([x, y, z]) => {
    add(scene, box(0.14, y * 0.9, 0.14, M.rust(), x, y * 0.45, z), { cast: false });
    dripPoints.push([x, y * 0.9, z]);
  });

  // tactical props scatter — crates, barrels, tyres, barriers, tyres
  const crates = [[-14, 0, -4, 0.2], [13, 0, 2, -0.4], [-6, 0, 12, 0.9], [4, 0, -6, 0.5], [-3, 0, -14, 0.1]];
  crates.forEach(([x, y, z, r]) => {
    add(scene, box(1.1, 1.1, 1.1, M.wood(), x, y + 0.55, z, r), { out: 1.05 });
    add(scene, box(0.8, 0.8, 0.8, M.woodDark(), x + 0.4, y + 1.5, z + 0.2, r + 0.7), { out: 1.06 });
  });
  for (const [x, z] of [[-16, 8], [14.5, 12], [1, 12]]) {
    for (let i = 0; i < 2; i++) {
      const t = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 8, 14), M.tire());
      t.rotation.x = Math.PI / 2; t.position.set(x, 0.2 + i * 0.4, z); t.castShadow = t.receiveShadow = true; scene.add(t);
    }
  }
  // graffiti / freight numbers / faction spray on walls
  const graf = [
    [-16.48, 2.2, -6, 0x3b82ff, 1.8, 0.9], [-16.48, 1.6, -4, 0xd8b400, 1.2, 0.6],
    [13.9, 3.6, -4.5, 0xc0392b, 2.0, 1.0], [2, 3.0, 19.1, 0x3b82ff, 1.6, 0.8],
    [-4, 2.6, -19.1, 0xd8b400, 1.4, 0.7],
  ];
  graf.forEach(([x, y, z, c, w, h]) => {
    const d = decal(w, h, c);
    d.position.set(x, y, z);
    if (Math.abs(x) > 15) d.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
    scene.add(d);
  });
  // bullet-pock clusters on a couple of corners
  for (const [x, z, ry] of [[-4.1, -0.3, 0], [4.1, 0.3, Math.PI], [-5.4, 4.4, 0]]) {
    for (let i = 0; i < 9; i++) {
      const p = decal(0.09, 0.09, 0x11131a);
      p.position.set(x + (Math.random() - 0.5) * 1.4, 1 + (Math.random() - 0.5) * 1.4, z + 0.31);
      p.rotation.y = ry;
      scene.add(p);
    }
  }

  /* ========================= RAIN + EFFECTS ======================== */
  // instanced rain streaks over the whole map
  const RAIN = 2400;
  const rainGeo = new THREE.PlaneGeometry(0.012, 0.7);
  const rainMat = new THREE.MeshBasicMaterial({ color: 0xaac6e8, transparent: true, opacity: 0.32, side: THREE.DoubleSide, depthWrite: false });
  const rain = new THREE.InstancedMesh(rainGeo, rainMat, RAIN);
  const rainData = [];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < RAIN; i++) {
    rainData.push({ x: (Math.random() - 0.5) * S * 1.3, y: Math.random() * 22, z: (Math.random() - 0.5) * S * 1.3, v: 14 + Math.random() * 8 });
  }
  rain.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(rain);
  // eave drips
  const drips = dripPoints.map(([x, y, z]) => {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 5), new THREE.MeshBasicMaterial({ color: 0xbcd8f0, transparent: true, opacity: 0.7 }));
    d.position.set(x, y, z); scene.add(d);
    return { m: d, x, y, z, t: Math.random() * 2 };
  });
  // steam vents — drifting white puffs
  const steam = [];
  [[-14.8, 2.4, 1.2], [15, 3.4, -6.2]].forEach(([x, y, z]) => {
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.3, 7, 6), new THREE.MeshBasicMaterial({ color: 0xdde6f0, transparent: true, opacity: 0 }));
      s.position.set(x, y, z); scene.add(s);
      steam.push({ m: s, x, y, z, ph: Math.random() * 4 });
    }
  });
  // lightning — occasional distant flash
  const flash = new THREE.DirectionalLight(0xbfd4ff, 0);
  flash.position.set(-30, 40, -25);
  scene.add(flash);
  // shutter vibration handled by scaling the shutter group subtly
  dyn.push((t) => { shutter.position.x = Math.sin(t * 38) * 0.006 * (0.5 + 0.5 * Math.sin(t * 0.9)); });

  /* ------------------------- animation --------------------------- */
  const clock = { t: 0 };
  function update(t) {
    const dt = Math.min(0.05, t - clock.t || 0.016);
    clock.t = t;
    // rain fall
    for (let i = 0; i < RAIN; i++) {
      const d = rainData[i];
      d.y -= d.v * dt;
      if (d.y < 0) { d.y = 22; d.x = (Math.random() - 0.5) * S * 1.3; d.z = (Math.random() - 0.5) * S * 1.3; }
      dummy.position.set(d.x, d.y, d.z);
      dummy.rotation.set(0, 0, 0.1);
      dummy.updateMatrix();
      rain.setMatrixAt(i, dummy.matrix);
    }
    rain.instanceMatrix.needsUpdate = true;
    // drips
    for (const d of drips) {
      d.t += dt;
      const fall = (d.t % 2.4) / 2.4;
      d.m.position.y = d.y - fall * d.y * 0.9;
      d.m.material.opacity = fall < 0.85 ? 0.75 : 0;
      d.m.scale.setScalar(0.8 + fall * 0.5);
    }
    // ripples
    for (const r of ripples) {
      const ph = (t * 0.6 + r.phase) % 1;
      r.ring.scale.setScalar(0.2 + ph * r.r * 0.9);
      r.ring.material.opacity = (1 - ph) * 0.35;
    }
    // steam
    for (const s of steam) {
      const ph = (t * 0.4 + s.ph) % 1;
      s.m.position.y = s.y + ph * 1.6;
      s.m.position.x = s.x + Math.sin(t + s.ph) * 0.2;
      s.m.scale.setScalar(0.6 + ph * 1.4);
      s.m.material.opacity = (ph < 0.5 ? ph * 2 : (1 - ph) * 2) * 0.22;
    }
    // lightning: rare, brief double-strike
    const cyc = t % 9;
    flash.intensity = (cyc > 8.2 && cyc < 8.32) ? 2.4 : (cyc > 8.4 && cyc < 8.48) ? 1.4 : 0;
    for (const f of dyn) f(t);
  }

  return { update };
}
