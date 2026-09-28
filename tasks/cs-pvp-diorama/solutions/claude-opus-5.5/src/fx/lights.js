import * as THREE from 'three';
import { MAT, TEX, NO_OUTLINE } from '../core/materials.js';

// Every practical light in the diorama: a real light (optional), a glow sprite,
// an emissive lamp material, and a behaviour that drives all three together.
export const lightGroup = new THREE.Group();
lightGroup.name = 'lights';
const entries = [];

function glowSprite(color, size, opacity) {
  const m = new THREE.SpriteMaterial({
    map: TEX.glow, color, transparent: true, opacity, depthWrite: false,
    blending: THREE.AdditiveBlending, fog: false,
  });
  const s = new THREE.Sprite(m);
  s.scale.setScalar(size);
  s.layers.set(NO_OUTLINE);
  s.renderOrder = 5;
  return s;
}

// A soft additive cone that reads as a light shaft through the rain.
export function beamMaterial(color, strength) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uStrength: { value: strength } },
    vertexShader: /* glsl */ `
      varying float vH;
      varying vec3 vN;
      varying vec3 vV;
      void main() {
        vH = uv.y;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uStrength;
      varying float vH;
      varying vec3 vN;
      varying vec3 vV;
      void main() {
        float edge = pow(abs(dot(normalize(vN), normalize(vV))), 1.6);
        float a = uStrength * edge * pow(vH, 1.7);
        gl_FragColor = vec4(uColor * a, a);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

// local lamps are tuned relative to the moonlight in environment.js
const LOCAL_GAIN = 2.6;

// opts: { pos, color, intensity, distance, decay, kind: 'point'|'spot'|'none', target, angle,
//         penumbra, glow, glowOpacity, lamp: material key, mode, phase, beam: {length, radius, strength} }
export function addLight(opts) {
  opts = { ...opts, intensity: opts.intensity * LOCAL_GAIN };
  const color = new THREE.Color(opts.color);
  let light = null;
  if (opts.kind === 'spot') {
    light = new THREE.SpotLight(color, opts.intensity, opts.distance ?? 30, opts.angle ?? 0.6, opts.penumbra ?? 0.5, opts.decay ?? 1.6);
    light.target.position.set(...opts.target);
    lightGroup.add(light.target);
  } else if (opts.kind !== 'none') {
    light = new THREE.PointLight(color, opts.intensity, opts.distance ?? 16, opts.decay ?? 1.6);
  }
  if (light) {
    light.position.set(...opts.pos);
    if (opts.shadow) {
      // shadow maps are rendered once (scene is static), so these cost nothing per frame
      light.castShadow = true;
      light.shadow.mapSize.set(512, 512);
      light.shadow.bias = -0.002;
      light.shadow.normalBias = 0.04;
      light.shadow.camera.near = 0.2;
    }
    lightGroup.add(light);
  }
  let sprite = null;
  if (opts.glow) {
    sprite = glowSprite(color, opts.glow, opts.glowOpacity ?? 0.8);
    sprite.position.set(...opts.pos);
    lightGroup.add(sprite);
  }
  let beam = null;
  if (opts.beam) {
    const { length, radius, strength } = opts.beam;
    const g = new THREE.CylinderGeometry(0.08, radius, length, 24, 1, true);
    g.translate(0, -length / 2, 0);
    // uv.y = 1 at the lamp, 0 at the far end
    beam = new THREE.Mesh(g, beamMaterial(color, strength));
    beam.layers.set(NO_OUTLINE);
    beam.renderOrder = 4;
    beam.position.set(...opts.pos);
    const dir = new THREE.Vector3(...(opts.target ?? [opts.pos[0], 0, opts.pos[2]])).sub(beam.position).normalize();
    beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir);
    lightGroup.add(beam);
  }
  const lampMat = opts.lamp ? MAT[opts.lamp].material : null;
  const entry = {
    ...opts, light, sprite, beam,
    base: opts.intensity, glowBase: opts.glowOpacity ?? 0.8,
    beamBase: opts.beam?.strength ?? 0,
    lampMat,
    drivesLamp: lampMat !== null && !entries.some((o) => o.lampMat === lampMat),
  };
  entries.push(entry);
  return entry;
}

function hashNoise(t) {
  return Math.sin(t * 12.9898) * 0.5 + Math.sin(t * 4.1 + 1.3) * 0.3 + Math.sin(t * 27.7) * 0.2;
}

const BEHAVIOUR = {
  steady: () => 1,
  // warm street lamps: gentle breathing with rare brown-outs
  flicker: (t, p) => {
    const dip = Math.sin(t * 0.37 + p) > 0.985 ? 0.35 + 0.3 * Math.abs(Math.sin(t * 40)) : 1;
    return (0.93 + 0.07 * hashNoise(t * 1.7 + p)) * dip;
  },
  // broken fluorescent tube: mostly on, stutters in bursts
  fluoro: (t, p) => {
    const burst = Math.sin(t * 0.61 + p) > 0.9;
    return burst ? (Math.sin(t * 57) > 0 ? 1 : 0.15) : 0.95 + 0.05 * Math.sin(t * 90);
  },
  // red police beacon breathing slowly
  police: (t, p) => 0.25 + 0.75 * Math.pow(0.5 + 0.5 * Math.sin(t * 1.6 + p), 2),
  // emergency tube with a slight hum
  hum: (t, p) => 0.9 + 0.1 * Math.sin(t * 2.3 + p) * Math.sin(t * 7.1),
  // a searchlight that shivers with the rain
  search: (t, p) => 0.9 + 0.08 * hashNoise(t * 2.2 + p),
};

export function updateLights(t, flash) {
  for (const e of entries) {
    const lvl = BEHAVIOUR[e.mode ?? 'steady'](t, e.phase ?? 0);
    if (e.light) e.light.intensity = e.base * lvl;
    if (e.sprite) e.sprite.material.opacity = e.glowBase * (0.35 + 0.65 * lvl);
    if (e.beam) e.beam.material.uniforms.uStrength.value = e.beamBase * lvl;
    // several fixtures share one lamp material; only the first one registered drives it
    if (e.lampMat && e.drivesLamp) e.lampMat.color.copy(e.lampMat.userData.baseColor).multiplyScalar(0.3 + 0.7 * lvl);
    if (e.onUpdate) e.onUpdate(t, lvl, flash);
  }
}
