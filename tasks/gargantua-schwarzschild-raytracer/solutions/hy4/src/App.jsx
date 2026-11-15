import { useCallback, useEffect, useRef, useState } from 'react';
import { Engine } from './engine/Engine.js';
import { installApi } from './api.js';
import { resolveInitialState } from './store.js';
import { AmbientAudio } from './audio.js';
import { Hud } from './ui/Hud.jsx';

export default function App() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const audioRef = useRef(null);
  const initialRef = useRef(null);
  if (!initialRef.current) initialRef.current = resolveInitialState(window.location.search);

  const [ui, setUi] = useState(null);
  const [contextState, setContextState] = useState('ok');
  const [contextError, setContextError] = useState('');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [fatal, setFatal] = useState('');

  const onStateChange = useCallback((snapshot) => setUi(snapshot), []);
  const onReady = useCallback(() => {
    if (engineRef.current) setUi(engineRef.current.getState());
  }, []);
  const onContextState = useCallback((state, message) => {
    setContextState(state === 'restored' ? 'ok' : state);
    setContextError(message ?? '');
  }, []);

  useEffect(() => {
    const audio = new AmbientAudio();
    audioRef.current = audio;
    const engine = new Engine({
      canvas: canvasRef.current,
      state: initialRef.current.state,
      runtime: initialRef.current.runtime,
      onStateChange,
      onContextState,
      onReady,
    });
    engineRef.current = engine;
    installApi(engine);
    setUi(engine.getState());
    try {
      engine.init();
    } catch (error) {
      setFatal(String(error?.message ?? error));
    }

    const onKey = (event) => {
      const eng = engineRef.current;
      if (!eng) return;
      const target = event.target;
      if (target && (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && target.type !== 'range'))) return;
      const digit = /^Digit([0-9])$/.exec(event.code) || /^Numpad([0-9])$/.exec(event.code);
      if (digit) {
        const n = Number(digit[1]);
        if (event.shiftKey) {
          if (n >= 1 && n <= 4) {
            eng.setPreset(n - 1);
            event.preventDefault();
          }
        } else {
          eng.setDebug(n);
          event.preventDefault();
        }
        return;
      }
      switch (event.code) {
        case 'Space':
          eng.toggleCinematic();
          event.preventDefault();
          break;
        case 'KeyH':
          eng.setHud(!eng.state.hudOpen);
          event.preventDefault();
          break;
        case 'KeyR':
          eng.reset();
          event.preventDefault();
          break;
        case 'KeyQ':
          eng.cycleQuality();
          event.preventDefault();
          break;
        case 'KeyM':
          if (!eng.runtime.capture) {
            const playing = audioRef.current?.toggle();
            setAudioPlaying(Boolean(playing));
            event.preventDefault();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      audio.dispose();
      engine.dispose();
      engineRef.current = null;
      delete window.__GARGANTUA__;
    };
  }, [onStateChange, onContextState, onReady]);

  const toggleAudio = useCallback(() => {
    const eng = engineRef.current;
    if (!eng || eng.runtime.capture) return;
    const playing = audioRef.current?.toggle();
    setAudioPlaying(Boolean(playing));
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} id="gargantua-canvas" className="scene" />

      <div className="brand">
        <div className="brand-title">GARGANTUA</div>
        <div className="brand-sub">SCHWARZSCHILD BLACK HOLE RAYTRACER</div>
        <div className="brand-meta">NULL GEODESICS / RK4 / r_s = 1</div>
      </div>

      <div className="hint-bar">
        <span>DRAG <i>orbit</i></span>
        <span>WHEEL / PINCH <i>zoom</i></span>
        <span>H <i>hud</i></span>
        <span>0–9 <i>debug</i></span>
        <span>Shift+1–4 <i>presets</i></span>
      </div>

      <Hud
        ui={ui}
        engine={engineRef.current}
        audioPlaying={audioPlaying}
        onAudio={toggleAudio}
        onClose={() => engineRef.current?.setHud(false)}
      />

      {contextState !== 'ok' && (
        <div className="context-overlay" id="context-overlay" role="alert">
          <div className="context-card">
            <div className="context-kicker">RENDERER PAUSED</div>
            <h2>WEBGL CONTEXT LOST</h2>
            <p>Rendering is paused. GPU resources, render targets and materials will be rebuilt from persisted state when the context is restored. Your settings are safe.</p>
            {contextError && <p className="warn">{contextError}</p>}
            <button type="button" onClick={() => engineRef.current?.restoreContextNow()}>RESTORE NOW</button>
          </div>
        </div>
      )}

      {fatal && (
        <div className="context-overlay" id="fatal-overlay" role="alert">
          <div className="context-card">
            <h2>RENDERER ERROR</h2>
            <p>{fatal}</p>
          </div>
        </div>
      )}
    </div>
  );
}
