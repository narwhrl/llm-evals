import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { fabricTexture, paintedTexture, webbingTexture, labelTexture } from '../textures/props.js';

export function createKit(ctx) {
  const cube = new THREE.BoxGeometry(1, 1, 1);
  const rounded = new RoundedBoxGeometry(1, 1, 1, 1, .07);
  const cylinder = new THREE.CylinderGeometry(1, 1, 1, 12);
  const sphere = new THREE.IcosahedronGeometry(1, 1);
  const plane = new THREE.PlaneGeometry(1, 1);
  const materials = {};
  const mat = (map, color = '#ffffff', extra = {}) => new THREE.MeshStandardMaterial({
    map, color, roughness: .91, metalness: 0, flatShading: true, ...extra,
  });
  materials.metal = mat(paintedTexture('#d3d5c7'));
  materials.dark = mat(paintedTexture('#4d605f'));
  materials.cream = mat(paintedTexture('#e0d6b8'));
  materials.teal = mat(fabricTexture('#4d807b'));
  materials.olive = mat(fabricTexture('#718568'));
  materials.orange = mat(fabricTexture('#bb7354'));
  materials.white = mat(fabricTexture('#dbd6bd'));
  materials.webbing = mat(webbingTexture());
  materials.tape = mat(webbingTexture(true));
  const mesh = (parent, geo, material, size, pos, name = '') => {
    const o = new THREE.Mesh(geo, material);
    o.scale.set(...size); o.position.set(...pos); o.name = name;
    o.castShadow = true; o.receiveShadow = true; parent.add(o); return o;
  };
  const box = (p, size, pos, m = materials.metal, round = false, name = '') => mesh(p, round ? rounded : cube, m, size, pos, name);
  const cyl = (p, r, h, pos, m = materials.dark, name = '') => mesh(p, cylinder, m, [r, h, r], pos, name);
  const ball = (p, size, pos, m = materials.dark) => mesh(p, sphere, m, size, pos);
  const face = (p, w, h, pos, map, extra = {}) => {
    const o = mesh(p, plane, mat(map, '#ffffff', { side: THREE.DoubleSide, ...extra }), [w, h, 1], pos);
    o.castShadow = false; return o;
  };
  const bar = (p, a, b, radius = .015, m = materials.dark) => {
    const av = new THREE.Vector3(...a), bv = new THREE.Vector3(...b);
    const d = bv.clone().sub(av), o = cyl(p, radius, d.length(), av.add(bv).multiplyScalar(.5).toArray(), m);
    o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); return o;
  };
  const mount = (o, x, y, inset) => {
    ctx.profile.wallPoint(x, ctx.profile.sAtHeight(y), inset, o.position); return o;
  };
  const group = (parent, name) => { const g = new THREE.Group(); g.name = name; parent.add(g); return g; };
  const label = (p, text, sub, w, h, pos, color) => face(p, w, h, pos, labelTexture(text, sub, color));
  const focus = (g, id, target, zoom, angles = {}) => ctx.registry.addInteractive(g, {
    id, focus: { target: new THREE.Vector3(...target), zoom, ...angles },
  });
  const torus = (p, radius, tube, pos, m = materials.dark, arc = Math.PI * 2) => {
    const o = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 6, 20, arc), m);
    o.position.set(...pos); o.castShadow = true; o.receiveShadow = true; p.add(o); return o;
  };
  return { ctx, THREE, mat, materials, cube, rounded, cylinder, sphere, plane, mesh, box, cyl, ball, face, bar, mount, group, label, focus, torus };
}
