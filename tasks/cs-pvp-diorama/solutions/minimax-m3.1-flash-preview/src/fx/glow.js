import * as THREE from 'three';

/**
 * Light halos and lightning.
 *
 * Halos are additive billboards at each practical fixture. Without them a
 * toon-shaded lamp is just a flat disc; with them the rain haze catches the
 * light and the warm/cold contrast between the street lamp, the warehouse
 * tube and the police beacons actually blooms.
 */

function haloTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
  gradient.addColorStop(0.18, 'rgba(255,255,255,0.42)');
  gradient.addColorStop(0.48, 'rgba(255,255,255,0.11)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createHalos(definitions) {
  const map = haloTexture();
  const halos = [];
  const group = new THREE.Group();
  group.name = 'halos';

  for (const definition of definitions) {
    const material = new THREE.SpriteMaterial({
      map,
      color: new THREE.Color(definition.color),
      transparent: true,
      opacity: definition.opacity ?? 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(definition.position);
    sprite.scale.setScalar(definition.size ?? 3);
    sprite.renderOrder = 4;
    group.add(sprite);
    halos.push({ sprite, material, base: definition.opacity ?? 0.55, kind: definition.kind });
  }

  return {
    group,
    halos,
    update(time) {
      for (const halo of halos) {
        switch (halo.kind) {
          case 'street':
            // Slow sodium flicker, plus a wider sway as gusts pass.
            halo.material.opacity = halo.base * (0.86 + Math.sin(time * 2.7) * 0.06 + Math.sin(time * 11.3) * 0.04);
            halo.sprite.position.x += Math.sin(time * 0.8) * 0.0016;
            break;
          case 'warehouse':
            halo.material.opacity = halo.base * (0.9 + Math.sin(time * 5.1 + 1.2) * 0.05);
            break;
          case 'searchlight':
            halo.material.opacity = halo.base * (0.93 + Math.sin(time * 3.4) * 0.07);
            break;
          default:
            break;
        }
      }
    },
  };
}

/**
 * Distant lightning.
 *
 * A short, mostly off-screen flash: no bolt geometry is ever added, because
 * the brief requires the model to stay inside the base. The flash lifts the
 * ambient and key light for a few frames and lets them fall back, which reads
 * as sky glow rather than as an effect.
 */
export class Lightning {
  constructor(ambient, key, scene) {
    this.ambient = ambient;
    this.key = key;
    this.scene = scene;
    this.baseAmbient = ambient.intensity;
    this.baseKey = key.intensity;
    this.flash = 0;
    this.next = 6 + Math.random() * 9;
    this.time = 0;
    this.onFlash = null;
  }

  update(dt) {
    this.time += dt;
    if (this.time >= this.next) {
      this.time = 0;
      this.next = 11 + Math.random() * 16;
      this.flash = 1;
      this.strokes = 2 + ((Math.random() * 2) | 0);
      this.strokeTimer = 0;
    }

    if (this.flash > 0) {
      this.strokeTimer += dt;
      // Two or three quick pulses rather than one smooth fade.
      const pulse = Math.max(0, Math.sin(this.strokeTimer * 26)) * Math.exp(-this.strokeTimer * 7);
      const amount = this.flash * pulse;
      this.ambient.intensity = this.baseAmbient + amount * 2.4;
      this.key.intensity = this.baseKey + amount * 1.5;
      if (this.strokeTimer > 0.9) this.flash = 0;
      if (this.onFlash) this.onFlash(amount);
    } else if (this.ambient.intensity !== this.baseAmbient) {
      this.ambient.intensity = this.baseAmbient;
      this.key.intensity = this.baseKey;
      if (this.onFlash) this.onFlash(0);
    }
  }
}
