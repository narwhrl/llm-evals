export const FULLSCREEN_VERTEX_SHADER = /* glsl */ `
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const SCHWARZSCHILD_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

in vec2 vUv;
out vec4 fragColor;

// Camera & viewport uniforms driven directly by Three.js PerspectiveCamera + OrbitControls
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;
uniform float uAspect;
uniform vec2 uResolution;

// Simulation clock & debug/quality controls
uniform float uTime;
uniform int uDebugMode;
uniform int uMaxSteps;
uniform float uStepScale;
uniform int uDiskSubSamples;
uniform int uFbmOctaves;
uniform int uStarLayers;

// Accretion disk & sky physics uniforms
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfThickness;
uniform float uDiskTemperature;
uniform float uDiskEmission;
uniform float uOrbitalSpeedScale;
uniform float uTurbulenceAmp;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;

// -----------------------------------------------------------------------------
// Schwarzschild Spacetime Constants (Geometric units G = c = 1, M = 0.5)
//   Schwarzschild radius:         r_s     = 2M = 1.0
//   Unstable photon sphere:       r_ph    = 1.5 * r_s = 1.5
//   Critical impact parameter:    b_crit  = (3 * sqrt(3) / 2) * r_s = 2.5980762
//   Event horizon capture cutoff: r_cap   = 1.005 * r_s
// -----------------------------------------------------------------------------
const float PI = 3.14159265359;
const float TWO_PI = 6.28318530718;
const float SQRT_TWO_PI = 2.50662827463;
const float RS = 1.0;
const float R_PHOTON = 1.5;
const float B_CRIT = 2.59807621135;
const float R_CAPTURE = 1.005;
const int HARD_MAX_STEPS = 360;
const int HARD_MAX_DISK_SUBSAMPLES = 8;

// -----------------------------------------------------------------------------
// Deterministic Hash & Value Noise Helpers (Zero Textures)
// -----------------------------------------------------------------------------
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

float valueNoise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));

  float nx00 = mix(n000, n100, u.x);
  float nx10 = mix(n010, n110, u.x);
  float nx01 = mix(n001, n101, u.x);
  float nx11 = mix(n011, n111, u.x);
  float nxy0 = mix(nx00, nx10, u.y);
  float nxy1 = mix(nx01, nx11, u.y);
  return mix(nxy0, nxy1, u.z);
}

float fbm3(vec3 p, int octaves) {
  float value = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    value += amp * valueNoise3(p * freq);
    p = vec3(
      0.80 * p.x + 0.60 * p.z,
      p.y * 1.07 + 0.21,
      -0.60 * p.x + 0.80 * p.z
    );
    freq *= 2.05;
    amp *= 0.5;
  }
  return value;
}

// -----------------------------------------------------------------------------
// Physically Motivated Planckian Blackbody Chromaticity -> Linear HDR RGB
// -----------------------------------------------------------------------------
vec3 blackbodyChromaticity(float kelvin) {
  float t = clamp(kelvin, 800.0, 28000.0) * 0.01;
  float r, g, b;

  if (t <= 66.0) {
    r = 1.0;
    g = clamp(0.390081578769 * log(max(t, 1.0)) - 0.631841443788, 0.0, 1.0);
    if (t <= 19.0) {
      b = 0.0;
    } else {
      b = clamp(0.54320678911 * log(t - 10.0) - 1.19625408914, 0.0, 1.0);
    }
  } else {
    float tt = t - 60.0;
    r = clamp(1.29293618606 * pow(tt, -0.1332047592), 0.0, 1.0);
    g = clamp(1.12989086089 * pow(tt, -0.0755148492), 0.0, 1.0);
    b = 1.0;
  }

  // Convert chromaticity to rich linear light space (preserves fiery orange-gold saturation under ACES)
  vec3 c = pow(max(vec3(r, g, b), vec3(0.0)), vec3(2.35));
  float deepRed = smoothstep(800.0, 2100.0, kelvin);
  c = mix(vec3(0.90, 0.055, 0.005), c, deepRed);
  return c;
}

// -----------------------------------------------------------------------------
// Scientific Colormaps for Diagnostic Debug Modes (1..9)
// -----------------------------------------------------------------------------
vec3 colormapTurbo(float x) {
  x = clamp(x, 0.0, 1.0);
  const vec4 kRed = vec4(0.13572138, 4.61539260, -42.66032258, 132.13108234);
  const vec4 kGreen = vec4(0.09140261, 2.19418839, 4.84296658, -14.18503333);
  const vec4 kBlue = vec4(0.10667330, 12.64194608, -60.58204836, 110.36276771);
  const vec2 kRed2 = vec2(-152.94239396, 59.28637943);
  const vec2 kGreen2 = vec2(4.27729857, 2.82956604);
  const vec2 kBlue2 = vec2(-89.90310912, 27.34824973);

  vec4 v4 = vec4(1.0, x, x * x, x * x * x);
  vec2 v2 = v4.zw * v4.z;
  return clamp(
    vec3(
      dot(v4, kRed) + dot(v2, kRed2),
      dot(v4, kGreen) + dot(v2, kGreen2),
      dot(v4, kBlue) + dot(v2, kBlue2)
    ),
    0.0,
    1.0
  );
}

vec3 colormapDivergingRedshift(float g) {
  // g > 1: blueshift (cyan -> electric blue); g == 1: neutral white; g < 1: redshift (amber -> crimson)
  float logG = clamp(log2(max(g, 0.08)) * 0.92, -1.0, 1.0);
  vec3 redEnd = vec3(0.84, 0.07, 0.03);
  vec3 orangeMid = vec3(1.0, 0.48, 0.10);
  vec3 neutral = vec3(0.95, 0.96, 0.98);
  vec3 cyanMid = vec3(0.24, 0.78, 1.0);
  vec3 blueEnd = vec3(0.08, 0.28, 0.96);

  if (logG < 0.0) {
    float t = -logG;
    return t < 0.5 ? mix(neutral, orangeMid, t * 2.0) : mix(orangeMid, redEnd, (t - 0.5) * 2.0);
  }
  return logG < 0.5
    ? mix(neutral, cyanMid, logG * 2.0)
    : mix(cyanMid, blueEnd, (logG - 0.5) * 2.0);
}

// -----------------------------------------------------------------------------
// Schwarzschild Null-Geodesic State, Equations of Motion & RK4 Integrator
//
// Coordinates:
//   3D Euclidean-mapped Schwarzschild coordinates x = r * (sin(theta)cos(phi), cos(theta), sin(theta)sin(phi))
//   with affine-scaled parameter lambda and velocity v = dx/dlambda.
//
// Derivation:
//   From Schwarzschild null geodesic Binet equation d^2u/dphi^2 + u = (3/2) r_s u^2 (u = 1/r),
//   with conserved angular momentum h = |x x v| = L and static-tetrad energy E = sqrt(1 - r_s/r0):
//       d^2x / dlambda^2 = -1.5 * r_s * h^2 * x / |x|^5
//   This vector ODE preserves |x x v| = h and the exact null first integral
//       (dr/dlambda)^2 + (1 - r_s/r) * h^2 / r^2 = E^2
//   smoothly across all impact parameters including pure radial rays (h = 0).
// -----------------------------------------------------------------------------
struct GeodesicRay {
  vec3 pos;
  vec3 vel;
  float h;
  float h2;
  float energy;
  float impactB;
};

GeodesicRay initSchwarzschildRay(vec3 camPos, vec3 localUnitDir) {
  float r0 = max(length(camPos), RS * 1.05);
  vec3 rHat = camPos / r0;
  float lapse0 = sqrt(max(1.0 - RS / r0, 1e-4));

  // Transform camera local orthonormal tetrad ray direction into coordinate velocity dx/dlambda
  float dRadial = dot(localUnitDir, rHat);
  vec3 dTangential = localUnitDir - dRadial * rHat;
  vec3 vel0 = lapse0 * dRadial * rHat + dTangential;

  vec3 Lvec = cross(camPos, vel0);
  float h2 = dot(Lvec, Lvec);
  float h = sqrt(h2);

  GeodesicRay ray;
  ray.pos = camPos;
  ray.vel = vel0;
  ray.h = h;
  ray.h2 = h2;
  ray.energy = lapse0;
  ray.impactB = h / max(lapse0, 1e-4);
  return ray;
}

vec3 geodesicAccel(vec3 p, float h2) {
  float r2 = dot(p, p);
  float invR = inversesqrt(max(r2, 1e-6));
  float invR5 = invR * invR * invR * invR * invR;
  return (-1.5 * RS * h2 * invR5) * p;
}

void stepGeodesicRK4(inout vec3 p, inout vec3 v, float h2, float dt) {
  vec3 k1p = v;
  vec3 k1v = geodesicAccel(p, h2);

  vec3 p2 = p + 0.5 * dt * k1p;
  vec3 v2 = v + 0.5 * dt * k1v;
  vec3 k2p = v2;
  vec3 k2v = geodesicAccel(p2, h2);

  vec3 p3 = p + 0.5 * dt * k2p;
  vec3 v3 = v + 0.5 * dt * k2v;
  vec3 k3p = v3;
  vec3 k3v = geodesicAccel(p3, h2);

  vec3 p4 = p + dt * k3p;
  vec3 v4 = v + dt * k3v;
  vec3 k4p = v4;
  vec3 k4v = geodesicAccel(p4, h2);

  p += (dt / 6.0) * (k1p + 2.0 * k2p + 2.0 * k3p + k4p);
  v += (dt / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
}

float computeAdaptiveStep(vec3 p, vec3 v, float r, float h, float diskEnvH) {
  float speed = max(length(v), 1e-4);
  // Angular-curvature bound keeps photon-sphere & near-horizon orbits tightly sampled
  float dtAngle = uStepScale * (r * r) / max(h, 0.36 * r);
  // Radial horizon-approach bound smoothly shrinks step near r = r_s
  float dtRadial = uStepScale * max(r - 0.88 * RS, 0.11) * 2.15 / speed;
  float dt = min(dtAngle, dtRadial);

  // Refine step near the unstable photon sphere (r ~ 1.5 r_s) for crisp higher-order subrings
  if (r < 1.95) {
    dt *= 0.78;
  }

  // Refine step inside the equatorial accretion-disk envelope for crisp turbulent filaments
  if (abs(p.y) < max(diskEnvH * 3.0, 0.55) && r >= uDiskInner - 1.0 && r <= uDiskOuter + 1.2) {
    float diskStepCap = max(0.28, diskEnvH * 2.1) / speed;
    dt = min(dt, diskStepCap);
  }

  return clamp(dt, 0.011, 3.8);
}

// Cubic Hermite interpolation along an RK4 curved geodesic step
vec3 hermitePos(vec3 p0, vec3 v0, vec3 p1, vec3 v1, float dt, float t) {
  float t2 = t * t;
  float t3 = t2 * t;
  float h00 = 2.0 * t3 - 3.0 * t2 + 1.0;
  float h10 = t3 - 2.0 * t2 + t;
  float h01 = -2.0 * t3 + 3.0 * t2;
  float h11 = t3 - t2;
  return h00 * p0 + h10 * (dt * v0) + h01 * p1 + h11 * (dt * v1);
}

vec3 hermiteVel(vec3 p0, vec3 v0, vec3 p1, vec3 v1, float dt, float t) {
  float t2 = t * t;
  float dh00 = 6.0 * t2 - 6.0 * t;
  float dh10 = 3.0 * t2 - 4.0 * t + 1.0;
  float dh01 = -6.0 * t2 + 6.0 * t;
  float dh11 = 3.0 * t2 - 2.0 * t;
  return (dh00 * p0 + dh01 * p1) / max(dt, 1e-5) + dh10 * v0 + dh11 * v1;
}

float refineEquatorialCrossing(vec3 p0, vec3 v0, vec3 p1, vec3 v1, float dt) {
  float denom = abs(p0.y) + abs(p1.y);
  float t = denom > 1e-6 ? abs(p0.y) / denom : 0.5;
  for (int i = 0; i < 2; i++) {
    float t2 = t * t;
    float t3 = t2 * t;
    float yVal =
      (2.0 * t3 - 3.0 * t2 + 1.0) * p0.y +
      (t3 - 2.0 * t2 + t) * (dt * v0.y) +
      (-2.0 * t3 + 3.0 * t2) * p1.y +
      (t3 - t2) * (dt * v1.y);
    float dyVal =
      (6.0 * t2 - 6.0 * t) * p0.y +
      (3.0 * t2 - 4.0 * t + 1.0) * (dt * v0.y) +
      (-6.0 * t2 + 6.0 * t) * p1.y +
      (3.0 * t2 - 2.0 * t) * (dt * v1.y);
    if (abs(dyVal) > 1e-5) {
      t = clamp(t - yVal / dyVal, 0.0, 1.0);
    }
  }
  return t;
}

// -----------------------------------------------------------------------------
// Accretion Disk Physics: Differential Keplerian Turbulence, Relativistic Shift
// -----------------------------------------------------------------------------
struct DiskSample {
  vec3 emission;
  vec3 restEmission;
  float opticalDepth;
  float gFactor;
  float dopplerFactor;
  float gravFactor;
};

vec2 sampleDiskTurbulence(vec3 pos, float rho, float rNorm) {
  float phi = atan(pos.z, pos.x);
  float logR = log(max(rho / max(uDiskInner, 0.5), 0.1));

  // Keplerian angular frequency Omega(r) = sqrt(M / r^3), M = 0.5
  float omega = sqrt(0.5 / max(rho * rho * rho, 0.5));
  float shearRate = clamp(omega * 4.8 * max(0.3, uOrbitalSpeedScale), 0.05, 1.95);
  float tAdv = uTime * uTurbulenceSpeed;

  // Dual-phase flow advection prevents infinite spiral wind-up while keeping smooth Keplerian shear
  float cycle = tAdv * 0.08;
  float ph0 = fract(cycle);
  float ph1 = fract(cycle + 0.5);
  float blendW = abs(2.0 * ph0 - 1.0);

  float spiralTwist = 5.4 * logR;
  float a0 = phi - shearRate * (ph0 - 0.5) * 11.0 + spiralTwist;
  float a1 = phi - shearRate * (ph1 - 0.5) * 11.0 + spiralTwist;

  vec3 q0 = vec3(cos(a0) * 2.4, sin(a0) * 2.4, logR * 5.6 + pos.y * 1.8);
  vec3 q1 = vec3(cos(a1) * 2.4, sin(a1) * 2.4, logR * 5.6 + pos.y * 1.8 + 4.3);

  float n0 = fbm3(q0, uFbmOctaves);
  float n1 = fbm3(q1, uFbmOctaves);
  float shearedFbm = mix(n0, n1, blendW);

  // High-contrast sheared Keplerian plasma bands + fine concentric filaments
  float ringPhase = logR * 34.0 + shearedFbm * 5.2 - tAdv * 0.55;
  float fineRings = pow(0.5 + 0.5 * sin(ringPhase), 1.6);
  float midRings = 0.5 + 0.5 * sin(logR * 15.0 + 2.0 * phi - tAdv * 0.48 * max(0.35, uOrbitalSpeedScale) + shearedFbm * 2.2);
  float filament = clamp(0.48 * shearedFbm + 0.30 * fineRings + 0.22 * midRings, 0.0, 1.0);

  // Sculpt sharp bright plasma streaks & darker translucent shear lanes
  float shaped = smoothstep(0.18, 0.86, filament);
  float densityMod = mix(0.68, clamp(0.14 + 1.55 * shaped * shaped, 0.06, 1.85), clamp(uTurbulenceAmp, 0.0, 1.5));
  float hotStreak = mix(0.5, shaped, clamp(uTurbulenceAmp, 0.0, 1.5));
  return vec2(densityMod, hotStreak);
}

DiskSample evaluateDiskSample(vec3 p, vec3 rayVel, float rayEnergy, float camLapse, float ds, bool restFrameOnly) {
  DiskSample outS;
  outS.emission = vec3(0.0);
  outS.restEmission = vec3(0.0);
  outS.opticalDepth = 0.0;
  outS.gFactor = 1.0;
  outS.dopplerFactor = 1.0;
  outS.gravFactor = 1.0;

  float rho = length(p.xz);
  if (rho < uDiskInner - 0.06 || rho > uDiskOuter + 0.12) {
    return outS;
  }

  float diskSpan = max(uDiskOuter - uDiskInner, 0.5);
  float rNorm = clamp((rho - uDiskInner) / diskSpan, 0.0, 1.0);

  // Crisp luminous ISCO inner rim and graceful exponential outer taper
  float innerFade = smoothstep(uDiskInner - 0.04, uDiskInner + min(0.28, diskSpan * 0.1), rho);
  float outerFade = pow(1.0 - smoothstep(uDiskOuter * 0.42, uDiskOuter, rho), 1.85);
  float radialDensity = innerFade * outerFade;
  if (radialDensity <= 1e-4) {
    return outS;
  }

  // Local vertical half-thickness profile (thin near ISCO, gentle flare outward)
  float hLocal = uDiskHalfThickness *
    (0.36 + 0.64 * smoothstep(uDiskInner, uDiskInner + min(2.2, diskSpan * 0.35), rho)) *
    (1.0 + 0.22 * rNorm);
  hLocal = max(hLocal, 0.014);

  float zRatio = p.y / hLocal;
  float vertGauss = exp(-0.5 * zRatio * zRatio);
  if (vertGauss <= 1e-4) {
    return outS;
  }

  vec2 turbData = sampleDiskTurbulence(p, rho, rNorm);
  float turbDensity = turbData.x;
  float hotStreak = turbData.y;

  // Normalized vertical optical depth so thin & thick disks stay energy-consistent & semi-translucent
  float verticalNormDensity = vertGauss / (SQRT_TWO_PI * hLocal);
  float baseOpacity = (0.34 + 0.58 * pow(1.0 - rNorm, 1.35)) * turbDensity;
  float dTau = clamp(verticalNormDensity * radialDensity * baseOpacity * ds, 0.0, 2.2);

  // Relativistic Keplerian kinematics in local static Schwarzschild tetrad:
  //   v_orb = sqrt(r_s / (2 * (r - r_s))) * uOrbitalSpeedScale
  float rSph = max(length(p), RS * 1.04);
  float lapseEmit = sqrt(max(1.0 - RS / rSph, 1e-4));
  float beta = clamp(
    uOrbitalSpeedScale * sqrt(RS / (2.0 * max(rSph - RS, 0.08 * RS))),
    0.0,
    0.85
  );
  float gammaLorentz = inversesqrt(max(1.0 - beta * beta, 0.04));

  // Prograde tangent unit vector (left side approaches default +Z camera -> blueshifted & beamed)
  vec3 tangentOrb = vec3(p.z, 0.0, -p.x) / max(rho, 1e-4);

  // Physical photon moves from disk to camera (-rayVel).
  // Exact local static-frame cosine between physical photon direction and orbital velocity:
  float cosThetaEmit = clamp(-(lapseEmit / max(rayEnergy, 1e-4)) * dot(rayVel, tangentOrb), -1.0, 1.0);

  // Relativistic Doppler factor D and exact gravitational redshift factor g_grav
  float doppler = 1.0 / max(gammaLorentz * (1.0 - beta * cosThetaEmit), 0.15);
  float gravRedshift = lapseEmit / max(camLapse, 1e-4);
  float g = clamp(gravRedshift * doppler, 0.15, 3.2);

  // Radial rest-frame thermal profile (hot inner ISCO rim -> golden mid-disk -> deep ember outer wisps)
  float rRatio = uDiskInner / max(rho, uDiskInner);
  float radialTempCurve = pow(rRatio, 0.72) * (0.82 + 0.18 * smoothstep(uDiskInner, uDiskInner + 0.7, rho));
  float restTemp = uDiskTemperature * radialTempCurve * (0.72 + 0.54 * hotStreak);

  // Inner hot plasma core emissivity with crisp luminous ring highlights
  float innerRimBoost = 1.0 + 0.95 * exp(-pow((rho - (uDiskInner + 0.35)) / 0.65, 2.0));
  float radialEmissivity =
    (0.16 + 1.55 * pow(rRatio, 1.55)) *
    innerRimBoost *
    (0.28 + 1.05 * turbDensity) *
    radialDensity;

  vec3 restColor = blackbodyChromaticity(restTemp) * radialEmissivity * uDiskEmission;

  // Observed blackbody color temperature T_obs = g * T_emit and relativistic beaming ~ g^2.9
  vec3 obsColor = restColor;
  if (!restFrameOnly) {
    float obsTemp = clamp(restTemp * g, 850.0, 24000.0);
    float beaming = pow(g, 2.9);
    obsColor = blackbodyChromaticity(obsTemp) * radialEmissivity * uDiskEmission * beaming;
  }

  outS.emission = obsColor;
  outS.restEmission = restColor;
  outS.opticalDepth = dTau;
  outS.gFactor = g;
  outS.dopplerFactor = doppler;
  outS.gravFactor = gravRedshift;
  return outS;
}

// -----------------------------------------------------------------------------
// Procedural Lensed Celestial Sphere: Flux-Conserving Stars + Milky Way
// -----------------------------------------------------------------------------
void dirToCubeFace(vec3 dir, out int faceId, out vec2 uv) {
  vec3 a = abs(dir);
  if (a.x >= a.y && a.x >= a.z) {
    if (dir.x > 0.0) {
      faceId = 0;
      uv = vec2(-dir.z, dir.y) / a.x;
    } else {
      faceId = 1;
      uv = vec2(dir.z, dir.y) / a.x;
    }
  } else if (a.y >= a.x && a.y >= a.z) {
    if (dir.y > 0.0) {
      faceId = 2;
      uv = vec2(dir.x, -dir.z) / a.y;
    } else {
      faceId = 3;
      uv = vec2(dir.x, dir.z) / a.y;
    }
  } else {
    if (dir.z > 0.0) {
      faceId = 4;
      uv = vec2(dir.x, dir.y) / a.z;
    } else {
      faceId = 5;
      uv = vec2(-dir.x, dir.y) / a.z;
    }
  }
}

vec3 cubeFaceToDir(int faceId, vec2 uv) {
  if (faceId == 0) return normalize(vec3(1.0, uv.y, -uv.x));
  if (faceId == 1) return normalize(vec3(-1.0, uv.y, uv.x));
  if (faceId == 2) return normalize(vec3(uv.x, 1.0, -uv.y));
  if (faceId == 3) return normalize(vec3(uv.x, -1.0, uv.y));
  if (faceId == 4) return normalize(vec3(uv.x, uv.y, 1.0));
  return normalize(vec3(-uv.x, uv.y, -1.0));
}

vec3 sampleStarLayer(
  vec3 dir,
  int faceId,
  vec2 faceUv,
  float gridScale,
  float layerSeed,
  float pixelAng,
  float densityFactor,
  float baseRadius,
  float brightnessBoost
) {
  // Nyquist lensing fade: when extreme photon-sphere curvature compresses many cells into 1 pixel,
  // individual stars smoothly fade out instead of aliasing into noisy confetti.
  float cellAng = 1.65 / gridScale;
  float nyquistFade = smoothstep(cellAng * 0.55, cellAng * 0.14, pixelAng);
  if (nyquistFade <= 0.002) return vec3(0.0);

  vec2 p = (faceUv * 0.5 + 0.5) * gridScale;
  vec2 cell = floor(p);
  vec3 acc = vec3(0.0);

  for (int oy = -1; oy <= 1; oy++) {
    for (int ox = -1; ox <= 1; ox++) {
      vec2 neighbor = cell + vec2(float(ox), float(oy));
      if (neighbor.x < 0.0 || neighbor.y < 0.0 || neighbor.x >= gridScale || neighbor.y >= gridScale) {
        continue;
      }

      vec3 h1 = hash33(vec3(neighbor, float(faceId) * 19.3 + layerSeed * 71.7));
      vec3 h2 = hash33(vec3(neighbor + 13.7, float(faceId) * 31.1 + layerSeed * 43.3));

      float threshold = clamp(0.24 * densityFactor, 0.0, 0.90);
      if (h1.z > threshold) continue;

      vec2 jitter = mix(vec2(0.18), vec2(0.82), h1.xy);
      vec2 starFaceUv = ((neighbor + jitter) / gridScale) * 2.0 - 1.0;
      vec3 starDir = cubeFaceToDir(faceId, starFaceUv);

      // True 3D angular distance on unit sphere -> stretches organically into curved Einstein arcs
      float ang = length(dir - starDir);
      float rawRadius = baseRadius * (0.65 + 0.75 * h2.x);
      float radius = max(rawRadius, pixelAng * 0.55);
      float core = exp(-0.5 * (ang / radius) * (ang / radius));

      if (core > 0.002) {
        // 2D solid-angle flux conservation (rawRadius / radius)^2 eliminates sub-pixel star blowup
        float fluxRatio = rawRadius / max(radius, 1e-5);
        float fluxConserv = fluxRatio * fluxRatio;
        float mag = pow(h2.y, 3.6);
        float lum = (0.14 + 4.2 * mag) * brightnessBoost * fluxConserv * nyquistFade;
        float starTemp = mix(3300.0, 17500.0, pow(h2.z, 1.5));
        vec3 starCol = blackbodyChromaticity(starTemp);
        float halo = mag > 0.68 ? 0.12 * exp(-ang / max(radius * 3.4, 0.003)) : 0.0;
        acc += starCol * (core * lum + halo * lum * 0.35);
      }
    }
  }
  return acc;
}

vec3 sampleProceduralCosmos(vec3 dir, float pixelAng) {
  // Tilted galactic reference frame so the Milky Way sweeps dramatically diagonally behind Gargantua
  vec3 galNorth = normalize(vec3(0.26, 0.80, -0.54));
  vec3 galCenter = normalize(cross(vec3(0.0, 1.0, 0.0), galNorth));
  vec3 galRight = cross(galNorth, galCenter);

  float galLat = dot(dir, galNorth);
  float galLonX = dot(dir, galCenter);
  float galLonY = dot(dir, galRight);
  float centerFacing = 0.5 + 0.5 * galLonX;

  vec3 galCoord = vec3(galLonX, galLat * 2.9, galLonY);
  float cloudMacro = fbm3(galCoord * 2.9 + vec3(4.1, -1.7, 2.3), uFbmOctaves);
  float cloudFine = fbm3(galCoord * 7.8 + vec3(-3.2, 5.4, 1.1), max(uFbmOctaves - 1, 2));
  float dustWarp = fbm3(galCoord * 4.8 + vec3(1.8, 2.9, -4.4), max(uFbmOctaves - 1, 2));

  float bandBroad = exp(-abs(galLat) * 6.8);
  float bandCore = exp(-galLat * galLat * 54.0);
  float bulge = exp(-(galLat * galLat * 18.0 + galLonY * galLonY * 3.2)) * pow(centerFacing, 1.8);

  // Dark absorbing Great Rift dust lane along the galactic midplane
  float riftMask = exp(-pow((galLat + (dustWarp - 0.5) * 0.10) * 18.0, 2.0));
  float dustExtinction = 1.0 - clamp(riftMask * (0.50 + 0.50 * cloudFine), 0.0, 0.90);

  vec3 outerArmCol = vec3(0.055, 0.095, 0.21);
  vec3 warmCoreCol = vec3(0.46, 0.32, 0.19);
  vec3 nebulaTint = vec3(0.24, 0.12, 0.22);

  vec3 milkyWay =
    outerArmCol * bandBroad * (0.35 + 0.85 * cloudMacro) +
    warmCoreCol * (bandCore * 0.45 + bulge * 1.05) * (0.50 + 0.78 * cloudFine) +
    nebulaTint * bandCore * smoothstep(0.54, 0.86, cloudMacro) * 0.36;

  // Deep velvety cosmic background so bright stars and disk pop cleanly
  vec3 deepSpace = vec3(0.0008, 0.0012, 0.0024) + vec3(0.0018, 0.0026, 0.0048) * bandBroad;
  vec3 sky = deepSpace + milkyWay * dustExtinction * uGalaxyBrightness * 0.48;

  // Procedural flux-conserving anti-aliased multi-layer starfield
  if (uStarDensity > 0.001) {
    int faceId;
    vec2 faceUv;
    dirToCubeFace(dir, faceId, faceUv);
    float galBoost = 1.0 + 1.45 * bandBroad * dustExtinction;
    float dBase = uStarDensity * galBoost;

    vec3 stars = vec3(0.0);
    if (uStarLayers >= 1) {
      stars += sampleStarLayer(dir, faceId, faceUv, 26.0, 1.0, pixelAng, dBase * 0.72, 0.00125, 1.75);
    }
    if (uStarLayers >= 2) {
      stars += sampleStarLayer(dir, faceId, faceUv, 62.0, 2.0, pixelAng, dBase * 1.00, 0.00088, 1.15);
    }
    if (uStarLayers >= 3) {
      stars += sampleStarLayer(dir, faceId, faceUv, 130.0, 3.0, pixelAng, dBase * 1.22, 0.00062, 0.75);
    }
    if (uStarLayers >= 4) {
      stars += sampleStarLayer(dir, faceId, faceUv, 220.0, 4.0, pixelAng, dBase * 1.38, 0.00048, 0.48);
    }
    sky += stars;
  }

  return sky;
}

// -----------------------------------------------------------------------------
// Diagnostic View Builders (Debug Modes 1..9)
// -----------------------------------------------------------------------------
vec3 renderDebugView(
  int mode,
  vec3 finalHdr,
  vec3 skyOnly,
  vec3 restDiskOnly,
  vec3 initialDir,
  vec3 escapeDir,
  float impactB,
  float minR,
  int stepsTaken,
  int termCode,
  int diskCrossings,
  float weightedG,
  float gWeightSum,
  float totalAngle,
  float firstCrossR
) {
  float stepFrac = float(stepsTaken) / float(max(uMaxSteps, 1));

  // Mode 1: Ray integration steps & termination state (calibrated log-stretch across step range)
  if (mode == 1) {
    float stretched = clamp(log2(1.0 + stepFrac * 15.0) / 4.0, 0.0, 1.0);
    // Remap around typical escape step band so outer sky is deep blue and photon ring blazes yellow
    float heat = clamp((stretched - 0.36) / 0.64, 0.0, 1.0);
    vec3 col = colormapTurbo(heat);
    if (termCode == 1) {
      col = mix(vec3(0.42, 0.02, 0.04), vec3(1.0, 0.16, 0.12), clamp(stepFrac * 1.6, 0.0, 1.0));
    } else if (termCode == 2) {
      col = vec3(1.0, 0.98, 0.90);
    }
    return col;
  }

  // Mode 2: Event horizon capture mask, critical impact parameter & photon-sphere contours
  if (mode == 2) {
    if (termCode == 1) {
      float innerShade = smoothstep(0.0, B_CRIT, impactB);
      return mix(vec3(0.03, 0.01, 0.02), vec3(0.48, 0.04, 0.08), innerShade * innerShade);
    }
    float bRatio = impactB / B_CRIT;
    float photonBand = exp(-pow((bRatio - 1.0) / 0.045, 2.0));
    float contourB = smoothstep(0.92, 0.99, abs(sin(bRatio * PI * 3.0)));
    float minRHeat = smoothstep(4.5, R_PHOTON, minR);
    vec3 base = mix(vec3(0.08, 0.12, 0.18), vec3(0.14, 0.62, 0.78), minRHeat);
    base += vec3(0.16, 0.24, 0.30) * contourB * 0.65;
    base = mix(base, vec3(1.0, 0.86, 0.28), photonBand);
    if (termCode == 2) base = vec3(1.0, 0.96, 0.75);
    return base;
  }

  // Mode 3: Curved-path disk crossings & image order (0, 1st, 2nd, 3rd+ photon ring orders)
  if (mode == 3) {
    if (diskCrossings == 0) {
      return termCode == 1 ? vec3(0.02, 0.02, 0.03) : vec3(0.05, 0.07, 0.13);
    }
    float rGrid = 0.78 + 0.22 * smoothstep(0.84, 0.96, abs(sin(firstCrossR * PI)));
    if (diskCrossings == 1) return vec3(0.12, 0.76, 0.88) * rGrid;
    if (diskCrossings == 2) return vec3(0.98, 0.74, 0.16) * rGrid;
    if (diskCrossings == 3) return vec3(0.96, 0.22, 0.76);
    return vec3(1.0, 0.96, 0.98);
  }

  // Mode 4: Relativistic frequency shift g = g_grav * D (Doppler + Gravitational Redshift)
  if (mode == 4) {
    if (gWeightSum <= 1e-4) {
      if (termCode == 1) return vec3(0.02, 0.02, 0.03);
      float gravRing = exp(-pow((minR - R_PHOTON) * 1.4, 2.0));
      return vec3(0.04, 0.05, 0.09) + vec3(0.18, 0.12, 0.22) * gravRing;
    }
    float avgG = weightedG / gWeightSum;
    vec3 col = colormapDivergingRedshift(avgG);
    float isoOne = exp(-pow((avgG - 1.0) * 18.0, 2.0));
    col = mix(col, vec3(1.0), isoOne * 0.45);
    return col;
  }

  // Mode 5: Total gravitational deflection & winding angle
  if (mode == 5) {
    if (termCode == 1) {
      return vec3(0.02, 0.015, 0.025) + vec3(0.25, 0.05, 0.12) * clamp(totalAngle / TWO_PI, 0.0, 1.0);
    }
    float defl = acos(clamp(dot(normalize(initialDir), normalize(escapeDir)), -1.0, 1.0));
    float metric = clamp((defl + max(totalAngle - PI, 0.0)) / (1.8 * PI), 0.0, 1.0);
    vec3 col = colormapTurbo(pow(metric, 0.72));
    float einsteinBand = exp(-pow((totalAngle - PI) * 4.5, 2.0));
    return mix(col, vec3(1.0, 1.0, 1.0), einsteinBand * 0.35);
  }

  // Mode 6: Lensed background celestial coordinates (lat/lon grid + direction RGB)
  if (mode == 6) {
    if (termCode == 1) return vec3(0.015, 0.015, 0.02);
    vec3 d = normalize(escapeDir);
    float lon = atan(d.z, d.x);
    float lat = asin(clamp(d.y, -1.0, 1.0));
    vec2 gridCoord = vec2(lon / PI * 12.0, lat / (0.5 * PI) * 6.0);
    vec2 cell = floor(gridCoord);
    float checker = mod(cell.x + cell.y, 2.0);
    vec2 f = abs(fract(gridCoord) - 0.5);
    float line = 1.0 - smoothstep(0.42, 0.48, max(f.x, f.y));
    float equator = exp(-abs(lat) * 28.0);
    vec3 dirRgb = 0.5 + 0.5 * d;
    vec3 col = dirRgb * (0.45 + 0.35 * checker);
    col = mix(col, vec3(0.95, 0.97, 1.0), line * 0.45);
    col = mix(col, vec3(1.0, 0.78, 0.25), equator * 0.65);
    return col;
  }

  // Mode 7: Procedural lensed starfield & Milky Way isolation (no accretion disk)
  if (mode == 7) {
    if (termCode == 1) return vec3(0.0);
    vec3 mapped = skyOnly / (vec3(1.0) + skyOnly * 0.55);
    return pow(clamp(mapped * 1.55, 0.0, 1.0), vec3(1.0 / 2.2));
  }

  // Mode 8: Accretion disk rest-frame emission & turbulence (no Doppler/redshift, no sky)
  if (mode == 8) {
    vec3 mapped = restDiskOnly / (vec3(1.0) + restDiskOnly * 0.70);
    return pow(clamp(mapped, 0.0, 1.0), vec3(1.0 / 2.2));
  }

  // Mode 9: Pre-post-process linear HDR radiance false-color EV bands
  float luma = dot(max(finalHdr, vec3(0.0)), vec3(0.2126, 0.7152, 0.0722));
  if (luma <= 1e-5) return vec3(0.008, 0.010, 0.016);
  if (luma < 1.0) {
    float g = pow(luma, 0.55);
    return vec3(g * 0.62, g * 0.70, g * 0.84);
  }
  if (luma < 2.0) return mix(vec3(0.10, 0.72, 0.34), vec3(0.55, 0.92, 0.20), luma - 1.0);
  if (luma < 4.0) return mix(vec3(0.92, 0.92, 0.14), vec3(1.0, 0.54, 0.08), (luma - 2.0) * 0.5);
  if (luma < 8.0) return mix(vec3(1.0, 0.42, 0.08), vec3(0.98, 0.14, 0.52), (luma - 4.0) * 0.25);
  return mix(vec3(0.98, 0.14, 0.78), vec3(1.0, 0.96, 1.0), clamp((luma - 8.0) / 12.0, 0.0, 1.0));
}

// -----------------------------------------------------------------------------
// Main Full-Screen Schwarzschild Null-Geodesic Raymarcher
// -----------------------------------------------------------------------------
void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 initialDir = normalize(
    uCamForward +
    uCamRight * (ndc.x * uAspect * uTanHalfFov) +
    uCamUp * (ndc.y * uTanHalfFov)
  );

  GeodesicRay ray = initSchwarzschildRay(uCamPos, initialDir);
  vec3 pos = ray.pos;
  vec3 vel = ray.vel;
  float r0 = length(pos);
  float escapeRadius = max(92.0, r0 + 52.0);
  float diskEnvH = max(uDiskHalfThickness * 2.5, 0.055);

  // Ordered front-to-back radiative transfer accumulators
  vec3 accumRadiance = vec3(0.0);
  vec3 accumRestRadiance = vec3(0.0);
  float transmittance = 1.0;
  float restTransmittance = 1.0;

  // Geodesic & disk diagnostics for debug modes 1..9
  int stepsTaken = 0;
  int termCode = 2; // 0 = escaped to infinity, 1 = captured by event horizon, 2 = step limit
  int diskCrossings = 0;
  float minR = r0;
  float totalAngle = 0.0;
  float weightedG = 0.0;
  float gWeightSum = 0.0;
  float firstCrossR = uDiskInner;

  bool evaluateDisk = (uDebugMode != 7);
  bool restOnlyMode = (uDebugMode == 8);

  for (int stepIdx = 0; stepIdx < HARD_MAX_STEPS; stepIdx++) {
    if (stepIdx >= uMaxSteps) break;
    stepsTaken = stepIdx + 1;

    float r = length(pos);
    minR = min(minR, r);

    // Event horizon termination: interior emits zero radiation
    if (r <= R_CAPTURE) {
      termCode = 1;
      break;
    }

    // Asymptotic infinity escape condition (must be outside escape sphere and moving outward)
    if (r >= escapeRadius && dot(pos, vel) > 0.0) {
      termCode = 0;
      break;
    }

    float dt = computeAdaptiveStep(pos, vel, r, ray.h, diskEnvH);

    vec3 p0 = pos;
    vec3 v0 = vel;
    stepGeodesicRK4(pos, vel, ray.h2, dt);

    // Track cumulative orbital winding angle around black hole
    float r1 = length(pos);
    minR = min(minR, r1);
    float cosStep = clamp(dot(p0, pos) / max(r * r1, 1e-5), -1.0, 1.0);
    totalAngle += acos(cosStep);

    // Check if the curved RK4 segment crossed or passed through the accretion disk slab
    bool crossedPlane = (p0.y > 0.0 && pos.y <= 0.0) || (p0.y < 0.0 && pos.y >= 0.0);
    bool nearSlab = min(abs(p0.y), abs(pos.y)) <= diskEnvH;

    if (evaluateDisk && (crossedPlane || nearSlab)) {
      float segLen = length(pos - p0);
      float rho0 = length(p0.xz);
      float rho1 = length(pos.xz);
      float rhoMin = min(rho0, rho1) - 0.35 * segLen;
      float rhoMax = max(rho0, rho1) + 0.35 * segLen;

      if (rhoMax >= uDiskInner - 0.25 && rhoMin <= uDiskOuter + 0.35) {
        // 1. Exact Hermite-refined equatorial crossing detection for crossing-order accounting
        float tc = 0.5;
        if (crossedPlane) {
          tc = refineEquatorialCrossing(p0, v0, pos, vel, dt);
          vec3 pc = hermitePos(p0, v0, pos, vel, dt, tc);
          float rc = length(pc.xz);
          if (rc >= uDiskInner && rc <= uDiskOuter) {
            diskCrossings += 1;
            if (diskCrossings == 1) {
              firstCrossR = rc;
            }
          }
        }

        // 2. Curved volumetric slab integration over sub-interval inside |y| <= diskEnvH
        if (transmittance > 0.005 || restTransmittance > 0.005 || uDebugMode == 4) {
          float ta = 0.0;
          float tb = 1.0;
          float dy = pos.y - p0.y;
          if (abs(dy) > 1e-5) {
            float tLo = (-diskEnvH - p0.y) / dy;
            float tHi = (diskEnvH - p0.y) / dy;
            ta = clamp(min(tLo, tHi), 0.0, 1.0);
            tb = clamp(max(tLo, tHi), 0.0, 1.0);
            if (crossedPlane && (tb - ta) < 1e-4) {
              ta = clamp(tc - 0.04, 0.0, 1.0);
              tb = clamp(tc + 0.04, 0.0, 1.0);
            }
          }

          float subSpan = tb - ta;
          if (subSpan > 1e-5) {
            int subN = max(uDiskSubSamples, 1);
            float ds = (segLen * subSpan) / float(subN);
            for (int s = 0; s < HARD_MAX_DISK_SUBSAMPLES; s++) {
              if (s >= subN) break;
              float frac = (float(s) + 0.5) / float(subN);
              float tMid = ta + frac * subSpan;
              vec3 ps = hermitePos(p0, v0, pos, vel, dt, tMid);
              if (length(ps) <= R_CAPTURE) continue;
              vec3 vs = hermiteVel(p0, v0, pos, vel, dt, tMid);

              DiskSample dSample = evaluateDiskSample(
                ps,
                vs,
                ray.energy,
                ray.energy,
                ds,
                restOnlyMode
              );

              if (dSample.opticalDepth > 1e-5) {
                float alpha = 1.0 - exp(-dSample.opticalDepth);
                // Preserve sharp luminous photon-ring multiple-crossing structure (n >= 2)
                float orderBoost = diskCrossings >= 2 ? 1.42 : 1.0;

                accumRadiance += transmittance * dSample.emission * alpha * orderBoost;
                transmittance *= (1.0 - alpha * 0.78);

                if (restOnlyMode) {
                  accumRestRadiance += restTransmittance * dSample.restEmission * alpha;
                  restTransmittance *= (1.0 - alpha * 0.78);
                }

                float wG = transmittance * alpha * (0.2 + length(dSample.restEmission));
                weightedG += dSample.gFactor * wG;
                gWeightSum += wG;
              }
            }
          }
        }
      }
    }

    // Immediate post-step horizon termination check
    if (r1 <= R_CAPTURE) {
      termCode = 1;
      break;
    }
  }

  // Final escaped celestial ray direction
  vec3 escapeDir = normalize(vel);
  // Screen-space angular derivative for flux-conserving lensing-aware star anti-aliasing
  float pixelAng = clamp(length(fwidth(escapeDir)), 0.0006, 0.25);

  vec3 skyRadiance = vec3(0.0);
  if (termCode == 0) {
    skyRadiance = sampleProceduralCosmos(escapeDir, pixelAng);
  } else if (termCode == 2 && ray.impactB > B_CRIT) {
    skyRadiance = sampleProceduralCosmos(escapeDir, pixelAng) * 0.45;
  }

  // Final HDR radiance: path-ordered disk emission + transmitted lensed cosmos
  // (Captured horizon rays have skyRadiance = 0 -> pure abyssal event horizon core)
  vec3 finalHdr = accumRadiance + transmittance * skyRadiance;

  if (uDebugMode == 0) {
    fragColor = vec4(max(finalHdr, vec3(0.0)), 1.0);
    return;
  }

  vec3 debugRgb = renderDebugView(
    uDebugMode,
    finalHdr,
    skyRadiance,
    accumRestRadiance,
    initialDir,
    escapeDir,
    ray.impactB,
    minR,
    stepsTaken,
    termCode,
    diskCrossings,
    weightedG,
    gWeightSum,
    totalAngle,
    firstCrossR
  );
  fragColor = vec4(debugRgb, 1.0);
}
`;
