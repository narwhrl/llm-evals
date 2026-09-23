// GARGANTUA — per-pixel Schwarzschild null-geodesic integrator (fragment shader).
//
// Units and coordinates
// ---------------------
//   Geometric units G = c = 1; the Schwarzschild radius is fixed to r_s = 2M = 1,
//   so the event horizon sits at areal radius r = 1, the photon sphere at
//   r = 1.5 and the ISCO at r = 3.
//
//   The photon path is integrated in the standard equivalent Newtonian form of
//   the Schwarzschild null geodesic equation: with state (p, v), |v| = 1,
//   h^2 = |p x v|^2 conserved, the acceleration is
//
//        a(p) = -(3/2) h^2 p / r^5        (r = |p|, r_s = 1)
//
//   which is exactly the Binet form u'' + u = (3/2) u^2 (u = 1/r) for
//   Schwarzschild photon orbits written as a 3D central-force ODE. p is the
//   pseudo-Cartesian embedding x = r * n̂ of the areal Schwarzschild radius;
//   only the curve shape and its intersections matter for imaging.
//
// Ray state, stepping and termination (per pixel)
// -----------------------------------------------
//   State: position p (3D) and unit velocity v (3D). h^2 is computed once from
//   the initial camera ray. Each step is classical RK4 with an adaptive step
//   dt = clamp((r - 0.9) * 0.18, 0.02, 0.8): finer near the photon sphere,
//   coarse far away. v is renormalised after every step to suppress pure
//   parametrisation drift (this changes no observable path shape).
//   Termination conditions, in order:
//     captured — r < 1 (fell through the event horizon; no further emission),
//     escaped  — r > rEscape while moving outward (sample the background from
//                the final v, which carries the gravitational lensing),
//     maxed    — the quality-dependent step budget uMaxSteps was exhausted.
//   The loop bound 512 is the compile-time cap; uMaxSteps <= 512 selects the
//   active budget.

export const RAYTRACE_VERT = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const RAYTRACE_FRAG = /* glsl */ `
uniform vec2 uResolution;
uniform float uTime;          // simulation seconds (frozen under capture=1)
uniform vec3 uCamPos;         // camera position in r_s units
uniform mat3 uCamBasis;       // columns: right, up, forward
uniform float uTanHalfFov;    // tan(fov_y / 2)
uniform float uMaxSteps;      // quality-dependent integration budget
uniform int uDebug;           // debug view index 0..9

// Disk parameters.
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfThick;
uniform float uDiskTemp;      // temperature at the inner edge, Kelvin
uniform float uDiskIntensity;
uniform float uOrbitSpeed;
uniform float uTurbAmp;
uniform float uTurbSpeed;

// Background parameters.
uniform float uStarDensity;
uniform float uGalaxyBrightness;

// ---------------------------------------------------------------------------
// Hash / noise helpers
// ---------------------------------------------------------------------------
float hash21(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float vnoise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  float a = hash13(i);
  float b = hash13(i + vec3(1.0, 0.0, 0.0));
  float c = hash13(i + vec3(0.0, 1.0, 0.0));
  float d = hash13(i + vec3(1.0, 1.0, 0.0));
  float e = hash13(i + vec3(0.0, 0.0, 1.0));
  float g = hash13(i + vec3(1.0, 0.0, 1.0));
  float h = hash13(i + vec3(0.0, 1.0, 1.0));
  float k = hash13(i + vec3(1.0, 1.0, 1.0));
  return mix(mix(mix(a, b, u.x), mix(c, d, u.x), u.y),
             mix(mix(e, g, u.x), mix(h, k, u.x), u.y), u.z);
}

float fbm3(vec3 p) {
  // 4-octave fractal value noise, output roughly in [0, 1].
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * vnoise3(p);
    p = p * 2.03 + vec3(19.1, 7.7, 3.3);
    amp *= 0.5;
  }
  return sum;
}

// ---------------------------------------------------------------------------
// Colour utilities
// ---------------------------------------------------------------------------
// Artistic blackbody ramp (approximate Planckian locus, 1000K .. 14000K).
vec3 tempToColor(float kelvin) {
  float t = clamp(kelvin, 1000.0, 14000.0) / 1000.0;
  float r = 1.0;
  float g = smoothstep(1.2, 5.8, t);
  float b = smoothstep(3.5, 10.0, t);
  vec3 c = vec3(r, g, b);
  float w = smoothstep(6.0, 12.0, t) * 0.35;
  return mix(c, vec3(1.0), w) * (0.22 + 0.78 * smoothstep(0.7, 2.2, t));
}

vec3 heatRamp(float t) {
  // 4-stop diagnostic colormap (indigo -> teal -> amber -> white).
  t = clamp(t, 0.0, 1.0);
  vec3 a = vec3(0.06, 0.02, 0.28);
  vec3 b = vec3(0.02, 0.58, 0.58);
  vec3 c = vec3(1.0, 0.55, 0.10);
  vec3 d = vec3(1.0, 1.0, 0.95);
  if (t < 0.33) return mix(a, b, t / 0.33);
  if (t < 0.66) return mix(b, c, (t - 0.33) / 0.33);
  return mix(c, d, (t - 0.66) / 0.34);
}

// Equal-area octahedral mapping of a unit direction to [0,1]^2 — used so the
// procedural star grid has no pole singularity.
vec2 dirToOct(vec3 n) {
  n /= (abs(n.x) + abs(n.y) + abs(n.z));
  if (n.z < 0.0) {
    vec2 s = vec2(n.x >= 0.0 ? 1.0 : -1.0, n.y >= 0.0 ? 1.0 : -1.0);
    n.xy = (1.0 - abs(n.yx)) * s;
  }
  return n.xy * 0.5 + 0.5;
}

// ---------------------------------------------------------------------------
// Geodesic acceleration  a(p) = -(3/2) h^2 p / r^5   (see file header)
// ---------------------------------------------------------------------------
vec3 geodesicAccel(vec3 p, float h2) {
  float r2 = dot(p, p);
  float r = sqrt(r2);
  return (-1.5 * h2 / (r2 * r2 * r)) * p;
}

// One classical RK4 step of the geodesic ODE.
void geodesicStep(inout vec3 p, inout vec3 v, float dt, float h2) {
  vec3 k1p = v;
  vec3 k1v = geodesicAccel(p, h2);
  vec3 k2p = v + 0.5 * dt * k1v;
  vec3 k2v = geodesicAccel(p + 0.5 * dt * k1p, h2);
  vec3 k3p = v + 0.5 * dt * k2v;
  vec3 k3v = geodesicAccel(p + 0.5 * dt * k2p, h2);
  vec3 k4p = v + dt * k3v;
  vec3 k4v = geodesicAccel(p + dt * k3p, h2);
  p += (dt / 6.0) * (k1p + 2.0 * k2p + 2.0 * k3p + k4p);
  v += (dt / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
  // Renormalise |v| = 1: pure parametrisation stabiliser, not physics.
  v = normalize(v);
}

// ---------------------------------------------------------------------------
// Accretion disk emission at an equatorial-plane crossing.
//   p      crossing position (y ~ 0), v unit photon velocity at the crossing,
//   returns rgb emission; alpha via out param (for ordered compositing).
// Physics:
//   * Shakura–Sunyaev-like radial temperature profile  T(r) ~ (r/r_in)^(-3/4)
//   * Keplerian angular velocity Omega = sqrt(M / r^3) with M = 1/2 (r_s = 1)
//   * local circular-orbit speed seen by a static observer
//        beta = sqrt(M/r) / sqrt(1 - r_s/r)  (= 1 exactly on the photon sphere)
//   * special-relativistic Doppler for the photon direction toward the
//     observer plus the gravitational redshift sqrt(1 - r_s/r); the combined
//     factor g shifts the temperature and beams the intensity as g^3.
// ---------------------------------------------------------------------------
vec3 diskEmission(vec3 p, vec3 v, out float alpha) {
  alpha = 0.0;
  float r = length(p.xz);
  if (r < uDiskInner * 0.75 || r > uDiskOuter * 1.05) return vec3(0.0);

  // Radial envelope with soft edges.
  float edge = smoothstep(uDiskInner, uDiskInner * 1.14, r) *
               smoothstep(uDiskOuter, uDiskOuter * 0.80, r);
  if (edge <= 0.0) return vec3(0.0);

  // Combined relativistic shift factor g (Doppler x gravitational).
  float beta = sqrt(0.5 / r) / sqrt(max(1.0 - 1.0 / r, 1e-4));
  beta = min(beta, 0.985);
  float gammaL = inversesqrt(1.0 - beta * beta);
  vec3 tangent = normalize(vec3(-p.z, 0.0, p.x)); // prograde orbital direction
  vec3 toObserver = -normalize(v);                // photon travels toward camera
  float doppler = 1.0 / (gammaL * (1.0 - beta * dot(tangent, toObserver)));
  float gravShift = sqrt(max(1.0 - 1.0 / r, 0.0));
  float g = clamp(doppler * gravShift, 0.25, 2.6);

  // Temperature and observed colour.
  float tEmit = uDiskTemp * pow(max(r / uDiskInner, 1e-3), -0.75);
  vec3 col = tempToColor(tEmit * g);

  // Turbulence: Keplerian differential rotation shears a 3D fbm field.
  float om = uOrbitSpeed * sqrt(0.5 / (r * r * r));
  float ang = om * uTime;
  float ca = cos(ang);
  float sa = sin(ang);
  vec2 q = mat2(ca, -sa, sa, ca) * p.xz; // rotate sampling frame backward
  float n = fbm3(vec3(q * 0.55, uTime * uTurbSpeed * 0.35));
  float turb = mix(1.0, 0.30 + 1.55 * n, clamp(uTurbAmp, 0.0, 1.0));

  // Slab path length: grazing crossings through the (thin) disk emit more.
  float grazing = clamp(0.25 / max(abs(v.y), 0.0625), 1.0, 4.0);

  float bright = uDiskIntensity * edge * turb * grazing * pow(g, 3.0) *
                 pow(max(uDiskInner / r, 1e-3), 1.5);
  // Vertical Gaussian falloff of the slab, expressed via half-thickness and
  // how deep inside the slab the interpolated crossing lies (|y| ~ 0 here, so
  // the thickness enters through grazing angle + emission scaling above and
  // the outer density scale below).
  bright *= clamp(uDiskHalfThick / 0.16, 0.35, 2.2);

  alpha = clamp(bright * 0.9, 0.0, 1.0);
  return col * bright;
}

// ---------------------------------------------------------------------------
// Procedural lensed background: layered octahedral star grids + galaxy band.
// Sampled with the *final* (bent) ray direction, so the whole background is
// gravitationally lensed. No textures, cubemaps or external assets.
// ---------------------------------------------------------------------------
const vec3 GALAXY_NORMAL = vec3(0.4033, 0.8671, 0.2924); // normalised (0.4, 0.86, 0.29)
const vec3 GALAXY_CENTER = vec3(-0.6819, 0.3510, 0.6418); // normalised (-0.68, 0.35, 0.64)

vec3 background(vec3 d) {
  vec2 ouv = dirToOct(d);

  // Galaxy band on a tilted great circle with fbm nebulosity and dust lanes.
  float bandDist = dot(d, GALAXY_NORMAL);
  float band = exp(-bandDist * bandDist * 22.0);
  float neb = fbm3(d * 5.0 + 11.3);
  float dust = fbm3(d * 9.5 + 3.1);
  vec3 gal = band * (vec3(0.55, 0.45, 0.38) * neb * 0.55 +
                     vec3(0.92, 0.80, 0.66) * pow(neb, 3.0) * 0.85);
  gal *= 0.35 + 0.65 * smoothstep(0.2, 0.7, dust);
  float core = pow(max(dot(d, GALAXY_CENTER), 0.0), 14.0);
  gal += band * core * vec3(1.0, 0.85, 0.62) * 0.9;
  vec3 col = gal * uGalaxyBrightness;

  // Faint deep-sky ambient.
  col += vec3(0.010, 0.013, 0.026) * (0.35 + 0.65 * band);

  // Three star grid layers; density and brightness rise inside the band.
  for (int l = 0; l < 3; l++) {
    float fl = float(l);
    float gridN = 72.0 * pow(1.9, fl);
    vec2 g = ouv * gridN;
    vec2 cell = floor(g);
    vec2 f = fract(g);
    float hs = hash21(cell + fl * 97.13 + 11.7);
    float density = uStarDensity * mix(0.32, 0.6, fl / 2.0) * (1.0 + band * 1.4);
    float present = step(hs, density);
    vec2 pos = vec2(hash21(cell + fl * 31.7 + 1.3), hash21(cell + fl * 57.9 + 7.9)) * 0.72 + 0.14;
    float d2 = length(f - pos);
    float mag = pow(hash21(cell + fl * 13.3 + 3.7), 9.0);
    float tw = 0.8 + 0.2 * sin(uTime * (0.6 + 2.4 * hash21(cell + fl + 5.1)) + hs * 6.2831853);
    vec3 sc = tempToColor(mix(2600.0, 11500.0, hash21(cell + fl * 71.3 + 9.2)));
    float star = present * mag * tw * (exp(-d2 * d2 * 320.0) + 0.055 / (1.0 + d2 * d2 * 90.0));
    col += sc * star;
  }
  return col;
}

// ---------------------------------------------------------------------------
// Main: build the camera ray, integrate the geodesic, composite disk
// crossings in path order, then apply the selected debug view.
// ---------------------------------------------------------------------------
void main() {
  vec2 ndc = (2.0 * gl_FragCoord.xy - uResolution) / uResolution.y;
  vec3 rayDir = normalize(uCamBasis * vec3(ndc * uTanHalfFov, 1.0));

  vec3 p = uCamPos;
  vec3 v = rayDir;

  // Conserved angular momentum squared of this photon (r_s = 1 units).
  vec3 c0 = cross(p, v);
  float h2 = dot(c0, c0);

  float rEscape = max(30.0, 1.6 * length(uCamPos) + uDiskOuter);

  vec3 col = vec3(0.0);
  float transmittance = 1.0;
  float diskAlphaSum = 0.0;

  int steps = 0;
  int term = 0;        // 0 running, 1 captured, 2 escaped, 3 maxed steps
  int hits = 0;
  float firstG = 0.0;
  float rMin = length(p);
  bool escaped = false;

  for (int i = 0; i < 512; i++) {
    if (float(i) >= uMaxSteps) {
      term = 3;
      break;
    }
    steps = i + 1;

    float r = length(p);
    rMin = min(rMin, r);
    float dt = clamp((r - 0.9) * 0.18, 0.02, 0.8);

    vec3 pNew = p;
    vec3 vNew = v;
    geodesicStep(pNew, vNew, dt, h2);
    float rNew = length(pNew);

    // Equatorial disk plane crossing (y = 0): linear interpolation of the
    // step, then evaluate emission; crossings accumulate in path order.
    if (p.y * pNew.y < 0.0 && hits < 4) {
      float t = p.y / (p.y - pNew.y);
      vec3 hp = mix(p, pNew, t);
      float rr = length(hp.xz);
      if (rr > uDiskInner * 0.75 && rr < uDiskOuter * 1.05) {
        vec3 hv = normalize(mix(v, vNew, t));
        float alpha;
        vec3 e = diskEmission(hp, hv, alpha);
        if (alpha > 0.0) {
          hits++;
          if (hits == 1) {
            // Record the combined shift factor of the primary image.
            float beta = sqrt(0.5 / rr) / sqrt(max(1.0 - 1.0 / rr, 1e-4));
            beta = min(beta, 0.985);
            float gammaL = inversesqrt(1.0 - beta * beta);
            vec3 tangent = normalize(vec3(-hp.z, 0.0, hp.x));
            float doppler = 1.0 / (gammaL * (1.0 - beta * dot(tangent, -hv)));
            firstG = clamp(doppler * sqrt(max(1.0 - 1.0 / rr, 0.0)), 0.25, 2.6);
          }
          col += transmittance * e;
          transmittance *= (1.0 - alpha);
          diskAlphaSum += alpha;
        }
      }
    }

    p = pNew;
    v = vNew;

    // Event horizon: r < 1 = r_s. Nothing inside can reach the camera.
    if (rNew < 1.0) {
      term = 1;
      rMin = min(rMin, rNew);
      break;
    }
    // Escaped to large radius while moving outward.
    if (rNew > rEscape && dot(p, v) > 0.0) {
      term = 2;
      escaped = true;
      break;
    }
  }
  if (term == 0) term = 3;

  // Lensed background behind whatever transmittance remains.
  if (escaped) {
    col += transmittance * background(normalize(v));
  }

  // Final composite or the selected diagnostic view.
  if (uDebug == 0) {
    gl_FragColor = vec4(col, 1.0);
  } else if (uDebug == 1) {
    // Ray steps & termination cause (red captured, green maxed, blue escaped).
    float s = clamp(float(steps) / uMaxSteps, 0.0, 1.0);
    vec3 tint = term == 1 ? vec3(1.0, 0.15, 0.1) : (term == 2 ? vec3(0.15, 0.35, 1.0) : vec3(0.2, 1.0, 0.25));
    gl_FragColor = vec4(vec3(s) * 0.55 + tint * s, 1.0);
  } else if (uDebug == 2) {
    // Event horizon mask: escaped rays dim blue; captured rays red, darker the
    // deeper the periapsis; the photon-shell edge shows as a bright rim.
    float shell = 1.0 - smoothstep(1.0, 1.55, rMin);
    vec3 cap = mix(vec3(0.03, 0.0, 0.0), vec3(0.65, 0.06, 0.03), shell);
    gl_FragColor = vec4(term == 1 ? cap : vec3(0.04, 0.07, 0.16), 1.0);
  } else if (uDebug == 3) {
    // Disk crossings & order: 0 black, 1 red, 2 green, 3 blue, 4 yellow.
    vec3 oc = hits == 0 ? vec3(0.0)
      : (hits == 1 ? vec3(1.0, 0.1, 0.1)
      : (hits == 2 ? vec3(0.1, 1.0, 0.2)
      : (hits == 3 ? vec3(0.15, 0.3, 1.0) : vec3(1.0, 0.9, 0.1))));
    gl_FragColor = vec4(oc * (0.25 + 0.75 * clamp(diskAlphaSum, 0.0, 1.0)), 1.0);
  } else if (uDebug == 4) {
    // Redshift / Doppler of the primary disk image (g > 1 blue, g < 1 red).
    vec3 c = firstG == 0.0 ? vec3(0.05)
      : (firstG > 1.0 ? mix(vec3(0.55, 0.55, 0.55), vec3(0.1, 0.4, 1.0), clamp(firstG - 1.0, 0.0, 1.0))
                      : mix(vec3(0.55, 0.55, 0.55), vec3(1.0, 0.22, 0.08), clamp(1.0 - firstG, 0.0, 1.0)));
    gl_FragColor = vec4(c, 1.0);
  } else if (uDebug == 5) {
    // Background lensing coordinates: octahedral UV of the escape direction
    // with a false-colour grid; green tint where the disk occludes it.
    vec3 c = vec3(0.0);
    if (escaped) {
      vec2 ouv = dirToOct(normalize(v));
      float gx = smoothstep(0.90, 1.0, abs(fract(ouv.x * 24.0) * 2.0 - 1.0));
      float gy = smoothstep(0.90, 1.0, abs(fract(ouv.y * 24.0) * 2.0 - 1.0));
      c = vec3(ouv * 0.8, 0.1) + vec3(0.9, 0.5, 0.1) * max(gx, gy) * 0.35;
    }
    c += vec3(0.0, 0.35, 0.0) * clamp(diskAlphaSum, 0.0, 1.0);
    gl_FragColor = vec4(c, 1.0);
  } else if (uDebug == 6) {
    // Starfield / galaxy layer in isolation (still lensed).
    gl_FragColor = vec4(escaped ? background(normalize(v)) : vec3(0.0), 1.0);
  } else if (uDebug == 7) {
    // Pre-postprocess HDR: log2 luminance heatmap of the linear buffer.
    float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
    gl_FragColor = vec4(heatRamp(clamp(log2(1.0 + max(lum, 0.0)) / 6.0, 0.0, 1.0)), 1.0);
  } else if (uDebug == 8) {
    // Closest approach radius r_min: the photon ring appears as the tight
    // contour band around r_min ~ 1.5 (the photon sphere).
    gl_FragColor = vec4(heatRamp(clamp((rMin - 1.0) / 4.0, 0.0, 1.0)), 1.0);
  } else {
    // Total deflection angle of escaped rays (captured rays stay black).
    float defl = acos(clamp(dot(rayDir, normalize(v)), -1.0, 1.0));
    gl_FragColor = vec4(escaped ? heatRamp(defl / 3.14159265) : vec3(0.0), 1.0);
  }
}
`;
