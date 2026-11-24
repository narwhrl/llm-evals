/**
 * GARGANTUA — Schwarzschild Null-Geodesic Raytracer Shaders
 *
 * Coordinate & Physical Formulation (Geometric units G = c = 1, Schwarzschild radius rs = 2M = 1.0):
 * - Coordinates: 3D Schwarzschild pseudo-Cartesian coordinates x = (r sinθ cosφ, r cosθ, r sinθ sinφ),
 *   where r = |x| is the areal Schwarzschild radial coordinate and y = 0 is the equatorial accretion plane.
 * - Null Geodesic Equations (affine parameter λ normalized so conserved photon energy E = -p_t = 1):
 *   From the Schwarzschild null Lagrangian -(1 - rs/r) (dt/dλ)^2 + (1 - rs/r)^(-1) (dr/dλ)^2 + r^2 (dΩ/dλ)^2 = 0
 *   and conserved impact parameter b = L / E = |x × (dx/dλ)|:
 *     (dr/dλ)^2 + (b^2 / r^2)(1 - rs / r) = 1
 *     d^2x / dλ^2 = -(3 / 2) * rs * b^2 * x / |x|^5
 * - Static Observer (FIDO) Initial Condition at r0 = |x_cam| > rs:
 *   Given unit pixel ray n in the observer's proper orthonormal tetrad and radial unit vector er = x_cam / r0,
 *     v(0) = (n · er) er + (n - (n · er) er) / sqrt(1 - rs / r0)
 *   which yields exact conserved impact parameter b = r0 sin(α) / sqrt(1 - rs / r0),
 *   matching Synge's shadow angle sin(α_crit) = (3√3 / 2)(rs / r0) sqrt(1 - rs / r0) at b_crit = 3√3 / 2 * rs.
 * - Stepper & Termination:
 *   4th-order Runge-Kutta (RK4) with strong-field & disk-slab adaptive step sizing.
 *   Terminates cleanly upon Event Horizon capture (r <= rs, including sub-step chord minimum check),
 *   asymptotic escape (r >= R_ESCAPE with dr/dλ > 0), or reaching quality-tier maximum step count.
 */

export const FULLSCREEN_TRIANGLE_VERT = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const SCHWARZSCHILD_RAYTRACER_FRAG = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;
uniform float uAspect;
uniform float uPortraitBoost;

uniform float uTime;
uniform int uMaxSteps;
uniform float uStepScale;
uniform int uDiskSubSamples;
uniform int uStarOctaves;
uniform int uDebugMode;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfThickness;
uniform float uDiskTemp;
uniform float uDiskIntensity;
uniform float uOrbitalSpeedScale;
uniform float uTurbulenceAmp;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;
const float RS = 1.0;
const float R_PHOTON = 1.5;
const float B_CRIT = 2.59807621135;
const float R_ESCAPE = 62.0;
const int MAX_LOOP_STEPS = 380;

// ---------------------------------------------------------------------------
// Deterministic Procedural Noise & Hash Primitives (No external textures)
// ---------------------------------------------------------------------------
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

float valueNoise3D(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);

  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));

  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);

  float nxy0 = mix(nx00, nx10, f.y);
  float nxy1 = mix(nx01, nx11, f.y);

  return mix(nxy0, nxy1, f.z);
}

float fbm3D(vec3 p) {
  float sum = 0.0;
  float amp = 0.52;
  mat3 rot = mat3(
    0.80,  0.48, -0.36,
   -0.48,  0.84,  0.24,
    0.36, -0.24,  0.90
  );
  for (int i = 0; i < 4; i++) {
    sum += amp * valueNoise3D(p);
    p = rot * p * 2.07 + vec3(13.7, 7.3, 19.1);
    amp *= 0.5;
  }
  return sum;
}

// ---------------------------------------------------------------------------
// Physical Planckian Blackbody Chromaticity (Kelvin -> Linear sRGB)
// ---------------------------------------------------------------------------
vec3 blackbodyToLinearRGB(float kelvin) {
  float t = clamp(kelvin, 900.0, 28000.0) * 0.01;
  float r;
  float g;
  float b;

  if (t <= 66.0) {
    r = 1.0;
    g = clamp(0.39008158 * log(max(t, 1.5)) - 0.63184144, 0.0, 1.0);
    if (t <= 19.0) {
      b = 0.0;
    } else {
      b = clamp(0.54320679 * log(t - 10.0) - 1.19625409, 0.0, 1.0);
    }
  } else {
    r = clamp(1.29293619 * pow(t - 60.0, -0.13320476), 0.0, 1.0);
    g = clamp(1.12989086 * pow(t - 60.0, -0.07551485), 0.0, 1.0);
    b = 1.0;
  }

  // Convert approximate perceptual chromaticity into linear radiance chromaticity
  vec3 srgb = vec3(r, g, b);
  return pow(srgb, vec3(2.2));
}

// ---------------------------------------------------------------------------
// Schwarzschild Geodesic Dynamics & RK4 Integrator
// ---------------------------------------------------------------------------
void initSchwarzschildRay(
  vec3 camPos,
  vec3 localDir,
  out vec3 rayPos,
  out vec3 rayVel,
  out float bSq,
  out float camLapse
) {
  rayPos = camPos;
  float r0 = max(length(camPos), RS + 0.05);
  vec3 er = camPos / r0;
  camLapse = sqrt(max(1.0 - RS / r0, 1e-4));

  float cosAlpha = dot(localDir, er);
  vec3 transverse = localDir - cosAlpha * er;
  rayVel = cosAlpha * er + transverse / camLapse;

  vec3 angMom = cross(rayPos, rayVel);
  bSq = dot(angMom, angMom);
}

vec3 schwarzschildGeodesicAccel(vec3 pos, float bSq) {
  float r2 = max(dot(pos, pos), 1e-4);
  float r = sqrt(r2);
  float invR5 = 1.0 / (r2 * r2 * r);
  return (-1.5 * RS * bSq * invR5) * pos;
}

void stepGeodesicRK4(inout vec3 pos, inout vec3 vel, float bSq, float h) {
  vec3 k1x = vel;
  vec3 k1v = schwarzschildGeodesicAccel(pos, bSq);

  vec3 p2 = pos + 0.5 * h * k1x;
  vec3 k2x = vel + 0.5 * h * k1v;
  vec3 k2v = schwarzschildGeodesicAccel(p2, bSq);

  vec3 p3 = pos + 0.5 * h * k2x;
  vec3 k3x = vel + 0.5 * h * k2v;
  vec3 k3v = schwarzschildGeodesicAccel(p3, bSq);

  vec3 p4 = pos + h * k3x;
  vec3 k4x = vel + h * k3v;
  vec3 k4v = schwarzschildGeodesicAccel(p4, bSq);

  pos += (h / 6.0) * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
  vel += (h / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
}

float diskFlaredHalfHeight(float cylR) {
  float ratio = clamp(cylR / max(uDiskInner, 0.5), 0.6, 8.0);
  return uDiskHalfThickness * (0.62 + 0.52 * pow(ratio, 0.42));
}

float computeAdaptiveGeodesicStep(vec3 pos, vec3 vel, float bImpact) {
  float r = length(pos);
  float nearHorizon = max(r - 0.84 * RS, 0.07);
  float dt = 0.068 * nearHorizon + 0.0085 * max(r - 4.5, 0.0) * max(r - 4.5, 0.0);
  dt = clamp(dt, 0.024, 2.4);

  // Tighten step near the unstable photon sphere (r = 1.5 rs) and critical impact parameter
  float photonSphereProx = abs(r - R_PHOTON);
  if (photonSphereProx < 1.05) {
    float critProx = clamp(abs(bImpact - B_CRIT) / 0.55, 0.0, 1.0);
    float fineTarget = mix(0.022, 0.038, critProx);
    dt = min(dt, mix(fineTarget, 0.11, photonSphereProx / 1.05));
  }

  // Tighten step when approaching or traversing the equatorial disk slab
  float cylR = length(pos.xz);
  if (cylR > uDiskInner * 0.78 && cylR < uDiskOuter * 1.15) {
    float hSlab = diskFlaredHalfHeight(cylR);
    float absY = abs(pos.y);
    if (absY < max(3.2 * hSlab, 0.9)) {
      float vy = max(abs(vel.y), 0.14);
      float slabStep = max(0.42 * hSlab, 0.032) + 0.28 * max(absY - hSlab, 0.0) / vy;
      dt = min(dt, slabStep);
    }
  }

  return dt * uStepScale;
}

// Cubic Hermite interpolation along an RK4 segment [0, 1]
vec3 hermitePos(vec3 x0, vec3 v0, vec3 x1, vec3 v1, float dt, float s) {
  float s2 = s * s;
  float s3 = s2 * s;
  float h00 = 2.0 * s3 - 3.0 * s2 + 1.0;
  float h10 = s3 - 2.0 * s2 + s;
  float h01 = -2.0 * s3 + 3.0 * s2;
  float h11 = s3 - s2;
  return h00 * x0 + h10 * (dt * v0) + h01 * x1 + h11 * (dt * v1);
}

vec3 hermiteVel(vec3 x0, vec3 v0, vec3 x1, vec3 v1, float dt, float s) {
  float s2 = s * s;
  float dh00 = 6.0 * s2 - 6.0 * s;
  float dh10 = 3.0 * s2 - 4.0 * s + 1.0;
  float dh01 = -6.0 * s2 + 6.0 * s;
  float dh11 = 3.0 * s2 - 2.0 * s;
  return (dh00 * x0 + dh10 * (dt * v0) + dh01 * x1 + dh11 * (dt * v1)) / max(dt, 1e-5);
}

// ---------------------------------------------------------------------------
// Accretion Disk Turbulence, Relativistic Redshift/Doppler & Radiative Sample
// ---------------------------------------------------------------------------
float sampleSpiralDiskTurbulence(vec3 pos, float cylR, float hLocal) {
  float phi = atan(pos.z, pos.x);
  float logR = log(max(cylR, 0.5));
  float keplerOmega = 1.0 / (pow(max(cylR, 1.35), 1.5) + 0.35);

  // Dual-phase Keplerian shear flow prevents infinite spiral winding at large simulation times
  float flowClock = uTime * uTurbulenceSpeed * 0.20;
  float phaseA = fract(flowClock);
  float phaseB = fract(flowClock + 0.5);
  float weightA = sin(PI * phaseA);
  weightA *= weightA;
  float weightB = 1.0 - weightA;

  float shearSpan = 13.0 * keplerOmega;
  float phiA = phi - (phaseA - 0.5) * shearSpan;
  float phiB = phi - (phaseB - 0.5) * shearSpan;

  // Trailing MRI spiral coordinate warp
  float spiralTwist = 5.4 * logR;
  vec3 coordA = vec3(
    cos(phiA + spiralTwist) * 2.35 + logR * 3.2,
    sin(phiA + spiralTwist) * 2.35 - logR * 2.1,
    pos.y / max(hLocal, 0.04) * 0.85 + logR * 5.0
  );
  vec3 coordB = vec3(
    cos(phiB + spiralTwist) * 2.35 + logR * 3.2 + 11.3,
    sin(phiB + spiralTwist) * 2.35 - logR * 2.1 + 7.9,
    pos.y / max(hLocal, 0.04) * 0.85 + logR * 5.0 + 5.1
  );

  float fbmA = fbm3D(coordA);
  float fbmB = fbm3D(coordB);
  float spiralFbm = weightA * fbmA + weightB * fbmB;

  // Fine differential azimuthal streaks + concentric Keplerian ring lanes
  vec3 streakCoordA = vec3(cos(phiA * 2.0 + 3.2 * logR) * 3.6, sin(phiA * 2.0 + 3.2 * logR) * 3.6, logR * 9.5);
  vec3 streakCoordB = vec3(cos(phiB * 2.0 + 3.2 * logR) * 3.6 + 6.4, sin(phiB * 2.0 + 3.2 * logR) * 3.6 + 4.2, logR * 9.5);
  float streaks = weightA * fbm3D(streakCoordA) + weightB * fbm3D(streakCoordB);

  float ringWave = 0.5 + 0.5 * sin(logR * 28.0 + spiralFbm * 5.2 - uTime * uTurbulenceSpeed * 0.35);
  float rawTurb = clamp(0.56 * spiralFbm + 0.30 * streaks + 0.24 * ringWave, 0.0, 1.35);
  float contrastTurb = pow(max(rawTurb, 0.02), 1.45) * 1.65;

  return mix(1.0, contrastTurb, clamp(uTurbulenceAmp, 0.0, 1.5));
}

void evaluateDiskPoint(
  vec3 pos,
  vec3 rayVel,
  float camLapse,
  float verticalZeta,
  out float radialMask,
  out float gFactor,
  out float normTemp,
  out float turbValue,
  out vec3 localEmission
) {
  float cylR = length(pos.xz);
  float rSph = max(length(pos), RS + 0.02);

  float innerWidth = max(0.14 * uDiskInner, 0.24);
  float innerMask = smoothstep(uDiskInner - innerWidth * 0.45, uDiskInner + innerWidth * 0.85, cylR);
  float outerMask = 1.0 - smoothstep(uDiskOuter * 0.68, uDiskOuter * 1.03, cylR);
  radialMask = innerMask * outerMask;

  if (radialMask <= 1e-4) {
    gFactor = 1.0;
    normTemp = 0.0;
    turbValue = 0.0;
    localEmission = vec3(0.0);
    return;
  }

  // Relativistic circular Keplerian gas velocity in local static frame
  float metricLapseSq = max(1.0 - RS / rSph, 0.015);
  float sqrtMetric = sqrt(metricLapseSq);
  float betaKepler = sqrt(RS / max(2.0 * (cylR - RS), 0.30));
  float beta = clamp(uOrbitalSpeedScale * betaKepler, 0.0, 0.90);
  float gamma = inversesqrt(max(1.0 - beta * beta, 0.05));

  // Prograde orbital tangent in equatorial plane (+CCW around +Y)
  vec3 orbTangent = vec3(-pos.z, 0.0, pos.x) / max(cylR, 1e-4);

  // Exact photon frequency ratio g = nu_obs / nu_emit = E_obs / (-p_mu u^mu)
  float dopplerDenom = gamma * (1.0 + beta * sqrtMetric * dot(rayVel, orbTangent));
  gFactor = clamp((sqrtMetric / camLapse) / max(dopplerDenom, 0.12), 0.10, 3.2);

  float hLocal = diskFlaredHalfHeight(cylR);
  turbValue = sampleSpiralDiskTurbulence(pos, cylR, hLocal);

  // Page-Thorne / Shakura-Sunyaev radial temperature profile
  float rRatio = uDiskInner / max(cylR, uDiskInner * 0.90);
  float torqueTerm = pow(max(1.0 - 0.76 * sqrt(rRatio), 0.08), 0.25);
  normTemp = clamp(pow(rRatio, 0.72) * torqueTerm * 1.42, 0.0, 1.5);

  float filamentHeat = mix(0.84, 1.24, clamp(turbValue * 0.65, 0.0, 1.0));
  float verticalCool = mix(1.0, 0.72, clamp(verticalZeta, 0.0, 1.0));
  float localKelvin = uDiskTemp * normTemp * filamentHeat * verticalCool;
  float observedKelvin = clamp(localKelvin * pow(gFactor, 0.85), 950.0, 26000.0);

  vec3 bbColor = blackbodyToLinearRGB(observedKelvin);

  // Relativistic specific intensity scaling + radial emissivity falloff
  float beaming = pow(gFactor, 2.85);
  float radialFalloff = pow(rRatio, 1.85) * (0.35 + 0.95 * outerMask);
  localEmission = bbColor * (uDiskIntensity * 2.35 * radialMask * radialFalloff * turbValue * beaming);
}

// ---------------------------------------------------------------------------
// Procedural Lensed Starfield & Milky Way Galactic Background (No Cubemap)
// Compact-support PSF strictly inside each rotated 3D cell prevents grid seams
// ---------------------------------------------------------------------------
vec3 sampleStarGrid(vec3 dir, float scale, float densityProb, float coreSize, float brightness) {
  vec3 p = dir * scale;
  vec3 cell = floor(p);
  vec3 rnd = hash33(cell);
  if (rnd.x >= densityProb) return vec3(0.0);

  // Keep star center strictly inside [0.27, 0.73]^3 so max PSF radius 0.25 never touches cell wall
  vec3 starPos = cell + 0.27 + 0.46 * hash33(cell + vec3(19.7, 41.3, 7.1));
  float dist = length(p - starPos);
  if (dist >= 0.25) return vec3(0.0);

  float window = smoothstep(0.25, 0.02, dist);
  float rCore = coreSize * (0.72 + 0.55 * rnd.z);
  float core = exp(-(dist * dist) / max(rCore * rCore, 1e-5));
  float airy = 0.16 * exp(-dist / max(rCore * 2.4, 1e-4)) * window;

  float lumVar = 0.22 + 3.4 * pow(rnd.y, 3.6);
  float starKelvin = mix(3000.0, 18000.0, pow(rnd.z, 1.4));
  vec3 starColor = blackbodyToLinearRGB(starKelvin);

  return starColor * (core + airy) * window * lumVar * brightness;
}

vec3 sampleProceduralCosmos(vec3 outDir) {
  vec3 d = normalize(outDir);

  // Rotate into inclined Galactic frame (~39 deg tilt across the sky behind Gargantua)
  const mat3 galacticBasis = mat3(
     0.7880,  0.3827, -0.4822,
    -0.4695,  0.8660,  0.1720,
     0.3983,  0.3214,  0.8589
  );
  const mat3 starRotB = mat3(
     0.5403, -0.6816,  0.4935,
     0.7518,  0.6428,  0.1470,
    -0.3779,  0.3502,  0.8572
  );
  const mat3 starRotC = mat3(
    -0.6124,  0.5000,  0.6124,
     0.7071,  0.7071,  0.0000,
    -0.3536,  0.5000, -0.7906
  );

  vec3 gd = galacticBasis * d;

  // Galactic band & bulge + dark rift absorption lanes
  float galLat = gd.y;
  float galLon = atan(gd.z, gd.x);
  float bandEnvelope = exp(-abs(galLat) * 6.2) + 0.30 * exp(-galLat * galLat * 12.0);
  float bulge = exp(-dot(vec2(galLon * 0.55, galLat * 3.2), vec2(galLon * 0.55, galLat * 3.2)) * 2.0);

  float cloudFbm = fbm3D(gd * 4.4 + vec3(2.4, -1.7, 5.1));
  float fineCloud = fbm3D(gd * 12.0 + vec3(8.2, 3.9, -4.6));
  float dustLane = fbm3D(gd * 8.2 + vec3(15.1, 0.8, 9.4));

  float dustOpticalDepth = smoothstep(0.40, 0.77, dustLane) * exp(-galLat * galLat * 58.0) * 2.45;
  float dustTrans = exp(-dustOpticalDepth);

  vec3 coreWarm = vec3(1.06, 0.75, 0.46) * (0.32 + 0.92 * bulge);
  vec3 armCool = vec3(0.38, 0.56, 0.94) * smoothstep(0.34, 0.86, cloudFbm);
  vec3 hII = vec3(0.86, 0.34, 0.45) * pow(max(fineCloud - 0.54, 0.0) * 2.0, 2.3) * 0.48;

  vec3 galaxyColor = (coreWarm * (0.42 + 0.82 * cloudFbm) + armCool * 0.58 + hII)
    * bandEnvelope * dustTrans * 0.19 * uGalaxyBrightness;

  // Deep cosmic background velvet tone
  vec3 deepBg = vec3(0.0018, 0.0026, 0.0048) * (0.35 + 0.65 * clamp(uGalaxyBrightness, 0.0, 2.0));

  // Multi-tier pinpoint procedural stars (scaled by uStarDensity and quality uStarOctaves)
  float dens = clamp(uStarDensity, 0.0, 2.5);
  vec3 stars = vec3(0.0);
  if (dens > 0.001) {
    float p1 = clamp(0.14 * dens, 0.0, 0.55);
    float p2 = clamp(0.28 * dens * (0.45 + 1.05 * bandEnvelope), 0.0, 0.78);
    stars += sampleStarGrid(d, 72.0, p1, 0.046, 2.1);
    stars += sampleStarGrid(starRotB * d, 138.0, p2, 0.052, 1.05);
    if (uStarOctaves >= 3) {
      float p3 = clamp(0.38 * dens * (0.30 + 1.35 * bandEnvelope), 0.0, 0.88);
      stars += sampleStarGrid(starRotC * d, 235.0, p3, 0.058, 0.52) * (0.35 + 0.65 * dustTrans);
    }
    if (uStarOctaves >= 4) {
      float p4 = clamp(0.48 * dens * (0.20 + 1.45 * bandEnvelope), 0.0, 0.94);
      stars += sampleStarGrid(gd, 360.0, p4, 0.064, 0.28) * dustTrans;
    }
  }

  return deepBg + galaxyColor + stars;
}

// ---------------------------------------------------------------------------
// Diagnostic Colormaps for Debug Modes 1 - 9
// ---------------------------------------------------------------------------
vec3 infernoColormap(float t) {
  t = clamp(t, 0.0, 1.0);
  const vec3 c0 = vec3(0.02, 0.01, 0.08);
  const vec3 c1 = vec3(0.32, 0.06, 0.43);
  const vec3 c2 = vec3(0.74, 0.22, 0.32);
  const vec3 c3 = vec3(0.98, 0.58, 0.10);
  const vec3 c4 = vec3(0.99, 0.97, 0.64);
  if (t < 0.25) return mix(c0, c1, t * 4.0);
  if (t < 0.50) return mix(c1, c2, (t - 0.25) * 4.0);
  if (t < 0.75) return mix(c2, c3, (t - 0.50) * 4.0);
  return mix(c3, c4, (t - 0.75) * 4.0);
}

vec3 divergingDopplerColormap(float g) {
  // Neutral g = 1.0 -> crisp silver-ivory; g < 1 -> warm amber to crimson; g > 1 -> cyan to electric blue-white
  if (g < 1.0) {
    float s = clamp((1.0 - g) / 0.72, 0.0, 1.0);
    vec3 warmMid = vec3(0.95, 0.45, 0.12);
    vec3 deepRed = vec3(0.35, 0.03, 0.06);
    vec3 base = mix(vec3(0.82, 0.84, 0.80), warmMid, smoothstep(0.0, 0.45, s));
    return mix(base, deepRed, smoothstep(0.45, 1.0, s));
  } else {
    float s = clamp((g - 1.0) / 0.85, 0.0, 1.0);
    vec3 cyanMid = vec3(0.18, 0.72, 1.0);
    vec3 hotBlue = vec3(0.86, 0.96, 1.0);
    vec3 base = mix(vec3(0.82, 0.84, 0.80), cyanMid, smoothstep(0.0, 0.50, s));
    return mix(base, hotBlue, smoothstep(0.50, 1.0, s));
  }
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  float effTanHalfFov = uTanHalfFov * uPortraitBoost;
  vec3 localRayDir = normalize(
    uCamForward
    + ndc.x * uAspect * effTanHalfFov * uCamRight
    + ndc.y * effTanHalfFov * uCamUp
  );

  vec3 pos;
  vec3 vel;
  float bSq;
  float camLapse;
  initSchwarzschildRay(uCamPos, localRayDir, pos, vel, bSq, camLapse);

  float bImpact = sqrt(bSq);
  float minRadius = length(pos);

  vec3 accumRadiance = vec3(0.0);
  float transmittance = 1.0;

  bool capturedByHorizon = false;
  bool escapedToInfinity = false;
  int stepsTaken = 0;

  int diskCrossingCount = 0;
  bool touchedVolumetricOnly = false;
  float primaryHitG = 1.0;
  float primaryHitTemp = 0.0;
  float primaryHitTurb = 0.0;
  float primaryHitR = 0.0;

  for (int stepIdx = 0; stepIdx < MAX_LOOP_STEPS; stepIdx++) {
    if (stepIdx >= uMaxSteps) break;
    stepsTaken = stepIdx + 1;

    vec3 prevPos = pos;
    vec3 prevVel = vel;
    float dt = computeAdaptiveGeodesicStep(prevPos, prevVel, bImpact);

    stepGeodesicRK4(pos, vel, bSq, dt);

    float rPrev = length(prevPos);
    float rCurr = length(pos);
    vec3 segDelta = pos - prevPos;
    float segLenSq = max(dot(segDelta, segDelta), 1e-8);
    float tChordMin = clamp(-dot(prevPos, segDelta) / segLenSq, 0.0, 1.0);
    float rSegMin = length(prevPos + segDelta * tChordMin);
    minRadius = min(minRadius, min(rCurr, rSegMin));

    // Determine if this step reaches or crosses the Schwarzschild event horizon (r <= RS)
    float sLimit = 1.0;
    bool hitHorizonThisStep = false;
    if (rCurr <= RS * 1.002 || rSegMin <= RS * 1.0005) {
      hitHorizonThisStep = true;
      sLimit = clamp((rPrev - RS) / max(rPrev - min(rCurr, rSegMin), 1e-4), 0.0, 1.0);
    }

    // 1. Exact Equatorial Midplane Crossing (y = 0) along curved Hermite geodesic arc
    float y0 = prevPos.y;
    float y1 = pos.y;
    if ((y0 > 0.0 && y1 <= 0.0) || (y0 < 0.0 && y1 >= 0.0)) {
      float sRoot = clamp(abs(y0) / max(abs(y0 - y1), 1e-6), 0.0, 1.0);
      // Refine Hermite y(s) = 0 with two Newton iterations
      for (int nr = 0; nr < 2; nr++) {
        vec3 pEst = hermitePos(prevPos, prevVel, pos, vel, dt, sRoot);
        vec3 vEst = hermiteVel(prevPos, prevVel, pos, vel, dt, sRoot);
        float dyDs = vEst.y * dt;
        if (abs(dyDs) > 1e-6) {
          sRoot = clamp(sRoot - pEst.y / dyDs, 0.0, 1.0);
        }
      }

      if (sRoot <= sLimit) {
        vec3 hitPos = hermitePos(prevPos, prevVel, pos, vel, dt, sRoot);
        vec3 hitVel = hermiteVel(prevPos, prevVel, pos, vel, dt, sRoot);
        float hitCylR = length(hitPos.xz);

        if (hitCylR >= uDiskInner * 0.90 && hitCylR <= uDiskOuter * 1.03 && length(hitPos) > RS * 1.01) {
          float radMask;
          float gVal;
          float tempVal;
          float turbVal;
          vec3 coreEmit;
          evaluateDiskPoint(hitPos, hitVel, camLapse, 0.0, radMask, gVal, tempVal, turbVal, coreEmit);

          if (radMask > 0.01) {
            diskCrossingCount += 1;
            if (diskCrossingCount == 1) {
              primaryHitG = gVal;
              primaryHitTemp = tempVal;
              primaryHitTurb = turbVal;
              primaryHitR = hitCylR;
            }

            // Dense equatorial core sheet optical depth (inversely proportional to grazing angle, smoothly bounded)
            float cosGraze = max(abs(hitVel.y) / max(length(hitVel), 1e-4), 0.14);
            float coreTau = clamp((0.36 * radMask * (0.45 + 0.55 * turbVal)) / cosGraze, 0.0, 2.4);
            float coreAlpha = 1.0 - exp(-coreTau);
            accumRadiance += transmittance * coreEmit * coreAlpha * 0.72;
            transmittance *= (1.0 - coreAlpha);
          }
        }
      }
    }

    // 2. Volumetric Flared Slab Integration (responds directly to uDiskHalfThickness)
    float rCyl0 = length(prevPos.xz);
    float rCyl1 = length(pos.xz);
    float hMax = diskFlaredHalfHeight(max(rCyl0, rCyl1));
    bool nearRadial = max(rCyl0, rCyl1) >= uDiskInner * 0.88 && min(rCyl0, rCyl1) <= uDiskOuter * 1.05;
    bool nearVertical = min(abs(y0), abs(y1)) <= hMax * 1.65 || (y0 * y1 <= 0.0);

    if (nearRadial && nearVertical && sLimit > 0.001 && transmittance > 0.004) {
      float subDs = sLimit / float(uDiskSubSamples);
      float arcStepLen = length(segDelta) * subDs;

      for (int sub = 0; sub < 4; sub++) {
        if (sub >= uDiskSubSamples) break;
        float sMid = (float(sub) + 0.5) * subDs;
        vec3 sPos = hermitePos(prevPos, prevVel, pos, vel, dt, sMid);
        vec3 sVel = hermiteVel(prevPos, prevVel, pos, vel, dt, sMid);
        float sCylR = length(sPos.xz);
        float hLoc = max(diskFlaredHalfHeight(sCylR), 0.012);
        float zeta = abs(sPos.y) / hLoc;

        if (zeta < 1.60 && length(sPos) > RS * 1.015) {
          float radMask;
          float gVal;
          float tempVal;
          float turbVal;
          vec3 volEmit;
          evaluateDiskPoint(sPos, sVel, camLapse, zeta * 0.625, radMask, gVal, tempVal, turbVal, volEmit);

          if (radMask > 0.005) {
            if (zeta < 0.95 && radMask > 0.08 && !touchedVolumetricOnly && diskCrossingCount == 0) {
              touchedVolumetricOnly = true;
              primaryHitG = gVal;
              primaryHitTemp = tempVal;
              primaryHitTurb = turbVal;
              primaryHitR = sCylR;
            }

            float vertProfile = exp(-1.45 * zeta * zeta) * smoothstep(1.60, 0.18, zeta);
            // Density normalized so thicker disks display visible vertical halo & torus volume
            float densityNorm = (0.55 + 1.15 * uDiskHalfThickness) / max(hLoc, 0.035);
            float dTau = radMask * vertProfile * (0.35 + 0.65 * turbVal) * densityNorm * arcStepLen * 0.42;
            float absorb = 1.0 - exp(-dTau);
            accumRadiance += transmittance * volEmit * absorb * 0.68;
            transmittance *= (1.0 - absorb);
          }
        }
      }
    }

    if (hitHorizonThisStep) {
      capturedByHorizon = true;
      break;
    }

    if (rCurr >= R_ESCAPE && dot(pos, vel) > 0.0) {
      escapedToInfinity = true;
      break;
    }

    if (transmittance < 0.0025) {
      // Optical depth saturated; still classify whether ray would plunge into horizon if very close
      if (rCurr < R_PHOTON && dot(pos, vel) < 0.0) {
        capturedByHorizon = true;
      }
      break;
    }
  }

  int effectiveOrder = diskCrossingCount > 0 ? diskCrossingCount : (touchedVolumetricOnly ? 1 : 0);

  // Asymptotic outgoing direction (in Schwarzschild ODE d2x/dlambda2 ~ O(r^-4), so vel at R_ESCAPE=62 is already converged to <1e-5)
  vec3 outDir = normalize(vel);

  vec3 skyColor = capturedByHorizon ? vec3(0.0) : sampleProceduralCosmos(outDir);
  vec3 finalHdr = accumRadiance + transmittance * skyColor;

  // -------------------------------------------------------------------------
  // Render Final HDR (0) or Diagnostic Views (1 - 9)
  // -------------------------------------------------------------------------
  if (uDebugMode == 0) {
    gl_FragColor = vec4(max(finalHdr, vec3(0.0)), 1.0);
    return;
  }

  vec3 diag = vec3(0.0);

  if (uDebugMode == 1) {
    // 1: Ray Steps & Termination Reason
    float stepRatio = float(stepsTaken) / float(max(uMaxSteps, 1));
    vec3 heat = infernoColormap(pow(stepRatio, 0.78));
    if (capturedByHorizon) {
      diag = mix(vec3(0.26, 0.02, 0.05), vec3(0.95, 0.18, 0.22), stepRatio);
    } else if (escapedToInfinity) {
      diag = mix(vec3(0.04, 0.18, 0.34), heat, smoothstep(0.06, 0.75, stepRatio));
    } else {
      // Bound / near-critical winding reaching step cap
      diag = mix(heat, vec3(1.0, 0.92, 0.45), 0.55);
    }
  } else if (uDebugMode == 2) {
    // 2: Event Horizon Mask, Closest Approach & Critical Impact Parameter (b / b_crit)
    if (capturedByHorizon) {
      float edgeGlow = exp(-abs(bImpact - B_CRIT) * 24.0);
      diag = vec3(0.85, 0.12, 0.18) * edgeGlow * 0.65;
    } else {
      float bRatio = bImpact / B_CRIT;
      float contour = 0.5 + 0.5 * cos(bRatio * PI * 8.0);
      float gridLine = smoothstep(0.92, 0.995, contour);
      float critLine = exp(-abs(bImpact - B_CRIT) * 32.0);
      float periNorm = clamp((minRadius - RS) / 10.0, 0.0, 1.0);
      vec3 baseField = mix(vec3(0.92, 0.48, 0.12), vec3(0.06, 0.26, 0.52), sqrt(periNorm));
      diag = baseField * (0.65 + 0.35 * gridLine) + vec3(1.0, 0.95, 0.72) * critLine;
    }
  } else if (uDebugMode == 3) {
    // 3: Disk Crossings & Image Order (Primary n=1, Secondary n=2, Higher-Order n>=3)
    float rGrid = primaryHitR > 0.0 ? (0.78 + 0.22 * cos(primaryHitR * PI * 2.0)) : 1.0;
    if (effectiveOrder == 0) {
      diag = capturedByHorizon ? vec3(0.01, 0.01, 0.015) : vec3(0.04, 0.06, 0.11);
    } else if (effectiveOrder == 1) {
      diag = vec3(0.10, 0.72, 0.95) * rGrid;
    } else if (effectiveOrder == 2) {
      diag = vec3(1.0, 0.68, 0.14) * rGrid;
    } else {
      diag = vec3(1.0, 0.28, 0.82);
    }
  } else if (uDebugMode == 4) {
    // 4: Relativistic Doppler & Gravitational Redshift g-Factor
    if (effectiveOrder > 0) {
      diag = divergingDopplerColormap(primaryHitG);
      float gUnityLine = exp(-abs(primaryHitG - 1.0) * 38.0);
      diag = mix(diag, vec3(1.0), gUnityLine * 0.65);
    } else {
      // Show pure gravitational redshift field sqrt(1 - rs/r_min) in surrounding space
      diag = capturedByHorizon
        ? vec3(0.02, 0.01, 0.02)
        : vec3(0.07, 0.09, 0.14) * sqrt(clamp(1.0 - RS / max(minRadius, RS + 0.01), 0.0, 1.0));
    }
  } else if (uDebugMode == 5) {
    // 5: Intrinsic Disk Temperature & Spiral Turbulence Field
    if (effectiveOrder > 0) {
      vec3 tempCol = infernoColormap(clamp(primaryHitTemp * 0.85, 0.0, 1.0));
      diag = tempCol * clamp(0.30 + 0.75 * primaryHitTurb, 0.0, 1.25);
    } else {
      diag = capturedByHorizon ? vec3(0.0) : vec3(0.025, 0.03, 0.045);
    }
  } else if (uDebugMode == 6) {
    // 6: Lensed Celestial Coordinates & Gravitational Deflection Grid
    if (capturedByHorizon) {
      diag = vec3(0.0);
    } else {
      vec3 worldInitDir = normalize(
        uCamForward
        + ndc.x * uAspect * effTanHalfFov * uCamRight
        + ndc.y * effTanHalfFov * uCamUp
      );
      float deflection = acos(clamp(dot(worldInitDir, outDir), -1.0, 1.0));
      float lon = atan(outDir.z, outDir.x);
      float lat = asin(clamp(outDir.y, -1.0, 1.0));
      float gLon = smoothstep(0.90, 0.99, cos(lon * 12.0));
      float gLat = smoothstep(0.90, 0.99, cos(lat * 12.0));
      float grid = max(gLon, gLat);
      vec3 dirTint = 0.5 + 0.5 * outDir;
      vec3 deflHeat = infernoColormap(clamp(deflection / PI, 0.0, 1.0));
      diag = mix(dirTint * 0.48 + deflHeat * 0.42, vec3(0.96, 0.98, 1.0), grid * 0.82);
    }
  } else if (uDebugMode == 7) {
    // 7: Procedural Lensed Starfield & Milky Way Only (No Disk, Horizon Masked)
    if (capturedByHorizon) {
      diag = vec3(0.0);
    } else {
      vec3 rawSky = sampleProceduralCosmos(outDir) * 2.4;
      diag = rawSky / (1.0 + rawSky);
    }
  } else if (uDebugMode == 8) {
    // 8: Pre-Postprocess Linear HDR Radiance (Log10 Dynamic Range + >1.0 Overbright Contours)
    float lum = dot(finalHdr, vec3(0.2126, 0.7152, 0.0722));
    vec3 logHdr = log2(vec3(1.0) + max(finalHdr, vec3(0.0)) * 2.5) / 3.4;
    float hdrClipContour = smoothstep(0.98, 1.08, lum) * (0.65 + 0.35 * sin(log2(max(lum, 1e-3)) * PI * 4.0));
    diag = mix(clamp(logHdr, 0.0, 1.0), vec3(1.0, 0.92, 0.35), clamp(hdrClipContour * 0.42, 0.0, 0.55));
  } else if (uDebugMode == 9) {
    // 9: Integrated Disk Optical Depth / Opacity (1 - Transmittance)
    float opacity = clamp(1.0 - transmittance, 0.0, 1.0);
    vec3 opColor = infernoColormap(opacity);
    if (capturedByHorizon && opacity < 0.02) {
      diag = vec3(0.0, 0.04, 0.08);
    } else {
      diag = opColor;
    }
  }

  gl_FragColor = vec4(clamp(diag, 0.0, 1.0), 1.0);
}
`;
