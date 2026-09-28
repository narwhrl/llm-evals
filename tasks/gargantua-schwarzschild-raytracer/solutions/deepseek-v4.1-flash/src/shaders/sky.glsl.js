/**
 * Shared GLSL: the procedural celestial background (star field + galactic band).
 *
 * Nothing here is an image, cubemap, HDRI or video. Both layers are evaluated analytically from the
 * *lensed* ray direction that the integrator produced, so the background distortion seen near the
 * hole — Einstein rings, arcing star trails, the band wrapping over the shadow — is a consequence
 * of the geodesic integration rather than a texture warp.
 *
 * Stars are placed by hashing cells of the direction vector scaled by a layer scale. A cell spans
 * roughly 1/scale radians and a star is confined to the middle 70% of its own cell, so only the
 * containing cell can ever contain a star close enough to contribute; one hash per layer suffices.
 */
export const SKY_GLSL = /* glsl */ `
const vec3 GALACTIC_POLE = vec3(0.0, 0.86164, 0.50765); // normalised in place
const float GALACTIC_POLE_LEN = 1.0;

// One population of stars. Returns radiance for 'dir'; 'density' gates how many cells hold a star.
vec3 starLayer(vec3 dir, float scale, float density, float seed, float radius) {
  vec3 p = dir * scale;
  vec3 cell = floor(p);
  vec3 h = hash33(cell * 1.13 + seed);

  // density -> probability that this cell holds any star at all
  if (h.z > density) return vec3(0.0);

  vec3 jitter = hash33(cell * 2.71 + seed + 19.7);
  vec3 starPos = cell + 0.15 + 0.70 * jitter;
  vec3 delta = p - starPos;
  float d2 = dot(delta, delta);

  float core = exp(-d2 / (radius * radius));
  float halo = exp(-d2 / (radius * radius * 7.0)) * 0.10;
  float shape = core + halo;
  if (shape < 0.002) return vec3(0.0);

  // Magnitude distribution: a handful of bright stars, a long tail of faint ones.
  float magnitude = pow(hash13(cell * 3.37 + seed + 7.3), 7.5);
  float intensity = 0.006 + 7.0 * magnitude;

  // Spectral class: mostly cool, occasionally hot and blue.
  float temperature = mix(2700.0, 13000.0, pow(hash13(cell * 5.11 + seed + 3.1), 1.7));

  return blackbodyLinear(temperature) * (shape * intensity);
}

vec3 starField(vec3 dir, float density, int octaves) {
  vec3 color = vec3(0.0);
  color += starLayer(dir, 190.0, density * 0.22, 1.0, 0.110) * 1.00;
  color += starLayer(dir, 430.0, density * 0.16, 37.0, 0.115) * 0.55;
  color += starLayer(dir, 900.0, density * 0.10, 91.0, 0.120) * 0.28;
  // A faint unresolved haze so the sky is never a hard field of points.
  color += vec3(0.55, 0.62, 0.85) * valueNoise3(dir * 620.0) * 0.0012 * density * float(octaves);
  return color;
}

/**
 * Galactic band: a bright plane around GALACTIC_POLE with fbm cloud structure and a dark dust lane.
 */
vec3 galaxyBand(vec3 dir, float brightness, int octaves) {
  float lat = dot(dir, normalize(GALACTIC_POLE));
  float band = exp(-pow(abs(lat) / 0.155, 1.8));

  vec3 q = dir * 3.3;
  float clouds = fbm3(q + vec3(2.3, 7.1, 4.4), octaves);
  float filaments = ridged3(q * 2.6 + vec3(9.0), max(octaves - 1, 1));
  float dust = smoothstep(0.18, 0.72, filaments);
  float lane = smoothstep(0.12, 0.55, abs(lat) / 0.155);

  vec3 cool = vec3(0.34, 0.46, 0.92);
  vec3 warm = vec3(1.00, 0.80, 0.55);
  vec3 tint = mix(cool, warm, smoothstep(0.28, 0.82, clouds));

  float glow = band * (0.30 + 1.05 * clouds) * mix(0.35, 1.0, lane);
  vec3 bandColor = tint * glow * brightness * 0.30;

  // A wide, much fainter halo so the band fades instead of ending at a hard edge.
  float halo = exp(-pow(abs(lat) / 0.62, 2.0));
  bandColor += mix(cool, warm, 0.4) * halo * brightness * 0.008 * (0.5 + clouds);

  return bandColor;
}

vec3 skyRadiance(vec3 dir, float starDensity, float galaxyBrightness, int octaves) {
  vec3 color = starField(dir, starDensity, octaves);
  color += galaxyBand(dir, galaxyBrightness, octaves);
  // Very dim intergalactic floor, keeps the shadow distinguishable from unrendered pixels.
  color += vec3(0.0015, 0.0022, 0.0045);
  return color;
}
`
