import * as THREE from 'three';

type ShaderProgram = Parameters<THREE.Material['onBeforeCompile']>[0];

/** A change injected into a built-in material's shader just before it is compiled. */
export interface ShaderHook {
  (program: ShaderProgram): void;
  /** Identifies the hook set so three's program cache does not share programs between different injections. */
  readonly id: string;
}

function hook(id: string, body: (program: ShaderProgram) => void): ShaderHook {
  return Object.assign(body, { id });
}

export function applyShaders<T extends THREE.Material>(material: T, ...hooks: ShaderHook[]): T {
  material.onBeforeCompile = (program) => {
    for (const apply of hooks) apply(program);
  };
  material.customProgramCacheKey = () => hooks.map((apply) => apply.id).join('|');
  return material;
}

// Aerial perspective: distant things melt into a haze that stays cool away from the sun and turns golden
// toward it. Standard materials get it by replacing three's fog step, so the scene must declare a fog
// for the `vFogDepth` varying to exist; the fog's own colour and range are never read.

export const atmosphere = {
  uAtmoNear: { value: 380 },
  uAtmoFar: { value: 9000 },
  uAtmoHaze: { value: new THREE.Color(0xbdd6ee) },
  uAtmoGlow: { value: new THREE.Color(0xffe2ba) },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uSunDirView: { value: new THREE.Vector3(0, 1, 0) },
};

export const ATMOSPHERE_UNIFORMS = /* glsl */ `
uniform float uAtmoNear;
uniform float uAtmoFar;
uniform vec3 uAtmoHaze;
uniform vec3 uAtmoGlow;
uniform vec3 uSunDirView;
`;

export const ATMOSPHERE_FUNCTIONS = /* glsl */ `
float atmosphereAmount(float viewDepth) {
	float d = max(viewDepth - uAtmoNear, 0.0) / (uAtmoFar - uAtmoNear);
	return 1.0 - exp(-d * 2.2);
}

// viewRay is the camera-to-fragment direction in view space.
vec3 atmosphereColor(vec3 viewRay) {
	float towardSun = max(dot(normalize(viewRay), uSunDirView), 0.0);
	return mix(uAtmoHaze, uAtmoGlow, pow(towardSun, 3.0));
}
`;

export const atmosphereHook = hook('atmosphere', (program) => {
  Object.assign(program.uniforms, atmosphere);
  program.fragmentShader = program.fragmentShader
    .replace('#include <common>', `#include <common>\n${ATMOSPHERE_UNIFORMS}${ATMOSPHERE_FUNCTIONS}`)
    .replace(
      '#include <fog_fragment>',
      /* glsl */ `
#ifdef USE_FOG
	gl_FragColor.rgb = mix(gl_FragColor.rgb, atmosphereColor(-vViewPosition), atmosphereAmount(vFogDepth));
#endif`,
    );
});

/** Keeps the view-space sun direction in step with the camera. */
export function updateAtmosphere(camera: THREE.Camera): void {
  atmosphere.uSunDirView.value.copy(atmosphere.uSunDir.value).transformDirection(camera.matrixWorldInverse);
}

// Triplanar surface detail: a tiling noise map projected along all three axes, with optional sedimentary
// banding on steep faces. Works for instanced and regular meshes alike.

const SURFACE_VERTEX = /* glsl */ `
varying vec3 vSurfacePos;
varying vec3 vSurfaceNormal;
`;
const SURFACE_VERTEX_NORMAL = /* glsl */ `
vSurfaceNormal = normalize(mat3(modelMatrix) * objectNormal);
`;
const SURFACE_VERTEX_POSITION = /* glsl */ `
vec4 surfaceLocal = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
	surfaceLocal = instanceMatrix * surfaceLocal;
#endif
vSurfacePos = (modelMatrix * surfaceLocal).xyz;
`;
const SURFACE_FRAGMENT = /* glsl */ `
uniform sampler2D uSurfaceMap;
uniform float uSurfaceScale;
uniform float uSurfaceStrength;
uniform float uSurfaceStrata;
varying vec3 vSurfacePos;
varying vec3 vSurfaceNormal;
`;
const SURFACE_APPLY = /* glsl */ `
{
	vec3 blend = pow(abs(vSurfaceNormal), vec3(4.0));
	blend /= (blend.x + blend.y + blend.z);
	vec3 p = vSurfacePos * uSurfaceScale;
	float detail = texture2D(uSurfaceMap, p.zy).r * blend.x
		+ texture2D(uSurfaceMap, p.xz).r * blend.y
		+ texture2D(uSurfaceMap, p.xy).r * blend.z;
	// Fractal noise hugs the mid-grey, so stretch it before it is used as a tone.
	detail = smoothstep(0.34, 0.66, detail);
	diffuseColor.rgb *= 1.0 + (detail - 0.5) * uSurfaceStrength;
	// Sedimentary bands: thin dark seams that follow the height, broken up by the same noise.
	float seam = smoothstep(0.55, 0.95, sin(vSurfacePos.y * 0.8 + detail * 7.0));
	diffuseColor.rgb *= 1.0 - (1.0 - blend.y) * uSurfaceStrata * seam;
}
`;

export function surfaceDetailHook(
  map: THREE.Texture,
  options: { scale: number; strength: number; strata: number },
): ShaderHook {
  return hook(`surface:${options.scale}:${options.strength}:${options.strata}`, (program) => {
    program.uniforms.uSurfaceMap = { value: map };
    program.uniforms.uSurfaceScale = { value: options.scale };
    program.uniforms.uSurfaceStrength = { value: options.strength };
    program.uniforms.uSurfaceStrata = { value: options.strata };
    program.vertexShader = program.vertexShader
      .replace('#include <common>', `#include <common>\n${SURFACE_VERTEX}`)
      .replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>\n${SURFACE_VERTEX_NORMAL}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>\n${SURFACE_VERTEX_POSITION}`);
    program.fragmentShader = program.fragmentShader
      .replace('#include <common>', `#include <common>\n${SURFACE_FRAGMENT}`)
      .replace('#include <map_fragment>', `#include <map_fragment>\n${SURFACE_APPLY}`);
  });
}

// A slow bend in the canopy tops, driven by world position so neighbouring trees do not move in lockstep.

export const windTime = { value: 0 };

export const windHook = hook('wind', (program) => {
  program.uniforms.uWindTime = windTime;
  program.vertexShader = program.vertexShader
    .replace('#include <common>', '#include <common>\nuniform float uWindTime;')
    .replace(
      '#include <begin_vertex>',
      /* glsl */ `
#include <begin_vertex>
#ifdef USE_INSTANCING
	float windPhase = uWindTime * 1.1 + instanceMatrix[3].x * 0.23 + instanceMatrix[3].z * 0.17;
	float windBend = max(position.y - 1.5, 0.0);
	transformed.xz += vec2(sin(windPhase), cos(windPhase * 0.73)) * 0.006 * windBend * windBend;
#endif`,
    );
});
