// =============================================================================
// GARGANTUA — per-pixel Schwarzschild null-geodesic raytracer (GLSL ES 3.00)
//
// Units: G = c = M = 1. Event horizon r_s = 2M, photon sphere r = 3M,
// critical impact parameter b_c = 3√3 M.
//
// Coordinates and state
//   Spherical symmetry keeps every photon in the plane through the hole spanned
//   by the camera position and the initial ray. With the orthonormal plane
//   basis e1 = camera radial direction, e2 = in-plane tangential direction,
//   the orbit is r(φ), carried as the Binet variables
//       u = 1/r,  w = du/dφ,
//   and the world-space point on the orbit is x(φ) = (cos φ e1 + sin φ e2) / u.
//
// Equation of motion (exact Schwarzschild null-geodesic orbit equation)
//       d²u/dφ² = 3 M u² − u,     first integral  w² = 1/b² − u² (1 − 2 M u),
//   integrated with classical RK4 in φ. The step is adaptive,
//       Δφ = min(Δφ_max, k · u / |w|)
//   (at most Δφ_max of orbit angle and ≈k relative change of r per step), and
//   it is shortened to land exactly on each equatorial-plane node (the analytic
//   φ where x(φ).y = 0), so disk crossings are exact points of the integrated
//   path. Δφ_max, k and the step budget come from the quality tier.
//
// Initial conditions: static observer at the camera radius r0. A local ray at
//   angle α from the outward radial direction has
//       b  = r0 sin α / √(1 − 2M/r0),
//       w0 = −√(1 − 2M/r0) cos α / (r0 sin α).
//
// Termination
//   CAPTURED  u ≥ 1/(2M): crossed the event horizon, contributes no light.
//   ESCAPED   u ≤ u_esc and w < 0: outgoing beyond r_esc; the sky is sampled
//             along the straight-line asymptote φ∞ = φ + atan(u, −w).
//   ABSORBED  transmittance < 1e-3 inside the accretion disk.
//   BUDGET    the quality tier's step budget ran out (near-critical orbits).
//
// Accretion disk: slab |y| ≤ H between r_in and r_out. Every chord of the
// integrated path is clipped to the slab and sampled front-to-back (emission +
// absorption), so primary, secondary and higher-order crossings composite in
// path order. Emission uses the redshift factor
//       g = √(1 − 2M/r) / (γ (1 − Ω λ)) / √(1 − 2M/r0),   λ = L_z / E,
// (gravitational redshift + Doppler for gas on circular orbits, observed by the
// static camera), blackbody colour at g·T(r) and bolometric beaming ∝ g⁴.
// =============================================================================

precision highp float;
precision highp int;

in vec2 vUv;
layout(location = 0) out vec4 fragColor;

uniform vec2 uResolution;
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;
uniform float uAspect;
uniform float uPixelAngle;
uniform float uEscapeU;

uniform int uMaxSteps;
uniform float uMaxDphi;
uniform float uRelStep;
uniform int uDiskSamples;
uniform int uNoiseOctaves;

uniform float uOrbitPhase;
uniform float uTurbPhase;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfThickness;
uniform float uDiskTemperature;
uniform float uDiskIntensity;
uniform float uOrbitSpeed;
uniform float uTurbulenceAmp;
uniform float uStarDensity;
uniform float uGalaxyBrightness;

uniform int uDebugMode;

const float PI = 3.141592653589793;
const float TAU = 6.283185307179586;
const float U_HORIZON = 0.5;
const float B_CRIT = 5.196152422706632;
const int MAX_STEP_CAP = 640;
const int MAX_DISK_SAMPLE_CAP = 10;

const int TERM_ESCAPED = 0;
const int TERM_CAPTURED = 1;
const int TERM_ABSORBED = 2;
const int TERM_BUDGET = 3;

// Vertical optical depth of the disk at unit surface density; tuned so the
// inner disk is optically thick while the outer disk lets lensed stars through.
const float DISK_OPACITY = 2.4;
const float DISK_EMISSION_SCALE = 1.35;
// Flow-map cycle (in M) for the turbulence advection; see diskTurbulence().
const float FLOW_PERIOD = 60.0;

const vec3 GALAXY_NORMAL = vec3(0.8191520, 0.5735764, 0.0);
const vec3 GALAXY_CENTER = vec3(0.1675, -0.2392, -0.9564);

// ---------------------------------------------------------------------------
// Hashing and noise (integer PCG hash, no textures)
// ---------------------------------------------------------------------------

uint pcg(uint v) {
  uint state = v * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

float hash3(ivec3 c) {
  uint h = pcg(uint(c.x) * 1597334677u ^ uint(c.y) * 3812015801u ^ uint(c.z) * 2798796415u);
  return float(h) * (1.0 / 4294967296.0);
}

float valueNoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = p - i;
  vec3 s = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  ivec3 c = ivec3(i);
  float n000 = hash3(c);
  float n100 = hash3(c + ivec3(1, 0, 0));
  float n010 = hash3(c + ivec3(0, 1, 0));
  float n110 = hash3(c + ivec3(1, 1, 0));
  float n001 = hash3(c + ivec3(0, 0, 1));
  float n101 = hash3(c + ivec3(1, 0, 1));
  float n011 = hash3(c + ivec3(0, 1, 1));
  float n111 = hash3(c + ivec3(1, 1, 1));
  return mix(
    mix(mix(n000, n100, s.x), mix(n010, n110, s.x), s.y),
    mix(mix(n001, n101, s.x), mix(n011, n111, s.x), s.y),
    s.z
  );
}

const mat3 OCTAVE_ROTATION = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);

float fbm(vec3 p, int octaves) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 8; ++i) {
    if (i >= octaves) break;
    sum += amp * valueNoise(p);
    norm += amp;
    p = OCTAVE_ROTATION * p * 2.03 + vec3(17.1, 5.3, 11.7);
    amp *= 0.5;
  }
  return sum / norm;
}

// fBm whose octaves fade out once their period falls below the pixel footprint.
float fbmFiltered(vec3 p, int octaves, float footprint) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  float freq = 1.0;
  for (int i = 0; i < 8; ++i) {
    if (i >= octaves) break;
    float keep = 1.0 - smoothstep(0.25, 0.75, freq * footprint);
    sum += amp * mix(0.5, valueNoise(p), keep);
    norm += amp;
    p = OCTAVE_ROTATION * p * 2.03 + vec3(17.1, 5.3, 11.7);
    freq *= 2.03;
    amp *= 0.5;
  }
  return sum / norm;
}

float interleavedGradientNoise(vec2 pixel) {
  return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
}

// ---------------------------------------------------------------------------
// Colour
// ---------------------------------------------------------------------------

// Planckian-locus chromaticity (Kim et al. 2002 cubic fit, 1667–25000 K)
// converted to linear sRGB and normalised to unit luminance.
vec3 blackbodyColor(float kelvin) {
  float t = clamp(kelvin, 1667.0, 25000.0);
  float it = 1000.0 / t;
  float it2 = it * it;
  float it3 = it2 * it;
  float x = t <= 4000.0
    ? -0.2661239 * it3 - 0.2343589 * it2 + 0.8776956 * it + 0.179910
    : -3.0258469 * it3 + 2.1070379 * it2 + 0.2226347 * it + 0.240390;
  float x2 = x * x;
  float x3 = x2 * x;
  float y = t <= 2222.0
    ? -1.1063814 * x3 - 1.34811020 * x2 + 2.18555832 * x - 0.20219683
    : t <= 4000.0
      ? -0.9549476 * x3 - 1.37418593 * x2 + 2.09137015 * x - 0.16748867
      : 3.0817580 * x3 - 5.87338670 * x2 + 3.75112997 * x - 0.37001483;
  vec3 xyz = vec3(x / y, 1.0, (1.0 - x - y) / y);
  vec3 rgb = mat3(
    3.2404542, -0.9692660, 0.0556434,
    -1.5371385, 1.8760108, -0.2040259,
    -0.4985314, 0.0415560, 1.0572252
  ) * xyz;
  rgb = max(rgb, vec3(0.0));
  rgb /= max(dot(rgb, vec3(0.2126, 0.7152, 0.0722)), 1e-4);
  if (kelvin < 1667.0) {
    // Below the fit's range the spectrum keeps reddening toward deep red.
    float k = clamp((kelvin - 800.0) / 867.0, 0.0, 1.0);
    rgb = mix(vec3(2.6, 0.55, 0.0), rgb, k);
  }
  return rgb;
}

// Polynomial fit of Google's Turbo colormap (display-referred output).
vec3 turbo(float x) {
  x = clamp(x, 0.0, 1.0);
  const vec4 kRed4 = vec4(0.13572138, 4.61539260, -42.66032258, 132.13108234);
  const vec4 kGreen4 = vec4(0.09140261, 2.19418839, 4.84296658, -14.18503333);
  const vec4 kBlue4 = vec4(0.10667330, 12.64194608, -60.58204836, 110.36276771);
  const vec2 kRed2 = vec2(-152.94239396, 59.28637943);
  const vec2 kGreen2 = vec2(4.27729857, 2.82956604);
  const vec2 kBlue2 = vec2(-89.90310912, 27.34824973);
  vec4 v4 = vec4(1.0, x, x * x, x * x * x);
  vec2 v2 = v4.zw * v4.z;
  return clamp(vec3(
    dot(v4, kRed4) + dot(v2, kRed2),
    dot(v4, kGreen4) + dot(v2, kGreen2),
    dot(v4, kBlue4) + dot(v2, kBlue2)
  ), 0.0, 1.0);
}

float isoLine(float value, float width) {
  float d = abs(fract(value + 0.5) - 0.5);
  return 1.0 - smoothstep(0.0, max(width, 1e-4) * 1.2, d);
}

// ---------------------------------------------------------------------------
// Accretion disk physics
// ---------------------------------------------------------------------------

// Local orbital speed of the gas measured by a static observer:
// Keplerian circular orbit v = √(M/(r − 2M)), scaled and kept below c.
float diskLocalSpeed(float r) {
  return min(uOrbitSpeed * inversesqrt(max(r - 2.0, 1e-3)), 0.985);
}

// Frequency ratio g = ν_obs / ν_emit for gas on a circular orbit at radius r
// seen by the static camera: gravitational redshift (lapse), transverse Doppler
// (γ) and line-of-sight Doppler through the photon's conserved λ = L_z / E.
float redshiftFactor(float r, float lambda, float cameraLapse) {
  float v = diskLocalSpeed(r);
  float lapse = sqrt(max(1.0 - 2.0 / r, 1e-4));
  float omega = v * lapse / r;
  float gamma = inversesqrt(1.0 - v * v);
  float g = lapse / (gamma * max(1.0 - omega * lambda, 1e-3)) / cameraLapse;
  return clamp(g, 0.02, 8.0);
}

// Novikov–Thorne-like thin-disk temperature, normalised to 1 at its peak
// r = (49/36) r_in: T ∝ r^(−3/4) (1 − √(r_in/r))^(1/4).
float temperatureProfile(float r) {
  float x = max(1.0 - sqrt(uDiskInner / max(r, uDiskInner)), 0.0);
  return pow(r / (1.3611111 * uDiskInner), -0.75) * pow(7.0 * x, 0.25);
}

float turbulenceLayer(float logR, float theta, float seed) {
  vec3 q = vec3(logR * 6.5 + seed * 1.93 + uTurbPhase * 0.2, cos(theta) * 2.2, sin(theta) * 2.2 + seed * 3.7);
  float clouds = fbm(q, uNoiseOctaves);
  vec3 f = q * vec3(2.7, 1.1, 1.1) + vec3(uTurbPhase * 0.37, 11.0, -4.0);
  float filaments = fbm(f, max(uNoiseOctaves - 1, 1));
  return clamp(0.6 * clouds + 0.4 * filaments, 0.0, 1.0);
}

// Disk-gas turbulence: two flow-map layers advected at the Keplerian angular
// velocity and cross-faded every FLOW_PERIOD, so differential rotation shears
// the pattern into orbiting streaks without winding it up indefinitely.
// uOrbitPhase accumulates simulated time × orbital-speed multiplier and
// uTurbPhase accumulates simulated time × turbulence speed (inflow + reseeding).
float diskTurbulence(vec3 p, float r) {
  float logR = log(r);
  // The gas moves along Ω ŷ × x, i.e. atan(z, x) decreases with time.
  float theta = atan(p.z, p.x);
  float omegaK = inversesqrt(r * r * r);
  float cycle = uOrbitPhase / FLOW_PERIOD;
  float phaseA = fract(cycle);
  float phaseB = fract(cycle + 0.5);
  float weightA = 1.0 - abs(2.0 * phaseA - 1.0);
  float a = turbulenceLayer(logR, theta + omegaK * phaseA * FLOW_PERIOD, floor(cycle));
  float b = turbulenceLayer(logR, theta + omegaK * phaseB * FLOW_PERIOD, floor(cycle + 0.5) + 0.5);
  return mix(b, a, weightA);
}

struct DiskSample {
  float opacity;
  vec3 emission;
  float g;
  float observedTemperature;
  float turbulence;
};

DiskSample sampleDisk(vec3 p, float r, float lambda, float cameraLapse) {
  DiskSample smp;
  smp.opacity = 0.0;
  smp.emission = vec3(0.0);
  smp.g = 0.0;
  smp.observedTemperature = 0.0;
  smp.turbulence = 0.0;

  float h = uDiskHalfThickness;
  float yn = p.y / h;
  float vertical = max(1.0 - yn * yn, 0.0);
  vertical = vertical * vertical * vertical;
  float inner = smoothstep(uDiskInner - 0.12, uDiskInner + 0.35, r);
  float outer = 1.0 - smoothstep(mix(uDiskInner, uDiskOuter, 0.6), uDiskOuter, r);
  float surface = inner * outer * pow(uDiskInner / r, 0.55);
  if (vertical * surface <= 1e-5) return smp;

  float turb = diskTurbulence(p, r);
  float hot = mix(1.0, 0.8 + 0.4 * turb, uTurbulenceAmp);
  float temperature = uDiskTemperature * temperatureProfile(r) * hot;
  float g = redshiftFactor(r, lambda, cameraLapse);
  float observed = g * temperature;
  float beaming = pow(observed / uDiskTemperature, 4.0);
  float clump = mix(1.0, 0.1 + 1.8 * smoothstep(0.28, 0.78, turb), uTurbulenceAmp);

  // Column density is independent of H: the vertical profile integrates to 32/35 H.
  smp.opacity = DISK_OPACITY * surface * clump * vertical / (0.9142857 * h);
  smp.emission = blackbodyColor(observed) * (beaming * uDiskIntensity * DISK_EMISSION_SCALE);
  smp.g = g;
  smp.observedTemperature = observed;
  smp.turbulence = turb;
  return smp;
}

// ---------------------------------------------------------------------------
// Geodesic integration
// ---------------------------------------------------------------------------

struct Trace {
  vec3 radiance;
  float transmittance;
  vec3 skyDir;
  int termination;
  int steps;
  int crossings;
  float firstRadius;
  float firstG;
  float firstTemperature;
  float firstTurbulence;
  float impactParameter;
  float deflection;
};

vec2 binetDerivative(vec2 s) {
  return vec2(s.y, 3.0 * s.x * s.x - s.x);
}

// Front-to-back emission/absorption along the chord pa→pb of the integrated
// path, restricted to the part of the chord inside the disk slab.
void accumulateDisk(vec3 pa, vec3 pb, float lambda, float cameraLapse, float jitter, inout Trace tr) {
  float h = uDiskHalfThickness;
  float ya = pa.y;
  float yb = pb.y;
  if ((ya > h && yb > h) || (ya < -h && yb < -h)) return;
  float dy = yb - ya;
  float s0 = 0.0;
  float s1 = 1.0;
  if (abs(dy) > 1e-8) {
    float t0 = (-h - ya) / dy;
    float t1 = (h - ya) / dy;
    s0 = max(0.0, min(t0, t1));
    s1 = min(1.0, max(t0, t1));
  }
  if (s1 <= s0) return;
  vec3 chord = pb - pa;
  vec3 qa = pa + chord * s0;
  vec3 qb = pa + chord * s1;
  float ra = length(qa);
  float rb = length(qb);
  if (max(ra, rb) < uDiskInner - 0.2 || min(ra, rb) > uDiskOuter) return;

  float inside = (s1 - s0) * length(chord);
  int n = clamp(int(ceil(inside / (0.55 * h))), 1, uDiskSamples);
  float ds = inside / float(n);
  for (int k = 0; k < MAX_DISK_SAMPLE_CAP; ++k) {
    if (k >= n) break;
    vec3 p = mix(qa, qb, (float(k) + jitter) / float(n));
    DiskSample smp = sampleDisk(p, length(p), lambda, cameraLapse);
    if (smp.opacity <= 0.0) continue;
    float alpha = 1.0 - exp(-smp.opacity * ds);
    tr.radiance += tr.transmittance * alpha * smp.emission;
    if (tr.firstG == 0.0 && alpha > 0.015) {
      tr.firstG = smp.g;
      tr.firstTemperature = smp.observedTemperature;
      tr.firstTurbulence = smp.turbulence;
    }
    tr.transmittance *= 1.0 - alpha;
  }
}

Trace traceGeodesic(vec3 dir, bool shadeDisk, float jitter) {
  Trace tr;
  tr.radiance = vec3(0.0);
  tr.transmittance = 1.0;
  tr.skyDir = dir;
  tr.termination = TERM_BUDGET;
  tr.steps = 0;
  tr.crossings = 0;
  tr.firstRadius = 0.0;
  tr.firstG = 0.0;
  tr.firstTemperature = 0.0;
  tr.firstTurbulence = 0.0;
  tr.deflection = 0.0;

  float r0 = length(uCamPos);
  vec3 e1 = uCamPos / r0;
  float cosA = clamp(dot(dir, e1), -1.0, 1.0);
  vec3 tangential = dir - cosA * e1;
  float sinA = length(tangential);
  vec3 e2;
  if (sinA > 1e-6) {
    e2 = tangential / sinA;
  } else {
    e2 = normalize(cross(e1, abs(e1.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
    sinA = 1e-6;
  }
  float cameraLapse = sqrt(1.0 - 2.0 / r0);
  float u = 1.0 / r0;
  float w = -cameraLapse * cosA / (r0 * sinA);
  float b = r0 * sinA / cameraLapse;
  tr.impactParameter = b;
  // The physical photon travels opposite to the traced direction, so its
  // orbital angular momentum points along −(e1 × e2); λ = L_z/E about +y.
  float lambda = -b * cross(e1, e2).y;

  // Equatorial-plane nodes: x(φ).y ∝ e1.y cos φ + e2.y sin φ = A cos(φ − φ0).
  float nodePhi = 1e9;
  if (length(vec2(e1.y, e2.y)) > 1e-6) {
    nodePhi = atan(e2.y, e1.y) + 0.5 * PI;
    nodePhi -= PI * floor((nodePhi - 1e-4) / PI);
  }

  float diskReach = uDiskOuter + uDiskHalfThickness + 0.5;
  float phi = 0.0;
  vec3 prevPos = uCamPos;
  float prevR = r0;

  for (int i = 0; i < MAX_STEP_CAP; ++i) {
    if (i >= uMaxSteps) break;
    float h = min(uMaxDphi, uRelStep * u / max(abs(w), 1e-7));
    bool landing = phi + h >= nodePhi;
    if (landing) h = nodePhi - phi;

    vec2 s = vec2(u, w);
    vec2 k1 = binetDerivative(s);
    vec2 k2 = binetDerivative(s + 0.5 * h * k1);
    vec2 k3 = binetDerivative(s + 0.5 * h * k2);
    vec2 k4 = binetDerivative(s + h * k3);
    s += (h / 6.0) * (k1 + 2.0 * (k2 + k3) + k4);
    u = s.x;
    w = s.y;
    if (landing) {
      phi = nodePhi;
      nodePhi += PI;
    } else {
      phi += h;
    }
    tr.steps = i + 1;

    float r = 1.0 / u;
    vec3 pos = (cos(phi) * e1 + sin(phi) * e2) * r;

    if (min(r, prevR) < diskReach) {
      if (shadeDisk) accumulateDisk(prevPos, pos, lambda, cameraLapse, jitter, tr);
      if (landing && r >= uDiskInner && r <= uDiskOuter) {
        tr.crossings += 1;
        if (tr.crossings == 1) tr.firstRadius = r;
      }
    }
    if (shadeDisk && tr.transmittance < 1e-3) {
      tr.termination = TERM_ABSORBED;
      break;
    }
    if (u >= U_HORIZON) {
      tr.termination = TERM_CAPTURED;
      break;
    }
    if (u <= uEscapeU && w < 0.0) {
      float phiInfinity = phi + atan(u, -w);
      tr.skyDir = cos(phiInfinity) * e1 + sin(phiInfinity) * e2;
      tr.deflection = phiInfinity - acos(cosA);
      tr.termination = TERM_ESCAPED;
      break;
    }
    prevPos = pos;
    prevR = r;
  }
  return tr;
}

// ---------------------------------------------------------------------------
// Procedural sky (evaluated along the lensed escape direction)
// ---------------------------------------------------------------------------

vec2 cubeFace(vec3 d, out int face) {
  vec3 a = abs(d);
  if (a.x >= a.y && a.x >= a.z) {
    face = d.x > 0.0 ? 0 : 1;
    return d.yz / a.x;
  }
  if (a.y >= a.z) {
    face = d.y > 0.0 ? 2 : 3;
    return d.xz / a.y;
  }
  face = d.z > 0.0 ? 4 : 5;
  return d.xy / a.z;
}

vec3 cubeDir(int face, vec2 uv) {
  if (face == 0) return normalize(vec3(1.0, uv.x, uv.y));
  if (face == 1) return normalize(vec3(-1.0, uv.x, uv.y));
  if (face == 2) return normalize(vec3(uv.x, 1.0, uv.y));
  if (face == 3) return normalize(vec3(uv.x, -1.0, uv.y));
  if (face == 4) return normalize(vec3(uv.x, uv.y, 1.0));
  return normalize(vec3(uv.x, uv.y, -1.0));
}

// One layer of stars hashed on a cube-face grid. Each star is a Gaussian of
// intrinsic width σ★ convolved with the pixel footprint (flux-conserving); once
// the footprint spans a cell the layer fades to its mean radiance.
vec3 starLayer(vec3 d, float cells, float probability, float brightness, float footprint, uint seed) {
  int face;
  vec2 uv = cubeFace(d, face);
  vec2 cell = floor((uv * 0.5 + 0.5) * cells);
  float cellAngle = 2.0 / cells;
  float sigmaStar = 0.5 * uPixelAngle;
  float sigmaFoot = 0.42 * footprint;
  float sigma2 = sigmaStar * sigmaStar + sigmaFoot * sigmaFoot;
  float refArea = uPixelAngle * uPixelAngle;
  vec3 mean = vec3(0.92, 0.95, 1.0) * (probability * brightness * 0.405 * TAU * refArea / (cellAngle * cellAngle));

  uint h = pcg(uint(int(cell.x)) * 1597334677u ^ uint(int(cell.y)) * 3812015801u ^ uint(face) * 2798796415u ^ seed);
  vec3 star = vec3(0.0);
  if (float(h & 0xFFFFu) * (1.0 / 65535.0) < probability) {
    uint h2 = pcg(h);
    vec2 jitter = 0.2 + 0.6 * vec2(float(h2 & 0xFFFFu), float(h2 >> 16u)) * (1.0 / 65535.0);
    vec3 starDir = cubeDir(face, ((cell + jitter) / cells) * 2.0 - 1.0);
    vec3 offset = d - starDir;
    uint h3 = pcg(h2);
    float magnitude = float(h3 & 0xFFFFu) * (1.0 / 65535.0);
    float flux = brightness * (3.0 * pow(magnitude, 7.0) + 0.03);
    float kelvin = mix(2600.0, 14000.0, pow(float(h3 >> 16u) * (1.0 / 65535.0), 1.8));
    star = blackbodyColor(kelvin) * (flux * refArea / sigma2 * exp(-0.5 * dot(offset, offset) / sigma2));
  }
  return mix(star, mean, smoothstep(0.15, 0.6, footprint / cellAngle));
}

vec3 milkyWay(vec3 d, float footprint, out float band) {
  float s = dot(d, GALAXY_NORMAL);
  band = exp(-s * s / (2.0 * 0.11 * 0.11));
  float wide = exp(-s * s / (2.0 * 0.32 * 0.32));
  float toCenter = dot(d, GALAXY_CENTER);
  float bulge = exp(-(1.0 - toCenter) * 7.0) * exp(-s * s / (2.0 * 0.2 * 0.2));
  int octaves = uNoiseOctaves + 1;
  float clouds = fbmFiltered(d * 4.0 + 1.7, octaves, footprint * 4.0);
  float detail = fbmFiltered(d * 13.0 + 7.3, octaves, footprint * 13.0);
  float lane = exp(-(s + 0.02) * (s + 0.02) / (2.0 * 0.05 * 0.05));
  float dust = smoothstep(0.42, 0.72, 0.75 * fbmFiltered(d * 7.0 + 3.9, octaves, footprint * 7.0) + 0.25 * detail) * lane;
  vec3 col = vec3(0.55, 0.64, 0.86) * band * (0.25 + 1.2 * clouds * clouds * (0.6 + 0.8 * detail))
    + vec3(1.0, 0.8, 0.58) * bulge * (0.7 + 0.8 * clouds) * 1.7
    + vec3(0.32, 0.36, 0.5) * wide * 0.1 * clouds;
  col *= 1.0 - 0.82 * dust;
  return col * (0.07 * uGalaxyBrightness);
}

vec3 skyRadiance(vec3 d, float footprint) {
  float band;
  vec3 galaxy = milkyWay(d, footprint, band);
  float density = uStarDensity;
  vec3 stars = starLayer(d, 90.0, min(0.35 * density, 0.95), 2.6, footprint, 0x1234567u)
    + starLayer(d, 240.0, min(0.28 * density, 0.95), 0.9, footprint, 0x89abcdeu)
    + starLayer(d, 560.0, min(0.2 * density * (1.0 + 2.5 * band), 0.95), 0.32, footprint, 0x2468aceu);
  return galaxy + stars;
}

// ---------------------------------------------------------------------------
// Diagnostic views 1–7 (display-referred colours)
// ---------------------------------------------------------------------------

vec3 debugSteps(Trace tr) {
  float s = sqrt(float(tr.steps) / float(max(uMaxSteps, 1)));
  vec3 base = tr.termination == TERM_ESCAPED ? vec3(0.25, 0.62, 1.0)
    : tr.termination == TERM_CAPTURED ? vec3(1.0, 0.42, 0.12)
    : tr.termination == TERM_ABSORBED ? vec3(0.35, 1.0, 0.45)
    : vec3(1.0, 0.15, 0.9);
  return base * (0.12 + 0.88 * s);
}

vec3 debugHorizon(Trace tr, float bWidth) {
  vec3 col = tr.termination == TERM_CAPTURED ? vec3(0.93) : tr.termination == TERM_BUDGET ? vec3(0.45, 0.12, 0.45) : vec3(0.015);
  float line = 1.0 - smoothstep(0.0, 1.5 * max(bWidth, 1e-5), abs(tr.impactParameter - B_CRIT));
  return mix(col, vec3(1.0, 0.12, 0.08), line);
}

vec3 debugCrossings(Trace tr) {
  if (tr.crossings == 0) return tr.termination == TERM_CAPTURED ? vec3(0.0) : vec3(0.05);
  vec3 col = tr.crossings == 1 ? vec3(1.0, 0.62, 0.18)
    : tr.crossings == 2 ? vec3(0.2, 0.85, 1.0)
    : tr.crossings == 3 ? vec3(0.95, 0.3, 1.0)
    : vec3(1.0);
  return col * (0.62 + 0.38 * cos(PI * tr.firstRadius));
}

vec3 debugRedshift(Trace tr, float isoWidth) {
  if (tr.firstG <= 0.0) return vec3(0.0);
  float lg = log2(tr.firstG);
  vec3 tint = lg < 0.0 ? vec3(1.0, 0.22, 0.08) : vec3(0.18, 0.48, 1.0);
  vec3 col = mix(vec3(0.95), tint, clamp(abs(lg) / 1.2, 0.0, 1.0));
  return mix(col, vec3(0.0), 0.65 * isoLine(tr.firstG * 10.0, isoWidth));
}

vec3 debugTemperature(Trace tr) {
  if (tr.firstTemperature <= 0.0) return vec3(0.0);
  vec3 col = blackbodyColor(tr.firstTemperature);
  col /= max(max(col.r, max(col.g, col.b)), 1e-4);
  return col * (0.2 + 0.8 * tr.firstTurbulence);
}

vec3 debugCelestialGrid(Trace tr, vec2 sph, vec2 sphWidth) {
  if (tr.termination != TERM_ESCAPED) return tr.termination == TERM_CAPTURED ? vec3(0.0) : vec3(0.08);
  vec3 d = tr.skyDir;
  vec3 octant = vec3(d.x > 0.0 ? 1.0 : 0.35, d.y > 0.0 ? 1.0 : 0.35, d.z > 0.0 ? 1.0 : 0.35);
  vec3 col = mix(vec3(0.12), octant, 0.55);
  float cellsPerRadian = 12.0 / PI;
  float lines = max(isoLine(sph.x * cellsPerRadian, sphWidth.x * cellsPerRadian), isoLine(sph.y * cellsPerRadian, sphWidth.y * cellsPerRadian));
  return mix(col, vec3(1.0), lines * 0.9);
}

vec3 debugDeflection(Trace tr, float deflectionWidth) {
  if (tr.termination != TERM_ESCAPED) return tr.termination == TERM_CAPTURED ? vec3(0.0) : vec3(0.08);
  float turns = tr.deflection / PI;
  vec3 col = turbo(clamp(turns / 2.5, 0.0, 1.0));
  return mix(col, vec3(0.0), 0.7 * isoLine(tr.deflection / (0.25 * PI), deflectionWidth / (0.25 * PI)));
}

void main() {
  vec2 ndc = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  vec3 dir = normalize(uCamForward + (ndc.x * uTanHalfFov * uAspect) * uCamRight + (ndc.y * uTanHalfFov) * uCamUp);
  bool shadeDisk = uDebugMode == 0 || uDebugMode == 1 || uDebugMode == 4 || uDebugMode == 5 || uDebugMode == 9;
  float jitter = interleavedGradientNoise(gl_FragCoord.xy);

  Trace tr = traceGeodesic(dir, shadeDisk, jitter);

  // Screen-space derivatives must be evaluated in uniform control flow.
  vec3 dsx = dFdx(tr.skyDir);
  vec3 dsy = dFdy(tr.skyDir);
  float footprint = sqrt(max(dot(dsx, dsx), dot(dsy, dsy)));
  float bWidth = fwidth(tr.impactParameter);
  float gWidth = fwidth(tr.firstG * 10.0);
  float deflectionWidth = fwidth(tr.deflection);
  vec2 sph = vec2(atan(tr.skyDir.z, tr.skyDir.x), asin(clamp(tr.skyDir.y, -1.0, 1.0)));
  vec2 sphWidth = fwidth(sph);
  sphWidth.x = min(sphWidth.x, fwidth(atan(-tr.skyDir.z, -tr.skyDir.x)));

  vec3 color;
  if (uDebugMode == 0 || uDebugMode == 8 || uDebugMode == 9) {
    vec3 sky = vec3(0.0);
    if (tr.termination == TERM_ESCAPED) sky = skyRadiance(tr.skyDir, footprint);
    color = uDebugMode == 8 ? sky : tr.radiance + tr.transmittance * sky;
  } else if (uDebugMode == 1) {
    color = debugSteps(tr);
  } else if (uDebugMode == 2) {
    color = debugHorizon(tr, bWidth);
  } else if (uDebugMode == 3) {
    color = debugCrossings(tr);
  } else if (uDebugMode == 4) {
    color = debugRedshift(tr, gWidth);
  } else if (uDebugMode == 5) {
    color = debugTemperature(tr);
  } else if (uDebugMode == 6) {
    color = debugCelestialGrid(tr, sph, sphWidth);
  } else {
    color = debugDeflection(tr, deflectionWidth);
  }
  fragColor = vec4(max(color, vec3(0.0)), 1.0);
}
