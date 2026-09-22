/**
 * Shared GLSL: a Planck-locus RGB approximation used for both the accretion disk and the stars.
 *
 * The fit is the standard piecewise approximation to the blackbody chromaticity (Tanner Helland,
 * refined by Neil Bartlett), valid over 1000 K – 40000 K, converted here from its native sRGB
 * encoding to linear light so the result can be scaled radiometrically. The returned colour is
 * normalised to unit maximum component, so callers supply brightness separately.
 */
export const BLACKBODY_GLSL = /* glsl */ `
vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
}

vec3 linearToSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

// Chromaticity of a blackbody at 'kelvin', in linear light, peak component == 1.
vec3 blackbodyLinear(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;

  float r;
  if (t <= 66.0) {
    r = 255.0;
  } else {
    r = 329.698727446 * pow(t - 60.0, -0.1332047592);
  }

  float g;
  if (t <= 66.0) {
    g = 99.4708025861 * log(t) - 161.1195681661;
  } else {
    g = 288.1221695283 * pow(t - 60.0, -0.0755148492);
  }

  float b;
  if (t >= 66.0) {
    b = 255.0;
  } else if (t <= 19.0) {
    b = 0.0;
  } else {
    b = 138.5177312231 * log(t - 10.0) - 305.0447927307;
  }

  vec3 srgb = clamp(vec3(r, g, b) / 255.0, 0.0, 1.0);
  vec3 linear = srgbToLinear(srgb);
  return linear / max(max(linear.r, linear.g), max(linear.b, 1e-4));
}
`
