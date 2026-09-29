import * as THREE from 'three';
import { HALF, CURB, ROAD, SIDE_ROAD, STORE_WALK, NEAR_WALK, RIGHT_WALK } from './layout.js';

const MAX_BLOCKERS = 32;
const TOP = 9.5;

// Raised surfaces the rain lands on: roofs, awnings, machines, sidewalks.
function floorBoxes(ctx) {
  const boxes = [
    ...ctx.blockers,
    [STORE_WALK.x0, ROAD.z0 - 1.0, SIDE_ROAD.x0, ROAD.z0, CURB],
    [STORE_WALK.xSide, -HALF, SIDE_ROAD.x0, ROAD.z0, CURB],
    [-HALF, ROAD.z0 - 0.7, -4.2, ROAD.z0, CURB],
    [-HALF, NEAR_WALK.z0, HALF, HALF, CURB],
    [RIGHT_WALK.x0, -HALF, HALF, ROAD.z0, CURB],
  ];
  if (boxes.length > MAX_BLOCKERS) throw new Error(`Too many rain blockers: ${boxes.length}`);
  const arr = [];
  for (let i = 0; i < MAX_BLOCKERS; i++) {
    const bx = boxes[i];
    arr.push(bx ? new THREE.Vector4(bx[0], bx[1], bx[2], bx[3]) : new THREE.Vector4(1e4, 1e4, 1e4, 1e4));
  }
  const heights = [];
  for (let i = 0; i < MAX_BLOCKERS; i++) heights.push(boxes[i] ? boxes[i][4] : 0);
  return { rects: arr, heights };
}

const floorGLSL = /* glsl */ `
  uniform vec4 rects[${MAX_BLOCKERS}];
  uniform float heights[${MAX_BLOCKERS}];
  float floorAt(vec2 p) {
    float h = 0.0;
    for (int i = 0; i < ${MAX_BLOCKERS}; i++) {
      vec4 r = rects[i];
      if (p.x > r.x && p.x < r.z && p.y > r.y && p.y < r.w) h = max(h, heights[i]);
    }
    return h;
  }
  float hash11(float n) { return fract(sin(n * 12.9898) * 43758.5453); }
`;

function streaks(ctx, uniforms, lights) {
  const N = 7000;
  const base = new THREE.PlaneGeometry(1, 1);
  const geo = new THREE.InstancedBufferGeometry();
  geo.index = base.index;
  geo.setAttribute('position', base.attributes.position);
  geo.setAttribute('uv', base.attributes.uv);
  const seeds = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    seeds[i * 4] = (Math.random() * 2 - 1) * (HALF - 0.05);
    seeds[i * 4 + 1] = (Math.random() * 2 - 1) * (HALF - 0.05);
    seeds[i * 4 + 2] = Math.random();
    seeds[i * 4 + 3] = 0.8 + Math.random() * 0.4;
  }
  geo.setAttribute('seed', new THREE.InstancedBufferAttribute(seeds, 4));
  geo.instanceCount = N;

  const lightArr = [];
  for (let i = 0; i < 8; i++) {
    const l = lights[i];
    lightArr.push(l ? new THREE.Vector4(l[0], l[1], l[2], l[3]) : new THREE.Vector4(0, -100, 0, 0));
  }
  const mat = new THREE.ShaderMaterial({
    uniforms: { ...uniforms, lights: { value: lightArr } },
    vertexShader: /* glsl */ `
      ${floorGLSL}
      uniform float time;
      uniform vec4 lights[8];
      attribute vec4 seed;
      varying float vFade;
      varying vec2 vUv;
      varying float vLit;
      void main() {
        vec2 xz = seed.xy;
        float fl = floorAt(xz);
        float span = ${TOP.toFixed(1)} - fl;
        float speed = 9.0 * seed.w;
        float y = ${TOP.toFixed(1)} - mod(time * speed + seed.z * 97.0, span);
        vec3 dir = normalize(vec3(0.12, -1.0, 0.05));
        // Wind slant: move the landing point, not the spawn, so hits stay on the base.
        vec3 head = vec3(xz.x, y, xz.y) + vec3(0.12, 0.0, 0.05) * (y - fl);
        float len = 0.32 * seed.w;
        vec3 tail = head - dir * len;
        vec3 mid = mix(head, tail, uv.y);
        vec3 toCam = normalize(cameraPosition - mid);
        vec3 side = normalize(cross(dir, toCam)) * 0.009;
        vec3 p = mid + side * (uv.x - 0.5) * 2.0;
        vFade = smoothstep(${TOP.toFixed(1)}, ${(TOP - 1.5).toFixed(1)}, y) * step(abs(head.x), ${HALF.toFixed(1)}) * step(abs(head.z), ${HALF.toFixed(1)});
        vUv = uv;
        float lit = 0.0;
        for (int i = 0; i < 8; i++) {
          vec3 d = mid - lights[i].xyz;
          lit += lights[i].w * exp(-dot(d, d) * 0.35);
        }
        vLit = lit;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      varying float vFade;
      varying vec2 vUv;
      varying float vLit;
      void main() {
        float a = vFade * (1.0 - vUv.y) * 0.5 * (1.0 - abs(vUv.x - 0.5) * 2.0);
        vec3 col = vec3(0.62, 0.74, 1.0) * (0.7 + vLit * 3.0);
        gl_FragColor = vec4(col, a * (0.7 + vLit));
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 5;
  ctx.root.add(mesh);
  ctx.noOutline.push(mesh);
  return mesh;
}

function splashes(ctx, uniforms) {
  const N = 1400;
  const base = new THREE.PlaneGeometry(1, 1);
  base.rotateX(-Math.PI / 2);
  const geo = new THREE.InstancedBufferGeometry();
  geo.index = base.index;
  geo.setAttribute('position', base.attributes.position);
  geo.setAttribute('uv', base.attributes.uv);
  const seeds = new Float32Array(N * 2);
  for (let i = 0; i < N; i++) {
    seeds[i * 2] = Math.random() * 1000;
    seeds[i * 2 + 1] = 0.5 + Math.random() * 0.5;
  }
  geo.setAttribute('seed', new THREE.InstancedBufferAttribute(seeds, 2));
  geo.instanceCount = N;
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      ${floorGLSL}
      uniform float time;
      attribute vec2 seed;
      varying vec2 vUv;
      varying float vPh;
      void main() {
        float life = 0.45 * seed.y + 0.2;
        float cyc = floor((time + seed.x) / life);
        vPh = fract((time + seed.x) / life);
        float k = seed.x * 13.1 + cyc * 7.77;
        vec2 xz = vec2(hash11(k), hash11(k + 1.7)) * 2.0 - 1.0;
        xz *= ${(HALF - 0.1).toFixed(2)};
        float fl = floorAt(xz);
        float r = mix(0.02, 0.13, vPh) * (0.7 + seed.y * 0.5);
        vec3 p = vec3(xz.x, fl + 0.012, xz.y) + position * r * 2.0;
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      varying float vPh;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float ring = smoothstep(0.62, 0.86, d) * smoothstep(1.0, 0.9, d);
        float a = ring * (1.0 - vPh) * 0.55;
        gl_FragColor = vec4(vec3(0.7, 0.82, 1.0) * 1.1, a);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 4;
  ctx.root.add(mesh);
  ctx.noOutline.push(mesh);
  ctx.noReflect.push(mesh);
}

// Eave drips: beads swell on the edge, drop under gravity and leave a ring where they land.
function drips(ctx, uniforms) {
  const pts = [];
  for (const d of ctx.drips) {
    for (let i = 0; i < d.count; i++) {
      const t = (i + 0.5) / d.count + (Math.random() - 0.5) * (0.6 / d.count);
      pts.push([
        d.from[0] + (d.to[0] - d.from[0]) * t,
        d.from[1] + (d.to[1] - d.from[1]) * t,
        d.from[2] + (d.to[2] - d.from[2]) * t,
        d.floor,
        1.2 + Math.random() * 2.2,
        Math.random() * 10,
      ]);
    }
  }
  const N = pts.length;
  const make = (base) => {
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index;
    geo.setAttribute('position', base.attributes.position);
    geo.setAttribute('uv', base.attributes.uv);
    const a = new Float32Array(N * 3);
    const bb = new Float32Array(N * 3);
    pts.forEach((p, i) => {
      a.set(p.slice(0, 3), i * 3);
      bb.set(p.slice(3, 6), i * 3);
    });
    geo.setAttribute('origin', new THREE.InstancedBufferAttribute(a, 3));
    geo.setAttribute('timing', new THREE.InstancedBufferAttribute(bb, 3));
    geo.instanceCount = N;
    return geo;
  };
  const common = /* glsl */ `
    uniform float time;
    attribute vec3 origin;
    attribute vec3 timing;
    float fallTime() { return sqrt(2.0 * max(origin.y - timing.x, 0.01) / 9.8); }
  `;
  const bead = new THREE.Mesh(
    make(new THREE.SphereGeometry(1, 8, 6)),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        ${common}
        varying float vA;
        void main() {
          float ph = mod(time + timing.z, timing.y);
          float hang = timing.y - fallTime();
          float grow = clamp(ph / hang, 0.0, 1.0);
          float tf = max(ph - hang, 0.0);
          float y = origin.y - 0.02 - 0.5 * 9.8 * tf * tf;
          float r = mix(0.006, 0.02, grow);
          vec3 s = vec3(r, r * (1.0 + tf * 6.0), r);
          vec3 p = vec3(origin.x, y, origin.z) + position * s;
          vA = step(timing.x, y);
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main() {
          if (vA < 0.5) discard;
          gl_FragColor = vec4(0.8, 0.92, 1.2, 0.85);
        }`,
      transparent: true,
      depthWrite: false,
    }),
  );
  const ringBase = new THREE.PlaneGeometry(1, 1);
  ringBase.rotateX(-Math.PI / 2);
  const ring = new THREE.Mesh(
    make(ringBase),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        ${common}
        varying vec2 vUv;
        varying float vPh;
        void main() {
          // The bead lands exactly when its cycle wraps, so the phase is the time since impact.
          float ph = mod(time + timing.z, timing.y);
          vPh = clamp(ph / 0.7, 0.0, 1.0);
          float r = mix(0.02, 0.22, vPh);
          vec3 p = vec3(origin.x, timing.x + 0.013, origin.z) + position * r * 2.0;
          vUv = uv;
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        varying float vPh;
        void main() {
          float d = length(vUv - 0.5) * 2.0;
          float ring = smoothstep(0.7, 0.88, d) * smoothstep(1.0, 0.9, d);
          gl_FragColor = vec4(vec3(0.75, 0.88, 1.0), ring * (1.0 - vPh) * 0.8 * step(vPh, 0.999));
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  for (const m of [bead, ring]) {
    m.frustumCulled = false;
    m.renderOrder = 4;
    ctx.root.add(m);
    ctx.noOutline.push(m);
  }
  ctx.noReflect.push(ring);
}

export function buildRain(ctx) {
  const { rects, heights } = floorBoxes(ctx);
  const uniforms = {
    time: { value: 0 },
    rects: { value: rects },
    heights: { value: heights },
  };
  streaks(ctx, uniforms, ctx.rainLights);
  splashes(ctx, uniforms);
  drips(ctx, uniforms);
  ctx.updaters.push((t) => (uniforms.time.value = t));
}
