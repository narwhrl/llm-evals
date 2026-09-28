import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshToonMaterial,
  PlaneGeometry,
  CanvasTexture,
  SRGBColorSpace,
  NearestFilter,
  Texture,
  RepeatWrapping,
} from 'three';
import { metalMaterial, toonMaterial, woodMaterial, concreteMaterial } from '../util/materials';
import { makeBarbedWire, makeCrate, makeOilDrum, makePallet, makeCardboardStack, makeDumpster, makeBollard, makeJerseyBarrier } from './cover';

// Build the T-side spawn region.
// North edge of the base, between z = -3.6 and z = -4.8.
export function buildSpawnT(): Group {
  const g = new Group();
  g.name = 'spawnT';
  g.position.set(0, 0.05, -4.0);

  // Rear wall (north boundary at z = -4.7)
  const wall = new Mesh(
    new BoxGeometry(7.6, 1.6, 0.25),
    concreteMaterial(0x575450, 3),
  );
  wall.position.set(0, 0.8, -0.7);
  wall.castShadow = true;
  wall.receiveShadow = true;
  g.add(wall);

  // Wall extension posts (concrete pillars)
  for (const px of [-3.6, 3.6]) {
    const post = new Mesh(new BoxGeometry(0.35, 1.6, 0.35), concreteMaterial(0x6a6863, 2));
    post.position.set(px, 0.8, -0.7);
    g.add(post);
  }

  // Old rusty freight container (right-side, three-stack)
  buildContainerStack(g, 2.2, -0.2);

  // Old rusty freight container (back-left)
  buildSingleContainer(g, -2.6, -0.45);

  // Box van (cargo truck) on the left
  buildBoxVan(g, -3.0, -0.1);

  // Wooden ladder leaning against back wall
  buildLadder(g, 1.4, -0.55);

  // Ramp (concrete incline towards mid, south-facing)
  buildRamp(g, 0, 0.4);

  // Four-pack of oil drums
  const drumRow = new Group();
  for (let i = 0; i < 4; i++) {
    const d = makeOilDrum(0.7, 0.22);
    d.position.set(i * 0.45 - 0.7, 0, 0);
    drumRow.add(d);
  }
  drumRow.position.set(1.2, 0, 0.55);
  g.add(drumRow);

  // Wooden pallets near drums
  for (let i = 0; i < 3; i++) {
    const p = makePallet();
    p.position.set(0.7 + i * 0.05, 0, 0.2 + i * 0.95);
    p.rotation.y = (i - 1) * 0.08;
    g.add(p);
  }

  // Cardboard box stack near van
  const cs = makeCardboardStack(11);
  cs.position.set(-2.0, 0, -0.2);
  g.add(cs);

  // Jersey barriers flanking the spawn approach
  const jb1 = makeJerseyBarrier(1.0);
  jb1.position.set(-2.6, 0, 0.9);
  jb1.rotation.y = Math.PI / 2;
  g.add(jb1);
  const jb2 = makeJerseyBarrier(1.0);
  jb2.position.set(2.6, 0, 0.9);
  jb2.rotation.y = -Math.PI / 2;
  g.add(jb2);

  // Barbed wire on top of rear wall
  const bw = makeBarbedWire(7.4);
  bw.position.set(0, 1.6, -0.7);
  g.add(bw);

  // Bollards
  for (const bx of [-1.2, 1.2]) {
    const b = makeBollard();
    b.position.set(bx, 0, 0.5);
    g.add(b);
  }

  // Dumpster right-side
  const d1 = makeDumpster();
  d1.position.set(3.3, 0, -0.2);
  d1.rotation.y = -0.2;
  g.add(d1);

  // Graffiti decal on rear wall
  addGraffiti(g, 0, 1.1, -0.58, 1.6, 0.9, 'T', 0xc8a45c);

  // Side wall (east-side, between T-spawn and B)
  const sideEast = new Mesh(
    new BoxGeometry(0.2, 1.4, 1.5),
    concreteMaterial(0x4d4a45, 2),
  );
  sideEast.position.set(3.7, 0.7, 0.05);
  g.add(sideEast);

  // Side wall (west-side)
  const sideWest = sideEast.clone();
  sideWest.position.x = -3.7;
  g.add(sideWest);

  return g;
}

// Container with graffiti + rust detail.
function buildSingleContainer(parent: Group, x: number, z: number): Group {
  const c = new Group();
  const w = 2.0;
  const h = 1.4;
  const d = 1.4;
  const body = new Mesh(new BoxGeometry(w, h, d), metalMaterial(0x5b6a48));
  body.position.set(0, h / 2, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  c.add(body);
  // corrugated side ribs
  for (let i = -w / 2 + 0.1; i < w / 2; i += 0.18) {
    const rib = new Mesh(new BoxGeometry(0.03, h - 0.04, 0.02), toonMaterial(0x3a4a30));
    rib.position.set(i, h / 2, d / 2 + 0.005);
    c.add(rib);
  }
  // doors
  const door = new Mesh(new BoxGeometry(0.04, h - 0.2, d - 0.1), metalMaterial(0x4a583a));
  door.position.set(w / 2 + 0.005, h / 2, 0);
  c.add(door);
  // freight number
  addFreightNumber(c, 0, h - 0.3, d / 2 + 0.01, d - 0.2, w - 0.4);
  c.position.set(x, 0, z);
  parent.add(c);
  return c;
}

// Three-stack of containers (T-spawn right-side two-level rack).
function buildContainerStack(parent: Group, x: number, z: number): Group {
  const stack = new Group();
  // Two on bottom, one on top shifted
  const c1 = buildSingleContainer(stack, -0.55, 0);
  c1.scale.set(0.8, 1, 0.8);
  const c2 = buildSingleContainer(stack, 0.55, 0);
  c2.scale.set(0.8, 1, 0.8);
  const c3 = buildSingleContainer(stack, -0.05, 0.05);
  c3.scale.set(0.7, 0.95, 0.7);
  c3.position.y = 1.35;
  stack.position.set(x, 0, z);
  parent.add(stack);
  return stack;
}

function buildBoxVan(parent: Group, x: number, z: number): Group {
  const van = new Group();
  const cab = new Mesh(new BoxGeometry(0.9, 0.95, 1.4), metalMaterial(0xe2c074));
  cab.position.set(0.6, 0.475, 0);
  cab.castShadow = true;
  cab.receiveShadow = true;
  van.add(cab);
  const cabRoof = new Mesh(new BoxGeometry(0.95, 0.05, 1.45), toonMaterial(0x8a6e3a));
  cabRoof.position.set(0.6, 0.97, 0);
  van.add(cabRoof);
  // windshield
  const win = new Mesh(new BoxGeometry(0.02, 0.5, 1.1), toonMaterial(0x2a3a4a));
  win.position.set(1.07, 0.55, 0);
  van.add(win);
  // cargo box
  const box = new Mesh(new BoxGeometry(1.8, 1.4, 1.5), metalMaterial(0xc8a85c));
  box.position.set(-0.55, 0.7, 0);
  box.castShadow = true;
  box.receiveShadow = true;
  van.add(box);
  // door panel
  const door = new Mesh(new BoxGeometry(0.02, 1.0, 1.2), metalMaterial(0xa48845));
  door.position.set(0.36, 0.5, 0);
  van.add(door);
  // wheels
  for (const sx of [-0.5, 0.4, 0.9]) {
    const wheel = new Mesh(new CylinderGeometry(0.22, 0.22, 0.16, 12), toonMaterial(0x101013));
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(sx, 0.22, 0.7);
    van.add(wheel);
    const wheel2 = wheel.clone();
    wheel2.position.z = -0.7;
    van.add(wheel2);
  }
  van.position.set(x, 0, z);
  parent.add(van);
  return van;
}

function buildLadder(parent: Group, x: number, z: number): Group {
  const ladder = new Group();
  const railMat = woodMaterial(0x9a6e3e);
  const rail = new BoxGeometry(0.08, 2.4, 0.08);
  for (const sx of [-0.18, 0.18]) {
    const r = new Mesh(rail, railMat);
    r.position.set(sx, 1.2, 0);
    ladder.add(r);
  }
  for (let i = 0; i < 7; i++) {
    const rung = new Mesh(new BoxGeometry(0.4, 0.05, 0.06), railMat);
    rung.position.set(0, 0.3 + i * 0.32, 0);
    ladder.add(rung);
  }
  ladder.rotation.z = 0.18;
  ladder.position.set(x, 0, z);
  parent.add(ladder);
  return ladder;
}

function buildRamp(parent: Group, x: number, z: number): Group {
  const ramp = new Group();
  const slope = new Mesh(
    new BoxGeometry(2.4, 0.12, 1.4),
    concreteMaterial(0x6a665e, 2),
  );
  slope.position.set(0, 0.25, 0);
  slope.rotation.x = -0.18;
  slope.castShadow = true;
  slope.receiveShadow = true;
  ramp.add(slope);
  // curb along ramp edge
  const curb = new Mesh(new BoxGeometry(2.4, 0.06, 0.06), toonMaterial(0x4a463f));
  curb.position.set(0, 0.36, 0.6);
  curb.rotation.x = -0.18;
  ramp.add(curb);
  ramp.position.set(x, 0, z);
  parent.add(ramp);
  return ramp;
}

// Decals
function addGraffiti(parent: Group, x: number, y: number, z: number, w: number, h: number, letter: string, color: number): void {
  const tex = makeGraffitiTexture(letter, color);
  const mat = new MeshToonMaterial({ map: tex, transparent: true });
  const mesh = new Mesh(new PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  parent.add(mesh);
}

function makeGraffitiTexture(letter: string, colorHex: number): Texture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 64);
  const color = '#' + colorHex.toString(16).padStart(6, '0');
  ctx.fillStyle = color;
  ctx.font = 'bold 56px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 64, 36);
  // spray drips
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * 128;
    const y = 50 + Math.random() * 14;
    ctx.fillRect(x, y, 1 + Math.random() * 1.5, 4 + Math.random() * 6);
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function makeFreightNumberTexture(): Texture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 256, 64);
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const id = 'FT-' + (1000 + Math.floor(Math.random() * 8999));
  ctx.fillText(id, 128, 32);
  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#5a5a5a';
  ctx.fillText('FREIGHT YARD · SECTOR 7', 128, 56);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function addFreightNumber(parent: Group, x: number, y: number, z: number, w: number, h: number): void {
  const tex = makeFreightNumberTexture();
  const mat = new MeshToonMaterial({ map: tex, transparent: true });
  const mesh = new Mesh(new PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  parent.add(mesh);
}