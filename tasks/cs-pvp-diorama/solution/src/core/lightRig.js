// 灯光装配与动画：探照灯扫动、路灯闪烁、警灯交替、仓库应急灯脉动。
import * as THREE from 'three';

export function createLightRig({ scene, rng }) {
  const entries = [];
  const lights = [];
  const emissives = [];
  const sweepTarget = new THREE.Object3D();
  scene.add(sweepTarget);

  const NOISE_SIZE = 512;
  const noise = new Float32Array(NOISE_SIZE);
  let value = 0.5;
  for (let i = 0; i < NOISE_SIZE; i += 1) {
    value += (rng.next() - 0.5) * 0.55;
    value = Math.min(1, Math.max(0, value));
    noise[i] = value;
  }
  const sampleNoise = (t, rate) => {
    const index = Math.floor(Math.abs(t * rate * 60)) % NOISE_SIZE;
    return noise[index];
  };

  function register(light, anim, options) {
    entries.push({
      light,
      anim,
      base: light.intensity,
      phase: options.phase ?? rng.range(0, 10),
      rate: options.rate ?? 1,
      pivot: options.pivot ? new THREE.Vector3(...options.pivot) : null,
      radius: options.radius ?? 0,
      speed: options.speed ?? 0.5,
      span: options.span ?? 0.5,
      targetDistance: options.targetDistance ?? 18,
      lenses: options.lenses ?? null,
      period: options.period ?? 1.4,
    });
  }

  function add(options) {
    const {
      kind = 'point',
      position = [0, 3, 0],
      color = 0xffffff,
      intensity = 1,
      distance = 0,
      decay = 1.5,
      angle = 0.55,
      penumbra = 0.7,
      target = null,
      castShadow = false,
      anim = null,
    } = options;

    let light;
    if (kind === 'spot') {
      light = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
      if (target) light.target.position.set(target[0], target[1], target[2]);
      else light.target.position.set(position[0], 0, position[2]);
      scene.add(light.target);
    } else if (kind === 'directional') {
      light = new THREE.DirectionalLight(color, intensity);
      if (target) light.target.position.set(target[0], target[1], target[2]);
      scene.add(light.target);
    } else {
      light = new THREE.PointLight(color, intensity, distance, decay);
    }
    light.position.set(position[0], position[1], position[2]);
    light.castShadow = castShadow;
    scene.add(light);
    lights.push(light);

    if (anim) {
      register(light, anim, options);
      if (anim === 'beacon' && options.lenses) {
        for (const lens of options.lenses) {
          emissives.push({ material: lens.material, anim, base: lens.material.color.clone(), index: lens.index ?? 0 });
        }
      }
    }
    return light;
  }

  function registerEmissive(material, anim, options = {}) {
    emissives.push({ material, anim, base: material.color.clone(), index: options.index ?? 0 });
  }

  function update(elapsed) {
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      const light = entry.light;
      const t = elapsed + entry.phase;
      switch (entry.anim) {
        case 'flicker': {
          const n = sampleNoise(t, entry.rate);
          const dropout = n < 0.12 ? 0.32 : 0.86 + n * 0.18;
          light.intensity = entry.base * dropout;
          break;
        }
        case 'flickerSoft':
          light.intensity = entry.base * (0.9 + sampleNoise(t, entry.rate * 0.6) * 0.14);
          break;
        case 'pulse':
          light.intensity = entry.base * (0.82 + Math.sin(t * entry.speed * Math.PI) * 0.18);
          break;
        case 'sweepYaw': {
          const pivot = entry.pivot;
          const a = Math.sin(t * entry.speed) * entry.span;
          const sin = Math.sin(a);
          const cos = Math.cos(a);
          light.position.set(
            pivot.x + sin * entry.radius,
            pivot.y,
            pivot.z + cos * entry.radius,
          );
          light.target.position.set(
            pivot.x + sin * entry.targetDistance,
            0,
            pivot.z + cos * entry.targetDistance,
          );
          light.target.updateMatrixWorld();
          break;
        }
        case 'beacon': {
          const phase = (t % entry.period) / entry.period;
          const red = phase < 0.5;
          light.color.setHex(red ? 0xff2a1c : 0x3a6bff);
          light.intensity = entry.base * (0.35 + 0.65 * Math.abs(Math.sin(phase * Math.PI * 2)));
          break;
        }
        default:
          break;
      }
    }

    for (let i = 0; i < emissives.length; i += 1) {
      const entry = emissives[i];
      if (entry.anim !== 'beacon') continue;
      const phase = ((elapsed % 1.4) / 1.4 + entry.index * 0.5) % 1;
      const on = phase < 0.5;
      entry.material.color.copy(entry.base);
      entry.material.color.multiplyScalar(on ? 1 : 0.06);
    }
  }

  return {
    add,
    registerEmissive,
    register,
    update,
    lights,
    get count() {
      return lights.length;
    },
    get animated() {
      return entries.length;
    },
  };
}
