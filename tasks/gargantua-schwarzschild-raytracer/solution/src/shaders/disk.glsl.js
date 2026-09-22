/**
 * Shared GLSL: the relativistic accretion disk — geometry, crossing weight, radiometry.
 *
 * GEOMETRY
 *   A slab of half-thickness `slabHalfThickness` around the equatorial plane (normal n = +Y),
 *   truncated to the annulus [rInner, rOuter]. The disk is never drawn as geometry: it is
 *   intersected against the *integrated* null geodesic, so one curved ray can strike the same disk
 *   several times at different radii.
 *
 * ORDERED CROSSINGS
 *   In the ray's own orbital plane the height above the disk plane is
 *       y(phi) = x(phi) . n = r(phi) * (A cos phi + B sin phi),   A = e1.n, B = e2.n
 *   so a mid-plane crossing is a sign change of y(phi). scene.glsl.js refines each sign change by
 *   cubic Hermite interpolation of y from (y, dy/dphi) at both ends of the RK4 step. Because phi is
 *   monotonic along the ray, the crossings arrive already sorted in path order: index 0 is the
 *   primary image, 1 the secondary, and so on, and the caller composites them front to back.
 *
 * RADIOMETRY
 *   At a crossing the circular-orbit speed measured by a local static observer is
 *       v = sqrt(M / (r - r_s)),   beta = v * uOrbitalSpeed
 *   the relativistic Doppler factor of a photon propagating along the local tangent d is
 *       D = 1 / (gamma (1 - beta . t_hat)),   t_hat = prograde unit tangent,
 *   and the gravitational redshift is g = sqrt(1 - r_s/r). The observed-to-emitted frequency ratio
 *   is shift = g * D. For bolometric specific intensity I_obs = shift^4 * I_emit; because the
 *   emission is blackbody the same shift moves the colour temperature, so one factor carries both
 *       T_obs = T_emit * shift,   radiance = emission * blackbody(T_obs) * (T_obs / T_REF)^4.
 *
 * CROSSING WEIGHT
 *   An infinitely thin sheet would give an unbounded 1/|n.d| grazing boost. A real disk saturates,
 *   so the weight is the optical depth of the slab along the crossing, normalised to the reference
 *   face-on slab:
 *       tau    = KAPPA * h / max(|n.d|, MU_MIN)
 *       weight = (1 - exp(-tau)) / (1 - exp(-KAPPA * H_REF))
 *   weight -> 1 for the reference face-on slab, grows smoothly with h, and saturates near 2.4 for
 *   grazing rays instead of diverging. `alpha` separately turns tau into occlusion, which is what
 *   makes a near-side crossing hide a far-side one.
 *
 * The uniform names referenced below are declared by scene.glsl.js above this include.
 */
export const DISK_GLSL = /* glsl */ `
const vec3 DISK_NORMAL = vec3(0.0, 1.0, 0.0);
const float DISK_T_REF = 9500.0;   // temperature at which the disk surface brightness reaches unity
const float DISK_KAPPA = 6.0;      // slab extinction coefficient (per unit length, per unit h)
const float DISK_H_REF = 0.18;     // reference half-thickness that maps to weight 1
const float DISK_MU_MIN = 0.02;    // floor on |n.d|; bounds tau for exactly in-plane rays

struct DiskSample {
  vec3 source;   // surface brightness of the slab material at this point
  float shift;   // observed / emitted frequency ratio
  float weight;  // crossing weight, normalised so the reference face-on slab is 1
  float alpha;   // occlusion of this crossing, already scaled by the opacity control
};

// Shakura-Sunyaev thin-disk temperature profile normalised so its peak equals 1.
// T(r) ~ (r_in/r)^(3/4) * (1 - sqrt(r_in/r))^(1/4) peaks at r = (49/36) r_in with value 0.48787.
float diskTemperatureProfile(float r, float rInner) {
  float x = rInner / max(r, 1e-3);
  if (x >= 1.0) return 0.0;
  float inner = max(1.0 - sqrt(x), 0.0);
  return clamp(2.0497 * pow(x, 0.75) * pow(inner, 0.25), 0.0, 1.0);
}

// Vertical optical depth across the slab for a ray crossing at incidence cosine |n.d|.
float diskCrossingTau(float slabHalfThickness, float mu) {
  return DISK_KAPPA * slabHalfThickness / max(mu, DISK_MU_MIN);
}

float diskWeightFromTau(float tau) {
  return (1.0 - exp(-tau)) / (1.0 - exp(-DISK_KAPPA * DISK_H_REF));
}

/**
 * Procedural turbulence of the disk material.
 *
 * The noise is evaluated in a frame that co-rotates with the local Keplerian angular velocity
 * Omega(r) = speed * r^(-3/2). Rotating the sample point (rather than subtracting Omega*t from an
 * atan2 angle) produces the correct differential shear and avoids a seam at +/- pi.
 */
float diskTurbulence(vec3 position, float time, float speed, int octaves) {
  float r = length(position.xz);
  float omega = speed * pow(max(r, 0.35), -1.5);
  vec3 coRotating = rotationY(-omega * time) * position;
  vec3 q = coRotating * 0.85;
  float base = fbm3(q, octaves);
  float filaments = ridged3(q * 2.6 + vec3(5.0), max(octaves - 1, 1));
  return clamp(base * 0.68 + filaments * 0.52, 0.0, 1.6);
}

/**
 * Surface brightness, frequency shift and occlusion of the disk material at one point.
 * 'tau' is the slab optical depth along the crossing, from diskCrossingTau() for a mid-plane
 * crossing or from the per-step increment for the in-plane grazing case.
 */
DiskSample evaluateDisk(vec3 position, vec3 propagation, float r, float tau) {
  DiskSample result;

  float profile = diskTemperatureProfile(r, uDiskInner);
  float emitTemperature = uDiskTemperature * profile;

  // Circular-orbit speed measured by a local static observer, and the special-relativistic Doppler
  // factor of a photon leaving along 'propagation'.
  float speed = sqrt(BH_MASS / max(r - RS, 1e-3));
  float beta = clamp(speed * uOrbitalSpeed, 0.0, 0.999);
  float gamma = 1.0 / sqrt(max(1.0 - beta * beta, 1e-6));
  vec3 prograde = normalize(cross(DISK_NORMAL, position) + vec3(1e-9, 0.0, 0.0));
  float doppler = 1.0 / max(gamma * (1.0 - beta * dot(prograde, propagation)), 1e-3);
  float gravitational = sqrt(max(1.0 - RS / max(r, RS), 0.0));

  result.shift = gravitational * doppler;
  float observedTemperature = emitTemperature * result.shift;
  float brightness = pow(max(observedTemperature / DISK_T_REF, 0.0), 4.0);

  float turbulence = diskTurbulence(position, uTime, uTurbulenceSpeed, uTurbulenceOctaves);
  float modulation = mix(1.0, 0.35 + 1.30 * turbulence, uTurbulenceAmplitude);

  result.source = blackbodyLinear(observedTemperature) * (uDiskEmission * brightness * modulation);
  result.weight = diskWeightFromTau(tau);
  result.alpha = 1.0 - exp(-tau * uDiskOpacity * modulation);
  return result;
}

/** Distinct colour per image order, used by the crossing diagnostic. */
vec3 orderColour(int order) {
  if (order == 0) return vec3(1.00, 0.28, 0.24);
  if (order == 1) return vec3(0.30, 0.95, 0.40);
  if (order == 2) return vec3(0.35, 0.55, 1.00);
  if (order == 3) return vec3(1.00, 0.85, 0.25);
  if (order == 4) return vec3(1.00, 0.35, 0.95);
  if (order == 5) return vec3(0.30, 0.95, 0.95);
  if (order == 6) return vec3(0.85, 0.60, 0.30);
  return vec3(0.75, 0.75, 0.75);
}
`
