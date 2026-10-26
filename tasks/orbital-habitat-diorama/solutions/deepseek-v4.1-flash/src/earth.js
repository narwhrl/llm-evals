import * as THREE from "three";
import dayUrl from "./assets/earth_day.jpg";
import nightUrl from "./assets/earth_night.png";
import cloudsUrl from "./assets/earth_clouds.png";
import { canvasTexture, makeCanvas } from "./utils.js";

const earthVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const earthFragment = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uClouds;
  uniform vec3 uSunDir;
  uniform vec2 uCloudOffset;
  uniform vec3 uAtmosphere;
  uniform float uNightMix;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float ndl = dot(N, uSunDir);
    float dayFactor = smoothstep(-0.10, 0.26, ndl);
    // When the station is in Earth's shadow the visible hemisphere is the night
    // side, so the whole disc shifts to the city-light map.
    dayFactor = mix(dayFactor, 0.0, uNightMix);
    // The night side is still lit by its own city lights: keep them strong
    // enough to read as golden veins through the glass.
    float nightGain = mix(1.0, 1.9, uNightMix);

    vec3 day = texture2D(uDay, vUv).rgb;
    vec3 night = texture2D(uNight, vUv).rgb;
    vec4 clouds = texture2D(uClouds, vUv + uCloudOffset);

    // The NASA night map is dark blue with warm city lights: push the lights
    // toward gold and keep the ocean/land base near black-blue.
    float cityLuma = dot(night, vec3(0.299, 0.587, 0.114));
    // Only genuinely bright pixels are city lights; the map's dark background
    // must stay dark or the whole disc turns into a grey plate.
    float lights = smoothstep(0.1, 0.4, cityLuma);
    vec3 cityGlow = vec3(1.0, 0.62, 0.22) * lights * 9.0;
    vec3 nightBase = night * 0.09 + vec3(0.004, 0.009, 0.02);

    float lit = clamp(ndl, 0.0, 1.0);
    vec3 dayColor = day * (0.16 + 1.5 * lit);
    vec3 cloudColor = vec3(1.0, 0.985, 0.95) * (0.18 + 1.35 * lit);
    dayColor = mix(dayColor, cloudColor, clouds.a * 0.9);

    vec3 nightColor = (cityGlow + nightBase) * nightGain;
    // Clouds are sunlit white; on the night side they must not wash the disc
    // out, so they only dim the city lights slightly.
    nightColor *= 1.0 - clouds.a * 0.45;

    vec3 color = mix(nightColor, dayColor, dayFactor);

    // Atmospheric limb: a bright blue rim hugging the sphere's edge. Because the
    // globe is only slightly larger than the window, this rim is visible inside
    // the glass and reads as the planet's curvature.
    float rim = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.2);
    color += uAtmosphere * rim * mix(0.5 + 1.6 * dayFactor, 1.1, uNightMix);

    // Warm haze just inside the terminator.
    float band = smoothstep(0.0, 0.18, ndl) * (1.0 - smoothstep(0.18, 0.5, ndl));
    color += vec3(0.30, 0.15, 0.06) * band * 0.55 * (1.0 - uNightMix);

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const glowVertex = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const glowFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uSunDir;
  uniform float uStrength;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float fres = pow(clamp(1.0 - dot(N, V), 0.0, 1.0), 3.0);
    float sun = smoothstep(-0.35, 0.45, dot(N, uSunDir));
    float alpha = fres * uStrength * (0.18 + 0.95 * sun);
    gl_FragColor = vec4(uColor * alpha, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

// The palette cloud PNG is converted into a white cloud sheet whose alpha is
// the cloud coverage, so it can be composited inside the Earth shader.
function loadCloudAlpha(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = makeCanvas(image.width, image.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const px = data.data;
      for (let i = 0; i < px.length; i += 4) {
        const lum = Math.max(px[i], px[i + 1], px[i + 2]) / 255;
        px[i] = 255;
        px[i + 1] = 255;
        px[i + 2] = 255;
        px[i + 3] = Math.round(255 * lum * (px[i + 3] / 255));
      }
      ctx.putImageData(data, 0, 0);
      resolve(canvasTexture(canvas, { repeat: [1, 1] }));
    };
    image.onerror = () => reject(new Error(`Failed to load ${url}`));
    image.src = url;
  });
}

// The NASA night map's city lights are sparse at 2048 px: only ~3% of pixels
// are bright. Bloom the lights into a continuous golden network so the orbit
// reads as "city lights like veins" through the glass, while the dark ocean and
// land stay dark.
function brightenNightLights(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = makeCanvas(image.width, image.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const px = data.data;
      const w = canvas.width;
      const h = canvas.height;

      // Extract a light mask.
      const mask = new Float32Array(w * h);
      for (let i = 0, p = 0; i < px.length; i += 4, p += 1) {
        const luma = (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;
        mask[p] = Math.max(0, (luma - 0.06) / 0.5);
      }

      // Two-pass separable box blur widens each light into a soft cluster.
      const radius = 3;
      const tmp = new Float32Array(w * h);
      const out = new Float32Array(w * h);
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          let sum = 0;
          let n = 0;
          for (let dx = -radius; dx <= radius; dx += 1) {
            const xx = x + dx;
            if (xx < 0 || xx >= w) continue;
            sum += mask[y * w + xx];
            n += 1;
          }
          tmp[y * w + x] = sum / n;
        }
      }
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          let sum = 0;
          let n = 0;
          for (let dy = -radius; dy <= radius; dy += 1) {
            const yy = y + dy;
            if (yy < 0 || yy >= h) continue;
            sum += tmp[yy * w + x];
            n += 1;
          }
          out[y * w + x] = sum / n;
        }
      }

      // Composite: keep the original warm lights and add the bloom.
      for (let i = 0, p = 0; i < px.length; i += 4, p += 1) {
        const glow = Math.min(1, out[p] * 2.4);
        px[i] = Math.min(255, px[i] * 1.15 + glow * 255);
        px[i + 1] = Math.min(255, px[i + 1] * 1.05 + glow * 196);
        px[i + 2] = Math.min(255, px[i + 2] * 0.95 + glow * 110);
      }
      ctx.putImageData(data, 0, 0);
      resolve(canvasTexture(canvas, { repeat: [1, 1] }));
    };
    image.onerror = () => reject(new Error(`Failed to load ${url}`));
    image.src = url;
  });
}

export async function loadEarthTextures() {
  const loader = new THREE.TextureLoader();
  const [day, night, clouds] = await Promise.all([
    loader.loadAsync(dayUrl),
    brightenNightLights(nightUrl),
    loadCloudAlpha(cloudsUrl),
  ]);
  for (const texture of [day, night, clouds]) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.anisotropy = 8;
  }
  return { day, night, clouds };
}

// One globe per porthole. Each is a real 3D sphere with equirectangular maps,
// anchored in screen space behind its window: the composition therefore stays
// identical while the diorama rotates, and each window shows the same planet
// from a slightly different longitude.
export function createGlobe(textures, { radius, stencilRef, longitude, tilt = 0.18 }) {
  const group = new THREE.Group();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uDay: { value: textures.day },
      uNight: { value: textures.night },
      uClouds: { value: textures.clouds },
      uSunDir: { value: new THREE.Vector3(0, 0.4, 1).normalize() },
      uCloudOffset: { value: new THREE.Vector2(0, 0) },
      uAtmosphere: { value: new THREE.Color("#5aa7ff") },
      uNightMix: { value: 0 },
    },
    vertexShader: earthVertex,
    fragmentShader: earthFragment,
    toneMapped: false,
    stencilWrite: true,
    stencilRef,
    stencilFunc: THREE.EqualStencilFunc,
    stencilFail: THREE.KeepStencilOp,
    stencilZFail: THREE.KeepStencilOp,
    stencilZPass: THREE.KeepStencilOp,
  });

  const globe = new THREE.Mesh(new THREE.SphereGeometry(radius, 128, 96), material);
  globe.renderOrder = 10;
  group.add(globe);

  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color("#5fb4ff") },
      uSunDir: { value: new THREE.Vector3(0, 0.4, 1).normalize() },
      uStrength: { value: 1.15 },
    },
    vertexShader: glowVertex,
    fragmentShader: glowFragment,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.FrontSide,
    toneMapped: false,
    stencilWrite: true,
    stencilRef,
    stencilFunc: THREE.EqualStencilFunc,
    stencilFail: THREE.KeepStencilOp,
    stencilZFail: THREE.KeepStencilOp,
    stencilZPass: THREE.KeepStencilOp,
  });
  const glow = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.008, 96, 64), glowMaterial);
  glow.renderOrder = 11;
  group.add(glow);

  group.rotation.z = tilt;
  globe.rotation.y = longitude;

  return {
    group,
    globe,
    glow,
    material,
    glowMaterial,
    setSun(direction) {
      material.uniforms.uSunDir.value.copy(direction);
      glowMaterial.uniforms.uSunDir.value.copy(direction);
    },
    setNight(nightMix) {
      material.uniforms.uNightMix.value = nightMix;
    },
    update(dt, orbitPhase) {
      material.uniforms.uCloudOffset.value.x = (material.uniforms.uCloudOffset.value.x + dt * 0.0035) % 1;
      globe.rotation.y = longitude + orbitPhase * 0.9;
    },
  };
}
