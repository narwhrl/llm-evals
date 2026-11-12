import * as THREE from "three";
import { mulberry32 } from "./noise";
import type { Mats } from "./palette";

export const SUN_DIR = new THREE.Vector3(-0.62, 0.52, -0.58).normalize();
export const SUN_POS = SUN_DIR.clone().multiplyScalar(2600);

export function createSkyDome(): { mesh: THREE.Mesh; uniforms: Record<string, THREE.IUniform> } {
  const uniforms: Record<string, THREE.IUniform> = {
    uTime: { value: 0 },
    uSunDir: { value: SUN_DIR.clone() },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      uniform float uTime;
      uniform vec3 uSunDir;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
                   mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
        return v;
      }
      vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289v4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289v4(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289v3(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }
      float fbm3(vec3 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 4; i++) { v += a * snoise(p); p *= 2.13; a *= 0.5; }
        return v;
      }

      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        // vertical gradient: warm horizon -> deep zenith
        vec3 horizon = vec3(0.94, 0.87, 0.72);
        vec3 mid = vec3(0.55, 0.74, 0.92);
        vec3 zenith = vec3(0.20, 0.42, 0.75);
        vec3 col = mix(horizon, mid, smoothstep(-0.05, 0.28, h));
        col = mix(col, zenith, smoothstep(0.2, 0.75, h));
        // below-horizon haze
        col = mix(col, vec3(0.82, 0.86, 0.9), smoothstep(-0.02, -0.35, h));

        float sunD = max(0.0, dot(d, normalize(uSunDir)));
        // sun disc + halo
        col += vec3(1.0, 0.86, 0.55) * pow(sunD, 900.0) * 3.0;
        col += vec3(1.0, 0.8, 0.45) * pow(sunD, 18.0) * 0.35;
        col += vec3(0.98, 0.75, 0.4) * pow(sunD, 3.0) * 0.12;

        // wispy cirrus
        vec2 cuv = d.xz / max(0.12, d.y + 0.25);
        float cir = fbm(cuv * 2.2 + vec2(uTime * 0.004, 0.0));
        float cirMask = smoothstep(0.05, 0.4, h) * smoothstep(0.75, 0.35, h);
        col = mix(col, vec3(0.98, 0.99, 1.0), smoothstep(0.52, 0.8, cir) * 0.35 * cirMask);

        // stars near zenith for sacred feel
        float starN = fbm3(d * 60.0);
        float star = smoothstep(0.86, 0.95, starN) * smoothstep(0.25, 0.7, h);
        col += vec3(1.0, 0.98, 0.9) * star * 0.5;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(3400, 40, 24), mat);
  return { mesh, uniforms };
}

// Sea of clouds: thousands of soft billboard puffs distributed in rings and banks.
function cloudSprite(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(64, 58, 6, 64, 64, 62);
  grad.addColorStop(0, "rgba(255,255,255,0.95)");
  grad.addColorStop(0.55, "rgba(250,250,255,0.55)");
  grad.addColorStop(1, "rgba(245,248,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createCloudSea(mats: Mats, drift: THREE.Object3D[]): THREE.Group {
  const grp = new THREE.Group();
  const rng = mulberry32(9001);

  // far cloud sea: dense sprite layer
  const tex = cloudSprite();
  const N = 900;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3);
  const scl = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = rng() * Math.PI * 2;
    const r = 700 + Math.pow(rng(), 0.7) * 2600;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = -620 - rng() * 220;
    pos[i * 3 + 2] = Math.sin(a) * r;
    scl[i] = 180 + rng() * 420;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aScale", new THREE.BufferAttribute(scl, 1));
  const pm = new THREE.PointsMaterial({
    map: tex,
    size: 320,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    sizeAttenuation: true,
    color: 0xffffff,
  });
  pm.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "gl_PointSize = size;",
      "gl_PointSize = size * aScale * 0.01;",
    );
    shader.vertexShader = "attribute float aScale;\n" + shader.vertexShader;
  };
  const sea = new THREE.Points(geo, pm);
  grp.add(sea);

  // big rolling cumulus blobs nearer the islands (lambert puffs so they shade)
  const puffGeo = new THREE.SphereGeometry(1, 10, 8);
  const puffs = new THREE.InstancedMesh(puffGeo, mats.cloud, 700);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  let idx = 0;
  const banks = 14;
  for (let b = 0; b < banks && idx < 700; b++) {
    const a = (b / banks) * Math.PI * 2 + rng() * 0.4;
    const r = 950 + rng() * 1700;
    const cx = Math.cos(a) * r;
    const cz = Math.sin(a) * r;
    const cy = -520 - rng() * 320;
    const blobN = 26 + Math.floor(rng() * 30);
    const blobR = 130 + rng() * 240;
    for (let i = 0; i < blobN && idx < 700; i++) {
      const t = rng() * Math.PI * 2;
      const rr = Math.pow(rng(), 0.6) * blobR;
      p.set(cx + Math.cos(t) * rr * 1.6, cy + rng() * 55, cz + Math.sin(t) * rr);
      const sc = 55 + rng() * 110;
      s.set(sc * (1.3 + rng()), sc * 0.62, sc);
      q.setFromEuler(new THREE.Euler(0, rng() * Math.PI, 0));
      m.compose(p, q, s);
      puffs.setMatrixAt(idx++, m);
    }
  }
  puffs.count = idx;
  puffs.frustumCulled = false;
  grp.add(puffs);

  // a few high thin drifts near island level, slow moving
  for (let i = 0; i < 8; i++) {
    const d = new THREE.Group();
    const n = 5 + Math.floor(rng() * 6);
    const w = 60 + rng() * 90;
    for (let j = 0; j < n; j++) {
      const sp = new THREE.Mesh(puffGeo, mats.cloud);
      sp.scale.set(w * (0.5 + rng() * 0.8), w * 0.2, w * (0.4 + rng() * 0.5));
      sp.position.set(j * w * 0.8 - (n * w * 0.4), rng() * 14, (rng() - 0.5) * w * 0.6);
      d.add(sp);
    }
    const a = rng() * Math.PI * 2;
    const r = 500 + rng() * 900;
    d.position.set(Math.cos(a) * r, -40 - rng() * 160, Math.sin(a) * r);
    d.userData.speed = 1.5 + rng() * 2.5;
    grp.add(d);
    drift.push(d);
  }
  return grp;
}

// Volumetric-look god rays: additive tapered planes from the sun direction.
export function createLightShafts(): { group: THREE.Group; materials: THREE.ShaderMaterial[] } {
  const group = new THREE.Group();
  const materials: THREE.ShaderMaterial[] = [];
  const rng = mulberry32(4242);
  for (let i = 0; i < 10; i++) {
    const w = 80 + rng() * 180;
    const len = 1600 + rng() * 900;
    const uniforms = {
      uTime: { value: 0 },
      uSeed: { value: rng() * 10 },
      uAlpha: { value: 0.05 + rng() * 0.09 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uSeed;
        uniform float uAlpha;
        void main() {
          float x = vUv.x;
          float streak = sin(x * 21.0 + uSeed * 7.0) * 0.5 + 0.5;
          streak = pow(streak, 2.2);
          float fadeTop = smoothstep(0.0, 0.35, vUv.y);
          float fadeBot = smoothstep(1.0, 0.55, vUv.y);
          float pulse = 0.8 + 0.2 * sin(uTime * 0.4 + uSeed * 9.0);
          float a = streak * fadeTop * fadeBot * uAlpha * pulse;
          vec3 col = vec3(1.0, 0.93, 0.72);
          gl_FragColor = vec4(col, a);
        }
      `,
    });
    materials.push(mat);
    const geo = new THREE.PlaneGeometry(w, len, 1, 1);
    const mesh = new THREE.Mesh(geo, mat);
    // orient the plane along the sun direction, offset in a cone around center
    const off = new THREE.Vector3((rng() - 0.5) * 900, 0, (rng() - 0.5) * 900);
    const along = SUN_DIR.clone().multiplyScalar(-(500 + rng() * 600));
    mesh.position.copy(SUN_DIR.clone().multiplyScalar(1700).add(along).add(off));
    mesh.position.y = Math.max(mesh.position.y, 200 + rng() * 600);
    // orient plane along the sun's descent direction so rays read as light shafts
    const lookTarget = mesh.position.clone().sub(SUN_DIR.clone().multiplyScalar(600));
    mesh.lookAt(lookTarget);
    mesh.rotateZ((rng() - 0.5) * 0.5);
    group.add(mesh);
  }
  return { group, materials };
}

// Distant Teyvat continent: dim landmass silhouettes under the cloud sea.
export function createTeyvat(): THREE.Group {
  const g = new THREE.Group();
  const rng = mulberry32(777);
  const landMat = new THREE.MeshBasicMaterial({ color: "#5d7086", fog: true });
  const mtnMat = new THREE.MeshBasicMaterial({ color: "#4a5f78", fog: true });
  for (let i = 0; i < 7; i++) {
    const a = rng() * Math.PI * 2;
    const r = 1300 + rng() * 1700;
    const land = new THREE.Mesh(new THREE.CylinderGeometry(120 + rng() * 260, 160 + rng() * 320, 24, 14), landMat);
    land.position.set(Math.cos(a) * r, -1280 - rng() * 60, Math.sin(a) * r);
    land.scale.y = 0.35;
    g.add(land);
    const peaks = 2 + Math.floor(rng() * 4);
    for (let j = 0; j < peaks; j++) {
      const mtn = new THREE.Mesh(new THREE.ConeGeometry(40 + rng() * 70, 80 + rng() * 160, 7), mtnMat);
      mtn.position.set(land.position.x + (rng() - 0.5) * 200, -1210 - rng() * 40, land.position.z + (rng() - 0.5) * 200);
      g.add(mtn);
    }
  }
  return g;
}
