// ============================================================================
// 后处理合成 Pass：径向色散 → 曝光 → ACES tone mapping → 暗角 → 胶片颗粒 → sRGB
// 输入为线性 HDR（HalfFloat），输出为 sRGB 显示色。
// ============================================================================
uniform sampler2D tDiffuse;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChroma;
uniform float uTime;
uniform float uAspect;
uniform int uCATaps;

varying vec2 vUv;

// Narkowicz (2015) ACESFilmic 拟合近似（明确实现的 ACES tone mapping）
vec3 acesFitted(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

vec3 linearToSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(max(c, 1e-5), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// 径向色散：沿 UV 径向偏移采样，R/B 通道反向偏移（G 不偏移）。
// uCATaps = 3：三采样；uCATaps = 5：增加 ±0.5 级插值采样（质量档预算之一）。
vec3 sampleCA(sampler2D tex, vec2 uv, vec2 dir, float amount, int taps) {
  if (amount <= 1e-4) return texture2D(tex, uv).rgb;
  vec2 off = dir * amount * 0.012;
  if (taps >= 5) {
    float r = 0.6 * texture2D(tex, uv + off).r + 0.4 * texture2D(tex, uv + 0.5 * off).r;
    float g = texture2D(tex, uv).g;
    float b = 0.6 * texture2D(tex, uv - off).b + 0.4 * texture2D(tex, uv - 0.5 * off).b;
    return vec3(r, g, b);
  }
  return vec3(texture2D(tex, uv + off).r, texture2D(tex, uv).g, texture2D(tex, uv - off).b);
}

void main() {
  vec2 uv = vUv;
  vec2 dir = uv - 0.5;

  vec3 hdr = sampleCA(tDiffuse, uv, dir, uChroma, uCATaps);
  vec3 col = acesFitted(hdr * uExposure);

  // 克制的暗角：边缘轻微压暗，不遮挡光子环与多次盘面像
  float vig = smoothstep(1.25, 0.35, length(dir * vec2(uAspect, 1.0)) * 1.4);
  col *= mix(1.0, vig, uVignette);

  // 胶片颗粒（capture 模式下 uTime 冻结 → 截图确定性）
  float grainN = hash12(uv * 913.0 + floor(uTime * 60.0)) - 0.5;
  col += grainN * uGrain * 0.2;

  gl_FragColor = vec4(linearToSrgb(col), 1.0);
}
