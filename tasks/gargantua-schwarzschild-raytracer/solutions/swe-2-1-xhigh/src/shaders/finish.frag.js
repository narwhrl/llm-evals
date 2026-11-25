// Finishing pass: chromatic aberration (pre-tonemap, in linear HDR), then the
// exact ACES filmic tone mapping implementation used by three.js (Stephen Hill
// fit: input/output matrices + RRTAndODTFit), linear→sRGB conversion, then
// restrained vignette and animated film grain in display space.

export const FINISH_FRAG = /* glsl */ `
precision highp float;

uniform sampler2D tDiffuse;
uniform vec2  uResolution;
uniform float uExposure;
uniform float uChroma;        // chromatic aberration strength
uniform float uVignette;      // vignette strength
uniform float uGrain;         // film grain strength
uniform float uTime;          // frozen-capable clock driving the grain seed

varying vec2 vUv;

// --- ACES filmic tone mapping (Stephen Hill fit, as implemented in three.js) --
vec3 RRTAndODTFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}
const mat3 ACESInputMat = mat3(
  vec3(0.59719, 0.07600, 0.02840),
  vec3(0.35458, 0.90834, 0.13383),
  vec3(0.04823, 0.01566, 0.83777)
);
const mat3 ACESOutputMat = mat3(
  vec3(1.60475, -0.10208, -0.00327),
  vec3(-0.53108, 1.10813, -0.07276),
  vec3(-0.07367, -0.00605, 1.07602)
);
vec3 ACESFilmicToneMapping(vec3 color) {
  color /= 0.6; // ACEScc mid-gray match, exactly as in three.js
  color = ACESInputMat * color;
  color = RRTAndODTFit(color);
  color = ACESOutputMat * color;
  return clamp(color, 0.0, 1.0);
}
vec3 linearToSrgb(vec3 c) {
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), c));
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  float r2 = dot(centered, centered);

  // --- chromatic aberration: radial RGB split, sampled in linear HDR --------
  vec3 col;
  if (uChroma > 0.0001) {
    float shift = uChroma * 0.006 * r2 * 4.0;
    vec2 off = normalize(centered + vec2(1e-7)) * shift;
    col.r = texture2D(tDiffuse, uv + off).r;
    col.g = texture2D(tDiffuse, uv).g;
    col.b = texture2D(tDiffuse, uv - off).b;
  } else {
    col = texture2D(tDiffuse, uv).rgb;
  }

  // --- exposure + ACES filmic + sRGB -----------------------------------------
  col *= exp2(uExposure);
  col = ACESFilmicToneMapping(col);
  col = linearToSrgb(col);

  // --- vignette (display space, restrained) ----------------------------------
  float vig = 1.0 - uVignette * smoothstep(0.12, 0.72, r2);
  col *= vig;

  // --- film grain (display space, animated but deterministic per frame) ------
  if (uGrain > 0.0001) {
    float seed = floor(uTime * 24.0) + 1.0;
    float g = grainHash(uv * uResolution + vec2(seed * 17.17, seed * 3.31));
    col += (g - 0.5) * uGrain * 0.05 * (0.3 + 0.7 * (1.0 - clamp(dot(col, vec3(0.333)), 0.0, 1.0)));
  }

  gl_FragColor = vec4(col, 1.0);
}
`;
