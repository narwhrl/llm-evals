import { useEffect, useRef } from 'react';
import { GargantuaEngine } from './engine/Engine';
import { AmbientAudio } from './engine/audio';
import { store } from './state/store';
import { attachShortcuts } from './state/shortcuts';
import { ContextLostOverlay, FatalOverlay, Hud } from './ui/Hud';
import { useStoreState } from './ui/useStore';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AmbientAudio | null>(null);
  const state = useStoreState();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let engine: GargantuaEngine | null = null;
    try {
      engine = new GargantuaEngine(canvas);
      engine.start();
    } catch (err) {
      store.setFatal(err instanceof Error ? err.message : String(err));
    }

    const detachShortcuts = attachShortcuts();
    const audio = new AmbientAudio();
    audioRef.current = audio;
    const unlock = () => audio.unlock();
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      detachShortcuts();
      audio.dispose();
      audioRef.current = null;
      engine?.dispose();
    };
  }, []);

  useEffect(() => {
    audioRef.current?.setEnabled(state.audio);
  }, [state.audio]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
      />
      {state.fatal ? (
        <FatalOverlay message={state.fatal} />
      ) : state.contextLost ? (
        <ContextLostOverlay />
      ) : state.hud ? (
        <Hud />
      ) : null}
    </div>
  );
}
