precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uScene;
uniform sampler2D uBloom0;
uniform sampler2D uBloom1;
uniform sampler2D uBloom2;
uniform sampler2D uBloom3;
uniform int uBloomLevels;
uniform int uDebug;
uniform bool uRgbm;
uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromaticAberration;
uniform float uTime;
uniform vec2 uResolution;

vec3 unpackColor(vec4 value) {
  return uRgbm ? value.rgb * value.a * 16.0 : value.rgb;
}
vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}
float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
void main() {
  vec2 edge = (vUv - 0.5) * uChromaticAberration;
  vec3 source;
  if (uDebug > 0 || uChromaticAberration <= 0.00001) {
    source = unpackColor(texture(uScene, vUv));
  } else {
    source = vec3(unpackColor(texture(uScene, clamp(vUv + edge, 0.0, 1.0))).r,
                  unpackColor(texture(uScene, vUv)).g,
                  unpackColor(texture(uScene, clamp(vUv - edge, 0.0, 1.0))).b);
  }
  if (uDebug > 0) {
    outColor = vec4(pow(clamp(source, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
    return;
  }
  vec3 bloom = vec3(0.0);
  if (uBloomLevels > 0) bloom += unpackColor(texture(uBloom0, vUv)) * 0.38;
  if (uBloomLevels > 1) bloom += unpackColor(texture(uBloom1, vUv)) * 0.29;
  if (uBloomLevels > 2) bloom += unpackColor(texture(uBloom2, vUv)) * 0.21;
  if (uBloomLevels > 3) bloom += unpackColor(texture(uBloom3, vUv)) * 0.12;
  vec3 color = aces((source + bloom * uBloomStrength) * uExposure);
  float radius = length((vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0));
  color *= 1.0 - uVignette * smoothstep(0.32, 0.9, radius);
  float grain = hash21(gl_FragCoord.xy + floor(uTime * 24.0)) - 0.5;
  color += grain * uGrain;
  outColor = vec4(pow(clamp(color, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}
