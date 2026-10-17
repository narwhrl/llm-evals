// GARGANTUA — per-pixel Schwarzschild null-geodesic raytracer.
//
// Geometry: geometric units, G = c = 1, black-hole mass M = 1, so the event
// horizon is r_s = 2M = 2, the photon sphere is r = 3M, and the critical
// impact parameter is b_crit = 3*sqrt(3) M.
//
// Integration chart: every camera ray lies in a plane through the hole. With
// u = 1/r and phi the angle measured in that plane from the camera, a null
// geodesic obeys the exact Schwarzschild orbit equation
//
//     d^2u/dphi^2 = -u + 3 M u^2
//
// (see e.g. Chandrasekhar, The Mathematical Theory of Black Holes, ch. 3).
// We integrate (u, du/dphi) with classical RK4. This is not a screen-space
// bending approximation: the state, angular step and termination conditions
// are the geodesic itself. The ray is advanced until it crosses the horizon
// (captured), reaches an escape radius with u -> 0, or exhausts its step
// budget. Disk intersections are found as sign changes of the physical
// y-coordinate along the same integrated path, then composited in path order.

precision highp float;
precision highp int;

varying vec2 vUv;
out highp vec4 fragColor;

uniform vec2 uResolution;
uniform float uAspect;
uniform vec3 uCameraPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;
uniform float uPixelAngle;
uniform float uTime;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskThickness;
uniform float uDiskTemperature;
uniform float uDiskEmission;
uniform float uOrbitalSpeed;
uniform float uTurbulenceAmount;
uniform float uTurbulenceSpeed;
uniform float uStarDensity;
uniform float uGalaxyBrightness;

uniform int uDebug;
uniform int uMaxSteps;
uniform int uMaxCrossings;

const float PI = 3.141592653589793;
const float M = 1.0;
const float RS = 2.0 * M;
const float PHOTON_SPHERE = 3.0 * M;
const float B_CRIT = 5.196152422706632;
const float MAX_HALF_FLOAT = 60000.0;

// ---------------------------------------------------------------- utilities

float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

vec3 hash33(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.xxy + p.yxx) * p.zyx);
}

float noise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
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
    f.z
  );
}

float fbm2(vec3 p) {
  float sum = 0.0;
  float amp = 0.55;
  for (int i = 0; i < 2; i++) {
    sum += amp * noise3(p);
    p = p * 2.07 + vec3(1.7, 9.2, 3.1);
    amp *= 0.5;
  }
  return sum;
}

float fbm3(vec3 p) {
  float sum = 0.0;
  float amp = 0.52;
  for (int i = 0; i < 3; i++) {
    sum += amp * noise3(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    amp *= 0.5;
  }
  return sum;
}

float fbm4(vec3 p) {
  float sum = 0.0;
  float amp = 0.53;
  for (int i = 0; i < 4; i++) {
    sum += amp * noise3(p);
    p = p * 2.01 + vec3(1.7, 9.2, 3.1);
    amp *= 0.5;
  }
  return sum;
}

vec2 rotate2(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, s, -s, c) * p;
}

// Planckian blackbody approximation (Tanner Helland's sRGB fit), converted to
// linear RGB. 1000 K .. 40000 K. Used for both the disk and star colours.
vec3 blackbody(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  float r;
  float g;
  float b;
  if (t <= 66.0) {
    r = 255.0;
    g = 99.4708025861 * log(t) - 161.1195681661;
    b = t <= 19.0 ? 0.0 : 138.5177312231 * log(t - 10.0) - 305.0447927307;
  } else {
    r = 329.698727446 * pow(t - 60.0, -0.1332047592);
    g = 288.1221695283 * pow(t - 60.0, -0.0755148492);
    b = 255.0;
  }
  vec3 srgb = clamp(vec3(r, g, b) / 255.0, 0.0, 1.0);
  return pow(srgb, vec3(2.2));
}

vec3 heatPalette(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c = vec3(0.0);
  c += vec3(0.35, 0.02, 0.01) * smoothstep(0.0, 0.35, t);
  c += vec3(1.0, 0.25, 0.02) * smoothstep(0.25, 0.65, t);
  c += vec3(1.0, 0.72, 0.22) * smoothstep(0.55, 0.85, t);
  c += vec3(0.85, 0.95, 1.0) * smoothstep(0.82, 1.0, t);
  return c;
}

vec3 orderPalette(float t) {
  return 0.55 + 0.45 * cos(6.2831853 * (vec3(0.0, 0.33, 0.67) + t));
}

// ------------------------------------------------------------- deep field

vec3 starLayer(vec3 dir, float scale, float gate, float size, float brightness) {
  if (gate <= 0.001) return vec3(0.0);
  vec3 p = dir * scale;
  vec3 cell = floor(p);
  float present = hash31(cell + vec3(17.31, 4.77, 9.13));
  if (present > clamp(gate, 0.0, 0.98)) return vec3(0.0);

  vec3 offset = hash33(cell + vec3(5.17, 19.7, 2.31));
  vec3 starDir = normalize(cell + 0.12 + 0.76 * offset);
  float d = length(dir - starDir);
  float pixel = max(uPixelAngle, 0.00018);
  float coreR = max(size, pixel * 1.15);
  float core = exp(-pow(d / coreR, 2.0) * 2.0);
  float halo = exp(-pow(d / (coreR * 2.7), 2.0)) * 0.055;
  float temp = mix(2600.0, 12500.0, pow(offset.x, 1.6));
  float twinkle = 0.7 + 0.3 * offset.y;
  return blackbody(temp) * (core + halo) * brightness * twinkle;
}

// Procedural, lensed sky. No texture, cubemap or remote image is involved.
vec3 skyBackground(vec3 dir) {
  vec3 col = vec3(0.0007, 0.0010, 0.0022) * (0.72 + 0.28 * clamp(dir.y, -1.0, 1.0));

  vec3 galacticNormal = normalize(vec3(0.28, 0.86, -0.42));
  float bandD = dot(dir, galacticNormal);
  float band = exp(-pow(bandD / 0.145, 2.0));

  float cloud = fbm3(dir * 1.9 + vec3(11.0, 3.0, 7.0));
  float dust = fbm2(dir * 5.1 + vec3(2.0, 9.0, 4.0));
  float lanes = smoothstep(0.45, 0.72, dust) * band;
  vec3 warm = vec3(1.0, 0.62, 0.32);
  vec3 cool = vec3(0.38, 0.58, 1.0);
  vec3 gal = mix(cool, warm, smoothstep(0.28, 0.72, cloud));
  float glow = band * (0.1 + 0.9 * pow(cloud, 2.0)) * (1.0 - 0.62 * lanes);
  col += gal * glow * uGalaxyBrightness * 0.115;
  col += warm * band * (0.009 + 0.02 * cloud) * uGalaxyBrightness;

  vec3 coreDir = normalize(vec3(-0.7, 0.1, 0.7));
  float core = exp(-pow(length(dir - coreDir) / 0.3, 2.0));
  col += warm * core * uGalaxyBrightness * 0.026;

  float neb = fbm2(dir * 2.0 + vec3(21.0, 7.0, 13.0));
  neb = smoothstep(0.58, 0.88, neb) * exp(-pow(length(dir - normalize(vec3(0.6, -0.3, -0.7))) / 0.5, 2.0));
  col += vec3(0.14, 0.34, 0.68) * neb * uGalaxyBrightness * 0.024;

  col += starLayer(dir, 42.0, 0.2 * uStarDensity, 0.0017, 1.9);
  col += starLayer(dir, 88.0, 0.34 * uStarDensity, 0.00105, 0.82);
  col += starLayer(dir, 170.0, 0.5 * min(uStarDensity, 1.4), 0.00068, 0.36);
  return col;
}

// --------------------------------------------------------------- disk model

struct DiskSample {
  vec3 emission;
  vec3 raw;
  float alpha;
  float g;
  float temp;
};

DiskSample emptyDisk() {
  return DiskSample(vec3(0.0), vec3(0.0), 0.0, 1.0, 0.0);
}

// P is the equatorial-plane crossing, backDir is the backward-ray unit
// velocity there. The physical photon travels toward the camera, so its
// propagation direction is -backDir.
DiskSample sampleDisk(vec3 P, float r, vec3 backDir) {
  if (r < uDiskInner || r > uDiskOuter) return emptyDisk();

  float omega = 0.65 * pow(max(uDiskInner / r, 0.04), 1.5)
    * (0.35 + 0.65 * uOrbitalSpeed) * uTurbulenceSpeed;
  vec2 flow = rotate2(P.xz, omega * uTime);
  float flowAng = atan(flow.y, flow.x);

  float n1 = fbm4(vec3(flow * 1.18, log(r) * 2.7));
  float n2 = fbm2(vec3(flow * 3.4, log(r) * 5.2 + 9.0));
  float filaments = pow(clamp(n1 * 0.82 + n2 * 0.3, 0.0, 1.0), 1.45);
  float arm = 0.5 + 0.5 * sin(2.0 * flowAng + 5.5 * log(r / uDiskInner));

  float radial = smoothstep(uDiskInner * 0.985, uDiskInner * 1.055, r)
    * (1.0 - smoothstep(uDiskOuter * 0.86, uDiskOuter * 1.015, r));
  if (radial <= 0.0) return emptyDisk();

  float turbulence = mix(0.62, 0.3 + 1.25 * filaments, uTurbulenceAmount);
  float density = radial * (0.42 + 0.75 * filaments) * mix(1.0, 0.6 + 0.85 * arm, 0.5);
  density *= turbulence;
  density = max(density, radial * 0.34 * (0.7 + 0.3 * arm));
  float rim = exp(-pow((r - uDiskInner) / (uDiskInner * 0.13), 2.0));

  float x = max(r / uDiskInner, 1.0001);
  // Steeper than the bolometric Shakura-Sunyaev profile so the outer disk
  // visibly cools into orange/red while the inner rim stays blue-white.
  float profile = pow(x, -1.05) * pow(max(1.0 - sqrt(1.0 / x), 0.0), 0.25);
  profile = clamp(profile / 0.36, 0.03, 1.8);
  float temp = uDiskTemperature * profile;

  float h = uDiskThickness * (0.55 + 0.45 * clamp(r / uDiskOuter, 0.0, 1.0));
  float tilt = abs(backDir.y);
  float chord = (2.0 * h) / max(tilt, 0.08);
  float column = density * chord * 0.55;
  float alpha = clamp(1.0 - exp(-column), 0.0, 0.86);

  vec3 tang = cross(vec3(0.0, 1.0, 0.0), P);
  tang = length(tang) > 1e-5 ? normalize(tang) : vec3(1.0, 0.0, 0.0);
  float vOrb = sqrt(1.0 / max(r - 2.0 * M, 0.2));
  float betaMag = clamp(vOrb * uOrbitalSpeed, 0.0, 0.92);
  float gamma = inversesqrt(max(1.0 - betaMag * betaMag, 0.02));
  vec3 nObs = -backDir;
  float doppler = 1.0 / max(gamma * (1.0 - dot(tang * betaMag, nObs)), 0.06);
  float grav = sqrt(max(1.0 - RS / r, 0.0));
  float g = clamp(grav * doppler, 0.06, 4.5);

  float emissionScale = 0.58 + 0.42 * clamp(chord / 1.5, 0.2, 2.2);
  emissionScale *= 0.68 + 0.32 * rim;
  vec3 bb = blackbody(temp * g);
  float bolometric = pow(profile, 3.0) * pow(g, 2.6);
  vec3 emission = bb * bolometric * uDiskEmission * density * emissionScale * 2.1;
  vec3 raw = blackbody(temp) * pow(profile, 3.0) * uDiskEmission * density * emissionScale * 2.1;

  return DiskSample(emission, raw, alpha, g, temp);
}

// ------------------------------------------------------------ geodesic path

vec3 orbitalDirection(float phi, float u, float w, vec3 e1, vec3 e2) {
  float c = cos(phi);
  float s = sin(phi);
  vec3 er = c * e1 + s * e2;
  vec3 ep = -s * e1 + c * e2;
  vec3 velocity = (-w / max(u * u, 1e-8)) * er + (1.0 / max(u, 1e-6)) * ep;
  return normalize(velocity);
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  ndc.x *= uAspect;
  vec3 rayDir = normalize(uCamForward + uTanHalfFov * (ndc.x * uCamRight + ndc.y * uCamUp));

  float r0 = length(uCameraPos);
  vec3 e1 = uCameraPos / max(r0, 1e-4);
  float nr = dot(rayDir, e1);
  vec3 tangential = rayDir - nr * e1;
  float nt = length(tangential);

  bool captured = false;
  bool escaped = false;
  int steps = 0;
  int crossingCount = 0;
  float firstG = 1.0;
  float bRatio = 0.0;

  vec3 radiance = vec3(0.0);
  vec3 sky = vec3(0.0);
  vec3 escapeDir = rayDir;
  vec3 crossingDebug = vec3(0.0);
  vec3 emissionDebug = vec3(0.0);
  float transmittance = 1.0;

  if (nt < 1e-6) {
    // Purely radial ray: the orbital plane is undefined. It either falls
    // straight into the horizon or leaves in the same direction.
    if (nr < 0.0) {
      captured = true;
    } else {
      escaped = true;
      escapeDir = rayDir;
    }
  } else {
    vec3 e2 = tangential / nt;
    float u = 1.0 / max(r0, 1e-4);
    float w = -u * nr / nt;
    float inverseB2 = w * w + u * u - 2.0 * M * u * u * u;
    bRatio = inverseB2 > 1e-8 ? (1.0 / sqrt(inverseB2)) / B_CRIT : 0.0;

    float phi = 0.0;
    float qPrev = e1.y;
    float uEscape = 1.0 / max(90.0, r0 * 2.2);

    for (int i = 0; i < 1500; i++) {
      if (i >= uMaxSteps) {
        // Out of budget: inside the photon sphere the ray is on a captured
        // trajectory; outside it use the current tangent as a sky direction.
        if (u > 1.0 / PHOTON_SPHERE) {
          captured = true;
        } else {
          escaped = true;
          escapeDir = orbitalDirection(phi, u, w, e1, e2);
        }
        break;
      }

      steps = i + 1;

      // Angular step tightens near the hole where the orbit equation bends
      // fastest; RK4 keeps the curved-path intersections stable.
      float dphi = clamp(0.038 / (1.0 + 6.5 * u), 0.0035, 0.04);
      // Also cap the relative change of u. Near-radial rays have a large
      // du/dphi, and this keeps RK4 from stepping across the whole orbit.
      dphi = min(dphi, 0.22 * max(u, 1e-4) / max(abs(w), 1e-5));

      float k1u = w;
      float k1w = -u + 3.0 * M * u * u;
      float u2 = u + 0.5 * dphi * k1u;
      float w2 = w + 0.5 * dphi * k1w;
      float k2u = w2;
      float k2w = -u2 + 3.0 * M * u2 * u2;
      float u3 = u + 0.5 * dphi * k2u;
      float w3 = w + 0.5 * dphi * k2w;
      float k3u = w3;
      float k3w = -u3 + 3.0 * M * u3 * u3;
      float u4 = u + dphi * k3u;
      float w4 = w + dphi * k3w;
      float k4u = w4;
      float k4w = -u4 + 3.0 * M * u4 * u4;

      float uNew = u + (dphi / 6.0) * (k1u + 2.0 * k2u + 2.0 * k3u + k4u);
      float wNew = w + (dphi / 6.0) * (k1w + 2.0 * k2w + 2.0 * k3w + k4w);
      float phiNew = phi + dphi;

      if (uNew >= 1.0 / RS) {
        captured = true;
        break;
      }

      float qNew = e1.y * cos(phiNew) + e2.y * sin(phiNew);
      if (qPrev * qNew < 0.0 && crossingCount < uMaxCrossings) {
        float tCross = qPrev / (qPrev - qNew);
        float phiCross = phi + tCross * dphi;
        float uCross = mix(u, uNew, tCross);
        float wCross = mix(w, wNew, tCross);
        float rCross = 1.0 / max(uCross, 1e-6);

        if (rCross >= uDiskInner && rCross <= uDiskOuter) {
          float c = cos(phiCross);
          float s = sin(phiCross);
          vec3 er = c * e1 + s * e2;
          vec3 ep = -s * e1 + c * e2;
          vec3 P = rCross * er;
          vec3 backDir = normalize((-wCross / max(uCross * uCross, 1e-8)) * er + (1.0 / max(uCross, 1e-6)) * ep);
          DiskSample ds = sampleDisk(P, rCross, backDir);

          if (ds.alpha > 0.001) {
            radiance += transmittance * ds.emission * ds.alpha;
            emissionDebug += transmittance * ds.raw * ds.alpha;
            crossingDebug += orderPalette(float(crossingCount) * 0.14)
              * (0.35 + 0.65 * ds.alpha)
              * (1.0 - 0.35 * float(crossingCount) / max(float(uMaxCrossings), 1.0));
            if (crossingCount == 0) {
              firstG = ds.g;
            }
            crossingCount += 1;
            transmittance *= (1.0 - ds.alpha);
          }
        }
      }

      phi = phiNew;
      u = uNew;
      w = wNew;
      qPrev = qNew;

      if (u < uEscape) {
        escaped = true;
        escapeDir = orbitalDirection(phi, u, w, e1, e2);
        break;
      }
    }
  }

  if (escaped) {
    sky = skyBackground(escapeDir);
    radiance += sky * transmittance;
  }

  if (uDebug == 0) {
    fragColor = vec4(clamp(radiance, 0.0, MAX_HALF_FLOAT), 1.0);
    return;
  }

  vec3 debugColor = vec3(0.0);
  if (uDebug == 1) {
    float t = clamp(float(steps) / max(float(uMaxSteps), 1.0), 0.0, 1.0);
    debugColor = heatPalette(t) * 0.9;
    if (captured) debugColor = mix(debugColor, vec3(1.0, 0.12, 0.04), 0.6);
    if (escaped) debugColor *= 0.8;
    debugColor += vec3(0.8) * 0.12 * float(crossingCount);
  } else if (uDebug == 2) {
    debugColor = captured ? vec3(1.0, 0.055, 0.025) : vec3(0.015, 0.06, 0.16);
    if (escaped) debugColor += vec3(0.02, 0.12, 0.3) * (0.4 + 0.6 * clamp(bRatio / 2.0, 0.0, 1.0));
    if (crossingCount > 0) debugColor = mix(debugColor, vec3(0.1, 0.9, 0.45), 0.35);
  } else if (uDebug == 3) {
    debugColor = crossingDebug + sky * 0.018;
    if (crossingCount == 0) debugColor += vec3(0.012, 0.018, 0.032);
  } else if (uDebug == 4) {
    if (crossingCount > 0) {
      // Diverging map around g = 1: red is redshifted, blue is blueshifted.
      float t = clamp(log2(max(firstG, 0.1)) * 1.1, -1.0, 1.0);
      vec3 cold = vec3(0.9, 0.1, 0.02);
      vec3 mid = vec3(1.0, 0.86, 0.68);
      vec3 hot = vec3(0.16, 0.48, 1.0);
      debugColor = t < 0.0 ? mix(mid, cold, -t) : mix(mid, hot, t);
      debugColor *= 0.82;
    } else if (captured) {
      debugColor = vec3(0.012, 0.006, 0.006);
    }
  } else if (uDebug == 5) {
    debugColor = escaped ? escapeDir * 0.5 + 0.5 : vec3(0.0);
    if (!escaped) debugColor = vec3(0.015, 0.01, 0.01);
  } else if (uDebug == 6) {
    debugColor = escaped ? sky * 2.6 : vec3(0.0);
  } else if (uDebug == 7) {
    debugColor = emissionDebug;
    if (crossingCount == 0) debugColor = vec3(0.0);
  } else if (uDebug == 8) {
    float lum = dot(radiance, vec3(0.2126, 0.7152, 0.0722));
    float t = clamp((log2(lum + 1e-5) + 12.0) / 15.0, 0.0, 1.0);
    debugColor = vec3(pow(t, 2.6), pow(t, 1.35), t) * 1.35;
    debugColor += vec3(0.5) * smoothstep(0.82, 0.98, t);
  } else if (uDebug == 9) {
    float d = abs(bRatio - 1.0);
    debugColor = vec3(0.012, 0.025, 0.06);
    debugColor += vec3(0.08, 0.35, 0.9) * exp(-d * 5.0);
    debugColor += vec3(1.0, 0.92, 0.8) * exp(-d * 55.0);
    if (captured) debugColor = mix(debugColor, vec3(0.55, 0.02, 0.01), 0.55);
    if (crossingCount > 0) debugColor += orderPalette(float(crossingCount) * 0.1) * 0.08;
  }

  fragColor = vec4(clamp(debugColor, 0.0, 1.0), 1.0);
}
