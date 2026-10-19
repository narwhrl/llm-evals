import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildVoxels, PAL } from './terrain.js';

/* Build InstancedMesh batches from the voxel map — one per palette key. */
function voxelsToMeshes(map) {
  const group = new THREE.Group();
  const byKey = new Map();
  for (const [pos, k] of map) {
    if (!byKey.has(k)) byKey.set(k, []);
    byKey.get(k).push(pos);
  }
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const M = new THREE.Matrix4();
  for (const [k, list] of byKey) {
    const p = PAL[k];
    const mat = new THREE.MeshStandardMaterial({
      color: p.c, roughness: p.r ?? 0.9, metalness: 0,
      ...(p.e ? { emissive: p.e, emissiveIntensity: p.ei ?? 0.3 } : {}),
      ...(k === 'cloud' || k === 'cloudSh' || k === 'mist'
        ? { transparent: true, opacity: k === 'mist' ? 0.55 : 0.82 } : {}),
    });
    const inst = new THREE.InstancedMesh(geo, mat, list.length);
    inst.castShadow = k !== 'cloud' && k !== 'cloudSh' && k !== 'mist' && k !== 'water' && k !== 'waterD' && k !== 'foam';
    inst.receiveShadow = true;
    for (let i = 0; i < list.length; i++) {
      const [x, y, z] = list[i].split(',').map(Number);
      M.makeTranslation(x, y, z);
      inst.setMatrixAt(i, M);
    }
    inst.instanceMatrix.needsUpdate = true;
    group.add(inst);
  }
  return group;
}

function Scene({ opts }) {
  const mount = useRef(null);
  const handles = useRef({});

  useEffect(() => {
    const el = mount.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2338);          // dawn violet sky
    scene.fog = new THREE.Fog(0x3a3050, 180, 420);

    const cam = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.5, 1200);
    cam.position.set(-146, 104, -150);
    const controls = new OrbitControls(cam, renderer.domElement);
    controls.target.set(0, 26, 4);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 40;
    controls.maxDistance = 420;
    controls.maxPolarAngle = Math.PI * 0.52;

    // dawn lighting: low warm sun + violet sky bounce + cool rim
    const hemi = new THREE.HemisphereLight(0x9a8fc0, 0x2e2a20, 1.15);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffc98a, 3.4);
    sun.position.set(140, 110, -80);
    sun.castShadow = true;
    sun.shadow.mapSize.set(4096, 4096);
    const sc = sun.shadow.camera;
    sc.left = -140; sc.right = 140; sc.top = 140; sc.bottom = -140; sc.far = 500;
    sun.shadow.bias = -0.0004;
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x7a8fd8, 0.7);
    rim.position.set(-120, 80, 140);
    scene.add(rim);

    // ground pad so voxels sit on something at edges
    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(220, 1, 220),
      new THREE.MeshStandardMaterial({ color: 0x2e3a26, roughness: 1 })
    );
    pad.position.y = -0.5;
    pad.receiveShadow = true;
    scene.add(pad);

    handles.current = { renderer, scene, cam, controls, voxelGroup: null };
    window.__scene = scene; window.__cam = cam;

    let raf;
    const loop = () => { raf = requestAnimationFrame(loop); controls.update(); renderer.render(scene, cam); };
    loop();

    const onResize = () => {
      cam.aspect = el.clientWidth / el.clientHeight;
      cam.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  // rebuild voxel field when opts change
  useEffect(() => {
    const { scene } = handles.current;
    if (!scene) return;
    const t0 = performance.now();
    const map = buildVoxels(opts);
    const group = voxelsToMeshes(map);
    if (handles.current.voxelGroup) {
      scene.remove(handles.current.voxelGroup);
      handles.current.voxelGroup.traverse(o => { if (o.material) o.material.dispose(); });
    }
    scene.add(group);
    handles.current.voxelGroup = group;
    window.__voxels = map.size;
    window.__voxelBuildMs = Math.round(performance.now() - t0);
  }, [opts]);

  return <div ref={mount} style={{ position: 'absolute', inset: 0 }} />;
}

function App() {
  const [opts, setOpts] = useState({ water: true, clouds: true, cloudDensity: 1, snow: true });
  const set = useCallback((k, v) => setOpts(o => ({ ...o, [k]: v })), []);

  return (
    <>
      <Scene opts={opts} />
      <div style={ui.panel}>
        <div style={ui.title}>云山飞瀑 · Voxel Waterfall</div>
        <label style={ui.row}><input type="checkbox" checked={opts.water} onChange={e => set('water', e.target.checked)} /> 瀑布水流</label>
        <label style={ui.row}><input type="checkbox" checked={opts.clouds} onChange={e => set('clouds', e.target.checked)} /> 云层</label>
        <label style={ui.row}><input type="checkbox" checked={opts.snow} onChange={e => set('snow', e.target.checked)} /> 雪线</label>
        <label style={ui.row}>
          云密度
          <input type="range" min="0.4" max="1.6" step="0.1" value={opts.cloudDensity}
            onChange={e => set('cloudDensity', +e.target.value)} style={{ width: 110 }} />
        </label>
        <div style={ui.hint}>拖拽旋转 · 滚轮缩放 · 右键平移</div>
      </div>
    </>
  );
}

const ui = {
  panel: {
    position: 'absolute', top: 14, left: 14, zIndex: 10,
    background: 'rgba(18,16,28,.72)', backdropFilter: 'blur(6px)',
    border: '1px solid rgba(255,255,255,.14)', borderRadius: 10,
    padding: '12px 14px', color: '#e8e4f2', font: '13px/1.5 system-ui,sans-serif',
    minWidth: 168,
  },
  title: { fontWeight: 600, fontSize: 14, marginBottom: 8, letterSpacing: '.02em' },
  row: { display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0', cursor: 'pointer', justifyContent: 'space-between' },
  hint: { marginTop: 10, fontSize: 11, opacity: .55 },
};

createRoot(document.getElementById('root')).render(<App />);
