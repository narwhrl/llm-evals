/**
 * GARGANTUA — HDR Bloom & ACES Fitted Cinema Post-Processing Shaders
 *
 * Pipeline:
 * 1. Karis-weighted soft-knee HDR Bloom prefilter + 13-tap anti-firefly downsample
 * 2. Progressive mip-pyramid downsample
 * 3. 9-tap tent filter progressive upsample with subtle horizontal cinema lens stretch
 * 4. Final Composite:
 *    - Center-protected radial chromatic aberration
 *    - Additive HDR Bloom synthesis
 *    - Linear Exposure scaling
 *    - Stephen Hill RRT+ODT ACES Fitted Tone Mapping (sRGB -> AP1 -> RRT+ODT -> sRGB)
 *    - Restrained optical vignette & deterministic luminance-weighted cinema film grain
 */

export const BLOOM_PREFILTER_FRAG = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D tInput;
uniform vec2 uTexelSize;
uniform float uThreshold;

float calcLuma(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

vec3 softThreshold(vec3 color, float threshold) {
  float br = max(max(color.r, color.g), color.b);
  float knee = threshold * 0.5 + 1e-4;
  float soft = clamp(br - threshold + knee, 0.0, 2.0 * knee);
  soft = (soft * soft) / (4.0 * knee + 1e-4);
  float contrib = max(soft, br - threshold) / max(br, 1e-4);
  return color * max(contrib, 0.0);
}

vec3 sampleKaris(vec2 uv) {
  vec3 c = min(texture2D(tInput, uv).rgb, vec3(48.0));
  c = softThreshold(c, uThreshold);
  return c / (1.0 + calcLuma(c) * 0.18);
}

void main() {
  vec2 d = uTexelSize;
  vec3 a = sampleKaris(vUv + vec2(-1.0, -1.0) * d);
  vec3 b = sampleKaris(vUv + vec2( 0.0, -1.0) * d);
  vec3 c = sampleKaris(vUv + vec2( 1.0, -1.0) * d);
  vec3 e = sampleKaris(vUv + vec2(-0.5, -0.5) * d);
  vec3 f = sampleKaris(vUv + vec2( 0.5, -0.5) * d);
  vec3 g = sampleKaris(vUv + vec2(-1.0,  0.0) * d);
  vec3 h = sampleKaris(vUv);
  vec3 i = sampleKaris(vUv + vec2( 1.0,  0.0) * d);
  vec3 j = sampleKaris(vUv + vec2(-0.5,  0.5) * d);
  vec3 k = sampleKaris(vUv + vec2( 0.5,  0.5) * d);
  vec3 l = sampleKaris(vUv + vec2(-1.0,  1.0) * d);
  vec3 m = sampleKaris(vUv + vec2( 0.0,  1.0) * d);
  vec3 n = sampleKaris(vUv + vec2( 1.0,  1.0) * d);

  vec3 outCol = h * 0.125;
  outCol += (a + c + l + n) * 0.03125;
  outCol += (b + g + i + m) * 0.0625;
  outCol += (e + f + j + k) * 0.125;

  gl_FragColor = vec4(max(outCol, vec3(0.0)), 1.0);
}
`;

export const BLOOM_DOWNSAMPLE_FRAG = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D tInput;
uniform vec2 uTexelSize;

void main() {
  // Slightly wider horizontal kernel imparts a subtle IMAX anamorphic bloom character
  vec2 d = uTexelSize * vec2(1.22, 1.0);

  vec3 a = texture2D(tInput, vUv + vec2(-1.0, -1.0) * d).rgb;
  vec3 b = texture2D(tInput, vUv + vec2( 0.0, -1.0) * d).rgb;
  vec3 c = texture2D(tInput, vUv + vec2( 1.0, -1.0) * d).rgb;
  vec3 e = texture2D(tInput, vUv + vec2(-0.5, -0.5) * d).rgb;
  vec3 f = texture2D(tInput, vUv + vec2( 0.5, -0.5) * d).rgb;
  vec3 g = texture2D(tInput, vUv + vec2(-1.0,  0.0) * d).rgb;
  vec3 h = texture2D(tInput, vUv).rgb;
  vec3 i = texture2D(tInput, vUv + vec2( 1.0,  0.0) * d).rgb;
  vec3 j = texture2D(tInput, vUv + vec2(-0.5,  0.5) * d).rgb;
  vec3 k = texture2D(tInput, vUv + vec2( 0.5,  0.5) * d).rgb;
  vec3 l = texture2D(tInput, vUv + vec2(-1.0,  1.0) * d).rgb;
  vec3 m = texture2D(tInput, vUv + vec2( 0.0,  1.0) * d).rgb;
  vec3 n = texture2D(tInput, vUv + vec2( 1.0,  1.0) * d).rgb;

  vec3 outCol = h * 0.125;
  outCol += (a + c + l + n) * 0.03125;
  outCol += (b + g + i + m) * 0.0625;
  outCol += (e + f + j + k) * 0.125;

  gl_FragColor = vec4(outCol, 1.0);
}
`;

export const BLOOM_UPSAMPLE_FRAG = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D tLowMip;
uniform sampler2D tHighMip;
uniform vec2 uTexelSize;
uniform float uRadiusWeight;

void main() {
  vec2 d = uTexelSize * vec2(1.18, 1.0);

  vec3 s = vec3(0.0);
  s += texture2D(tLowMip, vUv + vec2(-d.x,  d.y)).rgb * 1.0;
  s += texture2D(tLowMip, vUv + vec2( 0.0,  d.y)).rgb * 2.0;
  s += texture2D(tLowMip, vUv + vec2( d.x,  d.y)).rgb * 1.0;
  s += texture2D(tLowMip, vUv + vec2(-d.x,  0.0)).rgb * 2.0;
  s += texture2D(tLowMip, vUv).rgb * 4.0;
  s += texture2D(tLowMip, vUv + vec2( d.x,  0.0)).rgb * 2.0;
  s += texture2D(tLowMip, vUv + vec2(-d.x, -d.y)).rgb * 1.0;
  s += texture2D(tLowMip, vUv + vec2( 0.0, -d.y)).rgb * 2.0;
  s += texture2D(tLowMip, vUv + vec2( d.x, -d.y)).rgb * 1.0;
  s *= (1.0 / 16.0);

  vec3 high = texture2D(tHighMip, vUv).rgb;
  gl_FragColor = vec4(high + s * uRadiusWeight, 1.0);
}
`;

export const COMPOSITE_POST_FRAG = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D tSceneHdr;
uniform sampler2D tBloom;
uniform vec2 uResolution;
uniform float uTime;
uniform int uDebugMode;

uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignetteStrength;
uniform float uFilmGrainStrength;
uniform float uChromaticAberration;

// Stephen Hill ACES RRT + ODT Fitted Tone Mapping (sRGB <-> ACES AP1)
vec3 rrtAndOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

vec3 acesFittedToneMap(vec3 color) {
  // Column-major matrices matching sRGB (D65) -> ACES AP1 -> sRGB (D65)
  const mat3 acesInputMat = mat3(
    0.59719, 0.07600, 0.02840,
    0.35458, 0.90834, 0.13383,
    0.04823, 0.01566, 0.83777
  );
  const mat3 acesOutputMat = mat3(
     1.60475, -0.10208, -0.00327,
    -0.53108,  1.10813, -0.07276,
    -0.07367, -0.00605,  1.07602
  );

  color = acesInputMat * max(color, vec3(0.0));
  color = rrtAndOdtFit(color);
  color = acesOutputMat * color;
  return clamp(color, 0.0, 1.0);
}

vec3 linearToSrgb(vec3 linear) {
  vec3 c = clamp(linear, 0.0, 1.0);
  vec3 low = c * 12.92;
  vec3 high = 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055;
  return mix(low, high, step(vec3(0.0031308), c));
}

float interleavedGradientNoise(vec2 pixel, float frameSeed) {
  vec2 p = pixel + vec2(frameSeed * 5.588238, frameSeed * 3.14159);
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

void main() {
  // Diagnostic views 1-9 bypass bloom, ACES, vignette, grain, and chromatic aberration
  if (uDebugMode > 0) {
    vec3 diag = texture2D(tSceneHdr, vUv).rgb;
    gl_FragColor = vec4(diag, 1.0);
    return;
  }

  vec2 centered = vUv - 0.5;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 metricOffset = vec2(centered.x * min(aspect, 1.5), centered.y);
  float radialDistSq = dot(metricOffset, metricOffset);

  // Subtle lateral lens chromatic aberration, zeroed in the central critical region
  float caMask = smoothstep(0.035, 0.42, radialDistSq);
  vec2 caShift = centered * (uChromaticAberration * 0.0095 * caMask);

  float hdrR = texture2D(tSceneHdr, clamp(vUv + caShift, 0.001, 0.999)).r;
  float hdrG = texture2D(tSceneHdr, vUv).g;
  float hdrB = texture2D(tSceneHdr, clamp(vUv - caShift, 0.001, 0.999)).b;
  vec3 sceneHdr = vec3(hdrR, hdrG, hdrB);

  vec3 bloomHdr = texture2D(tBloom, vUv).rgb;
  vec3 combinedHdr = (sceneHdr + bloomHdr * uBloomStrength) * uExposure;

  vec3 mappedLinear = acesFittedToneMap(combinedHdr);
  vec3 colorSrgb = linearToSrgb(mappedLinear);

  // Restrained optical vignette (preserves center photon ring & disk clarity)
  float vigDist = length(centered * vec2(1.12, 1.05));
  float vignette = 1.0 - uVignetteStrength * smoothstep(0.28, 0.92, vigDist);
  colorSrgb *= clamp(vignette, 0.15, 1.0);

  // Fine deterministic cinema film grain (driven by simulation uTime for capture determinism)
  if (uFilmGrainStrength > 0.0001) {
    float luma = dot(colorSrgb, vec3(0.299, 0.587, 0.114));
    // Protect deep shadow inside event horizon and specular peak highlights
    float grainMask = smoothstep(0.008, 0.10, luma) * (1.0 - 0.55 * smoothstep(0.75, 1.0, luma));
    float timeSeed = floor(uTime * 24.0 + 0.5) * 0.173;
    float n1 = interleavedGradientNoise(gl_FragCoord.xy, timeSeed);
    float n2 = interleavedGradientNoise(gl_FragCoord.xy + vec2(17.0, 29.0), timeSeed + 1.37);
    float triNoise = (n1 + n2 - 1.0);
    colorSrgb = clamp(colorSrgb + triNoise * uFilmGrainStrength * (0.35 + 0.65 * grainMask), 0.0, 1.0);
  }

  gl_FragColor = vec4(colorSrgb, 1.0);
}
`;
