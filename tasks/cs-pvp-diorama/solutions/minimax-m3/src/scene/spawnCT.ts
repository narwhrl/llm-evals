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
  ConeGeometry,
  SphereGeometry,
  CircleGeometry,
} from 'three';

import { concreteMaterial, metalMaterial, toonMaterial, woodMaterial } from '../util/materials';
import { makeJerseyBarrier, makeBollard, makeCrate, makeSandbags, makeCardboardStack, makePallet } from './cover';

// CT-spawn: south side of the base.
export function buildSpawnCT(): Group {
  const g = new Group();
  g.name = 'spawnCT';
  g.position.set(0, 0.05, 4.0);

  // Rear wall
  const wall = new Mesh(
    new BoxGeometry(7.6, 1.6, 0.25),
    concreteMaterial(0x575450, 3),
  );
  wall.position.set(0, 0.8, 0.7);
  wall.castShadow = true;
  wall.receiveShadow = true;
  g.add(wall);
  // Corner pillars
  for (const px of [-3.7, 3.7]) {
    const post = new Mesh(new BoxGeometry(0.35, 1.6, 0.35), concreteMaterial(0x6a6863, 2));
    post.position.set(px, 0.8, 0.7);
    g.add(post);
  }

  // Police shield wall (stacked with police crests)
  for (const px of [-1.4, 0, 1.4]) {
    const shield = new Mesh(
      new BoxGeometry(0.5, 1.0, 0.08),
      metalMaterial(0x3a4458),
    );
    shield.position.set(px, 0.5, 0);
    shield.rotation.z = -0.05;
    g.add(shield);
  }

  // Police van (left)
  buildPoliceVan(g, -2.4, 0.05);
  // Police crests on wall
  addBadge(g, -2.4, 1.2, 0.58);
  addBadge(g, 2.4, 1.2, 0.58);
  // Vest / helmet storage box
  buildVestBox(g, 2.6, 0.55);
  buildVestBox(g, 3.2, 0.55);

  // Raised platform with searchlight (right side)
  buildRaisedPlatform(g, 2.4, 0);

  // Stairs up to platform
  for (let i = 0; i < 5; i++) {
    const step = new Mesh(
      new BoxGeometry(0.6, 0.12, 0.25),
      concreteMaterial(0x6a665e, 1),
    );
    step.position.set(3.4 - i * 0.0, 0.12 + i * 0.12, -0.6 + i * 0.25);
    g.add(step);
  }

  // Cover: jersey barriers in front
  const jb1 = makeJerseyBarrier(1.2);
  jb1.position.set(-2.6, 0, -0.6);
  g.add(jb1);
  const jb2 = makeJerseyBarrier(1.2);
  jb2.position.set(2.6, 0, -0.6);
  jb2.rotation.y = Math.PI;
  g.add(jb2);

  // Bollards along approach
  for (const bx of [-1.0, 0, 1.0]) {
    const b = makeBollard();
    b.position.set(bx, 0, -0.3);
    g.add(b);
  }

  // Crates near platform base
  const crate1 = makeCrate(0.6, 0x6a4a30);
  crate1.position.set(1.6, 0, -0.3);
  g.add(crate1);
  const crate2 = makeCrate(0.55, 0x8a6238);
  crate2.position.set(1.7, 0.55, -0.3);
  crate2.rotation.y = 0.4;
  g.add(crate2);

  // Sandbags
  const sb = makeSandbags(3);
  sb.position.set(-1.5, 0, -0.2);
  g.add(sb);

  // Pallet stack
  const p = makePallet();
  p.position.set(0.4, 0, -0.6);
  g.add(p);
  const p2 = makePallet();
  p2.position.set(0.45, 0.05, -0.55);
  p2.rotation.y = 0.3;
  g.add(p2);

  // Cardboard stack
  const cs = makeCardboardStack(33);
  cs.position.set(-3.3, 0, 0);
  g.add(cs);

  // Side walls (east / west of CT approach)
  for (const sx of [-3.8, 3.8]) {
    const sw = new Mesh(
      new BoxGeometry(0.2, 1.4, 1.5),
      concreteMaterial(0x4d4a45, 2),
    );
    sw.position.set(sx, 0.7, -0.05);
    g.add(sw);
  }

  // Caution tape stripe across the wall
  addCautionStripe(g, 0, 1.5, 0.58);

  // Warning sign
  const warn = new Mesh(
    new PlaneGeometry(0.7, 0.7),
    new MeshToonMaterial({ map: makeWarningTexture(), transparent: true }),
  );
  warn.position.set(-1.6, 1.0, 0.58);
  g.add(warn);

  return g;
}

function buildPoliceVan(parent: Group, x: number, z: number): void {
  const van = new Group();
  const body = new Mesh(new BoxGeometry(1.4, 1.4, 2.6), metalMaterial(0xd4d8de));
  body.position.set(0, 0.85, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  van.add(body);
  // Roof
  const roof = new Mesh(new BoxGeometry(1.45, 0.05, 2.65), toonMaterial(0xa0a4aa));
  roof.position.set(0, 1.57, 0);
  van.add(roof);
  // Windshield
  const wind = new Mesh(new BoxGeometry(1.42, 0.5, 0.04), toonMaterial(0x2a3644));
  wind.position.set(0, 1.15, 1.32);
  van.add(wind);
  // Side windows
  for (const sx of [-0.72, 0.72]) {
    const sw = new Mesh(new BoxGeometry(0.04, 0.5, 1.2), toonMaterial(0x2a3644));
    sw.position.set(sx, 1.05, 0);
    van.add(sw);
  }
  // Light bar
  const bar = new Mesh(new BoxGeometry(1.1, 0.12, 0.3), toonMaterial(0x1a1a1c));
  bar.position.set(0, 1.7, 0);
  van.add(bar);
  // Red/blue lenses
  for (const [lx, lz, color, em] of [
    [-0.35, 0.16, 0xc0303a, 0x6a1820],
    [0.35, 0.16, 0x3058c8, 0x18306a],
  ]) {
    const lens = new Mesh(
      new BoxGeometry(0.3, 0.08, 0.02),
      new MeshToonMaterial({ color, emissive: em, emissiveIntensity: 0.6 }),
    );
    lens.position.set(lx, 1.72, lz);
    van.add(lens);
  }
  // Police decal on side
  const decal = new Mesh(
    new PlaneGeometry(1.2, 0.4),
    new MeshToonMaterial({ map: makePoliceTexture(), transparent: true }),
  );
  decal.position.set(0.71, 1.05, 0);
  decal.rotation.y = Math.PI / 2;
  van.add(decal);
  // Wheels
  for (const sx of [-0.7, 0.7]) {
    for (const wz of [-0.95, 0.95]) {
      const w = new Mesh(new CylinderGeometry(0.28, 0.28, 0.18, 12), toonMaterial(0x101013));
      w.rotation.z = Math.PI / 2;
      w.position.set(sx, 0.28, wz);
      van.add(w);
    }
  }
  van.position.set(x, 0, z);
  parent.add(van);
}

function buildRaisedPlatform(parent: Group, x: number, z: number): void {
  const platform = new Group();
  // legs
  for (const [lx, lz] of [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]]) {
    const leg = new Mesh(new BoxGeometry(0.18, 0.9, 0.18), concreteMaterial(0x6a665e, 1));
    leg.position.set(lx, 0.45, lz);
    platform.add(leg);
  }
  // top
  const top = new Mesh(new BoxGeometry(1.5, 0.1, 1.5), concreteMaterial(0x7a766e, 1));
  top.position.set(0, 0.95, 0);
  top.castShadow = true;
  top.receiveShadow = true;
  platform.add(top);
  // railing
  for (const [px, pz, rx, rz] of [
    [-0.75, 0, 0.05, 1.5],
    [0.75, 0, 0.05, 1.5],
    [0, -0.75, 1.5, 0.05],
    [0, 0.75, 1.5, 0.05],
  ]) {
    const r = new Mesh(new BoxGeometry(rx, 0.5, rz), metalMaterial(0x4a443d));
    r.position.set(px, 1.25, pz);
    platform.add(r);
  }
  // Searchlight on tripod
  const tripod = new Group();
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const leg = new Mesh(new BoxGeometry(0.05, 1.0, 0.05), metalMaterial(0x3a3530));
    leg.position.set(Math.cos(a) * 0.2, 0.5, Math.sin(a) * 0.2);
    leg.rotation.z = -Math.cos(a) * 0.2;
    leg.rotation.x = Math.sin(a) * 0.2;
    tripod.add(leg);
  }
  const head = new Mesh(new CylinderGeometry(0.18, 0.22, 0.25, 12), metalMaterial(0x3a3530));
  head.position.y = 1.0;
  head.rotation.z = 0.6;
  tripod.add(head);
  // Lens
  const lens = new Mesh(
    new CircleGeometry(0.18, 16),
    new MeshToonMaterial({ color: 0xfff0c8, emissive: 0xffd58a, emissiveIntensity: 1.2 }),
  );

  lens.position.set(0.13, 1.0, 0);
  lens.rotation.z = Math.PI / 2;
  lens.rotation.y = -0.6;
  tripod.add(lens);
  tripod.position.set(0, 1.0, 0);
  platform.add(tripod);
  platform.position.set(x, 0, z);
  parent.add(platform);
}




function buildVestBox(parent: Group, x: number, z: number): void {
  const box = new Group();
  const body = new Mesh(new BoxGeometry(0.5, 0.45, 0.35), woodMaterial(0x7a5a36));
  body.position.y = 0.225;
  box.add(body);
  // helmet on top
  const helmet = new Mesh(new SphereGeometry(0.12, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), toonMaterial(0x3a4458));
  helmet.position.y = 0.49;
  box.add(helmet);
  // vest drape
  const vest = new Mesh(new BoxGeometry(0.4, 0.3, 0.04), toonMaterial(0x2a3644));
  vest.position.set(0, 0.4, 0.18);
  vest.rotation.z = -0.1;
  box.add(vest);
  box.position.set(x, 0, z);
  parent.add(box);
}

function addBadge(parent: Group, x: number, y: number, z: number): void {
  const tex = makeBadgeTexture();
  const mat = new MeshToonMaterial({ map: tex, transparent: true });
  const m = new Mesh(new PlaneGeometry(0.4, 0.4), mat);
  m.position.set(x, y, z);
  parent.add(m);
}

function addCautionStripe(parent: Group, x: number, y: number, z: number): void {
  const tex = makeCautionStripeTexture();
  const mat = new MeshToonMaterial({ map: tex, transparent: true });
  const m = new Mesh(new PlaneGeometry(3.0, 0.15), mat);
  m.position.set(x, y, z);
  parent.add(m);
}

function makePoliceTexture(): Texture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 64);
  ctx.fillStyle = '#2a3644';
  ctx.fillRect(0, 0, 128, 64);
  ctx.fillStyle = '#e7e3da';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CT POLICE', 64, 36);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function makeBadgeTexture(): Texture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);
  // shield outline
  ctx.fillStyle = '#2a3644';
  ctx.beginPath();
  ctx.moveTo(64, 12);
  ctx.lineTo(110, 28);
  ctx.lineTo(110, 64);
  ctx.lineTo(64, 116);
  ctx.lineTo(18, 64);
  ctx.lineTo(18, 28);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#c8a45c';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#c8a45c';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CT', 64, 70);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function makeCautionStripeTexture(): Texture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 32;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 256, 32);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, 256, 32);
  ctx.fillStyle = '#c8a847';
  for (let x = -32; x < 256; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 16, 0);
    ctx.lineTo(x + 32, 32);
    ctx.lineTo(x + 16, 32);
    ctx.closePath();
    ctx.fill();
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function makeWarningTexture(): Texture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#c8a847';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 112, 112);
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('!', 64, 72);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}