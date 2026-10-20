/**
 * GARGANTUA — the geodesic pass.
 *
 * Every pixel of this shader fires one ray and follows it through Schwarzschild
 * spacetime until the ray either leaves for the stars, falls through the event
 * horizon, or runs out of step budget. Along the way it cuts the accretion
 * disc as many times as the bent path demands — which is where the halo over
 * the shadow, the ring hugging it, and the higher-order images come from.
 * Nothing in the picture is a mesh, a texture or a lookup table.
 *
 * ---------------------------------------------------------------------------
 *  THE METRIC AND THE COORDINATES
 * ---------------------------------------------------------------------------
 *
 * Units are Schwarzschild radii: the event horizon sits at r = 1, so the
 * geometric mass is M = 1/2. The photon sphere is at r = 3M = 1.5 and the
 * innermost stable circular orbit at r = 6M = 3. The disc's inner edge is
 * therefore placed at the ISCO by default, which is where the physics says
 * the gas stops holding together.
 *
 * A null geodesic in the equatorial plane of its own motion is governed by two
 * conserved quantities, the energy E and the angular momentum L:
 *
 *      (dr/dlambda)^2 = E^2 - V_eff(r),    V_eff(r) = L^2 (r - 2M) / r^3
 *      dphi/dlambda  = L / r^2
 *
 * and the radial coordinate obeys
 *
 *      d2r/dlambda2 = L^2 (r - 3M) / r^4
 *
 * which is derived from -1/2 dV_eff/dr. The equilibrium at r = 3M is the
 * photon sphere: unstable, and the reason a critical structure exists at all.
 *
 * CAPTURE IS DECIDED ANALYTICALLY, NOT BY A RADIUS TEST. The potential
 * barrier peaks at V_eff(3M) = L^2 / (27 M^2), so a ray coming from outside
 * can only reach the hole when
 *
 *      E^2 > L^2 / (27 M^2)   <=>   b = |L| / E < 3 sqrt(3) M
 *
 * Both E and L are constants of motion, so b is computed once from the initial
 * conditions and the capture decision is exact no matter how the integration
 * drifts. That is what keeps the shadow edge a clean curve instead of a band
 * of noise, and it puts the shadow's angular radius at b_c = 3 sqrt(3) M,
 * which is the number the picture is checked against.
 *
 * The integration itself is velocity Verlet (leapfrog) with a step that
 * scales with the radius, so the same budget resolves the orbit near the
 * photon sphere and the long escape to the sky.
 *
 * ---------------------------------------------------------------------------
 *  THE DISC
 * ---------------------------------------------------------------------------
 *
 * The disc is a sheet of gas in the plane z = 0, but it is not a ring: the
 * ray finds it where the bent trajectory crosses that plane. Each crossing
 * contributes emission and optical depth, and the contributions are composited
 * in the order the ray meets them, which is front to back along the path. A
 * ray that winds around the hole therefore accumulates the primary image, the
 * secondary image over the shadow, and the tertiary image underneath it,
 * simply because it passes through the sheet that many times.
 *
 * At every crossing the gas is treated as a blackbody source with a
 * Keplerian temperature profile, and the light is modulated by the combined
 * gravitational and Doppler factor g. The colour is shifted by g and the
 * brightness by g^4, which is why one side of the disc is white and the other
 * is deep orange.
 */

/* -------------------------------------------------------------------------- */
/*  Vertex                                                                     */
/* -------------------------------------------------------------------------- */

export const FULLSCREEN_VERT = `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/* -------------------------------------------------------------------------- */
/*  Fragment                                                                   */
/* -------------------------------------------------------------------------- */

export const GEODESIC_FRAG = `
varying vec2 vUv;

uniform vec2  uRes;
uniform float uTime;

uniform vec3  uCamPos;
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamFwd;
uniform float uTanHalf;

uniform int   uMaxSteps;
uniform float uStepScale;
uniform int   uNoiseOctaves;

uniform float uDiskIn;
uniform float uDiskOut;
uniform float uDiskThick;
uniform float uDiskTemp;
uniform float uDiskEmission;
uniform float uDiskOpacity;
uniform float uOrbitalSpeed;
uniform float uTurbAmp;
uniform float uTurbSpeed;
uniform float uTurbScale;

uniform float uStarDensity;
uniform float uStarBright;
uniform float uGalaxyBright;

uniform int   uDebug;

#define MAX_STEPS 640
#define MAX_CROSSINGS 8
#define M_CONST 0.5
#define R_HORIZON 1.0
#define R_PHOTON 1.5
#define B_CRITICAL 2.5980762
#define PI 3.141592653589793

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                              */
/* -------------------------------------------------------------------------- */

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float valueNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);
  return mix(mix(nx00, nx10, f.y), mix(nx01, nx11, f.y), f.z);
}

float fbm(vec3 p, int octaves) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    sum += amp * valueNoise(p);
    norm += amp;
    p = p * 2.03 + vec3(11.7, 3.1, 5.9);
    amp *= 0.5;
  }
  return sum / max(norm, 1e-4);
}

vec2 rotate2(vec2 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
}

vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(vec3(0.04045), c));
}

/**
 * Blackbody colour, as a fit to the Planckian locus (Helland's approximation
 * of the CIE curve) with the two branches blended over a small window so the
 * gradient has no visible kink. The result is in sRGB and is linearised.
 */
vec3 blackbody(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  vec3 low = vec3(1.0, 0.0, 0.0);
  low.g = clamp((99.4708025861 * log(max(t, 1.0)) - 161.1195681661) / 255.0, 0.0, 1.0);
  low.b = t <= 19.0 ? 0.0 : clamp((138.5177312231 * log(max(t - 10.0, 1.0)) - 305.0447927307) / 255.0, 0.0, 1.0);
  vec3 high = vec3(0.0, 0.0, 1.0);
  high.r = clamp((329.698727446 * pow(max(t - 60.0, 0.01), -0.1332047592)) / 255.0, 0.0, 1.0);
  high.g = clamp((288.1221695283 * pow(max(t - 60.0, 0.01), -0.0755148492)) / 255.0, 0.0, 1.0);
  float blend = smoothstep(62.0, 70.0, t);
  vec3 srgb = mix(low, high, blend);
  return srgbToLinear(srgb);
}

/* -------------------------------------------------------------------------- */
/*  The sky                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Stars on a cube grid. The direction is projected onto the face of a cube it
 * points at, and each cell holds one star whose position, brightness and
 * colour are hashed from the cell index. Because the direction the sky is
 * sampled with is the direction the *bent* ray ends up pointing at, the stars
 * are lensed: near the shadow they smear into arcs and pile up into the
 * photon ring.
 */
vec3 starLayers(vec3 dir) {
  vec3 a = abs(dir);
  vec2 uv;
  float face;
  if (a.x >= a.y && a.x >= a.z) {
    uv = dir.zy / a.x;
    face = dir.x > 0.0 ? 0.0 : 1.0;
  } else if (a.y >= a.z) {
    uv = dir.xz / a.y;
    face = dir.y > 0.0 ? 2.0 : 3.0;
  } else {
    uv = dir.xy / a.z;
    face = dir.z > 0.0 ? 4.0 : 5.0;
  }

  vec3 total = vec3(0.0);
  for (int layer = 0; layer < 2; layer++) {
    float cells = (layer == 0 ? 34.0 : 68.0) * uStarDensity;
    if (cells < 1.0) continue;
    vec2 g = uv * cells;
    vec2 cell = floor(g);
    vec2 f = fract(g);
    float seed = cell.x * 127.1 + cell.y * 311.7 + face * 74.7 + float(layer) * 19.19;
    float posX = 0.16 + 0.68 * hash12(vec2(seed, 1.7));
    float posY = 0.16 + 0.68 * hash12(vec2(seed, 5.3));
    float mag = hash12(vec2(seed, 9.1));
    vec2 d = f - vec2(posX, posY);
    float radius = 0.020 + 0.055 * mag * mag;
    float core = smoothstep(radius, 0.0, length(d));
    if (core <= 0.0) continue;
    float temp = hash12(vec2(seed, 13.7));
    vec3 tint = mix(vec3(1.0, 0.72, 0.48), vec3(0.68, 0.80, 1.0), temp * temp);
    total += tint * core * (0.10 + 3.4 * mag * mag * mag) * (layer == 0 ? 1.0 : 0.55);
  }
  return total * uStarBright;
}

/**
 * A galactic band: unresolved light across one plane of the sky, broken up by
 * noise and cut by dust lanes. It is sampled with the lensed direction, so it
 * bends around the hole along with the stars.
 */
vec3 galaxyBand(vec3 dir) {
  vec3 pole = normalize(vec3(0.34, 0.87, -0.36));
  float d = dot(dir, pole);
  float band = exp(-d * d * 70.0);
  float structure = fbm(dir * 5.5 + vec3(7.3), min(uNoiseOctaves, 4));
  float dust = fbm(dir * 15.0 + vec3(2.1), min(uNoiseOctaves, 3));
  vec3 warm = vec3(1.0, 0.83, 0.62);
  vec3 cool = vec3(0.58, 0.70, 1.0);
  vec3 col = mix(cool, warm, structure) * band * (0.06 + 0.95 * structure * structure);
  col *= smoothstep(0.24, 0.60, dust);
  col += vec3(0.30, 0.40, 0.70) * band * 0.05;
  return col * uGalaxyBright * 0.42;
}

vec3 background(vec3 dir) {
  vec3 col = galaxyBand(dir) + starLayers(dir);
  col += vec3(0.0045, 0.0060, 0.0115);
  return col;
}

/* -------------------------------------------------------------------------- */
/*  The disc                                                                   */
/* -------------------------------------------------------------------------- */

/** Radial extent of the gas: a hard inner edge, a soft outer taper. */
float discRadialProfile(float r) {
  float inFade = smoothstep(uDiskIn * 0.97, uDiskIn * 1.12, r);
  float outFade = 1.0 - smoothstep(uDiskOut * 0.55, uDiskOut, r);
  return inFade * outFade;
}

/** Scale height of the sheet at radius r. The disc flares outward. */
float discHalfThickness(float r) {
  return uDiskThick * pow(max(r / uDiskIn, 1.0), 0.55);
}

/** Thin-disc temperature profile, and the brightness that follows from it. */
float discTemperature(float r) {
  return uDiskTemp * pow(uDiskIn / max(r, uDiskIn), 0.75);
}

float discBrightness(float r) {
  return pow(uDiskIn / max(r, uDiskIn), 2.0);
}

/**
 * The turbulent gas pattern. The noise is looked up in a frame that rotates
 * with the local Keplerian rate, which differs from radius to radius, so the
 * pattern is sheared into spiral filaments exactly the way real gas is.
 */
float discTurbulence(vec2 planeXY, float r, float omega) {
  float angle = -omega * uTime * uOrbitalSpeed * 3.2;
  vec2 q = rotate2(planeXY, angle) * uTurbScale;
  float n = fbm(vec3(q, uTime * uTurbSpeed * 0.28), uNoiseOctaves);
  return mix(1.0, n * 1.9, clamp(uTurbAmp, 0.0, 1.5));
}

/* -------------------------------------------------------------------------- */
/*  Debug ramps                                                                */
/* -------------------------------------------------------------------------- */

vec3 heatRamp(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 a = vec3(0.02, 0.02, 0.12);
  vec3 b = vec3(0.05, 0.35, 0.62);
  vec3 c = vec3(0.15, 0.85, 0.45);
  vec3 d = vec3(1.0, 0.92, 0.25);
  vec3 e = vec3(1.0, 0.22, 0.10);
  if (t < 0.25) return mix(a, b, t / 0.25);
  if (t < 0.5) return mix(b, c, (t - 0.25) / 0.25);
  if (t < 0.75) return mix(c, d, (t - 0.5) / 0.25);
  return mix(d, e, (t - 0.75) / 0.25);
}

/* -------------------------------------------------------------------------- */
/*  Main                                                                       */
/* -------------------------------------------------------------------------- */

void main() {
  /* --- the observation ray ------------------------------------------------ */

  vec2 ndc = vUv * 2.0 - 1.0;
  ndc.x *= uRes.x / uRes.y;
  vec3 ro = uCamPos;
  vec3 rd = normalize(uCamFwd + uCamRight * (ndc.x * uTanHalf) + uCamUp * (ndc.y * uTanHalf));

  float camRadius = length(ro);

  /* --- the plane the geodesic lives in ------------------------------------ */
  /*  A Schwarzschild geodesic is planar: it stays in the plane through the    */
  /*  centre of mass that contains the observer and the ray. e1 and e2 span   */
  /*  that plane, and the ray is described by r and phi inside it.            */

  vec3 normal = cross(ro, rd);
  float normalLength = length(normal);
  float radius = camRadius;
  float angularMomentum = 0.0;
  vec3 e1 = vec3(1.0, 0.0, 0.0);
  vec3 e2 = vec3(0.0, 1.0, 0.0);
  bool radial = normalLength < 1e-7;

  if (!radial) {
    vec3 nHat = normal / normalLength;
    e1 = ro / camRadius;
    e2 = cross(nHat, e1);
    angularMomentum = radius * dot(rd, e2);
  } else {
    e1 = ro / max(camRadius, 1e-6);
    e2 = normalize(cross(vec3(0.0, 0.0, 1.0), e1));
    if (length(cross(vec3(0.0, 0.0, 1.0), e1)) < 1e-6) e2 = vec3(1.0, 0.0, 0.0);
    angularMomentum = 0.0;
  }

  /* --- conserved quantities and the capture test --------------------------- */
  /*  E^2 = v^2 - 2 M L^2 / r^3 with |v| = 1 for the unit ray direction.      */

  float energySq = max(1.0 - angularMomentum * angularMomentum / (radius * radius * radius), 1e-6);
  float energy = sqrt(energySq);
  float impact = abs(angularMomentum) / energy;
  bool willCapture = impact < B_CRITICAL;

  /* --- integration state --------------------------------------------------- */

  float r = radius;
  float rDot = dot(rd, e1);
  float cosPhi = 1.0;
  float sinPhi = 0.0;
  float rEscape = max(28.0, camRadius * 1.3 + 8.0);

  vec3 discAccum = vec3(0.0);
  float transmittance = 1.0;
  int crossings = 0;
  float firstCrossingRadius = -1.0;
  float firstRedshift = 1.0;
  float firstDoppler = 1.0;
  bool captured = willCapture;
  bool exhausted = false;
  bool escaped = false;
  vec3 outDirection = rd;

  float zPlane0 = e1.z;   // signed height of the ray above the disc plane

  for (int i = 0; i < MAX_STEPS; i++) {
    if (i >= uMaxSteps) { exhausted = true; break; }
    if (r < R_HORIZON) { captured = true; break; }

    float dt = uStepScale * r;
    float r2 = r * r;

    /* velocity Verlet on the radial equation d2r = L^2 (r - 3M) / r^4 */
    float accel = angularMomentum * angularMomentum * (r - R_PHOTON) / (r2 * r2);
    float rDotMid = rDot + 0.5 * accel * dt;
    float rNext = r + rDotMid * dt;
    float phiStep = angularMomentum / (rNext * rNext) * dt;

    float cosNext = cosPhi - sinPhi * phiStep;
    float sinNext = sinPhi + cosPhi * phiStep;
    float norm = inversesqrt(max(cosNext * cosNext + sinNext * sinNext, 1e-9));
    cosNext *= norm;
    sinNext *= norm;

    /* --- the disc, where the bent path crosses the plane -------------------- */

    float zPlane1 = e1.z * cosNext + e2.z * sinNext;
    if ((zPlane0 <= 0.0 && zPlane1 >= 0.0) || (zPlane0 >= 0.0 && zPlane1 <= 0.0)) {
      float denom = zPlane0 - zPlane1;
      float frac = abs(denom) > 1e-9 ? clamp(zPlane0 / denom, 0.0, 1.0) : 0.5;

      float rCross = mix(r, rNext, frac);
      float cCross = mix(cosPhi, cosNext, frac);
      float sCross = mix(sinPhi, sinNext, frac);
      float cNorm = inversesqrt(max(cCross * cCross + sCross * sCross, 1e-9));
      cCross *= cNorm;
      sCross *= cNorm;

      float radialProfile = discRadialProfile(rCross);
      if (radialProfile > 0.001 && crossings < MAX_CROSSINGS) {
        /* position and direction of the ray at the crossing */
        vec3 rHat = e1 * cCross + e2 * sCross;
        vec3 phiHat = e1 * (-sCross) + e2 * cCross;
        float rDotCross = mix(rDot, rDotMid, frac);
        float phiDotCross = angularMomentum / max(rCross * rCross, 1e-6);
        vec3 vHat = normalize(rDotCross * rHat + rCross * phiDotCross * phiHat);

        /* the sheet: how much gas the ray ploughs through */
        float cosTilt = max(abs(vHat.z), 0.035);
        float pathLength = 2.0 * discHalfThickness(rCross) / cosTilt;

        /* the gas pattern, sheared by the differential rotation */
        float omega = sqrt(M_CONST / max(rCross * rCross * rCross, 1e-6));
        float turbulence = discTurbulence(rCross * rHat.xy, rCross, omega);

        float density = uDiskOpacity * turbulence *
                        exp(-1.7 * (rCross - uDiskIn) / max(uDiskOut - uDiskIn, 0.001));
        float alpha = 1.0 - exp(-density * pathLength);
        alpha *= radialProfile;

        /* relativistic factors of the gas at this radius */
        float beta = clamp(sqrt(M_CONST / max(rCross - 2.0 * M_CONST, 1e-3)) * uOrbitalSpeed, 0.0, 0.985);
        vec3 gasDirection = normalize(vec3(-rHat.y, rHat.x, 0.0) + vec3(1e-6, 0.0, 0.0));
        float approach = dot(gasDirection, -vHat);
        float gamma = inversesqrt(max(1.0 - beta * beta, 1e-6));
        float doppler = 1.0 / max(gamma * (1.0 - beta * approach), 1e-4);
        float redshift = sqrt(max(1.0 - 2.0 * M_CONST / rCross, 0.0));
        float g = redshift * doppler;

        float boost = max(pow(g, 4.0), 0.05);
        vec3 colour = blackbody(discTemperature(rCross) * g);
        float emission = uDiskEmission * discBrightness(rCross) * boost * turbulence;

        discAccum += transmittance * colour * emission * alpha;
        transmittance *= (1.0 - alpha);

        if (crossings == 0) {
          firstCrossingRadius = rCross;
          firstRedshift = redshift;
          firstDoppler = doppler;
        }
        crossings++;
      }
    }

    /* --- advance ----------------------------------------------------------- */

    float accelNext = angularMomentum * angularMomentum * (rNext - R_PHOTON) /
                      max(rNext * rNext * rNext * rNext, 1e-9);
    rDot = rDotMid + 0.5 * accelNext * dt;
    r = rNext;
    cosPhi = cosNext;
    sinPhi = sinNext;
    zPlane0 = zPlane1;

    if (r > rEscape && rDot > 0.0) {
      escaped = true;
      vec3 rHat = e1 * cosPhi + e2 * sinPhi;
      vec3 phiHat = e1 * (-sinPhi) + e2 * cosPhi;
      outDirection = normalize(rDot * rHat + r * (angularMomentum / (r * r)) * phiHat);
      break;
    }
  }

  bool sawSky = escaped && !captured;
  vec3 sky = sawSky ? background(outDirection) : vec3(0.0);
  vec3 hdr = discAccum + transmittance * sky;

  /* --- the diagnostic views ----------------------------------------------- */

  vec3 outColor = hdr;

  if (uDebug == 1) {
    /* ray termination */
    if (captured) outColor = vec3(0.85, 0.06, 0.06);
    else if (exhausted) outColor = vec3(1.0, 0.62, 0.05);
    else outColor = vec3(0.06, 0.30, 0.95);
    if (crossings > 0) outColor = mix(outColor, vec3(1.0), 0.35);
  } else if (uDebug == 2) {
    /* event horizon and the critical capture boundary */
    if (r < R_HORIZON) {
      outColor = vec3(0.0);
    } else if (impact < B_CRITICAL * 1.035) {
      outColor = vec3(1.0, 0.05, 0.85);
    } else if (impact < B_CRITICAL * 1.25) {
      outColor = vec3(0.16, 0.03, 0.30);
    } else {
      outColor = vec3(0.02, 0.05, 0.14);
    }
    if (crossings > 0) outColor += vec3(0.05, 0.35, 0.05);
  } else if (uDebug == 3) {
    /* how many times the bent ray cut the disc, and in what order */
    if (crossings == 0) outColor = vec3(0.0);
    else if (crossings == 1) outColor = vec3(0.15, 0.95, 0.30);
    else if (crossings == 2) outColor = vec3(0.95, 0.95, 0.20);
    else if (crossings == 3) outColor = vec3(1.0, 0.55, 0.10);
    else outColor = vec3(1.0, 0.12, 0.12);
  } else if (uDebug == 4) {
    /* radius of the first crossing */
    if (firstCrossingRadius < 0.0) outColor = vec3(0.0);
    else {
      float t = clamp((firstCrossingRadius - uDiskIn) / max(uDiskOut - uDiskIn, 0.001), 0.0, 1.0);
      outColor = heatRamp(t);
    }
  } else if (uDebug == 5) {
    /* gravitational redshift at the first crossing */
    if (firstCrossingRadius < 0.0) outColor = vec3(0.0);
    else {
      float t = clamp((1.0 - firstRedshift) / 0.2, 0.0, 1.0);
      outColor = mix(vec3(1.0, 0.96, 0.88), vec3(0.70, 0.06, 0.03), t);
    }
  } else if (uDebug == 6) {
    /* Doppler factor at the first crossing */
    if (firstCrossingRadius < 0.0) outColor = vec3(0.0);
    else {
      float t = clamp((firstDoppler - 1.0) / 0.7, -1.0, 1.0);
      outColor = t >= 0.0
        ? mix(vec3(1.0), vec3(0.15, 0.55, 1.0), t)
        : mix(vec3(1.0), vec3(1.0, 0.22, 0.12), -t);
    }
  } else if (uDebug == 7) {
    /* where the escaped ray points at infinity */
    if (!sawSky) outColor = vec3(0.0);
    else {
      float u = atan(outDirection.z, outDirection.x) / (2.0 * PI) + 0.5;
      float v = asin(clamp(outDirection.y, -1.0, 1.0)) / PI + 0.5;
      outColor = vec3(fract(u), fract(v), 0.28);
    }
  } else if (uDebug == 8) {
    /* the sky on its own, lensed by the same geodesics */
    outColor = sawSky ? sky : vec3(0.0);
  } else if (uDebug == 9) {
    /* the HDR frame before the tone curve */
    float luminance = dot(hdr, vec3(0.2126, 0.7152, 0.0722));
    float stops = log2(max(luminance, 1e-4) / 0.01) / 10.0;
    outColor = heatRamp(clamp(stops, 0.0, 1.0));
    if (luminance > 1.0) outColor = mix(outColor, vec3(1.0), 0.55);
  }

  gl_FragColor = vec4(max(outColor, vec3(0.0)), 1.0);
}
`;
