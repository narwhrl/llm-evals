import * as THREE from 'three';
import { NO_OUTLINE } from '../core/materials.js';
import { rand, range } from '../core/rng.js';
import { DRIPS, STEAM, floorAt, floorBelow } from './registry.js';
import { FLASH } from './environment.js';

// GPU-animated rain streaks, splash rings, eave drips and vent steam. Every particle is a
// closed-form function of time, so nothing is uploaded per frame.
export const PX = { value: 900 }; // pixels per unit at distance 1 (drawing-buffer height / (2 tan(fov/2)))
const TIME = { value: 0 };
const TOP = 22;

function points(count, attrs, material) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  for (const [name, size, data] of attrs) g.setAttribute(name, new THREE.BufferAttribute(data, size));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 8, 0), 60);
  const p = new THREE.Points(g, material);
  p.frustumCulled = false;
  p.layers.set(NO_OUTLINE);
  return p;
}

function rain(half) {
  const n = 9000;
  const quad = new THREE.PlaneGeometry(1, 1);
  quad.translate(0, 0.5, 0);
  const g = new THREE.InstancedBufferGeometry();
  g.index = quad.index;
  g.setAttribute('position', quad.attributes.position);
  const seed = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    const x = range(-half, half);
    const z = range(-half, half);
    seed.set([x, z, floorAt(x, z), rand()], i * 4);
  }
  g.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 4));
  g.instanceCount = n;
  const m = new THREE.ShaderMaterial({
    uniforms: { uTime: TIME, uFlash: FLASH },
    vertexShader: /* glsl */ `
      attribute vec4 aSeed;
      uniform float uTime;
      varying float vAlong;
      varying float vFade;
      const vec3 WIND = vec3(0.10, -1.0, 0.05);
      void main() {
        float speed = 13.0 + aSeed.w * 5.0;
        float span = ${TOP.toFixed(1)} - aSeed.z;
        float y = aSeed.z + span - mod(uTime * speed + aSeed.w * 97.0, span);
        vec3 dir = normalize(WIND);
        vec3 head = vec3(aSeed.x, y, aSeed.y) + vec3(WIND.x, 0.0, WIND.z) * (${TOP.toFixed(1)} - y);
        float len = 0.75 + aSeed.w * 0.4;
        vec3 p = head - dir * len * position.y;
        p.y = max(p.y, aSeed.z);
        vec3 toCam = normalize(cameraPosition - p);
        vec3 side = normalize(cross(dir, toCam));
        p += side * position.x * 0.018;
        vAlong = position.y;
        vFade = smoothstep(${TOP.toFixed(1)}, ${(TOP - 4).toFixed(1)}, y) * smoothstep(aSeed.z, aSeed.z + 0.4, y);
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uFlash;
      varying float vAlong;
      varying float vFade;
      void main() {
        float a = (1.0 - vAlong) * vFade * 0.3;
        gl_FragColor = vec4(vec3(0.62, 0.72, 0.86) * (1.0 + uFlash * 2.5), a);
      }`,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(g, m);
  mesh.frustumCulled = false;
  mesh.layers.set(NO_OUTLINE);
  mesh.renderOrder = 6;
  return mesh;
}

function splashes(half) {
  const n = 2600;
  const a = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    const x = range(-half, half);
    const z = range(-half, half);
    a.set([x, floorAt(x, z) + 0.04, z, rand()], i * 4);
  }
  return points(n, [['aP', 4, a]], new THREE.ShaderMaterial({
    uniforms: { uTime: TIME, uPx: PX, uFlash: FLASH },
    vertexShader: /* glsl */ `
      attribute vec4 aP;
      uniform float uTime, uPx;
      varying float vPh;
      void main() {
        float ph = fract(uTime * (1.1 + aP.w * 0.8) + aP.w * 13.0);
        vPh = ph;
        vec4 mv = viewMatrix * vec4(aP.xyz, 1.0);
        gl_PointSize = (0.08 + ph * 0.26) * uPx / -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uFlash;
      varying float vPh;
      void main() {
        vec2 c = gl_PointCoord * 2.0 - 1.0;
        c.y *= 2.2;
        float d = length(c);
        float ring = smoothstep(0.25, 0.0, abs(d - 0.75)) * (1.0 - vPh);
        if (ring < 0.01 || vPh > 0.45) discard;
        gl_FragColor = vec4(vec3(0.7, 0.8, 0.92) * (1.0 + uFlash * 2.0), ring * 0.5);
      }`,
    transparent: true,
    depthWrite: false,
  }));
}

function drips() {
  const n = DRIPS.length;
  const a = new Float32Array(n * 4);
  const f = new Float32Array(n);
  DRIPS.forEach(([x, y, z], i) => {
    a.set([x, y - 0.03, z, rand()], i * 4);
    f[i] = floorBelow(x, z, y);
  });
  return points(n, [['aP', 4, a], ['aFloor', 1, f]], new THREE.ShaderMaterial({
    uniforms: { uTime: TIME, uPx: PX, uFlash: FLASH },
    vertexShader: /* glsl */ `
      attribute vec4 aP;
      attribute float aFloor;
      uniform float uTime, uPx;
      varying float vA;
      void main() {
        float period = 1.6 + aP.w * 2.4;
        float t = mod(uTime + aP.w * 31.0, period);
        float grow = 1.1 + aP.w * 0.6;
        vec3 p = aP.xyz;
        float s = 0.05;
        vA = 0.9;
        if (t < grow) {
          s = 0.03 + 0.05 * t / grow;
          p.y -= 0.03 * t / grow;
        } else {
          float ft = t - grow;
          p.y -= 0.03 + 4.9 * ft * ft;
          s = 0.055;
          if (p.y < aFloor) { vA = 0.0; }
        }
        vec4 mv = viewMatrix * vec4(p, 1.0);
        gl_PointSize = max(2.0, s * 2.2 * uPx / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uFlash;
      varying float vA;
      void main() {
        vec2 c = gl_PointCoord * 2.0 - 1.0;
        float d = length(c * vec2(1.0, 0.8));
        if (d > 1.0 || vA < 0.01) discard;
        float hi = smoothstep(0.5, 0.0, length(c - vec2(-0.3, -0.35)));
        vec3 col = mix(vec3(0.5, 0.62, 0.78), vec3(1.0), hi) * (1.2 + uFlash * 2.0);
        gl_FragColor = vec4(col, vA * smoothstep(1.0, 0.6, d));
      }`,
    transparent: true,
    depthWrite: false,
  }));
}

function steam() {
  const per = 14;
  const n = STEAM.length * per;
  const a = new Float32Array(n * 4);
  STEAM.forEach(([x, y, z], e) => {
    for (let k = 0; k < per; k++) a.set([x, y, z, (k + rand() * 0.5) / per], (e * per + k) * 4);
  });
  return points(n, [['aP', 4, a]], new THREE.ShaderMaterial({
    uniforms: { uTime: TIME, uPx: PX, uFlash: FLASH },
    vertexShader: /* glsl */ `
      attribute vec4 aP;
      uniform float uTime, uPx;
      varying float vLife;
      varying float vSeed;
      void main() {
        float life = fract(uTime * 0.16 + aP.w);
        vLife = life;
        vSeed = aP.w;
        vec3 p = aP.xyz + vec3(0.9 * life + 0.25 * sin(life * 6.0 + aP.w * 40.0), 2.4 * life, 0.4 * life + 0.2 * cos(life * 5.0 + aP.w * 20.0));
        vec4 mv = viewMatrix * vec4(p, 1.0);
        gl_PointSize = (0.35 + life * 1.5) * uPx / -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uFlash;
      varying float vLife;
      varying float vSeed;
      void main() {
        vec2 c = gl_PointCoord * 2.0 - 1.0;
        float d = dot(c, c);
        if (d > 1.0) discard;
        float a = (1.0 - d) * smoothstep(0.0, 0.12, vLife) * (1.0 - vLife) * 0.14;
        gl_FragColor = vec4(vec3(0.58, 0.64, 0.72) * (1.0 + uFlash * 1.5), a);
      }`,
    transparent: true,
    depthWrite: false,
  }));
}

export function createPrecipitation(scene, half) {
  const group = new THREE.Group();
  group.name = 'precipitation';
  group.add(rain(half), splashes(half), drips(), steam());
  scene.add(group);
  return { update(t) { TIME.value = t; } };
}
