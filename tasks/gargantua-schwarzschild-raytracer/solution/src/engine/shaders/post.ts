// GARGANTUA — post-processing passes.
//
// Pipeline: the raytracer writes linear HDR into a RGBA16F target, then
//   bright pass  -> soft-knee thresholded energy at half resolution,
//   blur chain   -> per-level separable 9-tap Gaussian (ping-pong, halving),
//   composite    -> bloom sum + radial dispersion (chromatic aberration),
//                   exposure, ACES tone mapping (Stephen Hill's fitted
//                   mat3 version), vignette, film grain, sRGB encode.
// Debug views bypass bloom/tonemap/grade and are passed through unchanged.

export const POST_VERT = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const BRIGHT_FRAG = /* glsl */ `
uniform sampler2D tSrc;
uniform vec2 uTexel;      // 1 / source resolution
uniform float uThreshold;

void main() {
  // 4-tap box downsample to the half-res bloom base.
  vec2 uv = gl_FragCoord.xy * uTexel * 2.0 - uTexel;
  vec3 c = texture2D(tSrc, uv + uTexel * vec2(-0.5, -0.5)).rgb;
  c += texture2D(tSrc, uv + uTexel * vec2(0.5, -0.5)).rgb;
  c += texture2D(tSrc, uv + uTexel * vec2(-0.5, 0.5)).rgb;
  c += texture2D(tSrc, uv + uTexel * vec2(0.5, 0.5)).rgb;
  c *= 0.25;
  float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
  // Soft-knee threshold: keep only HDR energy above the knee.
  float knee = uThreshold * 0.6 + 1e-4;
  float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee);
  float contribution = max(soft, lum - uThreshold) / max(lum, 1e-4);
  gl_FragColor = vec4(c * contribution, 1.0);
}
`;

export const BLUR_FRAG = /* glsl */ `
uniform sampler2D tSrc;
uniform vec2 uTexel;   // 1 / destination resolution
uniform vec2 uDir;     // (1,0) horizontal, (0,1) vertical

void main() {
  vec2 uv = gl_FragCoord.xy * uTexel;
  // 9-tap Gaussian (linear-sampling optimised 5-weight kernel).
  vec3 sum = texture2D(tSrc, uv).rgb * 0.2270270270;
  vec2 o1 = uDir * uTexel * 1.3846153846;
  vec2 o2 = uDir * uTexel * 3.2307692308;
  sum += (texture2D(tSrc, uv + o1).rgb + texture2D(tSrc, uv - o1).rgb) * 0.3162162162;
  sum += (texture2D(tSrc, uv + o2).rgb + texture2D(tSrc, uv - o2).rgb) * 0.0702702703;
  gl_FragColor = vec4(sum, 1.0);
}
`;

export const MAX_BLOOM_LEVELS = 6;

export const COMPOSITE_FRAG = /* glsl */ `
uniform sampler2D tScene;
uniform sampler2D tBloom[${MAX_BLOOM_LEVELS}];
uniform float uBloomLevels;
uniform float uBloomIntensity;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uDispersion;
uniform float uTime;        // simulation seconds (frozen under capture=1)
uniform vec2 uOutTexel;     // 1 / output resolution
uniform int uDebug;

float hash21(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

// ACES tone mapping — Stephen Hill's fitted RRT+ODT
// (BakingLab, MIT licensed, widely used explicit ACES implementation).
const mat3 ACES_IN = mat3(
  0.59719, 0.07600, 0.02840,
  0.35458, 0.90834, 0.13383,
  0.04823, 0.01566, 0.83777
);
const mat3 ACES_OUT = mat3(
  1.60475, -0.10208, -0.00327,
  -0.53108, 1.10813, -0.07276,
  -0.07367, -0.00605, 1.07602
);
vec3 rrtOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}
vec3 acesFitted(vec3 c) {
  c = ACES_IN * c;
  c = rrtOdtFit(c);
  return clamp(ACES_OUT * c, 0.0, 1.0);
}

vec3 srgbEncode(vec3 c) {
  return mix(c * 12.92,
             1.055 * pow(max(c, vec3(1e-5)), vec3(1.0 / 2.4)) - 0.055,
             step(vec3(0.0031308), c));
}

// Bloom pyramid sum with optional per-channel radial offset (dispersion).
vec3 bloomSum(vec2 uv) {
  vec3 sum = vec3(0.0);
  for (int i = 0; i < ${MAX_BLOOM_LEVELS}; i++) {
    if (float(i) >= uBloomLevels) break;
    float w = 1.0 / (1.0 + float(i) * 0.85);
    sum += texture2D(tBloom[i], uv).rgb * w;
  }
  return sum * uBloomIntensity;
}

void main() {
  vec2 uv = gl_FragCoord.xy * uOutTexel;

  if (uDebug != 0) {
    // Diagnostic views are display-referred already; pass them through.
    gl_FragColor = vec4(texture2D(tScene, uv).rgb, 1.0);
    return;
  }

  // Radial dispersion: sample R and B slightly closer to / further from the
  // optical centre than G.
  vec2 toCentre = uv - 0.5;
  vec2 ca = toCentre * (uDispersion * 0.006);
  vec3 c;
  c.r = texture2D(tScene, uv + ca).r + bloomSum(uv + ca).r;
  c.g = texture2D(tScene, uv).g + bloomSum(uv).g;
  c.b = texture2D(tScene, uv - ca).b + bloomSum(uv - ca).b;

  // Exposure + ACES.
  c = acesFitted(c * uExposure);

  // Restrained vignette (kept clear of the centre so the photon ring and the
  // horizon silhouette stay untouched).
  float d = length(toCentre);
  c *= 1.0 - uVignette * 0.55 * smoothstep(0.32, 0.86, d);

  // Film grain, animated by simulation time (frozen under capture=1).
  float g = hash21(gl_FragCoord.xy + vec2(fract(uTime * 61.7) * 113.1, fract(uTime * 43.3) * 271.7));
  c += (g - 0.5) * uGrain * 0.085;

  gl_FragColor = vec4(srgbEncode(clamp(c, 0.0, 1.0)), 1.0);
}
`;
