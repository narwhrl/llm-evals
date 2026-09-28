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
import { concreteMaterial, metalMaterial, toonMaterial, woodMaterial } from '../util/materials';
import { makeCrate, makePallet, makeSandbags, makeOilDrum, makeCardboardStack, makeTireStack } from './cover';

// A-site: large open warehouse, north-west quadrant.
export function buildSiteA(): Group {
  const g = new Group();
  g.name = 'siteA';
  g.position.set(-3.4, 0.05, -3.0);

  // Warehouse shell
  const shell = new Group();
  // back wall
  const backWall = new Mesh(
    new BoxGeometry(4.0, 2.4, 0.2),
    concreteMaterial(0x6a665e, 3),
  );
  backWall.position.set(0, 1.2, -1.6);
  backWall.castShadow = true;
  backWall.receiveShadow = true;
  shell.add(backWall);
  // side walls
  for (const sx of [-2, 2]) {
    const side = new Mesh(
      new BoxGeometry(0.2, 2.4, 3.2),
      concreteMaterial(0x5e5b54, 3),
    );
    side.position.set(sx, 1.2, 0);
    side.castShadow = true;
    side.receiveShadow = true;
    shell.add(side);
  }
  // corrugated roof (slightly angled)
  const roof = new Mesh(
    new BoxGeometry(4.0, 0.12, 3.2),
    metalMaterial(0x6b6862),
  );
  roof.position.set(0, 2.42, 0);
  roof.rotation.x = -0.04;
  shell.add(roof);
  // roof ribs
  for (let i = -1.4; i < 1.5; i += 0.4) {
    const rib = new Mesh(
      new BoxGeometry(4.02, 0.06, 0.03),
      toonMaterial(0x4a463f),
    );
    rib.position.set(0, 2.46, i);
    rib.rotation.x = -0.04;
    shell.add(rib);
  }
  // Front rolling door (half-open) - corrugated metal
  buildRollingDoor(shell, 0, 0.9, 1.6);

  // Side window (wooden planks, breakable look)
  buildWoodenWindow(shell, -2.05, 1.3, -0.5);
  buildWoodenWindow(shell, -2.05, 1.3, 0.5);

  // Side door (inset, slightly open)
  const sideDoor = new Mesh(
    new BoxGeometry(0.04, 1.5, 0.7),
    metalMaterial(0x4a443d),
  );
  sideDoor.position.set(-2.05, 0.75, 1.2);
  sideDoor.rotation.y = 0.25;
  shell.add(sideDoor);

  // Central pillar (peek position)
  const pillar = new Mesh(
    new BoxGeometry(0.45, 2.2, 0.45),
    concreteMaterial(0x807870, 2),
  );
  pillar.position.set(0.4, 1.1, -0.4);
  pillar.castShadow = true;
  pillar.receiveShadow = true;
  shell.add(pillar);

  // Loft (iron mezzanine) at upper-right corner
  buildLoft(shell, 1.4, 1.7, -1.0);

  // Interior props
  buildForklift(shell, -1.2, 0, -0.7);
  buildShelves(shell, 1.3, 0, -0.9);
  buildShelves(shell, 1.3, 0, -1.3);

  // Crate cluster around pillar
  const stack1 = makeCrate(0.6, 0x7a5a36);
  stack1.position.set(0.9, 0.3, 0.05);
  shell.add(stack1);
  const stack2 = makeCrate(0.55, 0x8a6238);
  stack2.position.set(0.85, 0.55, 0.1);
  stack2.rotation.y = 0.4;
  shell.add(stack2);

  // Sandbags by entrance
  const sb = makeSandbags(4);
  sb.position.set(-1.5, 0, 1.0);
  shell.add(sb);

  // Cardboard boxes
  const cs = makeCardboardStack(7);
  cs.position.set(1.6, 0, 1.0);
  shell.add(cs);

  // Tire stack
  const ts = makeTireStack(3);
  ts.position.set(-1.4, 0, 1.0);
  shell.add(ts);

  // Oil drums
  const drum = makeOilDrum(0.95, 0.28);
  drum.position.set(-0.4, 0, 1.0);
  shell.add(drum);

  // Pallet
  const p = makePallet();
  p.position.set(0.2, 0, 0.9);
  shell.add(p);

  // Rear door (back of warehouse, half-open, peeks red light)
  const rearDoor = new Mesh(
    new BoxGeometry(0.04, 1.4, 0.7),
    metalMaterial(0x3a342d),
  );
  rearDoor.position.set(0, 0.7, -1.71);
  rearDoor.rotation.y = -0.4;
  shell.add(rearDoor);

  // Bomb-site white painted square on floor
  addBombSiteMark(shell, 0.4, 0.005, 0.4);

  // Graffiti on back wall
  addGraffiti(shell, -0.5, 1.6, -1.51, 1.0, 0.5, 'A', 0xc8a45c);

  // Bullet holes on side wall
  addBulletHoles(shell, 2.005, 1.3, 0);

  // Outside AC unit + sign + bin near side door
  const ac = new Mesh(
    new BoxGeometry(0.5, 0.4, 0.3),
    metalMaterial(0x9a9a96),
  );
  ac.position.set(-2.45, 0.25, 1.7);
  ac.castShadow = true;
  shell.add(ac);
  // Sign on back wall outside
  const sign = new Mesh(
    new PlaneGeometry(1.0, 0.35),
    new MeshToonMaterial({ map: makeSignTexture('WAREHOUSE A · 7'), transparent: true }),
  );
  sign.position.set(0, 1.9, -1.61);
  sign.rotation.y = Math.PI;
  shell.add(sign);
  // Industrial trash bin
  const bin = new Mesh(
    new CylinderGeometry(0.32, 0.32, 0.7, 12),
    toonMaterial(0x2c5a3a),
  );
  bin.position.set(-2.6, 0.35, 1.9);
  shell.add(bin);
  const lid = new Mesh(
    new CylinderGeometry(0.34, 0.32, 0.05, 12),
    toonMaterial(0x1d3e28),
  );
  lid.position.set(-2.6, 0.72, 1.9);
  shell.add(lid);

  // Narrow alley access (left side between A and T)
  const alleyWall = new Mesh(
    new BoxGeometry(0.18, 1.8, 1.0),
    concreteMaterial(0x6a665e, 2),
  );
  alleyWall.position.set(-3.85, 0.9, 0.6);
  shell.add(alleyWall);

  g.add(shell);
  return g;
}

function buildRollingDoor(parent: Group, x: number, y: number, z: number): void {
  // Half-up: lower half corrugated door
  const lowerHalf = new Mesh(
    new BoxGeometry(2.4, 1.0, 0.08),
    metalMaterial(0x7a6e58),
  );
  lowerHalf.position.set(x, 0.5, z);
  parent.add(lowerHalf);
  // corrugated ribs on lower half
  for (let i = -1.0; i < 1.05; i += 0.12) {
    const rib = new Mesh(
      new BoxGeometry(0.02, 1.0, 0.005),
      toonMaterial(0x4a443d),
    );
    rib.position.set(x + i, 0.5, z + 0.045);
    parent.add(rib);
  }
  // Upper half rolled up (curled shape: a short cylinder above)
  const rolled = new Mesh(
    new CylinderGeometry(0.18, 0.18, 2.4, 12),
    metalMaterial(0x7a6e58),
  );
  rolled.rotation.z = Math.PI / 2;
  rolled.position.set(x, 1.55, z + 0.05);
  parent.add(rolled);
  // Door frame
  const frameMat = metalMaterial(0x3a3530);
  const frameL = new Mesh(new BoxGeometry(0.12, 1.7, 0.12), frameMat);
  frameL.position.set(x - 1.2, 0.85, z + 0.04);
  parent.add(frameL);
  const frameR = frameL.clone();
  frameR.position.x = x + 1.2;
  parent.add(frameR);
  const frameT = new Mesh(new BoxGeometry(2.5, 0.12, 0.12), frameMat);
  frameT.position.set(x, 1.7, z + 0.04);
  parent.add(frameT);
}

function buildWoodenWindow(parent: Group, x: number, y: number, z: number): void {
  // Frame
  const frame = new Mesh(
    new BoxGeometry(0.06, 0.9, 0.7),
    woodMaterial(0x5a3e22),
  );
  frame.position.set(x, y, z);
  parent.add(frame);
  // planks nailed across
  for (let i = 0; i < 4; i++) {
    const plank = new Mesh(
      new BoxGeometry(0.07, 0.15, 0.7),
      woodMaterial(0x6a4a2c),
    );
    plank.position.set(x + 0.02, y - 0.3 + i * 0.2, z);
    plank.rotation.z = (i % 2 ? 0.06 : -0.06);
    parent.add(plank);
  }
}

function buildLoft(parent: Group, x: number, y: number, z: number): void {
  // Mezzanine platform
  const floor = new Mesh(
    new BoxGeometry(1.3, 0.08, 1.0),
    metalMaterial(0x6a665e),
  );
  floor.position.set(x, y, z);
  floor.castShadow = true;
  floor.receiveShadow = true;
  parent.add(floor);
  // railing
  for (const rx of [-0.6, 0.6]) {
    const rail = new Mesh(new BoxGeometry(0.04, 0.5, 1.0), metalMaterial(0x4a443d));
    rail.position.set(x + rx, y + 0.3, z);
    parent.add(rail);
  }
  const railFront = new Mesh(new BoxGeometry(1.3, 0.5, 0.04), metalMaterial(0x4a443d));
  railFront.position.set(x, y + 0.3, z + 0.5);
  parent.add(railFront);
  // vertical ladder up to loft
  const ladder = new Group();
  for (const sx of [-0.1, 0.1]) {
    const rail = new Mesh(new BoxGeometry(0.05, 1.4, 0.05), woodMaterial(0x6a4a2c));
    rail.position.set(sx, 0.7, 0);
    ladder.add(rail);
  }
  for (let i = 0; i < 5; i++) {
    const rung = new Mesh(new BoxGeometry(0.25, 0.04, 0.04), woodMaterial(0x6a4a2c));
    rung.position.set(0, 0.2 + i * 0.28, 0);
    ladder.add(rung);
  }
  ladder.position.set(x + 0.6, y - 0.04, z + 0.6);
  parent.add(ladder);
  // small window on loft wall
  const win = new Mesh(new BoxGeometry(0.5, 0.4, 0.04), metalMaterial(0x2a3a4a));
  win.position.set(x, y + 0.4, z - 0.5);
  parent.add(win);
}

function buildForklift(parent: Group, x: number, y: number, z: number): void {
  const fk = new Group();
  // chassis
  const body = new Mesh(new BoxGeometry(0.55, 0.5, 0.9), toonMaterial(0xd4a23c));
  body.position.set(0, 0.25, 0);
  fk.add(body);
  // cab
  const cab = new Mesh(new BoxGeometry(0.5, 0.7, 0.55), toonMaterial(0xe6b348));
  cab.position.set(0, 0.85, 0.15);
  fk.add(cab);
  // mast
  const mast = new Mesh(new BoxGeometry(0.05, 1.4, 0.05), metalMaterial(0x4a443d));
  mast.position.set(0.35, 0.7, -0.4);
  fk.add(mast);
  const mast2 = mast.clone();
  mast2.position.x = 0.35;
  mast2.position.z = -0.5;
  fk.add(mast2);
  // forks
  for (const fz of [-0.4, -0.5]) {
    const fork = new Mesh(new BoxGeometry(0.6, 0.04, 0.04), metalMaterial(0x4a443d));
    fork.position.set(0.6, 0.05, fz);
    fk.add(fork);
  }
  // wheels
  for (const sx of [-0.25, 0.25]) {
    const w = new Mesh(new CylinderGeometry(0.16, 0.16, 0.16, 10), toonMaterial(0x101013));
    w.rotation.z = Math.PI / 2;
    w.position.set(sx, 0.16, -0.4);
    fk.add(w);
    const w2 = new Mesh(new CylinderGeometry(0.2, 0.2, 0.2, 10), toonMaterial(0x101013));
    w2.rotation.z = Math.PI / 2;
    w2.position.set(sx, 0.2, 0.35);
    fk.add(w2);
  }
  fk.position.set(x, y, z);
  fk.rotation.y = 0.5;
  parent.add(fk);
}

function buildShelves(parent: Group, x: number, y: number, z: number): void {
  const shelf = new Group();
  // uprights
  for (const sx of [-0.4, 0.4]) {
    const up = new Mesh(new BoxGeometry(0.05, 1.6, 0.05), metalMaterial(0x4a443d));
    up.position.set(sx, 0.8, 0);
    shelf.add(up);
  }
  // horizontal shelves
  for (let i = 0; i < 5; i++) {
    const plank = new Mesh(new BoxGeometry(0.85, 0.04, 0.4), woodMaterial(0x8a6238));
    plank.position.set(0, 0.1 + i * 0.32, 0);
    shelf.add(plank);
  }
  shelf.position.set(x, y, z);
  parent.add(shelf);
}

function addBombSiteMark(parent: Group, x: number, y: number, z: number): void {
  const tex = makeBombSiteMarkTexture('A');
  const mat = new MeshToonMaterial({ map: tex, transparent: true });
  const mesh = new Mesh(new PlaneGeometry(1.6, 1.6), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, y, z);
  parent.add(mesh);
}

function makeBombSiteMarkTexture(letter: string): Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 256, 256);
  ctx.strokeStyle = '#e7e3da';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, 216, 216);
  ctx.font = 'bold 180px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#e7e3da';
  ctx.fillText(letter, 128, 144);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function addGraffiti(parent: Group, x: number, y: number, z: number, w: number, h: number, letter: string, colorHex: number): void {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 64;
  const ctx = c.getContext('2d')!;
  const color = '#' + colorHex.toString(16).padStart(6, '0');
  ctx.fillStyle = color;
  ctx.font = 'bold 56px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 64, 36);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  const mat = new MeshToonMaterial({ map: tex, transparent: true });
  const mesh = new Mesh(new PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  parent.add(mesh);
}

function addBulletHoles(parent: Group, x: number, y: number, z: number): void {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 256, 256);
  ctx.fillStyle = '#1a1a1a';
  for (let i = 0; i < 35; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = 1 + Math.random() * 2.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    // crack
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 0.5;
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 14, y + (Math.random() - 0.5) * 14);
      ctx.stroke();
    }
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  const mat = new MeshToonMaterial({ map: tex, transparent: true });
  const mesh = new Mesh(new PlaneGeometry(1.5, 1.5), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = -Math.PI / 2;
  parent.add(mesh);
}

function makeSignTexture(text: string): Texture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#2c2c2c';
  ctx.fillRect(0, 0, 256, 64);
  ctx.strokeStyle = '#c8a45c';
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 248, 56);
  ctx.fillStyle = '#e7e3da';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 36);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}