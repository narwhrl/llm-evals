import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Camera, CameraOff, Cloud, Download, Leaf, RotateCcw, Settings2, Waves, X } from 'lucide-react';
import { createVoxelScene } from './scene.js';
import './style.css';

const initialOptions = {
  light: 'dawn',
  clouds: 76,
  flow: 65,
  vegetation: true,
  orbit: false,
};

function App() {
  const viewportRef = useRef(null);
  const sceneRef = useRef(null);
  const [options, setOptions] = useState(initialOptions);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const scene = createVoxelScene(viewportRef.current, initialOptions);
    sceneRef.current = scene;
    setReady(true);
    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, []);

  function changeOption(name, value) {
    setOptions((current) => ({ ...current, [name]: value }));
    sceneRef.current?.updateOptions({ [name]: value });
  }

  return (
    <main className="app">
      <div className="viewport" ref={viewportRef} aria-label="山脉、瀑布和穿云效果的三维体素景观" />
      <div className="vignette" aria-hidden="true" />

      <header className="masthead">
        <div className="brand-mark" aria-hidden="true"><span /><span /><span /></div>
        <div>
          <p className="eyebrow">VOXEL LANDSCAPE / 001</p>
          <h1>云瀑山境</h1>
          <p className="subtitle">THE FALLS ABOVE THE CLOUDS</p>
        </div>
      </header>

      <button
        className="mobile-settings icon-button"
        type="button"
        title="场景设置"
        aria-label="场景设置"
        aria-expanded={settingsOpen}
        onClick={() => setSettingsOpen((open) => !open)}
      >
        {settingsOpen ? <X size={19} /> : <Settings2 size={19} />}
      </button>

      <aside className={`controls ${settingsOpen ? 'controls-open' : ''}`} aria-label="场景设置">
        <div className="panel-heading">
          <span>场景调节</span>
          <span className="panel-index">01 / 04</span>
        </div>

        <div className="control-section">
          <div className="section-label"><span>光照时段</span><span>LIGHT</span></div>
          <div className="segments" role="group" aria-label="光照时段">
            {[['dawn', '晨曦'], ['noon', '日间'], ['dusk', '暮色']].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={options.light === value ? 'selected' : ''}
                aria-pressed={options.light === value}
                onClick={() => changeOption('light', value)}
              >{label}</button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <label className="range-label" htmlFor="clouds">
            <span><Cloud size={16} strokeWidth={1.8} /> 云量</span>
            <output>{options.clouds}%</output>
          </label>
          <input id="clouds" type="range" min="0" max="100" value={options.clouds} onChange={(event) => changeOption('clouds', Number(event.target.value))} style={{ '--value': `${options.clouds}%` }} />
        </div>

        <div className="control-section">
          <label className="range-label" htmlFor="flow">
            <span><Waves size={16} strokeWidth={1.8} /> 水流速度</span>
            <output>{options.flow}%</output>
          </label>
          <input id="flow" type="range" min="0" max="100" value={options.flow} onChange={(event) => changeOption('flow', Number(event.target.value))} style={{ '--value': `${options.flow}%` }} />
        </div>

        <div className="control-section switches">
          <label className="switch-row">
            <span><Leaf size={16} strokeWidth={1.8} /> 山麓植被</span>
            <input type="checkbox" checked={options.vegetation} onChange={(event) => changeOption('vegetation', event.target.checked)} />
            <span className="switch" aria-hidden="true" />
          </label>
          <label className="switch-row">
            <span>{options.orbit ? <Camera size={16} strokeWidth={1.8} /> : <CameraOff size={16} strokeWidth={1.8} />} 自动环绕</span>
            <input type="checkbox" checked={options.orbit} onChange={(event) => changeOption('orbit', event.target.checked)} />
            <span className="switch" aria-hidden="true" />
          </label>
        </div>

        <div className="panel-actions">
          <button type="button" title="重置视角" aria-label="重置视角" onClick={() => sceneRef.current?.resetView()} disabled={!ready}><RotateCcw size={17} /></button>
          <button type="button" title="下载画面" aria-label="下载画面" onClick={() => sceneRef.current?.capture()} disabled={!ready}><Download size={17} /></button>
        </div>
      </aside>

      <footer className="scene-meta">
        <span className="live-dot" />
        <span>200 × 200 VOXEL TERRAIN</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
