precision highp float;

varying vec2 vUv;

// ===========================================================================
// GARGANTUA — Schwarzschild null-geodesic ray tracer (per-pixel, full screen)
// ===========================================================================
// Coordinate chart: Cartesian spatial coordinates in Schwarzschild coordinates,
// units G = c = 1, Schwarzschild radius RS = 2M = 1. All lengths are in RS.
//   * event horizon      r = RS          (termination, no emission inside)
//   * photon sphere      r = 1.5 RS      (unstable circular null orbit)
//   * critical impact b  = 3 sqrt(3) M = 2.598 RS
// The disk lies in the equatorial plane y = 0; the camera is arbitrary.
//
// Governing equation (Binet form of a null geodesic in its orbital plane):
//       d2u/dphi2 = 3 M u^2 - u ,   u = 1/r .
// Equivalent Cartesian form, with affine parameter lambda, state (p, v) where
// v = dp/dlambda and |v0| = 1, and conserved specific angular momentum
// h = |p x v| (a central force conserves it exactly):
//       d2p/dlambda2 = -(3/2) RS h^2 p / |p|^5 .
// We integrate this ODE with velocity-Verlet (2 force evaluations / step).
// Termination: r <= RS (captured), r >= ESCAPE_R (escaped to the sky), or the
// quality-dependent integration budget is exhausted (near-critical rays).
// ===========================================================================

#define RS 1.0
#define PHOTON_SPHERE 1.5
#define ESCAPE_R 45.0
#define MAX_STEPS 512

// ---- Observation camera (fed from the OrbitControls-driven camera) ---------
uniform vec3  uCamPos;
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamForward;
uniform float uTanHalfFov;
uniform float uAspect;

// ---- Integration state / budget -------------------------------------------
uniform float uTime;
uniform int   uMaxSteps;
uniform float uStepScale;

// ---- Accretion disk --------------------------------------------------------
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemp;
uniform float uDiskIntensity;
uniform float uOrbitalSpeed;
uniform float uTurbAmp;
uniform float uTurbSpeed;

// ---- Procedural background -------------------------------------------------
uniform float uStarDensity;
uniform float uGalaxyBrightness;

// ---- Diagnostic view -------------------------------------------------------
uniform int uDebug;

// ---------------------------------------------------------------------------
// Procedural noise (no textures, no cubemaps, no lookup tables anywhere).
// ---------------------------------------------------------------------------
float hash3(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise3(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash3(i);
  float n100 = hash3(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash3(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash3(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash3(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash3(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash3(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash3(i + vec3(1.0, 1.0, 1.0));
  return mix(mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
             mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y), f.z);
}

float fbm3(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * noise3(p);
    p *= 2.03;
    a *= 0.5;
  }
  return s;
}

// ---------------------------------------------------------------------------
// Schwarzschild geodesic acceleration. Central force => h2 is conserved.
// ---------------------------------------------------------------------------
vec3 geodesicAccel(vec3 p, float h2) {
  float r2 = dot(p, p);
  float r = sqrt(r2);
  return -1.5 * RS * h2 * p / (r2 * r2 * r);
}

// Approximate blackbody colour for the disk's radial temperature profile.
vec3 blackbody(float t) {
  vec3 cold = vec3(1.0, 0.25, 0.05);
  vec3 warm = vec3(1.0, 0.72, 0.32);
  vec3 hot  = vec3(0.82, 0.90, 1.0);
  vec3 c = mix(cold, warm, smoothstep(0.25, 1.0, t));
  return mix(c, hot, smoothstep(1.0, 1.9, t));
}

// Emission of ONE curved-path crossing of the equatorial disk. Called in path
// order, so primary and higher-order lensed images compose correctly.
void diskSample(vec3 hit, vec3 rayDir, float rho, int order,
                out vec3 emission, out float alpha, out float shift) {
  float phi = atan(hit.z, hit.x);

  // Keplerian orbital speed (M = RS/2): beta = sqrt(M / rho), scaled by UI.
  float beta = clamp(sqrt(0.5 * RS / rho) * uOrbitalSpeed, 0.0, 0.9);
  vec3 velDir = normalize(vec3(-hit.z, 0.0, hit.x));   // prograde tangential
  float gamma = 1.0 / sqrt(1.0 - beta * beta);

  // The photon reaching the observer travels along -rayDir; relativistic
  // Doppler beaming / de-beaming:  delta = 1 / (gamma (1 - beta.mu)).
  float mu = dot(-rayDir, velDir);
  float doppler = 1.0 / (gamma * (1.0 - beta * mu));

  // Gravitational redshift of a static emitter: g = sqrt(1 - RS/rho).
  float grav = sqrt(max(1.0 - RS / rho, 1e-4));
  shift = grav * doppler;                 // total frequency shift
  float beaming = pow(shift, 3.0);       // specific-intensity invariance

  // Radial temperature gradient T ~ rho^(-3/4).
  float temp = uDiskTemp * pow(uDiskInner / rho, 0.75);
  vec3 bb = blackbody(temp);

  // Time-varying procedural turbulence + spiral structure (no static ring).
  float turb = fbm3(vec3(rho * 1.6, phi * 2.2, uTime * uTurbSpeed));
  float spiral = sin(phi * 9.0 - log(rho) * 7.0 + turb * 8.0 + uTime * 0.6);
  float density = 0.55 + 0.45 * spiral;
  density *= mix(1.0, 0.35 + 1.3 * turb, uTurbAmp);
  density = max(density, 0.0);

  // Finite half-thickness: path length through the layer grows for grazing
  // rays and with the thickness control; opacity = 1 - exp(-tau).
  float pathLen = 2.0 * uDiskThickness / max(abs(rayDir.y), 0.08);
  alpha = clamp(1.0 - exp(-1.3 * pathLen), 0.0, 0.97);

  // Each successive lensed image is progressively demagnified.
  float orderAtten = pow(0.8, float(order - 1));

  emission = bb * uDiskIntensity * temp * beaming * density * alpha * orderAtten;
}

// Procedural star field + Milky Way, sampled by the FINAL (lensed) ray
// direction. Lensing of the background therefore comes from the integration,
// not from a pre-baked distortion map.
vec3 starField(vec3 dir) {
  vec3 d = normalize(dir);
  float lon = atan(d.z, d.x) / 6.2831853 + 0.5;
  float lat = asin(clamp(d.y, -1.0, 1.0)) / 3.1415926 + 0.5;
  vec2 uv = vec2(lon * 2.0, lat);

  vec3 col = vec3(0.0);
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    float scale = 240.0 * pow(1.85, fk);
    vec2 g = uv * scale;
    vec2 cell = floor(g);
    vec2 f = fract(g);
    float h = hash3(vec3(cell, fk * 7.13));
    float thresh = 1.0 - 0.05 * uStarDensity / (1.0 + fk * 1.4);
    if (h > thresh) {
      vec2 c = vec2(hash3(vec3(cell + vec2(1.7, 9.2), fk)),
                    hash3(vec3(cell + vec2(8.3, 2.8), fk)));
      float r = length(f - c);
      float star = exp(-r * r * 320.0);
      float bright = (h - thresh) / max(1.0 - thresh, 1e-4);
      vec3 tint = mix(vec3(1.0, 0.82, 0.62), vec3(0.68, 0.82, 1.0),
                      hash3(vec3(cell + vec2(4.1, 7.7), fk)));
      col += star * (0.6 + 3.0 * bright) * tint / (1.0 + fk);
    }
  }

  vec3 galN = normalize(vec3(0.32, 0.86, -0.40));
  float band = exp(-pow(dot(d, galN) * 3.4, 2.0));
  float milky = fbm3(d * 7.0 + 13.0);
  col += uGalaxyBrightness * band * (0.04 + 0.30 * milky) * vec3(0.55, 0.63, 0.90);
  col += vec3(0.003, 0.005, 0.011);        // faint deep-space floor
  return col;
}

void main() {
  // Observation ray for this pixel from the real camera position/orientation/FOV.
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 rayDir = normalize(uCamForward
      + uCamRight * (ndc.x * uAspect * uTanHalfFov)
      + uCamUp    * (ndc.y * uTanHalfFov));
  vec3 initialDir = rayDir;

  // Integration state.
  vec3 p = uCamPos;
  vec3 v = rayDir;
  float h2 = dot(cross(p, v), cross(p, v));   // conserved angular momentum^2

  vec3  radiance = vec3(0.0);      // accumulated emission, front-to-back
  float throughput = 1.0;         // remaining transmittance (ordered images)
  int   crossings = 0;
  float steps = 0.0;
  float minR = 1e9;
  int   termination = 0;          // 0 escaped, 1 horizon, 2 step budget
  vec3  lastShift = vec3(0.0);

  vec3 prevP = p;
  for (int i = 0; i < MAX_STEPS; i++) {
    if (i >= uMaxSteps) { termination = 2; break; }

    float r = length(p);
    minR = min(minR, r);
    if (r <= RS * 1.001) { termination = 1; break; }   // event horizon
    if (r >= ESCAPE_R)   { termination = 0; break; }   // asymptotic escape

    // Adaptive affine step: small where curvature (1/r^3) is strong, large in
    // the far field. Bounded so Verlet stays stable near the photon sphere.
    float ds = uStepScale * r * (0.35 + 0.65 * smoothstep(1.5, 8.0, r));
    ds = clamp(ds, 0.004, 1.2);

    prevP = p;
    vec3 a0 = geodesicAccel(p, h2);   // velocity-Verlet, state (p, v)
    v += 0.5 * ds * a0;
    p += ds * v;
    vec3 a1 = geodesicAccel(p, h2);
    v += 0.5 * ds * a1;
    steps += 1.0;

    // Curved-path disk intersection: each sign change of p.y along the
    // INTEGRATED trajectory is a crossing of the equatorial plane. A single
    // ray can cross it several times as it winds around the hole, giving the
    // primary image, secondary image and higher-order ring detail.
    if (prevP.y * p.y < 0.0) {
      float t = prevP.y / (prevP.y - p.y);
      vec3 hit = mix(prevP, p, t);
      float rho = length(hit.xz);
      if (rho > uDiskInner && rho < uDiskOuter) {
        crossings++;
        vec3 em; float a; float s;
        diskSample(hit, normalize(v), rho, crossings, em, a, s);
        radiance += throughput * em;     // ordered multiple-crossing synthesis
        throughput *= (1.0 - a);
        lastShift = vec3(s);
      }
    }
  }

  // Only escaping rays receive the lensed procedural sky. Rays that fall
  // through the horizon (or exhaust the near-critical winding budget) leave
  // the shadow region unlit: a genuinely dark event horizon, not a black mesh.
  if (termination == 0) {
    radiance += throughput * starField(normalize(v));
  }

  vec3 outColor = radiance;

  // ---- 10 diagnostic views (0 = final composite) --------------------------
  if (uDebug == 1) {
    // Integration cost / termination reason.
    float n = clamp(steps / float(uMaxSteps), 0.0, 1.0);
    outColor = mix(vec3(0.02, 0.12, 0.45), vec3(1.0, 0.35, 0.05), n);
    if (termination == 1) outColor = vec3(0.55, 0.02, 0.12);
    else if (termination == 2) outColor = vec3(0.95, 0.90, 0.20);
  } else if (uDebug == 2) {
    outColor = termination == 1 ? vec3(1.0) : vec3(0.015);      // horizon mask
  } else if (uDebug == 3) {
    float c = float(crossings);                                  // crossings & order
    outColor = c < 0.5 ? vec3(0.02)
             : c < 1.5 ? vec3(1.0, 0.25, 0.10)
             : c < 2.5 ? vec3(1.0, 0.85, 0.10)
             : c < 3.5 ? vec3(0.20, 1.0, 0.40)
             : vec3(0.30, 0.50, 1.0);
  } else if (uDebug == 4) {
    float s = clamp(lastShift.r, 0.0, 2.0) * 0.5;               // redshift / Doppler
    outColor = vec3(s, clamp(1.0 - abs(s - 0.5) * 2.0, 0.0, 1.0) * 0.35, 1.0 - s);
    if (crossings == 0) outColor *= 0.12;
  } else if (uDebug == 5) {
    outColor = termination == 0 ? normalize(v) * 0.5 + 0.5 : vec3(0.03);  // lensed coords
  } else if (uDebug == 6) {
    outColor = starField(normalize(v)) * 3.0;                   // stars / galaxy
  } else if (uDebug == 7) {
    outColor = radiance;                                         // pre-post HDR
  } else if (uDebug == 8) {
    float defl = acos(clamp(dot(initialDir, normalize(v)), -1.0, 1.0));
    float x = clamp(defl / 3.1415926, 0.0, 1.0);                // deflection
    outColor = vec3(x, x * x, 1.0 - x);
  } else if (uDebug == 9) {
    float crit = exp(-pow((minR - PHOTON_SPHERE) * 3.5, 2.0));  // photon-ring criticality
    outColor = vec3(crit, crit * 0.55, crit * 0.15);
  }

  gl_FragColor = vec4(outColor, 1.0);   // HDR linear radiance into a float target
}
