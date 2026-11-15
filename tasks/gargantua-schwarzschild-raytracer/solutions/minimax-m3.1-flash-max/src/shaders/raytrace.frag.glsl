// ===========================================================================
//  GARGANTUA - Schwarzschild null-geodesic raytracer (fragment stage)
// ===========================================================================
//  COORDINATES
//    * Schwarzschild spacetime in geometric units (G = c = M = 1).  The event
//      horizon therefore sits at r = 2 and the photon sphere at r = 3.
//    * The black hole is at the world origin.  The accretion disc is the
//      equatorial plane y = 0 (the world "up" axis is +Y).
//    * Spherical symmetry forces every null geodesic to stay inside the plane
//      that is spanned by the camera position and the ray direction.  The
//      trajectory is therefore integrated inside that plane with the Binet
//      equation for null geodesics in Schwarzschild spacetime:
//
//          d2u/dphi2 + u = 3 M u^2 ,        u = 1/r
//
//      which is equivalent to the first integral
//
//          (du/dphi)^2 = 1/b^2 - u^2 (1 - 2 M u)
//
//      with b the impact parameter and phi the Schwarzschild coordinate angle
//      measured from the camera radial direction inside that plane.
//
//  STATE
//    * u = 1/r and v = du/dphi are advanced with a classical RK4 integrator.
//    * The 3D position is reconstructed from the plane basis:
//          P(phi) = r(phi) * ( cos(phi) * e1 + sin(phi) * e2 )
//      with e1 the camera radial unit vector and e2 the in-plane transverse
//      unit vector of the ray (the axis of the orbital plane is e1 x e2).
//
//  TERMINATION
//    * r <= 2 M          -> the ray crossed the event horizon (captured, the
//                          horizon interior stays perfectly black).
//    * r >= R_ESCAPE     -> the ray escaped to infinity; the background sky is
//                          sampled with the asymptotic direction
//                          ( cos(phi), sin(phi) ) inside the orbital plane.
//    * step budget spent -> the ray is treated as captured (this only happens
//                          for rays that asymptotically approach the photon
//                          sphere and never leave the vicinity of r = 3).
//
//  ACCRETION DISC
//    * The disc is a volumetric slab |y| <= h between r_in and r_out.  Its
//      emission and its extinction are integrated *along the curved
//      trajectory*, so a single pixel can collect several disc crossings
//      (primary image, secondary image and higher order rings) in path order.
//    * The photon frequency shift of every disc element combines the
//      gravitational redshift of the static emitter with the special
//      relativistic Doppler effect of the Keplerian orbital motion:
//
//          g = sqrt(1 - 2M/r - r^2 Omega^2) / ( (1 - b L_y Omega) sqrt(1 - 2M/r_cam) )
//
//      The observed bolometric intensity scales with g^4 (Liouville) and the
//      observed blackbody temperature scales with g.
// ===========================================================================

precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;     // internal render resolution (px)
uniform vec3  uCamPos;         // camera position in world units (M)
uniform mat3  uCamBasis;       // columns: right, up, forward
uniform float uTanHalfFov;     // tan(fov/2)

uniform float uTime;           // simulation time (s)
uniform float uDiskInner;      // inner radius (M)
uniform float uDiskOuter;      // outer radius (M)
uniform float uDiskHalf;       // disc half thickness (M)
uniform float uDiskTemp;       // peak disc temperature (K)
uniform float uDiskIntensity;  // disc emission scale
uniform float uDiskSigma;      // disc extinction coefficient (1/M)
uniform float uOrbitSpeed;     // orbital speed multiplier
uniform float uTurbAmp;        // turbulence amplitude
uniform float uTurbSpeed;      // turbulence advection multiplier
uniform float uStarDensity;    // procedural star density
uniform float uStarBrightness; // procedural star brightness
uniform float uGalaxyBright;   // procedural galaxy brightness

uniform int   uDebug;          // 0..9 diagnostic view
uniform int   uMaxSteps;       // geodesic integration budget
uniform float uStepPhi;        // base integration step in radians
uniform int   uStarLayers;     // procedural sky octaves (quality)

const float M        = 1.0;
const float HORIZON  = 2.0;      // r = 2M event horizon
const float R_ESCAPE = 60.0;     // radius at which a ray is declared escaped
const float B_EPS    = 0.02;     // below this impact parameter the ray is radial
const float PI       = 3.141592653589793;
const vec3  GAL_N    = vec3(0.786, 0.251, -0.567); // galactic pole (tilted w.r.t. the disc)

// ---------------------------------------------------------------------------
//  Hash / noise helpers
// ---------------------------------------------------------------------------
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

float vnoise(vec3 x) {
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
  return mix(mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
             mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y), f.z);
}

float fbm(vec3 p, int octaves) {
  float amp = 0.5;
  float sum = 0.0;
  for (int i = 0; i < octaves; i++) {
    sum += amp * vnoise(p);
    p = p * 2.03 + vec3(17.1, 5.7, 11.3);
    amp *= 0.5;
  }
  return sum;
}

// ---------------------------------------------------------------------------
//  Colour helpers
// ---------------------------------------------------------------------------
vec3 srgbToLinear(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
}

// Blackbody colour, Tanner Helland's analytic fit of the Planckian locus
// (1000 K .. 40000 K), converted to linear Rec.709 and normalised to a peak
// of 1 so that it can be scaled by an arbitrary radiance.
vec3 blackbodyRGB(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  vec3 c;
  if (t <= 66.0) {
    c.r = 1.0;
    c.g = clamp((99.4708025861 * log(t) - 161.1195681661) / 255.0, 0.0, 1.0);
  } else {
    c.r = clamp((329.698727446 * pow(t - 60.0, -0.1332047592)) / 255.0, 0.0, 1.0);
    c.g = clamp((288.1221695283 * pow(t - 60.0, -0.0755148492)) / 255.0, 0.0, 1.0);
  }
  if (t >= 66.0) {
    c.b = 1.0;
  } else if (t <= 19.0) {
    c.b = 0.0;
  } else {
    c.b = clamp((138.5177312231 * log(t - 10.0) - 305.0447927307) / 255.0, 0.0, 1.0);
  }
  return srgbToLinear(c);
}

// ---------------------------------------------------------------------------
//  Procedural sky: stars + galactic band (no textures, no cubemaps)
// ---------------------------------------------------------------------------
float starLayer(vec3 dir, float scale, float threshold, float sharp) {
  vec3 p = dir * scale;
  vec3 ip = floor(p);
  vec3 fp = p - ip;
  float acc = 0.0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      for (int z = -1; z <= 1; z++) {
        vec3 o = vec3(float(x), float(y), float(z));
        vec3 h = hash33(ip + o);
        if (h.z < threshold) continue;
        vec3 sp = o + 0.12 + 0.76 * h.xyz;
        float d = length(fp - sp);
        acc += (0.30 + 0.70 * h.x) * exp(-d * d * sharp);
      }
    }
  }
  return acc;
}

vec3 proceduralSky(vec3 dir) {
  vec3 col = vec3(0.0035, 0.0045, 0.0090); // deep space floor

  // --- galactic band -----------------------------------------------------
  float lat = dot(dir, GAL_N);
  float band = exp(-lat * lat * 5.5);
  float n = fbm(dir * 2.7, max(uStarLayers - 1, 2));
  float dust = fbm(dir * 6.4 + 13.0, 2);
  float g = band * (0.30 + 0.95 * n) * (1.0 - 0.42 * smoothstep(0.10, 0.62, dust));
  vec3 galaxyTint = mix(vec3(0.09, 0.12, 0.23), vec3(0.32, 0.26, 0.19), n);
  col += galaxyTint * g * uGalaxyBright;

  // --- stars -------------------------------------------------------------
  float density = clamp(uStarDensity, 0.0, 1.0);
  float s1 = starLayer(dir, 46.0, 1.0 - 0.135 * density, 620.0);
  float s2 = 0.0;
  if (uStarLayers > 1) {
    s2 = starLayer(dir, 118.0, 1.0 - 0.075 * density, 2400.0);
  }
  float s3 = 0.0;
  if (uStarLayers > 2) {
    s3 = starLayer(dir, 260.0, 1.0 - 0.040 * density, 9000.0);
  }
  float total = s1 + 0.75 * s2 + 0.55 * s3;
  // stellar colour: hot blue-white through cool amber
  float tempMix = hash13(floor(dir * 46.0) + 3.0);
  vec3 starTint = mix(vec3(1.0, 0.72, 0.42), vec3(0.72, 0.82, 1.0), smoothstep(0.25, 0.85, tempMix));
  col += starTint * total * uStarBrightness * (0.9 + 2.6 * density);
  return col;
}

// ---------------------------------------------------------------------------
//  Disc physics
// ---------------------------------------------------------------------------

// Radial temperature profile of a thin accretion disc (Shakura-Sunyaev like)
// plus a hot inner rim, normalised to a peak of roughly one.
float diskShape(float r) {
  float x = clamp(uDiskInner / max(r, uDiskInner), 0.0, 1.0);
  float s = pow(x, 0.75) * pow(max(1.0 - sqrt(x), 0.0), 0.25);
  s += 0.34 * exp(-max(r - uDiskInner, 0.0) / max(0.22 * uDiskInner, 0.05));
  return clamp(s / 0.62, 0.0, 1.7);
}

// Keplerian orbital angular velocity of the disc (scaled by the orbit speed
// multiplier) and the corresponding time dilation factor.
float discOmega(float r) {
  return uOrbitSpeed * sqrt(M / max(r * r * r, 1e-4));
}

// Turbulent density modulation.  The sample is advected with the local
// Keplerian flow (the differential rotation shears the pattern) and sampled
// from a 3D value-noise field, so the filaments are physical structures with
// a characteristic size of about one gravitational radius.
float discTurbulence(float r, float azimuth, float omega, vec3 P) {
  // The pattern is advected with the local Keplerian flow, so the
  // differential rotation shears it exactly like the disc material.
  float phase = azimuth - omega * uTime * uTurbSpeed;
  // The noise is sampled in cylindrical coordinates: it varies quickly in
  // radius and slowly in angle, which produces the radial filaments that
  // accretion disc turbulence shows.
  float cs = 3.0;
  vec3 q = vec3(cos(phase) * cs, sin(phase) * cs, r * 1.15);
  float w1 = vnoise(q * 0.6 + 5.3);
  float w2 = vnoise(q * 0.6 + 19.7);
  q += vec3(w1, w2, w1 * w2) * 1.05;
  float n = fbm(q, max(uStarLayers, 2));
  float d = 1.0 + uTurbAmp * (n * 2.0 - 1.0);
  // two faint trailing density waves
  float arms = sin(2.0 * azimuth + 2.4 * log(max(r, 1.0)) - 2.0 * omega * uTime * uTurbSpeed);
  d *= 1.0 + 0.16 * uTurbAmp * arms;
  return max(d, 0.0);
}

// ---------------------------------------------------------------------------
//  Trace result
// ---------------------------------------------------------------------------
//  The disc crossing records are kept in plain global arrays: writing into an
//  array that is a member of a struct is not portable (some drivers report
//  "array reference cannot be used as an l-value" and fail to unroll).
vec3  gHitPos[6];    // disc crossing positions (diagnostics)
float gHitRed[6];   // redshift factor of each crossing
float gHitTemp[6];  // observed temperature of each crossing
int   gDiskCount;   // number of recorded disc crossings

struct Trace {
  vec3  color;        // HDR radiance collected along the ray
  float steps;        // number of integration steps
  float status;       // 0 escaped, 1 captured by the horizon, 2 budget spent
  float closestR;     // minimum radius reached
  float deflection;   // total swept angle phi (rad)
  float rCam;         // camera radius
  vec3  skyDir;       // asymptotic escape direction
  vec3  lhat;         // orbital plane axis (angular momentum direction)
  float redshift;     // redshift factor of the first crossing
  float tempObs;      // observed temperature of the first crossing
  float density;      // turbulence density of the first crossing
};

// RK4 step of  u' = v ,  v' = -u + 3 M u^2   with respect to phi.
void rk4(inout float u, inout float v, float h) {
  float k1u = v;
  float k1v = -u + 3.0 * M * u * u;
  float u2 = u + 0.5 * h * k1u;
  float v2 = v + 0.5 * h * k1v;
  float k2u = v2;
  float k2v = -u2 + 3.0 * M * u2 * u2;
  float u3 = u + 0.5 * h * k2u;
  float v3 = v + 0.5 * h * k2v;
  float k3u = v3;
  float k3v = -u3 + 3.0 * M * u3 * u3;
  float u4 = u + h * k3u;
  float v4 = v + h * k3v;
  float k4u = v4;
  float k4v = -u4 + 3.0 * M * u4 * u4;
  u += (h / 6.0) * (k1u + 2.0 * k2u + 2.0 * k3u + k4u);
  v += (h / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
}

// ---------------------------------------------------------------------------
//  The actual geodesic integration
// ---------------------------------------------------------------------------
Trace traceGeodesic(vec3 camPos, vec3 rayDir) {
  // Every field is initialised through the struct constructor: some drivers
  // warn about partially initialised struct return values.
  Trace tr = Trace(vec3(0.0), 0.0, 0.0, 0.0, 0.0, 0.0, vec3(0.0), vec3(0.0, 1.0, 0.0), 1.0, 0.0, 0.0);
  tr.rCam = length(camPos);
  tr.closestR = tr.rCam;
  tr.skyDir = rayDir;
  gDiskCount = 0;
  gHitPos[0] = vec3(0.0); gHitPos[1] = vec3(0.0); gHitPos[2] = vec3(0.0);
  gHitPos[3] = vec3(0.0); gHitPos[4] = vec3(0.0); gHitPos[5] = vec3(0.0);
  gHitRed[0] = 1.0; gHitRed[1] = 1.0; gHitRed[2] = 1.0;
  gHitRed[3] = 1.0; gHitRed[4] = 1.0; gHitRed[5] = 1.0;
  gHitTemp[0] = 0.0; gHitTemp[1] = 0.0; gHitTemp[2] = 0.0;
  gHitTemp[3] = 0.0; gHitTemp[4] = 0.0; gHitTemp[5] = 0.0;

  float r0 = tr.rCam;
  vec3 e1 = camPos / max(r0, 1e-6);
  float cosA = clamp(dot(rayDir, e1), -1.0, 1.0);
  float sinA = sqrt(max(0.0, 1.0 - cosA * cosA));
  float f0 = max(1.0 - 2.0 * M / max(r0, 1.0), 1e-6);

  // Impact parameter for a static observer: b = r sin(alpha) / sqrt(1 - 2M/r).
  float b = r0 * sinA / sqrt(f0);

  // --- degenerate, nearly radial rays -------------------------------------
  // For b -> 0 the Binet equation degenerates (du/dphi -> infinity).  Such a
  // ray has no deflection at all: it either falls straight into the horizon
  // or leaves along a straight line.
  if (b < B_EPS) {
    if (cosA < 0.0) {
      tr.status = 1.0;                     // captured by the horizon
      tr.closestR = min(r0, HORIZON);
      tr.color = vec3(0.0);
    } else {
      tr.status = 0.0;                     // escaped, no deflection
      tr.skyDir = rayDir;
      tr.color = proceduralSky(rayDir);
    }
    return tr;
  }

  vec3 e2 = normalize(rayDir - cosA * e1);
  vec3 lhat = normalize(cross(e1, e2));
  tr.lhat = lhat;

  // --- initial conditions --------------------------------------------------
  float u = 1.0 / r0;
  float v = -cosA / b;          // du/dphi at the camera
  float phi = 0.0;

  vec3  accum = vec3(0.0);
  float trans = 1.0;            // transmittance through the disc
  float prevY = r0 * e1.y;      // y coordinate at the end of the previous step
  float prevREnd = r0;
  float prevPhiEnd = 0.0;
  float prevV = v;

  for (int i = 0; i < uMaxSteps; i++) {
    float r = 1.0 / max(u, 1e-9);
    float drdphi = -u * u * v;

    // ---- step size --------------------------------------------------------
    float h = uStepPhi;
    // The flow around the photon sphere (u = 1/3) is exponentially unstable,
    // so the step is refined there to keep the critical structure sharp.
    float dU = abs(u - 1.0 / (3.0 * M));
    h *= mix(0.30, 1.0, clamp(dU * 9.0, 0.0, 1.0));
    // Near the disc the step is refined so that the vertical structure of the
    // slab and the radial structure of the temperature and Doppler profiles
    // stay resolved.
    float Ay = cos(phi) * e1.y + sin(phi) * e2.y;
    float By = -sin(phi) * e1.y + cos(phi) * e2.y;
    float dydphi = drdphi * Ay + r * By;
    float yNow = r * Ay;
    if (abs(yNow) < 4.0 * uDiskHalf && r < uDiskOuter + 2.0 && r > uDiskInner - 2.0) {
      // The height may only change slowly inside one step, otherwise a
      // crossing of the disc plane could be missed or located badly.
      float hSlab = (0.25 * uDiskHalf) / max(abs(dydphi), 1e-5);
      h = min(h, max(hSlab, uStepPhi * 0.02));
    }
    if (h <= 0.0) break;

    // ---- RK4 integration step --------------------------------------------
    rk4(u, v, h);
    phi += h;
    tr.steps += 1.0;

    if (u <= 0.0) { u = 1e-9; }             // r -> infinity guard
    float rNew = 1.0 / u;
    tr.closestR = min(tr.closestR, rNew);

    // ---- event horizon ----------------------------------------------------
    if (rNew <= HORIZON) {
      tr.status = 1.0;
      tr.deflection = phi;
      tr.color = accum;
      return tr;
    }

    float yEnd = rNew * (cos(phi) * e1.y + sin(phi) * e2.y);

    // ---- disc emission along the curved path --------------------------------
    // The disc is an optically thick, geometrically thin sheet in the plane
    // y = 0 with a Gaussian vertical profile of half thickness h.  Every
    // crossing of the disc plane is detected from the sign change of the
    // height and the crossing point is interpolated inside the step.  The
    // Gaussian weighted chord that the ray cuts through the sheet is obtained
    // from the analytic vertical slope at the crossing, so the emission is a
    // smooth function of the ray and free of sampling artefacts.
    // Crossings are collected in path order, which is what produces the
    // secondary and the higher order images of the disc.
    if (prevY * yEnd < 0.0) {
      float t = prevY / (prevY - yEnd);
      float rHit = mix(prevREnd, rNew, t);
      float phiHit = mix(prevPhiEnd, phi, t);
      if (rHit > uDiskInner && rHit < uDiskOuter) {
        vec3 P = rHit * (cos(phiHit) * e1 + sin(phiHit) * e2);
        float azimuth = atan(P.z, P.x);
        float omega = discOmega(rHit);
        float turb = discTurbulence(rHit, azimuth, omega, P);

        // analytic vertical slope of the trajectory at the crossing
        float vHit = mix(prevV, v, t);
        float uHit = 1.0 / rHit;
        float drHit = -uHit * uHit * vHit;
        float AyH = cos(phiHit) * e1.y + sin(phiHit) * e2.y;
        float ByH = -sin(phiHit) * e1.y + cos(phiHit) * e2.y;
        float dydphiH = drHit * AyH + rHit * ByH;
        float dldphiH = sqrt(drHit * drHit / max(1.0 - 2.0 * M / rHit, 1e-4) + rHit * rHit);
        float dyds = dydphiH / max(dldphiH, 1e-6);
        // gaussian weighted chord through the sheet
        float chord = min(uDiskHalf * 1.7724539 / max(abs(dyds), 2.0e-4), 60.0);

        // --- redshift / Doppler ---------------------------------------------
        float orb = rHit * rHit * omega * omega;
        float f = max(1.0 - 2.0 * M / rHit - orb, 1e-4);
        float doppler = 1.0 - b * lhat.y * omega;
        float g = sqrt(f) / (doppler * sqrt(f0));
        float tempEm = uDiskTemp * diskShape(rHit);
        float tempOb = max(g * tempEm, 60.0);

        vec3 emit = blackbodyRGB(tempOb) * (g * g * g * g) * uDiskIntensity * turb * chord;
        accum += trans * emit;
        trans *= exp(-uDiskSigma * turb * chord);

        if (gDiskCount == 0) {
          tr.redshift = g;
          tr.tempObs = tempOb;
          tr.density = turb;
        }
        if (gDiskCount < 6) {
          gHitPos[gDiskCount] = P;
          gHitRed[gDiskCount] = g;
          gHitTemp[gDiskCount] = tempOb;
          gDiskCount += 1;
        }
      }
    }
    prevY = yEnd;
    prevREnd = rNew;
    prevPhiEnd = phi;
    prevV = v;

    // --- escape to infinity -------------------------------------------------
    if (rNew >= R_ESCAPE) {
      tr.status = 0.0;
      tr.deflection = phi;
      vec3 sky = cos(phi) * e1 + sin(phi) * e2;
      tr.skyDir = sky;
      tr.color = accum + trans * proceduralSky(sky);
      return tr;
    }

    if (trans < 0.004) {          // the disc is opaque here, nothing behind it
      tr.status = 1.0;
      tr.deflection = phi;
      tr.color = accum;
      return tr;
    }
  }

  // --- integration budget exhausted ----------------------------------------
  tr.status = 2.0;
  tr.deflection = phi;
  tr.color = accum;
  return tr;
}

// ---------------------------------------------------------------------------
//  Diagnostic views
// ---------------------------------------------------------------------------
vec3 heat(float t) {
  t = clamp(t, 0.0, 1.0);
  return clamp(vec3(1.5 * t - 0.35, 1.6 * t * (1.0 - t) * 2.2 + 0.25 * t,
                     1.3 * (1.0 - t) * (1.0 - t) + 0.15), 0.0, 1.0);
}

vec3 debugView(Trace tr, vec3 beauty, vec2 uv) {
  if (uDebug == 1) {
    // integration effort + termination reason
    float s = clamp(tr.steps / max(float(uMaxSteps), 1.0), 0.0, 1.0);
    vec3 c = heat(s);
    if (tr.status == 1.0) c = mix(c, vec3(0.85, 0.05, 0.05), 0.65);
    if (tr.status == 2.0) c = mix(c, vec3(0.9, 0.75, 0.05), 0.65);
    return c;
  }
  if (uDebug == 2) {
    // event horizon / capture mask, the critical curve shows up as the sharp
    // white rim where the deflection exceeds pi
    if (tr.status == 1.0) return vec3(0.02, 0.0, 0.03);
    vec3 c = vec3(0.06, 0.08, 0.16);
    float ring = smoothstep(0.55, 0.62, tr.closestR / 3.0) * (1.0 - smoothstep(0.62, 0.72, tr.closestR / 3.0));
    c += vec3(1.0, 0.85, 0.4) * ring * 0.9;
    c += vec3(0.10, 0.30, 0.55) * clamp(tr.deflection / (4.0 * PI), 0.0, 1.0);
    return c;
  }
  if (uDebug == 3) {
    // disc crossings and their order along the ray
    vec3 c = vec3(0.03, 0.04, 0.07);
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv * 2.0 - 1.0;
    for (int i = 0; i < 6; i++) {
      if (i < gDiskCount) {
        vec3 d = gHitPos[i] - uCamPos;
        float z = dot(d, uCamBasis[2]);
        if (z > 0.0) {
          vec2 ndc = vec2(dot(d, uCamBasis[0]) / (z * uTanHalfFov * aspect),
                          dot(d, uCamBasis[1]) / (z * uTanHalfFov));
          float d2 = length((p - ndc) * vec2(aspect, 1.0));
          float marker = smoothstep(0.035, 0.0, d2);
          vec3 tint = 0.5 + 0.5 * cos(vec3(0.0, 2.1, 4.2) + float(i) * 1.1);
          c += tint * marker * 1.6;
        }
      }
    }
    return c;
  }
  if (uDebug == 4) {
    // redshift / Doppler factor of the disc hits
    if (gDiskCount == 0) return vec3(0.02);
    float g = tr.redshift;
    vec3 cool = vec3(0.15, 0.25, 1.0);
    vec3 warm = vec3(1.0, 0.55, 0.12);
    vec3 c = mix(cool, warm, clamp((g - 0.35) / 1.65, 0.0, 1.0));
    c *= 0.35 + 0.65 * clamp(g, 0.0, 1.4);
    return c;
  }
  if (uDebug == 5) {
    // background lensing coordinates: the asymptotic direction seen as an
    // equirectangular checkerboard, warped by the geodesics
    vec3 d = tr.skyDir;
    float u = atan(d.z, d.x) / (2.0 * PI) + 0.5;
    float v = acos(clamp(d.y, -1.0, 1.0)) / PI;
    vec2 g = floor(vec2(u, v) * vec2(48.0, 24.0));
    float chk = mod(g.x + g.y, 2.0);
    vec3 c = mix(vec3(0.08, 0.10, 0.16), vec3(0.34, 0.42, 0.58), chk);
    c *= 0.35 + 0.65 * clamp(tr.deflection / (2.0 * PI), 0.0, 1.0);
    return c;
  }
  if (uDebug == 6) {
    // procedural star / galaxy background, sampled without lensing
    float aspect = uResolution.x / uResolution.y;
    vec3 rd = normalize(uCamBasis[2]
                      + uCamBasis[0] * ((uv.x * 2.0 - 1.0) * uTanHalfFov * aspect)
                      + uCamBasis[1] * ((uv.y * 2.0 - 1.0) * uTanHalfFov));
    return proceduralSky(rd) * 6.0;
  }
  if (uDebug == 7) {
    // raw pre-post-processing radiance (log encoded)
    float l = dot(beauty, vec3(0.2126, 0.7152, 0.0722));
    float e = log2(1.0 + max(l, 0.0) * 64.0) / 8.0;
    return heat(clamp(e, 0.0, 1.0)) * max(l, 0.0) * 2.0;
  }
  if (uDebug == 8) {
    // disc temperature and turbulent density of the first crossing
    if (gDiskCount == 0) return vec3(0.02, 0.02, 0.03);
    float t = clamp(tr.tempObs / 20000.0, 0.0, 1.0);
    vec3 c = blackbodyRGB(max(tr.tempObs, 1200.0));
    c *= 0.35 + 0.9 * t;
    c *= clamp(tr.density, 0.0, 2.0) * 0.7;
    return c;
  }
  if (uDebug == 9) {
    // closest approach radius -> the photon ring / critical structure
    float x = clamp((log(max(tr.closestR, 1.0)) - log(2.0)) / (log(20.0) - log(2.0)), 0.0, 1.0);
    vec3 c = heat(1.0 - x);
    float crit = 1.0 - smoothstep(0.0, 0.06, abs(tr.closestR - 3.0));
    c += vec3(1.0, 0.9, 0.5) * crit * 0.8;
    return c;
  }
  return beauty;
}

// ---------------------------------------------------------------------------
//  main
// ---------------------------------------------------------------------------
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;

  vec2 ndc = uv * 2.0 - 1.0;
  vec3 rd = normalize(uCamBasis[2]
                    + uCamBasis[0] * (ndc.x * uTanHalfFov * aspect)
                    + uCamBasis[1] * (ndc.y * uTanHalfFov));

  Trace tr = traceGeodesic(uCamPos, rd);

  if (uDebug == 0) {
    fragColor = vec4(max(tr.color, vec3(0.0)), 1.0);
  } else {
    // Diagnostic views are authored in display space.
    vec3 d = debugView(tr, tr.color, uv);
    fragColor = vec4(pow(clamp(d, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
  }
}
