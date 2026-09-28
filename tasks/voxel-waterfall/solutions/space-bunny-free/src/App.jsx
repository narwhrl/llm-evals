import { useEffect, useMemo, useRef, useState } from 'react';
import createScene from './scene/VoxelScene.js';

const DEFAULT_SETTINGS = {
  timeOfDay: 0.28,
  cloudCover: 0.68,
  waterFlow: 0.78,
  vegetation: true,
  showClouds: true,
  autoRotate: true,
  voxelEdges: false,
};

const VIEW_OPTIONS = [
  { id: 'overview', label: 'Overview', hint: 'Full valley' },
  { id: 'waterfall', label: 'Falls', hint: 'Main cascade' },
  { id: 'ridge', label: 'Ridge', hint: 'Cloud line' },
  { id: 'valley', label: 'Valley', hint: 'River base' },
];

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (name === 'sun') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </svg>
    );
  }
  if (name === 'cloud') {
    return (
      <svg {...common}>
        <path d="M6.5 18.5h10.75a3.75 3.75 0 0 0 .5-7.46A6 6 0 0 0 6.2 9.7 4.4 4.4 0 0 0 6.5 18.5Z" />
      </svg>
    );
  }
  if (name === 'drop') {
    return (
      <svg {...common}>
        <path d="M12 3.5S6.5 10.1 6.5 14.2a5.5 5.5 0 0 0 11 0C17.5 10.1 12 3.5 12 3.5Z" />
        <path d="M9.2 15.1a3 3 0 0 0 2.8 1.8" />
      </svg>
    );
  }
  if (name === 'leaf') {
    return (
      <svg {...common}>
        <path d="M20.5 3.5C12 3.7 5.3 6.2 4 12.2c-.8 3.7 1.9 6.3 5.4 5.7 6.3-1 8.9-7 11.1-14.4Z" />
        <path d="M3.5 21c3.4-4.2 7-7.1 12.1-9.4" />
      </svg>
    );
  }
  if (name === 'orbit') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="2.2" />
        <path d="M20.8 8.2c1.2 2.1.1 5.1-2.6 6.7-2.8 1.7-6.7 1.3-8.7-.9-2-2.2-1.6-5.7.8-7.4 2.4-1.8 6.1-1.8 8.3 0" />
        <path d="M3.2 15.8c-1.2-2.1-.1-5.1 2.6-6.7 2.8-1.7 6.7-1.3 8.7.9 2 2.2 1.6 5.7-.8 7.4-2.4 1.8-6.1 1.8-8.3 0" />
      </svg>
    );
  }
  if (name === 'grid') {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    );
  }
  if (name === 'refresh') {
    return (
      <svg {...common}>
        <path d="M20 11a8 8 0 0 0-14.9-4L3 10" />
        <path d="M3 5v5h5" />
        <path d="M4 13a8 8 0 0 0 14.9 4L21 14" />
        <path d="M21 19v-5h-5" />
      </svg>
    );
  }
  if (name === 'arrow') {
    return (
      <svg {...common}>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  }
  return null;
}

function Slider({ icon, label, value, min, max, step, onChange, display }) {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <label className="slider-row">
      <span className="slider-label">
        <span className="slider-icon"><Icon name={icon} size={16} /></span>
        <span>{label}</span>
        <strong>{display}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ '--range-progress': `${percentage}%` }}
        aria-label={label}
      />
    </label>
  );
}

function Toggle({ icon, label, checked, onChange, detail }) {
  return (
    <button
      className={`toggle-row ${checked ? 'is-on' : ''}`}
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-leading">
        <span className="slider-icon"><Icon name={icon} size={16} /></span>
        <span>
          <strong>{label}</strong>
          <small>{detail}</small>
        </span>
      </span>
      <span className="switch" aria-hidden="true"><span /></span>
    </button>
  );
}

function App() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [stats, setStats] = useState({ gridSize: 200, terrainBlocks: 0, totalBlocks: 0 });
  const [sceneError, setSceneError] = useState('');
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    try {
      sceneRef.current = createScene(canvasRef.current, DEFAULT_SETTINGS, setStats);
    } catch (error) {
      setSceneError(error instanceof Error ? error.message : 'WebGL could not be initialized.');
    }
    return () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneRef.current?.setSettings(settings);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const timeLabel = useMemo(() => {
    if (settings.timeOfDay < 0.22) return 'BLUE HOUR';
    if (settings.timeOfDay < 0.48) return 'MORNING';
    if (settings.timeOfDay < 0.72) return 'GOLDEN HOUR';
    return 'SUNSET';
  }, [settings.timeOfDay]);

  const formattedBlocks = stats.totalBlocks > 9999
    ? `${(stats.totalBlocks / 1000).toFixed(1)}k`
    : stats.totalBlocks.toLocaleString();

  return (
    <main className="app-shell">
      <canvas
        ref={canvasRef}
        className="scene-canvas"
        data-grid-size="200"
        data-scene-engine="three.js"
        aria-label="Interactive voxel mountain and waterfall scene"
      />
      <div className="scene-vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span /><span /><span /></div>
          <div>
            <p className="eyebrow">FIELD STUDY / 07</p>
            <h1>Voxel Waterfall</h1>
          </div>
        </div>
        <div className="topbar-meta">
          <div className="live-pill"><span className="live-dot" />LIVE SCENE</div>
          <div className="weather-readout"><Icon name="sun" size={15} />{timeLabel}<span className="weather-temp">14°</span></div>
        </div>
      </header>

      <aside className="control-panel glass-panel" aria-label="Scene controls">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">ATMOSPHERE</p>
            <h2>Shape the valley</h2>
          </div>
          <span className="panel-index">01</span>
        </div>

        <div className="control-section">
          <Slider
            icon="sun"
            label="Light study"
            value={settings.timeOfDay}
            min={0}
            max={1}
            step={0.01}
            display={timeLabel}
            onChange={(value) => updateSetting('timeOfDay', value)}
          />
          <Slider
            icon="cloud"
            label="Cloud cover"
            value={settings.cloudCover}
            min={0.1}
            max={1}
            step={0.01}
            display={`${Math.round(settings.cloudCover * 100)}%`}
            onChange={(value) => updateSetting('cloudCover', value)}
          />
          <Slider
            icon="drop"
            label="Water flow"
            value={settings.waterFlow}
            min={0.1}
            max={1}
            step={0.01}
            display={`${Math.round(settings.waterFlow * 100)}%`}
            onChange={(value) => updateSetting('waterFlow', value)}
          />
        </div>

        <div className="section-rule" />
        <div className="toggle-list">
          <Toggle
            icon="leaf"
            label="Forest edge"
            detail="54 voxel pines"
            checked={settings.vegetation}
            onChange={(value) => updateSetting('vegetation', value)}
          />
          <Toggle
            icon="cloud"
            label="Cloud veil"
            detail="Front + back layers"
            checked={settings.showClouds}
            onChange={(value) => updateSetting('showClouds', value)}
          />
          <Toggle
            icon="orbit"
            label="Auto orbit"
            detail="Slow cinematic drift"
            checked={settings.autoRotate}
            onChange={(value) => updateSetting('autoRotate', value)}
          />
          <Toggle
            icon="grid"
            label="Voxel edges"
            detail="Reveal block structure"
            checked={settings.voxelEdges}
            onChange={(value) => updateSetting('voxelEdges', value)}
          />
        </div>

        <button className="reset-button" type="button" onClick={() => {
          setSettings(DEFAULT_SETTINGS);
          setActiveView('overview');
          sceneRef.current?.moveCamera('overview');
        }}>
          <Icon name="refresh" size={15} />
          Reset atmosphere
        </button>
      </aside>

      <section className="view-panel glass-panel" aria-label="Camera views">
        <div className="panel-heading compact">
          <div>
            <p className="eyebrow">VIEWFINDER</p>
            <h2>Find your frame</h2>
          </div>
          <span className="panel-index">02</span>
        </div>
        <div className="view-grid">
          {VIEW_OPTIONS.map((view, index) => (
            <button
              className={`view-button ${activeView === view.id ? 'is-active' : ''}`}
              type="button"
              key={view.id}
              onClick={() => {
                setActiveView(view.id);
                sceneRef.current?.moveCamera(view.id);
              }}
            >
              <span className="view-number">0{index + 1}</span>
              <span className="view-copy"><strong>{view.label}</strong><small>{view.hint}</small></span>
              <Icon name="arrow" size={15} />
            </button>
          ))}
        </div>
      </section>

      <section className="scene-stats glass-panel" aria-label="Scene statistics">
        <div className="stats-topline"><span className="live-dot" />PROCEDURAL LANDSCAPE <span className="stats-live">RUNNING</span></div>
        <div className="stats-main">
          <div><strong>{stats.gridSize} × {stats.gridSize}</strong><span>terrain grid</span></div>
          <div><strong>{formattedBlocks}</strong><span>rendered facets</span></div>
          <div><strong>GPU</strong><span>render state</span></div>
        </div>
      </section>

      <div className="bottom-note">
        <span className="note-line" />
        <span>Three.js / React + Vite</span>
        <span className="note-dot">•</span>
        <span>Drag to orbit · scroll to explore</span>
      </div>

      {sceneError && (
        <div className="error-toast" role="alert">
          <strong>Scene unavailable</strong>
          <span>{sceneError}</span>
        </div>
      )}
    </main>
  );
}

export default App;
