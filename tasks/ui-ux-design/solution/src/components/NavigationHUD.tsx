import React from 'react';
import { ChapterId, ViewMode, TelemetryData } from '../types';

interface NavigationHUDProps {
  currentChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  isMuted: boolean;
  onToggleAudio: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  telemetry: TelemetryData;
  onOpenShortcuts: () => void;
}

const CHAPTERS: { id: ChapterId; seq: string; labelZh: string; labelEn: string }[] = [
  { id: 'inception', seq: '起', labelZh: '几何初啼', labelEn: 'Inception' },
  { id: 'tension', seq: '承', labelZh: '张拉骨架', labelEn: 'Tension' },
  { id: 'dialectic', seq: '转', labelZh: '裂变辩证', labelEn: 'Dialectic' },
  { id: 'artifact', seq: '合', labelZh: '造物印痕', labelEn: 'Artifact' },
];

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  currentChapter,
  onSelectChapter,
  viewMode,
  onToggleViewMode,
  isMuted,
  onToggleAudio,
  reducedMotion,
  onToggleReducedMotion,
  telemetry,
  onOpenShortcuts,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-paper-100/90 backdrop-blur-md border-b border-paper-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-cinnabar rounded-full animate-pulse" />
          <div className="flex flex-col">
            <span className="font-serif italic font-bold tracking-tight text-ink-900 text-sm leading-none">
              Tensegrity Mind
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink-500 leading-tight">
              A Self-Portrait in Tension // {telemetry.fps} FPS
            </span>
          </div>
        </div>

        {/* Chapter Stepper (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-paper-200/50 p-1 rounded-full border border-paper-300" aria-label="Narrative Chapters">
          {CHAPTERS.map((ch) => {
            const isActive = currentChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-ink-900 text-paper-50 shadow-sm font-semibold'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-paper-300/40'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isActive ? 'bg-cinnabar text-white' : 'bg-paper-300 text-ink-700'
                }`}>
                  {ch.seq}
                </span>
                <span>{ch.labelZh}</span>
                <span className="text-[10px] opacity-60 hidden lg:inline">/{ch.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls HUD */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono transition-all ${
              !isMuted
                ? 'bg-cinnabar/10 text-cinnabar border-cinnabar/30'
                : 'bg-paper-50 text-ink-500 border-paper-300 hover:text-ink-800'
            }`}
            title="Toggle Web Audio Synthesizer (Key: M)"
            aria-label={isMuted ? 'Unmute harmonic audio' : 'Mute harmonic audio'}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {!isMuted ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              )}
            </svg>
            <span className="hidden sm:inline">{!isMuted ? 'AUDIO: RES' : 'MUTED'}</span>
          </button>

          {/* Blueprint Diagnostic Mode (Space) */}
          <button
            onClick={onToggleViewMode}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono transition-all ${
              viewMode === 'blueprint'
                ? 'bg-cyanotype-dark text-cyanotype-light border-cyanotype-light shadow-blueprint'
                : 'bg-paper-50 text-ink-600 border-paper-300 hover:text-ink-900'
            }`}
            title="Toggle Blueprint X-Ray (Key: Space)"
            aria-pressed={viewMode === 'blueprint'}
          >
            <span className="w-2 h-2 rounded-sm bg-cyanotype-light inline-block" />
            <span className="hidden sm:inline">BLUEPRINT</span>
            <span className="text-[10px] text-ink-400 hidden lg:inline">[SPACE]</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            className={`p-1.5 rounded border text-xs font-mono ${
              reducedMotion
                ? 'bg-ink-800 text-paper-100 border-ink-800'
                : 'bg-paper-50 text-ink-500 border-paper-300 hover:text-ink-800'
            }`}
            title="Toggle Reduced Motion"
            aria-label="Toggle Reduced Motion"
          >
            <span className="text-[11px] font-bold">{reducedMotion ? 'RM' : 'FX'}</span>
          </button>

          {/* Keyboard Shortcuts Dialog */}
          <button
            onClick={onOpenShortcuts}
            className="w-7 h-7 flex items-center justify-center rounded border border-paper-300 bg-paper-50 text-ink-600 hover:text-ink-900 hover:border-ink-400 text-xs font-mono"
            title="View Keyboard Shortcuts (Key: ?)"
            aria-label="View Keyboard Shortcuts"
          >
            ?
          </button>
        </div>
      </div>

      {/* Mobile Chapter Navigation Row */}
      <div className="flex md:hidden items-center justify-around border-t border-paper-200 px-2 py-1 bg-paper-50">
        {CHAPTERS.map((ch) => {
          const isActive = currentChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                isActive ? 'bg-ink-900 text-white font-semibold' : 'text-ink-600'
              }`}
            >
              {ch.seq} · {ch.labelZh}
            </button>
          );
        })}
      </div>
    </header>
  );
};
