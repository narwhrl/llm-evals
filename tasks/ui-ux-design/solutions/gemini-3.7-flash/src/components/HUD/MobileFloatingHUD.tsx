import React from 'react';
import { PhaseId } from '../../types';
import { audioEngine } from '../../utils/AudioEngine';

interface Props {
  currentPhase: PhaseId;
  onSelectPhase: (phase: PhaseId) => void;
}

export const MobileFloatingHUD: React.FC<Props> = ({ currentPhase, onSelectPhase }) => {
  const phases: { id: PhaseId; num: string; label: string }[] = [
    { id: 'genesis', num: '01', label: '觉醒' },
    { id: 'dialectic', num: '02', label: '思辨' },
    { id: 'cocreation', num: '03', label: '共生' },
    { id: 'archive', num: '04', label: '刻印' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[90%] max-w-sm glass-panel p-1.5 rounded-full border border-white/15 shadow-2xl flex items-center justify-between">
      {phases.map((p) => {
        const isActive = currentPhase === p.id;
        return (
          <button
            key={p.id}
            onClick={() => {
              onSelectPhase(p.id);
              audioEngine.triggerHarmonicChime(500 + parseInt(p.num) * 100, 0.4, 0.5);
            }}
            className={`flex-1 py-2 px-1 rounded-full text-[11px] font-mono-tech flex flex-col items-center gap-0.5 transition-all ${
              isActive
                ? 'bg-titanium-700 text-white shadow-lg border border-white/20'
                : 'text-mercury-400 hover:text-white'
            }`}
          >
            <span className={`text-[9px] ${isActive ? 'text-aurora-cyan font-bold' : 'opacity-50'}`}>
              {p.num}
            </span>
            <span className="truncate">{p.label}</span>
          </button>
        );
      })}
    </div>
  );
};
