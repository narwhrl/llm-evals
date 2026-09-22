// 三渲二（cel shading）基底：4 阶渐变映射 + MeshToonMaterial 工厂 + 雨水冲刷注入。
import * as THREE from 'three';

const GRADIENT_STEPS = 4;

// 共享的阶跃渐变图：NearestFilter 让光照被量化成硬边色阶，形成卡通块面。
export function createGradientMap() {
  const data = new Uint8Array(GRADIENT_STEPS * 4);
  const levels = [0.4, 0.6, 0.8, 1];
  for (let i = 0; i < GRADIENT_STEPS; i += 1) {
    const v = Math.round(levels[i] * 255);
    data[i * 4] = v;
    data[i * 4 + 1] = v;
    data[i * 4 + 2] = v;
    data[i * 4 + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, GRADIENT_STEPS, 1, THREE.RGBAFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

export const gradientMap = createGradientMap();

export function toonMaterial(options = {}) {
  const {
    color = 0xffffff,
    map = null,
    normalMap = null,
    normalScale = 1,
    emissive = 0x000000,
    emissiveMap = null,
    emissiveIntensity = 1,
    transparent = false,
    opacity = 1,
    alphaTest = 0,
    side = THREE.FrontSide,
    depthWrite = true,
    polygonOffset = false,
    polygonOffsetFactor = 0,
    polygonOffsetUnits = 0,
    fog = true,
  } = options;

  const material = new THREE.MeshToonMaterial({
    color,
    map,
    normalMap,
    emissive,
    emissiveMap,
    emissiveIntensity,
    gradientMap,
    transparent,
    opacity,
    alphaTest,
    side,
    depthWrite,
    fog,
  });
  if (normalMap) material.normalScale.set(normalScale, normalScale);
  if (polygonOffset) {
    material.polygonOffset = true;
    material.polygonOffsetFactor = polygonOffsetFactor;
    material.polygonOffsetUnits = polygonOffsetUnits;
  }
  return material;
}

// 自发光材质（灯罩、灯管、警灯）：颜色被推高到 1 以上，便于 Bloom 提取光晕。
export function glowMaterial(color, { opacity = 1, transparent = false, boost = 1.8 } = {}) {
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color).multiplyScalar(boost),
    transparent,
    opacity,
    fog: false,
    toneMapped: true,
  });
  return material;
}

const runoffUniformTime = { value: 0 };

export function setRunoffTime(seconds) {
  runoffUniformTime.value = seconds;
}

// 给材质注入「雨水沿表面下淌」的滚动条纹：只改 diffuse，不增加 draw call。
export function addRunoff(material, options = {}) {
  const { map, scale = [0.35, 0.18], speed = 0.24, amount = 0.34, tint = 0.55 } = options;

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRunoffMap = { value: map };
    shader.uniforms.uRunoffTime = runoffUniformTime;
    shader.uniforms.uRunoffScale = { value: new THREE.Vector2(scale[0], scale[1]) };
    shader.uniforms.uRunoffSpeed = { value: speed };
    shader.uniforms.uRunoffAmount = { value: amount };
    shader.uniforms.uRunoffTint = { value: tint };

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        ['#include <common>', 'varying vec3 vRunoffWorld;'].join('\n'),
      )
      .replace(
        '#include <begin_vertex>',
        [
          '#include <begin_vertex>',
          '#ifdef USE_INSTANCING',
          '  vec3 runoffLocal = (instanceMatrix * vec4(transformed, 1.0)).xyz;',
          '#else',
          '  vec3 runoffLocal = transformed;',
          '#endif',
          'vRunoffWorld = (modelMatrix * vec4(runoffLocal, 1.0)).xyz;',
        ].join('\n'),
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        [
          '#include <common>',
          'uniform sampler2D uRunoffMap;',
          'uniform float uRunoffTime;',
          'uniform vec2 uRunoffScale;',
          'uniform float uRunoffSpeed;',
          'uniform float uRunoffAmount;',
          'uniform float uRunoffTint;',
          'varying vec3 vRunoffWorld;',
        ].join('\n'),
      )
      .replace(
        '#include <map_fragment>',
        [
          '#include <map_fragment>',
          'vec2 runoffUv = vec2(vRunoffWorld.x + vRunoffWorld.z, vRunoffWorld.y);',
          'runoffUv *= uRunoffScale;',
          'runoffUv.y -= uRunoffTime * uRunoffSpeed;',
          'float runoff = texture2D(uRunoffMap, runoffUv).r;',
          'float runoffMask = smoothstep(0.28, 0.85, runoff);',
          'diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb + uRunoffTint, runoffMask * uRunoffAmount);',
        ].join('\n'),
      );
  };
  material.customProgramCacheKey = () => 'runoff';
  return material;
}
