import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  PARAM_DEFS, QUALITY_PRESETS, CAMERA_PRESETS, DEBUG_MODES
} from './state.js';

const SHORT_LABEL = {
  fov: 'FOV',
  camDistance: 'Dist',
  camAzimuth: 'Az',
  camPitch: 'Pitch',
  timeScale: 'Time×',
  diskInner: 'rIn',
  diskOuter: 'rOut',
  diskThickness: 'H',
  diskTemperature: 'T',
  diskIntensity: 'I',
  orbitSpeed: 'orbV',
  turbulence: 'turb',
  turbulenceSpeed: 'turbV',
  starDensity: 'stars',
  galaxyBrightness: 'gal',
  bloomStrength: 'bloom',
  bloomThreshold: 'bThresh',
  exposure: 'exp',
  vignette: 'vig',
  grain: 'grain',
  chromaticAberration: 'CA'
};

function fmt(v, decimals = 2) {
  if (Math.abs(v) >= 100) return v.toFixed(0);
  if (Math.abs(v) >= 10) return v.toFixed(1);
  return v.toFixed(decimals);
}

function Slider({ id, label, value, onChange, min, max, step }) {
  return (
    <div className="control">
      <input
        type="range"
        id={`param-${id}`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
      />
      <div className="num">{SHORT_LABEL[id] ?? label} {fmt(value)}</div>
    </div>
  );
}

function Panel({ controller }) {
  const [state, setState] = React.useState(controller.getState());
  React.useEffect(() => controller.subscribe(() => setState(controller.getState())), []);

  const setParam = (id) => (v) => controller.setParam(id, v);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const q = QUALITY_PRESETS[state.quality];

  return (
    <div className={`hud ${isMobile ? 'mobile' : ''} ${state.hudVisible ? '' : 'collapsed'}`}
         aria-hidden={!state.hudVisible}>
      <div className="hud-header">
        <h1>GARGANTUA</h1>
        <button className="hud-toggle" onClick={() => controller.toggleHud()}
                aria-label="Toggle HUD">✕</button>
      </div>

      <div className="row">
        <label>Quality</label>
        <span className="value">{q.label} · {state.quality}</span>
      </div>

      <div className="row">
        <label>Preset</label>
        <span className="value">{CAMERA_PRESETS[state.preset]?.name}</span>
      </div>

      <div className="row">
        <label>Debug</label>
        <span className="value">{DEBUG_MODES[state.debugMode]?.name}</span>
      </div>

      <div className="row">
        <label>Audio</label>
        <span className="value">{state.audioEnabled ? 'on' : 'off'}</span>
      </div>

      <div className="row">
        <label>Capture</label>
        <span className="value">{state.capture ? 'frozen' : 'live'}</span>
      </div>

      <h2>Camera</h2>
      <Slider id="fov" label="FOV (°)" value={state.params.fov} onChange={setParam('fov')} min={25} max={110} step={1} />
      <Slider id="camDistance" label="Camera distance" value={state.params.camDistance} onChange={setParam('camDistance')} min={6} max={60} step={0.1} />
      <Slider id="camAzimuth" label="Camera azimuth (°)" value={state.params.camAzimuth} onChange={setParam('camAzimuth')} min={-180} max={180} step={1} />
      <Slider id="camPitch" label="Camera pitch (°)" value={state.params.camPitch} onChange={setParam('camPitch')} min={-80} max={80} step={1} />
      <Slider id="timeScale" label="Time multiplier" value={state.params.timeScale} onChange={setParam('timeScale')} min={0} max={5} step={0.05} />

      <h2>Disk</h2>
      <Slider id="diskInner" label="Disk inner radius" value={state.params.diskInner} onChange={setParam('diskInner')} min={4} max={12} step={0.1} />
      <Slider id="diskOuter" label="Disk outer radius" value={state.params.diskOuter} onChange={setParam('diskOuter')} min={10} max={36} step={0.1} />
      <Slider id="diskThickness" label="Disk half-thickness" value={state.params.diskThickness} onChange={setParam('diskThickness')} min={0.05} max={1.2} step={0.01} />
      <Slider id="diskTemperature" label="Disk temperature" value={state.params.diskTemperature} onChange={setParam('diskTemperature')} min={0.2} max={3} step={0.05} />
      <Slider id="diskIntensity" label="Disk emission intensity" value={state.params.diskIntensity} onChange={setParam('diskIntensity')} min={0} max={4} step={0.05} />
      <Slider id="orbitSpeed" label="Orbital velocity multiplier" value={state.params.orbitSpeed} onChange={setParam('orbitSpeed')} min={0.4} max={1.8} step={0.02} />
      <Slider id="turbulence" label="Turbulence amplitude" value={state.params.turbulence} onChange={setParam('turbulence')} min={0} max={1} step={0.02} />
      <Slider id="turbulenceSpeed" label="Turbulence speed" value={state.params.turbulenceSpeed} onChange={setParam('turbulenceSpeed')} min={0} max={4} step={0.05} />

      <h2>Background</h2>
      <Slider id="starDensity" label="Star density" value={state.params.starDensity} onChange={setParam('starDensity')} min={0.1} max={3} step={0.05} />
      <Slider id="galaxyBrightness" label="Galaxy brightness" value={state.params.galaxyBrightness} onChange={setParam('galaxyBrightness')} min={0} max={2} step={0.05} />

      <h2>Post</h2>
      <Slider id="bloomStrength" label="Bloom strength" value={state.params.bloomStrength} onChange={setParam('bloomStrength')} min={0} max={2.5} step={0.02} />
      <Slider id="bloomThreshold" label="Bloom threshold" value={state.params.bloomThreshold} onChange={setParam('bloomThreshold')} min={0} max={4} step={0.02} />
      <Slider id="exposure" label="Exposure" value={state.params.exposure} onChange={setParam('exposure')} min={0.2} max={3} step={0.02} />
      <Slider id="vignette" label="Vignette strength" value={state.params.vignette} onChange={setParam('vignette')} min={0} max={1.5} step={0.02} />
      <Slider id="grain" label="Film grain strength" value={state.params.grain} onChange={setParam('grain')} min={0} max={0.3} step={0.005} />
      <Slider id="chromaticAberration" label="Chromatic aberration strength" value={state.params.chromaticAberration} onChange={setParam('chromaticAberration')} min={0} max={0.02} step={0.0005} />

      <h2>Presets</h2>
      <div className="buttons">
        {CAMERA_PRESETS.map((p) => (
          <button key={p.id}
                  className={state.preset === p.id ? 'active' : ''}
                  onClick={() => controller.setPreset(p.id)}
                  title={`Shift+${p.id + 1}`}>
            {p.name}
          </button>
        ))}
      </div>

      <h2>Debug</h2>
      <div className="debug-list">
        {DEBUG_MODES.map((d) => (
          <button key={d.id}
                  className={state.debugMode === d.id ? 'active' : ''}
                  onClick={() => controller.setDebug(d.id)}
                  title={`${d.name}: ${d.caption}`}>
            {d.id}
          </button>
        ))}
      </div>
      <div className="hint">{DEBUG_MODES[state.debugMode]?.caption}</div>

      <h2>Controls</h2>
      <div className="buttons">
        <button onClick={() => controller.toggleCinematic()}
                className={state.cinematicPlaying ? 'active' : ''}>
          {state.cinematicPlaying ? 'Pause (Space)' : 'Play (Space)'}
        </button>
        <button onClick={() => controller.cycleQuality()}>Quality (Q)</button>
        <button onClick={() => controller.toggleHud()}>Hide (H)</button>
        <button onClick={() => controller.resetAll()}>Reset (R)</button>
        <button onClick={() => controller.toggleAudio()}>
          Audio (M) {state.audioEnabled ? 'on' : 'off'}
        </button>
      </div>

      <div className="hint">
        Drag · Wheel · Touch · Shift+1–4 · 0–9 debug · Space · H · R · Q · M
      </div>
    </div>
  );
}

function FloatingToggle({ controller }) {
  const [visible, setVisible] = React.useState(controller.getState().hudVisible);
  React.useEffect(() => controller.subscribe(() => {
    setVisible(controller.getState().hudVisible);
  }), []);
  if (visible) return null;
  return (
    <button className="fab" onClick={() => controller.toggleHud(true)}>Show HUD</button>
  );
}

export function mountHud(root, controller) {
  const container = document.createElement('div');
  root.appendChild(container);
  const fabContainer = document.createElement('div');
  root.appendChild(fabContainer);
  const reactRoot = createRoot(container);
  const fabRoot = createRoot(fabContainer);
  reactRoot.render(<Panel controller={controller} />);
  fabRoot.render(<FloatingToggle controller={controller} />);
  return { reactRoot, fabRoot };
}