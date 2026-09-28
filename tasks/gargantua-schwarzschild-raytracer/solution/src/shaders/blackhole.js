import { HASH_NOISE, BLACKBODY } from './common.js';

// Per-pixel Schwarzschild null-geodesic raytracer.
//
// Coordinates: Schwarzschild (t, r, θ, φ) with G = c = M = 1 (r_s = 2),
// embedded as x = r·n̂ in the Three.js world frame (y is the disk axis).
// A null geodesic stays in the plane spanned by x and its direction, and its
// orbit obeys the Binet equation  d²u/dφ² + u = 3u²  (u = 1/r). The same
// orbit is produced exactly by the planar ODE
//     d²x/dλ² = −3·h²·x / r⁵,   h = |x × dx/dλ|  (conserved),
// since a central acceleration −3h²u⁴ gives u'' + u = 3u² through the
// classical Binet relation u'' + u = −a_r / (h² u²).
// which is what traceRay() integrates with RK4. λ is a curve parameter, so
// only the orbit shape is used; frequency shifts come from the conserved
// impact parameter b = L/E computed at the camera.
//
// Termination: r < 2·(1 + ε) → event horizon (u grows monotonically once
// u > 1/2, so the ray can never return); r > uEscapeR moving outward →
// escaped to the celestial sphere with an analytic weak-field correction
// for the remaining bend; step budget exhausted → treated as captured.
export const BLACKHOLE_FRAG = /* glsl */ `
precision highp float;
precision highp int;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform vec3 uCamPos;
uniform mat3 uCamBasis;
uniform float uTanHalfFov;
uniform float uAspect;
uniform float uTime;
uniform float uEscapeR;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskH;
uniform float uDiskTemp;
uniform float uDiskIntensity;
uniform float uOrbitalSpeed;
uniform float uTurb;
uniform float uTurbSpeed;
uniform float uStarDensity;
uniform float uGalaxy;
uniform int uMaxSteps;
uniform int uMaxCrossings;
uniform float uStepScale;
uniform int uDebug;

const float PI = 3.14159265359;
const float HORIZON_R = 2.0 * 1.005;

${HASH_NOISE}
${BLACKBODY}

// ---------- Geodesic state ------------------------------------------------

vec3 geodesicAccel(vec3 x, float h2) {
  float r2 = dot(x, x);
  float r5 = r2 * r2 * sqrt(r2);
  return -3.0 * h2 * x / r5;
}

void rk4Step(inout vec3 x, inout vec3 v, float h2, float dl) {
  vec3 k1x = v;
  vec3 k1v = geodesicAccel(x, h2);
  vec3 k2x = v + 0.5 * dl * k1v;
  vec3 k2v = geodesicAccel(x + 0.5 * dl * k1x, h2);
  vec3 k3x = v + 0.5 * dl * k2v;
  vec3 k3v = geodesicAccel(x + 0.5 * dl * k2x, h2);
  vec3 k4x = v + dl * k3v;
  vec3 k4v = geodesicAccel(x + dl * k3x, h2);
  x += dl / 6.0 * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
  v += dl / 6.0 * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
}

// Static observer at the camera: a locally measured direction with angle α
// from the outward radial has coordinate slope dr/(r dφ) = sqrt(1 − 2/r)·cot α,
// so the radial part is scaled by sqrt(1 − 2/r). Returns b = L/E as well.
vec3 localToCoordinateDir(vec3 pos, vec3 localDir, out float impactB) {
  float r0 = length(pos);
  vec3 rh = pos / r0;
  float lapse = sqrt(max(1.0 - 2.0 / r0, 1e-4));
  float radial = dot(localDir, rh);
  vec3 tangential = localDir - radial * rh;
  impactB = r0 * length(tangential) / lapse;
  return normalize(tangential + radial * lapse * rh);
}

// Weak-field bend still owed beyond the escape radius: 2·tan(χ/2)/R toward
// the hole, χ being the angle between position and direction.
vec3 asymptoticDirection(vec3 x, vec3 v) {
  float R = length(x);
  vec3 d = normalize(v);
  vec3 xh = x / R;
  float c = clamp(dot(xh, d), -1.0, 1.0);
  vec3 perp = xh - c * d;
  float pl = length(perp);
  if (pl < 1e-6) return d;
  float halfChi = 0.5 * acos(c);
  return normalize(d - 2.0 * tan(halfChi) / R * perp / pl);
}

// ---------- Procedural sky ------------------------------------------------

// Stars are points on the celestial sphere hashed from a 3D grid. w is the
// sky-space footprint of the pixel (from derivatives of the lensed
// direction), so lensing stretches and magnifies stars near the photon ring.
vec3 starLayer(vec3 d, float scale, float prob, float fluxScale, float w) {
  vec3 cell = floor(d * scale);
  uint h = hash3u(uvec3(ivec3(cell) + 65536));
  if (u2f(h) > prob) return vec3(0.0);
  vec3 jitter = vec3(u2f(pcg(h + 1u)), u2f(pcg(h + 2u)), u2f(pcg(h + 3u)));
  vec3 starDir = normalize(cell + 0.2 + 0.6 * jitter);
  float dist = length(d - starDir);
  float mag = u2f(pcg(h + 4u));
  float flux = fluxScale * (0.25 + 5.0 * pow(mag, 14.0));
  float temp = mix(3000.0, 15000.0, pow(u2f(pcg(h + 5u)), 1.6));
  float core = exp(-0.5 * dist * dist / (w * w));
  return blackbody(temp) * flux * core * min(1.0, 0.004 / w);
}

vec3 galaxy(vec3 d) {
  vec3 n = normalize(vec3(0.42, 0.9, 0.12));
  float lat = dot(d, n);
  vec3 bulgeDir = normalize(vec3(-0.35, 0.16, -1.0) - dot(vec3(-0.35, 0.16, -1.0), n) * n);
  float bulgeAng = acos(clamp(dot(d, bulgeDir), -1.0, 1.0));
  float clouds = fbm(d * 5.0 + vec3(3.1, 0.0, 1.7));
  float width = 0.11 + 0.07 * clouds;
  float band = exp(-lat * lat / (width * width));
  float dust = smoothstep(0.42, 0.72, fbm(d * 11.0 + vec3(7.0, 2.0, 5.0)));
  float lane = exp(-lat * lat / (0.025 * 0.025 + 0.02 * dust));
  float bulge = exp(-bulgeAng * bulgeAng / 0.09);
  float glow = band * (0.35 + 0.9 * clouds) * (1.0 - 0.75 * lane * dust) + 1.6 * bulge * (1.0 - 0.5 * lane);
  vec3 warm = vec3(1.0, 0.78, 0.55);
  vec3 cool = vec3(0.55, 0.65, 1.0);
  vec3 col = mix(cool, warm, clamp(0.4 + bulge + 0.4 * clouds, 0.0, 1.0));
  return col * glow * 0.07;
}

vec3 skyRadiance(vec3 d, float footprint) {
  float w = clamp(footprint * 0.6, 0.00045, 0.02);
  float dens = uStarDensity;
  vec3 stars = starLayer(d, 40.0, 0.12 * dens, 1.6, w)
             + starLayer(d, 110.0, 0.14 * dens, 0.6, w)
             + starLayer(d, 260.0, 0.12 * dens, 0.25, w);
  return stars + galaxy(d) * uGalaxy;
}

// ---------- Accretion disk ------------------------------------------------

// Novikov–Thorne-like profile T ∝ r^{-3/4}(1 − sqrt(r_in/r))^{1/4},
// normalised so its peak equals uDiskTemp.
float diskTemperature(float r) {
  float x = max(r / uDiskInner, 1.0001);
  float f = pow(x, -0.75) * pow(1.0 - inversesqrt(x), 0.25);
  return uDiskTemp * f / 0.48788;
}

float diskAngularVelocity(float r) {
  float omega = uOrbitalSpeed * pow(r, -1.5);
  float limit = 0.98 * sqrt(max(1.0 - 2.0 / r, 0.0)) / r;
  return min(omega, limit);
}

// Two advected noise layers cross-faded over a period so differential
// rotation shears the pattern without winding it up forever.
float diskTurbulence(vec3 xc, float r) {
  float t = uTime * uTurbSpeed;
  float period = 18.0;
  float ph = fract(t / period);
  float t1 = ph * period;
  float t2 = fract(ph + 0.5) * period;
  float w = abs(2.0 * ph - 1.0);
  float rate = 5.0 * diskAngularVelocity(r);
  float ang = atan(xc.z, xc.x);
  float boil = t * 0.06;
  float a1 = ang + rate * t1;
  float a2 = ang + rate * t2 + 1.7;
  float n1 = fbm(vec3(cos(a1) * 2.4, sin(a1) * 2.4, r * 0.9 + boil));
  float n2 = fbm(vec3(cos(a2) * 2.4, sin(a2) * 2.4, r * 0.9 + boil + 9.0));
  float n = mix(n1, n2, w);
  float streak = 0.5 + 0.5 * sin(r * 7.0 + n * 9.0);
  return clamp(n * 0.8 + streak * 0.35, 0.0, 1.3);
}

// Redshift g = ν_obs/ν_emit for a static observer at the camera and an
// emitter on a circular equatorial orbit: g = 1/(lapse_cam · u^t · (1 − Ω ℓ)),
// ℓ = L_axis/E of the photon.
float diskRedshift(float r, float ell, float camLapse) {
  float omega = diskAngularVelocity(r);
  float ut = inversesqrt(max(1.0 - 2.0 / r - r * r * omega * omega, 1e-4));
  return 1.0 / (camLapse * ut * max(1.0 - omega * ell, 0.05));
}

struct DiskSample {
  vec3 radiance;
  float tau;
  float g;
  float tObs;
};

DiskSample shadeDisk(vec3 xc, vec3 dir, float ell, float camLapse) {
  DiskSample s;
  float r = length(xc);
  float edge = smoothstep(uDiskInner, uDiskInner + 0.7, r) * (1.0 - smoothstep(uDiskOuter - 0.35 * (uDiskOuter - uDiskInner), uDiskOuter, r));
  float turb = diskTurbulence(xc, r);
  float structure = max(0.0, 1.0 + uTurb * (2.0 * turb - 1.1));
  float column = uDiskH / max(abs(dir.y), 0.025);
  s.tau = 7.0 * column * edge * mix(1.0, 0.35 + 0.9 * turb, uTurb);
  float temp = diskTemperature(r);
  s.g = diskRedshift(r, ell, camLapse);
  s.tObs = s.g * temp;
  float thermal = pow(temp / uDiskTemp, 4.0);
  s.radiance = blackbody(s.tObs) * uDiskIntensity * pow(s.g, 4.0) * thermal * structure;
  return s;
}

// ---------- Debug palettes -------------------------------------------------

vec3 turbo(float t) {
  t = clamp(t, 0.0, 1.0);
  const vec4 kr = vec4(0.13572138, 4.61539260, -42.66032258, 132.13108234);
  const vec4 kg = vec4(0.09140261, 2.19418839, 4.84296658, -14.18503333);
  const vec4 kb = vec4(0.10667330, 12.64194608, -60.58204836, 110.36276771);
  const vec2 kr2 = vec2(-152.94239396, 59.28637943);
  const vec2 kg2 = vec2(4.27729857, 2.82956604);
  const vec2 kb2 = vec2(-89.90310912, 27.34824973);
  vec4 v4 = vec4(1.0, t, t * t, t * t * t);
  vec2 v2 = v4.zw * v4.z;
  return vec3(dot(v4, kr) + dot(v2, kr2), dot(v4, kg) + dot(v2, kg2), dot(v4, kb) + dot(v2, kb2));
}

vec3 displayApprox(vec3 hdr) {
  return pow(hdr / (1.0 + hdr), vec3(1.0 / 2.2));
}

// ---------- Ray integration ------------------------------------------------

const int TERM_HORIZON = 0;
const int TERM_ESCAPE = 1;
const int TERM_EXHAUSTED = 2;

struct TraceResult {
  vec3 disk;       // radiance collected from disk crossings, in path order
  float trans;     // transmittance left after all crossings
  vec3 skyDir;     // asymptotic direction on the celestial sphere
  int term;
  int steps;
  float minR;
  int firstOrder;  // equatorial-plane crossing index of the first disk hit
  float firstAlpha;
  float firstG;
  float firstTObs;
};

// Adaptive step in λ: proportional to r far away, shrinking toward the
// photon sphere and horizon where curvature is strongest.
float stepLength(float r) {
  float near = clamp((r - 2.0) * 0.6, 0.25, 1.0);
  return uStepScale * max(0.1 * r * near, 0.015);
}

TraceResult traceRay(vec3 camPos, vec3 localDir, bool fullPath) {
  TraceResult res;
  res.disk = vec3(0.0);
  res.trans = 1.0;
  res.skyDir = localDir;
  res.term = TERM_EXHAUSTED;
  res.steps = 0;
  res.firstOrder = 0;
  res.firstAlpha = 0.0;
  res.firstG = 1.0;
  res.firstTObs = 0.0;

  float b;
  vec3 x = camPos;
  vec3 v = localToCoordinateDir(camPos, localDir, b);
  float r = length(x);
  res.minR = r;
  float camLapse = sqrt(max(1.0 - 2.0 / r, 1e-4));
  vec3 lHat = cross(x, v);
  float h2 = dot(lHat, lHat);
  // Photon axial angular momentum per energy, ℓ = L_y/E. Tracing runs
  // backward in time, so the physical momentum is −v.
  float ell = h2 > 1e-12 ? -b * lHat.y * inversesqrt(h2) : 0.0;

  int planeCrossings = 0;
  int diskHits = 0;
  for (int i = 0; i < 1024; i++) {
    if (i >= uMaxSteps) break;
    res.steps = i + 1;
    vec3 xPrev = x;
    rk4Step(x, v, h2, stepLength(r) / length(v));
    r = length(x);
    res.minR = min(res.minR, r);

    if (xPrev.y * x.y < 0.0) {
      planeCrossings++;
      float t = xPrev.y / (xPrev.y - x.y);
      vec3 xc = mix(xPrev, x, t);
      float rc = length(xc);
      if (rc > uDiskInner && rc < uDiskOuter && diskHits < uMaxCrossings) {
        diskHits++;
        DiskSample s = shadeDisk(xc, normalize(v), ell, camLapse);
        float alpha = 1.0 - exp(-s.tau);
        res.disk += res.trans * alpha * s.radiance;
        if (res.firstOrder == 0 && alpha > 0.02) {
          res.firstOrder = planeCrossings;
          res.firstAlpha = alpha;
          res.firstG = s.g;
          res.firstTObs = s.tObs;
        }
        res.trans *= 1.0 - alpha;
      }
    }

    if (r < HORIZON_R) { res.term = TERM_HORIZON; break; }
    if (r > uEscapeR && dot(x, v) > 0.0) {
      res.term = TERM_ESCAPE;
      res.skyDir = asymptoticDirection(x, v);
      break;
    }
    if (!fullPath && res.trans < 0.004) break;
  }
  return res;
}

// ---------- Debug views ------------------------------------------------------

vec3 lensGrid(vec3 d) {
  float lon = atan(d.z, d.x) / PI;
  float lat = asin(clamp(d.y, -1.0, 1.0)) / (0.5 * PI);
  vec2 g = vec2(lon * 12.0, lat * 6.0);
  vec2 f = abs(fract(g) - 0.5);
  vec2 w = vec2(0.06, 0.06);
  float gl = max(smoothstep(0.5 - w.x, 0.5, f.x), smoothstep(0.5 - w.y, 0.5, f.y));
  vec3 base = vec3(0.5 + 0.5 * cos(PI * lon), 0.5 + 0.5 * lat, 0.5 - 0.5 * cos(PI * lon)) * 0.55;
  return mix(base, vec3(1.0), gl);
}

vec3 debugColor(TraceResult tr, vec3 hdr, float footprint) {
  bool hitDisk = tr.firstOrder > 0;
  if (uDebug == 1) {
    return turbo(float(tr.steps) / float(uMaxSteps));
  }
  if (uDebug == 2) {
    if (tr.term == TERM_HORIZON) return vec3(0.0);
    if (tr.term == TERM_ESCAPE) return vec3(0.1, 0.35, 1.0) * (0.35 + 0.65 * clamp(3.0 / tr.minR, 0.0, 1.0));
    return vec3(1.0, 0.0, 0.9);
  }
  if (uDebug == 3) {
    if (tr.term != TERM_ESCAPE) return vec3(1.0);
    return turbo(clamp((tr.minR - 3.0) / 20.0, 0.0, 1.0)) * 0.45;
  }
  if (uDebug == 4) {
    if (!hitDisk) return tr.term == TERM_ESCAPE ? vec3(0.04) : vec3(0.0);
    vec3 c = tr.firstOrder == 1 ? vec3(1.0, 0.55, 0.1) : (tr.firstOrder == 2 ? vec3(0.2, 1.0, 0.35) : vec3(0.1, 0.9, 1.0));
    return c * (0.35 + 0.65 * tr.firstAlpha);
  }
  if (uDebug == 5) {
    if (!hitDisk) return vec3(0.0);
    float g = tr.firstG;
    vec3 c = g < 1.0 ? mix(vec3(1.0), vec3(1.0, 0.1, 0.05), clamp((1.0 - g) * 2.2, 0.0, 1.0))
                     : mix(vec3(1.0), vec3(0.1, 0.35, 1.0), clamp((g - 1.0) * 2.2, 0.0, 1.0));
    return c * (0.3 + 0.7 * tr.firstAlpha);
  }
  if (uDebug == 6) {
    return tr.term == TERM_ESCAPE ? lensGrid(tr.skyDir) : vec3(0.0);
  }
  if (uDebug == 7) {
    return tr.term == TERM_ESCAPE ? displayApprox(skyRadiance(tr.skyDir, footprint) * 2.0) : vec3(0.0);
  }
  if (uDebug == 8) {
    if (!hitDisk) return vec3(0.0);
    return turbo(clamp((tr.firstTObs - 1500.0) / 18000.0, 0.0, 1.0)) * (0.3 + 0.7 * tr.firstAlpha);
  }
  float lum = dot(hdr, vec3(0.2126, 0.7152, 0.0722));
  if (lum <= 1e-6) return vec3(0.0);
  float ev = log2(lum);
  float band = smoothstep(0.0, 0.08, fract(ev)) * 0.25 + 0.75;
  return turbo(clamp((ev + 10.0) / 14.0, 0.0, 1.0)) * band;
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 camRay = normalize(vec3(ndc.x * uTanHalfFov * uAspect, ndc.y * uTanHalfFov, -1.0));
  vec3 localDir = normalize(uCamBasis * camRay);
  bool fullPath = uDebug == 1 || uDebug == 2 || uDebug == 3 || uDebug == 6 || uDebug == 7;
  TraceResult tr = traceRay(uCamPos, localDir, fullPath);

  // Derivatives are taken in uniform control flow, outside any branch.
  float footprint = length(fwidth(tr.skyDir));

  vec3 hdr = tr.disk;
  if (tr.term == TERM_ESCAPE) hdr += tr.trans * skyRadiance(tr.skyDir, footprint);

  if (uDebug == 0) {
    fragColor = vec4(hdr, 1.0);
  } else {
    fragColor = vec4(debugColor(tr, hdr, footprint), 1.0);
  }
}
`;
