/**
 * Cel-shading materials for the map.
 *
 * Lit surfaces use a toon material with a four step gradient map, which gives
 * the flat bands of light that read as anime backgrounds. The ink contour is a
 * second, slightly expanded copy of the same geometry rendered back face
 * first in near-black.
 */

import * as THREE from "three";

let gradient: THREE.DataTexture | null = null;

export function toonGradient(): THREE.DataTexture {
  if (gradient) return gradient;
  // Four bands: deep shadow, shadow, light, highlight.
  const data = new Uint8Array([64, 132, 205, 255]);
  gradient = new THREE.DataTexture(data, 4, 1, THREE.RedFormat);
  gradient.minFilter = THREE.NearestFilter;
  gradient.magFilter = THREE.NearestFilter;
  gradient.generateMipmaps = false;
  gradient.needsUpdate = true;
  return gradient;
}

export interface CelMaterialOptions {
  emissive?: number;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
  side?: THREE.Side;
}

export function celMaterial(options: CelMaterialOptions = {}): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({
    color: 0xffffff,
    vertexColors: true,
    gradientMap: toonGradient(),
    emissive: new THREE.Color(options.emissive ?? 0x000000),
    emissiveIntensity: options.emissiveIntensity ?? 1,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide,
  });
}

export function inkMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: /* glsl */ `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform vec3 uInk;
      void main() {
        gl_FragColor = vec4(uInk, 1.0);
      }
    `,
    uniforms: {
      uInk: { value: new THREE.Color(0.05, 0.05, 0.07) },
    },
    side: THREE.BackSide,
    depthWrite: false,
  });
}

/**
 * Self lit surfaces: the sign band, the light boxes, the emergency lamp.
 *
 * The brightness is a uniform so the lights can flicker.
 */
export function neonMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uBrightness: { value: 1 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vColor;
      varying vec3 vNormal;
      void main() {
        vColor = color;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform float uBrightness;
      varying vec3 vColor;
      varying vec3 vNormal;
      void main() {
        float facing = 0.76 + 0.24 * abs(vNormal.y);
        gl_FragColor = vec4(vColor * uBrightness * facing, 1.0);
      }
    `,
    vertexColors: true,
  });
}

/** The night sky behind the model, a soft vertical gradient. */
export function skyMaterial(top: THREE.Color, bottom: THREE.Color): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTop: { value: top },
      uBottom: { value: bottom },
    },
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform vec3 uTop;
      uniform vec3 uBottom;
      varying vec3 vPos;
      void main() {
        float h = normalize(vPos).y * 0.5 + 0.5;
        vec3 color = mix(uBottom, uTop, pow(h, 0.7));
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
  });
}

/**
 * A pool of light on the ground under a lamp.
 *
 * The falloff is computed per fragment so the pool keeps a soft edge and is
 * clipped to the base of the model instead of spilling into the void.
 */
export function poolMaterial(
  center: THREE.Vector2,
  radius: number,
  color: THREE.Color,
  half: number,
  intensity: number,
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uCenter: { value: center },
      uRadius: { value: radius },
      uColor: { value: color },
      uHalf: { value: half },
      uIntensity: { value: intensity },
    },
    vertexShader: /* glsl */ `
      varying vec2 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform vec2 uCenter;
      uniform float uRadius;
      uniform vec3 uColor;
      uniform float uHalf;
      uniform float uIntensity;
      varying vec2 vWorld;

      void main() {
        float d = length(vWorld - uCenter);
        float a = smoothstep(uRadius, uRadius * 0.1, d);
        float edge = min(uHalf - abs(vWorld.x), uHalf - abs(vWorld.y));
        a *= smoothstep(0.0, 0.7, edge);
        if (a < 0.004) discard;
        gl_FragColor = vec4(uColor * a * uIntensity, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/** A soft additive sprite used for lamp glow and mist. */
export function glowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context is unavailable");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,246,220,0.55)");
  gradient.addColorStop(1, "rgba(255,240,200,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
