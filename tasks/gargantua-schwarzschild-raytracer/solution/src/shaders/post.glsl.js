/**
 * Post-processing GLSL: bright pass, a Call-of-Duty-style mip chain, and the final grade.
 *
 * The chain is deliberately explicit rather than borrowed, because the quality tiers have to change
 * real work here (mip count, tent radius) and debug view 7 has to show genuine pre-post HDR values
 * rather than an already-graded image.
 *
 * Colour flow: the scene pass writes linear HDR into a half-float target; bloom is summed in that
 * same linear space; the composite applies chromatic aberration, exposure, ACES, vignette, grain
 * and dither, and only then encodes to sRGB. Debug views enter the composite already
 * display-referred and bypass every lens effect except the sRGB encode.
 */

const SHARED = /* glsl */ `
precision highp float;
precision highp int;

layout(location = 0) out vec4 fragColor;

in vec2 vUv;

uniform sampler2D uSource;
uniform vec2 uTexelSize;

float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
`

export const FULLSCREEN_VERTEX_GLSL = /* glsl */ `
out vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

/** Threshold with a soft knee, so the bloom does not pop as the disk crosses the threshold. */
export const BRIGHT_PASS_FRAGMENT_GLSL = /* glsl */ `
${SHARED}
uniform float uThreshold;
uniform float uKnee;

void main() {
  vec3 c = texture(uSource, vUv).rgb;
  float brightness = max(c.r, max(c.g, c.b));
  float knee = max(uKnee, 1e-4);
  float soft = clamp(brightness - uThreshold + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee);
  float contribution = max(soft, brightness - uThreshold) / max(brightness, 1e-4);
  fragColor = vec4(c * contribution, 1.0);
}
`

/** 13-tap box filter; the standard stable downsample that avoids temporal shimmer. */
export const DOWNSAMPLE_FRAGMENT_GLSL = /* glsl */ `
${SHARED}

vec3 tap(vec2 uv) {
  return texture(uSource, uv).rgb;
}

void main() {
  vec2 uv = vUv;
  vec2 t = uTexelSize;

  vec3 a = tap(uv + t * vec2(-2.0,  2.0));
  vec3 b = tap(uv + t * vec2( 0.0,  2.0));
  vec3 c = tap(uv + t * vec2( 2.0,  2.0));
  vec3 d = tap(uv + t * vec2(-2.0,  0.0));
  vec3 e = tap(uv);
  vec3 f = tap(uv + t * vec2( 2.0,  0.0));
  vec3 g = tap(uv + t * vec2(-2.0, -2.0));
  vec3 h = tap(uv + t * vec2( 0.0, -2.0));
  vec3 i = tap(uv + t * vec2( 2.0, -2.0));
  vec3 j = tap(uv + t * vec2(-1.0,  1.0));
  vec3 k = tap(uv + t * vec2( 1.0,  1.0));
  vec3 l = tap(uv + t * vec2(-1.0, -1.0));
  vec3 m = tap(uv + t * vec2( 1.0, -1.0));

  vec3 result = e * 0.125;
  result += (a + c + g + i) * 0.03125;
  result += (b + d + f + h) * 0.0625;
  result += (j + k + l + m) * 0.125;

  fragColor = vec4(result, 1.0);
}
`

/** 9-tap tent upsample. `uRadius` widens the kernel for the lower-resolution mips. */
export const UPSAMPLE_FRAGMENT_GLSL = /* glsl */ `
${SHARED}
uniform float uRadius;

vec3 tap(vec2 uv) {
  return texture(uSource, uv).rgb;
}

void main() {
  vec2 uv = vUv;
  vec2 t = uTexelSize * uRadius;

  vec3 a = tap(uv + t * vec2(-1.0,  1.0));
  vec3 b = tap(uv + t * vec2( 0.0,  1.0));
  vec3 c = tap(uv + t * vec2( 1.0,  1.0));
  vec3 d = tap(uv + t * vec2(-1.0,  0.0));
  vec3 e = tap(uv);
  vec3 f = tap(uv + t * vec2( 1.0,  0.0));
  vec3 g = tap(uv + t * vec2(-1.0, -1.0));
  vec3 h = tap(uv + t * vec2( 0.0, -1.0));
  vec3 i = tap(uv + t * vec2( 1.0, -1.0));

  vec3 result = e * 4.0;
  result += (b + d + f + h) * 2.0;
  result += (a + c + g + i);
  fragColor = vec4(result / 16.0, 1.0);
}
`

export const COMPOSITE_FRAGMENT_GLSL = /* glsl */ `
${SHARED}
uniform sampler2D uBloom;
uniform float uExposure;
uniform float uBloomStrength;
uniform float uVignette;
uniform float uFilmGrain;
uniform float uChromaticAberration;
uniform float uGrainSeed;
uniform int uDebugMode;

// ACES RRT+ODT fit (Stephen Hill). GLSL mat3 is column-major, so each triple below is one column
// of the published row-major fit.
const mat3 ACES_INPUT = mat3(
  0.59719, 0.07600, 0.02840,
  0.35458, 0.90834, 0.13383,
  0.04823, 0.01566, 0.83777);
const mat3 ACES_OUTPUT = mat3(
   1.60475, -0.10208, -0.00327,
  -0.53108,  1.10813, -0.07276,
  -0.07367, -0.00605,  1.07602);

vec3 rrtAndOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

vec3 acesFitted(vec3 color) {
  color = ACES_INPUT * color;
  color = rrtAndOdtFit(color);
  color = ACES_OUTPUT * color;
  return clamp(color, 0.0, 1.0);
}

vec3 linearToSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 uv = vUv;
  vec3 scene = texture(uSource, uv).rgb;

  if (uDebugMode > 0) {
    // Diagnostics stay clean: no bloom, no lens effects, no exposure.
    fragColor = vec4(linearToSrgb(clamp(scene, 0.0, 1.0)), 1.0);
    return;
  }

  vec2 fromCentre = uv - 0.5;
  float radius2 = dot(fromCentre, fromCentre);

  // Chromatic aberration: lateral, growing with the square of the field radius so the photon ring
  // near the centre stays sharp.
  vec3 colour = scene;
  if (uChromaticAberration > 0.0) {
    float amount = uChromaticAberration * radius2 * 0.06;
    colour.r = texture(uSource, uv + fromCentre * amount).r;
    colour.b = texture(uSource, uv - fromCentre * amount).b;
  }

  colour += texture(uBloom, uv).rgb * uBloomStrength;
  colour *= uExposure;
  colour = acesFitted(colour);

  float vignette = cos(min(length(fromCentre) * 1.45, 1.5707));
  colour *= mix(1.0, vignette * vignette, clamp(uVignette, 0.0, 1.0));

  if (uFilmGrain > 0.0) {
    float noise = hash13(vec3(gl_FragCoord.xy, uGrainSeed * 37.0)) - 0.5;
    float luma = dot(colour, vec3(0.2126, 0.7152, 0.0722));
    colour += noise * uFilmGrain * 0.045 * (1.0 - abs(2.0 * luma - 1.0));
  }

  // Ordered dither, applied before the transfer function so 8-bit output does not band.
  colour += (hash13(vec3(gl_FragCoord.xy, 11.0)) - 0.5) / 255.0;

  fragColor = vec4(linearToSrgb(clamp(colour, 0.0, 1.0)), 1.0);
}
`
