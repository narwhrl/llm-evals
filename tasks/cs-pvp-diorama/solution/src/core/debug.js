// 构建期调试/审计接口：仅在 window.__diorama 上暴露只读统计与不产生界面元素的控制方法。
import * as THREE from 'three';
import { BASE_HALF, LAYER, VIEWS } from './stage.js';

const FORBIDDEN_NAME_PATTERN = /person|human|mannequin|character|actor|player|soldier/i;

export function installDebugApi(state) {
  const { renderer, scene, camera, controlsApi, pipeline, reflection, lightRig, world, fx, frames, tick } = state;
  const box = new THREE.Box3();

  function audit() {
    let objects = 0;
    let meshes = 0;
    let instances = 0;
    let triangles = 0;
    const materials = new Set();
    const violations = [];
    const forbidden = [];

    const bounds = new THREE.Box3();
    bounds.makeEmpty();

    scene.traverse((object) => {
      objects += 1;
      if (FORBIDDEN_NAME_PATTERN.test(object.name)) forbidden.push(object.name);
      if (!object.isMesh && !object.isInstancedMesh) return;
      if (object.userData.auditExclude) return;

      meshes += 1;
      const count = object.isInstancedMesh ? object.count : 1;
      instances += count;
      const geometry = object.geometry;
      if (geometry && geometry.index) triangles += (geometry.index.count / 3) * count;
      else if (geometry && geometry.attributes.position) triangles += (geometry.attributes.position.count / 3) * count;
      const material = object.material;
      if (Array.isArray(material)) material.forEach((m) => materials.add(m));
      else if (material) materials.add(material);

      box.setFromObject(object);
      if (!box.isEmpty()) {
        // 只审计静态世界层：特效层与地面层允许超出底座高度范围。
        if (object.layers.mask & (1 << LAYER.WORLD)) {
          bounds.union(box);
          const limit = BASE_HALF + 0.2;
          if (box.min.x < -limit || box.max.x > limit || box.min.z < -limit || box.max.z > limit) {
            violations.push({
              name: object.name || object.type,
              reason: 'outside base footprint',
              min: [round(box.min.x), round(box.min.y), round(box.min.z)],
              max: [round(box.max.x), round(box.max.y), round(box.max.z)],
            });
          }
          if (box.min.y < -0.05) {
            violations.push({
              name: object.name || object.type,
              reason: 'below base surface',
              min: [round(box.min.x), round(box.min.y), round(box.min.z)],
            });
          }
        }
      }
    });

    const domNodes = Array.from(document.body.children).map((node) => ({
      tag: node.tagName.toLowerCase(),
      visible: getComputedStyle(node).display !== 'none' && getComputedStyle(node).visibility !== 'hidden',
    }));

    return {
      fps: frames.fps,
      frameMs: frames.frameMs,
      objects,
      meshes,
      instances,
      triangles: Math.round(triangles),
      drawCalls: renderer.info.render.calls,
      programs: renderer.info.programs ? renderer.info.programs.length : 0,
      materials: materials.size,
      textures: renderer.info.memory.textures,
      geometries: renderer.info.memory.geometries,
      lights: lightRig.count,
      animatedLights: lightRig.animated,
      bounds: bounds.isEmpty()
        ? null
        : {
            min: [round(bounds.min.x), round(bounds.min.y), round(bounds.min.z)],
            max: [round(bounds.max.x), round(bounds.max.y), round(bounds.max.z)],
          },
      violations,
      forbiddenNames: forbidden,
      domNodes,
      baseHalf: BASE_HALF,
      camera: {
        position: [round(camera.position.x), round(camera.position.y), round(camera.position.z)],
        distance: round(camera.position.distanceTo(controlsApi.controls.target)),
        azimuth: round(controlsApi.controls.getAzimuthalAngle()),
        polar: round(controlsApi.controls.getPolarAngle()),
        target: [round(controlsApi.controls.target.x), round(controlsApi.controls.target.y), round(controlsApi.controls.target.z)],
      },
      fx: fx ? fx.audit() : null,
      world: world ? world.audit() : null,
    };
  }

  const api = {
    ready: true,
    views: Object.keys(VIEWS),
    // 供离线取证脚本访问（不产生界面元素）
    scene,
    renderer,
    camera,
    audit,
    setView(name) {
      const view = VIEWS[name];
      if (!view) throw new Error(`unknown view: ${name}`);
      controlsApi.setView(view);
      return api.audit().camera;
    },
    setCamera({ position, target, fov }) {
      if (position) camera.position.set(position[0], position[1], position[2]);
      if (target) controlsApi.controls.target.set(target[0], target[1], target[2]);
      if (fov) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      camera.updateMatrixWorld();
      controlsApi.controls.update();
      return api.audit().camera;
    },
    setPaused(value) {
      frames.paused = Boolean(value);
      return frames.paused;
    },
    // 离线取证：以固定步长推进若干帧并立即返回审计结果（不依赖标签页是否可见）。
    step(count = 1, delta = 1 / 60) {
      const steps = Math.max(1, Math.min(600, Math.floor(count)));
      for (let i = 0; i < steps; i += 1) tick(delta, delta);
      return api.audit();
    },
    setTime(seconds) {
      frames.setTime(seconds);
      return frames.elapsed;
    },
    setOption(key, value) {
      switch (key) {
        case 'outlineStrength':
          pipeline.compositePass.uniforms.uLineStrength.value = value;
          break;
        case 'bloomStrength':
          pipeline.bloomPass.strength = value;
          break;
        case 'reflection':
          reflection.uniforms.uReflectionMap.value = value ? reflection.renderTarget.texture : null;
          break;
        case 'rain':
          fx.setRain(value);
          break;
        case 'steam':
          fx.setSteam(value);
          break;
        default:
          throw new Error(`unknown option: ${key}`);
      }
      return true;
    },
    countLights() {
      const counts = { point: 0, spot: 0, directional: 0, hemisphere: 0 };
      scene.traverse((object) => {
        if (object.isPointLight) counts.point += 1;
        else if (object.isSpotLight) counts.spot += 1;
        else if (object.isDirectionalLight) counts.directional += 1;
        else if (object.isHemisphereLight) counts.hemisphere += 1;
      });
      return counts;
    },
  };

  window.__diorama = api;
  return api;
}

function round(value) {
  return Math.round(value * 100) / 100;
}
