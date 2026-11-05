// ---------------------------------------------------------------------------
// GARGANTUA — full-screen Fragment Shader raytracer.
//
// Coordinates / chart
//   Schwarzschild coordinates (t, r, theta, phi), geometrised units G = c = 1.
//   The horizon is fixed at r_s = 2M = 1, hence M = 0.5. By spherical symmetry
//   every null geodesic stays in the plane spanned by the observer radius vector
//   e1 and the ray's tangential direction e2. A point on the ray is
//        p(phi) = r(phi) * ( cos(phi)*e1 + sin(phi)*e2 ),  r = 1/u.
//
// State quantities
//   u = 1/r and du = du/dphi. For a null geodesic the orbit equation is
//        d2u/dphi2 + u = 3*M*u^2
//   with first integral (du/dphi)^2 + u^2 - 2*M*u^3 = 1/b^2, b = L/E impact
//   parameter of a local static observer. We integrate (u, du) with fixed
//   RK4 steps in phi (dphi is a quality-controlled uniform).
//
// Termination
//   * u >= 1/r_s            -> crossed the event horizon (captured, no emission)
//   * u < 1/R_FAR && du<0   -> escaped to the celestial sphere (lensed sky)
//   * step budget exhausted while u is still near the unstable photon orbit
//     (r = 3M) -> treated as captured; the photon-ring light is accumulated
//     from the disk crossings already gathered along the winding path.
//
// Disk
//   The thin disk lies in the equatorial plane y = 0. At each step we detect a
//   sign change of the world-space height p(phi).y, interpolate the crossing,
//   and composite that crossing's emission front-to-back in path order. A ray
//   can therefore collect a primary, secondary and higher-order image.
// ---------------------------------------------------------------------------

export const VERT_QUAD = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const GLSL_NOISE = /* glsl */ `
float hash21(vec2 p) {
  // Hoskins hash: well-defined for integer and fractional inputs alike.
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p, int oct) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    if (i >= oct) break;
    s += a * vnoise(p);
    p = p * 2.03 + vec2(11.7, 5.3);
    a *= 0.5;
  }
  return s;
}
`;

export const FRAG_GEODESIC = /* glsl */ `
precision highp float;

#define HARD_MAX_STEPS 480

const float RS = 1.0;              // Schwarzschild radius (2M)
const float M = 0.5;               // geometric mass
const float BCRIT = 2.598076;      // 3*sqrt(3)*M : critical impact parameter
const float R_FAR = 200.0;
const float U_ESC = 1.0 / 200.0;
const float PI2 = 6.2831853;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;
uniform float uAspect;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemp;
uniform float uEmission;
uniform float uOrbitSpeed;
uniform float uTurbAmp;
uniform float uTurbSpeed;
uniform float uStarDensity;
uniform float uGalaxy;

uniform float uDebug;
uniform int uMaxSteps;
uniform float uDPhi;
uniform int uNoiseOctaves;

${GLSL_NOISE}

// Temperature -> hot-blackbody-ish emission colour (inner = white/blue, outer = red).
vec3 diskColor(float T) {
  vec3 cool = vec3(0.58, 0.10, 0.02);
  vec3 warm = vec3(1.30, 0.48, 0.10);
  vec3 hot  = vec3(1.06, 1.03, 1.24);
  float x = clamp(T, 0.0, 1.0);
  vec3 c = mix(cool, warm, smoothstep(0.0, 0.55, x));
  return mix(c, hot, smoothstep(0.5, 1.0, x));
}

// Procedural, lensed star field + galactic band. d is the asymptotic sky
// direction after geodesic deflection, so the pattern is genuinely lensed.
vec3 renderSky(vec3 d) {
  vec2 sph = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0)));
  vec3 stars = vec3(0.0);
  for (int layer = 0; layer < 2; layer++) {
    float scale = uStarDensity * (layer == 0 ? 1.0 : 2.35);
    vec2 g = sph * scale;
    vec2 cell = floor(g), f = fract(g);
    float h = hash21(cell + float(layer) * 17.7);
    vec2 sp = vec2(hash21(cell + 3.1), hash21(cell + 8.9));
    float dist = length(f - sp);
    float bright = pow(hash21(cell + 13.3), 6.0);
    float threshold = 0.90 - float(layer) * 0.07;
    float s = (1.0 - smoothstep(0.0, 0.06, dist)) * step(threshold, h) * bright;
    vec3 tint = mix(vec3(0.66, 0.79, 1.0), vec3(1.0, 0.85, 0.62), hash21(cell + 27.1));
    stars += s * tint * 3.4;
  }
  vec3 gn = normalize(vec3(0.35, 0.82, -0.45));
  float lat = dot(d, gn);
  float bl = lat / 0.23;
  float band = exp(-bl * bl);
  vec2 gp = vec2(sph.x * 2.0, lat * 8.0);
  float clouds = fbm(gp * 3.0 + vec2(4.0, 1.0), 4);
  float dust = fbm(gp * 7.0 - vec2(2.0, 3.0), 3);
  float gal = band * (0.10 + 0.48 * clouds) *
              (1.0 - 0.5 * smoothstep(0.40, 0.72, dust)) * uGalaxy;
  vec3 galColor = mix(vec3(0.28, 0.40, 0.74), vec3(1.0, 0.83, 0.61), clouds);
  vec3 galaxy = gal * galColor * 0.8;
  vec3 base = vec3(0.006, 0.008, 0.016) + vec3(0.02, 0.025, 0.05) * max(0.0, clouds - 0.35);
  return base + stars + galaxy;
}

// Emission of one equatorial-plane crossing. Returns radiance and the combined
// gravitational-redshift * Doppler shift factor (used for diagnostics).
vec3 diskEmission(vec3 p, float r, float u, float du, vec3 nhat, vec3 mhat, out float shift) {
  float T = clamp(pow(uDiskInner / max(r, uDiskInner), 0.75) * uDiskTemp, 0.0, 1.30);
  vec3 base = diskColor(T);
  float radial = pow(uDiskInner / max(r, uDiskInner), 1.9);
  float inner = smoothstep(uDiskInner, uDiskInner + 0.45, r);
  float outer = 1.0 - smoothstep(uDiskOuter - 1.8, uDiskOuter, r);

  // Animated, differentially rotating procedural turbulence.
  float angle = atan(p.z, p.x);
  float rr = log(max(r, 1.001) / uDiskInner);
  float swirl = angle + uTime * uTurbSpeed * 0.5 / pow(max(r, 1.0), 1.5);
  vec2 q = vec2(cos(swirl), sin(swirl)) * (r * 1.35);
  float n = fbm(q * 0.6 + vec2(rr * 2.2, uTime * uTurbSpeed * 0.2), uNoiseOctaves);
  float bands = 0.5 + 0.5 * sin(rr * 20.0 - uTime * uTurbSpeed * 1.4 + n * 7.0);
  float turb = clamp(mix(1.0, 0.25 + 1.7 * n * bands, uTurbAmp), 0.05, 3.0);

  // Circular equatorial orbit: v = sqrt(M/(r-r_s)) for a local static observer.
  float v = clamp(sqrt(M / max(r - RS, 0.35)) * uOrbitSpeed, 0.0, 0.96);
  float gamma = 1.0 / sqrt(1.0 - v * v);
  vec3 radialDir = normalize(vec3(p.x, 0.0, p.z) + vec3(1e-5, 0.0, 0.0));
  vec3 beta = v * normalize(cross(vec3(0.0, 1.0, 0.0), radialDir));

  // Backward-traced direction is dp/dphi ~= -(du/u)*nhat + mhat; the photon
  // travels the opposite way, so emitter->observer is -vback.
  float k = du / max(u, 1e-5);
  vec3 vback = normalize(-k * nhat + mhat);
  vec3 nObs = -vback;
  float doppler = 1.0 / max(0.08, gamma * (1.0 - dot(beta, nObs)));
  float grav = sqrt(max(0.02, 1.0 - 3.0 * M / max(r, 1.6)));
  float g = clamp(grav * doppler, 0.15, 4.0);
  shift = g;
  float boost = pow(g, 3.0);
  float lg = log(max(g, 0.01)) * 1.442695;
  vec3 tint = clamp(vec3(1.0 + 0.18 * lg, 1.0, 1.0 - 0.18 * lg), 0.6, 1.5);
  return base * tint * (uEmission * radial * inner * outer * turb * boost);
}

void main() {
  vec2 ndc = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  vec3 dir = normalize(uCamForward
      + ndc.x * uAspect * uTanHalfFov * uCamRight
      + ndc.y * uTanHalfFov * uCamUp);

  // Observer-relative geodesic plane basis.
  float r0 = length(uCamPos);
  vec3 e1 = uCamPos / r0;
  vec3 e2raw = dir - dot(dir, e1) * e1;
  float bt = length(e2raw);
  vec3 e2 = bt < 1e-4 ? normalize(cross(e1, vec3(0.0, 1.0, 0.0)) + vec3(1e-4, 0.0, 0.0))
                      : e2raw / bt;
  bt = max(bt, 1e-4);
  float a = dot(dir, e1);

  float u = 1.0 / max(r0, 1.2);
  // b = r0 * sin(alpha) / sqrt(1 - r_s/r0): impact parameter measured by a
  // local static observer in Schwarzschild coordinates.
  float b = max(r0 * bt / sqrt(max(0.05, 1.0 - RS / r0)), 0.02);
  float du = sqrt(max(0.0, 1.0 / (b * b) - u * u + 2.0 * M * u * u * u));
  du = min(du, 6.0);
  if (a > 0.0) du = -du;   // outgoing rays have decreasing u

  float phi = 0.0;
  float uPrev = u, duPrev = du, phiPrev = 0.0;
  float planeYPrev = e1.y;
  vec3 acc = vec3(0.0);
  float trans = 1.0;
  int crossings = 0;
  float firstShift = 0.0;
  float maxU = u;
  float stepsUsed = 0.0;
  bool captured = false, escaped = false;

  for (int i = 0; i < HARD_MAX_STEPS; i++) {
    if (i >= uMaxSteps) break;
    float h = uDPhi;
    // RK4 on (u, du) with d2u/dphi2 = -u + 3*M*u^2
    float k1u = du,              k1d = -u + 3.0 * M * u * u;
    float k2u = du + 0.5 * h * k1d, k2d = -(u + 0.5 * h * k1u) + 3.0 * M * (u + 0.5 * h * k1u) * (u + 0.5 * h * k1u);
    float k3u = du + 0.5 * h * k2d, k3d = -(u + 0.5 * h * k2u) + 3.0 * M * (u + 0.5 * h * k2u) * (u + 0.5 * h * k2u);
    float k4u = du + h * k3d,       k4d = -(u + h * k3u) + 3.0 * M * (u + h * k3u) * (u + h * k3u);

    uPrev = u; duPrev = du; phiPrev = phi;
    planeYPrev = cos(phi) * e1.y + sin(phi) * e2.y;
    du = du + (h / 6.0) * (k1d + 2.0 * k2d + 2.0 * k3d + k4d);
    u = u + (h / 6.0) * (k1u + 2.0 * k2u + 2.0 * k3u + k4u);
    phi += h;
    stepsUsed = float(i + 1);
    maxU = max(maxU, u);

    if (u <= 0.0) { escaped = true; break; }
    float planeY = cos(phi) * e1.y + sin(phi) * e2.y;

    // Equatorial-plane (y = 0) crossing -> one disk image, collected in path order.
    if (planeY * planeYPrev < 0.0 && trans > 0.02) {
      float f = planeYPrev / (planeYPrev - planeY);
      float phiX = mix(phiPrev, phi, f);
      float uX = mix(uPrev, u, f);
      float rX = 1.0 / max(uX, 1e-4);
      if (rX >= uDiskInner && rX <= uDiskOuter && rX > RS * 1.02) {
        vec3 nhat = cos(phiX) * e1 + sin(phiX) * e2;
        vec3 mhat = -sin(phiX) * e1 + cos(phiX) * e2;
        vec3 pX = rX * nhat;
        float duX = mix(duPrev, du, f);
        float slope = -sin(phiX) * e1.y + cos(phiX) * e2.y;
        float alpha = 1.0 - exp(-3.0 * (2.0 * uDiskThickness) / max(0.10, abs(slope)));
        alpha = clamp(alpha, 0.03, 0.96);
        float sh;
        vec3 E = diskEmission(pX, rX, uX, duX, nhat, mhat, sh);
        acc += trans * E * alpha;
        trans *= (1.0 - alpha);
        if (crossings == 0) firstShift = sh;
        crossings++;
      }
    }

    if (u >= 1.0 / RS) { captured = true; break; }        // event horizon
    if (u < U_ESC && du < 0.0) { escaped = true; break; } // r > R_FAR, outgoing
  }

  if (!captured && !escaped) {
    captured = maxU > 0.5;   // spent budget winding near the photon sphere
    escaped = !captured;
  }
  // Exact asymptote: near u -> 0 the first integral gives du/dphi -> -1/b,
  // so u ~= (phi_inf - phi)/b. Recover the continuous asymptotic angle instead
  // of snapping skyDir to the discrete step that crossed the escape radius.
  if (escaped && u < U_ESC) phi += b * u;
  vec3 skyDir = normalize(cos(phi) * e1 + sin(phi) * e2);
  float deflect = acos(clamp(dot(dir, skyDir), -1.0, 1.0));
  vec3 bg = captured ? vec3(0.0) : renderSky(skyDir);
  vec3 hdr = acc + trans * bg;

  vec3 outc = hdr;
  if (uDebug > 0.5) {
    if (uDebug < 1.5) {
      // 1 - integration steps / termination reason
      float t = stepsUsed / max(float(uMaxSteps), 1.0);
      vec3 heat = vec3(t, 0.15 + 0.5 * t, 1.0 - t);
      if (captured) heat = vec3(0.88, 0.20, 0.12) * (0.35 + 0.65 * t);
      outc = heat;
    } else if (uDebug < 2.5) {
      // 2 - event horizon mask and critical capture boundary
      float mask = captured ? 1.0 : 0.0;
      float dq = (b - BCRIT) / 0.06;
      float ring = exp(-dq * dq);
      outc = vec3(mask * 0.55) + vec3(0.10, 0.90, 0.55) * ring + vec3(0.02, 0.03, 0.06);
    } else if (uDebug < 3.5) {
      // 3 - disk crossings and image order
      vec3 oc = crossings == 0 ? vec3(0.03, 0.04, 0.07)
              : crossings == 1 ? vec3(0.15, 0.95, 0.35)
              : crossings == 2 ? vec3(0.15, 0.75, 1.0)
              : crossings == 3 ? vec3(1.0, 0.85, 0.15)
              : vec3(1.0, 0.25, 0.75);
      outc = oc * (crossings > 0 ? 1.0 : 0.6) + acc * 0.15;
    } else if (uDebug < 4.5) {
      // 4 - gravitational redshift * Doppler factor of the primary crossing
      float s = firstShift;
      vec3 redshift = vec3(1.0, 0.25, 0.12), neutral = vec3(0.95), blueshift = vec3(0.15, 0.35, 1.0);
      outc = crossings > 0
        ? (s < 1.0 ? mix(redshift, neutral, clamp(s, 0.0, 1.0))
                   : mix(neutral, blueshift, clamp((s - 1.0) / 2.0, 0.0, 1.0)))
        : vec3(0.03);
      outc += acc * 0.05;
    } else if (uDebug < 5.5) {
      // 5 - lensed background coordinates (asymptotic direction after deflection)
      outc = skyDir * 0.5 + 0.5;
      outc = mix(outc, vec3(1.0, 0.6, 0.1), clamp(deflect / 2.0, 0.0, 0.6));
    } else if (uDebug < 6.5) {
      // 6 - procedural star field + galaxy only (lensed)
      outc = captured ? vec3(0.0) : renderSky(skyDir);
    } else if (uDebug < 7.5) {
      // 7 - HDR radiance before post-processing; magenta marks > 1 values
      vec3 c = hdr / (hdr + vec3(1.0));
      float hi = max(max(hdr.r, hdr.g), hdr.b);
      outc = c + vec3(0.45, 0.0, 0.45) * smoothstep(1.0, 4.0, hi);
    } else if (uDebug < 8.5) {
      // 8 - photon ring / critical winding structure
      float turns = phi / PI2;
      float dq = (b - BCRIT) / 0.12;
      float ring = exp(-dq * dq);
      outc = vec3(0.04, 0.06, 0.12)
           + vec3(0.10, 0.55, 0.95) * clamp(turns / 2.0, 0.0, 1.0)
           + vec3(1.0, 0.75, 0.20) * ring;
    } else {
      // 9 - disk emission only: primary + higher-order images, no sky/bloom
      outc = acc;
    }
  }
  gl_FragColor = vec4(outc, 1.0);
}
`;

export const FRAG_BRIGHT = /* glsl */ `
precision highp float;
uniform sampler2D tDiffuse;
uniform float uThreshold;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tDiffuse, vUv).rgb;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float k = max(0.0, l - uThreshold) / max(l, 1e-4);
  gl_FragColor = vec4(c * k, 1.0);
}
`;

export const FRAG_BLUR = /* glsl */ `
precision highp float;
uniform sampler2D tDiffuse;
uniform vec2 uTexel;
uniform vec2 uDir;
uniform float uRadius;
varying vec2 vUv;
void main() {
  vec2 o = uTexel * uDir * uRadius;
  vec3 s = texture2D(tDiffuse, vUv).rgb * 0.227027;
  s += (texture2D(tDiffuse, vUv + o * 1.3846).rgb +
        texture2D(tDiffuse, vUv - o * 1.3846).rgb) * 0.316216;
  s += (texture2D(tDiffuse, vUv + o * 3.2308).rgb +
        texture2D(tDiffuse, vUv - o * 3.2308).rgb) * 0.070270;
  gl_FragColor = vec4(s, 1.0);
}
`;

// Final pass: chromatic aberration (radial RGB split), HDR bloom composite,
// ACES filmic tone map, vignette, film grain, linear -> sRGB.
export const FRAG_COMPOSITE = /* glsl */ `
precision highp float;
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform vec2 uResolution;
uniform float uAspect;
uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform float uTime;
uniform float uDebug;
varying vec2 vUv;

float hash21(vec2 p) {
  // Hoskins hash: stable at the large coordinates used for film grain.
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
// Narkowicz ACES filmic approximation.
vec3 ACES(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}
void main() {
  vec2 uv = vUv;
  if (uDebug > 0.5) {
    gl_FragColor = vec4(clamp(texture2D(tScene, uv).rgb, 0.0, 1.0), 1.0);
    return;
  }
  vec2 off = uv - 0.5;
  vec2 dir = normalize(off + vec2(1e-5));
  float ca = uChromatic * 0.0035 * length(off);
  vec3 hdr;
  hdr.r = texture2D(tScene, uv + dir * ca).r;
  hdr.g = texture2D(tScene, uv).g;
  hdr.b = texture2D(tScene, uv - dir * ca).b;
  vec3 bloom = texture2D(tBloom, uv).rgb;
  hdr = (hdr + bloom * uBloomStrength) * uExposure;
  vec3 col = ACES(hdr);
  float v = length(off * vec2(uAspect, 1.0));
  col *= 1.0 - uVignette * smoothstep(0.28, 0.95, v);
  float g = hash21(uv * 1024.0 + vec2(uTime * 13.1, uTime * 7.7)) - 0.5;
  col += g * uGrain * 0.09;
  gl_FragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}
`;
