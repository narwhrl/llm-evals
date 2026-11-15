import * as THREE from 'three';
import * as T from './textures.js';
import { PALETTE, PUDDLES } from './config.js';

/**
 * Cel-shaded material library. Everything structural uses MeshToonMaterial with
 * a 4-step gradient map; crisp silhouettes come from the inverted-hull outline
 * pass in kit.js.
 */

function gradientMap(steps = [78, 140, 205, 255]) {
  const data = new Uint8Array(steps.length * 4);
  steps.forEach((v, i) => {
    data[i * 4] = v; data[i * 4 + 1] = v; data[i * 4 + 2] = v; data[i * 4 + 3] = 255;
  });
  const tex = new THREE.DataTexture(data, steps.length, 1, THREE.RGBAFormat);
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

export function createMaterials() {
  const gradient = gradientMap();

  const toon = (map, color = 0xffffff, extra = {}) => new THREE.MeshToonMaterial({
    map, color, gradientMap: gradient, ...extra,
  });

  const std = (map, color = 0xffffff, extra = {}) => new THREE.MeshStandardMaterial({
    map, color, ...extra,
  });

  const concreteMap = T.concreteTexture(2, 11);
  const rustMap = T.rustTexture(2, 77);
  const woodMap = T.woodTexture(1, 33);

  const mats = {
    floor: toon(T.floorTexture(PUDDLES), 0xffffff),
    slab: std(T.concreteTexture(3, 91), 0xa9afb7, { roughness: 0.92, metalness: 0.02 }),
    concrete: toon(concreteMap, 0xc3c9d1),
    concreteDark: toon(concreteMap, 0x8d949e),
    concreteWarm: toon(concreteMap, 0xc9bda8),
    rust: toon(rustMap, 0xf0d9c4),
    rustHeavy: toon(rustMap, 0xc79a74),
    shutter: toon(rustMap, 0xd8b491),
    steel: toon(T.metalTexture(2, '#6a737e', 51), 0xe6ebf1),
    steelDark: toon(T.metalTexture(2, '#3a4048', 52), 0xc4cad2),
    containerRed: toon(T.corrugatedTexture('#9c4130', [7, 2], 91), 0xffffff),
    containerBlue: toon(T.corrugatedTexture('#33587e', [7, 2], 93), 0xffffff),
    containerGreen: toon(T.corrugatedTexture('#446a42', [7, 2], 95), 0xffffff),
    containerGrey: toon(T.corrugatedTexture('#5a6068', [7, 2], 97), 0xffffff),
    corrugated: toon(T.corrugatedTexture('#787d83', [6, 3], 99), 0xffffff),
    wood: toon(woodMap, 0xf0dcb8),
    woodDark: toon(woodMap, 0xc0a884),
    woodPale: toon(woodMap, 0xfff0d8),
    cardboard: toon(T.cardboardTexture(1, 63), 0xf0e2c2),
    drumBlue: toon(T.metalTexture(2, '#3a6f9f', 61), 0xffffff),
    drumGreen: toon(T.metalTexture(2, '#487d51', 62), 0xffffff),
    drumRed: toon(T.metalTexture(2, '#9c4130', 63), 0xffffff),
    tire: toon(T.metalTexture(1, '#26292e', 71), 0xa8adb4),
    barrier: toon(T.metalTexture(1, '#c4762f', 73), 0xffffff),
    barrierWhite: toon(T.metalTexture(1, '#b6bcc2', 74), 0xffffff),
    sandbag: toon(T.cardboardTexture(2, 81), 0xd8c8a4),
    tarp: toon(T.tarpTexture(2, 71), 0xffffff),
    glass: new THREE.MeshBasicMaterial({ color: 0x2a3b4d, transparent: true, opacity: 0.5 }),
    glassLit: new THREE.MeshBasicMaterial({ color: 0xf2c98c, transparent: true, opacity: 0.62 }),
    plasticWhite: toon(T.metalTexture(1, '#9aa1a8', 83), 0xffffff),
    plasticDark: toon(T.metalTexture(1, '#3b4148', 84), 0xffffff),
    emissiveWarm: new THREE.MeshBasicMaterial({ color: 0xffd9a0 }),
    emissiveCold: new THREE.MeshBasicMaterial({ color: 0xd6e6ff }),
    emissiveRed: new THREE.MeshBasicMaterial({ color: 0xff4032 }),
    emissiveBlue: new THREE.MeshBasicMaterial({ color: 0x4a86ff }),
    emissiveGreen: new THREE.MeshBasicMaterial({ color: 0x7dffa8 }),
    water: new THREE.MeshStandardMaterial({
      color: 0x0a141f, roughness: 0.07, metalness: 0.8, envMapIntensity: 1.5,
    }),
  };

  // Decal materials -------------------------------------------------------
  const decal = (map, opacity = 1) => new THREE.MeshBasicMaterial({
    map, transparent: true, opacity, depthWrite: false, polygonOffset: true,
    polygonOffsetFactor: -4, polygonOffsetUnits: -4, side: THREE.DoubleSide, fog: true,
  });

  mats.paintWhite = decal(T.stencilTexture('A', { sub: 'BOMBSITE', color: '#ded8c6', size: 170, seed: 12 }), 0.92);
  mats.paintWhiteB = decal(T.stencilTexture('B', { sub: 'BOMBSITE', color: '#ded8c6', size: 170, seed: 13 }), 0.92);
  mats.graffitiA = decal(T.graffitiTexture(3), 0.85);
  mats.graffitiB = decal(T.graffitiTexture(8), 0.85);
  mats.graffitiC = decal(T.graffitiTexture(15), 0.8);
  mats.bulletHoles = decal(T.bulletHoleTexture(9), 0.95);
  mats.bulletHoles2 = decal(T.bulletHoleTexture(21), 0.9);
  mats.freightMark = decal(T.stencilTexture('MSKU 482913 7', { color: '#e6e2d4', size: 78, seed: 31 }), 0.8);
  mats.freightMark2 = decal(T.stencilTexture('TGHU 907144 2', { color: '#dcd6c4', size: 78, seed: 32 }), 0.75);
  mats.sign = decal(T.signTexture(['FREIGHT', 'YARD 4'], { bg: '#c2a94f' }), 1);
  mats.sign2 = decal(T.signTexture(['DANGER', 'KEEP OUT'], { bg: '#a8492f' }), 1);
  mats.badge = decal(T.badgeTexture(), 0.9);
  mats.streak = new THREE.MeshBasicMaterial({
    map: T.streakTexture(23), transparent: true, opacity: 0.4, depthWrite: false,
    blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  });

  mats.gradient = gradient;
  return mats;
}

/** Assign the scene environment map to every material that can use one. */
export function applyEnvironment(materials, envMap) {
  for (const key of Object.keys(materials)) {
    const m = materials[key];
    if (!m) continue;
    // only the PBR materials accept an env map; the toon set is lit by hand
    if (m.isMeshStandardMaterial || m.isMeshPhongMaterial || m.isMeshLambertMaterial) {
      m.envMap = envMap;
      m.needsUpdate = true;
    }
  }
}

/**
 * Inverted-hull outline: the shell is pushed along smoothed vertex normals in
 * view space, so the line keeps a constant screen width.
 */
export function createOutlineMaterial(thickness = 0.0045) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uThickness: { value: thickness },
      uColor: { value: new THREE.Color(PALETTE.outline) },
    },
    vertexShader: /* glsl */`
      uniform float uThickness;
      attribute float aOutlineRadius;
      void main() {
        vec4 mv = modelViewMatrix * vec4( position, 1.0 );
        vec3 n = normalize( normalMatrix * normal );
        float d = max( -mv.z, 0.05 );
        float off = min( uThickness * d, aOutlineRadius * 0.22 );
        mv.xyz += n * off;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      void main() {
        gl_FragColor = vec4( uColor, 1.0 );
      }
    `,
    side: THREE.BackSide,
    depthWrite: true,
  });
}
