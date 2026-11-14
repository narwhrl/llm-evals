import * as THREE from 'three';
import { mulberry32, puffTexture } from './materials';

/** Gradient sky dome + sun glow. */
export function buildSky(parent: THREE.Object3D): void {
  const geo = new THREE.SphereGeometry(9000, 24, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      top: { value: new THREE.Color(0x3f7fd4) },
      mid: { value: new THREE.Color(0x9ecdf2) },
      low: { value: new THREE.Color(0xf6e3bd) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vPos;
      uniform vec3 top; uniform vec3 mid; uniform vec3 low;
      void main() {
        float h = normalize(vPos).y;
        vec3 col = h > 0.12
          ? mix(mid, top, smoothstep(0.12, 0.75, h))
          : mix(low, mid, smoothstep(-0.25, 0.12, h));
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  parent.add(new THREE.Mesh(geo, mat));

  // sun glow sprite, aligned with the directional light
  const sunDir = new THREE.Vector3(-0.45, 0.5, -0.62).normalize();
  const sun = new THREE.Sprite(new THREE.SpriteMaterial({
    map: puffTexture, color: 0xfff3d0, transparent: true, opacity: 0.95,
    depthWrite: false, fog: false,
  }));
  sun.position.copy(sunDir).multiplyScalar(8200);
  sun.scale.setScalar(2600);
  parent.add(sun);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: puffTexture, color: 0xffe9bb, transparent: true, opacity: 0.4,
    depthWrite: false, fog: false,
  }));
  halo.position.copy(sunDir).multiplyScalar(8100);
  halo.scale.setScalar(5200);
  parent.add(halo);
}

/** Endless sea of clouds far below the islands. */
export function buildCloudSea(parent: THREE.Object3D, seed: number): THREE.Group {
  const g = new THREE.Group();
  const rand = mulberry32(seed);
  const geo = new THREE.SphereGeometry(1, 10, 8);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xf4f8ff, roughness: 1, transparent: true, opacity: 0.94,
    flatShading: true, emissive: 0xdfe9f5, emissiveIntensity: 0.55,
  });
  const count = 300;
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const r = 400 + Math.pow(rand(), 0.6) * 5200;
    const sx = 180 + rand() * 420;
    const sy = 34 + rand() * 60;
    const sz = 140 + rand() * 300;
    e.set(0, rand() * Math.PI, 0);
    q.setFromEuler(e);
    m.compose(
      new THREE.Vector3(Math.cos(a) * r, -420 - rand() * 160 + (r < 900 ? 60 : 0), Math.sin(a) * r),
      q,
      new THREE.Vector3(sx, sy, sz),
    );
    mesh.setMatrixAt(i, m);
  }
  mesh.instanceMatrix.needsUpdate = true;
  g.add(mesh);

  // a few high wisps drifting between the islands for depth
  const wispMat = new THREE.SpriteMaterial({
    map: puffTexture, color: 0xffffff, transparent: true, opacity: 0.35, depthWrite: false,
  });
  for (let i = 0; i < 26; i++) {
    const sp = new THREE.Sprite(wispMat);
    const a = rand() * Math.PI * 2;
    const r = 500 + rand() * 1400;
    sp.position.set(Math.cos(a) * r, -120 - rand() * 160, Math.sin(a) * r);
    sp.scale.set(300 + rand() * 300, 60 + rand() * 60, 1);
    g.add(sp);
  }
  parent.add(g);
  return g;
}

/** Slanted volumetric-feel light shafts from the sun direction. */
export function buildLightShafts(parent: THREE.Object3D, seed: number): void {
  const rand = mulberry32(seed);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uColor: { value: new THREE.Color(0xfff0c2) } },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalMatrix * normal;
        vView = -mv.xyz;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec2 vUv;
      uniform vec3 uColor;
      void main() {
        float facing = abs(dot(normalize(vNormal), normalize(vView)));
        float body = smoothstep(0.0, 0.65, facing);          // fade the silhouette edge
        float ends = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
        gl_FragColor = vec4(uColor, body * ends * 0.07);
      }`,
  });
  for (let i = 0; i < 4; i++) {
    const h = 1400 + rand() * 600;
    const geo = new THREE.CylinderGeometry(40 + rand() * 50, 100 + rand() * 90, h, 12, 1, true);
    const shaft = new THREE.Mesh(geo, mat);
    shaft.position.set((rand() - 0.5) * 2600, 420, (rand() - 0.5) * 2600);
    shaft.rotation.z = 0.42;
    shaft.rotation.y = rand() * Math.PI;
    parent.add(shaft);
  }
}

/** 提瓦特大陆： faint landmass silhouette far below the cloud gaps. */
export function buildDistantLand(parent: THREE.Object3D, seed: number): void {
  const rand = mulberry32(seed);
  const geo = new THREE.CircleGeometry(5200, 64);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const r = Math.hypot(x, y) / 5200;
    // rolling terrain, higher toward the rim so the center stays hidden under clouds
    p.setZ(i, (1 - r) * -160 + Math.sin(x * 0.004 + seed) * Math.cos(y * 0.005) * 130 * r + rand() * 8);
  }
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ color: 0x516e76, roughness: 1, flatShading: true });
  const land = new THREE.Mesh(geo, mat);
  land.rotation.x = -Math.PI / 2;
  land.position.y = -1050;
  parent.add(land);

  // faint mountain silhouettes poking through the clouds
  const mGeo = new THREE.ConeGeometry(1, 1, 5);
  const mMat = new THREE.MeshStandardMaterial({ color: 0x8ba3b5, roughness: 1, flatShading: true });
  const mounts = new THREE.InstancedMesh(mGeo, mMat, 24);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  for (let i = 0; i < 24; i++) {
    const a = rand() * Math.PI * 2;
    const r = 1800 + rand() * 2600;
    const h = 320 + rand() * 420;
    q.setFromEuler(new THREE.Euler(0, rand() * Math.PI, 0));
    m.compose(
      new THREE.Vector3(Math.cos(a) * r, -1050 + h / 2 - 40, Math.sin(a) * r),
      q,
      new THREE.Vector3(220 + rand() * 260, h, 220 + rand() * 260),
    );
    mounts.setMatrixAt(i, m);
  }
  mounts.instanceMatrix.needsUpdate = true;
  parent.add(mounts);
}
