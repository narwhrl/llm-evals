import * as THREE from 'three';
import { CelestiaPalette } from '../core/materials';
import {
  clamp,
  composeMatrix,
  fbm2,
  mergeParts,
  mulberry32,
  preparePart,
  ridgedFbm3,
  smoothstep,
} from '../core/math';
import { CentralIslandData, WaterfallAnchor } from './centralIsland';

export interface IsletInfo {
  index: number;
  angle: number;
  center: THREE.Vector3;
  radiusX: number;
  radiusZ: number;
  topY: number;
  kind: 'gatehouse' | 'sanctuary' | 'ruin';
}

export interface FloatingDebrisSeed {
  basePos: THREE.Vector3;
  scale: THREE.Vector3;
  rot: THREE.Euler;
  bobAmp: number;
  bobSpeed: number;
  phase: number;
  isIvory: boolean;
}

export interface OuterRingData {
  group: THREE.Group;
  islets: IsletInfo[];
  waterfallAnchors: WaterfallAnchor[];
  treeSpots: THREE.Vector3[];
  bridgeDebrisSeeds: FloatingDebrisSeed[];
  dispose: () => void;
}

function getIsletLocalRadius(ang: number, rx: number, rz: number, seed: number): number {
  const base = Math.hypot(Math.cos(ang) * rx, Math.sin(ang) * rz);
  const lobe =
    Math.sin(ang * 3 + seed) * (base * 0.11) +
    Math.cos(ang * 5 - seed * 1.7) * (base * 0.06) +
    fbm2(Math.cos(ang) * 2.1 + seed, Math.sin(ang) * 2.1 - seed, 3) * (base * 0.12);
  return base + lobe;
}

function buildSingleIsletMeshes(
  info: IsletInfo,
  seed: number,
  grassParts: THREE.BufferGeometry[],
  rockParts: THREE.BufferGeometry[],
): void {
  const radialSegs = 44;
  const ringSegs = 12;
  const { center, radiusX, radiusZ } = info;

  // 1. Grass Top Cap
  const gPos: number[] = [];
  const gCol: number[] = [];
  const gUv: number[] = [];
  const gIdx: number[] = [];
  const colA = new THREE.Color('#4db358');
  const colB = new THREE.Color('#88de66');
  const tmpC = new THREE.Color();

  for (let ir = 0; ir <= ringSegs; ir++) {
    const t = ir / ringSegs;
    for (let ia = 0; ia <= radialSegs; ia++) {
      const ang = (ia / radialSegs) * Math.PI * 2;
      const rimR = getIsletLocalRadius(ang, radiusX, radiusZ, seed) * 1.02;
      const rad = t * rimR;
      const lx = Math.cos(ang) * rad;
      const lz = Math.sin(ang) * rad;
      let ly = (1 - smoothstep(0.35, 1.0, t)) * 4.2 + fbm2(lx * 0.04 + seed, lz * 0.04, 3) * 1.8;
      if (ir === ringSegs) ly -= 1.8;

      gPos.push(center.x + lx, center.y + ly, center.z + lz);
      gUv.push(lx * 0.03, lz * 0.03);
      const n = fbm2(lx * 0.05 - seed, lz * 0.05 + seed, 2) * 0.5 + 0.5;
      tmpC.copy(colA).lerp(colB, clamp(n, 0, 1));
      gCol.push(tmpC.r, tmpC.g, tmpC.b);
    }
  }
  const stride = radialSegs + 1;
  for (let ir = 0; ir < ringSegs; ir++) {
    for (let ia = 0; ia < radialSegs; ia++) {
      const a = ir * stride + ia;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      gIdx.push(a, b, c, b, d, c);
    }
  }
  const grassGeo = new THREE.BufferGeometry();
  grassGeo.setAttribute('position', new THREE.Float32BufferAttribute(gPos, 3));
  grassGeo.setAttribute('color', new THREE.Float32BufferAttribute(gCol, 3));
  grassGeo.setAttribute('uv', new THREE.Float32BufferAttribute(gUv, 2));
  grassGeo.setIndex(gIdx);
  grassGeo.computeVertexNormals();
  grassParts.push(preparePart(grassGeo));
  grassGeo.dispose();

  // 2. Jagged Inverted Craggy Rock Underside (proportioned sleeker than the colossal central cliff)
  const vSegs = 18;
  const depth = (radiusX + radiusZ) * 0.94 + 26;
  const rPos: number[] = [];
  const rCol: number[] = [];
  const rUv: number[] = [];
  const rIdx: number[] = [];
  const rTopCol = new THREE.Color('#ded6c7');
  const rBotCol = new THREE.Color('#7f94bf');

  for (let iv = 0; iv <= vSegs; iv++) {
    const v = iv / vSegs;
    const driftX = Math.sin(v * 2.2 + seed) * 6.5;
    const driftZ = Math.cos(v * 1.9 - seed) * 5.5;

    for (let ia = 0; ia <= radialSegs; ia++) {
      const ang = (ia / radialSegs) * Math.PI * 2;
      const rimR = getIsletLocalRadius(ang, radiusX, radiusZ, seed);
      const ridge = ridgedFbm3(Math.cos(ang) * 2.4 + seed, v * 3.8, Math.sin(ang) * 2.4, 3);
      const profile = Math.pow(1 - v, 1.38) * (1 + (ridge - 0.45) * 0.42 * Math.sin(v * Math.PI));
      const rad = iv === vSegs ? 0 : Math.max(1.0, rimR * profile);

      const lx = driftX + Math.cos(ang) * rad;
      const lz = driftZ + Math.sin(ang) * rad;
      const ly = -1.4 - Math.pow(v, 0.92) * depth;

      rPos.push(center.x + lx, center.y + ly, center.z + lz);
      rUv.push((ia / radialSegs) * 4, v * 4);
      tmpC.copy(rTopCol).lerp(rBotCol, v);
      rCol.push(tmpC.r, tmpC.g, tmpC.b);
    }
  }
  for (let iv = 0; iv < vSegs; iv++) {
    for (let ia = 0; ia < radialSegs; ia++) {
      const a = iv * stride + ia;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      rIdx.push(a, b, c, b, d, c);
    }
  }
  const rockGeo = new THREE.BufferGeometry();
  rockGeo.setAttribute('position', new THREE.Float32BufferAttribute(rPos, 3));
  rockGeo.setAttribute('color', new THREE.Float32BufferAttribute(rCol, 3));
  rockGeo.setAttribute('uv', new THREE.Float32BufferAttribute(rUv, 2));
  rockGeo.setIndex(rIdx);
  rockGeo.computeVertexNormals();
  rockParts.push(preparePart(rockGeo));
  rockGeo.dispose();

  // Add 8 chiseled perimeter crag fangs per islet
  for (let k = 0; k < 8; k++) {
    const ka = (k / 8) * Math.PI * 2 + seed * 0.4;
    const kr = getIsletLocalRadius(ka, radiusX, radiusZ, seed) * 0.88;
    const fh = depth * (0.42 + ((k * 37) % 10) * 0.03);
    const fang = new THREE.ConeGeometry(radiusX * 0.24, fh, 5);
    const fPos = fang.attributes.position as THREE.BufferAttribute;
    const fCols = new Float32Array(fPos.count * 3);
    for (let vi = 0; vi < fPos.count; vi++) {
      const vt = clamp(0.5 + fPos.getY(vi) / fh, 0, 1); // after flip: 0 bottom, 1 top
      tmpC.copy(rBotCol).lerp(rTopCol, vt);
      fCols[vi * 3] = tmpC.r;
      fCols[vi * 3 + 1] = tmpC.g;
      fCols[vi * 3 + 2] = tmpC.b;
    }
    fang.setAttribute('color', new THREE.BufferAttribute(fCols, 3));
    rockParts.push(
      preparePart(
        fang,
        composeMatrix(
          center.x + Math.cos(ka) * kr,
          center.y - fh * 0.48 - 3,
          center.z + Math.sin(ka) * kr,
          Math.PI + 0.06,
          ka,
          0,
        ),
      ),
    );
    fang.dispose();
  }
}

/**
 * Adds sacred Celestia buildings, colonnades, or weathered ruined spires (`残缺尖塔`) onto an outer islet.
 */
function buildIsletArchitecture(
  info: IsletInfo,
  ivoryParts: THREE.BufferGeometry[],
  goldParts: THREE.BufferGeometry[],
  ruinParts: THREE.BufferGeometry[],
  debrisSeeds: FloatingDebrisSeed[],
): void {
  const { center, angle, kind } = info;
  const baseY = center.y + 3.6;
  const avgR = (info.radiusX + info.radiusZ) * 0.5;

  // Circular white stone sacred court podium
  const courtR = avgR * 0.48;
  const podium = new THREE.CylinderGeometry(courtR, courtR + 2.5, 4.2, 16);
  ivoryParts.push(preparePart(podium, composeMatrix(center.x, baseY + 1.2, center.z)));
  podium.dispose();

  const goldBand = new THREE.TorusGeometry(courtR + 0.3, 0.35, 6, 36);
  goldParts.push(
    preparePart(goldBand, composeMatrix(center.x, baseY + 3.3, center.z, Math.PI / 2, 0, 0)),
  );
  goldBand.dispose();

  if (kind === 'gatehouse') {
    // Twin slender Celestia needle-spires joined by a high pointed celestial portal arch!
    const sep = courtR * 0.58;
    const perp = angle + Math.PI / 2;
    const towerH = 66;

    for (const side of [-1, 1]) {
      const tx = center.x + Math.cos(perp) * side * sep;
      const tz = center.z + Math.sin(perp) * side * sep;

      const lower = new THREE.CylinderGeometry(3.8, 5.4, towerH * 0.52, 8);
      ivoryParts.push(
        preparePart(lower, composeMatrix(tx, baseY + 3.3 + towerH * 0.26, tz, 0, angle, 0)),
      );
      lower.dispose();

      const upper = new THREE.CylinderGeometry(2.7, 3.8, towerH * 0.28, 8);
      ivoryParts.push(
        preparePart(upper, composeMatrix(tx, baseY + 3.3 + towerH * 0.66, tz, 0, angle, 0)),
      );
      upper.dispose();

      const spire = new THREE.ConeGeometry(2.9, 36, 8);
      ivoryParts.push(
        preparePart(spire, composeMatrix(tx, baseY + 3.3 + towerH * 0.8 + 18, tz, 0, angle, 0)),
      );
      spire.dispose();

      const tip = new THREE.OctahedronGeometry(1.35, 0);
      goldParts.push(
        preparePart(
          tip,
          composeMatrix(tx, baseY + 3.3 + towerH * 0.8 + 38, tz, 0, angle, 0, 0.75, 2.1, 0.75),
        ),
      );
      tip.dispose();
    }

    // Grand high pointed arch bridging between the twin spires
    for (const side of [-1, 1]) {
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= 8; s++) {
        const st = s / 8;
        const offset = side * sep * Math.pow(1 - st, 1.15);
        const ay = baseY + 32 + Math.sin(st * Math.PI * 0.5) * 22;
        pts.push(
          new THREE.Vector3(
            center.x + Math.cos(perp) * offset,
            ay,
            center.z + Math.sin(perp) * offset,
          ),
        );
      }
      const archTube = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 1.25, 6, false);
      ivoryParts.push(preparePart(archTube));
      archTube.dispose();
    }

    // Curved ancient colonnade framing outer rim of gatehouse islet
    const colCount = 10;
    for (let c = 0; c < colCount; c++) {
      const ca = angle - 1.15 + (c / (colCount - 1)) * 2.3;
      const cx = center.x + Math.cos(ca) * (courtR * 0.92);
      const cz = center.z + Math.sin(ca) * (courtR * 0.92);
      const col = new THREE.CylinderGeometry(0.75, 0.92, 15, 8);
      ivoryParts.push(preparePart(col, composeMatrix(cx, baseY + 3.3 + 7.5, cz)));
      col.dispose();
    }
  } else if (kind === 'sanctuary') {
    // Circular colonnaded tholos temple + slender central lotus spire
    const colCount = 10;
    const colR = courtR * 0.74;
    const colH = 18;
    for (let c = 0; c < colCount; c++) {
      const ca = (c / colCount) * Math.PI * 2;
      const cx = center.x + Math.cos(ca) * colR;
      const cz = center.z + Math.sin(ca) * colR;
      const col = new THREE.CylinderGeometry(0.78, 0.95, colH, 8);
      ivoryParts.push(preparePart(col, composeMatrix(cx, baseY + 3.3 + colH * 0.5, cz)));
      col.dispose();
    }

    const ringBeam = new THREE.TorusGeometry(colR, 1.05, 8, 36);
    ivoryParts.push(
      preparePart(ringBeam, composeMatrix(center.x, baseY + 3.3 + colH + 0.6, center.z, Math.PI / 2, 0, 0)),
    );
    ringBeam.dispose();

    const drum = new THREE.CylinderGeometry(colR * 0.52, colR * 0.64, 22, 8);
    ivoryParts.push(preparePart(drum, composeMatrix(center.x, baseY + 3.3 + colH + 11, center.z)));
    drum.dispose();

    const spire = new THREE.ConeGeometry(colR * 0.54, 42, 8);
    ivoryParts.push(preparePart(spire, composeMatrix(center.x, baseY + 3.3 + colH + 43, center.z)));
    spire.dispose();

    const haloRing = new THREE.TorusGeometry(4.8, 0.45, 6, 24);
    goldParts.push(
      preparePart(
        haloRing,
        composeMatrix(center.x, baseY + 3.3 + colH + 68, center.z, 0.35, angle, 0.25),
      ),
    );
    haloRing.dispose();
  } else {
    // 'ruin' — Weathered Ancient Ruined Spire (`残缺尖塔`) + shattered colonnade & levitating spire tip!
    const tiltX = 0.14 * Math.cos(angle);
    const tiltZ = 0.14 * Math.sin(angle);

    // Lower fractured octagonal spire shaft (snapped jaggedly mid-height!)
    const stumpH = 34;
    const stump = new THREE.CylinderGeometry(4.8, 7.2, stumpH, 8);
    ruinParts.push(
      preparePart(
        stump,
        composeMatrix(center.x, baseY + 3.3 + stumpH * 0.48, center.z, tiltX, angle, tiltZ),
      ),
    );
    stump.dispose();

    // Jagged broken crown shards sticking up around the snapped top of the spire
    for (let j = 0; j < 5; j++) {
      const ja = (j / 5) * Math.PI * 2 + 0.3;
      const shardH = 8 + (j % 3) * 6.5;
      const shard = new THREE.ConeGeometry(2.1, shardH, 4);
      ruinParts.push(
        preparePart(
          shard,
          composeMatrix(
            center.x + Math.cos(ja) * 3.8 + tiltZ * 14,
            baseY + 3.3 + stumpH + shardH * 0.35,
            center.z + Math.sin(ja) * 3.8 - tiltX * 14,
            tiltX * 1.2,
            ja,
            tiltZ * 1.2,
          ),
        ),
      );
      shard.dispose();
    }

    // Detached upper spire tip hovering tilted in mid-air above the broken shaft!
    debrisSeeds.push({
      basePos: new THREE.Vector3(
        center.x + Math.cos(angle) * 5.5,
        baseY + stumpH + 22,
        center.z + Math.sin(angle) * 5.5,
      ),
      scale: new THREE.Vector3(3.6, 11.5, 3.6),
      rot: new THREE.Euler(0.32, angle, -0.24),
      bobAmp: 1.8,
      bobSpeed: 0.65,
      phase: info.index * 1.7,
      isIvory: true,
    });

    // Partially collapsed colonnade pillars (some standing, some snapped, some fallen on the turf)
    const colCount = 9;
    const colR = courtR * 0.82;
    for (let c = 0; c < colCount; c++) {
      const ca = (c / colCount) * Math.PI * 2;
      const cx = center.x + Math.cos(ca) * colR;
      const cz = center.z + Math.sin(ca) * colR;
      if (c % 3 === 0) {
        // Fallen column drum resting on ground
        const fallen = new THREE.CylinderGeometry(0.85, 0.92, 11, 8);
        ruinParts.push(
          preparePart(fallen, composeMatrix(cx, baseY + 4.1, cz, Math.PI / 2, ca + 0.4, 0.08)),
        );
        fallen.dispose();
      } else {
        const h = c % 2 === 0 ? 15.5 : 8.5;
        const col = new THREE.CylinderGeometry(0.82, 0.96, h, 8);
        ruinParts.push(preparePart(col, composeMatrix(cx, baseY + 3.3 + h * 0.5, cz)));
        col.dispose();
      }
    }
  }
}

/**
 * Builds a sweeping curved white stone arched bridge / viaduct with:
 * - Curved roadbed + twin balustrades + gold trim
 * - Deep parabolic under-arch rib + vertical spandrel columns (complex openwork arched bridge!)
 * - Optional colonnade pillars crowning the bridge
 * - Optional `broken` mode (`断裂石桥`) leaving a dramatic mid-air gap & floating bridge rubble!
 */
function buildArchedBridgeSpan(
  pStart: THREE.Vector3,
  pEnd: THREE.Vector3,
  midControlOffset: THREE.Vector3,
  deckWidth: number,
  archDepth: number,
  options: {
    broken: boolean;
    hasColonnade: boolean;
    seed: number;
  },
  ivoryParts: THREE.BufferGeometry[],
  goldParts: THREE.BufferGeometry[],
  ruinParts: THREE.BufferGeometry[],
  debrisSeeds: FloatingDebrisSeed[],
): void {
  const pMid = pStart.clone().lerp(pEnd, 0.5).add(midControlOffset);
  const deckCurve = new THREE.QuadraticBezierCurve3(pStart, pMid, pEnd);
  const spanLen = deckCurve.getLength();
  const segments = Math.max(18, Math.round(spanLen / 9));

  const gapStart = 0.36;
  const gapEnd = 0.66;

  const targetParts = options.broken ? ruinParts : ivoryParts;

  // Build segmented curved roadway, balustrades, under-arch & spandrel struts
  for (let i = 0; i < segments; i++) {
    const t0 = i / segments;
    const t1 = (i + 1) / segments;
    const tm = (t0 + t1) * 0.5;

    if (options.broken && tm > gapStart && tm < gapEnd) {
      // Populate suspended broken bridge slabs & column shards across the gap!
      if (i % 2 === 0) {
        const pt = deckCurve.getPoint(tm);
        const drop = Math.sin(((tm - gapStart) / (gapEnd - gapStart)) * Math.PI) * 14;
        debrisSeeds.push({
          basePos: new THREE.Vector3(
            pt.x + Math.sin(i * 4.1 + options.seed) * 5.5,
            pt.y - drop + Math.cos(i * 2.7) * 4.5,
            pt.z + Math.cos(i * 3.3 + options.seed) * 5.5,
          ),
          scale: new THREE.Vector3(deckWidth * 0.42, 1.6, 4.8),
          rot: new THREE.Euler(
            Math.sin(i * 1.9) * 0.45,
            i * 0.7,
            Math.cos(i * 2.3) * 0.38,
          ),
          bobAmp: 2.1,
          bobSpeed: 0.55 + (i % 3) * 0.12,
          phase: i * 1.1 + options.seed,
          isIvory: true,
        });
      }
      continue;
    }

    const posA = deckCurve.getPoint(t0);
    const posB = deckCurve.getPoint(t1);
    const posM = posA.clone().lerp(posB, 0.5);
    const tangent = posB.clone().sub(posA);
    const segLen = tangent.length();
    const dir = tangent.clone().normalize();

    const yaw = Math.atan2(dir.x, dir.z);
    const pitch = -Math.asin(clamp(dir.y, -0.95, 0.95));

    // Slightly fractured tilt on segments immediately bordering a broken gap
    let fracturePitch = 0;
    if (options.broken) {
      if (Math.abs(tm - gapStart) < 0.06) fracturePitch = 0.16;
      if (Math.abs(tm - gapEnd) < 0.06) fracturePitch = -0.16;
    }

    // 1. Roadway deck slab
    const deck = new THREE.BoxGeometry(deckWidth, 2.2, segLen * 1.06);
    targetParts.push(
      preparePart(deck, composeMatrix(posM.x, posM.y, posM.z, pitch + fracturePitch, yaw, 0)),
    );
    deck.dispose();

    // Pale-gold side frieze along intact bridges
    if (!options.broken) {
      const goldStrip = new THREE.BoxGeometry(deckWidth + 0.5, 0.45, segLen * 1.05);
      goldParts.push(
        preparePart(goldStrip, composeMatrix(posM.x, posM.y + 0.35, posM.z, pitch, yaw, 0)),
      );
      goldStrip.dispose();
    }

    // 2. Twin stone balustrades + posts
    const perpX = Math.cos(yaw);
    const perpZ = -Math.sin(yaw);
    for (const side of [-1, 1]) {
      const bx = posM.x + perpX * side * (deckWidth * 0.46);
      const bz = posM.z + perpZ * side * (deckWidth * 0.46);
      const rail = new THREE.BoxGeometry(0.85, 1.75, segLen * 1.05);
      targetParts.push(
        preparePart(rail, composeMatrix(bx, posM.y + 1.85, bz, pitch + fracturePitch, yaw, 0)),
      );
      rail.dispose();

      // Ancient colonnade pillars (`古老柱廊`) on designated bridge spans
      if (options.hasColonnade && i % 2 === 1 && tm > 0.12 && tm < 0.88) {
        const colH = 12.5;
        const col = new THREE.CylinderGeometry(0.55, 0.68, colH, 8);
        targetParts.push(preparePart(col, composeMatrix(bx, posM.y + 1.1 + colH * 0.5, bz)));
        col.dispose();

        const capBeam = new THREE.BoxGeometry(1.4, 1.2, segLen * 2.1);
        targetParts.push(
          preparePart(capBeam, composeMatrix(bx, posM.y + 1.1 + colH + 0.5, bz, pitch, yaw, 0)),
        );
        capBeam.dispose();
      }
    }

    // Cross-arch overhead portal at center of colonnaded bridges
    if (options.hasColonnade && !options.broken && Math.abs(tm - 0.5) < 0.5 / segments) {
      const portalArch = new THREE.TorusGeometry(deckWidth * 0.46, 0.72, 6, 18, Math.PI);
      ivoryParts.push(
        preparePart(portalArch, composeMatrix(posM.x, posM.y + 13.8, posM.z, 0, yaw, 0)),
      );
      portalArch.dispose();
    }

    // 3. Lower Parabolic Arch Rib & Openwork Spandrel Struts (`复杂拱桥`)
    // Arch starts deep near abutments and kisses the underside of the deck at mid-span (tm = 0.5)
    const archCurveFactor = Math.pow(Math.abs(tm - 0.5) * 2, 1.65);
    const archYOffset = -2.2 - archDepth * archCurveFactor;

    const archPosA = deckCurve.getPoint(t0);
    const archPosB = deckCurve.getPoint(t1);
    archPosA.y += -2.2 - archDepth * Math.pow(Math.abs(t0 - 0.5) * 2, 1.65);
    archPosB.y += -2.2 - archDepth * Math.pow(Math.abs(t1 - 0.5) * 2, 1.65);
    const archMid = archPosA.clone().lerp(archPosB, 0.5);
    const archTan = archPosB.clone().sub(archPosA);
    const archLen = archTan.length();
    const archDir = archTan.clone().normalize();
    const archYaw = Math.atan2(archDir.x, archDir.z);
    const archPitch = -Math.asin(clamp(archDir.y, -0.98, 0.98));

    for (const side of [-1, 1]) {
      const ax = archMid.x + perpX * side * (deckWidth * 0.34);
      const az = archMid.z + perpZ * side * (deckWidth * 0.34);
      const rib = new THREE.BoxGeometry(1.55, 2.1, archLen * 1.08);
      targetParts.push(preparePart(rib, composeMatrix(ax, archMid.y, az, archPitch, archYaw, 0)));
      rib.dispose();

      // Slender vertical spandrel columns rising from lower arch rib to roadway deck
      const spandrelH = Math.abs(archYOffset) - 1.5;
      if (spandrelH > 2.8) {
        const spCol = new THREE.CylinderGeometry(0.52, 0.62, spandrelH, 6);
        targetParts.push(
          preparePart(
            spCol,
            composeMatrix(
              posM.x + perpX * side * (deckWidth * 0.34),
              posM.y - 1.2 - spandrelH * 0.5,
              posM.z + perpZ * side * (deckWidth * 0.34),
            ),
          ),
        );
        spCol.dispose();
      }
    }
  }
}

export function createOuterRing(
  palette: CelestiaPalette,
  centralIsland: CentralIslandData,
): OuterRingData {
  const group = new THREE.Group();
  group.name = 'OuterRingStructure';

  const grassParts: THREE.BufferGeometry[] = [];
  const rockParts: THREE.BufferGeometry[] = [];
  const ivoryParts: THREE.BufferGeometry[] = [];
  const goldParts: THREE.BufferGeometry[] = [];
  const ruinParts: THREE.BufferGeometry[] = [];
  const bridgeDebrisSeeds: FloatingDebrisSeed[] = [];

  // 8 Outer Floating Islets arranged in Celestia's signature ring
  // Subtle harmonic inclination: front arc (z > 0) sits slightly lower (-20..-8) so the camera's
  // 3/4 view reads the entire ring, central meadow, and soaring sanctum with majestic clarity!
  const isletDefs: {
    angle: number;
    distScale: number;
    rx: number;
    rz: number;
    yOffset: number;
    kind: 'gatehouse' | 'sanctuary' | 'ruin';
  }[] = [
    { angle: 0.60, distScale: 1.02, rx: 56, rz: 46, yOffset: -14, kind: 'gatehouse' },
    { angle: 1.44, distScale: 1.00, rx: 46, rz: 40, yOffset: -16, kind: 'sanctuary' },
    { angle: 2.18, distScale: 1.04, rx: 50, rz: 42, yOffset: -6, kind: 'ruin' },
    { angle: 2.92, distScale: 0.97, rx: 42, rz: 36, yOffset: 10, kind: 'sanctuary' },
    { angle: 3.68, distScale: 1.05, rx: 60, rz: 48, yOffset: 24, kind: 'gatehouse' },
    { angle: 4.44, distScale: 0.98, rx: 42, rz: 36, yOffset: 26, kind: 'ruin' },
    { angle: 5.20, distScale: 1.03, rx: 50, rz: 42, yOffset: 12, kind: 'sanctuary' },
    { angle: 5.92, distScale: 0.99, rx: 38, rz: 34, yOffset: -2, kind: 'ruin' },
  ];

  const ringRadiusX = 488;
  const ringRadiusZ = 422;
  const islets: IsletInfo[] = [];

  for (let i = 0; i < isletDefs.length; i++) {
    const def = isletDefs[i];
    const cx = Math.cos(def.angle) * ringRadiusX * def.distScale;
    const cz = Math.sin(def.angle) * ringRadiusZ * def.distScale;
    const info: IsletInfo = {
      index: i,
      angle: def.angle,
      center: new THREE.Vector3(cx, def.yOffset, cz),
      radiusX: def.rx,
      radiusZ: def.rz,
      topY: def.yOffset + 3.6,
      kind: def.kind,
    };
    islets.push(info);

    buildSingleIsletMeshes(info, 100 + i * 19.3, grassParts, rockParts);
    buildIsletArchitecture(info, ivoryParts, goldParts, ruinParts, bridgeDebrisSeeds);
  }

  // 1. Circumferential Ring Viaducts, Ring Roads & Ancient Colonnades (8 spans around the ring)
  // Spans 2->3 and 5->6 are dramatic Broken Bridges (`断裂石桥`), others form grand curved colonnade viaducts!
  for (let i = 0; i < islets.length; i++) {
    const a = islets[i];
    const b = islets[(i + 1) % islets.length];

    const dirAB = b.center.clone().sub(a.center).normalize();
    const startPt = a.center
      .clone()
      .addScaledVector(dirAB, (a.radiusX + a.radiusZ) * 0.42)
      .add(new THREE.Vector3(0, 4.2, 0));
    const endPt = b.center
      .clone()
      .addScaledVector(dirAB, -(b.radiusX + b.radiusZ) * 0.42)
      .add(new THREE.Vector3(0, 4.2, 0));

    // Bow outward along the ring contour + graceful upward arch camber
    const midAngle = Math.atan2((startPt.z + endPt.z) * 0.5, (startPt.x + endPt.x) * 0.5);
    const outwardBow = new THREE.Vector3(
      Math.cos(midAngle) * 38,
      20,
      Math.sin(midAngle) * 34,
    );

    const isBroken = i === 2 || i === 5;
    const hasColonnade = i === 0 || i === 1 || i === 4 || i === 6;

    buildArchedBridgeSpan(
      startPt,
      endPt,
      outwardBow,
      11.5,
      28,
      { broken: isBroken, hasColonnade, seed: i * 13.7 },
      ivoryParts,
      goldParts,
      ruinParts,
      bridgeDebrisSeeds,
    );
  }

  // 2. Five Grand Radial High-Arched Bridges connecting Outer Islets inward to Central Main Island!
  // Islet 1 (front-right foreground!) features a dramatic mid-air Broken Radial Bridge (`断裂石桥`),
  // while Islets 0, 3, 4, 6 feature soaring intact ivory arched viaducts!
  const radialIndices = [0, 1, 3, 4, 6];
  for (const idx of radialIndices) {
    const isl = islets[idx];
    const inwardDir = new THREE.Vector3(-isl.center.x, 0, -isl.center.z).normalize();
    const outerStart = isl.center
      .clone()
      .addScaledVector(inwardDir, (isl.radiusX + isl.radiusZ) * 0.44)
      .add(new THREE.Vector3(0, 4.5, 0));

    const innerRim = centralIsland.getRimPoint(isl.angle);
    const innerEnd = innerRim.clone().add(new THREE.Vector3(0, 1.5, 0));

    const isBroken = idx === 1;
    const archRise = new THREE.Vector3(0, isBroken ? 44 : 48, 0);

    buildArchedBridgeSpan(
      outerStart,
      innerEnd,
      archRise,
      13.2,
      36,
      { broken: isBroken, hasColonnade: idx === 0 || idx === 4, seed: 300 + idx * 23 },
      ivoryParts,
      goldParts,
      ruinParts,
      bridgeDebrisSeeds,
    );
  }

  const grassGeo = mergeParts(grassParts);
  const rockGeo = mergeParts(rockParts);
  const ivoryGeo = mergeParts(ivoryParts);
  const goldGeo = mergeParts(goldParts);
  const ruinGeo = mergeParts(ruinParts);

  const grassMesh = new THREE.Mesh(grassGeo, palette.meadowGrass);
  grassMesh.receiveShadow = true;
  grassMesh.castShadow = true;

  const rockMesh = new THREE.Mesh(rockGeo, palette.cliffRock);
  rockMesh.castShadow = true;
  rockMesh.receiveShadow = true;

  const ivoryMesh = new THREE.Mesh(ivoryGeo, palette.ivoryStone);
  ivoryMesh.castShadow = true;
  ivoryMesh.receiveShadow = true;

  const goldMesh = new THREE.Mesh(goldGeo, palette.sacredGold);
  goldMesh.castShadow = true;

  const ruinMesh = new THREE.Mesh(ruinGeo, palette.ancientRuinStone);
  ruinMesh.castShadow = true;
  ruinMesh.receiveShadow = true;

  group.add(grassMesh, rockMesh, ivoryMesh, goldMesh, ruinMesh);

  // Additional suspended waterfalls cascading off outer ring islets 0 and 2!
  const waterfallAnchors: WaterfallAnchor[] = [0, 2, 6].map((idx) => {
    const isl = islets[idx];
    const outAng = isl.angle + 0.32;
    const r = getIsletLocalRadius(outAng, isl.radiusX, isl.radiusZ, 100 + idx * 19.3) * 0.96;
    return {
      position: new THREE.Vector3(
        isl.center.x + Math.cos(outAng) * r,
        isl.center.y + 1.2,
        isl.center.z + Math.sin(outAng) * r,
      ),
      outwardDir: new THREE.Vector3(Math.cos(outAng), 0, Math.sin(outAng)).normalize(),
      width: 7.5,
      dropLength: 145 + idx * 12,
    };
  });

  // Sacred grove tree spots across the 8 outer islets
  const rand = mulberry32(44821);
  const treeSpots: THREE.Vector3[] = [];
  for (const isl of islets) {
    const avgR = (isl.radiusX + isl.radiusZ) * 0.5;
    const count = Math.round(avgR * 0.24);
    for (let t = 0; t < count; t++) {
      const ta = rand() * Math.PI * 2;
      const tr = avgR * (0.54 + rand() * 0.34);
      treeSpots.push(
        new THREE.Vector3(
          isl.center.x + Math.cos(ta) * tr,
          isl.center.y + 2.8,
          isl.center.z + Math.sin(ta) * tr,
        ),
      );
    }
  }

  return {
    group,
    islets,
    waterfallAnchors,
    treeSpots,
    bridgeDebrisSeeds,
    dispose: () => {
      grassGeo.dispose();
      rockGeo.dispose();
      ivoryGeo.dispose();
      goldGeo.dispose();
      ruinGeo.dispose();
    },
  };
}
