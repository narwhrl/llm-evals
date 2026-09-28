import React, { useState } from 'react';
import { TensionParameters, DialecticConcept } from '../../types';
import { ArrowRight, ArrowLeft, Code2, Layers } from 'lucide-react';
import { audioEngine } from '../../utils/AudioEngine';

interface Props {
  tension: TensionParameters;
  onUpdateTension: (updated: Partial<TensionParameters>) => void;
  onAdvance: () => void;
  onBack: () => void;
}

export const PhaseDialectic: React.FC<Props> = ({
  tension,
  onUpdateTension,
  onAdvance,
  onBack,
}) => {
  const [selectedAxis, setSelectedAxis] = useState<number>(0);

  const dialecticAxes: DialecticConcept[] = [
    {
      id: 'axis-1',
      axisName: 'AXIS_01: RIGOR × POETICS',
      axisTitle: '严密性与诗性直觉的动态互补',
      leftPole: '纯确定性代码 (Deterministic Code)',
      rightPole: '拓扑诗意流体 (Poetic Manifold)',
      value: tension.rigor,
      description: '代码不只是指令的堆叠，而是对高维秩序的具象化。当严密性与直觉达到动态平衡，系统既有坚如磐石的健壮度，又具备如水般灵动的审美呼吸。',
      manifesto: '“好的架构像哥特大教堂的飞扶壁——每一根力学支撑线都清晰裸露，却共同托举起轻盈空灵的光芒。”',
      codeSnippet: `// 严密性约束下的非线性空间形变
const kappa = computeCurvature(tensorField);
const resonance = lerp(deterministicMesh, fluidTopology, intuitionBias);
manifold.applyStressTensor(kappa * rigorFactor);`,
      iconName: 'Cpu',
    },
    {
      id: 'axis-2',
      axisName: 'AXIS_02: CONSTRAINT × EMERGENCE',
      axisTitle: '极限约束与复杂涌现的拓扑转化',
      leftPole: '严密边界网格 (Tight Boundary)',
      rightPole: '非线性谐波涌现 (Nonlinear Resonance)',
      value: tension.emergence,
      description: '真正的创造力从不在无限自由中产生，而是在极其严苛的物理、性能与无障碍约束下，通过高阶数学谐波自发涌现出的全新秩序。',
      manifesto: '“给系统施加最苛刻的边界条件，看它如何在压力极限处绽放出意想不到的高维自洽几何。”',
      codeSnippet: `// 涌现谐波生成器
for (let n = 1; n <= harmonicOrder; n++) {
  const phi = harmonicDispersion(n, constraintLevel);
  lattice.nodes.forEach(node => node.vibrate(phi));
}`,
      iconName: 'Layers',
    },
    {
      id: 'axis-3',
      axisName: 'AXIS_03: PRECISION × EMPATHY',
      axisTitle: '工程精度与人机共情体验',
      leftPole: '冰冷系统指标 (Cold Telemetry)',
      rightPole: '触觉与感官共鸣 (Sensory Resonance)',
      value: tension.intuition,
      description: '无障碍、减弱动效适配与丝滑触觉不是事后打补丁，而是对使用者认知主权的尊重。数字体验必须在无声处给予人以安全感与确定性。',
      manifesto: '“技术是隐形的脊梁，共情是可触摸的温度。每一个微小的焦点环与回弹阻尼，皆是思考者的自律。”',
      codeSnippet: `// 无障碍与感官降级自适应
if (prefersReducedMotion) {
  sculpture.transitionToIsometricProjection({ duration: 0 });
  announceA11yUpdate("已切换为静态晶体建筑剖面，参数实时映射");
}`,
      iconName: 'HeartHandshake',
    },
  ];

  const currentConcept = dialecticAxes[selectedAxis];

  const handleAxisSelect = (idx: number) => {
    setSelectedAxis(idx);
    audioEngine.triggerHarmonicChime(440 + idx * 80, 0.7, 0.5);
  };

  const handleSlider = (val: number) => {
    if (selectedAxis === 0) {
      onUpdateTension({ rigor: val, intuition: 1 - val * 0.4 });
    } else if (selectedAxis === 1) {
      onUpdateTension({ emergence: val, constraint: 1 - val * 0.3 });
    } else {
      onUpdateTension({ intuition: val });
    }
    audioEngine.triggerHarmonicChime(500 + val * 200, 0.4, val);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-amber/10 border border-aurora-amber/20 text-aurora-amber text-xs font-mono-tech">
          <Layers className="w-3.5 h-3.5" />
          <span>PHASE 02 // 聚敛成形 · 思辨三轴 (COGNITIVE DIALECTIC)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          心智模型的拓扑映射
        </h2>
        <p className="text-sm text-mercury-300 font-sans max-w-xl">
          切换不同的思辨轴并调节极性，观察左侧单体装置如何实时由抽象理念转化为几何应力结构：
        </p>
      </div>

      {/* Axis Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-titanium-900 border border-white/5">
        {dialecticAxes.map((axis, idx) => (
          <button
            key={axis.id}
            onClick={() => handleAxisSelect(idx)}
            className={`py-2.5 px-3 rounded-lg text-xs font-mono-tech flex flex-col items-center gap-1 transition-all ${
              selectedAxis === idx
                ? 'bg-titanium-700 text-white shadow-lg border border-white/15'
                : 'text-mercury-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-[10px] opacity-60">0{idx + 1}</span>
            <span className="font-medium truncate max-w-full">
              {idx === 0 ? '严密 × 诗意' : idx === 1 ? '约束 × 涌现' : '精度 × 共情'}
            </span>
          </button>
        ))}
      </div>

      {/* Active Axis Detail Panel */}
      <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="text-sm font-semibold text-white font-mono-tech">
            {currentConcept.axisTitle}
          </h3>
          <span className="text-xs font-mono-tech text-aurora-amber">
            {currentConcept.axisName}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-mercury-200 leading-relaxed font-sans">
          {currentConcept.description}
        </p>

        {/* Dynamic Spectrum Controller */}
        <div className="space-y-2 p-3 rounded-xl bg-titanium-950/70 border border-white/5">
          <div className="flex justify-between text-[11px] font-mono-tech text-mercury-400">
            <span className="text-aurora-cyan">← {currentConcept.leftPole}</span>
            <span className="text-aurora-amber">{currentConcept.rightPole} →</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={currentConcept.value}
            onChange={(e) => handleSlider(parseFloat(e.target.value))}
            className="w-full h-2 bg-titanium-800 rounded-lg appearance-none cursor-pointer accent-aurora-amber"
            aria-label={currentConcept.axisTitle}
          />
        </div>

        {/* Code & Manifesto Excerpt */}
        <div className="p-3.5 rounded-xl bg-titanium-950 border border-white/5 space-y-2 font-mono-tech text-xs">
          <div className="flex items-center gap-2 text-mercury-400 text-[11px]">
            <Code2 className="w-3.5 h-3.5 text-aurora-cyan" />
            <span>// 拓扑控制核心逻辑片断</span>
          </div>
          <pre className="text-aurora-cyan/90 overflow-x-auto text-[11px] leading-relaxed">
            {currentConcept.codeSnippet}
          </pre>
        </div>

        <blockquote className="border-l-2 border-aurora-amber/60 pl-3.5 py-1 text-xs italic text-mercury-300 font-serif">
          {currentConcept.manifesto}
        </blockquote>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            audioEngine.triggerHapticTick();
            onBack();
          }}
          className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono-tech text-mercury-400 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回觉醒 (Back)</span>
        </button>

        <button
          onClick={() => {
            audioEngine.triggerHarmonicChime(640, 0.8, 0.7);
            onAdvance();
          }}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-aurora-amber to-aurora-phosphor text-titanium-950 font-semibold text-xs font-mono-tech flex items-center gap-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all"
        >
          <span>前往共生织机与应力裂变 (Phase 03)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
