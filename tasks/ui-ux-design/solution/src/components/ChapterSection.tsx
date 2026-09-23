import React from 'react';
import { ChapterMeta } from '../types';
import { InteractiveStampMaker } from './InteractiveStampMaker';

interface ChapterSectionProps {
  meta: ChapterMeta;
  isActive: boolean;
  dialecticCoupling?: number;
  onDialecticCouplingChange?: (val: number) => void;
  onSealParamsChange?: (params: { points: number; twist: number; tension: number }) => void;
}

export const ChapterSection: React.FC<ChapterSectionProps> = ({
  meta,
  isActive,
  dialecticCoupling = 1.0,
  onDialecticCouplingChange,
  onSealParamsChange,
}) => {
  return (
    <article
      id={`section-${meta.id}`}
      className={`min-h-[85vh] flex flex-col justify-center py-12 px-4 sm:px-8 max-w-2xl transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-40 hover:opacity-75'
      }`}
    >
      {/* Chapter Marker Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-ink-900 text-paper-50 font-semibold tracking-wider">
          CHAPTER {meta.sequence}
        </span>
        <span className="font-mono text-xs text-ink-500 uppercase tracking-widest">
          {meta.titleEn}
        </span>
      </div>

      {/* Main Chapter Title */}
      <h2 className="font-serif text-3xl sm:text-5xl font-light text-ink-900 tracking-tight leading-tight mb-2">
        {meta.titleZh}
      </h2>
      <p className="font-serif italic text-lg sm:text-xl text-ink-600 mb-6">
        {meta.subtitleZh} / <span className="font-sans text-sm not-italic text-ink-400">{meta.subtitleEn}</span>
      </p>

      {/* Narrative Body Copy */}
      <div className="space-y-4 font-sans text-ink-700 leading-relaxed text-sm sm:text-base border-l-2 border-paper-300 pl-4 sm:pl-6 my-4">
        {meta.descriptionZh.map((paragraph, idx) => (
          <p key={idx} className="first-letter:text-2xl first-letter:font-serif first-letter:font-bold first-letter:mr-0.5">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Chapter Metrics & Technical Specifications */}
      <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-lg bg-paper-50 border border-paper-200">
        {meta.metrics.map((metric, i) => (
          <div key={i} className="flex flex-col">
            <span className="font-mono text-[10px] text-ink-400 uppercase tracking-wider">
              {metric.label}
            </span>
            <span className="font-mono text-sm sm:text-base font-bold text-ink-900">
              {metric.value}
            </span>
            <span className="font-mono text-[10px] text-cinnabar">
              {metric.delta}
            </span>
          </div>
        ))}
      </div>

      {/* Chapter-Specific Interactive Consoles */}
      {meta.id === 'inception' && (
        <div className="p-4 rounded-lg border border-paper-300 bg-white/70 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs text-ink-700 font-semibold">
            <span>KINETIC PROXIMITY SENSING // 动能近场感应</span>
            <span className="text-cinnabar">EQUILIBRIUM: 100%</span>
          </div>
          <p className="text-xs text-ink-600 font-sans leading-relaxed">
            在右侧视口用鼠标或触摸屏直接抓取任意浮动节点并向外拖拉。结构将实时演示非线性张力传递：局部形变引发全系统势能重构，并在松手后经历阻尼震荡归位。
          </p>
        </div>
      )}

      {meta.id === 'tension' && (
        <div className="p-4 rounded-lg border border-paper-300 bg-white/70 space-y-3">
          <div className="font-mono text-xs text-ink-800 font-semibold">
            ENGINEERING AXIOMS // 三大工程与美学公理
          </div>
          <ul className="text-xs text-ink-600 space-y-2 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-cinnabar font-bold">01.</span>
              <span><strong>受压杆永不直接相交</strong>：严苛逻辑彼此独立，不产生无谓的横向摩擦与代码耦合。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cinnabar font-bold">02.</span>
              <span><strong>连续拉索编织全局感知</strong>：局部的一次微小需求改动，通过张力网络瞬时传导至整体。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cinnabar font-bold">03.</span>
              <span><strong>轻量胜于笨重</strong>：真正的稳定性来自动态拉力自锁，而非浇筑沉重的单体混凝土。</span>
            </li>
          </ul>
        </div>
      )}

      {meta.id === 'dialectic' && (
        <div className="p-4 rounded-lg border border-paper-300 bg-white/70 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-ink-800 font-semibold">
            <span>DIALECTICAL COUPLING MODULATOR // 辩证互锁相变调节器</span>
            <span className="text-cyanotype font-bold">{dialecticCoupling.toFixed(2)}x</span>
          </div>
          <p className="text-xs text-ink-600 font-sans">
            拖动滑块调节横跨两座共振腔的张力刚度：较弱时两腔各自独立漂移；较高时两腔剧烈拉近并激发多复调共振弦波。
          </p>
          <div className="pt-1">
            <input
              type="range"
              min="0.2"
              max="1.8"
              step="0.05"
              value={dialecticCoupling}
              onChange={(e) => onDialecticCouplingChange?.(Number(e.target.value))}
              aria-label="Dialectic coupling tension"
              className="w-full accent-cinnabar h-2 bg-paper-300 rounded cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-ink-400 mt-1">
              <span>0.2x 孤立漂移 (ISOLATION)</span>
              <span>1.0x 动态平衡</span>
              <span>1.8x 强力共振 (SYNTHESIS)</span>
            </div>
          </div>
        </div>
      )}

      {meta.id === 'artifact' && (
        <div className="mt-2">
          <InteractiveStampMaker onParametersChange={onSealParamsChange} />
        </div>
      )}
    </article>
  );
};
