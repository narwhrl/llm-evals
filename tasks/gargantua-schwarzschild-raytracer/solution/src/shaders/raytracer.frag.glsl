// raytracer.frag.glsl - Physical Schwarzschild Null Geodesic Raytracer
precision highp float;

varying vec2 vUv;

// Camera & Frame Uniforms
uniform vec3 uCameraPos;
uniform mat4 uCameraWorldMatrix;
uniform float uFov;
uniform vec2 uResolution;
uniform float uTime;
uniform int uMaxSteps;
uniform int uDebugMode;

// Physical Parameters (from 21 Reactive Parameters)
uniform float uDiskInner;         // e.g. 2.6 rs
uniform float uDiskOuter;         // e.g. 12.5 rs
uniform float uDiskThickness;     // e.g. 0.08 rs
uniform float uDiskTemp;          // e.g. 6500 K
uniform float uDiskEmission;      // e.g. 1.5
uniform float uVelocityFactor;     // e.g. 1.0
uniform float uTurbAmp;           // e.g. 0.85
uniform float uTurbSpeed;         // e.g. 1.0
uniform float uStarDensity;       // e.g. 1.0
uniform float uGalaxyBrightness;  // e.g. 1.3

// Constants of Schwarzschild Geometry (Natural Units: c = 1, G = 1, M = 0.5 => rs = 1.0)
const float RS = 1.0;
const float HORIZON_R = 1.002;
const float ESCAPE_R = 40.0;
const float PI = 3.14159265358979323846;

// --- Procedural 3D Simplex & Value Noise ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// Multi-octave fractal noise
float fbm(vec3 p) {
  float f = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    f += amp * snoise(p);
    p = p * 2.02 + vec3(0.15, 0.28, 0.37);
    amp *= 0.5;
  }
  return f;
}

// --- Planck Blackbody Spectrum Approximation ---
// Maps Kelvin temperature (1000K - 20000K) to linear RGB radiant color
vec3 blackbody(float kelvin) {
  float T = kelvin / 100.0;
  vec3 color;

  // Red
  if (T <= 66.0) {
    color.r = 1.0;
  } else {
    color.r = clamp(pow(T - 60.0, -0.1332047592) * 1.292936186, 0.0, 1.0);
  }

  // Green
  if (T <= 66.0) {
    color.g = clamp(0.390081578769 * log(T) - 0.631841443788, 0.0, 1.0);
  } else {
    color.g = clamp(pow(T - 60.0, -0.0755148492) * 1.129890861, 0.0, 1.0);
  }

  // Blue
  if (T >= 66.0) {
    color.b = 1.0;
  } else if (T <= 19.0) {
    color.b = 0.0;
  } else {
    color.b = clamp(0.54320678911 * log(T - 10.0) - 1.19625408914, 0.0, 1.0);
  }

  // Luminance scaling via Stefan-Boltzmann (normalized around 6500K)
  float normT = kelvin / 6500.0;
  float intensity = normT * normT * normT;
  return color * intensity;
}

// Turbo Colormap for Step Cost Heatmap (Mode 1)
vec3 turboColormap(float x) {
  x = clamp(x, 0.0, 1.0);
  const vec4 kRedVec4 = vec4(0.13572138, 4.61539260, -42.66032258, 132.13108234);
  const vec4 kGreenVec4 = vec4(0.09140261, 2.19418839, 4.84296658, -14.18503333);
  const vec4 kBlueVec4 = vec4(0.10667330, 12.64194608, -60.58204836, 110.36276771);
  const vec2 kRedVec2 = vec2(-152.94239396, 59.28637943);
  const vec2 kGreenVec2 = vec2(4.27729857, 2.82956604);
  const vec2 kBlueVec2 = vec2(-89.90310912, 27.34824973);

  vec4 v4 = vec4(1.0, x, x * x, x * x * x);
  vec2 v2 = v4.zw * v4.z;

  return clamp(vec3(
    dot(v4, kRedVec4) + dot(v2, kRedVec2),
    dot(v4, kGreenVec4) + dot(v2, kGreenVec2),
    dot(v4, kBlueVec4) + dot(v2, kBlueVec2)
  ), 0.0, 1.0);
}

// --- Procedural Celestial Sphere (Milky Way & Stars) ---
// Generates physical cosmic background without external textures
vec3 sampleCelestialSphere(vec3 dir) {
  // Galactic orientation vectors
  vec3 galPole = normalize(vec3(0.42, 0.78, 0.45));
  vec3 galCore = normalize(vec3(-0.75, 0.22, 0.62));

  float galLat = dot(dir, galPole);
  float galPlaneDist = abs(galLat);

  // Milky Way Galactic Bulge & Core
  float coreAngle = dot(dir, galCore);
  float coreGlow = pow(max(coreAngle, 0.0), 12.0) * 4.5 + pow(max(coreAngle, 0.0), 40.0) * 12.0;
  vec3 coreColor = vec3(1.3, 1.05, 0.75) * coreGlow;

  // Milky Way Galactic Disc
  float discIntensity = exp(-galPlaneDist * 8.5) * 1.8;
  float discFbm = fbm(dir * 5.5 + vec3(1.2, 4.3, 2.1));
  float dustLane = smoothstep(0.02, 0.18, abs(galLat + 0.03 * snoise(dir * 8.0)));
  vec3 discColor = vec3(0.85, 0.9, 1.1) * discIntensity * (0.6 + 0.8 * discFbm) * (0.2 + 0.8 * dustLane);

  vec3 milkyWay = (coreColor + discColor) * uGalaxyBrightness;

  // Procedural Starfield using cellular/Voronoi noise
  vec3 starColor = vec3(0.0);
  vec3 pStar = dir * 160.0 * uStarDensity;
  vec3 iStar = floor(pStar);
  vec3 fStar = fract(pStar);

  float minDist = 1.0;
  vec3 starFeaturePoint = vec3(0.0);
  for (int z = -1; z <= 1; z++) {
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec3 neighbor = vec3(float(x), float(y), float(z));
        vec3 hashP = iStar + neighbor;
        // Deterministic pseudo-random offset
        vec3 cellHash = fract(sin(vec3(
          dot(hashP, vec3(127.1, 311.7, 74.7)),
          dot(hashP, vec3(269.5, 183.3, 246.1)),
          dot(hashP, vec3(113.5, 271.9, 124.6))
        )) * 43758.5453123);

        vec3 diff = neighbor + cellHash - fStar;
        float dist = length(diff);
        if (dist < minDist) {
          minDist = dist;
          starFeaturePoint = hashP + cellHash;
        }
      }
    }
  }

  // Star brightness power-law distribution
  float starSeed = fract(sin(dot(starFeaturePoint, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  if (starSeed > 0.82) {
    float starRadius = 0.08 + 0.12 * (starSeed - 0.82) / 0.18;
    float starIntensity = smoothstep(starRadius, 0.0, minDist);
    float starMag = pow((starSeed - 0.82) / 0.18, 5.0) * 7.0 + 0.4;

    // Spectral star temperature: blue giants, solar yellow, red dwarfs
    vec3 spectralColor;
    float specSeed = fract(starSeed * 37.19);
    if (specSeed > 0.75) {
      spectralColor = vec3(0.8, 0.95, 1.4); // Blue hot O/B star
    } else if (specSeed > 0.35) {
      spectralColor = vec3(1.1, 1.05, 0.9); // White/yellow G star
    } else {
      spectralColor = vec3(1.3, 0.75, 0.5); // Cool red M dwarf
    }

    // Subtle 4-ray diffraction spike on brightest stars
    vec3 rayDir = fract(pStar) - 0.5;
    float spike = max(exp(-abs(rayDir.x) * 45.0) * exp(-abs(rayDir.y) * 4.0),
                      exp(-abs(rayDir.y) * 45.0) * exp(-abs(rayDir.x) * 4.0));
    starColor = spectralColor * (starIntensity * starMag + spike * starMag * 0.3);
  }

  return milkyWay + starColor;
}

// --- Schwarzschild Null Geodesic Acceleration ---
// Exact vector ODE: a = d^2x/dlambda^2 = - (3 * M * |x x v|^2 / r^5) * x
// where rs = 2M => 3M = 1.5 * rs
vec3 getGeodesicAccel(vec3 pos, vec3 vel) {
  float r2 = dot(pos, pos);
  float r = sqrt(r2);
  float r5 = r2 * r2 * r;

  vec3 h = cross(pos, vel); // Conserved specific angular momentum vector
  float h2 = dot(h, h);

  // Exact GR photon deflection acceleration
  return (-1.5 * RS * h2 / max(r5, 0.0001)) * pos;
}

// 4th-Order Runge-Kutta (RK4) Step for Null Geodesic
void stepRK4(inout vec3 p, inout vec3 v, float h) {
  vec3 k1_x = v;
  vec3 k1_v = getGeodesicAccel(p, v);

  vec3 p2 = p + 0.5 * h * k1_x;
  vec3 v2 = v + 0.5 * h * k1_v;
  vec3 k2_x = v2;
  vec3 k2_v = getGeodesicAccel(p2, v2);

  vec3 p3 = p + 0.5 * h * k2_x;
  vec3 v3 = v + 0.5 * h * k2_v;
  vec3 k3_x = v3;
  vec3 k3_v = getGeodesicAccel(p3, v3);

  vec3 p4 = p + h * k3_x;
  vec3 v4 = v + h * k3_v;
  vec3 k4_x = v4;
  vec3 k4_v = getGeodesicAccel(p4, v4);

  p += (h / 6.0) * (k1_x + 2.0 * k2_x + 2.0 * k3_x + k4_x);
  v += (h / 6.0) * (k1_v + 2.0 * k2_v + 2.0 * k3_v + k4_v);
}

// Primary Camera Ray Generation
vec3 getPrimaryRayDir(vec2 screenCoord, vec3 camPos, mat4 camWorldMatrix, float fovDeg) {
  float fovRad = radians(fovDeg);
  float tanHalfFov = tan(fovRad * 0.5);
  float aspect = uResolution.x / uResolution.y;

  vec2 ndc = (screenCoord / uResolution) * 2.0 - 1.0;
  ndc.x *= aspect;

  vec3 rayCam = normalize(vec3(ndc.x * tanHalfFov, ndc.y * tanHalfFov, -1.0));
  // Transform ray direction into world coordinates
  return normalize((camWorldMatrix * vec4(rayCam, 0.0)).xyz);
}

void main() {
  vec3 rayPos = uCameraPos;
  vec3 rayDir0 = getPrimaryRayDir(gl_FragCoord.xy, uCameraPos, uCameraWorldMatrix, uFov);
  vec3 rayDir = rayDir0;

  // Diagnostic Tracking Variables
  int totalSteps = 0;
  bool hitHorizon = false;
  int diskCrossings = 0;
  float primaryDoppler = 1.0;
  float primaryTemp = 0.0;
  float primaryTurb = 0.0;
  vec3 primaryVel = vec3(0.0);
  bool firstCrossingRecorded = false;

  // Radiative Transfer Accumulators
  vec3 accumulatedColor = vec3(0.0);
  float rayTransmission = 1.0;

  // Adaptive Geodesic Raymarching Loop
  for (int step = 0; step < 360; step++) {
    if (step >= uMaxSteps) break;
    totalSteps++;

    float r = length(rayPos);

    // 1. Horizon Termination Check
    if (r <= HORIZON_R) {
      hitHorizon = true;
      break;
    }

    // 2. Escape Termination Check
    if (r >= ESCAPE_R) {
      break;
    }

    // Adaptive step size: dense near horizon and photon ring, rapid far away
    float stepSize = clamp(0.075 * (r - 0.96 * RS), 0.012, 0.38);

    vec3 prevPos = rayPos;
    vec3 prevVel = rayDir;

    // Advance ray along null geodesic via RK4
    stepRK4(rayPos, rayDir, stepSize);

    // 3. Accretion Disk Crossing Detection (Equatorial Plane y = 0)
    if (prevPos.y * rayPos.y <= 0.0 && abs(rayPos.y - prevPos.y) > 0.00001) {
      float tCross = -prevPos.y / (rayPos.y - prevPos.y);
      if (tCross >= 0.0 && tCross <= 1.0) {
        vec3 hitPos = mix(prevPos, rayPos, tCross);
        float hitR = length(vec2(hitPos.x, hitPos.z));

        // Within disk inner and outer boundary
        if (hitR >= uDiskInner && hitR <= uDiskOuter) {
          diskCrossings++;

          // Relativistic Keplerian Velocity Field: v_K = sqrt(rs / (2 r))
          float vK = sqrt((0.5 * RS) / hitR);
          vec3 vOrbit = uVelocityFactor * vK * normalize(vec3(hitPos.z, 0.0, -hitPos.x));
          float beta = dot(vOrbit, -normalize(rayDir)); // Line-of-sight velocity toward observer
          float gamma = 1.0 / sqrt(max(1.0 - dot(vOrbit, vOrbit), 0.001));

          // Doppler Factor & Gravitational Redshift Factor
          float gDoppler = 1.0 / (gamma * (1.0 - beta));
          float gGrav = sqrt(max(1.0 - RS / hitR, 0.001));
          float g = gDoppler * gGrav;

          if (!firstCrossingRecorded) {
            primaryDoppler = g;
            primaryVel = vOrbit;
            firstCrossingRecorded = true;
          }

          // Shakura-Sunyaev Temperature Profile f(r) = (r_in/r)^0.75 * (1 - sqrt(r_in/r))^0.25
          float rRatio = uDiskInner / hitR;
          float ssProfile = pow(rRatio, 0.75) * pow(max(1.0 - sqrt(rRatio), 0.001), 0.25);
          float localTemp = uDiskTemp * (0.35 + 1.85 * ssProfile);
          float observedTemp = localTemp * g;

          // Smooth edge falloff at inner plunging region and diffuse outer boundary
          float innerEdgeFade = smoothstep(uDiskInner, uDiskInner + 0.25, hitR);
          float outerEdgeFade = smoothstep(uDiskOuter, uDiskOuter - 1.2, hitR);
          float edgeFade = innerEdgeFade * outerEdgeFade;

          // Procedural Differential Keplerian Shear Turbulence
          float phi = atan(hitPos.z, hitPos.x);
          float keplerOmega = sqrt((0.5 * RS) / (hitR * hitR * hitR));
          float phiShear = phi - keplerOmega * uTime * uTurbSpeed * 2.5;

          vec3 turbCoord = vec3(hitR * cos(phiShear), hitR * sin(phiShear), uTime * 0.09 * uTurbSpeed);
          float noiseVal = fbm(turbCoord * 1.4);
          float turbMod = 1.0 + uTurbAmp * (noiseVal - 0.45) * 1.8;
          turbMod = max(turbMod, 0.1);

          if (diskCrossings == 1) {
            primaryTemp = observedTemp;
            primaryTurb = turbMod;
          }

          // Disk Radiance: Planck blackbody * g^4 (relativistic beaming) * turbulence * edge fade
          vec3 emittedRadiance = blackbody(observedTemp) * pow(g, 4.0) * uDiskEmission * turbMod * edgeFade;

          // Volumetric Slab Opacity & Path Length Integration
          float effectivePath = (2.0 * uDiskThickness) / max(abs(normalize(rayDir).y), 0.045);
          float slabAlpha = clamp((1.0 - exp(-0.85 * effectivePath)) * edgeFade, 0.0, 1.0);

          // Path-sequential front-to-back accumulation
          accumulatedColor += rayTransmission * emittedRadiance * slabAlpha;
          rayTransmission *= (1.0 - slabAlpha);

          if (rayTransmission < 0.005) {
            break; // Ray completely absorbed by disk matter
          }
        }
      }
    }
  }

  // 4. Background Celestial Contribution (if ray escaped and transmission remains)
  vec3 bgRadiance = vec3(0.0);
  if (!hitHorizon && rayTransmission > 0.005) {
    vec3 escapedDir = normalize(rayDir);
    bgRadiance = sampleCelestialSphere(escapedDir);
    accumulatedColor += rayTransmission * bgRadiance;
  }

  // 5. Diagnostic Debug View Routing
  if (uDebugMode == 0) {
    // Mode 0: Raw Linear HDR Radiance (passed to bloom and tonemapping)
    gl_FragColor = vec4(accumulatedColor, 1.0);
    return;
  }

  if (uDebugMode == 1) {
    // Mode 1: Geodesic Step Cost Heatmap (Turbo colormap)
    float costNorm = float(totalSteps) / float(uMaxSteps);
    gl_FragColor = vec4(turboColormap(costNorm), 1.0);
    return;
  }

  if (uDebugMode == 2) {
    // Mode 2: Event Horizon & Shadow Mask (binary mask)
    float mask = hitHorizon ? 1.0 : 0.0;
    gl_FragColor = vec4(vec3(mask), 1.0);
    return;
  }

  if (uDebugMode == 3) {
    // Mode 3: Disk Crossing Count & Order
    // 0 = black, 1 = blue (primary direct), 2 = green (secondary arc), 3+ = orange/red (higher order)
    vec3 crossColor = vec3(0.0);
    if (diskCrossings == 1) {
      crossColor = vec3(0.1, 0.45, 1.0); // Primary direct disk
    } else if (diskCrossings == 2) {
      crossColor = vec3(0.15, 0.95, 0.35); // Secondary lensed halo arc
    } else if (diskCrossings >= 3) {
      crossColor = vec3(1.0, 0.4, 0.05); // Higher order Einstein ring crossings
    }
    gl_FragColor = vec4(crossColor, 1.0);
    return;
  }

  if (uDebugMode == 4) {
    // Mode 4: Relativistic Doppler & Redshift Factor
    // Maps g in [0.3, 2.2]: Red (< 0.8), White (1.0), Cyan-Blue (> 1.2)
    vec3 dopColor = vec3(0.0);
    if (diskCrossings > 0) {
      float g = primaryDoppler;
      if (g < 1.0) {
        float t = clamp((g - 0.4) / 0.6, 0.0, 1.0);
        dopColor = mix(vec3(1.0, 0.08, 0.05), vec3(0.9, 0.9, 0.9), t);
      } else {
        float t = clamp((g - 1.0) / 1.0, 0.0, 1.0);
        dopColor = mix(vec3(0.9, 0.9, 0.9), vec3(0.08, 0.65, 1.0), t);
      }
    }
    gl_FragColor = vec4(dopColor, 1.0);
    return;
  }

  if (uDebugMode == 5) {
    // Mode 5: Celestial Deflection Map (theta = acos(d0 . d_inf))
    vec3 escapedDir = normalize(rayDir);
    float deflection = hitHorizon ? PI : acos(clamp(dot(rayDir0, escapedDir), -1.0, 1.0));
    float normDef = deflection / PI;
    gl_FragColor = vec4(turboColormap(normDef), 1.0);
    return;
  }

  if (uDebugMode == 6) {
    // Mode 6: Isolated Celestial Background without black hole or disk
    vec3 pureBg = sampleCelestialSphere(rayDir0);
    gl_FragColor = vec4(pureBg, 1.0);
    return;
  }

  if (uDebugMode == 7) {
    // Mode 7: Raw Linear HDR Radiance (Logarithmic False-Color)
    float lum = dot(accumulatedColor, vec3(0.2126, 0.7152, 0.0722));
    float logLum = log(1.0 + lum) * 0.4;
    gl_FragColor = vec4(turboColormap(clamp(logLum, 0.0, 1.0)), 1.0);
    return;
  }

  if (uDebugMode == 8) {
    // Mode 8: Disk Temperature & Sheared Turbulence Field
    vec3 tempColor = vec3(0.0);
    if (diskCrossings > 0) {
      float normT = clamp((primaryTemp - 2000.0) / 10000.0, 0.0, 1.0);
      tempColor = turboColormap(normT) * (0.5 + 0.5 * primaryTurb);
    }
    gl_FragColor = vec4(tempColor, 1.0);
    return;
  }

  if (uDebugMode == 9) {
    // Mode 9: Disk Keplerian Velocity Vector Field
    vec3 velColor = vec3(0.0);
    if (diskCrossings > 0) {
      velColor = primaryVel * 0.5 + 0.5;
    }
    gl_FragColor = vec4(velColor, 1.0);
    return;
  }

  gl_FragColor = vec4(accumulatedColor, 1.0);
}
