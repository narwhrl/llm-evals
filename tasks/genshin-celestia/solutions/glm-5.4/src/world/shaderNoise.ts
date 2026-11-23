// Texture-backed fractal noise for custom shaders, so effects need no third-party noise library.

export const NOISE_UNIFORMS = /* glsl */ `
uniform sampler2D uNoise;
`;

export const NOISE_FUNCTIONS = /* glsl */ `
float noiseFbm(vec2 p) {
	float sum = 0.0;
	float amplitude = 0.5;
	for (int i = 0; i < 4; i++) {
		sum += amplitude * texture2D(uNoise, p).r;
		p = p * 2.07 + vec2(0.31, 0.17);
		amplitude *= 0.5;
	}
	return sum;
}
`;
