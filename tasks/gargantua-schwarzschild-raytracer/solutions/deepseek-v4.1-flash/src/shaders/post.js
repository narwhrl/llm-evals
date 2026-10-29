// 渲染后处理：Bloom（亮部提取 + 高斯模糊金字塔）+ ACES tone mapping +
// 暗角 + 胶片颗粒 + 轻微色散。
//
// 关键：tone mapping 在 ACES 之前保留 HDR 值（float 目标），
// 因此吸积盘可以远大于 1.0 而不被截断。

import { fullscreenTriangle } from './fullscreen.js';

export const brightPassShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uScene;
  uniform float uThreshold;
  uniform float uKnee;
  void main() {
    vec3 c = texture2D(uScene, vUv).rgb;
    float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
    float soft = clamp((luma - uThreshold + uKnee) / max(2.0 * uKnee, 1e-4), 0.0, 1.0);
    float contribution = max(soft * soft * uKnee, luma - uThreshold) / max(luma, 1e-4);
    gl_FragColor = vec4(c * contribution, 1.0);
  }
`;

export const blurShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uSource;
  uniform vec2 uDirection;
  void main() {
    vec3 sum = vec3(0.0);
    float weights[5];
    weights[0] = 0.227027;
    weights[1] = 0.1945946;
    weights[2] = 0.1216216;
    weights[3] = 0.054054;
    weights[4] = 0.016216;
    sum += texture2D(uSource, vUv).rgb * weights[0];
    for (int i = 1; i < 5; i++) {
      vec2 offset = uDirection * float(i);
      sum += texture2D(uSource, vUv + offset).rgb * weights[i];
      sum += texture2D(uSource, vUv - offset).rgb * weights[i];
    }
    gl_FragColor = vec4(sum, 1.0);
  }
`;

export const compositeShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uScene;
  uniform sampler2D uBloom;
  uniform float uBloomStrength;
  uniform float uExposure;
  uniform float uVignette;
  uniform float uGrain;
  uniform float uChromatic;
  uniform float uTime;
  uniform vec2 uResolution;

  // ACES filmic（Stephen Hill 的拟合，输入线性 HDR）
  vec3 acesFilm(vec3 x) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    // 调试直出：uExposure 取 0 作为旁路标记，直接输出已编码的诊断色，
    // 不再做 ACES、暗角、颗粒与色散。
    if (uExposure < 0.0001) {
      gl_FragColor = vec4(texture2D(uScene, vUv).rgb, 1.0);
      return;
    }

    vec2 centered = vUv - 0.5;
    float radius = length(centered);

    // 色散：沿径向偏移采样，中心为零
    vec2 dir = radius > 1e-5 ? centered / radius : vec2(0.0);
    vec2 shift = dir * radius * radius * uChromatic * 0.012;
    vec3 hdr;
    hdr.r = texture2D(uScene, vUv + shift).r;
    hdr.g = texture2D(uScene, vUv).g;
    hdr.b = texture2D(uScene, vUv - shift).b;

    vec3 bloom = texture2D(uBloom, vUv).rgb;
    hdr += bloom * uBloomStrength;

    hdr *= uExposure;
    vec3 mapped = acesFilm(hdr);

    // 暗角
    float vig = 1.0 - uVignette * smoothstep(0.25, 0.95, radius);
    mapped *= vig;

    // 胶片颗粒
    float grain = hash(vUv * uResolution + fract(uTime) * 137.0) - 0.5;
    mapped += grain * uGrain;

    // 线性 → sRGB 近似
    mapped = pow(max(mapped, 0.0), vec3(1.0 / 2.2));
    gl_FragColor = vec4(mapped, 1.0);
  }
`;

export const postUniforms = {
  brightPass: {
    uScene: { value: null },
    uThreshold: { value: 1.0 },
    uKnee: { value: 0.6 },
  },
  blur: {
    uSource: { value: null },
    uDirection: { value: [0, 0] },
  },
  composite: {
    uScene: { value: null },
    uBloom: { value: null },
    uBloomStrength: { value: 0.85 },
    uExposure: { value: 1.0 },
    uVignette: { value: 0.35 },
    uGrain: { value: 0.025 },
    uChromatic: { value: 0.6 },
    uTime: { value: 0 },
    uResolution: { value: [1, 1] },
  },
};

export const fullscreenGeometry = fullscreenTriangle;

// 调试直通：把已编码的诊断色原样贴到屏幕，不做任何 tone mapping。
export const copyFragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uScene;
  void main() {
    gl_FragColor = vec4(texture2D(uScene, vUv).rgb, 1.0);
  }
`;
