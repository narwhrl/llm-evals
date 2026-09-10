import React from 'react';
import { PhaseId } from '../../types';
import { Volume2, VolumeX, Eye, HelpCircle, Wind } from 'lucide-react';
import { audioEngine } from '../../utils/AudioEngine';

interface Props {
  currentPhase: PhaseId;
  onPhaseSelect: (phase: PhaseId) => void;
  inspectionMode: boolean;
  onToggleInspection: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenHelp: () => void;
}

export const TopNavigation: React.FC<Props> = ({
  currentPhase,
  onPhaseSelect,
  inspectionMode,
  onToggleInspection,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  onToggleReducedMotion,
  onOpenHelp,
}) => {
  const phases: { id: PhaseId; num: string; label: string }[] = [
    { id: 'genesis', num: '01', label: '觉醒' },
    { id: 'dialectic', num: '02', label: '思辨' },
    { id: 'cocreation', num: '03', label: '共生' },
    { id: 'archive', num: '04', label: '刻印' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 glass-panel border-b border-white/5 flex items-center justify-between gap-4">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-aurora-cyan via-aurora-violet to-aurora-amber p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          <div className="w-full h-full bg-titanium-950 rounded-[7px] flex items-center justify-center">
            <span className="font-display font-bold text-xs text-white">R</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-bold font-mono-tech tracking-wider text-white flex items-center gap-1.5">
            REFRACTIVE TOPOGRAPHY
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-phosphor animate-pulse"></span>
          </span>
          <span className="text-[10px] font-sans text-mercury-400">
            认知折射地貌 · 思考自画像
          </span>
        </div>
      </div>

      {/* Phase Segmented Navigation */}
      <nav className="hidden md:flex items-center p-1 rounded-full bg-titanium-900 border border-white/5" aria-label="体验阶段导航">
        {phases.map((p) => {
          const isActive = currentPhase === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                onPhaseSelect(p.id);
                audioEngine.triggerHarmonicChime(500 + parseInt(p.num) * 100, 0.5, 0.6);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono-tech flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-titanium-700 text-white shadow-md border border-white/15'
                  : 'text-mercury-400 hover:text-white hover:bg-white/5'
              }`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className={`text-[10px] ${isActive ? 'text-aurora-cyan' : 'opacity-40'}`}>
                {p.num}
              </span>
              <span>{p.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Utilities & Accessibility Bar */}
      <div className="flex items-center gap-2">
        {/* Inspection Mode Toggle */}
        <button
          onClick={() => {
            audioEngine.triggerHapticTick();
            onToggleInspection();
          }}
          className={`p-2 rounded-lg border text-xs font-mono-tech flex items-center gap-1.5 transition-all ${
            inspectionMode
              ? 'bg-aurora-phosphor/20 border-aurora-phosphor text-aurora-phosphor'
              : 'border-white/5 bg-titanium-900/60 text-mercury-400 hover:text-white hover:border-white/20'
          }`}
          title="切换底模张力透镜 (Shift+C)"
          aria-label="切换张力透镜"
          aria-pressed={inspectionMode}
        >
          <Eye className="w-4 h-4" />
          <span className="hidden xl:inline text-[11px]">透镜</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          className={`p-2 rounded-lg border text-xs font-mono-tech flex items-center gap-1.5 transition-all ${
            soundEnabled
              ? 'bg-aurora-cyan/20 border-aurora-cyan text-aurora-cyan'
              : 'border-white/5 bg-titanium-900/60 text-mercury-400 hover:text-white hover:border-white/20'
          }`}
          title={soundEnabled ? '静音 (M)' : '开启谐波声画合成器 (M)'}
          aria-label="声音开关"
          aria-pressed={soundEnabled}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden xl:inline text-[11px]">声画</span>
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={() => {
            audioEngine.triggerHapticTick();
            onToggleReducedMotion();
          }}
          className={`p-2 rounded-lg border text-xs font-mono-tech flex items-center gap-1.5 transition-all ${
            reducedMotion
              ? 'bg-aurora-amber/20 border-aurora-amber text-aurora-amber'
              : 'border-white/5 bg-titanium-900/60 text-mercury-400 hover:text-white hover:border-white/20'
          }`}
          title="减弱动效/晶体静态投影 (R)"
          aria-label="减弱动效开关"
          aria-pressed={reducedMotion}
        >
          <Wind className="w-4 h-4" />
          <span className="hidden xl:inline text-[11px]">静态晶体</span>
        </button>

        {/* Hotkeys Help Modal */}
        <button
          onClick={() => {
            audioEngine.triggerHapticTick();
            onOpenHelp();
          }}
          className="p-2 rounded-lg border border-white/5 bg-titanium-900/60 text-mercury-400 hover:text-white hover:border-white/20 transition-all"
          title="快捷键指南 (?)"
          aria-label="快捷键指南"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
