import * as THREE from 'three';
import { mesh, box } from './common.js';

export function perforatedPanel(x0, x1, y0, y1, holes, z, depth, material) {
  const shape = new THREE.Shape();
  shape.moveTo(x0, y0); shape.lineTo(x1, y0); shape.lineTo(x1, y1);
  shape.lineTo(x0, y1); shape.closePath();
  for (const p of holes) {
    const hole = new THREE.Path();
    hole.absarc(p.x, p.y, p.radius, 0, Math.PI * 2, true); shape.holes.push(hole);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: false, curveSegments: 64,
  });
  const pos = geometry.attributes.position, uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) + 4, pos.getY(i));
  const object = new THREE.Mesh(geometry, material); object.position.z = z;
  object.castShadow = true; object.receiveShadow = true;
  return object;
}

function sweptSurface(profile, inset, material, parent, name, x0 = -4, x1 = 4) {
  const pos = [], uv = [], index = [];
  for (let i = 0; i < profile.length; i++) {
    const p = profile[i];
    for (const x of [x0, x1]) {
      pos.push(x, p.y + p.ny * inset, p.z + p.nz * inset);
      uv.push(x + 4, p.s);
    }
    if (i < profile.length - 1) {
      const a = i * 2; index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(index); geometry.computeVertexNormals();
  const object = mesh(parent, geometry, material, name);
  return object;
}

function endCap(parent, materials, profile, side) {
  const shape = new THREE.Shape();
  shape.moveTo(-1.95, 0);
  for (const p of profile) shape.lineTo(p.z, p.y);
  shape.lineTo(-0.46, 2.23); shape.quadraticCurveTo(-0.12, 2.1, -0.12, 1.85);
  shape.lineTo(-0.12, 0); shape.closePath();
  const layers = [[materials.enamel, 0.018, 0], [materials.foam, 0.124, 0.018],
    [materials.outer, 0.018, 0.142]];
  for (const [material, depth, offset] of layers) {
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 12 });
    geometry.rotateY(side * Math.PI / 2);
    // Shape's horizontal coordinate denotes world Z, independent of the cap's end.
    if (side === 1) geometry.scale(1, 1, -1);
    const cap = mesh(parent, geometry, material, `end-cap-${side}`);
    cap.position.x = side * (4 + offset);
  }
}

export function buildShell(ctx, parent, materials) {
  const wall = perforatedPanel(-4, 4, 0, 2.2, ctx.portholes, -2.11, 0.16,
    [materials.wall, materials.foam]);
  wall.name = 'perforated-rear-wall'; parent.add(wall);
  const curved = ctx.profile.PROFILE.filter(p => p.s >= 2.2);
  materials.outer.side = THREE.DoubleSide;
  sweptSurface(curved, 0, materials.wall, parent, 'inner-ceiling-lip');
  sweptSurface(curved, -0.16, materials.outer, parent, 'outer-ceiling-lip');
  // Laminated open cut: painted skin, warm insulation core, structural outer skin.
  box(parent, materials.enamel, 8, 0.017, 0.023, 0, 2.508, -1.65, 'lip-inner-skin');
  box(parent, materials.foam, 8, 0.126, 0.023, 0, 2.579, -1.65, 'lip-insulation');
  box(parent, materials.outer, 8, 0.017, 0.025, 0, 2.651, -1.65, 'lip-outer-skin');
  for (const side of [-1, 1]) endCap(parent, materials, ctx.profile.PROFILE, side);
  for (const x of [-3.82, -2.82, -1.82, -0.82, 0.18, 1.18, 2.18, 3.18]) {
    box(parent, materials.steel, 0.033, 0.125, 0.032, x, 2.579, -1.637);
  }
}
