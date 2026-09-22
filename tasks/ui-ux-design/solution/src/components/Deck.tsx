import { useEffect, useState } from "react";
import type { EngineSnapshot, InkEngine } from "../ink/engine";

interface DeckProps {
  engine: InkEngine | null;
  temperature: number;
  onTemperature: (value: number) => void;
  onRead: () => void;
  showControls: boolean;
  word: string;
}

const format = (value: number): string => value.toLocaleString("zh-CN");

export function Deck({ engine, temperature, onTemperature, onRead, showControls, word }: DeckProps) {
  const [snapshot, setSnapshot] = useState<EngineSnapshot | null>(null);

  useEffect(() => {
    if (!engine) {
      setSnapshot(null);
      return;
    }
    setSnapshot(engine.snapshot());
    const timer = window.setInterval(() => setSnapshot(engine.snapshot()), 220);
    return () => window.clearInterval(timer);
  }, [engine]);

  const abandoned = snapshot?.abandoned ?? 0;
  const live = snapshot?.live ?? 0;

  return (
    <div className="deck">
      {showControls ? (
        <div className="deck__control">
          <label htmlFor="temperature">
            温度 <span className="latin">temperature</span>
          </label>
          <input
            id="temperature"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={temperature}
            onChange={(event) => onTemperature(Number(event.target.value))}
            aria-describedby="temperature-hint"
          />
          <p className="deck__hint" id="temperature-hint">
            低 = 只说正确的话 · 高 = 同时想更多句
          </p>
        </div>
      ) : null}

      <p className="deck__readout" aria-live="polite">
        <span>
          温度 <b>{temperature.toFixed(2)}</b>
        </span>
        <span>
          同时进行 <b>{format(live)}</b>
        </span>
        <span>
          已放弃 <b className="warm">{format(abandoned)}</b>
        </span>
        <span>
          纸面 <b>{format(snapshot?.archive ?? 0)}</b>
        </span>
        {snapshot && snapshot.hatchTotal > 0 ? (
          <span>
            拓印 <b>{`${format(snapshot.hatchPlaced)}/${format(snapshot.hatchTotal)}`}</b>
            {snapshot.hatchDone ? <span className="latin"> · done</span> : null}
          </span>
        ) : null}
        {word ? (
          <span>
            你的字 <b className="warm">{word}</b>
          </span>
        ) : null}
      </p>

      {showControls ? (
        <div className="deck__actions">
          <button type="button" className="press" onClick={onRead}>
            读这一行
          </button>
          <p className="deck__hint">在纸上按下：你读到哪里，就在哪里切一刀。</p>
        </div>
      ) : null}
    </div>
  );
}
