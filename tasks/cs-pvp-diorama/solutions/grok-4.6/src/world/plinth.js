import {
  ExtrudeGeometry,
  Mesh,
  Shape,
  CircleGeometry,
  MeshBasicMaterial,
} from 'three';
import { BASE, PLINTH_H } from './layout.js';
import { box } from './kit.js';

export function addPlinth(root, mats) {
  const half = BASE / 2;
  const shape = new Shape();
  shape.moveTo(-half, -half);
  shape.lineTo(half, -half);
  shape.lineTo(half, half);
  shape.lineTo(-half, half);
  shape.lineTo(-half, -half);

  const geo = new ExtrudeGeometry(shape, {
    depth: PLINTH_H,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.09,
    bevelOffset: 0,
    bevelSegments: 2,
    curveSegments: 1,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -PLINTH_H, 0);

  const mesh = new Mesh(geo, mats.plinth);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  root.add(mesh);

  box(root, mats.plinthEdge, BASE - 0.18, 0.035, BASE - 0.18, 0, 0.012, 0);
  box(root, mats.darkConcrete, BASE - 0.34, 0.01, BASE - 0.34, 0, -0.002, 0);
  box(root, mats.black, BASE + 0.18, 0.04, BASE + 0.18, 0, -PLINTH_H - 0.015, 0);

  const shadow = new Mesh(
    new CircleGeometry(7.4, 32),
    new MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28 }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -PLINTH_H - 0.04;
  shadow.material.userData.outlineParameters = { visible: false, keepAlive: true };
  root.add(shadow);

  return mesh;
}
