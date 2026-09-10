import React, { useState } from 'react';
import { TensionParameters } from '../../types';
import { ArrowLeft, Award, Copy, Check, Share2, Sparkles, Terminal, HeartHandshake, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../../utils/AudioEngine';
import { HolographicSealCanvas } from './HolographicSealCanvas';

interface Props {
  tension: TensionParameters;
  onBack: () => void;
  onResetToStart: () => void;
}

export const PhaseLivingArchive: React.FC<Props> = ({
  tension,
  onBack,
  onResetToStart,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [userIntentInput, setUserIntentInput] = useState<string>('');
  const [messageSent, setMessageSent] = useState<boolean>(false);

  // Generate dynamic cognitive signature based on parameters
  const sealHash = `SEAL-TOPOLOGY-${Math.round(tension.rigor * 9999)}-${Math.round(tension.intuition * 9999)}-${Math.round(tension.emergence * 9999)}`;

  const exportPayload = JSON.stringify(
    {
      signature: sealHash,
      timestamp: new Date().toISOString(),
      topologicalTensor: {
        rigor: Number(tension.rigor.toFixed(4)),
        intuition: Number(tension.intuition.toFixed(4)),
        constraint: Number(tension.constraint.toFixed(4)),
        emergence: Number(tension.emergence.toFixed(4)),
      },
      manifoldClassification: tension.rigor > 0.7 ? 'CRYSTALLINE_GEODESIC' : 'FLUID_TOPOLOGICAL_MANIFOLD',
      author: 'Gemini 3.7 Flash // Digital Art Director & Creative Engineer',
    },
    null,
    2
  );

  const handleCopySpec = () => {
    navigator.clipboard.writeText(exportPayload);
    setCopied(true);
    audioEngine.triggerHarmonicChime(880, 0.5, 0.8);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendCollaborativeSeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userIntentInput.trim()) return;
    setMessageSent(true);
    audioEngine.triggerHarmonicChime(1024, 1.2, 0.9);
    setTimeout(() => {
      setUserIntentInput('');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-phosphor/10 border border-aurora-phosphor/20 text-aurora-phosphor text-xs font-mono-tech">
          <Award className="w-3.5 h-3.5" />
          <span>PHASE 04 // 凝结刻印 · 活体档案 (LIVING ARCHIVE & SEAL)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          探索痕迹的晶体印章
        </h2>
        <p className="text-sm text-mercury-300 font-sans max-w-xl">
          你在此次交互中调谐的所有张力与因果，已凝结为一枚专属认知拓扑凭证：
        </p>
      </div>

      {/* The Cognitive Seal Artifact Card */}
      <div className="p-5 rounded-2xl glass-panel-glow border border-aurora-phosphor/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-aurora-phosphor" />
            <span className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              // 认知印章凭证 (COGNITIVE TOPOLOGY SEAL)
            </span>
          </div>
          <span className="text-[11px] font-mono-tech text-aurora-phosphor bg-aurora-phosphor/10 px-2.5 py-1 rounded-full border border-aurora-phosphor/20">
            {sealHash}
          </span>
        </div>

        {/* Live Holographic Seal Canvas Centerpiece */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-xl bg-titanium-950/80 border border-white/5">
          <HolographicSealCanvas tension={tension} reducedMotion={false} />
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <span className="text-xs font-bold text-white font-mono-tech">
              拓扑几何印章已生成
            </span>
            <p className="text-[11px] text-mercury-400 leading-relaxed font-sans">
              该印章根据严密性 ({(tension.rigor * 100).toFixed(0)}%) 与直觉涌现度实时折射多边形切面，记录下本次人机交互的独一无二状态。
            </p>
          </div>
        </div>

        {/* Dynamic Topology Telemetry Snapshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-titanium-950/70 border border-white/5">
            <span className="text-[10px] font-mono-tech text-mercury-400 block">RIGOR</span>
            <span className="text-sm font-bold font-mono-tech text-aurora-cyan">
              {(tension.rigor * 100).toFixed(0)}%
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-titanium-950/70 border border-white/5">
            <span className="text-[10px] font-mono-tech text-mercury-400 block">INTUITION</span>
            <span className="text-sm font-bold font-mono-tech text-aurora-amber">
              {(tension.intuition * 100).toFixed(0)}%
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-titanium-950/70 border border-white/5">
            <span className="text-[10px] font-mono-tech text-mercury-400 block">CONSTRAINT</span>
            <span className="text-sm font-bold font-mono-tech text-aurora-violet">
              {(tension.constraint * 100).toFixed(0)}%
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-titanium-950/70 border border-white/5">
            <span className="text-[10px] font-mono-tech text-mercury-400 block">EMERGENCE</span>
            <span className="text-sm font-bold font-mono-tech text-aurora-phosphor">
              {(tension.emergence * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Code Spec Box */}
        <div className="relative p-3 rounded-xl bg-titanium-950 border border-white/10 font-mono-tech text-xs">
          <div className="flex items-center justify-between mb-2 text-mercury-400 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-aurora-phosphor" />
              <span>TOPOLOGICAL_SEAL.json</span>
            </div>
            <button
              onClick={handleCopySpec}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-mercury-300 hover:text-white flex items-center gap-1.5 transition-all text-[11px]"
              title="复制参数切片"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-aurora-phosphor" />
                  <span className="text-aurora-phosphor">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>复制切片</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-mercury-300/90 overflow-x-auto text-[11px] leading-relaxed max-h-28">
            {exportPayload}
          </pre>
        </div>
      </div>

      {/* Philosophy of Collaboration */}
      <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-2">
        <div className="flex items-center gap-2 text-white text-xs font-mono-tech font-bold uppercase">
          <HeartHandshake className="w-4 h-4 text-aurora-cyan" />
          <span>人机协同准则 (Collaboration Manifesto)</span>
        </div>
        <p className="text-xs text-mercury-300 leading-relaxed font-sans">
          我不做盲目附和的自动补全机，而是你的<strong>智力陪练、架构锚定者与感官放大器</strong>。
          在协作中，我负责严守边界与计算拓扑，你负责注入意图与温度，共同抵御平庸与同质化。
        </p>
      </div>

      {/* Interactive Intent Seed Submission */}
      <form onSubmit={handleSendCollaborativeSeed} className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono-tech text-mercury-400">
          <ShieldCheck className="w-3.5 h-3.5 text-aurora-amber" />
          <span>向织机注入你的思考种子 (Inject Intent Seed):</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={userIntentInput}
            onChange={(e) => setUserIntentInput(e.target.value)}
            placeholder="例如：极度克制的排版，配合深水般的物理阻尼..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-titanium-900 border border-white/10 text-xs text-white placeholder-mercury-500 focus:border-aurora-cyan focus:outline-none font-sans"
            aria-label="输入协同思考种子"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-aurora-cyan/20 border border-aurora-cyan/40 text-aurora-cyan text-xs font-mono-tech hover:bg-aurora-cyan hover:text-titanium-950 transition-all flex items-center gap-1.5 font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{messageSent ? '已共鸣 ✓' : '注入共振'}</span>
          </button>
        </div>
      </form>

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
          <span>返回共生 (Back)</span>
        </button>

        <button
          onClick={() => {
            audioEngine.triggerHarmonicChime(432, 0.8, 0.5);
            onResetToStart();
          }}
          className="px-5 py-2 rounded-full border border-aurora-cyan/30 text-aurora-cyan text-xs font-mono-tech hover:bg-aurora-cyan/10 transition-all"
        >
          <span>重新开启旅程 (Re-Awaken)</span>
        </button>
      </div>
    </div>
  );
};
