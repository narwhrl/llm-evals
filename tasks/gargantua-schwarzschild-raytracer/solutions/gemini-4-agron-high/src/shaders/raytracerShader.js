export const fullscreenVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const schwarzschildFragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

// Observer camera uniforms (driven by Three.js PerspectiveCamera + OrbitControls)
uniform vec3 uCamPos;
uniform vec3 uCamForward;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform float uTanHalfFov;
uniform float uAspect;
uniform vec2 uResolution;

// Simulation & quality budget uniforms
uniform float uTime;
uniform int uMaxSteps;
uniform float uStepScale;
uniform int uDiskSubsamples;
uniform int uStarLayers;
uniform int uDebugMode;

// Accretion disk & relativistic parameters (in units of Schwarzschild radius r_s = 2GM/c^2 = 1.0)
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfThickness;
uniform float uDiskTemp;
uniform float uDiskEmission;
uniform float uOrbitalSpeed;
uniform float uTurbulenceAmp;
uniform float uTurbulenceSpeed;

// Procedural celestial background parameters
uniform float uStarDensity;
uniform float uGalaxyBrightness;

// Physical constants in Schwarzschild radius units: r_s = 2M = 1.0, photon sphere r_ph = 1.5, ISCO = 3.0
const float RS = 1.0;
const float PHOTON_SPHERE = 1.5;
const float B_CRIT = 2.59807621135; // (3 * sqrt(3) / 2) * RS
const float ESCAPE_RADIUS = 52.0;
const float PI = 3.14159265359;
const float TAU = 6.28318530718;
const int HARD_MAX_STEPS = 380;

// -----------------------------------------------------------------------------
// Hash & Procedural 3D Noise Utilities (100% procedural, zero texture lookups)
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
  float amp = 0.5;
  mat3 rot = mat3(
     0.80,  0.60,  0.00,
    -0.60,  0.80,  0.00,
     0.00,  0.00,  1.00
  );
  for (int i = 0; i < 4; i++) {
    sum += amp * valueNoise3D(p);
    p = rot * p * 2.03 + vec3(13.7, 7.3, 5.1);
    amp *= 0.5;
  }
  return sum;
}

// -----------------------------------------------------------------------------
// Planckian Blackbody Locus Approximation (Kelvin -> Linear sRGB)
// -----------------------------------------------------------------------------
vec3 blackbodyLinearRGB(float kelvin) {
  float t = clamp(kelvin, 900.0, 40000.0) * 0.01;
  float r;
  float g;
  float b;

  if (t <= 66.0) {
    r = 1.0;
    g = clamp(0.39008158 * log(max(t, 1.0)) - 0.63184144, 0.0, 1.0);
    if (t <= 19.0) {
      b = 0.0;
    } else {
      b = clamp(0.54320679 * log(max(t - 10.0, 1.0)) - 1.19625409, 0.0, 1.0);
    }
  } else {
    r = clamp(1.29293619 * pow(max(t - 60.0, 0.1), -0.13320476), 0.0, 1.0);
    g = clamp(1.12989086 * pow(max(t - 60.0, 0.1), -0.07551485), 0.0, 1.0);
    b = 1.0;
  }

  // Convert perceptual fit to linear sRGB response
  return pow(max(vec3(r, g, b), vec3(0.0)), vec3(2.2));
}

// -----------------------------------------------------------------------------
// Schwarzschild Metric & Null Geodesic Formulation
//
// Coordinates:
//   3D areal-radius Cartesian embedding x in R^3 where r = ||x|| is the exact
//   Schwarzschild areal coordinate radius and (theta, phi) are spherical angles.
//   Metric (G = c = 1, r_s = 2M = 1.0):
//     ds^2 = -(1 - r_s/r) dt^2 + (1 - r_s/r)^(-1) dr^2 + r^2 dOmega^2 = 0.
//
// Exact Null Geodesic ODE with affine parameter lambda (conserved E = 1):
//   Conserved orbital angular momentum vector: h_vec = x × (dx/dlambda), h^2 = |h_vec|^2.
//   Radial first integral: (dr/dlambda)^2 + (h^2 / r^2)(1 - r_s / r) = 1.
//   Differentiating yields the exact coordinate-singularity-free 3D vector ODE:
//     d^2 x / d lambda^2 = - (3/2) * r_s * h^2 * x / ||x||^5.
//   This reproduces Binet's exact GR equation d^2u/dphi^2 + u = (3/2) r_s u^2,
//   the unstable photon sphere at r = 1.5 r_s, and critical shadow b_crit = 2.598 r_s.
// -----------------------------------------------------------------------------
vec3 initStaticObserverVelocity(vec3 camPos, vec3 localDir) {
  float r0 = max(length(camPos), RS * 1.05);
  vec3 rHat = camPos / r0;
  float dr = dot(localDir, rHat);
  vec3 dPerp = localDir - dr * rHat;
  // Static Schwarzschild observer orthonormal tetrad transformation:
  // Ensures exact Synge relativistic shadow angle at any finite camera radius r0 > r_s.
  float invLapse = inversesqrt(max(1.0 - RS / r0, 0.04));
  return dr * rHat + dPerp * invLapse;
}

vec3 schwarzschildGeodesicAccel(vec3 pos, float h2) {
  float r2 = max(dot(pos, pos), 1e-5);
  float invR = inversesqrt(r2);
  float invR5 = invR * invR * invR * invR * invR;
  return (-1.5 * RS * h2 * invR5) * pos;
}

void stepGeodesicRK4(
  in vec3 pos,
  in vec3 vel,
  in float h2,
  in float dt,
  out vec3 nextPos,
  out vec3 nextVel
) {
  vec3 k1x = vel;
  vec3 k1v = schwarzschildGeodesicAccel(pos, h2);

  vec3 k2x = vel + 0.5 * dt * k1v;
  vec3 k2v = schwarzschildGeodesicAccel(pos + 0.5 * dt * k1x, h2);

  vec3 k3x = vel + 0.5 * dt * k2v;
  vec3 k3v = schwarzschildGeodesicAccel(pos + 0.5 * dt * k2x, h2);

  vec3 k4x = vel + dt * k3v;
  vec3 k4v = schwarzschildGeodesicAccel(pos + dt * k3x, h2);

  nextPos = pos + (dt / 6.0) * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
  nextVel = vel + (dt / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
}

float computeAdaptiveStep(vec3 pos, float r, float h2) {
  // Fine step near photon sphere (r ~ 1.5 r_s) & event horizon, geometric growth in far field
  float nearHorizon = clamp(0.052 * (r - 0.80), 0.018, 0.14);
  float farStep = 0.045 + 0.125 * max(r - 1.5, 0.0);
  float blend = smoothstep(1.8, 6.5, r);
  float dt = mix(nearHorizon, farStep, blend);

  // Tighten step near curved accretion disk slab for accurate slab & midplane intersections
  float diskBand = step(uDiskInner - 1.0, r) * step(r, uDiskOuter + 1.5);
  if (diskBand > 0.5) {
    float verticalProx = abs(pos.y) / max(uDiskHalfThickness * 3.5, 0.28);
    if (verticalProx < 1.6) {
      dt = min(dt, mix(0.055, 0.18, clamp(verticalProx / 1.6, 0.0, 1.0)));
    }
  }

  // Extra curvature guard for grazing high-angular-momentum rays
  float curvScale = r * r / max(sqrt(h2) * 1.35, 1.0);
  dt = min(dt, max(0.022, 0.16 * curvScale));

  return dt * uStepScale;
}

bool isSegmentCapturedByHorizon(vec3 p0, vec3 p1, float r1) {
  if (r1 <= RS * 1.002) return true;
  vec3 seg = p1 - p0;
  float segLen2 = dot(seg, seg);
  if (segLen2 > 1e-7) {
    float tClosest = clamp(-dot(p0, seg) / segLen2, 0.0, 1.0);
    vec3 closest = p0 + seg * tClosest;
    if (dot(closest, closest) <= RS * RS * 1.002) {
      return true;
    }
  }
  return false;
}

// -----------------------------------------------------------------------------
// Relativistic Accretion Disk Emission (Doppler + Gravitational Redshift + MHD)
// -----------------------------------------------------------------------------
float sampleKeplerianTurbulence(float rCyl, float phi, float yNorm) {
  float radialNorm = clamp((rCyl - uDiskInner) / max(uDiskOuter - uDiskInner, 0.5), 0.0, 1.0);
  float logR = log(max(rCyl, 1.05));

  // Keplerian angular frequency Omega(r) = sqrt(M / r^3)
  float omega = 1.45 * pow(max(rCyl, 1.4), -1.5);
  float flowTime = uTime * uTurbulenceSpeed;

  // Dual-phase Lagrangian flow advection prevents infinite winding shear at large t
  float cycle0 = fract(flowTime * 0.11);
  float cycle1 = fract(flowTime * 0.11 + 0.5);
  float fade = 0.5 - 0.5 * cos(TAU * cycle0);

  float carrierAngle = phi + flowTime * 0.34;
  float spiralA0 = carrierAngle + (cycle0 - 0.5) * 7.5 * omega + 3.2 * logR;
  float spiralA1 = carrierAngle + (cycle1 - 0.5) * 7.5 * omega + 3.2 * logR + 2.1;

  // Cylindrical seamless coordinates stretched azimuthally for sheared MRI plasma filaments
  vec3 coord0 = vec3(cos(spiralA0) * 2.4, sin(spiralA0) * 2.4, logR * 7.5 + yNorm * 0.9);
  vec3 coord1 = vec3(cos(spiralA1) * 2.4, sin(spiralA1) * 2.4, logR * 7.5 + yNorm * 0.9 + 4.7);
  float fbmFilaments = mix(fbm3D(coord0), fbm3D(coord1), fade);

  // Finer high-frequency spiral streaks
  float fineA0 = carrierAngle * 2.0 + (cycle0 - 0.5) * 11.0 * omega + 5.6 * logR;
  float fineA1 = carrierAngle * 2.0 + (cycle1 - 0.5) * 11.0 * omega + 5.6 * logR + 1.7;
  vec3 fineCoord0 = vec3(cos(fineA0) * 4.5, sin(fineA0) * 4.5, rCyl * 1.9);
  vec3 fineCoord1 = vec3(cos(fineA1) * 4.5, sin(fineA1) * 4.5, rCyl * 1.9 + 9.2);
  float fineStreaks = mix(fbm3D(fineCoord0), fbm3D(fineCoord1), fade);

  // Azimuthally coherent MRI pressure rings (characteristic Concentric Gargantua lanes)
  float rings = 0.5 + 0.5 * sin(rCyl * 5.2 - sin(carrierAngle * 2.0 + logR * 3.0) * 0.85);
  float subRings = 0.5 + 0.5 * sin(rCyl * 13.5 + fbmFilaments * 3.6);
  float ringStructure = mix(rings, rings * (0.55 + 0.75 * subRings), 0.65);

  float rawTurb = (fbmFilaments * 0.62 + fineStreaks * 0.38) * (0.55 + 0.75 * ringStructure);
  // Smooth inner hot cusp, filamentary outer fade
  float contrast = mix(1.0, clamp(rawTurb * 1.85, 0.06, 2.35), clamp(uTurbulenceAmp, 0.0, 2.0) * 0.68);
  if (uTurbulenceAmp > 1.0) {
    contrast = pow(max(contrast, 0.02), 1.0 + 0.55 * (uTurbulenceAmp - 1.0));
  }
  return contrast * mix(1.12, 0.88, radialNorm);
}

void evaluateDiskPlasmaPoint(
  in vec3 samplePos,
  in vec3 sampleVel,
  in float camLapseSqrt,
  out vec3 emissionRate,
  out float extinctionRate,
  out float gFactorOut,
  out float localTempNormOut
) {
  float rCyl = length(samplePos.xz);
  float rSph = max(length(samplePos), RS * 1.02);

  // Radial window with smooth inner ISCO cusp & outer taper
  float innerFade = smoothstep(uDiskInner * 0.94, uDiskInner * 1.07, rCyl);
  float outerFade = 1.0 - smoothstep(uDiskOuter * 0.78, uDiskOuter * 1.03, rCyl);
  float radialMask = innerFade * outerFade;

  if (radialMask <= 1e-4) {
    emissionRate = vec3(0.0);
    extinctionRate = 0.0;
    gFactorOut = 1.0;
    localTempNormOut = 0.0;
    return;
  }

  float radialT = clamp((rCyl - uDiskInner) / max(uDiskOuter - uDiskInner, 0.5), 0.0, 1.0);
  float hLocal = max(uDiskHalfThickness * mix(0.68, 1.32, radialT), 0.004);
  float yNorm = samplePos.y / hLocal;
  if (abs(yNorm) > 1.25) {
    emissionRate = vec3(0.0);
    extinctionRate = 0.0;
    gFactorOut = 1.0;
    localTempNormOut = 0.0;
    return;
  }

  // Normalized vertical Gaussian profile: integral over [-hLocal, +hLocal] stays finite as hLocal -> 0
  float verticalProfile = exp(-2.35 * yNorm * yNorm) * smoothstep(1.25, 0.88, abs(yNorm));

  float safeX = (abs(samplePos.x) + abs(samplePos.z) > 1e-6) ? samplePos.x : 1e-6;
  float phi = atan(samplePos.z, safeX);
  float turb = sampleKeplerianTurbulence(rCyl, phi, yNorm);

  // Novikov-Thorne / Page-Thorne relativistic thin-disk temperature profile
  float ratio = clamp(uDiskInner / max(rCyl, uDiskInner * 0.95), 0.02, 1.0);
  float ntFactor = pow(ratio, 0.75) * pow(max(1.0 - 0.82 * sqrt(ratio), 0.04), 0.25) * 1.68;
  localTempNormOut = clamp(ntFactor * (0.72 + 0.36 * turb), 0.0, 2.2);

  // Prograde circular Keplerian orbital speed in static local frame: beta_K = sqrt(r_s / (2 * (r - r_s)))
  float beta = clamp(
    uOrbitalSpeed * sqrt(RS / max(2.0 * (rSph - RS), 0.35)),
    0.0,
    0.90
  );
  float gamma = inversesqrt(max(1.0 - beta * beta, 0.12));

  // Tangent direction of prograde plasma in equatorial xz-plane (left wing approaches +z observer)
  vec3 orbTangent = vec3(samplePos.z, 0.0, -samplePos.x) / max(rCyl, 1e-4);
  vec3 photonToObserver = -normalize(sampleVel);
  float cosTheta = clamp(dot(orbTangent, photonToObserver), -0.995, 0.995);

  // Combined gravitational redshift + special-relativistic Doppler shift factor g = nu_obs / nu_emit
  float emitterLapseSqrt = sqrt(max(1.0 - RS / rSph, 0.02));
  float gFactor = (emitterLapseSqrt / max(camLapseSqrt, 0.2)) / max(gamma * (1.0 - beta * cosTheta), 0.12);
  gFactor = clamp(gFactor, 0.12, 3.2);
  gFactorOut = gFactor;

  // Relativistic invariant intensity transformation: I_obs ~ g^3.5 * B(g * T_local)
  float observedTempK = uDiskTemp * max(localTempNormOut, 0.22) * pow(gFactor, 0.72);
  vec3 bbColor = blackbodyLinearRGB(observedTempK);

  float beamingBoost = pow(gFactor, 2.75);
  float radialBrightness = pow(ratio, 1.25) * (0.38 + 0.62 * outerFade);
  float columnScale = 0.32 / hLocal;

  float density = radialMask * verticalProfile * (0.32 + 0.82 * turb) * columnScale;
  extinctionRate = density * mix(1.18, 0.44, radialT);
  emissionRate = bbColor * (uDiskEmission * 3.85 * radialBrightness * beamingBoost * turb * density);
}

// -----------------------------------------------------------------------------
// Procedural Lensed Starfield & Milky Way Galactic Background (Zero Textures)
// -----------------------------------------------------------------------------
vec3 sampleStarLayer(vec3 dir, float cellScale, float densityThreshold, float brightnessScale) {
  vec3 p = dir * cellScale;
  vec3 cell = floor(p);
  vec3 local = fract(p);

  vec3 starColorSum = vec3(0.0);
  // Check 2x2x2 neighborhood around nearest octant to eliminate cell-boundary clipping
  vec3 stepSign = step(vec3(0.5), local) * 2.0 - 1.0;

  for (int ix = 0; ix < 2; ix++) {
    for (int iy = 0; iy < 2; iy++) {
      for (int iz = 0; iz < 2; iz++) {
        vec3 offset = vec3(float(ix), float(iy), float(iz)) * stepSign;
        vec3 c = cell + offset;
        vec3 rnd = hash33(c);
        float prob = hash13(c + vec3(19.1, 7.7, 3.3));
        if (prob < densityThreshold) {
          vec3 starCenter = c + 0.18 + 0.64 * rnd;
          vec3 starDir = normalize(starCenter);
          float angDist = length(dir - starDir) * cellScale;
          float core = exp(-angDist * angDist * 58.0);
          float halo = 0.14 * exp(-angDist * 9.5);
          float starTemp = mix(3100.0, 16500.0, pow(rnd.x, 1.5));
          float lum = pow(rnd.y, 2.6) * brightnessScale;
          starColorSum += blackbodyLinearRGB(starTemp) * lum * (core + halo);
        }
      }
    }
  }
  return starColorSum;
}

vec3 sampleProceduralCosmos(vec3 dir) {
  vec3 d = normalize(dir);

  // Tilted galactic coordinate frame (~33 deg inclination relative to accretion disk)
  vec3 galUp = normalize(vec3(0.36, 0.84, -0.40));
  vec3 galCenter = normalize(vec3(-0.52, 0.24, -0.82));
  vec3 galSide = normalize(cross(galUp, galCenter));
  vec3 galForward = cross(galSide, galUp);

  float galLat = dot(d, galUp);
  float gx = dot(d, galForward);
  float gz = dot(d, galSide);

  // Galactic band envelope & bulge concentration
  float bandProfile = exp(-abs(galLat) * 6.2) + 0.35 * exp(-galLat * galLat * 14.0);
  float coreBulge = pow(max(dot(d, galCenter) * 0.5 + 0.5, 0.0), 3.4);

  vec3 galPos = vec3(gx, galLat * 2.4, gz);
  float nebClouds = fbm3D(galPos * 3.4 + vec3(2.3, -1.4, 5.1));
  float fineNeb = fbm3D(galPos * 8.2 + vec3(-4.1, 3.7, 1.9));
  float dustRift = smoothstep(0.40, 0.72, fbm3D(galPos * 5.6 + vec3(8.4, 1.2, -3.5)));
  float dustLaneMask = exp(-2.35 * dustRift * exp(-galLat * galLat * 38.0));

  vec3 warmCoreColor = vec3(1.05, 0.76, 0.48);
  vec3 coolArmColor = vec3(0.32, 0.52, 0.88);
  vec3 hiiAccent = vec3(0.82, 0.34, 0.52);

  vec3 galaxyGlow = mix(coolArmColor, warmCoreColor, clamp(coreBulge * 1.15 + nebClouds * 0.35, 0.0, 1.0));
  galaxyGlow += hiiAccent * pow(max(fineNeb - 0.52, 0.0) * 2.0, 2.0) * 0.55;
  galaxyGlow *= bandProfile * (0.35 + 1.15 * nebClouds) * dustLaneMask * 0.20 * uGalaxyBrightness;

  // Deep cosmic ambient starlight floor
  galaxyGlow += vec3(0.0025, 0.0034, 0.0058) * uGalaxyBrightness;

  // Multi-scale procedural 3D starfield (lensed naturally through deflected dir!)
  vec3 stars = vec3(0.0);
  if (uStarDensity > 0.001) {
    float dens = clamp(uStarDensity, 0.0, 2.5);
    float galStarBoost = 1.0 + 1.35 * bandProfile * dustLaneMask;

    if (uStarLayers >= 1) {
      stars += sampleStarLayer(d, 74.0, clamp(0.11 * dens, 0.0, 0.85), 2.55);
    }
    if (uStarLayers >= 2) {
      stars += sampleStarLayer(d + vec3(0.13, -0.07, 0.19), 142.0, clamp(0.18 * dens * galStarBoost, 0.0, 0.92), 1.15);
    }
    if (uStarLayers >= 3) {
      stars += sampleStarLayer(d + vec3(-0.23, 0.17, -0.11), 224.0, clamp(0.24 * dens * galStarBoost, 0.0, 0.95), 0.52);
    }
    if (uStarLayers >= 4) {
      stars += sampleStarLayer(d + vec3(0.31, 0.29, -0.17), 320.0, clamp(0.28 * dens * galStarBoost, 0.0, 0.98), 0.28);
    }
  }

  return galaxyGlow + stars;
}

// -----------------------------------------------------------------------------
// Scientific False-Color Palettes for Diagnostic Views 1..9
// -----------------------------------------------------------------------------
vec3 infernoPalette(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.02, 0.01, 0.08);
  vec3 c1 = vec3(0.36, 0.06, 0.43);
  vec3 c2 = vec3(0.78, 0.22, 0.28);
  vec3 c3 = vec3(0.98, 0.62, 0.12);
  vec3 c4 = vec3(0.99, 0.98, 0.68);
  if (t < 0.25) return mix(c0, c1, t * 4.0);
  if (t < 0.50) return mix(c1, c2, (t - 0.25) * 4.0);
  if (t < 0.75) return mix(c2, c3, (t - 0.50) * 4.0);
  return mix(c3, c4, (t - 0.75) * 4.0);
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 localRayDir = normalize(
    uCamForward +
    ndc.x * uAspect * uTanHalfFov * uCamRight +
    ndc.y * uTanHalfFov * uCamUp
  );

  float camRadius = max(length(uCamPos), RS * 1.08);
  float camLapseSqrt = sqrt(max(1.0 - RS / camRadius, 0.04));

  // Initialize geodesic state (pos, vel) and conserved angular momentum h^2 = |x × v|^2
  vec3 pos = uCamPos;
  vec3 vel = initStaticObserverVelocity(uCamPos, localRayDir);
  vec3 hVec = cross(pos, vel);
  float h2 = dot(hVec, hVec);

  // Radiative transfer & diagnostic accumulators along curved geodesic
  vec3 accumRadiance = vec3(0.0);
  float transmittance = 1.0;

  bool captured = false;
  bool escaped = false;
  int stepsTaken = 0;
  float minRadius = camRadius;

  int diskCrossings = 0;
  bool inDiskSlab = false;
  float weightedGFactor = 0.0;
  float weightedIntrinsicTemp = 0.0;
  float diskWeightSum = 0.0;

  float maxSlabBound = max(uDiskHalfThickness * 1.45, 0.012);

  for (int stepIdx = 0; stepIdx < HARD_MAX_STEPS; stepIdx++) {
    if (stepIdx >= uMaxSteps) break;

    float r = length(pos);
    minRadius = min(minRadius, r);

    if (r <= RS * 1.002) {
      captured = true;
      break;
    }

    if (r > ESCAPE_RADIUS && dot(pos, vel) > 0.0 && stepIdx > 4) {
      escaped = true;
      break;
    }

    float dt = computeAdaptiveStep(pos, r, h2);
    vec3 nextPos;
    vec3 nextVel;
    stepGeodesicRK4(pos, vel, h2, dt, nextPos, nextVel);
    stepsTaken = stepIdx + 1;

    float nextR = length(nextPos);
    minRadius = min(minRadius, nextR);

    // -------------------------------------------------------------------------
    // Curved-path Accretion Disk Intersection & Ordered Multi-Crossing Synthesis
    // -------------------------------------------------------------------------
    if (uDebugMode != 7 && (transmittance > 0.002 || uDebugMode == 3)) {
      float dy = nextPos.y - pos.y;
      float sEnter = 0.0;
      float sExit = 1.0;
      bool hitsVerticalBand = false;

      if (abs(dy) < 1e-6) {
        hitsVerticalBand = abs(pos.y) <= maxSlabBound;
      } else {
        float s0 = (-maxSlabBound - pos.y) / dy;
        float s1 = (maxSlabBound - pos.y) / dy;
        sEnter = max(0.0, min(s0, s1));
        sExit = min(1.0, max(s0, s1));
        hitsVerticalBand = sExit > sEnter;
      }

      bool crossedMidplane = (pos.y * nextPos.y <= 0.0) && (abs(pos.y) + abs(nextPos.y) > 0.0);

      if (hitsVerticalBand) {
        float sMid = 0.5 * (sEnter + sExit);
        vec3 midPos = mix(pos, nextPos, sMid);
        float rMidCyl = length(midPos.xz);

        if (rMidCyl >= uDiskInner * 0.93 && rMidCyl <= uDiskOuter * 1.05) {
          if (!inDiskSlab) {
            diskCrossings += 1;
            inDiskSlab = true;
          } else if (crossedMidplane && abs(pos.y) > maxSlabBound * 0.85) {
            diskCrossings += 1;
          }

          float segWorldLen = length(nextPos - pos) * (sExit - sEnter);
          float subDt = segWorldLen / float(max(uDiskSubsamples, 1));

          for (int s = 0; s < 3; s++) {
            if (s >= uDiskSubsamples) break;
            float frac = mix(sEnter, sExit, (float(s) + 0.5) / float(max(uDiskSubsamples, 1)));
            // Cubic Hermite evaluation on the RK4 segment for smooth curved-ray intersection
            float f2 = frac * frac;
            float f3 = f2 * frac;
            vec3 subPos =
              (2.0 * f3 - 3.0 * f2 + 1.0) * pos +
              (f3 - 2.0 * f2 + frac) * (vel * dt) +
              (-2.0 * f3 + 3.0 * f2) * nextPos +
              (f3 - f2) * (nextVel * dt);
            vec3 subVel = mix(vel, nextVel, frac);

            vec3 emRate;
            float extRate;
            float gVal;
            float tempNormVal;
            evaluateDiskPlasmaPoint(subPos, subVel, camLapseSqrt, emRate, extRate, gVal, tempNormVal);

            if (extRate > 1e-5) {
              float stepTau = extRate * subDt;
              float stepTrans = exp(-stepTau);
              // Exact constant-source radiative transfer along sub-segment
              float absorbWeight = (stepTau > 1e-4) ? ((1.0 - stepTrans) / stepTau) : 1.0;
              vec3 stepContrib = emRate * subDt * absorbWeight;

              float w = transmittance * (1.0 - stepTrans + 0.05 * stepTau);
              accumRadiance += transmittance * stepContrib;
              weightedGFactor += w * gVal;
              weightedIntrinsicTemp += w * tempNormVal;
              diskWeightSum += w;
              transmittance *= stepTrans;
            }
          }
        } else if (abs(nextPos.y) > maxSlabBound * 1.25) {
          inDiskSlab = false;
        }
      } else {
        inDiskSlab = false;
      }
    }

    // Event horizon capture check after checking any outer segment intersection
    if (isSegmentCapturedByHorizon(pos, nextPos, nextR)) {
      captured = true;
      pos = nextPos;
      vel = nextVel;
      break;
    }

    pos = nextPos;
    vel = nextVel;
  }

  // Classify grazing photon-sphere rays that exhausted uMaxSteps near r ~ 1.5 r_s
  float finalR = length(pos);
  if (!captured && !escaped) {
    if (finalR < PHOTON_SPHERE || (finalR < 2.6 && dot(pos, vel) < 0.0)) {
      captured = true;
    } else {
      escaped = true;
    }
  }

  // Asymptotic lensed sky direction for escaped rays (including exact weak-field tail r_final -> inf)
  vec3 lensedSkyDir = normalize(vel);
  if (!captured && finalR > 2.2) {
    vec3 rHatEnd = pos / finalR;
    vec3 tang = lensedSkyDir - dot(lensedSkyDir, rHatEnd) * rHatEnd;
    float tangLen = length(tang);
    if (tangLen > 1e-5) {
      // Remaining Schwarzschild weak-field deflection delta_phi_rem ~ r_s / r_final * sin(alpha)
      float remDeflect = (RS / finalR) * tangLen;
      lensedSkyDir = normalize(lensedSkyDir - (tang / tangLen) * remDeflect * 0.5);
    }
  }

  vec3 cosmosRadiance = captured ? vec3(0.0) : sampleProceduralCosmos(lensedSkyDir);
  vec3 totalHdrRadiance = accumRadiance + transmittance * cosmosRadiance;

  // ---------------------------------------------------------------------------
  // Diagnostic Views (0 = Final HDR Scene for Post-Processing; 1..9 = Diagnostics)
  // ---------------------------------------------------------------------------
  vec3 outColor = totalHdrRadiance;

  if (uDebugMode == 1) {
    // 1: Ray Steps & Termination State
    float stepRatio = clamp(float(stepsTaken) / float(max(uMaxSteps, 1)), 0.0, 1.0);
    vec3 heat = infernoPalette(pow(stepRatio, 0.8));
    if (captured) {
      heat = mix(vec3(0.02, 0.03, 0.07), heat * vec3(0.55, 0.75, 1.15), stepRatio * 0.85);
    }
    outColor = heat;
  } else if (uDebugMode == 2) {
    // 2: Event Horizon Capture Mask & Photon-Sphere Critical Zone
    if (captured) {
      float rim = smoothstep(1.0, 1.48, minRadius);
      outColor = vec3(0.0) + vec3(0.28, 0.06, 0.02) * rim;
    } else {
      float photonProx = exp(-(minRadius - PHOTON_SPHERE) * 4.5);
      float bApprox = sqrt(h2);
      float critLine = exp(-abs(bApprox - B_CRIT) * 28.0);
      vec3 escapedBase = mix(vec3(0.05, 0.14, 0.28), vec3(0.14, 0.42, 0.72), clamp(1.0 / max(minRadius * 0.22, 1.0), 0.0, 1.0));
      outColor = escapedBase + vec3(1.0, 0.76, 0.22) * (photonProx * 0.85 + critLine * 0.9);
    }
  } else if (uDebugMode == 3) {
    // 3: Accretion Disk Crossing Order (0, 1st Primary, 2nd Lensed Arch, 3rd+ Photon Ring)
    if (diskCrossings == 0) {
      outColor = captured ? vec3(0.01, 0.01, 0.015) : vec3(0.03, 0.05, 0.09);
    } else if (diskCrossings == 1) {
      float lum = clamp(1.0 - transmittance, 0.22, 1.0);
      outColor = vec3(0.10, 0.68, 0.92) * lum;
    } else if (diskCrossings == 2) {
      float lum = clamp(1.0 - transmittance, 0.35, 1.0);
      outColor = vec3(0.98, 0.68, 0.16) * lum;
    } else {
      outColor = vec3(1.0, 0.32, 0.86) + vec3(0.35) * clamp(float(diskCrossings - 3), 0.0, 2.0);
    }
  } else if (uDebugMode == 4) {
    // 4: Relativistic Redshift & Doppler Beaming Factor g = nu_obs / nu_emit
    if (diskWeightSum > 1e-4) {
      float meanG = weightedGFactor / diskWeightSum;
      float delta = clamp((meanG - 1.0) * 1.45, -1.0, 1.0);
      vec3 redShiftCol = vec3(0.92, 0.14, 0.10);
      vec3 neutralCol = vec3(0.90, 0.92, 0.88);
      vec3 blueShiftCol = vec3(0.14, 0.58, 1.00);
      vec3 gCol = (delta < 0.0) ? mix(neutralCol, redShiftCol, -delta) : mix(neutralCol, blueShiftCol, delta);
      float mask = clamp(1.0 - transmittance, 0.25, 1.0);
      outColor = gCol * mask;
    } else {
      // Show pure gravitational potentiallapse sqrt(1 - r_s / r_min) in background
      float lapseMin = captured ? 0.0 : sqrt(max(1.0 - RS / max(minRadius, RS), 0.0));
      outColor = captured ? vec3(0.0) : vec3(0.04, 0.06, 0.10) * lapseMin;
    }
  } else if (uDebugMode == 5) {
    // 5: Gravitational Deflection Angle & Closest Approach Contours
    if (captured) {
      outColor = vec3(0.0);
    } else {
      float cosBend = clamp(dot(normalize(localRayDir), lensedSkyDir), -1.0, 1.0);
      float bendRad = acos(cosBend); // [0, PI]
      float bendNorm = clamp(bendRad / PI, 0.0, 1.0);
      float rContours = 0.85 + 0.15 * cos(minRadius * TAU * 1.0);
      outColor = infernoPalette(bendNorm) * rContours;
    }
  } else if (uDebugMode == 6) {
    // 6: Lensed Celestial Coordinate Grid (Einstein Ring & Inversion Visualization)
    if (captured) {
      outColor = vec3(0.0);
    } else {
      float theta = acos(clamp(lensedSkyDir.y, -1.0, 1.0)); // [0, PI]
      float safeSkyX = (abs(lensedSkyDir.x) + abs(lensedSkyDir.z) > 1e-6) ? lensedSkyDir.x : 1e-6;
      float phi = atan(lensedSkyDir.z, safeSkyX); // [-PI, PI]

      float gridLat = abs(fract(theta * (12.0 / PI)) - 0.5);
      float gridLon = abs(fract((phi + PI) * (24.0 / TAU)) - 0.5);
      float lineLat = 1.0 - smoothstep(0.02, 0.07, gridLat);
      float lineLon = 1.0 - smoothstep(0.02, 0.07, gridLon);
      float grid = max(lineLat, lineLon);

      vec3 hemiTint = vec3(
        0.25 + 0.55 * (0.5 + 0.5 * cos(phi)),
        0.25 + 0.55 * (1.0 - theta / PI),
        0.35 + 0.55 * (0.5 + 0.5 * sin(phi))
      );
      // Highlight Einstein ring locus where ray bends straight behind camera
      float einsteinLocus = exp(-length(lensedSkyDir - uCamForward) * 14.0);
      outColor = hemiTint * (0.18 + 0.82 * grid) + vec3(1.0, 0.82, 0.32) * einsteinLocus;
    }
  } else if (uDebugMode == 7) {
    // 7: Isolated Lensed Procedural Starfield & Galaxy (Tone-mapped cleanly for inspection)
    vec3 sky = cosmosRadiance * 1.35;
    outColor = sky / (vec3(1.0) + sky);
  } else if (uDebugMode == 8) {
    // 8: Intrinsic Rest-Frame Disk Temperature & Keplerian MHD Turbulence
    if (diskWeightSum > 1e-4) {
      float meanTempNorm = weightedIntrinsicTemp / diskWeightSum;
      vec3 restCol = blackbodyLinearRGB(uDiskTemp * max(meanTempNorm, 0.15)) * meanTempNorm * 1.15;
      outColor = restCol / (vec3(1.0) + restCol);
    } else {
      outColor = captured ? vec3(0.0) : vec3(0.015, 0.02, 0.035);
    }
  } else if (uDebugMode == 9) {
    // 9: Pre-Postprocessing Linear HDR Radiance Inspection (log2 dynamic range + >1.0 HDR indicator)
    vec3 logHdr = log2(vec3(1.0) + max(totalHdrRadiance, vec3(0.0))) * 0.30;
    float peak = max(totalHdrRadiance.r, max(totalHdrRadiance.g, totalHdrRadiance.b));
    float overUnity = smoothstep(1.0, 4.5, peak);
    outColor = mix(clamp(logHdr, 0.0, 1.0), vec3(1.0, 0.78, 0.95), overUnity * 0.22);
  }

  // Sanitize IEEE-754 output before writing HalfFloat render target
  if (!(outColor.r >= 0.0)) outColor.r = 0.0;
  if (!(outColor.g >= 0.0)) outColor.g = 0.0;
  if (!(outColor.b >= 0.0)) outColor.b = 0.0;
  outColor = clamp(outColor, vec3(0.0), vec3(240.0));

  gl_FragColor = vec4(outColor, captured ? 0.0 : 1.0);
}
`;
