// Full-screen pass-through vertex shader for every post/raytrace quad.
export const VERT = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// ---------------------------------------------------------------------------
// Main black-hole pass. HDR, linear. Every visible phenomenon below is
// evaluated per pixel from a numerically integrated Schwarzschild null
// geodesic; no meshes, textures, or pre-baked maps stand in for the physics.
//
// Coordinates: geometric units G=c=1, mass M=1, horizon rs=2, photon sphere 3.
// Spherical symmetry confines each ray to the orbital plane spanned by the
// camera position and the ray direction. In that plane we integrate the exact
// light-orbit equation d2u/dphi2 + u = 3u^2 (u = 1/r) with RK2 midpoint.
// State per step: (u, w = du/dphi, phi). Termination: r <= rs (captured) or
// r >= R_ESC (escaped, samples the procedural background along the lensed
// outgoing direction). Disk crossings are found from sign changes of the
// world-space y of the curved path and composited front-to-back in path
// order, so primary, secondary and higher-order images all appear.
// ---------------------------------------------------------------------------
export const MAIN_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;

uniform vec3 uCamPos;
uniform vec3 uFwd, uRight, uUp;
uniform float uTanH, uAspect;
uniform float uTime;
uniform int uSteps;      // geodesic march budget (quality tier)
uniform int uCrossings;  // max disk crossings composited (quality tier)
uniform int uDebug;      // 0..9
uniform float uDiskIn, uDiskOut, uDiskH;
uniform float uDiskTemp, uDiskBright;
uniform float uOrbVel, uTurbAmp, uTurbSpeed;
uniform float uStarDensity, uGalaxy;

const float RS = 2.0;      // Schwarzschild radius (M = 1)
const float R_ESC = 60.0;  // escape sphere
const int MAX_STEPS = 512;
const int MAX_CROSS = 8;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}
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
float vnoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
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
float fbm(vec3 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return v;
}

// Procedural sky: hash-grid stars on two scales + a tilted galaxy band with
// fbm clouds and a dust lane. Pure function of direction; no textures.
vec3 background(vec3 d) {
  vec3 col = vec3(0.004, 0.005, 0.010); // faint floor, stays near-black
  for (int layer = 0; layer < 2; layer++) {
    float scale = layer == 0 ? 60.0 : 150.0;
    vec3 p = d * scale;
    vec3 cell = floor(p);
    float h = hash13(cell);
    float thresh = layer == 0 ? 0.985 : 0.975;
    if (h > thresh && uStarDensity > 0.001) {
      vec3 sp = hash33(cell + 7.7) - 0.5;
      float dist = length(fract(p) - 0.5 - sp * 0.7);
      float m = pow((h - thresh) / (1.0 - thresh), 3.0);
      float b = smoothstep(0.25, 0.0, dist) * (0.25 + 3.5 * m * m);
      vec3 tint = mix(vec3(0.7, 0.82, 1.0), vec3(1.0, 0.85, 0.7), hash11(h * 91.7));
      col += tint * b * uStarDensity;
    }
  }
  // Galaxy: band around a tilted normal, mottled by fbm, pinched by a lane.
  vec3 gn = normalize(vec3(0.32, 1.0, 0.24));
  float band = dot(d, gn);
  float lane = exp(-band * band * 90.0);
  float glow = exp(-band * band * 14.0);
  float clouds = fbm(d * 4.0 + vec3(3.1, 7.7, 1.3));
  clouds *= 0.55 + 0.45 * fbm(d * 11.0 + vec3(9.2));
  vec3 stellar = mix(vec3(0.45, 0.55, 0.9), vec3(1.0, 0.8, 0.6), clouds);
  col += stellar * glow * clouds * 0.55 * uGalaxy;
  col *= 1.0 - lane * 0.75 * clamp(clouds * 1.4, 0.0, 1.0); // dust lane
  col += vec3(0.5, 0.65, 1.0) * glow * 0.05 * uGalaxy;
  return col;
}

// Blackbody-ish ramp: deep red -> orange -> white -> blue-white.
vec3 blackbody(float t) {
  t = clamp(t, 0.0, 2.2);
  vec3 c1 = vec3(0.35, 0.03, 0.005);
  vec3 c2 = vec3(1.00, 0.42, 0.10);
  vec3 c3 = vec3(1.00, 0.95, 0.88);
  vec3 c4 = vec3(0.72, 0.84, 1.25);
  vec3 col = mix(c1, c2, smoothstep(0.0, 0.55, t));
  col = mix(col, c3, smoothstep(0.45, 1.05, t));
  col = mix(col, c4, smoothstep(1.05, 2.0, t));
  return col;
}

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  vec3 dir = normalize(uFwd + uTanH * (p.x * uAspect * uRight + p.y * uUp));

  float r0 = length(uCamPos);
  vec3 e1 = uCamPos / r0;                    // outward radial at camera
  vec3 tang = dir - dot(dir, e1) * e1;
  float sinA = length(tang);
  float cosA = dot(dir, e1);

  vec3 col = vec3(0.0);
  bool captured = false;
  bool escaped = false;
  vec3 escDir = dir;
  float phiTot = 0.0;
  float rMin = r0;
  int crosses = 0;
  float firstR = 0.0;
  float firstG = 1.0;
  float transmit = 1.0;
  float tmpT = 0.0; // first-crossing temperature (debug 8)
  float lum = 0.0;

  float grav0 = sqrt(max(1.0 - RS / r0, 1e-4)); // observer redshift factor

  if (sinA < 1e-4) {
    // Exactly radial ray: no bending (measure-zero set, analytic shortcut).
    if (cosA > 0.0) { escaped = true; escDir = dir; }
    else {
      captured = true;
      if (dir.y != 0.0) {
        float s = -uCamPos.y / dir.y;
        if (s > 0.0) {
          vec3 hp = uCamPos + dir * s;
          float r = length(hp);
          if (r > uDiskIn && r < uDiskOut) {
            crosses = 1; firstR = r;
            float sig = 0.6;
            float tau = sig * uDiskBright;
            vec3 emit = blackbody(uDiskTemp) * uDiskBright * 0.4;
            col += emit * (1.0 - exp(-tau));
          }
        }
      }
    }
  } else {
    // --- General ray: integrate d2u/dphi2 + u = 3 u^2 by RK2 midpoint. ---
    vec3 e2 = tang / sinA;
    float dphi = 0.028;              // fixed phi step; budget via uSteps
    float u = 1.0 / r0;
    float w = -cosA / (r0 * sinA);  // du/dphi at the camera
    float phi = 0.0;
    vec3 prevPos = uCamPos;
    float prevY = uCamPos.y;
    float prevR = r0;
    float b = r0 * sinA / sqrt(max(1.0 - RS / r0, 1e-4)); // impact parameter
    float Lsgn = 1.0; // photon angular momentum sign in this plane: +e2

    for (int i = 0; i < MAX_STEPS; i++) {
      if (i >= uSteps) break;
      // RK2 midpoint step of (u, w).
      float uS = u + 0.5 * dphi * w;
      float wS = w + 0.5 * dphi * (-u + 3.0 * u * u);
      u += dphi * wS;
      w += dphi * (-uS + 3.0 * uS * uS);
      phi += dphi;
      float r = 1.0 / max(u, 1e-6);
      rMin = min(rMin, r);
      vec3 pos = r * (cos(phi) * e1 + sin(phi) * e2);
      float y = pos.y;

      // Disk crossing between prevPos and pos (world y sign change).
      if (prevY * y < 0.0) {
        float t = prevY / (prevY - y);
        vec3 hp = mix(prevPos, pos, t);
        float rc = length(hp);
        if (rc > uDiskIn && rc < uDiskOut && crosses < MAX_CROSS) {
          crosses++;
          if (crosses == 1) firstR = rc;
          if (crosses <= uCrossings) {
            // --- Emission in the static frame at the crossing point. ---
            float az = atan(hp.z, hp.x);
            float om = uOrbVel / pow(rc, 1.5);       // Keplerian pattern speed
            float psi = az - om * uTime * uTurbSpeed;
            vec3 np = vec3(log(rc) * 2.2, psi * 2.0, psi * 0.7 + uTime * 0.05);
            float turb = fbm(np * 1.6 + vec3(0.0, uTime * 0.03, 0.0));
            float detail = fbm(vec3(psi * 5.0, rc * 1.4, uTime * 0.1));
            turb = clamp(0.5 - uTurbAmp * 0.5 + uTurbAmp * (turb * 0.75 + detail * 0.45), 0.0, 2.0);
            float edge = smoothstep(uDiskIn, uDiskIn + 1.4, rc)
                       * (1.0 - smoothstep(uDiskOut - 5.0, uDiskOut, rc));
            float Tp = uDiskTemp * (pow(uDiskIn / rc, 0.75) + 0.12);
            // Emitter velocity (prograde about +y) and photon direction.
            vec3 vhat = normalize(vec3(hp.z, 0.0, -hp.x) + vec3(1e-6));
            vec3 seg = pos - prevPos;
            float segL = max(length(seg), 1e-6);
            vec3 toObs = -seg / segL;                // photon flight direction
            float beta = min(0.85, abs(uOrbVel) * sqrt(1.0 / max(rc - RS, 0.35)));
            float gamma = inversesqrt(max(1.0 - beta * beta, 1e-3));
            float dop = 1.0 / (gamma * max(1.0 - beta * dot(vhat, toObs), 0.08));
            float ggrav = sqrt(max(1.0 - RS / rc, 1e-4)) / grav0;
            float g = ggrav * dop;
            if (crosses == 1) { firstG = g; tmpT = Tp * (0.7 + 0.6 * turb); }
            float flux = edge * turb * pow(uDiskIn / rc, 1.6) * uDiskBright;
            vec3 emit = blackbody(Tp * g) * flux * pow(g, 3.0);
            // Slab absorption along the slant path.
            float path = uDiskH / max(abs(seg.y) / segL, 0.08);
            float tau = (0.25 + flux * 0.9) * path;
            float a = 1.0 - exp(-tau);
            col += transmit * emit * a * 2.2;
            transmit *= 1.0 - a;
            if (transmit < 0.01) transmit = 0.01;
          }
        }
      }
      prevPos = pos; prevY = y; prevR = r;

      if (r <= RS * 1.001) { captured = true; break; }
      if (r >= R_ESC) {
        escaped = true;
        vec3 seg = pos - prevPos;
        escDir = length(seg) > 1e-9 ? seg / length(seg) : dir;
        // Incoming celestial direction is opposite the outgoing travel dir.
        escDir = -escDir;
        break;
      }
    }
    phiTot = phi;
    if (!captured && !escaped) {
      // Budget exhausted on a near-critical orbit: inside the photon sphere
      // it will fall in, outside it escapes. Physical, deterministic fate.
      if (prevR < 3.2) captured = true;
      else { escaped = true; escDir = -(prevPos - uCamPos) / max(length(prevPos - uCamPos), 1e-6); }
    }
  }

  vec3 bg = vec3(0.0);
  if (escaped) bg = background(normalize(escDir));

  vec3 hdr = col * transmit + bg * transmit;
  // Deep-black horizon: captured rays carry disk foreground only, no glow.
  if (captured) hdr = col;

  // ------------------------- debug views -------------------------
  if (uDebug == 1) {
    float wind = clamp(phiTot / 12.0, 0.0, 1.0);
    vec3 esc = mix(vec3(0.02, 0.05, 0.25), vec3(0.2, 0.6, 1.0), wind);
    vec3 cap = mix(vec3(0.05, 0.0, 0.0), vec3(1.0, 0.15, 0.05), wind);
    hdr = captured ? cap : esc;
    if (crosses > 0) hdr += vec3(0.9, 0.8, 0.4) * 0.35;
  } else if (uDebug == 2) {
    float ring = exp(-abs(rMin - 3.0) * 1.6);
    hdr = captured ? vec3(1.0) : vec3(0.0);
    hdr += vec3(0.1, 0.8, 1.0) * ring * 0.9;
  } else if (uDebug == 3) {
    vec3 ramp = crosses == 0 ? vec3(0.02) :
                crosses == 1 ? vec3(1.0, 0.35, 0.05) :
                crosses == 2 ? vec3(1.0, 0.9, 0.2) : vec3(0.9, 0.95, 1.0);
    float rb = crosses > 0 ? clamp(8.0 / firstR, 0.25, 1.5) : 1.0;
    hdr = ramp * rb * (crosses > 0 ? 1.0 : 0.4);
  } else if (uDebug == 4) {
    float l = crosses > 0 ? log(max(firstG, 1e-3)) : 0.0;
    float m = clamp(abs(l) * 2.2, 0.0, 1.0);
    vec3 c = l > 0.0 ? mix(vec3(0.05), vec3(0.2, 0.5, 1.0), m)
                     : mix(vec3(0.05), vec3(1.0, 0.2, 0.1), m);
    hdr = crosses > 0 ? c * 1.4 + vec3(0.02) : vec3(0.03);
  } else if (uDebug == 5) {
    vec3 e = normalize(escaped ? escDir : vec3(0.0, -1.0, 0.0));
    float defl = escaped ? acos(clamp(dot(e, -dir), -1.0, 1.0)) : 0.0;
    float bands = 0.5 + 0.5 * cos(defl * 22.0);
    hdr = escaped ? (e * 0.5 + 0.5) * 0.7 + vec3(bands * 0.35) : vec3(0.0);
  } else if (uDebug == 6) {
    hdr = bg;
  } else if (uDebug == 7) {
    hdr = col;
  } else if (uDebug == 8) {
    hdr = crosses > 0 ? blackbody(tmpT) * clamp(tmpT * 1.4, 0.05, 2.0) : vec3(0.02);
  } else if (uDebug == 9) {
    lum = dot(hdr, vec3(0.2126, 0.7152, 0.0722));
    float l = log(max(lum, 1e-4)) * 0.55 + 0.6;
    vec3 heat = mix(vec3(0.02, 0.02, 0.1), vec3(0.0, 0.6, 1.0), smoothstep(0.0, 0.4, l));
    heat = mix(heat, vec3(0.0, 0.9, 0.3), smoothstep(0.4, 0.65, l));
    heat = mix(heat, vec3(1.0, 0.9, 0.1), smoothstep(0.65, 0.85, l));
    heat = mix(heat, vec3(1.0), smoothstep(0.85, 1.05, l));
    hdr = heat * (0.25 + clamp(l, 0.0, 1.2));
  }

  gl_FragColor = vec4(hdr, 1.0);
}
`;

// Bright-pass: isolates super-threshold HDR energy for the bloom chain.
export const BRIGHT_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform sampler2D tSrc;
uniform float uThresh;
void main() {
  vec3 c = texture2D(tSrc, vUv).rgb;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float w = smoothstep(uThresh, uThresh * 1.8 + 0.2, l);
  gl_FragColor = vec4(c * w, 1.0);
}
`;

// Separable Gaussian-ish blur. MAX_TAPS=13, active count via uTaps.
export const BLUR_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform vec2 uDir;
uniform int uTaps;
const int MAX_TAPS = 13;
void main() {
  vec3 acc = texture2D(tSrc, vUv).rgb * 0.227027;
  vec2 off = uTexel * uDir;
  float wsum = 0.227027;
  for (int i = 1; i <= MAX_TAPS; i++) {
    if (i > uTaps) break;
    float w = 0.316216 * exp(-float(i * i) / 4.5);
    acc += (texture2D(tSrc, vUv + off * float(i)).rgb
          + texture2D(tSrc, vUv - off * float(i)).rgb) * w;
    wsum += 2.0 * w;
  }
  gl_FragColor = vec4(acc / wsum, 1.0);
}
`;

// Composite: HDR scene + bloom, ACES, vignette, grain, chromatic aberration,
// then sRGB encode. Debug != 0 bypasses post and shows the raw diagnostic.
export const COMP_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform sampler2D tScene;
uniform sampler2D tBloom0;
uniform sampler2D tBloom1;
uniform int uBloomLevels;
uniform float uExposure, uBloom, uVignette, uGrain, uChromAb, uTime;
uniform int uDebug;
uniform float uAspect;

vec3 aces(vec3 x) {
  // Narkowicz ACES fit, explicit (no renderer tone mapping is used).
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec3 srgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(max(c, 1e-6), vec3(1.0 / 2.4)) - 0.055,
             step(0.0031308, c));
}
void main() {
  vec3 outc;
  if (uDebug != 0) {
    outc = srgb(clamp(texture2D(tScene, vUv).rgb, 0.0, 8.0));
  } else {
    vec2 d = vUv - 0.5;
    float r2 = dot(d * vec2(uAspect, 1.0), d * vec2(uAspect, 1.0));
    float ab = uChromAb * (0.0015 + r2 * 0.010);
    vec2 off = d * ab;
    vec3 hdr;
    hdr.r = texture2D(tScene, vUv - off).r;
    hdr.g = texture2D(tScene, vUv).g;
    hdr.b = texture2D(tScene, vUv + off).b;
    vec3 bl = texture2D(tBloom0, vUv).rgb;
    if (uBloomLevels >= 2) bl += texture2D(tBloom1, vUv).rgb * 0.7;
    hdr += bl * uBloom;
    hdr *= pow(2.0, uExposure);
    vec3 t = aces(hdr);
    t *= 1.0 - uVignette * smoothstep(0.15, 0.95, r2 * 2.2) * 0.85;
    float g = hash12(vUv * vec2(1920.0, 1080.0) + fract(uTime) * 271.0) - 0.5;
    t += g * uGrain * 0.055;
    outc = srgb(clamp(t, 0.0, 1.0));
  }
  gl_FragColor = vec4(outc, 1.0);
}
`;
