import * as THREE from 'three';
import { canvasTexture, rng } from '../core/textures.js';
import { glow } from '../core/toon.js';
import { GEO, box, group } from '../core/geometry.js';
import { BASE_HALF, BASE_EDGE, BASE_TOP, ROAD_Y, WALK_Y, STORE, AVENUE, SIDE_STREET } from './layout.js';

/**
 * Weather and atmosphere: falling rain, eave drip lines, splash rings, drifting
 * and the soft fog gradient behind the diorama.
 *
 * Rain is a single Points cloud whose per-drop position is rebuilt on the GPU
 * from a time uniform, so no per-frame buffer uploads happen on the CPU.
 */

const RAIN_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uHeight;
  uniform float uSpeed;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aOffset;
  attribute float aSpeed;
  attribute float aSize;
  varying float vFade;
  varying float vStreak;

  void main() {
    // Drops fall from the top and wrap; x/z drift slightly with wind.
    float fall = fract(aOffset + uTime * (uSpeed * aSpeed) / uHeight);
    float y = uHeight * (1.0 - fall);
    vec3 pos = position;
    pos.y = y;
    // Wind shear, stronger towards the ground.
    pos.x += sin(fall * 6.283 + aOffset * 12.0) * 0.06 + fall * 0.12;
    pos.z += cos(fall * 5.1 + aOffset * 9.0) * 0.05;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    // Clamp the sprite size: without an upper bound, drops passing close to the
    // camera balloon into soft round blobs and the rain reads as snowfall.
    float dist = max(-mv.z, 1.2);
    gl_PointSize = clamp(uSize * aSize * uPixelRatio * (7.5 / dist), 2.0, 11.0 * uPixelRatio);

    // Fade drops that are very close to the camera or far away. Descending ramps
    // are written as 1 - smoothstep ascending: smoothstep(edge0 > edge1) is
    // undefined in GLSL and returns NaN on some drivers.
    vFade = smoothstep(0.0, 0.15, fall) * (1.0 - smoothstep(0.82, 1.0, fall));
    vFade *= smoothstep(0.8, 2.6, dist);
    vStreak = aSize;
  }
`;

const RAIN_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;
  varying float vStreak;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    // Very narrow horizontally, tall vertically: a falling streak, not a flake.
    float d = length(vec2(uv.x * 11.0, uv.y * 1.05));
    float alpha = 1.0 - smoothstep(0.02, 0.5, d);
    // Brighter at the head of the streak so motion reads downward.
    alpha *= mix(0.45, 1.0, smoothstep(-0.5, 0.5, -uv.y));
    alpha *= vFade * uOpacity;
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function createRain({ count, height, area, speed, size, color, opacity }) {
  const random = rng(5521);
  const positions = new Float32Array(count * 3);
  const offsets = new Float32Array(count);
  const speeds = new Float32Array(count);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = area.xMin + random() * (area.xMax - area.xMin);
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = area.zMin + random() * (area.zMax - area.zMin);
    offsets[i] = random();
    speeds[i] = 0.72 + random() * 0.62;
    sizes[i] = 0.7 + random() * 0.9;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, height / 2, 0), height);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uHeight: { value: height },
      uSpeed: { value: speed },
      uSize: { value: size },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
    },
    vertexShader: RAIN_VERT,
    fragmentShader: RAIN_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  return points;
}

/** A vertical curtain of drip lines under the store's awning. */
function createDrips(materials) {
  const group = new THREE.Group();
  const drips = [];

  // Drips are water, not metal: additive blending plus a pale blue-white tint
  // keeps them reading as glints. A normal-blended material at this size looks
  // like a row of grey pipes hanging off the awning.
  const dripMat = new THREE.MeshBasicMaterial({
    color: 0xbfd8f2,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const random = rng(771);
  const edgeZ = STORE.zMax + 0.86;
  for (let i = 0; i < 26; i += 1) {
    const x = STORE.xMin + 0.35 + (i / 25) * (STORE.xMax - STORE.xMin - 0.7);
    const len = 0.1 + random() * 0.16;
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0028, len, 5), dripMat.clone());
    mesh.position.set(x, 2.55, edgeZ);
    group.add(mesh);
    drips.push({
      mesh,
      len,
      phase: random(),
      speed: 0.55 + random() * 0.5,
      x,
      z: edgeZ,
    });
  }

  // Second line along the west awning edge.
  for (let i = 0; i < 12; i += 1) {
    const z = STORE.zMin + 0.6 + (i / 11) * (STORE.zMax - STORE.zMin - 1.2);
    const len = 0.1 + random() * 0.15;
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0028, len, 5), dripMat.clone());
    mesh.position.set(STORE.xMin - 0.82, 2.55, z);
    group.add(mesh);
    drips.push({
      mesh,
      len,
      phase: random(),
      speed: 0.55 + random() * 0.5,
      x: STORE.xMin - 0.82,
      z,
    });
  }

  return {
    group,
    drips,
    update(dt, elapsed) {
      for (const d of drips) {
        const t = (elapsed * d.speed + d.phase) % 1;
        // Drip hangs, stretches, falls, then resets. Opacity stays modest: these
        // are thin additive slivers, and pushing them brighter turns the drip
        // line into a solid curtain.
        const fallStart = 0.25;
        if (t < fallStart) {
          const hang = t / fallStart;
          d.mesh.position.y = 2.55 - hang * 0.04;
          d.mesh.scale.y = 0.7 + hang * 0.5;
          d.mesh.material.opacity = 0.2 + hang * 0.14;
        } else {
          const f = (t - fallStart) / (1 - fallStart);
          const dropY = 2.51 - f * f * 2.05;
          d.mesh.position.y = dropY;
          d.mesh.scale.y = 1 + f * 1.6;
          d.mesh.material.opacity = 0.4 * (1 - f * 0.7);
        }
      }
    },
  };
}

/** Small splash sprites that pop where drips and rain hit the ground. */
function createSplashes() {
  const group = new THREE.Group();
  const splashTex = canvasTexture(64, 64, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 1, w / 2, h / 2, w * 0.5);
    grad.addColorStop(0, 'rgba(220,240,255,0.9)');
    grad.addColorStop(0.45, 'rgba(190,225,255,0.35)');
    grad.addColorStop(1, 'rgba(180,215,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });

  const random = rng(3311);
  const items = [];
  const count = 26;
  for (let i = 0; i < count; i += 1) {
    const mat = glow(`splash-${i}`, {
      color: 0xe0f0ff,
      map: splashTex,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.16), mat);
    mesh.rotation.x = -Math.PI / 2;
    // Splashes concentrate along the awning drip line and the wet road.
    const nearAwning = i % 3 === 0;
    const x = nearAwning
      ? STORE.xMin + 0.4 + random() * (STORE.xMax - STORE.xMin - 0.8)
      : -4.6 + random() * 9.2;
    const z = nearAwning
      ? STORE.zMax + 0.8 + random() * 0.3
      : -4 + random() * 8;
    const y = nearAwning ? WALK_Y + 0.02 : ROAD_Y + 0.016;
    mesh.position.set(x, y, z);
    mesh.renderOrder = 3;
    group.add(mesh);
    items.push({
      mesh,
      phase: random(),
      speed: 1.4 + random() * 1.6,
      scale: 0.6 + random() * 0.8,
    });
  }

  return {
    group,
    update(dt, elapsed) {
      for (const s of items) {
        const t = (elapsed * s.speed + s.phase) % 1;
        s.mesh.scale.setScalar(0.35 + t * s.scale);
        s.mesh.material.opacity = (1 - t) * 0.55;
      }
    },
  };
}

export function buildAtmosphere({ scene, camera, lighting }) {
  const fxRoot = new THREE.Group();
  fxRoot.name = 'atmosphere';
  scene.add(fxRoot);

  // Main rain volume over the diorama.
  const rain = createRain({
    count: 4200,
    height: 9.5,
    area: { xMin: -BASE_HALF - 0.6, xMax: BASE_HALF + 0.6, zMin: -BASE_HALF - 0.6, zMax: BASE_HALF + 0.6 },
    speed: 8.4,
    size: 7.5,
    color: 0xd8e8ff,
    opacity: 0.8,
  });
  fxRoot.add(rain);

  // A thinner, slower layer close to the ground sells depth.
  const rainNear = createRain({
    count: 1100,
    height: 4.2,
    area: { xMin: -5.2, xMax: 5.2, zMin: -5.2, zMax: 5.2 },
    speed: 6.8,
    size: 5.5,
    color: 0xd6e8ff,
    opacity: 0.6,
  });
  fxRoot.add(rainNear);

  const drips = createDrips();
  fxRoot.add(drips.group);

  const splashes = createSplashes();
  fxRoot.add(splashes.group);

  // Distant fog plane so the plinth edge fades into night rather than a hard cut.
  const fogTex = canvasTexture(256, 256, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, w * 0.05, w / 2, h / 2, w * 0.55);
    grad.addColorStop(0, 'rgba(40,58,92,0.5)');
    grad.addColorStop(0.55, 'rgba(28,40,68,0.24)');
    grad.addColorStop(1, 'rgba(14,20,38,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
  const fog = new THREE.Mesh(
    new THREE.PlaneGeometry(BASE_HALF * 4.6, BASE_HALF * 4.6),
    glow('fogPlane', {
      color: 0xffffff,
      map: fogTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.NormalBlending,
    }),
  );
  fog.rotation.x = -Math.PI / 2;
  fog.position.y = BASE_TOP - 0.02;
  fog.renderOrder = -1;
  scene.add(fog);

  return {
    rain,
    rainNear,
    fxRoot,
    update(dt, elapsed) {
      rain.material.uniforms.uTime.value = elapsed;
      rainNear.material.uniforms.uTime.value = elapsed;
      drips.update(dt, elapsed);
      splashes.update(dt, elapsed);
    },
  };
}
