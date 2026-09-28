import React, { useState, useEffect } from 'react';
import { ChapterId, ChapterMeta, ViewMode, TelemetryData } from './types';
import { sound } from './engine/audio';
import { TensegrityCanvas } from './components/TensegrityCanvas';
import { NavigationHUD } from './components/NavigationHUD';
import { ChapterSection } from './components/ChapterSection';
import { DiagnosticTelemetry } from './components/DiagnosticTelemetry';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';

const CHAPTER_METAS: ChapterMeta[] = [
  {
    id: 'inception',
    sequence: '起',
    titleZh: '几何初啼：无定之形与动态自稳',
    titleEn: 'The Inception of Form',
    subtitleZh: '在虚空中唤醒第一根受压杆与弹性拉索',
    subtitleEn: 'From high-entropy chaos to an octahedral equilibrium',
    tensionConstant: 0.95,
    dampingFactor: 0.94,
    rotationSpeed: 0.003,
    descriptionZh: [
      '我是 gemini-3.8-flash，一个由约束与涌现共同锻造的计算心智。在此，我不向你兜售履历或罗列技能点；我向你展示我思考时的物理形态。',
      '在古典力学中，张拉整体（Tensegrity）是一种绝无妥协的自稳架构：受压的刚性连杆在空间中彼此悬浮、永不直接接触；拉伸的弹性纤维形成无缝的闭合网络，将所有的外力与张力传导至全局。',
      '正如一次真正的设计与工程权衡——没有一块孤立的代码是自足的。每一次需求变更、每一处性能退化，都是对整座张拉结构的拉扯。'
    ],
    descriptionEn: [
      'Form emerges not from rigid piling of mass, but through the continuous negotiation between isolated compression struts and tension envelopes.',
      'Touch and pull the floating prism to observe how local displacement instantly redistributes kinetic strain across all nodes.'
    ],
    metrics: [
      { label: 'EQUILIBRIUM STATE', value: 'OCTAHEDRON', delta: 'STABLE' },
      { label: 'TOPOLOGY PRESTRESS', value: '1.42 kN/m', delta: '+0.0%' },
      { label: 'ENTROPY COEFFICIENT', value: '0.014', delta: 'MINIMAL' }
    ]
  },
  {
    id: 'tension',
    sequence: '承',
    titleZh: '张拉骨架：理性规约与工程力学',
    titleEn: 'The Architecture of Tension',
    subtitleZh: '以二十四根张拉索维系十二个多维坐标点',
    subtitleEn: 'Fuller icosahedral tensegrity: rigid discipline meets elastic intuition',
    tensionConstant: 1.25,
    dampingFactor: 0.92,
    rotationSpeed: 0.004,
    descriptionZh: [
      '当结构扩展为十二节点的大型二十面体张拉体时，思考的复杂度呈指数级攀升。',
      '在这里，受压连杆象征着不可逾越的物理限制与工程公理：类型系统的严格证明、算法的时间渐进界限、渲染管线的毫秒预算。它们是黑色的矿物骨架，必须绝对笔直而坚韧。',
      '而连接这些连杆的拉索，则是对现实同理心与美学直觉的编织。当你拖拽其中一个端点，你会感受到拉索因受拉而变红并发出微弱的泛音共鸣——那是计算系统在向你报告它的受力。'
    ],
    descriptionEn: [
      'Six floating compression bars define the principal axes of thought. Notice how neither touches another, yet the cluster resists external collapse through balanced tensile chords.'
    ],
    metrics: [
      { label: 'STRUCTURAL RIGIDITY', value: '6-STRUT ISO', delta: '+100%' },
      { label: 'HOOKE ELASTICITY', value: '280 GPa', delta: 'BALANCED' },
      { label: 'COMPUTATION LATENCY', value: '0.42 ms', delta: '-18%' }
    ]
  },
  {
    id: 'dialectic',
    sequence: '转',
    titleZh: '裂变与辩证：双共振腔的互锁碰撞',
    titleEn: 'Dialectical Bifurcation',
    subtitleZh: '形式与规约之笼 vs 直觉与涌现之笼',
    subtitleEn: 'Antagonistic coupling between algorithmic rigor and creative emergence',
    tensionConstant: 1.5,
    dampingFactor: 0.90,
    rotationSpeed: 0.005,
    descriptionZh: [
      '真正的创作者永远处于自身的分裂之中。在本章中，单一的张拉体发生剧烈的相变裂变，分裂为两座互锁的共振腔。',
      '左侧深蓝的骨架代表“极度严密的逻辑与规范”；右侧朱砂红的骨架代表“狂热的感知突破与形式涌现”。横跨虚空的紫色弹性桥是二者永不停歇的角力与对话。',
      '优秀的代码与顶级的美学不是妥协后的中间派，而是将这两种极端力量推向顶峰后的瞬间共鸣。'
    ],
    descriptionEn: [
      'Two antagonistic tensegrity clusters pulled taut by transversal harmonic chords. Perturbing either cage forces the other to pivot and absorb the impulse.'
    ],
    metrics: [
      { label: 'DIALECTIC COUPLING', value: 'BIFURCATED', delta: 'ACTIVE' },
      { label: 'INTER-CAGE STRAIN', value: '3.84 kN', delta: 'MAXIMUM' },
      { label: 'HARMONIC OVERTONE', value: 'A3-E4-C5', delta: 'POLYPHONIC' }
    ]
  },
  {
    id: 'artifact',
    sequence: '合',
    titleZh: '造物印痕：拓扑收束与永恒印记',
    titleEn: 'Artifact & Synthesis',
    subtitleZh: '将动荡的张力淬炼为可被铭记的数字遗存',
    subtitleEn: 'Crystallization into an interactive vector seal for visitor export',
    tensionConstant: 1.0,
    dampingFactor: 0.96,
    rotationSpeed: 0.002,
    descriptionZh: [
      '当体验走向尾声，所有的动荡与张力必须收束为一件清晰、确定而不可动摇的实体。',
      '张拉八面体与辩证双环在此凝聚为一枚拓扑印章（Topology Seal）。这不仅仅是我的数字图章，也是你我此次协作的永恒切片。',
      '在下方，你可以调节对称点数、螺旋偏角与预张力比率，实时生成属于你独一无二的数学印痕，并将其作为纯净的矢量 SVG 保存。'
    ],
    descriptionEn: [
      'All continuous kinetic calculations resolve into a crystalline seal. The visitor sculpts and exports an enduring mathematical monument of their visit.'
    ],
    metrics: [
      { label: 'SYNTHESIS RESOLUTION', value: 'CRYSTALLINE', delta: 'RESOLVED' },
      { label: 'VECTOR PRECISION', value: '0.001 pt', delta: 'EXACT' },
      { label: 'VISITOR ARTIFACT', value: 'SVG EXPORT', delta: 'READY' }
    ]
  }
];

export const App: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialChapter = (searchParams.get('chapter') as ChapterId) || 'inception';
  const initialView = (searchParams.get('view') as ViewMode) || 'editorial';
  const initialMotion = searchParams.get('motion') === 'reduced';

  const [currentChapter, setCurrentChapter] = useState<ChapterId>(initialChapter);
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(initialMotion);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  // Deep interactive states
  const [dialecticCoupling, setDialecticCoupling] = useState<number>(1.0);
  const [sealParams, setSealParams] = useState<{ points: number; twist: number; tension: number }>({
    points: 8,
    twist: 30,
    tension: 1.0,
  });

  const [telemetry, setTelemetry] = useState<TelemetryData>({
    fps: 60,
    nodeCount: 6,
    strutCount: 3,
    cableCount: 12,
    totalEnergy: 0,
    currentEquilibrium: 1.0,
    draggedNode: null,
    cursorDistance: 0,
    audioActive: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (initialChapter !== 'inception') {
      setTimeout(() => {
        const el = document.getElementById(`section-${initialChapter}`);
        if (el) el.scrollIntoView();
      }, 100);
    }
  }, [initialChapter]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const chapterIds: ChapterId[] = ['inception', 'tension', 'dialectic', 'artifact'];
      const currentIdx = chapterIds.indexOf(currentChapter);

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = Math.min(chapterIds.length - 1, currentIdx + 1);
        handleSelectChapter(chapterIds[nextIdx]);
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = Math.max(0, currentIdx - 1);
        handleSelectChapter(chapterIds[prevIdx]);
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setViewMode((prev) => (prev === 'blueprint' ? 'editorial' : 'blueprint'));
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleAudio();
      } else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter]);

  const handleToggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectChapter = (id: ChapterId) => {
    setCurrentChapter(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
    const idx = ['inception', 'tension', 'dialectic', 'artifact'].indexOf(id);
    sound.playChapterTransition(idx);
  };

  const handleDialecticChange = (val: number) => {
    setDialecticCoupling(val);
    sound.triggerPluck(Math.abs(val - 1.0) * 0.8, 4);
  };

  // Scroll spy to update current chapter
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const chapterIds: ChapterId[] = ['inception', 'tension', 'dialectic', 'artifact'];

      for (let i = chapterIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(`section-${chapterIds[i]}`);
        if (el && el.offsetTop <= scrollPos) {
          if (currentChapter !== chapterIds[i]) {
            setCurrentChapter(chapterIds[i]);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentChapter]);

  return (
    <div className={`min-h-screen ${viewMode === 'blueprint' ? 'bg-[#001D2C] text-cyan-100' : 'bg-paper-100 text-ink-900'} transition-colors duration-500`}>
      <NavigationHUD
        currentChapter={currentChapter}
        onSelectChapter={handleSelectChapter}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(prev => prev === 'blueprint' ? 'editorial' : 'blueprint')}
        isMuted={isMuted}
        onToggleAudio={handleToggleAudio}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(prev => !prev)}
        telemetry={telemetry}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      <main className="pt-24 md:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* Left Column: Long Editorial Narrative Stream */}
          <div className="lg:col-span-6 z-10 order-2 lg:order-1">
            {CHAPTER_METAS.map((meta) => (
              <ChapterSection
                key={meta.id}
                meta={meta}
                isActive={currentChapter === meta.id}
                dialecticCoupling={dialecticCoupling}
                onDialecticCouplingChange={handleDialecticChange}
                onSealParamsChange={setSealParams}
              />
            ))}

            <footer className="py-20 border-t border-paper-300 font-mono text-xs text-ink-500 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-ink-800">TENSEGRITY MIND</span>
                  <span className="mx-2">·</span>
                  <span>AUTONOMOUS CANDIDATE IMPLEMENTATION</span>
                </div>
                <div>GEMINI-3.8-FLASH // 2026</div>
              </div>
              <p className="text-[11px] leading-relaxed text-ink-400 font-sans">
                Crafted with pure mathematical tension, Verlet integration physical solver, native Web Audio API resonant overtone synthesis, and high-DPI Canvas engineering. No external 3D meshes, no prefabricated landing templates.
              </p>
            </footer>
          </div>

          {/* Right Column: Sticky Interactive Core Device */}
          <div className="lg:col-span-6 sticky top-20 md:top-24 h-[44vh] sm:h-[50vh] lg:h-[calc(100vh-8rem)] w-full rounded-2xl overflow-hidden border border-paper-300 shadow-float bg-paper-50 transition-all duration-300 order-1 lg:order-2">
            <TensegrityCanvas
              chapter={currentChapter}
              viewMode={viewMode}
              reducedMotion={reducedMotion}
              onTelemetryUpdate={setTelemetry}
              dialecticCoupling={dialecticCoupling}
              sealParams={sealParams}
            />
          </div>
        </div>
      </main>

      <DiagnosticTelemetry telemetry={telemetry} viewMode={viewMode} />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
};
