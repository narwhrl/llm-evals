import { DEBUG_VIEWS } from "../config/debugViews";
import { PARAM_BY_KEY, ParamKey, ParamValues } from "../config/params";
import { PRESETS } from "../config/presets";
import { QUALITY_PROFILES, QualityLevel } from "../config/quality";
import { EngineStats } from "../scene/engine";
import { ControlPanel } from "./ControlPanel";

interface HudProps {
  open: boolean;
  values: ParamValues;
  debug: number;
  quality: QualityLevel;
  preset: number;
  stats: EngineStats | null;
  cinematic: boolean;
  captureMode: boolean;
  contextLost: boolean;
  onToggle: () => void;
  onParamChange: (key: ParamKey, value: number) => void;
  onResetParam: (key: ParamKey) => void;
  onResetAll: () => void;
  onPreset: (index: number) => void;
  onQuality: (level: QualityLevel) => void;
  onDebug: (index: number) => void;
  onCinematic: () => void;
}

/**
 * The overlay.
 *
 * It stays out of the way of the subject: the title sits in a corner, the
 * parameter panel is a narrow column on the right that can be folded away
 * entirely, and on a phone it becomes a drawer that starts closed. The
 * critical structure — the shadow, the photon ring, the lensed disc — is
 * never behind a panel.
 */
export function Hud({
  open,
  values,
  debug,
  quality,
  preset,
  stats,
  cinematic,
  captureMode,
  contextLost,
  onToggle,
  onParamChange,
  onResetParam,
  onResetAll,
  onPreset,
  onQuality,
  onDebug,
  onCinematic,
}: HudProps) {
  const view = DEBUG_VIEWS[debug] ?? DEBUG_VIEWS[0];
  const qualityProfile = QUALITY_PROFILES.find((profile) => profile.id === quality)!;

  return (
    <div className={`hud${open ? " hud--open" : ""}`}>
      <header className="hud__title">
        <h1 className="hud__name">GARGANTUA</h1>
        <p className="hud__subtitle">Schwarzschild null-geodesic raytracer</p>
      </header>

      <button
        type="button"
        className="hud__toggle"
        onClick={onToggle}
        aria-expanded={open}
        title="Show or hide the panel (H)"
      >
        {open ? "Hide panel ▸" : "◂ Panel"}
      </button>

      {open ? (
        <>
          <section className="hud__status">
            <div className="status__row">
              <span className="status__key">Quality</span>
              <span className="status__value">
                {qualityProfile.label}
                <span className="status__dim">
                  {" "}
                  · {Math.round(stats ? stats.renderScale * 100 : qualityProfile.resolutionScale * 100)}% scale
                  · {qualityProfile.maxSteps} steps
                  · {stats ? stats.dpr.toFixed(2) : "1"}× dpr
                </span>
              </span>
            </div>
            <div className="status__row">
              <span className="status__key">Camera</span>
              <span className="status__value">
                {cinematic ? "Cinematic loop" : "Manual"}
                <span className="status__dim">
                  {" "}
                  · {values.cameraAzimuth.toFixed(0)}° / {values.cameraElevation.toFixed(0)}° /{" "}
                  {values.cameraDistance.toFixed(1)} rₛ
                </span>
              </span>
            </div>
            <div className="status__row">
              <span className="status__key">Debug view</span>
              <span className="status__value">
                {debug} — {view.name}
              </span>
            </div>
            <p className="status__note">{view.description}</p>
            {stats ? (
              <p className="status__note status__note--dim">
                {stats.fps.toFixed(0)} fps · {stats.frameMs.toFixed(1)} ms
                {captureMode ? " · capture mode (frozen)" : ""}
              </p>
            ) : null}
          </section>

          <nav className="hud__presets" aria-label="Camera presets">
            {PRESETS.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`preset${preset === item.id ? " preset--active" : ""}`}
                onClick={() => onPreset(item.id)}
                title={`${item.subtitle} (Shift+${item.id + 1})`}
              >
                <span className="preset__index">Shift+{item.id + 1}</span>
                <span className="preset__name">{item.name}</span>
              </button>
            ))}
          </nav>

          <section className="hud__quality" aria-label="Quality">
            {QUALITY_PROFILES.map((profile) => (
              <button
                type="button"
                key={profile.id}
                className={`chip${quality === profile.id ? " chip--active" : ""}`}
                onClick={() => onQuality(profile.id)}
                title={profile.description}
              >
                {profile.label}
              </button>
            ))}
            <button
              type="button"
              className={`chip${cinematic ? " chip--active" : ""}`}
              onClick={onCinematic}
              title="Play or pause the cinematic camera loop (Space)"
            >
              {cinematic ? "❙❙ Loop" : "▶ Loop"}
            </button>
          </section>

          <section className="hud__debug" aria-label="Debug views">
            {DEBUG_VIEWS.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`chip chip--tiny${debug === item.id ? " chip--active" : ""}`}
                onClick={() => onDebug(item.id)}
                title={item.description}
              >
                {item.id}
              </button>
            ))}
          </section>

          <ControlPanel
            values={values}
            onChange={onParamChange}
            onResetParam={onResetParam}
            onResetAll={onResetAll}
          />

          <footer className="hud__keys">
            <span>
              <kbd>0</kbd>–<kbd>9</kbd> debug
            </span>
            <span>
              <kbd>Shift</kbd>+<kbd>1</kbd>–<kbd>4</kbd> presets
            </span>
            <span>
              <kbd>Space</kbd> loop
            </span>
            <span>
              <kbd>H</kbd> panel
            </span>
            <span>
              <kbd>R</kbd> reset
            </span>
            <span>
              <kbd>Q</kbd> quality
            </span>
          </footer>
        </>
      ) : null}

      {contextLost ? (
        <div className="lost" role="status">
          <div className="lost__card">
            <h2>WebGL context lost</h2>
            <p>
              The browser took the graphics context back. The renderer is
              rebuilding its targets and will resume on the same frame —
              nothing has been lost.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function paramHint(key: ParamKey): string {
  return PARAM_BY_KEY[key].hint;
}
