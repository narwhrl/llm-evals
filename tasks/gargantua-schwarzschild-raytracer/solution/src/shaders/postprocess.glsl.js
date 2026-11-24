export const BLOOM_PREFILTER_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uSourceTex;
uniform vec2 uTexelSize;
uniform float uThreshold;
uniform float uKnee;

float luma(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

// Soft-knee quadratic HDR bright-pass filter (avoids harsh clipping halos)
vec3 softThreshold(vec3 color) {
  float br = max(color.r, max(color.g, color.b));
  float rq = clamp(br - uThreshold + uKnee, 0.0, 2.0 * uKnee);
  rq = (rq * rq) / max(4.0 * uKnee, 1e-4);
  float contrib = max(rq, br - uThreshold) / max(br, 1e-4);
  return color * max(contrib, 0.0);
}

void main() {
  // 4-tap Karis-weighted prefilter suppresses sub-pixel HDR fireflies cleanly
  vec2 o = uTexelSize * 0.5;
  vec3 c0 = softThreshold(texture(uSourceTex, vUv + vec2(-o.x, -o.y)).rgb);
  vec3 c1 = softThreshold(texture(uSourceTex, vUv + vec2( o.x, -o.y)).rgb);
  vec3 c2 = softThreshold(texture(uSourceTex, vUv + vec2(-o.x,  o.y)).rgb);
  vec3 c3 = softThreshold(texture(uSourceTex, vUv + vec2( o.x,  o.y)).rgb);

  float w0 = 1.0 / (1.0 + luma(c0));
  float w1 = 1.0 / (1.0 + luma(c1));
  float w2 = 1.0 / (1.0 + luma(c2));
  float w3 = 1.0 / (1.0 + luma(c3));

  vec3 avg = (c0 * w0 + c1 * w1 + c2 * w2 + c3 * w3) / max(w0 + w1 + w2 + w3, 1e-4);
  // Clamp extreme spikes so bloom remains velvety and never blows out critical rings
  avg = min(avg, vec3(24.0));
  fragColor = vec4(avg, 1.0);
}
`;

export const BLOOM_DOWNSAMPLE_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uSourceTex;
uniform vec2 uTexelSize;

// Jimenez 13-tap energy-preserving dual-filter HDR downsample
void main() {
  vec2 ts = uTexelSize;

  vec3 a = texture(uSourceTex, vUv + vec2(-2.0 * ts.x,  2.0 * ts.y)).rgb;
  vec3 b = texture(uSourceTex, vUv + vec2( 0.0,         2.0 * ts.y)).rgb;
  vec3 c = texture(uSourceTex, vUv + vec2( 2.0 * ts.x,  2.0 * ts.y)).rgb;

  vec3 d = texture(uSourceTex, vUv + vec2(-2.0 * ts.x,  0.0)).rgb;
  vec3 e = texture(uSourceTex, vUv).rgb;
  vec3 f = texture(uSourceTex, vUv + vec2( 2.0 * ts.x,  0.0)).rgb;

  vec3 g = texture(uSourceTex, vUv + vec2(-2.0 * ts.x, -2.0 * ts.y)).rgb;
  vec3 h = texture(uSourceTex, vUv + vec2( 0.0,        -2.0 * ts.y)).rgb;
  vec3 i = texture(uSourceTex, vUv + vec2( 2.0 * ts.x, -2.0 * ts.y)).rgb;

  vec3 j = texture(uSourceTex, vUv + vec2(-1.0 * ts.x,  1.0 * ts.y)).rgb;
  vec3 k = texture(uSourceTex, vUv + vec2( 1.0 * ts.x,  1.0 * ts.y)).rgb;
  vec3 l = texture(uSourceTex, vUv + vec2(-1.0 * ts.x, -1.0 * ts.y)).rgb;
  vec3 m = texture(uSourceTex, vUv + vec2( 1.0 * ts.x, -1.0 * ts.y)).rgb;

  vec3 sum = e * 0.125;
  sum += (a + c + g + i) * 0.03125;
  sum += (b + d + f + h) * 0.0625;
  sum += (j + k + l + m) * 0.125;

  fragColor = vec4(max(sum, vec3(0.0)), 1.0);
}
`;

export const BLOOM_UPSAMPLE_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uLowMipTex;
uniform sampler2D uHighMipTex;
uniform vec2 uTexelSize;
uniform float uFilterRadius;

// 9-tap tent filter upsample blended with current mip level
void main() {
  vec2 ts = uTexelSize * uFilterRadius;

  vec3 a = texture(uLowMipTex, vUv + vec2(-ts.x,  ts.y)).rgb;
  vec3 b = texture(uLowMipTex, vUv + vec2( 0.0,   ts.y)).rgb;
  vec3 c = texture(uLowMipTex, vUv + vec2( ts.x,  ts.y)).rgb;

  vec3 d = texture(uLowMipTex, vUv + vec2(-ts.x,  0.0 )).rgb;
  vec3 e = texture(uLowMipTex, vUv).rgb;
  vec3 f = texture(uLowMipTex, vUv + vec2( ts.x,  0.0 )).rgb;

  vec3 g = texture(uLowMipTex, vUv + vec2(-ts.x, -ts.y)).rgb;
  vec3 h = texture(uLowMipTex, vUv + vec2( 0.0,  -ts.y)).rgb;
  vec3 i = texture(uLowMipTex, vUv + vec2( ts.x, -ts.y)).rgb;

  vec3 upsampled = e * 4.0;
  upsampled += (b + d + f + h) * 2.0;
  upsampled += (a + c + g + i);
  upsampled *= (1.0 / 16.0);

  vec3 highMip = texture(uHighMipTex, vUv).rgb;
  fragColor = vec4(highMip + upsampled * 0.85, 1.0);
}
`;

export const COMPOSITE_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uSceneTex;
uniform sampler2D uBloomTex;
uniform vec2 uResolution;
uniform int uDebugMode;
uniform float uBloomIntensity;
uniform float uExposure;
uniform float uVignetteIntensity;
uniform float uGrainIntensity;
uniform float uChromaticAberration;
uniform float uTime;

// Fitted ACES Filmic RRT + ODT Tone Mapping (Stephen Hill / BakingLab sRGB->AP1->RRT+ODT->sRGB)
const mat3 ACES_INPUT_MAT = mat3(
  0.59719, 0.07600, 0.02840,
  0.35458, 0.90834, 0.13383,
  0.04823, 0.01566, 0.83777
);

const mat3 ACES_OUTPUT_MAT = mat3(
   1.60475, -0.10208, -0.00327,
  -0.53108,  1.10813, -0.07276,
  -0.07367, -0.00605,  1.07602
);

vec3 rrtAndOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

vec3 acesFilmicToneMap(vec3 color) {
  color = ACES_INPUT_MAT * color;
  color = rrtAndOdtFit(color);
  color = ACES_OUTPUT_MAT * color;
  return clamp(color, 0.0, 1.0);
}

// Deterministic high-frequency hash for photographic luma grain (bit-reproducible at fixed uTime)
float hashGrain(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 linearToSrgb(vec3 c) {
  vec3 low = c * 12.92;
  vec3 high = 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
  return mix(low, high, step(vec3(0.0031308), c));
}

void main() {
  // Diagnostic views 1..9 bypass lens post-processing so technical readouts remain uncorrupted
  if (uDebugMode != 0) {
    vec3 diag = texture(uSceneTex, vUv).rgb;
    fragColor = vec4(clamp(diag, 0.0, 1.0), 1.0);
    return;
  }

  vec2 centered = vUv - 0.5;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 radialAspect = vec2(centered.x * min(aspect, 1.8), centered.y);
  float r2 = dot(radialAspect, radialAspect);

  // Subtle corner-weighted lateral chromatic aberration:
  // vanishes smoothly near viewport center so event horizon & photon ring remain razor-sharp.
  vec2 caOffset = centered * (r2 * uChromaticAberration * 0.0095);
  vec3 hdrScene;
  if (uChromaticAberration > 0.001) {
    float rCh = texture(uSceneTex, clamp(vUv + caOffset, 0.0, 1.0)).r;
    float gCh = texture(uSceneTex, vUv).g;
    float bCh = texture(uSceneTex, clamp(vUv - caOffset, 0.0, 1.0)).b;
    hdrScene = vec3(rCh, gCh, bCh);
  } else {
    hdrScene = texture(uSceneTex, vUv).rgb;
  }

  // Blend multi-mip HDR bloom
  vec3 bloom = texture(uBloomTex, vUv).rgb;
  vec3 hdr = max(hdrScene + bloom * (uBloomIntensity * 0.42), vec3(0.0));

  // Exposure & ACES filmic tone mapping
  hdr *= uExposure;
  vec3 mapped = acesFilmicToneMap(hdr);

  // Restrained cosine-fourth optical vignette (leaves central critical structure untouched)
  float vigDist = length(centered * vec2(1.22, 1.08));
  float vigCurve = smoothstep(0.32, 0.96, vigDist);
  float vignette = 1.0 - vigCurve * vigCurve * clamp(uVignetteIntensity * 0.72, 0.0, 0.88);
  mapped *= vignette;

  // Restrained luminance-weighted photographic film grain (deterministic for fixed uTime)
  // Smoothly suppressed to exact zero inside pitch-black event horizon core.
  if (uGrainIntensity > 0.0005) {
    vec2 px = floor(vUv * uResolution);
    float timeSeed = floor(uTime * 24.0) * 17.13;
    float g1 = hashGrain(px + vec2(timeSeed, timeSeed * 0.61));
    float g2 = hashGrain(px + vec2(timeSeed * 1.37 + 19.4, timeSeed * 0.29 + 7.1));
    float triNoise = (g1 + g2 - 1.0); // triangular PDF centered at 0
    float luma = dot(mapped, vec3(0.2126, 0.7152, 0.0722));
    float shadowGuard = smoothstep(0.008, 0.07, luma);
    float midWeight = shadowGuard * (1.0 - smoothstep(0.58, 0.98, luma) * 0.65);
    mapped = clamp(mapped + vec3(triNoise * uGrainIntensity * midWeight), 0.0, 1.0);
  }

  fragColor = vec4(linearToSrgb(mapped), 1.0);
}
`;
