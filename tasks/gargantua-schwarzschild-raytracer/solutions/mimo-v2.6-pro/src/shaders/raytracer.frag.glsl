// ============================================================================
// GARGANTUA — 史瓦西黑洞零测地线全屏光线追踪 Fragment Shader
// ----------------------------------------------------------------------------
// 坐标 / 状态量 / 步进 / 终止条件（任务要求以命名函数与注释说明）：
//
// * 坐标与单位：世界单位 = 史瓦西半径 RS = 1；黑洞位于原点；吸积盘平面 y = 0
//   （法线 +Y）。几何单位 c = G = 1，M = RS/2 = 0.5；光子球 r = 3M = 1.5，
//   临界碰撞参数 b_crit = 3*sqrt(3)*M ≈ 2.598，事件视界 r = RS = 1。
//
// * 零测地线：史瓦西度规 ds² = -(1-RS/r)dt² + dr²/(1-RS/r) + r²dΩ²，取 ds² = 0。
//   球对称 ⇒ 测地线恒在同一轨道平面内。以守恒量 E = (1-RS/r)·dt/dλ、
//   h = r²·dφ/dλ 消去 t、λ，得到 u = 1/r 关于 φ 的轨道方程（精确，非弱场近似）：
//       d²u/dφ² = -u + 3·M·u²
//
// * 状态量：y = (u, w)，w = du/dφ。射线初值映射：e1 = normalize(camPos)
//   （黑洞→相机基线），e2 = 轨道平面内正交于 e1 的单位向量，轨迹重建
//   P(φ) = (1/u)·(cos φ·e1 + sin φ·e2)（φ=0 处 P = camPos），
//   w0 = du/dφ|₀ = -u0·a/b（a = dir·e1，b = |dir - a·e1|，由 dr/dφ = r·a/b 得）。
//
// * 步进：RK4，自适应 dφ（接近盘面时减半，保证穿越定位精度）。
//
// * 终止条件：
//     u ≥ 1/RS          → r ≤ RS，落入事件视界（深黑，不叠加背景）
//     u < 1/48 且 w < 0 → r > 48 且向外运动，逃逸（沿出射切向采样程序化星空/银河）
//     步数 ≥ uMaxSteps  → 步数耗尽（合成已收集光 + 当前切向背景近似）
//     b ≈ 0（近轴）     → 解析退化：向内即捕获（b < b_crit 的入射线必入视界），向外无偏折逃逸
//
// * 吸积盘沿积分后的弯曲路径与 y=0 平面求交（非平面圆环几何/贴图）；同一光线的
//   多次盘面穿越按路径顺序（前向→后向 alpha）合成，形成主像、次级像与高阶环状细节。
// * 发射：轨道速度导致的相对论多普勒增亮/去增亮 × 引力红移（g 因子）、径向温度
//   梯度（内热蓝白 → 外橙）、开普勒差速剪切的时变程序化湍流。
// * 背景：程序化星空 + 银河带经透镜映射（逃逸方向 n̂）采样，无任何贴图/环境图。
// * 调试视图 0–9：0 走完整后处理链；1–9 直接输出诊断色（见 debugView）。
// ============================================================================

varying vec2 vUv;

uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;
uniform float uAspect;
uniform float uSimTime;
uniform int uDebugView;
uniform int uMaxSteps;
uniform int uMaxCrossings;
uniform int uOctaves;

uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskHalfH;
uniform float uDiskTemp;
uniform float uDiskEmission;
uniform float uOrbitSpeed;
uniform float uTurbAmp;
uniform float uTurbSpeed;
uniform float uStarDensity;
uniform float uGalaxyBright;

const float RS = 1.0;
const float M = 0.5 * RS;
const float B_CRIT = 2.5980762; // 3*sqrt(3)*M
const float PI = 3.14159265;
const float TAU = 6.28318531;
const float HALF_PI = 1.57079633;
const int HARD_MAX_STEPS = 512; // GLSL ES 1.00 常量循环上界
const float DISK_CALIBRATION = 0.1; // 发射视觉校准系数（由视觉验收调整）
const float SQRT_PI = 1.7724539;

struct TraceResult {
  int term; // 0 捕获入视界 / 1 逃逸 / 2 步数耗尽
  int steps;
  int crossCount; // 收集到的盘面穿越次数（阶次）
  float firstG; // 首个穿越点的 g 因子
  float bImpact;
  vec3 bgDir;
};

// ---------------------------------------------------------------- 基础工具
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

// 周期性 value noise：period 指定 lattice 周期（φ / 经度方向无缝）
float pnoise2(vec2 p, vec2 period) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 s = f * f * (3.0 - 2.0 * f);
  float a = hash12(mod(i, period));
  float b = hash12(mod(i + vec2(1.0, 0.0), period));
  float c = hash12(mod(i + vec2(0.0, 1.0), period));
  float d = hash12(mod(i + vec2(1.0, 1.0), period));
  return mix(mix(a, b, s.x), mix(c, d, s.x), s.y);
}

float fbm2(vec2 p, vec2 period, int octaves) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    sum += amp * pnoise2(p, period);
    norm += amp;
    p *= 2.0;
    period *= 2.0;
    amp *= 0.5;
  }
  return sum / max(norm, 1e-4);
}

vec3 linearToSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(max(c, 1e-5), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

vec3 heatRamp(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c = mix(vec3(0.0, 0.15, 0.8), vec3(0.0, 0.95, 0.85), smoothstep(0.0, 0.35, t));
  c = mix(c, vec3(1.0, 0.9, 0.1), smoothstep(0.35, 0.7, t));
  return mix(c, vec3(1.0, 0.25, 0.0), smoothstep(0.7, 1.0, t));
}

// ---------------------------------------------------------------- 吸积盘发射
// Tanner Helland 色温→RGB 近似（tannerhelland.com/2012/09/18/rgb-temperature-algorithm-code.html）
vec3 blackbodyColor(float T) {
  float t = clamp(T, 1000.0, 40000.0) / 100.0;
  float r, g, b;
  if (t <= 66.0) {
    r = 255.0;
  } else {
    r = 329.698727446 * pow(t - 60.0, -0.1332047592);
  }
  if (t <= 66.0) {
    g = 99.4708025861 * log(t) - 161.1195681661;
  } else {
    g = 288.1221695283 * pow(t - 60.0, -0.0755148492);
  }
  if (t >= 66.0) {
    b = 255.0;
  } else if (t <= 19.0) {
    b = 0.0;
  } else {
    b = 138.5177312231 * log(t - 10.0) - 305.0447927307;
  }
  return clamp(vec3(r, g, b), 0.0, 255.0) / 255.0;
}

// 径向亮度轮廓（Shakura–Sunyaev 风格 T ∝ (rin/r)^{3/4}(1-√(rin/r))^{1/4} 的流量形态），
// 峰值归一化到 [0,1]，内外边缘 smoothstep 软化
float radialProfile(float r) {
  float x = uDiskInner / max(r, 1e-4);
  float base = pow(x, 0.75) * pow(max(1.0 - sqrt(x), 0.0), 0.25) * 1.956;
  float edgeIn = smoothstep(uDiskInner, uDiskInner + 0.5, r);
  float edgeOut = 1.0 - smoothstep(uDiskOuter - 0.5, uDiskOuter, r);
  return clamp(base, 0.0, 1.0) * edgeIn * edgeOut;
}

// 径向温度梯度：内缘 14000K 蓝白 → 外缘约 3000K 橙（温标幂 2.0，视觉验收调整）
float tempOfR(float r) {
  float x = clamp(uDiskInner / max(r, 1e-4), 0.0, 1.0);
  return mix(3000.0, 14000.0, pow(x, 2.0)) * uDiskTemp;
}

// 时变程序化湍流：开普勒差速剪切 ω(r)=√(M/r³) 的共转坐标系 fbm
float turbulenceAt(float r, float phi, float t) {
  float omega = sqrt(M / max(r * r * r, 1e-4));
  vec2 p = vec2(4.0 * log(r), (phi - omega * t * uTurbSpeed) * (8.0 / TAU));
  float n = fbm2(p, vec2(64.0, 8.0), uOctaves);
  return 1.0 + uTurbAmp * (n - 0.5) * 2.0;
}

// 发射光谱：观测黑体温度 Tobs = g·T(r)，亮度按黑体幂律 I ∝ Tobs³
//（幂次 3 由视觉验收调整：保留温标渐变与 Doppler 不对称，避免外盘过暗/内盘冲白）
vec3 emissionAt(vec3 p, float g, float t) {
  float r = length(p);
  float prof = radialProfile(r);
  if (prof <= 0.0) return vec3(0.0);
  float Tobs = clamp(tempOfR(r) * g, 1000.0, 40000.0);
  float turb = turbulenceAt(r, atan(p.z, p.x), t);
  float brightness = uDiskEmission * prof * turb * pow(Tobs / 6500.0, 3.0) * DISK_CALIBRATION;
  return blackbodyColor(Tobs) * brightness;
}

// 圆轨道发射体的 g 因子 = 相对论多普勒 × 引力红移：
//   gGrav = √(1-RS/r_em) / √(1-RS/r_cam)（光子爬出引力势阱损失能量）
//   D = 1 / (γ·(1 - β·n̂))，n̂ 为光子在发射点的传播方向（指向相机），
//       β 为发射体在局部静止正交标架中的轨道速度（史瓦西圆轨道 γ = √((1-RS/r)/(1-3M/r))）
float redshiftFactor(vec3 p, vec3 photonDir, float rCam, out float dopplerOut) {
  float r = max(length(p), 1e-4);
  float gGrav = sqrt(max(1.0 - RS / r, 0.0)) / sqrt(max(1.0 - RS / rCam, 0.0));
  float gamma = sqrt(max((1.0 - RS / r) / max(1.0 - 3.0 * M / r, 1e-3), 1e-3));
  float beta = min(sqrt(max(1.0 - 1.0 / (gamma * gamma), 0.0)) * uOrbitSpeed, 0.95);
  float gammaK = inversesqrt(max(1.0 - beta * beta, 1e-4));
  vec3 velDir = normalize(cross(vec3(0.0, 1.0, 0.0), p)); // 顺行开普勒轨道方向
  dopplerOut = 1.0 / (gammaK * max(1.0 - dot(velDir, photonDir) * beta, 1e-3));
  return dopplerOut * gGrav;
}

// 穿越事件发射：以二分定位的穿越参数 τ 为锚做 3 点梯形样点（空间步距 ≈ 2h，高斯权重
// exp(-(y/h)²)）平均，再乘高斯薄层沿路径的解析积分因子 h·√π/|n̂_y|（掠射增益限幅防灰化）
vec3 crossingEmission(vec3 pa, vec3 pb, float tau, float g, float t) {
  float h = uDiskHalfH;
  float chord = max(length(pb - pa), 1e-4);
  float dt = clamp(2.0 * h / chord, 0.004, 0.45);
  vec3 sum = vec3(0.0);
  float wsum = 0.0;
  for (int j = -1; j <= 1; j++) {
    float s = clamp(tau + float(j) * dt, 0.0, 1.0);
    vec3 p = mix(pa, pb, s);
    float wj = exp(-pow(p.y / h, 2.0));
    sum += wj * emissionAt(p, g, t);
    wsum += wj;
  }
  float ny = abs((pb - pa).y) / chord;
  return (sum / max(wsum, 1e-4)) * (h * SQRT_PI / clamp(ny, 0.35, 1.0));
}

// ---------------------------------------------------------------- 程序化背景
// 星空：经纬网格 hash 星点（经度方向 mod 周期化避免接缝），极区按 cos(lat) 衰减星数
vec3 starField(vec3 dir, float density) {
  float lon = atan(dir.z, dir.x);
  float lat = asin(clamp(dir.y, -1.0, 1.0));
  vec2 sp = vec2((lon + PI) / TAU * 128.0, (lat + HALF_PI) / PI * 64.0);
  vec2 cell = vec2(mod(floor(sp.x), 128.0), floor(sp.y));
  vec2 f = fract(sp);
  float cosLat = max(cos(lat), 0.05);
  vec3 acc = vec3(0.0);
  for (int j = 0; j < 2; j++) {
    vec2 h = hash22(cell + vec2(float(j) * 37.7, float(j) * 91.3) + 4.1);
    if (h.x > density * cosLat * 0.55) continue; // 恒星密度控制数量阈值
    vec2 pos = vec2(0.15 + 0.7 * h.y, 0.15 + 0.7 * hash12(cell + h + 17.0));
    float d = length(f - pos);
    float size = 0.035 + 0.05 * hash12(cell + h + 5.0);
    float core = smoothstep(size, 0.0, d);
    if (core <= 0.0) continue;
    float mag = 0.35 + 2.6 * pow(hash12(cell + h + 9.0), 3.0); // 少数亮星
    float temp = mix(3200.0, 14000.0, hash12(cell + h + 3.0));
    acc += blackbodyColor(temp) * core * mag * density;
  }
  return acc;
}

// 银河带：倾斜大圆亮带 × fbm 尘埃纹理（暖白核心 → 偏蓝边缘）
vec3 galaxyBand(vec3 dir, float bright) {
  float lon = atan(dir.z, dir.x);
  float lat = asin(clamp(dir.y, -1.0, 1.0));
  vec2 gp = vec2((lon + PI) / TAU * 8.0, (lat + HALF_PI) / PI * 4.0);
  float dust = fbm2(gp * 2.0, vec2(16.0, 8.0), 3);
  float b = dot(dir, normalize(vec3(0.3, 1.0, 0.2)));
  float band = exp(-(b / 0.28) * (b / 0.28));
  vec3 col = mix(vec3(0.62, 0.7, 0.95), vec3(1.0, 0.93, 0.8), band * band);
  return col * band * (0.22 + 0.78 * dust) * bright * 0.5;
}

vec3 background(vec3 dir) {
  return starField(dir, uStarDensity) + galaxyBand(dir, uGalaxyBright);
}

// ---------------------------------------------------------------- 零测地线核
// 轨道方程 RHS：d²u/dφ² = -u + 3·M·u²
void geodesicRhs(float u, float w, out float du, out float dw) {
  du = w;
  dw = -u + 3.0 * M * u * u;
}

void rk4Step(inout float u, inout float w, float dphi) {
  float k1u, k1w, k2u, k2w, k3u, k3w, k4u, k4w;
  geodesicRhs(u, w, k1u, k1w);
  geodesicRhs(u + 0.5 * dphi * k1u, w + 0.5 * dphi * k1w, k2u, k2w);
  geodesicRhs(u + 0.5 * dphi * k2u, w + 0.5 * dphi * k2w, k3u, k3w);
  geodesicRhs(u + dphi * k3u, w + dphi * k3w, k4u, k4w);
  u += dphi * (k1u + 2.0 * k2u + 2.0 * k3u + k4u) / 6.0;
  w += dphi * (k1w + 2.0 * k2w + 2.0 * k3w + k4w) / 6.0;
}

// 射线初值 → (e1, e2, u0, w0, bImpact)
void setupRay(vec3 camPos, vec3 dir, out vec3 e1, out vec3 e2, out float u0, out float w0, out float bImpact) {
  float r0 = max(length(camPos), 1e-4);
  e1 = camPos / r0;
  u0 = 1.0 / r0;
  float a = dot(dir, e1);
  vec3 v = dir - a * e1;
  float b = length(v);
  e2 = v / max(b, 1e-5);
  w0 = -u0 * a / max(b, 1e-5); // du/dφ|₀ = -u·a/b（由 dr/dφ = r·a/b 得）
  bImpact = r0 * b; // 射线直线到中心的垂直距离 ≈ 渐近碰撞参数 b
}

vec3 posOf(float phi, float u, vec3 e1, vec3 e2) {
  return (cos(phi) * e1 + sin(phi) * e2) / u;
}

vec3 tangentOf(float phi, float u, float w, vec3 e1, vec3 e2) {
  vec3 rHat = cos(phi) * e1 + sin(phi) * e2;
  vec3 phiHat = -sin(phi) * e1 + cos(phi) * e2;
  return normalize((-w / (u * u)) * rHat + (1.0 / u) * phiHat); // dP/dφ = (dr/dφ)·r̂ + r·φ̂，dr/dφ = -w/u²
}

// 主积分：RK4 推进 (u, w)，检测盘面穿越并按路径顺序合成，按终止条件返回
TraceResult traceGeodesic(vec3 camPos, vec3 dir, float rCam, inout vec3 accum, inout float trans) {
  TraceResult res;
  res.term = 2;
  res.steps = 0;
  res.crossCount = 0;
  res.firstG = 0.0;
  res.bImpact = 0.0;
  res.bgDir = dir;

  vec3 e1, e2;
  float u, w;
  setupRay(camPos, dir, e1, e2, u, w, res.bImpact);

  // 近轴退化解析处理（b ≈ 0）：b < b_crit 的入射零测地线必入视界；向外则无偏折逃逸
  if (res.bImpact < 1e-3) {
    res.term = dot(dir, e1) < 0.0 ? 0 : 1;
    return res;
  }

  float phi = 0.0;
  vec3 pPrev = camPos;
  float yPrev = camPos.y;

  for (int i = 0; i < HARD_MAX_STEPS; i++) {
    if (i >= uMaxSteps) {
      res.term = 2;
      break;
    }
    res.steps = i + 1;

    float r = 1.0 / u;
    vec3 tangent = tangentOf(phi, u, w, e1, e2);
    float dphi = clamp(0.15 * (0.3 + 1.2 * u), 0.05, 0.22);
    float chordY = r * dphi * abs(tangent.y);
    if (abs(yPrev) < 2.0 * chordY) dphi = max(dphi * 0.5, 0.005); // 接近盘面加密

    float uNext = u;
    float wNext = w;
    rk4Step(uNext, wNext, dphi);
    float phiNext = phi + dphi;
    vec3 pNext = posOf(phiNext, uNext, e1, e2);
    float yNext = pNext.y;

    // 盘面穿越：y 变号 → 5 次二分定位穿越点（再积分到 φ 内部后按 P(φ) 重算）
    if (yPrev * yNext < 0.0 && res.crossCount < uMaxCrossings) {
      float lo = 0.0;
      float hi = 1.0;
      for (int k = 0; k < 5; k++) {
        float mid = 0.5 * (lo + hi);
        float uM = u;
        float wM = w;
        rk4Step(uM, wM, mid * dphi);
        float yM = posOf(phi + mid * dphi, uM, e1, e2).y;
        if (yM * yPrev > 0.0) lo = mid;
        else hi = mid;
      }
      float tau = 0.5 * (lo + hi);
      float uC = u;
      float wC = w;
      rk4Step(uC, wC, tau * dphi);
      vec3 pCross = posOf(phi + tau * dphi, uC, e1, e2);
      float rC = length(pCross);
      if (rC >= uDiskInner && rC <= uDiskOuter) {
        // 光子在发射点的传播方向 = 指向相机 = -march 切向
        vec3 photonDir = -tangentOf(phi + tau * dphi, uC, wC, e1, e2);
        float doppler;
        float g = redshiftFactor(pCross, photonDir, rCam, doppler);
        res.crossCount += 1;
        if (res.crossCount == 1) res.firstG = g;
        vec3 colorK = crossingEmission(pPrev, pNext, tau, g, uSimTime);
        float prof = radialProfile(rC);
        float turb = turbulenceAt(rC, atan(pCross.z, pCross.x), uSimTime);
        float alphaK = clamp(0.25 + 0.7 * prof * (0.75 + 0.25 * turb), 0.05, 0.97);
        accum += trans * alphaK * colorK;
        trans *= 1.0 - alphaK;
      }
    }

    u = uNext;
    w = wNext;
    phi = phiNext;
    pPrev = pNext;
    yPrev = yNext;

    if (u >= 1.0 / RS) { // r ≤ RS：事件视界终止
      res.term = 0;
      break;
    }
    if (u < 1.0 / 48.0 && w < 0.0) { // r > 48 且向外：逃逸，记录出射切向
      res.term = 1;
      res.bgDir = tangentOf(phi, u, w, e1, e2);
      break;
    }
  }
  return res;
}

// ---------------------------------------------------------------- 调试视图 0–9
vec3 debugView(int mode, TraceResult tr, vec3 hdr, vec3 bg, vec3 diskAccum) {
  if (mode == 1) {
    // 幂律拉伸动态范围，突出临界环附近的高步数绕转
    return heatRamp(pow(float(tr.steps) / float(max(uMaxSteps, 1)), 0.5));
  }
  if (mode == 2) {
    if (tr.bImpact < 0.05) return vec3(0.45); // 近轴退化处理区
    if (tr.term == 0) return vec3(0.9, 0.1, 0.1);
    if (tr.term == 1) return vec3(0.1, 0.3, 0.9);
    return vec3(0.95, 0.85, 0.1);
  }
  if (mode == 3) {
    if (tr.term == 0) return vec3(1.0);
    if (tr.term == 1) return vec3(0.0);
    return vec3(0.5);
  }
  if (mode == 4) {
    int k = tr.crossCount;
    if (k <= 0) return vec3(0.0);
    if (k == 1) return vec3(0.2, 0.9, 0.3);
    if (k == 2) return vec3(0.95, 0.2, 0.85);
    if (k == 3) return vec3(1.0, 0.6, 0.1);
    if (k == 4) return vec3(0.2, 0.85, 0.95);
    return vec3(1.0);
  }
  if (mode == 5) {
    if (tr.crossCount <= 0) return vec3(0.0);
    float g = tr.firstG;
    vec3 c = mix(vec3(0.9, 0.15, 0.1), vec3(0.7, 0.85, 1.0), smoothstep(0.55, 1.35, g));
    return c * clamp(0.3 + 0.5 * g, 0.2, 1.1);
  }
  if (mode == 6) {
    if (tr.term == 0) return vec3(0.0);
    return tr.bgDir * 0.5 + 0.5;
  }
  if (mode == 7) {
    return bg;
  }
  if (mode == 8) {
    float lum = dot(hdr, vec3(0.2126, 0.7152, 0.0722));
    return heatRamp(log(1.0 + lum) / log(17.0));
  }
  if (mode == 9) {
    float q = clamp(tr.bImpact / 4.0, 0.0, 1.0);
    vec3 c = vec3(q, 0.25 * q, 1.0 - q) * 0.35;
    c += vec3(exp(-abs(tr.bImpact - B_CRIT) * 30.0)); // 临界带高亮
    return c;
  }
  return hdr;
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 dir = normalize(uCamForward + uCamRight * (ndc.x * uAspect * uTanHalfFov) + uCamUp * (ndc.y * uTanHalfFov));

  vec3 accum = vec3(0.0);
  float trans = 1.0;
  float rCam = max(length(uCamPos), 1e-4);
  TraceResult tr = traceGeodesic(uCamPos, dir, rCam, accum, trans);

  vec3 bg = vec3(0.0);
  if (tr.term == 1 || tr.term == 2) {
    bg = background(tr.bgDir); // 步数耗尽用当前切向做背景近似
  }
  vec3 hdr = accum + trans * bg;

  if (uDebugView == 0) {
    gl_FragColor = vec4(hdr, 1.0); // 线性 HDR → 后处理链（Bloom / ACES / 暗角 / 颗粒 / 色散）
  } else {
    gl_FragColor = vec4(linearToSrgb(clamp(debugView(uDebugView, tr, hdr, bg, accum), 0.0, 1.0)), 1.0);
  }
}
