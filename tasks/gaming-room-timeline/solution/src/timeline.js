import { clamp, eachMaterial, lerp, smooth } from './kit.js';

function weight(year, cfg) {
  const fade = cfg.fade ?? 0.4;
  const from = cfg.from ?? 2005;
  const to = cfg.to;
  const enter = smooth(from - fade, from + fade * 0.5, year);
  const leave = to == null ? 1 : 1 - smooth(to - fade * 0.5, to + fade, year);
  return clamp(enter * leave, 0, 1);
}

export function createTimeline(items) {
  return {
    items,
    apply(year) {
      for (const item of items) {
        const cfg = item.userData.timeline;
        const w = weight(year, cfg);
        const shown = w > 0.008;
        item.visible = shown;
        if (!shown) continue;

        const base = item.userData.basePosition;
        const baseScale = item.userData.baseScale;
        const baseRotY = item.userData.baseRotationY;
        let x = base.x;
        let y = base.y;
        let z = base.z;
        let scale = 1;
        let rotY = 0;

        if (cfg.retire) {
          const r = smooth(cfg.retire.start, cfg.retire.end, year);
          x = lerp(base.x, cfg.retire.pos[0], r);
          y = lerp(base.y, cfg.retire.pos[1], r);
          z = lerp(base.z, cfg.retire.pos[2], r);
          scale = lerp(1, cfg.retire.scale ?? 1, r);
          rotY = lerp(0, cfg.retire.rotY ?? 0, r);
          if (cfg.retire.dimScreen) {
            item.traverse((child) => {
              if (child.userData.retireScreen) child.visible = r < 0.55;
            });
          }
        }

        item.position.set(x, y, z);
        item.scale.set(baseScale.x * scale, baseScale.y * scale, baseScale.z * scale);
        item.rotation.y = baseRotY + rotY;

        eachMaterial(item, (material) => {
          material.opacity = material.userData.baseOpacity * w;
          material.transparent = w < 0.999 || material.userData.baseTransparent;
          material.depthWrite = w > 0.92 && material.userData.baseDepthWrite;
        });
      }
    },
  };
}
