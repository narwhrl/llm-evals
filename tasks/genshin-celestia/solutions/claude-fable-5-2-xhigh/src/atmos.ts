import * as THREE from "three";

/** Horizontal angle of the default camera around the island; the sun is placed relative to it. */
export const CAMERA_AZIMUTH = THREE.MathUtils.degToRad(124);

// Sun sits 108° to the left of the default view axis and 38° up: over the viewer's shoulder, modelling every tower.
const sunAz = CAMERA_AZIMUTH + Math.PI - THREE.MathUtils.degToRad(108);
const sunEl = THREE.MathUtils.degToRad(38);
export const SUN_DIR = new THREE.Vector3(
  Math.cos(sunAz) * Math.cos(sunEl),
  Math.sin(sunEl),
  Math.sin(sunAz) * Math.cos(sunEl),
).normalize();

export const CLOUD_SEA_Y = -2700;
export const LAND_Y = -9500;

const lin = (hex: number) => {
  const c = new THREE.Color(hex);
  return `vec3(${c.r.toFixed(4)}, ${c.g.toFixed(4)}, ${c.b.toFixed(4)})`;
};

/**
 * Aerial perspective shared by every material: haze thickens with distance and toward the
 * cloud sea, and warms up when looking toward the sun.
 */
export const GLSL_ATMOS = /* glsl */ `
const vec3 SUN_DIR = vec3(${SUN_DIR.x.toFixed(5)}, ${SUN_DIR.y.toFixed(5)}, ${SUN_DIR.z.toFixed(5)});
const vec3 HAZE_COOL = ${lin(0x9fcdf6)};
const vec3 HAZE_DEEP = ${lin(0x3f86d8)};
const vec3 HAZE_WARM = ${lin(0xffe6b8)};
const vec3 SKY_ZENITH = ${lin(0x1557c0)};
const vec3 SKY_MID = ${lin(0x3f93ea)};
vec3 hazeColor(vec3 viewDir) {
  float s = pow(max(dot(viewDir, SUN_DIR), 0.0), 5.0);
  // Looking down through miles of air the haze deepens to blue.
  vec3 cool = mix(HAZE_COOL, HAZE_DEEP, smoothstep(0.02, 0.5, -viewDir.y));
  return mix(cool, HAZE_WARM, s * 0.7);
}
vec3 atmosphere(vec3 col, vec3 toFrag, float camY) {
  float d = length(toFrag);
  float worldY = camY + toFrag.y;
  float low = exp(-max(worldY + 3000.0, 0.0) / 4200.0);
  float f = 1.0 - exp(-d * 0.000024 * (0.3 + low));
  return mix(col, hazeColor(toFrag / d), f);
}
`;

/** Replaces three's fog chunks so every built-in material gets the shared aerial perspective. */
export function installAtmosphere(scene: THREE.Scene): void {
  THREE.ShaderChunk.fog_pars_vertex = /* glsl */ `
#ifdef USE_FOG
  varying vec3 vFogWorld;
#endif`;
  THREE.ShaderChunk.fog_vertex = /* glsl */ `
#ifdef USE_FOG
  vFogWorld = transpose(mat3(viewMatrix)) * mvPosition.xyz;
#endif`;
  THREE.ShaderChunk.fog_pars_fragment = /* glsl */ `
#ifdef USE_FOG
  varying vec3 vFogWorld;
  ${GLSL_ATMOS}
#endif`;
  THREE.ShaderChunk.fog_fragment = /* glsl */ `
#ifdef USE_FOG
  gl_FragColor.rgb = atmosphere(gl_FragColor.rgb, vFogWorld, cameraPosition.y);
#endif`;
  // Only switches USE_FOG on; the colour and range come from the chunks above.
  scene.fog = new THREE.Fog(0xffffff, 1, 2);
}
