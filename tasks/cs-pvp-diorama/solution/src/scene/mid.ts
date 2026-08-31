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
  DoubleSide,
} from 'three';
import { concreteMaterial, metalMaterial, toonMaterial, woodMaterial } from '../util/materials';
import { makeCrate, makeSandbags, makePallet, makeCardboardStack, makeOilDrum, makeTireStack, makeBarbedWire } from './cover';

// Mid lane: central duel lane between T and CT, with high walls, double iron doors, drainage.
export function buildMid(): Group {
  const g = new Group();
  g.name = 'mid';

  // High concrete walls on each side
  for (const sx of [-1.6, 1.6]) {
    const wall = new Mesh(
      new BoxGeometry(0.5, 1.8, 4.4),
      concreteMaterial(0x605d56, 3),
    );
    wall.position.set(sx, 0.9, 0);
    wall.castShadow = true;
    wall.receiveShadow = true;
    g.add(wall);
    // top edge band
    const topBand = new Mesh(
      new BoxGeometry(0.55, 0.06, 4.4),
      toonMaterial(0x3a3530),
    );
    topBand.position.set(sx, 1.83, 0);
    g.add(topBand);
  }

  // Shooting slits on each high wall
  for (const [sx, dz] of [
    [-1.86, -1.4],
    [-1.86, 1.4],
    [1.86, -1.4],
    [1.86, 1.4],
  ]) {
    const slit = new Mesh(
      new BoxGeometry(0.06, 0.18, 0.5),
      toonMaterial(0x101013),
    );
    slit.position.set(sx, 1.4, dz);
    g.add(slit);
    // slit frame
    const frame = new Mesh(
      new BoxGeometry(0.06, 0.22, 0.6),
      toonMaterial(0x2a2620),
    );
    frame.position.set(sx - (sx < 0 ? -0.01 : 0.01), 1.4, dz);
    g.add(frame);
  }

  // Double iron doors (half-open, classic mid duel gap)
  const doors = new Group();
  // left door
  const doorL = new Mesh(
    new BoxGeometry(0.08, 1.7, 0.9),
    metalMaterial(0x3a3530),
  );
  doorL.position.set(-0.4, 0.85, 0);
  doorL.rotation.y = 0.5;
  doors.add(doorL);
  // right door
  const doorR = new Mesh(
    new BoxGeometry(0.08, 1.7, 0.9),
    metalMaterial(0x3a3530),
  );
  doorR.position.set(0.4, 0.85, 0);
  doorR.rotation.y = -0.5;
  doors.add(doorR);
  // door rivets / details
  for (const dx of [-0.4, 0.4]) {
    for (const dz of [-0.3, 0.0, 0.3]) {
      const rivet = new Mesh(
        new CylinderGeometry(0.02, 0.02, 0.04, 6),
        toonMaterial(0x1a1614),
      );
      rivet.rotation.z = Math.PI / 2;
      rivet.position.set(dx + (dx < 0 ? -0.04 : 0.04), 0.85, dz);
      doors.add(rivet);
    }
  }
  // Door frame
  const frameL = new Mesh(new BoxGeometry(0.1, 1.8, 0.1), toonMaterial(0x1a1614));
  frameL.position.set(-0.85, 0.9, 0);
  doors.add(frameL);
  const frameR = frameL.clone();
  frameR.position.x = 0.85;
  doors.add(frameR);
  const frameT = new Mesh(new BoxGeometry(1.7, 0.1, 0.1), toonMaterial(0x1a1614));
  frameT.position.set(0, 1.85, 0);
  doors.add(frameT);
  g.add(doors);

  // Drainage channel running across mid (under the iron doors area, between -0.85 and 0.85)
  const drain = new Group();
  const channel = new Mesh(
    new BoxGeometry(1.7, 0.1, 0.45),
    concreteMaterial(0x4a463f, 1),
  );
  channel.position.set(0, 0.1, 0);
  drain.add(channel);
  // grate (dark iron grid)
  const grateTex = makeGrateTexture();
  const grateMat = new MeshToonMaterial({
    map: grateTex,
    color: 0x4a443d,
  });
  const grate = new Mesh(new PlaneGeometry(1.6, 0.4), grateMat);
  grate.rotation.x = -Math.PI / 2;
  grate.position.set(0, 0.16, 0);
  drain.add(grate);
  g.add(drain);

  // Low wall cover on CT side (south of iron doors, ~z = +1.5)
  const lowWall = new Mesh(
    new BoxGeometry(1.6, 0.5, 0.25),
    concreteMaterial(0x6a665e, 1),
  );
  lowWall.position.set(0, 0.25, 1.5);
  lowWall.castShadow = true;
  lowWall.receiveShadow = true;
  g.add(lowWall);
  // crates & road sign behind low wall
  const lc1 = makeCrate(0.45, 0x7a5a36);
  lc1.position.set(-0.5, 0.23, 1.5);
  g.add(lc1);
  const lc2 = makeCrate(0.4, 0x8a6238);
  lc2.position.set(-0.45, 0.45, 1.55);
  lc2.rotation.y = 0.5;
  g.add(lc2);
  // Road sign leaning
  const signPost = new Mesh(
    new BoxGeometry(0.06, 1.0, 0.06),
    woodMaterial(0x6a4a2c),
  );
  signPost.position.set(0.5, 0.5, 1.5);
  signPost.rotation.z = 0.18;
  g.add(signPost);
  const signBoard = new Mesh(
    new BoxGeometry(0.5, 0.5, 0.04),
    new MeshToonMaterial({ map: makeSignTexture('FREIGHT 7'), transparent: true }),
  );
  signBoard.position.set(0.4, 1.0, 1.5);
  signBoard.rotation.z = 0.18;
  g.add(signBoard);

  // Alley passage on the LEFT (between mid walls and T spawn)
  buildAlley(g, -3.2, 0);

  // Right elevated flank — raised concrete slab with stairs
  buildRightFlank(g, 3.2, 0);

  // Side cover: sandbags mid-south
  const sb = makeSandbags(4);
  sb.position.set(0.9, 0, 2.3);
  g.add(sb);

  // Pallet
  const p = makePallet();
  p.position.set(-0.9, 0, 2.3);
  g.add(p);

  // Oil drum
  const drum = makeOilDrum(0.85, 0.26);
  drum.position.set(0, 0, 2.5);
  g.add(drum);

  // Tire stack
  const ts = makeTireStack(2);
  ts.position.set(-0.7, 0, 2.7);
  g.add(ts);

  // Cardboard stack
  const cs = makeCardboardStack(91);
  cs.position.set(0.7, 0, 2.7);
  g.add(cs);

  // Ceiling lights hanging across mid
  for (const lz of [-1.6, 1.6]) {
    const lamp = new Group();
    // cable
    const cable = new Mesh(
      new BoxGeometry(0.02, 0.6, 0.02),
      toonMaterial(0x141416),
    );
    cable.position.y = 2.2;
    lamp.add(cable);
    // fixture
    const fixture = new Mesh(
      new BoxGeometry(0.4, 0.05, 0.18),
      metalMaterial(0x3a3530),
    );
    fixture.position.y = 1.9;
    lamp.add(fixture);
    // bulb plate
    const plate = new Mesh(
      new PlaneGeometry(0.36, 0.16),
      new MeshToonMaterial({ color: 0xfff0c8, emissive: 0xffd58a, emissiveIntensity: 1.2 }),
    );
    plate.rotation.x = Math.PI / 2;
    plate.position.y = 1.87;
    lamp.add(plate);
    lamp.position.set(0, 0, lz);
    g.add(lamp);
  }

  // Graffiti decal on left high wall (visible from CT pushing north)
  addGraffiti(g, -1.85, 1.2, -0.5, 0.8, 0.5, 'MID', 0xc8a45c);

  return g;
}

// Narrow left alley between mid and A-site.
function buildAlley(parent: Group, x: number, z: number): void {
  const alley = new Group();
  // left wall (west)
  const lw = new Mesh(
    new BoxGeometry(0.2, 1.6, 4.0),
    concreteMaterial(0x575450, 2),
  );
  lw.position.set(-0.5, 0.8, 0);
  alley.add(lw);
  // right wall (east, lower, with broken top)
  const rw = new Mesh(
    new BoxGeometry(0.2, 1.0, 4.0),
    concreteMaterial(0x4a463f, 2),
  );
  rw.position.set(0.5, 0.5, 0);
  alley.add(rw);
  // debris (broken concrete chunks)
  for (let i = 0; i < 6; i++) {
    const chunk = new Mesh(
      new BoxGeometry(0.15 + Math.random() * 0.2, 0.1, 0.1 + Math.random() * 0.2),
      concreteMaterial(0x6a665e, 1),
    );
    chunk.position.set(-0.2 + Math.random() * 0.4, 0.05, -1.8 + i * 0.7);
    chunk.rotation.y = Math.random() * Math.PI;
    alley.add(chunk);
  }
  // Power pole
  const pole = new Mesh(
    new CylinderGeometry(0.05, 0.07, 2.4, 6),
    woodMaterial(0x5a3e22),
  );
  pole.position.set(-0.6, 1.2, -1.5);
  alley.add(pole);
  // cross arm
  const arm = new Mesh(new BoxGeometry(0.5, 0.05, 0.05), woodMaterial(0x5a3e22));
  arm.position.set(-0.6, 2.1, -1.5);
  alley.add(arm);
  // wires (simple boxes)
  for (const zw of [-1.5, -1.0, -0.5]) {
    const wire = new Mesh(
      new BoxGeometry(0.005, 0.005, 1.0),
      toonMaterial(0x141416),
    );
    wire.position.set(-0.6, 2.05, zw);
    alley.add(wire);
  }
  alley.position.set(x, 0, z);
  parent.add(alley);
}

// Right elevated flank — raised slab with stairs, looks down on mid.
function buildRightFlank(parent: Group, x: number, z: number): void {
  const flank = new Group();
  // support pillars
  for (const lx of [-0.8, 0.8]) {
    const p = new Mesh(new BoxGeometry(0.2, 1.6, 0.2), concreteMaterial(0x6a665e, 1));
    p.position.set(lx, 0.8, 0);
    flank.add(p);
  }
  // top slab
  const slab = new Mesh(
    new BoxGeometry(2.0, 0.1, 1.6),
    concreteMaterial(0x7a766e, 1),
  );
  slab.position.set(0, 1.65, 0);
  slab.castShadow = true;
  slab.receiveShadow = true;
  flank.add(slab);
  // railing
  for (const rx of [-1.0, 1.0]) {
    const r = new Mesh(new BoxGeometry(0.04, 0.4, 1.6), metalMaterial(0x4a443d));
    r.position.set(rx, 1.9, 0);
    flank.add(r);
  }
  const rf = new Mesh(new BoxGeometry(2.0, 0.4, 0.04), metalMaterial(0x4a443d));
  rf.position.set(0, 1.9, 0.8);
  flank.add(rf);
  const rb = rf.clone();
  rb.position.z = -0.8;
  flank.add(rb);
  // Stairs
  for (let i = 0; i < 6; i++) {
    const step = new Mesh(
      new BoxGeometry(0.6, 0.18, 0.3),
      concreteMaterial(0x6a665e, 1),
    );
    step.position.set(0, 0.09 + i * 0.18, 1.2 + i * 0.3);
    flank.add(step);
  }
  // Crate on top
  const c = makeCrate(0.5, 0x7a5a36);
  c.position.set(-0.5, 1.7, 0);
  flank.add(c);
  // Sandbag
  const sb = makeSandbags(3);
  sb.position.set(0.6, 1.7, 0.3);
  flank.add(sb);
  flank.position.set(x, 0, z);
  parent.add(flank);
}

function makeGrateTexture(): Texture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 64);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, 128, 64);
  ctx.fillStyle = '#3a3530';
  for (let x = 0; x < 128; x += 8) {
    ctx.fillRect(x, 0, 4, 64);
  }
  // water glimmer
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = 'rgba(140,180,200,0.3)';
    const x = Math.random() * 128;
    const y = Math.random() * 64;
    ctx.fillRect(x, y, 2, 2);
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

function makeSignTexture(text: string): Texture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#1a5a2a';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#e7e3da';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 112, 112);
  ctx.fillStyle = '#e7e3da';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < text.length; i += 8) {
    ctx.fillText(text.slice(i, i + 8), 64, 40 + Math.floor(i / 8) * 22);
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

function addGraffiti(parent: Group, x: number, y: number, z: number, w: number, h: number, text: string, colorHex: number): void {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 256, 128);
  const color = '#' + colorHex.toString(16).padStart(6, '0');
  ctx.fillStyle = color;
  ctx.font = 'bold 56px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 72);
  for (let i = 0; i < 14; i++) {
    const x = Math.random() * 256;
    const y = 96 + Math.random() * 30;
    ctx.fillRect(x, y, 2 + Math.random() * 2, 6 + Math.random() * 12);
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  const mat = new MeshToonMaterial({ map: tex, transparent: true });
  const mesh = new Mesh(new PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = sxToRotation(x);
  parent.add(mesh);
}

function sxToRotation(x: number): number {
  return x < 0 ? Math.PI / 2 : -Math.PI / 2;
}