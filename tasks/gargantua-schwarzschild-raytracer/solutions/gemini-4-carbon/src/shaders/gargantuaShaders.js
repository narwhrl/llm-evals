/**
 * GARGANTUA — Schwarzschild Null-Geodesic Raytracer & HDR Post-Processing Shaders
 *
 * Units & Metric Convention (Geometric Units G = c = 1):
 *   ds^2 = -(1 - rs/r) dt^2 + (1 - rs/r)^(-1) dr^2 + r^2 (dtheta^2 + sin^2(theta) dphi^2)
 *   Event Horizon:              rs = 2M = 1.0
 *   Unstable Photon Sphere:     r_ph = 1.5 * rs = 1.5
 *   Critical Impact Parameter:  b_crit = (3 * sqrt(3) / 2) * rs ≈ 2.59807621
 *   Schwarzschild ISCO:         r_isco = 3.0 * rs = 3.0
 */

export const FULLSCREEN_VERTEX_SHADER = /* glsl */ `
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const SCHWARZSCHILD_FRAGMENT_SHADER = /* glsl */ `
precision highp float;
precision highp int;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;

// Observer camera state (fed from Three.js PerspectiveCamera + OrbitControls)
uniform vec3 uCamPos;
uniform vec3 uCamForward;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform float uFov;

// Quality budget uniforms
uniform int uMaxSteps;
uniform float uStepScale;
uniform int uDiskSamples;
uniform int uStarLayers;

// Accretion disk & relativistic physics parameters
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemp;
uniform float uDiskIntensity;
uniform float uOrbitalSpeed;
uniform float uTurbulenceAmp;
uniform float uTurbulenceSpeed;
uniform float uDiskOpacity;

// Procedural sky parameters
uniform float uStarDensity;
uniform float uGalaxyBrightness;

// Debug view selector (0..9)
uniform int uDebugMode;

const float PI = 3.141592653589793;
const float TAU = 6.283185307179586;
const float RS = 1.0;
const float R_PHOTON = 1.5;
const float B_CRIT = 2.59807621135;
const float R_ESCAPE = 56.0;

/**
 * State vector for a null geodesic integrated in its invariant Schwarzschild orbital plane:
 *   r      : Schwarzschild areal radius
 *   vr     : dr / d(lambda), radial derivative w.r.t. affine parameter (normalized E = 1)
 *   phi    : orbital plane azimuth measured from observer axis e1 toward initial ray tangent e2
 *   b      : conserved impact parameter L / E
 */
struct GeodesicState {
  float r;
  float vr;
  float phi;
  float b;
};

struct GeodesicDeriv {
  float dr;
  float dvr;
  float dphi;
};

/**
 * Exact Schwarzschild null-geodesic ODE right-hand side derived from:
 *   (dr / dlambda)^2 + (1 - rs/r) * (b^2 / r^2) = 1
 * Differentiating w.r.t. affine parameter lambda eliminates turning-point singularities:
 *   dr/dlambda   = vr
 *   dvr/dlambda  = (b^2 / r^3) * (1 - 1.5 * rs / r)
 *   dphi/dlambda = b / r^2
 */
GeodesicDeriv evalGeodesicODE(GeodesicState s) {
  float invR = 1.0 / max(s.r, 0.25);
  float invR2 = invR * invR;
  float invR3 = invR2 * invR;
  GeodesicDeriv d;
  d.dr = s.vr;
  d.dvr = (s.b * s.b) * invR3 * (1.0 - 1.5 * RS * invR);
  d.dphi = s.b * invR2;
  return d;
}

/**
 * Classical 4th-order Runge-Kutta step along the Schwarzschild null geodesic.
 */
GeodesicState rk4GeodesicStep(GeodesicState s, float h) {
  GeodesicDeriv k1 = evalGeodesicODE(s);

  GeodesicState s2 = GeodesicState(
    s.r + 0.5 * h * k1.dr,
    s.vr + 0.5 * h * k1.dvr,
    s.phi + 0.5 * h * k1.dphi,
    s.b
  );
  GeodesicDeriv k2 = evalGeodesicODE(s2);

  GeodesicState s3 = GeodesicState(
    s.r + 0.5 * h * k2.dr,
    s.vr + 0.5 * h * k2.dvr,
    s.phi + 0.5 * h * k2.dphi,
    s.b
  );
  GeodesicDeriv k3 = evalGeodesicODE(s3);

  GeodesicState s4 = GeodesicState(
    s.r + h * k3.dr,
    s.vr + h * k3.dvr,
    s.phi + h * k3.dphi,
    s.b
  );
  GeodesicDeriv k4 = evalGeodesicODE(s4);

  GeodesicState next;
  next.r = s.r + (h / 6.0) * (k1.dr + 2.0 * k2.dr + 2.0 * k3.dr + k4.dr);
  next.vr = s.vr + (h / 6.0) * (k1.dvr + 2.0 * k2.dvr + 2.0 * k3.dvr + k4.dvr);
  next.phi = s.phi + (h / 6.0) * (k1.dphi + 2.0 * k2.dphi + 2.0 * k3.dphi + k4.dphi);
  next.b = s.b;
  return next;
}

vec3 orbitalToWorld(float r, float phi, vec3 e1, vec3 e2) {
  return r * (cos(phi) * e1 + sin(phi) * e2);
}

vec3 orbitalTangentWorld(GeodesicState s, vec3 e1, vec3 e2) {
  float c = cos(s.phi);
  float sn = sin(s.phi);
  vec3 er = c * e1 + sn * e2;
  vec3 ephi = -sn * e1 + c * e2;
  // Local orthonormal spatial tangent direction in static Schwarzschild frame:
  // k^{\hat{r}} = vr,  k^{\hat{phi}} = sqrt(1 - rs/r) * b / r
  float lapse = sqrt(max(1e-4, 1.0 - RS / max(s.r, RS * 1.001)));
  vec3 localDir = s.vr * er + (lapse * s.b / max(s.r, RS * 1.001)) * ephi;
  float len = length(localDir);
  return len > 1e-6 ? (localDir / len) : er;
}

// --- High-quality deterministic 3D integer hashes & gradient noise ---
vec3 hash33(uvec3 x) {
  x = ((x >> 8u) ^ x.yzx) * 1103515245u;
  x = ((x >> 8u) ^ x.yzx) * 1103515245u;
  x = ((x >> 8u) ^ x.yzx) * 1103515245u;
  return vec3(x) * (1.0 / float(0xffffffffu));
}

float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float noise3D(vec3 p) {
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

float fbm3D(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  mat3 rot = mat3(
     0.80,  0.48, -0.36,
    -0.48,  0.86,  0.14,
     0.36,  0.14,  0.92
  );
  for (int i = 0; i < 4; i++) {
    sum += amp * noise3D(p);
    p = rot * p * 2.03 + vec3(13.7, 7.1, 19.3);
    amp *= 0.5;
  }
  return sum;
}

/**
 * Analytic Planckian blackbody chromaticity (Tanner Helland / physical linear sRGB fit)
 * Maps shifted observer temperature T_obs in Kelvin to linear RGB chromaticity.
 */
vec3 blackbodyColor(float tempK) {
  float t = clamp(tempK, 900.0, 36000.0) * 0.01;
  vec3 c;
  if (t <= 66.0) {
    c.r = 1.0;
    c.g = clamp(0.39008158 * log(max(t, 1.5)) - 0.63184144, 0.0, 1.0);
  } else {
    c.r = clamp(1.29293618 * pow(t - 60.0, -0.13320476), 0.0, 1.0);
    c.g = clamp(1.12989086 * pow(t - 60.0, -0.07551485), 0.0, 1.0);
  }
  if (t >= 66.0) {
    c.b = 1.0;
  } else if (t <= 19.0) {
    c.b = 0.0;
  } else {
    c.b = clamp(0.54320679 * log(t - 10.0) - 1.19625410, 0.0, 1.0);
  }
  // Convert perceptual curve to linear radiance chromaticity
  vec3 lin = pow(max(c, vec3(0.0)), vec3(2.2));
  // Preserve rich deep crimson ember tail at strongly redshifted temperatures
  float veryCool = smoothstep(2400.0, 950.0, tempK);
  lin = mix(lin, vec3(1.0, 0.09, 0.012), veryCool * 0.65);
  return lin;
}

/**
 * Local disk half-thickness H(R): slightly flared relativistic accretion slab.
 */
float evalDiskHalfHeight(float R) {
  float span = max(uDiskOuter - uDiskInner, 1.0);
  float u = clamp((R - uDiskInner) / span, 0.0, 1.0);
  float flare = 0.62 + 0.55 * u;
  float innerTapering = smoothstep(0.0, 0.05, u);
  float outerTapering = 1.0 - smoothstep(0.84, 1.0, u);
  return uDiskThickness * flare * (0.25 + 0.75 * innerTapering * outerTapering);
}

/**
 * Animated Magnetorotational Instability (MRI) logarithmic spiral turbulence.
 * Uses dual-phase Keplerian shear crossfading so differential rotation never winds up
 * into Moiré aliasing even at arbitrarily large simulation times.
 */
float evalDiskTurbulence(vec3 pos, float R, float timeSec) {
  float az = atan(pos.z, pos.x);
  float logR = log(max(R, 0.5));
  float keplerOmega = pow(max(R, 1.3), -1.5) * 3.4;
  float tAnim = timeSec * uTurbulenceSpeed;

  // Dual-window advected Keplerian phase prevents infinite shear stretching
  float cycle = 0.22 * tAnim;
  float pA = fract(cycle);
  float pB = fract(cycle + 0.5);
  float wA = 0.5 - 0.5 * cos(TAU * pA);

  float shearSpan = 7.5;
  float azA = az - (pA - 0.5) * shearSpan * keplerOmega - 0.38 * tAnim;
  float azB = az - (pB - 0.5) * shearSpan * keplerOmega - 0.38 * tAnim;

  // Logarithmic spiral coordinates (periodic in azimuth via sin/cos embedding)
  float spiralArmA = 2.0 * azA + 6.8 * logR;
  float spiralArmB = 2.0 * azB + 6.8 * logR;

  vec3 coordA = vec3(cos(azA) * 2.4 + logR * 3.8, sin(azA) * 2.4 + pos.y * 3.5, logR * 6.2 - 0.25 * tAnim);
  vec3 coordB = vec3(cos(azB) * 2.4 + logR * 3.8, sin(azB) * 2.4 + pos.y * 3.5, logR * 6.2 - 0.25 * tAnim + 11.3);

  float baseFbm = mix(fbm3D(coordA), fbm3D(coordB), wA);

  // Fine filamentary sheared wisps
  vec3 fineA = vec3(cos(spiralArmA) * 2.2, sin(spiralArmA) * 2.2, R * 1.45 + 0.32 * tAnim);
  vec3 fineB = vec3(cos(spiralArmB) * 2.2, sin(spiralArmB) * 2.2, R * 1.45 + 0.32 * tAnim + 5.7);
  float wisps = mix(fbm3D(fineA * 1.85), fbm3D(fineB * 1.85), wA);

  // Concentric quasi-periodic accretion rings modulated by turbulence
  float rings = 0.5 + 0.5 * sin(logR * 26.0 + baseFbm * 5.2 - 0.55 * tAnim);
  float structure = 0.52 * baseFbm + 0.33 * wisps + 0.15 * rings;
  // Contrast curve creating bright hot plasma filaments & darker magnetic lanes
  float contrasted = smoothstep(0.18, 0.86, structure);
  return mix(1.0, 0.22 + 1.68 * contrasted, clamp(uTurbulenceAmp, 0.0, 1.5));
}

/**
 * Procedural star layer on the unit celestial sphere using tangent-projected distance
 * inside 3D lattice cells so stars remain crisp circular Airy points (and stretch cleanly
 * into tangential Einstein arcs near the photon ring without cubic cell-boundary clipping).
 */
vec3 evalStarLayer(vec3 dir, float scale, float densityScale) {
  vec3 p = dir * scale;
  vec3 cell = floor(p);

  uvec3 seed = uvec3(ivec3(cell) + ivec3(4096));
  vec3 rnd = hash33(seed);

  float prob = clamp(0.15 * densityScale, 0.0, 0.70);
  if (rnd.x > prob) return vec3(0.0);

  // Place star strictly inside inner 48% of cell so Airy profile vanishes before cell wall
  vec3 starWorld = cell + 0.26 + rnd * 0.48;
  vec3 starDir = normalize(starWorld);

  // Angular separation on the celestial sphere scaled to cell units
  float angDist = length(dir - starDir) * scale;

  float brightness = pow(hash13(cell * 1.37 + 9.1), 3.6);
  float radius = mix(0.032, 0.072, brightness);
  float edgeFade = 1.0 - smoothstep(0.18, 0.25, angDist);
  if (edgeFade <= 0.0) return vec3(0.0);

  float core = exp(-pow(angDist / radius, 2.15));
  float halo = 0.16 * exp(-angDist / (radius * 2.4));

  float starTemp = mix(3400.0, 18000.0, pow(rnd.z, 1.3));
  vec3 col = blackbodyColor(starTemp);

  return col * (core + halo) * edgeFade * (0.42 + 5.2 * brightness);
}

/**
 * Procedural Milky Way galaxy + multi-layer lensed starfield evaluated at asymptotic direction.
 */
vec3 evalProceduralSky(vec3 dir, float deflectionAngle) {
  vec3 d = normalize(dir);

  // Tilted galactic frame (~28 deg inclination relative to black hole equatorial plane)
  vec3 galUp = normalize(vec3(0.32, 0.87, -0.37));
  vec3 galX = normalize(cross(vec3(0.0, 0.0, 1.0), galUp));
  vec3 galZ = cross(galUp, galX);
  vec3 gDir = vec3(dot(d, galX), dot(d, galUp), dot(d, galZ));

  float galLat = gDir.y;
  float galLon = atan(gDir.z, gDir.x);

  // Galactic plane band & central bulge
  float bandProfile = exp(-pow(abs(galLat) / 0.21, 1.55));
  float wideHalo = exp(-pow(abs(galLat) / 0.52, 1.35));
  float bulge = exp(-dot(vec2(galLon * 0.55, galLat * 2.4), vec2(galLon * 0.55, galLat * 2.4)) * 1.4);

  float cloudMacro = fbm3D(gDir * 3.4 + vec3(2.1, -1.3, 4.7));
  float cloudDetail = fbm3D(gDir * 9.2 + vec3(cloudMacro * 1.8));
  float dustRift = smoothstep(0.38, 0.72, fbm3D(gDir * 6.4 + vec3(8.3, 3.9, -2.5)));
  float dustLaneMask = 1.0 - 0.76 * dustRift * exp(-pow(abs(galLat) / 0.095, 1.8));

  vec3 coreGold = vec3(1.15, 0.78, 0.46);
  vec3 armBlue = vec3(0.36, 0.54, 0.95);
  vec3 nebulaRose = vec3(0.88, 0.30, 0.48);

  float hIIKnots = pow(max(cloudDetail - 0.45, 0.0) * 1.8, 2.4) * bandProfile;
  vec3 galaxy =
    (coreGold * (0.42 * bulge + 0.28 * bandProfile * cloudMacro) +
     armBlue * (0.34 * bandProfile * cloudDetail + 0.09 * wideHalo) +
     nebulaRose * (0.26 * hIIKnots)) *
    dustLaneMask;

  // Deep-space subtle background glow
  galaxy += vec3(0.004, 0.006, 0.011) * (0.4 + 0.6 * wideHalo);
  galaxy *= uGalaxyBrightness * 0.68;

  // Multi-scale procedural stars (denser near galactic plane)
  float galStarBoost = 1.0 + 1.35 * bandProfile;
  vec3 stars = vec3(0.0);
  if (uStarDensity > 0.001) {
    stars += evalStarLayer(d, 76.0, uStarDensity * 0.85) * 1.35;
    stars += evalStarLayer(d + vec3(0.31, -0.17, 0.23), 165.0, uStarDensity * galStarBoost) * 0.95;
    if (uStarLayers >= 3) {
      stars += evalStarLayer(d + vec3(-0.41, 0.29, -0.13), 310.0, uStarDensity * galStarBoost * 1.2) * 0.62;
    }
  }

  // Subtle gravitational lensing magnification boost for strongly bent background rays near Einstein ring
  float lensMag = 1.0 + 0.38 * smoothstep(0.9, 3.2, deflectionAngle);
  return (galaxy + stars) * lensMag;
}

/**
 * Turbo-inspired scientific perceptual colormap for diagnostic heatmaps.
 */
vec3 scientificHeatmap(float t) {
  t = clamp(t, 0.0, 1.0);
  return clamp(
    vec3(
      0.1357 + t * (4.6153 + t * (-42.6603 + t * (132.1310 + t * (-152.9423 + t * 59.2863)))),
      0.0914 + t * (2.1941 + t * (4.8429 + t * (-14.1850 + t * (4.2772 + t * 2.8295)))),
      0.1066 + t * (12.6419 + t * (-60.5820 + t * (110.3627 + t * (-89.9031 + t * 27.3482))))
    ),
    0.0,
    1.0
  );
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 ndc = vUv * 2.0 - 1.0;
  float tanHalfFov = tan(0.5 * uFov);

  // Construct initial ray direction in world coordinates from camera basis + FOV
  vec3 rayDir = normalize(
    uCamForward +
    (ndc.x * aspect * tanHalfFov) * uCamRight +
    (ndc.y * tanHalfFov) * uCamUp
  );

  // Establish invariant Schwarzschild orbital plane basis (e1, e2)
  float r0 = max(length(uCamPos), RS * 1.05);
  vec3 e1 = uCamPos / r0;
  float cosPsi = clamp(dot(rayDir, e1), -1.0, 1.0);
  float sinPsi = sqrt(max(0.0, 1.0 - cosPsi * cosPsi));

  vec3 tang = rayDir - cosPsi * e1;
  float tangLen = length(tang);
  vec3 fallbackAxis = abs(e1.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 e2 = tangLen > 1e-6 ? (tang / tangLen) : normalize(cross(e1, fallbackAxis));

  // Conserved Schwarzschild impact parameter b = L / E for local static observer at r0
  float observerLapse = sqrt(max(1e-4, 1.0 - RS / r0));
  float impactB = (r0 * sinPsi) / observerLapse;

  GeodesicState state = GeodesicState(r0, cosPsi, 0.0, impactB);
  vec3 pos = uCamPos;

  // Radiative transfer & diagnostic accumulators
  vec3 accumRadiance = vec3(0.0);
  vec3 restFrameAccum = vec3(0.0);
  float transmittance = 1.0;

  bool captured = false;
  bool escaped = false;
  int stepsTaken = 0;
  float minR = r0;

  int equatorialCrossings = 0;
  int diskHitCount = 0;
  int firstHitOrder = -1;
  int maxHitOrder = -1;
  float orderWeight0 = 0.0;
  float orderWeight1 = 0.0;
  float orderWeightHigh = 0.0;

  float weightedGFactor = 0.0;
  float gWeightSum = 0.0;
  float lastDiskHitPhi = -100.0;

  float slabMaxBound = uDiskThickness * 1.25 + 0.015;
  float innerR = uDiskInner;
  float outerR = max(uDiskOuter, innerR + 1.0);
  bool diskEnabled = (uDebugMode != 7);

  for (int i = 0; i < 380; i++) {
    if (i >= uMaxSteps) break;
    stepsTaken = i + 1;

    // Adaptive affine step size: fine near photon sphere (r = 1.5 rs), horizon & disk midplane
    float distPhoton = abs(state.r - R_PHOTON);
    float baseStep = min(
      0.048 + 0.105 * max(state.r - 0.92 * RS, 0.03),
      0.026 + 0.135 * clamp(distPhoton, 0.04, 12.0)
    );
    if (state.r > innerR - 1.2 && state.r < outerR + 1.8 && abs(pos.y) < slabMaxBound * 3.2 + 0.42) {
      baseStep = min(baseStep, 0.115);
    }
    float h = uStepScale * baseStep;

    GeodesicState nextState = rk4GeodesicStep(state, h);
    vec3 nextPos = orbitalToWorld(nextState.r, nextState.phi, e1, e2);

    minR = min(minR, nextState.r);

    // Track equatorial plane (y = 0) crossings outside the event horizon
    bool crossedMidplane = (pos.y > 0.0 && nextPos.y <= 0.0) || (pos.y < 0.0 && nextPos.y >= 0.0);
    if (crossedMidplane && nextState.r > RS * 1.002) {
      equatorialCrossings += 1;
    }

    // Curved-segment volumetric & midplane accretion disk intersection
    if (diskEnabled && nextState.r > RS * 1.01) {
      bool yOverlaps = !((pos.y > slabMaxBound && nextPos.y > slabMaxBound) ||
                         (pos.y < -slabMaxBound && nextPos.y < -slabMaxBound));
      if (yOverlaps) {
        float dy = nextPos.y - pos.y;
        float tMid = abs(dy) > 1e-6 ? clamp(-pos.y / dy, 0.0, 1.0) : 0.5;
        vec3 pClosest = mix(pos, nextPos, tMid);
        float rCylClosest = length(pClosest.xz);

        if (rCylClosest >= innerR * 0.97 && rCylClosest <= outerR * 1.02) {
          float localH = max(evalDiskHalfHeight(rCylClosest), 0.015);

          float ta = 0.0;
          float tb = 1.0;
          if (abs(dy) > 1e-6) {
            float t0 = (-localH - pos.y) / dy;
            float t1 = (localH - pos.y) / dy;
            ta = clamp(min(t0, t1), 0.0, 1.0);
            tb = clamp(max(t0, t1), 0.0, 1.0);
          } else if (abs(pos.y) > localH) {
            ta = 1.0;
            tb = 0.0;
          }

          if (tb > ta + 1e-5) {
            float segLen = length(nextPos - pos) * (tb - ta);
            float ds = segLen / float(uDiskSamples);
            float hitPhi = mix(state.phi, nextState.phi, 0.5 * (ta + tb));

            // Count distinct curved-ray crossings separated in orbital azimuth
            if (hitPhi - lastDiskHitPhi > 1.05) {
              diskHitCount += 1;
              lastDiskHitPhi = hitPhi;
            }

            // Classify relativistic lensing image order:
            //   order 0: Primary image (front & bent upper arch, 1st crossing & phi < ~pi)
            //   order 1: Secondary lensed image (under-shadow arch / 2nd equatorial crossing)
            //   order 2+: Higher-order photon-ring sub-images wrapping >= 1 full half-turn
            int hitOrder = 0;
            if (equatorialCrossings >= 3 || hitPhi >= 1.92 * PI) {
              hitOrder = 2;
            } else if (equatorialCrossings == 2 || hitPhi >= 1.02 * PI) {
              hitOrder = 1;
            }
            if (firstHitOrder < 0) firstHitOrder = hitOrder;
            maxHitOrder = max(maxHitOrder, hitOrder);

            for (int sIdx = 0; sIdx < 4; sIdx++) {
              if (sIdx >= uDiskSamples) break;
              float frac = (float(sIdx) + 0.5) / float(uDiskSamples);
              float tSample = mix(ta, tb, frac);

              vec3 samplePos = mix(pos, nextPos, tSample);
              float R = length(samplePos.xz);
              if (R < innerR || R > outerR) continue;

              float sampleH = max(evalDiskHalfHeight(R), 0.015);
              float vNorm = samplePos.y / sampleH;
              if (abs(vNorm) > 1.05) continue;

              // Smooth radial inner ISCO cutoff & outer taper
              float uRad = clamp((R - innerR) / max(outerR - innerR, 0.5), 0.0, 1.0);
              float innerEdge = smoothstep(0.0, 0.045, uRad);
              float outerEdge = pow(1.0 - smoothstep(0.55, 1.0, uRad), 1.35);
              float verticalProfile = exp(-2.35 * vNorm * vNorm);

              float turb = evalDiskTurbulence(samplePos, R, uTime);
              float density = innerEdge * outerEdge * verticalProfile * turb;
              if (density <= 1e-4) continue;

              // Novikov–Thorne radial temperature profile + hot inner plunge rim
              float rRatio = innerR / max(R, innerR);
              float ntFactor = pow(rRatio, 0.75) * pow(max(1.0 - sqrt(0.78 * rRatio), 0.025), 0.25);
              float innerRimBoost = 0.28 * exp(-max(R - innerR, 0.0) / 0.55);
              float emitterTemp = uDiskTemp * clamp(1.42 * ntFactor + innerRimBoost, 0.20, 1.45);

              // Relativistic circular Keplerian velocity in Schwarzschild metric:
              // beta_phi = sqrt(rs / (2 * (R - rs))) * uOrbitalSpeed
              float betaKep = sqrt(RS / max(2.0 * (R - RS), 0.18)) * uOrbitalSpeed;
              float beta = clamp(betaKep, 0.0, 0.90);
              float gamma = inversesqrt(max(1.0 - beta * beta, 0.08));

              // Prograde azimuthal tangent vector in equatorial plane
              vec3 orbDir = vec3(-samplePos.z, 0.0, samplePos.x) / max(R, 1e-4);

              GeodesicState midState = GeodesicState(
                mix(state.r, nextState.r, tSample),
                mix(state.vr, nextState.vr, tSample),
                mix(state.phi, nextState.phi, tSample),
                state.b
              );
              vec3 rayLocalDir = orbitalTangentWorld(midState, e1, e2);
              // Photon travels from emitter to observer along -rayLocalDir
              float cosThetaV = clamp(dot(orbDir, -rayLocalDir), -0.99, 0.99);

              // Combined gravitational redshift + kinematic relativistic Doppler factor g = nu_obs / nu_em
              float gravRedshift = sqrt(clamp((1.0 - RS / max(R, RS * 1.02)) / max(observerLapse * observerLapse, 0.08), 0.04, 2.0));
              float dopplerFactor = 1.0 / (gamma * (1.0 - beta * cosThetaV));
              float gFactor = clamp(gravRedshift * dopplerFactor, 0.12, 3.6);

              // Liouville invariant I_obs = g^3.5 * I_em & Doppler-shifted Planckian color temperature
              float beaming = pow(gFactor, 3.45);
              vec3 shiftedColor = blackbodyColor(emitterTemp * gFactor);
              vec3 restColor = blackbodyColor(emitterTemp);

              // Optical depth normalized so razor-thin & thick slabs both integrate cleanly
              float thicknessScale = mix(1.0 / sampleH, 9.0, 0.35);
              float dTau = density * uDiskOpacity * thicknessScale * ds * 0.42;
              float alpha = 1.0 - exp(-dTau);

              float radialFlux = pow(rRatio, 1.55) * (0.65 + 0.65 * turb);
              vec3 sampleEmission = shiftedColor * uDiskIntensity * radialFlux * beaming * 2.35;
              vec3 sampleRest = restColor * uDiskIntensity * radialFlux * 1.45;

              float contribWeight = transmittance * alpha;
              accumRadiance += contribWeight * sampleEmission;
              restFrameAccum += contribWeight * sampleRest;

              weightedGFactor += contribWeight * gFactor;
              gWeightSum += contribWeight;

              if (hitOrder == 0) orderWeight0 += contribWeight;
              else if (hitOrder == 1) orderWeight1 += contribWeight;
              else orderWeightHigh += contribWeight;

              transmittance *= (1.0 - alpha);
            }
          }
        }
      }
    }

    state = nextState;
    pos = nextPos;

    // Event horizon capture: r <= rs => zero background light escapes from inside the horizon
    if (state.r <= RS * 1.002) {
      captured = true;
      minR = RS;
      break;
    }

    // Escaped to asymptotically flat region
    if (state.r >= R_ESCAPE && state.vr > 0.0) {
      escaped = true;
      break;
    }

    // Early-out once foreground disk is completely opaque (except step/order diagnostics)
    if (transmittance < 0.0025 && uDebugMode == 0) {
      break;
    }
  }

  // Compute asymptotic escaped direction & total bending angle for uncaptured rays
  float tailAngle = (!captured && state.vr > 0.0) ? asin(clamp(impactB / max(state.r, impactB + 0.1), 0.0, 0.98)) : 0.0;
  float phiInf = state.phi + tailAngle;
  vec3 escapedDir = normalize(cos(phiInf) * e1 + sin(phiInf) * e2);
  float deflectionAngle = max(0.0, acos(clamp(dot(rayDir, escapedDir), -1.0, 1.0)));

  // Critical photon-ring grazing emission from hot scattered corona for rays winding near r = 1.5 rs
  if (!captured && diskEnabled && uDiskIntensity > 0.01) {
    float bDelta = abs(impactB - B_CRIT);
    float criticalRing = exp(-bDelta / 0.028) * smoothstep(1.35 * PI, 2.35 * PI, state.phi);
    vec3 ringTint = blackbodyColor(uDiskTemp * 1.18);
    accumRadiance += transmittance * ringTint * criticalRing * uDiskIntensity * 1.55;
    orderWeightHigh += transmittance * criticalRing * 0.85;
  }

  vec3 skyRadiance = vec3(0.0);
  if (!captured) {
    skyRadiance = evalProceduralSky(escapedDir, deflectionAngle);
  }

  vec3 finalHdr = accumRadiance + transmittance * skyRadiance;

  // ==================== DIAGNOSTIC VIEWS (0..9) ====================
  if (uDebugMode == 0 || uDebugMode == 7 || uDebugMode == 9) {
    fragColor = vec4(max(finalHdr, vec3(0.0)), 1.0);
    return;
  }

  if (uDebugMode == 1) {
    // 1: Geodesic RK4 Step Ratio & Horizon Termination
    float stepRatio = float(stepsTaken) / float(max(uMaxSteps, 1));
    vec3 heat = scientificHeatmap(pow(stepRatio, 0.78));
    if (captured) {
      heat = mix(vec3(0.16, 0.01, 0.04), vec3(0.55, 0.06, 0.12), stepRatio);
    }
    fragColor = vec4(heat, 1.0);
    return;
  }

  if (uDebugMode == 2) {
    // 2: Event Horizon Shadow Mask & Critical Impact Parameter Contours
    if (captured) {
      fragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    float critDist = abs(impactB - B_CRIT);
    float photonLine = exp(-critDist / 0.035);
    float photonHalo = exp(-critDist / 0.22);
    float bRings = 0.5 + 0.5 * cos(impactB * PI * 2.0);
    float gridMask = smoothstep(0.92, 0.995, bRings) * 0.35;
    vec3 col = vec3(0.04, 0.09, 0.16) + gridMask * vec3(0.18, 0.45, 0.65);
    col += photonHalo * vec3(0.12, 0.55, 0.78) + photonLine * vec3(1.0, 0.86, 0.42);
    fragColor = vec4(col, 1.0);
    return;
  }

  if (uDebugMode == 3) {
    // 3: Curved-Path Disk Crossings & Relativistic Image Order (n = 0, 1, >=2)
    vec3 orderCol =
      orderWeight0 * vec3(0.08, 0.72, 1.0) +
      orderWeight1 * vec3(1.0, 0.68, 0.10) +
      orderWeightHigh * vec3(1.0, 0.18, 0.82) * 1.4;
    if (diskHitCount >= 2) {
      // Highlight pixels where a single curved geodesic intersected the disk multiple times
      orderCol += vec3(0.28, 0.95, 0.52) * 0.35 * min(float(diskHitCount - 1), 3.0);
    }
    if (!captured && gWeightSum < 0.01) {
      orderCol += vec3(0.02, 0.03, 0.06);
    }
    fragColor = vec4(clamp(orderCol, 0.0, 1.0), 1.0);
    return;
  }

  if (uDebugMode == 4) {
    // 4: Relativistic Doppler + Gravitational Redshift g-Factor
    if (gWeightSum < 0.005) {
      float rim = !captured ? 0.12 * exp(-abs(impactB - B_CRIT) / 0.08) : 0.0;
      fragColor = vec4(vec3(rim), 1.0);
      return;
    }
    float gMean = weightedGFactor / gWeightSum;
    // Map g in [0.35, 1.85] -> [-1, +1] around g = 1.0
    float deltaG = clamp((gMean - 1.0) / 0.65, -1.0, 1.0);
    vec3 redCol = vec3(0.88, 0.12, 0.22);
    vec3 midCol = vec3(0.94, 0.95, 0.98);
    vec3 blueCol = vec3(0.10, 0.58, 1.00);
    vec3 col = deltaG >= 0.0 ? mix(midCol, blueCol, deltaG) : mix(midCol, redCol, -deltaG);
    float opacityMask = clamp(1.0 - transmittance, 0.15, 1.0);
    fragColor = vec4(col * opacityMask, 1.0);
    return;
  }

  if (uDebugMode == 5) {
    // 5: Intrinsic Rest-Frame Disk Temperature & Spiral Turbulence (unbeamed)
    vec3 mapped = restFrameAccum / (vec3(1.0) + restFrameAccum);
    fragColor = vec4(pow(max(mapped, vec3(0.0)), vec3(1.0 / 2.2)), 1.0);
    return;
  }

  if (uDebugMode == 6) {
    // 6: Lensed Celestial Coordinates & Gravitational Deflection Angle
    if (captured) {
      fragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    float lon = atan(escapedDir.z, escapedDir.x); // [-pi, pi]
    float lat = asin(clamp(escapedDir.y, -1.0, 1.0)); // [-pi/2, pi/2]
    float gridLon = smoothstep(0.90, 0.985, cos(lon * 12.0));
    float gridLat = smoothstep(0.90, 0.985, cos(lat * 12.0));
    float grid = max(gridLon, gridLat);
    vec3 baseUv = vec3(0.5 + 0.5 * (lon / PI), 0.5 + (lat / PI), clamp(deflectionAngle / PI, 0.0, 1.0));
    vec3 col = baseUv * 0.58 + grid * vec3(0.95, 0.92, 0.72) * 0.65;
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    return;
  }

  if (uDebugMode == 8) {
    // 8: Closest Periapsis Radius r_min / rs & Accumulated Disk Optical Opacity
    float periNorm = captured ? 0.0 : clamp((minR - RS) / 10.0, 0.0, 1.0);
    float diskAlpha = 1.0 - transmittance;
    float critBand = !captured ? exp(-abs(minR - R_PHOTON) / 0.12) : 0.0;
    vec3 col = vec3(
      critBand * 0.95 + (1.0 - periNorm) * (captured ? 0.0 : 0.35),
      diskAlpha * 0.92,
      periNorm * 0.85
    );
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    return;
  }

  fragColor = vec4(finalHdr, 1.0);
}
`;

export const BLOOM_PREFILTER_SHADER = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uHdrTex;
uniform float uThreshold;

void main() {
  vec3 c = max(texture(uHdrTex, vUv).rgb, vec3(0.0));
  // Clamp extreme single-pixel fireflies while preserving wide HDR range
  c = min(c, vec3(48.0));
  float brightness = max(c.r, max(c.g, c.b));
  float knee = max(uThreshold * 0.55, 0.05);
  float soft = brightness - uThreshold + knee;
  soft = clamp(soft, 0.0, 2.0 * knee);
  soft = (soft * soft) / (4.0 * knee + 1e-5);
  float contrib = max(soft, brightness - uThreshold) / max(brightness, 1e-4);
  fragColor = vec4(c * max(contrib, 0.0), 1.0);
}
`;

export const BLOOM_BLUR_SHADER = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uTex;
uniform vec2 uTexelSize;
uniform vec2 uDirection;
uniform float uRadius;
uniform int uTaps;

void main() {
  vec2 stepUv = uTexelSize * uDirection * uRadius;
  if (uTaps <= 5) {
    vec3 sum = texture(uTex, vUv).rgb * 0.2941176;
    sum += texture(uTex, vUv + stepUv * 1.3333333).rgb * 0.3529412;
    sum += texture(uTex, vUv - stepUv * 1.3333333).rgb * 0.3529412;
    fragColor = vec4(sum, 1.0);
    return;
  }

  if (uTaps <= 9) {
    vec3 sum = texture(uTex, vUv).rgb * 0.2270270;
    sum += (texture(uTex, vUv + stepUv * 1.3846154).rgb +
            texture(uTex, vUv - stepUv * 1.3846154).rgb) * 0.3162162;
    sum += (texture(uTex, vUv + stepUv * 3.2307692).rgb +
            texture(uTex, vUv - stepUv * 3.2307692).rgb) * 0.0702703;
    fragColor = vec4(sum, 1.0);
    return;
  }

  // 13-tap wide Gaussian for Cinematic bloom
  vec3 sum = texture(uTex, vUv).rgb * 0.1964826;
  sum += (texture(uTex, vUv + stepUv * 1.4117647).rgb +
          texture(uTex, vUv - stepUv * 1.4117647).rgb) * 0.2969069;
  sum += (texture(uTex, vUv + stepUv * 3.2941176).rgb +
          texture(uTex, vUv - stepUv * 3.2941176).rgb) * 0.0944704;
  sum += (texture(uTex, vUv + stepUv * 5.1764706).rgb +
          texture(uTex, vUv - stepUv * 5.1764706).rgb) * 0.0103814;
  fragColor = vec4(sum, 1.0);
}
`;

export const COMPOSITE_POST_SHADER = /* glsl */ `
precision highp float;
precision highp int;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uHdrTex;
uniform sampler2D uBloom0;
uniform sampler2D uBloom1;
uniform sampler2D uBloom2;
uniform sampler2D uBloom3;
uniform int uBloomMips;

uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uFilmGrain;
uniform float uChromaticAberration;
uniform float uTime;
uniform vec2 uResolution;
uniform int uDebugMode;

/**
 * Stephen Hill's fitted ACES RRT + ODT Filmic Tone Mapping (sRGB -> AP1 -> RRT/ODT -> sRGB)
 * Naturally desaturates intense orange-gold relativistic plasma highlights to white.
 */
vec3 acesToneMap(vec3 color) {
  const mat3 acesInput = mat3(
    0.59719, 0.07600, 0.02840,
    0.35458, 0.90834, 0.13383,
    0.04823, 0.01566, 0.83777
  );
  const mat3 acesOutput = mat3(
     1.60475, -0.10208, -0.00327,
    -0.53108,  1.10813, -0.07276,
    -0.07367, -0.00605,  1.07602
  );
  vec3 v = acesInput * color;
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return clamp(acesOutput * (a / b), 0.0, 1.0);
}

vec3 linearToSrgb(vec3 lin) {
  vec3 lo = lin * 12.92;
  vec3 hi = 1.055 * pow(max(lin, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), lin));
}

float interleavedGradientNoise(vec2 px, float t) {
  float frameSeed = floor(t * 24.0) * 5.588238;
  return fract(52.9829189 * fract(dot(px + frameSeed, vec2(0.06711056, 0.00583715))));
}

vec3 sampleCombinedBloom(vec2 uv) {
  vec3 b = texture(uBloom0, uv).rgb * 0.44;
  b += texture(uBloom1, uv).rgb * 0.32;
  if (uBloomMips >= 3) b += texture(uBloom2, uv).rgb * 0.16;
  if (uBloomMips >= 4) b += texture(uBloom3, uv).rgb * 0.10;
  return b;
}

void main() {
  // Diagnostic modes 1..8 are already formatted directly in Pass 1
  if (uDebugMode >= 1 && uDebugMode <= 8) {
    fragColor = vec4(texture(uHdrTex, vUv).rgb, 1.0);
    return;
  }

  // Debug mode 9: Raw Pre-Post HDR Radiance inspection (log-compressed dynamic range + over-unity indicator)
  if (uDebugMode == 9) {
    vec3 rawHdr = max(texture(uHdrTex, vUv).rgb, vec3(0.0));
    // Soft logarithmic radiance readout preserving HDR ratios without Bloom/ACES/lens effects
    vec3 logView = log2(vec3(1.0) + rawHdr * 1.35) / log2(18.0);
    float peak = max(rawHdr.r, max(rawHdr.g, rawHdr.b));
    float superHdrContour = smoothstep(2.9, 3.1, peak) * (1.0 - smoothstep(3.15, 3.4, peak));
    vec3 outRaw = clamp(logView, 0.0, 1.0) + superHdrContour * vec3(0.0, 0.85, 0.95) * 0.45;
    fragColor = vec4(outRaw, 1.0);
    return;
  }

  // Subtle radial chromatic dispersion (strictly 0 at screen center so photon ring stays razor-sharp)
  vec2 centered = vUv - 0.5;
  float r2 = dot(centered, centered);
  vec2 caOffset = centered * r2 * (0.014 * uChromaticAberration);

  vec3 hdr;
  if (uChromaticAberration > 0.001) {
    hdr.r = texture(uHdrTex, clamp(vUv + caOffset, 0.001, 0.999)).r;
    hdr.g = texture(uHdrTex, vUv).g;
    hdr.b = texture(uHdrTex, clamp(vUv - caOffset, 0.001, 0.999)).b;
  } else {
    hdr = texture(uHdrTex, vUv).rgb;
  }

  vec3 bloom = vec3(0.0);
  if (uBloomStrength > 0.001) {
    if (uChromaticAberration > 0.001) {
      bloom.r = sampleCombinedBloom(clamp(vUv + caOffset * 1.4, 0.001, 0.999)).r;
      bloom.g = sampleCombinedBloom(vUv).g;
      bloom.b = sampleCombinedBloom(clamp(vUv - caOffset * 1.4, 0.001, 0.999)).b;
    } else {
      bloom = sampleCombinedBloom(vUv);
    }
  }

  vec3 exposed = max(hdr + bloom * uBloomStrength, vec3(0.0)) * uExposure;
  vec3 mapped = acesToneMap(exposed);

  // Restrained optical vignette around outer frame corners
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 vigCoord = vec2(centered.x * mix(1.0, aspect, 0.35), centered.y);
  float vigDist = length(vigCoord) * 1.42;
  float vigFactor = 1.0 - uVignette * smoothstep(0.42, 1.22, vigDist) * 0.78;
  mapped *= clamp(vigFactor, 0.15, 1.0);

  vec3 srgb = linearToSrgb(mapped);

  // Deterministic film grain (attenuated in pure black event horizon core so shadow stays pitch-black)
  if (uFilmGrain > 0.0005) {
    float lum = dot(srgb, vec3(0.2126, 0.7152, 0.0722));
    float shadowKeepDark = smoothstep(0.004, 0.045, lum);
    float n = interleavedGradientNoise(gl_FragCoord.xy, uTime) - 0.5;
    srgb = clamp(srgb + n * uFilmGrain * (0.25 + 0.75 * shadowKeepDark) * (1.0 - 0.55 * lum), 0.0, 1.0);
  }

  fragColor = vec4(srgb, 1.0);
}
`;
