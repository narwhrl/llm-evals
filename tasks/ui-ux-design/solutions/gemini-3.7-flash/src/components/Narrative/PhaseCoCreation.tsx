import React, { useState, useEffect, useRef } from 'react';
import { TensionParameters, CoCreationSeed, SequenceStage } from '../../types';
import { ArrowRight, ArrowLeft, Play, Flame, CheckCircle2, RefreshCw, Wand2, Sparkles } from 'lucide-react';
import { audioEngine } from '../../utils/AudioEngine';

interface Props {
  tension: TensionParameters;
  onUpdateTension: (updated: Partial<TensionParameters>) => void;
  onSetStress: (stress: number) => void;
  onSetFracture: (fracture: number) => void;
  onAdvance: () => void;
  onBack: () => void;
  reducedMotion: boolean;
}

export const PhaseCoCreation: React.FC<Props> = ({
  onUpdateTension,
  onSetStress,
  onSetFracture,
  onAdvance,
  onBack,
  reducedMotion,
}) => {
  const [selectedSeed, setSelectedSeed] = useState<string>('seed-1');
  const [sequenceRunning, setSequenceRunning] = useState<boolean>(false);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [stageProgress, setStageProgress] = useState<number>(0);
  const animTimerRef = useRef<number | null>(null);

  const seeds: CoCreationSeed[] = [
    {
      id: 'seed-1',
      title: '严谨秩序 × 诗性漂移',
      subtitle: 'Rigid Order × Poetic Drift',
      category: 'symbiosis',
      harmonicFrequency: 528,
      parameters: { rigor: 0.85, intuition: 0.75, constraint: 0.6, emergence: 0.8 },
      description: '在不可撼动的工程架构之上，激荡出不可预测的视觉拓扑共鸣。',
      crystallizedQuote: '“约束并非枷锁，而是让灵感在摩擦中爆发出火花的聚焦点。”',
    },
    {
      id: 'seed-2',
      title: '算法粗野主义 × 流体解构',
      subtitle: 'Algorithmic Brutalism × Fluid Deconstruction',
      category: 'architecture',
      harmonicFrequency: 396,
      parameters: { rigor: 0.95, intuition: 0.3, constraint: 0.9, emergence: 0.4 },
      description: '裸露的代码梁柱与极高密度的晶格，呈现纯粹的工业力量感。',
      crystallizedQuote: '“剥离一切谄媚的装饰，唯留下数学纯度与骨骼张力。”',
    },
    {
      id: 'seed-3',
      title: '极简静谧 × 潜意识共振',
      subtitle: 'Minimalist Stillness × Subconscious Resonance',
      category: 'poetics',
      harmonicFrequency: 639,
      parameters: { rigor: 0.4, intuition: 0.95, constraint: 0.3, emergence: 0.65 },
      description: '大面积留白与微弱起伏的呼吸频率，触碰人机交互的感知边界。',
      crystallizedQuote: '“当所有杂音归零，留下的便是人与系统最清澈的对视。”',
    },
  ];

  const stages: SequenceStage[] = [
    {
      step: 1,
      name: 'GENESIS_ALIGNMENT',
      title: '阶段一：开始 · 意图输入与谐波对齐 (Beginning)',
      description: '将选定意图向量注入织机核心，系统建立初始引力势能场。',
      durationMs: 2500,
    },
    {
      step: 2,
      name: 'TENSION_DEVELOPMENT',
      title: '阶段二：发展 · 拓扑应力连续递增 (Development)',
      description: '不同维度的矛盾需求相互拉扯，晶格经历高频振荡与热态形变。',
      durationMs: 3000,
    },
    {
      step: 3,
      name: 'DIALECTIC_FRACTURE',
      title: '阶段三：转折 · 极限应力裂变与解构 (The Turn)',
      description: '系统承受极限临界载荷，外壳瞬间解构裂变为多面体晶片星环！',
      durationMs: 3500,
    },
    {
      step: 4,
      name: 'HIGHER_SYNTHESIS',
      title: '阶段四：收束 · 高维重构与结晶固化 (Resolution)',
      description: '碎片按更高阶自洽数学几何重新聚合，完成一次认知的升维跃迁。',
      durationMs: 3000,
    },
  ];

  const handleSelectSeed = (seed: CoCreationSeed) => {
    setSelectedSeed(seed.id);
    onUpdateTension(seed.parameters);
    audioEngine.triggerHarmonicChime(seed.harmonicFrequency, 0.9, 0.6);
  };

  // Run the full 4-stage choreographed sequence
  const startChoreography = () => {
    if (sequenceRunning) return;
    setSequenceRunning(true);
    setCurrentStageIndex(0);
    setStageProgress(0);

    if (reducedMotion) {
      // Instant graceful transition for reduced motion
      onSetStress(0.2);
      onSetFracture(0.8);
      setTimeout(() => {
        onSetStress(0);
        onSetFracture(0);
        setSequenceRunning(false);
        setCurrentStageIndex(3);
      }, 1000);
      return;
    }

    let currentStep = 0;

    const runStep = () => {
      const stage = stages[currentStep];
      audioEngine.triggerHarmonicChime(400 + currentStep * 120, 1.0, 0.7);

      if (currentStep === 2) {
        // Stage 3: The Turn (Fracture & Sound Sweep)
        audioEngine.triggerStressSweep(1.0);
      }

      const stepStart = performance.now();
      const stepInterval = setInterval(() => {
        const elapsed = performance.now() - stepStart;
        const p = Math.min(1.0, elapsed / stage.durationMs);
        setStageProgress(p);

        // Map step and progress to 3D continuous parameters
        if (currentStep === 0) {
          onSetStress(p * 0.3);
          onSetFracture(0);
        } else if (currentStep === 1) {
          onSetStress(0.3 + p * 0.5);
          onSetFracture(p * 0.3);
        } else if (currentStep === 2) {
          onSetStress(0.8 + (1 - p) * 0.2);
          onSetFracture(0.3 + p * 0.7); // Maximum explosion of shards
        } else if (currentStep === 3) {
          onSetStress((1 - p) * 0.4);
          onSetFracture((1 - p) * 0.9); // Re-synthesizing into crystal
        }

        if (p >= 1.0) {
          clearInterval(stepInterval);
          if (currentStep < stages.length - 1) {
            currentStep++;
            setCurrentStageIndex(currentStep);
            runStep();
          } else {
            // Sequence completed
            setSequenceRunning(false);
            onSetStress(0);
            onSetFracture(0);
            audioEngine.triggerHarmonicChime(880, 1.5, 0.9);
          }
        }
      }, 30);
    };

    runStep();
  };

  useEffect(() => {
    return () => {
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, []);

  const activeSeed = seeds.find((s) => s.id === selectedSeed) || seeds[0];
  const activeStage = stages[currentStageIndex];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-violet/10 border border-aurora-violet/20 text-aurora-violet text-xs font-mono-tech">
          <Wand2 className="w-3.5 h-3.5" />
          <span>PHASE 03 // 共生织机 · 长时序裂变 (THE CO-CREATION LOOM)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          人机意图共谋与长时序蜕变
        </h2>
        <p className="text-sm text-mercury-300 font-sans max-w-xl">
          选择一组意图种子并触发完整的「开始—发展—转折—收束」演化编舞，观察系统在极限应力下的解构与再合成：
        </p>
      </div>

      {/* Seed Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {seeds.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSelectSeed(s)}
            disabled={sequenceRunning}
            className={`p-3.5 rounded-xl text-left transition-all border ${
              selectedSeed === s.id
                ? 'glass-panel-glow border-aurora-cyan'
                : 'bg-titanium-900/60 border-white/5 hover:border-white/20'
            } ${sequenceRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-white font-mono-tech">
                {s.title}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-aurora-cyan" />
            </div>
            <p className="text-[11px] text-mercury-400 font-sans line-clamp-2">
              {s.description}
            </p>
          </button>
        ))}
      </div>

      {/* Long-Sequence Stage Orchestrator Panel */}
      <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-aurora-amber animate-pulse" />
            <h3 className="text-sm font-semibold text-white font-mono-tech">
              长时序蜕变编舞器 (Choreographed Sequence)
            </h3>
          </div>

          <button
            onClick={startChoreography}
            disabled={sequenceRunning}
            className={`px-5 py-2.5 rounded-full text-xs font-mono-tech font-bold flex items-center justify-center gap-2 transition-all ${
              sequenceRunning
                ? 'bg-aurora-amber text-titanium-950 animate-pulse'
                : 'bg-gradient-to-r from-aurora-cyan via-aurora-violet to-aurora-amber text-titanium-950 hover:scale-105 shadow-[0_0_20px_rgba(56,189,248,0.35)]'
            }`}
          >
            {sequenceRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>演化进行中 ({Math.round(stageProgress * 100)}%)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>触发极限应力裂变 (Trigger Stress Test)</span>
              </>
            )}
          </button>
        </div>

        {/* 4-Stage Step Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stages.map((st, idx) => {
            const isDone = currentStageIndex > idx;
            const isCurrent = currentStageIndex === idx && sequenceRunning;
            return (
              <div
                key={st.step}
                className={`p-2.5 rounded-lg border transition-all ${
                  isCurrent
                    ? 'bg-aurora-cyan/15 border-aurora-cyan text-white shadow-md'
                    : isDone
                    ? 'bg-titanium-800/80 border-aurora-phosphor/40 text-mercury-200'
                    : 'bg-titanium-950/60 border-white/5 text-mercury-500'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono-tech mb-1">
                  <span>STEP 0{st.step}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3 h-3 text-aurora-phosphor" />
                  ) : (
                    <span className="opacity-50">{idx === 2 ? '⚡ 转折' : '●'}</span>
                  )}
                </div>
                <div className="text-[11px] font-medium truncate">
                  {idx === 0 ? '开始 (Align)' : idx === 1 ? '发展 (Stress)' : idx === 2 ? '转折 (Fracture)' : '收束 (Synthesis)'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Active Stage Narrative */}
        <div className="p-3.5 rounded-xl bg-titanium-950/80 border border-white/5 space-y-1.5 font-sans">
          <div className="text-xs font-mono-tech text-aurora-cyan font-semibold">
            {activeStage.title}
          </div>
          <p className="text-xs text-mercury-300 leading-relaxed">
            {activeStage.description}
          </p>
        </div>

        <div className="border-l-2 border-aurora-violet/70 pl-3.5 py-1 text-xs italic text-mercury-300 font-serif">
          {activeSeed.crystallizedQuote}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            audioEngine.triggerHapticTick();
            onBack();
          }}
          className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono-tech text-mercury-400 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回思辨 (Back)</span>
        </button>

        <button
          onClick={() => {
            audioEngine.triggerHarmonicChime(768, 0.8, 0.8);
            onAdvance();
          }}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-aurora-phosphor to-aurora-cyan text-titanium-950 font-semibold text-xs font-mono-tech flex items-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all"
        >
          <span>进入凝结刻印与活体档案 (Phase 04)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
