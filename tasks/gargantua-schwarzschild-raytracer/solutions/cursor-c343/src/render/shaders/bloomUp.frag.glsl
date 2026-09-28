// Bloom upsample: 3×3 tent filter of the coarser level added onto the current
// level's downsample. uScatter < 1 attenuates each wider level so the glow stays
// tight around hot structure and leaves the event-horizon shadow dark.
precision highp float;

in vec2 vUv;
layout(location = 0) out vec4 fragColor;

uniform sampler2D uCoarse;
uniform sampler2D uCurrent;
uniform vec2 uCoarseTexel;
uniform float uScatter;

void main() {
  vec2 t = uCoarseTexel;
  vec3 tent = texture(uCoarse, vUv + vec2(-t.x, -t.y)).rgb
    + 2.0 * texture(uCoarse, vUv + vec2(0.0, -t.y)).rgb
    + texture(uCoarse, vUv + vec2(t.x, -t.y)).rgb
    + 2.0 * texture(uCoarse, vUv + vec2(-t.x, 0.0)).rgb
    + 4.0 * texture(uCoarse, vUv).rgb
    + 2.0 * texture(uCoarse, vUv + vec2(t.x, 0.0)).rgb
    + texture(uCoarse, vUv + vec2(-t.x, t.y)).rgb
    + 2.0 * texture(uCoarse, vUv + vec2(0.0, t.y)).rgb
    + texture(uCoarse, vUv + vec2(t.x, t.y)).rgb;
  fragColor = vec4(texture(uCurrent, vUv).rgb + tent * (uScatter / 16.0), 1.0);
}
