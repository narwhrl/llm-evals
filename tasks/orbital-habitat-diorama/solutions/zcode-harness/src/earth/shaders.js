// Mesh UVs keep mip derivatives continuous across the equirectangular seam.
export const globeVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vPosition = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * world;
}`;

export const globeFragment = /* glsl */ `
uniform sampler2D dayMap;
uniform sampler2D nightMap;
uniform sampler2D cloudMap;
uniform vec3 sunDirection;
uniform vec3 viewDirection;
uniform float cloudOffset;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vec3 n = normalize(vNormal);
  vec3 sun = normalize(sunDirection);
  float incidence = dot(n, sun);
  float daylight = smoothstep(-0.16, 0.20, incidence);
  vec3 land = texture2D(dayMap, vUv).rgb;
  vec3 cities = texture2D(nightMap, vUv).rgb;
  float ocean = smoothstep(0.015, 0.13, land.b - max(land.r, land.g));
  float diffuse = 0.27 + 1.15 * max(incidence, 0.0);
  vec3 day = land * diffuse;
  vec3 halfVector = normalize(sun + viewDirection);
  float glint = pow(max(dot(n, halfVector), 0.0), 75.0);
  day += vec3(0.64, 0.77, 0.84) * glint * ocean * 0.28;
  float cityMask = smoothstep(0.035, 0.22, max(cities.r, max(cities.g, cities.b)));
  vec3 night = land * vec3(0.022, 0.043, 0.085);
  night += cities * vec3(3.3, 2.25, 1.20) * cityMask;
  night += vec3(0.17, 0.064, 0.012) * cityMask;
  float cloud = texture2D(cloudMap, vUv + vec2(cloudOffset, 0.0)).r;
  cloud = smoothstep(0.14, 0.78, cloud) * 0.74;
  vec3 cloudLight = mix(vec3(0.026, 0.049, 0.088), vec3(0.91, 0.95, 1.0) * diffuse, daylight);
  vec3 color = mix(night, day, daylight);
  color = mix(color, cloudLight, cloud * mix(0.30, 0.78, daylight));
  float limb = pow(1.0 - max(dot(n, viewDirection), 0.0), 4.0);
  color += vec3(0.028, 0.13, 0.33) * limb * (0.15 + daylight * 0.65);
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export const atmosphereFragment = /* glsl */ `
uniform vec3 sunDirection;
uniform vec3 viewDirection;
uniform float twilight;
varying vec3 vNormal;
void main() {
  vec3 n = normalize(vNormal);
  float facing = max(dot(n, viewDirection), 0.0);
  float rim = pow(1.0 - facing, 4.6);
  float incidence = dot(n, normalize(sunDirection));
  float lit = smoothstep(-0.28, 0.42, incidence);
  float terminator = exp(-abs(incidence) * 8.0) * twilight;
  vec3 blue = vec3(0.13, 0.43, 1.0) * (0.26 + lit * 0.84);
  vec3 color = mix(blue, vec3(1.0, 0.30, 0.07), terminator * 0.8);
  gl_FragColor = vec4(color * 1.35, rim * (0.30 + lit * 0.66));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;
