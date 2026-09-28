// HDR post-processing: bloom mip chain (threshold → downsample → tent
// upsample) and the final composite (exposure, bloom, chromatic aberration,
// ACES filmic tone mapping, vignette, grain, sRGB encode).

// Soft-knee threshold; also halves resolution into the first bloom mip.
export const BRIGHT_FRAG = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uSrc;
uniform vec2 uTexel;
uniform float uThreshold;
uniform float uExposure;
vec3 fetch(vec2 uv) { return texture(uSrc, uv).rgb * uExposure; }
void main() {
  vec3 c = 0.25 * (fetch(vUv + uTexel * vec2(-0.5, -0.5)) + fetch(vUv + uTexel * vec2(0.5, -0.5))
                 + fetch(vUv + uTexel * vec2(-0.5, 0.5)) + fetch(vUv + uTexel * vec2(0.5, 0.5)));
  float br = max(c.r, max(c.g, c.b));
  float knee = max(uThreshold * 0.5, 1e-3);
  float soft = clamp(br - uThreshold + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee + 1e-5);
  float contrib = max(soft, br - uThreshold) / max(br, 1e-5);
  c *= contrib;
  // Clamp fireflies from near-critical rays so bloom stays stable.
  c = min(c, vec3(60.0));
  fragColor = vec4(c, 1.0);
}
`;

// 13-tap downsample (Jimenez 2014) to avoid aliasing shimmer.
export const DOWN_FRAG = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uSrc;
uniform vec2 uTexel;
vec3 s(vec2 o) { return texture(uSrc, vUv + o * uTexel).rgb; }
void main() {
  vec3 a = s(vec2(-2.0, 2.0)), b = s(vec2(0.0, 2.0)), c = s(vec2(2.0, 2.0));
  vec3 d = s(vec2(-2.0, 0.0)), e = s(vec2(0.0, 0.0)), f = s(vec2(2.0, 0.0));
  vec3 g = s(vec2(-2.0, -2.0)), h = s(vec2(0.0, -2.0)), i = s(vec2(2.0, -2.0));
  vec3 j = s(vec2(-1.0, 1.0)), k = s(vec2(1.0, 1.0)), l = s(vec2(-1.0, -1.0)), m = s(vec2(1.0, -1.0));
  vec3 col = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  fragColor = vec4(col, 1.0);
}
`;

// 3×3 tent upsample of the smaller mip, added to the current mip.
export const UP_FRAG = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uSrc;
uniform sampler2D uBase;
uniform vec2 uTexel;
uniform float uRadius;
vec3 s(vec2 o) { return texture(uSrc, vUv + o * uTexel * uRadius).rgb; }
void main() {
  vec3 col = s(vec2(0.0)) * 4.0
    + (s(vec2(-1.0, 0.0)) + s(vec2(1.0, 0.0)) + s(vec2(0.0, -1.0)) + s(vec2(0.0, 1.0))) * 2.0
    + s(vec2(-1.0, -1.0)) + s(vec2(1.0, -1.0)) + s(vec2(-1.0, 1.0)) + s(vec2(1.0, 1.0));
  fragColor = vec4(texture(uBase, vUv).rgb + col / 16.0, 1.0);
}
`;

export const COMPOSITE_FRAG = /* glsl */ `
precision highp float;
precision highp int;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uExposure;
uniform float uBloomStrength;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform int uCaTaps;
uniform float uTime;
uniform vec2 uResolution;
uniform int uDebug;

// ACES fitted RRT+ODT (Stephen Hill), applied in ACEScg-like space.
const mat3 ACES_IN = mat3(
  0.59719, 0.07600, 0.02840,
  0.35458, 0.90834, 0.13383,
  0.04823, 0.01566, 0.83777);
const mat3 ACES_OUT = mat3(
  1.60475, -0.10208, -0.00327,
  -0.53108, 1.10813, -0.07276,
  -0.07367, -0.00605, 1.07602);
vec3 rrtOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}
vec3 acesFilmic(vec3 c) {
  c = ACES_IN * c;
  c = rrtOdtFit(c);
  return clamp(ACES_OUT * c, 0.0, 1.0);
}
vec3 linearToSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// Radial lateral chromatic aberration: R and B are sampled at slightly
// different radii, spread across uCaTaps samples to avoid hard fringes.
vec3 sampleScene(vec2 uv) {
  vec2 center = uv - 0.5;
  float amount = uChromatic * 0.006 * dot(center, center) * 4.0;
  if (uCaTaps <= 1 || amount < 1e-6) {
    return vec3(texture(uScene, uv - center * amount).r, texture(uScene, uv).g, texture(uScene, uv + center * amount).b);
  }
  vec3 sum = vec3(0.0);
  vec3 wsum = vec3(0.0);
  for (int i = 0; i < 5; i++) {
    if (i >= uCaTaps) break;
    float t = float(i) / float(uCaTaps - 1);
    vec3 w = vec3(1.0 - t, 1.0 - abs(2.0 * t - 1.0), t) + 0.05;
    vec3 c = texture(uScene, uv + center * amount * (2.0 * t - 1.0)).rgb;
    sum += c * w;
    wsum += w;
  }
  return sum / wsum;
}

void main() {
  if (uDebug != 0) {
    fragColor = vec4(texture(uScene, vUv).rgb, 1.0);
    return;
  }
  vec3 hdr = sampleScene(vUv) * uExposure;
  hdr += texture(uBloom, vUv).rgb * uBloomStrength;
  vec3 col = acesFilmic(hdr);
  vec2 c = vUv - 0.5;
  c.x *= uResolution.x / uResolution.y;
  float vig = 1.0 - uVignette * smoothstep(0.35, 1.05, length(c));
  col *= vig;
  col = linearToSrgb(col);
  float n = hash12(gl_FragCoord.xy + fract(uTime * 7.31) * 911.0) - 0.5;
  float lumaMask = 1.0 - 0.6 * dot(col, vec3(0.333));
  col += n * uGrain * lumaMask;
  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
