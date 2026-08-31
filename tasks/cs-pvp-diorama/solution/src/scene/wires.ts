import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshToonMaterial,
  SphereGeometry,
} from 'three';

import { woodMaterial, metalMaterial, toonMaterial } from '../util/materials';

// Power poles + sagging wires strung between them.
export function buildWires(): Group {
  const g = new Group();
  g.name = 'wires';

  // Two poles: one near T-spawn corner, one near B site corner.
  const polePositions: [number, number][] = [
    [-3.6, -3.4],
    [3.4, -3.4],
    [-3.6, 3.4],
    [3.4, 3.4],
  ];

  for (const [x, z] of polePositions) {
    const pole = new Group();
    const post = new Mesh(
      new CylinderGeometry(0.06, 0.08, 2.6, 8),
      woodMaterial(0x5a3e22),
    );
    post.position.y = 1.3;
    pole.add(post);
    // cross arms
    const arm = new Mesh(new BoxGeometry(0.7, 0.06, 0.06), woodMaterial(0x5a3e22));
    arm.position.y = 2.4;
    pole.add(arm);
    const arm2 = arm.clone();
    arm2.position.y = 2.55;
    pole.add(arm2);
    // insulators
    for (const dx of [-0.3, 0, 0.3]) {
      const ins = new Mesh(
        new CylinderGeometry(0.02, 0.02, 0.08, 6),
        toonMaterial(0xd4ccaa),
      );
      ins.position.set(dx, 2.45, 0);
      pole.add(ins);
    }
    // transformer
    const tx = new Mesh(new BoxGeometry(0.25, 0.3, 0.2), metalMaterial(0x5a5750));
    tx.position.set(0.0, 1.8, 0);
    pole.add(tx);
    pole.position.set(x, 0, z);
    g.add(pole);
  }

  // Wires connecting opposite poles (3 spans, sagging)
  const wireColor = toonMaterial(0x0e0e10);
  const wireSpans: Array<[[number, number], [number, number]]> = [
    [[-3.6, -3.4], [3.4, -3.4]],
    [[-3.6, 3.4], [3.4, 3.4]],
    [[-3.6, -3.4], [-3.6, 3.4]],
    [[3.4, -3.4], [3.4, 3.4]],
  ];
  for (const [a, b] of wireSpans) {
    for (let i = 0; i < 3; i++) {
      const offset = (i - 1) * 0.04;
      const wire = new Mesh(
        new BoxGeometry(
          Math.hypot(b[0] - a[0], b[1] - a[1]),
          0.01,
          0.01,
        ),
        wireColor,
      );
      const midX = (a[0] + b[0]) / 2;
      const midZ = (a[1] + b[1]) / 2;
      const midY = 2.45 - 0.18 + offset;
      wire.position.set(midX, midY, midZ);
      // orient along span
      const dx = b[0] - a[0];
      const dz = b[1] - a[1];
      wire.rotation.y = -Math.atan2(dz, dx);
      g.add(wire);
    }
  }

  // Drainage pipes on building edges (T-spawn right side and B-site)
  for (const [x, y, z, rotY, len] of [
    [3.7, 1.2, -2.0, 0, 0.6],
    [-3.7, 1.2, 2.0, Math.PI, 0.5],
    [2.8, 1.4, -3.0, Math.PI / 2, 0.5],
  ]) {
    const pipe = new Mesh(
      new CylinderGeometry(0.06, 0.06, len, 6),
      metalMaterial(0x6a665e),
    );
    pipe.position.set(x, y, z);
    pipe.rotation.z = Math.PI / 2;
    pipe.rotation.y = rotY;
    g.add(pipe);
    // dripping end
    const drop = new Mesh(
      new SphereGeometry(0.05, 6, 6),
      toonMaterial(0x88a8c8),
    );
    drop.position.set(x + Math.cos(rotY) * len / 2, y - 0.2, z + Math.sin(rotY) * len / 2);
    g.add(drop);
  }

  return g;
}


