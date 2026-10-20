/**
 * GARGANTUA — the post chain.
 *
 * The geodesic pass writes linear radiance into a half-float target. From
 * there the frame is bloomed, exposed, tone mapped and given a lens: a little
 * dispersion, a little vignette, a little grain. The order matters. Bloom is
 * added in linear light before the tone curve, dispersion is sampled out of
 * the HDR buffer so it bends the bright structures rather than the display
 * values, and the grain is laid on last, in display space, where film puts it.
 *
 * The debug views bypass all of it. A diagnostic that has been tone mapped and
 * vignetted is no longer a diagnostic.
 */

export const BRIGHT_FRAG = `
varying vec2 vUv;
uniform sampler2D uSrc;
uniform float uThreshold;
uniform float uKnee;

void main() {
  vec3 c = texture2D(uSrc, vUv).rgb;
  float luminance = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float soft = clamp(luminance - uThreshold + uKnee, 0.0, 2.0 * uKnee);
  soft = soft * soft / (4.0 * uKnee + 1e-5);
  float contribution = max(soft, luminance - uThreshold) / max(luminance, 1e-5);
  gl_FragColor = vec4(c * clamp(contribution, 0.0, 1.0), 1.0);
}
`;

export const DOWNSAMPLE_FRAG = `
varying vec2 vUv;
uniform sampler2D uSrc;
uniform vec2 uTexel;

void main() {
  /* Four bilinear taps at the corners of the source texel footprint: a 4x4
     box in source space, which is stable under repeated downsampling. */
  vec2 o = uTexel;
  vec3 c = texture2D(uSrc, vUv + vec2(-o.x, -o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(o.x, -o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(-o.x, o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(o.x, o.y)).rgb;
  gl_FragColor = vec4(c * 0.25, 1.0);
}
`;

export const UPSAMPLE_FRAG = `
varying vec2 vUv;
uniform sampler2D uSrc;
uniform vec2 uTexel;
uniform float uRadius;

void main() {
  /* A 3x3 tent, added on top of the level below it. */
  vec2 o = uTexel * uRadius;
  vec3 c = texture2D(uSrc, vUv + vec2(-o.x, 0.0)).rgb * 2.0;
  c += texture2D(uSrc, vUv + vec2(o.x, 0.0)).rgb * 2.0;
  c += texture2D(uSrc, vUv + vec2(0.0, -o.y)).rgb * 2.0;
  c += texture2D(uSrc, vUv + vec2(0.0, o.y)).rgb * 2.0;
  c += texture2D(uSrc, vUv + vec2(-o.x, -o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(o.x, -o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(-o.x, o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(o.x, o.y)).rgb;
  c += texture2D(uSrc, vUv).rgb * 4.0;
  gl_FragColor = vec4(c / 16.0, 1.0);
}
`;

export const COMPOSITE_FRAG = `
varying vec2 vUv;

uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform vec2  uRes;
uniform float uTime;
uniform float uExposure;
uniform float uBloomIntensity;
uniform float uVignette;
uniform float uFilmGrain;
uniform float uDispersion;
uniform int   uDebug;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

/**
 * ACES film tone mapping, the fit by Stephen Hill that matches the ACES
 * RRT+ODT closely enough for a real-time frame. It rolls the hot disc off
 * into white without letting the colour walk, which a Reinhard curve cannot
 * do.
 */
vec3 acesFilm(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec3 linearToSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}

void main() {
  if (uDebug > 0) {
    /* Diagnostics are shown as they are: no bloom, no curve, no grain. */
    gl_FragColor = vec4(clamp(texture2D(uScene, vUv).rgb, 0.0, 1.0), 1.0);
    return;
  }

  vec2 centred = vUv - 0.5;
  float radial = dot(centred, centred);

  /* The lens splits the colours towards the edge of the frame. The shift is
     radial and quadratic, so the centre of the picture stays clean. */
  vec2 offset = centred * (uDispersion * 0.0030 * radial * 4.0);

  vec3 hdr;
  hdr.r = texture2D(uScene, vUv + offset).r;
  hdr.g = texture2D(uScene, vUv).g;
  hdr.b = texture2D(uScene, vUv - offset).b;

  hdr += texture2D(uBloom, vUv).rgb * uBloomIntensity;

  hdr *= uExposure;
  vec3 mapped = acesFilm(hdr);

  /* Corner falloff, kept gentle so it never touches the photon ring. */
  float aspect = uRes.x / max(uRes.y, 1.0);
  float distance = length(centred * vec2(aspect, 1.0)) * 1.42;
  float vignette = 1.0 - uVignette * pow(clamp(distance, 0.0, 1.0), 2.3);
  mapped *= vignette;

  vec3 srgb = linearToSrgb(mapped);

  /* Sensor grain, in display space so it reads evenly across the frame. */
  float grain = hash12(vUv * uRes + vec2(uTime * 61.0, uTime * 37.0)) - 0.5;
  srgb += grain * uFilmGrain;

  gl_FragColor = vec4(clamp(srgb, 0.0, 1.0), 1.0);
}
`;
