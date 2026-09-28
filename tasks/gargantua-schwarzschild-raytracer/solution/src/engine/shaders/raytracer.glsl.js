// GARGANTUA raytracer shaders (GLSL ES 3.0, used with THREE.ShaderMaterial +
// glslVersion: THREE.GLSL3, so three injects "#version 300 es" and the
// gl_FragColor -> pc_fragColor compatibility define for us).
//
// ----------------------------------------------------------------------------
// Physics: Schwarzschild null geodesics
// ----------------------------------------------------------------------------
// Units: G = c = 1, Schwarzschild radius rs = RS = 1.0 world unit, mass M = rs/2.
// By spherical symmetry every photon trajectory stays in one plane through the
// BH centre. Writing u = 1/r against the azimuthal angle phi in that plane, the
// Schwarzschild null geodesic equation reduces to the standard "Binet" form
//
//     d2u/dphi2 = -u + (3/2) * rs * u^2
//
// (see any GR text, e.g. the Schwarzschild null orbit equation derived from
// (dr/dlambda)^2 = E^2 - (1 - rs/r) L^2 / r^2). This is a mathematically
// equivalent coordinate form of the geodesic - not an ad-hoc bend - and it is
// integrated numerically per pixel with RK4 below. Ray state is (u, du/dphi),
// the initial conditions come from the camera ray (see initialConditions),
// termination happens at the horizon (u -> 1/rs), at far-field escape, or at
// the step budget (rays winding around the photon sphere u = 2/(3 rs)).
// ----------------------------------------------------------------------------

export const raytracerVertex = /* glsl */ `
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const raytracerFragment = /* glsl */ `
precision highp float;
precision highp int;

// GLSL3 ShaderMaterial: three.js does not inject a gl_FragColor alias,
// so the fragment output is declared explicitly here.
layout(location = 0) out vec4 fragOut;

in vec2 vUv;

uniform vec2  uResolution;
uniform float uTime;          // simulated time (seconds), frozen when capture=1
uniform vec3  uCamPos;
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamForward;
uniform float uTanHalfFov;    // tan(vertical FOV / 2)
uniform float uDiskInner;     // inner radius, units of rs
uniform float uDiskOuter;
uniform float uDiskHalfThick; // gaussian half thickness of the disk slab
uniform float uDiskTemp;      // temperature (K) at the inner edge
uniform float uDiskEmission;  // emissivity multiplier
uniform float uOrbitSpeed;    // orbital velocity multiplier
uniform float uTurbAmp;       // turbulence amplitude
uniform float uTurbSpeed;     // turbulence time scale
uniform float uStarDensity;
uniform float uGalaxyBrightness;
uniform int   uDebug;
uniform int   uMaxSteps;
uniform float uStepSize;      // base dphi per RK4 step (adapted near the hole)
uniform int   uDiskSamples;   // column samples per disk-plane crossing
uniform float uEscapeR;       // far-field escape radius (units of rs)

const float RS = 1.0;
const float PI = 3.141592653589793;
const int   MAX_CROSSINGS = 6;

// ---------------------------------------------------------------------------
// Hashes & noise (Dave Hoskins style, deterministic per pixel)
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

float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 s = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  return mix(mix(mix(n000, n100, s.x), mix(n010, n110, s.x), s.y),
             mix(mix(n001, n101, s.x), mix(n011, n111, s.x), s.y), s.z);
}

float fbm(vec3 p) {
  float a = 0.5;
  float v = 0.0;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + vec3(11.7, 5.1, 7.3);
    a *= 0.5;
  }
  return v;
}

// ---------------------------------------------------------------------------
// Blackbody colour: Planckian locus approximation (Tanner Helland fit),
// returned in linear space for the HDR pipeline.
// ---------------------------------------------------------------------------

vec3 blackbody(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  vec3 c;
  c.r = t <= 66.0 ? 1.0 : clamp(1.2929361 * pow(t - 60.0, -0.1332047), 0.0, 1.0);
  c.g = t <= 66.0
    ? clamp(0.3900816 * log(t) - 0.6318414, 0.0, 1.0)
    : clamp(1.1298909 * pow(t - 60.0, -0.0755148), 0.0, 1.0);
  c.b = t >= 66.0
    ? 1.0
    : (t <= 19.0 ? 0.0 : clamp(0.5432068 * log(t - 10.0) - 1.1962541, 0.0, 1.0));
  return pow(c, vec3(2.2)); // fit outputs sRGB-ish values -> linearise
}

// ---------------------------------------------------------------------------
// Procedural background: cubemap-face star cells + tilted galactic band.
// Sampled with the *integrated* escape direction, so it is lensed by the
// geodesics for free. No textures, no cubemaps, no environment maps.
// ---------------------------------------------------------------------------

vec2 cubeFaceUv(vec3 d, out float faceId) {
  vec3 a = abs(d);
  if (a.x >= a.y && a.x >= a.z) {
    faceId = d.x > 0.0 ? 0.0 : 1.0;
    return d.yz / a.x;
  }
  if (a.y >= a.z) {
    faceId = d.y > 0.0 ? 2.0 : 3.0;
    return d.xz / a.y;
  }
  faceId = d.z > 0.0 ? 4.0 : 5.0;
  return d.xy / a.z;
}

vec3 starLayer(vec3 dir, float scale, float density, float intensity) {
  float face;
  vec2 f = cubeFaceUv(dir, face);
  // offset each face by 3 cells (faces span [-1,1]) so cells never straddle seams
  vec2 p = (vec2(face * 3.0 + 1.0, face * 7.0 + 1.0) + f) * scale;
  vec2 id = floor(p);
  vec2 fr = fract(p) - 0.5;
  vec3 h = hash33(vec3(id, face * 13.7));
  if (h.x > density) return vec3(0.0);
  vec2 offs = (h.yz - 0.5) * 0.72;
  float d2 = dot(fr - offs, fr - offs);
  float core = exp(-d2 * (140.0 + 480.0 * h.y)); // point-spread PSF
  float mag = 0.25 + pow(h.z, 9.0) * 9.0;        // power-law brightness
  float tK = mix(2600.0, 11500.0, pow(h.y, 1.6));
  return blackbody(tK) * core * mag * intensity;
}

vec3 backgroundSky(vec3 d) {
  vec3 col = vec3(0.0);

  // deep-space tint (very dim, keeps the void from banding to pure black)
  float neb = fbm(d * 2.1 + vec3(9.1, 3.7, 6.2));
  col += vec3(0.030, 0.045, 0.085) * pow(neb, 2.2) * 0.55;

  // galactic band: great circle with tilted normal, warm core, fbm clouds, dust
  const vec3 GN = normalize(vec3(0.42, 0.78, 0.46));
  const vec3 GC = normalize(vec3(0.86, 0.12, -0.49)); // galactic core direction, lies in the band
  float angBand = acos(clamp(dot(d, GN), -1.0, 1.0));
  float angCore = acos(clamp(dot(d, GC), -1.0, 1.0));
  float band = exp(-pow(angBand * 3.6, 2.0));
  float core = exp(-pow(angCore * 1.9, 2.0));
  float clouds = fbm(d * 4.3 + vec3(2.7, 8.4, 1.1));
  float dust = smoothstep(0.52, 0.86, fbm(d * 7.9 + vec3(17.3, 4.8, 9.6)));
  vec3 gcol = mix(vec3(1.0, 0.80, 0.58), vec3(0.72, 0.82, 1.0), clouds * 0.9);
  vec3 galaxy = band * (0.16 * clouds + core * (0.30 + 0.55 * clouds)) * gcol;
  galaxy *= 1.0 - 0.72 * dust;
  col += galaxy * uGalaxyBrightness * 0.85;

  // three star layers of increasing density, decreasing brightness
  float sd = uStarDensity;
  col += starLayer(d, 96.0, 0.10 * sd, 0.55);
  col += starLayer(d, 168.0, 0.16 * sd, 0.30);
  col += starLayer(d, 262.0, 0.24 * sd, 0.16);
  return col;
}

// ---------------------------------------------------------------------------
// Accretion disk emission sampled on the integrated (curved) path
// ---------------------------------------------------------------------------

// Keplerian pattern rotation rate for differential-rotation turbulence.
float diskOmega(float r) {
  return uOrbitSpeed * sqrt(0.5 * RS) / max(pow(r, 1.5), 0.05);
}

// Local circular-orbit speed measured by a static observer (capped below c).
float diskBeta(float r) {
  float b = uOrbitSpeed * sqrt((0.5 * RS) / max(r - RS, 0.02));
  return clamp(b, 0.0, 0.97);
}

// Density of disk matter at point p (world units, rs = 1).
float diskDensity(vec3 p) {
  float r = length(p);
  if (r < uDiskInner * 0.9 || r > uDiskOuter * 1.05) return 0.0;
  float phi = atan(p.z, p.x);
  // co-rotating sheared pattern coordinate: differential rotation shears the noise
  float phiPattern = phi - diskOmega(r) * uTime * uTurbSpeed;
  vec3 q = vec3(cos(phiPattern), sin(phiPattern), 0.0) * (2.2 + r * 0.55);
  q.z = log(r) * 3.1 + uTime * 0.05 * uTurbSpeed;
  float turb = fbm(q);
  float density = 0.42 + (turb - 0.5) * 2.1 * uTurbAmp;
  // radial edges: soft bright ISCO lip, gradual outer taper
  float inner = smoothstep(uDiskInner * 0.93, uDiskInner * 1.08, r);
  float outer = 1.0 - smoothstep(uDiskOuter * 0.72, uDiskOuter * 0.995, r);
  return max(density, 0.0) * inner * outer;
}

struct TraceResult {
  vec3  color;        // final HDR radiance (disk + background)
  float stepFrac;     // steps used / budget
  int   term;         // 0 escaped, 1 horizon, 2 budget exhausted
  int   crossings;    // ordered disk-plane crossings that hit the annulus
  float gFactor;      // total Doppler * gravitational shift at primary crossing
  vec3  escapeDir;
  float tObs;         // observed temperature at primary crossing (K)
};

// Integrate the null geodesic of one camera ray and accumulate everything the
// path hits. Crossings are processed in path order (increasing phi = increasing
// distance along the ray), so primary and higher-order images composite
// correctly front-to-back.
TraceResult traceRay(vec3 ro, vec3 rd) {
  TraceResult res;
  res.color = vec3(0.0);
  res.stepFrac = 0.0;
  res.term = 2;
  res.crossings = 0;
  res.gFactor = 1.0;
  res.escapeDir = rd;
  res.tObs = 0.0;

  float r0 = length(ro);
  vec3 A = ro / r0;                 // in-plane radial basis at phi = 0
  vec3 nv = cross(ro, rd);
  float nvLen = length(nv);
  float rCam = r0;
  float camGrav = sqrt(max(1.0 - RS / max(rCam, 1.05 * RS), 0.05));

  // ---- initial conditions ------------------------------------------------
  float u;    // u = 1/r
  float du;   // du/dphi
  vec3 B;     // in-plane tangential basis
  bool radial = nvLen < 1e-5;

  if (radial) {
    // ray straight towards/away from the centre: no angular momentum,
    // pure radial plunge or escape
    u = 1.0 / r0;
    du = dot(rd, A) > 0.0 ? -u : u; // outward: r grows; inward: r shrinks
    B = normalize(cross(vec3(0.0, 0.0, 1.0), A) + vec3(1e-4, 0.0, 0.0));
    if (dot(rd, A) > 0.0) res.escapeDir = A; // degenerate centre pixel
  } else {
    nv /= nvLen;
    B = cross(nv, A);
    // conserved specific angular momentum L = r * (tangential speed) = |ro x rd|
    float L = nvLen;
    float dr0 = dot(rd, A); // radial speed component
    u = 1.0 / r0;
    du = -dr0 / L;          // du/dphi = -(dr/dphi) / r^2 = -dr0 / L
  }

  float phi = 0.0;
  vec3 prevPos = ro;
  float prevY = ro.y;
  float transmittance = 1.0;
  float camGravInv = 1.0 / camGrav;

  for (int i = 0; i < uMaxSteps; i++) {
    // adaptive step: fine near the photon sphere, coarse far away
    float h = uStepSize / (1.0 + 3.0 * u * RS);

    // ---- RK4 step of  u'' = -u + 1.5 rs u^2  ------------------------------
    float k1u = du;
    float k1w = -u + 1.5 * RS * u * u;
    float u2 = u + 0.5 * h * k1u;
    float w2 = du + 0.5 * h * k1w;
    float k2u = w2;
    float k2w = -u2 + 1.5 * RS * u2 * u2;
    float u3 = u + 0.5 * h * k2u;
    float w3 = du + 0.5 * h * k2w;
    float k3u = w3;
    float k3w = -u3 + 1.5 * RS * u3 * u3;
    float u4 = u + h * k3u;
    float w4 = du + h * k3w;
    float k4u = w4;
    float k4w = -u4 + 1.5 * RS * u4 * u4;

    u += (h / 6.0) * (k1u + 2.0 * k2u + 2.0 * k3u + k4u);
    du += (h / 6.0) * (k1w + 2.0 * k2w + 2.0 * k3w + k4w);
    phi += h;

    if (!(u > 0.0) || !(u < 1e6)) { res.term = 1; break; } // numerical guard

    float r = 1.0 / u;
    vec3 D = cos(phi) * A + sin(phi) * B;
    vec3 pos = D * r;

    // ---- termination: event horizon --------------------------------------
    if (u >= (1.0 / RS) * 1.01) { res.term = 1; break; }

    // ---- termination: far-field escape ------------------------------------
    if (r > uEscapeR && du < 0.0) {
      res.term = 0;
      // free-flight direction: dX/dphi = -(du/u^2) D + (1/u) D_perp
      vec3 Dp = -sin(phi) * A + cos(phi) * B;
      res.escapeDir = normalize(-du / (u * u) * D + Dp / u);
      break;
    }

    // ---- disk-plane crossing (ordered, front-to-back along the path) ------
    if (res.crossings < MAX_CROSSINGS && prevY * pos.y < 0.0) {
      float t = prevY / (prevY - pos.y);
      vec3 xc = mix(prevPos, pos, t);
      float rr = length(xc);
      if (rr > uDiskInner && rr < uDiskOuter) {
        res.crossings++;

        // photon propagation direction at the crossing
        vec3 Dp = -sin(phi) * A + cos(phi) * B;
        vec3 photonDir = normalize(-du / (u * u) * D + Dp / u);
        vec3 dirToObs = -photonDir; // light travels towards the camera

        // slab column around the crossing, driven by geometry (local straight-line
        // approximation) rather than the integration step, so brightness does not
        // depend on the quality tier's step size
        float halfSpan = clamp(2.5 * uDiskHalfThick / max(abs(photonDir.y), 0.12),
                               uDiskHalfThick, 3.0);
        float dtw = (2.0 * halfSpan) / float(uDiskSamples);
        vec3 primaryColor = vec3(0.0);
        float primaryG = 1.0;
        float primaryT = 0.0;

        for (int s = 0; s < uDiskSamples; s++) {
          float ts = -halfSpan + ((float(s) + 0.5) * dtw);
          vec3 p = xc + photonDir * ts;
          float yy = p.y;
          float gauss = exp(-(yy * yy) / (uDiskHalfThick * uDiskHalfThick));
          if (gauss < 0.004) continue;

          float density = diskDensity(p);
          if (density <= 0.0) continue;
          float pr = length(p);
          if (pr <= uDiskInner || pr >= uDiskOuter) continue;

          // --- relativistic shifts -------------------------------------------
          vec3 vDir = normalize(vec3(-p.z, 0.0, p.x)); // prograde (CCW from +y)
          float beta = diskBeta(pr);
          float cosT = dot(vDir, dirToObs);
          float gDoppler = sqrt(1.0 - beta * beta) / max(1.0 - beta * cosT, 0.05);
          float gGrav = sqrt(max(1.0 - RS / pr, 0.02)) * camGravInv;
          float g = gDoppler * gGrav;

          // Shakura-Sunyaev-like temperature profile, Doppler/gravitationally shifted
          float temp = uDiskTemp * pow(clamp(pr / uDiskInner, 1.0, 40.0), -0.75);
          float tObsK = temp * g;

          // observed intensity: blackbody hue at the shifted temperature,
          // bolometric-ish brightness ~ g^3 beaming, integrated over the slab column
          float lum = pow(clamp(tObsK / 6500.0, 0.0, 40.0), 3.0);
          vec3 emit = blackbody(tObsK) * lum * uDiskEmission * 3.2;

          // volumetric compositing inside the slab, ordered along the path
          float opacity = clamp(density * 1.7 * dtw, 0.0, 0.98);
          primaryColor += transmittance * emit * density * gauss * dtw;
          primaryT = max(primaryT, tObsK);
          primaryG = g;
          transmittance *= 1.0 - opacity;
          if (transmittance < 0.02) break;
        }

        res.color += primaryColor;
        if (res.crossings == 1) {
          res.gFactor = primaryG;
          res.tObs = primaryT;
        }
        if (transmittance < 0.02) { res.term = 0; break; } // optically thick: background fully blocked
      }
    }

    prevPos = pos;
    prevY = pos.y;
    res.stepFrac = float(i + 1) / float(uMaxSteps);
  }

  if (res.term == 0) {
    res.color += transmittance * backgroundSky(res.escapeDir);
  }
  // term 1 (horizon) and term 2 (budget: winding the photon sphere) stay black
  return res;
}

// ---------------------------------------------------------------------------
// Debug view helpers
// ---------------------------------------------------------------------------

vec3 debugPalette(float t) { // cheap inferno-like ramp
  t = clamp(t, 0.0, 1.0);
  return vec3(pow(t, 0.9), 0.35 * t * t, 0.35 + 0.4 * sin(PI * t)) * smoothstep(1.0, 0.85, t) + vec3(0.02, 0.0, 0.08) * (1.0 - t);
}

vec3 lonLatGrid(vec3 d) {
  float lon = atan(d.z, d.x) / (2.0 * PI) + 0.5; // 0..1
  float lat = asin(clamp(d.y, -1.0, 1.0)) / PI + 0.5;
  vec2 g = vec2(lon, lat) * 12.0;
  vec2 fr = abs(fract(g) - 0.5);
  float line = 1.0 - smoothstep(0.42, 0.5, max(fr.x, fr.y));
  vec3 hue = 0.5 + 0.5 * cos(6.2831 * (lon + vec3(0.0, 0.33, 0.67)));
  return hue * 0.55 + line * 0.45;
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec3 rd = normalize(
    uCamForward +
    uCamRight * (ndc.x * uTanHalfFov * aspect) +
    uCamUp * (ndc.y * uTanHalfFov)
  );

  TraceResult res = traceRay(uCamPos, rd);
  vec3 outCol;

  int dbg = uDebug;
  if (dbg == 0) {
    // 0: final composed HDR frame (bloom + ACES happen in the post chain)
    outCol = res.color;
  } else if (dbg == 1) {
    // 1: ray marching budget / termination class
    vec3 c = debugPalette(res.stepFrac);
    if (res.term == 1) c = mix(c, vec3(1.0, 0.12, 0.05), 0.55);      // horizon capture
    else if (res.term == 2) c = mix(c, vec3(0.9, 0.2, 0.95), 0.55);  // budget/winding
    outCol = c;
  } else if (dbg == 2) {
    // 2: event horizon mask (white = captured, incl. photon-sphere winding)
    outCol = (res.term == 1 || res.term == 2) ? vec3(0.95) : vec3(0.05, 0.07, 0.10);
  } else if (dbg == 3) {
    // 3: ordered disk-plane crossing count (image order)
    if (res.crossings <= 0) outCol = vec3(0.02);
    else if (res.crossings == 1) outCol = vec3(1.0, 0.55, 0.15) * 0.9;
    else if (res.crossings == 2) outCol = vec3(0.15, 0.75, 1.0) * 0.9;
    else if (res.crossings == 3) outCol = vec3(0.85, 0.25, 0.95) * 0.9;
    else outCol = vec3(1.0) * 0.9;
  } else if (dbg == 4) {
    // 4: total redshift / Doppler factor at the primary crossing (log2 scale)
    if (res.crossings <= 0) outCol = vec3(0.07);
    else {
      float lg = clamp(log2(max(res.gFactor, 0.01)) * 0.5, -1.0, 1.0);
      outCol = lg < 0.0
        ? mix(vec3(0.5), vec3(1.0, 0.15, 0.08), -lg)
        : mix(vec3(0.5), vec3(0.15, 0.45, 1.0), lg);
    }
  } else if (dbg == 5) {
    // 5: lensed background coordinates (escape direction grid)
    outCol = (res.term == 0) ? lonLatGrid(res.escapeDir) : vec3(0.02);
  } else if (dbg == 6) {
    // 6: procedural star field / galaxy contribution alone
    outCol = (res.term == 0) ? backgroundSky(res.escapeDir) : vec3(0.0);
  } else if (dbg == 7) {
    // 7: pre-tonemapping HDR radiance (Reinhard preview of the linear buffer)
    outCol = res.color / (1.0 + res.color);
  } else if (dbg == 8) {
    // 8: observed disk temperature field
    if (res.crossings > 0) {
      outCol = blackbody(res.tObs) * (0.22 + res.tObs / 9000.0);
    } else {
      outCol = vec3(0.03);
    }
  } else {
    // 9: HDR luminance map (what the bloom threshold sees)
    float lum = dot(res.color, vec3(0.2126, 0.7152, 0.0722));
    outCol = debugPalette(log2(1.0 + lum) / log2(1.0 + 60.0));
  }

  fragOut = vec4(max(outCol, vec3(0.0)), 1.0);
}
`;
