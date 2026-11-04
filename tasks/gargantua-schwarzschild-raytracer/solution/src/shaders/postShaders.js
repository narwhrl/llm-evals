export const bloomPrefilterFragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D uInputTex;
uniform vec2 uTexelSize;
uniform float uThreshold;

float calcSceneLuminance(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

vec3 softThreshold(vec3 color, float threshold) {
  float br = max(color.r, max(color.g, color.b));
  float knee = max(threshold * 0.55, 1e-4);
  float soft = br - threshold + knee;
  soft = clamp(soft, 0.0, 2.0 * knee);
  soft = (soft * soft) / (4.0 * knee + 1e-5);
  float contrib = max(soft, br - threshold) / max(br, 1e-5);
  return color * max(contrib, 0.0);
}

void main() {
  // 4-tap Karis-weighted box prefilter to tame sub-pixel HDR fireflies while keeping photon ring glow crisp
  vec2 d = uTexelSize * 0.5;
  vec3 c0 = softThreshold(texture2D(uInputTex, vUv + vec2(-d.x, -d.y)).rgb, uThreshold);
  vec3 c1 = softThreshold(texture2D(uInputTex, vUv + vec2( d.x, -d.y)).rgb, uThreshold);
  vec3 c2 = softThreshold(texture2D(uInputTex, vUv + vec2(-d.x,  d.y)).rgb, uThreshold);
  vec3 c3 = softThreshold(texture2D(uInputTex, vUv + vec2( d.x,  d.y)).rgb, uThreshold);

  float w0 = 1.0 / (1.0 + calcSceneLuminance(c0) * 0.22);
  float w1 = 1.0 / (1.0 + calcSceneLuminance(c1) * 0.22);
  float w2 = 1.0 / (1.0 + calcSceneLuminance(c2) * 0.22);
  float w3 = 1.0 / (1.0 + calcSceneLuminance(c3) * 0.22);

  vec3 filtered = (c0 * w0 + c1 * w1 + c2 * w2 + c3 * w3) / max(w0 + w1 + w2 + w3, 1e-5);
  gl_FragColor = vec4(clamp(filtered, vec3(0.0), vec3(120.0)), 1.0);
}
`;

export const bloomDownsampleFragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D uInputTex;
uniform vec2 uTexelSize;

void main() {
  // Jimenez 13-tap energy-preserving HDR downsample filter
  vec2 t = uTexelSize;

  vec3 a = texture2D(uInputTex, vUv + vec2(-2.0,  2.0) * t).rgb;
  vec3 b = texture2D(uInputTex, vUv + vec2( 0.0,  2.0) * t).rgb;
  vec3 c = texture2D(uInputTex, vUv + vec2( 2.0,  2.0) * t).rgb;

  vec3 d = texture2D(uInputTex, vUv + vec2(-2.0,  0.0) * t).rgb;
  vec3 e = texture2D(uInputTex, vUv).rgb;
  vec3 f = texture2D(uInputTex, vUv + vec2( 2.0,  0.0) * t).rgb;

  vec3 g = texture2D(uInputTex, vUv + vec2(-2.0, -2.0) * t).rgb;
  vec3 h = texture2D(uInputTex, vUv + vec2( 0.0, -2.0) * t).rgb;
  vec3 i = texture2D(uInputTex, vUv + vec2( 2.0, -2.0) * t).rgb;

  vec3 j = texture2D(uInputTex, vUv + vec2(-1.0,  1.0) * t).rgb;
  vec3 k = texture2D(uInputTex, vUv + vec2( 1.0,  1.0) * t).rgb;
  vec3 l = texture2D(uInputTex, vUv + vec2(-1.0, -1.0) * t).rgb;
  vec3 m = texture2D(uInputTex, vUv + vec2( 1.0, -1.0) * t).rgb;

  vec3 sum = e * 0.125;
  sum += (a + c + g + i) * 0.03125;
  sum += (b + d + f + h) * 0.0625;
  sum += (j + k + l + m) * 0.125;

  gl_FragColor = vec4(max(sum, vec3(0.0)), 1.0);
}
`;

export const bloomUpsampleFragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D uLowMipTex;
uniform sampler2D uHighMipTex;
uniform vec2 uTexelSize;
uniform float uRadius;

void main() {
  // 9-tap tent filter upsample combined with higher-resolution mip level
  vec2 d = uTexelSize * uRadius;

  vec3 s = vec3(0.0);
  s += texture2D(uLowMipTex, vUv + vec2(-d.x,  d.y)).rgb * 1.0;
  s += texture2D(uLowMipTex, vUv + vec2( 0.0,  d.y)).rgb * 2.0;
  s += texture2D(uLowMipTex, vUv + vec2( d.x,  d.y)).rgb * 1.0;

  s += texture2D(uLowMipTex, vUv + vec2(-d.x,  0.0)).rgb * 2.0;
  s += texture2D(uLowMipTex, vUv).rgb * 4.0;
  s += texture2D(uLowMipTex, vUv + vec2( d.x,  0.0)).rgb * 2.0;

  s += texture2D(uLowMipTex, vUv + vec2(-d.x, -d.y)).rgb * 1.0;
  s += texture2D(uLowMipTex, vUv + vec2( 0.0, -d.y)).rgb * 2.0;
  s += texture2D(uLowMipTex, vUv + vec2( d.x, -d.y)).rgb * 1.0;

  vec3 tent = s * (1.0 / 16.0);
  vec3 baseMip = texture2D(uHighMipTex, vUv).rgb;
  gl_FragColor = vec4(baseMip + tent * 0.86, 1.0);
}
`;

export const compositeFragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D uSceneTex;
uniform sampler2D uBloomTex;
uniform vec2 uResolution;
uniform float uTime;
uniform int uDebugMode;
uniform int uCaSamples;

uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uFilmGrain;
uniform float uChromaticAberration;

// -----------------------------------------------------------------------------
// Stephen Hill Fitted ACES RRT + ODT Tone Mapping (Linear sRGB -> AP1 -> sRGB)
// Preserves incandescent white-gold highlights without scalar hue skewing.
// -----------------------------------------------------------------------------
vec3 rrtAndOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

vec3 acesFittedToneMap(vec3 color) {
  // Column-major mat3 matching Hill's row-major sRGB -> AP1 input transform
  mat3 acesInput = mat3(
    0.59719, 0.07600, 0.02840,
    0.35458, 0.90834, 0.13383,
    0.04823, 0.01566, 0.83777
  );
  // Column-major mat3 matching Hill's AP1 -> linear sRGB output transform
  mat3 acesOutput = mat3(
     1.60475, -0.10208, -0.00327,
    -0.53108,  1.10813, -0.07276,
    -0.07367, -0.00605,  1.07602
  );

  color = acesInput * max(color, vec3(0.0));
  color = rrtAndOdtFit(color);
  color = acesOutput * color;
  return clamp(color, 0.0, 1.0);
}

vec3 linearToSrgb(vec3 lin) {
  lin = clamp(lin, 0.0, 1.0);
  vec3 lo = lin * 12.92;
  vec3 hi = 1.055 * pow(max(lin, vec3(1e-5)), vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), lin));
}

vec3 spectrumWeight(float t) {
  // Smooth red -> green -> blue spectral dispersion weights for [0, 1]
  vec3 w = vec3(
    clamp(1.5 - abs(t * 3.0 - 0.5) * 1.6, 0.0, 1.0),
    clamp(1.5 - abs(t * 3.0 - 1.5) * 1.6, 0.0, 1.0),
    clamp(1.5 - abs(t * 3.0 - 2.5) * 1.6, 0.0, 1.0)
  );
  return max(w, vec3(0.001));
}

float interleavedGradientNoise(vec2 pixel, float frameSeed) {
  vec2 p = pixel + vec2(frameSeed * 5.588238, frameSeed * 3.14159);
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

void main() {
  if (uDebugMode > 0) {
    vec3 diag = texture2D(uSceneTex, vUv).rgb;
    gl_FragColor = vec4(linearToSrgb(clamp(diag, 0.0, 1.0)), 1.0);
    return;
  }

  vec2 centered = vUv - 0.5;
  float radialDist = length(centered * vec2(uResolution.x / max(uResolution.y, 1.0), 1.0));

  // Subtle peripheral radial chromatic aberration (strictly zero at center so photon ring stays sharp)
  vec3 sceneHdr = vec3(0.0);
  vec3 bloomHdr = vec3(0.0);

  if (uChromaticAberration > 0.001 && uCaSamples >= 3) {
    float dispersion = uChromaticAberration * 0.0068 * pow(radialDist, 1.85);
    vec2 caDir = (length(centered) > 1e-5) ? normalize(centered) : vec2(0.0);
    vec3 weightSum = vec3(0.0);

    for (int i = 0; i < 7; i++) {
      if (i >= uCaSamples) break;
      float t = float(i) / float(max(uCaSamples - 1, 1));
      float shift = (t - 0.5) * 2.0 * dispersion;
      vec2 sampleUv = clamp(vUv + caDir * shift, vec2(0.001), vec2(0.999));
      vec3 w = spectrumWeight(t);
      sceneHdr += texture2D(uSceneTex, sampleUv).rgb * w;
      bloomHdr += texture2D(uBloomTex, sampleUv).rgb * w;
      weightSum += w;
    }
    sceneHdr /= weightSum;
    bloomHdr /= weightSum;
  } else {
    sceneHdr = texture2D(uSceneTex, vUv).rgb;
    bloomHdr = texture2D(uBloomTex, vUv).rgb;
  }

  vec3 hdrCombined = (sceneHdr + bloomHdr * uBloomStrength) * uExposure;

  // ACES fitted tone mapping
  vec3 mapped = acesFittedToneMap(hdrCombined);

  // Restrained optical vignette (never crushes central event horizon or photon ring)
  if (uVignette > 0.001) {
    float vig = 1.0 - uVignette * 0.46 * smoothstep(0.32, 1.18, radialDist);
    mapped *= clamp(vig, 0.15, 1.0);
  }

  vec3 srgb = linearToSrgb(mapped);

  // Subtle photochemical film grain (deterministic with uTime for reproducible captures)
  if (uFilmGrain > 0.0005) {
    float timeSeed = mod(floor(uTime * 24.0 + 0.5), 1024.0);
    float n1 = interleavedGradientNoise(gl_FragCoord.xy, timeSeed);
    float n2 = interleavedGradientNoise(gl_FragCoord.xy + vec2(17.0, 31.0), timeSeed + 0.37);
    float triNoise = (n1 + n2 - 1.0); // Triangular distribution in [-1, +1]
    // Slightly less grain in deep black event horizon core so horizon stays pure dark
    float lum = dot(srgb, vec3(0.299, 0.587, 0.114));
    float grainMask = mix(0.28, 1.0, smoothstep(0.0, 0.12, lum));
    srgb = clamp(srgb + triNoise * uFilmGrain * grainMask, 0.0, 1.0);
  }

  gl_FragColor = vec4(srgb, 1.0);
}
`;
