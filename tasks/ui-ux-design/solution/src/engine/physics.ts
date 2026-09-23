import { Node3D, Strut, Cable, ChapterId } from '../types';

export class TensegritySystem {
  nodes: Node3D[] = [];
  struts: Strut[] = [];
  cables: Cable[] = [];

  // Physics parameters
  damping: number = 0.94;
  strutStiffness: number = 0.85;
  cableStiffness: number = 0.45;
  gravity: number = 0.0;
  equilibriumEnergy: number = 0;

  // View & Camera rotation
  rotX: number = 0.3;
  rotY: number = 0.5;
  targetRotX: number = 0.3;
  targetRotY: number = 0.5;
  velRotX: number = 0;
  velRotY: number = 0.003;

  // Interaction
  draggedNodeIndex: number | null = null;
  dragTarget: { x: number; y: number; z: number } | null = null;
  cursorInfluence: { x: number; y: number; active: boolean } = { x: 0, y: 0, active: false };

  // Current chapter
  currentChapter: ChapterId = 'inception';

  // Strain callback for audio synthesis
  onStrainChange?: (maxTensionDelta: number, activeNodeIndex: number) => void;

  constructor() {
    this.buildChapter('inception');
  }

  public setChapter(chapter: ChapterId) {
    if (this.currentChapter === chapter) return;
    this.currentChapter = chapter;
    this.morphToChapter(chapter);
  }

  public buildChapter(chapter: ChapterId) {
    this.currentChapter = chapter;
    this.nodes = [];
    this.struts = [];
    this.cables = [];

    if (chapter === 'inception') {
      this.init3StrutPrism(140);
    } else if (chapter === 'tension') {
      this.init6StrutIcosahedron(170);
    } else if (chapter === 'dialectic') {
      this.initBifurcatedChamber(160);
    } else if (chapter === 'artifact') {
      this.initPlanarSeal(180);
    }
  }

  public morphToChapter(chapter: ChapterId) {
    const tempSystem = new TensegritySystem();
    tempSystem.buildChapter(chapter);

    if (this.nodes.length === tempSystem.nodes.length) {
      for (let i = 0; i < this.nodes.length; i++) {
        const target = tempSystem.nodes[i];
        this.nodes[i].vx += (target.x - this.nodes[i].x) * 0.15;
        this.nodes[i].vy += (target.y - this.nodes[i].y) * 0.15;
        this.nodes[i].vz += (target.z - this.nodes[i].z) * 0.15;
      }
      this.struts = tempSystem.struts;
      this.cables = tempSystem.cables;
    } else {
      for (const n of this.nodes) {
        n.vx += (Math.random() - 0.5) * 8;
        n.vy += (Math.random() - 0.5) * 8;
        n.vz += (Math.random() - 0.5) * 8;
      }
      setTimeout(() => {
        this.buildChapter(chapter);
      }, 150);
    }
  }

  // --- Dynamic Dialectic Coupling (Chapter 3) ---
  public setDialecticCoupling(ratio: number) {
    if (this.currentChapter !== 'dialectic') return;
    for (const cable of this.cables) {
      if (cable.id.startsWith('c-dialectic')) {
        cable.restLength = 180 * (1.6 - ratio * 0.7);
        cable.stiffness = 0.25 + ratio * 0.55;
      }
    }
  }

  // --- Dynamic Seal Topology (Chapter 4) ---
  public updateSealTopology(points: number, twistDeg: number, tensionRatio: number, radius: number = 180) {
    if (this.currentChapter !== 'artifact') return;
    const numPoints = Math.max(6, Math.min(16, points));
    const rOuter = radius;
    const rInner = radius * 0.52 * tensionRatio;
    const twist = (twistDeg * Math.PI) / 180;

    this.nodes = [];
    this.struts = [];
    this.cables = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints + twist;
      const r = i % 2 === 0 ? rOuter : rInner;
      const zOffset = (i % 2 === 0 ? 1 : -1) * 35;

      this.nodes.push({
        id: i,
        x: r * Math.cos(angle),
        y: r * Math.sin(angle),
        z: zOffset,
        vx: 0,
        vy: 0,
        vz: 0,
        mass: 1.0,
        label: `V${i}`,
      });
    }

    // Center focal node
    this.nodes.push({
      id: numPoints,
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      mass: 1.5,
      label: 'SEAL-NEXUS',
    });

    for (let i = 0; i < numPoints; i += 2) {
      const dist = this.distance(this.nodes[numPoints], this.nodes[i]);
      this.struts.push({
        id: `s-seal-${i}`,
        nodeA: numPoints,
        nodeB: i,
        targetLength: dist,
        currentLength: dist,
        compression: 0,
        thickness: 5.0,
      });
    }

    for (let i = 0; i < numPoints; i++) {
      const next = (i + 1) % numPoints;
      const dist = this.distance(this.nodes[i], this.nodes[next]);
      this.cables.push({
        id: `c-seal-peri-${i}`,
        nodeA: i,
        nodeB: next,
        restLength: dist * 0.95,
        stiffness: 0.6,
        tension: 0,
        vibrationPhase: 0,
      });
    }

    for (let i = 0; i < numPoints; i += 2) {
      const opp = (i + 3) % numPoints;
      const dist = this.distance(this.nodes[i], this.nodes[opp]);
      this.cables.push({
        id: `c-seal-cross-${i}`,
        nodeA: i,
        nodeB: opp,
        restLength: dist * 0.93,
        stiffness: 0.4,
        tension: 0,
        vibrationPhase: 0,
      });
    }
  }

  // --- Chapter 1: 3-Strut Tensegrity Prism ---
  private init3StrutPrism(radius: number) {
    const h = radius * 0.9;
    const r = radius;
    const twist = Math.PI / 3;

    for (let i = 0; i < 3; i++) {
      const angleTop = (i * 2 * Math.PI) / 3;
      const angleBottom = angleTop + twist;

      this.nodes.push({
        id: i,
        x: r * Math.cos(angleTop),
        y: -h / 2,
        z: r * Math.sin(angleTop),
        vx: 0,
        vy: 0,
        vz: 0,
        mass: 1.0,
        label: `N${i}`,
      });

      this.nodes.push({
        id: i + 3,
        x: r * Math.cos(angleBottom),
        y: h / 2,
        z: r * Math.sin(angleBottom),
        vx: 0,
        vy: 0,
        vz: 0,
        mass: 1.0,
        label: `N${i + 3}`,
      });
    }

    const strutPairs: [number, number][] = [
      [0, 4],
      [1, 5],
      [2, 3],
    ];
    for (let i = 0; i < strutPairs.length; i++) {
      const [a, b] = strutPairs[i];
      const dist = this.distance(this.nodes[a], this.nodes[b]);
      this.struts.push({
        id: `s-${i}`,
        nodeA: a,
        nodeB: b,
        targetLength: dist,
        currentLength: dist,
        compression: 0,
        thickness: 4.5,
      });
    }

    const cablePairs: [number, number][] = [
      [0, 1], [1, 2], [2, 0],
      [3, 4], [4, 5], [5, 3],
      [0, 3], [1, 4], [2, 5],
      [0, 5], [1, 3], [2, 4],
    ];

    for (let i = 0; i < cablePairs.length; i++) {
      const [a, b] = cablePairs[i];
      const dist = this.distance(this.nodes[a], this.nodes[b]);
      this.cables.push({
        id: `c-${i}`,
        nodeA: a,
        nodeB: b,
        restLength: dist * 0.95,
        stiffness: 0.5,
        tension: 0,
        vibrationPhase: 0,
      });
    }
  }

  // --- Chapter 2: 6-Strut Tensegrity Icosahedron ---
  private init6StrutIcosahedron(radius: number) {
    const d = radius;
    const l = radius * 0.45;

    const strutDefs: [ [number, number, number], [number, number, number] ][] = [
      [[-d, l, 0], [d, l, 0]],
      [[-d, -l, 0], [d, -l, 0]],
      [[0, -d, l], [0, d, l]],
      [[0, -d, -l], [0, d, -l]],
      [[l, 0, -d], [l, 0, d]],
      [[-l, 0, -d], [-l, 0, d]],
    ];

    let nodeId = 0;
    for (let s = 0; s < strutDefs.length; s++) {
      const [p1, p2] = strutDefs[s];
      const idxA = nodeId++;
      const idxB = nodeId++;

      this.nodes.push({
        id: idxA,
        x: p1[0],
        y: p1[1],
        z: p1[2],
        vx: 0,
        vy: 0,
        vz: 0,
        mass: 1.0,
        label: `R${idxA}`,
      });
      this.nodes.push({
        id: idxB,
        x: p2[0],
        y: p2[1],
        z: p2[2],
        vx: 0,
        vy: 0,
        vz: 0,
        mass: 1.0,
        label: `R${idxB}`,
      });

      const dist = this.distance(this.nodes[idxA], this.nodes[idxB]);
      this.struts.push({
        id: `s-ico-${s}`,
        nodeA: idxA,
        nodeB: idxB,
        targetLength: dist,
        currentLength: dist,
        compression: 0,
        thickness: 4.0,
      });
    }

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const isStrut = this.struts.some(
          (s) => (s.nodeA === i && s.nodeB === j) || (s.nodeA === j && s.nodeB === i)
        );
        if (isStrut) continue;

        const dist = this.distance(this.nodes[i], this.nodes[j]);
        if (dist < radius * 1.55) {
          this.cables.push({
            id: `c-ico-${i}-${j}`,
            nodeA: i,
            nodeB: j,
            restLength: dist * 0.96,
            stiffness: 0.55,
            tension: 0,
            vibrationPhase: 0,
          });
        }
      }
    }
  }

  // --- Chapter 3: Bifurcated Dialectic Chamber ---
  private initBifurcatedChamber(radius: number) {
    const shift = radius * 0.75;
    const cageRadius = radius * 0.65;

    // Left Cage: Rigor & Disciplined Constraints
    const leftOffset = -shift;
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3;
      this.nodes.push({
        id: i,
        x: leftOffset + cageRadius * Math.cos(a),
        y: -cageRadius * 0.7,
        z: cageRadius * Math.sin(a),
        vx: 0,
        vy: 0,
        vz: 0,
        mass: 1.2,
        label: `RIGOR-${i}`,
      });
      this.nodes.push({
        id: i + 3,
        x: leftOffset + cageRadius * Math.cos(a + Math.PI / 3),
        y: cageRadius * 0.7,
        z: cageRadius * Math.sin(a + Math.PI / 3),
        vx: 0,
        vy: 0,
        vz: 0,
        mass: 1.2,
        label: `RIGOR-${i + 3}`,
      });
    }

    this.struts.push(
      { id: 'dl-s0', nodeA: 0, nodeB: 4, targetLength: 0, currentLength: 0, compression: 0, thickness: 4.5, color: '#005580' },
      { id: 'dl-s1', nodeA: 1, nodeB: 5, targetLength: 0, currentLength: 0, compression: 0, thickness: 4.5, color: '#005580' },
      { id: 'dl-s2', nodeA: 2, nodeB: 3, targetLength: 0, currentLength: 0, compression: 0, thickness: 4.5, color: '#005580' }
    );

    // Right Cage: Emergence & Intuitive Leap
    const rightOffset = shift;
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3;
      this.nodes.push({
        id: i + 6,
        x: rightOffset + cageRadius * Math.cos(a),
        y: -cageRadius * 0.7,
        z: cageRadius * Math.sin(a),
        vx: 0,
        vy: 0,
        vz: 0,
        mass: 1.2,
        label: `EMERGE-${i}`,
      });
      this.nodes.push({
        id: i + 9,
        x: rightOffset + cageRadius * Math.cos(a + Math.PI / 3),
        y: cageRadius * 0.7,
        z: cageRadius * Math.sin(a + Math.PI / 3),
        vx: 0,
        vy: 0,
        vz: 0,
        mass: 1.2,
        label: `EMERGE-${i + 3}`,
      });
    }

    this.struts.push(
      { id: 'dr-s0', nodeA: 6, nodeB: 10, targetLength: 0, currentLength: 0, compression: 0, thickness: 4.5, color: '#D9381E' },
      { id: 'dr-s1', nodeA: 7, nodeB: 11, targetLength: 0, currentLength: 0, compression: 0, thickness: 4.5, color: '#D9381E' },
      { id: 'dr-s2', nodeA: 8, nodeB: 9, targetLength: 0, currentLength: 0, compression: 0, thickness: 4.5, color: '#D9381E' }
    );

    for (const s of this.struts) {
      const d = this.distance(this.nodes[s.nodeA], this.nodes[s.nodeB]);
      s.targetLength = d;
      s.currentLength = d;
    }

    const intraCables: [number, number][] = [
      [0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [0, 3], [1, 4], [2, 5],
      [6, 7], [7, 8], [8, 6], [9, 10], [10, 11], [11, 9], [6, 9], [7, 10], [8, 11],
    ];
    for (let k = 0; k < intraCables.length; k++) {
      const [a, b] = intraCables[k];
      const d = this.distance(this.nodes[a], this.nodes[b]);
      this.cables.push({
        id: `c-intra-${k}`,
        nodeA: a,
        nodeB: b,
        restLength: d * 0.95,
        stiffness: 0.5,
        tension: 0,
        vibrationPhase: 0,
      });
    }

    // Dialectical Tension Bridges
    const dialecticBridges: [number, number][] = [
      [1, 6], [4, 9], [2, 7], [5, 10], [0, 8], [3, 11]
    ];
    for (let k = 0; k < dialecticBridges.length; k++) {
      const [a, b] = dialecticBridges[k];
      const d = this.distance(this.nodes[a], this.nodes[b]);
      this.cables.push({
        id: `c-dialectic-${k}`,
        nodeA: a,
        nodeB: b,
        restLength: d * 0.92,
        stiffness: 0.35,
        tension: 0,
        color: '#8E44AD',
        vibrationPhase: 0,
      });
    }
  }

  // --- Chapter 4: Initial Planar Seal ---
  private initPlanarSeal(radius: number) {
    this.updateSealTopology(8, 30, 1.0, radius);
  }

  // --- Physics Step Loop (Verlet Relaxation) ---
  public update(dt: number = 0.016) {
    this.rotX += (this.targetRotX - this.rotX) * 0.08 + this.velRotX;
    this.rotY += (this.targetRotY - this.rotY) * 0.08 + this.velRotY;

    this.velRotX *= 0.95;
    this.velRotY = this.velRotY * 0.98 + 0.0006;

    let totalEnergy = 0;
    let maxStrainDelta = 0;
    let mostStrainedNode = 0;

    // Cable Tension Calculation
    for (const cable of this.cables) {
      cable.vibrationPhase = (cable.vibrationPhase || 0) + dt * 26;
      const na = this.nodes[cable.nodeA];
      const nb = this.nodes[cable.nodeB];

      const dx = nb.x - na.x;
      const dy = nb.y - na.y;
      const dz = nb.z - na.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;

      if (dist > cable.restLength) {
        const delta = dist - cable.restLength;
        const force = delta * cable.stiffness;
        cable.tension = Math.min(1.0, delta / (cable.restLength * 0.5));

        if (cable.tension > maxStrainDelta) {
          maxStrainDelta = cable.tension;
          mostStrainedNode = cable.nodeA;
        }

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        const fz = (dz / dist) * force;

        if (!na.pinned && this.draggedNodeIndex !== cable.nodeA) {
          na.vx += (fx / na.mass) * dt * 25;
          na.vy += (fy / na.mass) * dt * 25;
          na.vz += (fz / na.mass) * dt * 25;
        }
        if (!nb.pinned && this.draggedNodeIndex !== cable.nodeB) {
          nb.vx -= (fx / nb.mass) * dt * 25;
          nb.vy -= (fy / nb.mass) * dt * 25;
          nb.vz -= (fz / nb.mass) * dt * 25;
        }
      } else {
        cable.tension = 0;
      }
    }

    // Compression Struts Calculation
    for (const strut of this.struts) {
      const na = this.nodes[strut.nodeA];
      const nb = this.nodes[strut.nodeB];

      const dx = nb.x - na.x;
      const dy = nb.y - na.y;
      const dz = nb.z - na.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;
      strut.currentLength = dist;

      const diff = dist - strut.targetLength;
      strut.compression = Math.abs(diff) / (strut.targetLength * 0.2);

      const force = diff * this.strutStiffness * 1.5;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      const fz = (dz / dist) * force;

      if (!na.pinned && this.draggedNodeIndex !== strut.nodeA) {
        na.vx += (fx / na.mass) * dt * 30;
        na.vy += (fy / na.mass) * dt * 30;
        na.vz += (fz / na.mass) * dt * 30;
      }
      if (!nb.pinned && this.draggedNodeIndex !== strut.nodeB) {
        nb.vx -= (fx / nb.mass) * dt * 30;
        nb.vy -= (fy / nb.mass) * dt * 30;
        nb.vz -= (fz / nb.mass) * dt * 30;
      }
    }

    // Node Positions & Equilibrium Relaxation
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      if (this.draggedNodeIndex === i && this.dragTarget) {
        node.vx = (this.dragTarget.x - node.x) * 0.35;
        node.vy = (this.dragTarget.y - node.y) * 0.35;
        node.vz = (this.dragTarget.z - node.z) * 0.35;
        node.x = this.dragTarget.x;
        node.y = this.dragTarget.y;
        node.z = this.dragTarget.z;
        continue;
      }

      const distToOrigin = Math.sqrt(node.x * node.x + node.y * node.y + node.z * node.z) || 1;
      const centering = 0.015;
      node.vx -= (node.x / distToOrigin) * distToOrigin * centering;
      node.vy -= (node.y / distToOrigin) * distToOrigin * centering;
      node.vz -= (node.z / distToOrigin) * distToOrigin * centering;

      node.vx *= this.damping;
      node.vy *= this.damping;
      node.vz *= this.damping;

      node.x += node.vx;
      node.y += node.vy;
      node.z += node.vz;

      totalEnergy += node.vx * node.vx + node.vy * node.vy + node.vz * node.vz;
    }

    this.equilibriumEnergy = totalEnergy;

    if (maxStrainDelta > 0.15 && this.onStrainChange) {
      this.onStrainChange(maxStrainDelta, mostStrainedNode);
    }
  }

  // --- Projection to Screen Coordinates ---
  public project(width: number, height: number, fov: number = 520) {
    const cx = width / 2;
    const cy = height / 2;

    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);

    for (const node of this.nodes) {
      const x1 = node.x * cosY + node.z * sinY;
      const y1 = node.y;
      const z1 = -node.x * sinY + node.z * cosY;

      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      const distance = fov + z2;
      const scale = distance > 10 ? fov / distance : 0.01;

      node.px = cx + x2 * scale;
      node.py = cy + y2 * scale;
      node.pz = z2;
      node.scale = scale;
    }
  }

  public findNearestNode(screenX: number, screenY: number, threshold: number = 32): number | null {
    let nearestIndex: number | null = null;
    let minDistance = threshold;

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (node.px === undefined || node.py === undefined) continue;

      const dx = screenX - node.px;
      const dy = screenY - node.py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDistance) {
        minDistance = dist;
        nearestIndex = i;
      }
    }

    return nearestIndex;
  }

  public unprojectMouseTo3D(screenX: number, screenY: number, width: number, height: number, zTarget: number = 0) {
    const cx = width / 2;
    const cy = height / 2;
    const fov = 520;

    const scale = (fov + zTarget) / fov;
    const x2 = (screenX - cx) * scale;
    const y2 = (screenY - cy) * scale;
    const z2 = zTarget;

    const cosX = Math.cos(-this.rotX);
    const sinX = Math.sin(-this.rotX);
    const x1 = x2;
    const y1 = y2 * cosX - z2 * sinX;
    const z1 = y2 * sinX + z2 * cosX;

    const cosY = Math.cos(-this.rotY);
    const sinY = Math.sin(-this.rotY);
    const x = x1 * cosY + z1 * sinY;
    const y = y1;
    const z = -x1 * sinY + z1 * cosY;

    return { x, y, z };
  }

  private distance(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  public exportSVG(width: number = 400, height: number = 400): string {
    this.project(width, height, 500);

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n`;
    svg += `  <rect width="100%" height="100%" fill="#FAF8F5" />\n`;
    svg += `  <circle cx="${width/2}" cy="${height/2}" r="${width*0.42}" fill="none" stroke="#D5CDBE" stroke-dasharray="3,3" stroke-width="1" />\n`;

    for (const cable of this.cables) {
      const na = this.nodes[cable.nodeA];
      const nb = this.nodes[cable.nodeB];
      if (na.px === undefined || na.py === undefined || nb.px === undefined || nb.py === undefined) continue;
      svg += `  <line x1="${na.px.toFixed(1)}" y1="${na.py.toFixed(1)}" x2="${nb.px.toFixed(1)}" y2="${nb.py.toFixed(1)}" stroke="#CDC7BD" stroke-width="1.2" />\n`;
    }

    for (const strut of this.struts) {
      const na = this.nodes[strut.nodeA];
      const nb = this.nodes[strut.nodeB];
      if (na.px === undefined || na.py === undefined || nb.px === undefined || nb.py === undefined) continue;
      svg += `  <line x1="${na.px.toFixed(1)}" y1="${na.py.toFixed(1)}" x2="${nb.px.toFixed(1)}" y2="${nb.py.toFixed(1)}" stroke="#181715" stroke-width="3.5" stroke-linecap="round" />\n`;
    }

    for (const node of this.nodes) {
      if (node.px === undefined || node.py === undefined) continue;
      svg += `  <circle cx="${node.px.toFixed(1)}" cy="${node.py.toFixed(1)}" r="4.5" fill="#D9381E" />\n`;
    }

    svg += `  <text x="${width/2}" y="${height - 24}" font-family="monospace" font-size="10" text-anchor="middle" fill="#7E7971">TENSEGRITY MIND // EQUILIBRIUM COORD: ${this.rotX.toFixed(2)}, ${this.rotY.toFixed(2)}</text>\n`;
    svg += `</svg>`;
    return svg;
  }
}
