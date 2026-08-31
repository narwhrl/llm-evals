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
  SphereGeometry,
  ConeGeometry,
} from 'three';
import { concreteMaterial, metalMaterial, toonMaterial, woodMaterial } from '../util/materials';
import { makeCrate, makeDumpster, makePallet, makeTireStack, makeJerseyBarrier } from './cover';

// B-site: two-story tin guardhouse + outdoor cover, north-east quadrant.
export function buildSiteB(): Group {
  const g = new Group();
  g.name = 'siteB';
  g.position.set(3.0, 0.05, -2.0);

  // Two-story guardhouse (tin)
  const gh = new Group();
  // first floor walls
  for (const [px, pz, sx, sz, rotY] of [
    [0, -0.7, 1.8, 0.12, 0], // back wall
    [0, 0.5, 1.8, 0.12, 0], // front wall (with door gap)
    [-0.9, -0.1, 0.12, 1.2, 0], // left wall
    [0.9, -0.1, 0.12, 1.2, 0], // right wall
  ]) {
    const w = new Mesh(
      new BoxGeometry(sx, 1.4, sz),
      metalMaterial(0x6a655c),
    );
    w.position.set(px, 0.7, pz);
    w.castShadow = true;
    w.receiveShadow = true;
    gh.add(w);
  }
  // corrugated ribs on walls
  for (let z = -0.6; z <= 0.4; z += 0.18) {
    const rib = new Mesh(
      new BoxGeometry(1.82, 1.36, 0.02),
      metalMaterial(0x4a443d),
    );
    rib.position.set(0, 0.7, z);
    gh.add(rib);
  }
  // Front door (open inwards)
  const door = new Mesh(
    new BoxGeometry(0.7, 1.4, 0.06),
    metalMaterial(0x4a443d),
  );
  door.position.set(-0.35, 0.7, 0.55);
  door.rotation.y = 1.2;
  gh.add(door);
  // Window (broken)
  const win = new Mesh(
    new BoxGeometry(0.6, 0.5, 0.04),
    metalMaterial(0x2a3644),
  );
  win.position.set(0.5, 0.95, 0.57);
  gh.add(win);
  // Window pane broken with cracks
  const winCrack = new Mesh(
    new BoxGeometry(0.5, 0.4, 0.02),
    new MeshToonMaterial({ map: makeBrokenGlassTexture(), transparent: true }),
  );
  winCrack.position.set(0.5, 0.95, 0.59);
  gh.add(winCrack);

  // First floor interior desk
  const desk = new Mesh(
    new BoxGeometry(0.9, 0.5, 0.45),
    woodMaterial(0x6a4a2c),
  );
  desk.position.set(0.3, 0.25, -0.2);
  gh.add(desk);
  const chair = new Mesh(
    new BoxGeometry(0.3, 0.5, 0.3),
    toonMaterial(0x1a1a1c),
  );
  chair.position.set(0.3, 0.25, 0.1);
  chair.rotation.z = 0.2;
  gh.add(chair);
  // Cabinet (iron locker)
  const cab = new Mesh(
    new BoxGeometry(0.35, 1.0, 0.4),
    metalMaterial(0x5a4d3a),
  );
  cab.position.set(-0.7, 0.5, -0.5);
  gh.add(cab);
  // Coffee cans on desk
  for (const cx of [0.05, 0.2, 0.45]) {
    const can = new Mesh(
      new CylinderGeometry(0.04, 0.04, 0.1, 8),
      metalMaterial(0x9a6232),
    );
    can.position.set(cx, 0.55, -0.2);
    gh.add(can);
  }
  // Old newspaper
  const paper = new Mesh(
    new BoxGeometry(0.25, 0.01, 0.3),
    new MeshToonMaterial({ map: makeNewspaperTexture(), transparent: true }),
  );
  paper.position.set(0.45, 0.51, -0.15);
  paper.rotation.y = -0.4;
  gh.add(paper);

  // First floor ceiling / second floor base
  const slab = new Mesh(
    new BoxGeometry(1.85, 0.08, 1.3),
    concreteMaterial(0x5a5750, 1),
  );
  slab.position.set(0, 1.44, -0.1);
  gh.add(slab);

  // Second floor (smaller footprint)
  const s2 = new Group();
  for (const [px, pz, sx, sz] of [
    [0, -0.55, 1.5, 0.1], // back
    [0, 0.45, 1.5, 0.1], // front
    [-0.75, -0.05, 0.1, 1.0], // left
    [0.75, -0.05, 0.1, 1.0], // right
  ]) {
    const w = new Mesh(
      new BoxGeometry(sx, 1.1, sz),
      metalMaterial(0x787068),
    );
    w.position.set(px, 2.0, pz);
    w.castShadow = true;
    w.receiveShadow = true;
    s2.add(w);
  }
  // Pitched roof (gable)
  const roof = new Mesh(
    new BoxGeometry(1.55, 0.04, 1.1),
    metalMaterial(0x4a443d),
  );
  roof.position.set(0, 2.58, -0.05);
  roof.rotation.x = -0.25;
  s2.add(roof);
  // Roof ridge
  const ridge = new Mesh(
    new BoxGeometry(1.55, 0.04, 0.06),
    toonMaterial(0x2a2620),
  );
  ridge.position.set(0, 2.74, -0.05);
  ridge.rotation.x = -0.25;
  s2.add(ridge);

  // Second floor balcony (front)
  const balconyFloor = new Mesh(
    new BoxGeometry(1.6, 0.06, 0.6),
    concreteMaterial(0x5a5750, 1),
  );
  balconyFloor.position.set(0, 1.48, 0.7);
  s2.add(balconyFloor);
  // Railing
  for (const px of [-0.75, 0.75]) {
    const r = new Mesh(new BoxGeometry(0.04, 0.5, 0.6), metalMaterial(0x3a3530));
    r.position.set(px, 1.74, 0.7);
    s2.add(r);
  }
  const railF = new Mesh(new BoxGeometry(1.6, 0.5, 0.04), metalMaterial(0x3a3530));
  railF.position.set(0, 1.74, 1.0);
  s2.add(railF);

  // Fire escape ladder (right side, climbs from ground to balcony)
  const ladder = new Group();
  for (const sx of [-0.1, 0.1]) {
    const r = new Mesh(new BoxGeometry(0.05, 2.4, 0.05), metalMaterial(0x3a3530));
    r.position.set(sx, 1.2, 0);
    ladder.add(r);
  }
  for (let i = 0; i < 9; i++) {
    const rung = new Mesh(new BoxGeometry(0.25, 0.04, 0.04), metalMaterial(0x3a3530));
    rung.position.set(0, 0.15 + i * 0.28, 0);
    ladder.add(rung);
  }
  ladder.position.set(0.85, 0, 0.7);
  s2.add(ladder);

  gh.add(s2);
  g.add(gh);

  // Bomb-site B marking on ground in front of guardhouse
  const bMark = new Mesh(
    new PlaneGeometry(1.4, 1.4),
    new MeshToonMaterial({ map: makeBombSiteMarkTexture('B'), transparent: true }),
  );
  bMark.rotation.x = -Math.PI / 2;
  bMark.position.set(0, 0.005, 0.0);
  g.add(bMark);

  // Outdoor cover: pallets
  for (let i = 0; i < 3; i++) {
    const p = makePallet();
    p.position.set(-1.0, 0, 0.6 + i * 0.9);
    g.add(p);
  }
  // Tire stack
  const ts = makeTireStack(2);
  ts.position.set(1.6, 0, 0.4);
  g.add(ts);
  // Dumpster
  const d = makeDumpster();
  d.position.set(-1.3, 0, 1.0);
  d.rotation.y = 0.4;
  g.add(d);
  // Jersey barrier
  const jb = makeJerseyBarrier(1.0);
  jb.position.set(1.6, 0, 1.2);
  g.add(jb);

  // Old bicycle (broken, leaning against wall)
  buildBicycle(g, -0.95, 0.3);

  // Street lamp (B-site corner)
  buildStreetLamp(g, 1.4, -0.5);

  // Crates stacked near pallets
  const crateStack = new Group();
  const c1 = makeCrate(0.5, 0x7a5a36);
  c1.position.y = 0.25;
  crateStack.add(c1);
  const c2 = makeCrate(0.45, 0x8a6238);
  c2.position.y = 0.5;
  c2.rotation.y = 0.3;
  crateStack.add(c2);
  crateStack.position.set(-1.0, 0, 0.3);
  g.add(crateStack);

  // Alley wall east
  const eastWall = new Mesh(
    new BoxGeometry(0.15, 1.4, 2.5),
    concreteMaterial(0x575450, 2),
  );
  eastWall.position.set(1.7, 0.7, 0.6);
  g.add(eastWall);

  return g;
}

function buildBicycle(parent: Group, x: number, z: number): void {
  const bike = new Group();
  // wheels
  for (const wx of [-0.2, 0.2]) {
    const wheel = new Mesh(
      new CylinderGeometry(0.16, 0.16, 0.02, 12),
      toonMaterial(0x141416),
    );
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(wx, 0.16, 0);
    bike.add(wheel);
    // spokes hint
    const spoke = new Mesh(
      new BoxGeometry(0.02, 0.32, 0.005),
      toonMaterial(0x6a6a6e),
    );
    spoke.position.set(wx, 0.16, 0);
    bike.add(spoke);
  }
  // frame
  const frame = new Mesh(
    new BoxGeometry(0.5, 0.05, 0.05),
    toonMaterial(0x7a2222),
  );
  frame.position.set(0, 0.32, 0);
  frame.rotation.y = 0.3;
  bike.add(frame);
  const seat = new Mesh(
    new BoxGeometry(0.04, 0.04, 0.18),
    toonMaterial(0x141416),
  );
  seat.position.set(-0.05, 0.45, 0);
  bike.add(seat);
  const handle = new Mesh(
    new BoxGeometry(0.04, 0.04, 0.18),
    toonMaterial(0x141416),
  );
  handle.position.set(0.2, 0.45, 0);
  bike.add(handle);
  bike.rotation.z = 0.15;
  bike.position.set(x, 0, z);
  parent.add(bike);
}

function buildStreetLamp(parent: Group, x: number, z: number): void {
  const lamp = new Group();
  // base
  const base = new Mesh(new BoxGeometry(0.3, 0.1, 0.3), metalMaterial(0x2a2620));
  base.position.y = 0.05;
  lamp.add(base);
  // post
  const post = new Mesh(
    new CylinderGeometry(0.05, 0.06, 1.8, 8),
    metalMaterial(0x2a2620),
  );
  post.position.y = 0.95;
  lamp.add(post);
  // arm
  const arm = new Mesh(
    new BoxGeometry(0.4, 0.05, 0.05),
    metalMaterial(0x2a2620),
  );
  arm.position.set(0.15, 1.85, 0);
  lamp.add(arm);
  // head
  const head = new Mesh(
    new ConeGeometry(0.18, 0.3, 12),
    metalMaterial(0x3a3530),
  );
  head.position.set(0.32, 1.95, 0);
  head.rotation.z = Math.PI;
  lamp.add(head);
  // bulb (visible warm glow plate)
  const bulb = new Mesh(
    new SphereGeometry(0.08, 8, 6),
    new MeshToonMaterial({ color: 0xffd58a, emissive: 0xffb050, emissiveIntensity: 0.7 }),
  );
  bulb.position.set(0.32, 1.85, 0);
  lamp.add(bulb);
  lamp.position.set(x, 0, z);
  parent.add(lamp);
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

function makeBrokenGlassTexture(): Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = 'rgba(140,170,200,0.35)';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = 'rgba(20,20,30,0.7)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const len = 6 + Math.random() * 20;
    const ang = Math.random() * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    ctx.stroke();
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function makeNewspaperTexture(): Texture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#d4ccaa';
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('DAILY NEWS', 14, 24);
  ctx.font = '10px sans-serif';
  for (let y = 36; y < 124; y += 12) {
    const w = 60 + Math.random() * 50;
    ctx.fillRect(8, y, w, 4);
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}