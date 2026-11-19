import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from '../vendor/three.module.js';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { fullscreenVertex, raytracerFragment } from './shaders.js';
import './styles.css';

const STORAGE_KEY = 'gargantua-state-v1';
const QUALITY_LEVELS = ['standard', 'high', 'cinematic'];

const DEFAULTS = {
  quality: 'high',
  preset: 0,
  debug: 0,
  hud: true,
  playing: true,
  fov: 44,
  cameraDistance: 8.4,
  cameraAzimuth: 0,
  cameraElevation: 19,
  timeScale: 1,
  diskInner: 2.25,
  diskOuter: 6.6,
  diskThickness: 0.22,
  diskTemperature: 1.05,
  emission: 1.35,
  orbitalVelocity: 1,
  turbulence: 0.78,
  turbulenceSpeed: 1,
  starDensity: 1.1,
  galaxyBrightness: 1.15,
  bloomStrength: 1.25,
  bloomThreshold: 0.62,
  exposure: 1.12,
  vignette: 0.48,
  grain: 0.22,
  chromatic: 0.18,
};

const PRESETS = [
  { name: 'Equatorial pass', short: 'EQUATORIAL', distance: 8.4, azimuth: 0, elevation: 19, fov: 44 },
  { name: 'Polar descent', short: 'POLAR', distance: 8.8, azimuth: 45, elevation: 46, fov: 42 },
  { name: 'Photon edge', short: 'EDGE-ON', distance: 7.4, azimuth: 90, elevation: 7, fov: 37 },
  { name: 'Deep survey', short: 'DEEP SURVEY', distance: 12.8, azimuth: -28, elevation: 26, fov: 53 },
];

const DEBUG_NAMES = [
  'Final composite',
  'Ray steps / curvature',
  'Event horizon mask',
  'Disk intersections / order',
  'Doppler + redshift',
  'Lensed background vector',
  'Stars + galaxy field',
  'Pre-tone HDR values',
  'Closest approach / turn',
  'Quality / simulation phase',
];

const CONTROL_GROUPS = [
  {
    title: 'Camera',
    items: [
      ['fov', 'Field of view', 28, 70, 1, '°'],
      ['cameraDistance', 'Camera distance', 5, 16, 0.1, ' rₛ'],
      ['cameraAzimuth', 'Camera azimuth', -180, 180, 1, '°'],
      ['cameraElevation', 'Camera elevation', 3, 78, 1, '°'],
      ['timeScale', 'Time multiplier', 0, 3, 0.05, '×'],
    ],
  },
  {
    title: 'Accretion disk',
    items: [
      ['diskInner', 'Inner radius', 1.65, 4.2, 0.05, ' rₛ'],
      ['diskOuter', 'Outer radius', 4.2, 10, 0.1, ' rₛ'],
      ['diskThickness', 'Half-thickness', 0.05, 0.7, 0.01, ' rₛ'],
      ['diskTemperature', 'Temperature', 0.35, 1.9, 0.01, ''],
      ['emission', 'Emission intensity', 0.2, 3.2, 0.05, '×'],
      ['orbitalVelocity', 'Orbital velocity', 0.35, 1.45, 0.01, '×'],
      ['turbulence', 'Turbulence amplitude', 0, 1.5, 0.01, '×'],
      ['turbulenceSpeed', 'Turbulence speed', 0, 3, 0.05, '×'],
    ],
  },
  {
    title: 'Background',
    items: [
      ['starDensity', 'Star density', 0.15, 2, 0.05, '×'],
      ['galaxyBrightness', 'Galaxy brightness', 0, 2.5, 0.05, '×'],
    ],
  },
  {
    title: 'Lens / finish',
    items: [
      ['bloomStrength', 'Bloom strength', 0, 2.8, 0.05, '×'],
      ['bloomThreshold', 'Bloom threshold', 0.1, 1.6, 0.02, ''],
      ['exposure', 'Exposure', 0.35, 2.4, 0.02, '×'],
      ['vignette', 'Vignette', 0, 0.9, 0.01, '×'],
      ['grain', 'Film grain', 0, 0.8, 0.01, '×'],
      ['chromatic', 'Chromatic dispersion', 0, 1, 0.01, '×'],
    ],
  },
];

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function parseQuery() {
  const params = new URLSearchParams(window.location.search);
  const capture = params.get('capture') === '1';
  const qualityParam = params.get('quality');
  const quality = params.has('quality') ? (QUALITY_LEVELS.includes(qualityParam) ? qualityParam : DEFAULTS.quality) : null;
  const presetValue = Number.parseInt(params.get('preset'), 10);
  const debugValue = Number.parseInt(params.get('debug'), 10);
  const timeValue = Number.parseFloat(params.get('time'));
  const hudValue = params.get('hud');
  return {
    capture,
    quality,
    preset: params.has('preset') ? (Number.isInteger(presetValue) && presetValue >= 0 && presetValue <= 3 ? presetValue : 0) : null,
    debug: params.has('debug') ? (Number.isInteger(debugValue) && debugValue >= 0 && debugValue <= 9 ? debugValue : 0) : null,
    time: Number.isFinite(timeValue) && timeValue >= 0 ? timeValue : 0,
    hud: params.has('hud') ? (hudValue === '0' || hudValue === '1' ? hudValue === '1' : true) : null,
  };
}

function readInitialState(query) {
  let saved = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch {
    saved = {};
  }
  const merged = { ...DEFAULTS, ...saved };
  if (!QUALITY_LEVELS.includes(merged.quality)) merged.quality = DEFAULTS.quality;
  if (!Number.isInteger(merged.debug) || merged.debug < 0 || merged.debug > 9) merged.debug = 0;
  if (!Number.isInteger(merged.preset) || merged.preset < 0 || merged.preset > 3) merged.preset = 0;
  if (query.quality) merged.quality = query.quality;
  if (query.preset !== null) {
    const preset = PRESETS[query.preset];
    merged.preset = query.preset;
    merged.fov = preset.fov;
    merged.cameraDistance = preset.distance;
    merged.cameraAzimuth = preset.azimuth;
    merged.cameraElevation = preset.elevation;
  }
  if (query.debug !== null) merged.debug = query.debug;
  if (query.hud !== null) merged.hud = query.hud;
  if (query.capture) merged.playing = false;
  return merged;
}

function sphericalPosition(distance, azimuth, elevation) {
  const az = THREE.MathUtils.degToRad(azimuth);
  const el = THREE.MathUtils.degToRad(elevation);
  return new THREE.Vector3(
    Math.sin(az) * Math.cos(el) * distance,
    Math.sin(el) * distance,
    Math.cos(az) * Math.cos(el) * distance,
  );
}

function publicState(state, ready) {
  return Object.freeze({ ...state, ready });
}

function formatValue(value, step, suffix) {
  const decimals = step < 0.1 ? 2 : step < 1 ? 1 : 0;
  return `${Number(value).toFixed(decimals)}${suffix}`;
}

function pixelRatioForQuality(level) {
  return Math.min(window.devicePixelRatio || 1, level === 'standard' ? 0.78 : level === 'high' ? 1.45 : 1.85);
}

function App() {
  const query = useMemo(() => parseQuery(), []);
  const [state, setState] = useState(() => ({ ...readInitialState(query), time: query.capture ? query.time : 0 }));
  const stateRef = useRef(state);
  const queryRef = useRef(query);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRequestRef = useRef(null);
  const animationRef = useRef(0);
  const simulationTimeRef = useRef(query.capture ? query.time : 0);
  const lastFrameRef = useRef(0);
  const renderQualityRef = useRef(null);
  const contextLostRef = useRef(false);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [renderError, setRenderError] = useState('');
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  const commitState = useCallback((patch) => {
    const next = { ...stateRef.current, ...patch };
    stateRef.current = next;
    setState(next);
    return publicState(next, readyRef.current);
  }, []);

  const applyPreset = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index > 3) return null;
    const preset = PRESETS[index];
    cameraRequestRef.current = { distance: preset.distance, azimuth: preset.azimuth, elevation: preset.elevation };
    return commitState({
      preset: index,
      fov: preset.fov,
      cameraDistance: preset.distance,
      cameraAzimuth: preset.azimuth,
      cameraElevation: preset.elevation,
    });
  }, [commitState]);

  const resetState = useCallback(() => {
    simulationTimeRef.current = queryRef.current.capture ? queryRef.current.time : 0;
    cameraRequestRef.current = { distance: DEFAULTS.cameraDistance, azimuth: DEFAULTS.cameraAzimuth, elevation: DEFAULTS.cameraElevation };
    return commitState({ ...DEFAULTS, time: simulationTimeRef.current });
  }, [commitState]);

  useEffect(() => {
    stateRef.current = state;
    if (queryRef.current.capture) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be disabled in private or embedded browser contexts.
    }
  }, [state]);

  useEffect(() => {
    const api = {
      get ready() {
        return readyRef.current;
      },
      getState: () => publicState(stateRef.current, readyRef.current),
      setQuality: (level) => (QUALITY_LEVELS.includes(level) ? commitState({ quality: level }) : null),
      setPreset: (index) => applyPreset(index),
      setDebug: (index) => (Number.isInteger(index) && index >= 0 && index <= 9 ? commitState({ debug: index }) : null),
      setTime: (seconds) => (isFiniteNumber(seconds) && seconds >= 0 ? ((simulationTimeRef.current = seconds), commitState({ time: seconds, playing: false })) : null),
    };
    window.__GARGANTUA__ = api;
    return () => {
      delete window.__GARGANTUA__;
    };
  }, [applyPreset, commitState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const camera = new THREE.PerspectiveCamera(stateRef.current.fov, 1, 0.1, 100);
    cameraRef.current = camera;
    camera.position.copy(sphericalPosition(stateRef.current.cameraDistance, stateRef.current.cameraAzimuth, stateRef.current.cameraElevation));
    camera.lookAt(0, 0, 0);
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 4.8;
    controls.maxDistance = 18;
    controls.minPolarAngle = THREE.MathUtils.degToRad(3);
    controls.maxPolarAngle = THREE.MathUtils.degToRad(87);
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    const syncCameraState = () => {
      const position = camera.position;
      const distance = position.length();
      const azimuth = THREE.MathUtils.radToDeg(Math.atan2(position.x, position.z));
      const elevation = THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(position.y / distance, -1, 1)));
      const previous = stateRef.current;
      if (Math.abs(previous.cameraDistance - distance) > 0.004 || Math.abs(previous.cameraAzimuth - azimuth) > 0.03 || Math.abs(previous.cameraElevation - elevation) > 0.03) {
        commitState({ cameraDistance: distance, cameraAzimuth: azimuth, cameraElevation: elevation });
      }
    };
    controls.addEventListener('change', syncCameraState);

    const makeResources = () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x020307, 1);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
      const uniforms = {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uCameraPos: { value: camera.position.clone() },
        uCameraTarget: { value: controls.target.clone() },
        uFov: { value: stateRef.current.fov },
        uTime: { value: 0 },
        uQuality: { value: QUALITY_LEVELS.indexOf(stateRef.current.quality) },
        uDebug: { value: stateRef.current.debug },
        uDiskInner: { value: stateRef.current.diskInner },
        uDiskOuter: { value: stateRef.current.diskOuter },
        uDiskThickness: { value: stateRef.current.diskThickness },
        uDiskTemperature: { value: stateRef.current.diskTemperature },
        uEmission: { value: stateRef.current.emission },
        uOrbitalVelocity: { value: stateRef.current.orbitalVelocity },
        uTurbulence: { value: stateRef.current.turbulence },
        uTurbulenceSpeed: { value: stateRef.current.turbulenceSpeed },
        uStarDensity: { value: stateRef.current.starDensity },
        uGalaxyBrightness: { value: stateRef.current.galaxyBrightness },
        uBloomStrength: { value: stateRef.current.bloomStrength },
        uBloomThreshold: { value: stateRef.current.bloomThreshold },
        uExposure: { value: stateRef.current.exposure },
        uVignette: { value: stateRef.current.vignette },
        uGrain: { value: stateRef.current.grain },
        uChromatic: { value: stateRef.current.chromatic },
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: fullscreenVertex,
        fragmentShader: raytracerFragment,
        glslVersion: THREE.GLSL3,
        depthTest: false,
        depthWrite: false,
      });
      const scene = new THREE.Scene();
      scene.add(new THREE.Mesh(geometry, material));
      rendererRef.current = renderer;
      materialRef.current = material;
      renderer.compile(scene, camera);
      return { renderer, scene, geometry, material };
    };

    let resources;
    try {
      resources = makeResources();
    } catch (error) {
      setRenderError(error instanceof Error ? error.message : 'WebGL initialization failed');
    }

    const resize = () => {
      const renderer = rendererRef.current;
      if (!renderer) return;
      const quality = stateRef.current.quality;
      const dpr = pixelRatioForQuality(quality);
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (materialRef.current) materialRef.current.uniforms.uResolution.value.set(width * dpr, height * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const contextLost = (event) => {
      event.preventDefault();
      contextLostRef.current = true;
      setContextLost(true);
    };
    const contextRestored = () => {
      try {
        contextLostRef.current = false;
        resources = makeResources();
        renderQualityRef.current = null;
        resize();
        setContextLost(false);
        setRenderError('');
      } catch (error) {
        setRenderError(error instanceof Error ? error.message : 'WebGL restore failed');
      }
    };
    canvas.addEventListener('webglcontextlost', contextLost, false);
    canvas.addEventListener('webglcontextrestored', contextRestored, false);

    const animate = (now) => {
      animationRef.current = requestAnimationFrame(animate);
      const delta = Math.min((now - lastFrameRef.current) / 1000 || 0, 0.08);
      lastFrameRef.current = now;
      const current = stateRef.current;
      const currentCamera = cameraRef.current;
      if (!queryRef.current.capture && current.playing && !contextLostRef.current) simulationTimeRef.current += delta * current.timeScale;
      if (!current.playing && !queryRef.current.capture) simulationTimeRef.current = current.time;
      if (cameraRequestRef.current) {
        const requested = cameraRequestRef.current;
        currentCamera.position.copy(sphericalPosition(requested.distance, requested.azimuth, requested.elevation));
        controls.target.set(0, 0, 0);
        controls.update();
        cameraRequestRef.current = null;
      }
      controls.update();
      if (!rendererRef.current || !materialRef.current || contextLostRef.current || !resources) return;
      const uniforms = materialRef.current.uniforms;
      if (renderQualityRef.current !== current.quality) {
        const dpr = pixelRatioForQuality(current.quality);
        rendererRef.current.setPixelRatio(dpr);
        rendererRef.current.setSize(window.innerWidth, window.innerHeight, false);
        uniforms.uResolution.value.set(window.innerWidth * dpr, window.innerHeight * dpr);
        renderQualityRef.current = current.quality;
      }
      currentCamera.fov = current.fov;
      currentCamera.updateProjectionMatrix();
      uniforms.uCameraPos.value.copy(currentCamera.position);
      uniforms.uCameraTarget.value.copy(controls.target);
      uniforms.uFov.value = current.fov;
      uniforms.uTime.value = queryRef.current.capture ? queryRef.current.time : simulationTimeRef.current;
      uniforms.uQuality.value = QUALITY_LEVELS.indexOf(current.quality);
      uniforms.uDebug.value = current.debug;
      uniforms.uDiskInner.value = current.diskInner;
      uniforms.uDiskOuter.value = Math.max(current.diskOuter, current.diskInner + 0.25);
      uniforms.uDiskThickness.value = current.diskThickness;
      uniforms.uDiskTemperature.value = current.diskTemperature;
      uniforms.uEmission.value = current.emission;
      uniforms.uOrbitalVelocity.value = current.orbitalVelocity;
      uniforms.uTurbulence.value = current.turbulence;
      uniforms.uTurbulenceSpeed.value = current.turbulenceSpeed;
      uniforms.uStarDensity.value = current.starDensity;
      uniforms.uGalaxyBrightness.value = current.galaxyBrightness;
      uniforms.uBloomStrength.value = current.bloomStrength;
      uniforms.uBloomThreshold.value = current.bloomThreshold;
      uniforms.uExposure.value = current.exposure;
      uniforms.uVignette.value = current.vignette;
      uniforms.uGrain.value = current.grain;
      uniforms.uChromatic.value = current.chromatic;
      rendererRef.current.render(resources.scene, currentCamera);
      if (!readyRef.current) {
        readyRef.current = true;
        document.documentElement.dataset.gargantuaReady = 'true';
        setReady(true);
      }
      if (!queryRef.current.capture && now % 200 < 18) setState((previous) => ({ ...previous, time: simulationTimeRef.current }));
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      controls.removeEventListener('change', syncCameraState);
      controls.dispose();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('webglcontextlost', contextLost);
      canvas.removeEventListener('webglcontextrestored', contextRestored);
      resources?.geometry?.dispose();
      resources?.material?.dispose();
      rendererRef.current?.dispose();
    };
  }, [commitState]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return;
      if (event.key >= '0' && event.key <= '9') {
        commitState({ debug: Number(event.key) });
        return;
      }
      if (event.shiftKey && /^[1-4]$/.test(event.key)) {
        event.preventDefault();
        applyPreset(Number(event.key) - 1);
        return;
      }
      if (event.code === 'Space') {
        event.preventDefault();
        commitState({ playing: !stateRef.current.playing });
      } else if (event.key.toLowerCase() === 'h') {
        commitState({ hud: !stateRef.current.hud });
      } else if (event.key.toLowerCase() === 'r') {
        resetState();
      } else if (event.key.toLowerCase() === 'q') {
        const next = (QUALITY_LEVELS.indexOf(stateRef.current.quality) + 1) % QUALITY_LEVELS.length;
        commitState({ quality: QUALITY_LEVELS[next] });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [applyPreset, commitState, resetState]);

  const updateControl = (key, value) => {
    const numeric = Number(value);
    if (key === 'cameraDistance' || key === 'cameraAzimuth' || key === 'cameraElevation') {
      const next = { ...stateRef.current, [key]: numeric };
      cameraRequestRef.current = { distance: next.cameraDistance, azimuth: next.cameraAzimuth, elevation: next.cameraElevation };
    }
    return commitState({ [key]: numeric });
  };
  const qualityIndex = QUALITY_LEVELS.indexOf(state.quality);

  return (
    <main className="app-shell">
      <canvas ref={canvasRef} className="ray-canvas" aria-label="Interactive Schwarzschild black hole raytracer" />
      <div className="scanline" aria-hidden="true" />
      <header className={`top-bar ${state.hud ? '' : 'is-hidden'}`}>
        <div className="brand-lockup">
          <span className="brand-mark">G</span>
          <div>
            <p className="eyebrow">RELATIVITY LAB / 03</p>
            <h1>GARGANTUA</h1>
            <p className="subtitle">SCHWARZSCHILD RAYTRACER</p>
          </div>
        </div>
        <div className="top-status">
          <span className="status-dot" />
          <span>{contextLost ? 'CONTEXT PAUSED' : ready ? 'LIVE SIMULATION' : 'COMPILING SHADER'}</span>
          <span className="status-divider" />
          <span>{state.quality.toUpperCase()}</span>
        </div>
      </header>

      <section className={`side-panel ${state.hud ? '' : 'is-hidden'} ${mobilePanelOpen ? 'mobile-open' : ''}`} aria-label="Raytracer controls">
        <div className="panel-head">
          <div>
            <p className="eyebrow">CONTROL SURFACE</p>
            <h2>Observer rig</h2>
          </div>
          <button className="icon-button mobile-only" type="button" aria-label="Close control panel" onClick={() => setMobilePanelOpen(false)}>×</button>
        </div>

        <div className="panel-scroll">
          <div className="control-section preset-section">
            <div className="section-heading"><span>01</span><h3>Camera presets</h3></div>
            <div className="preset-grid">
              {PRESETS.map((preset, index) => (
                <button key={preset.short} type="button" className={`preset-button ${state.preset === index ? 'active' : ''}`} onClick={() => applyPreset(index)}>
                  <span className="preset-index">0{index + 1}</span>
                  <span>{preset.short}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="control-section">
            <div className="section-heading"><span>02</span><h3>Simulation budget</h3></div>
            <div className="segmented-control" role="group" aria-label="Quality">
              {QUALITY_LEVELS.map((level) => <button type="button" key={level} className={state.quality === level ? 'active' : ''} onClick={() => commitState({ quality: level })}>{level}</button>)}
            </div>
            <div className="debug-row">
              <span>Diagnostic view</span>
              <select value={state.debug} onChange={(event) => commitState({ debug: Number(event.target.value) })}>
                {DEBUG_NAMES.map((name, index) => <option value={index} key={name}>{index} · {name}</option>)}
              </select>
            </div>
          </div>

          {CONTROL_GROUPS.map((group) => (
            <div className="control-section" key={group.title}>
              <div className="section-heading"><span>{group.title === 'Camera' ? '03' : group.title === 'Accretion disk' ? '04' : group.title === 'Background' ? '05' : '06'}</span><h3>{group.title}</h3></div>
              {group.items.map(([key, label, min, max, step, suffix]) => (
                <label className="range-control" key={key}>
                  <span className="range-label"><span>{label}</span><output>{formatValue(state[key], step, suffix)}</output></span>
                  <input type="range" min={min} max={max} step={step} value={state[key]} onChange={(event) => updateControl(key, event.target.value)} />
                </label>
              ))}
            </div>
          ))}

          <div className="control-section action-section">
            <div className="section-heading"><span>07</span><h3>Transport</h3></div>
            <button type="button" className="transport-button" onClick={() => commitState({ playing: !state.playing })}>
              <span className={`transport-glyph ${state.playing ? 'pause' : 'play'}`}>{state.playing ? 'Ⅱ' : '▶'}</span>
              <span>{state.playing ? 'Pause cinematic loop' : 'Resume cinematic loop'}</span>
              <kbd>SPACE</kbd>
            </button>
            <button type="button" className="transport-button subtle" onClick={resetState}>
              <span className="transport-glyph">↺</span><span>Reset all parameters</span><kbd>R</kbd>
            </button>
          </div>
        </div>
      </section>

      <footer className={`bottom-bar ${state.hud ? '' : 'is-hidden'}`}>
        <div className="telemetry"><span>GEODESIC</span><strong>{DEBUG_NAMES[state.debug].toUpperCase()}</strong><span className="telemetry-sep">/</span><span>t = {(query.capture ? query.time : simulationTimeRef.current).toFixed(2)}s</span></div>
        <div className="shortcut-strip"><span><kbd>0–9</kbd> DEBUG</span><span><kbd>⇧1–4</kbd> PRESETS</span><span><kbd>H</kbd> HUD</span><span><kbd>Q</kbd> QUALITY</span></div>
      </footer>

      <button type="button" className={`mobile-panel-trigger ${state.hud && !mobilePanelOpen ? '' : 'is-hidden'}`} onClick={() => setMobilePanelOpen(true)}>CONTROLS <span>＋</span></button>
      <button type="button" className={`hud-toggle ${state.hud ? '' : 'is-hidden'}`} onClick={() => commitState({ hud: !state.hud })} aria-label="Toggle HUD">HIDE HUD <kbd>H</kbd></button>

      {(contextLost || renderError) && <div className="system-overlay"><div className="system-card"><span className="warning-symbol">!</span><p className="eyebrow">{contextLost ? 'WEBGL CONTEXT LOST' : 'RENDERER ERROR'}</p><h2>{contextLost ? 'Rendering paused' : 'Shader unavailable'}</h2><p>{contextLost ? 'Release the GPU resource to restore the live image. Your observer state is retained.' : renderError}</p>{contextLost && <span className="system-hint">Waiting for webglcontextrestored…</span>}</div></div>}
    </main>
  );
}

export default App;
