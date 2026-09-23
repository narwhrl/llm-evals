// composite.frag.glsl - HDR Post-Processing: Bloom composite, ACES tonemapping, vignette, grain, aberration
precision highp float;

varying vec2 vUv;

uniform sampler2D uSceneTexture;
uniform sampler2D uBloomTexture;
uniform int uDebugMode;

// Uniforms
uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignetteStrength;
uniform float uGrainStrength;
uniform float uChromaticAberration;
uniform float uTime;

// High-quality pseudo-random noise generator for film grain
float randomNoise(vec2 coord, float seed) {
  return fract(sin(dot(coord + seed, vec2(12.9898, 78.233))) * 43758.5453123);
}

// ACES Filmic Tone Mapping Curve (Krzysztof Narkowicz)
vec3 acesFilm(vec3 x) {
  float a = 2.51;
  float b = 0.03;
  float c = 2.43;
  float d = 0.59;
  float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
  // If in diagnostic debug mode (1-9), pass through raw diagnostic color without distortion
  if (uDebugMode != 0) {
    gl_FragColor = texture2D(uSceneTexture, vUv);
    return;
  }

  vec2 uv = vUv;
  vec2 distVec = uv - 0.5;
  float dist2 = dot(distVec, distVec);

  // 1. Radial Chromatic Aberration
  vec2 caOffset = distVec * (dist2 * uChromaticAberration * 8.0);
  float r = texture2D(uSceneTexture, uv + caOffset).r;
  float g = texture2D(uSceneTexture, uv).g;
  float b = texture2D(uSceneTexture, uv - caOffset).b;
  vec3 sceneColor = vec3(r, g, b);

  // 2. Additive Bloom Composite
  vec3 bloom = texture2D(uBloomTexture, uv).rgb;
  vec3 hdrColor = sceneColor + bloom * uBloomStrength;

  // 3. Exposure Scaling
  hdrColor *= uExposure;

  // 4. ACES Filmic Tonemapping
  vec3 ldrColor = acesFilm(hdrColor);

  // 5. Cinematic Vignette
  float vignette = 1.0 - smoothstep(0.2, 0.85, sqrt(dist2)) * uVignetteStrength;
  ldrColor *= vignette;

  // 6. Micro Film Grain
  float grain = (randomNoise(uv * 1024.0, fract(uTime * 17.13)) - 0.5) * uGrainStrength;
  ldrColor += grain;

  // Gamma correction to sRGB
  vec3 finalColor = pow(clamp(ldrColor, 0.0, 1.0), vec3(1.0 / 2.2));

  gl_FragColor = vec4(finalColor, 1.0);
}
