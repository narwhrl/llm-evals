export const fullscreenVert = /* glsl */ `
precision highp float;
attribute vec3 position;
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const blackholeFrag = /* glsl */ `
precision highp float;

varying vec2 vUv;

// ---- Camera (from OrbitControls / Three.js camera) ----
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uFov;          // degrees
uniform float uAspect;

// ---- Simulation ----
uniform float uTime;
uniform float uTimeScale;

// ---- Disk ----
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfH;
uniform float uDiskTemp;
uniform float uDiskEmit;
uniform float uOrbitalSpeed;
uniform float uTurbAmp;
uniform float uTurbSpeed;

// ---- Background ----
uniform float uStarDensity;
uniform float uGalaxyBright;

// ---- Post (used in composite pass; kept here for debug consistency) ----
uniform float uExposure;

// ---- Integration budget (quality) ----
uniform int uMaxSteps;
uniform float uStepSize;

// ---- Debug ----
uniform int uDebug;

// Geometric units: Schwarzschild radius rs = 1, mass M = 0.5.
// Event horizon: r = 1. Photon sphere (unstable circular null orbit): r = 1.5.
const float RS = 1.0;
const float M = 0.5;
const float PI = 3.141592653589793;
const float TAU = 6.283185307179586;

// -----------------------------------------------------------------------------
// Hash / noise (procedural stars, galaxy, disk turbulence — no textures)
// -----------------------------------------------------------------------------
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float noise3(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash31(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash31(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash31(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash31(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash31(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash31(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash31(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash31(i + vec3(1.0, 1.0, 1.0));
  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);
  float nxy0 = mix(nx00, nx10, f.y);
  float nxy1 = mix(nx01, nx11, f.y);
  return mix(nxy0, nxy1, f.z);
}

float fbm(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 5; i++) {
    s += a * noise3(p);
    p = p * 2.07 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return s;
}

// Blackbody-ish palette from normalized temperature factor
vec3 tempToRGB(float t) {
  t = max(t, 0.05);
  // Approximate Planck locus in linear HDR
  float x = 1.0 / t;
  vec3 c = vec3(
    1.0 + 0.15 * t,
    0.35 + 0.9 * smoothstep(0.2, 1.8, t),
    0.12 + 1.4 * smoothstep(0.8, 2.5, t)
  );
  c *= 0.55 + 1.8 * pow(t, 1.4);
  return c;
}

// -----------------------------------------------------------------------------
// Procedural sky (stars + galactic band) evaluated on a unit direction
// -----------------------------------------------------------------------------
vec3 proceduralStars(vec3 dir) {
  dir = normalize(dir);
  float bright = 0.0;
  // Cell-hashed sparse stars on the sphere
  float scale = 36.0;
  vec3 p = dir * scale;
  vec3 cell = floor(p);
  for (int z = -1; z <= 1; z++)
  for (int y = -1; y <= 1; y++)
  for (int x = -1; x <= 1; x++) {
    vec3 c = cell + vec3(float(x), float(y), float(z));
    float h = hash31(c);
    float threshold = 1.0 - clamp(0.028 * uStarDensity, 0.0, 0.25);
    if (h > threshold) {
      vec3 spos = normalize(c + vec3(hash31(c + 1.7), hash31(c + 3.1), hash31(c + 5.9)));
      float d = length(dir - spos);
      float mag = (h - threshold) / max(1.0 - threshold, 1e-4);
      float core = exp(-d * d * mix(4.0e4, 1.6e5, mag));
      bright += core * (0.55 + 2.8 * mag);
    }
  }
  float glitter = pow(hash31(floor(dir * 200.0 + 11.0)), mix(20.0, 9.0, clamp(uStarDensity * 0.5, 0.0, 1.0)));
  bright += glitter * 0.4 * uStarDensity;
  return vec3(bright);
}

vec3 proceduralGalaxy(vec3 dir) {
  dir = normalize(dir);
  // Galactic plane near XZ with slight tilt
  float lat = dir.y;
  float lon = atan(dir.z, dir.x);
  float band = exp(-pow(lat * 4.5, 2.0));
  float arms = 0.55 + 0.45 * sin(lon * 3.0 + lat * 8.0 + fbm(dir * 3.0) * 4.0);
  float dust = fbm(dir * 6.0 + vec3(0.0, lon, 0.0));
  float glow = band * arms * (0.35 + 0.9 * dust);
  vec3 col = vec3(0.35, 0.45, 0.85) * glow;
  col += vec3(0.9, 0.55, 0.35) * glow * glow * 0.65;
  // Central bulge
  float bulge = exp(-pow(length(dir.xz) * 1.8, 2.0)) * exp(-pow(lat * 6.0, 2.0));
  col += vec3(1.0, 0.85, 0.6) * bulge * 1.4;
  return col * uGalaxyBright * 0.22;
}

vec3 sampleBackground(vec3 dir) {
  return proceduralStars(dir) + proceduralGalaxy(dir);
}

// -----------------------------------------------------------------------------
// Disk emission along bent geodesic equatorial crossings
// -----------------------------------------------------------------------------
vec3 evaluateDisk(vec3 pos, vec3 photonDir, float orderWeight) {
  float r = length(pos.xz);
  float phi = atan(pos.z, pos.x);
  float dens = exp(-pow(pos.y / max(uDiskHalfH, 1e-4), 2.0));
  dens *= smoothstep(uDiskInner, uDiskInner + 0.4, r) * smoothstep(uDiskOuter, uDiskOuter - 1.0, r);
  if (dens < 1e-4 || r < uDiskInner || r > uDiskOuter) return vec3(0.0);

  float tNorm = uDiskTemp * pow(uDiskInner / max(r, 1.05), 0.75);
  vec3 col = tempToRGB(tNorm);

  // Turbulence
  float turb = fbm(vec3(phi * 2.0, r * 0.55, uTime * uTurbSpeed * 0.35));
  turb += 0.5 * fbm(vec3(r * 1.3, phi * 5.0 - uTime * uTurbSpeed, 2.0));
  dens *= 1.0 + uTurbAmp * (turb * 2.0 - 1.0);
  dens = max(dens, 0.0);

  // Gravitational redshift factor g = sqrt(1 - rs/r) for static observers (Schwarzschild)
  float grav = sqrt(max(1.0 - RS / max(r, 1.001), 0.0));

  // Orbital Doppler: beta = v/c = sqrt(M/r) * orbitalSpeed
  float beta = clamp(sqrt(M / max(r, 1.05)) * uOrbitalSpeed, 0.0, 0.85);
  vec3 ePhi = vec3(-sin(phi), 0.0, cos(phi));
  float mu = clamp(dot(normalize(photonDir), ePhi), -1.0, 1.0);
  // Special-relativistic Doppler for approaching/receding emitter
  float doppler = sqrt((1.0 - beta) / (1.0 + beta));
  // Blend with direction: approaching (mu>0 when photonDir aligned with orbital vel of emitter toward observer...
  // PhotonDir is direction of propagation; emitter velocity ePhi*beta; classical boost:
  float gamma = 1.0 / sqrt(max(1.0 - beta * beta, 1e-4));
  float cosAlpha = clamp(dot(normalize(-photonDir), ePhi), -1.0, 1.0); // angle between emitter vel and direction to observer along ray reverse
  float boost = 1.0 / (gamma * (1.0 - beta * cosAlpha));
  float shift = grav * boost;

  // Shift spectrum & intensity (~ shift^3 for bolometric invariant approx)
  col *= pow(max(shift, 0.05), 3.0);
  col *= dens * uDiskEmit * orderWeight * 2.4;
  // Store shift into luminance weighting for debug via return length
  return col;
}

// -----------------------------------------------------------------------------
// Schwarzschild null-geodesic integrator
// Chart: geometric units with rs = 1. State: Cartesian-like (x,y,z) with
// affine-parameter velocity vel. Exact null-geodesic reduction used in
// real-time GR rendering (see e.g. Interstellar technical notes / common
// Shadertoy Schwarzschild form):
//   h = x × v
//   dv/dλ = −(3/2) |h|² x / |x|⁵
// Termination: r ≤ rs (horizon), escape r > far, or step budget exhausted.
// -----------------------------------------------------------------------------
struct TraceResult {
  vec3 color;
  float stepsNorm;
  float horizon;
  float diskHits;
  float shiftVis;
  vec3 lensDir;
  vec3 stars;
  vec3 galaxy;
  vec3 diskOnly;
  vec3 hdr;
};

TraceResult traceRay(vec3 ro, vec3 rd) {
  TraceResult tr;
  tr.color = vec3(0.0);
  tr.stepsNorm = 0.0;
  tr.horizon = 0.0;
  tr.diskHits = 0.0;
  tr.shiftVis = 0.0;
  tr.lensDir = rd;
  tr.stars = vec3(0.0);
  tr.galaxy = vec3(0.0);
  tr.diskOnly = vec3(0.0);
  tr.hdr = vec3(0.0);

  vec3 pos = ro;
  vec3 vel = rd;
  float prevY = pos.y;
  float transmittance = 1.0;
  vec3 radiance = vec3(0.0);
  float hits = 0.0;
  float shiftSum = 0.0;
  int maxS = uMaxSteps;
  float hStep = uStepSize;

  // Adaptive-ish: slightly smaller steps near photon sphere
  for (int i = 0; i < 1600; i++) {
    if (i >= maxS) break;
    float r = length(pos);

    if (r <= RS * 1.001) {
      tr.horizon = 1.0;
      tr.stepsNorm = float(i) / float(maxS);
      break;
    }
    if (r > 80.0) {
      tr.stepsNorm = float(i) / float(maxS);
      break;
    }

    // Angular momentum and Schwarzschild null acceleration
    // (spatial march of dx/dλ with dv/dλ = −1.5 |h|² x / r⁵, rs=1 units)
    vec3 hvec = cross(pos, vel);
    float h2 = dot(hvec, hvec);
    float r5 = pow(r, 5.0);
    vec3 accel = -1.5 * h2 * pos / max(r5, 1e-8);

    // Adaptive coordinate step: long strides far away, refine near photon sphere
    float dt = hStep * max(0.35, r * 0.15);
    dt *= mix(1.0, 0.4, smoothstep(6.0, 1.6, r));

    vel += accel * dt;
    pos += vel * dt;

    float y = pos.y;
    // Equatorial plane crossings → disk samples (primary, secondary, ...)
    if (prevY * y < 0.0) {
      // Linear interpolate crossing
      float tcross = prevY / (prevY - y);
      vec3 hit = mix(pos - vel * dt, pos, tcross);
      float rr = length(hit.xz);
      if (rr >= uDiskInner && rr <= uDiskOuter && abs(hit.y) < uDiskHalfH * 4.0) {
        hits += 1.0;
        // Higher-order images attenuated
        float orderW = pow(0.55, max(hits - 1.0, 0.0));
        vec3 emit = evaluateDisk(hit, normalize(vel), orderW);
        // Approximate shift visualization
        float rH = max(length(hit.xz), 1.05);
        float grav = sqrt(max(1.0 - RS / rH, 0.0));
        shiftSum += grav * orderW;
        radiance += transmittance * emit;
        transmittance *= exp(-1.1 * orderW);
      }
    }
    prevY = y;
    tr.stepsNorm = float(i + 1) / float(maxS);
  }

  tr.diskHits = hits;
  tr.shiftVis = shiftSum;
  tr.diskOnly = radiance;
  tr.lensDir = normalize(vel);
  tr.stars = proceduralStars(tr.lensDir);
  tr.galaxy = proceduralGalaxy(tr.lensDir);

  vec3 bg = (tr.stars + tr.galaxy) * transmittance;
  // Escape: if captured by horizon, no background
  if (tr.horizon > 0.5) {
    bg = vec3(0.0);
  }
  tr.hdr = radiance + bg;
  tr.color = tr.hdr;
  return tr;
}

void main() {
  // NDC from UV
  vec2 ndc = vUv * 2.0 - 1.0;
  float tanHalf = tan(radians(uFov) * 0.5);
  vec3 rd = normalize(
    uCamRight * (ndc.x * tanHalf * uAspect) +
    uCamUp * (ndc.y * tanHalf) +
    uCamForward
  );
  vec3 ro = uCamPos;

  TraceResult tr = traceRay(ro, rd);

  vec3 outc = tr.hdr * uExposure;

  if (uDebug == 1) {
    // steps + termination tint (red=horizon, green=escape, blue=budget)
    float s = tr.stepsNorm;
    outc = vec3(s);
    if (tr.horizon > 0.5) outc = vec3(s, 0.1, 0.1);
    else if (length(tr.lensDir) > 0.0 && length(uCamPos) > 0.0) {
      // escape-ish: cooler
      outc = vec3(0.1, s, 0.35);
    }
  } else if (uDebug == 2) {
    outc = vec3(tr.horizon);
  } else if (uDebug == 3) {
    outc = vec3(tr.diskHits * 0.35, tr.diskHits * 0.15, fract(tr.diskHits * 0.5));
  } else if (uDebug == 4) {
    outc = vec3(tr.shiftVis, tr.shiftVis * 0.5, 1.0 - clamp(tr.shiftVis, 0.0, 1.0));
  } else if (uDebug == 5) {
    outc = 0.5 + 0.5 * tr.lensDir;
  } else if (uDebug == 6) {
    outc = tr.stars;
  } else if (uDebug == 7) {
    outc = tr.galaxy;
  } else if (uDebug == 8) {
    outc = tr.diskOnly;
  } else if (uDebug == 9) {
    outc = tr.hdr;
  }

  gl_FragColor = vec4(outc, 1.0);
}
`;

export const bloomExtractFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tInput;
uniform float uThreshold;
void main() {
  vec3 c = texture2D(tInput, vUv).rgb;
  float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float m = max(lum - uThreshold, 0.0);
  gl_FragColor = vec4(c * (m / (lum + 1e-4)), 1.0);
}
`;

export const bloomBlurFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tInput;
uniform vec2 uDirection;
uniform vec2 uTexel;
void main() {
  vec3 sum = vec3(0.0);
  // 9-tap Gaussian
  sum += texture2D(tInput, vUv - 4.0 * uDirection * uTexel).rgb * 0.016216;
  sum += texture2D(tInput, vUv - 3.0 * uDirection * uTexel).rgb * 0.054054;
  sum += texture2D(tInput, vUv - 2.0 * uDirection * uTexel).rgb * 0.1216216;
  sum += texture2D(tInput, vUv - 1.0 * uDirection * uTexel).rgb * 0.1945946;
  sum += texture2D(tInput, vUv).rgb * 0.227027;
  sum += texture2D(tInput, vUv + 1.0 * uDirection * uTexel).rgb * 0.1945946;
  sum += texture2D(tInput, vUv + 2.0 * uDirection * uTexel).rgb * 0.1216216;
  sum += texture2D(tInput, vUv + 3.0 * uDirection * uTexel).rgb * 0.054054;
  sum += texture2D(tInput, vUv + 4.0 * uDirection * uTexel).rgb * 0.016216;
  gl_FragColor = vec4(sum, 1.0);
}
`;

export const compositeFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform float uTime;
uniform int uDebug;
uniform vec2 uResolution;

// ACES fitted approximation (Narkowicz 2015) — documented equivalent of ACES filmic tonemap
vec3 ACESFilm(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

float grainNoise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233)) + uTime * 17.0) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  vec3 scene;

  if (uDebug == 0) {
    // Mild chromatic aberration (radial)
    vec2 centered = uv - 0.5;
    float r = length(centered);
    vec2 dir = centered / max(r, 1e-4);
    float ca = uChromatic * r;
    float cr = texture2D(tScene, uv + dir * ca).r;
    float cg = texture2D(tScene, uv).g;
    float cb = texture2D(tScene, uv - dir * ca).b;
    scene = vec3(cr, cg, cb);
  } else {
    scene = texture2D(tScene, uv).rgb;
  }

  vec3 bloom = texture2D(tBloom, uv).rgb;
  vec3 hdr = scene;
  if (uDebug == 0) {
    hdr += bloom * uBloomStrength;
  }

  vec3 mapped;
  if (uDebug == 0) {
    mapped = ACESFilm(hdr * uExposure);
  } else if (uDebug == 9) {
    // Show HDR compressed for visibility
    mapped = ACESFilm(hdr * uExposure);
  } else {
    // Debug buffers already prepared; light tonemap for visibility
    mapped = ACESFilm(max(hdr, 0.0) * max(uExposure, 0.4));
  }

  if (uDebug == 0) {
    // Vignette
    vec2 vc = uv * 2.0 - 1.0;
    float vig = 1.0 - dot(vc, vc) * uVignette;
    mapped *= clamp(vig, 0.0, 1.0);
    // Grain
    float g = grainNoise(uv * uResolution) - 0.5;
    mapped += g * uGrain;
  }

  // sRGB-ish output
  mapped = pow(max(mapped, 0.0), vec3(1.0 / 2.2));
  gl_FragColor = vec4(mapped, 1.0);
}
`;
