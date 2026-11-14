import * as THREE from 'three';
import { CelestiaPalette } from '../core/materials';
import {
  clamp,
  composeMatrix,
  fbm2,
  fbm3,
  lerp,
  mergeParts,
  mulberry32,
  preparePart,
  ridgedFbm3,
  smoothstep,
} from '../core/math';

export interface WaterfallAnchor {
  position: THREE.Vector3;
  outwardDir: THREE.Vector3;
  width: number;
  dropLength: number;
}

export interface CentralIslandData {
  group: THREE.Group;
  getRimPoint: (angle: number) => THREE.Vector3;
  getSurfaceY: (x: number, z: number) => number;
  waterfallAnchors: WaterfallAnchor[];
  treeSpots: THREE.Vector3[];
  dispose: () => void;
}

export function getCentralRimRadius(angle: number): number {
  const stretchX = 1.16;
  const stretchZ = 0.94;
  const ex = Math.cos(angle) * stretchX;
  const ez = Math.sin(angle) * stretchZ;
  const baseEllipse = 186 * Math.hypot(ex, ez);

  // Deterministic headland lobes & coves for unmistakable organic irregular landmass
  const lobes =
    Math.sin(angle * 2 + 0.4) * 19 +
    Math.cos(angle * 3 - 0.85) * 15 +
    Math.sin(angle * 5 + 1.7) * 9.5 +
    Math.cos(angle * 7 - 0.3) * 5.0;
  const rough = fbm2(Math.cos(angle) * 2.2 + 4.1, Math.sin(angle) * 2.2 - 2.7, 4) * 20;
  return baseEllipse + lobes + rough;
}

export function getCentralSurfaceHeight(x: number, z: number): number {
  const r = Math.hypot(x, z);
  const angle = Math.atan2(z, x);
  const rimR = getCentralRimRadius(angle);
  const normR = r / Math.max(1, rimR);

  // Central rise toward the Sanctum podium + gentle rolling Genshin meadows
  const sanctumMound = (1 - smoothstep(0.18, 0.72, normR)) * 22;
  const terraceStep = smoothstep(0.58, 0.42, normR) * 4.5;
  const hills =
    fbm2(x * 0.014 + 1.9, z * 0.014 - 3.2, 4) * 6.5 * smoothstep(0.18, 0.55, normR);
  const rimRoll = -smoothstep(0.84, 1.02, normR) * 5.5;

  return 4 + sanctumMound + terraceStep + hills + rimRoll;
}

function buildGrassCapGeometry(): THREE.BufferGeometry {
  const radialSegs = 96;
  const ringSegs = 32;
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const colCenter = new THREE.Color('#6ec965');
  const colLush = new THREE.Color('#47a855');
  const colSunCrest = new THREE.Color('#8ee067');
  const colRimMoss = new THREE.Color('#589e5a');
  const tmpCol = new THREE.Color();

  for (let ir = 0; ir <= ringSegs; ir++) {
    const t = ir / ringSegs;
    // Concentrate rings near rim for crisp overhanging turf edge
    const rFrac = Math.pow(t, 0.86);

    for (let ia = 0; ia <= radialSegs; ia++) {
      const ang = (ia / radialSegs) * Math.PI * 2;
      const rimR = getCentralRimRadius(ang) * 1.012;
      const rad = rFrac * rimR;
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;

      let y = getCentralSurfaceHeight(x, z);
      if (ir === ringSegs) {
        // Slight turf lip wrapping over cliff edge
        y -= 2.8;
      }

      positions.push(x, y, z);
      uvs.push(x * 0.02, z * 0.02);

      const n = fbm2(x * 0.022 - 4.0, z * 0.022 + 2.5, 3) * 0.5 + 0.5;
      tmpCol.copy(colLush).lerp(colSunCrest, clamp(n * 1.15, 0, 1));
      if (t < 0.35) {
        tmpCol.lerp(colCenter, 0.45);
      } else if (t > 0.88) {
        tmpCol.lerp(colRimMoss, (t - 0.88) / 0.12);
      }
      colors.push(tmpCol.r, tmpCol.g, tmpCol.b);
    }
  }

  const stride = radialSegs + 1;
  for (let ir = 0; ir < ringSegs; ir++) {
    for (let ia = 0; ia < radialSegs; ia++) {
      const a = ir * stride + ia;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      indices.push(a, b, c, b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function buildInvertedCliffCoreGeometry(): THREE.BufferGeometry {
  const radialSegs = 88;
  const vSegs = 38;
  const maxDepth = 455;

  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const topRockCol = new THREE.Color('#ded6c8');
  const midRockCol = new THREE.Color('#b0b6c9');
  const deepRockCol = new THREE.Color('#7f94bf');
  const tmpCol = new THREE.Color();

  for (let iv = 0; iv <= vSegs; iv++) {
    const v = iv / vSegs; // 0 = rim, 1 = deepest stalactite tip
    // Asymmetric drift of the main inverted rock spire so it feels natural & monumental
    const centerShiftX = Math.sin(v * 2.3) * 18 - v * 12;
    const centerShiftZ = Math.cos(v * 1.9) * 14 + v * 8;

    for (let ia = 0; ia <= radialSegs; ia++) {
      const ang = (ia / radialSegs) * Math.PI * 2;
      const rimR = getCentralRimRadius(ang);
      const topX = Math.cos(ang) * rimR;
      const topZ = Math.sin(ang) * rimR;
      const topY = getCentralSurfaceHeight(topX, topZ) - 2.2;

      // Multi-tiered craggy taper profile: wide overhanging shoulder -> chiseled cliffs -> sharp spire tip
      let profile = Math.pow(1 - v, 1.32);
      // Upper cliff overhang bulge
      profile += Math.sin(v * Math.PI) * 0.08 * (1 - v);

      // Quantized strata steps + vertical ridged ravines
      const strata = Math.floor(v * 14) / 14;
      const ridge = ridgedFbm3(
        Math.cos(ang) * 2.6 + 1.3,
        v * 4.5,
        Math.sin(ang) * 2.6 - 2.1,
        4,
      );
      const cragFactor =
        1 +
        (ridge - 0.45) * 0.46 * Math.sin(Math.min(1, v * 1.35) * Math.PI) -
        (v - strata) * 0.22;

      const rad = Math.max(1.8, rimR * profile * cragFactor) * (v === 1 ? 0 : 1);

      // Angular vertical depth modulation so secondary fangs hang at varied depths
      const subFangs =
        (Math.sin(ang * 3 + 0.7) * 0.5 + 0.5) * 26 +
        (Math.cos(ang * 5 - 1.2) * 0.5 + 0.5) * 18;
      const y = lerp(topY, -maxDepth + subFangs * (1 - Math.pow(v, 3)), Math.pow(v, 0.94));

      const x = centerShiftX + Math.cos(ang) * rad;
      const z = centerShiftZ + Math.sin(ang) * rad;

      positions.push(x, y, z);
      uvs.push((ia / radialSegs) * 8, v * 6);

      const mineral = fbm3(x * 0.02, y * 0.02, z * 0.02, 3) * 0.12;
      if (v < 0.35) {
        tmpCol.copy(topRockCol).lerp(midRockCol, v / 0.35);
      } else {
        tmpCol.copy(midRockCol).lerp(deepRockCol, (v - 0.35) / 0.65);
      }
      tmpCol.offsetHSL(0, 0, mineral);
      colors.push(tmpCol.r, tmpCol.g, tmpCol.b);
    }
  }

  const stride = radialSegs + 1;
  for (let iv = 0; iv < vSegs; iv++) {
    for (let ia = 0; ia < radialSegs; ia++) {
      const a = iv * stride + ia;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      indices.push(a, b, c, b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function createChiseledStalactitePrism(
  topRadius: number,
  height: number,
  sides: number,
  seed: number,
  colorTop: THREE.Color,
  colorBottom: THREE.Color,
): THREE.BufferGeometry {
  const geo = new THREE.CylinderGeometry(topRadius, topRadius * 0.06, height, sides, 4, false);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);
  const tmp = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);
    const t = clamp(0.5 - y / height, 0, 1); // 0 = top, 1 = bottom tip

    const n = fbm3(x * 0.06 + seed, y * 0.04, z * 0.06 - seed, 3);
    const flare = t < 0.25 ? 1 + t * 0.55 : 1 - (t - 0.25) * 0.25;
    x *= flare * (1 + n * 0.28);
    z *= flare * (1 + n * 0.28);
    if (t > 0.92) {
      x *= 0.15;
      z *= 0.15;
    }
    pos.setXYZ(i, x, y, z);

    tmp.copy(colorTop).lerp(colorBottom, t);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

function buildCliffCragsGeometry(): THREE.BufferGeometry {
  const rand = mulberry32(77123);
  const parts: THREE.BufferGeometry[] = [];
  const colTop = new THREE.Color('#ded5c6');
  const colMid = new THREE.Color('#aeb5c8');
  const colDeep = new THREE.Color('#7d92bd');

  // 1. Overhanging rim crags & vertical cliff buttress ribs around perimeter
  const rimCount = 76;
  for (let i = 0; i < rimCount; i++) {
    const ang = (i / rimCount) * Math.PI * 2 + (rand() - 0.5) * 0.06;
    const rimR = getCentralRimRadius(ang);
    const rad = rimR * (0.93 + rand() * 0.09);
    const x = Math.cos(ang) * rad;
    const z = Math.sin(ang) * rad;
    const surfY = getCentralSurfaceHeight(x, z);

    const h = 48 + rand() * 98;
    const w = 11 + rand() * 16;
    const sides = 5 + Math.floor(rand() * 3);

    const prism = createChiseledStalactitePrism(w, h, sides, i * 3.7, colTop, colMid);
    const tiltOut = -0.06 + (rand() - 0.5) * 0.14;
    const m = composeMatrix(
      x,
      surfY - h * 0.48 - 2,
      z,
      Math.sin(ang) * tiltOut,
      rand() * Math.PI * 2,
      -Math.cos(ang) * tiltOut,
      1,
      1,
      0.78 + rand() * 0.42,
    );
    parts.push(preparePart(prism, m));
    prism.dispose();
  }

  // 2. Massive secondary inverted stalactite fangs clustering around the lower cliff
  const fangCount = 44;
  for (let i = 0; i < fangCount; i++) {
    const ang = (i / fangCount) * Math.PI * 2 + rand() * 0.14;
    const depthTier = rand();
    const rimR = getCentralRimRadius(ang);
    const rad = rimR * lerp(0.68, 0.16, depthTier);
    const h = lerp(95, 195, depthTier) * (0.8 + rand() * 0.45);
    const w = lerp(16, 28, 1 - depthTier * 0.45);
    const yCenter = -lerp(85, 245, depthTier);

    const prism = createChiseledStalactitePrism(w, h, 6, 200 + i * 5.1, colMid, colDeep);
    const m = composeMatrix(
      Math.cos(ang) * rad - depthTier * 10,
      yCenter,
      Math.sin(ang) * rad + depthTier * 6,
      (rand() - 0.5) * 0.1,
      rand() * Math.PI * 2,
      (rand() - 0.5) * 0.1,
      1,
      1,
      0.85 + rand() * 0.3,
    );
    parts.push(preparePart(prism, m));
    prism.dispose();
  }

  return mergeParts(parts);
}

/**
 * Builds the ancient weathered ruins faintly visible inside the giant inverted rock cliff
 * ("下方是巨大崎岖的倒悬岩壁与隐约可见的古老建筑") AND white sanctuaries on the upper grassy plateau.
 */
function buildPlateauAndUndersideArchitecture(palette: CelestiaPalette): {
  group: THREE.Group;
  disposables: THREE.BufferGeometry[];
} {
  const group = new THREE.Group();
  const ivoryParts: THREE.BufferGeometry[] = [];
  const goldParts: THREE.BufferGeometry[] = [];
  const ruinParts: THREE.BufferGeometry[] = [];

  // --- A. Upper Plateau White Sacred Pavilions & Stepped Walkways ---
  const pavilionAngles = [0.42, 2.05, 3.68, 5.18];
  for (let p = 0; p < pavilionAngles.length; p++) {
    const ang = pavilionAngles[p];
    const rimR = getCentralRimRadius(ang);
    const dist = rimR * (p % 2 === 0 ? 0.64 : 0.58);
    const px = Math.cos(ang) * dist;
    const pz = Math.sin(ang) * dist;
    const py = getCentralSurfaceHeight(px, pz);

    // Stepped octagonal ivory podium
    const podRadius = p % 2 === 0 ? 18 : 14.5;
    const pod1 = new THREE.CylinderGeometry(podRadius, podRadius + 2.4, 5.5, 8);
    ivoryParts.push(preparePart(pod1, composeMatrix(px, py + 1.2, pz, 0, ang, 0)));
    pod1.dispose();

    const pod2 = new THREE.CylinderGeometry(podRadius * 0.82, podRadius * 0.88, 2.2, 8);
    ivoryParts.push(preparePart(pod2, composeMatrix(px, py + 4.8, pz, 0, ang, 0)));
    pod2.dispose();

    // Gold trim ring around pavilion base
    const trim = new THREE.TorusGeometry(podRadius * 0.85, 0.35, 8, 24);
    goldParts.push(preparePart(trim, composeMatrix(px, py + 5.8, pz, Math.PI / 2, 0, 0)));
    trim.dispose();

    // Slender ring of 8 celestial columns + pointed dome-spire
    const colCount = 8;
    const colRad = podRadius * 0.68;
    const colH = p % 2 === 0 ? 18 : 14;
    for (let c = 0; c < colCount; c++) {
      const ca = ang + (c / colCount) * Math.PI * 2;
      const cx = px + Math.cos(ca) * colRad;
      const cz = pz + Math.sin(ca) * colRad;
      const col = new THREE.CylinderGeometry(0.68, 0.86, colH, 8);
      ivoryParts.push(preparePart(col, composeMatrix(cx, py + 5.8 + colH * 0.5, cz)));
      col.dispose();
    }

    // Entablature ring + slender celestial lotus spire roof
    const ent = new THREE.CylinderGeometry(colRad + 1.6, colRad + 1.2, 2.6, 8);
    ivoryParts.push(preparePart(ent, composeMatrix(px, py + 5.8 + colH + 1.2, pz, 0, ang, 0)));
    ent.dispose();

    const roofH = p % 2 === 0 ? 22 : 17;
    const roof = new THREE.ConeGeometry(colRad * 0.88, roofH, 8);
    ivoryParts.push(
      preparePart(roof, composeMatrix(px, py + 5.8 + colH + 2.4 + roofH * 0.5, pz, 0, ang, 0)),
    );
    roof.dispose();

    const finial = new THREE.ConeGeometry(1.1, 9.5, 6);
    goldParts.push(
      preparePart(finial, composeMatrix(px, py + 5.8 + colH + roofH + 6.0, pz)),
    );
    finial.dispose();

    // White stone sacred walkway connecting pavilion toward central sanctum
    const steps = 6;
    for (let s = 1; s <= steps; s++) {
      const st = s / (steps + 1);
      const sx = lerp(px, Math.cos(ang) * 58, st);
      const sz = lerp(pz, Math.sin(ang) * 58, st);
      const sy = getCentralSurfaceHeight(sx, sz);
      const slab = new THREE.BoxGeometry(6.5, 1.6, 11.5);
      ivoryParts.push(preparePart(slab, composeMatrix(sx, sy + 0.35, sz, 0, -ang + Math.PI / 2, 0)));
      slab.dispose();
    }
  }

  // Cliff-shoulder blind-arcade white bastions around plateau perimeter
  const bastionAngles = [0.05, 1.18, 2.55, 3.95, 5.42];
  for (const ang of bastionAngles) {
    const rimR = getCentralRimRadius(ang) * 0.94;
    const bx = Math.cos(ang) * rimR;
    const bz = Math.sin(ang) * rimR;
    const by = getCentralSurfaceHeight(bx, bz);

    const wall = new THREE.CylinderGeometry(13, 10.5, 18, 7, 1, false, 0, Math.PI * 1.15);
    ivoryParts.push(preparePart(wall, composeMatrix(bx, by - 5.5, bz, 0, -ang, 0)));
    wall.dispose();

    const cap = new THREE.CylinderGeometry(13.8, 13.4, 2.2, 7);
    ivoryParts.push(preparePart(cap, composeMatrix(bx, by + 3.6, bz, 0, -ang, 0)));
    cap.dispose();
  }

  // --- B. Ancient Embedded Ruins Beneath the Inverted Rock Cliff ---
  // Placed along cliff recesses & promontories between y = -45 and y = -265 so they emerge visibly from the rock
  const undersideSites = [
    { ang: 0.58, depth: 68, scale: 1.45, inverted: false },
    { ang: 0.96, depth: 145, scale: 1.35, inverted: true },
    { ang: 1.32, depth: 92, scale: 1.5, inverted: false },
    { ang: 1.72, depth: 178, scale: 1.3, inverted: true },
    { ang: 0.22, depth: 162, scale: 1.25, inverted: true },
    { ang: 2.18, depth: 108, scale: 1.4, inverted: false },
    { ang: 2.88, depth: 155, scale: 1.25, inverted: true },
    { ang: 3.72, depth: 88, scale: 1.3, inverted: false },
    { ang: 4.55, depth: 145, scale: 1.25, inverted: true },
    { ang: 5.35, depth: 98, scale: 1.35, inverted: false },
    { ang: 5.88, depth: 205, scale: 1.2, inverted: true },
  ];

  for (let i = 0; i < undersideSites.length; i++) {
    const site = undersideSites[i];
    const v = site.depth / 455;
    const rimR = getCentralRimRadius(site.ang);
    const approxCliffR = rimR * Math.pow(1 - v, 1.28) * 1.05;
    const rx = Math.cos(site.ang) * approxCliffR;
    const rz = Math.sin(site.ang) * approxCliffR;
    const ry = -site.depth;
    const yaw = -site.ang + Math.PI / 2;
    const sc = site.scale;

    // Carved gallery lintel & recessed colonnade emerging from cliff face
    const lintel = new THREE.BoxGeometry(28 * sc, 3.6 * sc, 12 * sc);
    ruinParts.push(preparePart(lintel, composeMatrix(rx, ry + 9 * sc, rz, 0, yaw, 0)));
    lintel.dispose();

    const baseLedge = new THREE.BoxGeometry(30 * sc, 4.2 * sc, 14 * sc);
    ruinParts.push(preparePart(baseLedge, composeMatrix(rx, ry - 9 * sc, rz, 0, yaw, 0)));
    baseLedge.dispose();

    const cols = 5;
    for (let c = 0; c < cols; c++) {
      const offset = (c - (cols - 1) / 2) * 5.6 * sc;
      const cx = rx + Math.cos(yaw) * offset + Math.cos(site.ang) * 3.5 * sc;
      const cz = rz - Math.sin(yaw) * offset + Math.sin(site.ang) * 3.5 * sc;
      const brokenFactor = c === 1 || c === 4 ? 0.62 : 1.0;
      const colH = 16.5 * sc * brokenFactor;
      const col = new THREE.CylinderGeometry(1.05 * sc, 1.25 * sc, colH, 8);
      ruinParts.push(
        preparePart(
          col,
          composeMatrix(cx, ry - 8 * sc + colH * 0.5, cz, 0.04 * (c - 2), yaw, 0),
        ),
      );
      col.dispose();
    }

    // Half-buried ancient spire or inverted celestial pinnacle jutting downward from cliff!
    if (site.inverted) {
      const invSpireH = 38 * sc;
      const invSpire = new THREE.ConeGeometry(5.5 * sc, invSpireH, 6);
      // Pointing downward out of the underside rock!
      ruinParts.push(
        preparePart(
          invSpire,
          composeMatrix(
            rx + Math.cos(site.ang) * 3 * sc,
            ry - 10 * sc - invSpireH * 0.45,
            rz + Math.sin(site.ang) * 3 * sc,
            Math.PI + 0.08,
            yaw,
            0.05,
          ),
        ),
      );
      invSpire.dispose();

      const invRing = new THREE.TorusGeometry(6.2 * sc, 0.65 * sc, 6, 16);
      ruinParts.push(
        preparePart(
          invRing,
          composeMatrix(
            rx + Math.cos(site.ang) * 3 * sc,
            ry - 12 * sc,
            rz + Math.sin(site.ang) * 3 * sc,
            Math.PI / 2 + 0.1,
            0,
            0,
          ),
        ),
      );
      invRing.dispose();
    } else {
      // Broken aqueduct arch rib projecting from the cliff wall
      const arch = new THREE.TorusGeometry(11 * sc, 1.5 * sc, 6, 14, Math.PI * 0.78);
      ruinParts.push(
        preparePart(
          arch,
          composeMatrix(
            rx + Math.cos(site.ang) * 4 * sc,
            ry - 4 * sc,
            rz + Math.sin(site.ang) * 4 * sc,
            0,
            -site.ang,
            0.22,
          ),
        ),
      );
      arch.dispose();
    }
  }

  const ivoryGeo = mergeParts(ivoryParts);
  const goldGeo = mergeParts(goldParts);
  const ruinGeo = mergeParts(ruinParts);

  const ivoryMesh = new THREE.Mesh(ivoryGeo, palette.ivoryStone);
  ivoryMesh.castShadow = true;
  ivoryMesh.receiveShadow = true;

  const goldMesh = new THREE.Mesh(goldGeo, palette.sacredGold);
  goldMesh.castShadow = true;

  const ruinMesh = new THREE.Mesh(ruinGeo, palette.ancientRuinStone);
  ruinMesh.castShadow = true;
  ruinMesh.receiveShadow = true;

  group.add(ivoryMesh, goldMesh, ruinMesh);
  return { group, disposables: [ivoryGeo, goldGeo, ruinGeo] };
}

export function createCentralIsland(palette: CelestiaPalette): CentralIslandData {
  const group = new THREE.Group();
  group.name = 'CentralMainIsland';

  const grassGeo = buildGrassCapGeometry();
  const grassMesh = new THREE.Mesh(grassGeo, palette.meadowGrass);
  grassMesh.receiveShadow = true;
  grassMesh.castShadow = true;

  const cliffCoreGeo = buildInvertedCliffCoreGeometry();
  const cliffCoreMesh = new THREE.Mesh(cliffCoreGeo, palette.undersideRock);
  cliffCoreMesh.castShadow = true;
  cliffCoreMesh.receiveShadow = true;

  const cragsGeo = buildCliffCragsGeometry();
  const cragsMesh = new THREE.Mesh(cragsGeo, palette.cliffRock);
  cragsMesh.castShadow = true;
  cragsMesh.receiveShadow = true;

  const arch = buildPlateauAndUndersideArchitecture(palette);

  group.add(grassMesh, cliffCoreMesh, cragsMesh, arch.group);

  // Compute scenic waterfall spillways around the main island rim (visible in 3/4 view & orbit)
  const wfAngles = [1.04, 1.56, 2.95, 5.72];
  const waterfallAnchors: WaterfallAnchor[] = wfAngles.map((ang, idx) => {
    const r = getCentralRimRadius(ang) * 0.985;
    const x = Math.cos(ang) * r;
    const z = Math.sin(ang) * r;
    const y = getCentralSurfaceHeight(x, z) - 1.5;
    return {
      position: new THREE.Vector3(x, y, z),
      outwardDir: new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang)).normalize(),
      width: idx === 0 ? 12.5 : 9.5 + (idx % 2) * 2.5,
      dropLength: idx === 0 ? 215 : 165 + idx * 18,
    };
  });

  // Deterministic sacred grove tree positions across the emerald plateau (avoiding central plaza & walkways)
  const rand = mulberry32(99041);
  const treeSpots: THREE.Vector3[] = [];
  for (let i = 0; i < 135; i++) {
    const ang = rand() * Math.PI * 2;
    const rimR = getCentralRimRadius(ang);
    const frac = 0.44 + rand() * 0.47;
    const rad = rimR * frac;
    const tx = Math.cos(ang) * rad;
    const tz = Math.sin(ang) * rad;

    // Keep clear of central sanctum radius (< 72) and secondary pavilions
    if (Math.hypot(tx, tz) < 72) continue;
    const nearPavilion = [0.42, 2.05, 3.68, 5.18].some((pa) => {
      const pr = getCentralRimRadius(pa) * 0.62;
      return Math.hypot(tx - Math.cos(pa) * pr, tz - Math.sin(pa) * pr) < 23;
    });
    if (nearPavilion) continue;

    treeSpots.push(new THREE.Vector3(tx, getCentralSurfaceHeight(tx, tz), tz));
  }

  return {
    group,
    getRimPoint: (angle: number) => {
      const r = getCentralRimRadius(angle);
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      return new THREE.Vector3(x, getCentralSurfaceHeight(x, z), z);
    },
    getSurfaceY: getCentralSurfaceHeight,
    waterfallAnchors,
    treeSpots,
    dispose: () => {
      grassGeo.dispose();
      cliffCoreGeo.dispose();
      cragsGeo.dispose();
      for (const d of arch.disposables) d.dispose();
    },
  };
}
