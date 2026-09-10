/**
 * GARGANTUA full-screen fragment shader.
 *
 * PHYSICS — Schwarzschild null geodesics
 * --------------------------------------
 * World units: 1 unit = 1 Schwarzschild radius rₛ (event horizon at r = 1).
 * Each pixel traces one photon backwards from the camera through the
 * Schwarzschild geometry by numerically integrating the exact null-geodesic
 * orbit equation. In Schwarzschild coordinates the photon path obeys the
 * Binet-form orbit equation (exact for null geodesics):
 *
 *     d²u/dφ² + u = (3/2) rₛ u²,      u = 1/r
 *
 * which we integrate in the equivalent vector form
 *
 *     d²x/dλ² = −(3/2) rₛ h² x / |x|⁵,   h² = |x × dx/dλ|² (conserved)
 *
 * with x the position and λ an affine-like parameter. The spatial path of
 * this ODE is exactly the Schwarzschild photon orbit (same Binet equation);
 * event-horizon capture (r < rₛ), the photon sphere at r = 1.5 rₛ, the
 * critical impact parameter b_c = (3√3/2) rₛ and all lensing arise from the
 * integration, not from any baked or analytic substitute.
 *
 * Integrator: classic RK4 (see geodesicAccel / geodesicRK4Step) with an
 * adaptive radial step (finer near the hole and inside the disk slab).
 *
 * Termination conditions (see marchRay):
 *   r < 1          → crossed the event horizon: output stays black.
 *   r > escapeR    → escaped: sample the procedural, lensed sky.
 *   step budget    → rays loitering on the unstable photon orbit count as
 *                    captured (deep black), which sharpens the photon ring.
 *
 * The accretion disk is a volumetric slab around the equatorial plane
 * sampled in path order, so a single ray collects its primary, secondary and
 * higher-order disk images (light bent over/under the hole) automatically.
 * Disk emission includes Keplerian orbital Doppler beaming, gravitational
 * redshift, a Shakura–Sunyaev-like radial temperature profile, and fbm
 * turbulence advected by differential rotation.
 */

export const FULLSCREEN_VERTEX_SHADER = /* glsl */ `
varying vec2 vNdc;

void main() {
  vNdc = position.xy;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const GEODESIC_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

varying vec2 vNdc;

uniform vec2 uResolution;
uniform float uSimTime;      // simulation time in seconds (frozen by ?capture)
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;

// 吸积盘（单位 rₛ）
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfThickness;
uniform float uDiskTemperature;   // Kelvin at the profile peak
uniform float uDiskBrightness;
uniform float uOrbitalSpeedScale; // scales Keplerian β and pattern advection
uniform float uTurbAmplitude;
uniform float uTurbSpeed;
uniform int uTurbOctaves;

// 背景与积分预算
uniform float uStarDensity;
uniform float uGalaxyBrightness;
uniform int uMaxSteps;
uniform int uDebugView;      // 0 composite, 1–9 diagnostics (see debugMux)
uniform float uDiskOnly;     // debug 8 helper: suppress the sky

const float RS = 1.0;                     // Schwarzschild radius in world units
const float PHOTON_SPHERE = 1.5;          // r = 3/2 rₛ
const float CRITICAL_B = 2.5980762;       // (3√3/2) rₛ impact parameter
const int MAX_STEP_BUDGET = 640;          // hard loop bound; real budget is uMaxSteps
const float ESCAPE_FLOOR = 34.0;          // escape radius never below this

// ---------------------------------------------------------------- hashing --
float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

vec3 hash33(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.xxy + p.yxx) * p.zyx);
}

// -------------------------------------------------------------- value noise --
float valueNoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash13(i), hash13(i + vec3(1.0, 0.0, 0.0)), u.x),
        mix(hash13(i + vec3(0.0, 1.0, 0.0)), hash13(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
    mix(mix(hash13(i + vec3(0.0, 0.0, 1.0)), hash13(i + vec3(1.0, 0.0, 1.0)), u.x),
        mix(hash13(i + vec3(0.0, 1.0, 1.0)), hash13(i + vec3(1.0, 1.0, 1.0)), u.x), u.y),
    u.z);
}

// Constant upper bound with a dynamic break keeps GLSL ES 1.00 happy.
float fbm(vec3 p, int octaves) {
  float amp = 0.5;
  float sum = 0.0;
  float norm = 0.0;
  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    sum += amp * valueNoise(p);
    norm += amp;
    amp *= 0.5;
    p = p * 2.17 + vec3(11.7, 5.3, 7.1);
  }
  return sum / max(norm, 1e-4);
}

// --------------------------------------------------------------- blackbody --
// Compact fit of the blackbody chromaticity curve (Tanner Helland's
// approximation), input Kelvin, output linear-ish RGB.
vec3 blackbodyRGB(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  float r;
  float g;
  float b;
  if (t <= 66.0) {
    r = 1.0;
    g = clamp((99.4708 * log(t) - 161.1196) / 255.0, 0.0, 1.0);
  } else {
    r = clamp(1.2929 * pow(t - 60.0, -0.1332), 0.0, 1.0);
    g = clamp(1.1299 * pow(t - 60.0, -0.0755), 0.0, 1.0);
  }
  if (t >= 66.0) {
    b = 1.0;
  } else if (t <= 19.0) {
    b = 0.0;
  } else {
    b = clamp((138.5177 * log(t - 10.0) - 305.0448) / 255.0, 0.0, 1.0);
  }
  return vec3(r, g, b);
}

// ------------------------------------------------------------- geodesic ODE --
// Right-hand side of the exact vector-form orbit equation (see header).
vec3 geodesicAccel(vec3 pos, float h2) {
  float r2 = dot(pos, pos);
  float r = sqrt(r2);
  return pos * (-1.5 * h2 / (r2 * r2 * r));
}

// One classic RK4 step of (pos, vel) over segment length ds.
void geodesicRK4Step(inout vec3 pos, inout vec3 vel, float h2, float ds) {
  vec3 a1 = geodesicAccel(pos, h2);
  vec3 p2 = pos + vel * (0.5 * ds);
  vec3 v2 = vel + a1 * (0.5 * ds);
  vec3 a2 = geodesicAccel(p2, h2);
  vec3 p3 = pos + v2 * (0.5 * ds);
  vec3 v3 = vel + a2 * (0.5 * ds);
  vec3 a3 = geodesicAccel(p3, h2);
  vec3 p4 = pos + v3 * ds;
  vec3 v4 = vel + a3 * ds;
  vec3 a4 = geodesicAccel(p4, h2);
  pos += (vel + 2.0 * v2 + 2.0 * v3 + v4) * (ds / 6.0);
  vel += (a1 + 2.0 * a2 + 2.0 * a3 + a4) * (ds / 6.0);
}

// ------------------------------------------------------------- star / galaxy --
vec3 starLayer(vec3 dir, float scale, float brightness) {
  vec3 g = dir * scale;
  vec3 id = floor(g);
  vec3 f = fract(g) - 0.5;
  vec3 h = hash33(id);
  // Density gate: fraction of cells that actually host a star.
  if (h.x > 0.02 + uStarDensity * 0.14) return vec3(0.0);
  vec3 offset = (h.yzx - 0.5) * 0.72;
  float dist = length(f - offset);
  float core = exp(-dist * dist * 340.0);
  float temp = mix(3200.0, 11500.0, h.z * h.z);
  return blackbodyRGB(temp) * (core * brightness * (0.3 + 0.7 * h.y));
}

// Procedural sky sampled with the *integrated* escape direction, so galactic
// structure warps around the hole exactly as the geodesics dictate.
vec3 skyBackground(vec3 dir) {
  vec3 col = vec3(0.010, 0.012, 0.020);

  vec3 galNormal = normalize(vec3(0.22, 1.0, -0.16));
  vec3 galCore = normalize(vec3(0.92, 0.10, 0.40));
  float bandDist = abs(dot(dir, galNormal));
  float band = exp(-bandDist * bandDist * 16.0);
  float coreGain = 0.35 + 2.1 * exp(-max(1.0 - dot(dir, galCore), 0.0) * 5.0);
  float nebula = fbm(dir * 4.2 + vec3(7.1), 5);
  float nebula2 = fbm(dir * 9.5 - vec3(3.2), 5);
  float dust = smoothstep(0.48, 0.78, fbm(dir * 6.1 + vec3(31.0), 5));
  vec3 galCol = mix(vec3(0.30, 0.38, 0.62), vec3(0.98, 0.74, 0.48),
                    clamp(coreGain - 0.35, 0.0, 1.0));
  col += galCol * band * (0.30 + 0.85 * nebula + 0.45 * nebula2)
       * (1.0 - 0.72 * dust * band) * coreGain * uGalaxyBrightness;

  col += starLayer(dir, 84.0, 1.05);
  col += starLayer(dir + vec3(3.7), 168.0, 0.55);
  return col;
}

// ------------------------------------------------------------ disk sampling --
// Emission collected in path order: every slab crossing adds light weighted
// by the remaining transmittance, which is what builds primary, secondary
// and higher-order lensed images of the disk.
void sampleDisk(vec3 pos, vec3 rayDir, float ds, inout vec3 accum,
                inout float transmittance, inout float gRecord) {
  float rc = length(pos.xz);
  if (rc < uDiskInner || rc > uDiskOuter) return;
  float thick = max(uDiskHalfThickness, 0.02);
  float dens = exp(-(pos.y * pos.y) / (thick * thick));
  if (dens < 0.004) return;

  // Shakura–Sunyaev-like radial profile: T ∝ (r/r_in)^(-3/4) (1-√(r_in/r))^(1/4).
  float q = max(1.0 - sqrt(uDiskInner / rc), 0.0);
  float profile = pow(uDiskInner / rc, 0.75) * pow(max(q, 1e-4), 0.25);

  // Turbulence advected by the differential Keplerian rotation Ω ∝ r^(-3/2):
  // the azimuthal sampling angle is wound back by Ω(r)·t, so neighboring
  // radii shear the pattern into spiral streaks over time.
  float phi = atan(pos.z, pos.x);
  float omega = 0.7071 * inversesqrt(rc * rc * rc);
  float advected = phi - omega * uOrbitalSpeedScale * uTurbSpeed * uSimTime * 0.35;
  vec3 turbP = vec3(rc * 2.3, pos.y * 5.0, 0.0)
             + vec3(cos(advected), 0.0, sin(advected)) * 3.1;
  float turb = mix(1.0, 0.22 + 1.45 * fbm(turbP, uTurbOctaves),
                   clamp(uTurbAmplitude, 0.0, 1.0));

  // Keplerian circular-orbit speed measured by a local static observer,
  // β = √(rₛ / (2(r − rₛ)))  (0.5 c at the ISCO r = 3 rₛ).
  float beta = sqrt(0.5 / max(rc - RS, 0.06));
  beta = clamp(beta * uOrbitalSpeedScale, 0.0, 0.995);
  vec3 tangent = normalize(vec3(-pos.z, 0.0, pos.x));
  vec3 photonDir = -normalize(rayDir);   // photon travels toward the camera
  float gamma = inversesqrt(max(1.0 - beta * beta, 1e-4));
  float doppler = 1.0 / (gamma * (1.0 - beta * dot(tangent, photonDir)));

  // Gravitational redshift from the emit radius out to the camera radius.
  float camR = max(length(uCamPos), 1.05);
  float gGrav = sqrt(max(1.0 - RS / rc, 0.02)) / sqrt(max(1.0 - RS / camR, 0.02));
  float g = doppler * gGrav;
  if (gRecord <= 0.0) gRecord = g;

  // Observed blackbody temperature shifts by g; bolometric-like beaming ~ g³.
  float tempObs = uDiskTemperature * profile * g;
  vec3 col = blackbodyRGB(tempObs);
  float boost = pow(clamp(g, 0.05, 6.0), 3.0);
  float emissivity = profile * turb * uDiskBrightness;

  accum += col * (emissivity * boost * dens * transmittance * ds);
  transmittance *= exp(-dens * 3.4 * ds);
}

// -------------------------------------------------------------------- march --
// Returns HDR radiance in accum; reports diagnostics through the out params.
vec3 marchRay(vec3 ro, vec3 rd, out float stepsUsed, out float termKind,
              out float crossings, out float gRecord, out vec3 escapeDir) {
  // h² = |x × v|² is conserved along the orbit equation; for a unit-length
  // initial direction |h| equals the impact parameter b.
  float h2 = pow(length(cross(ro, rd)), 2.0);
  vec3 pos = ro;
  vec3 vel = rd;
  vec3 accum = vec3(0.0);
  float transmittance = 1.0;
  float prevY = pos.y;
  crossings = 0.0;
  gRecord = 0.0;
  escapeDir = vec3(0.0);
  stepsUsed = 0.0;
  termKind = 0.0;  // 0 = step budget, 1 = horizon, 2 = escape
  float escapeR = max(uDiskOuter * 2.2 + 6.0, ESCAPE_FLOOR);

  for (int i = 0; i < MAX_STEP_BUDGET; i++) {
    if (i >= uMaxSteps) break;
    stepsUsed = float(i);
    float r = length(pos);

    // Adaptive step: coarser far out, finer near the hole and inside the
    // disk slab so vertical structure and multiple crossings resolve.
    float ds = clamp(0.32 * r / max(length(vel), 1e-4), 0.02, 1.4);
    if (abs(pos.y) < uDiskHalfThickness * 3.0 + 0.08
        && length(pos.xz) < uDiskOuter * 1.3) {
      ds = min(ds, max(uDiskHalfThickness * 0.45, 0.03));
    }

    geodesicRK4Step(pos, vel, h2, ds);
    sampleDisk(pos, vel, ds, accum, transmittance, gRecord);

    // Count equatorial-plane crossings that land in the disk annulus:
    // each one is one image order (primary, secondary, ...).
    float rc = length(pos.xz);
    if (prevY * pos.y < 0.0 && rc > uDiskInner * 0.8 && rc < uDiskOuter * 1.2) {
      crossings += 1.0;
    }
    prevY = pos.y;

    r = length(pos);
    if (r < RS) {           // event horizon: nothing beyond can shine
      termKind = 1.0;
      break;
    }
    if (r > escapeR) {      // escaped to the far sky
      termKind = 2.0;
      escapeDir = normalize(vel);
      break;
    }
  }
  // Rays that never terminated are pinned to the photon orbit: captured.
  if (termKind == 2.0 && uDiskOnly < 0.5) {
    // Sky light seen through whatever disk matter lies in front of it.
    accum += skyBackground(escapeDir) * transmittance;
  }
  return accum;
}

// ------------------------------------------------------------------- debug --
vec3 debugMux(vec3 radiance, vec3 rd, vec3 escapeDir, float stepsUsed,
              float termKind, float crossings, float gRecord, float h2) {
  if (uDebugView == 1) {  // 步进/终止热图
    float t = stepsUsed / max(float(uMaxSteps), 1.0);
    vec3 col = mix(vec3(0.03, 0.05, 0.22), vec3(0.15, 0.85, 0.55), t);
    col = mix(col, vec3(0.95, 0.95, 0.9), smoothstep(0.85, 1.0, t));
    if (termKind == 1.0) col = vec3(0.35, 0.03, 0.03);   // horizon capture
    if (termKind == 2.0) col = mix(col, vec3(0.1, 0.2, 0.7), 0.35);
    if (termKind == 0.0) col = vec3(0.8, 0.25, 0.05);    // budget exhausted
    return col;
  }
  if (uDebugView == 2) {  // 事件视界掩码
    return termKind == 1.0 ? vec3(0.95, 0.88, 0.82) : vec3(0.02, 0.035, 0.08);
  }
  if (uDebugView == 3) {  // 盘面交点及阶次
    if (crossings < 0.5) return vec3(0.02, 0.03, 0.05);
    if (crossings < 1.5) return vec3(1.0, 0.55, 0.15);   // primary image
    if (crossings < 2.5) return vec3(0.2, 0.85, 0.9);    // secondary image
    return vec3(0.95);                                    // higher orders
  }
  if (uDebugView == 4) {  // 红移 / Doppler g 因子
    if (gRecord <= 0.0) return vec3(0.03);
    float x = clamp((gRecord - 1.0) * 1.4 + 0.5, 0.0, 1.0);
    return mix(vec3(0.92, 0.16, 0.08), vec3(0.16, 0.45, 0.98), x);
  }
  if (uDebugView == 5) {  // 背景透镜坐标（逃逸方向 equirect 网格）
    vec3 d = termKind == 2.0 ? escapeDir : rd;
    float lon = atan(d.z, d.x) / 6.2831853 + 0.5;
    float lat = asin(clamp(d.y, -1.0, 1.0)) / 3.1415927 + 0.5;
    vec3 col = vec3(lon * 0.85, lat, 0.12) * 0.8;
    float grid = max(
      step(0.965, fract(lon * 24.0)),
      step(0.955, fract(lat * 12.0)));
    return col + grid * 0.25;
  }
  if (uDebugView == 6) {  // 星空 / 银河（无黑洞遮挡合成）
    vec3 d = termKind == 2.0 ? escapeDir : rd;
    return skyBackground(d);
  }
  if (uDebugView == 8) {  // 仅盘面发射（天空关闭）
    return radiance;
  }
  if (uDebugView == 9) {  // 捕获边界 / 冲击参数带
    float b = sqrt(h2);
    float t = clamp(b / 8.0, 0.0, 1.0);
    vec3 col = vec3(t * 0.55, t * 0.55, t * 0.7);
    float band = exp(-pow((b - CRITICAL_B) * 5.0, 2.0));
    col += vec3(0.1, 0.9, 0.35) * band;
    if (termKind == 1.0) col = mix(vec3(0.4, 0.05, 0.05), col, 0.35);
    return col;
  }
  return radiance;  // 0 = 最终合成, 7 = HDR（由后处理层改道）
}

void main() {
  vec2 ndc = vNdc;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec3 rd = normalize(uCamForward
      + uCamRight * ndc.x * uTanHalfFov * aspect
      + uCamUp * ndc.y * uTanHalfFov);
  vec3 ro = uCamPos;

  float stepsUsed;
  float termKind;
  float crossings;
  float gRecord;
  vec3 escapeDir;
  float h2 = pow(length(cross(ro, rd)), 2.0);
  vec3 radiance = marchRay(ro, rd, stepsUsed, termKind, crossings, gRecord, escapeDir);

  vec3 outCol = debugMux(radiance, rd, escapeDir, stepsUsed, termKind,
                         crossings, gRecord, h2);
  gl_FragColor = vec4(max(outCol, 0.0), 1.0);
}
`;
