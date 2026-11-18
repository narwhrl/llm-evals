import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from '../vendor/three.module.js';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { fragmentShader, vertexShader } from './shader.js';
import './styles.css';

const STORAGE_KEY = 'gargantua.state.v1';
const STATE_VERSION = 1;

const QUALITY = {
  standard: { label: 'Standard', scale: 0.62, steps: 82, crossings: 2 },
  high: { label: 'High', scale: 0.82, steps: 132, crossings: 3 },
  cinematic: { label: 'Cinematic', scale: 1, steps: 190, crossings: 4 },
};

const PRESETS = [
  { name: 'EQUATORIAL', note: 'front-on ring', cameraDistance: 8.8, cameraAzimuth: 0, cameraElevation: 11, fov: 48 },
  { name: 'OBLIQUE', note: 'lensed crescent', cameraDistance: 8.4, cameraAzimuth: 24, cameraElevation: 18, fov: 46 },
  { name: 'POLAR', note: 'high inclination', cameraDistance: 9.4, cameraAzimuth: -18, cameraElevation: 52, fov: 43 },
  { name: 'CLOSE PASS', note: 'photon sphere', cameraDistance: 5.8, cameraAzimuth: 138, cameraElevation: 17, fov: 39 },
];

const DEBUG_LABELS = [
  'FINAL COMPOSITE',
  'RAY STEPS / TERMINATION',
  'EVENT HORIZON MASK',
  'DISK CROSSINGS / ORDER',
  'REDSHIFT + DOPPLER',
  'LENSED BACKGROUND VECTOR',
  'STARS + GALAXY FIELD',
  'PRE-TONE HDR ENERGY',
  'PHOTON RING / CRITICAL',
  'CURVATURE / IMPACT',
];

const PARAMS = [
  { key: 'fov', label: 'Field of view', min: 24, max: 78, step: 0.5, unit: '°' },
  { key: 'cameraDistance', label: 'Camera distance', min: 4.2, max: 15, step: 0.1, unit: 'rₛ' },
  { key: 'cameraAzimuth', label: 'Camera azimuth', min: -180, max: 180, step: 1, unit: '°' },
  { key: 'cameraElevation', label: 'Camera elevation', min: 4, max: 74, step: 1, unit: '°' },
  { key: 'timeMultiplier', label: 'Time multiplier', min: 0, max: 4, step: 0.05, unit: '×' },
  { key: 'diskInner', label: 'Disk inner radius', min: 1.85, max: 4.8, step: 0.05, unit: 'rₛ' },
  { key: 'diskOuter', label: 'Disk outer radius', min: 5.5, max: 14, step: 0.1, unit: 'rₛ' },
  { key: 'diskThickness', label: 'Disk half-thickness', min: 0.04, max: 0.6, step: 0.01, unit: 'rₛ' },
  { key: 'diskTemperature', label: 'Disk temperature', min: 0.35, max: 2, step: 0.01, unit: 'T' },
  { key: 'diskEmission', label: 'Disk emission', min: 0.4, max: 8, step: 0.05, unit: '×' },
  { key: 'orbitalSpeed', label: 'Orbital speed', min: 0.2, max: 1.5, step: 0.01, unit: '×' },
  { key: 'turbulence', label: 'Turbulence amplitude', min: 0, max: 1, step: 0.01, unit: '×' },
  { key: 'turbulenceSpeed', label: 'Turbulence speed', min: 0, max: 3, step: 0.05, unit: '×' },
  { key: 'starDensity', label: 'Stellar density', min: 0.15, max: 2.5, step: 0.05, unit: '×' },
  { key: 'galaxyBrightness', label: 'Galaxy brightness', min: 0, max: 2, step: 0.05, unit: '×' },
  { key: 'bloomStrength', label: 'Bloom strength', min: 0, max: 1.6, step: 0.02, unit: '×' },
  { key: 'bloomThreshold', label: 'Bloom threshold', min: 0.2, max: 3, step: 0.05, unit: 'HDR' },
  { key: 'exposure', label: 'Exposure', min: 0.35, max: 2.4, step: 0.02, unit: '×' },
  { key: 'vignette', label: 'Vignette', min: 0, max: 0.9, step: 0.01, unit: '×' },
  { key: 'grain', label: 'Film grain', min: 0, max: 0.18, step: 0.005, unit: '×' },
  { key: 'dispersion', label: 'Chromatic dispersion', min: 0, max: 0.3, step: 0.01, unit: '×' },
];

const DEFAULT_STATE = {
  quality: 'high',
  preset: 1,
  debug: 0,
  time: 0,
  hud: true,
  moviePlaying: true,
  capture: false,
  fov: 46,
  cameraDistance: 8.4,
  cameraAzimuth: 24,
  cameraElevation: 18,
  timeMultiplier: 1,
  diskInner: 2.25,
  diskOuter: 9.6,
  diskThickness: 0.17,
  diskTemperature: 1.14,
  diskEmission: 2.7,
  orbitalSpeed: 1,
  turbulence: 0.36,
  turbulenceSpeed: 0.8,
  starDensity: 1.2,
  galaxyBrightness: 0.82,
  bloomStrength: 0.76,
  bloomThreshold: 1.1,
  exposure: 1.06,
  vignette: 0.44,
  grain: 0.045,
  dispersion: 0.08,
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function validQuality(value) {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(QUALITY, value);
}

function numberOr(value, fallback, min, max) {
  const number = Number(value);
  return Number.isFinite(number) ? clamp(number, min, max) : fallback;
}

function integerOr(value, fallback, min, max) {
  const number = Number(value);
  return Number.isInteger(number) && number >= min && number <= max ? number : fallback;
}

function sanitizeState(input) {
  const candidate = input && typeof input === 'object' ? input : {};
  const state = { ...DEFAULT_STATE, ...candidate };
  state.quality = validQuality(candidate.quality) ? candidate.quality : DEFAULT_STATE.quality;
  state.preset = integerOr(candidate.preset, DEFAULT_STATE.preset, 0, PRESETS.length - 1);
  state.debug = integerOr(candidate.debug, DEFAULT_STATE.debug, 0, 9);
  state.time = numberOr(candidate.time, DEFAULT_STATE.time, 0, 1e9);
  state.hud = typeof candidate.hud === 'boolean' ? candidate.hud : DEFAULT_STATE.hud;
  state.moviePlaying = typeof candidate.moviePlaying === 'boolean' ? candidate.moviePlaying : DEFAULT_STATE.moviePlaying;
  PARAMS.forEach(({ key, min, max }) => {
    state[key] = numberOr(candidate[key], DEFAULT_STATE[key], min, max);
  });
  state.diskOuter = Math.max(state.diskOuter, state.diskInner + 0.5);
  state.capture = Boolean(candidate.capture);
  return state;
}

function readStoredState() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return sanitizeState(DEFAULT_STATE);
    const parsed = JSON.parse(stored);
    if (!parsed || parsed.version !== STATE_VERSION) return sanitizeState(DEFAULT_STATE);
    return sanitizeState(parsed.state);
  } catch {
    return sanitizeState(DEFAULT_STATE);
  }
}

function queryState(baseState) {
  const params = new URLSearchParams(window.location.search);
  const capture = params.get('capture') === '1';
  const next = { ...baseState, capture };
  const quality = params.get('quality');
  if (quality !== null) next.quality = validQuality(quality) ? quality : DEFAULT_STATE.quality;
  const preset = params.get('preset');
  if (preset !== null) {
    const presetIndex = integerOr(preset, DEFAULT_STATE.preset, 0, PRESETS.length - 1);
    const presetDefinition = PRESETS[presetIndex];
    next.preset = presetIndex;
    next.fov = presetDefinition.fov;
    next.cameraDistance = presetDefinition.cameraDistance;
    next.cameraAzimuth = presetDefinition.cameraAzimuth;
    next.cameraElevation = presetDefinition.cameraElevation;
  }
  const debug = params.get('debug');
  if (debug !== null) next.debug = integerOr(debug, DEFAULT_STATE.debug, 0, 9);
  const hud = params.get('hud');
  if (hud !== null) next.hud = hud === '0' || hud === '1' ? hud === '1' : DEFAULT_STATE.hud;
  const time = params.get('time');
  if (time !== null) next.time = numberOr(time, DEFAULT_STATE.time, 0, 1e9);
  if (capture) next.moviePlaying = false;
  return sanitizeState(next);
}

function formatValue(value, step, unit) {
  const decimals = step < 0.01 ? 3 : step < 0.1 ? 2 : step < 1 ? 1 : 0;
  return `${Number(value).toFixed(decimals)}${unit ? ` ${unit}` : ''}`;
}

function saveState(state) {
  try {
    const { capture: _capture, ...persisted } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, state: persisted }));
  } catch {
    // Persistence is optional when the browser blocks localStorage.
  }
}

function getInitialState() {
  return queryState(readStoredState());
}

function App() {
  const canvasRef = useRef(null);
  const stateRef = useRef(getInitialState());
  const timeRef = useRef(stateRef.current.time);
  const readyRef = useRef(false);
  const lostRef = useRef(false);
  const engineRef = useRef(null);
  const [state, setState] = useState(stateRef.current);
  const [ready, setReady] = useState(false);
  const [contextStatus, setContextStatus] = useState('ready');
  const [displayTime, setDisplayTime] = useState(timeRef.current);

  const patchState = useCallback((patch, persist = true) => {
    const previous = stateRef.current;
    const change = typeof patch === 'function' ? patch(previous) : patch;
    const nextState = sanitizeState({ ...previous, ...change });
    stateRef.current = nextState;
    if (persist) saveState(nextState);
    setState(nextState);
    return nextState;
  }, []);

  const resetState = useCallback(() => {
    const next = sanitizeState({ ...DEFAULT_STATE, capture: stateRef.current.capture });
    stateRef.current = next;
    timeRef.current = next.time;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Keep the visible reset functional even if storage is unavailable.
    }
    setState(next);
  }, []);

  const applyPreset = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index >= PRESETS.length) return stateRef.current;
    const preset = PRESETS[index];
    return patchState({
      preset: index,
      fov: preset.fov,
      cameraDistance: preset.cameraDistance,
      cameraAzimuth: preset.cameraAzimuth,
      cameraElevation: preset.cameraElevation,
      moviePlaying: false,
    });
  }, [patchState]);

  const setQuality = useCallback((level) => {
    if (!validQuality(level)) return { ...stateRef.current };
    return patchState({ quality: level });
  }, [patchState]);

  const setDebug = useCallback((index) => {
    if (!Number.isInteger(index) || index < 0 || index > 9) return { ...stateRef.current };
    return patchState({ debug: index });
  }, [patchState]);

  const setTime = useCallback((seconds) => {
    const value = Number(seconds);
    if (!Number.isFinite(value) || value < 0) return { ...stateRef.current, time: timeRef.current };
    timeRef.current = value;
    return patchState({ time: value }, true);
  }, [patchState]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    document.documentElement.dataset.gargantuaReady = 'false';
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    let scene;
    let camera;
    let controls;
    let mesh;
    let geometry;
    let material;
    let animationFrame;
    let lastFrameTime = performance.now();
    let lastQuality = '';
    let lastCameraSignature = '';
    let applyingCamera = false;
    let moviePhase = 0;
    let firstFrame = false;
    let lastHudTimeUpdate = 0;

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: timeRef.current },
      uFov: { value: stateRef.current.fov },
      uCameraPosition: { value: new THREE.Vector3() },
      uCameraForward: { value: new THREE.Vector3(0, 0, -1) },
      uCameraRight: { value: new THREE.Vector3(1, 0, 0) },
      uCameraUp: { value: new THREE.Vector3(0, 1, 0) },
      uRs: { value: 1 },
      uDiskInner: { value: stateRef.current.diskInner },
      uDiskOuter: { value: stateRef.current.diskOuter },
      uDiskThickness: { value: stateRef.current.diskThickness },
      uDiskTemperature: { value: stateRef.current.diskTemperature },
      uDiskEmission: { value: stateRef.current.diskEmission },
      uOrbitalSpeed: { value: stateRef.current.orbitalSpeed },
      uTurbulence: { value: stateRef.current.turbulence },
      uTurbulenceSpeed: { value: stateRef.current.turbulenceSpeed },
      uStarDensity: { value: stateRef.current.starDensity },
      uGalaxyBrightness: { value: stateRef.current.galaxyBrightness },
      uBloomStrength: { value: stateRef.current.bloomStrength },
      uBloomThreshold: { value: stateRef.current.bloomThreshold },
      uExposure: { value: stateRef.current.exposure },
      uVignette: { value: stateRef.current.vignette },
      uGrain: { value: stateRef.current.grain },
      uDispersion: { value: stateRef.current.dispersion },
      uMaxSteps: { value: QUALITY[stateRef.current.quality].steps },
      uDiskSamples: { value: QUALITY[stateRef.current.quality].crossings },
      uDebug: { value: stateRef.current.debug },
    };

    const createMaterial = () => new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
    });

    const cameraSignature = (current) => [
      current.fov,
      current.cameraDistance,
      current.cameraAzimuth,
      current.cameraElevation,
    ].join('|');

    const applyCameraState = (current, force = false) => {
      const signature = cameraSignature(current);
      if (!force && signature === lastCameraSignature) return;
      applyingCamera = true;
      const azimuth = THREE.MathUtils.degToRad(current.cameraAzimuth);
      const elevation = THREE.MathUtils.degToRad(clamp(current.cameraElevation, 4, 74));
      const horizontal = current.cameraDistance * Math.cos(elevation);
      camera.position.set(
        horizontal * Math.sin(azimuth),
        current.cameraDistance * Math.sin(elevation),
        horizontal * Math.cos(azimuth),
      );
      camera.fov = current.fov;
      camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0);
      controls.update();
      lastCameraSignature = signature;
      applyingCamera = false;
    };

    const syncCameraStateFromControls = () => {
      if (applyingCamera || !camera || !controls) return;
      const offset = camera.position.clone().sub(controls.target);
      const distance = offset.length();
      const azimuth = THREE.MathUtils.radToDeg(Math.atan2(offset.x, offset.z));
      const elevation = THREE.MathUtils.radToDeg(Math.asin(clamp(offset.y / Math.max(distance, 0.001), -1, 1)));
      const current = stateRef.current;
      const next = {
        cameraDistance: Number(distance.toFixed(3)),
        cameraAzimuth: Number(azimuth.toFixed(2)),
        cameraElevation: Number(elevation.toFixed(2)),
        moviePlaying: false,
      };
      lastCameraSignature = cameraSignature({ ...current, ...next });
      patchState(next);
    };

    const resize = () => {
      if (!renderer || !camera) return;
      const current = stateRef.current;
      const quality = QUALITY[current.quality];
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * quality.scale;
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1);
      camera.updateProjectionMatrix();
      const drawingBuffer = renderer.getDrawingBufferSize(new THREE.Vector2());
      uniforms.uResolution.value.copy(drawingBuffer);
    };

    const updateUniforms = () => {
      const current = stateRef.current;
      const quality = QUALITY[current.quality];
      uniforms.uTime.value = timeRef.current;
      uniforms.uFov.value = current.fov;
      uniforms.uDiskInner.value = current.diskInner;
      uniforms.uDiskOuter.value = Math.max(current.diskOuter, current.diskInner + 0.5);
      uniforms.uDiskThickness.value = current.diskThickness;
      uniforms.uDiskTemperature.value = current.diskTemperature;
      uniforms.uDiskEmission.value = current.diskEmission;
      uniforms.uOrbitalSpeed.value = current.orbitalSpeed;
      uniforms.uTurbulence.value = current.turbulence;
      uniforms.uTurbulenceSpeed.value = current.turbulenceSpeed;
      uniforms.uStarDensity.value = current.starDensity;
      uniforms.uGalaxyBrightness.value = current.galaxyBrightness;
      uniforms.uBloomStrength.value = current.bloomStrength;
      uniforms.uBloomThreshold.value = current.bloomThreshold;
      uniforms.uExposure.value = current.exposure;
      uniforms.uVignette.value = current.vignette;
      uniforms.uGrain.value = current.grain;
      uniforms.uDispersion.value = current.dispersion;
      uniforms.uMaxSteps.value = quality.steps;
      uniforms.uDiskSamples.value = quality.crossings;
      uniforms.uDebug.value = current.debug;
      if (quality.label !== lastQuality) {
        lastQuality = quality.label;
        resize();
      }
    };

    const updateCameraUniforms = () => {
      camera.updateMatrixWorld();
      uniforms.uCameraPosition.value.copy(camera.position);
      uniforms.uCameraForward.value.set(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
      uniforms.uCameraRight.value.set(1, 0, 0).applyQuaternion(camera.quaternion).normalize();
      uniforms.uCameraUp.value.set(0, 1, 0).applyQuaternion(camera.quaternion).normalize();
    };

    const handleContextLost = (event) => {
      event.preventDefault();
      lostRef.current = true;
      setContextStatus('lost');
    };

    const handleContextRestored = () => {
      lostRef.current = false;
      if (material) material.dispose();
      material = createMaterial();
      mesh.material = material;
      renderer.resetState();
      resize();
      setContextStatus('restored');
      window.setTimeout(() => setContextStatus('ready'), 500);
    };

    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
      renderer.setClearColor(0x010205, 1);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(stateRef.current.fov, 1, 0.01, 100);
      controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;
      controls.enablePan = false;
      controls.minDistance = 4.2;
      controls.maxDistance = 15;
      controls.minPolarAngle = THREE.MathUtils.degToRad(16);
      controls.maxPolarAngle = THREE.MathUtils.degToRad(86);
      controls.target.set(0, 0, 0);
      controls.addEventListener('change', syncCameraStateFromControls);
      geometry = new THREE.PlaneGeometry(2, 2);
      material = createMaterial();
      mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      scene.add(mesh);
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
      applyCameraState(stateRef.current, true);
      resize();
    } catch (error) {
      setContextStatus('error');
      console.error('[GARGANTUA] renderer initialization failed', error);
      return () => undefined;
    }

    const animate = (now) => {
      animationFrame = window.requestAnimationFrame(animate);
      const delta = Math.min(0.05, Math.max(0, (now - lastFrameTime) / 1000));
      lastFrameTime = now;
      if (lostRef.current) return;
      const current = stateRef.current;
      if (!current.capture && current.moviePlaying) {
        moviePhase += delta * 0.13;
        const movieAzimuth = current.cameraAzimuth + Math.sin(moviePhase * 0.7) * 18 + moviePhase * 9;
        const movieElevation = current.cameraElevation + Math.sin(moviePhase * 0.43) * 3;
        applyCameraState({ ...current, cameraAzimuth: movieAzimuth, cameraElevation: movieElevation }, true);
      } else {
        applyCameraState(current);
      }
      if (!current.capture && current.moviePlaying) timeRef.current += delta * current.timeMultiplier;
      if (now - lastHudTimeUpdate > 250) {
        lastHudTimeUpdate = now;
        setDisplayTime(timeRef.current);
      }
      controls.update();
      updateUniforms();
      updateCameraUniforms();
      renderer.render(scene, camera);
      if (!firstFrame) {
        firstFrame = true;
        readyRef.current = true;
        setReady(true);
        document.documentElement.dataset.gargantuaReady = 'true';
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    const api = {
      getState: () => ({ ...stateRef.current, time: timeRef.current, ready: readyRef.current }),
      setQuality,
      setPreset: applyPreset,
      setDebug,
      setTime,
    };
    Object.defineProperty(api, 'ready', { enumerable: true, get: () => readyRef.current });
    window.__GARGANTUA__ = Object.freeze(api);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      controls?.removeEventListener('change', syncCameraStateFromControls);
      controls?.dispose();
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
      delete window.__GARGANTUA__;
      delete document.documentElement.dataset.gargantuaReady;
    };
  }, [applyPreset, patchState, setDebug, setQuality, setTime]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      const editing = target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement;
      if (event.shiftKey && /^[1-4]$/.test(event.key)) {
        event.preventDefault();
        applyPreset(Number(event.key) - 1);
        return;
      }
      if (editing && event.key !== 'Escape') return;
      if (/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        setDebug(Number(event.key));
      } else if (event.key === ' ') {
        event.preventDefault();
        patchState({ moviePlaying: !stateRef.current.moviePlaying });
      } else if (event.key.toLowerCase() === 'h') {
        event.preventDefault();
        patchState({ hud: !stateRef.current.hud });
      } else if (event.key.toLowerCase() === 'r') {
        event.preventDefault();
        resetState();
      } else if (event.key.toLowerCase() === 'q') {
        event.preventDefault();
        const levels = Object.keys(QUALITY);
        const next = (levels.indexOf(stateRef.current.quality) + 1) % levels.length;
        setQuality(levels[next]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [applyPreset, patchState, resetState, setDebug, setQuality]);

  const currentPreset = PRESETS[state.preset];
  const currentDebug = DEBUG_LABELS[state.debug];

  const onParamChange = (key, value) => {
    const change = { [key]: Number(value) };
    if (['fov', 'cameraDistance', 'cameraAzimuth', 'cameraElevation'].includes(key)) change.moviePlaying = false;
    patchState(change);
  };

  const statusText = contextStatus === 'lost' ? 'WEBGL PAUSED' : contextStatus === 'restored' ? 'RESUMING' : contextStatus === 'error' ? 'RENDERER ERROR' : ready ? 'LIVE' : 'INITIALIZING';

  return (
    <main className="gargantua-app">
      <canvas ref={canvasRef} className="raytracer-canvas" aria-label="Interactive Schwarzschild black hole raytracer" />
      <div className="scene-vignette" aria-hidden="true" />
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><span className="brand-dot" />GARGANTUA</div>
          <div className="brand-subtitle">SCHWARZSCHILD / NULL GEODESIC OBSERVATORY</div>
        </div>
        <div className="topbar-status">
          <span className={`status-led status-led--${contextStatus}`} />
          <span>{statusText}</span>
          <span className="status-divider" />
          <span>{QUALITY[state.quality].label.toUpperCase()}</span>
        </div>
      </header>

      {contextStatus === 'lost' && (
        <div className="context-banner" role="status">
          <strong>WebGL context paused</strong>
          <span>Renderer resources will rebuild when the context returns.</span>
        </div>
      )}

      {!state.hud && (
        <button className="hud-reopen" onClick={() => patchState({ hud: true })} aria-label="Show HUD">HUD <span>H</span></button>
      )}

      {state.hud && (
        <aside className="hud-panel" aria-label="Gargantua controls">
          <div className="hud-scroll">
            <div className="hud-heading">
              <div>
                <span className="eyebrow">LIVE INSTRUMENT</span>
                <h1>Photon field</h1>
              </div>
              <button className="icon-button" onClick={() => patchState({ hud: false })} aria-label="Hide HUD">×</button>
            </div>

            <section className="status-card">
              <div className="status-card-line"><span>SCHEMATIC</span><strong>{state.debug === 0 ? 'FINAL IMAGE' : `DEBUG ${state.debug}`}</strong></div>
              <div className="status-card-line"><span>PRESET</span><strong>{currentPreset.name}</strong></div>
              <div className="status-card-line"><span>SIM TIME</span><strong>{displayTime.toFixed(2)} s</strong></div>
              <div className="status-card-meter"><span style={{ width: `${clamp((state.timeMultiplier / 4) * 100, 5, 100)}%` }} /></div>
            </section>

            <section className="hud-section">
              <div className="section-label"><span>CAMERA PRESETS</span><span className="section-rule" /></div>
              <div className="preset-grid">
                {PRESETS.map((preset, index) => (
                  <button key={preset.name} className={`preset-button ${state.preset === index ? 'is-active' : ''}`} onClick={() => applyPreset(index)}>
                    <span className="preset-index">0{index + 1}</span>
                    <span><b>{preset.name}</b><small>{preset.note}</small></span>
                  </button>
                ))}
              </div>
            </section>

            <section className="hud-section">
              <div className="section-label"><span>RENDER QUALITY</span><span className="section-rule" /></div>
              <div className="quality-switcher">
                {Object.entries(QUALITY).map(([key, profile]) => (
                  <button key={key} className={state.quality === key ? 'is-active' : ''} onClick={() => setQuality(key)}>{profile.label}</button>
                ))}
              </div>
            </section>

            <section className="hud-section controls-section">
              <div className="section-label"><span>PARAMETERS / 21</span><span className="section-rule" /></div>
              <div className="parameter-list">
                {PARAMS.map((parameter) => (
                  <label className="parameter" key={parameter.key}>
                    <span className="parameter-head"><span>{parameter.label}</span><output>{formatValue(state[parameter.key], parameter.step, parameter.unit)}</output></span>
                    <input
                      type="range"
                      min={parameter.min}
                      max={parameter.max}
                      step={parameter.step}
                      value={state[parameter.key]}
                      onChange={(event) => onParamChange(parameter.key, event.target.value)}
                    />
                  </label>
                ))}
              </div>
            </section>

            <section className="hud-section">
              <div className="section-label"><span>DIAGNOSTIC VIEW</span><span className="section-rule" /></div>
              <div className="debug-title"><span className="debug-number">{state.debug}</span><span>{currentDebug}</span></div>
              <div className="debug-grid">
                {DEBUG_LABELS.map((label, index) => (
                  <button key={label} className={state.debug === index ? 'is-active' : ''} onClick={() => setDebug(index)} title={label}>{index}</button>
                ))}
              </div>
            </section>

            <section className="hud-section shortcuts-section">
              <div className="section-label"><span>INPUT MAP</span><span className="section-rule" /></div>
              <div className="shortcut-row"><span><kbd>SHIFT</kbd> + <kbd>1–4</kbd></span><span>presets</span></div>
              <div className="shortcut-row"><span><kbd>SPACE</kbd></span><span>{state.moviePlaying ? 'pause camera loop' : 'play camera loop'}</span></div>
              <div className="shortcut-row"><span><kbd>0–9</kbd></span><span>diagnostics</span></div>
              <div className="shortcut-row"><span><kbd>H</kbd> / <kbd>Q</kbd> / <kbd>R</kbd></span><span>HUD / quality / reset</span></div>
            </section>

            <button className="reset-button" onClick={resetState}>RESET INSTRUMENT <span>R</span></button>
          </div>
          <div className="hud-footer"><span>rₛ = 1.000</span><span>LOCAL / OFFLINE</span></div>
        </aside>
      )}

      <div className="bottom-readout" aria-live="polite">
        <span className="readout-line" />
        <span>NULL GEODESIC INTEGRATOR</span>
        <span className="readout-separator">/</span>
        <span>{state.moviePlaying ? 'CINEMA LOOP' : 'MANUAL CONTROL'}</span>
      </div>
      <div className="gesture-hint">DRAG TO ORBIT <span>·</span> SCROLL TO DOLLY</div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
