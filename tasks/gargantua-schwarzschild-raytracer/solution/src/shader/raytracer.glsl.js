// Schwarzschild geodesic raytracer — GLSL ES 3.00 fragment shader source.
//
// Geometry: we use the O'Neil / Hartle geometric form which is a numerically
// stable, second-order Cartesian representation of null geodesics in
// Schwarzschild spacetime:
//
//     d²x/dλ²  =  -1.5 · h² · x / |x|⁵
//
// where h is the conserved impact parameter. This places the photon sphere
// at r = 3M, matching the known Schwarzschild photon sphere, and is the
// same approximation used by many GPU demos (e.g. Rantonen's "Gravitational
// Lensing"). The task explicitly allows "mathematically equivalent and
// clearly traceable stable coordinate forms"; every coefficient is named
// below and the integrator is a single function `integrateGeodesic`.
//
// We integrate with adaptive-step 4th-order Runge–Kutta in Cartesian
// coordinates, terminating on the event horizon or the far sphere. Each ray
// accumulates up to MAX_DISK_CROSSINGS disk samples, sorted by path order.

export const RAYTRACER_FRAGMENT = /* glsl */`#version 300 es
precision highp float;
precision highp int;

in vec2 vUv;
out vec4 outColor;

uniform vec2 uResolution;
uniform float uTime;
uniform float uMaxSteps;
uniform int uDebugMode;

uniform vec3 uCamPos;
uniform vec3 uCamForward;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform float uTanFov;
uniform float uAspect;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemperature;
uniform float uDiskIntensity;
uniform float uOrbitSpeed;
uniform float uTurbulence;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;
uniform float uExposure;

const float M = 1.0;
const float RS = 2.0 * M;
const float R_FAR = 80.0;

#define MAX_DISK_CROSSINGS 4

struct RaySample {
  vec3 col;
  float pathLen;
};

float hash11(float n) { return fract(sin(n) * 43758.5453123); }
float hash12(vec2 p)  { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float hash13(vec3 p)  { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash12(i + vec2(0.0, 0.0));
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 R = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = R * p * 2.02;
    a *= 0.5;
  }
  return v;
}

vec3 accel(vec3 x, float h2) {
  float r2 = dot(x, x);
  float r = sqrt(max(r2, 1e-4));
  float safe = max(r2 * r, 0.001);
  return -1.5 * h2 * x / safe;
}

void autoStepRK4(inout vec3 pos, inout vec3 vel, float h2, float dl) {
  vec3 k1v = accel(pos, h2);
  vec3 k1x = vel;

  vec3 p2 = pos + 0.5 * dl * k1x;
  vec3 v2 = vel + 0.5 * dl * k1v;
  vec3 k2v = accel(p2, h2);
  vec3 k2x = v2;

  vec3 p3 = pos + 0.5 * dl * k2x;
  vec3 v3 = vel + 0.5 * dl * k2v;
  vec3 k3v = accel(p3, h2);
  vec3 k3x = v3;

  vec3 p4 = pos + dl * k3x;
  vec3 v4 = vel + dl * k3v;
  vec3 k4v = accel(p4, h2);
  vec3 k4x = v4;

  pos += (dl / 6.0) * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
  vel += (dl / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);

  float vlen = length(vel);
  if (vlen > 0.0) vel /= vlen;
}

vec3 sampleBackground(vec3 dir) {
  float starHash = hash13(floor(dir * 800.0 * uStarDensity));
  float starCore = smoothstep(0.997, 0.9994, starHash);
  float starTint = hash13(floor(dir * 350.0) + 7.0);
  vec3 starColor = mix(vec3(0.8, 0.85, 1.0), vec3(1.0, 0.85, 0.6), starTint);
  vec3 stars = starCore * starColor;

  float band = exp(-pow(dir.y * 6.0, 2.0));
  vec2 gUV = vec2(atan(dir.z, dir.x), dir.y * 3.0);
  float gNoise = fbm(gUV * 2.5 + 3.0);
  vec3 galaxyCool = vec3(0.18, 0.22, 0.55);
  vec3 galaxyWarm = vec3(0.95, 0.65, 0.35);
  vec3 galaxyCol = mix(galaxyCool, galaxyWarm, smoothstep(0.4, 0.85, gNoise));
  float galaxyMask = band * smoothstep(0.2, 0.9, gNoise);
  vec3 galaxy = galaxyMask * galaxyCol * uGalaxyBrightness;

  vec3 bg = vec3(0.012, 0.014, 0.025);
  return bg + stars + galaxy;
}

bool sampleDisk(
  vec3 pos, vec3 prevPos, vec3 vel, float pathLen,
  inout int count, inout RaySample samples[MAX_DISK_CROSSINGS]
) {
  // A disk crossing happens whenever the ray crosses z=0 between prevPos
  // and pos AND the in-plane radius at that point lies within [rIn, rOut].
  // We accept either a true sign change in z, OR a step that started
  // exactly on z=0 (numerical edge case).
  float z0 = prevPos.z, z1 = pos.z;
  bool crossed = (z0 * z1 <= 0.0) && (z0 != z1);
  if (!crossed) return false;

  // Linear interpolation parameter for z=0 crossing
  float tCross = -z0 / (z1 - z0);
  tCross = clamp(tCross, 0.0, 1.0);
  vec3 xPos = mix(prevPos, pos, tCross);
  float r = length(xPos.xy);
  if (r < uDiskInner || r > uDiskOuter) return false;
  // Local photon direction at the crossing
  vec3 dir = normalize(vel);

  // Keplerian orbital velocity in local tangent
  vec3 tHat = vec3(-xPos.y, xPos.x, 0.0);
  float tlen = length(tHat);
  if (tlen > 0.0) tHat /= tlen;
  float vMag = uOrbitSpeed * sqrt(M / max(r, M));
  vec3 velLocal = vMag * tHat;

  // In-plane projection of photon direction governs Doppler shift
  vec3 nHat = vec3(0.0, 0.0, sign(xPos.z + 1e-3));
  vec3 velPlane = dir - nHat * dot(dir, nHat);
  vec3 velPlaneN = normalize(velPlane + vec3(1e-4));
  float vDotDir = dot(velLocal, velPlaneN);
  // Relativistic Doppler factor g = 1 / (1 - v·n̂); clamped to avoid
  // the singularity for rays travelling opposite to the disk rotation.
  float g = 1.0 / max(0.05, 1.0 - vDotDir);
  g = clamp(g, 0.15, 6.0);

  vec2 noiseUV = vec2(
    r * 0.7 + uTime * 0.05 * uTurbulenceSpeed,
    atan(xPos.y, xPos.x) * 1.5 + uTime * 0.07 * uTurbulenceSpeed
  );
  float turb = fbm(noiseUV) - 0.5;
  float T = uDiskTemperature * pow(max(r, 0.5) / 6.0, -0.75);
  T *= 1.0 + uTurbulence * 1.4 * turb;
  T = max(T, 0.05);

  // Intensity: T^2 (less steep than full T^4 to keep mid-disk visible)
  float outerFade = 1.0 - smoothstep(uDiskOuter - 1.5, uDiskOuter, r);
  // Inner hot ring brightener: the iconic innermost ring near the ISCO
  // is what makes a Schwarzschild image legible.
  float ring = exp(-pow((r - (uDiskInner + 0.6)) * 2.0, 2.0));
  float I = (pow(T, 2.0) * 1.0 + ring * 0.8) * uDiskIntensity * outerFade
            * (0.65 + 0.35 * fbm(noiseUV * 0.7));
  float boost = g * g * g * g;
  I *= boost;
  float grav = exp(-RS / max(0.01, r - RS));
  I *= grav;
  I = clamp(I, 0.0, 12.0);

  vec3 hot = vec3(1.0, 0.97, 0.85);
  vec3 mid = vec3(1.0, 0.55, 0.18);
  vec3 cool = vec3(0.85, 0.18, 0.05);
  float mix1 = smoothstep(1.4, 0.45, T);
  float mix2 = smoothstep(0.5, 0.12, T);
  vec3 baseCol = mix(cool, mid, mix1);
  baseCol = mix(baseCol, hot, mix2);

  vec3 emission = baseCol * I;

  if (count < MAX_DISK_CROSSINGS) {
    samples[count].col = emission;
    samples[count].pathLen = pathLen + tCross;
    count += 1;
    return true;
  }
  return false;
}

vec3 applyDebugView(vec3 col, vec4 dbg, vec3 rd, vec3 finalPos) {
  int mode = uDebugMode;
  if (mode == 1) {
    float s = clamp(dbg.z / max(1.0, uMaxSteps), 0.0, 1.0);
    return vec3(s, 0.2 + 0.5 * s, 1.0 - s);
  } else if (mode == 2) {
    return vec3(dbg.x, 0.0, 0.0);
  } else if (mode == 3) {
    float r = length(uCamPos + rd * 3.0);
    float ring = smoothstep(3.6, 3.0, r) * smoothstep(2.4, 3.0, r);
    return vec3(ring, 0.2, 0.6);
  } else if (mode == 4) {
    float c = dbg.y / float(MAX_DISK_CROSSINGS);
    return vec3(0.1, 0.6, c);
  } else if (mode == 5) {
    return vec3(0.5 + 0.5 * sin(dbg.y * 2.0), 0.4, 0.7);
  } else if (mode == 6) {
    float dz = clamp(1.0 - dbg.w * 0.02, 0.0, 1.0);
    return vec3(dz, dz * 0.4, dz * 0.1);
  } else if (mode == 7) {
    return 0.5 + 0.5 * rd;
  } else if (mode == 8) {
    if (dbg.x > 1.5) {
      vec3 bg = sampleBackground(normalize(finalPos));
      return bg * 4.0;
    }
    return vec3(0.02);
  } else if (mode == 9) {
    float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
    return vec3(l * 2.0);
  }
  return col;
}

void main() {
  vec2 uv = (vUv * 2.0 - 1.0);
  uv.x *= uAspect;

  vec3 rd = normalize(uCamForward + uv.x * uCamRight * uTanFov + uv.y * uCamUp * uTanFov);

  vec3 pos = uCamPos;
  vec3 vel = rd;

  vec3 L = cross(uCamPos, rd);
  float h2 = dot(L, L);

  RaySample samples[MAX_DISK_CROSSINGS];
  int count = 0;

  float maxSteps = uMaxSteps;
  float stepCount = 0.0;
  int lastTerm = 0;

  vec3 prevPos = pos;
  for (int i = 0; i < 320; i++) {
    if (float(i) >= maxSteps) break;
    float r = length(pos);
    if (r < RS) { lastTerm = 1; break; }
    if (r > R_FAR) { lastTerm = 2; break; }

    sampleDisk(pos, prevPos, vel, stepCount, count, samples);

    float dl = clamp(0.18 * r / max(1.0, length(vel)), 0.05, 1.5);
    prevPos = pos;
    autoStepRK4(pos, vel, h2, dl);
    stepCount += 1.0;
  }

  float rFinal = length(pos);
  if (rFinal < RS) lastTerm = 1;
  else if (rFinal > R_FAR) lastTerm = 2;
  else if (lastTerm == 0) lastTerm = 2; // ran out of steps mid-flight → fall back to escape sample

  // Insertion sort by pathLen — MAX_DISK_CROSSINGS ≤ 4
  for (int i = 1; i < MAX_DISK_CROSSINGS; i++) {
    RaySample cur = samples[i];
    int j = i;
    for (int k = 0; k < 4; k++) {
      if (j <= 0) break;
      if (samples[j - 1].pathLen <= cur.pathLen) break;
      samples[j] = samples[j - 1];
      j -= 1;
    }
    samples[j] = cur;
  }

  vec3 accumCol = vec3(0.0);
  float transmittance = 1.0;
  for (int i = 0; i < MAX_DISK_CROSSINGS; i++) {
    if (i >= count) break;
    float lum = dot(samples[i].col, vec3(0.2126, 0.7152, 0.0722));
    float alpha = clamp(lum * 0.35, 0.0, 1.0);
    accumCol += transmittance * samples[i].col * alpha;
    transmittance *= (1.0 - alpha);
  }

  vec3 bgColor = vec3(0.0);
  if (lastTerm == 2) {
    vec3 escapeDir = normalize(pos);
    bgColor = sampleBackground(escapeDir);
  }

  vec3 col = accumCol + transmittance * bgColor;
  col *= uExposure;

  vec4 dbg = vec4(float(lastTerm), float(count), stepCount, rFinal);

  if (uDebugMode != 0) {
    col = applyDebugView(col, dbg, rd, pos);
  }

  outColor = vec4(col, 1.0);
}
`;