// The display base: wooden plinth and frame, painted terrain, resin river, the table and the sky dome.
import * as THREE from 'three';
import { BOARD, RIVER, groundHeight } from './layout.js';
import { groundTexture, noiseTexture, rippleNormalTexture, signTexture } from './textures.js';

const I = new THREE.Matrix4();
const BASE_BOTTOM = -2.75;

export function buildBase(kit) {
  const [hx, hz] = [BOARD.hx, BOARD.hz];
  const [ix, iz] = BOARD.inner;
  const lip = 0.15;
  kit.box('wood', '#7a5232', I, hx * 2, 1.5, hz * 2, 0, -1.75, 0);
  // Frame rails, slightly proud of the body so the joint reads as a moulding.
  const ft = 1.3;
  const fy = -0.4;
  const frame = '#5a3a22';
  kit.rbox('wood', frame, I, (hx + lip) * 2, ft, hz + lip - iz, 0, fy, (iz + hz + lip) / 2, 0, 0.06);
  kit.rbox('wood', frame, I, (hx + lip) * 2, ft, hz + lip - iz, 0, fy, -(iz + hz + lip) / 2, 0, 0.06);
  kit.rbox('wood', frame, I, hx + lip - ix, ft, iz * 2 + 0.02, (ix + hx + lip) / 2, fy, 0, 0, 0.06);
  kit.rbox('wood', frame, I, hx + lip - ix, ft, iz * 2 + 0.02, -(ix + hx + lip) / 2, fy, 0, 0, 0.06);
  kit.box('wood', '#3b2a1e', I, hx * 2 + 0.6, 0.25, hz * 2 + 0.6, 0, BASE_BOTTOM + 0.125, 0);
  // Brass name plate on the front face.
  kit.box('metal', '#b08d57', I, 5.2, 0.62, 0.04, 0, -1.72, hz + 0.02);
}

export function namePlate() {
  const tex = signTexture('柳河铁路小镇', { w: 1024, h: 128, bg: '#b8935a', fg: '#3a2a16', border: '#7a5a30', font: '600 64px' });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 0.56), new THREE.MeshStandardMaterial({ map: tex, metalness: 0.55, roughness: 0.38 }));
  m.position.set(0, -1.72, BOARD.hz + 0.045);
  return m;
}

export function buildTerrain() {
  const [ix, iz] = BOARD.inner;
  const geo = new THREE.PlaneGeometry(ix * 2, iz * 2, 194, 134);
  geo.rotateX(-Math.PI / 2);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, groundHeight(p.getX(i), p.getZ(i)));
  geo.computeVertexNormals();
  const flock = noiseTexture(256, 6, [[32, 0.5], [128, 0.5]]);
  flock.repeat.set(40, 28);
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: groundTexture(), bumpMap: flock, bumpScale: 1.5, roughness: 0.96 }));
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  return mesh;
}

export function buildWater() {
  const pts = RIVER.points;
  const half = 1.34;
  const lim = BOARD.inner[1] + 0.05;
  const pos = [];
  const uv = [];
  const index = [];
  let along = 0;
  for (let i = 0; i < pts.length; i++) {
    const [ax, az] = pts[Math.max(0, i - 1)];
    const [bx, bz] = pts[Math.min(pts.length - 1, i + 1)];
    const len = Math.hypot(bx - ax, bz - az);
    const nx = (bz - az) / len;
    const nz = -(bx - ax) / len;
    if (i > 0) along += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    for (const s of [1, -1]) {
      const z = Math.max(-lim, Math.min(lim, pts[i][1] + nz * half * s));
      pos.push(pts[i][0] + nx * half * s, RIVER.waterY, z);
      uv.push(s > 0 ? 0 : 1, along / 2.5);
    }
    if (i > 0) {
      const a = (i - 1) * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(index);
  geo.computeVertexNormals();
  if (geo.attributes.normal.getY(0) < 0) {
    geo.setIndex(index.map((_, k) => index[k - (k % 3) + [0, 2, 1][k % 3]]));
    geo.computeVertexNormals();
  }
  const normalMap = rippleNormalTexture();
  normalMap.repeat.set(1, 1);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: '#2f6a74',
      roughness: 0.08,
      metalness: 0.15,
      transparent: true,
      opacity: 0.8,
      normalMap,
      normalScale: new THREE.Vector2(0.45, 0.45),
    }),
  );
  mesh.receiveShadow = true;
  return mesh;
}

export function buildTable() {
  const tex = noiseTexture(256, 12, [[64, 0.5], [256, 0.5]]);
  tex.repeat.set(60, 60);
  const mesh = new THREE.Mesh(
    new THREE.CircleGeometry(400, 64).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: '#3a3430', roughness: 0.92, bumpMap: tex, bumpScale: 1 }),
  );
  mesh.position.y = BASE_BOTTOM;
  mesh.receiveShadow = true;
  return mesh;
}

export function buildSky() {
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { top: { value: new THREE.Color() }, horizon: { value: new THREE.Color() } },
    vertexShader: 'varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader:
      `uniform vec3 top;
      uniform vec3 horizon;
      varying vec3 vDir;
      void main() {
        gl_FragColor = vec4(mix(horizon, top, smoothstep(-0.05, 0.6, vDir.y)), 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(700, 32, 16), material);
  mesh.renderOrder = -1;
  return mesh;
}
