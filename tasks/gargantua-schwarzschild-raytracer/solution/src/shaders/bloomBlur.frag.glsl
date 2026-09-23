// bloomBlur.frag.glsl - Multi-tap separable Gaussian blur for HDR Bloom pyramid
precision highp float;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec2 uDirection;
uniform vec2 uResolution;
uniform float uThreshold;
uniform bool uExtractThreshold;

void main() {
  vec2 texel = 1.0 / uResolution;
  vec3 color = vec3(0.0);

  // 9-tap Gaussian filter kernel
  const float weights[5] = float[5](0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);

  vec3 centerSample = texture2D(uTexture, vUv).rgb;
  if (uExtractThreshold) {
    float maxBright = max(centerSample.r, max(centerSample.g, centerSample.b));
    if (maxBright < uThreshold) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
  }

  color += centerSample * weights[0];

  for (int i = 1; i < 5; i++) {
    vec2 offset = uDirection * (float(i) * texel);
    vec3 cP = texture2D(uTexture, vUv + offset).rgb;
    vec3 cM = texture2D(uTexture, vUv - offset).rgb;

    if (uExtractThreshold) {
      cP = max(cP - vec3(uThreshold), vec3(0.0));
      cM = max(cM - vec3(uThreshold), vec3(0.0));
    }

    color += (cP + cM) * weights[i];
  }

  gl_FragColor = vec4(color, 1.0);
}
