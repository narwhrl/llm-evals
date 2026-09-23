// Composite post-processing shader — bloom chain + ACES tone map + chromatic
// aberration + vignette + film grain. Operates on the HDR scene render
// produced by the raytracer pass and writes the final LDR image to the
// default framebuffer.

export const COMPOSITE_VERTEX = /* glsl */`#version 300 es
in vec3 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export const COMPOSITE_FRAGMENT = /* glsl */`#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uScene;
uniform sampler2D uBloom0;
uniform sampler2D uBloom1;
uniform sampler2D uBloom2;
uniform sampler2D uBloom3;
uniform float uBloomStrength;
uniform float uBloomThreshold;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromaticAberration;
uniform float uTime;

const float A = 2.51;
const float B = 0.03;
const float C = 2.43;
const float D = 0.59;
const float E = 0.14;

vec3 aces(vec3 x) {
  return clamp((x * (A * x + B)) / (x * (C * x + D) + E), 0.0, 1.0);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec3 sampleBloom(sampler2D tex, vec2 uv, float threshold) {
  vec3 c = texture(tex, uv).rgb;
  vec3 bright = max(c - vec3(threshold), vec3(0.0));
  return bright;
}

void main() {
  vec2 uv = vUv;
  vec2 center = vec2(0.5);
  vec2 toCenter = uv - center;
  float r = length(toCenter);

  float ca = uChromaticAberration * (0.6 + r);
  vec2 caDir = toCenter;
  vec3 sceneR = texture(uScene, uv + caDir * ca).rgb;
  vec3 sceneG = texture(uScene, uv).rgb;
  vec3 sceneB = texture(uScene, uv - caDir * ca).rgb;
  vec3 scene = vec3(sceneR.r, sceneG.g, sceneB.b);

  scene *= uExposure;

  vec3 b0 = sampleBloom(uBloom0, uv, uBloomThreshold);
  vec3 b1 = sampleBloom(uBloom1, uv, uBloomThreshold);
  vec3 b2 = sampleBloom(uBloom2, uv, uBloomThreshold);
  vec3 b3 = sampleBloom(uBloom3, uv, uBloomThreshold);
  vec3 bloom = (b0 * 1.0 + b1 * 0.7 + b2 * 0.45 + b3 * 0.25) * uBloomStrength;

  vec3 col = scene + bloom;

  col = aces(col);

  float vig = 1.0 - smoothstep(0.55, 1.05, r) * uVignette;
  col *= vig;

  float grain = (hash21(gl_FragCoord.xy + fract(uTime * 60.0)) - 0.5) * uGrain;
  col += grain;

  col = pow(max(col, 0.0), vec3(1.0 / 2.2));

  outColor = vec4(col, 1.0);
}
`;

export const BLOOM_DOWN_FRAGMENT = /* glsl */`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uSrc;
uniform vec2 uTexel;
uniform float uThreshold;
void main() {
  vec3 acc = vec3(0.0);
  float w = 0.0;
  for (int x = -2; x <= 2; x++) {
    for (int y = -2; y <= 2; y++) {
      vec2 off = vec2(float(x), float(y));
      float weight = 1.0 / (1.0 + dot(off, off));
      vec3 c = texture(uSrc, vUv + off * uTexel).rgb;
      vec3 bright = max(c - vec3(uThreshold), vec3(0.0));
      acc += bright * weight;
      w += weight;
    }
  }
  outColor = vec4(acc / max(w, 0.001), 1.0);
}
`;

export const BLIT_FRAGMENT = /* glsl */`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uSrc;
void main() {
  outColor = texture(uSrc, vUv);
}
`;