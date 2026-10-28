// Cel materials. Everything is a MeshToonMaterial sharing one 3-step ramp, with
// an optional dark rim; the wet ground additionally samples the planar mirror
// rendered by postfx so standing water reflects the buildings and lights.

import * as THREE from "three";
import { gradientMap, asphalt, concreteFloor, concreteWall, rustedMetal, corrugated, wood, cardboard, puddleMask, rippleNormal } from "./textures.js";

const ramp = () => gradientMap(4);

export function toon(color, maps = {}) {
  const m = new THREE.MeshToonMaterial({ color, gradientMap: ramp() });
  if (maps.map) m.map = maps.map;
  if (maps.bumpMap) { m.bumpMap = maps.bumpMap; m.bumpScale = maps.bumpScale ?? 0.08; }
  if (maps.aoMap) m.aoMap = maps.aoMap;
  return m;
}

// One cached material per surface family. Sharing instances is what lets the
// static batcher merge thousands of props into a handful of draw calls, and it
// keeps GL_STATE identical across the diorama.
const shared = new Map();
function once(key, make) {
  let m = shared.get(key);
  if (!m) {
    m = make();
    shared.set(key, m);
  }
  return m;
}

export const palette = {
  concrete: () => once("concrete", () => toon(0xb9bec6, { map: concreteWall(), bumpMap: concreteWall(), bumpScale: 0.05 })),
  concreteDark: () => once("concreteDark", () => toon(0x7f858e, { map: concreteWall(), bumpMap: concreteWall(), bumpScale: 0.05 })),
  metalRust: () => once("metalRust", () => toon(0xa98b6d, { map: rustedMetal(), bumpMap: rustedMetal(), bumpScale: 0.1 })),
  metalPaint: (color) => once(`metalPaint:${color}`, () => toon(color, { map: corrugated(), bumpMap: corrugated(), bumpScale: 0.06 })),
  wood: () => once("wood", () => toon(0xc7a478, { map: wood(), bumpMap: wood(), bumpScale: 0.08 })),
  cardboard: () => once("cardboard", () => toon(0xcbb08a, { map: cardboard(), bumpMap: cardboard(), bumpScale: 0.06 })),
  plastic: (color) => once(`plastic:${color}`, () => toon(color)),
  rubber: () => once("rubber", () => toon(0x2b2d33, { map: asphalt(), bumpMap: asphalt(), bumpScale: 0.04 })),
  emissive: (color, intensity = 1) =>
    once(`emissive:${color}:${intensity}`, () =>
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) })),
  // Rain-darkened glazing. Deliberately not MeshPhysicalMaterial transmission:
  // that forces an extra full-scene render pass every frame, and a wet-window
  // look is achievable with a flat transparent cel material.
  glass: (color = 0x9fc3d8) =>
    once(`glass:${color}`, () =>
      new THREE.MeshToonMaterial({
        color, gradientMap: ramp(), transparent: true, opacity: 0.42, depthWrite: false,
        side: THREE.DoubleSide,
      })),
};

// Wet street: toon-lit asphalt whose low spots mirror the scene. The puddle mask
// and a scrolling ripple normal modulate a screen-projected sample of the mirror
// target, so reflections sit only in standing water and shiver as rain hits it.
export function wetStreetMaterial({ mirrorTexture, reflectorUniforms }) {
  const base = new THREE.MeshToonMaterial({
    color: 0xffffff,
    gradientMap: ramp(),
    map: asphalt(),
    bumpMap: asphalt(),
    bumpScale: 0.05,
  });
  const puddle = puddleMask(3);
  puddle.repeat.set(4, 4);
  const ripple = rippleNormal();
  ripple.repeat.set(9, 9);

  base.onBeforeCompile = (shader) => {
    shader.uniforms.uPuddle = { value: puddle };
    shader.uniforms.uRipple = { value: ripple };
    shader.uniforms.uMirror = mirrorTexture;
    shader.uniforms.uMirrorMatrix = reflectorUniforms.matrix;
    shader.uniforms.uMirrorStrength = reflectorUniforms.strength;
    shader.uniforms.uWetTime = reflectorUniforms.time;

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
         uniform mat4 uMirrorMatrix;
         varying vec3 vWorldPos;
         varying vec4 vMirrorCoord;`
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         vec4 wetWorld = modelMatrix * vec4(position, 1.0);
         vWorldPos = wetWorld.xyz;
         vMirrorCoord = uMirrorMatrix * wetWorld;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         uniform sampler2D uPuddle;
         uniform sampler2D uRipple;
         uniform sampler2D uMirror;
         uniform float uMirrorStrength;
         uniform float uWetTime;
         varying vec3 vWorldPos;
         varying vec4 vMirrorCoord;
         vec3 wetReflection = vec3(0.0);`
      )
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
         float puddle = smoothstep(0.42, 0.72, texture2D(uPuddle, vWorldPos.xz * 0.031 + 0.5).r);
         vec2 rips = texture2D(uRipple, vWorldPos.xz * 0.05 + vec2(uWetTime * 0.02, uWetTime * 0.013)).rg;
         vec4 mc = vMirrorCoord / max(1e-4, vMirrorCoord.w);
         vec2 distort = (rips - 0.5) * 0.035 * (0.4 + puddle);
         vec2 mirrorUv = clamp(mc.xy * 0.5 + 0.5 + distort, vec2(0.0), vec2(1.0));
         vec3 mirrored = texture2D(uMirror, mirrorUv).rgb;
         float grazing = pow(clamp(1.0 - dot(normalize(cameraPosition - vWorldPos), vec3(0.0, 1.0, 0.0)), 0.0, 1.0), 2.0);
         float wetMix = puddle * (0.4 + 0.6 * grazing) * uMirrorStrength;
         diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.4, wetMix);
         wetReflection = mirrored * wetMix;`
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
         totalEmissiveRadiance += wetReflection;`
      );
  };
  base.customProgramCacheKey = () => "wetStreet";
  return base;
}

