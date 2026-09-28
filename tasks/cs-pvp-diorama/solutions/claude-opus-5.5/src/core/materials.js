import * as THREE from 'three';
import * as S from '../textures/surfaces.js';
import * as P from '../textures/props.js';
import { decalAtlas } from '../textures/decals.js';

// Layer 1 = rendered in colour but excluded from the outline (normal/depth) pass.
export const NO_OUTLINE = 1;

// key -> { material, scale (metres per texture tile; 0 = keep geometry UVs), cast, receive, layer }
export const MAT = {};
export const TEX = {};

function toon(map, extra = {}) {
  return new THREE.MeshToonMaterial({ map, gradientMap: TEX.gradient, vertexColors: true, ...extra });
}

function reg(key, material, scale, { cast = true, receive = true, layer = 0 } = {}) {
  material.name = key;
  MAT[key] = { material, scale, cast, receive, layer };
}

function lamp(key, hex, intensity) {
  const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(intensity), vertexColors: true });
  m.userData.baseColor = m.color.clone();
  reg(key, m, 0, { cast: false, receive: false, layer: NO_OUTLINE });
}

// Shared clock for every scrolling-water surface; advanced once per frame.
export const WATER_TIME = { value: 0 };

// Two layers of rain trails scrolling down a surface (glass panes, wet walls).
function streakMaterial(tintHex, baseAlpha, speed, trailAlpha) {
  const m = new THREE.ShaderMaterial({
    uniforms: {
      uTime: WATER_TIME,
      tTrail: { value: TEX.trails },
      uTint: { value: new THREE.Color(tintHex) },
      uBase: { value: baseAlpha },
      uSpeed: { value: speed },
      uTrail: { value: trailAlpha },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime, uBase, uSpeed, uTrail;
      uniform vec3 uTint;
      uniform sampler2D tTrail;
      varying vec2 vUv;
      void main() {
        float a = texture2D(tTrail, vUv + vec2(0.0, uTime * uSpeed)).a;
        float b = texture2D(tTrail, vUv * 1.7 + vec2(0.37, uTime * uSpeed * 1.6)).a;
        float t = max(a, b);
        gl_FragColor = vec4(mix(uTint, vec3(0.62, 0.7, 0.8), t), uBase + t * uTrail);
      }`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  return m;
}

export function initMaterials() {
  TEX.gradient = P.toonGradient();
  TEX.glow = P.glowSprite();
  TEX.decals = decalAtlas();
  TEX.trails = P.waterTrails();
  const concreteWall = S.concreteWall();
  const concreteFloor = S.concreteFloor();

  reg('concrete', toon(concreteWall), 4);
  reg('concreteFloor', toon(concreteFloor), 5);
  reg('asphalt', toon(S.asphalt()), 10, { cast: false });
  reg('brick', toon(S.brick()), 3);
  reg('metal', toon(S.rustMetal()), 2);
  reg('darkMetal', toon(S.rustMetal(), { color: 0x3a3d42 }), 2);
  reg('corrugated', toon(S.corrugated()), 2.5);
  reg('wood', toon(S.woodPlanks()), 2);
  reg('burlap', toon(S.burlap()), 1);
  reg('paint', toon(S.paintedMetal()), 3);
  reg('crate', toon(P.crate()), 0);
  reg('barrel', toon(P.barrel()), 0);
  reg('cardboard', toon(P.cardboard()), 0);
  reg('tire', toon(P.tire()), 0);
  reg('hazard', toon(P.hazardPlastic()), 1.2);
  reg('plain', toon(null), 0);
  reg('shutter', toon(P.shutter()), 4);
  reg('grate', toon(P.grate(), { alphaTest: 0.5, side: THREE.DoubleSide }), 1.2, { cast: false });
  reg('chain', toon(P.chainLink(), { alphaTest: 0.5, side: THREE.DoubleSide }), 0.35, { cast: false, layer: NO_OUTLINE });
  reg('wire', new THREE.MeshBasicMaterial({ color: 0x07080a, vertexColors: true }), 0, { cast: false, receive: false, layer: NO_OUTLINE });
  reg('decal', toon(TEX.decals, {
    transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  }), 0, { cast: false, layer: NO_OUTLINE });

  reg('glass', streakMaterial(0x3a4a58, 0.34, 0.05, 0.75), 1.6, { cast: false, receive: false, layer: NO_OUTLINE });
  reg('wetStreak', streakMaterial(0x000000, 0.0, 0.035, 0.42), 2.2, { cast: false, receive: false, layer: NO_OUTLINE });

  lamp('lampWarm', 0xffb45a, 6);
  lamp('lampCool', 0xdcecff, 5);
  lamp('lampFluoro', 0xffe6a8, 4);
  lamp('lampRed', 0xff2a1a, 6);
  lamp('lampBlue', 0x2a5cff, 6);
  lamp('lampSearch', 0xf4f8ff, 9);
  lamp('screen', 0x3ad88a, 1.4);
  lamp('windowWarm', 0xffc27a, 1.5);
  lamp('windowCool', 0xa8c8ff, 1.2);
  lamp('hole', 0x000000, 0);
}
