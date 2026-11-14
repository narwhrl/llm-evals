import * as THREE from 'three';
import { CelestiaPalette } from '../core/materials';
import { composeMatrix, mergeParts, preparePart } from '../core/math';

export interface CentralSanctumHandle {
  group: THREE.Group;
  armillaryCenter: THREE.Vector3;
  update: (elapsed: number) => void;
  dispose: () => void;
}

/**
 * Helper to create a pointed celestial arch (two curved gothic-lancet ribs meeting at an apex)
 * in the XY plane centered at origin, spanning [-halfSpan, +halfSpan] and rising to archHeight.
 */
function buildPointedArchParts(
  halfSpan: number,
  archHeight: number,
  thickness: number,
  worldMatrix: THREE.Matrix4,
): THREE.BufferGeometry[] {
  const parts: THREE.BufferGeometry[] = [];
  const segs = 7;

  for (const side of [-1, 1]) {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      // Parabolic-lancet curve from (side * halfSpan, 0) up to (0, archHeight)
      const x = side * halfSpan * Math.pow(1 - t, 1.25);
      const y = archHeight * Math.sin(t * Math.PI * 0.5);
      pts.push(new THREE.Vector3(x, y, 0));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.TubeGeometry(curve, 10, thickness, 6, false);
    parts.push(preparePart(tube, worldMatrix));
    tube.dispose();
  }

  // Keystone diamond at apex
  const keystone = new THREE.OctahedronGeometry(thickness * 2.1, 0);
  const km = worldMatrix.clone().multiply(composeMatrix(0, archHeight, 0, 0, 0, 0, 0.85, 1.55, 0.85));
  parts.push(preparePart(keystone, km));
  keystone.dispose();

  return parts;
}

/**
 * Builds a circular colonnaded arcade tier with slender fluted columns, pointed celestial arches,
 * recessed inner core cylinder, cornices, and corner spirelets.
 */
function addCircularArcadeTier(
  ivoryParts: THREE.BufferGeometry[],
  goldParts: THREE.BufferGeometry[],
  recessParts: THREE.BufferGeometry[],
  glowParts: THREE.BufferGeometry[],
  opts: {
    yBase: number;
    height: number;
    radius: number;
    colCount: number;
    colRadius: number;
    hasGlowWindows?: boolean;
    pinnacleHeight?: number;
  },
): void {
  const { yBase, height, radius, colCount, colRadius } = opts;

  // Base plinth & upper entablature rings
  const plinthH = height * 0.1;
  const entH = height * 0.12;
  const shaftH = height - plinthH - entH;

  const plinth = new THREE.CylinderGeometry(radius + 1.4, radius + 2.4, plinthH, colCount * 2);
  ivoryParts.push(preparePart(plinth, composeMatrix(0, yBase + plinthH * 0.5, 0)));
  plinth.dispose();

  // Inner recessed dark-indigo sanctuary core so arches have crisp 3D depth
  const coreRadius = radius * 0.78;
  const core = new THREE.CylinderGeometry(coreRadius * 0.96, coreRadius, height * 0.96, colCount);
  recessParts.push(preparePart(core, composeMatrix(0, yBase + height * 0.48, 0)));
  core.dispose();

  // Optional warm golden lancet sanctuary windows recessed on the inner core
  if (opts.hasGlowWindows) {
    for (let i = 0; i < colCount; i++) {
      const ang = ((i + 0.5) / colCount) * Math.PI * 2;
      const wx = Math.cos(ang) * (coreRadius + 0.25);
      const wz = Math.sin(ang) * (coreRadius + 0.25);
      const win = new THREE.BoxGeometry(1.5, shaftH * 0.58, 0.5);
      glowParts.push(
        preparePart(win, composeMatrix(wx, yBase + plinthH + shaftH * 0.48, wz, 0, -ang + Math.PI / 2, 0)),
      );
      win.dispose();
    }
  }

  // Columns + pointed arches spanning between adjacent columns
  const chord = 2 * radius * Math.sin(Math.PI / colCount);
  const archRise = Math.min(shaftH * 0.34, chord * 0.78);
  const pillarH = shaftH - archRise * 0.55;

  for (let i = 0; i < colCount; i++) {
    const a0 = (i / colCount) * Math.PI * 2;
    const a1 = ((i + 1) / colCount) * Math.PI * 2;
    const aMid = (a0 + a1) * 0.5;

    const cx = Math.cos(a0) * radius;
    const cz = Math.sin(a0) * radius;

    // Column shaft
    const col = new THREE.CylinderGeometry(colRadius * 0.86, colRadius, pillarH, 10);
    ivoryParts.push(preparePart(col, composeMatrix(cx, yBase + plinthH + pillarH * 0.5, cz)));
    col.dispose();

    // Column base & capital
    const cap = new THREE.CylinderGeometry(colRadius * 1.45, colRadius * 0.95, colRadius * 1.8, 8);
    ivoryParts.push(preparePart(cap, composeMatrix(cx, yBase + plinthH + pillarH, cz)));
    cap.dispose();

    const goldRing = new THREE.TorusGeometry(colRadius * 1.12, colRadius * 0.22, 6, 12);
    goldParts.push(
      preparePart(goldRing, composeMatrix(cx, yBase + plinthH + pillarH - colRadius * 0.7, cz, Math.PI / 2, 0, 0)),
    );
    goldRing.dispose();

    // Pointed arch between column i and i+1
    const mx = Math.cos(aMid) * (radius * Math.cos(Math.PI / colCount));
    const mz = Math.sin(aMid) * (radius * Math.cos(Math.PI / colCount));
    const archMat = composeMatrix(
      mx,
      yBase + plinthH + pillarH,
      mz,
      0,
      -aMid + Math.PI / 2,
      0,
    );
    ivoryParts.push(...buildPointedArchParts(chord * 0.5, archRise, colRadius * 0.58, archMat));
  }

  // Upper cornice & golden frieze band
  const entY = yBase + height - entH * 0.5;
  const ent = new THREE.CylinderGeometry(radius + 2.1, radius + 0.8, entH, colCount * 2);
  ivoryParts.push(preparePart(ent, composeMatrix(0, entY, 0)));
  ent.dispose();

  const frieze = new THREE.TorusGeometry(radius + 1.55, 0.48, 8, colCount * 3);
  goldParts.push(preparePart(frieze, composeMatrix(0, entY + entH * 0.18, 0, Math.PI / 2, 0, 0)));
  frieze.dispose();

  // Slender celestial pinnacles around the tier cornice
  if (opts.pinnacleHeight && opts.pinnacleHeight > 0) {
    const pCount = Math.max(6, Math.floor(colCount / 2));
    const pH = opts.pinnacleHeight;
    for (let i = 0; i < pCount; i++) {
      const ang = (i / pCount) * Math.PI * 2;
      const px = Math.cos(ang) * (radius + 1.2);
      const pz = Math.sin(ang) * (radius + 1.2);

      const pBase = new THREE.CylinderGeometry(1.15, 1.55, pH * 0.32, 6);
      ivoryParts.push(preparePart(pBase, composeMatrix(px, yBase + height + pH * 0.16, pz, 0, ang, 0)));
      pBase.dispose();

      const pNeedle = new THREE.ConeGeometry(1.15, pH * 0.68, 6);
      ivoryParts.push(preparePart(pNeedle, composeMatrix(px, yBase + height + pH * 0.66, pz, 0, ang, 0)));
      pNeedle.dispose();

      const pTip = new THREE.OctahedronGeometry(0.75, 0);
      goldParts.push(
        preparePart(pTip, composeMatrix(px, yBase + height + pH + 1.1, pz, 0, ang, 0, 0.7, 1.8, 0.7)),
      );
      pTip.dispose();
    }
  }
}

/**
 * Builds one ornate golden gimbal ring for the colossal top Armillary Sphere.
 */
function createArmillaryRingGeometry(
  radius: number,
  bandThickness: number,
  spokePairs: number,
  notchCount: number,
): { goldGeo: THREE.BufferGeometry; ivoryAccentGeo: THREE.BufferGeometry | null } {
  const goldParts: THREE.BufferGeometry[] = [];
  const ivoryParts: THREE.BufferGeometry[] = [];

  // Primary beveled hexagonal-section golden ring
  const mainTorus = new THREE.TorusGeometry(radius, bandThickness, 8, 96);
  goldParts.push(preparePart(mainTorus, composeMatrix(0, 0, 0, 0, 0, 0, 1, 1, 0.58)));
  mainTorus.dispose();

  // Parallel inner filigree sub-ring
  const innerR = radius - bandThickness * 2.45;
  const subTorus = new THREE.TorusGeometry(innerR, bandThickness * 0.42, 6, 72);
  goldParts.push(preparePart(subTorus));
  subTorus.dispose();

  // Engraved degree notches / astrolabe struts connecting outer & inner ring
  for (let i = 0; i < notchCount; i++) {
    const a = (i / notchCount) * Math.PI * 2;
    const isMajor = i % 4 === 0;
    const midR = (radius + innerR) * 0.5;
    const strutLen = radius - innerR + (isMajor ? bandThickness * 2.4 : 0);
    const strut = new THREE.BoxGeometry(
      bandThickness * (isMajor ? 0.85 : 0.42),
      strutLen,
      bandThickness * 0.7,
    );
    goldParts.push(
      preparePart(
        strut,
        composeMatrix(Math.cos(a) * midR, Math.sin(a) * midR, 0, 0, 0, a - Math.PI / 2),
      ),
    );
    strut.dispose();
  }

  // Cardinal celestial star / diamond pointers on outer perimeter
  const cardinalCount = 4;
  for (let c = 0; c < cardinalCount; c++) {
    const a = (c / cardinalCount) * Math.PI * 2;
    const pointerLen = bandThickness * 4.2;
    const diamond = new THREE.OctahedronGeometry(bandThickness * 1.45, 0);
    goldParts.push(
      preparePart(
        diamond,
        composeMatrix(
          Math.cos(a) * (radius + pointerLen * 0.42),
          Math.sin(a) * (radius + pointerLen * 0.42),
          0,
          0,
          0,
          a - Math.PI / 2,
          0.72,
          1.95,
          0.62,
        ),
      ),
    );
    diamond.dispose();

    // Subtle ivory inlaid medallion at cardinal nodes
    const jewel = new THREE.OctahedronGeometry(bandThickness * 0.82, 0);
    ivoryParts.push(
      preparePart(
        jewel,
        composeMatrix(Math.cos(a) * radius, Math.sin(a) * radius, 0, 0, 0, a, 0.8, 0.8, 1.3),
      ),
    );
    jewel.dispose();
  }

  // Optional delicate astrolabe cross-bars spanning to the inner hub
  for (let s = 0; s < spokePairs; s++) {
    const a = (s / spokePairs) * Math.PI;
    const bar = new THREE.CylinderGeometry(
      bandThickness * 0.26,
      bandThickness * 0.26,
      innerR * 1.98,
      6,
    );
    goldParts.push(preparePart(bar, composeMatrix(0, 0, 0, 0, 0, a)));
    bar.dispose();
  }

  return {
    goldGeo: mergeParts(goldParts),
    ivoryAccentGeo: ivoryParts.length > 0 ? mergeParts(ivoryParts) : null,
  };
}

export function createCentralSanctum(
  palette: CelestiaPalette,
  baseY: number,
): CentralSanctumHandle {
  const group = new THREE.Group();
  group.name = 'CentralSanctum';

  const ivoryParts: THREE.BufferGeometry[] = [];
  const goldParts: THREE.BufferGeometry[] = [];
  const recessParts: THREE.BufferGeometry[] = [];
  const glowParts: THREE.BufferGeometry[] = [];
  const disposables: THREE.BufferGeometry[] = [];

  // 1. Grand Sacred Base Podium & Radial Plaza (y = baseY .. baseY + 18)
  const y0 = baseY - 2;
  const podium1 = new THREE.CylinderGeometry(68, 74, 8, 24);
  ivoryParts.push(preparePart(podium1, composeMatrix(0, y0 + 4, 0)));
  podium1.dispose();

  const podium2 = new THREE.CylinderGeometry(56, 60, 7, 24);
  ivoryParts.push(preparePart(podium2, composeMatrix(0, y0 + 11.5, 0)));
  podium2.dispose();

  // Plaza compass marble disc
  const plazaDiscGeo = new THREE.CylinderGeometry(55.6, 55.6, 0.9, 48);
  plazaDiscGeo.translate(0, y0 + 15.2, 0);
  const plazaDiscMesh = new THREE.Mesh(plazaDiscGeo, palette.plazaMarble);
  plazaDiscMesh.receiveShadow = true;
  group.add(plazaDiscMesh);
  disposables.push(plazaDiscGeo);

  // 6 ceremonial grand staircases + flanking obelisks around the podium
  for (let s = 0; s < 6; s++) {
    const ang = (s / 6) * Math.PI * 2;
    for (let st = 0; st < 6; st++) {
      const r = 57 + st * 3.2;
      const sy = y0 + 14 - st * 2.3;
      const step = new THREE.BoxGeometry(13, 2.5, 3.8);
      ivoryParts.push(
        preparePart(
          step,
          composeMatrix(Math.cos(ang) * r, sy, Math.sin(ang) * r, 0, -ang + Math.PI / 2, 0),
        ),
      );
      step.dispose();
    }

    // Twin entrance obelisks
    for (const side of [-1, 1]) {
      const perp = ang + Math.PI / 2;
      const ox = Math.cos(ang) * 72 + Math.cos(perp) * side * 8.2;
      const oz = Math.sin(ang) * 72 + Math.sin(perp) * side * 8.2;
      const obBase = new THREE.BoxGeometry(2.8, 5, 2.8);
      ivoryParts.push(preparePart(obBase, composeMatrix(ox, y0 + 2.5, oz, 0, -ang, 0)));
      obBase.dispose();
      const obShaft = new THREE.ConeGeometry(1.5, 16, 4);
      ivoryParts.push(preparePart(obShaft, composeMatrix(ox, y0 + 13, oz, 0, -ang + Math.PI / 4, 0)));
      obShaft.dispose();
      const obGold = new THREE.OctahedronGeometry(1.05, 0);
      goldParts.push(preparePart(obGold, composeMatrix(ox, y0 + 22.2, oz, 0, -ang, 0, 0.8, 1.7, 0.8)));
      obGold.dispose();
    }
  }

  // Outer Plaza Peristyle Colonnade Ring (radius 52, 24 slender columns & arches)
  const peristyleY = y0 + 15.4;
  const periCols = 24;
  const periR = 52;
  const periH = 19;
  const periChord = 2 * periR * Math.sin(Math.PI / periCols);
  for (let i = 0; i < periCols; i++) {
    const a0 = (i / periCols) * Math.PI * 2;
    const aMid = ((i + 0.5) / periCols) * Math.PI * 2;
    const cx = Math.cos(a0) * periR;
    const cz = Math.sin(a0) * periR;

    const col = new THREE.CylinderGeometry(0.85, 1.05, periH, 10);
    ivoryParts.push(preparePart(col, composeMatrix(cx, peristyleY + periH * 0.5, cz)));
    col.dispose();

    // Leave open grand portals aligned with the 6 staircases, arch the rest
    const archMat = composeMatrix(
      Math.cos(aMid) * periR * 0.99,
      peristyleY + periH * 0.72,
      Math.sin(aMid) * periR * 0.99,
      0,
      -aMid + Math.PI / 2,
      0,
    );
    ivoryParts.push(...buildPointedArchParts(periChord * 0.5, 5.4, 0.55, archMat));
  }
  const periCornice = new THREE.TorusGeometry(periR, 1.15, 8, 72);
  ivoryParts.push(
    preparePart(periCornice, composeMatrix(0, peristyleY + periH + 0.6, 0, Math.PI / 2, 0, 0)),
  );
  periCornice.dispose();

  // 2. Six Slender Satellite Needle-Towers + Sweeping Flying Arch Buttresses
  const satR = 43.5;
  for (let s = 0; s < 6; s++) {
    const ang = ((s + 0.5) / 6) * Math.PI * 2;
    const sx = Math.cos(ang) * satR;
    const sz = Math.sin(ang) * satR;
    const sy = peristyleY;

    const towerShaft = new THREE.CylinderGeometry(3.2, 4.8, 52, 8);
    ivoryParts.push(preparePart(towerShaft, composeMatrix(sx, sy + 26, sz, 0, ang, 0)));
    towerShaft.dispose();

    const lantern = new THREE.CylinderGeometry(2.6, 3.2, 18, 8);
    ivoryParts.push(preparePart(lantern, composeMatrix(sx, sy + 61, sz, 0, ang, 0)));
    lantern.dispose();

    const needle = new THREE.ConeGeometry(2.7, 36, 8);
    ivoryParts.push(preparePart(needle, composeMatrix(sx, sy + 88, sz, 0, ang, 0)));
    needle.dispose();

    const satFinial = new THREE.OctahedronGeometry(1.2, 0);
    goldParts.push(
      preparePart(satFinial, composeMatrix(sx, sy + 107.5, sz, 0, ang, 0, 0.75, 2.0, 0.75)),
    );
    satFinial.dispose();

    // Two tiers of sweeping flying buttresses bridging inward from satellite tower to main sanctum
    for (const tierIdx of [0, 1]) {
      const outerY = sy + (tierIdx === 0 ? 38 : 64);
      const innerY = sy + (tierIdx === 0 ? 58 : 92);
      const innerR = tierIdx === 0 ? 32 : 24;
      const curvePts: THREE.Vector3[] = [];
      for (let k = 0; k <= 8; k++) {
        const kt = k / 8;
        const kr = satR + (innerR - satR) * kt;
        const ky =
          outerY + (innerY - outerY) * Math.pow(kt, 0.72) + Math.sin(kt * Math.PI) * 5.5;
        curvePts.push(new THREE.Vector3(Math.cos(ang) * kr, ky, Math.sin(ang) * kr));
      }
      const flyCurve = new THREE.CatmullRomCurve3(curvePts);
      const flyTube = new THREE.TubeGeometry(flyCurve, 12, 1.05, 6, false);
      ivoryParts.push(preparePart(flyTube));
      flyTube.dispose();
    }
  }

  // 3. Stacked Multi-Tier Central Sanctum Tower (y = peristyleY .. ~356)
  // Tier A: Grand Lower Rotunda Hall
  const tierAY = peristyleY;
  const tierAH = 74;
  addCircularArcadeTier(ivoryParts, goldParts, recessParts, glowParts, {
    yBase: tierAY,
    height: tierAH,
    radius: 32,
    colCount: 16,
    colRadius: 1.35,
    hasGlowWindows: true,
    pinnacleHeight: 24,
  });

  // Tier B: Mid Celestial Lancet Arcade
  const tierBY = tierAY + tierAH;
  const tierBH = 72;
  addCircularArcadeTier(ivoryParts, goldParts, recessParts, glowParts, {
    yBase: tierBY,
    height: tierBH,
    radius: 23,
    colCount: 12,
    colRadius: 1.12,
    hasGlowWindows: true,
    pinnacleHeight: 26,
  });

  // 4 upper flying buttresses from Tier B to Tier C
  for (let b = 0; b < 4; b++) {
    const ang = (b / 4) * Math.PI * 2 + Math.PI / 4;
    const pts = [
      new THREE.Vector3(Math.cos(ang) * 22.5, tierBY + tierBH - 4, Math.sin(ang) * 22.5),
      new THREE.Vector3(Math.cos(ang) * 19.0, tierBY + tierBH + 18, Math.sin(ang) * 19.0),
      new THREE.Vector3(Math.cos(ang) * 15.2, tierBY + tierBH + 34, Math.sin(ang) * 15.2),
    ];
    const tube = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 10, 0.95, 6, false);
    ivoryParts.push(preparePart(tube));
    tube.dispose();
  }

  // Tier C: Slender Upper Sanctum Lantern
  const tierCY = tierBY + tierBH;
  const tierCH = 56;
  addCircularArcadeTier(ivoryParts, goldParts, recessParts, glowParts, {
    yBase: tierCY,
    height: tierCH,
    radius: 15.2,
    colCount: 10,
    colRadius: 0.92,
    hasGlowWindows: true,
    pinnacleHeight: 22,
  });

  // Tier D: Soaring Fluted Alabaster Spire Needle (y = tierCY + tierCH .. +112)
  const spireBaseY = tierCY + tierCH;
  const spireLowerH = 44;
  const spireUpperH = 68;

  const spireLower = new THREE.CylinderGeometry(6.8, 11.8, spireLowerH, 12);
  ivoryParts.push(preparePart(spireLower, composeMatrix(0, spireBaseY + spireLowerH * 0.5, 0)));
  spireLower.dispose();

  const spireNeedle = new THREE.ConeGeometry(6.9, spireUpperH, 12);
  ivoryParts.push(
    preparePart(spireNeedle, composeMatrix(0, spireBaseY + spireLowerH + spireUpperH * 0.5, 0)),
  );
  spireNeedle.dispose();

  // Golden astrolabe collars ringing the soaring spire shaft
  const collarOffsets = [12, 28, 44, 66, 86, 102];
  for (let i = 0; i < collarOffsets.length; i++) {
    const cy = spireBaseY + collarOffsets[i];
    const t = collarOffsets[i] / (spireLowerH + spireUpperH);
    const cr = 11.8 * (1 - t * 0.88) + 0.6;
    const collar = new THREE.TorusGeometry(cr, 0.55 * (1 - t * 0.35), 8, 32);
    goldParts.push(preparePart(collar, composeMatrix(0, cy, 0, Math.PI / 2, 0, 0)));
    collar.dispose();
  }

  // Iconic Genshin Celestial Nail / Detached Levitating Fin Blades around the upper spire!
  const bladeGroup = new THREE.Group();
  const bladeIvoryParts: THREE.BufferGeometry[] = [];
  const bladeGoldParts: THREE.BufferGeometry[] = [];
  for (let b = 0; b < 4; b++) {
    const ang = (b / 4) * Math.PI * 2;
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 10; k++) {
      const kt = k / 10;
      const rad = 18.5 - kt * 9.5 + Math.sin(kt * Math.PI) * 3.8;
      const by = spireBaseY + 8 + kt * 92;
      pts.push(new THREE.Vector3(Math.cos(ang) * rad, by, Math.sin(ang) * rad));
    }
    const bladeCurve = new THREE.CatmullRomCurve3(pts);
    const bladeGeo = new THREE.TubeGeometry(bladeCurve, 16, 1.15, 4, false);
    bladeIvoryParts.push(preparePart(bladeGeo));
    bladeGeo.dispose();

    // Gold spine trim along outer edge of each levitating fin
    const goldPts = pts.map((p) =>
      new THREE.Vector3(p.x * 1.07, p.y, p.z * 1.07),
    );
    const goldSpine = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(goldPts), 14, 0.38, 4, false);
    bladeGoldParts.push(preparePart(goldSpine));
    goldSpine.dispose();
  }
  const bladeIvoryGeo = mergeParts(bladeIvoryParts);
  const bladeGoldGeo = mergeParts(bladeGoldParts);
  disposables.push(bladeIvoryGeo, bladeGoldGeo);

  const bladeIvoryMesh = new THREE.Mesh(bladeIvoryGeo, palette.ivoryTrim);
  bladeIvoryMesh.castShadow = true;
  const bladeGoldMesh = new THREE.Mesh(bladeGoldGeo, palette.sacredGold);
  bladeGroup.add(bladeIvoryMesh, bladeGoldMesh);
  group.add(bladeGroup);

  // Golden cradle finial crowning the spire needle just beneath the colossal Armillary
  const spireApexY = spireBaseY + spireLowerH + spireUpperH;
  const cradleStem = new THREE.CylinderGeometry(0.65, 1.4, 14, 8);
  goldParts.push(preparePart(cradleStem, composeMatrix(0, spireApexY + 6, 0)));
  cradleStem.dispose();

  const cradleCrescent = new THREE.TorusGeometry(14, 0.95, 8, 36, Math.PI * 0.86);
  goldParts.push(
    preparePart(
      cradleCrescent,
      composeMatrix(0, spireApexY + 24, 0, 0, 0, Math.PI + (Math.PI - Math.PI * 0.86) * 0.5),
    ),
  );
  cradleCrescent.dispose();

  // Merge static sanctum geometry
  const ivoryGeo = mergeParts(ivoryParts);
  const goldGeo = mergeParts(goldParts);
  const recessGeo = mergeParts(recessParts);
  const glowGeo = mergeParts(glowParts);
  disposables.push(ivoryGeo, goldGeo, recessGeo, glowGeo);

  const ivoryMesh = new THREE.Mesh(ivoryGeo, palette.ivoryStone);
  ivoryMesh.castShadow = true;
  ivoryMesh.receiveShadow = true;

  const goldMesh = new THREE.Mesh(goldGeo, palette.sacredGold);
  goldMesh.castShadow = true;

  const recessMesh = new THREE.Mesh(recessGeo, palette.sanctumRecess);
  recessMesh.receiveShadow = true;

  const glowMesh = new THREE.Mesh(glowGeo, palette.sanctumGlow);

  group.add(ivoryMesh, goldMesh, recessMesh, glowMesh);

  // 4. Colossal Interlocking Golden Armillary Ritual Apparatus at the Spire Apex!
  // Positioned prominently above the spire crown so its silhouette dominates the sky
  const armillaryY = spireApexY + 62;
  const armillaryRoot = new THREE.Group();
  armillaryRoot.position.set(0, armillaryY, 0);
  group.add(armillaryRoot);

  const ringConfigs = [
    // Outer meridian & ecliptic rings — bold architectural thickness for distant legibility
    { radius: 52, band: 2.15, spokes: 0, notches: 32, initEuler: [0.34, 0.42, 0.18], speed: [0.025, 0.065, 0.01] },
    { radius: 46, band: 1.95, spokes: 1, notches: 28, initEuler: [-0.62, 0.95, 0.48], speed: [-0.04, -0.055, 0.025] },
    { radius: 39.5, band: 1.75, spokes: 0, notches: 24, initEuler: [0.98, -0.38, -0.52], speed: [0.055, 0.03, -0.04] },
    { radius: 33, band: 1.58, spokes: 1, notches: 20, initEuler: [-0.28, 1.48, -0.78], speed: [-0.03, 0.075, 0.035] },
    { radius: 26, band: 1.42, spokes: 2, notches: 16, initEuler: [1.22, 0.55, 0.64], speed: [0.07, -0.045, 0.05] },
    { radius: 18.5, band: 1.25, spokes: 2, notches: 12, initEuler: [-0.85, -0.72, 0.35], speed: [-0.085, 0.06, -0.065] },
  ];

  const ringGroups: { group: THREE.Group; initEuler: number[]; speed: number[] }[] = [];

  for (const cfg of ringConfigs) {
    const ringGrp = new THREE.Group();
    const { goldGeo: rGold, ivoryAccentGeo: rIvory } = createArmillaryRingGeometry(
      cfg.radius,
      cfg.band,
      cfg.spokes,
      cfg.notches,
    );
    disposables.push(rGold);

    const rGoldMesh = new THREE.Mesh(rGold, palette.armillaryGold);
    rGoldMesh.castShadow = true;
    ringGrp.add(rGoldMesh);

    if (rIvory) {
      disposables.push(rIvory);
      const rIvoryMesh = new THREE.Mesh(rIvory, palette.ivoryTrim);
      ringGrp.add(rIvoryMesh);
    }

    ringGrp.rotation.set(cfg.initEuler[0], cfg.initEuler[1], cfg.initEuler[2]);
    armillaryRoot.add(ringGrp);
    ringGroups.push({ group: ringGrp, initEuler: cfg.initEuler, speed: cfg.speed });
  }

  // Radiant Celestial Four-Pointed Star Core inside the Armillary
  const coreGroup = new THREE.Group();
  const coreParts: THREE.BufferGeometry[] = [];
  const spearV = new THREE.OctahedronGeometry(4.2, 0);
  coreParts.push(preparePart(spearV, composeMatrix(0, 0, 0, 0, 0, 0, 0.85, 3.4, 0.85)));
  coreParts.push(preparePart(spearV, composeMatrix(0, 0, 0, 0, 0, 0, 2.8, 0.78, 0.78)));
  coreParts.push(preparePart(spearV, composeMatrix(0, 0, 0, 0, 0, 0, 0.78, 0.78, 2.8)));
  spearV.dispose();

  const coreStarGeo = mergeParts(coreParts);
  disposables.push(coreStarGeo);
  const coreStarMesh = new THREE.Mesh(coreStarGeo, palette.sanctumGlow);
  coreGroup.add(coreStarMesh);
  armillaryRoot.add(coreGroup);

  return {
    group,
    armillaryCenter: new THREE.Vector3(0, armillaryY, 0),
    update: (elapsed: number) => {
      for (const rg of ringGroups) {
        rg.group.rotation.set(
          rg.initEuler[0] + elapsed * rg.speed[0],
          rg.initEuler[1] + elapsed * rg.speed[1],
          rg.initEuler[2] + elapsed * rg.speed[2],
        );
      }
      coreGroup.rotation.y = elapsed * 0.24;
      bladeGroup.position.y = Math.sin(elapsed * 0.75) * 1.6;
    },
    dispose: () => {
      for (const d of disposables) d.dispose();
    },
  };
}
