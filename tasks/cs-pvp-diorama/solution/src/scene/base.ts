import {
  BoxGeometry,
  Mesh,
  PlaneGeometry,
  Group,
  MeshToonMaterial,
  DoubleSide,
  CanvasTexture,
  SRGBColorSpace,
  NearestFilter,
  RepeatWrapping,
} from 'three';
import { wetAsphaltMaterial, concreteMaterial, toonMaterial } from '../util/materials';
import { applyOutlines } from './outline';

export const BASE_SIZE = 10; // square edge length
export const BASE_THICKNESS = 0.6;

// Top-level group for the entire diorama.
// All scene content lives as children; nothing should sit outside the BASE_SIZE square footprint.
export function buildBase(): Group {
  const root = new Group();
  root.name = 'diorama-root';

  // Concrete base block — the visible "tabletop" the diorama sits on.
  const baseMat = concreteMaterial(0x7d7a73, 4);
  const baseMesh = new Mesh(new BoxGeometry(BASE_SIZE, BASE_THICKNESS, BASE_SIZE), baseMat);
  baseMesh.position.y = -BASE_THICKNESS / 2;
  baseMesh.receiveShadow = true;
  root.add(baseMesh);

  // Bevelled edge highlight: a slightly thinner slab above to read as a top edge.
  const bevel = new Mesh(
    new BoxGeometry(BASE_SIZE - 0.02, 0.04, BASE_SIZE - 0.02),
    toonMaterial(0x4a4944),
  );
  bevel.position.y = 0.02;
  root.add(bevel);

  // Wet asphalt ground on top of the base, slightly inset to leave a concrete margin.
  const asphaltMat = wetAsphaltMaterial();
  const asphalt = new Mesh(
    new PlaneGeometry(BASE_SIZE - 0.4, BASE_SIZE - 0.4),
    asphaltMat,
  );
  asphalt.rotation.x = -Math.PI / 2;
  asphalt.position.y = 0.045;
  asphalt.receiveShadow = true;
  root.add(asphalt);

  // Concrete margin strips (around the asphalt) for the warehouse door approach, curbs, etc.
  const curbMat = concreteMaterial(0x6e6a63, 2);
  const curbThickness = 0.04;
  const curbHeight = 0.12;
  const curbNorth = new Mesh(
    new BoxGeometry(BASE_SIZE - 0.2, curbHeight, curbThickness),
    curbMat,
  );
  curbNorth.position.set(0, 0.045 + curbHeight / 2, -(BASE_SIZE - 0.4) / 2);
  root.add(curbNorth);
  const curbSouth = curbNorth.clone();
  curbSouth.position.z = (BASE_SIZE - 0.4) / 2;
  root.add(curbSouth);
  const curbEast = new Mesh(
    new BoxGeometry(curbThickness, curbHeight, BASE_SIZE - 0.4),
    curbMat,
  );
  curbEast.position.set((BASE_SIZE - 0.4) / 2, 0.045 + curbHeight / 2, 0);
  root.add(curbEast);
  const curbWest = curbEast.clone();
  curbWest.position.x = -(BASE_SIZE - 0.4) / 2;
  root.add(curbWest);

  // Subtle painted yellow lane markings across mid (industrial freight yard look).
  const laneTex = makeLaneMarkingTexture();
  const laneMat = new MeshToonMaterial({
    map: laneTex,
    transparent: true,
    gradientMap: asphaltMat.gradientMap,
    color: 0xffffff,
  });
  const lane = new Mesh(new PlaneGeometry(BASE_SIZE - 0.6, 0.2), laneMat);
  lane.rotation.x = -Math.PI / 2;
  lane.position.set(0, 0.046, 0);
  root.add(lane);

  // Bomb-site markings (white painted "A" / "B" squares) baked into the asphalt near sites.
  const aMarkTex = makeBombSiteTexture('A', 0xe7e3da);
  const aMarkMat = new MeshToonMaterial({
    map: aMarkTex,
    transparent: true,
    gradientMap: asphaltMat.gradientMap,
  });
  const aMark = new Mesh(new PlaneGeometry(1.6, 1.6), aMarkMat);
  aMark.rotation.x = -Math.PI / 2;
  aMark.position.set(-3.4, 0.047, -3.4);
  root.add(aMark);

  const bMarkTex = makeBombSiteTexture('B', 0xe7e3da);
  const bMarkMat = new MeshToonMaterial({
    map: bMarkTex,
    transparent: true,
    gradientMap: asphaltMat.gradientMap,
  });
  const bMark = new Mesh(new PlaneGeometry(1.4, 1.4), bMarkMat);
  bMark.rotation.x = -Math.PI / 2;
  bMark.position.set(3.0, 0.047, -2.0);
  root.add(bMark);

  // T-spawn / CT-spawn zone hint rectangles (thin coloured strips at edges).
  const tSpawnMark = new Mesh(
    new PlaneGeometry(2.0, 0.2),
    new MeshToonMaterial({ color: 0xc8a45c, gradientMap: asphaltMat.gradientMap, transparent: true, opacity: 0.65 }),
  );
  tSpawnMark.rotation.x = -Math.PI / 2;
  tSpawnMark.position.set(0, 0.048, -4.55);
  root.add(tSpawnMark);

  const ctSpawnMark = new Mesh(
    new PlaneGeometry(2.0, 0.2),
    new MeshToonMaterial({ color: 0x4a73c8, gradientMap: asphaltMat.gradientMap, transparent: true, opacity: 0.65 }),
  );
  ctSpawnMark.rotation.x = -Math.PI / 2;
  ctSpawnMark.position.set(0, 0.048, 4.55);
  root.add(ctSpawnMark);

  // Concrete plinth at corners for industrial feel.
  for (const [cx, cz] of [
    [-BASE_SIZE / 2 + 0.4, -BASE_SIZE / 2 + 0.4],
    [BASE_SIZE / 2 - 0.4, -BASE_SIZE / 2 + 0.4],
    [-BASE_SIZE / 2 + 0.4, BASE_SIZE / 2 - 0.4],
    [BASE_SIZE / 2 - 0.4, BASE_SIZE / 2 - 0.4],
  ]) {
    const plinth = new Mesh(
      new BoxGeometry(0.5, 0.25, 0.5),
      concreteMaterial(0x5a5750, 1),
    );
    plinth.position.set(cx, 0.045 + 0.125, cz);
    root.add(plinth);
  }

  applyOutlines(root);
  return root;
}

// Procedural lane stripes for the freight yard.
function makeLaneMarkingTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 32;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 256, 32);
  ctx.fillStyle = '#c8a847';
  for (let x = 0; x < 256; x += 48) {
    ctx.fillRect(x, 8, 28, 16);
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

// Bomb site floor marking: white bordered square with letter.
function makeBombSiteTexture(letter: string, _color: number): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 256, 256);
  // Outer rectangle
  ctx.strokeStyle = '#e7e3da';
  ctx.lineWidth = 10;
  ctx.strokeRect(24, 24, 208, 208);
  // Inner crosshair
  ctx.beginPath();
  ctx.moveTo(128, 24);
  ctx.lineTo(128, 232);
  ctx.moveTo(24, 128);
  ctx.lineTo(232, 128);
  ctx.stroke();
  // Letter
  ctx.fillStyle = '#e7e3da';
  ctx.font = 'bold 160px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 128, 138);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}