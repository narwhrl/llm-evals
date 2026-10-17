/*
 * GARGANTUA — Schwarzschild black hole fragment shader.
 *
 * Every pixel numerically integrates a null geodesic in the equatorial-plane
 * symmetry-reduced Schwarzschild geometry. Conventions (G = c = 1):
 *
 *   Metric:  ds^2 = -f dt^2 + f^-1 dr^2 + r^2(dtheta^2 + sin^2 theta dphi^2),
 *            f(r) = 1 - rs/r, Schwarzschild radius rs = 1.
 *
 *   Conserved quantities along a null ray: specific energy E, axial angular
 *   momentum Lz, and Carter constant Q (equivalently total L^2 = Lz^2 + Q).
 *
 *   Reduced first-order form actually integrated per step (state = [r, phi,
 *   theta, ur, zetap, zetaq] where zeta = p^phi = dphi/dlambda, i.e. the
 *   covariant azimuthal momentum = const; ur = dr/dlambda):
 *
 *     dr   = ur
 *     dphi = Lz / (r^2 sin^2 theta)              (zeta is conserved: dzeta = 0)
 *     dth  = zetaq / r^2                          (zetap unused -> folded)
 *
 * We avoid the singular sin(theta) bookkeeping by instead integrating the
 * *cartesian* second-order system obtained from the geodesic Lagrangian in
 * isotropic-friendly form: for a null geodesic with affine parameter lambda,
 *
 *     x''^i + Gamma^i_jk x'^j x'^k = 0
 *
 * is evaluated directly in spherical coordinates but marched with a cartesian
 * position/velocity pair kept in lockstep (positions are reconstructed each
 * step; see integrateRay). The per-step acceleration applied to the cartesian
 * direction vector d is the standard weak-field-consistent expression
 *
 *     a = -(3 rs h^2) / (2 r^5) * x      (per unit affine-lambda^2)
 *
 * where h^2 = |x x d|^2 is the conserved squared specific angular momentum of
 * the null ray (exact first integral of the spherical Schwarzschild problem,
 * so the numerically drifted h is re-evaluated each step). This integrates to
 * machine the same trajectories as the full Christoffel system (it is its
 * angular-momentum-first-integral reduction), keeps the integration state
 * explicit (position + direction + conserved scalars), supports clean
 * event-horizon termination (r <= rs), escape detection (r >= ESCAPE_R), and
 * ordered multi-pass accretion-disk crossings recorded while marching.
 *
 * Steps are adaptively shortened near the photon sphere (r ~ 1.5 rs) where
 * geodesics wind most tightly. MAX_STEPS and the sub-steps are compile-time
 * injected per quality level.
 */

precision highp float;

varying vec2 vUv;

// ---- compile-time quality knobs (injected) ----
#ifndef MAX_STEPS
#define MAX_STEPS 320
#endif
#ifndef DISK_SAMPLES
#define DISK_SAMPLES 4
#endif
#ifndef BLOOM_DEBUG
#define BLOOM_DEBUG 0
#endif

// ---- uniforms (all fed by the app every frame) ----
uniform vec2  uResolution;
uniform float uTime;            // simulation seconds (frozen in capture mode)
uniform float uFov;             // vertical field of view, degrees
uniform vec3  uCamPos;          // camera position, world units (rs = 1)
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamFwd;          // unit forward (toward lookAt target)

uniform float uDiskInner;       // inner disk radius (rs units)
uniform float uDiskOuter;       // outer disk radius
uniform float uDiskHalfHeight;  // half thickness
uniform float uDiskTemp;        // temperature multiplier
uniform float uDiskEmit;        // emission multiplier
uniform float uOrbitSpeed;      // orbital velocity multiplier
uniform float uTurbAmp;         // turbulence amplitude
uniform float uTurbSpeed;       // turbulence time rate
uniform float uStarDensity;     // procedural star density
uniform float uGalaxyBright;    // milky-way band brightness
uniform float uDispersion;      // chromatic ray-offset strength
uniform int   uDebugView;       // 0 composite, 1..9 diagnostics

const float RS = 1.0;             // Schwarzschild radius, scene units
const float PHOTON_R = 1.5 * RS;  // unstable photon orbit
const float ESCAPE_R = 90.0;      // rays beyond this are treated as escaped to the sky
const float PI = 3.14159265358979;

// ==========================================================================
// Small utilities
// ==========================================================================

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
vec3 hash33(vec3 p3) {
  p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yxz + 33.33);
  return fract((p3.xxy + p3.yxx) * p3.zyx);
}

// Smooth 3D value noise (one octave) + 3-octave fbm for disk turbulence.
float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash13(i + vec3(0,0,0)), hash13(i + vec3(1,0,0)), u.x),
        mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), u.x), u.y),
    mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), u.x),
        mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), u.x), u.y),
    u.z);
}
float fbm(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 3; i++) {
    s += a * vnoise(p);
    p = p * 2.17 + vec3(11.3, 7.1, 5.7);
    a *= 0.5;
  }
  return s;
}

// ==========================================================================
// Procedural sky: star field + milky way band, evaluated in a ray direction.
// Purely procedural — no textures, no cubemaps.
// ==========================================================================

vec3 starField(vec3 dir, float density) {
  // Cellular stars: jittered lattice on a direction-projected grid.
  vec3 col = vec3(0.0);
  float scale = 24.0;                       // lattice frequency over the sphere
  vec3 p = dir * scale;
  vec3 cell = floor(p);
    // visit the 3x3x3 neighborhood of the cell (stars may sit in adjacent cells)
  for (float i = -1.0; i <= 1.0; i += 1.0)
  for (float j = -1.0; j <= 1.0; j += 1.0)
  for (float k = -1.0; k <= 1.0; k += 1.0) {
    vec3 c = cell + vec3(i, j, k);
    vec3 rnd = hash33(c);
    // keep only a fraction of cells -> density control
    if (rnd.x > 0.085 * density) continue;
    vec3 starPos = normalize(c + 0.15 + 0.7 * rnd) ; // jitter inside cell
    float d = distance(dir, starPos);
    float m = pow(max(0.0, 1.0 - d * scale * 2.6), 38.0);
    float temp = hash13(c + 7.7);
    vec3 tint = mix(vec3(0.65, 0.75, 1.0), vec3(1.0, 0.85, 0.65), temp);
    float mag = 0.35 + 1.4 * pow(hash13(c + 3.1), 3.0);
    col += m * mag * tint;
  }
  return col;
}

vec3 galaxyBand(vec3 dir, float bright) {
  // Tilted galactic plane: band brightness falls off from a great circle.
  vec3 axis = normalize(vec3(0.32, 0.88, 0.34));
  float lat = abs(dot(dir, axis)) - 0.08;   // asymmetric band wobble
  float band = exp(-lat * lat * 9.0);
  // clumpy dust: two fbm layers, one darkening lane
  float cloud = fbm(dir * 3.0 + 13.1);
  float lane  = fbm(dir * 5.0 + vec3(4.2, 9.9, 1.3));
  float dust  = smoothstep(0.35, 0.8, cloud) * (0.55 + 0.45 * smoothstep(0.2, 0.9, lane));
  vec3 warm = vec3(0.95, 0.82, 0.66);
  vec3 cool = vec3(0.55, 0.68, 0.95);
  vec3 col  = mix(cool, warm, smoothstep(-0.4, 0.6, dot(dir, normalize(vec3(0.9,-0.2,0.2)))));
  return col * band * (0.35 + 1.9 * dust) * bright;
}

vec3 skyColor(vec3 dir) {
  vec3 c = starField(dir, uStarDensity) * 1.15 + galaxyBand(dir, uGalaxyBright) * 0.7;
  return c;
}

// ==========================================================================
// Black-body palette (approximate, temperature -> HDR RGB)
// ==========================================================================

vec3 blackbody(float t) {
  // t in normalized units ~ [0.4, 3.0]; maps to a plausible hot-disk palette.
  float x = clamp(t, 0.3, 4.0);
  vec3 c;
  c.r = 1.0 / (0.14 + 0.9 / x);                        // red saturates early
  c.g = pow(x / (x + 0.6), 1.1);
  c.b = pow(max(0.0, x - 0.55) / 2.6, 1.6);
  return c * 1.35;
}

// ==========================================================================
// Accretion disk emission at a crossing point.
//   p          : position of the crossing (world)
//   rayDirIn   : photon direction of travel at the crossing (unit-ish)
//   ord        : crossing order index (0 first/primary)
// Returns emitted HDR radiance already scaled by redshift/beaming.
// ==========================================================================

vec3 diskEmission(vec3 p, vec3 rayDirIn, int ord, out float gOut) {
  // cylindrical radius in the disk plane y=0:
  float rcyl = length(p.xz);
  float y = p.y;

  // Radial structure: brightness peaks just outside ISCO and falls off.
  float rNorm = clamp((rcyl - uDiskInner) / max(0.001, uDiskOuter - uDiskInner), 0.0, 1.0);
  float radialProf = pow(1.0 - rNorm, 1.35) * smoothstep(0.0, 0.06, rNorm + 0.02);
  // vertical gaussian falloff with slight turbulence-driven warp
  float turb = uTurbAmp * (fbm(vec3(rcyl * 1.4, y * 6.0, uTime * uTurbSpeed)) - 0.5);
  float yy = y - turb * rcyl * 0.35;
  float vert = exp(-yy * yy / max(1e-4, uDiskHalfHeight * uDiskHalfHeight));

  // Orbital (Keplerian-ish) velocity: v ~ 1/sqrt(r), direction tangential.
  vec3 tangent = normalize(vec3(-p.z, 0.0, p.x));
  float v = uOrbitSpeed * 0.55 / sqrt(max(rcyl, 1.05));
  v = clamp(v, 0.0, 0.9);
  // photons propagate along rayDirIn; emitting gas moves along tangent.
  float cosA = dot(-rayDirIn, tangent);
  float doppler = 1.0 / (1.0 - v * cosA) - 1.0;   // ~ beta*cos for small v
  // gravitational redshift from emission radius
  float grav = sqrt(max(0.0, 1.0 - RS / max(rcyl, RS * 1.01)));
  float g = clamp((1.0 + doppler) * grav, 0.05, 3.5);
  gOut = g;

  // Temperature decreases outward; Doppler-boosted side looks hotter/bluer.
  float temp = uDiskTemp * (0.55 + 1.9 * pow(1.0 - rNorm, 1.6)) * pow(g, 0.9);
  vec3 body = blackbody(temp);

  // Higher-order images are dimmer & slightly redder.
  float ordFade = (ord == 0) ? 1.0 : ((ord == 1) ? 0.55 : 0.22);

  // turbulence modulation of emissivity
  float emiss = 0.45 + 1.5 * clamp(fbm(p * 2.3 + vec3(0.0, uTime * uTurbSpeed * 1.7, 0.0)), 0.0, 1.0);

  float I = uDiskEmit * radialProf * vert * emiss * ordFade;
  // beaming: sharpen with a mild nonlinear power so the approaching side pops
  float beam = pow(clamp(1.0 + doppler, 0.1, 4.0), 2.2) * grav;
  return body * I * beam;
}

// ==========================================================================
// Core integrator. State marched explicitly:
//   pos : cartesian position (rs = 1)
//   dir : cartesian photon direction (affine-parameter rate), |dir| ~ const
//   h2  : conserved |pos x dir|^2 recomputed each step (angular momentum^2)
//   Step size adapts to radius (tighter near photon sphere), and crossings of
//   the disk slab are sub-stepped DISK_SAMPLES times for ordered composites.
// ==========================================================================

struct RayHit {
  vec3 color;        // accumulated HDR radiance
  float traveled;    // affine distance marched
  int   steps;       // steps used
  int   crossings;   // disk crossings found
  int   captured;    // 1 if fell below horizon
  float minR;        // closest approach (photon-ring diagnostic)
  float dopplerLast; // last crossing g factor
  vec3  escapeDir;   // final direction (for background-lens debug)
};

vec3 geodesicAccel(vec3 pos, vec3 dir) {
  float r2 = dot(pos, pos);
  vec3 h = cross(pos, dir);
  float h2 = dot(h, h);
  // null-geodesic bending acceleration (Schwarzschild, weak-field-exact):
  // a = -(3 rs h^2 / 2 r^5) pos
  return pos * (-1.5 * RS * h2 / (r2 * r2 * sqrt(r2) + 1e-9));
}

RayHit integrateRay(vec3 ro, vec3 rd) {
  RayHit hit;
  hit.color = vec3(0.0);
  hit.traveled = 0.0;
  hit.steps = 0;
  hit.crossings = 0;
  hit.captured = 0;
  hit.minR = 1e9;
  hit.dopplerLast = 1.0;
  hit.escapeDir = rd;

  vec3 pos = ro;
  vec3 dir = normalize(rd);
  float r = length(pos);
  float prevY = pos.y;
  float prevR = r;
  // ordered crossing composite (front-to-back along the photon path)
  vec3 acc = vec3(0.0);
  float transmittance = 1.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    r = length(pos);
    hit.minR = min(hit.minR, r);

    // --- event horizon termination: interior is radiance-free black ---
    if (r <= RS * 1.001) {
      hit.captured = 1;
      // anything collected before capture is also gravitationally trapped
      // (the photon did not return) — absorb it all for a truly dark core.
      acc *= 0.0;
      break;
    }
    // --- escape: ray has left the lensing region ---
    if (r >= ESCAPE_R) break;

    // adaptive step: smaller near the hole, larger far away
    float step = clamp(0.10 * (r - RS) + 0.012, 0.008, 0.35);
    // extra refinement inside the strong-deflection zone
    if (r < PHOTON_R * 1.7) step *= 0.5;

    // leapfrog (kick-drift-kick) keeps bending energy-stable over long arcs
    vec3 a1 = geodesicAccel(pos, dir);
    vec3 halfDir = dir + 0.5 * step * a1;
    vec3 newPos = pos + step * halfDir;
    vec3 a2 = geodesicAccel(newPos, halfDir);
    vec3 newDir = normalize(dir + 0.5 * step * (a1 + a2));

    // ---- disk slab crossing: y changes sign while inside the disk annulus --
    float newY = newPos.y;
    float rCyl0 = length(pos.xz);
    float rCyl1 = length(newPos.xz);
    bool inSlab = abs(prevY) < (uDiskHalfHeight * 4.0 + 0.6) ||
                  abs(newY)  < (uDiskHalfHeight * 4.0 + 0.6);
    if (inSlab && prevY * newY < 0.0 && hit.crossings < 4) {
      // sub-step locate the crossing and composite in path order
      for (int s = 1; s <= DISK_SAMPLES; s++) {
        float ft = float(s) / float(DISK_SAMPLES);
        vec3 sp = mix(pos, newPos, ft);
        if (prevY * sp.y >= 0.0) continue;
        float rc = length(sp.xz);
        if (rc < uDiskInner || rc > uDiskOuter) continue;
        float g;
        vec3 emit = diskEmission(sp, normalize(newDir), hit.crossings, g);
        hit.dopplerLast = g;
        // alpha-ish absorption so the disk can occlude what lies behind it
        float alpha = clamp(emit.r + emit.g + emit.b, 0.0, 1.0) * 0.85;
        acc += transmittance * emit;
        transmittance *= (1.0 - alpha);
        hit.crossings++;
        break;
      }
    }

    pos = newPos;
    dir = normalize(newDir);
    prevY = newY;
    prevR = r;
    hit.steps = i + 1;
    hit.traveled += step;

    if (transmittance < 0.02) break; // fully opaque stack
  }

  // escaped rays see the lensed procedural sky along their exit direction
  if (hit.captured == 0) {
    hit.escapeDir = dir;
    acc += transmittance * skyColor(dir);
  }

  hit.color = acc;
  return hit;
}

// ==========================================================================
// Camera ray construction — identical pinhole basis as the OrbitControls rig
// ==========================================================================

vec3 cameraRay(vec2 fragUv, float chromaShift) {
  vec2 ndc = (fragUv - 0.5) * 2.0;
  ndc.x *= uResolution.x / uResolution.y;
  float f = tan(radians(uFov) * 0.5);
  vec3 dir = normalize(uCamFwd + uCamRight * (ndc.x * f + chromaShift) + uCamUp * (ndc.y * f));
  return dir;
}

void main() {
  vec2 uv = vUv;

  // chromatic dispersion: sample R/B at slightly offset ray angles
  vec3 col;
  RayHit hitC;
  if (uDispersion > 0.0001 && uDebugView == 0) {
    float ca = uDispersion * 0.004;
    vec3 rdR = cameraRay(uv + vec2(ca, 0.0), 0.0);
    vec3 rdG = cameraRay(uv, 0.0);
    vec3 rdB = cameraRay(uv - vec2(ca, 0.0), 0.0);
    RayHit hR = integrateRay(uCamPos, rdR);
    RayHit hG = integrateRay(uCamPos, rdG);
    RayHit hB = integrateRay(uCamPos, rdB);
    col = vec3(hR.color.r, hG.color.g, hB.color.b);
    hitC = hG;
  } else {
    vec3 rd = cameraRay(uv, 0.0);
    hitC = integrateRay(uCamPos, rd);
    col = hitC.color;
  }

  // ---------------- debug views (pre-tonemap where meaningful) -----------
  if (uDebugView == 1) {          // steps / termination heat
    float s = float(hitC.steps) / float(MAX_STEPS);
    col = vec3(s, hitC.captured > 0 ? 1.0 : 0.0, 1.0 - s);
  } else if (uDebugView == 2) {   // event-horizon mask
    col = hitC.captured > 0 ? vec3(1.0, 0.15, 0.1) : vec3(0.02);
  } else if (uDebugView == 3) {   // disk crossings & order
    int n = hitC.crossings;
    col = n <= 0 ? vec3(0.05)
        : n == 1 ? vec3(1.0, 0.6, 0.1)
        : n == 2 ? vec3(0.1, 0.9, 1.0)
        : vec3(0.9, 0.2, 1.0);
  } else if (uDebugView == 4) {   // redshift/doppler at last crossing
    col = vec3(max(0.0, hitC.dopplerLast - 1.0) * 1.6,
               0.08,
               max(0.0, 1.0 - hitC.dopplerLast) * 1.6);
  } else if (uDebugView == 5) {   // lensed background direction
    col = hitC.escapeDir * 0.5 + 0.5;
  } else if (uDebugView == 6) {   // procedural stars only (lensed)
    col = (hitC.captured > 0) ? vec3(0.0) : starField(hitC.escapeDir, uStarDensity);
  } else if (uDebugView == 7) {   // galaxy band only (lensed)
    col = (hitC.captured > 0) ? vec3(0.0) : galaxyBand(hitC.escapeDir, uGalaxyBright);
  } else if (uDebugView == 8) {   // raw HDR radiance, log-mapped
    col = log(1.0 + hitC.color) * 0.35;
  } else if (uDebugView == 9) {   // closest-approach / photon-ring diagnostic
    float t = clamp((hitC.minR - RS) / (PHOTON_R - RS), 0.0, 1.0);
    col = hitC.captured > 0 ? vec3(0.0) : mix(vec3(1.0,0.8,0.2), vec3(0.05,0.15,0.5), t);
  }

  // Output is LINEAR (HDR for the composite view, display-encoded diagnostics
  // for debug views). Exposure + ACES + vignette + grain are applied by the
  // grade pass after bloom; sRGB encoding is the OutputPass's job.
  // Guard against NaN/Inf: a single bad pixel would otherwise poison the
  // bloom chain and black out the whole frame.
  col = clamp(col, vec3(0.0), vec3(6.0e4));
  if (any(isnan(col)) || any(isinf(col))) col = vec3(0.0);
  gl_FragColor = vec4(col, 1.0);
}
