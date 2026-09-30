import { leafTexture, paintedTexture } from '../textures/props.js';

export function buildPlants(k, root) {
  const { ctx, THREE, materials: m, box, cyl, bar, group, mount } = k;
  const g = group(root, 'plants'); mount(g, -1.90, 0, .195);
  for (const x of [-.28, .28]) {
    box(g, [.033, 1.85, .032], [x, .925, -.13], m.dark);
    box(g, [.10, .032, .18], [x, .018, -.03], m.dark, true);
  }
  const growMaterial = k.mat(paintedTexture('#f1b4e6'), '#ffffff', {
    emissive: '#db71ff', emissiveIntensity: 1.65, toneMapped: false,
  });
  const growbar = group(g, 'growlight'); growbar.position.set(0, 1.82, -.025);
  box(growbar, [.60, .048, .11], [0, 0, 0], m.cream, true);
  for (let i = 0; i < 5; i++) {
    box(growbar, [.085, .017, .085], [-.23 + i * .115, -.029, 0], growMaterial, true);
    bar(g, [-.25 + i * .12, 1.795, -.01], [-.25 + i * .12, 1.78, -.01], .006, m.dark);
  }
  const leafMaterial = k.mat(leafTexture(), '#ffffff', { side: THREE.DoubleSide, emissive: '#47204e', emissiveIntensity: .07 });
  // A shallow curved leaf with crisp facets and full UVs, reused by every lettuce rosette.
  const positions = [], uv = [], indices = [];
  const widths = [0, .055, .087, .08, .046, 0];
  for (let j = 0; j < 6; j++) {
    const y = j * .052, z = Math.sin(j / 5 * Math.PI) * .031;
    positions.push(-widths[j], y, z, 0, y, z + .013, widths[j], y, z);
    uv.push(0, j / 5, .5, j / 5, 1, j / 5);
  }
  for (let j = 0; j < 5; j++) for (let i = 0; i < 2; i++) {
    const a = j * 3 + i, b = a + 3; indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geometry.setIndex(indices); geometry.computeVertexNormals();
  const leaves = new THREE.InstancedMesh(geometry, leafMaterial, 108);
  leaves.name = 'lettuceLeaves'; leaves.castShadow = true; leaves.receiveShadow = true; g.add(leaves);
  const dummy = new THREE.Object3D(); let index = 0;
  for (let tier = 0; tier < 3; tier++) {
    const y = .28 + tier * .46;
    box(g, [.60, .074, .30], [0, y, -.025], m.cream, true);
    box(g, [.55, .015, .24], [0, y + .042, -.025], m.dark);
    k.label(g, `BASIL / ${tier + 1}`, 'ROOT LOOP  •  pH 6.2', .29, .047, [0, y, .128]);
    for (let plant = 0; plant < 3; plant++) {
      const x = -.18 + plant * .18;
      cyl(g, .048, .055, [x, y + .065, -.025], m.webbing);
      for (let l = 0; l < 12; l++) {
        const angle = l * 2.39996 + tier * .5;
        dummy.position.set(x, y + .07, -.025);
        dummy.rotation.set(.4 + (l % 3) * .27, angle, .07 * Math.sin(l));
        const scale = .62 + (l % 4) * .09;
        dummy.scale.set(scale, scale, scale); dummy.updateMatrix(); leaves.setMatrixAt(index++, dummy.matrix);
      }
    }
    bar(g, [.285, y + .05, -.13], [.285, y + .35, -.13], .012, m.teal);
  }
  leaves.instanceMatrix.needsUpdate = true;
  box(g, [.20, .14, .20], [0, .09, -.02], m.teal, true);
  k.label(g, 'H₂O', 'RECIRCULATE', .15, .07, [0, .09, .083]);
  ctx.registry.addInteractive(g, { id: 'plants', focus: { target: new THREE.Vector3(-1.9, 1.0, -1.7), zoom: 2.6, azimuth: .35, elevation: .42 } });
  ctx.registry.addInteractive(growbar, { id: 'growlight', priority: 8, onClick: () => {
    const on = ctx.state.nightCruise
      ? !(ctx.state.plantLight && ctx.state.plantLightOverride) : !ctx.state.plantLight;
    ctx.setState('plantLightOverride', ctx.state.nightCruise && on);
    ctx.setState('plantLight', on);
  } });
  const active = () => ctx.state.plantLight && (!ctx.state.nightCruise || ctx.state.plantLightOverride);
  let target = active() ? 1 : 0;
  let fade = target;
  const apply = () => { target = active() ? 1 : 0; };
  ctx.onState('plantLight', apply); ctx.onState('nightCruise', apply);
  ctx.onState('plantLightOverride', apply);
  return { growPosition: new THREE.Vector3(-1.9, 1.78, -1.7),
    update(dt, t) {
      fade += (target - fade) * (1 - Math.exp(-dt / .28));
      if (Math.abs(fade - target) < .0001) fade = target;
      growMaterial.emissiveIntensity = fade * 1.65 * (1 + .12 * Math.sin(t * Math.PI * .4));
      leafMaterial.emissiveIntensity = fade * .07;
    } };
}
