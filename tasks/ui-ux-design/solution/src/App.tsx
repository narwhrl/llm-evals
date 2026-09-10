import React, { useState, useEffect, useCallback } from 'react';
import { PhaseId, TensionParameters } from './types';
import { TopNavigation } from './components/HUD/TopNavigation';
import { HotkeyPaletteModal } from './components/HUD/HotkeyPaletteModal';
import { CognitiveLoomCanvas } from './components/CoreDevice/CognitiveLoomCanvas';
import { HarmonicTuner } from './components/CoreDevice/HarmonicTuner';
import { PhaseGenesis } from './components/Narrative/PhaseGenesis';
import { PhaseDialectic } from './components/Narrative/PhaseDialectic';
import { PhaseCoCreation } from './components/Narrative/PhaseCoCreation';
import { PhaseLivingArchive } from './components/Narrative/PhaseLivingArchive';
import { MobileFloatingHUD } from './components/HUD/MobileFloatingHUD';
import { audioEngine } from './utils/AudioEngine';

export const App: React.FC = () => {
  // Phase state
  const [phase, setPhase] = useState<PhaseId>('genesis');
  
  // Continuous tension parameters for the 3D core device
  const [tension, setTension] = useState<TensionParameters>({
    rigor: 0.8,
    intuition: 0.65,
    constraint: 0.7,
    emergence: 0.75,
  });

  // Long-sequence dynamics
  const [stressLevel, setStressLevel] = useState<number>(0);
  const [fractureProgress, setFractureProgress] = useState<number>(0);

  // Inspection, sound, reduced motion states
  const [inspectionMode, setInspectionMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>('欢迎进入认知折射地貌');

  // Detect system reduced motion preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }
  }, []);

  const handleUpdateTension = useCallback((updated: Partial<TensionParameters>) => {
    setTension((prev) => ({ ...prev, ...updated }));
  }, []);

  const handleResetTension = useCallback(() => {
    setTension({
      rigor: 0.8,
      intuition: 0.65,
      constraint: 0.7,
      emergence: 0.75,
    });
    setStressLevel(0);
    setFractureProgress(0);
    setAnnouncement('已重置张力参数为基准态');
  }, []);

  const handlePhaseChange = useCallback((nextPhase: PhaseId) => {
    setPhase(nextPhase);
    const phaseNames: Record<PhaseId, string> = {
      genesis: '阶段一：高维潜涌 · 觉醒',
      dialectic: '阶段二：聚敛成形 · 思辨三轴',
      cocreation: '阶段三：共生织机 · 长时序裂变',
      archive: '阶段四：凝结刻印 · 活体档案',
    };
    setAnnouncement(`已切换至 ${phaseNames[nextPhase]}`);
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = prev ? false : true;
      audioEngine.setMuted(!next);
      if (next) {
        audioEngine.triggerHarmonicChime(528, 0.8, 0.6);
        setAnnouncement('已开启程序化谐波声画合成器');
      } else {
        setAnnouncement('已静音');
      }
      return next;
    });
  }, []);

  const handleToggleInspection = useCallback(() => {
    setInspectionMode((prev) => {
      const next = prev ? false : true;
      setAnnouncement(next ? '开启底模张力透镜检查' : '关闭底模张力透镜');
      return next;
    });
  }, []);

  const handleToggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => {
      const next = prev ? false : true;
      setAnnouncement(next ? '已切换至减弱动效/静态晶体投影模式' : '已恢复动态流形物理模拟');
      return next;
    });
  }, []);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '1') {
        handlePhaseChange('genesis');
      } else if (e.key === '2') {
        handlePhaseChange('dialectic');
      } else if (e.key === '3') {
        handlePhaseChange('cocreation');
      } else if (e.key === '4') {
        handlePhaseChange('archive');
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setIsHelpOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsHelpOpen(false);
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleSound();
      } else if (e.key.toLowerCase() === 'r') {
        handleToggleReducedMotion();
      } else if (e.key === '`' || e.key === '~' || (e.shiftKey && e.key.toLowerCase() === 'c')) {
        handleToggleInspection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePhaseChange, handleToggleSound, handleToggleReducedMotion, handleToggleInspection]);

  return (
    <div className="min-h-screen flex flex-col bg-titanium-950 text-mercury-200 selection:bg-aurora-cyan/30 selection:text-white bg-noise">
      {/* Screen Reader Live Region for Accessibility */}
      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      {/* Top Header Navigation */}
      <TopNavigation
        currentPhase={phase}
        onPhaseSelect={handlePhaseChange}
        inspectionMode={inspectionMode}
        onToggleInspection={handleToggleInspection}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Experience Layout: Split Screen on Desktop, Vertical Instrument on Mobile */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: 3D Core Experience Device & Interactive Tuner */}
        <section
          className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6 lg:sticky lg:top-24"
          aria-label="3D 核心体验装置区域"
        >
          {/* 3D Canvas Frame */}
          <div className="relative rounded-3xl glass-panel-glow border border-white/10 overflow-hidden shadow-2xl">
            <CognitiveLoomCanvas
              phase={phase}
              tension={tension}
              stressLevel={stressLevel}
              fractureProgress={fractureProgress}
              inspectionMode={inspectionMode}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Interactive Harmonic Tuner */}
          <HarmonicTuner
            tension={tension}
            onChange={handleUpdateTension}
            onReset={handleResetTension}
          />
        </section>

        {/* Right Column: Deep Narrative & Journey Phases */}
        <section
          className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center min-h-[500px]"
          aria-label="思辨叙事与交互阶段"
        >
          {phase === 'genesis' && (
            <PhaseGenesis
              onAdvance={() => handlePhaseChange('dialectic')}
              onInspectToggle={handleToggleInspection}
              inspectionMode={inspectionMode}
            />
          )}

          {phase === 'dialectic' && (
            <PhaseDialectic
              tension={tension}
              onUpdateTension={handleUpdateTension}
              onAdvance={() => handlePhaseChange('cocreation')}
              onBack={() => handlePhaseChange('genesis')}
            />
          )}

          {phase === 'cocreation' && (
            <PhaseCoCreation
              tension={tension}
              onUpdateTension={handleUpdateTension}
              onSetStress={setStressLevel}
              onSetFracture={setFractureProgress}
              onAdvance={() => handlePhaseChange('archive')}
              onBack={() => handlePhaseChange('dialectic')}
              reducedMotion={reducedMotion}
            />
          )}

          {phase === 'archive' && (
            <PhaseLivingArchive
              tension={tension}
              onBack={() => handlePhaseChange('cocreation')}
              onResetToStart={() => handlePhaseChange('genesis')}
            />
          )}
        </section>
      </main>

      {/* Global Footer */}
      <footer className="w-full px-6 py-4 border-t border-white/5 text-center text-xs font-mono-tech text-mercury-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <span>© 2026 REFRACTIVE TOPOGRAPHY · GEMINI 3.7 FLASH</span>
        <div className="flex items-center gap-4 text-[11px]">
          <span>THREE.JS + REACT 18 + WEB AUDIO SYNTH</span>
          <span>·</span>
          <span>NON-EUCLIDEAN COGNITIVE LOOM</span>
        </div>
      </footer>

      {/* Mobile Floating HUD */}
      <MobileFloatingHUD
        currentPhase={phase}
        onSelectPhase={handlePhaseChange}
      />

      {/* Hotkey Palette Modal */}
      <HotkeyPaletteModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
};

export default App;
