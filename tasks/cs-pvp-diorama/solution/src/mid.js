// 中路主通道 — the central duelling lane: high walls with shooting slits,
// half-open double iron doors, covered drain channel, CT-side low wall, guard
// booths with rain-streaked glass, and both sewer grates.
import * as THREE from 'three';
import { box, cyl, decal, ladder, noOutline, put, rnd, bulletHoles } from './utils.js';
import { M } from './materials.js';
import * as T from './textures.js';
import * as P from './props.js';

const WALL_H = 4.5;

// Wall with a high shooting slit at given z. Axis: wall runs along z at fixed x.
function slitWall(x, slitZ, parent) {
  const t = 0.6;
  // lower part full length
  box(t, 3.2, 28, M.concreteWall, { x, y: 1.6, z: -2, parent });
  // above slit
  box(t, 0.5, 28, M.concreteWall, { x, y: 4.25, z: -2, parent });
  // upper band beside slit (3.2..4.5) except slit opening (w 1.0 at slitZ)
  const z0 = -16, z1 = 12;
  const s0 = slitZ - 0.5, s1 = slitZ + 0.5;
  box(t, 1.3, s0 - z0, M.concreteWall, { x, y: 3.85, z: (z0 + s0) / 2, parent });
  box(t, 1.3, z1 - s1, M.concreteWall, { x, y: 3.85, z: (s1 + z1) / 2, parent });
  // dark recess behind slit + broken sill
  box(0.3, 0.85, 1.1, M.darkInside, { x: x - Math.sign(x) * 0.32, y: 3.6, z: slitZ, parent, cast: false });
  box(1.0, 0.09, 1.3, M.concreteDark, { x, y: 3.18, z: slitZ, parent, cast: false });
}

function guardBooth(x, z, faceDir, ctx) {
  // 3×3×3 hut let into the wall; glass window faces the lane (faceDir = -1 west side / +1 east side)
  const g = new THREE.Group();
  const wx = x; // wall plane x
  const cx = wx + faceDir * 1.5;
  box(3, 3, 3, M.concreteWall, { x: cx, y: 1.5, z, parent: g });
  box(3.06, 0.25, 3.06, M.concreteDark, { x: cx, y: 3.1, z, parent: g }); // roof/eave
  // window on the lane face
  const win = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.0), glassWin());
  win.position.set(wx - faceDir * 0.33, 1.9, z);
  win.rotation.y = -faceDir * Math.PI / 2;
  g.add(win);
  box(0.08, 1.14, 1.84, M.steelDark, { x: wx - faceDir * 0.32, y: 1.9, z, parent: g, cast: false });
  box(0.06, 0.06, 1.84, M.steelDark, { x: wx - faceDir * 0.34, y: 1.9, z, parent: g, cast: false });
  box(0.06, 1.14, 0.06, M.steelDark, { x: wx - faceDir * 0.34, y: 1.9, z, parent: g, cast: false });
  // interior silhouettes + tiny cold light
  const con = P.consoleDesk();
  con.position.set(cx + faceDir * 0.5, 0.05, z);
  con.rotation.y = -faceDir * Math.PI / 2;
  g.add(con);
  const st = P.boothStool();
  st.position.set(cx - faceDir * 0.3, 0, z + 0.8);
  g.add(st);
  box(1.4, 0.06, 0.3, M.coldGlow, { x: cx, y: 2.94, z, parent: g, cast: false, recv: false });
  // door on outer face
  box(0.9, 2.1, 0.08, M.woodDark, { x: cx + faceDir * 1.52, y: 1.05, z: z + 0.9, ry: Math.PI / 2, parent: g });
  ctx.drips.push(new THREE.Vector3(wx - faceDir * 0.2, 3.25, z - 1.2));
  ctx.drips.push(new THREE.Vector3(wx - faceDir * 0.2, 3.25, z + 1.2));
  return g;
}

let glassMaterial = null;
function glassWin() {
  if (!glassMaterial) {
    glassMaterial = noOutline(new THREE.MeshToonMaterial({
      map: T.glassTexture(), transparent: true, opacity: 0.6, depthWrite: false,
    }));
  }
  return glassMaterial;
}

// Slow-scrolling glossy water for the drain channel.
function drainWater(zLen, ctx) {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 256;
  const g2d = c.getContext('2d');
  g2d.fillStyle = '#0a0e16'; g2d.fillRect(0, 0, 64, 256);
  for (let i = 0; i < 26; i++) {
    g2d.fillStyle = `rgba(140,170,215,${0.05 + Math.random() * 0.16})`;
    g2d.fillRect(Math.random() * 64, Math.random() * 256, 1.5 + Math.random() * 2.5, 8 + Math.random() * 26);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, zLen / 4);
  const mat = noOutline(new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
  ctx.scrollMats.push({ mat, speed: 0.03 });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.9, zLen), mat);
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

function sewerPit(x, z, ry, ctx) {
  const g = new THREE.Group();
  box(1.7, 0.55, 1.25, M.darkInside, { y: -0.26, parent: g, cast: false });
  box(1.9, 0.14, 0.18, M.concreteDark, { y: 0.07, z: 0.62, parent: g });
  box(1.9, 0.14, 0.18, M.concreteDark, { y: 0.07, z: -0.62, parent: g });
  for (let i = 0; i < 7; i++) {
    box(0.09, 0.05, 1.3, M.steelDark, { x: -0.75 + i * 0.25, y: 0.03, parent: g, cast: false });
  }
  put(g, x, 0.001, z, ry);
  ctx.drips.push(new THREE.Vector3(x + 0.5, 0.06, z));
  return g;
}

export function buildMid(scene, ctx) {
  const g = new THREE.Group();
  g.name = 'mid';

  // West wall (x=-5) with slit at z=-8; booth gap z 8..11.
  slitWall(-5, -8, g);
  // slitWall builds the full z -16..12 run including the slit; the booth sits
  // proud of the wall and a dark doorway is let into the wall behind it.
  box(1.0, 2.2, 0.1, M.darkInside, { x: -5, y: 1.1, z: 9.5, parent: g, cast: false }); // doorway into west booth
  g.add(guardBooth(-5, 9.5, -1, ctx));

  // East wall (x=+5) with slit at z=+2 and lane-to-B opening z -3.5..-0.5.
  // Build as custom segments: z -16..-13.5, booth z -13..-10 (doorway), -10..-3.5, opening -3.5..-0.5 (lintel above), -0.5..12 with slit at z=2.
  const e = 5;
  box(0.6, WALL_H, 2.5, M.concreteWall, { x: e, y: WALL_H / 2, z: -14.75, parent: g });
  box(0.6, WALL_H, 6.5, M.concreteWall, { x: e, y: WALL_H / 2, z: -7, parent: g });
  box(0.6, WALL_H, 12.5, M.concreteWall, { x: e, y: WALL_H / 2, z: 5.75, parent: g });
  // opening lintel z -3.5..-0.5
  box(0.6, 1.4, 3.0, M.concreteWall, { x: e, y: 3.8, z: -2, parent: g });
  // slit recess in east wall at z=2
  box(0.3, 0.85, 1.1, M.darkInside, { x: e - 0.32, y: 3.6, z: 2, parent: g, cast: false });
  box(1.0, 0.09, 1.3, M.concreteDark, { x: e, y: 3.18, z: 2, parent: g, cast: false });
  box(1.0, 1.4, 0.14, M.concreteWall, { x: e, y: 3.85, z: 1.42, parent: g });
  box(1.0, 1.4, 0.14, M.concreteWall, { x: e, y: 3.85, z: 2.58, parent: g });
  box(1.0, 0.5, 1.3, M.concreteWall, { x: e, y: 4.25, z: 2, parent: g });
  box(1.0, 3.2, 1.3, M.concreteWall, { x: e, y: 1.6, z: 2, parent: g });
  // doorway into east booth
  box(1.0, 2.2, 0.1, M.darkInside, { x: e, y: 1.1, z: -11.5, parent: g, cast: false });
  g.add(guardBooth(5, -11.5, 1, ctx));

  // Wall caps
  box(0.8, 0.14, 28, M.concreteDark, { x: -5, y: WALL_H + 0.07, z: -2, parent: g, cast: false });
  box(0.8, 0.14, 28, M.concreteDark, { x: 5, y: WALL_H + 0.07, z: -2, parent: g, cast: false });

  // Double iron door, half open.
  const doorG = new THREE.Group();
  // frame
  box(0.5, 3.8, 0.5, M.steelDark, { x: -1.95, y: 1.9, z: -2, parent: doorG });
  box(0.5, 3.8, 0.5, M.steelDark, { x: 1.95, y: 1.9, z: -2, parent: doorG });
  box(0.5, 0.45, 4.4, M.steelDark, { y: 3.62, z: -2, parent: doorG });
  // west panel — closed
  const pw = box(1.7, 3.35, 0.12, M.slatDoor, { x: -1.02, y: 1.78, z: -2, parent: doorG });
  box(0.14, 0.14, 0.2, M.steel, { x: -1.7, y: 1.7, z: -1.88, parent: doorG, cast: false });
  // east panel — swung open ~65° (hinge at x=1.95)
  const hinge = new THREE.Group();
  hinge.position.set(1.95, 0, -2);
  const pe = box(1.7, 3.35, 0.12, M.slatDoor, { x: -0.85, y: 1.78, parent: hinge });
  box(0.14, 0.14, 0.2, M.steel, { x: -0.2, y: 1.7, z: 0.12, parent: hinge, cast: false });
  hinge.rotation.y = -1.15;
  doorG.add(hinge);
  g.add(doorG);
  ctx.drips.push(new THREE.Vector3(-2.1, 3.9, -2), new THREE.Vector3(2.1, 3.9, -2));

  // Bullet clusters on the door and frame.
  const holeMat = noOutline(new THREE.MeshBasicMaterial({ map: T.bulletHoleTexture(), transparent: true, depthWrite: false }));
  g.add(bulletHoles(7, 0.5, null, holeMat, { x: -1.0, y: 2.1, z: -1.9, ry: 0, parent: null }));
  const bh = g.children[g.children.length - 1]; bh.position.set(-1.0, 2.1, -1.92);
  g.add(bulletHoles(6, 0.45, null, holeMat, { x: 1.2, y: 1.4, z: -2.1, ry: 0 }));
  const bh2 = g.children[g.children.length - 1]; bh2.rotation.y = 0.5;

  // Covered drain channel down the lane.
  const drain = new THREE.Group();
  box(2.3, 0.5, 26, M.darkInside, { y: -0.25, z: -2, parent: drain, cast: false });
  box(0.2, 0.12, 26, M.rustHeavy, { x: -1.05, y: 0.0, z: -2, parent: drain, cast: false });
  box(0.2, 0.12, 26, M.rustHeavy, { x: 1.05, y: 0.0, z: -2, parent: drain, cast: false });
  const water = drainWater(25.5, ctx);
  water.position.set(0, -0.33, -2);
  drain.add(water);
  for (let z = -15; z <= 11; z += 0.72) {
    box(2.1, 0.06, 0.1, M.steelDark, { y: 0.02, z, parent: drain, cast: false });
  }
  g.add(drain);

  // CT-side low wall with crates + discarded sign.
  box(9, 1.1, 0.5, M.concreteDark, { y: 0.55, z: 6, parent: g });
  const cs = P.crateStack({ cols: 2, rows: 2, base: 1.2 });
  cs.position.set(-1.6, 0, 6.9); cs.rotation.y = 0.15;
  g.add(cs);
  const sign = P.roadSign('noentry');
  sign.position.set(2.8, 0, 6.7); sign.rotation.set(-0.35, 2.6, 0.1);
  g.add(sign);

  // Sewer grates: T-side entrance at the ramp foot, exit near the CT flank.
  g.add(sewerPit(-3.2, -17.6, 0.2, ctx));
  g.add(sewerPit(11, 14.5, -0.3, ctx));

  // Graffiti on the mid walls.
  decal(T.graffitiTexture('glhf'), 2.2, 2.2, { x: -4.66, y: 2.0, z: -12.5, ry: Math.PI / 2, parent: g, opacity: 0.8 });
  decal(T.graffitiTexture('skull'), 1.6, 1.6, { x: 4.66, y: 1.9, z: 4.8, ry: -Math.PI / 2, parent: g, opacity: 0.85 });
  decal(T.codeStencil('SECTOR 04', { size: 44 }), 2.6, 0.7, { x: -4.66, y: 1.2, z: 1.5, ry: Math.PI / 2, parent: g });

  scene.add(g);
  return g;
}
