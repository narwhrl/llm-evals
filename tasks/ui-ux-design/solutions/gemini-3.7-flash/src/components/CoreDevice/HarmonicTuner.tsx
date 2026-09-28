import React from 'react';
import { TensionParameters } from '../../types';
import { audioEngine } from '../../utils/AudioEngine';
import { Sliders, Sparkles, Binary, Zap, RefreshCw } from 'lucide-react';

interface Props {
  tension: TensionParameters;
  onChange: (updated: Partial<TensionParameters>) => void;
  onReset: () => void;
}

export const HarmonicTuner: React.FC<Props> = ({ tension, onChange, onReset }) => {
  const handleSliderChange = (key: keyof TensionParameters, val: number) => {
    onChange({ [key]: val });
    // Trigger procedural harmonic chime with frequency mapped to parameter value
    const baseFreq = key === 'rigor' ? 528 : key === 'intuition' ? 432 : key === 'constraint' ? 396 : 639;
    audioEngine.triggerHarmonicChime(baseFreq * (0.8 + val * 0.4), 0.6, val);
  };

  const sliders: {
    key: keyof TensionParameters;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
  }[] = [
    {
      key: 'rigor',
      label: '严密性 (Rigor)',
      sublabel: '工程精度与确定性几何',
      icon: Binary,
      color: 'text-aurora-cyan',
      description: '抑制非线性畸变，收敛为严格的正多面体晶格',
    },
    {
      key: 'intuition',
      label: '直觉漂移 (Intuition)',
      sublabel: '流动性与拓扑诗意',
      icon: Sparkles,
      color: 'text-aurora-amber',
      description: '注入高维谐波扰动，产生如水银般的有机流体张力',
    },
    {
      key: 'constraint',
      label: '系统约束 (Constraint)',
      sublabel: '边界张力与晶胞密度',
      icon: Sliders,
      color: 'text-aurora-violet',
      description: '拉紧空间势能纤维，定义信息结构的承载边界',
    },
    {
      key: 'emergence',
      label: '自发涌现 (Emergence)',
      sublabel: '高阶谐波与非确定性演化',
      icon: Zap,
      color: 'text-aurora-phosphor',
      description: '激发环形轨道高频共振，促发复杂系统涌现形态',
    },
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-aurora-cyan animate-pulse"></div>
          <h3 className="text-sm font-semibold tracking-wider font-mono-tech text-white uppercase">
            // 认知张力调谐仪 (Tension Matrix)
          </h3>
        </div>
        <button
          onClick={() => {
            onReset();
            audioEngine.triggerHapticTick();
          }}
          className="p-1.5 rounded-lg text-mercury-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1 font-mono-tech"
          title="重置为基准谐波"
          aria-label="重置参数"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">重置</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sliders.map((s) => {
          const Icon = s.icon;
          const val = tension[s.key];
          return (
            <div key={s.key} className="space-y-1.5 p-2.5 rounded-xl bg-titanium-900/60 border border-white/5 hover:border-white/15 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-xs font-medium text-white">{s.label}</span>
                </div>
                <span className="text-xs font-mono-tech text-mercury-300">
                  {(val * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-[11px] text-mercury-400 font-sans leading-tight">
                {s.description}
              </p>
              <div className="pt-1">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={val}
                  onChange={(e) => handleSliderChange(s.key, parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-titanium-700 rounded-lg appearance-none cursor-pointer accent-aurora-cyan focus:outline-none"
                  aria-label={s.label}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
