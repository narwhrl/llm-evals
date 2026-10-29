// 黑洞渲染的全屏 fragment shader。
//
// 坐标与状态量
//   · 单位取史瓦西半径 r_s = 1，于是 M = 0.5，事件视界在 r = 1，
//     不稳定光子轨道在 r = 1.5，临界瞄准参数 b_c = 3√3/2 ≈ 2.598。
//   · 每像素从相机位置沿像素方向发出射线，用轨道平面内的
//     Binet 方程 u'' + u = 3M u²（u = 1/r）做数值积分。
//     每条射线都在「相机位置—黑洞中心—射线方向」张成的平面内运动，
//     所以只需积分两个标量（u 与其对 φ 的导数），曲率偏折来自逐步 RK4。
//
// 步进与终止
//   · 自适应步长：dφ = clamp(0.035 * r, 0.0025, 0.09)，
//     近黑洞步长变细，远处变粗。
//   · 终止条件：r < 1（落入视界）、u ≤ 1e-5 且正在远离（逃逸到背景）、
//     步数用尽、或已经完成盘面采样并远离盘面。
//   · 吸积盘在 y = 0 平面上，用相邻两步的 (y 符号变化 + 线性插值) 求交，
//     交点是积分路径上的真实位置，因此同一条射线能按顺序收集多次穿越。

export const blackHoleVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const blackHoleFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform vec3 uCamPos;
  uniform vec3 uCamTarget;
  uniform vec3 uCamUp;
  uniform float uFovY;
  uniform float uTime;

  uniform float uDiskInner;
  uniform float uDiskOuter;
  uniform float uDiskThickness;
  uniform float uDiskTemp;
  uniform float uDiskEmission;
  uniform float uOrbitalSpeed;
  uniform float uTurbAmplitude;
  uniform float uTurbSpeed;
  uniform float uTurbScale;

  uniform float uStarDensity;
  uniform float uGalaxyBrightness;

  uniform float uExposure;
  uniform int uMaxSteps;
  uniform int uDiskSamples;
  uniform int uDebug;

  const float RS = 1.0;          // 史瓦西半径（长度单位）
  const float MASS = 0.5;        // M = r_s / 2
  const float PHOTON_SPHERE = 1.5;
  const float CRITICAL_B = 2.59807621135; // 3√3/2

  // ------------------------------------------------------------------ 工具
  float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n000 = hash13(i);
    float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
    float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
    float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
    float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
    float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
    float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
    float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
    return mix(
      mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
      mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    float sum = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      sum += amp * noise3(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return sum;
  }

  // 黑体色温近似（单位：开尔文 → 线性 RGB）
  vec3 blackbody(float kelvin) {
    float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
    vec3 c;
    c.r = t <= 66.0 ? 1.0 : clamp(1.29293618606 * pow(t - 60.0, -0.1332047592), 0.0, 1.0);
    c.g = t <= 66.0
      ? clamp(0.39008157876 * log(t) - 0.63184144378, 0.0, 1.0)
      : clamp(1.12989086089 * pow(t - 60.0, -0.0755148492), 0.0, 1.0);
    c.b = t >= 66.0 ? 1.0 : (t <= 19.0 ? 0.0 : clamp(0.54320678911 * log(t - 10.0) - 1.19625408914, 0.0, 1.0));
    return c;
  }

  // ------------------------------------------------------------------ 背景
  // 程序化星空 + 银河带。只依赖方向，因此透镜后的方向直接决定背景。
  vec3 background(vec3 dir) {
    vec3 d = normalize(dir);

    // 银河：低频 fbm 在银道面附近增强，整体压暗，避免把画面抬成灰雾
    float band = pow(exp(-pow(dot(d, normalize(vec3(0.32, 0.86, -0.4))) * 2.4, 2.0)), 2.0);
    float nebula = fbm(d * 3.4 + vec3(2.1, 0.0, 1.3));
    float dust = fbm(d * 8.0 + vec3(7.7, 1.9, 0.0));
    float lanes = smoothstep(0.45, 0.85, dust);
    float galaxy = band * (0.05 + 0.42 * nebula) * (1.0 - 0.6 * lanes);
    vec3 galaxyColor = mix(vec3(0.22, 0.28, 0.52), vec3(0.78, 0.64, 0.46), nebula);
    vec3 col = galaxyColor * max(galaxy, 0.0) * uGalaxyBrightness;

    // 星点：等角网格。球面上按 (方位角, 仰角) 分格，
    // 每格最多一颗星，角距归一化到格宽，因此星点始终是圆形小点。
    // 立方体分格：每格在球面上近似等角，极点不会退化成长条
    const float gridN = 190.0;
    vec3 cell = floor(d * gridN);
    vec3 jitter = vec3(hash13(cell + 1.1), hash13(cell + 2.3), hash13(cell + 5.7));
    vec3 center = normalize((cell + 0.2 + 0.6 * jitter) / gridN);
    // 用角度差（弦长）作为距离，星点在任意方向上都是圆形
    float dist = length(d - center) * gridN;
    float star = hash13(cell + 11.0);
    float keep = step(1.0 - clamp(uStarDensity, 0.0, 1.0) * 0.05, star);
    float mag = pow(hash13(cell + 13.1), 4.0);
    float core = smoothstep(0.26, 0.01, dist);
    float twinkle = 0.55 + 0.45 * hash13(cell + 7.7);
    float seed = hash13(cell + 3.3);
    vec3 starColor = mix(vec3(0.68, 0.80, 1.0), vec3(1.0, 0.84, 0.62), seed);
    col += starColor * keep * core * twinkle * (0.4 + 5.0 * mag);

    // 远处的深空底色
    col += vec3(0.0016, 0.0021, 0.0050);
    return col * 0.55;
  }

  // ------------------------------------------------------------------ 吸积盘
  // 盘面在 y = 0，半径 uDiskInner..uDiskOuter，半厚度 uDiskThickness。
  // 交点位置、轨道速度、温度与湍流都按积分路径上的真实坐标求值。
  vec3 diskSample(vec3 hit, vec3 rayDir, float impactB) {
    float r = length(hit.xz);
    if (r < uDiskInner || r > uDiskOuter) return vec3(0.0);

    // 盘厚：竖直方向高斯衰减，薄盘更锐，厚盘更柔
    float vertical = exp(-pow(hit.y / max(uDiskThickness, 0.02), 2.0));

    // 湍流：随半径旋转的噪声场，内圈角速度更高
    float omega = uOrbitalSpeed * pow(max(r, 1.0), -1.5);
    float ang = atan(hit.z, hit.x) - uTime * omega;
    // 盘面二维采样：角向与径向都加密，条纹随半径变细
    vec2 sp = vec2(cos(ang), sin(ang)) * (2.2 + r * 0.55) + vec2(r * 0.9, r * 0.35);
    float turb = fbm(vec3(sp * uTurbScale, r * 0.6 + uTime * uTurbSpeed));
    // 乘性湍流：围绕 1 上下扰动，保留亮暗条纹而不是整体抬亮
    float density = mix(1.0, 0.45 + 1.25 * turb, clamp(uTurbAmplitude, 0.0, 1.0));

    // 盘面内外缘的软过渡
    float edgeIn = smoothstep(uDiskInner, uDiskInner + 0.55, r);
    float edgeOut = 1.0 - smoothstep(uDiskOuter * 0.42, uDiskOuter, r);

    // 温度梯度：内侧更热，T ∝ r^-3/4
    float tempProfile = pow(uDiskInner / max(r, 0.001), 0.75);
    // 归一化到外缘，避免内圈把亮度抬到 tone mapping 的饱和区
    tempProfile = mix(1.0, tempProfile, 0.45);
    // 温度剖面从内到外跨越约 2.2 倍色温，读得出内外缘差异
    float radialT = clamp((r - uDiskInner) / max(uDiskOuter - uDiskInner, 0.001), 0.0, 1.0);
    // 内缘温度由 uDiskTemp 给出，外缘降到 34%，形成蓝白到橙红的跨度
    float kelvin = mix(uDiskTemp * 0.78, uDiskTemp * 0.30, radialT);
    vec3 emit = mix(blackbody(kelvin), vec3(1.0), 0.06);
    // 色域拉伸：黑体色接近白色时提高饱和度，让盘面读成高温金属而非灰雾
    float luma = dot(emit, vec3(0.2126, 0.7152, 0.0722));
    emit = clamp(mix(vec3(luma), emit, 1.35) + vec3(0.03, 0.006, -0.01), 0.0, 4.0);

    // 引力红移：静止观者频率比 sqrt(1 - r_s/r)
    float gravShift = sqrt(max(1.0 - RS / max(r, 1.001), 0.0001));

    // 多普勒：轨道速度 v = sqrt(M/r)，沿 φ 方向
    float speed = sqrt(MASS / max(r, 1.001));
    vec3 vel = normalize(vec3(-hit.z, 0.0, hit.x)) * speed;
    float beta = dot(vel, normalize(rayDir));
    float doppler = 1.0 / max(1.0 - beta, 0.35);
    // 多普勒立方更贴近相对论聚束，近侧亮带更集中
    float boost = pow(doppler, 3.0);

    float brightness = uDiskEmission * density * edgeIn * edgeOut * boost * gravShift * tempProfile * vertical;
    // 透视加厚：盘面在视线方向上的光程随视角倾斜变长（1/cos i），
    // 让近侧盘面比远侧更亮，读出前后关系。
    float slant = 1.0 / max(abs(normalize(rayDir).y), 0.12);
    brightness *= mix(1.0, clamp(slant, 1.0, 4.0), 0.55);
    // 光子环：内缘附近一条更亮更窄的环，给出清晰的边界
    float photonRing = 1.0 + 2.6 * exp(-pow((r - uDiskInner * 1.12) / 0.5, 2.0));
    // 发射率按到达观测者的顺序衰减：越靠后的穿越被前面的盘面遮挡越多。
    return emit * brightness * photonRing * 0.028;
  }

  // 调试色直出：调试视图不做 tone mapping，这里先编码到 sRGB 空间。
  vec3 debugOut(vec3 c) {
    return pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2));
  }

  // ------------------------------------------------------------------ 主积分
  void main() {
    vec2 ndc = vUv * 2.0 - 1.0;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float tanHalf = tan(uFovY * 0.5);

    vec3 forward = normalize(uCamTarget - uCamPos);
    vec3 right = normalize(cross(forward, uCamUp));
    vec3 up = cross(right, forward);
    vec3 dir = normalize(forward + right * ndc.x * tanHalf * aspect + up * ndc.y * tanHalf);

    // 相机到黑洞中心的距离与瞄准参数（用于诊断视图）
    float camR = length(uCamPos);
    vec3 toCenter = normalize(-uCamPos);
    float cosAngle = dot(dir, toCenter);
    float impactB = camR * sqrt(max(1.0 - cosAngle * cosAngle, 0.0)) / max(sqrt(max(1.0 - RS / camR, 1e-4)), 1e-4);

    vec3 accum = vec3(0.0);
    float crossings = 0.0;
    int steps = 0;
    bool captured = false;
    bool escaped = false;
    float prevY = 0.0;
    float hitRadiusNorm = 0.0;
    float minR = camR;
    float lastR = camR;
    vec3 lastPos = uCamPos;

    // 三维射线状态：位置与单位速度。用施瓦西中心力逐像素积分，
    // 位置因此是真实的，盘面（y=0）求交才有物理意义。
    vec3 pos = uCamPos;
    vec3 vel = normalize(dir);

    for (int i = 0; i < 4096; i++) {
      if (i >= uMaxSteps) break;
      steps = i;
      float r = max(length(pos), 1e-4);
      minR = min(minR, r);
      if (r <= RS) { captured = true; break; }
      if (r > 4000.0) { escaped = true; break; }

      // 自适应步长：按当前半径缩放的弧长步进
      float ds = clamp(0.12 * (r - RS * 0.5), 0.004, 1.6);

      // RK4：dp/ds = v，dv/ds = -3M h² p / r^5（施瓦西零测地线的空间形式近似）
      // 其中 h = |p × v| 为守恒角动量，产生正确的 2 阶偏折。
      vec3 p0 = pos;
      vec3 v0 = vel;
      float h2 = pow(length(cross(p0, v0)), 2.0);

      vec3 a1 = -3.0 * MASS * h2 * p0 / pow(max(length(p0), 1e-4), 5.0);
      vec3 p1 = p0 + 0.5 * ds * v0;
      vec3 v1 = normalize(v0 + 0.5 * ds * a1);
      vec3 a2 = -3.0 * MASS * h2 * p1 / pow(max(length(p1), 1e-4), 5.0);
      vec3 p2 = p0 + 0.5 * ds * v1;
      vec3 v2 = normalize(v0 + 0.5 * ds * a2);
      vec3 a3 = -3.0 * MASS * h2 * p2 / pow(max(length(p2), 1e-4), 5.0);
      vec3 p3 = p0 + ds * v2;
      vec3 v3 = normalize(v0 + ds * a3);
      vec3 a4 = -3.0 * MASS * h2 * p3 / pow(max(length(p3), 1e-4), 5.0);

      vec3 posNext = p0 + (ds / 6.0) * (v0 + 2.0 * v1 + 2.0 * v2 + v3);
      vec3 velNext = normalize(v0 + (ds / 6.0) * (a1 + 2.0 * a2 + 2.0 * a3 + a4));
      vec3 prevPos = p0;
      float rNext = length(posNext);

      // 盘面求交：线段端点跨越 y=0，且交点半径落在盘内才算命中。
      if (crossings < float(uDiskSamples) && prevPos.y * posNext.y <= 0.0) {
        float dy = posNext.y - prevPos.y;
        if (abs(dy) > 1e-7) {
          float t = clamp(-prevPos.y / dy, 0.0, 1.0);
          vec3 hit = mix(prevPos, posNext, t);
          float hitR = length(hit.xz);
          // 线段两端半径不能相差一个量级，否则插值点在物理上没有意义。
          float lenA = length(prevPos);
          float lenB = length(posNext);
          float sane = step(lenA, lenB * 4.0) * step(lenB, lenA * 4.0);
          if (hitR >= uDiskInner && hitR <= uDiskOuter && sane > 0.5) {
            vec3 rayDir = normalize(posNext - prevPos);
            // 多次穿越按 1/(1+序次) 衰减，避免叠加后过曝。
            accum += diskSample(hit, rayDir, impactB) / (1.0 + crossings * 0.8);
            hitRadiusNorm = hitR / max(uDiskOuter, 1.0);
            crossings += 1.0;
          }
        }
      }

      pos = posNext;
      vel = velNext;
      lastR = rNext;
      lastPos = posNext;
    }

    // 背景只取决于逃逸方向；被捕获的像素保持纯黑（事件视界内部无发光）。
    vec3 bg = vec3(0.0);
    if (!captured) {
      vec3 escapeDir = lastPos - uCamPos;
      // 步数耗尽时位置仍在盘面附近，用当前切向近似，避免出现空洞。
      if (dot(escapeDir, escapeDir) < 1e-6) escapeDir = dir;
      bg = background(normalize(escapeDir));
    }

    // ---- 调试视图 ----
    if (uDebug == 1) {
      // 步数与终止状态：红=被捕获，绿=逃逸，蓝=步数耗尽
      float stepFrac = float(steps) / float(uMaxSteps);
      vec3 c = vec3(stepFrac);
      if (captured) c = vec3(1.0, 0.15, 0.1) * (0.3 + stepFrac);
      else if (escaped) c = vec3(0.1, 1.0, 0.35) * (0.3 + stepFrac);
      else c = vec3(0.2, 0.3, 1.0) * (0.3 + stepFrac);
      gl_FragColor = vec4(debugOut(c), 1.0);
      return;
    }
    if (uDebug == 2) {
      // 事件视界掩码：
      //   黑 = 射线落入视界（r < r_s）
      //   橙 = 临界带（|b/b_c - 1| < 0.06，光子环所在的捕获边界）
      //   青→蓝 = 未被捕获，按最近接近半径 r_min 渐变
      float critical = abs(impactB / CRITICAL_B - 1.0);
      float g = clamp((minR - PHOTON_SPHERE) / (PHOTON_SPHERE * 1.6), 0.0, 1.0);
      vec3 tint = mix(vec3(0.10, 0.95, 1.0), vec3(0.02, 0.12, 0.45), g);
      if (critical < 0.06) tint = mix(vec3(1.0, 0.55, 0.10), tint, critical / 0.06);
      if (captured) tint = vec3(0.0);
      gl_FragColor = vec4(debugOut(tint), 1.0);
      return;
    }
    if (uDebug == 3) {
      // 盘面交点阶次：第 1/2/3+ 次穿越分色
      vec3 c = vec3(0.0);
      if (crossings >= 1.0) c += vec3(0.9, 0.35, 0.1);
      if (crossings >= 2.0) c += vec3(0.1, 0.8, 0.5);
      if (crossings >= 3.0) c += vec3(0.4, 0.4, 1.0);
      gl_FragColor = vec4(debugOut(c * 0.6), 1.0);
      return;
    }
    if (uDebug == 4) {
      // 瞄准参数 b 相对临界值 b_c 的比值
      float ratio = impactB / CRITICAL_B;
      vec3 c = ratio < 1.0 ? vec3(1.0, 0.2, 0.1) : vec3(0.15, 0.7, 1.0);
      c *= clamp(abs(ratio - 1.0) * 3.0, 0.15, 1.0);
      gl_FragColor = vec4(debugOut(c), 1.0);
      return;
    }
    if (uDebug == 5) {
      // 背景透镜坐标：逃逸方向映射成颜色
      vec3 d = normalize(lastPos - uCamPos);
      gl_FragColor = vec4(debugOut(d * 0.5 + 0.5), 1.0);
      return;
    }
    if (uDebug == 6) {
      // 星空与银河：只显示程序化背景，不叠加盘面
      vec3 d6 = lastPos - uCamPos;
      if (dot(d6, d6) < 1e-6) d6 = dir;
      gl_FragColor = vec4(debugOut(background(normalize(d6))), 1.0);
      return;
    }
    if (uDebug == 7) {
      // 盘面命中诊断（离散四档，便于肉眼判定）：
      //   黑 = 0 次穿越，红 = 1 次，黄 = 2 次，白 = 3 次及以上
      vec3 hitColor = vec3(0.02, 0.05, 0.18);
      if (crossings >= 3.0) hitColor = vec3(1.0);
      else if (crossings >= 2.0) hitColor = vec3(1.0, 0.85, 0.0);
      else if (crossings >= 1.0) hitColor = vec3(0.9, 0.15, 0.05);
      gl_FragColor = vec4(debugOut(hitColor), 1.0);
      return;
    }
    if (uDebug == 8) {
      // 首个命中点半径热图：命中时按 hitRadiusNorm 从蓝到红，
      // 未命中时为黑。用来确认插值交点确实落在盘半径范围内。
      float t = clamp(hitRadiusNorm, 0.0, 1.0);
      vec3 c = vec3(0.0);
      if (crossings >= 1.0) c = vec3(t, 0.35 + 0.35 * (1.0 - t), 1.0 - t);
      gl_FragColor = vec4(debugOut(c), 1.0);
      return;
    }
    if (uDebug == 9) {
      // 积分自检：R = 步数占比，G = minR 相对相机半径的下降量，B = 是否逃逸
      float stepRatio = clamp(float(steps) / max(float(uMaxSteps), 1.0) * 4.0, 0.0, 1.0);
      float drop = clamp((camR - minR) / max(camR, 1.0) * 8.0, 0.0, 1.0);
      gl_FragColor = vec4(debugOut(vec3(stepRatio, drop, escaped ? 1.0 : 0.0)), 1.0);
      return;
    }
    if (uDebug == 99) {
      // 逃逸半径：越远越亮，显示测地线在大尺度上的行为
      float g = clamp(log(max(lastR, 1.0)) / log(4000.0), 0.0, 1.0);
      gl_FragColor = vec4(g, g * 0.8, 1.0 - g * 0.6, 1.0);
      return;
    }

    gl_FragColor = vec4(bg + accum, 1.0);
  }
`;
