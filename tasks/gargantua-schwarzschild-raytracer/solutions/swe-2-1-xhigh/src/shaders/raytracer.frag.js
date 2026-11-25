// Full-screen fragment shader: per-pixel numerical integration of null geodesics
// in the Schwarzschild spacetime.
//
// Coordinate chart / state formulation (traceable, see below):
//   * Schwarzschild coordinates with the Schwarzschild radius rs = 1 as the unit
//     of length, the hole centered at the origin. "Cartesian" positions below are
//     Schwarzschild areal coordinates expressed in a Cartesian frame.
//   * Geodesics in Schwarzschild are planar (motion stays in the plane spanned by
//     the initial position and momentum). In that plane, the exact null-geodesic
//     dynamics reduces to the Binet equation
//         u'' + u = (3/2) rs u^2 ,   u = 1/r,   ' = d/dφ
//     which is the planar force law a(x) = -(3/2) h² x̂ / |x|³ with h = |x × ẋ|
//     the conserved specific angular momentum. Stepping the Cartesian state
//     ẋ += a dt ; x += ẋ dt with fixed h² is the exact point-particle dynamics
//     of the geodesic path geometry: the angular component of the missing
//     relativistic reparametrization term only re-parameterizes the curve,
//     it does not change its geometric shape (the image depends only on x(λ),
//     never on the affine clock). The photon sphere sits exactly at r = 1.5 rs
//     (u = 2/3 solves u'' = 0) and the critical impact parameter is
//     b_crit = (3√3/2) rs ≈ 2.598 rs.
//   * Integration state per ray: position vec3 pos, velocity vec3 vel, constant
//     angular momentum h² = |pos₀ × vel₀|². Step size dt is adaptively scaled
//     with radius (small near the photon sphere where curvature is extreme,
//     large far away) because curvature scales as h²/r³.
//   * Termination: capture when r < horizon radius (1.0 rs) — the ray is inside
//     the event horizon and contributes nothing (pure black); escape when
//     r > escape radius — the ray asymptotically travels straight, so its final
//     direction is the lensed background sampling direction. A step budget
//     terminates near-critical rays that wind around the photon sphere many
//     times; those land on the photon-ring critical structure anyway.

export const RAYTRACER_FRAG = /* glsl */ `
precision highp float;

// ---------------------------------------------------------------- uniforms
uniform vec2  uResolution;      // render-target pixels
uniform float uFov;             // vertical field of view, radians
uniform vec3  uCamPos;          // camera position (Schwarzschild radii units)
uniform vec3  uCamRight;        // camera basis vectors (unit, world space)
uniform vec3  uCamUp;
uniform vec3  uCamFwd;

uniform float uTime;            // frozen simulation time (seconds / timeScale applied)
uniform float uTurbSpeed;       // turbulence advection speed multiplier

uniform float uDiskInner;       // disk inner radius (rs)
uniform float uDiskOuter;       // disk outer radius (rs)
uniform float uDiskHalfThick;   // disk half thickness (rs)
uniform float uDiskTemp;        // disk temperature scale multiplier
uniform float uDiskEmission;    // disk emission strength multiplier
uniform float uOrbitSpeed;      // orbital velocity multiplier
uniform float uTurbAmp;         // turbulence amplitude [0,1]

uniform float uStarDensity;     // procedural star density multiplier
uniform float uGalaxyBright;    // milky way band brightness multiplier

uniform int   uMaxSteps;        // geodesic step budget (quality tier)
uniform int   uMaxCross;        // max disk crossings composited (quality tier)
uniform int   uDebugView;       // 0 = final composite, 1..9 diagnostics

varying vec2 vUv;

// ---------------------------------------------------------------- constants
const float RS       = 1.0;                       // Schwarzschild radius (unit)
const float R_PHOTON = 1.5 * RS;                  // unstable photon orbit radius
const float B_CRIT   = 2.598076211353316 * RS;    // (3*sqrt(3)/2) rs critical impact parameter

// ---------------------------------------------------------------- utils
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
// value noise + fbm for turbulence / galactic clouds
float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
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
float fbm3(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 3; i++) {
    s += a * vnoise(p);
    p = p * 2.13 + vec3(7.7, 3.1, 9.2);
    a *= 0.5;
  }
  return s;
}
vec3 heatRamp(float t) {
  return clamp(vec3(t * 3.0, t * 3.0 - 1.0, t * 3.0 - 2.0), 0.0, 1.0);
}

// Blackbody chromaticity approximation (Tanner Helland style, normalized),
// input temperature in kilokelvin-ish units; returns a linear-space color
// peaked so that hot disk plasma runs blue-white and the cool rim deep orange.
vec3 blackbodyColor(float t) {
  float x = clamp(t, 0.1, 6.0);
  vec3 c;
  // red channel is strong but recedes as the spectrum peaks blueward —
  // keeps hot plasma blue-white instead of saturating to paper white
  c.r = mix(1.0, 0.42, smoothstep(1.3, 3.9, x));
  // green rises with temperature
  c.g = clamp(0.62 * log(x + 0.35) + 0.48, 0.0, 1.0);
  // blue only appears when hot
  c.b = clamp(0.85 * log(x + 0.12) + 0.55, 0.0, 1.0);
  if (x > 3.0) {
    c.g = mix(c.g, 1.0, (x - 3.0) / 3.0 * 0.35);
    c.b = min(c.b + (x - 3.0) * 0.10, 1.0);
  }
  return c;
}


// ---------------------------------------------------------------- sky
// Octahedral mapping of the unit sphere to [0,1]^2 — continuous, no poles
// distortion blowup, used to hash procedural stars on lensed ray directions.
vec2 octaEncode(vec3 n) {
  n /= (abs(n.x) + abs(n.y) + abs(n.z) + 1e-9);
  vec2 p = n.xz;
  if (n.y < 0.0) p = (1.0 - abs(p.yx)) * vec2(p.x >= 0.0 ? 1.0 : -1.0, p.y >= 0.0 ? 1.0 : -1.0);
  return p * 0.5 + 0.5;
}
vec3 octaDecode(vec2 uv) {
  vec2 p = uv * 2.0 - 1.0;
  vec3 n = vec3(p.x, 1.0 - abs(p.x) - abs(p.y), p.y);
  float t = max(-n.y, 0.0);
  n.x += n.x >= 0.0 ? -t : t;
  n.z += n.z >= 0.0 ? -t : t;
  return normalize(n);
}

// Procedural starfield: stars are fixed points inside jittered octahedral grid
// cells. Density scales cell count; angular falloff produces small gaussian
// disks. Purely procedural — no texture, no cubemap, no environment map.
vec3 starField(vec3 dir, float density) {
  if (density <= 0.001) return vec3(0.0);
  float cells = floor(24.0 + 88.0 * density);   // cells per octahedral axis
  vec2 suv = octaEncode(dir) * cells;
  vec2 cellId = floor(suv);
  vec3 acc = vec3(0.0);
  // 2x2 neighborhood is enough: star radius is a small fraction of a cell
  for (int i = 0; i <= 1; i++) {
    for (int j = 0; j <= 1; j++) {
      vec2 id = cellId + vec2(float(i) - 1.0, float(j) - 1.0);
      vec2 rnd = hash22(id * 1.37 + 11.1);
      // only some cells carry a star; density threshold makes density continuous
      if (rnd.x > 0.28 + 0.62 * (1.0 - density)) continue;
      // reconstruct the 3D direction of the star center: jitter within cell
      vec2 starUV = (id + 0.15 + 0.7 * hash22(id + 4.7)) / cells;
      vec3 starDir = octaDecode(starUV);
      float cosang = dot(dir, starDir);
      // gaussian angular profile: sigma in radians, a small fraction of a grid cell
      float sigma = 0.00045 + 0.00035 * hash12(id + 2.9);
      float d2 = max(2.0 * (1.0 - cosang), 0.0); // ≈ angular distance squared
      float g = exp(-d2 / (2.0 * sigma * sigma));
      float mag = 0.35 + 1.8 * pow(hash12(id + 8.2), 5.0);
      float tint = hash12(id + 5.5);
      vec3 starCol = mix(vec3(0.72, 0.82, 1.0), vec3(1.0, 0.82, 0.62), tint);
      acc += starCol * g * mag;
    }
  }
  return acc * (0.55 + 0.45 * density);
}

// Procedural milky way band: a great-circle band with fbm cloud modulation
// and dust lanes. Axis fixed in world space; the lensing of the shader warps it.
vec3 galaxyField(vec3 dir, float bright) {
  if (bright <= 0.001) return vec3(0.0);
  vec3 axis = normalize(vec3(0.1, 1.0, 0.35));
  vec3 center = normalize(cross(axis, vec3(0.2, 0.05, 1.0)));
  float bd = dot(dir, axis);                       // signed distance to galactic plane (sin)
  float band = exp(-bd * bd * 38.0);
  float lane = exp(-bd * bd * 380.0);              // thin dust lane
  // clouds in a cylindrical-ish 3D domain attached to the band orientation
  vec3 p = dir * 3.0;
  float cl = fbm3(p + vec3(0.0, 0.0, 1.7));
  float cl2 = fbm3(p * 2.7 + vec3(9.1, 2.0, 0.0));
  float clouds = clamp(0.35 + 1.9 * (cl - 0.45) + 0.9 * (cl2 - 0.5), 0.0, 2.2);
  clouds = pow(clouds, 1.6); // contrast: thin wisps vanish, dense cores glow
  // galactic-core brightening toward the galactic center
  float core = exp(-max(1.0 - dot(dir, center), 0.0) * 14.0) * 1.6;
  vec3 col = vec3(0.55, 0.60, 0.95) * band * clouds * 0.5
           + vec3(1.0, 0.72, 0.42) * band * core * clouds * 0.9;
  // dust lane carves dark structure into the band
  col *= 1.0 - lane * clamp(cl2 * 1.6 - 0.25, 0.0, 0.85);
  return col * bright;
}

vec3 skyColor(vec3 dir) {
  return starField(dir, uStarDensity)
       + galaxyField(dir, uGalaxyBright)
       + vec3(0.012, 0.014, 0.022); // deep-space floor so the void is not pure black
}

// ---------------------------------------------------------------- disk
// Emission of the accretion disk at a curved-path plane crossing point.
//   pos      crossing position on the disk plane (Schwarzschild radii units)
//   toCam    normalized direction from the crossing point back toward the camera
// Returns premultiplied radiance contribution; outputs the opacity alpha and
// the combined redshift factor (gravitational × transverse × doppler).
vec3 diskEmission(vec3 pos, vec3 toCam, float coverage, out float alpha, out float shift) {
  float rho = length(vec2(pos.x, pos.z));
  float r = length(pos);
  alpha = 0.0;
  shift = 0.0;
  // radial emissivity envelope of the disk slab
  float x = (rho - uDiskInner) / max(uDiskOuter - uDiskInner, 1e-4);
  if (x < 0.0 || x > 1.0) return vec3(0.0);
  float innerEdge = smoothstep(0.0, 0.10, x);          // ISCO-like inner roll-off
  float outerEdge = 1.0 - smoothstep(0.72, 1.0, x);    // fading outer rim
  float radialProfile = pow(max(1.0 - x, 0.0), 1.5) + 0.06;
  float envelope = innerEdge * outerEdge * radialProfile;
  if (envelope <= 0.0) return vec3(0.0);

  // Orbiting plasma: relativistic Keplerian velocity in Schwarzschild,
  //   v² = (rs/2) / (r − rs)  (units c = 1), in the equatorial plane,
  //   direction ⊥ radius inside the disk plane (prograde).
  float vOrb = sqrt(clamp((0.5 * RS) / max(r - RS, 0.05), 0.0, 0.92));
  vec3 radialDir = normalize(vec3(pos.x, 0.0, pos.z));
  vec3 orbitDir = normalize(vec3(-radialDir.z, 0.0, radialDir.x)); // prograde tangential

  // Relativistic Doppler + gravitational redshift of photons emitted by the
  // moving plasma and received at the observer.
  //   gravitational part: 1/sqrt(1 - rs/r) — clocks run slow deep in the well
  //   transverse part:    time dilation of the orbiting emitter
  //   longitudinal part:  classical beaming factor (1 + β·n̂), n̂ toward observer
  float grav = inversesqrt(max(1.0 - RS / max(r, 1.01), 0.02));
  float transverse = inversesqrt(max(1.0 - vOrb * vOrb, 0.05));
  float betaAlong = vOrb * dot(orbitDir, toCam) * uOrbitSpeed;
  float doppler = 1.0 + betaAlong;
  float gShift = clamp(grav * transverse * doppler, 0.12, 3.2);
  shift = gShift;

  // Temperature: multi-color blackbody disk, T ∝ ρ^(−3/4), scaled by control.
  float tempProfile = pow(max(rho / max(uDiskInner, 0.6), 1.0), -0.85);
  float tempK = uDiskTemp * 1.05 * tempProfile * gShift;  // redshifted/blackbody-shifted temperature

  // Turbulence: animated density/brightness modulation in the frame rotating
  // with the plasma. Orbital angular rate ω ∝ ρ^−1.5 (Keplerian, timeScale-free
  // — the frozen simulation time is the only clock).
  float angle = atan(pos.z, pos.x);
  float omega = 1.4 * pow(max(rho, 0.8), -1.5);
  float rotAngle = angle - omega * uTime * 3.0;
  // spatial frequency and amplitude fade toward the rim: avoids noise aliasing
  // in the compressed outer disk and mimics shear smearing
  float nf = mix(1.9, 0.7, smoothstep(3.0, 9.0, rho));
  vec3 npos = vec3(cos(rotAngle) * rho * nf, pos.y * 3.0 / max(uDiskHalfThick, 0.02), sin(rotAngle) * rho * nf);
  float turb = fbm3(npos + vec3(0.0, -uTime * 0.35 * uTurbSpeed, 0.0));
  float turbFade = mix(1.0, 0.35, smoothstep(4.0, 9.5, rho));
  float turbMod = max(1.0 + uTurbAmp * turbFade * 3.2 * (turb - 0.52), 0.06);

  float I = uDiskEmission * envelope * coverage * turbMod;
  // Relativistic beaming: bolometric intensity ∝ δ³ (approximate, exponent
  // flattened to keep the far side visible), gravitational redshift dims.
  float beam = pow(doppler, 2.2) * pow(transverse * grav, 1.4);
  beam = clamp(beam, 0.08, 4.5);
  I *= beam;

  // volume emissivity → crossing radiance; alpha saturates for bright, thick plasma
  alpha = clamp(I * 0.5, 0.0, 0.92);
  return blackbodyColor(tempK) * I;
}

// ---------------------------------------------------------------- integrator
// One semi-implicit Euler (symplectic) step of the planar null-geodesic force
// law. h2 is the conserved squared specific angular momentum, constant per ray.
vec3 geodesicAccel(vec3 pos, float h2) {
  float r2 = dot(pos, pos);
  return -1.5 * h2 * pos / (r2 * r2 * sqrt(r2)); // −(3/2) h² x̂/|x|³
}

struct RayResult {
  vec3 color;        // linear HDR radiance (pre-bloom, pre-tonemap)
  float steps;       // normalized step usage
  float captured;    // 1 if terminated inside the horizon
  float escaped;     // 1 if escaped to sky
  float pinch;       // 1 if terminated by step budget near the photon sphere
  float crossCount;  // number of disk plane crossings collected
  float meanShift;   // intensity-weighted mean redshift factor (diagnostics)
  float bOverCrit;   // initial impact parameter / b_crit
  vec3 finalDir;     // escape direction (for lensing diagnostics)
};

RayResult traceRay(vec3 ro, vec3 rd) {
  RayResult res;
  res.color = vec3(0.0);
  res.captured = 0.0;
  res.escaped = 0.0;
  res.pinch = 0.0;
  res.crossCount = 0.0;
  res.meanShift = 0.0;
  res.finalDir = rd;

  // --- initialize the geodesic state --------------------------------------
  vec3 pos = ro;
  vec3 vel = rd; // |vel| = 1 at the observer; scaling is affine freedom
  float h2 = dot(cross(pos, vel), cross(pos, vel));
  float impact = sqrt(h2); // impact parameter since |vel|=1 asymptotically flat-ish
  res.bOverCrit = impact / B_CRIT;


  float camDist = length(ro);
  float escapeR = max(28.0, camDist * 1.8 + 6.0);

  // disk crossing buffers, collected in traversal (path) order
  vec4 hitPosN[4];   // xyz = refined crossing pos, w = coverage weight
  vec3 hitVel[4];    // ray velocity at crossing (for frame reconstruction)
  int nHits = 0;

  float emissionBudget = 1.0; // remaining opacity budget along the path
  vec3 radiance = vec3(0.0);
  float shiftAccum = 0.0;
  float shiftWeight = 0.0;

  float prevPlaneZ = dot(pos, vec3(0.0, 1.0, 0.0)); // disk plane: y = 0, normal +y
  int stepsUsed = 0;
  bool terminated = false;

  // --- numerical integration loop ------------------------------------------
  for (int i = 0; i < 1024; i++) {
    if (i >= uMaxSteps) break;
    stepsUsed = i + 1;

    float r = length(pos);

    // termination: event horizon — nothing escapes, pitch black
    if (r < 1.0 * RS) {
      res.captured = 1.0;
      terminated = true;
      break;
    }
    // termination: escape — asymptotically straight, sample lensed sky
    if (r > escapeR && dot(pos, vel) > 0.0) {
      res.escaped = 1.0;
      res.finalDir = normalize(vel);
      terminated = true;
      break;
    }

    // adaptive affine step: fine near the photon sphere (r = 1.5) where the
    // critical structure forms, coarse far away. dt ∝ r·min(1, r/1.5) keeps
    // spatial displacement roughly constant at large r.
    float dt = 0.055 * r * clamp(r / R_PHOTON, 0.42, 1.0);
    // cap displacement so thin-disk crossings are never jumped over
    dt = min(dt, max(uDiskHalfThick * 1.4, 0.10) + 0.03 * r);

    // symplectic semi-implicit Euler step of the exact planar dynamics
    vec3 acc = geodesicAccel(pos, h2);
    vel += acc * dt;
    pos += vel * dt;

    // --- disk plane crossing detection on the curved path ------------------
    float planeZ = dot(pos, vec3(0.0, 1.0, 0.0));
    if (nHits < uMaxCross && planeZ * prevPlaneZ < 0.0) {
      // bisect the sign change in the plane-normal coordinate
      vec3 pa = pos - vel * dt;   // before step
      vec3 pb = pos;              // after step
      float za = prevPlaneZ;
      float zb = planeZ;
      for (int k = 0; k < 6; k++) {
        vec3 pm = 0.5 * (pa + pb);
        float zm = dot(pm, vec3(0.0, 1.0, 0.0));
        if (zm * za > 0.0) { pa = pm; za = zm; } else { pb = pm; zb = zm; }
      }
      vec3 hit = 0.5 * (pa + pb);
      float rho = length(vec2(hit.x, hit.z));

      // vertical density envelope of the thick disk slab: coverage weight
      // accounts for the path-length of the chord through the slab
      if (rho >= uDiskInner * 0.985 && rho <= uDiskOuter) {
        // approximate vertical excursion amplitude of the crossing smear
        float vertWeight = 1.0; // exact plane crossing: full weight
        // chord boost: grazing crossings traverse more slab material
        float vy = abs(dot(normalize(vel), vec3(0.0, 1.0, 0.0)));
        float chord = clamp(0.20 / max(vy, 0.10), 0.5, 1.9);
        // half-thickness scales total emissivity of the slab
        float thickScale = clamp(uDiskHalfThick / 0.14, 0.25, 3.0);
        float coverage = vertWeight * chord * thickScale;

        // velocity at the crossing for the emitter-frame reconstruction
        hitPosN[nHits] = vec4(hit, coverage);
        hitVel[nHits] = vel;
        nHits++;
      }
    }
    prevPlaneZ = planeZ;
  }

  if (!terminated) {
    // step budget exhausted: near-critical rays winding around the photon
    // sphere. These ARE the critical structure — treat as captured darkness
    // with a pinch flag for diagnostics.
    res.pinch = 1.0;
    res.captured = 1.0;
  }
  res.steps = float(stepsUsed) / float(max(uMaxSteps, 1));

  // --- compose disk crossings in path order (front-to-back) -----------------
  // Crossings are stored in traversal order — the order light accumulated them
  // along the curved path from the camera — so compositing in index order is
  // physically correct front-to-back alpha compositing. The first crossing is
  // the primary image; later ones are the secondary and higher-order images
  // formed by rays that wrapped around the hole.

  for (int k = 0; k < 4; k++) {
    if (k >= nHits) break;
    vec3 hit = hitPosN[k].xyz;
    float coverage = hitPosN[k].w;
    vec3 toCam = -normalize(hitVel[k]);
    float alpha;
    float shift;
    vec3 em = diskEmission(hit, toCam, coverage, alpha, shift);
    float I = max(max(em.r, em.g), em.b);
    if (I > 1e-5) {
      shiftAccum += shift * I;
      shiftWeight += I;
    }
    radiance += em * emissionBudget;
    emissionBudget *= (1.0 - alpha);
    if (emissionBudget < 0.02) break;
  }
  res.crossCount = float(nHits);
  res.meanShift = shiftWeight > 0.0 ? shiftAccum / shiftWeight : 0.0;

  // --- background: only rays that escaped carry sky light -------------------
  if (res.escaped > 0.5) {
    radiance += skyColor(res.finalDir) * emissionBudget;
  }
  // captured or pinch-terminated: pure black — the shadow of the hole

  res.color = radiance;
  return res;
}

// ---------------------------------------------------------------- debug views
vec3 debugPalette(float t) {
  // perceptual-ish blue → cyan → yellow → red ramp for diagnostics
  return clamp(vec3(1.6 * t - 0.2, 1.6 - abs(2.6 * t - 1.3), 1.4 - 1.6 * t), 0.0, 1.0);
}

void main() {
  // --- primary ray from the real interactive camera -------------------------
  vec2 ndc = vUv * 2.0 - 1.0;
  ndc.x *= uResolution.x / uResolution.y;
  float fovScale = tan(uFov * 0.5);
  vec3 rd = normalize(uCamFwd + uCamRight * (ndc.x * fovScale) + uCamUp * (ndc.y * fovScale));
  vec3 ro = uCamPos;

  RayResult res = traceRay(ro, rd);
  vec3 col = res.color;

  // --- diagnostics -----------------------------------------------------------
  if (uDebugView == 1) {
    // integration cost / termination: hue = normalized steps; red tint = captured
    col = debugPalette(res.steps) * 1.4;
    if (res.captured > 0.5 && res.pinch < 0.5) col = vec3(0.9, 0.12, 0.05);
    if (res.pinch > 0.5) col = vec3(0.35, 0.05, 0.02);
  } else if (uDebugView == 2) {
    // event horizon capture mask: red = captured into horizon / pinch, cyan = escaped
    col = res.captured > 0.5 ? vec3(1.0, 0.06, 0.02) * (res.pinch > 0.5 ? 0.45 : 1.0)
                             : vec3(0.02, 0.5, 0.9);
  } else if (uDebugView == 3) {
    // disk crossings count (order structure): 0 black, 1 green, 2 orange, 3 magenta, 4 white
    float n = res.crossCount;
    col = n < 0.5 ? vec3(0.0)
        : n < 1.5 ? vec3(0.05, 0.9, 0.25)
        : n < 2.5 ? vec3(1.0, 0.55, 0.05)
        : n < 3.5 ? vec3(0.95, 0.1, 0.85)
        : vec3(1.0);
    col *= 0.9;
  } else if (uDebugView == 4) {
    // combined redshift/Doppler factor of disk emission: red = redshifted (s < 1), blue = blueshifted (s > 1)
    float s = res.meanShift;
    if (s <= 0.0) { col = vec3(0.0); }
    else {
      float t = clamp((s - 0.55) / 1.1, 0.0, 1.0);
      col = mix(vec3(1.0, 0.08, 0.02), vec3(0.05, 0.25, 1.0), t) * 1.1;
    }
  } else if (uDebugView == 5) {
    // lensed background coordinates: octahedral uv of the escape direction
    if (res.escaped < 0.5) col = vec3(0.0);
    else {
      vec2 ouv = octaEncode(res.finalDir);
      col = vec3(ouv, fract((ouv.x + ouv.y) * 6.0)) * 0.8;
    }
  } else if (uDebugView == 6) {
    // procedural star/galaxy background only, through the same lensing
    if (res.escaped < 0.5) col = vec3(0.0);
    else col = skyColor(res.finalDir);
  } else if (uDebugView == 7) {
    // star field channel isolated
    if (res.escaped < 0.5) col = vec3(0.0);
    else col = starField(res.finalDir, uStarDensity);
  } else if (uDebugView == 8) {
    // pre-postprocess HDR luminance, log-mapped
    float lum = dot(res.color, vec3(0.2126, 0.7152, 0.0722));
    col = heatRamp(clamp(log(1.0 + lum * 4.0) / log(25.0), 0.0, 1.0)) * 1.2;
  } else if (uDebugView == 9) {
    // impact parameter relative to the critical photon-orbit value
    float q = clamp(res.bOverCrit * 0.5, 0.0, 1.0);
    col = heatRamp(q) * 1.1;
    // overlay capture state dimly
    if (res.captured > 0.5) col *= 0.25;
  }

  gl_FragColor = vec4(col, 1.0);
}
`;
