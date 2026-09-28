import * as THREE from 'three';
import { decal, surface } from './textures.js';

/**
 * Toon material system.
 *
 * Fills use MeshToonMaterial driven by a hard-stepped gradient ramp, which is
 * what gives the miniature its banded, weighty read. Outlines are a separate
 * inverted hull pass (see outline.js) rather than a post-process edge pass, so
 * they stay razor sharp at any zoom and never need a composer.
 */

function gradientRamp(steps) {
  const data = new Uint8Array(steps.length);
  steps.forEach((value, index) => {
    data[index] = Math.round(value * 255);
  });
  const texture = new THREE.DataTexture(data, steps.length, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

export const toonRamp = gradientRamp([104, 158, 210, 255]);

/** Slightly softer ramp for props that should read as background detail. */
export const softRamp = gradientRamp([126, 172, 218, 255]);

function toon(name, color, options = {}) {
  return new THREE.MeshToonMaterial({
    color,
    gradientMap: options.ramp ?? toonRamp,
    map: options.map ?? null,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    alphaTest: options.alphaTest ?? 0,
    side: options.side ?? THREE.FrontSide,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 1,
    depthWrite: options.depthWrite ?? true,
  });
}

function decalMaterial(name, extra = {}) {
  return new THREE.MeshToonMaterial({
    map: decal(name),
    gradientMap: toonRamp,
    transparent: true,
    alphaTest: 0.32,
    depthWrite: true,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    side: THREE.FrontSide,
    ...extra,
  });
}

/**
 * All static fill materials, keyed by the name the builder files use.
 * Keeping them in one table is what lets the whole map collapse into a
 * handful of draw calls.
 */
export function createMaterials() {
  const map = {
    // --- terrain and structure -------------------------------------------
    // Kept deliberately mid-value: pale concrete in a night scene reads as
    // snow and flattens the whole miniature.
    concrete: toon('concrete', 0x969ba3, { map: surface('concrete') }),
    concreteDark: toon('concreteDark', 0x646a73, { map: surface('concrete') }),
    concreteRim: toon('concreteRim', 0xa8adb4, { map: surface('concrete') }),
    concretePatch: toon('concretePatch', 0x767c85, { map: surface('concrete') }),
    asphalt: toon('asphalt', 0x929aa6, { map: surface('asphalt') }),
    brick: toon('brick', 0x7c6a5e, { map: surface('concrete') }),

    // --- metals ------------------------------------------------------------
    rust: toon('rust', 0xa8a29a, { map: surface('rust') }),
    rustDark: toon('rustDark', 0x7a746e, { map: surface('rust') }),
    metal: toon('metal', 0x8e97a4, { map: surface('metal') }),
    metalDark: toon('metalDark', 0x6a727d, { map: surface('metal') }),
    wire: toon('wire', 0x4a5058, { ramp: softRamp }),
    corrugated: toon('corrugated', 0xa9b0b8, { map: surface('corrugated') }),
    corrugatedDark: toon('corrugatedDark', 0x6f767e, { map: surface('corrugated') }),
    containerGreen: toon('containerGreen', 0x9fb0a6, { map: surface('containerGreen') }),
    containerBlue: toon('containerBlue', 0x8fa4bb, { map: surface('containerBlue') }),
    bluePaint: toon('bluePaint', 0x9fc0dd, { map: surface('bluePaint') }),

    // --- organics ----------------------------------------------------------
    wood: toon('wood', 0xa89478, { map: surface('wood') }),
    woodDark: toon('woodDark', 0x7d7160, { map: surface('wood') }),
    cardboard: toon('cardboard', 0xc0a077, { map: surface('cardboard') }),
    sandbag: toon('sandbag', 0x9c8f6a, { map: surface('cardboard') }),

    // --- misc surfaces -----------------------------------------------------
    rubber: toon('rubber', 0x2c2f35, { ramp: softRamp }),
    tarp: toon('tarp', 0x4d5a52, { map: surface('cardboard') }),
    paintWhite: toon('paintWhite', 0xe8e8e2, { map: surface('concrete') }),
    paintRed: toon('paintRed', 0xa8402f, { map: surface('concrete') }),
    glass: new THREE.MeshToonMaterial({
      color: 0x9fc4d8,
      gradientMap: softRamp,
      transparent: true,
      opacity: 0.34,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),

    // --- emissive light sources -------------------------------------------
    lampWarm: toon('lampWarm', 0xfff0cf, { emissive: 0xffcf8f, emissiveIntensity: 1.9 }),
    lampCold: toon('lampCold', 0xe6f2ff, { emissive: 0xcfe4ff, emissiveIntensity: 1.5 }),
    lampRed: toon('lampRed', 0xff5b52, { emissive: 0xff2a22, emissiveIntensity: 2.4 }),
    lampBlue: toon('lampBlue', 0x6ea8ff, { emissive: 0x2a5cff, emissiveIntensity: 2.4 }),
    lampBroken: toon('lampBroken', 0x8b8f96, { emissive: 0x0a0c10, emissiveIntensity: 1 }),

    // --- decals ------------------------------------------------------------
    decalBombA: decalMaterial('bombA'),
    decalBombB: decalMaterial('bombB'),
    decalGraffitiOne: decalMaterial('graffitiOne'),
    decalGraffitiTwo: decalMaterial('graffitiTwo'),
    decalGraffitiThree: decalMaterial('graffitiThree'),
    decalFreightCode: decalMaterial('freightCode'),
    decalFreightCodeTwo: decalMaterial('freightCodeTwo'),
    decalWarningOne: decalMaterial('warningOne'),
    decalWarningTwo: decalMaterial('warningTwo'),
    decalWarningThree: decalMaterial('warningThree'),
    decalBulletHoles: decalMaterial('bulletHoles'),
    decalPoliceBadge: decalMaterial('policeBadge'),
    decalDutyRoster: decalMaterial('dutyRoster'),
    decalRoadSign: decalMaterial('roadSign'),
    decalSprayT: decalMaterial('sprayT'),
    decalSprayCT: decalMaterial('sprayCT'),
  };

  // Sprayed floor markings read better as flat paint than as lit geometry.
  map.decalBombA.polygonOffsetFactor = -6;
  map.decalBombB.polygonOffsetFactor = -6;

  return map;
}

const OUTLINE_VERTEX = /* glsl */ `
  #include <common>
  #include <fog_pars_vertex>
  uniform float uWidth;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewNormal = normalize(normalMatrix * normal);
    // Constant screen-space thickness: the hull widens with distance so the
    // line keeps the same pixel weight whether you are zoomed into a barrel
    // or looking at the whole plinth.
    float depth = max(-mvPosition.z, 0.5);
    mvPosition.xyz += viewNormal * (uWidth * depth);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

const OUTLINE_FRAGMENT = /* glsl */ `
  #include <common>
  #include <fog_pars_fragment>
  uniform vec3 uColor;

  void main() {
    gl_FragColor = vec4(uColor, 1.0);
    #include <fog_fragment>
  }
`;

export function createOutlineMaterial(width = 0.0016) {
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      { uWidth: { value: width }, uColor: { value: new THREE.Color(0x0a0c12) } },
    ]),
    vertexShader: OUTLINE_VERTEX,
    fragmentShader: OUTLINE_FRAGMENT,
    side: THREE.BackSide,
    fog: true,
  });
}
