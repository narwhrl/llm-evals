import * as THREE from 'three';

/**
 * Mirror-camera planar reflection for the wet ground.
 *
 * The reflection is rendered once per frame from a camera mirrored across the
 * road plane into a half-resolution target. Wet surface materials then sample
 * that target with projective coordinates, adding ripple distortion, a grazing
 * angle boost and per-surface tint so asphalt, sidewalk and alley read as
 * different amounts of water on the same night.
 */
export class PlanarReflection {
  constructor(renderer, { planeY = 0.35, scale = 0.42, exclude = [] } = {}) {
    this.renderer = renderer;
    this.planeY = planeY;
    this.scale = scale;
    this.exclude = exclude;

    this.camera = new THREE.PerspectiveCamera();
    this.camera.matrixAutoUpdate = true;

    this.target = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
      generateMipmaps: false,
    });
    this.target.texture.colorSpace = THREE.NoColorSpace;

    this._normal = new THREE.Vector3(0, 1, 0);
    this._view = new THREE.Vector3();
    this._target = new THREE.Vector3();
    this._lookAt = new THREE.Vector3();
    this._rotation = new THREE.Matrix4();
    this._bias = new THREE.Matrix4().set(
      0.5, 0, 0, 0.5,
      0, 0.5, 0, 0.5,
      0, 0, 0.5, 0.5,
      0, 0, 0, 1,
    );
    this.textureMatrix = new THREE.Matrix4();
    this._hidden = [];
  }

  setSize(width, height) {
    this.target.setSize(
      Math.max(2, Math.round(width * this.scale)),
      Math.max(2, Math.round(height * this.scale)),
    );
  }

  /**
   * Recomputes the mirrored camera for the current viewer.
   * Returns false when the viewer is below the plane, in which case the last
   * valid reflection is kept instead of rendering a broken image.
   */
  updateCamera(camera) {
    const planeY = this.planeY;
    const camPos = camera.position;
    if (camPos.y <= planeY + 0.05) return false;

    this.camera.position.set(camPos.x, planeY * 2 - camPos.y, camPos.z);

    // Mirror the look direction and up vector across the horizontal plane.
    this._rotation.extractRotation(camera.matrixWorld);
    this._lookAt.set(0, 0, -1).applyMatrix4(this._rotation).add(camPos);
    this._target.set(
      this._lookAt.x,
      planeY * 2 - this._lookAt.y,
      this._lookAt.z,
    );

    this.camera.up.set(0, 1, 0).applyMatrix4(this._rotation);
    this.camera.up.reflect(this._normal);
    this.camera.lookAt(this._target);
    this.camera.near = camera.near;
    this.camera.far = camera.far;
    this.camera.fov = camera.fov;
    this.camera.aspect = camera.aspect;
    this.camera.updateProjectionMatrix();
    this.camera.projectionMatrix.copy(camera.projectionMatrix);
    this.camera.updateMatrixWorld();

    return true;
  }

  render(scene) {
    const renderer = this.renderer;
    for (const object of this.exclude) {
      if (!object) continue;
      this._hidden.push([object, object.visible]);
      object.visible = false;
    }

    const previousTarget = renderer.getRenderTarget();
    const previousShadowAuto = renderer.shadowMap.autoUpdate;
    renderer.shadowMap.autoUpdate = false;
    renderer.setRenderTarget(this.target);
    renderer.clear();
    renderer.render(scene, this.camera);
    renderer.setRenderTarget(previousTarget);
    renderer.shadowMap.autoUpdate = previousShadowAuto;

    for (const [object, visible] of this._hidden) object.visible = visible;
    this._hidden.length = 0;
  }

  /** Per-mesh projective matrix; surfaces at different heights reuse the same mirror. */
  textureMatrixFor(object) {
    return new THREE.Matrix4()
      .copy(this._bias)
      .multiply(this.camera.projectionMatrix)
      .multiply(this.camera.matrixWorldInverse)
      .multiply(object.matrixWorld);
  }
}

const WET_VERT = /* glsl */ `
  uniform mat4 uTextureMatrix;
  varying vec4 vReflectCoord;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vReflectCoord = uTextureMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const WET_FRAG = /* glsl */ `
  uniform sampler2D tReflect;
  uniform sampler2D tSurface;
  uniform float uTime;
  uniform float uWet;
  uniform float uReflectStrength;
  uniform float uReflectionBlur;
  uniform float uPuddleContrast;
  uniform float uRipple;
  uniform float uGrain;
  uniform vec3 uBaseColor;
  uniform vec3 uReflectTint;
  uniform vec3 uRippleTint;
  uniform vec3 uGlowTint;
  uniform vec3 uSkyTint;
  uniform float uGlow;
  uniform vec2 uTiling;

  varying vec4 vReflectCoord;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // ShaderMaterial samples textures raw, so the sRGB-authored surface artwork
  // has to be decoded by hand. Without this the albedo is treated as linear and
  // the road crushes to near black, hiding every reflection.
  vec3 srgbToLinear(vec3 c) {
    return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
  }

  void main() {
    vec2 uv = vUv * uTiling;
    vec4 surfaceTexel = texture2D(tSurface, uv);
    vec3 surface = srgbToLinear(surfaceTexel.rgb);

    // Puddle mask: the alpha channel holds soft blobs authored per surface.
    float puddle = clamp((surfaceTexel.a - 0.5) * uPuddleContrast + 0.5, 0.0, 1.0);
    puddle = smoothstep(0.18, 0.86, puddle);

    float wet = clamp(uWet * (0.42 + 0.85 * puddle), 0.0, 1.0);

    // Animated micro-ripples from falling rain, stronger inside puddles.
    vec2 p = vWorldPos.xz;
    float t = uTime;
    float a = sin(p.x * 6.2 + p.y * 2.1 + t * 1.9);
    float b = sin(p.y * 8.7 - p.x * 1.7 - t * 1.4);
    float c = sin((p.x + p.y) * 11.3 + t * 2.6);
    vec2 ripple = vec2(a * 0.6 + c * 0.4, b * 0.6 + c * 0.3) * uRipple * (0.35 + puddle);

    vec3 coord = vReflectCoord.xyz / max(vReflectCoord.w, 1e-4);
    vec2 baseUv = coord.xy + ripple;
    vec3 refl = texture2D(tReflect, baseUv).rgb;
    if (uReflectionBlur > 0.0) {
      vec3 up = texture2D(tReflect, baseUv + vec2(0.0, uReflectionBlur)).rgb;
      vec3 down = texture2D(tReflect, baseUv - vec2(0.0, uReflectionBlur)).rgb;
      refl = (refl * 2.0 + up + down) * 0.25;
    }

    float grazing = 1.0 - clamp(vViewDir.y, 0.0, 1.0);
    float fresnel = pow(grazing, 1.55);

    // Even at a steep viewing angle wet asphalt keeps a floor of reflectivity;
    // without it the road reads as dry tarmac from the default camera height.
    float strength = clamp(wet * (0.42 + 0.9 * fresnel), 0.0, 0.96) * uReflectStrength;

    vec3 base = uBaseColor * surface;
    float grain = hash21(floor(vWorldPos.xz * 210.0));
    base *= 0.92 + 0.16 * grain * uGrain;
    base = mix(base, base * 1.22 + 0.02, puddle * 0.55);
    vec3 color = mix(base, refl * uReflectTint, strength);

    // Wet surfaces also pick up the ambient night sky, not only mirrored
    // geometry. Without this the road goes black wherever nothing bright sits
    // directly above it, which loses the asphalt material entirely.
    float skyFacing = clamp(vViewDir.y * 0.5 + 0.5, 0.0, 1.0);
    color += uSkyTint * (0.06 + 0.18 * puddle) * wet * skyFacing;

    // Thin bright rims where ripples catch the light.
    float crest = max(0.0, a * b) * max(0.0, c);
    color += uRippleTint * pow(crest, 2.0) * 0.16 * wet * uRipple * 40.0;

    // Light pooling directly under the lamps and shopfront.
    color += uGlowTint * uGlow * (0.35 + 0.65 * puddle);

    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * Builds a wet, reflective surface material.
 * `surface` must carry colour in RGB and puddle coverage in alpha.
 * `baseColor` is a tint multiplied onto the surface artwork, so it should stay
 * near white; a dark value would multiply two dark colours and crush the road.
 */
export function createWetMaterial({
  reflection,
  surface,
  baseColor = 0x1a2030,
  reflectTint = 0xb9c8e8,
  rippleTint = 0xcfe0ff,
  glowTint = 0x000000,
  skyTint = 0x2b3c5c,
  wet = 1,
  reflectStrength = 1,
  reflectionBlur = 0.004,
  puddleContrast = 1,
  ripple = 0.004,
  grain = 1,
  glow = 0,
  tiling = [1, 1],
}) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      tReflect: { value: reflection.target.texture },
      tSurface: { value: surface },
      uTextureMatrix: { value: new THREE.Matrix4() },
      uTime: { value: 0 },
      uWet: { value: wet },
      uReflectStrength: { value: reflectStrength },
      uReflectionBlur: { value: reflectionBlur },
      uPuddleContrast: { value: puddleContrast },
      uRipple: { value: ripple },
      uGrain: { value: grain },
      uBaseColor: { value: new THREE.Color(baseColor) },
      uReflectTint: { value: new THREE.Color(reflectTint) },
      uRippleTint: { value: new THREE.Color(rippleTint) },
      uGlowTint: { value: new THREE.Color(glowTint) },
      uSkyTint: { value: new THREE.Color(skyTint) },
      uGlow: { value: glow },
      uTiling: { value: new THREE.Vector2(tiling[0], tiling[1]) },
    },
    vertexShader: WET_VERT,
    fragmentShader: WET_FRAG,
  });
  material.userData.isWet = true;
  return material;
}

/**
 * Refreshes the projective matrix for every wet surface after camera moves.
 * The reflection texture is re-bound here too: resizing a WebGLRenderTarget
 * disposes and recreates its texture, so a uniform captured at material
 * construction time would otherwise point at a dead texture.
 */
export function syncWetMatrices(reflection, meshes) {
  const targetTexture = reflection.target.texture;
  for (const mesh of meshes) {
    mesh.updateMatrixWorld();
    const uniforms = mesh.material.uniforms;
    uniforms.uTextureMatrix.value.copy(reflection.textureMatrixFor(mesh));
    if (uniforms.tReflect.value !== targetTexture) uniforms.tReflect.value = targetTexture;
  }
}
