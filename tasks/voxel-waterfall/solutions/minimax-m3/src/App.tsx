import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { buildScene, DEFAULT_SETTINGS, SceneSettings, BuiltScene } from './scene';

function makeCamera() {
  const cam = new THREE.PerspectiveCamera(55, 1, 0.1, 600);
  cam.position.set(40, 28, 50);
  cam.lookAt(0, 8, 0);
  return cam;
}

interface OrbitState {
  azimuth: number;
  polar: number;
  distance: number;
  targetY: number;
}

const ORBIT: OrbitState = {
  azimuth: -0.6,
  polar: 0.85,
  distance: 70,
  targetY: 6,
};

function applyOrbit(camera: THREE.PerspectiveCamera) {
  const cosPolar = Math.cos(ORBIT.polar);
  camera.position.set(
    Math.sin(ORBIT.azimuth) * ORBIT.distance * cosPolar,
    Math.sin(ORBIT.polar) * ORBIT.distance + ORBIT.targetY,
    Math.cos(ORBIT.azimuth) * ORBIT.distance * cosPolar
  );
  camera.lookAt(0, ORBIT.targetY, 0);
}

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const builtRef = useRef<BuiltScene | null>(null);
  const settingsRef = useRef<SceneSettings>({ ...DEFAULT_SETTINGS });
  const draggingRef = useRef<{ x: number; y: number } | null>(null);

  const [settings, setSettings] = useState<SceneSettings>({ ...DEFAULT_SETTINGS });
  const [stats, setStats] = useState({ voxels: 0, fps: 0 });

  // Mirror settings into a ref consumed by the render loop.
  useEffect(() => {
    settingsRef.current = settings;
    const built = builtRef.current;
    if (built) built.applySettings(settings);
  }, [settings]);

  // Mount renderer + animation loop. One-time setup.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9bbcd8);

    const fog = new THREE.Fog(0x9bbcd8, 50, 180);
    scene.fog = fog;
    scene.userData.fog = fog;

    const camera = makeCamera();
    applyOrbit(camera);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let active = true;
    let built: BuiltScene = buildScene(settingsRef.current);
    scene.add(built.group);
    builtRef.current = built;
    setStats({ voxels: built.stats.voxels, fps: 0 });

    // Pointer drag for orbit.
    const dom = renderer.domElement;
    const onDown = (e: PointerEvent) => {
      draggingRef.current = { x: e.clientX, y: e.clientY };
      dom.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const d = draggingRef.current;
      if (!d) return;
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      d.x = e.clientX;
      d.y = e.clientY;
      ORBIT.azimuth -= dx * 0.005;
      ORBIT.polar = Math.max(0.15, Math.min(1.4, ORBIT.polar - dy * 0.005));
      applyOrbit(camera);
    };
    const onUp = (e: PointerEvent) => {
      draggingRef.current = null;
      try { dom.releasePointerCapture(e.pointerId); } catch {}
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      ORBIT.distance = Math.max(20, Math.min(180, ORBIT.distance * (1 + e.deltaY * 0.001)));
      applyOrbit(camera);
    };
    dom.addEventListener('pointerdown', onDown);
    dom.addEventListener('pointermove', onMove);
    dom.addEventListener('pointerup', onUp);
    dom.addEventListener('pointercancel', onUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Auto-rotate toggle.
    let lastTime = performance.now();
    let fpsAcc = 0;
    let fpsFrames = 0;
    let lastFpsUpdate = lastTime;

    const tick = (now: number) => {
      if (!active) return;
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      const s = settingsRef.current;
      if (s.autoRotate) {
        ORBIT.azimuth += dt * 0.07;
        applyOrbit(camera);
      }
      // Handle terrain rebuild requests.
      const cur = builtRef.current;
      if (cur && cur.needsTerrainRebuild()) {
        const next = buildScene(s);
        scene.remove(cur.group);
        cur.dispose();
        scene.add(next.group);
        builtRef.current = next;
        built = next;
        setStats({ voxels: next.stats.voxels, fps: stats.fps });
      }
      built.update(dt, camera);
      renderer.render(scene, camera);

      // FPS stats (updated every 500ms).
      fpsAcc += dt;
      fpsFrames++;
      if (now - lastFpsUpdate > 500) {
        const fps = fpsFrames / fpsAcc;
        setStats((prev) => ({ voxels: built.stats.voxels, fps }));
        fpsAcc = 0;
        fpsFrames = 0;
        lastFpsUpdate = now;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => {
      active = false;
      ro.disconnect();
      dom.removeEventListener('pointerdown', onDown);
      dom.removeEventListener('pointermove', onMove);
      dom.removeEventListener('pointerup', onUp);
      dom.removeEventListener('pointercancel', onUp);
      dom.removeEventListener('wheel', onWheel);
      scene.remove(built.group);
      built.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      builtRef.current = null;
    };
  }, []);

  const update = <K extends keyof SceneSettings>(key: K, value: SceneSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
      <div className="panel">
        <h1>Voxel Waterfall</h1>
        <div className="subtitle">React + Three.js · drag to orbit, wheel to zoom</div>

        <div className="group">
          <div className="group-title">Terrain</div>
          <label>
            <span className="lbl">Seed</span>
            <input
              type="range"
              min={1}
              max={9999}
              value={settings.seed}
              onChange={(e) => update('seed', Number(e.target.value))}
            />
            <span className="value">{settings.seed}</span>
          </label>
          <label>
            <span className="lbl">Peak height</span>
            <input
              type="range"
              min={20}
              max={56}
              value={settings.mainPeakHeight}
              onChange={(e) => update('mainPeakHeight', Number(e.target.value))}
            />
            <span className="value">{settings.mainPeakHeight}</span>
          </label>
          <label>
            <span className="lbl">Detail amplitude</span>
            <input
              type="range"
              min={10}
              max={48}
              value={settings.amplitude}
              onChange={(e) => update('amplitude', Number(e.target.value))}
            />
            <span className="value">{settings.amplitude}</span>
          </label>
          <label>
            <span className="lbl">Voxel size</span>
            <select
              value={settings.voxelSize}
              onChange={(e) => update('voxelSize', Number(e.target.value))}
            >
              <option value={0.35}>fine</option>
              <option value={0.5}>normal</option>
              <option value={0.75}>chunky</option>
            </select>
          </label>
        </div>

        <div className="group">
          <div className="group-title">Waterfall</div>
          <label>
            <span className="lbl">Carve channel</span>
            <input
              type="checkbox"
              checked={settings.carveWaterfall}
              onChange={(e) => update('carveWaterfall', e.target.checked)}
            />
          </label>
          <label>
            <span className="lbl">Flow speed</span>
            <input
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={settings.waterfallFlow}
              onChange={(e) => update('waterfallFlow', Number(e.target.value))}
            />
            <span className="value">{settings.waterfallFlow.toFixed(1)}</span>
          </label>
        </div>

        <div className="group">
          <div className="group-title">Clouds</div>
          <label>
            <span className="lbl">Density</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={settings.cloudDensity}
              onChange={(e) => update('cloudDensity', Number(e.target.value))}
            />
            <span className="value">{settings.cloudDensity.toFixed(2)}</span>
          </label>
          <label>
            <span className="lbl">Altitude</span>
            <input
              type="range"
              min={12}
              max={40}
              value={settings.cloudAltitude}
              onChange={(e) => update('cloudAltitude', Number(e.target.value))}
            />
            <span className="value">{settings.cloudAltitude}</span>
          </label>
          <label>
            <span className="lbl">Thickness</span>
            <input
              type="range"
              min={1}
              max={8}
              value={settings.cloudThickness}
              onChange={(e) => update('cloudThickness', Number(e.target.value))}
            />
            <span className="value">{settings.cloudThickness}</span>
          </label>
        </div>

        <div className="group">
          <div className="group-title">Atmosphere</div>
          <label>
            <span className="lbl">Time of day</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.timeOfDay}
              onChange={(e) => update('timeOfDay', Number(e.target.value))}
            />
            <span className="value">{settings.timeOfDay.toFixed(2)}</span>
          </label>
          <label>
            <span className="lbl">Vegetation</span>
            <input
              type="checkbox"
              checked={settings.showVegetation}
              onChange={(e) => update('showVegetation', e.target.checked)}
            />
          </label>
          <label>
            <span className="lbl">Auto-orbit</span>
            <input
              type="checkbox"
              checked={settings.autoRotate}
              onChange={(e) => update('autoRotate', e.target.checked)}
            />
          </label>
          <div className="row" style={{ marginTop: 6 }}>
            <button onClick={() => setSettings({ ...DEFAULT_SETTINGS })}>Reset</button>
            <button onClick={() => update('seed', Math.floor(Math.random() * 9999) + 1)}>Randomize</button>
          </div>
        </div>

        <div className="stat">
          voxels: {stats.voxels.toLocaleString()} · fps: {stats.fps.toFixed(1)}
        </div>
      </div>
      <div className="hint">drag · zoom · auto-orbit · use the panel to shape the world</div>
    </>
  );
}
