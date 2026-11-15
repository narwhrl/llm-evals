// =============================================================================
// GARGANTUA - Schwarzschild null-geodesic integrator (per-pixel fragment shader)
//
// Coordinate chart: Schwarzschild coordinates (t, r, theta, phi) with the
// areal radius r expressed in a Cartesian-like embedding frame. Lengths are in
// units of r_s = 2M = 1; the equatorial accretion disk is the y = 0 plane.
//
// For a null geodesic the orbit (Binet) equation is exactly
//     d^2 u / d(phi)^2 + u = 3 M u^2,      u = 1 / r,  M = r_s / 2.
// Writing the spatial curve as p(lambda) with velocity v = dp/d(lambda), the
// angular momentum L = p x v is conserved when the acceleration is radial.
// Substituting r = 1/u, phi_dot = L u^2 into a_r = r_ddot - r phi_dot^2 gives
//     d^2 p / d(lambda)^2 = -3 M L^2 p / r^5 = -1.5 r_s h2 p / r^5,
// with h2 = |p0 x v0|^2 evaluated once from the launch state. This is the
// exact Schwarzschild null-geodesic shape equation; lambda is a path parameter
// (not necessarily the affine parameter), which does not affect the spatial
// curve. Integrating it with RK4 bends every ray, including background rays.
//
// State:      (p, v) in the embedding frame; h2 conserved.
// Stepping:   RK4, adaptive spatial step ds ~ 0.10 * r * uStepScale, with
//             dlambda = ds / |v| so the spatial step stays bounded near r_s.
// Termination: r <= 1.002 r_s (event horizon capture, no emission inside);
//             r > ESCAPE_R with outward motion (sample lensed background);
//             step budget exhausted (diagnostic in debug view 1).
// =============================================================================

precision highp float;

varying vec2 vUv;

uniform float uTime;          // frozen simulation seconds
uniform float uTanHalfFov;
uniform float uAspect;
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemp;
uniform float uEmission;
uniform float uOrbitSpeed;
uniform float uTurbAmp;
uniform float uTurbSpeed;

uniform float uStarDensity;
uniform float uGalaxyBrightness;

uniform float uStepScale;
uniform int uMaxSteps;
uniform int uDiskSamples;
uniform int uDebug;

const float RS = 1.0;
const float ESCAPE_R = 90.0;
const float PHOTON_R = 1.5;
const float PI = 3.141592653589793;
const int LOOP_CAP = 360;

// ---------------------------------------------------------------- procedural
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // quintic: C2, no visible lattice edges
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  return mix(mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
             mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y), f.z);
}

float fbm(vec3 x) {
  float s = 0.0;
  float a = 0.5;
  // Rotate each octave: overlapping axis-aligned noise lattices would show up
  // as a checkerboard on the disk, so the domains are decorrelated.
  mat3 rot = mat3( 0.00,  0.80,  0.60,
                  -0.80,  0.36, -0.48,
                  -0.60, -0.48,  0.64);
  for (int i = 0; i < 3; i++) {
    s += a * vnoise(x);
    x = rot * x * 2.03 + vec3(7.1, 3.7, 5.3);
    a *= 0.5;
  }
  return s;
}

vec3 blackbody(float t) {
  float x = clamp(t, 0.0, 3.0);
  vec3 c = mix(vec3(1.0, 0.22, 0.045), vec3(1.0, 0.62, 0.22), smoothstep(0.25, 0.9, x));
  c = mix(c, vec3(1.0, 0.92, 0.72), smoothstep(0.8, 1.6, x));
  c = mix(c, vec3(0.72, 0.85, 1.0), smoothstep(1.6, 2.6, x));
  return c;
}

vec3 heat(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c = mix(vec3(0.02, 0.02, 0.12), vec3(0.55, 0.05, 0.35), smoothstep(0.0, 0.32, t));
  c = mix(c, vec3(1.0, 0.45, 0.05), smoothstep(0.30, 0.68, t));
  c = mix(c, vec3(1.0, 0.95, 0.55), smoothstep(0.65, 1.0, t));
  return c;
}

vec3 starLayer(vec3 d, float scale, float threshold, float seed) {
  vec3 q = d * scale + seed;
  vec3 id = floor(q);
  vec3 f = fract(q);
  vec3 rnd = vec3(hash13(id + 1.7), hash13(id + 9.2), hash13(id + 27.3));
  float dist = length(f - rnd);
  float core = smoothstep(0.055, 0.0, dist);
  float present = step(threshold, hash13(id + 53.1));
  float mag = pow(hash13(id + 81.7), 3.0);
  vec3 tint = mix(vec3(0.65, 0.78, 1.0), vec3(1.0, 0.82, 0.6), hash13(id + 13.9));
  return core * present * (0.40 + 6.0 * mag) * tint;
}

// Procedural starfield + Milky Way band, evaluated on the *deflected* ray
// direction. No texture, cubemap, image or environment asset is used.
vec3 background(vec3 d) {
  vec3 col = vec3(0.0035, 0.0050, 0.0120);
  vec3 galN = normalize(vec3(0.32, 0.86, -0.39));
  float b = dot(d, galN) / 0.135;
  float band = exp(-b * b);
  float fil = fbm(d * 14.0 + vec3(11.0, 3.0, 5.0));
  float dust = fbm(d * 38.0 + vec3(2.0, 8.0, 1.0));
  vec3 galCol = mix(vec3(0.055, 0.085, 0.20), vec3(0.42, 0.30, 0.20), fil);
  float lanes = 0.22 + 1.15 * smoothstep(0.30, 0.76, dust);
  col += galCol * band * lanes * uGalaxyBrightness * 0.55;
  col += vec3(0.007, 0.009, 0.020) * fbm(d * 5.0 + 4.0) * 0.45;
  float thr = 1.0 - 0.030 * clamp(uStarDensity, 0.0, 2.0);
  col += starLayer(d, 70.0, thr, 0.0);
  col += starLayer(d, 140.0, thr + 0.006, 17.0) * 0.65;
  col += starLayer(d, 280.0, thr + 0.010, 43.0) * 0.40;
  col += starLayer(d, 560.0, thr + 0.014, 71.0) * 0.22;
  return col;
}

// ------------------------------------------------------------------ geodesic
vec3 accel(vec3 p, float h2) {
  float r2 = dot(p, p);
  float r = sqrt(r2);
  return -1.5 * RS * h2 * p / (r2 * r2 * r + 1e-6);
}

// Emission of one optically-thin disk slab sample. `g` returns the total
// frequency factor g = sqrt(1 - r_s/r) / (gamma (1 - beta.n_obs)); the
// observed specific intensity is boosted by g^4 (Liouville invariance).
vec3 diskSample(vec3 pc, vec3 vc, float pathStep, out float g) {
  float r = max(length(pc.xz), 1e-3);
  float phi = atan(pc.z, pc.x);
  float t = uTime;

  float omega = uOrbitSpeed * sqrt(0.5 / max(r, 1.05));
  float swirl = phi - omega * t * 0.35 * uTurbSpeed;
  vec3 q = vec3(cos(swirl) * r * 4.5, sin(swirl) * r * 4.5, r * 3.2 - t * 0.18 * uTurbSpeed);
  float n = fbm(q);
  float arms = 0.5 + 0.5 * sin(phi * 3.0 - log(max(r, 1.01)) * 5.0 + omega * t * 2.0);
  float dens = clamp(1.0 + uTurbAmp * (2.0 * n - 1.0) * 0.85 + uTurbAmp * 0.30 * (arms - 0.5), 0.08, 3.0);

  float h = max(uDiskThickness, 0.005);
  float yn = pc.y / h;
  float vert = exp(-1.6 * yn * yn);

  float radial = smoothstep(uDiskInner, uDiskInner + 0.35, r)
               * (1.0 - smoothstep(uDiskOuter - 1.6, uDiskOuter, r));

  float temp = uDiskTemp * pow(uDiskInner / max(r, 0.5), 0.75);
  vec3 base = blackbody(temp);
  float dr = (r - uDiskInner) / 0.55;
  float hotRim = 1.0 + 1.1 * exp(-dr * dr);
  float bright = pow(clamp(temp, 0.15, 4.0), 2.4) * hotRim;

  float beta = clamp(uOrbitSpeed * sqrt(0.5 / max(r, 1.05)), 0.0, 0.92);
  vec3 betaVec = beta * normalize(vec3(pc.z, 0.0, -pc.x) + vec3(1e-5));
  vec3 nObs = -normalize(vc + vec3(1e-6));
  float gamma = 1.0 / sqrt(max(1.0 - dot(betaVec, betaVec), 1e-4));
  float doppler = 1.0 / max(gamma * (1.0 - dot(betaVec, nObs)), 0.08);
  float grav = sqrt(max(1.0 - RS / max(r, 1.0001), 0.02));
  g = grav * doppler;
  float boost = pow(clamp(g, 0.06, 5.0), 4.0);

  return base * (0.9 + 0.35 * arms) * bright * dens * vert * radial
       * boost * uEmission * 0.55 * pathStep;
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 dir0 = normalize(uCamForward
      + ndc.x * uAspect * uTanHalfFov * uCamRight
      + ndc.y * uTanHalfFov * uCamUp);

  vec3 p = uCamPos;
  vec3 v = dir0;
  vec3 L = cross(p, v);
  float h2 = dot(L, L);

  vec3 color = vec3(0.0);
  float T = 1.0;                 // ordered transmittance along the ray
  int crossings = 0;
  float rMin = length(p);
  float ringPath = 0.0;
  float lastG = 1.0;
  float bestCrossLum = 0.0;
  int bestOrder = 0;
  bool captured = false;
  bool maxedOut = false;
  int stepsUsed = 0;

  for (int i = 0; i < LOOP_CAP; i++) {
    if (i >= uMaxSteps) { maxedOut = true; break; }

    vec3 p0 = p;
    vec3 v0 = v;
    float r0 = length(p0);

    float ds = clamp(uStepScale * 0.062 * r0, 0.008, 0.95);
    float dl = ds / max(length(v0), 1e-3);

    // RK4 for the second-order system dp/dlambda = v, dv/dlambda = accel(p).
    vec3 k1p = v0;
    vec3 k1v = accel(p0, h2);
    vec3 k2p = v0 + 0.5 * dl * k1v;
    vec3 k2v = accel(p0 + 0.5 * dl * k1p, h2);
    vec3 k3p = v0 + 0.5 * dl * k2v;
    vec3 k3v = accel(p0 + 0.5 * dl * k2p, h2);
    vec3 k4p = v0 + dl * k3v;
    vec3 k4v = accel(p0 + dl * k3p, h2);
    vec3 p1 = p0 + (dl / 6.0) * (k1p + 2.0 * k2p + 2.0 * k3p + k4p);
    vec3 v1 = v0 + (dl / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);

    stepsUsed = i + 1;
    float r1 = length(p1);
    rMin = min(rMin, r1);
    if (r1 > 1.28 && r1 < 1.85) ringPath += length(p1 - p0);

    // ---- curved-path intersection with the equatorial emitting slab -------
    // Each segment that spends time inside |y| <= halfThickness contributes in
    // path order. A ray winding near the photon sphere crosses the slab many
    // times, producing the primary and higher-order disk images.
    float y0 = p0.y;
    float dy = p1.y - y0;
    float h = max(uDiskThickness, 0.005);
    float ta = 0.0;
    float tb = 1.0;
    bool inSlab = false;
    if (abs(dy) < 1e-6) {
      inSlab = abs(y0) <= h;
    } else {
      float tA = (-h - y0) / dy;
      float tB = (h - y0) / dy;
      ta = max(0.0, min(tA, tB));
      tb = min(1.0, max(tA, tB));
      inSlab = tb > ta;
    }
    if (inSlab) {
      float slabLen = (tb - ta) * length(p1 - p0);
      vec3 pc0 = mix(p0, p1, (ta + tb) * 0.5);
      float rc = length(pc0.xz);
      if (rc >= uDiskInner && rc <= uDiskOuter && slabLen > 1e-5) {
        int ns = uDiskSamples;
        if (ns < 1) ns = 1;
        if (ns > 4) ns = 4;
        vec3 acc = vec3(0.0);
        float gSum = 0.0;
        for (int s = 0; s < 4; s++) {
          if (s >= ns) break;
          float tt = ta + (tb - ta) * (float(s) + 0.5) / float(ns);
          vec3 pc = mix(p0, p1, tt);
          vec3 vc = mix(v0, v1, tt);
          float g = 1.0;
          acc += diskSample(pc, vc, slabLen / float(ns), g);
          gSum += g;
        }
        float lum = dot(acc, vec3(0.3333));
        if (lum > bestCrossLum) {
          bestCrossLum = lum;
          lastG = gSum / float(ns);
          bestOrder = crossings + 1; // dominant image order for debug view 3
        }
        crossings += 1;
        color += T * acc;      // ordered composition of multiple crossings
        T *= 0.86;
      }
    }

    p = p1;
    v = v1;

    if (r1 <= RS * 1.002) { captured = true; break; }
    if (r1 > ESCAPE_R && dot(p1, v1) > 0.0) break;
  }

  vec3 dirOut = normalize(v);
  float deflection = acos(clamp(dot(dir0, dirOut), -1.0, 1.0));
  vec3 bg = captured ? vec3(0.0) : background(dirOut);
  if (!captured) color += T * bg;

  // Photon ring: light accumulated along near-critical winding paths. This is
  // derived from the integrated r_min / path length, not a baked texture.
  float ring = exp(-6.0 * abs(rMin - PHOTON_R)) * clamp(ringPath, 0.0, 60.0);
  color += vec3(1.0, 0.72, 0.42) * ring * 0.035 * (captured ? 0.25 : 1.0);

  // ---------------------------------------------------------- debug channels
  vec3 dbg = vec3(0.0);
  if (uDebug == 1) {
    float t = float(stepsUsed) / max(float(uMaxSteps), 1.0);
    dbg = heat(t);
    if (captured) dbg = mix(dbg, vec3(0.75, 0.05, 0.08), 0.78);
    else if (maxedOut) dbg = mix(dbg, vec3(0.95, 0.72, 0.12), 0.55);
    else dbg = mix(dbg, vec3(0.15, 0.75, 0.45), 0.18);
  } else if (uDebug == 2) {
    dbg = captured ? vec3(0.92, 0.95, 1.0) : vec3(0.015, 0.02, 0.035);
    dbg += vec3(0.05, 0.85, 1.0) * exp(-40.0 * abs(rMin - PHOTON_R)) * (captured ? 0.0 : 1.0);
  } else if (uDebug == 3) {
    vec3 oc = bestOrder == 1 ? vec3(1.0, 0.18, 0.12)
            : bestOrder == 2 ? vec3(0.15, 1.0, 0.35)
            : bestOrder == 3 ? vec3(0.20, 0.45, 1.0)
            : bestOrder == 4 ? vec3(1.0, 0.80, 0.15)
                             : vec3(0.95, 0.95, 1.0);
    dbg = bestOrder == 0 ? vec3(0.02, 0.025, 0.04)
                         : oc * clamp(0.22 + bestCrossLum * 1.6, 0.22, 1.0);
  } else if (uDebug == 4) {
    float g = lastG;
    vec3 neutral = vec3(0.10, 0.12, 0.18);
    dbg = g < 1.0 ? mix(neutral, vec3(0.85, 0.12, 0.06), clamp((1.0 - g) * 1.6, 0.0, 1.0))
                  : mix(neutral, vec3(0.35, 0.72, 1.0), clamp((g - 1.0) * 1.1, 0.0, 1.0));
    dbg += vec3(0.9) * pow(fract(g * 3.0), 8.0) * 0.25;
    if (crossings == 0) dbg *= 0.25;
  } else if (uDebug == 5) {
    dbg = dirOut * 0.5 + 0.5;
    float az = atan(dirOut.z, dirOut.x);
    float el = asin(clamp(dirOut.y, -1.0, 1.0));
    float grid = smoothstep(0.94, 1.0, abs(sin(az * 6.0)))
               + smoothstep(0.94, 1.0, abs(sin(el * 12.0)));
    dbg = mix(dbg, vec3(1.0), clamp(grid, 0.0, 1.0) * 0.55);
    if (captured) dbg *= 0.08;
  } else if (uDebug == 6) {
    dbg = pow(bg / (1.0 + bg), vec3(0.6)) * 1.35;
    if (captured) dbg *= 0.15;
  } else if (uDebug == 7) {
    float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
    float l = log(1.0 + lum) / log(51.0);
    dbg = mix(color / (1.0 + color), heat(l), 0.45);
  } else if (uDebug == 8) {
    dbg = heat(clamp(deflection / PI, 0.0, 1.0));
    if (captured) dbg *= 0.25;
  } else if (uDebug == 9) {
    float t = clamp((rMin - 1.0) / 7.0, 0.0, 1.0);
    dbg = heat(1.0 - t);
    dbg = mix(dbg, vec3(0.6, 1.0, 1.0), exp(-30.0 * abs(rMin - PHOTON_R)));
    if (captured) dbg = mix(dbg, vec3(0.05, 0.02, 0.02), 0.75);
  }

  gl_FragColor = vec4(uDebug == 0 ? color : dbg, 1.0);
}
