// ===========================================================================
// GARGANTUA — Schwarzschild null-geodesic raytracer (one evaluation per pixel)
// ===========================================================================
//
// Geometric units throughout: G = c = M = 1.
//   event horizon        r_s = 2M            = 2.0
//   photon sphere        r_ph = 3M           = 3.0
//   critical impact par. b_c = 3*sqrt(3)M    = 5.196...
//   disk plane           world XZ, normal +Y
//
// Chart and integration
// ---------------------
// Coordinates are the "Cartesian Schwarzschild" chart: the spatial vector x has
// |x| = r, and a null geodesic obeys, exactly,
//
//     d^2 x / dλ^2 = -(3/2) * h^2 * x / r^5 ,   h^2 = |x × dx/dλ|^2  (conserved)
//
// which is the vector form of the standard orbit equation d²u/dφ² + u = 3M u²
// with u = 1/r and M = 1 (see `nullGeoAccel`). h^2 is evaluated once per ray at
// the camera where the ray direction is exact, and is then a constant of the
// motion. The ray state is (pos, vel) with vel the affine tangent; the affine
// parameter λ is advanced with an adaptive step `dl` by velocity Verlet
// (kick-drift-kick, second order in dl). No lookup tables, no bending-texture:
// every pixel integrates the geodesic itself.
//
// Termination classes
// -------------------
//   r < 2            -> captured by the horizon   (pixel contributes no light)
//   r > 80 and dx/dλ·x > 0 -> escaped, background sampled along normalize(vel)
//   step budget spent -> treated as escaped with the current direction
//
// Background is procedural (layered cube-face star grids + fbm Milky Way) and is
// mapped implicitly through the bent ray direction, so it is gravitationally
// lensed without any cubemap or image.
// ===========================================================================

precision highp float;

uniform vec2  uResolution;
uniform vec3  uCamPos;      // camera position in geometric units
uniform mat3  uCamBasis;    // columns: camera right, up, forward
uniform float uTanHalfFov;  // tan(fovY / 2)
uniform float uTime;        // simulated seconds (frozen in capture mode)
uniform int   uDebug;       // 0 = final image, 1..9 = diagnostics
uniform int   uMaxSteps;    // geodesic step budget (driven by the quality tier)
uniform float uStepScale;   // affine step multiplier (driven by the quality tier)

// accretion disk
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemp;
uniform float uDiskIntensity;
uniform float uOrbitSpeed;
uniform float uTurbAmp;
uniform float uTurbSpeed;

// background
uniform float uStarDensity;
uniform float uGalaxyBrightness;

varying vec2 vUv;

const float HORIZON_R   = 2.0;             // r_s = 2M
const float PHOTON_R    = 3.0;             // unstable circular photon orbit
const float ESCAPE_R    = 80.0;            // radius where the sky is sampled
const float B_CRITICAL  = 5.1961524227;    // 3*sqrt(3)*M
const float DISK_SIGMA  = 0.85;            // absorption coefficient per unit density·length
// Display gain applied to the disk emission integral. The integral itself is
// physical (face-on surface brightness ~1), but the Doppler boost of the
// approaching inner edge reaches I ∝ g⁴ ≈ 10×; scaling it keeps that hot core
// inside the ACES window so the photon ring and the disk's own structure stay
// legible instead of clipping into one white blob.
const float DISK_GAIN   = 0.40;
const int   MAX_CROSS   = 8;               // ordered crossing slots per ray
const int   STEP_LIMIT  = 512;             // hard loop bound (>= largest uMaxSteps)

// ---------------------------------------------------------------------------
// Hashing / value noise
// ---------------------------------------------------------------------------
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float hash31(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123); }

float valueNoise(vec3 x) {
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
  return mix(
    mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
    mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
    f.z);
}

// Three octaves, roughly normalised to [0,1]; used for disk turbulence and for
// the Milky Way cloud structure.
float fbm3(vec3 p) {
  return 0.5333 * valueNoise(p)
       + 0.2667 * valueNoise(p * 2.07 + 11.3)
       + 0.1333 * valueNoise(p * 4.13 + 27.1);
}

// ---------------------------------------------------------------------------
// Planckian-locus blackbody colour
// Compact approximation: Kim et al.'s cubic fits for the CIE 1931 chromaticity
// coordinates x(T), y(T), converted to *linear* sRGB through the standard
// XYZ->sRGB primaries matrix, then normalised so the brightest channel is 1.
// Valid over ~1700 K .. 25000 K, which brackets every temperature this renderer
// can produce (disk temperature times a Doppler factor).
// ---------------------------------------------------------------------------
vec3 blackbodyRGB(float temperature) {
  float T = clamp(temperature, 1200.0, 26000.0);
  float T2 = T * T;
  float T3 = T2 * T;

  float x;
  if (T < 4000.0) {
    x = -0.2661239e9 / T3 - 0.2343589e6 / T2 + 0.8776956e3 / T + 0.179910;
  } else {
    x = -3.0258469e9 / T3 + 2.1070379e6 / T2 + 0.2226347e3 / T + 0.240390;
  }

  float x2 = x * x;
  float x3 = x2 * x;
  float y;
  if (T < 2222.0) {
    y = -1.1063814 * x3 - 1.34811020 * x2 + 2.18555832 * x - 0.20219683;
  } else if (T < 4000.0) {
    y = -0.9549476 * x3 - 1.37418593 * x2 + 2.09137015 * x - 0.16748867;
  } else {
    y = 3.0817580 * x3 - 5.87338670 * x2 + 3.75112997 * x - 0.37001483;
  }
  y = max(y, 1e-3);

  float X = x / y;
  float Y = 1.0;
  float Z = (1.0 - x - y) / y;
  vec3 rgb = vec3(
    3.2406 * X - 1.5372 * Y - 0.4986 * Z,
   -0.9689 * X + 1.8758 * Y + 0.0415 * Z,
    0.0557 * X - 0.2040 * Y + 1.0570 * Z);
  rgb = max(rgb, vec3(0.0));
  float peak = max(rgb.r, max(rgb.g, rgb.b));
  return rgb / max(peak, 1e-4);
}

// ---------------------------------------------------------------------------
// Null geodesic
// ---------------------------------------------------------------------------
// Spatial acceleration of a Schwarzschild null geodesic; equals the vector form
// of the exact orbit equation u'' + u = 3u² (M = 1) and reproduces the critical
// impact parameter b_c = 3√3 M that shows up as the photon ring.
vec3 nullGeoAccel(vec3 x, float h2) {
  float r2 = dot(x, x);
  float r5 = r2 * r2 * sqrt(r2);
  return -1.5 * h2 * x / max(r5, 1e-9);
}

// ---------------------------------------------------------------------------
// Accretion disk model
// ---------------------------------------------------------------------------
// Surface-brightness profile: smooth in/out edges inside the annulus with the
// emission peak close to the inner edge and an approximate r^-2 density falloff.
float diskRadialProfile(float rho) {
  float span = max(uDiskOuter - uDiskInner, 1e-3);
  float t = (rho - uDiskInner) / span;
  float edgeIn = smoothstep(0.0, 0.10, t);
  float edgeOut = 1.0 - smoothstep(0.60, 1.0, t);
  float falloff = pow(uDiskInner / max(rho, 1e-3), 2.0);
  return edgeIn * edgeOut * falloff;
}

// Novikov-Thorne-like temperature profile with a zero-torque inner boundary:
// T ∝ (r_in/r)^(3/4) * (1 - sqrt(r_in/r))^(1/4).
float diskTemperature(float rho) {
  float ratio = uDiskInner / max(rho, 1e-3);
  return uDiskTemp * pow(ratio, 0.75) * pow(max(1.0 - sqrt(ratio), 0.0), 0.25);
}

// Keplerian angular velocity in geometric units, Ω = M^(1/2) r^(-3/2).
float diskOmega(float rho) {
  return uOrbitSpeed * pow(max(rho, 1e-3), -1.5);
}

// Turbulence: 3-octave value noise sampled in the co-rotating frame, so the
// differential rotation (Ω ∝ r^-3/2) shears the field into spiral filaments that
// visibly churn with uTime * uTurbSpeed. Amplitude is driven by uTurbAmp; at
// uTurbAmp = 0 the multiplier is exactly 1 (a smooth disk).
float diskTurbulence(vec3 p, float rho) {
  float azimuth = atan(p.z, p.x);
  float phase = azimuth - diskOmega(rho) * uTime * uTurbSpeed;
  vec3 coRotating = vec3(cos(phase) * rho, p.y * 2.2, sin(phase) * rho);
  float n = fbm3(coRotating * 0.42);
  return max(1.0 + uTurbAmp * (n - 0.5) * 2.6, 0.0);
}

// Vertical Gaussian × radial profile × turbulence = local emissivity density.
float diskDensity(vec3 p, float rho) {
  float h = p.y / max(uDiskThickness, 1e-3);
  float vertical = exp(-3.0 * h * h);
  return vertical * diskRadialProfile(rho) * diskTurbulence(p, rho);
}

// Combined Doppler beaming + gravitational redshift for a distant observer.
//   δ = 1 / (γ (1 - β·n̂))         (special-relativistic Doppler factor)
//   g = δ * sqrt(1 - r_s/ρ)        (times the gravitational redshift)
// `vel` is the propagation direction of the *backwards* ray, so the photon
// direction from emitter to observer is n̂ = -normalize(vel).
float dopplerFactor(vec3 p, vec3 vel, float rho) {
  float rsOverRho = 2.0 / max(rho, 1e-3);
  float grav = sqrt(max(1.0 - rsOverRho, 1e-4));
  float vOrb = uOrbitSpeed * sqrt(1.0 / max(rho, 1e-3)) / sqrt(max(1.0 - rsOverRho, 1e-3));
  vOrb = min(vOrb, 0.99);

  vec3 tangential = normalize(cross(vec3(0.0, 1.0, 0.0), p)); // prograde (+φ)
  vec3 beta = tangential * vOrb;
  vec3 n = -normalize(vel);

  float b2 = dot(beta, beta);
  float gamma = 1.0 / sqrt(max(1.0 - b2, 1e-4));
  float delta = 1.0 / (gamma * (1.0 - dot(beta, n)));
  return delta * grav;
}

// ---------------------------------------------------------------------------
// Procedural, lensed background
// ---------------------------------------------------------------------------
// Stars are placed on per-layer cube-face grids: the unit direction is mapped to
// a face + face-local uv, then one jittered point per grid cell becomes a star
// with a power-law magnitude distribution and a blackbody colour temperature.
vec3 starField(vec3 dir) {
  vec3 accum = vec3(0.0);
  vec3 a = abs(dir);
  float m = max(a.x, max(a.y, a.z));
  vec3 n = dir / max(m, 1e-6);

  vec2 uv;
  float face;
  if (a.x >= m) {
    uv = vec2(n.z, n.y) * (dir.x < 0.0 ? -1.0 : 1.0);
    face = dir.x < 0.0 ? 1.0 : 0.0;
  } else if (a.y >= m) {
    uv = vec2(n.x, n.z) * (dir.y < 0.0 ? -1.0 : 1.0);
    face = dir.y < 0.0 ? 3.0 : 2.0;
  } else {
    uv = vec2(n.x, n.y) * (dir.z < 0.0 ? -1.0 : 1.0);
    face = dir.z < 0.0 ? 5.0 : 4.0;
  }
  uv = uv * 0.5 + 0.5;

  // Three layers of increasing resolution; coarse layers hold the bright stars.
  for (int layer = 0; layer < 3; layer++) {
    float N = 90.0 * pow(1.9, float(layer));
    float layerGain = 1.0 / (1.0 + 1.1 * float(layer));

    vec2 grid = uv * N + vec2(face * 37.13, face * 11.71);
    vec2 cell = floor(grid);
    vec2 local = grid - cell;
    vec2 seed = cell + vec2(face * 19.3, face * 7.7);

    float hPresent = hash21(seed);
    float hJitterX = hash21(seed * 1.37 + 5.1);
    float hJitterY = hash21(seed * 2.11 + 9.3);
    float hMagnitude = hash21(seed * 3.07 + 13.7);
    float hSize = hash21(seed * 4.19 + 21.3);
    float hTemp = hash21(seed * 5.71 + 3.3);

    if (hPresent > 0.13 + 0.16 * (1.0 - min(uStarDensity, 3.0) / 3.0)) {
      vec2 center = vec2(0.18 + 0.64 * hJitterX, 0.18 + 0.64 * hJitterY);
      float d = length(local - center);
      float size = mix(0.010, 0.055, hSize);
      float core = smoothstep(size, 0.0, d);
      float glow = exp(-d * d / max(size * size * 3.0, 1e-6)) * 0.28;
      float magnitude = 0.18 + 3.2 * pow(hMagnitude, 5.0);
      float temperature = mix(2600.0, 13000.0, hTemp * hTemp);
      accum += blackbodyRGB(temperature) * (core + glow) * magnitude * layerGain;
    }
  }
  return accum * uStarDensity * 0.95;
}

// Milky Way: a broad band around a tilted galactic normal, broken up by fbm
// clouds and darkened by dust lanes, plus a bright galactic-core direction.
vec3 galaxy(vec3 dir) {
  vec3 galacticNormal = normalize(vec3(0.35, 1.0, 0.25));
  vec3 coreDirection = normalize(vec3(-0.55, 0.30, -0.78));

  float band = 1.0 - abs(dot(dir, galacticNormal));
  float tightBand = pow(band, 8.0);
  float wideBand = pow(band, 2.0);

  float clouds = fbm3(dir * 4.5 + 3.1);
  float fine = fbm3(dir * 11.0 + 17.7);
  float dust = smoothstep(0.35, 0.85, fbm3(dir * 7.0 + 31.0));

  vec3 cool = vec3(0.42, 0.52, 0.95);
  vec3 warm = vec3(1.00, 0.82, 0.60);
  vec3 colour = mix(cool, warm, smoothstep(0.30, 0.75, clouds));

  float density = (tightBand * 0.55 + wideBand * 0.05) * (0.35 + 1.30 * clouds) * (0.5 + 0.9 * fine);
  density *= 1.0 - 0.75 * dust * tightBand;
  density += tightBand * pow(max(dot(dir, coreDirection), 0.0), 24.0) * 0.9;

  return colour * density * uGalaxyBrightness;
}

vec3 backgroundRadiance(vec3 dir) {
  vec3 colour = starField(dir) + galaxy(dir);
  return colour + vec3(0.0060, 0.0072, 0.0125); // faint extragalactic floor
}

// ---------------------------------------------------------------------------
// Diagnostic palettes
// ---------------------------------------------------------------------------
vec3 heatRamp(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 cold = vec3(0.02, 0.02, 0.12);
  vec3 violet = vec3(0.35, 0.05, 0.45);
  vec3 orange = vec3(0.95, 0.30, 0.10);
  vec3 hot = vec3(1.00, 0.95, 0.65);
  vec3 c = mix(cold, violet, smoothstep(0.0, 0.34, t));
  c = mix(c, orange, smoothstep(0.30, 0.70, t));
  return mix(c, hot, smoothstep(0.65, 1.0, t));
}

// ---------------------------------------------------------------------------
void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);

  // Primary ray: the camera basis comes straight from the OrbitControls-driven
  // PerspectiveCamera, so dragging/zooming really changes the lensed view.
  vec3 rayDir = normalize(uCamBasis * vec3(ndc.x * aspect * uTanHalfFov,
                                           ndc.y * uTanHalfFov,
                                           1.0));

  // ---- ray state ---------------------------------------------------------
  vec3 pos = uCamPos;
  vec3 vel = rayDir;
  vec3 angularMomentum = cross(pos, vel);
  float h2 = dot(angularMomentum, angularMomentum); // conserved along the ray
  float impactParameter = length(cross(uCamPos, rayDir));

  // ---- diagnostics state -------------------------------------------------
  bool captured = false;
  bool budgetExhausted = false;
  int steps = 0;
  float minRadius = length(pos);
  vec3 escapeDir = rayDir;

  // ---- ordered disk-crossing state ---------------------------------------
  // `crossCount` counts y = 0 piercings inside the annulus along the ray, i.e.
  // the image order: the segment *before* the first piercing is the primary
  // image, the segment between piercings 1 and 2 is the secondary image, and so
  // on. Each segment's emission is accumulated into its own bucket, so the final
  // image is the sum over image orders instead of a single flat ring. Crossing
  // metadata (piercing radius and Doppler factor) is kept in a small fixed-size
  // table for the diagnostic views; the temperature follows from the radius.
  int crossCount = 0;
  int order = 0;
  float previousSignY = sign(pos.y);
  vec2 crossingTable[MAX_CROSS]; // (radius, Doppler factor) per piercing point
  for (int i = 0; i < MAX_CROSS; i++) crossingTable[i] = vec2(0.0);

  vec3 radiance = vec3(0.0);
  float transmittance = 1.0;
  vec3 bucketPrimary = vec3(0.0);   // order 0
  vec3 bucketSecondary = vec3(0.0); // order 1
  vec3 bucketHigher = vec3(0.0);    // order >= 2
  float lastDoppler = 0.0;
  float lastTemperature = 0.0;
  bool hitDisk = false;

  for (int i = 0; i < STEP_LIMIT; i++) {
    if (i >= uMaxSteps) {
      budgetExhausted = true;
      break;
    }
    steps = i + 1;

    // ---- adaptive affine step size --------------------------------------
    float radius = length(pos);
    float rho = length(pos.xz);
    float baseStep = uStepScale * clamp(radius * 0.35, 0.05, 2.5);

    // Inside the annulus and close to the midplane the step is shrunk so the
    // thin slab is actually resolved; elsewhere the step grows with radius.
    float radialMask = smoothstep(uDiskInner * 0.80, uDiskInner * 0.98, rho)
                     * (1.0 - smoothstep(uDiskOuter * 0.98, uDiskOuter * 1.25, rho));
    float verticalRatio = pos.y / max(uDiskThickness * 1.6, 1e-3);
    float verticalMask = exp(-verticalRatio * verticalRatio);
    float slabStep = max(uDiskThickness * 0.35, 0.03);
    float dl = mix(baseStep, min(baseStep, slabStep), radialMask * verticalMask);

    // Never step across the disk plane in one go: cap the step at half the
    // affine distance to y = 0 while the ray is over the annulus. Without this a
    // steeply inclined ray can jump clean over a thin slab and the disk drops out.
    if (radialMask > 0.01 && abs(vel.y) > 1e-6) {
      float toPlane = -pos.y / vel.y;
      if (toPlane > 0.0) dl = min(dl, max(toPlane * 0.5, 0.05));
    }

    // ---- velocity Verlet (kick - drift - kick) ---------------------------
    vec3 accel = nullGeoAccel(pos, h2);
    vel += accel * (0.5 * dl);
    vec3 previousPos = pos;
    pos += vel * dl;
    accel = nullGeoAccel(pos, h2);
    vel += accel * (0.5 * dl);
    escapeDir = normalize(vel);

    // ---- ordered disk-plane crossing -------------------------------------
    float currentSignY = sign(pos.y);
    if (currentSignY != previousSignY && currentSignY != 0.0) {
      float t = clamp(previousPos.y / (previousPos.y - pos.y), 0.0, 1.0);
      vec3 crossingPoint = mix(previousPos, pos, t);
      float crossingRho = length(crossingPoint.xz);
      if (crossingRho >= uDiskInner && crossingRho <= uDiskOuter) {
        if (crossCount < MAX_CROSS) {
          crossingTable[crossCount] = vec2(crossingRho, dopplerFactor(crossingPoint, vel, crossingRho));
        }
        crossCount++;
        // Everything emitted after this piercing belongs to the next image
        // order (primary -> secondary -> higher).
        order = crossCount >= 2 ? 2 : crossCount;
      }
      previousSignY = currentSignY;
    }

    // ---- emission / absorption march through the disk --------------------
    float rhoNow = length(pos.xz);
    if (abs(pos.y) <= uDiskThickness && rhoNow >= uDiskInner && rhoNow <= uDiskOuter) {
      float density = diskDensity(pos, rhoNow);
      if (density > 0.0005) {
        float g = dopplerFactor(pos, vel, rhoNow);
        float temperature = diskTemperature(rhoNow);
        vec3 bodyColour = blackbodyRGB(g * temperature);
        float beaming = pow(max(g, 0.0), 4.0); // I_obs ∝ g^4
        vec3 emission = bodyColour * beaming * uDiskIntensity * density * dl * DISK_GAIN;

        vec3 weighted = transmittance * emission;
        radiance += weighted;
        if (order == 0) bucketPrimary += weighted;
        else if (order == 1) bucketSecondary += weighted;
        else bucketHigher += weighted;

        transmittance *= exp(-DISK_SIGMA * density * dl);
        lastDoppler = g;
        lastTemperature = temperature;
        hitDisk = true;
      }
    }

    // ---- termination conditions ------------------------------------------
    float newRadius = length(pos);
    minRadius = min(minRadius, newRadius);
    if (newRadius < HORIZON_R) {
      captured = true;
      break;
    }
    if (newRadius > ESCAPE_R && dot(pos, vel) > 0.0) {
      break; // escaped: background is sampled along escapeDir
    }
  }

  // Step budget spent: a ray that has already dived inside the photon sphere is
  // headed for the horizon, so it is counted as captured rather than allowed to
  // paint a spurious background star inside the shadow.
  if (budgetExhausted && minRadius < PHOTON_R) {
    captured = true;
  }

  // Lensed background: only rays that reach infinity contribute sky; a ray that
  // crossed the horizon is black behind the disk emission it collected.
  if (!captured) {
    radiance += transmittance * backgroundRadiance(escapeDir);
  }

  // =========================================================================
  // Debug views (all produced by this same shader, same geodesic integration)
  // =========================================================================
  if (uDebug == 1) {
    // Step-count heatmap, classified by termination: blue = captured by the
    // horizon, red = step budget exhausted, ramp otherwise. The sqrt spreads the
    // low end of the range, where most escaping rays live.
    float ramp = sqrt(clamp(float(steps) / float(max(uMaxSteps, 1)), 0.0, 1.0));
    vec3 c = heatRamp(ramp);
    if (captured) c = mix(c, vec3(0.10, 0.40, 1.00), 0.72);
    else if (budgetExhausted) c = mix(c, vec3(1.00, 0.15, 0.15), 0.72);
    gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    return;
  }

  if (uDebug == 2) {
    // Event-horizon capture mask: white = the ray ended inside r_s. Rays that
    // skim the horizon but escape get a soft orange rim marker, and rays whose
    // closest approach touches the photon sphere are marked in cyan.
    vec3 c = captured ? vec3(1.0) : vec3(0.0);
    if (!captured) {
      float proximity = exp(-(minRadius - HORIZON_R) * 2.2);
      float ring = (minRadius - PHOTON_R) / 0.12;
      c += vec3(1.0, 0.35, 0.10) * proximity * 0.85;
      c += vec3(0.25, 0.85, 1.00) * exp(-ring * ring) * 0.55;
    }
    gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    return;
  }

  if (uDebug == 3) {
    // Disk crossings and their order: primary image green, secondary cyan,
    // higher orders magenta. Brightness is the transmittance-weighted emission
    // of that image order (the piercing point of each order lies on this very
    // pixel's ray, so order colouring *is* the crossing map).
    vec3 primary = bucketPrimary / (2.0 + bucketPrimary);
    vec3 secondary = bucketSecondary / (2.0 + bucketSecondary);
    vec3 higher = bucketHigher / (2.0 + bucketHigher);
    vec3 c = vec3(0.020, 0.025, 0.035);
    c += primary * vec3(0.20, 1.00, 0.35);
    c += secondary * vec3(0.20, 0.85, 1.00);
    c += higher * vec3(1.00, 0.25, 0.95);
    c += vec3(0.10) * smoothstep(1.5, 6.0, float(crossCount));
    gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    return;
  }

  if (uDebug == 4) {
    // Doppler/redshift factor g at the last disk interaction (0.4 .. 2.0).
    // The ordered crossing table supplies the value of the deepest crossing;
    // rays that only grazed the slab fall back to the last volumetric sample.
    bool haveSample = false;
    float gSample = 0.0;
    if (crossCount > 0) {
      gSample = crossingTable[min(crossCount, MAX_CROSS) - 1].y;
      haveSample = true;
    } else if (hitDisk) {
      gSample = lastDoppler;
      haveSample = true;
    }
    vec3 c = vec3(0.12);
    if (haveSample) c = heatRamp(clamp((gSample - 0.40) / 1.60, 0.0, 1.0));
    gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    return;
  }

  if (uDebug == 5) {
    // Lensed background direction encoded as RGB (d*0.5+0.5).
    vec3 c = escapeDir * 0.5 + 0.5;
    if (captured) c *= 0.22;
    gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    return;
  }

  if (uDebug == 6) {
    // Starfield and galaxy only, lensed, with the disk removed.
    vec3 c = captured ? vec3(0.0) : backgroundRadiance(escapeDir);
    c = c / (1.0 + c); // Reinhard so faint structure stays visible
    gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    return;
  }

  if (uDebug == 7) {
    // Raw pre-post-processing HDR radiance; presented with a logarithmic tone
    // curve in the final pass so the full dynamic range is visible.
    gl_FragColor = vec4(max(radiance, vec3(0.0)), 1.0);
    return;
  }

  if (uDebug == 8) {
    // Temperature field of the last disk interaction (1000 K .. 15000 K), taken
    // from the crossing radius recorded in the ordered crossing table.
    bool haveSample = false;
    float tSample = 0.0;
    if (crossCount > 0) {
      tSample = diskTemperature(crossingTable[min(crossCount, MAX_CROSS) - 1].x);
      haveSample = true;
    } else if (hitDisk) {
      tSample = lastTemperature;
      haveSample = true;
    }
    vec3 c = vec3(0.10);
    if (haveSample) c = heatRamp(clamp((tSample - 1000.0) / 14000.0, 0.0, 1.0));
    gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    return;
  }

  if (uDebug == 9) {
    // Impact parameter b normalised by the critical value b_c = 3√3 M; the white
    // line marks the critical curve that bounds the shadow.
    float ratio = impactParameter / B_CRITICAL;
    float off = (ratio - 1.0) / 0.02;
    vec3 c = heatRamp(clamp(ratio / 2.0, 0.0, 1.0)) * 0.8;
    c += vec3(1.0) * exp(-off * off);
    if (captured) c = mix(c, vec3(0.02, 0.03, 0.10), 0.55);
    if (budgetExhausted) c = mix(c, vec3(1.0, 0.2, 0.2), 0.35);
    gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    return;
  }

  // Debug 0: final HDR radiance for the bloom + tone-mapping pipeline.
  gl_FragColor = vec4(max(radiance, vec3(0.0)), 1.0);
}
