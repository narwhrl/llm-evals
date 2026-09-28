// =========================================================================
// GARGANTUA — Schwarzschild null geodesic raytracer fragment shader.
// -------------------------------------------------------------------------
// Boyer-Lindquist-style Schwarzschild coordinates with metric
//     ds^2 = -f(r) dt^2 + f(r)^-1 dr^2 + r^2 (dtheta^2 + sin^2(theta) dphi^2)
// and f(r) = 1 - r_s / r.  Geometrized units (G = c = 1), r_s = 1.
//
// Per pixel we build a static-observer orbit-plane basis
//   e_r  = normalize(cameraPos)              (radial at observer)
//   e_t  = normalize(d - e_r*dot(d, e_r))    (perp, same direction as d's
//                                            in-plane component — already
//                                            encodes the sign of dphi)
// and integrate dr/dlambda, dv_r/dlambda, dphi/dlambda with positive
// affine parameter lambda:
//
//   dr/dlambda    = v_r
//   dv_r/dlambda  = (L^2 / r^4) * (r - 1.5 r_s)
//   dphi/dlambda  = L / r^2
//
// The conserved orbital-plane angular momentum is non-negative:
//   L = r0 * sinTheta / sqrt(f(r0))
// Direction of dphi is fixed by eTangent alone (no eNormal, no sign
// ambiguity).  Disk crossings: a single "crossing" is one independent
// time the geodesic enters the slab |y| <= diskHalfThickness from
// outside; subsequent in-slab segments contribute density without
// advancing crossingCount.  Re-entry opens a higher-order crossing.
//
// Background sampling is reserved for true ESCAPED termination only —
// saturation breaks and step-budget exhaustion never fake an escape.
// =========================================================================

precision highp float;

uniform vec2  u_resolution;
uniform vec3  u_cameraPos;
uniform vec3  u_cameraRight;
uniform vec3  u_cameraUp;
uniform vec3  u_cameraForward;
uniform float u_cameraFovY;
uniform float u_time;
uniform int   u_quality;
uniform int   u_debug;

uniform float u_cameraDistance;
uniform float u_cameraAzimuth;
uniform float u_cameraElevation;

uniform float u_diskInner;
uniform float u_diskOuter;
uniform float u_diskHalfThickness;
uniform float u_diskTemperature;
uniform float u_diskEmission;
uniform float u_orbitalSpeed;
uniform float u_turbulenceAmplitude;
uniform float u_turbulenceSpeed;
uniform float u_starDensity;
uniform float u_galaxyBrightness;

uniform float u_bloomIntensity;
uniform float u_bloomThreshold;
uniform int  u_maxSteps;
uniform int  u_maxCrossings;
uniform float u_pixelScale;

const float RS = 1.0;

const int TERM_RUNNING   = 0;
const int TERM_CAPTURED  = 1;
const int TERM_ESCAPED   = 2;
const int TERM_EXHAUSTED = 3;

// ----- integer math shims (GLSL ES 1.0 has no int min/max) --------------

int imin(int a, int b) { return a < b ? a : b; }
int imax(int a, int b) { return a > b ? a : b; }

// ----- hash / noise ------------------------------------------------------

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash13(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float noise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  float nx00 = mix(n000, n100, u.x);
  float nx10 = mix(n010, n110, u.x);
  float nx01 = mix(n001, n101, u.x);
  float nx11 = mix(n011, n111, u.x);
  float nxy0 = mix(nx00, nx10, u.y);
  float nxy1 = mix(nx01, nx11, u.y);
  return mix(nxy0, nxy1, u.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; ++i) {
    v += a * noise3(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

// ----- physics helpers ---------------------------------------------------

float fOfR(float r) {
  return 1.0 - RS / r;
}

// Build the static-observer orbit-plane basis.  eTangent is the unit
// projection of d into the plane perpendicular to e_r; for nearly-radial
// d, fall back to (world-up x e_r).
void buildOrbitBasis(vec3 d, out vec3 eRadial, out vec3 eTangent) {
  eRadial = normalize(u_cameraPos);
  vec3 dPerp = d - eRadial * dot(d, eRadial);
  float perpLen = length(dPerp);
  if (perpLen < 1e-4) {
    vec3 helper = (abs(eRadial.y) < 0.9)
      ? vec3(0.0, 1.0, 0.0)
      : vec3(1.0, 0.0, 0.0);
    eTangent = normalize(cross(helper, eRadial));
  } else {
    eTangent = dPerp / perpLen;
  }
}

vec3 temperatureColor(float T) {
  // Black-body-ish palette: red-orange to orange-white, with the warm
  // tones dominating so the inner disk reads as hot orange instead of
  // bleach white.  Mixing toward `hot` only happens at T > 1.4 (rare).
  vec3 deep   = vec3(0.70, 0.18, 0.05);  // dim outer rim
  vec3 warm   = vec3(1.00, 0.55, 0.20);  // mid disk
  vec3 bright = vec3(1.00, 0.72, 0.30);  // inner disk (still warm)
  if (T < 0.5) return mix(deep, warm, clamp(T * 2.0, 0.0, 1.0));
  if (T < 1.2) return mix(warm, bright, clamp((T - 0.5) / 0.7, 0.0, 1.0));
  return mix(bright, vec3(1.00, 0.86, 0.55), clamp((T - 1.2) / 0.8, 0.0, 1.0));
}

// Disk emissive density at cylindrical radius rho, vertical distance y.
float diskDensity(float rho, float y, float phi) {
  if (rho < u_diskInner || rho > u_diskOuter) return 0.0;
  float halfT = max(u_diskHalfThickness, 1e-3);
  float vert = exp(- (y * y) / (halfT * halfT));
  float rNorm = (rho - u_diskInner) / max(u_diskOuter - u_diskInner, 1e-3);
  float radial = smoothstep(0.0, 0.12, rNorm) *
                 (1.0 - smoothstep(0.78, 1.0, rNorm));
  vec3 q = vec3(cos(phi) * rho * 1.2,
                y * 4.0,
                sin(phi) * rho * 1.2);
  q.x += u_turbulenceAmplitude * 2.0 *
         sin(u_time * u_turbulenceSpeed + rho * 0.8);
  float turb = fbm(q + vec3(0.0, 0.0, u_time * u_turbulenceSpeed * 0.5));
  return radial * vert * (0.45 + 1.0 * turb);
}

// Schwarzschild Keplerian orbital speed (beta = v/c, proper time).
float orbitalBeta(float r) {
  float denom = 2.0 * (r - RS);
  if (denom <= 0.0) return 0.0;
  return clamp(sqrt(RS / denom), 0.0, 0.85);
}

vec3 sampleStars(vec3 dIn) {
  // Per-pixel angular direction to sample the sky.
  vec3 d = normalize(dIn);
  float lat = asin(clamp(d.y, -1.0, 1.0));
  float lon = atan(d.z, d.x);

  // Star field: each lat/lon cell is allowed at most ONE star with a
  // per-level hit threshold and Gaussian angular sigma.  Thresholds and
  // sigmas are tuned so a desktop viewport sees only tens of stars.
  vec3 star = vec3(0.0);
  // level 0/1/2 thresholds (.9985, .9992, .9997) — coarser levels are
  // sparser because they cover the whole sphere.
  // level 0/1/2 sigma in radians — level 0 ~ 1-3 screen pixels, finer
  // levels get smaller stars but same overall density weight.
  for (int level = 0; level < 3; ++level) {
    float scale = pow(2.0, float(level));
    float cellsPerRad = 60.0 * scale;
    vec2 coord = vec2(lat * cellsPerRad, lon * cellsPerRad);

    float threshold;
    float sigma;
    if (level == 0) { threshold = 0.9985; sigma = 0.0015; }
    else if (level == 1) { threshold = 0.9992; sigma = 0.0009; }
    else { threshold = 0.9997; sigma = 0.0005; }

    for (int oy = -1; oy <= 1; ++oy) {
      for (int ox = -1; ox <= 1; ++ox) {
        vec2 cell = floor(coord) + vec2(float(ox), float(oy));
        float h = hash13(vec3(cell, float(level) * 11.0));
        if (h < threshold) continue;

        vec2 jitter = vec2(
          hash13(vec3(cell + 0.13, float(level))) - 0.5,
          hash13(vec3(cell + 0.27, float(level))) - 0.5
        ) * 0.9 / cellsPerRad;
        float seedLat = (cell.x + 0.5) / cellsPerRad + jitter.x;
        float seedLon = (cell.y + 0.5) / cellsPerRad + jitter.y;

        float sLat = clamp(seedLat, -1.5707963, 1.5707963);
        float sLon = seedLon;
        float cosB = sin(sLat) * sin(lat) +
                     cos(sLat) * cos(lat) * cos(lon - sLon);
        cosB = clamp(cosB, -1.0, 1.0);
        float angSep = acos(cosB);
        float bright = exp(- (angSep * angSep) / (sigma * sigma));
        // Magnitude spread: most stars dim, occasional bright pinpoints.
        float mag = mix(0.25, 1.2, hash11(h * 31.0));
        bright *= mag;
        vec3 tint = mix(vec3(1.0, 0.85, 0.7),
                        vec3(0.7, 0.85, 1.0),
                        hash11(h * 7.0));
        star += bright * tint;
      }
    }
  }
  star *= clamp(u_starDensity, 0.0, 6.0) * 0.9;

  // Galactic band: noisy thick band along the y axis.  Smooth latitudinal
  // dependence.
  float band = exp(-pow(d.y * 4.5, 2.0));
  vec3 gp = d * 4.0;
  float n = fbm(gp) * 0.7 + fbm(gp * 2.1) * 0.3;
  vec3 galaxy = vec3(0.22, 0.20, 0.32) * band * (0.4 + 1.6 * n);
  galaxy *= u_galaxyBrightness;

  return star + galaxy;
}

// Unified slab intersection for an arbitrary segment [A, B]: returns the
// clamped, in-segment parameter range over which |y| <= h.
void slabRange(float yA, float yB, float h, out float tLo, out float tHi) {
  tLo = 0.0;
  tHi = 0.0;
  float dy = yB - yA;
  if (abs(dy) < 1e-7) {
    if (abs(yA) <= h) { tLo = 0.0; tHi = 1.0; }
    return;
  }
  float tPlus  = ( h - yA) / dy;
  float tMinus = (-h - yA) / dy;
  float lo = (tPlus < tMinus) ? tPlus : tMinus;
  float hi = (tPlus > tMinus) ? tPlus : tMinus;
  tLo = clamp(lo, 0.0, 1.0);
  tHi = clamp(hi, 0.0, 1.0);
  if (tHi < tLo) {
    float tmp = tLo; tLo = tHi; tHi = tmp;
  }
}

// ----- main -------------------------------------------------------------

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / u_resolution;

  float tanHalf = tan(u_cameraFovY * 0.5);
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 ndc = uv * 2.0 - 1.0;
  vec3 viewDir = normalize(
    ndc.x * aspect * tanHalf * u_cameraRight +
    ndc.y * tanHalf * u_cameraUp +
    u_cameraForward
  );

  // Orbit-plane basis.
  vec3 eRadial, eTangent;
  buildOrbitBasis(viewDir, eRadial, eTangent);

  vec3 d = normalize(viewDir);
  float cosTheta = dot(d, eRadial);
  float sinTheta = sqrt(max(1.0 - cosTheta * cosTheta, 0.0));
  float r0 = length(u_cameraPos);
  float f0 = fOfR(r0);

  // Non-negative conserved angular momentum magnitude.
  float L = r0 * sinTheta / sqrt(max(f0, 1e-4));

  // Initial state: r0 along eRadial, affine v_r(0) = cosTheta, phi grows
  // along eTangent — which already carries the correct sign of dphi.
  float r   = r0;
  float vr  = cosTheta;
  float phi = 0.0;

  vec3 eWorld  = eRadial;
  vec3 eWorldT = eTangent;

  vec3 prevPos = r * (cos(phi) * eWorld + sin(phi) * eWorldT);
  float prevY = prevPos.y;
  // Persistent flag: was the PREVIOUS computed segment a real disk
  // segment (slab intersection AND radial band)?  Initial camera
  // position is far outside the slab, so this starts false.
  bool prevWasDiskSeg = false;

  int  term = TERM_RUNNING;
  int  stepsTaken = 0;
  float maxR = 70.0;
  float minR = RS * 1.001;

  float firstHitRho = -1.0;
  int   crossingCount = 0;        // distinct disk-segment entries
  int   higherOrderCrossings = 0;
  int   currentCrossingOrder = -1; // order index of the open traversal
  float accumAlpha = 0.0;
  vec3  accumColour = vec3(0.0);
  float dopplerSum = 0.0;
  bool  saturated  = false;

  vec3 lastWorldDir = d;

  for (int i = 0; i < 1024; ++i) {
    if (i >= u_maxSteps) { term = TERM_EXHAUSTED; break; }
    if (!(r > 0.0) || r != r) { term = TERM_EXHAUSTED; break; }
    if (r <= minR) { term = TERM_CAPTURED; break; }
    if (r >= maxR && vr > 0.0) { term = TERM_ESCAPED; break; }

    float angRate = L / max(r * r, 1e-3);
    float dphiMax = 0.06 / max(angRate, 1e-3);
    float dRMax   = 0.18 * r;
    float hstep = (dRMax < dphiMax) ? dRMax : dphiMax;
    if (!(hstep > 0.0) || hstep != hstep) { term = TERM_EXHAUSTED; break; }

    // RK2 / midpoint.
    float kr  = vr;
    float kvr = (L * L) * (r - 1.5 * RS) / max(r * r * r * r, 1e-8);
    float kp  = L / max(r * r, 1e-4);
    float rM   = r   + 0.5 * hstep * kr;
    float vrM  = vr  + 0.5 * hstep * kvr;
    float phiM = phi + 0.5 * hstep * kp;
    float kr2  = vrM;
    float kvr2 = (L * L) * (rM - 1.5 * RS) / max(rM * rM * rM * rM, 1e-8);
    float kp2  = L / max(rM * rM, 1e-4);
    r   += hstep * kr2;
    vr  += hstep * kvr2;
    phi += hstep * kp2;
    stepsTaken = i + 1;

    if (!(r > 0.0) || r != r) { term = TERM_EXHAUSTED; break; }
    if (r <= minR) { term = TERM_CAPTURED; break; }
    if (r >= maxR && vr > 0.0) { term = TERM_ESCAPED; break; }

    vec3 pos = r * (cos(phi) * eWorld + sin(phi) * eWorldT);
    vec3 segDelta = pos - prevPos;
    float segLen = length(segDelta);
    if (segLen > 1e-6) lastWorldDir = segDelta / segLen;

    // Unified slab intersection — always treats both boundary planes.
    float tLo, tHi;
    slabRange(prevY, pos.y, u_diskHalfThickness, tLo, tHi);
    bool insideSeg = (tHi > tLo);

    // A "disk segment" is THIS computed segment:
    //   * spans the slab on at least some portion [tLo, tHi]; AND
    //   * the segment midpoint's cylindrical radius lies in the disk
    //     radial band [diskInner, diskOuter].
    // Disk-segment state from the previous iteration is carried by the
    // persistent `prevWasDiskSeg` flag, so a ray that *stays* in the disk
    // radial band across multiple integration steps accrues density for
    // a single crossing (no spurious count++).
    float rhoMidSeg = length(vec2(
      0.5 * (prevPos.x + pos.x),
      0.5 * (prevPos.z + pos.z)
    ));
    bool isDiskSeg = insideSeg &&
      (rhoMidSeg >= u_diskInner && rhoMidSeg <= u_diskOuter);

    bool justEntered =  isDiskSeg && !prevWasDiskSeg;
    bool staysInside =  isDiskSeg &&  prevWasDiskSeg;
    bool justLeft    = !isDiskSeg &&  prevWasDiskSeg;

    // Open / close the current independent order on entry / exit of the
    // disk radial band.
    if (justEntered) {
      currentCrossingOrder = crossingCount;
      crossingCount = (crossingCount + 1 < 64) ? crossingCount + 1 : 64;
      if (currentCrossingOrder > 0) higherOrderCrossings = 1;
    }
    if (justLeft) {
      currentCrossingOrder = -1;
    }

    if (isDiskSeg) {
      float tMid = 0.5 * (tLo + tHi);
      vec3 midPos = prevPos + segDelta * tMid;
      float rhoMid = rhoMidSeg;
      if (firstHitRho < 0.0) firstHitRho = rhoMid;

      const int NSAMP = 6;
      float acc = 0.0;
      for (int j = 0; j < NSAMP; ++j) {
        float t = tLo + (tHi - tLo) * (float(j) + 0.5) / float(NSAMP);
        vec3 pj = prevPos + segDelta * t;
        float rhoj = length(pj.xz);
        float thetaj = atan(pj.z, pj.x);
        acc += diskDensity(rhoj, pj.y, thetaj);
      }
      acc /= float(NSAMP);
      float usedLen = (tHi - tLo) * segLen;
      float density = acc * usedLen;

      // Opacity is determined purely by the line-of-sight density so a
      // thin slab stays see-through regardless of the emission slider.
      // `u_diskEmission` is a *radiance* multiplier applied below when
      // the segment contributes to the front-to-back accumulation.
      float alpha = 1.0 - exp(-0.5 * density);
      alpha = clamp(alpha, 0.0, 1.0);

      float rNorm = clamp((rhoMid - u_diskInner) /
                          max(u_diskOuter - u_diskInner, 1e-3), 0.0, 1.0);
      // Inner edge hottest; outer rim cool.  Keep T in the warm/bright
      // band of temperatureColor so the disk reads as hot orange, not
      // bleach-white.
      float temp = clamp(0.4 + 0.9 * (1.0 - rNorm) *
                         u_diskTemperature, 0.0, 1.6);
      // Disk intrinsic radiance.  The radial profile is a power law
      // biased to the inner edge so the hot zone is genuinely hot in
      // linear HDR units; at default diskEmission=1.2 the inner edge
      // reaches ~3.0 (well above the 1.2 bloom threshold) while the
      // outer rim stays modest.  This is what makes the bright-pass
      // actually extract the disk instead of only the brightest
      // stars.
      float radialProfile = pow(mix(0.35, 1.0, 1.0 - rNorm), 2.2);
      vec3 emission = temperatureColor(temp) * radialProfile * 2.5;

      // Doppler + gravitational redshift:
      //   gamma         = 1 / sqrt(1 - beta^2)
      //   dopDenom      = gamma * (1 - beta*mu)
      //   gGrav         = sqrt(fOfR(rhoMid) / f0)
      //   gfac          = gGrav / dopDenom
      // Emission brightness multiplied by gfac^3.
      vec3 vDir = vec3(-midPos.z, 0.0, midPos.x);
      float vl = length(vDir);
      vDir = vl > 0.0 ? vDir / vl : vec3(0.0);
      // Final subluminal cap: u_orbitalSpeed can push the natural
      // Keplerian beta past 1 at high settings.  Apply the slider and
      // clamp AGAIN to 0.85 so relativistic factors stay finite.
      float betaRaw = orbitalBeta(rhoMid) * u_orbitalSpeed;
      float beta    = clamp(betaRaw, 0.0, 0.85);
      vec3 dirPhoton = -lastWorldDir;
      float mu = dot(dirPhoton, vDir);
      float gamma = 1.0 / sqrt(max(1.0 - beta * beta, 1e-4));
      float dopDenom = max(gamma * (1.0 - beta * mu), 1e-3);
      float gGrav = sqrt(max(fOfR(rhoMid), 1e-4) / max(f0, 1e-4));
      float gfac = gGrav / dopDenom;
      gfac = clamp(gfac, 0.05, 6.0);
      float g3 = gfac * gfac * gfac;
      emission *= g3;
      dopplerSum += gfac * alpha;

      bool withinBudget =
        (crossingCount <= u_maxCrossings) ||
        (higherOrderCrossings == 1 && crossingCount <= u_maxCrossings + 2);

      if (withinBudget) {
        float remaining = 1.0 - accumAlpha;
        accumColour += emission * u_diskEmission * alpha * remaining;
        accumAlpha  += alpha * remaining;
      }
    }

    // Advance the slab bookkeeping by what the NEXT segment will see.
    prevPos = pos;
    prevY = pos.y;
    prevWasDiskSeg = isDiskSeg;

    if (accumAlpha >= 0.985) {
      saturated = true;
      if (term == TERM_RUNNING) term = TERM_EXHAUSTED;
      break;
    }
  }

  if (term == TERM_RUNNING) term = TERM_EXHAUSTED;

  vec3 colour;
  if (term == TERM_CAPTURED) {
    colour = accumColour;            // foreground disk visible even when
                                     // the terminal ray went under horizon
  } else if (term == TERM_ESCAPED && !saturated) {
    vec3 sky = sampleStars(lastWorldDir);
    float trans = 1.0 - clamp(accumAlpha, 0.0, 1.0);
    colour = accumColour + sky * trans;
  } else {
    colour = accumColour;            // exhaustion / saturation: no sky
  }

  if (u_debug == 1) {
    float s = float(stepsTaken) / float(u_maxSteps > 1 ? u_maxSteps : 1);
    colour = mix(vec3(0.0, 0.0, 0.4), vec3(1.0, 0.4, 0.0), clamp(s, 0.0, 1.0));
  } else if (u_debug == 2) {
    colour = (term == TERM_CAPTURED)
      ? vec3(0.0)
      : vec3(0.85, 0.85, 0.95);
  } else if (u_debug == 3) {
    float v = firstHitRho > 0.0
      ? clamp((firstHitRho - u_diskInner) /
              max(u_diskOuter - u_diskInner, 1e-3), 0.0, 1.0)
      : 0.0;
    colour = vec3(v, 0.1, 1.0 - v);
  } else if (u_debug == 4) {
    float c = clamp(float(crossingCount) / 6.0, 0.0, 1.0);
    float h = float(higherOrderCrossings);
    colour = vec3(c, h, max(0.0, 1.0 - c));
  } else if (u_debug == 5) {
    float dN = clamp(dopplerSum * 0.25, 0.0, 1.5);
    colour = vec3(dN, dN * 0.6, max(0.0, 1.0 - dN * 0.5));
  } else if (u_debug == 6) {
    colour = 0.5 + 0.5 * normalize(lastWorldDir);
  } else if (u_debug == 7) {
    // Procedural sky/galaxy alone — disk deliberately hidden so the
    // background structure is readable without the foreground in the way.
    colour = sampleStars(normalize(lastWorldDir));
  } else if (u_debug == 8) {
    // Pre-post log HDR: includes the disk AND the sky, exactly what the
    // composited HDR target will carry into the bright pass.
    colour = log(1.0 + max(colour, vec3(0.0)) * 4.0) / log(5.0);
  }
  // debug == 9 falls through: the HDR target must carry the unmodified
  // raw raytrace colour so the bright-pass shader (which reads this
  // HDR target) can extract above-threshold pixels.  The renderer then
  // routes the bright target directly through composite's diagnostic
  // branch to visualise the threshold extraction on screen.

  // Linear HDR output.  Tone mapping, grain, vignette, chromatic
  // aberration and the final sRGB conversion all live in composite.glsl
  // — only that pass is allowed to do the linear->sRGB step.
  colour = max(colour, vec3(0.0));
  gl_FragColor = vec4(colour, 1.0);
}
