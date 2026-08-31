import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshToonMaterial,
  CanvasTexture,
  SRGBColorSpace,
  NearestFilter,
  TorusGeometry,
  Texture,
  RepeatWrapping,
  DoubleSide,
} from 'three';
import { toonMaterial, woodMaterial, metalMaterial } from '../util/materials';
import { mulberry32 } from '../util/rng';

// ---- Wooden crate ----
export function makeCrate(size = 0.7, color = 0x8a6238): Group {
  const g = new Group();
  const body = new Mesh(new BoxGeometry(size, size, size), woodMaterial(color));
  body.castShadow = true;
  body.receiveShadow = true;
  g.add(body);
  // edge bands (slightly darker slats on edges)
  const bandColor = 0x4a3220;
  const bandThick = 0.03;
  const bands = [
    new BoxGeometry(size + 0.005, bandThick, bandThick),
    new BoxGeometry(size + 0.005, bandThick, bandThick),
    new BoxGeometry(bandThick, bandThick, size + 0.005),
    new BoxGeometry(bandThick, bandThick, size + 0.005),
  ];
  const positions = [
    [0, size / 2 - bandThick / 2, size / 2 - bandThick / 2],
    [0, -size / 2 + bandThick / 2, size / 2 - bandThick / 2],
    [size / 2 - bandThick / 2, size / 2 - bandThick / 2, 0],
    [-size / 2 + bandThick / 2, size / 2 - bandThick / 2, 0],
  ];
  for (let i = 0; i < bands.length; i++) {
    const m = new Mesh(bands[i], toonMaterial(bandColor));
    m.position.set(positions[i][0], positions[i][1], positions[i][2]);
    g.add(m);
  }
  return g;
}

// ---- Blue metal oil drum ----
export function makeOilDrum(height = 0.95, radius = 0.32): Group {
  const g = new Group();
  const body = new Mesh(
    new CylinderGeometry(radius, radius, height, 16),
    metalMaterial(0x2a4d80),
  );
  body.position.y = height / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  g.add(body);
  // top cap
  const cap = new Mesh(
    new CylinderGeometry(radius * 0.95, radius * 0.95, 0.04, 16),
    toonMaterial(0x4d72b0),
  );
  cap.position.y = height - 0.02;
  g.add(cap);
  // rim rings
  for (const y of [0.05, height * 0.5, height - 0.1]) {
    const ring = new Mesh(
      new TorusGeometry(radius + 0.005, 0.02, 8, 24),
      toonMaterial(0x1a2c4a),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    g.add(ring);
  }
  return g;
}

// ---- Cardboard box stack (corrugated look) ----
export function makeCardboardStack(seed = 1): Group {
  const rng = mulberry32(seed);
  const g = new Group();
  const tex = makeCorrugatedTexture();
  const mat = new MeshToonMaterial({ map: tex, color: 0xb59872 });
  for (let i = 0; i < 3; i++) {
    const w = 0.6 + rng() * 0.3;
    const h = 0.45 + rng() * 0.2;
    const d = 0.5 + rng() * 0.2;
    const b = new Mesh(new BoxGeometry(w, h, d), mat);
    b.position.set((rng() - 0.5) * 0.15, h / 2 + i * (h - 0.05), (rng() - 0.5) * 0.15);
    b.rotation.y = (rng() - 0.5) * 0.2;
    b.castShadow = true;
    b.receiveShadow = true;
    g.add(b);
  }
  return g;
}

// ---- Sandbag cluster ----
export function makeSandbags(count = 4): Group {
  const g = new Group();
  const mat = toonMaterial(0x9a8c66);
  for (let i = 0; i < count; i++) {
    const s = new Mesh(new BoxGeometry(0.55, 0.18, 0.26), mat);
    const row = Math.floor(i / 2);
    const col = i % 2;
    s.position.set(col * 0.5 - 0.25, 0.09 + row * 0.16, 0);
    s.rotation.z = (col === 0 ? 1 : -1) * 0.05;
    s.castShadow = true;
    s.receiveShadow = true;
    g.add(s);
  }
  return g;
}

// ---- Jersey barrier (plastic road barricade) ----
export function makeJerseyBarrier(width = 1.4): Group {
  const g = new Group();
  const base = new Mesh(
    new BoxGeometry(width, 0.18, 0.45),
    toonMaterial(0xd6c056),
  );
  base.position.y = 0.09;
  base.castShadow = true;
  base.receiveShadow = true;
  g.add(base);
  // vertical separator
  const sep = new Mesh(
    new BoxGeometry(width * 0.92, 0.3, 0.06),
    toonMaterial(0xa48a3a),
  );
  sep.position.y = 0.18 + 0.15;
  sep.castShadow = true;
  g.add(sep);
  // reflective stripe
  const stripe = new Mesh(
    new BoxGeometry(width * 0.9, 0.06, 0.46),
    toonMaterial(0xe8e2c2),
  );
  stripe.position.y = 0.18 + 0.06;
  g.add(stripe);
  return g;
}

// ---- Cement bollard ----
export function makeBollard(): Group {
  const g = new Group();
  const body = new Mesh(
    new CylinderGeometry(0.18, 0.22, 0.55, 12),
    toonMaterial(0x9c9890),
  );
  body.position.y = 0.275;
  body.castShadow = true;
  body.receiveShadow = true;
  g.add(body);
  const cap = new Mesh(
    new CylinderGeometry(0.2, 0.18, 0.08, 12),
    toonMaterial(0xb5b0a4),
  );
  cap.position.y = 0.59;
  g.add(cap);
  return g;
}

// ---- Stacked tire ----
export function makeTireStack(count = 3): Group {
  const g = new Group();
  for (let i = 0; i < count; i++) {
    const tire = new Mesh(
      new TorusGeometry(0.32, 0.11, 8, 18),
      toonMaterial(0x18181c),
    );
    tire.rotation.x = Math.PI / 2;
    tire.position.y = 0.11 + i * 0.22;
    tire.castShadow = true;
    tire.receiveShadow = true;
    g.add(tire);
  }
  return g;
}

// ---- Industrial dumpster ----
export function makeDumpster(): Group {
  const g = new Group();
  const w = 1.6;
  const h = 0.7;
  const d = 0.9;
  const body = new Mesh(new BoxGeometry(w, h, d), toonMaterial(0x2c5a3a));
  body.position.y = h / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  g.add(body);
  // lid (slightly open)
  const lid = new Mesh(
    new BoxGeometry(w + 0.02, 0.05, d + 0.02),
    toonMaterial(0x1d3e28),
  );
  lid.position.set(0, h + 0.1, -d / 2 + 0.05);
  lid.rotation.x = -0.2;
  g.add(lid);
  // wheels (front)
  for (const sx of [-0.55, 0.55]) {
    const wheel = new Mesh(
      new CylinderGeometry(0.12, 0.12, 0.1, 12),
      toonMaterial(0x111114),
    );
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(sx, 0.12, d / 2 - 0.05);
    g.add(wheel);
  }
  return g;
}

// ---- Wooden pallet ----
export function makePallet(): Group {
  const g = new Group();
  const wood = toonMaterial(0x6e4a26);
  // top planks
  for (let i = -0.3; i <= 0.3; i += 0.3) {
    const plank = new Mesh(new BoxGeometry(0.9, 0.05, 0.18), wood);
    plank.position.set(0, 0.1, i);
    plank.castShadow = true;
    plank.receiveShadow = true;
    g.add(plank);
  }
  // bottom planks
  for (let i = -0.3; i <= 0.3; i += 0.3) {
    const plank = new Mesh(new BoxGeometry(0.9, 0.06, 0.12), wood);
    plank.position.set(0, 0.03, i);
    g.add(plank);
  }
  return g;
}

// ---- Barbed wire roll (decorative) ----
export function makeBarbedWire(length = 1.2): Group {
  const g = new Group();
  const wire = toonMaterial(0x2a2a2e);
  for (let i = 0; i < 6; i++) {
    const seg = new Mesh(
      new BoxGeometry(length, 0.01, 0.01),
      wire,
    );
    seg.position.y = 0.15 + i * 0.05;
    seg.rotation.y = i * 0.3;
    g.add(seg);
  }
  // posts
  for (const sx of [-length / 2, length / 2]) {
    const post = new Mesh(new BoxGeometry(0.05, 0.5, 0.05), toonMaterial(0x4a4a4e));
    post.position.set(sx, 0.25, 0);
    g.add(post);
  }
  return g;
}

function makeCorrugatedTexture(): Texture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#b59872';
  ctx.fillRect(0, 0, 128, 64);
  ctx.strokeStyle = '#7e6440';
  ctx.lineWidth = 1;
  for (let x = 0; x < 128; x += 4) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 64);
    ctx.stroke();
  }
  // stains
  for (let i = 0; i < 18; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 64;
    ctx.fillStyle = `rgba(60,40,20,${0.05 + Math.random() * 0.15})`;
    ctx.beginPath();
    ctx.arc(x, y, 1 + Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}